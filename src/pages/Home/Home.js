import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CarouselHome from '../../components/CarouselHome/CarouselHome';
import Film from '../../components/Film/Film';
import {layDanhSachPhimAction} from '../../redux/actions/QuanLyPhimAction'

export default function Home(props) {
    //Lấy thông tin mangPhim từ FilmReducer về component
    const {arrFilm} = useSelector(state=>state.QuanLyPhimReducer);

    //Tạo ra hàm dispatch 
    const dispatch = useDispatch();

    useEffect(() => {
        //Tạo ra action là function
        const action = layDanhSachPhimAction();
        //Dispatch thực thi action
        dispatch(action);

    }, []);

    const renderPhim = () => {
        return arrFilm.map((item, index) => {
            return <Film phim={item} key={index}/>
        })
    }

    return (
        <div className="container">
            <CarouselHome />
            <h1>Danh sách phim</h1>
            <div className="row">
                {renderPhim()}
            </div>
        </div>
    )
}
