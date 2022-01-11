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
