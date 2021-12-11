import axios from "axios";
import { DOMAIN } from "../../util/settings/config";
import {
  DANG_KY,
  DANG_NHAP,
  GET_ALL_USER,
  GUI_THONG_BAO,
} from "./types/QuanLyNguoiDungTypes";
import { http } from "../../util/settings/setting";
import { history } from "../../App";

export const getAllUserAction = (dispatch) => {
  //Xử lý và cò được dữ liệu rồi dispatch lần 2
  let promise = axios({
    url: `${DOMAIN}/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`,
    method: "GET",
  });
  promise.then((result) => {
    const action = {
      type: GET_ALL_USER,
      data: result.data.content,
    };
    dispatch(action);
  });
};

export const dangNhap = (user) => {
  return (dispatch) => {
    let promise = http.post("/api/QuanLyNguoiDung/DangNhap", user);
    promise.then((result) => {
      dispatch({
        type: DANG_NHAP,
        nguoiDung: result.data.content,
        loginMessage: "",
      });
      history.push("/");
    });
    promise.catch((error) => {
      dispatch({
        type: GUI_THONG_BAO,
        loginMessage: error.response.data.content,
      });
    });
  };
};
export const dangKy = (user) => {
  return (dispatch) => {
    let promise = http.post("/api/QuanLyNguoiDung/DangKy", user);
    promise.then((result) => {
      dispatch({
        type: DANG_KY,
        nguoiDung: result.data.content,
        loginMessage: "",
      });
      history.push("/");
    });
    promise.catch((error) => {
      dispatch({
        type: GUI_THONG_BAO,
        loginMessage: error.response.data.content,
      });
    });
  };
};
