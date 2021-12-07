import React,{useEffect,useState} from 'react';
import { Form,Select, Input,Cascader,DatePicker,InputNumber, Button, Checkbox, Avatar } from 'antd';
import {quanLyRapService} from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import {quanLyDatVeService} from '../../../services/QuanLyDatVeService';




export default function Showtime(props) {

    const formik = useFormik({
        initialValues:{
            maPhim: props.match.params.id,
            ngayChieuGioChieu:'',
            maRap:'',
            giaVe:''
        },
        onSubmit : async (values) => {
            console.log('Values',values);
            try{
                const result = await quanLyDatVeService.taoLichChieu(values);

                alert(result.data.content)


            }catch(error){
                console.log("error",error.response?.data);
            }
        }

    })

    const [state, setstate] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    });

    useEffect( async () => {

        try{
            let result = await quanLyRapService.layThongTinHeThongRap();

            setstate({
                ...state,
                heThongRapChieu:result.data.content
            })

            console.log('result',result.data.content);

        }catch(error) {
            console.log(error)
        }
        
       
    }, [])

    const handleChangeHeThongRap = async (value) => {
        // Từ hệ thống rạp call api lấy thông tin rạp
        try {
            let result = await quanLyRapService.layThongTinCumRam(value);
            // Gán giá trị cum rạp vào state.cumRap
            setstate({
                ...state,
                cumRapChieu: result.data.content
            })
            console.log('result',result.data.content);
        }catch(error){
            console.log("error",error.response?.data)
        }
    }

    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value)
        
    }

    const onOk = (values) => {
        formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'));
        console.log('value',moment(values).format('DD/MM/YYYY hh:mm:ss'));
    }
 
    const onChageDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'));
        console.log('value',moment(values).format('DD/MM/YYYY hh:mm:ss'));
    }

    const onChageNumber = (values) => {
        formik.setFieldValue('giaVe',values);
        console.log('giaVe',values);
    }

    const convertSelectHTR = () => {
        return state.heThongRapChieu?.map((htr,index) => {
            return {label:htr.tenHeThongRap, value:htr.maHeThongRap}
        })
    }

    return (
        <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onSubmitCapture={formik.handleSubmit}
    >
        <h3 className="text-2xl">Tạo lịch chiếu</h3>
      <Form.Item label="Hệ thống rạp">
      {/* Cách 1:  */}
            {/* <Cascader options={state.heThongRapChieu?.map((htr,index)=> ({label:htr.tenHeThongRap,value:htr.tenHeThongRap}))} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" /> */}
            <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
      </Form.Item>
      <Form.Item label="Cụm rạp">
        <Select options={state.cumRapChieu?.map((cumRap,index)=>({label:cumRap.tenCumRam,value:cumRap.maCumRam}))} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
            {/* <Select options={state.cumRapChieu?.map((cumRap,index)=>({label:cumRap.tenCumRam,value:cumRap.tenCumRam}))} onChange={handleChangeHeThongRap} placeholder="Chọn cụm rạp" /> */}
      </Form.Item>
      <Form.Item label="Ngày chiếu giờ chiếu">
         <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChageDate} onOk={onOk} />
      </Form.Item>
      <Form.Item label="Giá vé">
        <InputNumber min={75000} max={150000} onChange={onChageNumber} />
      </Form.Item>
      <Form.Item label="Chức năng">
        <Button htmlType='submit'>Tạo lịch chiếu</Button>
      </Form.Item>

     
    </Form>
    )
}
