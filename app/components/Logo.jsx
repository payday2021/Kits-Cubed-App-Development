import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <Image
      source={require('../assets/logo.png')}
      resizeMode="contain"
      style={styles.logo}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 75,
    margin: 20
  }
});

export default Logo;
