import { SET_DANH_SACH_PHIM } from "../actions/types/QuanLyPhimType";
import {SET_THONG_TIN_PHIM} from "../actions/types/QuanLyPhimType";

const stateDefault = {
    arrFilm : [],


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