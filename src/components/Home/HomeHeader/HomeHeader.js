import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { history } from "../../../App";
import { NavLink } from "react-router-dom";
import HomeHeaderLogin from "./HomeHeaderLogin";

const HomeHeader = () => {
  const lstMenu = [
    {
      name: "lịch chiếu",
      id: "lichChieu",
      topPosition: 730,
    },
    {
      name: "cụm rạp",
      id: "cumRap",
      topPosition: 900,
    },
    {
      name: "tin tức",
      id: "home__lichChieu",
    },
  ];
  const [isDropdown, setIsDropdown] = useState(false);

  const { nguoiDung } = useSelector(
    (rootReducer) => rootReducer.QuanLyNguoiDungReducer
  );
  const handleLogoClick = () => {
    history.push("/");
  };

  const refAccountLogin = useRef(null);
  useEffect(() => {
    if (isDropdown === false) {
      return null;
    }
    const handleClick = (event) => {
      const { target } = event;
      if (!refAccountLogin.current.contains(target)) {
        setIsDropdown(!isDropdown);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isDropdown]);
  return (
    <HeaderWrapper>
      <HeaderContent>
        {/* Logo */}
        <HeaderLogo onClick={handleLogoClick}>
          <img src="./img/logo.png" alt="" />
        </HeaderLogo>
        {/* Menu */}
        <HeaderMenu>
          {lstMenu.map((menuItem, index) => {
            return (
              <li key={index}>
                <NavLink to={`/${menuItem.id}`} activeClassName="active">
                  {menuItem.name}
                </NavLink>
              </li>
            );
          })}
        </HeaderMenu>
        {/* Account Login */}
        <HomeHeaderLogin nguoiDung={nguoiDung} />
      </HeaderContent>
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  line-height: 60px;
  font-size: 14px;
  box-shadow: 0 0 15px rgb(0 0 0 / 30%);
  background-color: rgba(255, 255, 255, 0.95);
  transition: all 0.2s;
  padding: 0px 20px;
  z-index: 50;
`;
const HeaderContent = styled.div`
  display: flex;
  justify-items: center;
  justify-content: space-between;
  width: var(--container-width);
  margin: 0 auto;
`;
const HeaderLogo = styled.div`
  img {
    width: 40px;
  }
  cursor: pointer;
`;
const HeaderMenu = styled.ul`
  list-style: none;
  margin-bottom: 0;

  li {
    display: inline-block;
    margin-right: 20px;
    text-transform: capitalize;
    cursor: pointer;
    a {
      text-decoration: none;
      color: #242424;
      transition: all 0.3s ease-in;
      &.active {
        color: var(--primary-color);
      }
    }
    &:hover {
      a {
        color: var(--primary-color);
      }
    }
  }
`;

export default HomeHeader;
