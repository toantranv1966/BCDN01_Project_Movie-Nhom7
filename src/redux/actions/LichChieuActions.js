import { http } from "../../util/settings/setting";
import { LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP } from "./types/LichChieuTypes";

const layThongTinLichChieuHeThongRap = (maHeThongRap) => {
  return (dispatch) => {
    let promise = http.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`
    );
    // dispatch({ type: START_LOADING_DATA });
    promise.then((result) => {
      dispatch({
        type: LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP,
        lichChieuHeThongRap: result.data.content,
      });
    });
    promise.catch((error) => {
      // dispatch({ type: LOADING_DATA_ERROR });
      console.log(error.response.data.content);
    });
  };
};

export { layThongTinLichChieuHeThongRap };
