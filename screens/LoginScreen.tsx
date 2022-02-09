import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { requestAccountAddress, waitForAccountAuth } from "@celo/dappkit";
import * as Linking from 'expo-linking';

import { walletActions } from '../reducers/walletAction';

import { Text, View } from '../components/Themed';
import { connect, connectRequest, connectSuccess, connectFailure } from '../reducers/walletSlice';

export default function LoginScreen() {
  const wallet = useSelector((state: any) => state.wallet);
  const dispatch = useDispatch();

  const login = async () => {
    dispatch(walletActions.connect());
  };

  const connectWallet = async () => {
    dispatch(connectRequest("Connecting to wallet..."));
  
    // Variables needed to connect to the wallet
    // requestId - used to identify the request so we can listen for the same request using the waitForAccoutAuth() function
    // dappName holds the name of the App the wallet will expose as requesting for the details
    // callback is the screen we want to send the user to after a successfull connection is made
    const requestId = "login";
    const dappName = "celodapp";
    const callback = Linking.createURL("home");
  
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

  console.log('LoginScreen');
  console.log({ wallet });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => login()}>
        <Text style={styles.buttonText}>Connect Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#2e78b7',
  },
});
