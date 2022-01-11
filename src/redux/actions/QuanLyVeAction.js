import { http } from "../../util/settings/setting";
import { LAY_DANH_SACH_PHONG_VE } from "./types/QuanLyVeType";

export const layDanhSachPhongVe = (maLichChieu) => {
  return (dispatch) => {
    let promise = http.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
    promise.then((result) => {
      dispatch({
        type: LAY_DANH_SACH_PHONG_VE,
        thongTinSuatChieu: result.data.content,
      });
    });
    promise.catch((error) => {
      console.log(error.response.data.content);
    });
  };
};
