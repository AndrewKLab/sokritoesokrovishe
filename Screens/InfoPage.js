import React, { useCallback } from 'react';
import { View, Image, Linking, Alert, ScrollView } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { MainTheme } from '../_styles';

const SubscribePage = ({ navigation }) => {
  const handlePress = useCallback(async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  return (

    <ScrollView >
      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 16 }}>
        <Image source={require('../assets/sokrsokr.png')} />
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 25,
          }}>
          {
            '«Сокрытое Сокровище» — издание для твоей души. Здесь нет политики и светских сплетен. А есть всё, что ты хочешь узнать о Боге и Библии, о молитве и здоровом образе жизни, о семейных отношениях и воспитании детей.'
          }
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          {'Сайты наший изданий:'}
        </Text>
        <Button
          mode="text"
          style={{ fontSize: 16, textAlign: 'center' }}
          onPress={() => handlePress('http://chudostranichki.ru/')}>
          {'Чудесные странички'}
        </Button>
        <Button
          mode="text"
          style={{ fontSize: 16, textAlign: 'center' }}
          onPress={() => handlePress('https://8doktorov.ru')}>
          {'Ключи к здоровью'}
        </Button>
        <Button
          mode="text"
          style={{ fontSize: 16, textAlign: 'center' }}
          onPress={() => handlePress('https://proekt7d.ru/')}>
          {'7D Формат'}
        </Button>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon={'instagram'}
            size={50}
            color={'#c13584'}
            onPress={() => handlePress('https://www.instagram.com/sokr.sokr7')}
          />
          <IconButton
            icon={'podcast'}
            size={50}
            color={MainTheme.colors.primary}
            onPress={() => handlePress('https://sokrsokr.net/podcasts')}
          />
          <IconButton
            icon={'facebook'}
            size={50}
            color={'#3b5998'}
            onPress={() => handlePress('https://www.facebook.com/sokrsokr.net')}
          />
        </View>
      </View>
    </ScrollView>
  );
};


export default SubscribePage;
