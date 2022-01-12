import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ShowTime from "./ShowTime";
import ListCinemaGroup from "./ListCinemaGroup";
import { layThongTinLichChieuHeThongRap } from "../../../redux/actions/LichChieuActions";

const HomeCinemaGroupContainer = styled.div`
  width: var(--container-width);
  margin: 0 auto;
  padding-top: var(--header-height);
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HomeCinemaGroup = () => {
  const { lichChieuHeThongRap } = useSelector(
    (rootReducer) => rootReducer.LichChieuReducer
  );
  const { heThongRap } = useSelector(
    (rootReducer) => rootReducer.QuanLyRapReducer
  );
  const dispatch = useDispatch();
  const layLichChieuPhim = useCallback(
    (maHeThongRap) => {
      console.log("HomeCinema.js - dispatch LayLichChieu");
      dispatch(layThongTinLichChieuHeThongRap(maHeThongRap));
    },
    [dispatch]
  );

  if (heThongRap.length === 0) {
    return <></>;
  }
  return (
    <HomeCinemaGroupContainer>
      <ListCinemaGroup
        heThongRap={heThongRap}
        layLichChieuPhim={layLichChieuPhim}
      />
      <ShowTime lichChieuHeThongRap={lichChieuHeThongRap} />
    </HomeCinemaGroupContainer>
  );
};
export default HomeCinemaGroup;
