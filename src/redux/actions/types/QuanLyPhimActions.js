import {quanLyPhimService} from '../../../services/QuanLyPhimService';

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


