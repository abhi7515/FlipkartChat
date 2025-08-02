import React, { useState, useEffect, useRef } from "react";
import '../App.css';

export default function ChatWindow({ chat }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chat) {
      setMessages(chat.messageList);
    }
  }, [chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      messageId: Date.now().toString(),
      message: inputMessage,
      sender: "USER",
      messageType: "text"
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage("");
  };

  return (
    <div className={`chat-window ${chat ? "open" : ""}`}>
      {chat ? (
        <>
          <div className="chat-title">{chat.title}</div>
          <div className="messages">
            {messages.map((msg) => (
              <div
                key={msg.messageId}
                className={`message ${msg.sender === "USER" ? "user" : "bot"}`}
              >
                {msg.messageType === "optionedMessage" ? (
                  <>
                    <p>{msg.message}</p>
                    {msg.options?.map((opt, idx) => (
                      <div key={idx} className="option-messages">
                        <strong>{opt.optionText}</strong>
                        <div>{opt.optionSubText}</div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>{msg.message}</p>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} /> 
          </div>
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </>
      ) : (
        <div className="chat-window-default">Chat Window</div>
      )}
    </div>
  );
}
