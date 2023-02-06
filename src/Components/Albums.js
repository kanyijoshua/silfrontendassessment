import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState({});
    const [photoLoading, setPhotoLoading] = useState(false);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/albums")
            .then((response) => {
                setAlbums(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleClose = () => setShowModal(false);
    const handleShow = (album) => {
        setSelectedAlbum(album);
        setShowModal(true);
        setPhotoLoading(true);
        const img = new Image();
        img.src = `https://picsum.photos/300/300?album=${album.id}`;
        img.onload = () => setPhotoLoading(false);
    };

    return (
        <Container>
            {loading ? (
                <Row className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only"></span>
                    </Spinner>
                </Row>
            ) : (
                <>
                    <h3> Album List</h3>
                    <Row>
                        {albums.map((album) => (
                            <Col key={album.id} xs={12} md={4}>
                                <div className="card">
                                    <div className="card-body">
                                        <img
                                            src={`https://picsum.photos/25/25?album=${album.id}`}
                                            alt={selectedAlbum.title}
                                            className="img-fluid"
                                        />
                                        <h5 className="card-title">{album.title}</h5>
                                        <Link className="btn btn-info" to={"/AlbumInfo/" + album.id}>Album Details</Link>
                                        <Button onClick={() => handleShow(album)}>
                                            Full Photo Album  
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </>
            )}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedAlbum.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {photoLoading ? (
                        <Row className="d-flex justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="sr-only"></span>
                            </Spinner>
                        </Row>
                    ) : (
                        <img
                            src={`https://picsum.photos/300/300?album=${selectedAlbum.id}`}
                            alt={selectedAlbum.title}
                            className="img-fluid"
                        />
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Albums;