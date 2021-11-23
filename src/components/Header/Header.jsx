import React from 'react';
import { useHistory } from 'react-router';
import banner from '../../images/top_talent.jpg';
import './Header.scss';

function Header() {
    let history = useHistory();

    const handleRedirectLogin = () => {
        history.push('/login');
    };

    const handleRedirectSignup = () => {
        history.push('/signup');
    };

    const handleLogout = async () => {
        await localStorage.clear();
        history.push('/');
    };

    return (
        <header>
            <div className="logo">
                <a href="/">
                    <img style={{ height: 50 }} src={banner} />
                </a>
            </div>
            <div className="header-inner"></div>
            {localStorage.getItem('role') ? (
                <button className="logoutButton" onClick={handleLogout}>
                    ログアウト
                </button>
            ) : (
                <>
                    <button
                        className="loginButton"
                        onClick={handleRedirectLogin}
                    >
                        ログイン
                    </button>
                    <br />
                    <button
                        className="signupButton"
                        onClick={handleRedirectSignup}
                    >
                        サインアップ
                    </button>
                    <br />
                </>
            )}
        </header>
    );
}

export default Header;
