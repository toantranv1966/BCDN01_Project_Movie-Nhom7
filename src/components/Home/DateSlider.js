import React, { useRef } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { arrDay, comparTwoDate } from "../../util/settings/helper";
// import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const DateItem = styled.div`
  text-align: center;
  background-color: #eee;
  padding: 10px 15px 20px 15px;
  width: 80px;
  margin: 0 auto;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  transition: 0.5s;
  ::before,
  ::after {
    content: "";
    background-color: white;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    bottom: 20px;
    left: -5px;
  }
  ::after {
    right: -5px;
    left: auto;
  }
  :hover,
  &.active {
    background-color: var(--light-color);
    h3,
    p {
      color: white;
    }
  }
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
  }
  h3 {
    font-size: 14px;
    font-weight: 700;
    transition: 0.5s;
  }
  p {
    margin-bottom: 0px;
    transition: 0.5s;
    font-weight: 600;
    color: #aaa;
  }
`;

const DateGroup = styled.div`
  padding: 20px 60px;
  width: 100%;
  position: relative;
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  ${(props) => (props.rightSide ? "right: 20px;" : "left: 20px;")}
  transform: translatey(-50%);
  font-size: 16px;
  border-radius: 5px;
  color: #242424;
  background-color: #eee;
  border: 1px solid transparent;
  height: calc(100% - 40px);
  cursor: pointer;
  transition: 0.5s;
  display: flex;
  align-items: center;
  padding: 0px 5px;
  :hover {
    color: white;
    background-color: var(--light-color);
  }
  :active {
    background-color: var(--primary-color);
  }
`;
const DateSlider = ({ startDate, activeDate, setActiveDate }) => {
  const refSliderDate = useRef();

  const renderShowTimeDate = () => {
    let dataDate = [];
    for (let index = 0; index < 7; index++) {
      let toDay = new Date(startDate);
      dataDate.push(new Date(toDay.getTime() + index * 24 * 60 * 60 * 1000));
    }
    return dataDate.map((date, index) => {
      return (
        <div key={index}>
          <DateItem
            onClick={() => {
              setActiveDate(date);
            }}
            className={comparTwoDate(date, activeDate) ? "active" : ""}
          >
            <span></span>
            <h3>{`${
              date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
            }-${date.getMonth() + 1}`}</h3>
            <p>{arrDay[date.getDay()]}</p>
          </DateItem>
        </div>
      );
    });
  };
  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <DateGroup>
      <Slider ref={refSliderDate} {...settings}>
        {renderShowTimeDate()}
      </Slider>
      <ArrowButton
        onClick={() => {
          refSliderDate.current.slickPrev();
        }}
      >
        <AiOutlineLeft />
      </ArrowButton>
      <ArrowButton
        rightSide
        onClick={() => {
          refSliderDate.current.slickNext();
        }}
      >
        <AiOutlineRight />
      </ArrowButton>
    </DateGroup>
  );
};

export default DateSlider;
