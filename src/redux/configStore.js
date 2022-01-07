<<<<<<< HEAD
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {QuanLyPhimReducer} from '../redux/reducers/QuanLyPhimReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';

=======
import { applyMiddleware, combineReducers, createStore } from "redux";
import { QuanLyPhimReducer } from "../redux/reducers/QuanLyPhimReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
import { FilmReducer } from "./reducers/FilmReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";
import { LichChieuReducer } from "./reducers/LichChieuReducer";
import { QuanLyVeReducer } from "./reducers/QuanLyVeReducer";
>>>>>>> minh_duc
//Cấu hình middleware
import reduxThunk from "redux-thunk";

const rootReducer = combineReducers({
<<<<<<< HEAD
    //Nơi kháo các state của ứng dụng
    QuanLyPhimReducer:QuanLyPhimReducer,
    QuanLyNguoiDungReducer:QuanLyNguoiDungReducer

=======
  //Nơi kháo các state của ứng dụng
  QuanLyPhimReducer: QuanLyPhimReducer,
  QuanLyNguoiDungReducer,
  FilmReducer,
  QuanLyRapReducer,
  LichChieuReducer,
  QuanLyVeReducer,
>>>>>>> minh_duc
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));

/*
    Thư viện cài đặt
    npm i react-redux
    npm i redux
*/
