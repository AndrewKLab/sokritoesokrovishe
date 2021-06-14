import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Text, Title, IconButton } from 'react-native-paper';
import { Container, DialogFullAccess, Divider } from '../_components';
import { styles } from '../_styles';
import { onShare, config } from '../_helpers';
import { connect } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import moment from 'moment';
import localization from 'moment/locale/ru';
import { postsActions } from '../_actions';

const Reccord = ({ route, dispatch, font, fontsize, theme, user }) => {
  const rec = route.params.reccord;
  const posts = route.params.posts;
  const [favorite, setFavorite] = useState(rec.favorite);
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <ScrollView style={styles.container}>
      <Container>
        <Image source={{ uri: rec.img }} style={styles.recordImage} />
        <Title
          style={{
            fontFamily: font,
            fontWeight: 'bold',
            fontSize: Number(fontsize) * 1.5,
            paddingTop: Number(fontsize) / 2,
            marginTop: Number(fontsize) / 2,
          }}>
          {rec.post_title}
        </Title>
        <RenderHtml
          source={{ html: rec.post_content }}
          baseFontStyle={{
            fontFamily: font,
            fontSize: Number(fontsize),
            color: theme === 'default' ? '#000' : '#FFFFFF',
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#ccc'
          }}>
          <View>
            <Text>
            {moment(rec.datetime).locale('ru', localization).format('L')}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            {user === 'full' && <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconButton icon="eye" size={24} />
              <Text>{rec.views}</Text>
            </View>
            }
            <IconButton
              icon={favorite === true ? 'heart' : 'heart-outline'}
              size={24}
              onPress={() => { if (user !== 'full') { showDialog() } else { dispatch(postsActions.toggleFavorites(rec, posts)), setFavorite(!favorite) } }}
            />
            <IconButton
              icon="share"
              size={24}
              onPress={() => onShare(rec.guid)}
            />
          </View>
        </View>
        <DialogFullAccess
          visible={visible}
          hideDialog={hideDialog}
        />
      </Container>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  const { font, fontsize, theme, user } = state.style;
  return {
    font,
    fontsize,
    theme,
    user
  };
}

const connectedReccord = connect(mapStateToProps)(Reccord);
export { connectedReccord as Reccord };
