import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Text, View } from '../components/Themed';

export default function HomeScreen() {
  const {message, address, phone} = useSelector((state: any) => state.wallet);

  console.log('HomeScreen');
  console.log({ address, phone, message });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet address</Text>
      <Text style={styles.title}>Wallet phone</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
