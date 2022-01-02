import { useState, useEffect } from 'react';
import { getAllPost } from '../../Services/TalentPostService';

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
    return(
        <div>
            {
                listPost.map((post) =>{
                    return(
                        <div>
                            <img src={ post.image } style = {{ width: '50px', height: '50px'}}></img>
                            <div>Title: { post.title }</div>
                            <div>Status: { post.status }</div>
                            <div>Time: {post.time ? post.time : 'null' }</div>
                            <div>MeetingURL: {post.link_meeting ? post.link_meeting : 'null' }</div>
                            <div>Pass: {post.pass_meeting ? post.pass_meeting : 'null' }</div>
                            <div>Score: {post.score ? post.score : 'null' }</div>
                            <div>Review: {post.review ? post.review : 'null' }</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListMeeeting;