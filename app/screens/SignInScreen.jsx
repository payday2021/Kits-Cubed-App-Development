import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Dimensions
} from 'react-native';

import AppButton from '../components/Button';
import Input from '../components/Input';

export default HomeScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Input
          type="email"
          secureTextEntry={false}
          placeholder="Email"
          onChangeText={onChangeEmail}
          value={email}
        />
        <Input
          type="password"
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={onChangePassword}
          value={password}
        />
      </View>
      <View>
        <AppButton
          title="Sign In"
          onPress={() => navigation.push('Dashboard')}
        />
        <AppButton title="Sign Up" onPress={() => navigation.push('SignUp')} />
      </View>
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
