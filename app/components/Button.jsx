import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(
  TouchableOpacity,
  'border rounded-xl p-2 m-1 bg-gray-300'
);
const StyledText = styled(Text, '');

export default function AppButton({ onPress, title }) {
  return (
    <StyledTouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <StyledText>{title}</StyledText>
    </StyledTouchableOpacity>
  );
}
