// Import from ReduxMiddleWare.js
import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Table } from "antd";
import { Input, Space } from "antd";
import { AudioOutlined, DeleteOutlined, EditOutlined, SearchOutlined, WindowsFilled, CalendarOutlined } from "@ant-design/icons";
import { Button } from "antd/lib/radio";
import { object } from "yup";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import {layDanhSachNguoiDung, xoaNguoiDungAction} from "../../../redux/actions/QuanLyNguoiDungActions"

const { Search } = Input;

export default function Users() {

  let dispatch = useDispatch();

  const {mangNguoiDung} = useSelector(state=>state.QuanLyNguoiDungReducer);

  useEffect(() => {
      const action = layDanhSachNguoiDung();
      dispatch(action);

  },[])

    const columns = [
        {
          title: "STT",
          dataIndex: "index",
          width: '2%',
          // sorter: (a, b) => b.maPhim - a.maPhim,
          // sortDirections: ['descend','ascend'],
          render: (text,users,index) => {return <Fragment>
            {index + 1}
          </Fragment>},
        },
        {
          title: "Tài khoản",
          dataIndex: "taiKhoan",
          render: (text,users,index) => {return <Fragment>
            {users.taiKhoan}
          </Fragment>},
          width: '18%',
        },
        {
          title: "Mật khẩu",
          dataIndex: "matKhau",
          render: (text,users,index) => {return <Fragment>
            {users.matKhau}
          </Fragment>},
          // sorter: (a, b) => {
          //   let tenPhimA = a.tenPhim.toLowerCase().trim();
          //   let tenPhimB = b.tenPhim.toLowerCase().trim();
          //   if(tenPhimA > tenPhimB){
          //     return 1;
          //   }
          //   return -1;
          // },
          width: '10%',
          sortDirections: ['descend','ascend'],
        },
        {
          title: "Họ tên",
          dataIndex: "hoTen",
          sorter: (a, b) => {
            let hoTenA = a.hoTen.toLowerCase().trim();
            let hoTenB = b.hoTen.toLowerCase().trim();
            if(hoTenA > hoTenB){
              return 1;
            }
            return -1;
          },
          render: (text,users,index) => {return <Fragment>
            {users.hoTen}
          </Fragment>},
          width: '25%',
          sortDirections: ['descend','ascend'],
        },
        {
          title: "Email",
          dataIndex: "email",
          sorter: (a, b) => {
            let emailA = a.email.toLowerCase().trim();
            let emailB = b.email.toLowerCase().trim();
            if(emailA > emailB){
              return 1;
            }
            return -1;
          },
          render: (text,users,index) => {return <Fragment>
              {users.email}
          </Fragment>},
          width: '25%',
          sortDirections: ['descend','ascend'],
        },
        {
          title: "Số điện thoại",
          dataIndex: "moTa",
          sorter: (a, b) => {
            let moTaA = a.moTa.toLowerCase().trim();
            let moTaB = b.moTa.toLowerCase().trim();
            if(moTaA > moTaB){
              return 1;
            }
            return -1;
          },
          render: (text,users,index) => {return <Fragment>
            {users.soDt}
          </Fragment>},
          width: '10%',
          sortDirections: ['descend','ascend'],
        },
        {
          title: "Hành động",
          dataIndex: "hanhDong",
          render: (text,users,index) => {return <Fragment>

            <NavLink key={1} className="mr-2 text-2xl" to={`/admin/users/edit/${users.taiKhoan}`}><EditOutlined style={{color:'blue'}}/></NavLink>;
            <span style={{cursor:'pointer'}} key={2} className="" 
            onClick={()=>{
              if(window.confirm('Bạn có chắc muốn xóa người dùng?' + users.hoTen)){
                // Gọi action xóa
                dispatch(xoaNguoiDungAction(users.taiKhoan));

                // dispatch(xoaPhimAction(users.maPhim));
              }
            }}><DeleteOutlined style={{color:'red'}}/></span>;

          </Fragment>},
          
          width: '10%',
        },
        
      ];
      
      const data = mangNguoiDung;
        
      function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
      }
      
      const onSearch = value => {
        console.log('Họ Tên',value);
        // Gọi Api layDanhSachNguoiDung
        dispatch(layDanhSachNguoiDung(value));
      } 

  return (
    <div >
      <h3 className="text-4xl">Quản lý User</h3>
      <Button className="mb-5" onClick={()=>{
        history.push('/admin/users/addnewuser');
      }}>Thêm User</Button>
      <Search
        className="mb-5"
        placeholder="input search text"
        enterButton= {<SearchOutlined/>}
        size="large"

        onSearch={onSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}
