import React, { useEffect, useState } from "react";
import {Container, Row, Col } from "react-bootstrap";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import { getProfile } from '../Services/ProfileService'

import Sidebar from '../components/talent/sidebar'
import TalentProfile from '../components/talent/talent-profile';
import TalentPost from '../components/talent/talent-post';
import TalentMeeting from '../components/talent/talent-meeting';

function Talent() {
    let { path } = useRouteMatch();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const id = localStorage.getItem('id');
        const role = localStorage.getItem('role');
        async function fetchData() {
            const data = await getProfile(id, role);
            setProfile({...data});
        }

        fetchData();
    }, [])

    return (
        <Container fluid>
            <Row style={{backgroundColor: '#E5E5E5'}}>
                <Col lg='2'
                    style={{paddingLeft: '0'}}
                    // style={{paddingLeft: '0', height: '100vh', width: '190px'}}
                >
                    <Sidebar />
                </Col>
                <Col lg='10' className='talent-right'>
                    <Switch>
                        <Route path={path} exact ><TalentProfile profile={profile} /></Route>
                        <Route path={`${path}/posts`} exact ><TalentPost profile={profile} /></Route>
                        <Route path ={`${path}/list-meeting`} exact><TalentMeeting profile={profile} /></Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
    )
}

export default Talent;
