import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

function LoginPage() {
  const navigate = useNavigate();

  // 상태 선언 순서는 가독성을 위해 유지
  const [userId, setUserId] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://jeongwoo-kim-web.myds.me:8080/auth/login", {
        userId,   
        email,    
        password, 
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("userName", user.name);

      navigate("/first");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패! 아이디/이메일 또는 비밀번호를 확인해주세요."); 
    }
  };

  return (
    <Container>
      <Header>＊ 맹글</Header>
      <LoginBox>
        <Title>로그인</Title>
        <Subtitle>계정에 로그인하여 계속하세요.</Subtitle>

        {/* ✅ 순서 1: 이메일 입력 칸 */}
        <Input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={handleChange(setEmail)}
        />

        {/* ✅ 순서 2: 아이디 입력 칸 */}
        <Input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={handleChange(setUserId)}
        />

        {/* ✅ 순서 3: 비밀번호 입력 칸 */}
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handleChange(setPassword)}
        />

        <LoginButton onClick={handleLogin}>로그인</LoginButton>

        <Divider><span>or continue with</span></Divider> 

        <SignupButton onClick={() => navigate("/signup")}>회원 가입</SignupButton>

        <RememberMe>
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">로그인 상태 유지</label>
        </RememberMe>
      </LoginBox>
    </Container>
  );
}

export default LoginPage;

// styled-components 부분은 변경 없이 유지됩니다.
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
`;

const LoginBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  padding-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 6px;
  width: 100%;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 30px;
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

const LoginButton = styled.button`
  width: 420px; 
  padding: 12px;
  border-radius: 6px;
  background-color: #948dce;
  color: black;
  font-weight: bold;
  border: none;
  margin-bottom: 24px;
  display: block;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #333;
  line-height: 0.1em;
  margin: 20px 0;
  color: #aaa;
  font-size: 14px;

  span {
    background: black;
    padding: 0 10px;
  }
`;

const SignupButton = styled.button`
  width: 420px; 
  padding: 12px;
  border-radius: 6px;
  background-color: transparent;
  color: #948dce;
  font-weight: bold;
  border: 1px solid #948dce;
  margin-bottom: 24px;
  cursor: pointer;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #aaa;
  width: 400px; 
  justify-content:center; 

  input[type="checkbox"] {
    margin-right: 8px;
    appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid #999;
    border-radius: 3px;
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
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
