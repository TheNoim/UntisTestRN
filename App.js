import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { URL } from 'react-native-url-polyfill';

global.Buffer = global.Buffer || require('buffer').Buffer

const WebUntisLib = require('webuntis');
const {createDigest, createRandomBytes} = require('@otplib/plugin-crypto-js');
const {Authenticator} = require('@otplib/core');
const {keyDecoder, keyEncoder} = require('@otplib/plugin-thirty-two');

const QRCodeData =
	'';

const authenticator = new Authenticator({
  createDigest,
  createRandomBytes,
  keyDecoder,
  keyEncoder
});

const untis = new WebUntisLib.WebUntisQR(QRCodeData, "test", authenticator, URL);

export default function App() {
  const [ready, setReady] = useState(0);

  untis.login().then(() => {
    setReady(true);
  });

  return (
    <View style={styles.container}>
      <Text>Ready {ready}!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
