import React, { useEffect, useState } from 'react';
import { Image, Button, Modal, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import defaultAvatar from '../../images/default-avatar.png';
import {getListTalents, getPostTitle, reviewTalent} from '../../Services/PostService';
import {
    STATUS_ACCEPT,
    STATUS_DECLINE,
    STATUS_PENDING,
    STATUS_REVIEW,
} from '../../utils/constants';
import Header from '../Header/Header';
import './ListTalents.scss';
import Loader from "react-loader-spinner";

function ListTalents() {
    const [listTalents, setListTalents] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [score, setScore] = useState(0);
    const [scoreReview, setScoreReview] = useState(0);
    const [review, setReview] = useState('');
    const [reviewReview, setReviewReview] = useState('');
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
                                    talent.status === 'accept'
                                        ? <Button variant="primary" onClick={() => handleOpenModal(talent?.id_talent)}>評価</Button>
                                        : talent.status === 'review'
                                        ? <Button variant="primary"
                                                  style={{height:34, width:130}}
                                                  onClick={() => handleOpenModalReview(talent?.score, talent?.review)}
                                        >評価を見る</Button>
                                        : null
                                }
                                <Link
                                    to={{
                                        pathname: `detail-talent/${talent.id_talent}`,
                                        idPost: id,
                                    }}
                                    className={`status--${talent.status}`}
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
