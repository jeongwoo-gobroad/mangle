import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// 경로를 폴더까지만 지정하면 해당 폴더 안의 index.js를 자동으로 불러옵니다.
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SigncompletePage from "./pages/SigncompletePage"; // Import corrected to match actual component name
import ProfilePage from "./pages/ProfilePage"; // ProfilePage 임포트
import './App.css'; // 기본 CSS 파일 (선택 사항, 필요 없으면 제거 가능)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* 경로를 /signup으로 유지 */}
        <Route path="/signup-complete" element={<SigncompletePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
