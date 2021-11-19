import React from "react";
import {Container, Row, Col } from "react-bootstrap";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import 'react-pro-sidebar/dist/css/styles.css';

import Sidebar from '../components/talent/sidebar'
import TalentProfile from '../components/talent/talent-profile';
import TalentPost from '../components/talent/talent-post';

function Talent() {
    let { path } = useRouteMatch();

    return (
        <Container fluid>
            <Row style={{backgroundColor: '#E5E5E5'}}>
                <Col lg='2' style={{paddingLeft: '0', height: '100vh'}} >
                    <Sidebar />
                </Col>
                <Col lg='10'>
                    <Switch>
                        <Route path={path} exact component={TalentProfile} />
                        <Route path={`${path}/posts`} exact component={TalentPost} />
                    </Switch>
                </Col>
            </Row>
        </Container>
    )
}

export default Talent;
