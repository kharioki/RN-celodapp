import { walletConstants } from "./constants";

export const initialState = {
  failed: false,
  connecting: false,
  message: "",
  address: "",
  phone: "",
};

export function walletReducer(state = initialState, action: any) {
  switch (action.type) {
    case walletConstants.CONNECT_REQUEST:
      return {
        connecting: true,
        message: action.message,
      };
    case walletConstants.CONNECT_SUCCESS:
      console.log('payload: ', action.payload);
      return {
        ...state,
        failed: false,
        address: action.payload.address,
        phone: action.payload.phoneNumber,
      };
    case walletConstants.CONNECT_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}