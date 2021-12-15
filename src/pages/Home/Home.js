import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import HomeBannerCarousel from "../../components/Home/HomeBannerCarousel";
import HomeBookTicket from "../../components/Home/HomeBookTicket";
import HomeCinemaGroup from "../../components/Home/HomeCinemaGroup/HomeCinemaGroup";

import HomePhimCarousel from "../../components/Home/HomePhimCarousel";
import { layDanhSachBannerPhim } from "../../redux/actions/FilmActions";
import { layDanhSachPhimAction } from "../../redux/actions/FilmActions";
import { layThongTinLichChieuHeThongRap } from "../../redux/actions/LichChieuActions";
import { layThongTinHeThongRap } from "../../redux/actions/QuanLyRapAction";
// const HomeCinemaGroup = React.lazy(() => {
//   import("../../components/Home/HomeCinemaGroup/HomeCinemaGroup");
// });
const Home = (props) => {
  const paramsIdComponent = props.match.params.idComponent;
  const [idComponent, setIdComponent] = React.useState(paramsIdComponent);
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

  const { mangBannerPhim, mangPhim } = useSelector(
    (rootReducer) => rootReducer.FilmReducer
  );
  // if (!isLoadSuccess) {
  //   console.log("Home.js - check is LoadSuccess", isLoadSuccess);
  //   return (
  //     <Loading>
  //       <div style={{ width: "100%", textAlign: "center" }}>
  //         <img src="./img/logo.png" alt="logo" />
  //         <p>Đang tải dữ liệu ...</p>
  //       </div>
  //     </Loading>
  //   );
  // }
  return (
    <>
      <HomeBannerCarousel danhSachBanner={mangBannerPhim} />
      <HomeBookTicket danhSachPhim={mangPhim} />
      <HomePhimCarousel danhSachPhim={mangPhim} />
      <HomeCinemaGroup />

      {/* {!isLoadSuccess ? (
        <Loading>
          <div style={{ width: "100%", textAlign: "center" }}>
            <img src="./img/logo.png" alt="logo" />
            <p>Đang tải dữ liệu ...</p>
          </div>
        </Loading>
      ) : (
        <>
          
          
        </>
      )} */}
    </>
  );
};

const Loading = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  margin-top: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    margin-bottom: 10px;
  }
  p {
    color: var(--primary-color);
    font-weight: 500;
  }
`;
export default Home;
