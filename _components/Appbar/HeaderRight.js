import React, { useCallback, useState } from 'react';
import {
  Menu,
  IconButton,
  Button,
  List,
  Switch,
  Text,
  Colors
} from 'react-native-paper';
import { View, Linking, Alert } from 'react-native';
import { connect } from 'react-redux';
import { stylesActions, postsActions } from '../../_actions';
import { fonts, config } from '../../_helpers'
import { DialogFullAccess } from '../';

const HeaderRight = ({ theme, fontsize, font, dispatch, lastPostsType }) => {

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [visibleС, setVisibleС] = useState(false);
  const showDialogС = () => setVisibleС(true);
  const hideDialogС = () => setVisibleС(false);

  const handlePress = useCallback(
    async (url) => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    },
  );

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="cog" color={"#ffffff"} onPress={openMenu} />}
      style={{ minWidth: 'auto' }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <List.Icon icon="weather-night" />
        <Text style={{ marginRight: 12 }}>{'Темная тема'}</Text>
        <Switch
          color={Colors.red500}
          style={{ marginRight: 12 }}
          value={theme !== undefined && theme === 'dark'}
          onValueChange={(val) =>
            dispatch(stylesActions.setTheme(val === true ? 'dark' : 'default'))
          }
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <IconButton
          icon="minus"
          color={Colors.red500}
          size={20}
          disabled={fontsize === '8'}
          onPress={() => dispatch(stylesActions.setFontSize(String(Number(fontsize) - 1)))}
        />
        <Text style={{ marginRight: 12 }}>{`Размер шрифта: ${fontsize}`}</Text>
        <IconButton
          icon="plus"
          color={Colors.red500}
          size={20}
          disabled={fontsize === '32'}
          onPress={() => dispatch(stylesActions.setFontSize(String(Number(fontsize) + 1)))}
        />
      </View>
      <View style={{ marginHorizontal: 8 }}>
        {config.access !== 'full' && (
          <>
            <View style={{ backgroundColor: '#eee', position: 'absolute', height: '100%', width: '100%', zIndex: 1, opacity: 0.8, justifyContent: 'center', alignItems: 'center' }}>

            </View>
            <View style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Button style={{
                width: '70%',
                marginVertical: 8,
                borderRadius: 20
              }}
                mode={'contained'}
                onPress={() => showDialogС()}>
                {'Подписка Pro'}
              </Button>
            </View>
          </>
        )
        }
        <View style={{ zIndex: 0, paddingBottom: 2 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <IconButton
              icon="chevron-left"
              color={Colors.red500}
              size={20}
              disabled={font === fonts.default[0]}
              onPress={() => dispatch(stylesActions.setFont(fonts.default[fonts.default.indexOf(font) - 1]))}
            />
            <Text style={{ marginRight: 12 }}>{`Шрифт: ${font}`}</Text>
            <IconButton
              icon="chevron-right"
              color={Colors.red500}
              size={20}
              disabled={font === fonts.default[fonts.default.length - 1]}
              onPress={() => dispatch(stylesActions.setFont(fonts.default[fonts.default.indexOf(font) + 1]))}
            />
          </View>
          <View >
            <View style={{ height: 0.5, backgroundColor: '#eee' }} />
            <Text style={{ marginTop: 8, textAlign: 'center' }}>{'Получать записи'}</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 2,
                marginTop: 8
              }}>
              <Button mode={lastPostsType === 'last' ? "contained" : "text"} style={{ marginRight: 5 }} onPress={() => dispatch(postsActions.setLastPostsType(lastPostsType !== 'last' ? 'last' : 'random'))}>Новые</Button>
              <Button mode={lastPostsType === 'random' ? "contained" : "text"} onPress={() => dispatch(postsActions.setLastPostsType(lastPostsType !== 'last' ? 'last' : 'random'))}>Случайные</Button>
            </View>
          </View>
        </View>
      </View>
      <DialogFullAccess
        visible={visibleС}
        hideDialog={hideDialogС}
      />
    </Menu>
  );
};
function mapStateToProps(state) {
  const { lastPostsType } = state.posts;
  const { theme, fontsize, font } = state.style;
  return {
    lastPostsType,
    theme,
    fontsize,
    font
  };
}

const connectedHeaderRight = connect(mapStateToProps)(HeaderRight);
export { connectedHeaderRight as HeaderRight };
