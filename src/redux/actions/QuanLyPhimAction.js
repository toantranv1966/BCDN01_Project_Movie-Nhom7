// import {quanLyPhimService} from '../../../services/QuanLyPhimService';
import {quanLyPhimService} from '../../services/QuanLyPhimService';
import {SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM} from './types/QuanLyPhimType';
import { history } from '../../App';



export const layDanhSachPhimAction = (tenPhim='') => {

    return async (dispatch) => {
        try {
            // Sử dụng tham số thamSo
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);

            // Sau khi lấy dữ liệu từ api về => redux (reducer)
            dispatch({
                type:SET_DANH_SACH_PHIM,
                arrFilm:result.data.content
            })
        }catch (error) {
            console.log('error',error);
        }
    }
}

export const themPhimUploadHinhAction = (FormData) => {
    return async (dispatch) => {

        try{
            let result = await quanLyPhimService.themPhimUploadHinh(FormData);
            alert('Thêm phim thành công');
            console.log('result', result.data.content);
        }catch (error) {
            console.log('error',error);
        }
    }
}

export const capNhatPhimUploadAction = (FormData) => {
    return async (dispatch) => {
        try{
            let result = await quanLyPhimService.CapNhatPhimUpload(FormData);
            alert('Cập nhật phim thành công');
            console.log('result', result.data.content);

            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');

        }catch (error) {
            console.log('error',error);
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {

    return async (dispatch) => {
        try {
            // Sử dụng tham số thamSo
            const result = await quanLyPhimService.layThongTinPhim(maPhim);

            // Kiểm tra kết nối api lấy thông tin phim
            // console.log(result.data.content);

            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })

        }catch (error) {
            console.log('error',error);
        }
    }

}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {

        try {
            // Sử dụng tham số thamSo
            const result = await quanLyPhimService.xoaPhim(maPhim);
            console.log('Result', result.data.content);
            alert('Xóa phim thành công!')
            // Sau khi xóa load lại danh sách phim mới
            dispatch(layThongTinPhimAction);


        }catch (error) {
            console.log('error',error.response?.data);
        }




    }
}