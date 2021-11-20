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
            <header>
                <div className="logo">
                    <a href="/">
                        <img style={{height: 50,}} src="/logo192.png"/>
                    </a>
                </div>
                <div className="header-inner">
                </div>
                <button className="loginButton" onClick={handleRedirectLogin}>ログイン</button><br />
                <button className="signupButton" onClick={handleRedirectSignup}>サインアップ</button><br />
            </header>
            <div className="content">  
                <div class="hero-image">
                    <div class="hero-text">
                        <h1>Sakura Team</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;