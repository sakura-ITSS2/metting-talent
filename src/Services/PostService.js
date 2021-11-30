import { doc, getDoc } from 'firebase/firestore/lite';
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
