import { http } from "../../util/settings/setting";
import {
  LAY_DANH_SACH_BANNER_PHIM,
  LAY_DANH_SACH_PHIM,
} from "./types/FilmType";

export const layDanhSachPhimAction = (dispatch) => {
  let promise = http.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");

  promise.then((result) => {
    dispatch({
      type: LAY_DANH_SACH_PHIM,
      data: result.data.content,
    });
  });

  promise.catch((error) => {
    console.log("error", error.response.data.content);
  });
};
//closure function: Là function trả về 1 function chưa được gọi (mục đích tạo ra 1 actoin là function mà có sẵn tham số)
export const layThongTinChiTietPhimAction = (maPhim) => {
  return (dispatch) => {
    let promise = http.get(
      `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );

    promise.then((result) => {
      //Lấy dữ liệu dispatch lên reducer
      dispatch({
        type: "CHI_TIET_PHIM",
        data: result.data.content,
      });
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
    });
  };
};

export const layDanhSachBannerPhim = (dispatch) => {
  let promise = http.get("/api/QuanLyPhim/LayDanhSachBanner");
  promise.then((result) => {
    dispatch({
      type: LAY_DANH_SACH_BANNER_PHIM,
      mangBannerPhim: result.data.content,
      isLoadSuccess: true,
    });
  });
  promise.catch((error) => {
    console.log(error.response.data.content);
  });
};
