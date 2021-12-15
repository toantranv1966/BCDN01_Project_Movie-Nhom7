import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { history } from "../../App";

const HomePhimCarousel = (props) => {
  const settings = {
    rows: 2,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  const { danhSachPhim } = props;
  const refSlider = useRef();
  const [danhSachHienThi, setDanhSachHienThi] = useState([]);
  const [active, setActive] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [idVideo, setIdVideo] = useState("");

  const formatDate = (dateText) => {
    let dateValue = new Date(dateText);
    if (dateValue) {
      let date =
        dateValue.getDay() < 10 ? `0${dateValue.getDay()}` : dateValue.getDay();
      let month =
        dateValue.getMonth() > 2
          ? dateValue.getMonth()
          : `0${dateValue.getMonth()}`;
      let year = dateValue.getFullYear();
      return `${date}-${month}-${year}`;
    }
  };
  useEffect(() => {
    let danhSachChieu = [];
    if (danhSachPhim.length !== 0) {
      danhSachPhim.map((phim) => {
        if (phim.dangChieu === true) {
          danhSachChieu.push(phim);
        }
        return null;
      });
      setDanhSachHienThi(danhSachChieu);
    }
  }, [danhSachPhim]);

  return (
    <Wrapper id="lichChieu">
      <ModalVideo
        channel="youtube"
        autoplay={1}
        isOpen={isOpen}
        videoId={idVideo}
        onClose={() => setOpen(false)}
      />
      <ul>
        <li
          className={active === false ? "active" : ""}
          onClick={() => {
            let danhSachChieu = [];
            if (danhSachPhim.length !== 0) {
              danhSachPhim.map((phim) => {
                if (phim.dangChieu === true) {
                  danhSachChieu.push(phim);
                }
                return null;
              });
              setDanhSachHienThi(danhSachChieu);
            }
            if (active === true) {
              setActive(false);
            } else {
              setActive(true);
            }
          }}
        >
          Đang chiếu
        </li>
        <li
          className={!active === false ? "active" : ""}
          onClick={() => {
            let danhSachChieu = [];
            if (danhSachPhim.length !== 0) {
              danhSachPhim.map((phim) => {
                if (phim.sapChieu === true) {
                  danhSachChieu.push(phim);
                }
                return null;
              });
              setDanhSachHienThi(danhSachChieu);
            }
            if (active === true) {
              setActive(false);
            } else {
              setActive(true);
            }
          }}
        >
          Sắp chiếu
        </li>
      </ul>
      <div style={{ position: "relative" }}>
        <Slider {...settings} ref={refSlider}>
          {danhSachHienThi.map((item, index) => {
            return (
              <CardGroup
                key={index}
                onClick={() => {
                  history.push(`/chitiet/${item.maPhim}`);
                }}
              >
                <CardItem key={index}>
                  <CardItemTop>
                    <img src={item.hinhAnh} alt="hinh anh" />
                    <CardTopGroup>
                      <ButtonPlay
                        onClick={() => {
                          let idVideo = item.trailer.slice(
                            item.trailer.indexOf("?v=") + 3,
                            item.trailer.length
                          );
                          setIdVideo(idVideo);
                          setOpen(true);
                        }}
                      >
                        <FaPlay />
                      </ButtonPlay>
                      <Button
                        onClick={() => {
                          history.push(`/chitiet/${item.maPhim}`);
                        }}
                      >
                        Mua vé
                      </Button>
                    </CardTopGroup>
                  </CardItemTop>
                  <CardItemBottom>
                    <p>{item.tenPhim}</p>
                    <CardField>
                      <h3>Ngày khởi chiếu</h3>
                      <p>{formatDate(item.ngayKhoiChieu)}</p>
                    </CardField>
                    <CardField className="text-right">
                      <h3>Đánh giá</h3>
                      <p>{`${item.danhGia}/10`}</p>
                    </CardField>
                  </CardItemBottom>
                </CardItem>
              </CardGroup>
            );
          })}
        </Slider>
        <ArrowButton
          onClick={() => {
            refSlider.current.slickPrev();
          }}
        >
          <AiOutlineLeft />
        </ArrowButton>
        <ArrowButton
          rightSide
          onClick={() => {
            refSlider.current.slickNext();
          }}
        >
          <AiOutlineRight />
        </ArrowButton>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: var(--container-width);
  margin: 0 auto;
  ul {
    list-style: none;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    li {
      display: inline-block;
      margin-right: 20px;
      margin-top: 20px;
      line-height: 2;
      font-size: 18px;
      font-weight: 600;
      text-transform: uppercase;
      cursor: pointer;
      transition: 0.5s;
      position: relative;
      ::after {
        content: "";
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 3px;
        position: absolute;
        background-color: var(--primary-color);
        transform: scale(0);
        transition: 0.5s;
      }
      &.active {
        ::after {
          transform: scale(1);
        }
      }
      :hover {
        color: var(--primary-color);
      }
    }
  }
`;

const CardItem = styled.div`
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
  overflow: hidden;
`;
const CardItemTop = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
  }
`;
const CardTopGroup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;
`;

const ButtonPlay = styled.span`
  color: white;
  display: inline-block;
  padding: 0px 0px 0px 6px;
  font-size: 20px;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 55px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.5s;
  margin-bottom: 20px;
  :hover {
    filter: drop-shadow(0px 0px 1px #fff) drop-shadow(0px 0px 3px #fff)
      drop-shadow(0px 0px 10px #ff7b67) drop-shadow(0px 0px 30px #f86049)
      drop-shadow(0px 0px 50px #fb4226);
  }
`;
const Button = styled.button`
  width: 100px;
  height: 40px;
  background-color: transparent;
  color: white;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  padding: 10px 0px;
  outline: none;
  border: 1px solid white;
  border-radius: 5px;
  transition: all 0.5s ease 0s;
  &:hover {
    background-color: var(--hover-color);
    border: 1px solid var(--primary-color);
  }
  &:active {
    background-color: var(--primary-color);
  }
  &:focus {
    outline: none;
  }
`;
const CardItemBottom = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  &.text-right {
    text-align: right;
  }
  p {
    font-weight: 600;
    font-size: 18px;
    text-transform: capitalize;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
  }
`;
const CardField = styled.div`
  width: 50%;
  h3 {
    font-size: 10px;
    color: #bbb;
    font-weight: 500;
    text-transform: uppercase;
  }
  p {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 0px;
  }
`;
const CardGroup = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  :hover {
    ${CardTopGroup} {
      opacity: 1;
      visibility: visible;
    }
  }
`;
const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  ${(props) => (props.rightSide ? "right: -60px;" : "left: -60px;")}
  transform: translatey(-60%);
  font-size: 60px;
  color: #ddd;
  cursor: pointer;
  transition: 0.5s;
  :hover {
    color: #ccc;
  }
`;
export default HomePhimCarousel;
