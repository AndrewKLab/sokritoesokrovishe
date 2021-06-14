import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';
import { postsActions } from '../_actions';
import { styles } from '../_styles';
import { Alert, Loading, Posts, DialogAccess, DialogFullAccess } from '../_components';
import { config } from '../_helpers';

const NewRecordsPage = ({
  dispatch,
  navigation,
  lastposts,
  lastposts_loading,
  lastposts_error,
  lastPostsType,
  postsLimits,
  user
}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState({
    semD: 0,
    kkz: 0,
    sokrsokr: 0
  });
  const [visibleA, setVisibleA] = useState(false);
  const [visibleB, setVisibleB] = useState(false);
  const [visibleС, setVisibleС] = useState(user === 'full' ? false : true);

  const showDialogA = () => setVisibleA(true);
  const hideDialogA = () => setVisibleA(false);

  const showDialogB = () => setVisibleB(true);
  const hideDialogB = () => setVisibleB(false);

  const showDialogС = () => setVisibleС(true);
  const hideDialogС = () => setVisibleС(false);

  useEffect(() => {
    console.log(lastPostsType)
    if (lastPostsType !== undefined && lastPostsType !== "" && lastPostsType !== 'random') {
      dispatch(postsActions.readNewPosts(0, postsLimits)).then(() => {
        setOffset({
          semD: postsLimits.semD,
          kkz: postsLimits.kkz,
          sokrsokr: postsLimits.sokrsokr
        });
        setLoading(false);
      });
    } else {
      dispatch(postsActions.readRandomPosts(0)).then(() => {
        setOffset(5);
        setLoading(false);
      });
    }

  }, [dispatch, lastPostsType, postsLimits]);

  const onRefresh = () => {
    setRefreshing(true);
    if (!lastposts_loading) {
      if (lastPostsType === 'last') {
        dispatch(postsActions.readNewPosts(0, postsLimits)).then(() => {
          setRefreshing(false);
        });
      } else {
        dispatch(postsActions.readRandomPosts(0)).then(() => {
          setRefreshing(false);
        });
      }
    }
  };

  const onRefreshError = () => {
    setLoading(true);
    if (!lastposts_loading) {
      if (lastPostsType === 'last') {
        dispatch(postsActions.readNewPosts(0, postsLimits)).then(() => {
          setLoading(false);
        });
      } else {
        dispatch(postsActions.readRandomPosts(0)).then(() => {
          setLoading(false);
        });
      }
    }
  };

  const readAllNewPosts = () => {
    if (!lastposts_loading) {
      if (lastPostsType === 'last') {
        dispatch(postsActions.readMoreNewPosts(offset, postsLimits)).then(() => {
          setOffset({
            semD: offset.semD + postsLimits.semD,
            kkz: offset.kkz + postsLimits.kkz,
            sokrsokr: offset.sokrsokr + postsLimits.sokrsokr
          });
        });
      } else {
        dispatch(postsActions.readMoreRandomPosts(offset)).then(() => {
          setOffset(offset + 5);
        });
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (lastposts_error !== '') {
    return <Alert message={lastposts_error} onRefresh={onRefreshError} />;
  }

  return (
    <SafeAreaView style={styles.gridContainer}>
      <Posts
        navigation={navigation}
        posts={lastposts}
        posts_name={'lastposts'}
        readAllNewPosts={readAllNewPosts}
        onRefresh={onRefresh}
        refreshing={refreshing}
        showDialogB={showDialogС}
      />
      {/* <DialogAccess
        visible={visibleA}
        hideDialog={hideDialogA}
        text={
          'Для того чтобы получить доступ ко всем последним постам с наших ресурсов, необходимо приобрести полную версию нашего приложения по ссылке ниже.'
        }
      />
      <DialogAccess
        visible={visibleB}
        hideDialog={hideDialogB}
        text={
          'В бесплатной версии приложения вам доступны только статьи с ресурса sokrsokr.net, для получения доступа ко всем статьям, необходимо приобрести полную версию нашего приложения по ссылке ниже.'
        }
      /> */}
      <DialogFullAccess
        visible={visibleС}
        hideDialog={hideDialogС}
      />
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  const { lastposts, lastposts_loading, lastposts_error, lastPostsType, postsLimits } = state.posts;
  const { user } = state.style;
  return {
    user,
    lastposts,
    lastposts_loading,
    lastposts_error,
    lastPostsType,
    postsLimits
  };
}

export default connect(mapStateToProps)(NewRecordsPage);
