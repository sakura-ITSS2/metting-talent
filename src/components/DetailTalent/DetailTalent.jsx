import React, {useEffect, useRef, useState} from 'react';
import {Col, Image, Row, Modal, Button, Spinner} from "react-bootstrap";
import './DetailTalent.scss'
import {getProfile} from "../../Services/ProfileService";
import { useParams } from 'react-router-dom'
import {acceptTalent} from "../../Services/PostService";
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import {useHistory} from "react-router-dom";
import Header from '../Header/Header';
import {BiArrowBack} from 'react-icons/bi'
import {AiFillEye} from "react-icons/ai";

export const DetailTalent = (props) => {
    const [user, setUser] = useState({})
    const [date, onDate] = useState(new Date());
    const [time, onTime] = useState('10:00');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState({accept: false, reject: false})


    const { id } = useParams()
    const history = useHistory();
    const {idPost} = props.location
    const userShow = [
        {
            name: 'メール',
            value: user?.email
        },
        {
            name: 'ユーザ名',
            value: user?.name
        },
        {
            name: '長所',
            value: user?.advantage
        },
        {
            name: '短所',
            value: user?.disAdvantage
        },
        {
            name: '趣味',
            value: user?.hobby
        },
        {
            name: 'スキル',
            value: user?.skills
        },
        {
            name: '年齢',
            value: user?.age
        },
        {
            name: '身長',
            value: user?.height
        },
        {
            name: '体重',
            value: user?.weight
        },
        {
            name: '電話番号',
            value: user.phone
        },
        {
            name: 'CV',
            value: user?.cv,
            url: user?.cvURL
        }
    ]

    useEffect(() => {
        async function fetchData() {
            const data = await getProfile(id, 'Talent');
            setUser({...data});
        }

        fetchData();
        // acceptTalent(idPost, id)
    },[])

    const handleClose = () => setShow(false);

    const handleSave = () => {
        let str = date.getUTCFullYear().toString() + "/" +
            (date.getUTCMonth() + 1).toString() +
            "/" + (date.getUTCDate()+1)
        acceptTalent(idPost, id, 'accept', `${str} ${time}`).then(() => {
            handleClose()
            history.goBack()
        })
    }

    const handleDecline = () => {
        acceptTalent(idPost, id, 'decline', '').then(
            () => history.goBack()
        )
    }

    return(
        <div className='detail-talent-profile'>
            <Header />
            <Row className='justify-content-md-center' style={{height: '100%', verticalAlign: 'center'}}>
                <Col style={{marginTop:90}} lg='1'>
                    <Row style={{cursor: 'pointer'}} onClick={() => history.goBack()}>
                        <BiArrowBack style={{fontSize:50}}/>
                    </Row>
                </Col>
                <Col lg='8' className='profile'>
                    <Row className='profile-card'>
                        <hr />
                        <Col md='0' className='profile-card__avatar'>
                            <Image src={user.avt} thumbnail/>
                        </Col>
                        <Col md='12' className='profile-card__info'>
                            {
                                userShow.map(field => {
                                    if (field.name !== 'スキル' && field.name !== 'CV')
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
                        </Col>
                    </Row>
                    <div class="btns">
                        <button className="btn btn-primary accept" onClick={() => setShow(true)}>
                            承認
                        </button>
                        <button className="btn btn-danger reject" disabled={loading.reject} onClick={() => handleDecline()}>
                            {
                                loading.reject ?
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> : 'リジェクト'
                            }
                        </button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>会議の日程を指定してください❕</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <DatePicker
                                    onChange={onDate}
                                    value={date}
                                />
                                <TimePicker
                                    onChange={onTime}
                                    value={time}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    キャンセル
                                </Button>
                                <Button variant="primary" onClick={() => handleSave()}>
                                    保存
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Col>
                <Col lg='1' />
            </Row>
        </div>
    )
}
