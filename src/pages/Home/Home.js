import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import HomeBannerCarousel from "../../components/Home/HomeBannerCarousel";
import HomeBookTicket from "../../components/Home/HomeBookTicket";
import HomePhimCarousel from "../../components/Home/HomePhimCarousel";
import { layDanhSachBannerPhim } from "../../redux/actions/FilmActions";
import { layDanhSachPhimAction } from "../../redux/actions/FilmActions";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachBannerPhim);
    dispatch(layDanhSachPhimAction);
  }, [dispatch]);

  const { mangBannerPhim, mangPhim, isLoadSuccess } = useSelector(
    (rootReducer) => rootReducer.FilmReducer
  );

  return (
    <>
      {!isLoadSuccess ? (
        <Loading>
          <div style={{ width: "100%", textAlign: "center" }}>
            <img src="./img/logo.png" alt="logo" />
            <p>Đang tải dữ liệu ...</p>
          </div>
        </Loading>
      ) : (
        <>
          <HomeBannerCarousel danhSachBanner={mangBannerPhim} />
          <HomeBookTicket danhSachPhim={mangPhim} />
          <HomePhimCarousel danhSachPhim={mangPhim} />
        </>
      )}
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
