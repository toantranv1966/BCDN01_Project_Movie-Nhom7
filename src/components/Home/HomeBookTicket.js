import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "./DropDown";
import { layThongTinLichChieu } from "../../redux/actions/QuanLyRapAction";
import { history } from "../../App";

const BookTicketNow = (props) => {
  const { danhSachPhim } = props;
  const [arrPhim, setArrPhim] = useState({ name: "Phim", lstData: [] });
  const [arrRap, setArrRap] = useState({ name: "Rạp", lstData: [] });
  const [arrNgayXem, setArrNgayXem] = useState({
    name: "Ngày xem",
    lstData: [],
  });
  const [arrGioXem, setArrGioXem] = useState({
    name: "Giờ xem",
    lstData: [],
  });
  const [disabledBtn, setDisabledBtn] = useState(true);
  const dispatch = useDispatch();
  const { lichChieu, isLoading, isLoadSuccess } = useSelector(
    (rootReducer) => rootReducer.QuanLyRapReducer
  );
  const handleLiClickPhim = (maPhim) => {
    dispatch(layThongTinLichChieu(maPhim));
    setArrRap({ name: "Rạp", lstData: [] });
  };

  const handleClickRap = (maCumRap) => {
    const arrCumRap = [];
    lichChieu.heThongRapChieu.map((heThongRap) => {
      const newCumRap = heThongRap.cumRapChieu.find(
        (cumRap) => cumRap.maCumRap === maCumRap
      );
      if (newCumRap) {
        arrCumRap.push(newCumRap);
      }
      return null;
    });

    const arrNgayChieu = [];
    const formatDate = (dateText) => {
      let dateValue = new Date(dateText);
      if (dateValue) {
        let date =
          dateValue.getDay() < 10
            ? `0${dateValue.getDay()}`
            : dateValue.getDay();
        let month =
          dateValue.getMonth() > 2
            ? dateValue.getMonth()
            : `0${dateValue.getMonth()}`;
        let year = dateValue.getFullYear();
        return `${date}-${month}-${year}`;
      }
      return dateValue.toDateString();
    };
    if (arrCumRap) {
      arrCumRap.map((cumRap) => {
        return cumRap.lichChieuPhim.map((lichChieu) => {
          arrNgayChieu.push({
            value: lichChieu.maLichChieu,
            text: formatDate(lichChieu.ngayChieuGioChieu),
          });
          return null;
        });
      });
    }

    setArrNgayXem({ name: "Ngày xem", lstData: arrNgayChieu });
  };

  const handleClickNgayXem = (maLichChieu) => {
    const arrLichChieu = [];
    lichChieu.heThongRapChieu.map((heThongRap) => {
      heThongRap.cumRapChieu.map((cumRap) => {
        if (cumRap.lichChieuPhim.length !== 0) {
          const lichChieu = cumRap.lichChieuPhim.find(
            (lichChieu) => lichChieu.maLichChieu === maLichChieu
          );
          if (lichChieu) {
            arrLichChieu.push(lichChieu);
          }
        }
        return null;
      });
      return null;
    });

    const arrGioChieu = [];
    const formatTime = (dateText) => {
      let dateValue = new Date(dateText);
      if (dateValue) {
        let hour = dateValue.getHours();
        let min = dateValue.getMinutes();
        return `${hour}:${min}`;
      }
      return dateValue.toDateString();
    };
    if (arrLichChieu) {
      arrLichChieu.map((lichChieu) => {
        arrGioChieu.push({
          value: lichChieu.maLichChieu,
          text: formatTime(lichChieu.ngayChieuGioChieu),
        });
        return null;
      });
    }

    setArrGioXem({ name: "Ngày xem", lstData: arrGioChieu });
  };
  const handleClickGioXem = (maLichChieu) => {
    if (maLichChieu) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };
  useEffect(() => {
    const newArrPhim = { name: "Phim", lstData: [] };
    if (danhSachPhim) {
      danhSachPhim.map((phim) => {
        newArrPhim.lstData.push({ value: phim.maPhim, text: phim.tenPhim });
        return null;
      });
    }
    setArrPhim(newArrPhim);
    if (Object.keys(lichChieu).length !== 0) {
      const newArrRap = { name: "Rạp", lstData: [] };
      lichChieu.heThongRapChieu.map((hethongRap) => {
        return hethongRap.cumRapChieu.map((cumRap) => {
          newArrRap.lstData.push({
            value: cumRap.maCumRap,
            text: cumRap.tenCumRap,
          });
          return null;
        });
      });
      setArrRap(newArrRap);
    }
  }, [danhSachPhim, lichChieu]);

  if (danhSachPhim) {
    return (
      <Wrapper>
        <DropDown
          lstData={arrPhim.lstData}
          width="40%"
          handleLiClick={(value) => {
            handleLiClickPhim(value);
          }}
          displayName={arrPhim.name}
          loaddingDataStatus={{ loading: false, success: true }}
        />
        <DropDown
          lstData={arrRap.lstData}
          width="30%"
          handleLiClick={(value) => {
            handleClickRap(value);
          }}
          displayName={arrRap.name}
          loaddingDataStatus={{
            loading: isLoading,
            success: isLoadSuccess,
          }}
        />
        <DropDown
          lstData={arrNgayXem.lstData}
          width="15%"
          handleLiClick={(value) => {
            handleClickNgayXem(value);
          }}
          displayName={arrNgayXem.name}
          loaddingDataStatus={{
            loading: isLoading,
            success: isLoadSuccess,
          }}
        />
        <DropDown
          lstData={arrGioXem.lstData}
          width="15%"
          handleLiClick={(value) => {
            handleClickGioXem(value);
          }}
          displayName={arrGioXem.name}
          loaddingDataStatus={{
            loading: isLoading,
            success: isLoadSuccess,
          }}
        />
        <Button
          disabled={disabledBtn}
          onClick={() => {
            history.push("/bookticket");
          }}
        >
          Mua vé ngay
        </Button>
      </Wrapper>
    );
  }
  return <></>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: var(--container-width);
  box-shadow: 0 0 15px rgb(0 0 0 / 30%);
  background-color: white;
  margin: 0 auto;
  border-radius: 5px;
  padding: 20px 20px;
  margin-top: -45px;
  position: relative;
`;

const Button = styled.button`
  height: 40px;
  padding: 0px 20px;
  border-radius: 10px;
  border: none;
  background-color: #4a4a4a;
  color: white;
  white-space: nowrap;
  outline: none;
  transition: 0.5s;
  :disabled {
    background-color: #757373;
    cursor: not-allowed;
  }
  :hover {
    background-color: #757373;
  }
  :active {
    background-color: #4a4a4a;
  }
  :focus {
    outline: none;
  }
`;

export default BookTicketNow;
