import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
import HomeBannerCarousel from "../../components/Home/HomeBannerCarousel";
import HomeBookTicket from "../../components/Home/HomeBookTicket";
import HomeCinemaGroup from "../../components/Home/HomeCinemaGroup/HomeCinemaGroup";

import HomePhimCarousel from "../../components/Home/HomePhimCarousel";
import { layDanhSachBannerPhim } from "../../redux/actions/FilmActions";
import { layDanhSachPhimAction } from "../../redux/actions/FilmActions";
import { layThongTinLichChieuHeThongRap } from "../../redux/actions/LichChieuActions";
import { layThongTinHeThongRap } from "../../redux/actions/QuanLyRapAction";

const Home = (props) => {
  const paramsIdComponent = props.match.params.idComponent;
  const [idComponent, setIdComponent] = useState(paramsIdComponent);
  const { mangBannerPhim, mangPhim } = useSelector(
    (rootReducer) => rootReducer.FilmReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachBannerPhim);
    dispatch(layDanhSachPhimAction);
    dispatch(layThongTinHeThongRap);
    dispatch(layThongTinLichChieuHeThongRap);
  }, []);

  useEffect(() => {
    if (paramsIdComponent) {
      setIdComponent(paramsIdComponent);
    }
  }, [paramsIdComponent]);

  useEffect(() => {
    window.scrollTo(0, 0);
    switch (idComponent) {
      case "lichChieu":
        window.scrollTo(0, 730);
        break;
      case "cumRap":
        window.scrollTo(0, 900);
        break;
      default:
        window.scrollTo(0, 0);
        break;
    }
  }, [idComponent]);

  return (
    <>
      {mangBannerPhim.length !== 0 && (
        <HomeBannerCarousel danhSachBanner={mangBannerPhim} />
      )}
      {mangPhim.length !== 0 && <HomeBookTicket danhSachPhim={mangPhim} />}

      <HomePhimCarousel danhSachPhim={mangPhim} />
      <HomeCinemaGroup />
    </>
  );
};

export default Home;
