import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {} from "react-redux";
import { layDanhSachPhongVe } from "../../redux/actions/QuanLyVeAction";
import { arrDay } from "../../util/settings/helper";
import Seat from "../../components/BookTicket/Seat";
import MVButton from "../../components/Home/MVButton";
import { AiOutlineSend } from "react-icons/ai";

const Container = styled.div`
  min-height: 100vh;
  width: var(--container-width);
  margin: 0 auto;
  padding-top: calc(var(--header-height) + 20px);
  display: flex;
  min-height: 100vh;
`;
const LeftContainer = styled.div`
  width: 70%;
  padding: 0 20px;
  min-height: 100%;
  border-right: 1px solid #ddd;
`;
const RightContainer = styled.div`
  width: 30%;
  min-height: 100%;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: center;
    mask-image: linear-gradient(black, white, transparent);
  }
`;
const RightBottom = styled.div`
  padding: 0px 20px;
  h2 {
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 10px;
  }
  h3 {
    font-size: 12px;
    font-weight: 600;
    margin: 10px 0px;
    opacity: 0.6;
  }
`;
const TopLeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TextGroup = styled.div`
  font-size: 16px;
`;
const Screen = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  margin-bottom: 40px;
  ::before,
  ::after {
    content: "";
    display: inline-block;
    width: 70%;
    height: 70px;
    transform: skew(30deg, 0deg);
    border-radius: 15px 0px 0px 10px;
    position: absolute;
    top: 0px;
    left: 10%;
    background: linear-gradient(
      rgb(231, 231, 231) 0%,
      rgb(235, 235, 235) 47%,
      rgb(241, 241, 241) 100%
    );
  }
  ::after {
    border-radius: 0px 15px 10px 0px;
    transform: skew(-30deg, 0deg);
    right: 10%;
    left: auto;
  }
`;
const TicketGroup = styled.div`
  margin-bottom: 10px;
  h3 {
    font-size: 16px;
  }
`;
const ListTicket = styled.div`
  display: flex;
  flex-wrap: wrap;
  span {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: var(--color-green);
    color: white;
    font-weight: 600;
    width: 45px;
    text-align: center;
  }
`;
const SeatGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #fbfbfb;
`;
const SeatInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px 20px 15px 20px;
  margin: 20px 50px;
`;
const InfoItem = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0px;
    margin-top: 10px;
    margin-left: 40px;
    font-weight: 500;
  }
`;

const BookTicket = (props) => {
  const { nguoiDung } = useSelector(
    (rootReducer) => rootReducer.QuanLyNguoiDungReducer
  );
  const { thongTinSuatChieu } = useSelector(
    (rootReducer) => rootReducer.QuanLyVeReducer
  );
  const [thongTinDatVe, setThongTinDatVe] = useState({
    maLichChieu: "",
    danhSachVe: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(nguoiDung).length === 0) {
      props.history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nguoiDung]);

  useEffect(() => {
    const idShowTime = props.match.params.idShowTime;
    dispatch(layDanhSachPhongVe(idShowTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSeatSelected = useCallback(
    (seat) => {
      setThongTinDatVe((prev) => {
        prev.maLichChieu = thongTinSuatChieu.thongTinPhim?.maLichChieu;
        const isSelected = prev.danhSachVe.includes(seat);
        if (isSelected) {
          prev.danhSachVe = prev.danhSachVe.filter(
            (item) => item.maGhe !== seat.maGhe
          );
          return { ...prev };
        }
        prev.danhSachVe.push(seat);
        return { ...prev };
      });
    },
    [thongTinSuatChieu]
  );
  const handleClickTotal = () => {};
  const renderSeat = () => {
    return thongTinSuatChieu?.danhSachGhe.map((seat) => {
      return (
        <Seat
          key={seat.maGhe}
          type="button"
          seat={seat}
          handleSelected={handleSeatSelected}
        />
      );
    });
  };

  return (
    <>
      {Object.keys(thongTinSuatChieu).length !== 0 && (
        <Container>
          {console.log(thongTinDatVe)}
          <LeftContainer>
            <TopLeftContainer>
              <TextGroup>
                <p>
                  <b>{thongTinSuatChieu.thongTinPhim.gioChieu},</b>{" "}
                  {thongTinSuatChieu.thongTinPhim.tenCumRap}
                </p>
              </TextGroup>
              <TextGroup>
                <p>
                  <b>
                    {
                      arrDay[
                        new Date(
                          thongTinSuatChieu.thongTinPhim.ngayChieu
                        ).getDay()
                      ]
                    }
                    ,
                  </b>{" "}
                  ngày {thongTinSuatChieu.thongTinPhim.ngayChieu}
                </p>
              </TextGroup>
            </TopLeftContainer>
            <div>
              <SeatGroup>
                <Screen></Screen>
                {renderSeat()}
              </SeatGroup>
              <SeatInfo>
                <InfoItem>
                  <Seat type="icon" defautClassName="seat--selected" />
                  <p>Ghế đang chọn</p>
                </InfoItem>
                <InfoItem>
                  <Seat type="icon" defautClassName="seat--sold" />
                  <p>Ghế đã bán</p>
                </InfoItem>
                <InfoItem>
                  <Seat type="icon" defautClassName="seat--owned" />
                  <p>Ghế đã mua</p>
                </InfoItem>
              </SeatInfo>
            </div>
          </LeftContainer>
          <RightContainer>
            <img src={thongTinSuatChieu.thongTinPhim.hinhAnh} alt="" />
            <RightBottom>
              <h2>{thongTinSuatChieu.thongTinPhim.tenPhim}</h2>
              <p></p>
              <TicketGroup>
                <h3>Thông tin đặt vé</h3>
                <ListTicket>
                  {thongTinDatVe.danhSachVe.length === 0 ? (
                    <div
                      style={{
                        width: "100%",
                        fontSize: "16px",
                        padding: "10px",
                      }}
                    >
                      Chưa chọn ghế.
                    </div>
                  ) : (
                    thongTinDatVe.danhSachVe.map((seat) => {
                      return <span key={seat.maGhe}>{seat.tenGhe}</span>;
                    })
                  )}
                </ListTicket>
                <h3>Tổng số tiền</h3>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontSize: "16px", fontWeight: "600" }}>
                    {thongTinDatVe.danhSachVe.length} ghế
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: "600" }}>
                    {thongTinDatVe.danhSachVe.length === 0
                      ? 0
                      : thongTinDatVe.danhSachVe
                          .reduce((prevSeat, currenSeat) => ({
                            giaVe: prevSeat.giaVe + currenSeat.giaVe,
                          }))
                          .giaVe.toLocaleString()}{" "}
                    VNĐ
                  </p>
                </div>
              </TicketGroup>
              <div style={{ textAlign: "center" }}>
                <MVButton
                  icon={<AiOutlineSend />}
                  onCLick={handleClickTotal}
                  text="Thanh toán"
                  fullWidth={true}
                />
              </div>
            </RightBottom>
          </RightContainer>
        </Container>
      )}
    </>
  );
};

export default BookTicket;
