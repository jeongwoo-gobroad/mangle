import React, { useState } from "react";
import {
  FiMenu,
  FiSmile,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import "./ChatPage.css";

function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, from: "other", text: "안녕하세요" },
    { id: 2, from: "me", text: "네 반가워요" },
    { id: 3, from: "other", text: "같이 해커톤 참여할래요?" },
    { id: 4, from: "me", text: "좋아요. 시작해볼까요?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", text: input },
    ]);
    setInput("");
  };

  return (
    <div className="chat-wrapper">
      {/* 상단바 */}
      <div className="chat-header">
        <FiMenu />
        <h3>맹글</h3>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="프로필"
          className="chat-profile"
        />
      </div>

      {/* 채팅 메시지 리스트 */}
      <div className="chat-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.from === "me" ? "me" : "other"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="chat-input-wrapper">
        <FiPlus />
        <FiSmile />
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <FiSearch onClick={sendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;
