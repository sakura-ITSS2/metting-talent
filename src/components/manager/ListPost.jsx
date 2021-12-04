import {useState, useEffect} from 'react';
import {getListPosts, createPost} from '../../Services/PostService';
import {useHistory} from 'react-router-dom';
import Header from '../Header/Header';
import './ListPost.scss';
import default_post from '../../images/default-post.jpeg';
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
} from "react-bootstrap";

function ListPost() {
    const history = useHistory();
    const [listPost, setListPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [create, setCreate] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() =>{
        const id = localStorage.getItem('id');
        async function fetchData() {
            const posts = await getListPosts(id);
            setListPost(posts);
            setIsLoading(true);
        }
        fetchData();
    },[])

    const handleCloseModal = () => {
        setCreate(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = localStorage.getItem('id');
        const newPost = await createPost(description, title, id);
        handleCloseModal();
        setListPost([...listPost, newPost]);
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeDescription = (event) =>{
        setDescription(event.target.value);
    }

    console.log(title,description)

    return(
        <div className="wrapper">
            <Header />
            <div className="listPost">
                <div className="btn">
                    <button type="button" onClick={() => setCreate(true)}>Create</button>
                </div>
                <div className="posts">
                    {
                        isLoading && listPost.map(post =>{
                            return(
                                <div className="post">
                                    <img className="defaultpost" src={default_post}/>
                                    <div className="post-body">
                                        <div className="title" style = {{cursor:'pointer'}} onClick = {() => history.push('manager/listTalent/'+post.id)}>{post.title}</div>
                                        <div className="description">Description: {post.des}</div>
                                        <div className="apply">Applied: {post.numberApplied}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                show={create}
                centered
                onHide={handleCloseModal}
                scrollable
                className='modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        投稿作成
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form onSubmit={handleSubmit}>
                            
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>タイトル</Form.Label>
                                <Form.Control type="text" value={title} onChange={handleChangeTitle} placeholder="タイトルを入力します" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>説明</Form.Label>
                                <Form.Control type="text" value={description} onChange={handleChangeDescription} placeholder="説明を入力します" />
                            </Form.Group>

                            <Row className='justify-content-md-center'>
                                <Col md='2'>
                                    <Button style={{width: '80%'}} variant="primary" type="submit" >
                                        作成
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

export default ListPost;