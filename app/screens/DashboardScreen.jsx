import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  Button
} from 'react-native';
import { connect, useDispatch } from 'react-redux';

const DashboardScreen = (props) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Dashboard</Text>
      <ScrollView>
        <View>
          <Text style={{ fontSize: 20 }}>Hi there, {props.userName}.</Text>
          <Button
            title="Kits"
            onPress={() => props.navigation.push('Kits Menu')}
          ></Button>
          <Button
            title="My Cart"
            onPress={() => props.navigation.push('Cart Menu')}
          ></Button>
          <Button
            title="Events"
            onPress={() => props.navigation.push('Events Menu')}
          ></Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    width: Dimensions.get('screen').width,
  },
});

const mapStateToProps = (state) => {
  return {
    userName: state.auth.name,
  };
};

export default connect(mapStateToProps)(DashboardScreen);
