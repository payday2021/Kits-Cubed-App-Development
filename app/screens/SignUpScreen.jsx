import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { signUp } from '../features/auth/authSlice';

import AppButton from '../components/Button';
import Input from '../components/Input';

const SignUpScreen = (props) => {
  const dispatch = useDispatch();

  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  useEffect(() => {
    if (props.status === 'fulfilled') {
      props.navigation.push('Tabs');
    }
  }, [props.status]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.errorText}>{props.error !== '' && props.error}</Text>
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
  },
  errorText: {
    color: 'red'
  }
});

const mapStateToProps = (state) => {
  return { status: state.auth.status, error: state.auth.error };
};

export default connect(mapStateToProps)(SignUpScreen);
