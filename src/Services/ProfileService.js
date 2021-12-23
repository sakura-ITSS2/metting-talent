import {db} from '../utils/firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getProfile = async (id, role) => {
    try{
        const userSnapshot = await getDocs(collection(db, 'User'));
        const listUser = userSnapshot.docs.map(doc => doc.data());

        if(role === 'Talent'){
            let check = listUser[1].Data.filter(user => user.id === id);
            return check[0];
        }else return false;
    }catch(err){
        return false;
    }
}

export const updateProfile = async (data) => {
    try{
        const userSnapshot = await getDocs(collection(db, 'User'));
        const listUser = userSnapshot.docs.map(doc => doc.data());
        let listTalent = [...listUser[1].Data];


        listTalent = listTalent.map(user => {
            return localStorage.getItem('id') === user.id ?
            {
                ...user,
                avt: data.avatar,
                skill: data.skill,
                advantage: data.advantage,
                disAdvantage: data.disAdvantage,
                phone: data.phone,
                hobby: data.hobby,
                height: data.height,
                weight: data.weight
            }
            :
            user
        })

        console.log(listTalent);

        const talentRef = doc(db, 'User/Talent');
        await updateDoc(talentRef, "Data", listTalent);
        toast.success("プロフィール更新に成功しました", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

export const uploadAvatar = async (formData) => {
    const apiKey = '2563133ba7263096e8a107725a295a35';
    const baseURL = `https://api.imgbb.com/1/upload?key=${apiKey}`
    let data;

    await axios.post(baseURL, formData)
        .then(res => data = res.data);

    return data;
}
