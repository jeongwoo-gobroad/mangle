// src/pages/SignupCompletePage/index.js
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SignupCompletePage() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <Container>
      <Header>＊ 맹글</Header>
      <CompleteBox>
        <Title>회원가입 완료!</Title>
        <Subtitle>성공적으로 맹글 서비스에 가입되었습니다.</Subtitle>
        <CheckMark>
          {/* ✅ 이모지 대신 이미지를 사용합니다. */}
          <img src="/images/check.png" alt="완료 체크 표시" /> {/* ✅ 이미지 경로 수정 */}
        </CheckMark>
        <Subtitle2>이제 로그인하여 서비스를 이용하실 수 있습니다.</Subtitle2>
        <LoginButton onClick={handleGoToLogin}>로그인 페이지로 이동</LoginButton>
      </CompleteBox>
    </Container>
  );
}

export default SignupCompletePage;

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
  margin-bottom: 00px;
  color: #948dce; /* 강조 색상 */
`;

const Subtitle = styled.p`
  font-size: 13px;
  margin-top: 0px;
  margin-bottom: 20px;
  color: #ccc;
`;

const CheckMark = styled.div`
  /* 기존 폰트 사이즈와 색상 속성은 이미지에는 적용되지 않습니다. */
  /* 이미지 크기를 조정하려면 img 태그에 직접 스타일을 적용하거나 CheckMark 내에서 img 태그를 스타일링합니다. */
  margin-bottom: 20px;
  width: 70px; /* 이미지 너비 조정 (원하는 크기로 조절) */
  height: 70px; /* 이미지 높이 조정 (원하는 크기로 조절) */
  display: flex; /* 이미지를 중앙에 정렬하기 위해 flexbox 사용 */
  justify-content: center;
  align-items: center;

  img {
    width: 100%; /* 부모 CheckMark div의 크기에 맞춤 */
    height: 100%;
    object-fit: contain; /* 이미지 비율 유지 */
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