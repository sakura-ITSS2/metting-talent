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
import { getAllPost, sendRequestPost } from '../../Services/TalentPostService';
import Loader from "react-loader-spinner";
import DefaultPost from './default-post.jpeg'
import './talent-post.scss'

const status = {
    all: 'すべて',
    pending: 'ペンディング',
    accept: '承認',
    decline: 'リジェクト'
}

const DetailsPopup = ({...props}) => {
    const {data, handleClosePopup, registerPost, updatePosts} = props;
    const [loading, setLoading] = useState(false);

    const handleRequest = async () => {
        setLoading(true);
        await sendRequestPost(data.id);
        registerPost.push(data.id);
        setLoading(false);
        handleClosePopup();
        const listPost = await getAllPost(registerPost);
        updatePosts(listPost);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
            onHide={props.handleClosePopup}
        >
            <Modal.Header closeButton>
                <Col>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {data.title}
                    </Modal.Title>
                </Col>
                {
                    data.status ?
                    (<Col md='2' className='modal-detail__status'>
                        <span className={`modal-detail__status-${data.status}`}>{status[data.status]}</span>
                    </Col>)
                    :
                    null
                }
            </Modal.Header>
            <Modal.Body>
                <h4>記述</h4>
                <Row>
                    <p>
                        {data.des}
                    </p>
                    {
                        data.link_meeting ?
                        (
                            <>
                                <p>会議リンク: <a href={data.link_meeting} target="_blank" rel="noopener noreferrer">{data.link_meeting}</a></p>
                                <p>時間: {data.time}</p>
                                <p>パスワード：{data.pass_meeting}</p>
                            </>
                        )
                        :
                        null
                    }
                </Row>
                <Row className='justify-content-md-center'>
                    <Col md='2'>
                        {
                            data.status === 'accept' || data.status === 'pending' ?
                            <Button variant='success' type="submit" disabled>
                                受け入れた
                            </Button>
                            : null
                        }
                        {
                            data.status === 'decline' ?
                            <Button variant='dark' type="submit" disabled>
                                受け入れる
                            </Button>
                            : null
                        }
                        {
                            !data.status ?
                                <Button type="submit"　onClick={handleRequest} disabled={loading} style={{width: '110px'}}>
                                    {
                                        loading ?
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : '受け入れる'
                                    }
                                </Button>
                                :
                                null
                        }
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

function TalentPost({profile}) {
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postsShow, setPostsShow] = useState([])
    const [dataDetail, setDataDetail] = useState({});
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getAllPost(profile.list_post);
            setPosts([...data]);
            setPostsShow([...data]);
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }

        fetchData();
    }, [profile])

    const handleClosePopup = () => {
        setShow(!show);
    }

    const handleShowDetail = (data) => {
        handleClosePopup();
        setDataDetail({...data});
    }

    const updatePosts = (listPost) => {
        setPosts([...listPost]);
        setPostsShow(listPost.filter(p => {
            return filter === 'all' || p.status === filter ?
                true : false;
        }));
    }

    const handleSelect = (e) => {
        setFilter(e);
        setLoading(true);
        setPostsShow(posts.filter(p => {
            return e === 'all' || p.status === e ?
                true : false;
        }));
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }

    return (
        <div className='talent-post'>
            <Row className='filter'>
                <DropdownButton onSelect={handleSelect}  title={status[filter]}>
                    <Dropdown.Item eventKey="all">{status.all}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="accept">{status.accept}</Dropdown.Item>
                    <Dropdown.Item eventKey="pending">{status.pending}</Dropdown.Item>
                    <Dropdown.Item eventKey="decline">{status.decline}</Dropdown.Item>
                </DropdownButton>
            </Row>
            {
                loading ?
                    <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '55%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                    :
                    (
                        postsShow.length ?
                            (
                                <Row xs={1} md={3} className="g-4" style={{marginRight: '6%'}}>
                                    {postsShow.map((post) => (
                                        <Col key={post.id}>
                                            <Card className='post-card'>
                                                <Card.Img variant="top" src={post.image ? post.image : DefaultPost} className='post-card__image' />
                                                <Card.Body>
                                                    <Row>
                                                        <Col md={post.status ? '7' : '12'} className='post-card__title'>
                                                            <Card.Title>{post.title}</Card.Title>
                                                        </Col>
                                                        {
                                                            post.status ?
                                                            (<Col md='5' className='post-card__status'>
                                                                <span className={`post-card__status-${post.status}`}>{status[post.status]}</span>
                                                            </Col>)
                                                            :
                                                            null
                                                        }
                                                    </Row>
                                                    <Row className='post-card__description'>
                                                        <span>記述</span>
                                                        <Card.Text>
                                                            {post.des}
                                                        </Card.Text>
                                                    </Row>
                                                    <Row>

                                                    </Row>
                                                    <Row className='justify-content-md-center' style={{marginTop: '15px'}}>
                                                        <Col md='6' className='post-card__button'>
                                                            <Button onClick={() => handleShowDetail(post)} >もっと見せる</Button>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            )
                            :
                            `${status[filter]}した求人情報がありません。`
                    )
            }
            <DetailsPopup
                show={show}
                handleClosePopup={handleClosePopup}
                data={dataDetail}
                registerPost={profile.list_post}
                updatePosts={updatePosts}
            />
        </div>
    )
}

export default TalentPost;
