import { http } from "../../util/settings/setting";
import {
  LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG,
  LAY_THONG_TIN_HE_THONG_RAP,
  LAY_ThONG_TIN_LICH_CHIEU,
  LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP,
  LOADING_DATA_ERROR,
  START_LOADING_DATA,
} from "./types/QuanLyRapType";

const layThongTinLichChieu = (maPhim) => {
  return (dispatch) => {
    let promise = http.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
    dispatch({ type: START_LOADING_DATA });
    promise.then((result) => {
      dispatch({
        type: LAY_ThONG_TIN_LICH_CHIEU,
        lichChieu: result.data.content,
      });
    });
    promise.catch((error) => {
      dispatch({ type: LOADING_DATA_ERROR });
      console.log(error.response.data.content);
    });
  };
};

const layThongTinHeThongRap = (dispatch) => {
  let promise = http.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  // dispatch({ type: START_LOADING_DATA });
  promise.then((result) => {
    dispatch({
      type: LAY_THONG_TIN_HE_THONG_RAP,
      heThongRap: result.data.content,
    });
  });
  promise.catch((error) => {
    dispatch({ type: LOADING_DATA_ERROR });
    console.log(error.response.data.content);
  });
};
const layThongTinCumRapTheoHeThong = (maHeThongRap) => {
  return (dispatch) => {
    let promise = http.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
    dispatch({ type: START_LOADING_DATA });
    promise.then((result) => {
      dispatch({
        type: LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG,
        lstCumRap: result.data.content,
      });
    });
    promise.catch((error) => {
      dispatch({ type: LOADING_DATA_ERROR });
      console.log(error.response.data.content);
    });
  };
};

export {
  layThongTinLichChieu,
  layThongTinHeThongRap,
  layThongTinCumRapTheoHeThong,
};
