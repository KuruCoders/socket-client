import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);
function App() {
  const [message, setMessage] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessage([...message, msg]);
    });
    socket.on("rtc", (msg) => {
      setMessage((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.off("message");
      socket.off("rtc");
    };
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Cautious Sockets</h1>
      {/* <div>
        <input
          type="text"
          placeholder="enter your message"
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
        />
      </div>
      <div className="card">
        <button onClick={sendMessage}>Send Message</button>
      </div> */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="read-the-docs">Real Time Logs</p>
        <p className="read-the-docs">📝</p>
      </div>
      {/* list */}
      <div
        style={{
          marginTop: "5px",
        }}
      >
        {message.map((msg, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{
              margin:'0px',
            }}>
              {index + 1}
            </p>
            <p style={{
              margin:'0px',
            }}>
              {msg}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
