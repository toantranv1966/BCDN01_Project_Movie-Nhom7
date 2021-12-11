import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa";
import { Spin } from "antd";

const DropDown = (props) => {
  const [isDropdown, setIsDropDown] = useState(false);
  const [text, setText] = useState(props.displayName);
  const refDropDown = useRef(null);
  const handleDropDownClick = () => {
    setIsDropDown(!isDropdown);
  };
  const responsiveName = (name) => {
    if (name.length > 30) {
      return name.slice(0, 29) + "...";
    }
    return name;
  };
  useEffect(() => {
    const handleClick = (event) => {
      const { target } = event;
      if (!refDropDown.current.contains(target)) {
        setIsDropDown(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const renderName = () => {
    if (
      props.lstData.length === 0 &&
      props.loaddingDataStatus.success === false
    ) {
      if (props.displayName === "Phim") {
        return <p>{props.displayName}</p>;
      }
      if (props.loaddingDataStatus.loading) {
        return (
          <>
            <p>{props.displayName}</p>
            <Spin />
          </>
        );
      }
    }
    return <p>{responsiveName(text)}</p>;
  };
  const renderListData = () => {
    if (props.lstData.length === 0) {
      return <li disabled> Chưa chọn phim hoặc không còn công chiếu</li>;
    }
    return props.lstData.map((item, index) => {
      return (
        <li
          key={index}
          onClick={() => {
            props.handleLiClick(item.value);
            setText(item.text);
          }}
        >
          {item.text}
        </li>
      );
    });
  };
  return (
    <DropWrapper
      width={props.width}
      dropDown={isDropdown}
      ref={refDropDown}
      onClick={() => {
        handleDropDownClick();
      }}
    >
      <div>
        {renderName()}
        <span>
          <FaAngleDown />
        </span>
      </div>
      <ul>{renderListData()}</ul>
    </DropWrapper>
  );
};

const DropWrapper = styled.div`
  position: relative;
  justify-content: space-between;
  width: ${(props) => props.width};
  margin-right: 10px;

  div {
    display: flex;
    width: 100%;
    cursor: pointer;
    p {
      margin-bottom: 0;
      width: 100%;
    }
    span {
      color: #b4b4b4;
    }
  }
  ul {
    position: absolute;
    left: -20px;
    top: 160%;
    z-index: 10;
    max-height: 300px;

    background-color: white;
    list-style: none;
    padding: 0px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    ${(props) =>
      props.dropDown
        ? `min-width: 100%; 
        opacity: 1; 
        overflow-y: auto;
        `
        : `opacity: 0; 
        width: 0;
        overflow: hidden;
        `}

    li {
      white-space: nowrap;
      padding: 5px 20px;
      cursor: pointer;
      color: #242424;
      display: block;
      transition: 0.3s;
      font-size: 14px;
      :hover {
        background-color: var(--primary-color);
        color: white;
      }
    }
  }
`;
export default DropDown;
