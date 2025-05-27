// src/pages/SignupPage/index.js
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [major, setMajor] = useState("");
  const [interests, setInterests] = useState([]);

  const interestOptions = [
    "AI", "Web", "기획", "창업", "디자인", "마켓팅", "프론트엔드", "백엔드", "데이터 분석"
  ];

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setInterests((prevInterests) => [...prevInterests, value]);
    } else {
      setInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== value)
      );
    }
  };

  const handleRegister = () => {
    console.log("회원가입 시도:", {
      email, userId, password, name, school, grade, major, interests,
    });

    // =========================================================================
    // ✅ 여기에 실제 백엔드 회원가입 API 호출 로직을 추가해야 합니다.
    // fetch('YOUR_BACKEND_REGISTER_API_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, userId, password, name, school, grade, major, interests }),
    // })
    // .then(response => {
    //   if (response.ok) {
    //     return response.json(); // 성공적인 응답을 JSON으로 파싱
    //   }
    //   throw new Error('회원가입 실패'); // 오류 발생 시 에러 던지기
    // })
    // .then(data => {
    //   console.log('회원가입 성공:', data);
    //   navigate("/signup-complete"); // ✅ 회원가입 성공 시 완료 페이지로 이동
    // })
    // .catch(error => {
    //   console.error('회원가입 에러:', error);
    //   alert('회원가입에 실패했습니다: ' + error.message); // 사용자에게 알림
    // });
    // =========================================================================

    // ✅ 임시로 API 호출 없이 바로 완료 페이지로 이동 (테스트용)
    // 실제 백엔드 연동 시 위 주석 처리된 fetch 로직을 사용해야 합니다.
    navigate("/signup-complete");
  };

  return (
    <Container>
      <Header>＊ 맹글</Header>
      <RegisterBox>
        <Title>회원 가입</Title>
        <Subtitle>새 계정을 만들고 맹글 서비스를 이용하세요.</Subtitle>

        <Input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={handleChange(setEmail)}
        />
        <Input
          type="text"
          placeholder="사용자 아이디"
          value={userId}
          onChange={handleChange(setUserId)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handleChange(setPassword)}
        />
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleChange(setName)}
        />
        <Input
          type="text"
          placeholder="학교"
          value={school}
          onChange={handleChange(setSchool)}
        />
        <Input
          type="text"
          placeholder="학년"
          value={grade}
          onChange={handleChange(setGrade)}
        />
        <Input
          type="text"
          placeholder="전공"
          value={major}
          onChange={handleChange(setMajor)}
        />

        <InterestSection>
          <InterestTitle>관심 분야 선택</InterestTitle>
          <CheckboxGrid>
            {interestOptions.map((option) => (
              <CheckboxContainer key={option}>
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  checked={interests.includes(option)}
                  onChange={handleInterestChange}
                />
                <label htmlFor={option}>{option}</label>
              </CheckboxContainer>
            ))}
          </CheckboxGrid>
        </InterestSection>

        <RegisterButton onClick={handleRegister}>회원 가입</RegisterButton>

        <LoginLinkContainer>
          <span>이미 계정이 있으신가요?</span>
          <LoginLink onClick={() => navigate("/login")}>로그인</LoginLink>
        </LoginLinkContainer>
      </RegisterBox>
    </Container>
  );
}

export default SignupPage;


const Container = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-top: 60px; */ /* SignupPage도 LoginPage와 동일하게 하단 여백 이슈 해결 */
`;

const Header = styled.div`
  font-size: 24px;
  color: #948dce;
  font-weight: bold;
  /* margin-bottom: 60px; */
  align-self: flex-start;
  margin-left: 30px;
  width: 100%;
  border-bottom: 1px solid white;
  padding-bottom: 5px;
  padding-left: 30px;
  padding-top: 60px; /* Header 자체의 상단 여백 */
`;

const RegisterBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px; /* Header와 RegisterBox 사이 간격 */
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 6px;
  width: 100%;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  color: #ccc;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #999;
  border-radius: 6px;
  background: black;
  color: white;
  margin-bottom: 14px;
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  background-color: #948dce;;
  color: black;
  font-weight: bold;
  border: none;
  margin-bottom: 24px;
  display: block;
  cursor: pointer;
`;

const InterestSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const InterestTitle = styled.p`
  font-size: 16px;
  color: #eee;
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #aaa;
  cursor: pointer;

  input[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid #999;
    border-radius: 4px;
    background-color: black;
    position: relative;
    cursor: pointer;
  }

  input[type="checkbox"]:checked {
    background-color: #948dce;
    border-color: #948dce;
  }

  input[type="checkbox"]:checked::after {
    content: '✔';
    color: black;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const LoginLinkContainer = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-top: 20px;
  display: flex;
  gap: 5px;
`;

const LoginLink = styled.a`
  color: #948dce;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;