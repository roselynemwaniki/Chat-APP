import React, { useState, useEffect } from "react";
import { fetchData, postData, deleteData } from "./utils/api";

function Messages({ contactId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch messages for the selected contact
    const fetchMessages = async () => {
      try {
        const data = await fetchData(`messages?contactId=${contactId}`);
        setMessages(data);
      } catch (err) {
        setError(err.message);
      }
    };
    if (contactId) fetchMessages();
  }, [contactId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      contactId,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      const savedMessage = await postData("messages", message);
      setMessages([...messages, savedMessage]);
      setNewMessage("");
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await deleteData(`messages/${id}`);
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <p>
              <strong>{new Date(msg.timestamp).toLocaleString()}:</strong> {msg.text}
            </p>
            <button onClick={() => deleteMessage(msg.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Messages;
