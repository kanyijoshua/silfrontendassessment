import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
    return (
        <Container>
            <Row className="mt-5 d-flex flex-row">
                <Col xs={12}>
                    <div className="container-fluid bg-light text-dark p-5">
                        <h1 className="display-4">Welcome to User Albums!</h1>
                        <p className="lead">
                            This site showcases a collection of albums from various users.
                        </p>
                        <hr className="my-4" />
                        <p>
                            Check out the collection to find your favorite albums.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
