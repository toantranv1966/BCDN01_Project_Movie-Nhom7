import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Rate } from "antd";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  layDanhSachPhimAction,
  layThongTinChiTietPhimAction,
} from "../../redux/actions/FilmActions";
import { useSelector } from "react-redux";
import {
  comparTwoDate,
  formatDate,
  formatTime,
} from "../../util/settings/helper";
import ModalVideo from "react-modal-video";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  layThongTinHeThongRap,
  layThongTinLichChieu,
} from "../../redux/actions/QuanLyRapAction";
import DateSlider from "../../components/Home/DateSlider";
import { history } from "../../App";
import MVButton from "../../components/Home/MVButton";

const DetailFilm = (props) => {
  const [maPhim, setMaPhim] = useState(props.match.params.idFilm);
  const dispatch = useDispatch();
  const { mangPhim, chiTietPhim } = useSelector(
    (rootReducer) => rootReducer.FilmReducer
  );
  const { heThongRap, lichChieu, isLoading } = useSelector(
    (rootReducer) => rootReducer.QuanLyRapReducer
  );
  const [isOpen, setOpen] = useState(false);
  const [maHeThongRap, setMaHeThongRap] = useState("");
  const [activeDate, setActiveDate] = useState(new Date("2021-09-01"));

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(layThongTinHeThongRap);
    dispatch(layDanhSachPhimAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMaPhim(maPhim);
  }, [maPhim]);
  useEffect(() => {
    if (heThongRap.length !== 0) {
      setMaHeThongRap(heThongRap[0].maHeThongRap);
    }
  }, [heThongRap]);

  useEffect(() => {
    dispatch(layThongTinChiTietPhimAction(maPhim));
    dispatch(layThongTinLichChieu(maPhim));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maPhim]);

  const renderFilm = () => {
    let dem = 0;
    let arrayPhim = [];
    for (let i = 0; i < mangPhim.length; i++) {
      if (dem < 2) {
        if (mangPhim[i].dangChieu) {
          arrayPhim.push(mangPhim[i]);
          dem += 1;
        }
      } else {
        i = mangPhim.length;
      }
    }
    return arrayPhim.map((phim) => {
      return (
        <FilmItem key={phim.maPhim}>
          <img src={phim.hinhAnh} alt={phim.biDanh} />
        </FilmItem>
      );
    });
  };
  const renderTime = (lichChieuPhim) => {
    if (lichChieuPhim.length !== 0) {
      if (
        lichChieuPhim.find((lichChieu) =>
          comparTwoDate(lichChieu.ngayChieuGioChieu, activeDate)
        )
      ) {
        return lichChieuPhim.map((lichChieu) => {
          return (
            <TimeItem
              key={lichChieu.maLichChieu}
              onClick={() => {
                history.push(`/bookticket/${lichChieu.maLichChieu}`);
              }}
            >
              {formatTime(lichChieu.ngayChieuGioChieu)}
            </TimeItem>
          );
        });
      }
      return (
        <p style={{ fontWeight: "600", color: "#242424" }}>
          Không có suất chiếu
        </p>
      );
    }
  };
  const renderCumRap = () => {
    if (Object.keys(lichChieu).length !== 0) {
      const heThongRap = lichChieu.heThongRapChieu.find(
        (heThongRap) => heThongRap.maHeThongRap === maHeThongRap
      );
      if (heThongRap) {
        return heThongRap.cumRapChieu.map((cumRap) => {
          return (
            <ShowTimeItem key={cumRap.maCumRap}>
              <ShowTimeLeft>
                <img src={cumRap.hinhAnh} alt={cumRap.tenCumRap} />
              </ShowTimeLeft>
              <ShowTimeRight>
                <h3>{cumRap.tenCumRap}</h3>
                <p>{cumRap.diaChi}</p>
                {renderTime(cumRap.lichChieuPhim)}
              </ShowTimeRight>
            </ShowTimeItem>
          );
        });
      }
    }

    return (
      <div
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: "20px",
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        Không có suất chiếu
      </div>
    );
  };
  const handleClickTrailer = () => {
    setOpen(true);
  };
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 1,
  };
  return (
    <Wrapper>
      <WrapperLeft>
        <TopGroup>
          <TopLeftGroup>
            <img src={chiTietPhim.hinhAnh} alt="" />
          </TopLeftGroup>
          <TopRightGroup>
            <h2>{chiTietPhim.tenPhim}</h2>
            <div>
              <Rate disabled value={(chiTietPhim.danhGia / 10) * 5} />
              <RateText>{`${chiTietPhim.danhGia}/10`}</RateText>
            </div>
            <p>{chiTietPhim.moTa}</p>
            <TextGroup>
              <span>Ngày khởi chiếu</span>
              <p>{formatDate(chiTietPhim.ngayKhoiChieu)}</p>
            </TextGroup>
            <ModalVideo
              channel="youtube"
              autoplay={1}
              isOpen={isOpen}
              videoId={() => {
                let idVideo = chiTietPhim.trailer.slice(
                  chiTietPhim.trailer.indexOf("?v=") + 3,
                  chiTietPhim.trailer.length
                );
                return idVideo;
              }}
              onClose={() => setOpen(false)}
            />
            <MVButton
              icon={<BsFillPlayFill />}
              onCLick={handleClickTrailer}
              text="Xem Trailer"
            />
          </TopRightGroup>
        </TopGroup>
        {isLoading ? (
          <></>
        ) : (
          <BottomGroup>
            <HeaderText>Lịch chiếu</HeaderText>
            <ListGroupCinema>
              <Slider {...settings}>
                {heThongRap.map((heThongRap) => {
                  return (
                    <div
                      key={heThongRap.maHeThongRap}
                      onClick={() => {
                        setMaHeThongRap(heThongRap.maHeThongRap);
                      }}
                    >
                      <img
                        src={heThongRap.logo}
                        alt={heThongRap.maHeThongRap}
                        className={
                          heThongRap.maHeThongRap === maHeThongRap
                            ? "active"
                            : ""
                        }
                      />
                    </div>
                  );
                })}
              </Slider>
            </ListGroupCinema>
            <DateSlider
              startDate="2021-09-01"
              activeDate={activeDate}
              setActiveDate={setActiveDate}
            />
            <ShowTimeGroup>{renderCumRap()}</ShowTimeGroup>
          </BottomGroup>
        )}
      </WrapperLeft>
      <WrapperRight>
        <HeaderText>Phim đang chiếu</HeaderText>
        <FilmGroup>
          {renderFilm()}
          <MoreButton to="/">Xem thêm →</MoreButton>
        </FilmGroup>
      </WrapperRight>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding-top: calc(var(--header-height) + 30px);
  height: 100vh;
  width: var(--container-width);
  margin: 0 auto;
  display: flex;
`;
const WrapperLeft = styled.div`
  width: 70%;
`;
const WrapperRight = styled.div`
  width: 30%;
  padding-left: 20px;
`;

const TopGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const TopLeftGroup = styled.div`
  img {
    height: 300px;
    border-radius: 20px;
  }
`;
const TopRightGroup = styled.div`
  padding-left: 20px;
  h2 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 0;
  }
  .ant-rate {
    font-size: 14px;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    font-weight: 500;
  }
