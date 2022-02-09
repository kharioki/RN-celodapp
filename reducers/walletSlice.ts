import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { requestAccountAddress, waitForAccountAuth } from "@celo/dappkit";
import * as Linking from 'expo-linking';

interface WalletState {
  failed: boolean;
  connecting: boolean;
  message: string;
  address: string;
  phone: string;
}

const initialState: WalletState = {
  failed: false,
  connecting: false,
  message: "",
  address: "",
  phone: "",
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectRequest: (state, action: PayloadAction<string>) => {
      console.log("payload", action.payload);
      return {
        ...state,
        connecting: true,
        message: action.payload,
      };
    },
    connectSuccess: (state, action: any) => {
      console.log("state", state);
      console.log("payload", action.payload);
      return {
        ...state,
        failed: false,
        address: action.payload.address,
        phone: action.payload.phoneNumber,
      };
    },
    connectFailure: (state, action: any) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const { connectRequest, connectSuccess, connectFailure } = walletSlice.actions;

export const connect = () => async (dispatch: any) => {
  dispatch(connectRequest("Connecting to wallet..."));

  // Variables needed to connect to the wallet
  // requestId - used to identify the request so we can listen for the same request using the waitForAccoutAuth() function
  // dappName holds the name of the App the wallet will expose as requesting for the details
  // callback is the screen we want to send the user to after a successfull connection is made
  const requestId = "login";
  const dappName = "celodapp";
  const callback = Linking.makeUrl("home");

  requestAccountAddress({ requestId, dappName, callback });

  console.log("Waiting for account auth...");

  try {
    console.log("authenticating...");
    const res = await waitForAccountAuth(requestId);

    console.log("Got response from dappkit", res);

    if(!res.address) {
      dispatch(connectFailure("No address found"));
    }

    if (res.address) {
      dispatch(connectSuccess(res));
    }
  } catch (e) {
    console.log("Error", e);
    dispatch(connectFailure(e));
  }
  
}

export default walletSlice.reducer;