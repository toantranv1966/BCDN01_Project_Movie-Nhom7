import axios from 'axios';

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





