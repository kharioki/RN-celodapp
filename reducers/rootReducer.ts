import {walletReducer} from './walletReducer';

export default function rootReducer(state = {}, action: any) {
  return {
    wallet: walletReducer(state, action),
  };
}