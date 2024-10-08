import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { messageService } from "../services/MessageService";
import { socket } from "../services/SocketService";

function Chat({ room, username, accessToken }) {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userAmount, setUserAmount] = useState("");
  const [isUserLoggedMessageSent, setIsUserLoggedMessageSent] = useState(false);

  const messagesEndReference = useRef(null);

  const scrollToBottom = () => {
    messagesEndReference.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    const ownerMessage = {
      sender: "You",
      message: message,
      createdAt: Date.now(),
    };

    const messageWithSender = {
      sender: username,
      message: message,
      createdAt: Date.now(),
    };

    socket.emit("send_message", { messageWithSender, room });

    messageService.saveMessage(accessToken, message, room, username);

    setMessages((prevMessages) => [...prevMessages, ownerMessage]);
    setMessage("");
  };

  const handleLogin = () => {
    const loginMessage = {
      sender: "You",
      message: `You have joined the chat as "${username}"`,
    };

    setMessages((prevMessages) => [...prevMessages, loginMessage]);
    setIsUserLoggedMessageSent(true);
  };

  if (!isUserLoggedMessageSent) {
    handleLogin();
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      const othersMessage = {
        sender: data.messageWithSender.sender,
        message: data.messageWithSender.message,
        createdAt: data.messageWithSender.createdAt,
      };

      setUserAmount(data.userAmount);
      setMessages((prevMessages) => [...prevMessages, othersMessage]);
    };
    socket.on("receive_message", handleReceiveMessage);

    const handleUserLogin = (data) => {
      const loginMessage = {
        sender: data.username,
        message: "has joined the chat",
      };

      setMessages((prevMessages) => [...prevMessages, loginMessage]);
      setUserId(data.userId);
    };
    socket.on("emit_user", handleUserLogin);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("emit_user", handleUserLogin);
    };
  }, [socket]);

  return (
    <>
      <header
        class="d-flex flex-column align-items-start mb-1"
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "1px",
          boxShadow: "0px 0.5px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div class="d-flex justify-content-center mt-1">
          <h3>
            <span
              style={{
                background: "linear-gradient(to right, #3ac533, #38b9ec)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Room :
            </span>{" "}
            <span style={{ color: "rgb(100, 100, 100)" }}>{room}</span>
          </h3>
        </div>
        <div class="d-flex justify-content-center">
          <h6>
            <span
              style={{
                background: "linear-gradient(to right, #3ac533, #38b9ec)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Users :{" "}
            </span>
            <span style={{ color: "rgb(100, 100, 100)" }}>{userAmount}</span>
          </h6>
        </div>
      </header>

      <div
        className="chat-messages w-100"
        style={{ maxHeight: "575px", overflowY: "auto" }}
      >
        {messages &&
          messages.map((message) => {
            if (message.sender === "You") {
              return (
                <div class="d-flex justify-content-end mt-1 mx-5">
                  {message.message} :
                  <strong style={{ color: "rgb(66, 148, 230)" }}>
                    {message.sender}
                  </strong>
                </div>
              );
            } else {
              return (
                <div class="d-flex justify-content-start mt-1 mx-5">
                  <strong style={{ color: "rgb(35, 193, 143)" }}>
                    {message.sender}
                  </strong>
                  : {message.message}
                </div>
              );
            }
          })}
        <div ref={messagesEndReference} />
      </div>

      <div class="bottom-align">
        <input
          value={message}
          class="col-md-4 input-group-text mx-1"
          style={{ backgroundColor: "rgb(225, 225, 225)" }}
          placeholder="Message"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (message.length > 0) {
                sendMessage();
              } else {
                alert("Please enter a message");
              }
            }
          }}
        />
        <Button
          as="a"
          variant="success"
          onClick={() => {
            if (message.length > 0) {
              sendMessage();
            } else {
              alert("Please enter a message");
            }
          }}
        >
          Send Message
        </Button>
      </div>
    </>
  );
}

export default Chat;
