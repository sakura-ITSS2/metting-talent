import {db} from '../utils/firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';
import { toast } from 'react-toastify';

export const getAllPost = async (registerPost) => {
    try{
        const postSnapshot = await getDocs(collection(db, 'Post'));
        const listPost = postSnapshot.docs.map(doc => doc.data())[0].Data;
        const userPostSnapshot = await getDocs(collection(db, 'UserPost'));
        const listUserPost = userPostSnapshot.docs.map(doc => doc.data())[0];
        let resultPost = listPost;

        registerPost.forEach(postId => {
            const temp = getDataCurrentPost(listUserPost[postId]);
            resultPost = resultPost.map(post => {
                if (post.id === postId) {
                    return {...post,
                        status: temp.status,
                        link_meeting: temp.link_meeting,
                        time: temp.time,
                        pass_meeting: temp.pass_meeting
                    }
                }

                return {...post, status: post?.status, link_meeting: post?.link_meeting, time: post?.time, pass_meeting: post?.pass_meeting}
            })
        })

        return resultPost;
    }catch(err){
        console.log(err);
        return [];
    }
}

const getDataCurrentPost = (listUserPost) => {
    return listUserPost.filter(user => user.id_talent === localStorage.getItem('id'))[0];
}

export const sendRequestPost = async (postId) => {
    try {
        const userSnapshot = await getDocs(collection(db, 'User'));
        const listUser = userSnapshot.docs.map(doc => doc.data());
        let listTalent = [...listUser[1].Data];
        const userId = localStorage.getItem('id');

        listTalent = listTalent.map((user) => {
            console.log(user.list_post.indexOf(userId));
            if (user.id === userId)
                user.list_post.indexOf(postId) === -1 && user.list_post.push(postId);

            return user;
        })

        // update list post in user/talent
        const talentRef = doc(db, 'User/Talent');
        await updateDoc(talentRef, "Data", listTalent);

        const userPostSnapshot = await getDocs(collection(db, 'UserPost'));
        let listUserPost = userPostSnapshot.docs.map(doc => doc.data())[0];
        const item = {
            id_talent: userId,
            link_meeting: null,
            pass_meeting: null,
            status: 'pending',
            time: null
        };

        if (Object.keys(listUserPost).includes(postId)) {
            listUserPost[postId].find(e => e.id_talent === userId).length === 0 && listUserPost[postId].push(item);
        } else {
            listUserPost = {
                ...listUserPost,
                [postId]: [item]
            };
        }

        // add new post of user into UserPost/Data
        const userPostRef = doc(db, 'UserPost/Data');
        await updateDoc(userPostRef, postId, listUserPost[postId]);

        toast.success("リクエストが送信されました。", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return true;
    } catch (error) {
        console.log(error);
        toast.error('サーバエラー', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return false;
    }
}