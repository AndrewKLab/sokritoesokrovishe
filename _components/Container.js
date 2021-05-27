import * as React from 'react';
import { styles } from '../_styles';
import { View } from 'react-native';
export const Container = ({ children }) => (
  <View style={styles.content}>{children}</View>
);
