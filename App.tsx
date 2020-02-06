import React from 'react';
import { StyleSheet, View } from 'react-native';
import Chat from './components/Chat/Chat'

export default function App() {
  
  return (
    <View style={styles.container}>
      <Chat />
      {/* <Text>Hello there</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    },
});
