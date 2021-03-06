import { useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import banner from '../../images/top_talent.jpg';
import { createUser } from '../../Services/AuthService';
import './Signup.scss';

function SignUp() {
    let history = useHistory();
    const [user, setUser] = useState({
        email: '',
        name: '',
        pass: ' ',
        rePass: ' ',
        role: 'Manager',
    });
    const [errorMessage, setErrorMessage] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const handleChangeEMail = (event) => {
        setErrorMessage(false);
        validator.isEmail(event.target.value)
            ? setInvalidEmail(false)
            : setInvalidEmail(true);
        setUser({
            ...user,
            email: event.target.value,
        });
    };

    const handleChangeName = (event) => {
        setUser({
            ...user,
            name: event.target.value,
        });
    };

    const handleChangePass = (event) => {
        setUser({
            ...user,
            pass: event.target.value,
        });
    };

    const handleChangeRePass = (event) => {
        setUser({
            ...user,
            rePass: event.target.value,
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
        let authUser = await createUser(
            user.email,
            user.pass,
            user.role,
            user.name
        );
        if (authUser) {
            history.push('/login');
        } else {
            setErrorMessage(true);
        }
    };

    if (localStorage.getItem('role') === 'Talent') {
        history?.push('/talent');
    }

    if (localStorage.getItem('role') === 'Manager') {
        history?.push('/manager');
    }

    return (
        <Container fluid className="signup-page">
            <header>
                <div className="logo">
                    <a href="/">
                        <img style={{ height: 50 }} src={banner} />
                    </a>
                </div>
            </header>
            <div className="signup-form">
                <h2 className="signup-text">??????????????????</h2>
                <div className="signup-link">
                    <span className="mb-2">
                        ???????????????????????????????????????????????????
                    </span>
                    <br />
                    <Link to="/login">?????????????????????????????????????????????</Link>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>?????????????????????</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="????????????????????????????????????????????????"
                            onChange={handleChangeEMail}
                        />
                        <Form.Text className="text-danger">
                            {invalidEmail
                                ? '????????????????????????????????????????????????????????????'
                                : ''}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>???????????????</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="??????????????????????????????????????????"
                            onChange={handleChangeName}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>???????????????</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="??????????????????????????????????????????"
                            onChange={handleChangePass}
                        />
                        <Form.Text className="text-danger">
                            {user.pass === ''
                                ? '??????????????????????????????????????????'
                                : ''}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>??????????????????????????????</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="?????????????????????????????????????????????"
                            onChange={handleChangeRePass}
                        />
                        <Form.Text className="text-danger">
                            {user.pass !== user.rePass
                                ? '???????????????????????????????????????????????????????????????????????????'
                                : ''}
                        </Form.Text>
                    </Form.Group>
                    <div className="mb-3">
                        <Form.Check
                            inline
                            id="??????????????????"
                            label="??????????????????"
                            name="role"
                            type="radio"
                            value="Manager"
                            defaultChecked
                            onChange={handleChangeRole}
                        />
                        <Form.Check
                            inline
                            id="?????????????????????"
                            label="?????????????????????"
                            name="role"
                            type="radio"
                            value="Talent"
                            onChange={handleChangeRole}
                        />
                    </div>
                    {errorMessage && (
                        <div className="text-danger">
                            ????????????????????????????????????????????????????????????
                        </div>
                    )}
                    <Button
                        type='submit'
                        variant="primary"
                        className="rounded-pill w-100"
                        // onClick={handleSubmit}
                        disabled={
                            user.pass !== user.rePass ||
                            invalidEmail ||
                            user.pass === ''
                                ? true
                                : false
                        }
                    >
                        ??????
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default SignUp;
