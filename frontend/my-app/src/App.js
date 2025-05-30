import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "atomize"; // ✅ 추가
import "./App.css"; // 전역 스타일

// 기존 페이지들
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SigncompletePage from "./pages/SigncompletePage";
import ProfilePage from "./pages/ProfilePage";

// 새로 추가된 페이지들
import CirclePage from "./pages/CirclePage";
import FirstPage from "./pages/FirstPage";
import PostingPage from "./pages/posting";
import ChatPage from "./pages/ChatPage";

// ✅ atomize 기본 theme
const theme = {
  colors: {
    black: "#000000",
    white: "#FFFFFF",
    gray300: "#D1D5DB",
    red500: "#EF4444",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
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
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
