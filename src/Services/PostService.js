import {collection, doc, getDoc, getDocs, updateDoc} from 'firebase/firestore/lite';
import { db } from '../utils/firebase';

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

        const listPostTalents = listPosts[id].map((item, index) => ({
            ...item,
            name: filteredTalent[index].name,
            avt: filteredTalent[index].avt,
        }));

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
