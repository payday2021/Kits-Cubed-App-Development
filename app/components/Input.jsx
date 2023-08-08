import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledTextInput = styled(TextInput, 'border rounded-xl p-2 m-1');

const Input = ({ type, secureTextEntry, placeholder, onChangeText, value }) => {
  return (
    <StyledTextInput
      type={type}
      placeholderTextColor={'black'}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize={'none'}
    ></StyledTextInput>
  );
};

export default Input;
