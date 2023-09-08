import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../features/auth/authSlice';

import AppButton from '../components/Button';
import Input from '../components/Input';

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Input
            type="text"
            secureTextEntry={false}
            placeholder="Name"
            onChangeText={onChangeName}
            value={name}
          />
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
            title="Sign Up"
            onPress={() => {
              dispatch(
                signUp({ name: name, email: email, password: password })
              );
            }}
          />
        </View>
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

export default SignUpScreen;
