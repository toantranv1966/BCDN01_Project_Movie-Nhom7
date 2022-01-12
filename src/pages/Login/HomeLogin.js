import React, { useState } from "react";
import styled from "styled-components";
import FormSignIn from "../../components/HomeLogin/FormSignIn";
import FormSignUp from "../../components/HomeLogin/FormSignUp";
import { FaTimes } from "react-icons/fa";
import { history } from "../../App";
import { useSelector } from "react-redux";
const HomeLogin = (props) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { nguoiDung } = useSelector(
    (rootReducer) => rootReducer.QuanLyNguoiDungReducer
  );
  if (Object.keys(nguoiDung).length !== 0) {
    props.history.goBack();
  }
  return (
    <LoginWrapper>
      <LoginCard>
        <CloseButton
          isSignIn={isSignIn}
          onClick={() => {
            history.push("/");
          }}
        >
          <FaTimes />
        </CloseButton>
        <LoginFormContainer>
          <FormSignUp
            signIn={isSignIn}
            changeSignIn={(value) => {
              setIsSignIn(value);
            }}
          />
          <FormSignIn
            signIn={isSignIn}
            changeSignUp={(value) => {
              setIsSignIn(value);
            }}
          />
        </LoginFormContainer>
        <BgCover signIn={isSignIn} />
      </LoginCard>
    </LoginWrapper>
  );
};
const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../img/bg_login.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const LoginCard = styled.div`
  height: 550px;
  width: 800px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 45%);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
`;
const LoginFormContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const BgCover = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  background-image: url(../img/bg_login_2.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.5s ease-in-out;
  ${(props) => (props.signIn === true ? "" : "transform: translateX(-100%);")}
`;
export default HomeLogin;

const CloseButton = styled.span`
  position: absolute;
  display: inline-block;
  cursor: pointer;
  top: 20px;
  right: 20px;
  ${(props) => (props.isSignIn ? "color: white;" : "color:#242424;")}
  z-index: 15;
  line-height: 20px;
  border-radius: 50%;
  font-size: 18px;
  transition: 0.5s;
`;
