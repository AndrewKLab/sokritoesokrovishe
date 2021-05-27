import React, { useState } from 'react';
import { SafeAreaView, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { styles } from '../_styles';
import { config } from '../_helpers';
import { DialogAccess } from '../_components';

const ArchivePage = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const goToCategories = (title, link) => {
    if (config.access === 'full') {
      navigation.navigate('Ресурс', {
        title: title,
        link: link,
      });
    } else {
      if (title === 'Сокрытое сокровище') {
        navigation.navigate('Ресурс', {
          title: title,
          link: link,
        });
      } else {
        showDialog();
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card
        onPress={() =>
          goToCategories('Сокрытое сокровище', 'https://sokrsokr.net')
        }
        style={[styles.mt2, styles.source]}>
        <Image
          resizeMode="contain"
          style={styles.w100}
          source={require('../assets/sokrsokr.png')}
        />
      </Card>
      <Card
        onPress={() => {
          goToCategories('Ключи к здоровью', 'https://8doktorov.ru');
        }}
        style={styles.source}>
        <Image
          resizeMode="contain"
          style={styles.w100}
          source={require('../assets/kkz.png')}
        />
      </Card>
      <Card
        onPress={() => {
          goToCategories('7D формат', 'https://proekt7d.ru');
        }}
        style={styles.source}>
        <Image
          resizeMode="contain"
          style={styles.w100}
          source={require('../assets/7d.png')}
        />
      </Card>
      <DialogAccess
        visible={visible}
        hideDialog={hideDialog}
        text={
          'Для того чтобы получить доступ ко всем архивам с наших ресурсов, необходимо приобрести полную версию нашего приложения по ссылке ниже.'
        }
      />
    </SafeAreaView>
  );
};

export default ArchivePage;
