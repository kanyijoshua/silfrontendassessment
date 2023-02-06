import './App.css';
import React, { useEffect, useContext, createContext, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Home from './Components/home';
import LoginWithGoogle from './Components/googleLogin';
import Users from './Components/Users';
import Albums from './Components/Albums';
import "bootstrap/dist/css/bootstrap.min.css";
import UserAlbumList from './Components/UserAlbums';
import UserInfo from './Components/UserInformation';
import AlbumInfo from './Components/AlbumInfo';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import ProtectedRoutes from './Components/ProtectedRoutes';


function App() {

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });
  const navigate = useNavigate();

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
            sessionStorage.setItem("profile", JSON.stringify(res.data));
            console.log(res.data);
            navigate('/Users')
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    sessionStorage.removeItem("profile");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light dark-theme bg-light">
        <Link to="/" className="navbar-brand">User(s) Albums</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {
              sessionStorage.getItem("profile") ? (
                <>
                  <li className="nav-item">
                    <Link to="/Users" className="nav-link">Home <small>(users)</small></Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Albums" className="nav-link">Albums</Link>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link">Hello: {JSON.parse(sessionStorage.getItem("profile")).name}</p>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-outline-primary" onClick={() => logOut()}>logOut</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="nav-link btn btn-outline-primary" onClick={() => login()}>Sign in with Google</button>
                </li>
              )
            }
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginWithGoogle />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/Users" element={<Users />} />
          <Route path="/User/:userId" element={<UserInfo />} />
          <Route path="/Albums" element={<Albums />} />
          <Route path="/AlbumInfo/:id" element={<AlbumInfo />} />
          <Route path="/UserAlbums/:userId" element={<UserAlbumList />} />
        </Route>
        
        {/* <Route path="/logout" element={<LoginWithGoogle />} /> */}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />

        {/* <PrivateRoute path="/protected">
            <Home />
          </PrivateRoute> */}
      </Routes>
    </>
  );
}

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
