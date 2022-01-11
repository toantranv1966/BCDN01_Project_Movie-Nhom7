import { LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP } from "../actions/types/LichChieuTypes";
const stateDefault = {
  lichChieuHeThongRap: [],
  isLoading: true,
};
export const LichChieuReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP: {
      return {
        ...state,
        lichChieuHeThongRap: action.lichChieuHeThongRap,
        isLoading: false,
      };
    }
    default:
      return { ...state };
  }
};
