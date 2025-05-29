import React, { useState } from "react";
import {
  FiMenu,
  FiArrowLeft,
  FiBookmark,
  FiMoreVertical,
  FiSearch,
  FiPlus,
  FiChevronRight
} from "react-icons/fi";

const initialProjects = [
  {
    title: "TasteAI",
    description: "AI를 이용해 사용자 선호도를 분석하고 레스토랑을 추천해주는 앱",
    image: "res.png",
    similarity: "89%"
  },
  {
    title: "FlavorFinder",
    description: "GPT 기반 리뷰 분석으로 식당 트렌드를 예측하는 머신러닝 프로젝트",
    image: "trend.png",
    similarity: "83%"
  },
  {
    title: "StudySync",
    description: "학생들의 학습 데이터를 분석해 개인 맞춤형 공부 루틴을 추천하는 AI 서비스",
    image: "study.png",
    similarity: "78%"
  },
  {
    title: "EcoTrack",
    description: "탄소 배출량을 분석하고 절감 아이디어를 추천하는 지속가능성 분석 플랫폼",
    image: "carbon.png",
    similarity: "74%"
  },
  {
    title: "JobMatchAI",
    description: "이력서와 경력 기반으로 최적의 채용 공고를 매칭해주는 AI 기반 구직 플랫폼",
    image: "work.png",
    similarity: "74%"
  }
];

const searchedProjects = [
  {
    title: "Project Silver",
    description: "Description for Project Silver",
    image: "silver.png",
    similarity: "87%"
  },
  {
    title: "Project Gold",
    description: "Description for Project Gold",
    image: "gold.png",
    similarity: "67%"
  },
  {
    title: "Project Vision",
    description: "Vision tracking for robotics and automation",
    image: "project.png",
    similarity: "74%"
  },
  {
    title: "DocAnalyzer",
    description: "문서 자동 분석 및 보고서 요약 AI 시스템",
    image: "document.png",
    similarity: "88%"
  }
];

const CirclePage= () => {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const searched = submittedQuery !== "";
  const projectsToShow = searched ? searchedProjects : initialProjects;
  const sectionTitle = searched ? "기존에 이런게 있었어요" : "이런 프로젝트에 참가해보세요";

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setSubmittedQuery(query);
    }
  };

  const handleBack = () => {
    setQuery("");
    setSubmittedQuery("");
  };

  return (
    <div style={{
      backgroundColor: "black",
      color: "white",
      minHeight: "100vh",
      fontFamily: "sans-serif",
      position: "relative"
    }}>
      {/* 상단 바 */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem"
      }}>
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

      {/* 유사도 점검 바 */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1rem"
      }}>
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
      <div style={{
        background: "#222",
        margin: "1rem",
        padding: "1rem",
        borderRadius: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <img src="01.png" alt="main" style={{
          borderRadius: "0.5rem",
          width: "60px",
          height: "60px"
        }} />
        <div style={{ flex: 1, marginLeft: "1rem" }}>
          <strong>
            {submittedQuery || "검색창에 입력하고 유사한 프로젝트를 찾아보세요"}
          </strong>
          <div>
            <button style={{
              background: "#7e57c2",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              marginTop: "0.5rem"
            }}>
              프로젝트 시작하기
            </button>
          </div>
        </div>
      </div>

      {/* 섹션 제목 */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1rem",
        fontWeight: "bold"
      }}>
        <span>{sectionTitle}</span>
        <FiChevronRight />
      </div>

      {/* 프로젝트 카드 리스트 */}
      <div style={{
        maxHeight: "calc(100vh - 320px)",
        overflowY: "scroll",
        padding: "1rem",
        paddingBottom: "6rem"
      }}>
        {projectsToShow.map((proj, idx) => (
          <div key={idx} style={{
            display: "flex",
            background: "#222",
            padding: "1rem",
            borderRadius: "1rem",
            marginBottom: "1rem"
          }}>
            <img
              src={proj.image}
              alt={proj.title}
              style={{
                width: 60,
                height: 60,
                borderRadius: "0.5rem",
                objectFit: "cover"
              }}
            />
            <div style={{ marginLeft: "1rem", flex: 1 }}>
              <div style={{ fontWeight: "bold" }}>{proj.title}</div>
              <div style={{ fontSize: "0.85rem", color: "#ccc" }}>{proj.description}</div>
              <div style={{
                marginTop: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem"
              }}>
                <FiPlus size={14} />
                {searched && <>유사도 · {proj.similarity}</>}
              </div>
            </div>
            <FiChevronRight size={20} />
          </div>
        ))}
      </div>

      {/* 하단 검색창 */}
      <div style={{
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
        borderTopRightRadius: "1rem"
      }}>
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
            outline: "none"
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
