import { http } from "../../util/settings/setting";
import {
  LAY_ThONG_TIN_LICH_CHIEU,
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
export { layThongTinLichChieu };
