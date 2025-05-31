import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 컴포넌트 내부에서 사용될 작은 아이콘 그룹 (삼각형, 사각형, 원)
const SmallIconGroup = ({ size = '16px', color = '#BBBBBB' }) => (
    <div style={{ display: 'flex', gap: '3px' }}>
        <Icon className="triangle" size={size} color={color} />
        <Icon className="square" size={size} color={color} />
        <Icon className="circle" size={size} color={color} />
    </div>
);

// 이 컴포넌트가 src/pages/TeamPage/index.js 에 저장되어야 합니다.
// 파일 이름을 TeamPage.js로 변경하여 사용하시는 것을 권장합니다.
function CompetitionDashboardScreen() { // 이 컴포넌트가 TeamPage 역할을 합니다.
    const navigate = useNavigate();

    // 팀원 데이터 (가상 데이터)
    const teamMembers = [
        { name: "김정우" },
        { name: "손희주" },
        { name: "윤현종" },
        { name: "이민영" },
        { name: "박준석" },
        // 필요한 만큼 추가
    ];

    // 프로젝트 진행도 데이터 (가상 데이터)
    const projectProgressSteps = [
        { label: "1st", phase: "프로젝트 기획 및 목표 설정" },
        { label: "2nd", phase: "데이터 수집 및 전처리" },
        // 실제 데이터에 맞게 추가
    ];

    return (
        <Container>
            {/* 상단 헤더: 기존 ProfilePage와 유사한 구조 유지 */}
            <Header>
                <HeaderLeft>
                    <Menu>
                        <Line />
                        <Line />
                        <Line />
                    </Menu>
                    <HeaderTitle>＊ 맹글</HeaderTitle>
                </HeaderLeft>
                <ProfileImage
                    alt="프로필 이미지"
                    onClick={() => navigate('/profile')}
                >
                    {/* 프로필 이미지 대신 텍스트나 기본 아이콘으로 대체 가능 */}
                    {/* 이곳은 비워둡니다 */}
                </ProfileImage>
            </Header>

            <ContentArea>
                {/* 섹션 1: 대회 정보 및 팀명 */}
                <Section style={{ borderBottom: 'none', marginBottom: '20px', paddingTop: '10px', paddingBottom: '0' }}>
                    <CompetitionInfo>
                        <TeamHeader>
                            {/* CompetitionTitle과 TeamTitle은 사진에 맞게 배치했습니다. */}
                            <TeamTitle>삼성전자 AI 경진대회 / 25년 4분기</TeamTitle>
                            <CompetitionName>팀 어벤져스</CompetitionName>
                        </TeamHeader>
                        <ArrowIcon alt="이동" /> {/* 이곳은 비워둡니다 */}
                    </CompetitionInfo>
                </Section>

                {/* 섹션 2: 팀원 목록 (가로 스크롤) */}
                <Section style={{ borderBottom: 'none', paddingBottom: '0', marginBottom: '25px' }}>
                    <TeamMembersContainer>
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={index}>
                                <SmallIconGroup />
                                <MemberName>{member.name}</MemberName>
                            </TeamMemberCard>
                        ))}
                    </TeamMembersContainer>
                </Section>

                {/* 섹션 3: 팀 프로젝트 파일 저장소 (AI 기반 진행도 분석) */}
                <Section style={{ borderBottom: 'none', paddingBottom: '0', marginBottom: '15px' }}>
                    <InfoCard onClick={() => console.log("AI 기반 진행도 분석 바로가기")}>
                        <CardIconBackground>
                            <SmallIconGroup size="16px" />
                        </CardIconBackground>
                        <CardTextContent>
                            <CardTitle>팀 프로젝트 파일 저장소</CardTitle>
                            <CardSubtitle>AI 기반 진행도 분석 바로가기</CardSubtitle>
                        </CardTextContent>
                        <ArrowIcon alt="이동" /> {/* 이곳은 비워둡니다 */}
                    </InfoCard>
                </Section>

                {/* 섹션 4: 프로젝트 진행도 */}
                <Section style={{ paddingBottom: '0', marginBottom: '25px' }}>
                    <SectionHeaderWithArrow>
                        <SectionTitle>프로젝트 진행도</SectionTitle>
                        <ArrowIcon alt="이동" /> {/* 이곳은 비워둡니다 */}
                    </SectionHeaderWithArrow>
                    <ProgressCardsContainer>
                        {projectProgressSteps.map((step, index) => (
                            <ProgressCard key={index}>
                                <ProgressLeftContent>
                                    <IconGroup>
                                        {/* 아이콘 그룹을 배열로 처리하여 동적으로 크기 조절 */}
                                        <Icon className="triangle" size={index === 0 ? "30px" : "20px"} />
                                        <Icon className="square" size={index === 0 ? "30px" : "20px"} />
                                    </IconGroup>
                                    <ProgressLabel isFirst={index === 0}>{step.label}</ProgressLabel>
                                </ProgressLeftContent>
                                <ProgressRightContent>
                                    <SmallIconGroup size="18px" />
                                </ProgressRightContent>
                            </ProgressCard>
                        ))}
                    </ProgressCardsContainer>
                </Section>

                {/* 섹션 5: 팀 프로젝트 파일 저장소 (AI 기반 저장소 관리) */}
                <Section style={{ borderBottom: 'none', paddingBottom: '0', marginBottom: '25px' }}>
                    <InfoCard onClick={() => console.log("AI 기반 저장소 관리")}>
                        <CardIconBackground>
                            <SmallIconGroup size="16px" />
                        </CardIconBackground>
                        <CardTextContent>
                            <CardTitle>팀 프로젝트 파일 저장소</CardTitle>
                            <CardSubtitle>AI 기반 저장소 관리</CardSubtitle>
                        </CardTextContent>
                        <ArrowIcon alt="이동" /> {/* 이곳은 비워둡니다 */}
                    </InfoCard>
                </Section>

                {/* 섹션 6: 검색 바 */}
                <Section style={{ borderBottom: 'none', paddingBottom: '0', marginBottom: '0' }}>
                    <SearchContainer>
                        <SearchIconMenu alt="메뉴" /> {/* 이곳은 비워둡니다 */}
                        <SearchInput type="text" placeholder="무엇을 해 보고 싶나요?" />
                        <SearchIcon alt="검색" /> {/* 이곳은 비워둡니다 */}
                    </SearchContainer>
                </Section>
            </ContentArea>

            {/* 하단 네비게이션 바 */}
            <BottomNavBar>
                <NavBarIconImg src="/images/home.png" alt="Home" onClick={() => navigate('/first')} />
                <NavBarIconImg src="/images/circle.png" alt="Circle" onClick={() => navigate('/circle')} />
                <NavBarIconImg src="/images/link.png" alt="Link" onClick={() => navigate('/team')} />
                <NavBarIconImg2 src="/images/profileicon.png" alt="Profile" onClick={() => navigate('/profile')} />
            </BottomNavBar>
        </Container>
    );
}

