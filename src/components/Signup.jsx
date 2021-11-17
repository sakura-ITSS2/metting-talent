import { useHistory } from "react-router-dom";
import { useState } from "react";
import {createUser} from '../Services/AuthService'

function SignUp() {
    let history = useHistory();
    const [user, setUser] = useState({
        email:'',
        pass:'',
        role: 'Manager'
    });

    const [errorMessage, setErrorMessage] = useState(false);

    const handleChangeEMail = (event) => {
        setUser({
            ...user,
            email: event.target.value
        });
    }

    const handleChangePass = (event) => {
        setUser({
            ...user,
            pass: event.target.value
        });
    }

    const handleChangeRole = (event) => {
        setUser({
            ...user,
            role: event.target.value
        });
    }

    const handleSubmit =  async (event) => {
        event.preventDefault();
        let authUser = await createUser(user.email, user.pass, user.role);
        if(authUser) {
            history.push('/login');
        }else{
            setErrorMessage(true);
        }
    }
   
    return (
        <div className="Signup">
            <form onSubmit={handleSubmit}>
                <label for="email">Email:</label><br />
                <input type="text" id="email" name="fname" value = {user.email} onChange = {handleChangeEMail} /><br />
                <label for="email">Pass:</label><br />
                <input type="text" id="email" name="fname" value = {user.pass} onChange = {handleChangePass} /><br />
                <select value={user.role} onChange={handleChangeRole}>
                    <option value="Manager">Manager</option>
                    <option value="Talent">Talent</option>
                </select>
                <button type="submit" value="Submit" onClick={handleSubmit}>Submit</button>
            </form>
            {errorMessage && <div style={{color: 'red'}}>Email is exists!</div>}
        </div>
    )
}

export default SignUp;