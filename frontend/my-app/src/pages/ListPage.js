// src/pages/ListPage/index.js
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// ListPage 컴포넌트 시작

function ListPage() {
    const navigate = useNavigate();

    // Dummy data for projects based on the screenshot
    const projects = [
        {
            name: "프로젝트 Gold",
            time: "3s",
            description: "바로 시작합시다!",
            showButton: true,
            avatar: "/images/profile.png",
        },
        {
            name: "프로젝트 Silver",
            time: "10m",
            description: "구체적인건 이야기 해 드릴 수 없...",
            showButton: true,
            avatar: "/images/profile.png",
        },
        {
            name: "프로젝트 Bronze",
            time: "20m",
            description: "당신의 쪽에 답변이 도착했습니다.\nㅣ 그러죠 뭐",
            showButton: true,
            avatar: "/images/profile.png",
        },
        {
            name: "프로젝트 Iron",
            time: "10d",
            description: "당신의 쪽에 답변이 도착했습니다.\nㅣ ㅅㄱ",
            showButton: true,
            avatar: "/images/profile.png",
        },
    ];

    // '수락하기' 버튼 클릭 핸들러: 프로젝트 이름을 인자로 받음
    const handleAcceptClick = (projectName) => {
        navigate('/request-complete', { state: { projectName: projectName } }); // state로 projectName 전달
    };

    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <Menu>
                        <Line />
                        <Line />
                        <Line />
                    </Menu>
                    <HeaderTitle>
                        맹글
                    </HeaderTitle>
                </HeaderLeft>

                <ProfileImage src="/images/profile.png" alt="프로필 이미지" onClick={() => navigate('/profile')} />
            </Header>

            <ProjectListContainer>
                {projects.map((project, index) => (
                    <ProjectItem key={index}>
                        <RedDot />

                        <ProjectAvatar src={project.avatar} alt={`${project.name} Avatar`} />
                        <ProjectInfo>
                            <ProjectTitleTime>
                                <ProjectTitle>{project.name}</ProjectTitle>
                                <ProjectTime>{project.time}</ProjectTime>
                            </ProjectTitleTime>

                            <ProjectDescription>{project.description.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < project.description.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}</ProjectDescription>
                        </ProjectInfo>
                        {/* onClick에 project.name을 전달하도록 수정 */}
                        {project.showButton && <AcceptButton onClick={() => handleAcceptClick(project.name)}>수락하기</AcceptButton>}
                    </ProjectItem>
                ))}
            </ProjectListContainer>

            <BottomNavBar>
                <NavBarIcon src="/images/home.png" alt="Home" onClick={() => navigate('/first')} />
                <NavBarIcon src="/images/circle.png" alt="Circle" onClick={() => navigate('/circle')} />
                <NavBarIcon src="/images/link.png" alt="Link" onClick={() => navigate('/team')} />
                <NavBarIcon2 src="/images/profileicon.png" alt="Profile" onClick={() => navigate('/profile')} />
            </BottomNavBar>
        </Container>
    );
}

export default ListPage;

// styled-components 정의 (변경 없음)
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

const Header = styled.div`
    font-size: 24px;
    color: #948dce;
    font-weight: bold;
    width: 100%;
    border-bottom: 1px solid #333;
    padding-bottom: 5px;
    padding-left: 30px;
    padding-top: 60px;
    padding-right: 30px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 25px;
    height: 20px;
    cursor: pointer;
    padding: 2px;
    padding-left: 15px;
`;

const Line = styled.div`
    width: 100%;
    height: 2px;
    background-color: white;
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    color: #948dce;
    font-weight: bold;
    margin-bottom: 7px;
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #948dce;
    margin-right: 15px;
    cursor: pointer;
    margin-bottom: 7px;
`;

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

const ProjectListContainer = styled.div`
    width: 100%;
    padding: 20px;
    flex-grow: 1;
`;

const ProjectItem = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #333;
    gap: 10px;

    &:last-child {
        border-bottom: none;
    }
`;

const ProjectAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
    border: 2px solid #948dce;
`;

const ProjectInfo = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const ProjectTitleTime = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
`;

const ProjectTitle = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: white;
`;

const ProjectTime = styled.span`
    font-size: 14px;
    color: #888;
`;

const ProjectDescription = styled.span`
    font-size: 16px;
    color: #ccc;
`;

const AcceptButton = styled.button`
    background-color: #948dce;
    color: black;
    font-weight: bold;
    padding: 8px 15px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    white-space: nowrap;
    margin-right: 15px;

    &:hover {
        opacity: 0.9;
    }
`;

const RedDot = styled.div`
    width: 8px;
    height: 8px;
    background-color: red;
    border-radius: 50%;
    margin-right: 10px;
`;
