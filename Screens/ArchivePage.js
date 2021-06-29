import React, { useState } from 'react';
import { SafeAreaView, Image, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { styles } from '../_styles';
import { config } from '../_helpers';
import { DialogFullAccess } from '../_components';
import { connect } from 'react-redux';

const ArchivePage = ({ navigation, user }) => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const goToCategories = (title, link) => {
    if (user === 'full') {
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
      <DialogFullAccess
        visible={visible}
        hideDialog={hideDialog}
      />
    </SafeAreaView>
  );
};
function mapStateToProps(state) {
  const { user } = state.style;
  return {
    user
  };
}

export default connect(mapStateToProps)(ArchivePage);
