import AsyncStorage from '@react-native-async-storage/async-storage';

export const styleService = {
  getTheme,
  getFont,
  getFontSize,
};

function getTheme() {
  return AsyncStorage.getItem('theme');
}

function getFont() {
  return AsyncStorage.getItem('font');
}

function getFontSize() {
  return AsyncStorage.getItem('fontSize');
}
