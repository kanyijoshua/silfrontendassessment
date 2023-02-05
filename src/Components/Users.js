import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import axios from "axios";


function Users() {

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState({});
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);
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

    const handleClose = () => setShow(false);
    const handleShow = user => {
        setSelectedUser(user);
        setShow(true);
        console.log(user.address.street)
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Albums</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => {
                                let UserAlbums = albums.filter(album => album.userId == user.id).length;
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            <p>{UserAlbums} Album(s)</p>
                                            <Link to={"/UserAlbums/" + user.id}>
                                                View Albums
                                            </Link>
                                        </td>
                                        <td>
                                            {/* <Button variant="primary" onClick={() => handleShow(user)}>
                                                View {user.name} Details
                                            </Button> */}
                                            <Link to={"/User/" + user.id}>
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedUser.name} Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                <strong>Name:</strong> {selectedUser.name}
                            </p>
                            <p>
                                <strong>Username:</strong> {selectedUser.username}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedUser.email}
                            </p>
                            <p>
                                <strong>website:</strong>{selectedUser.website}
                            </p>
                            <p>
                                <strong>Address:</strong> {/* {selectedUser.address.street}, {selectedUser.address.zipCode}, {selectedUser.address.city} */}
                            </p>
                            <p>
                                <strong>Company:</strong> {/* {selectedUser.company.name}, {selectedUser.company.catchPhrase}, {selectedUser.company.bs} */}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )};
        </div>
    );
}

export default Users;