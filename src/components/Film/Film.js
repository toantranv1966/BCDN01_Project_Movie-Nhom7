import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Film(props) {

    const {phim} = props;

    return (
        <div className="col-4 mt-2" >
                <div className="card">
                    <h3>Phim</h3>
                    <img src={phim.hinhAnh} alt='...' height={300} />
                    <div className="card-body">
                        <p style={{height:50}}>{phim.tenPhim}</p>
                        <p style={{height:75}}>{phim.moTa.length>100 ? phim.moTa.substr(0,100) +' ...' : phim.moTa}</p>
                        <NavLink to={`/detail/${phim.maPhim}`} className="btn btn-success">Xem chi tiết</NavLink>
                    </div>
                </div>
            </div>
    )
}
