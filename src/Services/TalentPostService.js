import {db} from '../utils/firebase'
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore/lite';
import { toast } from 'react-toastify';

export const getAllPost = async (registerPost) => {
    try{
        if (registerPost) {
            const postSnapshot = await getDocs(collection(db, 'Post'));
            const listPost = postSnapshot.docs.map(doc => doc.data())[0].Data;
            const userPostSnapshot = await getDocs(collection(db, 'UserPost'));
            const listUserPost = userPostSnapshot.docs.map(doc => doc.data())[0];
            let resultPost = listPost;
            const managerSnap = await getDoc(doc(db, 'User', 'Manager'));
            const listManager = managerSnap.data().Data

            registerPost.forEach(postId => {
                const temp = getDataCurrentPost(listUserPost[postId]);
                resultPost = resultPost.map(post => {
                    const postManager = listManager.filter(manager => manager.list_post.includes(post.id))[0];
                    if (post.id === postId) {
                        return {...post,
                            status: temp?.status,
                            link_meeting: temp?.link_meeting,
                            time: temp?.time,
                            pass_meeting: temp?.pass_meeting,
                            score: temp?.score,
                            review: temp?.review,
                            company: postManager?.company
                        }
                    }

                    return {...post, status: post?.status, link_meeting: post?.link_meeting, time: post?.time, pass_meeting: post?.pass_meeting, score: post?.score, review: post?.review, company: postManager?.company}
                })
            })

            return resultPost;
        }
        return [];
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
            listUserPost[postId].filter(e => e.id_talent === userId).length === 0 && listUserPost[postId].push(item);
        } else {
            listUserPost = {
                ...listUserPost,
                [postId]: [item]
            };
        }

        // add new post of user into UserPost/Data
        const userPostRef = doc(db, 'UserPost/Data');
        await updateDoc(userPostRef, postId, listUserPost[postId]);

        const postSnapshot = await getDocs(collection(db, 'Post'));
        const listPost = postSnapshot.docs.map(doc => doc.data())[0].Data;

        const listPostNew = listPost.map(e => {
            return e.id === postId ?
                {
                    ...e,
                    numberApplied: e.numberApplied + 1
                }
                :
                e
        })

        // update numberApplied in Post table
        const postRef = doc(db, 'Post/Post');
        await updateDoc(postRef, 'Data', listPostNew);

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

export const getUserPostById = async () => {
    const userPostSnapshot = await getDocs(collection(db, 'UserPost'));
    const listUserPost = userPostSnapshot.docs.map(doc => doc.data())[0];
    return listUserPost;
}
