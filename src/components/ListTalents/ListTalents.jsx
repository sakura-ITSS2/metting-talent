import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import defaultAvatar from '../../images/default-avatar.png';
import {clickLinkMeeting, getListTalents, getPostTitle, reviewTalent} from '../../Services/PostService';
import {
    SKILLS,
    STATUS_ACCEPT,
    STATUS_DECLINE,
    STATUS_PENDING,
    STATUS_REVIEW,
} from '../../utils/constants';
import Header from '../Header/Header';
import './ListTalents.scss';
import Loader from "react-loader-spinner";
import {logDOM} from "@testing-library/react";

function ListTalents() {
    const [listTalents, setListTalents] = useState([]);
    const [defaultListTalents, setDefaultListTalent] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [score, setScore] = useState(0);
    const [scoreReview, setScoreReview] = useState(0);
    const [review, setReview] = useState('');
    const [reviewReview, setReviewReview] = useState('');
    const [filterAge, setFilterAge] = useState('全て');
    const [filterWeight, setFilterWeight] = useState('全て');
    const [filterHeight, setFilterHeight] = useState('全て');
    const [filterSkill, setFilterSkill] = useState('全て');
    const [idTalent, setIdTalent] = useState();
    const { id } = useParams();

    const handleAcceptModal = () => {
        reviewTalent(id, idTalent, score, review ).then(
            () => {
                window.location.reload()
                setShow(false)
            }
        )
    }

    const handleOpenModal = (id) => {
        setIdTalent(id)
        setShow(true)
    }

    const handleOpenModalReview = (score, review) => {
        setScoreReview(score)
        setReviewReview(review)
        setShowReview(true)
    }

    const handleFilter = () => {
        let conditionAge = filterAge.split('-')
        let conditionWeight = filterWeight.split('-')
        let conditionHeight = filterHeight.split('-')
        let tmp = defaultListTalents
            .filter(item => conditionAge[0] === '全て'
                ?item
                :conditionAge[0] === '>26'
                    ? parseInt(item?.age) > 26
                    : parseInt(item?.age) <= parseInt(conditionAge[1]) && parseInt(item?.age) > parseInt(conditionAge[0]))
            .filter(item => conditionWeight[0] === '全て'
                ?item
                :conditionWeight[0] === '>70'
                    ? parseInt(item?.weight) > 70
                    : parseInt(item?.weight) <= parseInt(conditionWeight[1]) && parseInt(item?.weight) > parseInt(conditionWeight[0]))
            .filter(item => conditionHeight[0] === '全て'
                ?item
                :conditionHeight[0] === '>190'
                    ? parseInt(item?.height) > 190
                    : parseInt(item?.height) <= parseInt(conditionHeight[1]) && parseInt(item?.height) > parseInt(conditionHeight[0]))
            .filter(item => filterSkill === '全て' ? item : item?.skills?.some(item2 => item2?.label === filterSkill))
        setListTalents(tmp)
    }

    const handleLinkMeeting = (idPost, idTalent) => {
        clickLinkMeeting(idPost, idTalent).then(
            () => window.location.reload()
        )
    }

    useEffect(() => {
        const fetchlistTalents = async (id) => {
            setLoading(true);
            const data = await getListTalents(id);
            const title = await getPostTitle(id);
            if (data) {
                data.sort((talent1, talent2) => {
                    return (
                        new Date(talent1.time || '9999/1/1 10:00') -
                        new Date(talent2.time || '9999/1/1 10:00')
                    );
                });
                setListTalents(data);
                setDefaultListTalent(data);
                console.log(data)
            }
            setPostTitle(title);
            setLoading(false);
        };

        fetchlistTalents(id);
    }, [id]);

    return (
        <div className="wrapper">
            <Header />
            <div className="list-talents-container">
                <h2>{postTitle}</h2>
                <Container>
                    <Row xs="auto">
                        <Col>
                            <div>
                                <p>年齢</p>
                                <Dropdown onSelect={(e) => setFilterAge(e)}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">

                                        {
                                            {
                                                '全て': '全て',
                                                '10-14': '10-14歳',
                                                '14-18': '14-18歳',
                                                '18-22': '18-22歳',
                                                '22-26': '22-26歳',
                                                '>26': '26歳以上',
                                            }[filterAge]
                                        }
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="全て">全て</Dropdown.Item>
                                        <Dropdown.Item eventKey="10-14">10-14歳</Dropdown.Item>
                                        <Dropdown.Item eventKey="14-18">14-18歳</Dropdown.Item>
                                        <Dropdown.Item eventKey="18-22">18-22歳</Dropdown.Item>
                                        <Dropdown.Item eventKey="22-26">22-26歳</Dropdown.Item>
                                        <Dropdown.Item eventKey=">26">26歳以上</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col>
                            <p>体重</p>
                            <Dropdown onSelect={(e) => setFilterWeight(e)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {
                                        {
                                            '全て': '全て',
                                            '40-50': '40-50kg',
                                            '50-60': '50-60kg',
                                            '60-70': '60-70kg',
                                            '>70': '70kg以上',
                                        }[filterWeight]
                                    }
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="全て">全て</Dropdown.Item>
                                    <Dropdown.Item eventKey="40-50">40-50kg</Dropdown.Item>
                                    <Dropdown.Item eventKey="50-60">50-60kg</Dropdown.Item>
                                    <Dropdown.Item eventKey="60-70">60-70kg</Dropdown.Item>
                                    <Dropdown.Item eventKey=">70">70kg以上</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <p>身長</p>
                            <Dropdown onSelect={(e) => setFilterHeight(e)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {
                                        {
                                            '全て': '全て',
                                            '>190': '1m9以上',
                                            '180-190': '1m8-1m9',
                                            '170-180': '1m7-1m8',
                                            '160-170': '1m6-1m7',
                                        }[filterHeight]
                                    }
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="全て">全て</Dropdown.Item>
                                    <Dropdown.Item eventKey=">190">1m9以上</Dropdown.Item>
                                    <Dropdown.Item eventKey="180-190">1m8-1m9</Dropdown.Item>
                                    <Dropdown.Item eventKey="170-180">1m7-1m8</Dropdown.Item>
                                    <Dropdown.Item eventKey="160-170">1m6-1m7</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <p>スキル</p>
                            <Dropdown onSelect={(e) => setFilterSkill(e)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {filterSkill}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="全て">全て</Dropdown.Item>
                                    {
                                        SKILLS.map(item =>
                                            <Dropdown.Item eventKey={item.label}>{item.label}</Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <Button className ="filter" variant="primary" onClick={() => handleFilter()}>
                                Filter
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <br />
                <div className="list-talents">
                    {loading ? (
                        <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            style={{
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    ) : listTalents.length ? (
                        listTalents.map((talent) => (
                            <div className="talent-item" key={talent.id_talent}>
                                <Link
                                    to={{
                                        pathname: `detail-talent/${talent.id_talent}`,
                                        idPost: id,
                                    }}
                                    className="profile"
                                    params={{ idPost: id }}
                                >
                                    <Image
                                        src={talent.avt || defaultAvatar}
                                        roundedCircle
                                    />
                                    <p>{talent.name}</p>
                                </Link>
                                {talent.status === 'accept' && (
                                    <div className="link-meeting">
                                        <p>
                                            ミーティングURL：
                                            <a
                                                href={talent.link_meeting}
                                                target="_blank"
                                                onClick={() => handleLinkMeeting(id, talent?.id_talent)}
                                            >
                                                {talent.link_meeting}
                                            </a>
                                        </p>
                                        <p>パスワード：{talent.pass_meeting}</p>
                                        <p>日時：{talent.time}</p>
                                    </div>
                                )}
                                {
                                    talent?.status === 'review'
                                        ?<div>スコア: {talent?.score}</div> : null
                                }
                                {
                                    talent.status === 'accept' && talent?.clickLink
                                        ? <Button variant="primary"
                                                  onClick={() => handleOpenModal(talent?.id_talent)}
                                                  style={{ width:130, marginLeft:50}}
                                        >
                                            評価
                                    </Button>
                                        : talent.status === 'review'
                                        ? <Button variant="primary"
                                                  style={{width:130, marginLeft:500}}
                                                  onClick={() => handleOpenModalReview(talent?.score, talent?.review)}
                                        >評価を見る</Button>
                                        : <div style={{height:34, width:190}}/>
                                }
                                <Link
                                    to={{
                                        pathname: `detail-talent/${talent.id_talent}`,
                                        idPost: id,
                                    }}
                                    className={`status--${talent.status}`}
                                    style={{borderRadius:20}}
                                    params={{ idPost: id }}
                                >
                                    {talent.status === 'accept'
                                        ? STATUS_ACCEPT
                                        : talent.status === 'decline'
                                        ? STATUS_DECLINE
                                        : talent.status === 'review'
                                        ? STATUS_REVIEW
                                        : STATUS_PENDING}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <h4>登録したタレントがいません。</h4>
                    )}
                </div>
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>スコア</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Score"
                                min={0}
                                max={10}
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>評価</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        キャンセル
                    </Button>
                    <Button variant="primary" onClick={() => handleAcceptModal()}>
                        保存
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showReview} onHide={() => setShowReview(false)}>
                <Modal.Header closeButton/>
                <Modal.Body>
                    スコア: {scoreReview}
                    <br/>
                    評価: {reviewReview}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReview(false)}>
                        キャンセル
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListTalents;
