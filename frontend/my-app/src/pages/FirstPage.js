// src/pages/FirstPage/index.js (Styled-components 버전)
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: black;
    color: white;
  }

  .nav-icon {
    width: 50px;
    height: 50px;
    cursor: pointer;
    filter: invert(1);
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }

  .nav-icon2 {
    width: 65px;
    height: 65px;
    margin-top: 10px;
    cursor: pointer;
    filter: invert(1);
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const BASE_URL = "http://jeongwoo-kim-web.myds.me:8080";

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
    <>
      <GlobalStyle />
      <Container>
        {/* 상단 바 */}
        <TopBar>
          <TopBarInner>
            <TopBarLeft>
              <FiMenu color="white" size={20} style={{ marginRight: "0.5rem" }} />
              <LogoText>❄ 맹글</LogoText>
            </TopBarLeft>
            <TopBarRight>
              <FiSearch color="white" size={20} style={{ marginRight: "1rem" }} />
              <FiBell
                color="white"
                size={20}
                style={{ marginRight: "1rem", cursor: "pointer" }}
                onClick={() => navigate('/list')}
              />
              <ProfileImage
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="profile"
                onClick={() => navigate('/profile')}
              />
            </TopBarRight>
          </TopBarInner>
        </TopBar>

        {/* 구분선 */}
        <Divider />

        {/* 배너 */}
        <BannerContainer>
          <BannerImage src="/images/banner.png" alt="banner" />
        </BannerContainer>

        {/* 메인 콘텐츠 */}
        <MainWrapper>
          {/* 프로필 섹션 */}
          <ProfileSection>
            <ProfileRoundImage
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="profile"
            />
            <UsernameText>
              <b>{username || "Guest"}</b>
              <AiFillCheckCircle color="#1D9BF0" size={18} style={{ marginLeft: "0.5rem" }} />
            </UsernameText>
            <UserIdText>@{userId || "unknown"}</UserIdText>

            {/* 진행중 표시 */}
            <ProgressStatus>
              진행 중
            </ProgressStatus>
          </ProfileSection>

          {/* 콘테스트 섹션 */}
          <ContestSection>
            <ContestTitle>Upcoming Contests</ContestTitle>
            {loading && <StatusText>로딩 중...</StatusText>}
            {error && <ErrorText>{error}</ErrorText>}
            {!loading && !error && cardData.length === 0 && (
              <StatusText>추천 콘테스트가 없습니다.</StatusText>
            )}
          </ContestSection>

          {/* 카드 리스트 */}
          <CardList>
            {cardData.map((card, idx) => (
              <Card key={idx}>
                <CardImage
                  src={card.image || "/images/hey.jpg"}
                  alt={card.title}
                />
                <CardBody>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardBody>
              </Card>
            ))}
          </CardList>

          {/* 하단 네비게이션 */}
          <BottomNavBarWrapper>
            <NavBarIcon src="/images/home.png" alt="Home" onClick={() => navigate("/first")} />
            <NavBarIcon src="/images/circle.png" alt="Circle" onClick={() => navigate("/circle")} />
            <NavBarIcon src="/images/link.png" alt="Link" onClick={() => navigate("/team")} />
            <NavBarIcon2 src="/images/profileicon.png" alt="Profile" onClick={() => navigate("/profile")} />
          </BottomNavBarWrapper>
        </MainWrapper>
      </Container>
    </>
  );
}

export default FirstPage;

// Styled Components 정의 시작

const Container = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
  position: relative;
`;

const TopBar = styled.div`
  width: 100%;
  background-color: #1a1a1a;
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

const TopBarInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  color: #948dce;
  font-weight: bold;
  margin: 0;
  margin-left: 0.5rem;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #948dce;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #333;
`;

const BannerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 200px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const MainWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
  flex-grow: 1;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  text-align: center;
`;

const ProfileRoundImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
`;

const UsernameText = styled.h2`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
  color: white;

  b {
    font-weight: 700;
  }
`;

const UserIdText = styled.p`
  font-size: 0.875rem;
  color: #a3a3a3;
  margin: 0;
  margin-top: 0.25rem;
`;

const ProgressStatus = styled.div`
  display: inline-block;
  padding: 0.4rem 1rem;
  margin-top: 0.5rem;
  text-align: center;
  background-color: #FADADD;
  color: #000000;
  font-weight: bold;
  font-size: 14px;
  border-radius: 9999px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const ContestSection = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const ContestTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin: 0;
`;

const StatusText = styled.p`
  font-size: 1rem;
  color: #a3a3a3;
  margin-top: 0.5rem;
`;

const ErrorText = styled(StatusText)`
  color: #ff4d4f;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-bottom: 2rem;
`;

const Card = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  width: calc(50% - 0.5rem);
  max-width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: calc(33.33% - 0.66rem);
  }

  @media (min-width: 1024px) {
    width: calc(25% - 0.75rem);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.p`
  font-size: 1rem;
  color: white;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #888;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BottomNavBarWrapper = styled.div`
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
    width: 70px;
    height: 70px;
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
