import {applyMiddleware, combineReducers, createStore} from 'redux'
import {QuanLyPhimReducer} from '../redux/reducers/QuanLyPhimReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';

//Cấu hình middleware
import reduxThunk  from 'redux-thunk'

const rootReducer = combineReducers({
    //Nơi kháo các state của ứng dụng
    QuanLyPhimReducer:QuanLyPhimReducer,
    QuanLyNguoiDungReducer:QuanLyNguoiDungReducer

});

export const store = createStore(rootReducer,applyMiddleware(reduxThunk));


/*
    Thư viện cài đặt
    npm i react-redux
    npm i redux
*/
