import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import defaultAvatar from '../../images/default-avatar.png';
import { getListTalents, getPostTitle } from '../../Services/PostService';
import {
    STATUS_ACCEPT,
    STATUS_DECLINE,
    STATUS_PENDING,
} from '../../utils/constants';
import Header from '../Header/Header';
import './ListTalents.scss';

function ListTalents(props) {
    const [listTalents, setListTalents] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchlistTalents = async (id) => {
            const data = await getListTalents(id);
            const title = await getPostTitle(id);
            if (data) {
                setListTalents(data);
            }
            setPostTitle(title);
        };

        fetchlistTalents(id);
    }, [id]);

    return (
        <div className="wrapper">
            <Header />
            <div className="list-talents-container">
                <h2>{postTitle}</h2>
                <div className="list-talents">
                    {listTalents?.map((talent) => (
                        <div className="talent-item" key={talent.id_talent}>
                            <Link
                                to={{
                                    pathname: `detail-talent/${talent.id_talent}`,
                                    idPost: id,
                                }}
                                className="profile"
                                params={{ idPost: id }}
                            >
                                <Image
                                    src={talent.avt || defaultAvatar}
                                    roundedCircle
                                />
                                <p>{talent.name}</p>
                            </Link>
                            {talent.status === 'accept' && (
                                <div className="link-meeting">
                                    <p>
                                        ミーティングURL：
                                        <a
                                            href={talent.link_meeting}
                                            target="_blank"
                                        >
                                            {talent.link_meeting}
                                        </a>
                                    </p>
                                    <p>パスワード：{talent.pass_meeting}</p>
                                    <p>日時：{talent.time}</p>
                                </div>
                            )}
                            <Link
                                to={{
                                    pathname: `detail-talent/${talent.id_talent}`,
                                    idPost: id,
                                }}
                                className={`status--${talent.status}`}
                                params={{ idPost: id }}
                            >
                                {talent.status === 'accept'
                                    ? STATUS_ACCEPT
                                    : talent.status === 'decline'
                                    ? STATUS_DECLINE
                                    : STATUS_PENDING}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListTalents;
