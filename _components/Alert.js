import * as React from 'react';
import { View } from 'react-native';
import { Subheading, IconButton, Colors } from 'react-native-paper';
export const Alert = ({ message, onRefresh }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Subheading>{message}</Subheading>
    <IconButton
      icon="refresh-circle"
      size={40}
      onPress={onRefresh}
    />
  </View>
);
