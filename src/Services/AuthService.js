import {db} from '../utils/firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';

export const checkAuth = async (email, pass, role) => {
    try{
        const userSnapshot = await getDocs(collection(db, 'User'));
        const listUser = userSnapshot.docs.map(doc => doc.data());

        let checkManager = listUser[0].Data.filter(user => user.email===email && user.pass === pass);
        if (checkManager.length > 0) return checkManager[0];
       
        let checkTalent = listUser[1].Data.filter(user => user.email===email && user.pass === pass);
        if (checkTalent.length > 0) return checkTalent[0];
        
        return false;
        
    }catch(err){
        return false;
    }
}

export const createUser = async (email, pass, role, name) => {
    try{
        const userSnapshot = await getDocs(collection(db, 'User'));
        const listUser = userSnapshot.docs.map(doc => doc.data());

        const randomID = Math.random().toString(32).substring(2);

        let listManager = [...listUser[0].Data];
        if(listManager.filter(manager => manager.email === email).length >0) return false;

        let listTalent = [...listUser[1].Data];
        if(listTalent.filter(talent => talent.email === email).length >0) return false;

        if(role === 'Manager'){  
            listManager = [...listManager, {id:randomID, email: email, pass: pass, name: name, list_post: []}];
            const managerRef = doc(db, 'User/Manager');
            await updateDoc(managerRef, "Data", listManager);
            return true;
        }

        if(role === 'Talent'){
            listTalent = [...listTalent, {id:randomID, email: email, pass: pass, name: name, list_post: []}];
            const talentRef = doc(db, 'User/Talent');
            await updateDoc(talentRef, "Data", listTalent);
            return true;   
        }
    }catch(err){
        return false;
    }
}
