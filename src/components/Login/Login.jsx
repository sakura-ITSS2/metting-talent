import { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import banner from '../../images/top_talent.jpg';
import { checkAuth } from '../../Services/AuthService';
import './Login.scss';

function Login() {
    let history = useHistory();
    const [user, setUser] = useState({
        email: '',
        pass: '',
        role: 'Manager',
    });
    const [errorMessage, setErrorMessage] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const handleChangeEMail = (event) => {
        validator.isEmail(event.target.value)
            ? setInvalidEmail(false)
            : setInvalidEmail(true);
        setUser({
            ...user,
            email: event.target.value,
        });
    };

    const handleChangePass = (event) => {
        setUser({
            ...user,
            pass: event.target.value,
        });
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        let authUser = await checkAuth(user.email, user.pass);
        if (authUser) {
            localStorage.setItem('id', authUser.id);
            localStorage.setItem('role', authUser.role);
            if (authUser.role === 'Manager') history.push('/manager');
            if (authUser.role === 'Talent') history.push('/talent');
            var now = new Date().getTime();
            localStorage.setItem('setupTime', now)
        } else {
            setErrorMessage(true);
        }
    };

    if (localStorage.getItem('role') === 'Talent') {
        history?.push('/talent')
    }

    if (localStorage.getItem('role') === 'Manager') {
        history?.push('/manager')
    }

    return (
        <Container fluid className="login-page">
            <header>
                <div className="logo">
                    <a href="/">
                        <img style={{height: 50,}} src={banner}/>
                    </a>
                </div>
            </header>
            <div className="login-form">
                <h2 className="fw-bold mb-5">サインイン</h2>
                <div className="mb-5 signup-link">
                    <span className="mb-2">
                        アカウントをお持ちでない場合は、
                    </span>
                    <br />
                    <Link to="/signup">ここから登録してください。</Link>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>メールアドレス</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="メールアドレスを入力してください"
                            onChange={handleChangeEMail}
                        />
                        <Form.Text className="text-danger">
                            {invalidEmail
                                ? '有効なメールアドレスを入力してください。'
                                : ''
                            }
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>パスワード</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="パスワードを入力してください"
                            onChange={handleChangePass}
                        />
                    </Form.Group>
                    {errorMessage && (
                        <div className="text-danger">
                            メールアドレスまたはパスワードが正しくありません。
                        </div>
                    )}
                    <Button
                        type='submit'
                        variant="primary"
                        className="rounded-pill w-100 mt-5"
                        // onClick={handleSubmit}
                        disabled={invalidEmail ? true : false}
                    >
                        ログイン
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Login;
