import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import AppContainer from './src/Splash';
console.disableYellowBox = true;
export default function App() {
  firebase.initializeApp({
    apiKey: 'AIzaSyDnKUBPUThvgs8kskYZ6v2qYaTN_zbSMn8',
    authDomain: "moveout-ab6e5.firebaseapp.com",
    databaseURL:"moveout-ab6e5.firebaseio.com/",
    storageBucket: "moveout-ab6e5.appspot.com",
})

 return (
    <View style={styles.container}>
      <AppContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
