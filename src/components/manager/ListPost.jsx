import {useState, useEffect, useRef} from 'react';
import moment, { locale } from 'moment'
import {getListPosts, createPost,  deletePost} from '../../Services/PostService';
import {useHistory} from 'react-router-dom';
import Sidebar from '../ManagerSidebar/sidebar'
import { uploadAvatar } from '../../Services/ProfileService';
import './ListPost.scss';
import default_post from '../../images/default-post.jpeg';
import DetailModal from './DetailModal';
import EditModal from './EditModal';
import Loader from "react-loader-spinner";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
    Image,
    Spinner,
    Dropdown,
    DropdownButton
} from "react-bootstrap";

function ListPost() {
    const history = useHistory();
    const imageRef = useRef();
    const [listPost, setListPost] = useState([]);
    const [listPostShow, setListPostShow] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [create, setCreate] = useState(false);
    const [detail, setDetail] = useState(false);
    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');
    const [avatar, setAvatar] = useState('');
    const [imgFile, setImgFile] = useState();
    const [currentPost, setCurrentPost] = useState();
    const [invalidImage, setInvalidImage] = useState(false);
    const [invalidTitle, setInvalidTitle] = useState(false);
    const [invalidTarget, setInvalidTarget] = useState(false);

    useEffect(() =>{
        const id = localStorage.getItem('id');
        async function fetchData() {
            setIsLoading(true);
            const posts = await getListPosts(id);
            setListPost(posts);
            setListPostShow(posts);
            console.log(posts);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        }
        fetchData();
    },[])

    const handleCloseModal = () => {
        setCreate(false);
        setTitle('');
        setDescription('');
        setTarget('');
        setInvalidTitle(false);
        setInvalidTarget(false);
        setImgFile();
        setInvalidImage(false);
    }

    const handleCloseDetailModal = () => {
        setDetail(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCreateLoading(true);
        const id = localStorage.getItem('id');
        const formData = new FormData();
        if(!imgFile){
            setInvalidImage(true);
        }
        if (title.length===0) {
            setInvalidTitle(true);
        }

        if (!target) {
            setInvalidTarget(true)
        }
        if(imgFile&&title.length!==0){
            formData.append('image', imgFile);
            const image = await uploadAvatar(formData);
            const newPost = await createPost(description, title, id, image.data.url, target);
            handleCloseModal();
            setListPost([...listPost, newPost]);
            setAvatar('');
            setDescription('');
            setTitle('');
            setTarget('');
            setImgFile();
        }
        setCreateLoading(false);
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
        setInvalidTitle(false);
    }

    const handleChangeDescription = (event) =>{
        setDescription(event.target.value);
    }

    const handleChangeTarget = (event) => {
        setTarget(event.target.value)
        setInvalidTarget(false);
    }

    const handleChangAvatar = () => {
        imageRef.current.click();
    }

    const fileUploadHandle = (event) => {
        setImgFile(event.target.files[0]);
        const file = URL.createObjectURL(event.target.files[0]);
        setAvatar(file);
        setInvalidImage(false);
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
        setDeleteLoading(true);
        await deletePost(postId);
        const id = localStorage.getItem('id');
        const posts = await getListPosts(id);
        setListPost(posts);
        setDeleteLoading(false);
    }

    const status = {
        all: 'すべて',
        self: '自社の求人',
        other: '他社の求人'
    }
    const [filter, setFilter] = useState('all');

    const handleSelect = (e) => {
        setFilter(e);
        setIsLoading(true);
        setListPostShow(
            listPost.filter((p) => {

                return e === 'all' || (e === 'self' && p.isCurrentManager) || (e === 'other' && !p.isCurrentManager) ? true : false;
            })
        );
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }

    return (
        <Container fluid>
            <Row style={{backgroundColor: '#E5E5E5'}}>
                <Col lg='2'
                    style={{paddingLeft: '0'}}
                >
                    <Sidebar />
                </Col>
                <Col lg='10'>
                    <Row>
                        <Col lg='11'>
                            <div className="wrapper">
                                <div className="listPost">
                                    <DropdownButton onSelect={handleSelect} title={status[filter]} className='btn-lg'>
                                        {/* <Dropdown.Item eventKey="all">{status.all}</Dropdown.Item>
                                        <Dropdown.Divider /> */}
                                        <Dropdown.Item eventKey="all">
                                            すべて
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="self">
                                            自社の求人
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="other">
                                            他社の求人
                                        </Dropdown.Item>
                                    </DropdownButton>
                                    <button
                                        className="btn btn-lg btn-success createButton"
                                        type="button"
                                        onClick={() => setCreate(true)}
                                    >
                                        新しい投稿
                                    </button>
                                    <div className="posts">
                                        {isLoading ? (
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
                                        ) : listPost.length ? (
                                            listPostShow.map((post) => {
                                                return (
                                                    <div className="post">
                                                        <img
                                                            className={`defaultpost ${post.isCurrentManager ? 'click' : 'none-click'}`}
                                                            src={
                                                                post.image
                                                                    ? post.image
                                                                    : default_post
                                                            }
                                                            onClick={() => {
                                                                if (post.isCurrentManager)
                                                                    history.push(
                                                                        '/manager/listTalent/' + post.id
                                                                    )
                                                                }
                                                            }
                                                        />
                                                        <div className="post-body">
                                                            <div
                                                                className="title"
                                                                style={{ cursor: `${post.isCurrentManager ? 'pointer' : 'default'}` }}
                                                                onClick={() => {
                                                                    if (post.isCurrentManager)
                                                                        history.push(
                                                                            '/manager/listTalent/' + post.id
                                                                        )
                                                                    }
                                                                }
                                                            >
                                                                {post.title}
                                                            </div>
                                                            <div className="company">
                                                                <span className="text-bold">
                                                                    会社名:
                                                                </span>
                                                                <p
                                                                    style={{
                                                                        whiteSpace: 'pre-wrap',
                                                                    }}
                                                                >
                                                                    {post.company ? post.company.name : '未登録'}
                                                                </p>
                                                            </div>
                                                            <div className="description">
                                                                <span className="text-bold">
                                                                    記述:
                                                                </span>
                                                                <p
                                                                    style={{
                                                                        whiteSpace: 'pre-wrap',
                                                                    }}
                                                                >
                                                                    {post.des}
                                                                </p>
                                                            </div>
                                                            <div className="apply">
                                                                <span className="text-bold">
                                                                    適用数:{' '}
                                                                </span>
                                                                <span>{`${post.numberApplied} / ${post.targetMax ?? '~'}`}</span>
                                                            </div>
                                                            <div className="apply">
                                                                <span className="text-bold">
                                                                    投稿日:{' '}
                                                                </span>
                                                                <span>{post.publish ? post.publish : moment().format('DD/MM/YYYY')}</span>
                                                            </div>

                                                            <div className="buttons">
                                                                <button
                                                                    className="btn seeButton"
                                                                    onClick={() =>
                                                                        handleShowDetail(post.id)
                                                                    }
                                                                >
                                                                    もっと見る
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <h3
                                                style={{
                                                    margin: '20px 8%',
                                                }}
                                            >
                                                求人情報をまだ投稿していません。タレント志望者を見つけるために、新しい投稿を作成してください。
                                            </h3>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg='1' />
                    </Row>
                </Col>
            </Row>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                show={create}
                centered
                onHide={handleCloseModal}
                scrollable
                className="modal"
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
                                <Col md="3" className="profile-card__avatar">
                                    <Image src={avatar} rounded />
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col
                                    md="5"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Form.Text className="text-danger ">
                                        {invalidImage
                                            ? 'イメージをアップロードしてください'
                                            : ''}
                                    </Form.Text>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col
                                    md="3"
                                    className="profile-card__avatar-change"
                                >
                                    <Form.Group
                                        controlId="avatar"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            ref={imageRef}
                                            type="file"
                                            onChange={fileUploadHandle}
                                            hidden
                                        />
                                    </Form.Group>
                                    <span onClick={handleChangAvatar}>
                                        イメージを変更
                                    </span>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>タイトル</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={handleChangeTitle}
                                    placeholder="タイトルを入力します"
                                />
                                <Form.Text className="text-danger">
                                    {invalidTitle
                                        ? 'タイトルを入力してください'
                                        : ''}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="description"
                            >
                                <Form.Label>説明</Form.Label>
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    rows={5}
                                    value={description}
                                    onChange={handleChangeDescription}
                                    placeholder="説明を入力します"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="targetMax">
                                <Form.Label>応募者数制限</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={target}
                                    onChange={handleChangeTarget}
                                    placeholder="応募者数制限を入力します"
                                    min='1'
                                />
                                <Form.Text className="text-danger">
                                    {invalidTarget
                                        ? '応募者数制限を入力してください'
                                        : ''}
                                </Form.Text>
                            </Form.Group>

                            <Row className="justify-content-md-center">
                                <Col md="2">
                                    <Button
                                        style={{ width: '80%' }}
                                        variant="primary"
                                        type="submit"
                                        disabled={createLoading}
                                    >
                                        {createLoading ? (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            '作成'
                                        )}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            <DetailModal
                detail={detail}
                id={currentPost}
                handleCloseDetailModal={handleCloseDetailModal}
            />
            <EditModal
                show={edit}
                id={currentPost}
                handleCloseEditModal={handleCloseEditModal}
                setListPost={setListPost}
            />
        </Container>
    );
}

export default ListPost;
