import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AlbumInfo({ match }) {
  const [album, setAlbum] = useState({});
  const [photo, setPhoto] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`);
      setAlbum(result.data);
      setPhoto(`https://picsum.photos/300/300?album=${result.data.albumId}`);
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    setPhoto(`https://picsum.photos/300/300?album=${event.target.value}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      ...album,
      photo
    });
    setAlbum({ ...album, photo }); 
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setPhoto(`https://picsum.photos/300/300?album=${event.target.value}`);
  };

  return (
    <div>
      {showAlert && (
        <div className="alert alert-success" role="alert">
          The album photo has been updated successfully!
        </div>
      )}
      <div className="card" style={{ width: "38rem" }}>
        <img src={photo} className="card-img-top" alt="album cover" />
        <div className="card-body">
          <h5 className="card-title">{album.title}</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="photo">Photo Id</label>
              <input
                type="number"
                required
                className="form-control"
                id="photo"
                value={album.albumId}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    
  );
}

export default AlbumInfo;