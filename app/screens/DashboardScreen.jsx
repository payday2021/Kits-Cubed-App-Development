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
import AppButton from '../components/Button';
import { KitsList } from '../features/kits/KitsList';
import { CartModal }  from '../components/cartModal';

const DashboardScreen = (props) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [cartModalIsVisible, setCartModalIsVisible] = useState(false);


  useEffect(() => {
    dispatch(getKits());
  }, []);

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  const filterKits = (kitType) => {
    const filteredData = props.list.filter((item) =>
      item.typeK.toLowerCase().includes(kitType.toLowerCase())
    );
    setList(filteredData)
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Dashboard</Text>
      <View style = {styles.filter}>
        <AppButton title = 'electricity'
        onPress = {() => {
          filterKits('electricity');
        }}
        ></AppButton>
        <AppButton title = 'mechanics'
        onPress = {() => {
          filterKits('mechanics');
        }}        
        ></AppButton>
      </View>
       <ScrollView>
        <View>
          {list ? (<KitsList kitlist = {list}></KitsList>) : <Text>hey</Text>}
        </View>
      </ScrollView>
      <Button title = 'view cart' onPress = {() => setCartModalIsVisible(true)}/> 
      <Button title = 'clear localStorage (testing only)' onPress = {clearLocalStorage}/>
      <CartModal visible = {cartModalIsVisible} onClose={() => setCartModalIsVisible(null)}/>
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
  },
  filter : {
    flex: 1,
    flexDirection: 'row'
  }
});

const mapStateToProps = (state) => {
  return { list: state.kits.list,
          status: state.kits.status
        };
};

export default connect(mapStateToProps)(DashboardScreen);
