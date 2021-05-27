import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

import { connect } from 'react-redux';
import { postsActions } from '../_actions';
import { styles } from '../_styles';
import { Loading, Posts } from '../_components';

const Reccords = ({
  route,
  dispatch,
  navigation,
  posts_loading,
  posts_error,
  posts,
}) => {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(
      postsActions.readPostsByCategory(
        route.params.link,
        route.params.category,
        0
      )
    ).then(() => {
      setOffset(10);
      setLoading(false);
    });
  }, [dispatch, route]);

  const readAllNewPosts = () => {
    if (!posts_loading && posts_error === '') {
      dispatch(
        postsActions.readPostsMoreByCategory(
          route.params.link,
          route.params.category,
          offset
        )
      ).then(() => {
        setOffset(offset + 10);
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.gridContainer}>
      <Posts
        navigation={navigation}
        posts={posts}
        posts_name={'posts'}
        readAllNewPosts={readAllNewPosts}
      />
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  const { posts, posts_loading, posts_error } = state.posts;
  return {
    posts,
    posts_loading,
    posts_error,
  };
}

const connectedReccords = connect(mapStateToProps)(Reccords);
export { connectedReccords as Reccords };
