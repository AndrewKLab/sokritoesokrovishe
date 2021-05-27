import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

export const Loading = () => (
  <ActivityIndicator animating={true} color={Colors.red800} style={{ flex: 1}} size='large' />
);