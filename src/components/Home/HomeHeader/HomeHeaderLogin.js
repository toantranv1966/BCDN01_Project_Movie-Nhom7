import React, { useState } from "react";
import { FaUser, FaAngleDown } from "react-icons/fa";
import { AiOutlinePoweroff, AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { DANG_XUAT } from "../../../redux/actions/types/QuanLyNguoiDungTypes";
import { history } from "../../../App";
import styled from "styled-components";

const HomeHeaderLogin = ({ nguoiDung }) => {
  const isLogin = Object.keys(nguoiDung).length !== 0; //defaut false
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  if (isLogin) {
    return (
      <>
        <HeaderLogin>
          <HeaderLoginBar
            onClick={() => {
              setShow(!show);
            }}
          >
            <span>
              <FaUser />
            </span>
            <span>{nguoiDung.hoTen}</span>
            <span>
              <FaAngleDown />
            </span>
          </HeaderLoginBar>
          <HeaderAccountPanel isShow={show}>
            <HeaderAccountMenu>
              <li>
                <i>
                  <AiOutlineUser />
                </i>
                <span>Hồ sơ</span>
              </li>
              <li
                onClick={() => {
                  dispatch({ type: DANG_XUAT });
                }}
              >
                <i>
                  <AiOutlinePoweroff />
                </i>
                <span>Đăng xuất</span>
              </li>
            </HeaderAccountMenu>
          </HeaderAccountPanel>
        </HeaderLogin>
      </>
    );
  }
  return (
    <>
      <HeaderLogin
        onClick={() => {
          history.push("/login");
        }}
      >
        <HeaderLoginBar>
          <span>
            <FaUser />
          </span>
          <span>Đăng Nhập</span>
        </HeaderLoginBar>
      </HeaderLogin>
    </>
  );
};
const HeaderLogin = styled.div`
  cursor: pointer;
  color: #ccc;
  transition: 0.5s;
  position: relative;
`;
const HeaderLoginBar = styled.div`
  color: #242424;
  span:first-of-type {
    color: #fff;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 24px;
    display: inline-block;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 10px;
  }
  span:last-of-type {
    margin-left: 10px;
    color: #242424;
  }
`;

const HeaderAccountPanel = styled.div`
  position: absolute;
  ${(props) => (props.isShow === true ? "top: 60px;" : "top: 80px;")}
  right: 0;
  width: 180px;
  ${(props) => (props.isShow === true ? "height: auto" : "height: 0;")}
  ${(props) => (props.isShow === true ? "opacity: 1;" : "opacity: 0;")}
  background-color: white;

  z-index: 30;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  cursor: auto;
  overflow: hidden;
  transition: 0.5s ease-in-out;
`;
const HeaderAccountMenu = styled.ul`
  list-style: none;
  padding: 10px 0;
  margin: 0;
  li {
    color: #242424;
    display: block;
    line-height: 1.2;
    padding: 10px 20px;
    position: relative;
    transition: 0.5s;
    cursor: pointer;
    i {
      position: absolute;
      top: 23%;
      left: 10px;
    }
    span {
      background-color: white;
      margin-left: 10px;
      background-color: transparent;
    }
    :hover {
      background-color: #e9e9e9;
    }
  }
`;
export default HomeHeaderLogin;
