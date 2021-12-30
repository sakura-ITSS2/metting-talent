import { useState, useRef, useEffect } from 'react'
import { updateProfile, uploadAvatar } from '../../Services/ProfileService';
import validator from 'validator';
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    Modal,
    Form,
    Spinner
} from "react-bootstrap";
import Select from 'react-select'
import {
    AiFillEye
} from "react-icons/ai";
import {
    FaEdit
} from "react-icons/fa";

import './talent-profile.scss'
import DefaultAvatar from './default-avatar.png'
import {SKILLS} from '../../utils/constants'
import { uploadCv } from '../../Services/ProfileService';

const TalentProfile = ({profile}) => {
    const [edit, setEdit] = useState(false)
    const [user, setUser] = useState({})
    const [userEdit, setUserEdit] = useState({...user})
    const userShow = [
        {
            name: 'メール',
            value: user.email
        },
        {
            name: 'ユーザ名',
            value: user.name
        },
        {
            name: '長所',
            value: user.advantage
        },
        {
            name: '短所',
            value: user.disAdvantage
        },
        {
            name: '趣味',
            value: user.hobby
        },
        {
            name: 'スキル',
            value: user.skills
        },
        {
            name: '年齢',
            value: user.age
        },
        {
            name: '身長',
            value: user.height
        },
        {
            name: '体重',
            value: user.weight
        },
        {
            name: '電話番号',
            value: user.phone
        },
        {
            name: 'CV',
            value: user.cv,
            url: user.cvURL
        }
    ]
    const imageRef = useRef();
    const cvRef = useRef();
    const [imageAvatar, setImageAvatar] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        phone: null
    })

    const handleUploadCv = async (e) => {
        let cvURL = await uploadCv(e.target.files[0]);
        await updateProfile({...user, cv :e.target.files[0].name, cvURL});
        setUser({...user, cv :e.target.files[0].name, cvURL});
    }

    useEffect(() => {
        setUser({
            email: profile.email,
            name: profile.name,
            avatar: profile.avt ? profile.avt : DefaultAvatar,
            skill: profile.skill,
            advantage: profile.advantage,
            disAdvantage: profile.disAdvantage,
            phone: profile.phone,
            hobby: profile.hobby,
            height: profile.height,
            weight: profile.weight,
            skills: profile.skills,
            age: profile.age,
            cv: profile.cv,
            cvURL: profile.cvURL,
            completed: !!profile.completed
        })

        if (Object.keys(profile).length && !profile.completed) {
            setEdit(true);
            setUserEdit({
                email: profile.email,
                name: profile.name,
                avatar: profile.avt ? profile.avt : DefaultAvatar,
                skill: profile.skill,
                advantage: profile.advantage,
                disAdvantage: profile.disAdvantage,
                phone: profile.phone,
                hobby: profile.hobby,
                height: profile.height,
                weight: profile.weight,
                skills: profile.skills,
                age: profile.age,
                cv: profile.cv,
                cvURL: profile.cvURL,
                completed: !!profile.completed
            })
        } else {
            setEdit(false);
        }
    }, [profile])

    const handleCloseModal = () => {
        setEdit(!edit);
        setUserEdit({...user})
    }

    const handleChangeInput = (event) => {
        if (event.target.id === 'phone') {
            validator.isMobilePhone(event.target.value) ?
                setError({...error, phone: null})
                : setError({...error, phone: '許可な電話番号を入力してください。'})
        }

        setUserEdit({
            ...userEdit,
            [event.target.id]: event.target.value
        })
    }

    const handleChangeSkills = (e) => {
        setUserEdit({
            ...userEdit,
            skills: e
        })
    }

    const handleChangAvatar = () => {
        imageRef.current.click();
    }

    const fileUploadHandle = (event) => {
        setImageAvatar(event.target.files[0]);
        const file = URL.createObjectURL(event.target.files[0]);
        setUserEdit({
            ...userEdit,
            avatar: file
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (imageAvatar) {
            const formData = new FormData();
            formData.append('image', imageAvatar);

            const image = await uploadAvatar(formData);
            await updateProfile({
                ...userEdit,
                avatar: image.data.url,
                completed: true
            });
            setUser({...userEdit, avatar: image.data.url, completed: true})
        } else {
            await updateProfile({...userEdit, completed: true});
            setUser({...userEdit, completed: true})
        }
        setLoading(false);
        handleCloseModal();
    }

    return (
        <div className='talent-profile'>
            <Row className='justify-content-md-center' style={{height: '100%', verticalAlign: 'center'}}>
                <Col lg='8' className='profile'>
                    <Row className='profile-edit'>
                        <Col>
                            <FaEdit onClick={handleCloseModal} />
                        </Col>
                    </Row>
                    <Row className='profile-card'>
                        <Col md='4' className='profile-card__avatar'>
                            <Image src={user.avatar} thumbnail />
                        </Col>
                        <Col md='8' className='profile-card__info'>
                            {
                                userShow.map(field => {
                                    if (field.name != 'スキル' && field.name != 'CV')
                                        return (
                                            <Row>
                                                <Col xs='3'>{field.name}</Col>
                                                <Col xs='8'>{field.value ? field.value : '未登録'}</Col>
                                            </Row>
                                        )
                                    else if (field.name === 'CV')
                                        return (
                                            <Row>
                                                <Col xs='3'>{field.name}</Col>
                                                {
                                                    field.url ?
                                                    <Col xs='8' >{`${user.email}の履歴書  `}<a href = {field.url} target="_blank"> <AiFillEye style={{fontSize: '25px'}} /></a></Col>:
                                                    <Col xs='8'>{'未登録'}</Col>
                                                }
                                            </Row>
                                        )
                                    else {
                                        return (
                                            <Row>
                                                <Col xs='3'>{field.name}</Col>
                                                <Col xs='8'>

                                                        {
                                                            field.value && field.value.length ?
                                                                (
                                                                    <Row className='profile-card__info-skill'>
                                                                        {
                                                                            field.value.map(item => (
                                                                                <Col><p>{item.label}</p></Col>
                                                                            ))
                                                                        }
                                                                    </Row>
                                                                )
                                                                :
                                                                '未登録'
                                                        }
                                                </Col>
                                            </Row>
                                        )
                                    }
                                })
                            }
                            <Row
                                style={{
                                    textAlign: 'right',
                                    justifyContent: 'right'
                                }}
                            >
                                <Col md='5'>
                                    <input type="file" ref={cvRef} onChange={(e)=>handleUploadCv(e)} hidden />
                                    <Button onClick= {() =>cvRef.current.click()} >履歴書をアップロード</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col lg='1' />
            </Row>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                show={edit}
                centered
                onHide={userEdit.completed ? handleCloseModal : null}
                scrollable
                className='modal'
            >
                <Modal.Header closeButton={userEdit.completed}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        情報編集
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form onSubmit={handleSubmit}>
                            <Row className="justify-content-md-center">
                                <Col md='3' className='profile-card__avatar'>
                                    <Image src={userEdit.avatar} rounded />
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md='3' className='profile-card__avatar-change'>
                                    <Form.Group controlId="avatar" className="mb-3">
                                        <Form.Control ref={imageRef} type="file" onChange={fileUploadHandle} hidden />
                                    </Form.Group>
                                    <span onClick={handleChangAvatar}>アバターを変更</span>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>メール</Form.Label>
                                <Form.Control type="email" value={userEdit.email}　disabled />
                                <Form.Text className="text-muted">
                                    *メールが編集できません。
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>ユーザ名</Form.Label>
                                <Form.Control type="text" value={userEdit.name} onChange={handleChangeInput} placeholder="ユーザ名を入力します" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="advantage">
                                <Form.Label>長所</Form.Label>
                                <Form.Control type="text" value={userEdit.advantage} onChange={handleChangeInput} placeholder="長所を入力します" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="disAdvantage">
                                <Form.Label>短所</Form.Label>
                                <Form.Control type="text" value={userEdit.disAdvantage} onChange={handleChangeInput} placeholder="短所を入力します" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="hobby">
                                <Form.Label>趣味</Form.Label>
                                <Form.Control type="text" value={userEdit.hobby} onChange={handleChangeInput} placeholder="趣味を入力します" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>スキル</Form.Label>
                                <Select
                                    value={userEdit.skills}
                                    onChange={handleChangeSkills}
                                    closeMenuOnSelect={false}
                                    isMulti
                                    name="colors"
                                    options={SKILLS}
                                    placeholder='スキルを選択'
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="age">
                                <Form.Label>年齢</Form.Label>
                                <Form.Control type="number" required min={0} value={userEdit.age} onChange={handleChangeInput} placeholder="年齢を入力します" isInvalid={!!error.age} />
                                <Form.Control.Feedback type="invalid">
                                    {error.age}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="height">
                                <Form.Label>身長(cm)</Form.Label>
                                <Form.Control type="number" required min={0} value={userEdit.height} onChange={handleChangeInput} placeholder="身長を入力します" isInvalid={!!error.height} />
                                <Form.Control.Feedback type="invalid">
                                    {error.height}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="weight">
                                <Form.Label>体重(kg)</Form.Label>
                                <Form.Control type="number" required min={0} value={userEdit.weight} onChange={handleChangeInput} placeholder="体重を入力します" isInvalid={!!error.weight} />
                                <Form.Control.Feedback type="invalid">
                                    {error.weight}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>電話番号</Form.Label>
                                <Form.Control type="text" value={userEdit.phone} onChange={handleChangeInput} placeholder="電話番号を入力します" isInvalid={!!error.phone} />
                                <Form.Control.Feedback type="invalid">
                                    {error.phone}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row className='justify-content-md-center'>
                                <Col md='2'>
                                    <Button style={{width: '80%'}} variant="primary" type="submit" disabled={loading || !!error.phone}>
                                        {
                                            loading ?
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            /> : '編集'
                                        }
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default TalentProfile;
