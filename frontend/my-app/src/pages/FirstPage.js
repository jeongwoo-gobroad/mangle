import React, { useEffect, useState } from "react";
import { ThemeProvider, Div, Text, Image } from "atomize";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// 사용자 정의 테마
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

const NavBarIcon = ({ src, alt, onClick }) => (
  <img src={src} alt={alt} onClick={onClick} className="nav-icon" />
);

const NavBarIcon2 = ({ src, alt, onClick }) => (
  <img src={src} alt={alt} onClick={onClick} className="nav-icon2" />
);

const BottomNavBar = ({ children }) => (
  <Div className="bottom-nav">{children}</Div>
);

function FirstPage() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    if (storedUserId) setUserId(storedUserId);
    if (storedUsername) setUsername(storedUsername);

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
              <FiBell color="white" size={20} style={{ marginRight: "1rem" }} />
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="profile-img"
                alt="profile"
              />
            </Div>
          </Div>
        </Div>

        {/* 구분선 */}
        <Div className="divider" />

        {/* 배너 */}
        <Div className="banner-container">
          <img src="/images/kd.jpg" alt="banner" className="banner-img" />
        </Div>

        {/* 메인 콘텐츠 */}
        <Div className="main-wrapper">
          {/* 프로필 섹션 */}
          <Div className="profile-section" mt="3rem">
            <Image
              src="https://randomuser.me/api/portraits/women/44.jpg"
              w="64px"
              h="64px"
              rounded="circle"
              border="2px solid white"
            />
            <Text tag="h2" textSize="heading" d="flex" align="center" justify="center">
              <b>{username || "Guest"}</b>
              <AiFillCheckCircle color="#1D9BF0" size={18} style={{ marginLeft: "0.5rem" }} />
            </Text>
            <Text textColor="gray300">@{userId || "unknown"}</Text>

            {/* 진행중 표시 */}
            <Div
              d="inline-block"
              p="0.4rem 1rem"
              m={{ t: "0.5rem" }}
              textAlign="center"
              style={{
                backgroundColor: "#FADADD",
                color: "#000000",
                fontWeight: "bold",
                fontSize: "14px",
                borderRadius: "9999px",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              진행 중
            </Div>
          </Div>

          {/* 콘테스트 섹션 */}
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
              <Div key={idx} className="card small-card">
                <img
                  src={card.image || "/images/hey.jpg"}
                  alt={card.title}
                  className="card-img small-img"
                />
                <Div className="card-body small-body">
                  <Text textColor="white" textWeight="700">{card.title}</Text>
                  <Text textColor="gray400" textSize="caption">{card.description}</Text>
                </Div>
              </Div>
            ))}
          </Div>

          {/* 하단 네비게이션 */}
          <BottomNavBar>
            <NavBarIcon src="/images/home.png" alt="Home" onClick={() => navigate("/first")} />
            <NavBarIcon src="/images/circle.png" alt="Circle" onClick={() => navigate("/circle")} />
            <NavBarIcon src="/images/link.png" alt="Link" onClick={() => navigate("/team")} />
            <NavBarIcon2 src="/images/profileicon.png" alt="Profile" onClick={() => navigate("/profile")} />
          </BottomNavBar>
        </Div>
      </ThemeProvider>
    </div>
  );
}

export default FirstPage;
