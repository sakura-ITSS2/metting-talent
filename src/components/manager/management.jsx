import { useState, useRef, useEffect } from 'react'
// import validator from 'validator';
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    Modal,
    Form,
    Spinner
} from "react-bootstrap";
import Sidebar from '../ManagerSidebar/sidebar'
import Header from '../Header/Header';

const Management = () => {
    return (
        <Container fluid>
            <Row style={{backgroundColor: '#E5E5E5', height: '100vh'}}>
                <Header />
                <Col lg='2'
                    style={{paddingLeft: '0'}}
                >
                    <Sidebar />
                </Col>
                <Col lg='10'>
                    <div className='manager-management'>
                        <Row className='justify-content-md-center' style={{height: '100%', verticalAlign: 'center'}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, minus itaque mollitia velit qui repellendus. Amet ex ad, laudantium ipsum laboriosam iste vero dolorem earum ipsa totam! Corporis, numquam et!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, minus itaque mollitia velit qui repellendus. Amet ex ad, laudantium ipsum laboriosam iste vero dolorem earum ipsa totam! Corporis, numquam et!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, minus itaque mollitia velit qui repellendus. Amet ex ad, laudantium ipsum laboriosam iste vero dolorem earum ipsa totam! Corporis, numquam et!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, minus itaque mollitia velit qui repellendus. Amet ex ad, laudantium ipsum laboriosam iste vero dolorem earum ipsa totam! Corporis, numquam et!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, minus itaque mollitia velit qui repellendus. Amet ex ad, laudantium ipsum laboriosam iste vero dolorem earum ipsa totam! Corporis, numquam et!
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Management;
