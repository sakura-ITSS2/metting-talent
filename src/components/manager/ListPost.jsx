import {useState, useEffect} from 'react';
import {getListPosts} from '../../Services/PostService';
import {useHistory} from 'react-router-dom';

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
        <div className="listPost">
            <button type="button">Create post</button>
            {
                isLoading && listPost.map(post =>{
                    return(
                        <div className="post" style = {{borderStyle: 'solid'}}>
                            <div className="title" style = {{cursor:'pointer'}} onClick = {() => history.push('/listTalent/'+post.id)}>Title: {post.title}</div>
                            <div className="description">Description: {post.des}</div>
                            <div className="apply">Applied: {post.numberApplied}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListPost;