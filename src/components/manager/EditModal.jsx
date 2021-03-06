import {useState, useEffect, useRef} from 'react';
import {getPostById, updatePost, getListPosts} from '../../Services/PostService';
import { uploadAvatar } from '../../Services/ProfileService';
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
    Image,
    Spinner
} from "react-bootstrap";
function EditModal(props){
    const [post, setPost] = useState();
    const [imgFile, setImgFile] = useState();
    const [loading, setLoading] = useState(false);
    const imageRef = useRef();


    useEffect(() =>{
        async function fetchData() {
            const getPost = await getPostById(props.id);
            setPost(getPost);
        }
        fetchData();
    }, [props.id])

    const handleChangeImage = () => {
        imageRef.current.click();
    }

    const fileUploadHandle = (event) => {
        setImgFile(event.target.files[0]);
        const file = URL.createObjectURL(event.target.files[0]);
        setPost({...post, image: file});
    }

    const handleChangeTitle = (event) => {
        setPost({...post, title: event.target.value});
    }

    const handleChangeDescription = (event) => {
        setPost({...post, des: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if(imgFile){
            const formData = new FormData();
            formData.append('image', imgFile);
            const image = await uploadAvatar(formData);
            await updatePost(post.id, {...post, image: image.data.url, des: post.des, title: post.title});
            const id = localStorage.getItem('id');
            const posts = await getListPosts(id);
            props.setListPost(posts);
            props.handleCloseEditModal();
        }else{
            await updatePost(post.id, {...post, des: post.des, title: post.title});
            const id = localStorage.getItem('id');
            const posts = await getListPosts(id);
            props.setListPost(posts);
            props.handleCloseEditModal();
        }
        setLoading(false);
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={props.show}
            centered
            onHide={props.handleCloseEditModal}
            scrollable
            className="modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ????????????
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-md-center">
                            <Col md="3" className="profile-card__avatar">
                                <Image
                                    src={post?.image ? post.image : ''}
                                    rounded
                                />
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md="3" className="profile-card__avatar-change">
                                <Form.Group controlId="avatar" className="mb-3">
                                    <Form.Control
                                        ref={imageRef}
                                        type="file"
                                        onChange={fileUploadHandle}
                                        hidden
                                    />
                                </Form.Group>
                                <span onClick={handleChangeImage}>
                                    ?????????????????????
                                </span>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>????????????</Form.Label>
                            <Form.Control
                                type="text"
                                value={post?.title}
                                onChange={handleChangeTitle}
                                placeholder="??????????????????????????????"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>??????</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                rows={5}
                                value={post?.des}
                                onChange={handleChangeDescription}
                                placeholder="????????????????????????"
                            />
                        </Form.Group>

                        <Row className="justify-content-md-center">
                            <Col md="2">
                                <Button
                                    style={{ width: '80%' }}
                                    variant="primary"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        '??????'
                                    )}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default EditModal;
