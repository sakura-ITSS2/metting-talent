import {
    Row,
    Col,
    Image,
    Card,
    Button,
    Modal,
    Spinner,
    Dropdown,
    DropdownButton
} from "react-bootstrap";
import { useState, useEffect } from 'react';
import { getAllPost } from '../../Services/TalentPostService';
import { Link, useParams } from 'react-router-dom';
import {
    STATUS_ACCEPT,
    STATUS_DECLINE,
    STATUS_PENDING,
    STATUS_REVIEW,
} from '../../utils/constants';
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
    console.log(listPost);
    return(
        <div className="wrapper">
            <div className="list-post-container">
                <div className="list-post">
                    {listPost.map((post) => {
                        return(
                            <div className="post-item" key={post.id}>
                                <Link className="profile">
                                    <Image
                                        src={post.image}
                                        roundedCircle
                                    />
                                </Link>

                                <h5 className="post-title"> {post.title} </h5>
                                <div className="post-detail">
                                    {post.status === 'accept' && (
                                        <div className="link-meeting">
                                            <p>
                                                ミーティングURL：
                                                <a
                                                    href={post.link_meeting ? post.link_meeting : 'null' }
                                                    target="_blank"
                                                >
                                                    {post.link_meeting ? post.link_meeting : 'null' }
                                                </a>
                                            </p>
                                            <p>パスワード：{post.pass_meeting ? post.pass_meeting : 'null'}</p>
                                            <p>日時：{post.time ? post.time : 'null'}</p>
                                        </div>
                                    )}
                                    {
                                        post.status === 'review' && (
                                            <div>
                                                <p>スコア: {post.score ? post.score : 'null'}</p>
                                                <p>
                                                    Review: {post.review ? post.review: 'null'}</p>
                                            </div>
                                    )}
                                </div>
                                <div className="status-button">
                                    <Button  className="status--${post.status}"
                                        style={{ whiteSpace: 'pre-wrap'}}
                                        >
                                            状態:
                                            {post.status === 'accept'
                                                ? STATUS_ACCEPT
                                                : post.status === 'decline'
                                                ? STATUS_DECLINE
                                                : post.status === 'review'
                                                ? STATUS_REVIEW
                                                : STATUS_PENDING}
                                    </Button>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ListMeeeting;
