<<<<<<< HEAD
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { LAY_DANH_SACH_NGUOI_DUNG, DANG_NHAP_ACTION, THONG_TIN_TAI_KHOAN,LOAI_NGUOI_DUNG}
from "../actions/types/QuanLyNguoiDungTypes";

// Kiểm tra storage, giá trị mặc định
let user = {};
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    thongTinTaiKhoan:{},
    
    mangNguoiDung: [],
    userLogin: user, 
    loaiNguoiDung:[]
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case LAY_DANH_SACH_NGUOI_DUNG: {
            state.mangNguoiDung = action.mangNguoiDung;
            return {...state};
        }

        case DANG_NHAP_ACTION: {
            const {thongTinDangNhap} = action;
            localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN,thongTinDangNhap.accessToken);
            return {...state,userLogin:thongTinDangNhap}

        }

        case THONG_TIN_TAI_KHOAN: {
            state.thongTinTaiKhoan = action.thongTinTaiKhoan;
            return {...state};
        }

        case LOAI_NGUOI_DUNG: {
            state.loaiNguoiDung = action.loaiNguoiDung;
            return {...state}
        }

        default: return { ...state }
    }
}
=======
import {
  DANG_KY,
  DANG_NHAP,
  DANG_XUAT,
  GUI_THONG_BAO,
} from "../actions/types/QuanLyNguoiDungTypes";

let nguoiDung = {};
if (localStorage.getItem("user")) {
  nguoiDung = JSON.parse(localStorage.getItem("user"));
}

const stateDefaut = {
  nguoiDung: nguoiDung,
  loginMessage: "",
};

export const QuanLyNguoiDungReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case DANG_KY: {
      localStorage.setItem("user", JSON.stringify(action.nguoiDung));
      return {
        ...state,
        nguoiDung: action.nguoiDung,
        loginMessage: action.loginMessage,
      };
    }
    case DANG_NHAP: {
      localStorage.setItem("user", JSON.stringify(action.nguoiDung));
      return {
        ...state,
        nguoiDung: action.nguoiDung,
        loginMessage: action.loginMessage,
      };
    }
    case DANG_XUAT: {
      localStorage.removeItem("user");
      return { ...state, nguoiDung: {}, loginMessage: "" };
    }
    case GUI_THONG_BAO: {
      state.loginMessage = action.loginMessage;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
>>>>>>> minh_duc