export default CompetitionDashboardScreen; // App.js에서 이 컴포넌트를 TeamPage로 임포트합니다.

// Styled-components (스타일 정의)
const Container = styled.div`
    background-color: #1A1A1A; /* 어두운 배경 */
    color: #E0E0E0; /* 밝은 텍스트 */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 120px;
    position: relative;
    font-family: 'AppleSDGothicNeo-Regular', 'Noto Sans KR', sans-serif;
`;

const Header = styled.div`
    font-size: 24px;
    color: #E0E0E0; /* 밝은 텍스트 */
    font-weight: bold;
    width: 100%;
    border-bottom: 1px solid #333333; /* 어두운 경계선 */
    padding-bottom: 10px;
    padding-left: 20px;
    padding-top: 50px;
    padding-right: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #222222; /* 어두운 헤더 배경 */
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 25px;
    height: 20px;
    cursor: pointer;
    padding: 2px;
    padding-left: 0px;
`;

const Line = styled.div`
    width: 100%;
    height: 2px;
    background-color: #E0E0E0; /* 밝은 선 */
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    color: #E0E0E0; /* 밝은 텍스트 */
    font-weight: bold;
    margin-bottom: 0px;
`;

const ProfileImage = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    color: #E0E0E0; /* 밝은 텍스트 */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    border: none;
    margin-right: 15px;
    cursor: pointer;
    margin-bottom: 0px;
`;

const ContentArea = styled.div`
    width: 800px;
    max-width: 95%;
    margin-top: 0px;
    padding: 20px;
    overflow-y: auto;
    flex-grow: 1;
    padding-bottom: 80px;
