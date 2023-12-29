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

const EventsMenuScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Events</Text>
      <ScrollView>
        
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
    width: Dimensions.get('screen').width
  }
});

const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(mapStateToProps)(EventsMenuScreen);
