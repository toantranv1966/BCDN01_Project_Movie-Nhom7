import {
  LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG,
  LAY_THONG_TIN_HE_THONG_RAP,
  LAY_ThONG_TIN_LICH_CHIEU,
  LOADING_DATA_ERROR,
  START_LOADING_DATA,
} from "../actions/types/QuanLyRapType";

const stateDefaut = {
  heThongRap: [],
  danhSachRap: [],
  lichChieu: {},
  isLoading: true,
};

export const QuanLyRapReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case LAY_THONG_TIN_HE_THONG_RAP: {
      return {
        ...state,
        heThongRap: action.heThongRap,
        isLoading: false,
      };
    }
    case LAY_ThONG_TIN_LICH_CHIEU: {
      return {
        ...state,
        lichChieu: action.lichChieu,
        isLoading: false,
      };
    }
    case LAY_THONG_TIN_CUM_RAP_THEO_HE_THONG: {
      return {
        ...state,
        danhSachRap: action.danhSachRap,
        isLoading: false,
      };
    }
    case START_LOADING_DATA: {
      return { ...state, isLoading: true };
    }
    case LOADING_DATA_ERROR: {
      return { ...stateDefaut };
    }
    default:
      return { ...state };
  }
};
