import React, { useState } from "react";
import Chat from "./Chat";

function App() {
  const [username, setUsername] = useState("");
  const [entered, setEntered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setEntered(true);
    }
  };

  if (!entered) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Enter your username</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "10px", fontSize: "16px" }}
          />
          <button type="submit" style={{ padding: "10px 20px", marginLeft: 10 }}>
            Enter Chat
          </button>
        </form>
      </div>
    );
  }

  return <Chat username={username} />;
}

export default App;
