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
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://jeongwoo-kim-web.myds.me:8080";

const CirclePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searchedProjects, setSearchedProjects] = useState([]);
  const [myTeamPosts, setMyTeamPosts] = useState([]);

  const searched = submittedQuery !== "";
  const projectsToShow = searched ? searchedProjects : myTeamPosts;
  const sectionTitle = searched ? "기존에 이런게 있었어요" : "내가 작성한 팀 모집 글";

  useEffect(() => {
    if (!submittedQuery) {
      console.log("⛔ submittedQuery가 비어 있음. 요청 중단");
      return;
    }

    console.log("🚀 유사도 검색 요청 시작:", submittedQuery);

    fetch("http://jeongwoo-kim-web.myds.me:8000/simliarity_engine/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target_idea: submittedQuery }),
    })
      .then((res) => {
        console.log("📡 응답 수신 상태 코드:", res.status);
        if (!res.ok) {
          throw new Error(`❌ 유사도 서버 응답 실패 (status ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ 유사도 응답 데이터:", data);
        const converted = data.map((item) => ({
          title: item.target_text,
          description:
            item.how_similar?.similarity_points?.map((p) => p.similar_point_from_B).join(" · ") || "",
          image: "/images/related.png",
          similarity: item.similarity.toFixed(2),
        }));
        console.log("📦 변환된 프로젝트 데이터:", converted);
        setSearchedProjects(converted);
      })
      .catch((err) => {
        console.error("🔴 외부 유사도 서버 호출 오류:", err.message || err);
      });
  }, [submittedQuery]);
  // 🟢 초기 진입 또는 뒤로 가기 시: 내가 작성한 팀 모집글 불러오기
  const fetchMyTeamPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/teamposts/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("내 팀 포스트 가져오기 실패");

      const data = await res.json();
      const converted = data.posts.map((item) => ({
        title: item.contestTitle,
        description: item.description,
        image: "/images/myteam.png",
        similarity: null,
      }));

      setMyTeamPosts(converted);
    } catch (err) {
      console.error("팀포스트 불러오기 오류:", err);
    }
  };

  useEffect(() => {
    fetchMyTeamPosts(); // 초기 로딩 시 호출
  }, []);

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      setSubmittedQuery(query);
    }
  };

  const handleBack = () => {
    setQuery("");
    setSubmittedQuery("");
    setSearchedProjects([]);
    fetchMyTeamPosts(); // 뒤로 가기 시 다시 불러오기
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
      <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
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

      {/* 검색 결과 상단 바 */}
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
        <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>아이디어 유사도 점검</span>
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
              onClick={() => navigate("/posting")}
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