`;

const Section = styled.div`
    margin-bottom: 25px;
    padding-bottom: 0px;
    border-bottom: 1px solid #333333; /* 어두운 경계선 */
    &:last-of-type {
        border-bottom: none;
    }
`;

const SectionHeaderWithArrow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const SectionTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
    color: #E0E0E0; /* 밝은 텍스트 */
    margin: 0;
`;

const ArrowIcon = styled.div`
    width: 18px;
    height: 18px;
    background-color: transparent;
    /* 필요하다면 SVG 아이콘이나 폰트 아이콘으로 대체 */
`;

const CompetitionInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding-right: 25px;
`;

const TeamHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const CompetitionName = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #E0E0E0; /* 밝은 텍스트 */
    margin: 0;
`;

const TeamTitle = styled.h2`
    font-size: 16px;
    color: #AAAAAA; /* 회색 텍스트 */
    font-weight: normal;
    margin: 0;
`;

const TeamMembersContainer = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 10px;
    &::-webkit-scrollbar {
        height: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #555555; /* 어두운 스크롤바 썸 */
        border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: #333333; /* 어두운 스크롤바 트랙 */
    }
`;

const TeamMemberCard = styled.div`
    flex-shrink: 0;
    width: 90px;
    background-color: #2E2E2E; /* 어두운 카드 배경 */
    border-radius: 10px;
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2); /* 어두운 그림자 */
`;

const Icon = styled.div`
    width: ${props => props.size || '16px'};
    height: ${props => props.size || '16px'};
    background-color: ${props => props.color || '#948DCE'}; /* 보라색 계열 아이콘 색상 */
    border-radius: 3px;
    &.triangle {
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        border-radius: 0;
    }
    &.circle {
        border-radius: 50%;
    }
`;

const MemberName = styled.span`
    font-size: 14px;
    color: #E0E0E0; /* 밝은 텍스트 */
    text-align: center;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const InfoCard = styled.div`
    background-color: #2E2E2E; /* 어두운 카드 배경 */
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 5px rgba(0,0,0,0.2); /* 어두운 그림자 */
    cursor: pointer;
    position: relative;
    padding-right: 40px;
`;

const CardIconBackground = styled.div`
    padding: 10px;
    background-color: #444444; /* 어두운 아이콘 배경 */
    border-radius: 50%;
    margin-right: 15px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardTextContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const CardTitle = styled.h3`
    font-size: 16px;
    font-weight: bold;
    color: #E0E0E0; /* 밝은 텍스트 */
    margin: 0;
`;

const CardSubtitle = styled.p`
    font-size: 14px;
    color: #AAAAAA; /* 회색 텍스트 */
    margin: 0;
`;

const ProgressCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ProgressCard = styled(InfoCard)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 15px;
`;

const ProgressLeftContent = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const IconGroup = styled.div`
    display: flex;
    gap: 5px;
`;

const ProgressLabel = styled.div`
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #948DCE; /* 보라색 유지 */
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
`;

const ProgressRightContent = styled.div`
    display: flex;
    align-items: center;
`;

const SearchContainer = styled.div`
    background-color: #333333; /* 어두운 검색바 배경 */
    border-radius: 20px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SearchIconMenu = styled.div`
    width: 25px;
    height: 25px;
    background-color: transparent;
`;

const SearchInput = styled.input`
    flex-grow: 1;
    border: none;
    background-color: transparent;
    padding: 8px 0;
    font-size: 16px;
    color: #E0E0E0; /* 밝은 텍스트 */
    outline: none;
    &::placeholder {
        color: #888888; /* 어두운 플레이스홀더 텍스트 */
    }
`;

const SearchIcon = styled.div`
    width: 25px;
    height: 25px;
    background-color: transparent;
`;

const BottomNavBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #222222; /* 어두운 하단 바 배경 */
    border-top: 1px solid #333333; /* 어두운 경계선 */
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
    padding-bottom: env(safe-area-inset-bottom);
`;

const NavBarIconImg = styled.img`
    width: 50px;
    height: 50px;
    cursor: pointer;
    // ProfilePage와 동일하게 filter: invert(1) 적용
    filter: invert(1);
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }
`;

const NavBarIconImg2 = styled.img`
    width: 60px;
    height: 60px;
    margin-top: -5px;
    cursor: pointer;
    // ProfilePage와 동일하게 filter: invert(1) 적용
    filter: invert(1);
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }
`;
