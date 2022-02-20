import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
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

export const datVePhim = (thongTinDatVe) => {
  //TODO Su dung token duoc cung cap
  return (dispatch) => {
    let promise = http.post("/api/QuanLyDatVe/DatVe", thongTinDatVe);
    promise.then((result) => {
      console.log(result.data.content);
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };
  //TODO Su dung Token tu tai khoan dang nhap
  // return async (dispatch) => {
  //   try {
  //     const result = await quanLyDatVeService.datVe(thongTinDatVe);
  //     console.log(result.data.content);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };
};
