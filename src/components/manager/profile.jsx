import { useState, useRef, useEffect } from 'react'
import { getCompanyInfo, updateCompanyInfo } from '../../Services/CompanyService';
import { uploadAvatar } from '../../Services/ProfileService';
// import validator from 'validator';
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
import Sidebar from '../ManagerSidebar/sidebar'
import Header from '../Header/Header';
import DefaultCompany from './default-company.svg'

import {
    FaEdit
} from "react-icons/fa";
import './profile.scss'


const Profile = () => {
    const [company, setCompany] = useState({})
    const [companyEdit, setCompanyEdit] = useState({...company})
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageAvatar, setImageAvatar] = useState()
    const imageRef = useRef()
    const companyShow = [
        {
            name: '会社名',
            value: company.name
        },
        {
            name: 'アドレス',
            value: company.address
        },
        {
            name: '情報',
            value: company.description
        },
    ]

    useEffect(() => {
        const id = localStorage.getItem('id');
        async function fetchData() {
            const data = await getCompanyInfo(id);
            setCompany({...data});
        }

        fetchData()
    }, [])

    const handleShowModal = () => {
        setEdit(!edit);
        setCompanyEdit({...company})
    }

    const handleChangAvatar = () => {
        imageRef.current.click();
    }

    const fileUploadHandle = (event) => {
        setImageAvatar(event.target.files[0]);
        const file = URL.createObjectURL(event.target.files[0]);
        setCompanyEdit({
            ...companyEdit,
            avatar: file
        })
    }

    const handleChangeInput = (event) => {
        setCompanyEdit({
            ...companyEdit,
            [event.target.id]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (imageAvatar) {
            const formData = new FormData();
            formData.append('image', imageAvatar);

            const image = await uploadAvatar(formData);
            await updateCompanyInfo({
                ...companyEdit,
                avatar: image.data.url,
            });
            setCompany({...companyEdit, avatar: image.data.url})
        } else {
            await updateCompanyInfo({...companyEdit});
            setCompany({...companyEdit})
        }
        setLoading(false);
        handleShowModal();
    }

    return (
        <Container fluid>
            <Row style={{backgroundColor: '#E5E5E5'}}>
                <Header />
                <Col lg='2'
                    style={{paddingLeft: '0'}}
                >
                    <Sidebar />
                </Col>
                <Col lg='10'>
                    <div className='manager-profile'>
                        <Row className='justify-content-md-center' style={{height: '100%', verticalAlign: 'center'}}>
                            <Col lg='8' className='profile'>
                                <Row className='profile-edit'>
                                    <Col>
                                        <FaEdit onClick={handleShowModal} />
                                    </Col>
                                </Row>
                                <Row className='profile-card'>
                                    <Col md='12' className='profile-card__avatar'>
                                        <Image src={company.avatar ? company.avatar : DefaultCompany} thumbnail />
                                    </Col>
                                    <Col md='12' className='profile-card__info'>
                                        {
                                            companyShow.map((field) => {
                                                return (
                                                    <Row>
                                                        <Col xs='4'>{field.name}</Col>
                                                        <Col xs='8'>{field.value ? field.value : '未登録'}</Col>
                                                    </Row>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg='1' />
                        </Row>
                    </div>
                </Col>
            </Row>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                show={edit}
                onHide={handleShowModal}
                centered
                scrollable
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
                                    <Image src={companyEdit.avatar ? companyEdit.avatar : DefaultCompany} rounded />
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

                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>会社名</Form.Label>
                                <Form.Control type="text" value={companyEdit.name} onChange={handleChangeInput} placeholder="会社名を入力します" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>アドレス</Form.Label>
                                <Form.Control type="text" value={companyEdit.address} onChange={handleChangeInput} placeholder="アドレスを入力します" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>情報</Form.Label>
                                <Form.Control type="text" as="textarea" rows={5} value={companyEdit.description} onChange={handleChangeInput} placeholder="情報を入力します" />
                            </Form.Group>

                            <Row className='justify-content-md-center'>
                                <Col md='2'>
                                    <Button style={{width: '80%'}} variant="primary" type="submit" disabled={loading}>
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
        </Container>
    )
}

export default Profile;
