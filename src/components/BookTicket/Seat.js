import React, { useState } from "react";
import styled from "styled-components";

const SeatItem = styled.div`
  width: calc(100% / 16);
  margin: 10px 0px;
  button {
    display: inline-block;
    width: 28px;
    height: 20px;
    border: 1px solid transparent;
    border-radius: 7px;
    background-color: ${(props) =>
      props.selected ? "var(--color-blue)" : "rgb(224, 226, 225)"};
    position: relative;
    transition: all 0.5s ease 0s;
    margin: 0px 5px;
    ::after {
      content: "";
      display: inline-block;
      width: 20px;
      height: 4px;
      border-radius: 4px;
      cursor: pointer;
      background-color: ${(props) =>
        props.selected ? "var(--color-blue)" : "rgb(224, 226, 225)"};
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -6px;
      transition: all 0.5s ease 0s;
    }
    &.seat--sold {
      &,
      &::after {
        background-color: var(--light-color);
      }
    }
    &.seat--selected {
      &,
      &::after {
        background-color: var(--color-green);
      }
    }
    &.seat--owned {
      &,
      &::after {
        background-color: var(--color-blue);
      }
    }
    :hover:enabled {
      &,
      &::after {
        background-color: var(--color-green);
      }
    }

    :focus {
      outline: none;
    }
    :disabled {
      &,
      &::after {
        cursor: auto;
      }
    }
  }
`;

const Seat = ({ seat, handleSelected, defautClassName, type }) => {
  const [selected, setSelected] = useState(false);
  return (
    <SeatItem
      onClick={() => {
        if (type === "button") {
          setSelected(!selected);
          handleSelected(seat);
        }
      }}
      selected={selected}
    >
      <button
        disabled={
          type === "icon" ? true : seat?.taiKhoanNguoiDat ? true : false
        }
        className={
          defautClassName ||
          `${seat?.taiKhoanNguoiDat ? "seat--sold" : ""} 
          ${selected ? "seat--selected" : ""}`
        }
      ></button>
    </SeatItem>
  );
};

export default React.memo(Seat);
