import {db} from '../utils/firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';

export const checkAuth = async (email, pass, role) => {
    try{
        const userSnapshot = await getDocs(collection(db, 'User'));
        const listUser = userSnapshot.docs.map(doc => doc.data());

        if(role === 'Manager'){
            let check = listUser[0].Data.filter(user => user.email===email && user.pass === pass);
            if (check.length > 0) return check[0];
            else return false;
        }else if(role === 'Talent'){
            let check = listUser[1].Data.filter(user => user.email===email && user.pass === pass);
            if (check.length > 0) return check[0];
            else return false;
        }else return false;
    }catch(err){
        return false;
    }
}

export const createUser = async (email, pass, role) => {
    try{
        const userSnapshot = await getDocs(collection(db, 'User'));
        const listUser = userSnapshot.docs.map(doc => doc.data());

        if(role === 'Manager'){
            let listManager = [...listUser[0].Data];

            if(listManager.filter(manager => manager.email === email).length >0) return false;
            else{
                listManager = [...listManager, { email: email, pass: pass }];
                const managerRef = doc(db, 'User/Manager');
                await updateDoc(managerRef, "Data", listManager);
                return true;
            }
        }

        if(role === 'Talent'){
            let listTalent = [...listUser[1].Data];
            if(listTalent.filter(manager => manager.email === email).length >0) return false;
            else{
                listTalent = [...listTalent, { email: email, pass: pass }];
                const talentRef = doc(db, 'User/Talent');
                await updateDoc(talentRef, "Data", listTalent);
                return true;
            }
        }
    }catch(err){
        return false;
    }
}
