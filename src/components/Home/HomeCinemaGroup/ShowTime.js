import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../../../App";
import { comparTwoDate, formatTime } from "../../../util/settings/helper";
import DateSlider from "../DateSlider";

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
const Container = styled.div`
  display: flex;
  height: calc(100% - 80px);
  width: 100%;
  border: 1px solid #ddd;
`;
const TimeItem = ({ danhSachLichChieu, ngayChieu }) => {
  return (
    <ShowTimeGroup>
      {danhSachLichChieu.sort().map((lichChieu) => {
        if (comparTwoDate(ngayChieu, lichChieu.ngayChieuGioChieu)) {
          return (
            <ShowTimeNumber
              key={lichChieu.maLichChieu}
              onClick={() => {
                history.push(`/bookticket/${lichChieu.maLichChieu}`);
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
  const [activeDate, setActiveDate] = useState(new Date("01-01-2019"));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <Container>
      <CinemaContainer>{renderListCumRap()}</CinemaContainer>
      <ShowTimeContainer>
        {danhSachPhim.length === 0 ? (
          <></>
        ) : (
          <DateSlider
            startDate="01-01-2019"
            activeDate={activeDate}
            setActiveDate={setActiveDate}
          />
        )}
        <ShowTimePhimGroup>{renderLichChieuCumRap()}</ShowTimePhimGroup>
      </ShowTimeContainer>
    </Container>
  );
};

export default ShowTime;
