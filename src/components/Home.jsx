import { useHistory } from "react-router-dom";

function Home() {
    let history = useHistory();

    const handleRedirectLogin = () => {
        history.push('/login');
    }

    const handleRedirectSignup = () => {
        history.push('/signup');
    }

    return (
        <div className="Home">
            <button onClick={handleRedirectLogin}>Login</button><br />
            <button onClick={handleRedirectSignup}>Signup</button><br />
        </div>
    )
}

export default Home;