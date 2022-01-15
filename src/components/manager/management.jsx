import {useState, useEffect, useRef} from 'react';
import moment, { locale } from 'moment'
import {getListPostsId, createPost,  deletePost} from '../../Services/PostService';
import {useHistory} from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../ManagerSidebar/sidebar'
import { uploadAvatar } from '../../Services/ProfileService';
import { getUserPostById } from '../../Services/TalentPostService';
import './management.scss';
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
    Spinner
} from "react-bootstrap";

import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function Management() {
    const history = useHistory();
    const imageRef = useRef();
    const [listPost, setListPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [create, setCreate] = useState(false);
    const [detail, setDetail] = useState(false);
    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [avatar, setAvatar] = useState('');
    const [imgFile, setImgFile] = useState();
    const [currentPost, setCurrentPost] = useState();
    const [invalidImage, setInvalidImage] = useState(false);
    const [invalidTitle, setInvalidTitle] = useState(false);
    const [userPost, setUserPost] = useState();


    useEffect(() =>{
        const id = localStorage.getItem('id');
        async function fetchData() {
            setIsLoading(true);
            const posts = await getListPostsId(id);
            setListPost(posts);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
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
        setCreateLoading(true);
        const id = localStorage.getItem('id');
        const formData = new FormData();
        if(!imgFile){
            setInvalidImage(true);
        }
        if (title.length===0) {
            setInvalidTitle(true);
        }
        if(imgFile&&title.length!==0){
            formData.append('image', imgFile);
            const image = await uploadAvatar(formData);
            const newPost = await createPost(description, title, id, image.data.url);
            handleCloseModal();
            setListPost([...listPost, newPost]);
            setAvatar('');
            setDescription('');
            setTitle('');
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
        const posts = await getListPostsId(id);
        setListPost(posts);
        setDeleteLoading(false);
    }

    const renderBar = (postId) => {
        if(userPost){
            let pending=0
            let accepted=0
            let rejected =0
            let review =0
            for (let i=0; i<userPost[postId]?.length; i++) {
                if (userPost[postId][i].status === 'pending') pending += 1
                if (userPost[postId][i].status === 'decline')  rejected += 1
                if (userPost[postId][i].status === 'accept') accepted += 1
                if (userPost[postId][i].status === 'review') review += 1
            }
            return  <Bar
            data={{
              labels: [
               "ペンディング",
               "承認",
               "リジェクト",
               "面接済",
              ],
              datasets: [
                {
                  label: [''],
                  backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "red"
                  ],
                  data: [pending, accepted, rejected, review]
                }
              ]
            }}
            options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: '求人投稿を分析するグラフ',
                  },
                }
            }}
          />
        }

    }
    const renderScoreBar = (postId) => {
        if(userPost){
            const labels = ['1','2','3','4','5','6','7','8','9', '10']
            const data = [0,0,0,0,0,0,0,0,0,0]
            for (let i=0; i<userPost[postId]?.length; i++) {
                if (userPost[postId][i].score === '1') data[0] +=1
                if (userPost[postId][i].score === '2') data[1] +=1
                if (userPost[postId][i].score === '3') data[2] +=1
                if (userPost[postId][i].score === '4') data[3] +=1
                if (userPost[postId][i].score === '5') data[4] +=1
                if (userPost[postId][i].score === '6') data[5] +=1
                if (userPost[postId][i].score === '7') data[6] +=1
                if (userPost[postId][i].score === '8') data[7] +=1
                if (userPost[postId][i].score === '9') data[8] +=1
                if (userPost[postId][i].score === '10') data[9] +=1
            }
            return  <Bar
            data={{
              labels:labels,
              datasets: [
                {
                  label: 'Score',
                  data: data,
                }
              ]
            }}
            options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'スコア',
                  },
                }
            }}
          />
        }

    }
    useEffect(() => {
        async function fetchData() {
            const userPost = await getUserPostById();
            setUserPost(userPost);
        }
        fetchData();
    }, [])

    return (
        <Container fluid>
            <Row style={{backgroundColor: '#E5E5E5', height: '100vh'}}>
                <Col lg='2'
                    style={{paddingLeft: '0'}}
                >
                    <Sidebar />
                </Col>
                <Col lg='10'>
                    <Row>
                        <Col lg='12'>
                            <div className="wrapper__list-talent">
                                <div className="listPost">
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
                                            listPost.map((post) => {
                                                return (
                                                    <Container fluid>
                                                    <Row>
                                                        <Col lg='4' style={{
                                                            marginTop: 'auto',
                                                            marginBottom: 'auto'
                                                        }}>
                                                            <div className="post">
                                                                <img
                                                                    className="defaultpost"
                                                                    src={
                                                                        post.image
                                                                            ? post.image
                                                                            : default_post
                                                                    }
                                                                />
                                                                <div className="post-body">
                                                                    <div
                                                                        className="title"
                                                                    >
                                                                        {post.title}
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
                                                                            className="btn editButton"
                                                                            onClick={() =>
                                                                                handleEdit(post.id)
                                                                            }
                                                                        >
                                                                            編集
                                                                        </button>
                                                                        <button
                                                                            className="btn seeButton"
                                                                            onClick={() =>
                                                                                handleShowDetail(post.id)
                                                                            }
                                                                        >
                                                                            もっと見る
                                                                        </button>
                                                                        <button
                                                                            className="btn deleteButton"
                                                                            onClick={() => {
                                                                                if (
                                                                                    window.confirm(
                                                                                        `「${post.title}」が削除したいですか？`
                                                                                    )
                                                                                )
                                                                                    handleDelete(post.id);
                                                                            }}
                                                                        >
                                                                            削除
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-success adoptButton"
                                                                            onClick={() =>
                                                                                history.push(
                                                                                    '/manager/listTalent/' + post.id
                                                                                )
                                                                            }
                                                                        >
                                                                            採用管理
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg='1'>
                                                        </Col>
                                                        <Col lg='6'>
                                                            <div className="scoreChart">
                                                                <Row>
                                                                    {renderBar(post.id)}
                                                                </Row>
                                                                <Row>
                                                                    {renderScoreBar(post.id)}
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                      </Row>
                                                      <hr />
                                                    </Container>
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

export default Management;
