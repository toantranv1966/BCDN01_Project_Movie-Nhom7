import { SET_DANH_SACH_PHIM } from "../actions/types/QuanLyPhimType";
import {SET_THONG_TIN_PHIM} from "../actions/types/QuanLyPhimType";


const stateDefault = {
    arrFilm: [
        {
            "maPhim": 9063,
            "tenPhim": "Doctor Strange 3",
            "biDanh": "doctor-strange-3",
            "trailer": "https://youtu.be/kNdM7b1Lm04",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/doctor-strange-3_gp01.jfif",
            "moTa": "Half-human, half-Atlantean Arthur is born with the ability to communicate with marine creatures. He goes on a quest to retrieve the legendary Trident of Atlan and protect the water world.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2021-11-29T23:58:54.343",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": true
          },
          {
            "maPhim": 9237,
            "tenPhim": "La la land",
            "biDanh": "la-la-land",
            "trailer": "https://www.youtube.com/embed/0pdqf4P9MB8",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/la-la-land_gp01.jpg",
            "moTa": "Những kẻ khờ mộng mơ (tên gốc: La La Land)[4] là bộ phim nhạc kịch lãng mạn xen lẫn chính kịch hài hước của Hoa Kỳ năm 2016, do Damien Chazelle biên soạn và đạo diễn. Bộ phim có diễn xuất của Ryan Gosling, Emma Stone, J. K. Simmons, John Legend và Rosemarie DeWitt. Phim theo chân một nhạc sĩ và một nữ diễn viên đầy tham vọng, khi họ gặp gỡ và yêu nhau tại Los Angeles. Tựa đề của phim ám chỉ thành phố Los Angeles và một thành ngữ đề cập tới vùng đất hư cấu, đầy huyền ảo.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2019-01-01T00:00:00",
            "danhGia": 20,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
          },
    ],

    "dangChieu": true,
    "sapChieu": false,
    arrFilmDefault:[],
    filmDefault:{},

    thongTinPhim:{},


}

export const QuanLyPhimReducer = (state=stateDefault,action) => {
    switch(action.type) {

        case SET_DANH_SACH_PHIM :{
            state.arrFilm = action.arrFilm;
            return {...state};
        }

        case SET_THONG_TIN_PHIM : {
            state.thongTinPhim = action.thongTinPhim;
            return {...state};
        }



        default: return {...state}
    }

}