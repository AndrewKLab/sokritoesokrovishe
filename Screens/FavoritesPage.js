import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { IconButton, Subheading, Surface } from 'react-native-paper';
import { postsActions } from '../_actions';
import { Loading, Posts } from '../_components';
import { connect } from 'react-redux';
import { styles } from '../_styles';

const FavoritesPage = ({
  navigation,
  dispatch,
  theme,
  orintation,
  favorites_posts,
  favorites_error,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(postsActions.readFavorites()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) return <Loading />;
  if (favorites_posts.length === 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Surface
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            elevation: 2,
            borderRadius: 5,
          }}>
          <IconButton
            icon="heart-circle-outline"
            size={100}
            color={'#ff3347'}
          />
          <Subheading>{'Ваш список избранных записей пуст.'}</Subheading>
        </Surface>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.gridContainer}>
      <Posts
        navigation={navigation}
        posts={favorites_posts}
        posts_name={'favorites_posts'}
      />
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  const { favorites_posts, favorites_error } = state.posts;
  return {
    favorites_posts,
    favorites_error,
  };
}

export default connect(mapStateToProps)(FavoritesPage);
