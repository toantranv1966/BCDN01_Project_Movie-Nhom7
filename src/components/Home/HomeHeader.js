import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FaUser, FaAngleDown } from "react-icons/fa";
import { AiOutlinePoweroff, AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { DANG_XUAT } from "../../redux/actions/types/QuanLyNguoiDungTypes";
import { history } from "../../App";

const AccountLogin = React.forwardRef((props, ref) => {
  const isLogin = Object.keys(props.nguoiDung).length !== 0; //defaut false
  const dispatch = useDispatch();
  const handleLoginClick = () => {
    history.push("/login");
  };

  if (isLogin) {
    return (
      <>
        <HeaderLogin ref={ref}>
          <HeaderLoginBar
            onClick={() => {
              props.setIsDropDown(!props.isDropDown);
            }}
          >
            <span>
              <FaUser />
            </span>
            <span>{props.nguoiDung.hoTen}</span>
            <span>
              <FaAngleDown />
            </span>
          </HeaderLoginBar>
          <HeaderAccountPanel isShow={props.isDropDown}>
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
          handleLoginClick();
        }}
        ref={ref}
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
});

const HomeHeader = (props) => {
  const lstMenu = [
    {
      name: "lịch chiếu",
      id: "#lichChieu",
    },
    {
      name: "cụm rạp",
      id: "#home__lichChieu",
    },
    {
      name: "tin tức",
      id: "#home__lichChieu",
    },
  ];
  const [liSelect, setLiSelect] = useState({});
  const [isDropdown, setIsDropdown] = useState(false);

  const { nguoiDung } = useSelector(
    (rootReducer) => rootReducer.QuanLyNguoiDungReducer
  );
  const handleLogoClick = () => {
    history.push("/");
  };
  const handleMenuItemClick = (menuItem) => {
    lstMenu.map((item) => {
      if (item.name === menuItem.name) {
        setLiSelect(item);
      }
      return null;
    });
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
              <li
                key={index}
                className={menuItem.name === liSelect.name ? "active" : ""}
                onClick={() => {
                  handleMenuItemClick(menuItem);
                }}
              >
                <a href={menuItem.id}>{menuItem.name}</a>
              </li>
            );
          })}
        </HeaderMenu>
        {/* Account Login */}
        <AccountLogin
          ref={refAccountLogin}
          isDropDown={isDropdown}
          nguoiDung={nguoiDung}
          setIsDropDown={(value) => {
            setIsDropdown(value);
          }}
        />
      </HeaderContent>
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
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
    }
    &:hover {
      a {
        color: var(--primary-color);
      }
    }
    &.active {
      a {
        color: var(--primary-color);
      }
    }
  }
`;
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
export default HomeHeader;
