import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticationService } from "../services/AuthenticationService";
import { socket } from "../services/SocketService";

function Login({
  room,
  username,
  setRoom,
  setUsername,
  setIsUserLogged,
  setAccessToken,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);

  const popError = (code) => {
    if (code === 403) {
      toast.error("Username or password is invalid");
    }
  };

  const loginRequest = async () => {
    try {
      const response = await authenticationService.loginRequest(
        username,
        null,
        password
      );
      const splittedResponse = response.data.split(" : ");

      setAccessToken(splittedResponse[1]);

      setIsUserLogged(true);
    } catch (error) {
      popError(error.status);
    }
  };

  const registerRequest = async () => {
    try {
      const response = await authenticationService.registerRequest(
        username,
        email,
        password
      );

      setIsRegistration(false);
    } catch (error) {
      popError(error.status);
    }
  };

  const enter = async () => {
    if (password.length > 0 && username.length > 0) {
      if (isRegistration) {
        registerRequest();
      } else if (room.length > 0) {
        loginRequest();
      }
      socket.emit("chat_init", { room, username });
    } else {
      alert("Please fill in the all sections");
    }
  };

  return (
    <>
      <ToastContainer />
      <header
        class="d-flex justify-content-start"
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "1px",
          boxShadow: "0px 0.5px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div class="d-flex justify-content-center mt-1">
          <h3>
            <span style={{ color: "rgb(100, 100, 100)" }}>Welcome to the </span>
            <span
              style={{
                background: "linear-gradient(to right, #3ac533, #38b9ec)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Chat App
            </span>
          </h3>
        </div>
      </header>
      <div class="d-flex justify-content-center mt-4">
        <h4 style={{ color: "rgb(90, 90, 90)" }}>
          {isRegistration ? "Register" : "Login"}
        </h4>
      </div>
      {!isRegistration && (
        <div class="d-flex justify-content-center mt-2">
          <input
            class="input-group-text"
            placeholder="Room"
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
        </div>
      )}
      {isRegistration && (
        <div class="d-flex justify-content-center mt-1">
          <input
            class="input-group-text"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                enter();
              }
            }}
          />
        </div>
      )}
      <div class="d-flex justify-content-center mt-1">
        <input
          class="input-group-text"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              enter();
            }
          }}
        />
      </div>
      <div class="d-flex justify-content-center mt-1">
        <input
          class="input-group-text"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              enter();
            }
          }}
        />
      </div>
      <div class="d-flex justify-content-center mt-2">
        <Button as="a" variant="outline-success" onClick={enter}>
          {isRegistration ? "Register" : "Login"}
        </Button>
      </div>
      <div class="d-flex justify-content-center mt-4">
        <h6 style={{ color: "rgb(85, 85, 85)" }}>
          {isRegistration
            ? "If you already have an account"
            : "If you don't have an account"}
        </h6>
      </div>
      <div class="d-flex justify-content-center">
        <Button
          as="a"
          variant="outline-primary"
          onClick={() => {
            setIsRegistration(!isRegistration);
            if (!isRegistration) {
              setEmail("");
              setUsername("");
              setPassword("");
            }
          }}
        >
          {isRegistration ? "Login" : "Register"}
        </Button>
      </div>
    </>
  );
}

export default Login;
