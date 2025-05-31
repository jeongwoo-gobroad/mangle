import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiArrowLeft,
  FiBookmark,
  FiMoreVertical,
  FiSearch,
  FiPlus,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // ✅ 추가

const BASE_URL = "http://jeongwoo-kim-web.myds.me:8080";

const initialProjects = [
  {
    title: "TasteAI",
    description: "AI를 이용해 사용자 선호도를 분석하고 레스토랑을 추천해주는 앱",
    image: "/images/res copy.png",
    similarity: null,
  },
  {
    title: "FlavorFinder",
    description: "GPT 기반 리뷰 분석으로 식당 트렌드를 예측하는 머신러닝 프로젝트",
    image: "/images/trend copy.png",
    similarity: null,
  },
  {
    title: "StudySync",
    description: "학생들의 학습 데이터를 분석해 개인 맞춤형 공부 루틴을 추천하는 AI 서비스",
    image: "/images/study copy.png",
    similarity: null,
  },
  {
    title: "EcoTrack",
    description: "탄소 배출량을 분석하고 절감 아이디어를 추천하는 지속가능성 분석 플랫폼",
    image: "/images/carbon copy.png",
    similarity: null,
  },
  {
    title: "JobMatchAI",
    description: "이력서와 경력 기반으로 최적의 채용 공고를 매칭해주는 AI 기반 구직 플랫폼",
    image: "/images/work copy.png",
    similarity: null,
  },
];

const CirclePage = () => {
  const navigate = useNavigate(); // ✅ 추가
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searchedProjects, setSearchedProjects] = useState([]);

  const searched = submittedQuery !== "";
  const projectsToShow = searched ? searchedProjects : initialProjects;
  const sectionTitle = searched ? "기존에 이런게 있었어요" : "이런 프로젝트에 참가해보세요";

  useEffect(() => {
    if (!submittedQuery) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("로그인이 필요합니다.");
      return;
    }

    fetch(`${BASE_URL}/contests/similarity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: submittedQuery }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("유사도 검색 실패");
        return res.json();
      })
      .then((data) => {
        setSearchedProjects(data);
      })
      .catch((err) => {
        console.error("API 호출 오류:", err);
      });
  }, [submittedQuery]);

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setSubmittedQuery(query);
    }
  };

  const handleBack = () => {
    setQuery("");
    setSubmittedQuery("");
    setSearchedProjects([]);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* 상단 바 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FiMenu size={24} />
          <span style={{ fontWeight: "bold" }}>맹글</span>
        </div>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          style={{ width: "32px", height: "32px", borderRadius: "50%" }}
        />
      </div>

      {/* 유사도 점검 상단바 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem 1rem",
        }}
      >
        {searched ? (
          <FiArrowLeft size={22} onClick={handleBack} style={{ cursor: "pointer" }} />
        ) : (
          <div style={{ width: 22 }} />
        )}
        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          아이디어 유사도 점검
        </span>
        <div style={{ display: "flex", gap: "1rem" }}>
          <FiBookmark size={20} />
          <FiMoreVertical size={20} />
        </div>
      </div>

      {/* 추천 박스 */}
      <div
        style={{
          background: "#222",
          margin: "1rem",
          padding: "1rem",
          borderRadius: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src="/images/01.png"
          alt="main"
          style={{
            borderRadius: "0.5rem",
            width: "60px",
            height: "60px",
          }}
        />
        <div style={{ flex: 1, marginLeft: "1rem" }}>
          <strong>
            {submittedQuery || "검색창에 입력하고 유사한 프로젝트를 찾아보세요"}
          </strong>
          <div>
            <button
              style={{
                background: "#7e57c2",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                marginTop: "0.5rem",
              }}
              onClick={() => navigate("/posting")} // ✅ 버튼 클릭 시 페이지 이동
            >
              프로젝트 시작하기
            </button>
          </div>
        </div>
      </div>

      {/* 섹션 제목 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
          fontWeight: "bold",
        }}
      >
        <span>{sectionTitle}</span>
        <FiChevronRight />
      </div>

      {/* 프로젝트 카드 리스트 */}
      <div
        style={{
          maxHeight: "calc(100vh - 320px)",
          overflowY: "scroll",
          padding: "1rem",
          paddingBottom: "6rem",
        }}
      >
        {projectsToShow.map((proj, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              background: "#222",
              padding: "1rem",
              borderRadius: "1rem",
              marginBottom: "1rem",
            }}
          >
            <img
              src={proj.image}
              alt={proj.title}
              style={{
                width: 60,
                height: 60,
                borderRadius: "0.5rem",
                objectFit: "cover",
              }}
            />
            <div style={{ marginLeft: "1rem", flex: 1 }}>
              <div style={{ fontWeight: "bold" }}>{proj.title}</div>
              <div style={{ fontSize: "0.85rem", color: "#ccc" }}>{proj.description}</div>
              {searched && proj.similarity && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.85rem",
                  }}
                >
                  <FiPlus size={14} />
                  유사도 · {proj.similarity}
                </div>
              )}
            </div>
            <FiChevronRight size={20} />
          </div>
        ))}
      </div>

      {/* 하단 검색창 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "98%",
          backgroundColor: "#a78bfa",
          color: "white",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        <FiMenu />
        <input
          className="search-input"
          style={{
            flex: 1,
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            marginLeft: "0.5rem",
            fontSize: "0.9rem",
            outline: "none",
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSubmit}
          placeholder="AI 파인튜닝 기반 맛집 추천 시스템"
        />
        <FiSearch color="white" style={{ marginLeft: "0.5rem" }} />
      </div>
    </div>
  );
};

export default CirclePage;
