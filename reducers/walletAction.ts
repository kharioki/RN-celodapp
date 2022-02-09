import * as Linking from 'expo-linking';
import { requestAccountAddress, waitForAccountAuth } from "@celo/dappkit";
import { walletConstants } from './constants';

/*
 The export statement is used to export the only function in the file so that the function can be called using `walletsActions.connect()`
 */
 export const walletActions = {
  connect,
};

/*
This function is a simple method provided by Celo to connect to the Valora or Alfajores (for testing) wallet. The `dispatch()` is a redux function which is used to emit actions which we can then listen for in the reducer and update the state accordingly.
*/
function connect() {
  return async (dispatch: any) => {
    // This dispatch calls a function that is declared later on in the code.
    dispatch(request('Connecting to wallet'));

    // These variables are needed to connect to the wallet
    // requestId is used to identify the request so we can listen for the same request using the waitForAccoutAuth() function
    // dappName holds the name of the App the wallet will expose as requesting for the detaila
    // callback is the screen we want to send the user to after a successfull connection is made
    const requestId = 'dapplogin';
    const dappName = 'celodapp';
    const callback = Linking.createURL('home');

    //T his is from the Celo DappKit library, it fires up the wallet and gets the neccessary information
    requestAccountAddress({
      requestId,
      dappName,
      callback,
    });

    //This function listens for the request above and fire up an action to be handled by a reducer.
    try {
      const dappkitResponse = await waitForAccountAuth(requestId);
      console.log('dappkitResponse: ', dappkitResponse);
      dispatch(success(dappkitResponse));
    } catch (error) {
      dispatch(failure(error));
    }
    // waitForAccountAuth(requestId)
    //   .then((res) => {
    //     dispatch(success(res));
    //   })
    //   .catch((err) => {
    //     dispatch(failure(err));
    //   });
  };

  //These are the function calls which are dispatched when the user makes a request. The state of the app changes with the status of the request response.
  function request(message: string) {
    return { type: walletConstants.CONNECT_REQUEST, message };
  }
  function success(res: object) {
    console.log({res})
    return { type: walletConstants.CONNECT_SUCCESS, res };
  }
  function failure(error: any) {
    return { type: walletConstants.CONNECT_FAILURE, error };
  }
}