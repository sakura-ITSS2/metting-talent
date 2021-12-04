import {useState, useEffect, useRef} from 'react';
import {getListPosts, createPost,  deletePost} from '../../Services/PostService';
import {useHistory} from 'react-router-dom';
import Header from '../Header/Header';
import { uploadAvatar } from '../../Services/ProfileService';
import './ListPost.scss';
import default_post from '../../images/default-post.jpeg';
import DetailModal from './DetailModal';
import EditModal from './EditModal';
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
    Image
} from "react-bootstrap";

function ListPost() {
    const history = useHistory();
    const imageRef = useRef();
    const [listPost, setListPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [create, setCreate] = useState(false);
    const [detail, setDetail] = useState(false);
    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [avatar, setAvatar] = useState('');
    const [imgFile, setImgFile] = useState();
    const [currentPost, setCurrentPost] = useState();

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

    const handleCloseDetailModal = () => {
        setDetail(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = localStorage.getItem('id');
        const formData = new FormData();
        formData.append('image', imgFile);
        const image = await uploadAvatar(formData);
        const newPost = await createPost(description, title, id, image.data.url);
        handleCloseModal();
        setListPost([...listPost, newPost]);
        setAvatar('');
        setDescription('');
        setTitle('');
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeDescription = (event) =>{
        setDescription(event.target.value);
    }

    const handleChangAvatar = () => {
        imageRef.current.click();
    }

    const fileUploadHandle = (event) => {
        setImgFile(event.target.files[0]);
        const file = URL.createObjectURL(event.target.files[0]);
        setAvatar(file);
    }

    const handleShowDetail= (id) => {
        setCurrentPost(id);
        setDetail(true);
    }

    const handleEdit = (id) => {
        setCurrentPost(id);
        setEdit(true);
    }

    const handleCloseEditModal = () => {
        setEdit(false);
    }

    const handleDelete = async (postId) => {
        await deletePost(postId);
        const id = localStorage.getItem('id');
        const posts = await getListPosts(id);
            setListPost(posts);
    }

    return(
        <div className="wrapper">
            <Header />
            <div className="listPost">
                <button className="createButton" type="button" onClick={() => setCreate(true)}>新しい投稿</button>
                <div className="posts">
                    {
                        isLoading && listPost.map(post =>{
                            return(
                                <div className="post">
                                    <img className="defaultpost" src={post.image?post.image:default_post}/>
                                    <div className="post-body">
                                        <div className="title" style = {{cursor:'pointer'}} onClick = {() => history.push('manager/listTalent/'+post.id)}>{post.title}</div>
                                        <div className="description">記述: {post.des}</div>
                                        <div className="apply">Applied: {post.numberApplied}</div>
                                        <div className="buttons">
                                            <button className="seeButton" onClick={() =>handleShowDetail(post.id)}>もっと見せる</button>
                                            <button className="editButton" onClick={() =>handleEdit(post.id)}>編集</button>
                                            <button className="deleteButton" onClick={() =>handleDelete(post.id)}>削除</button>
                                        </div>
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
                            <Row className="justify-content-md-center">
                                <Col md='3' className='profile-card__avatar'>
                                    <Image src={avatar} rounded />
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md='3' className='profile-card__avatar-change'>
                                    <Form.Group controlId="avatar" className="mb-3">
                                        <Form.Control ref={imageRef} type="file" onChange={fileUploadHandle} hidden />
                                    </Form.Group>
                                    <span onClick={handleChangAvatar}>イメージを変更</span>
                                </Col>
                            </Row>
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
            <DetailModal detail = {detail} id = {currentPost} handleCloseDetailModal = {handleCloseDetailModal} />
            <EditModal show = {edit} id = {currentPost} handleCloseEditModal = {handleCloseEditModal} setListPost = {setListPost}/>
        </div>
        
    )
}

export default ListPost;