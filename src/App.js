import logo from './logo.svg';
import './App.css';
import React, { useContext, createContext,  useState } from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./LandingPage.css";
import Home from './Components/home';
import LoginWithGoogle from './Components/googleLogin';
import Users from './Components/Users';
import Albums from './Components/Albums';
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import UserAlbumList from './Components/UserAlbums';
import UserInfo from './Components/UserInformation';
import AlbumInfo from './Components/AlbumInfo';


function App() {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">User(s) Albums</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/Users" className="nav-link">Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/Albums" className="nav-link">Albums</Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<LoginWithGoogle />}/>
        <Route path="/Users" element={<Users />} />
        <Route path="/User/:userId" element={<UserInfo />} />
        <Route path="/Albums" element={<Albums />} />
        <Route path="/AlbumInfo/:id" element={<AlbumInfo />} />
        <Route path="/UserAlbums/:userId" element={<UserAlbumList />} />
        <Route path="/logout" element={<LoginWithGoogle />} />
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
