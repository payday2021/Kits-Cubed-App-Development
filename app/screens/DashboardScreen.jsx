import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  SafeAreaView,
  Dimensions
} from 'react-native';

export default DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Dashboard</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    width: Dimensions.get('screen').width
  }
});
