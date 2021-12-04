import {collection, doc, getDoc, getDocs, updateDoc} from 'firebase/firestore/lite';
import { db } from '../utils/firebase';
import { toast } from 'react-toastify';


export const getListTalents = async (id) => {
    try {
        const postSnap = await getDoc(doc(db, 'UserPost', 'Data'));
        const talentSnap = await getDoc(doc(db, 'User', 'Talent'));

        const listPosts = postSnap.data();
        const listTalentId = listPosts[id].map((item) => item.id_talent);
        const allTalents = talentSnap.data().Data;

        const filteredTalent = allTalents.filter((talent) =>
            listTalentId.includes(talent.id)
        );

        const listPostTalents = listPosts[id].map((item) => {
            const talent = filteredTalent.find((e) => e.id === item.id_talent);
            return {
                ...item,
                name: talent.name,
                avt: talent.avt,
            };
        });

        return listPostTalents;
    } catch (err) {
        return false;
    }
};

export const acceptTalent = async (idPost, idTalent, type, time) => {
    try {
        if (idPost){
            let ref = doc(db, 'UserPost/Data');
            let postSnap = await getDoc(doc(db, 'UserPost', 'Data'));
            let listPosts = postSnap.data();
            let found = listPosts[idPost].find(item => item?.id_talent === idTalent)
            let index = listPosts[idPost].indexOf(found)
            let dataAccept = {...found,
                link_meeting: `https://webrtc-video-room.herokuapp.com/r/${Math.floor(Math.random() * 1000)}`,
                pass_meeting: `${Math.floor(Math.random() * 1000)}`,
                status: 'accept',
                time: time
            }
            let dataDecline = {...found,
                link_meeting: '',
                pass_meeting: '',
                status: 'decline',
                time: time
            }
            if (~index) {
                if (type === 'accept')
                listPosts[idPost][index] = dataAccept;
                else listPosts[idPost][index] = dataDecline;
            }
            await updateDoc(ref, idPost, listPosts[idPost])
            return true
        }
        return false
    }catch (err) {
        return false
    }
}

export const getListPosts = async (id) => {
    try {
        const postSnap = await getDoc(doc(db, 'Post', 'Post'));
        const managerSnap = await getDoc(doc(db, 'User', 'Manager'));

        const listAllPost = postSnap.data().Data;
        const currentManager = managerSnap.data().Data.filter(manager => manager.id ===id)[0];
        const listPostById = listAllPost.filter(post => currentManager.list_post.includes(post.id));

        return listPostById;

    }catch (err) {
        return err;
    }
}

export const createPost = async (description, title, id) => {
    try {
        const postSnap = await getDoc(doc(db, 'Post', 'Post'));
        const managerSnap = await getDoc(doc(db, 'User', 'Manager'));
        
        const listAllPost = postSnap.data().Data;
        const listAllManager =  managerSnap.data().Data
        const currentManagerIndex = listAllManager.findIndex(manager => manager.id ===id);

        const randomID = Math.random().toString(32).substring(2);
        const newPost = {des: description, title, id: randomID, numberApplied: 0}
        const newlistPost = [...listAllPost, newPost];
        const postRef = doc(db, 'Post/Post');
        await updateDoc(postRef, 'Data', newlistPost);

        listAllManager[currentManagerIndex].list_post.push(randomID);
        const managerRef = doc(db, 'User/Manager');
        await updateDoc(managerRef, "Data", listAllManager);


        toast.success("create post success", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        return newPost;
    }catch (err) {
        return err;
    }
}

