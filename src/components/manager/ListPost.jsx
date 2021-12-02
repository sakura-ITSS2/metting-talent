import {useState, useEffect} from 'react';
import {getListPosts} from '../../Services/PostService';
import {useHistory} from 'react-router-dom';
import Header from '../Header/Header';
import './ListPost.scss';
import default_post from '../../images/default-post.jpeg';

function ListPost() {
    const history = useHistory();
    const [listPost, setListPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        const id = localStorage.getItem('id');
        async function fetchData() {
            const posts = await getListPosts(id);
            console.log("??",posts);
            setListPost(posts);
            setIsLoading(true);
        }
        fetchData();
    },[])

    return(
        <div className="wrapper">
            <Header />
            <div className="listPost">
                <div className="btn">
                    <button type="button">Create post</button>
                </div>
                <div className="posts">
                    {
                        isLoading && listPost.map(post =>{
                            return(
                                <div className="post">
                                    <img className="defaultpost" src={default_post}/>
                                    <div className="post-body">
                                        <div className="title" style = {{cursor:'pointer'}} onClick = {() => history.push('/listTalent/'+post.id)}>{post.title}</div>
                                        <div className="description">Description: {post.des}</div>
                                        <div className="apply">Applied: {post.numberApplied}</div>
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

export default ListPost;