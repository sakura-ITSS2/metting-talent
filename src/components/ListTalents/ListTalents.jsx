import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../images/default-avatar.png';
import { getListTalents } from '../../Services/PostService';
import {
    STATUS_ACCEPT,
    STATUS_DECLINE,
    STATUS_PENDING,
} from '../../utils/constants';
import Header from '../Header/Header';
import './ListTalents.scss';

function ListTalents(props) {
    const [listTalents, setListTalents] = useState([]);
    const id = 'p1';

    useEffect(() => {
        const fetchlistTalents = async (id) => {
            const data = await getListTalents(id);
            setListTalents(data);
        };

        fetchlistTalents(id);
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="list-talents-container">
                <h2>{id}</h2>
                <div className="list-talents">
                    {listTalents.map((talent) => (
                        <div className="talent-item" key={talent.id_talent}>
                            <Link
                                to={`detail-talent/${talent.id_talent}`}
                                className="profile"
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
                                to={`detail-talent/${talent.id_talent}`}
                                className={`status--${talent.status}`}
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
