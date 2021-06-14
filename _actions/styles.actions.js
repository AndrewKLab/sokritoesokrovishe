import { stylesConstants } from '../_constants';
import { styleService } from '../_services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation';

export const stylesActions = {
  getTheme,
  setTheme,
  getFont,
  setFont,
  getFontSize,
  setFontSize,
  getOrintation,
  setOrintation,
  setUser
};


function getTheme() {
  return (dispatch) => {
    return styleService.getTheme().then((response) => {
      if (response !== null) {
        dispatch(success(response));
      } else {
        AsyncStorage.setItem('theme', 'default');
        dispatch(failure('default'));
      }
    });
  };

  function success(theme) {
    return { type: stylesConstants.GET_THEME, theme };
  }
  function failure(theme) {
    return { type: stylesConstants.GET_THEME, theme };
  }
}

function setTheme(theme) {
  AsyncStorage.setItem('theme', theme);
  return { type: stylesConstants.SET_THEME, theme };
}

function getFont() {
  return (dispatch) => {
    return styleService.getFont().then((response) => {
      if (response !== null) {
        dispatch(success(response));
      } else {
        AsyncStorage.setItem('font', 'sans-serif');
        dispatch(failure('sans-serif'));
      }
    });
  };

  function success(font) {
    return { type: stylesConstants.GET_FONT, font };
  }
  function failure(font) {
    return { type: stylesConstants.GET_FONT, font };
  }
}

function setFont(font) {
  AsyncStorage.setItem('font', font);
  return { type: stylesConstants.SET_FONT, font };
}

function getFontSize() {
  return (dispatch) => {
    return styleService.getFontSize().then((response) => {
      if (response !== null) {
        dispatch(success(response));
      } else {
        AsyncStorage.setItem('fontSize', '14');
        dispatch(failure('14'));
      }
    });
  };

  function success(fontsize) {
    return { type: stylesConstants.GET_FONTSIZE, fontsize };
  }
  function failure(fontsize) {
    return { type: stylesConstants.GET_FONTSIZE, fontsize };
  }
}

function setFontSize(fontsize) {
  AsyncStorage.setItem('fontSize', fontsize);
  return { type: stylesConstants.SET_FONTSIZE, fontsize };
}

function getOrintation(orintation) {
  return { type: stylesConstants.GET_ORINTATION, orintation };
}

function setOrintation(orintation) {
  return { type: stylesConstants.SET_ORINTATION, orintation };
}

function setUser(user) {
  return { type: stylesConstants.SET_USER, user };
}

