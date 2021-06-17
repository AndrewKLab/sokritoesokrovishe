import React, { useEffect, useState } from 'react';
import {
  Drawer,
  IconButton,
  Button
} from 'react-native-paper';
import { connect } from 'react-redux';
import { Alert, SafeAreaView, View } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  Text,
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
import SplashScreen from 'react-native-splash-screen'
import Purchases from 'react-native-purchases';
import { configConstants } from '../_constants';

//const Tab = createBottomTabNavigator();
const DrawerNavigator = createDrawerNavigator();

const Router = ({ dispatch, theme, user }) => {
  const [loading, setLoading] = useState(true);
  const [visibleС, setVisibleС] = useState(false);
  const showDialogС = () => setVisibleС(true);
  const hideDialogС = () => setVisibleС(false);

  const [isAnonimus, setIsAnonimus] = useState(true);
  const [userId, setUserId] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);

  const getUserData = async () => {
    setIsAnonimus(await Purchases.isAnonymous());
    setUserId(await Purchases.getAppUserID());

    const purchaserInfo = await Purchases.getPurchaserInfo();
    setSubscriptionActive(purchaserInfo.entitlements.active[configConstants.ENTITLEMENT_ID] !== undefined)
    console.log(purchaserInfo)
  }

  function CustomDrawerContent({ navigation }) {
    const [active, setActive] = useState('Новые записи');
    const selectScreen = (title) => {
      setActive(title);
      navigation.navigate(title);
    };

    const restorePurchases = async () => {
      try {
        const restore = await Purchases.restoreTransactions();
      } catch (e) {
        Alert.alert(e.message);
      }
    }


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
          {user !== 'full' && (
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
          {user !== 'full' ? (
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
        {user === 'full' ? null : (
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

        {/* <Text >{`User ID: ${isAnonimus === true ? isAnonimus : userId}`}</Text>
        <Text >{`Подписка PRO: ${subscriptionActive === true ? 'ACTIVE' : 'DISABLED'}`}</Text>
        <View style={{ alignItems: 'center' }}>
          <Button
            mode={'link'}
            onPress={() => restorePurchases()}>
            {'Восстановить подписку'}
          </Button>
        </View> */}
        <DialogFullAccess
          visible={visibleС}
          hideDialog={hideDialogС}
        />

      </SafeAreaView>
    );
  }

  useEffect(() => {
    const preLoadParams = async () => {
      SplashScreen.hide();

      Purchases.setDebugLogsEnabled(true);
      Purchases.setup(configConstants.API_KEY);

      getUserData();

      const purchaserInfo = await Purchases.getPurchaserInfo();
      const purchaserInfoUser = purchaserInfo.entitlements.active[configConstants.ENTITLEMENT_ID] !== undefined;

      if (purchaserInfoUser) {
        await dispatch(stylesActions.setUser('full'));
      } else {
        await dispatch(stylesActions.setUser('limited'));
      }

      const orientation = Orientation.getInitialOrientation()
      await dispatch(stylesActions.setOrintation(orientation))
      await dispatch(stylesActions.getTheme());
      await dispatch(postsActions.getLastPostsType());
      await dispatch(postsActions.setPostsLimits(purchaserInfoUser === true ? {
        semD: 5,
        kkz: 5,
        sokrsokr: 6
      } : {
        semD: 1,
        kkz: 6,
        sokrsokr: 9
      }));
      await dispatch(stylesActions.getFont());
      await dispatch(stylesActions.getFontSize());

      setLoading(false);

    }

    preLoadParams();

    // Listner for orientation change LANDSCAPE / PORTRAIT
    Orientation.addOrientationListener(orientationChange);

    return () => {
      // Remember to remove listener
      Orientation.removeOrientationListener(orientationChange);
    };
  }, []);

  const orientationChange = (orientation) => {
    dispatch(stylesActions.setOrintation(orientation));
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
  const { theme, user } = state.style;
  return {
    theme,
    user
  };
}

const connectedRouter = connect(mapStateToProps)(Router);
export { connectedRouter as Router };
