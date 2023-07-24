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
import { getKits } from '../features/kits/kitsSlice';
import axios from '../api/axios';

const DashboardScreen = (props) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(getKits());
  }, []);

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Dashboard</Text>
      <ScrollView>
        <View>
          {props.list.map((kit) => {
            return (
              <View key={kit.id}>
                <Text>{kit.id}</Text>
                <Text>{kit.name}</Text>
                <Text>{kit.desc}</Text>
              </View>
            );
          })}
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
    width: Dimensions.get('screen').width
  }
});

const mapStateToProps = (state) => {
  return { list: state.kits.list };
};

export default connect(mapStateToProps)(DashboardScreen);
