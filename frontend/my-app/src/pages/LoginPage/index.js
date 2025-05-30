import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

function LoginPage() {
  const navigate = useNavigate();


  const [userId, setUserId] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [name, setName] = useState("");   


  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };


  const handleLogin = async () => {
    try {

      const response = await axios.post("http://jeongwoo-kim-web.myds.me:8080/", {
        userId, 
        email,  
        name,   

      });

      // ✅ 응답에서 token, user 정보 받기
      const { token, user } = response.data;

      // ✅ localStorage에 저장해서 나중에 인증 요청할 때 씀
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("userName", user.name);

      // ✅ 로그인 성공 후 프로필 페이지로 이동
      navigate("/first");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패! 정보를 확인해주세요."); 
    }
  };

  return (
    <Container>
      <Header>＊ 맹글</Header>
      <LoginBox>
        <Title>로그인</Title>
        <Subtitle>계정에 로그인하여 계속하세요.</Subtitle>


        <Input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={handleChange(setUserId)}
        />

        <Input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={handleChange(setEmail)}
        />

        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleChange(setName)}
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