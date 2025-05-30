import React, { useState } from "react";
import {
  FiMenu,
  FiSearch,
  FiGrid,
  FiArrowLeft,
  FiBookmark,
  FiMoreVertical,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("AI 파인튜닝 기반 맛집 추천 시스템");

  const handleClear = () => {
    setTitle("");
  };

  return (
    <div className="app">
      {/* 맨 위 상단바 */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <FiMenu color="white" size={20} style={{ marginRight: "0.5rem" }} />
            <h1 className="logo-text">❄ 맹글</h1>
          </div>
          <div className="top-bar-right">
            <FiSearch color="white" size={20} style={{ marginRight: "1rem" }} />
            <FiGrid color="white" size={20} style={{ marginRight: "1rem" }} />
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="profile-img"
            />
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="divider" />

      {/* 프로젝트 시작하기 상단바 */}
      <div
        style={{
          backgroundColor: "black",
          padding: "0.75rem 1rem",
          borderBottom: "1px solid white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FiArrowLeft
            size={20}
            color="white"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />

          <span
            style={{
              flex: 1,
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            프로젝트 시작하기
          </span>

          <div style={{ display: "flex", alignItems: "center" }}>
            <FiBookmark
              size={20}
              color="white"
              style={{ cursor: "pointer", marginRight: "1rem" }}
              onClick={() => alert("북마크 클릭됨")}
            />
            <FiMoreVertical
              size={20}
              color="white"
              style={{ cursor: "pointer" }}
              onClick={() => alert("더보기 클릭됨")}
            />
          </div>
        </div>
      </div>

      {/* 제목 입력 박스 */}
      <div style={{ padding: "1rem" }}>
        <div
          style={{
            backgroundColor: "#bbaecc",
            padding: "1rem",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <label style={{ color: "#333", fontSize: "0.875rem" }}>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              fontSize: "1rem",
              marginTop: "0.25rem",
              color: "black",
              outline: "none",
            }}
          />
          {/* X 아이콘 */}
          <FiX
            size={20}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              cursor: "pointer",
            }}
            onClick={handleClear}
          />
        </div>

        {/* 설명 문구 */}
        <p style={{ color: "#ccc", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          사람들의 관심을 끌 수 있는 제목을 지어보세요.
        </p>
      </div>
    </div>
  );
}

export default App;
