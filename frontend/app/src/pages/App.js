import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Chat from "../components/Chat";
import Login from "../components/Login";
import "../styles/App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  return (
    <div className="App">
      {!isUserLogged && (
        <Login
          room={room}
          username={username}
          setRoom={setRoom}
          setUsername={setUsername}
          setIsUserLogged={setIsUserLogged}
          setAccessToken={setAccessToken}
        />
      )}

      {isUserLogged && (
        <Chat room={room} username={username} accessToken={accessToken} />
      )}
    </div>
  );
}

export default App;
