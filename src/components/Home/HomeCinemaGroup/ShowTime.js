import React, { useState, useEffect, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Slider from "react-slick";
import styled from "styled-components";
import { history } from "../../../App";
import { comparTwoDate, formatTime } from "../../../util/settings/helper";

const CinemaImg = styled.div`
  img {
    width: 50px;
    border-radius: 5px;
  }
`;
const CinemaTextGroup = styled.div`
  width: 80%;
  padding-left: 10px;
  h3 {
    font-size: 14px;
    margin-bottom: 5px;
  }
  p {
    font-size: 12px;
    color: #949494;
  }
`;
const CinemaItem = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  opacity: 0.5;
  transition: 0.5s ease-in-out;
  :hover {
    opacity: 1;
  }
  &.active {
    opacity: 1;
    && h3 {
      color: var(--dark-color);
    }
  }
`;
const CinemaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  max-height: 100%;
  overflow-y: auto;
  border-right: 1px solid #eee;
  padding-top: 10px;
`;
const ShowTimeContainer = styled.div`
  width: 70%;
  height: 100%;
`;
const ShowTimeItem = styled.div`
  display: flex;
  margin: 20px;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: 0.5s;
  cursor: pointer;
`;
const ShowTimeTop = styled.div``;
const ShowTimeImg = styled.div`
  margin-right: 10px;
  position: relative;
  img {
    width: 100px;
    height: 130px;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
  }
  span {
    position: absolute;
    top: 2px;
    left: 2px;
    color: white;
    background-color: var(--primary-color);
    border-radius: 5px;
    padding: 2px 10px;
    font-size: 10px;
    font-weight: 500;
  }
`;
const ShowTimeTextGroup = styled.div`
  padding: 10px;
  h3 {
    font-size: 16px;
    font-weight: 600;
    display: inline-block;
  }
`;
const ShowTimeBottom = styled.div``;
const ShowTimeGroup = styled.div`
  width: 100%;
`;
const ShowTimePhimGroup = styled.div`
  height: calc(100% - 137px);
  overflow-y: auto;
`;
const ShowTimeNumber = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  font-weight: 500;
  transition: 0.5s;
  :hover,
  &.active {
    background-color: var(--light-color);
    border: 1px solid transparent;
    color: var(--text-dark-color);
  }
  :focus {
    outline: none;
  }
  :active {
    background-color: var(--primary-color);
  }
  :disabled {
    color: var(--dark-color);
    opacity: 0.6;
    background-color: var(--light-color);
  }
`;
const DateGroup = styled.div`
  padding: 20px 60px;
  width: 100%;
  position: relative;
`;
const DateItem = styled.div`
  text-align: center;
  background-color: #eee;
  padding: 10px 15px 20px 15px;
  width: 80px;
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
const Container = styled.div`
  display: flex;
  height: calc(100% - 80px);
  width: 100%;
  border: 1px solid #ddd;
`;
const TimeItem = ({ danhSachLichChieu, ngayChieu }) => {
  const [maLichChieu, setMaLichChieu] = useState("");
  useEffect(() => {
    console.log("Run useEffect");
    if (danhSachLichChieu.length !== 0) {
      setMaLichChieu(danhSachLichChieu[0].maLichChieu);
    }
  }, []);
  return (
    <ShowTimeGroup>
      {danhSachLichChieu.sort().map((lichChieu) => {
        if (comparTwoDate(ngayChieu, new Date(lichChieu.ngayChieuGioChieu))) {
          return (
            <ShowTimeNumber
              key={lichChieu.maLichChieu}
              className={lichChieu.maLichChieu === maLichChieu ? "active" : ""}
              onClick={() => {
                setMaLichChieu(lichChieu.maLichChieu);
                history.push("/bookticket");
              }}
              disabled={
                new Date(lichChieu.ngayChieuGioChieu).getTime() <
                new Date("01-01-2019 16:00:00").getTime()
              }
            >
              {formatTime(lichChieu.ngayChieuGioChieu)}
            </ShowTimeNumber>
          );
        }
        return null;
      })}
    </ShowTimeGroup>
  );
};
const ShowTime = ({ lichChieuHeThongRap }) => {
  const [maCumRap, setMaCumRap] = useState("");
  const [danhSachPhim, setDanhSachPhim] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date());
  const refSliderDate = useRef();
  useEffect(() => {
    if (lichChieuHeThongRap.length !== 0) {
      setMaCumRap(lichChieuHeThongRap[0].lstCumRap[0].maCumRap);
      setDanhSachPhim(lichChieuHeThongRap[0].lstCumRap[0].danhSachPhim);
    }
  }, [lichChieuHeThongRap]);

  useEffect(() => {
    if (maCumRap !== "") {
      let cumRap = lichChieuHeThongRap[0].lstCumRap.find(
        (cumRap) => cumRap.maCumRap === maCumRap
      );
      setDanhSachPhim(cumRap.danhSachPhim);
    }
  }, [maCumRap]);

  const renderListCumRap = () => {
    if (lichChieuHeThongRap.length === 0) {
      return <></>;
    }
    return (
      <>
        {lichChieuHeThongRap[0].lstCumRap.map((cumRap) => {
          return (
            <CinemaItem
              key={cumRap.maCumRap}
              onClick={() => {
                setMaCumRap(cumRap.maCumRap);
              }}
              className={cumRap.maCumRap === maCumRap ? "active" : ""}
            >
              <CinemaImg>
                <img src={cumRap.hinhAnh} alt={cumRap.tenCumRap} />
              </CinemaImg>
              <CinemaTextGroup>
                <h3>{cumRap.tenCumRap}</h3>
                <p>{cumRap.diaChi}</p>
              </CinemaTextGroup>
            </CinemaItem>
          );
        })}
      </>
    );
  };

  const renderLichChieuCumRap = () => {
    if (danhSachPhim.length === 0) {
      return <></>;
    }
    return danhSachPhim.map((phim) => {
      let indexLichChieu = phim.lstLichChieuTheoPhim.findIndex((lichChieu) =>
        comparTwoDate(activeDate, new Date(lichChieu.ngayChieuGioChieu))
      );

      return (
        <ShowTimeItem key={phim.maPhim}>
          <ShowTimeTop>
            <ShowTimeImg>
              <img src={phim.hinhAnh} alt="" />
              {phim.hot ? <span>Hot</span> : <></>}
            </ShowTimeImg>
          </ShowTimeTop>
          <ShowTimeBottom>
            <ShowTimeTextGroup>
              <h3>{phim.tenPhim}</h3>
            </ShowTimeTextGroup>
            {indexLichChieu === -1 ? (
              <p>Không có lịch chiếu</p>
            ) : (
              <TimeItem
                danhSachLichChieu={phim.lstLichChieuTheoPhim}
                ngayChieu={activeDate}
              />
            )}
          </ShowTimeBottom>
        </ShowTimeItem>
      );
    });
  };

  const renderShowTimeDate = () => {
    let dataDate = [];
    let arrDay = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"];
    for (let index = 0; index < 7; index++) {
      let toDay = new Date("01/01/2019");
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
    arrows: false,
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <Container>
      <CinemaContainer>{renderListCumRap()}</CinemaContainer>
      <ShowTimeContainer>
        {danhSachPhim.length === 0 ? (
          <></>
        ) : (
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
        )}
        <ShowTimePhimGroup>{renderLichChieuCumRap()}</ShowTimePhimGroup>
      </ShowTimeContainer>
    </Container>
  );
};

export default ShowTime;
