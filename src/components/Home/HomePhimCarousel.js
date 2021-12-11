import React from "react";
import Slider from "react-slick";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";
import styled from "styled-components";

const HomePhimCarousel = (props) => {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { danhSachPhim } = props;
  const renderFilmDangChieu = () => {
    if (danhSachPhim.length !== 0) {
      return (
        <div id="lichChieu">
          <CardGroup>
            {danhSachPhim.map((item) => {
              return (
                <CardItem>
                  <img src={item.hinhAnh} alt="hinh anh" />
                </CardItem>
              );
            })}
          </CardGroup>
        </div>
      );
    }
  };
  return (
    <Wrapper>
      <ul>
        <li>Đang chiếu</li>
        <li>Sắp chiếu</li>
      </ul>
      <div>
        <Slider {...settings}>{renderFilmDangChieu()}</Slider>
      </div>
    </Wrapper>
  );
};

export default HomePhimCarousel;

const Wrapper = styled.div`
  width: var(--container-width);
  margin: 0 auto;
`;
const CardGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CardItem = styled.div`
  padding: 10px;
  width: 25%;
  img {
    width: 100%;
  }
`;
