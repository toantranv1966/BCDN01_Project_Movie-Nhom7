import {quanLyPhimService} from '../../../services/QuanLyPhimService';



// export const layDanhSachPhimAction = () => {

//     return async (dispatch) => {
//         try {
//             // Sử dụng tham số thamSo
//             const result = await quanLyPhimService.layDanhSachPhim();

//             // Sau khi lấy dữ liệu từ api về => redux (reducer)
//             dispatch({
//                 type:SET_DANH_SACH_PHIM,
//                 arrFilm:result.data.content
//             })
//         }catch (error) {
//             console.log('error',error);
//         }
//     }
// }

export const themPhimUploadHinhAction = (FormData) => {
    return async (dispatch) => {

        try{
            let result = await quanLyPhimService.themPhimUploadHinh(FormData);
            alert('Thêm phim thành công');
            console.log('result', result);
        }catch (error) {
            console.log('error',error);
        }
    }
}

// export const themPhimUploadHinhAction = () => {
//     let promise = http.post('/api/QuanLyPhim/ThemPhimUploadHinh');

//     promise.then(result => {
//         console.log('result', result);

//     })

//     promise.catch(error => {
//         console.log('error', error.response.data.content);
//     })
// }

