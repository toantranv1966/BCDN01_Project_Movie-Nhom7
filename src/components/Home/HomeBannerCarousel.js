import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

const CarouselPlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  z-index: 10;
  font-size: 30px;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 74px;
  border-radius: 50%;
  padding: 0px 0px 0px 6px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #fff;
  cursor: pointer;
  opacity: 0;
  transition: 0.5s;
`;
const CarouselWrapper = styled.div`
  margin-top: 60px;
  position: relative;
  .slick-dots {
    position: absolute;
    bottom: 100px;
    left: 0;
    z-index: 10;
    li {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: white;
      &.slick-active {
        background-color: var(--primary-color);
      }
      button::before {
        content: none;
      }
    }
  }
`;

const CarouselBannerItem = styled.div`
  position: relative;
  :hover {
    ${CarouselPlay} {
      opacity: 1;
    }
  }
  img {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: calc(100vh - 60px);
  }
`;
const HomeBannerCarousel = ({ danhSachBanner }) => {
  const [isOpen, setOpen] = useState(false);

  const renderCarouselBanner = () => {
    return danhSachBanner.map((item, index) => {
      return (
        <div key={index}>
          <CarouselBannerItem>
            <CarouselPlay
              onClick={() => {
                setOpen(true);
              }}
            >
              <FaPlay />
            </CarouselPlay>
            <img src={item.hinhAnh} alt="" />
          </CarouselBannerItem>
        </div>
      );
    });
  };
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <CarouselWrapper>
      <ModalVideo
        channel="youtube"
        autoplay={1}
        isOpen={isOpen}
        videoId="kBY2k3G6LsM"
        onClose={() => setOpen(false)}
      />
      <Slider {...settings}>{renderCarouselBanner()}</Slider>
    </CarouselWrapper>
  );
};

export default HomeBannerCarousel;
