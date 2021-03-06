import {useState, useEffect} from 'react';
import {getPostById} from '../../Services/PostService';
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
} from "react-bootstrap";
function DetailModal(props) {
    const [currentPost, setCurrentPost] = useState();
    useEffect(() =>{
        async function fetchData() {
            const post = await getPostById(props.id);
            setCurrentPost(post);
        }
        fetchData();
    },[props.id])

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={props.detail}
            centered
            onHide={props.handleCloseDetailModal}
            scrollable
            className="modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    詳細
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label style={{ color: 'dodgerblue' }}>
                                タイトル
                            </Form.Label>
                            <p>{currentPost?.title}</p>
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="title">
                            <Form.Label style={{ color: 'dodgerblue' }}>
                                会社名
                            </Form.Label>
                            <p>{currentPost.company ? currentPost.company.name : '未登録'}</p>
                        </Form.Group> */}

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label style={{ color: 'dodgerblue' }}>
                                説明
                            </Form.Label>
                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                {currentPost?.des}
                            </p>
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default DetailModal;
