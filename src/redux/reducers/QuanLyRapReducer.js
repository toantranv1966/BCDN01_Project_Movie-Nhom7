import {
  LAY_ThONG_TIN_LICH_CHIEU,
  LOADING_DATA_ERROR,
  START_LOADING_DATA,
} from "../actions/types/QuanLyRapType";

const stateDefaut = {
  danhSachRap: [],
  lichChieu: {},
  isLoading: false,
  isLoadSuccess: true,
};

export const QuanLyRapReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    //   case LAY_DANH_SACH_RAP_PHIM: {
    //     return {
    //       ...state,
    //       danhSachRap: action.danhSachRap,
    //       isLoading: action.isLoading,
    //     };
    //   }
    case START_LOADING_DATA: {
      return { ...state, isLoading: true, isLoadSuccess: false };
    }
    case LOADING_DATA_ERROR: {
      state.danhSachRap = [];
      state.lichChieu = {};
      state.isLoading = true;
      state.isLoadSuccess = false;
      return { ...state };
    }
    case LAY_ThONG_TIN_LICH_CHIEU: {
      return {
        ...state,
        lichChieu: action.lichChieu,
        isLoading: false,
        isLoadSuccess: true,
      };
    }
    default:
      return { ...state };
  }
};
