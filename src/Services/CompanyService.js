import {collection, doc, getDoc, getDocs, updateDoc} from 'firebase/firestore/lite';
import { db } from '../utils/firebase';
import { toast } from 'react-toastify';

export const getCompanyInfo = async (id) => {
    try{
        const userSnapshot = await getDocs(collection(db, 'User'));
        const listUser = userSnapshot.docs.map(doc => doc.data());

        let check = listUser[0].Data.filter(user => user.id === id);
        return check[0].company;
    }catch(err){
        return false;
    }
}

export const updateCompanyInfo = async (companyInfo) => {
    try{
        const userSnapshot = await getDocs(collection(db, 'User'));
        const listUser = userSnapshot.docs.map(doc => doc.data());
        let listTalent = [...listUser[0].Data];


        listTalent = listTalent.map(user => {
            return localStorage.getItem('id') === user.id ?
            {
                ...user,
                company: companyInfo
            }
            :
            user
        })

        const managerRef = doc(db, 'User/Manager');
        await updateDoc(managerRef, "Data", listTalent);
        toast.success("会社情報に成功しました", {
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
