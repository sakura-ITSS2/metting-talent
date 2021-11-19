import {useState, useRef, useEffect} from 'react'
import {getProfile, updateProfile} from '../../Services/ProfileService'
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    Modal,
    Form
} from "react-bootstrap";

import {
    FaEdit
} from "react-icons/fa";

import './talent-profile.scss'
import DefaultAvatar from './default-avatar.png'

const TalentProfile = () => {
    const [edit, setEdit] = useState(false)
    const [user, setUser] = useState({
        email: '',
        avatar: '',
        skill: '',
        advantage: '',
        disAdvantage: '',
        phone: '',
        hobby: ''
    })
    const [userEdit, setUserEdit] = useState({...user})
    const userShow = [
        {
            name: 'メール',
            value: user.email
        },
        {
            name: 'スキル',
            value: user.skill
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
            name: '電話番号',
            value: user.phone
        }
    ]
    const imageRef = useRef();

    useEffect(() => {
        async function fetchData(params) {
            const temp = await getProfile(localStorage.getItem('id'), 'Talent')

            setUser({
                email: temp.email ? temp.email : '',
                avatar: temp.avt ? temp.avt : 'https://ix-www.imgix.net/hp/snowshoe.jpg?q=70&w=1800&auto=compress%2Cenhance&fm=jpeg',
                skill: temp.skill ? temp.skill : '',
                advantage: temp.advantage ? temp.advantage : '',
                disAdvantage: temp.disAdvantage ? temp.disAdvantage : '',
                phone: temp.phone ? temp.phone : '',
                hobby: temp.hobby ? temp.hobby : ''
            })
        }
        fetchData()
    }, [])

    const handleCloseModal = () => {
        setEdit(!edit);
        setUserEdit({...user})
    }

    const handleChangeInput = (event) => {
        setUserEdit({
            ...userEdit,
            [event.target.id]: event.target.value
        })
    }

    const handleChangAvatar = () => {
        imageRef.current.click();
    }

    const fileUploadHandle = (event) => {
        const file = URL.createObjectURL(event.target.files[0]);
        setUserEdit({
            ...userEdit,
            avatar: file
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateProfile(userEdit)
        setUser({...userEdit});
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
                        <Col md='5' className='profile-card__avatar'>
                            <Image src={user.avatar ? user.avatar : 'https://ix-www.imgix.net/hp/snowshoe.jpg?q=70&w=1800&auto=compress%2Cenhance&fm=jpeg'} thumbnail />
                        </Col>
                        <Col md='7' className='profile-card__info'>
                            {
                                userShow.map(user => (
                                    <Row>
                                        <Col xs='3'>{user.name}</Col>
                                        <Col xs='8'>{user.value ? user.value : '未登録'}</Col>
                                    </Row>
                                ))
                            }
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
                onHide={handleCloseModal}
                className='modal'
            >
                <Modal.Header closeButton>
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

                            <Form.Group className="mb-3" controlId="skill">
                                <Form.Label>スキル</Form.Label>
                                <Form.Control type="text" value={userEdit.skill} onChange={handleChangeInput} placeholder="スキルを入力します" />
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

                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>電話番号</Form.Label>
                                <Form.Control type="text" value={userEdit.phone} onChange={handleChangeInput} placeholder="電話番号を入力します" />
                            </Form.Group>

                            <Row className='justify-content-md-center'>
                                <Col md='2'>
                                    <Button style={{width: '80%'}} variant="primary" type="submit">
                                        編集
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