`;
const RateText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #bbb;
`;

const TextGroup = styled.div`
  display: flex;
  span {
    font-size: 14px;
    color: #c3c3c3;
    font-weight: 500;
    min-width: 120px;
  }
  p {
    font-size: 14px;
    font-weight: 700;
    color: #242424;
  }
`;
const BottomGroup = styled.div``;
const ListGroupCinema = styled.div`
  margin: 20px 0px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  img {
    width: 40px;
    margin: 0 auto;
    opacity: 0.5;
    cursor: pointer;
    transition: 0.5s;
    :hover,
    &.active {
      opacity: 1;
    }
  }
`;
const HeaderText = styled.h2`
  line-height: 2;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 20px;
  cursor: pointer;
  transition: 0.5s;
  position: relative;
  ::after {
    content: "";
    bottom: -1px;
    left: 0;
    width: 50px;
    height: 3px;
    position: absolute;
    background-color: var(--primary-color);
    transition: 0.5s;
  }
`;
const FilmGroup = styled.div`
  text-align: right;
`;
const FilmItem = styled.div`
  margin-bottom: 20px;
  img {
    width: 100%;
    border-radius: 20px;
  }
`;
const MoreButton = styled(Link)`
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 10px 20px;
  transition: 0.5s;
  font-weight: 600;
  :hover {
    color: white;
    background-color: var(--primary-color);
  }
`;
const ShowTimeGroup = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 20px;
`;
const ShowTimeItem = styled.div`
  display: flex;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const ShowTimeLeft = styled.div`
  width: 100px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 10px 0px 0px 10px;
  }
`;
const ShowTimeRight = styled.div`
  padding-left: 10px;
  h3 {
    font-size: 16px;
  }
  p {
    color: #aaa;
  }
`;
const TimeItem = styled.button`
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

export default DetailFilm;
