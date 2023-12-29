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
import { getAllKits, getAllKitTypes } from '../features/kits/kitsSlice';
import AppButton from '../components/Button';
import { KitsList } from '../components/KitsList';
import { CartModal } from '../components/cartModal';

const DashboardScreen = (props) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [types, setTypes] = useState([]);

  const [cartModalIsVisible, setCartModalIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllKits());
    dispatch(getAllKitTypes());
  }, []);

  useEffect(() => {
    setList(props.list);
    setTypes(props.types);
  }, [props.list, props.types]);

  const filterByKitType = (type) => {
    const newList = props.list.filter((kit) => kit.KitTypeName === type);

    setList(newList);
  }

  // const filterKits = (kitType) => {
  //   console.log('LIST', props.list);
  //   const filteredData = props.list.filter((item) =>
  //     item.typeK.toLowerCase().includes(kitType.toLowerCase())
  //   );
  //   setList(filteredData);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Dashboard</Text>
      {/* <View style={styles.filter}>
        <AppButton
          title="electricity"
          onPress={() => {
            filterKits('electricity');
          }}
        ></AppButton>
        <AppButton
          title="mechanics"
          onPress={() => {
            filterKits('mechanics');
          }}
        ></AppButton>
      </View> */}
      <ScrollView>
        {/* <View>
          {list ? <KitsList kitlist={list}></KitsList> : <Text>No kits</Text>}
        </View> */}
        <View style={styles.filter}>
          <Button
            title="All"
            onPress={() => setList(props.list)}
          ></Button>
          {
            types && (
              types.map((type) => {
                return (
                  <Button
                    key={type.KitTypeID}
                    title={type.KitTypeName}
                    onPress={() => filterByKitType(type.KitTypeName)}
                  ></Button>
                );
              })
            )
          }
        </View>
        {
          list ? (
            list.map((kit) => {
              return (
                <View key={kit.KitID}>
                  <Text>{kit.KitName}</Text>
                  <Text>{kit.KitDesc}</Text>
                  <Text>({kit.KitTypeName})</Text>
                </View>
              );
            })
          ) : (
            <Text>No kits</Text>
          )
        }
      </ScrollView>
      {/* <Button title="view cart" onPress={() => setCartModalIsVisible(true)} /> */}
      {/* <CartModal
        visible={cartModalIsVisible}
        onClose={() => setCartModalIsVisible(null)}
      /> */}
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
  filter: {
    flex: 1,
    flexDirection: 'row',
    gap: 20
  }
});

const mapStateToProps = (state) => {
  return {
    types: state.kits.types, 
    list: state.kits.list, 
    status: state.kits.status 
  };
};

export default connect(mapStateToProps)(DashboardScreen);
