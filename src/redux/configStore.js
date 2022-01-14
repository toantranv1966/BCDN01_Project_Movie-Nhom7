import {applyMiddleware, combineReducers, createStore} from 'redux'
// import {QuanLyPhimReducer} from '../redux/reducers/'
// import {QuanLyPhimReducer} from '../redux/reducers/QuanLyPhimReducer';
import {QuanLyPhimReducer} from '../redux/reducers/QuanLyPhimReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import { FilmReducer } from "./reducers/FilmReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";
import { LichChieuReducer } from "./reducers/LichChieuReducer";
import { QuanLyVeReducer } from "./reducers/QuanLyVeReducer";

//Cấu hình middleware
import reduxThunk from "redux-thunk";

const rootReducer = combineReducers({
    //Nơi kháo các state của ứng dụng
    QuanLyPhimReducer:QuanLyPhimReducer,
    QuanLyNguoiDungReducer:QuanLyNguoiDungReducer,
    FilmReducer,
    QuanLyRapReducer,
    LichChieuReducer,
    QuanLyVeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));


