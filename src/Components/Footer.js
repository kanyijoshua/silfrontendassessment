import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark py-3">
            <Container>
                <Row>
                    <Col xs={12} sm={6}>
                        <p className="text-light">
                            &copy; {new Date().getFullYear()} Album Information Site
                        </p>
                    </Col>
                    <Col xs={12} sm={6} className="text-sm-right">
                        <p className="text-light">
                            Designed with <i className="fas fa-heart text-danger"></i> by Kanyi
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;