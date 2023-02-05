import React, { useState } from "react";

const LoginWithGoogle = () => {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: "YOUR_CLIENT_ID",
          scope: "profile email",
        })
        .then(() => {
          const GoogleAuth = window.gapi.auth2.getAuthInstance();
          GoogleAuth.signIn().then((googleUser) => {
            const profile = googleUser.getBasicProfile();
            setUser({
              id: profile.getId(),
              name: profile.getName(),
              email: profile.getEmail(),
            });
            // Store the user information in the session
            sessionStorage.setItem("user", JSON.stringify(user));
          });
        });
    });
  };

  const handleLogout = () => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(() => {
      setUser(null);
      // Clear the user information from the session
      sessionStorage.removeItem("user");
    });
  };

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default LoginWithGoogle;



