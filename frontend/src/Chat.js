import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:5000");

function Chat({ username }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Receive previous chat history on connect
    socket.on("chat history", (history) => {
      setChat(history);
    });

    // Receive new messages
    socket.on("chat message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("chat history");
      socket.off("chat message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit("chat message", { username, message });
    setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chat.map((msg, idx) => (
          <div key={idx} className="message">
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
