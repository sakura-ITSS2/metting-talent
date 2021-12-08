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
import Loader from "react-loader-spinner";

function ListTalents() {
    const [listTalents, setListTalents] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchlistTalents = async (id) => {
            setLoading(true);
            const data = await getListTalents(id);
            const title = await getPostTitle(id);
            if (data) {
                data.sort((talent1, talent2) => {
                    return (
                        new Date(talent1.time || '9999/1/1 10:00') -
                        new Date(talent2.time || '9999/1/1 10:00')
                    );
                });
                setListTalents(data);
            }
            setPostTitle(title);
            setLoading(false);
        };

        fetchlistTalents(id);
    }, [id]);

    return (
        <div className="wrapper">
            <Header />
            <div className="list-talents-container">
                <h2>{postTitle}</h2>
                <div className="list-talents">
                    {loading ? (
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
                    ) : listTalents.length ? (
                        listTalents.map((talent) => (
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
                        ))
                    ) : (
                        <h4>登録したタレントがいません。</h4>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListTalents;
