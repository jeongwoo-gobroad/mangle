import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 기존 페이지들
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SigncompletePage from "./pages/SigncompletePage";
import ProfilePage from "./pages/ProfilePage";

// 새로 추가된 페이지들
import CirclePage from "./pages/CirclePage";
import FirstPage from "./pages/FirstPage";
import PostingPage from "./pages/posting"
import ChatPage from "./pages/ChatPage";

import "./App.css"; // 전역 스타일

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 관련 경로 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-complete" element={<SigncompletePage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* 주요 기능 페이지 */}
        <Route path="/circle" element={<CirclePage />} />
        <Route path="/posting" element={<PostingPage />} />
        <Route path="/first" element={<FirstPage />} />
        <Route path="/chat" element={<ChatPage />} /> {/* ✅ 새로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
