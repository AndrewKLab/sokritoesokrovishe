import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HeaderRight,
  HeaderLeft,
  Reccord,
  Reccords,
  Categories,
} from '../_components';
import { connect } from 'react-redux';
import { MainTheme } from '../_styles';

import NewRecordsPage from '../Screens/NewRecordsPage';
import ArchivePage from '../Screens/ArchivePage';
import InfoPage from '../Screens/InfoPage';
import FavoritesPage from '../Screens/FavoritesPage';
import SubscribePage from '../Screens/SubscribePage';

const Stack = createStackNavigator();
function mapStateToProps(state) {
  const { theme } = state.style;
  return {
    theme,
  };
}

const screenOptions = (theme, navigation, route) => {
  return {
    headerLeft: () => <HeaderLeft navigation={navigation} route={route} />,
    headerRight: () => <HeaderRight navigation={navigation} />,
    headerStyle: {
      backgroundColor:
        theme === 'default' ? MainTheme.colors.primary : '#1f1f1f',
    },
    headerTintColor: '#fff',
    animationEnabled: false,
  };
};

const NewRecordsNavigator = ({ theme }) => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) =>
        screenOptions(theme, navigation, route)
      }>
      <Stack.Screen name="Новые записи" component={NewRecordsPage} />
      <Stack.Screen
        name="Запись"
        component={Reccord}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
};

const connectedNewRecordsNavigator = connect(mapStateToProps)(
  NewRecordsNavigator
);
export { connectedNewRecordsNavigator as NewRecordsNavigator };

const ArchiveNavigator = ({ theme }) => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) =>
        screenOptions(theme, navigation, route)
      }>
      <Stack.Screen name="Архив" component={ArchivePage} />
      <Stack.Screen
        name="Ресурс"
        component={Categories}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="Записи"
        component={Reccords}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="Запись"
        component={Reccord}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
};

const connectedArchiveNavigator = connect(mapStateToProps)(ArchiveNavigator);
export { connectedArchiveNavigator as ArchiveNavigator };

const InfoNavigator = ({ theme }) => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) =>
        screenOptions(theme, navigation, route)
      }>
      <Stack.Screen name="Информация" component={InfoPage} />
    </Stack.Navigator>
  );
};

const connectedInfoNavigator = connect(mapStateToProps)(InfoNavigator);
export { connectedInfoNavigator as InfoNavigator };

const FavoritesNavigator = ({ theme }) => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) =>
        screenOptions(theme, navigation, route)
      }>
      <Stack.Screen name="Избранное" component={FavoritesPage} />
      <Stack.Screen
        name="Запись"
        component={Reccord}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
};

const connectedFavoritesNavigator = connect(mapStateToProps)(
  FavoritesNavigator
);
export { connectedFavoritesNavigator as FavoritesNavigator };

const SubscribeNavigator = ({ route }) => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="ПРО" options={{title: ''}}  component={props => <SubscribePage {...props} route={route}/>} />
    </Stack.Navigator>
  );
};

const connectedSubscribeNavigator = connect(mapStateToProps)(SubscribeNavigator);
export { connectedSubscribeNavigator as SubscribeNavigator };


