import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function UserInfo({ match }) {
    const [user, setUser] = useState({});
    let { userId } = useParams();
    const [albums, setAlbums] = useState([]);

    //fetch user information
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setUser(result.data);
        };
        fetchData();
    }, [userId]);

    //fetch user Albums
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
            setAlbums(result.data);
        };
        fetchData();
    }, [userId])

    return (
        <div className="card" style={{ width: "90rem", textAlign:"center" }}>
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p>
                    <strong>Username:</strong> {user.username}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>website:</strong>{user.website}
                </p>
                <p>
                    <strong>Address:</strong> {user?.address?.street}, {user?.address?.zipCode}, {user?.address?.city}
                </p>
                <p>
                    <strong>Company:</strong> {user?.company?.name}, {user?.company?.catchPhrase}, {user?.company?.bs}
                </p>
            </div>
            <div>
                <h2>User Album(s)</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Album Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albums.map((album) => (
                            <tr key={album.id}>
                                <td>{album.id}</td>
                                <td>
                                    <Link to={`/AlbumInfo/${album.id}`}>{album.title}</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserInfo;