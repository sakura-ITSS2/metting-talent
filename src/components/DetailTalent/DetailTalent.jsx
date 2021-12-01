import React, {useEffect, useRef, useState} from 'react';
import {Col, Image, Row, Modal, Button} from "react-bootstrap";
import './DetailTalent.scss'
import {getProfile} from "../../Services/ProfileService";
import { useParams } from 'react-router-dom'
import {acceptTalent} from "../../Services/PostService";
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import {useHistory} from "react-router-dom";

export const DetailTalent = (props) => {
    const [user, setUser] = useState({})
    const [date, onDate] = useState(new Date());
    const [time, onTime] = useState('10:00');
    const [show, setShow] = useState(false);


    const { id } = useParams()
    const history = useHistory();
    const {idPost} = props.location
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
        <div className='talent-profile'>
            <Row className='justify-content-md-center' style={{height: '100%', verticalAlign: 'center'}}>
                <Col lg='8' className='profile'>
                    <Row className='profile-card'>
                        <Col md='5' className='profile-card__avatar'>
                            <Image src={user.avt} thumbnail/>
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
            <div class="btn">
                <button onClick={() => setShow(true)}>
                    承認
                </button>
                <button onClick={() => handleDecline()}>
                    リジェクト
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Pick time meeting</Modal.Title>
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
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleSave()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}