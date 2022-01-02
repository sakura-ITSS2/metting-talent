import {
    Row,
    Col,
    Card,
    Button,
    Modal,
    Spinner,
    Dropdown,
    DropdownButton
} from "react-bootstrap";
import { useState, useEffect } from 'react';
import { getAllPost } from '../../Services/TalentPostService';
import './talent-meeting.scss'

function ListMeeeting({ profile}) {
    const [listPost, setListPost] = useState([]);
    useEffect(() => {
        async function fetchData() {
            let data = await getAllPost(profile.list_post);
            let posts = data.filter((post) => profile.list_post.includes(post.id))
            console.log(posts)
            setListPost(posts);
        }
        fetchData();
    },[profile])
    return(
        <Row
            xs={1}
            md={3}
            className="g-4"
            style={{ marginRight: '6%' }}
        >
            {listPost.map((post) => (
                <Col key={post.id}>
                    <Card className="post-card">
                        <Card.Img
                            variant="top"
                            src={post.image}
                            className="post-card__image"
                        />
                        <Card.Body>
                            <Row>
                                <Col
                                    className="post-card__title"
                                >
                                    <Card.Title>
                                        {post.title}
                                    </Card.Title>
                                </Col>
                            </Row>
                            <Row className="post-card__description">
                                <Card.Text
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    Status: {post.status}
                                </Card.Text>
                            </Row>
                            <Row className="post-card__description">
                                <Card.Text
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    Time: {post.time ? post.time : 'null' }
                                </Card.Text>
                            </Row>
                            <Row className="post-card__description">
                                <Card.Text
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    MeetingURL: {post.link_meeting ? post.link_meeting : 'null' }
                                </Card.Text>
                            </Row>
                            <Row className="post-card__description">
                                <Card.Text
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    Pass: {post.pass_meeting ? post.pass_meeting : 'null' }
                                </Card.Text>
                            </Row>
                            <Row className="post-card__description">
                                <Card.Text
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    Score: {post.score ? post.score : 'null'}
                                </Card.Text>
                            </Row>
                            <Row className="post-card__description">
                                <Card.Text
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    Review: {post.review ? post.review : 'null'}
                                </Card.Text>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default ListMeeeting;
