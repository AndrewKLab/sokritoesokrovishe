import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  List,
  Card,
  Title,
  IconButton,
  Text,
  Caption,
} from 'react-native-paper';
import { onShare, config } from '../_helpers';
import { postsActions } from '../_actions';
import { styles } from '../_styles';
import moment from 'moment';
import localization from 'moment/locale/ru';


export const ReccordItem = ({ item, navigation, dispatch, posts, showDialogB, user }) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const goToReccord = () => {
    if (user === 'full') {
      navigation.navigate('Запись', {
        title: item.post_title,
        reccord: item,
        posts: posts,
      });
    } else {
      if (item.host === 'sokrsokr.net') {
        navigation.navigate('Запись', {
          title: item.post_title,
          reccord: item,
          posts: posts,
          navigation: navigation
        });
      } else {
        showDialogB()
      }
    }
  }
  return (
    <Card
      style={styles.gridItem}
      onPress={() => goToReccord()}>
      <Card.Cover source={{ uri: item.img }} />
      <Card.Content style={{ marginVertical: 5 }}>
        <Title>{item.post_title}</Title>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Caption>
            
            {moment(item.post_date).locale('ru', localization).format('L')}
          </Caption>
          <Caption>
            {item.host}
          </Caption>
        </View>
      </Card.Content>
      <Card.Actions style={{ justifyContent: user === 'full' ? 'space-between' : 'flex-end', }}>
        {user === 'full' && <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconButton icon="eye" size={24} />
          <Text>{item.views}</Text>
        </View>
        }
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconButton
            icon={item.favorite === true ? 'heart' : 'heart-outline'}
            size={24}
            onPress={() => { if (user !== 'full') { showDialogB() } else { dispatch(postsActions.toggleFavorites(item, posts)) } }}
          />
          <IconButton
            icon="share"
            size={24}
            onPress={() => onShare(item.guid)}
          />
        </View>
      </Card.Actions>
      {/* <DialogAccess
        visible={visible}
        hideDialog={hideDialog}
        text={
          'Для того чтобы получить добавлять записи в избранное, необходимо приобрести полную версию нашего приложения по ссылке ниже.'
        }
      /> */}
    </Card>
  );
};
