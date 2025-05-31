// src/pages/FirstPage/index.js
import React, { useEffect, useState } from "react";
import { ThemeProvider, Div, Text, Image } from "atomize";
import { FiSearch, FiGrid, FiMenu } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
import styled from "styled-components"; // styled-components 임포트 추가
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 임포트 추가

const customTheme = {
  colors: {
    black900: "#1a1a1a",
    white: "#ffffff",
    gray300: "#a3a3a3",
    gray400: "#888",
    red500: "#ff4d4f",
    primary: "#1D9BF0",
  },
};

const BASE_URL = "http://jeongwoo-kim-web.myds.me:8080";

// ListPage에서 복사한 BottomNavBar 관련 styled-components
const BottomNavBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #1a1a1a;
    border-top: 1px solid #333;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    padding-bottom: env(safe-area-inset-bottom);
`;

const NavBarIcon = styled.img`
    width: 50px;
    height: 50px;
    cursor: pointer;
    filter: invert(1);
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }
`;

const NavBarIcon2 = styled.img`
    width: 65px;
    height: 65px;
    margin-top: 10px;
    cursor: pointer;
    filter: invert(1);
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }
`;


function FirstPage() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용 선언

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (!token) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    if (storedUserId) {
      setUserId(storedUserId);
    }

    fetch(`${BASE_URL}/contests/recommend`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contests");
        return res.json();
      })
      .then((data) => setCardData(data))
      .catch((err) => {
        console.error("API 호출 실패:", err);
        setError("콘테스트 불러오기 실패");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        {/* 상단 바 */}
        <Div className="top-bar">
          <Div className="top-bar-inner">
            <Div className="top-bar-left">
              <FiMenu color="white" size={20} style={{ marginRight: "0.5rem" }} />
              <Text tag="h1" className="logo-text">❄ 맹글</Text>
            </Div>
            <Div className="top-bar-right">
              <FiSearch color="white" size={20} style={{ marginRight: "1rem" }} />
              <FiGrid color="white" size={20} style={{ marginRight: "1rem" }} />
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="profile-img"
                alt="profile"
              />
            </Div>
          </Div>
        </Div>

        <Div className="divider" />

        {/* 배너 */}
        <Div className="banner-container">
          <img src="/images/kd.jpg" alt="banner" className="banner-img" />
        </Div>

        {/* 메인 콘텐츠 */}
        <Div className="main-wrapper">
          {/* 프로필 */}
          <Div
            className="profile-section"
            d="flex"
            flexDir="column"
            align="center"
            justify="center"
            mt="3rem"
          >
            <Image
              src="https://randomuser.me/api/portraits/women/44.jpg"
              w="64px"
              h="64px"
              rounded="circle"
              border="2px solid white"
            />
            <Text tag="h2" textSize="heading" d="flex" align="center" justify="center">
              <b>{userId || "Guest"}</b>
              <AiFillCheckCircle color="#1D9BF0" size={18} style={{ marginLeft: "0.5rem" }} />
            </Text>
            <Text textColor="gray300">@{userId || "unknown"}</Text>
            <Text textSize="caption">
              <b>1.2K</b> followers &nbsp;&nbsp; <b>180</b> following
            </Text>
          </Div>

          {/* 콘텐츠 제목 */}
          <Div mt="2rem" className="text-center">
            <Text tag="h2" textSize="heading">Upcoming Contests</Text>
            {loading && <Text textColor="gray300">로딩 중...</Text>}
            {error && <Text textColor="red500">{error}</Text>}
            {!loading && !error && cardData.length === 0 && (
              <Text textColor="gray300">추천 콘테스트가 없습니다.</Text>
            )}
          </Div>

          {/* 카드 리스트 */}
          <Div className="card-list">
            {cardData.map((card, idx) => (
              <Div key={idx} className="card">
                <img
                  src={card.image || "/images/hey.jpg"}
                  alt={card.title}
                  className="card-img"
                />
                <Div className="card-body">
                  <Text textColor="white" textWeight="700">{card.title}</Text>
                  <Text textColor="gray400" textSize="caption">{card.description}</Text>
                </Div>
              </Div>
            ))}
          </Div>
        </Div>

        {/* Bottom Navigation Bar 추가 */}
        <BottomNavBar>
            <NavBarIcon src="/images/home.png" alt="Home" onClick={() => navigate('/list')} /> {/* 예시: 클릭 시 ListPage로 이동 */}
            <NavBarIcon src="/images/circle.png" alt="Circle" onClick={() => navigate('/some-other-page')} /> {/* 필요에 따라 경로 변경 */}
            <NavBarIcon src="/images/link.png" alt="Link" onClick={() => navigate('/another-page')} /> {/* 필요에 따라 경로 변경 */}
            <NavBarIcon2 src="/images/profileicon.png" alt="Profile" onClick={() => navigate('/profile')} /> {/* 예시: 클릭 시 ProfilePage로 이동 */}
        </BottomNavBar>

      </ThemeProvider>
    </div>
  );
}

export default FirstPage;