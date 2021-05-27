import React, { useEffect, useState } from 'react';
import {
  Drawer,
  IconButton,
  Button
} from 'react-native-paper';
import { connect } from 'react-redux';
import { SafeAreaView, View } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import { Loading, DialogFullAccess } from '../_components';
import { stylesActions, postsActions } from '../_actions';
import { MainTheme } from '../_styles';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  NewRecordsNavigator,
  ArchiveNavigator,
  InfoNavigator,
  FavoritesNavigator,
  SubscribeNavigator
} from './StackRouters.js';
import Orientation from 'react-native-orientation';
import { config } from '../_helpers';
import SplashScreen from 'react-native-splash-screen'

//const Tab = createBottomTabNavigator();
const DrawerNavigator = createDrawerNavigator();

const Router = ({ dispatch, theme }) => {
  const [loading, setLoading] = useState(true);
  const [visibleС, setVisibleС] = useState(false);
  const showDialogС = () => setVisibleС(true);
  const hideDialogС = () => setVisibleС(false);

  function CustomDrawerContent({ navigation }) {
    const [active, setActive] = useState('Новые записи');
    const selectScreen = (title) => {
      setActive(title);
      navigation.navigate(title);
    };


    return (
      <SafeAreaView>
        <Drawer.Section title="Меню">
          <Drawer.Item
            label="Новые записи"
            icon="newspaper"
            active={active === 'Новые записи'}
            onPress={() => selectScreen('Новые записи')}
          />
          <Drawer.Item
            label="Архив статей"
            icon="archive-outline"
            active={active === 'Архив'}
            onPress={() => selectScreen('Архив')}
          />
          <Drawer.Item
            label="Информация"
            icon="information-outline"
            active={active === 'Информация'}
            onPress={() => selectScreen('Информация')}
          />
        </Drawer.Section>
        <View>
          {config.access !== 'full' && (
            <>
              <View style={{ backgroundColor: '#eee', position: 'absolute', height: '100%', width: '100%', zIndex: 10000, opacity: 0.8, justifyContent: 'center', alignItems: 'center' }}>

              </View>
              <View style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 100000, justifyContent: 'center', alignItems: 'flex-end' }}>
                <IconButton
                  icon="lock"
                  color={'gray'}
                  size={20}
                />
              </View>
            </>
          )
          }
          {config.access !== 'full' ? (
            <View style={{ zIndex: 0 }}>
              <Drawer.Item
                label="Избранное"
                icon="heart-outline"
                active={active === 'Избранное'}
              />
            </View>
          ) : (
            <Drawer.Item
              label="Избранное"
              icon="heart-outline"
              active={active === 'Избранное'}
              onPress={() => selectScreen('Избранное')}
            />
          )}
        </View>
        {config.access === 'full' ? null : (
          <View style={{ alignItems: 'center' }}>
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
        )}

        <DialogFullAccess
          visible={visibleС}
          hideDialog={hideDialogС}
        />

      </SafeAreaView>
    );
  }

  useEffect(() => {
    dispatch(stylesActions.getTheme())
      .then(() => {
        Orientation.getOrientation((err, orientation) => {
          dispatch(stylesActions.setOrintation(orientation === 'PORTRAIT' ? 'portrait' : 'landscape'));
        });
      })
      .then(() => {
        dispatch(stylesActions.getFont());
      })
      .then(() => {
        dispatch(stylesActions.getFontSize());
      })
      .then(() => {
        dispatch(postsActions.getLastPostsType());
      })
      .then(() => {
        setLoading(false);
        SplashScreen.hide();
      });


    // Listner for orientation change LANDSCAPE / PORTRAIT
    Orientation.addOrientationListener(orientationChange);

    return () => {
      // Remember to remove listener
      Orientation.removeOrientationListener(orientationChange);
    };
  }, []);

  const orientationChange = (orientation) => {
    dispatch(stylesActions.setOrintation(orientation === 'PORTRAIT' ? 'portrait' : 'landscape'));
  };

  if (loading === true) {
    return <Loading />;
  } else {
    return (
      <PaperProvider theme={theme === 'default' ? MainTheme : PaperDarkTheme}>
        <NavigationContainer
          theme={theme === 'default' ? DefaultTheme : DarkTheme}>
          <DrawerNavigator.Navigator
            theme={MainTheme}
            initialRouteName="Новые записи"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerType={'front'}
            drawerContentOptions={{
              activeTintColor: '#9b4be5',
            }}>
            <DrawerNavigator.Screen
              name="Новые записи"
              component={NewRecordsNavigator}
            />

            <DrawerNavigator.Screen name="Архив" component={ArchiveNavigator} />

            <DrawerNavigator.Screen
              name="Информация"
              component={InfoNavigator}
            />

            <DrawerNavigator.Screen
              name="Избранное"
              component={FavoritesNavigator}
            />

            <DrawerNavigator.Screen
              name="Подписка"
              component={SubscribeNavigator}
            />
          </DrawerNavigator.Navigator>
        </NavigationContainer>
      </PaperProvider >
    );
  }
};

function mapStateToProps(state) {
  const { theme } = state.style;
  return {
    theme,
  };
}

const connectedRouter = connect(mapStateToProps)(Router);
export { connectedRouter as Router };