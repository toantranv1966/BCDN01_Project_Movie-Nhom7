import axios from "axios";
import { DOMAIN } from "../../util/settings/config";
import {DANG_KY, DANG_NHAP, GET_ALL_USER,  GUI_THONG_BAO,} from "./types/QuanLyNguoiDungTypes";
import { http } from "../../util/settings/setting";
import { history } from "../../App";
import { LAY_DANH_SACH_NGUOI_DUNG, DANG_NHAP_ACTION,DANG_KY_ACTION,THONG_TIN_TAI_KHOAN,
    LOAI_NGUOI_DUNG } from './types/QuanLyNguoiDungTypes';
import {quanLyNguoiDungService} from '../../services/QuanLyNguoiDung'

export const layDanhSachNguoiDung = (tukhoa='') => {

    return async (dispatch) => {
        try {
            // Sử dụng tham số thamSo
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(tukhoa);

            // Sau khi lấy dữ liệu từ api về => redux (reducer)
            dispatch({
                type:LAY_DANH_SACH_NGUOI_DUNG,
                mangNguoiDung:result.data.content
            })
        }catch (error) {
            console.log('error',error);
        }
    }
}

export const dangNhapAction = (thongTinDangNhap) => {

    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

            if(result.data.statusCode === 200){
                dispatch({
                    type:DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
            }
        }catch(error){
            console.log("error",error.response.data);
        }
    }
}

export const dangKyAction = (thongTinDangKy) => {

    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            console.log("Result",result.data.content);
            alert('Đăng ký thành công!')

            if(result.data.statusCode === 200){
                dispatch({
                    type:DANG_KY_ACTION,
                    thongTinDangKy: result.data.content
                })
            }
        }catch(error){
            alert(error.response.data.content);
            console.log("error",error.response.data);
        }
    }
}

export const themNguoiDungAction = (formData) => {
    return async (dispatch) => {

        try{
            let result = await quanLyNguoiDungService.themNguoiDung(formData);
            alert('Thêm người dùng thành công');
        }catch (error) {
            alert('Không thêm được người dùng!')
            console.log('error',error);
        }
    }
}

export const layThongTinNguoiDungAction = (taiKhoan) => {

    return async (dispatch) => {
        try {
            // Sử dụng tham số thamSo
            const result = await quanLyNguoiDungService.layThongTinNguoiDung(taiKhoan);
            // Sau khi lấy dữ liệu từ api về => redux (reducer)
            dispatch({
                type:THONG_TIN_TAI_KHOAN,
                thongTinTaiKhoan:result.data.content
            })
        }catch (error) {
            console.log('error',error);
        }
    }
}

export const layThongTinLoaiNguoiDungAction = () => {

    return async (dispatch) => {
        try {
            // Sử dụng tham số thamSo
            const result = await quanLyNguoiDungService.layThongTinLoaiNguoiDungAction();
            // Sau khi lấy dữ liệu từ api về => redux (reducer)
            dispatch({
                type:LOAI_NGUOI_DUNG,
                loaiNguoiDung:result.data.content
            })
        }catch (error) {
            console.log('error',error);
        }
    }
}

export const capNhatThongTinNguoiDungAction = (FormData) => {
    return async (dispatch) => {
        try{
            let result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(FormData);
            alert('Cập nhật người dùng thành công!')

        }catch(error) {
            console.log('Result',error.data.content);
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        try{
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
            alert('Xóa nguoif dùng thành công!')

        }catch(error){
            alert('Không xóa được người dùng')
            console.log("Error", error.response.data.content);

        }
    }
}

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
