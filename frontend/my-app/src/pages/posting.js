import React, { useState } from "react";
import {
  FiMenu,
  FiArrowLeft,
  FiBookmark,
  FiMoreVertical,
  FiX,
  FiStar,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../App.css";

function PostingPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("AI 파인튜닝 기반 맛집 추천 시스템");
  const [content, setContent] = useState(
    "사용자의 맛집 취향 데이터를 수집하고, 해당 데이터를 기반으로 GPT 모델을 파인튜닝하여 개인 맞춤형 맛집을 추천하는 시스템입니다."
  );
  const [titleClicked, setTitleClicked] = useState(false);
  const [contentClicked, setContentClicked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // 새로 추가된 상태 변수들
  const [desiredRoles, setDesiredRoles] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  // 옵션 배열들
  const desiredRolesOptions = [
    "프론트엔드", "백엔드", "AI", "디자이너", "마케터", "기획자", "아트", "경영"
  ];
  
  const hashtagOptions = [
    "AI", "스타트업", "관공서", "공모전", "지자체"
  ];

  const handleClearTitle = () => setTitle("");
  const handleClearContent = () => setContent("");
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // 체크박스 핸들러 함수들
  const handleDesiredRolesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setDesiredRoles((prevRoles) => [...prevRoles, value]);
    } else {
      setDesiredRoles((prevRoles) =>
        prevRoles.filter((role) => role !== value)
      );
    }
  };

  const handleHashtagsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setHashtags((prevHashtags) => [...prevHashtags, value]);
    } else {
      setHashtags((prevHashtags) =>
        prevHashtags.filter((hashtag) => hashtag !== value)
      );
    }
  };

  // 체크박스 컨테이너 스타일
  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#aaa",
    cursor: "pointer",
  };

  const checkboxStyle = {
    appearance: "none",
    width: "18px",
    height: "18px",
    border: "1px solid #999",
    borderRadius: "4px",
    backgroundColor: "black",
    position: "relative",
    cursor: "pointer",
  };

  const checkedCheckboxStyle = {
    ...checkboxStyle,
    backgroundColor: "#948dce",
    borderColor: "#948dce",
  };

  return (
    <div className="app">
      {/* 상단바 */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <FiMenu color="white" size={20} style={{ marginRight: "0.5rem" }} />
            <h1 className="logo-text">맹글</h1>
          </div>
          <div className="top-bar-right">
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

      {/* 헤더 */}
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
            onClick={() => navigate(-1)} // ← 뒤로 가기
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

      {/* 제목 입력 */}
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
            value={titleClicked ? title : "AI 파인튜닝 기반 맛집 추천 시스템"}
            onFocus={() => {
              if (!titleClicked) {
                setTitleClicked(true);
                setTitle("");
              }
            }}
            onChange={(e) => setTitle(e.target.value)}
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
          <FiX
            size={20}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              cursor: "pointer",
            }}
            onClick={handleClearTitle}
          />
        </div>
        <p style={{ color: "#ccc", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          사람들의 관심을 끌 수 있는 제목을 지어보세요.
        </p>
      </div>

      {/* 내용 입력 */}
      <div style={{ padding: "1rem" }}>
        <div
          style={{
            backgroundColor: "#e2d9eb",
            padding: "1rem",
            borderRadius: "8px",
            position: "relative",
            minHeight: "160px",
          }}
        >
          <label style={{ color: "#333", fontSize: "0.875rem" }}>내용</label>
          <textarea
            value={
              contentClicked
                ? content
                : "사용자의 맛집 취향 데이터를 수집하고, 해당 데이터를 기반으로 GPT 모델을 파인튜닝하여 개인 맞춤형 맛집을 추천하는 시스템입니다."
            }
            onFocus={() => {
              if (!contentClicked) {
                setContentClicked(true);
                setContent("");
              }
            }}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            style={{
              width: "100%",
              height: "100px",
              border: "none",
              background: "transparent",
              fontSize: "1rem",
              marginTop: "0.25rem",
              color: "black",
              outline: "none",
              resize: "none",
            }}
          />
          <FiX
            size={20}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              cursor: "pointer",
            }}
            onClick={handleClearContent}
          />
        </div>
        <p style={{ color: "#ccc", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          프로젝트의 핵심 아이디어는 본인 마음 속에 간직하세요.
        </p>
      </div>

      {/* 원하는 역할 선택 */}
      <div style={{ padding: "1rem" }}>
        <p style={{ fontSize: "16px", color: "#eee", marginBottom: "10px" }}>
          원하는 역할 선택
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            width: "100%",
          }}
        >
          {desiredRolesOptions.map((option) => (
            <label key={option} style={checkboxContainerStyle}>
              <input
                type="checkbox"
                value={option}
                checked={desiredRoles.includes(option)}
                onChange={handleDesiredRolesChange}
                style={
                  desiredRoles.includes(option)
                    ? checkedCheckboxStyle
                    : checkboxStyle
                }
              />
              <span>{option}</span>
              {desiredRoles.includes(option) && (
                <style>
                  {`
                    input[value="${option}"]:checked::after {
                      content: '✔';
                      color: black;
                      font-size: 14px;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    }
                  `}
                </style>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* 해시태그 선택 */}
      <div style={{ padding: "1rem" }}>
        <p style={{ fontSize: "16px", color: "#eee", marginBottom: "10px" }}>
          해시태그 선택
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            width: "100%",
          }}
        >
          {hashtagOptions.map((option) => (
            <label key={option} style={checkboxContainerStyle}>
              <input
                type="checkbox"
                value={option}
                checked={hashtags.includes(option)}
                onChange={handleHashtagsChange}
                style={
                  hashtags.includes(option)
                    ? checkedCheckboxStyle
                    : checkboxStyle
                }
              />
              <span>{option}</span>
              {hashtags.includes(option) && (
                <style>
                  {`
                    input[value="${option}"]:checked::after {
                      content: '✔';
                      color: black;
                      font-size: 14px;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    }
                  `}
                </style>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
          position: "relative",
        }}
      >
        <button
          style={{
            backgroundColor: "#6b4eff",
            color: "white",
            border: "none",
            borderTopLeftRadius: "9999px",
            borderBottomLeftRadius: "9999px",
            padding: "0.5rem 1rem",
            display: "flex",
            alignItems: "center",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
          onClick={() => {
            const formData = {
              contestTitle: title,
              desiredRoles: desiredRoles,
              description: content,
              hashtags: hashtags
            };
            console.log("제출된 데이터:", formData);
            alert("제출되었습니다");
          }}
        >
          <FiStar size={16} style={{ marginRight: "0.4rem" }} />
          제출하기
        </button>

        <button
          style={{
            backgroundColor: "#6b4eff",
            color: "white",
            border: "none",
            borderTopRightRadius: "9999px",
            borderBottomRightRadius: "9999px",
            padding: "0.5rem 0.75rem",
            cursor: "pointer",
          }}
          onClick={toggleDropdown}
        >
          <FiChevronDown size={16} />
        </button>

        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "0.25rem",
              backgroundColor: "#333",
              color: "white",
              borderRadius: "0.5rem",
              padding: "0.5rem 0",
              minWidth: "150px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              zIndex: 100,
            }}
          >
            <div
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
              onClick={() => alert("임시 저장")}
            >
              임시 저장
            </div>
            <div
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
              onClick={() => alert("미리보기")}
            >
              미리보기
            </div>
            <div
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
              onClick={() => alert("초안으로 저장")}
            >
              초안으로 저장
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostingPage;