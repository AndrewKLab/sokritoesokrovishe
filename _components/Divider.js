import * as React from 'react';
import { styles } from '../_styles';
import { View } from 'react-native';
export const Divider = ({ style }) => (
  <View style={[styles.divider, style] }/>
);
