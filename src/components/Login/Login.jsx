import { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
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

    const handleChangeEMail = (event) => {
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

    const handleChangeRole = (event) => {
        setUser({
            ...user,
            role: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let authUser = await checkAuth(user.email, user.pass, user.role);
        if (authUser) {
            localStorage.setItem('id', authUser.id);
            localStorage.setItem('role', user.role);
            if (user.role === 'Manager') history.push('/manager');
            if (user.role === 'Talent') history.push('/talent');
        } else {
            setErrorMessage(true);
        }
    };

    return (
        <Container fluid className="login-page">
            <Row>
                <Col lg={6} md={6}>
                    <div className="login-form">
                        <h2 className="fw-bold mb-5">サインイン</h2>
                        <div className="mb-5 signup-link">
                            <span className="mb-2">
                                アカウントをお持ちでない場合は、
                            </span>
                            <br />
                            <Link to="/signup">ここから登録してください。</Link>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>メールアドレス</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="メールアドレスを入力してください"
                                    onChange={handleChangeEMail}
                                />
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
                                variant="primary"
                                className="rounded-pill w-100 mt-5"
                                onClick={handleSubmit}
                            >
                                ログイン
                            </Button>
                        </Form>
                    </div>
                </Col>
                <Col lg={6} md={6}>
                    <Image src={banner} fluid className="banner" />
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
