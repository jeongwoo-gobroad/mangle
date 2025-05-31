// src/pages/RequestPage/index.js
import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 임포트

function RequestPage() {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅 사용
  const projectName = location.state?.projectName || "프로젝트"; // 전달된 projectName을 읽거나 기본값 설정

  const handleGoToMyActivity = () => {
    navigate("/first"); // 예를 들어, 내 활동 목록 또는 메인 페이지로 이동
  };

  return (
    <Container>
      <Header>＊ 맹글</Header>
      <CompleteBox>
        <Title>
          "{projectName}"님과 팀원 매칭에 성공했습니다!
        </Title> 
        <Subtitle>프로젝트에 성공적으로 수락되었습니다.</Subtitle>
        <CheckMark>
          <img src="/images/check.png" alt="완료 체크 표시" />
        </CheckMark>
        <Subtitle2>이제 프로젝트에서 팀원들과 함께 활동하실 수 있습니다.</Subtitle2>
        <LoginButton onClick={handleGoToMyActivity}>내 활동 페이지로 이동</LoginButton>
      </CompleteBox>
    </Container>
  );
}

export default RequestPage;

const Container = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  font-size: 24px;
  color: #948dce;
  font-weight: bold;
  align-self: flex-start;
  margin-left: 30px;
  width: 100%;
  border-bottom: 1px solid white;
  padding-bottom: 5px;
  padding-left: 30px;
  padding-top: 60px;
  margin-bottom: 10px; /* 적절한 상단 여백 */
`;

const CompleteBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px; /* 적절한 상단 여백 */
  padding: 30px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #1a1a1a;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 0px;
  color: #948dce; /* 강조 색상 */
`;

const Subtitle = styled.p`
  font-size: 13px;
  margin-top: 0px;
  margin-bottom: 20px;
  color: #ccc;
`;

const CheckMark = styled.div`
  margin-bottom: 20px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const Subtitle2 = styled.p`
  font-size: 15px;
  margin-top: 0px;
  margin-bottom: 15px;
  color: #ccc;
`;
const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  background-color: #948dce;
  color: black;
  font-weight: bold;
  border: none;
  margin-top: 5px;
  margin-bottom: 25px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
