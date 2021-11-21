import { useHistory } from "react-router-dom";
import banner from '../../images/top_talent.jpg';
import './Home.scss';
import './3Dtext.scss';

function Home() {
    let history = useHistory();

    const handleRedirectLogin = () => {
        history.push('/login');
    }

    const handleRedirectSignup = () => {
        history.push('/signup');
    }

    if (localStorage.getItem('role') === 'Talent') {
        history?.push('/talent')
    }

    if (localStorage.getItem('role') === 'Manager') {
        history?.push('/manager')
    }

    return (
        <div className="Home">
            <header>
                <div className="logo">
                    <a href="/">
                        <img style={{height: 50,}} src={banner}/>
                    </a>
                </div>
                <div className="header-inner">
                </div>
                <button className="loginButton" onClick={handleRedirectLogin}>ログイン</button><br />
                <button className="signupButton" onClick={handleRedirectSignup}>サインアップ</button><br />
            </header>
            <div className="content">
                <div class="ocean">
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
                <h1 data-heading="Top Talent">
                    <span contenteditable data-heading="Top Talent">Top Talent</span>
                </h1>
            </div>
        </div>
    )
}

export default Home;
