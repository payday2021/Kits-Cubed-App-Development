import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions
} from 'react-native';

import { connect, useDispatch } from 'react-redux';
import { signIn } from '../features/auth/authSlice';

import AppButton from '../components/Button';
import Input from '../components/Input';

const SignInScreen = (props) => {
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  useEffect(() => {
    if (props.status === 'fulfilled') {
      props.navigation.push('Dashboard');
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.errorText}>{props.error !== '' && props.error}</Text>
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
        {/* <AppButton
          title="Sign In"
          onPress={() => navigation.push('Dashboard')}
        /> */}
        <AppButton
          title="Sign In"
          onPress={() => {
            dispatch(signIn({ email: email, password: password }));
          }}
        />
        <AppButton
          title="Sign Up"
          onPress={() => props.navigation.push('Sign Up')}
        />
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

export default connect(mapStateToProps)(SignInScreen);
