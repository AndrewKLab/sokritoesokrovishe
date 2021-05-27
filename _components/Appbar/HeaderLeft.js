import * as React from 'react';
import {
  Appbar,
  Menu,
  Divider,
  IconButton,
  List,
  Switch,
  Text,
  Colors,
} from 'react-native-paper';
import { View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { stylesActions } from '../../_actions';

const HeaderLeft = ({ theme, fontsize, navigation, route }) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useDispatch();

  if (route !== undefined && (route.name === 'Запись' || route.name === 'Записи' || route.name === 'Ресурс' )) {
    return (
      <IconButton
        icon="arrow-left"
        color={'#ffffff'}
        onPress={() => navigation.goBack()}
      />
    );
  } else {
    return (
      <IconButton
        icon="menu"
        color={'#ffffff'}
        onPress={() => navigation.toggleDrawer()}
      />
    );
  }
};
function mapStateToProps(state) {
  const { theme, fontsize } = state.style;
  return {
    theme,
    fontsize,
  };
}

const connectedHeaderLeft = connect(mapStateToProps)(HeaderLeft);
export { connectedHeaderLeft as HeaderLeft };
