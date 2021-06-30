import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { ReccordItem } from '../_components';


const Posts = ({
  dispatch,
  navigation,
  posts_loading,
  posts_error,
  posts,
  posts_name,
  orintation,
  readAllNewPosts,
  onRefresh,
  refreshing,
  showDialogB,
  user
}) => {
  const renderFooter = () => {
    if (posts_error === '' && readAllNewPosts !== undefined) {
      return (
        //Footer View with Load More button
        <SafeAreaView
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator color="red" />
        </SafeAreaView>
      );
    } else {
      return null;
    }
  };

  return (
    <FlatList
      data={posts}
      onEndReachedThreshold={0.5}
      onEndReached={readAllNewPosts}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListFooterComponent={renderFooter}
      renderItem={({ item }) => (
        <ReccordItem
          item={item}
          navigation={navigation}
          dispatch={dispatch}
          posts={posts_name}
          showDialogB={showDialogB}
          user={user}
        />
      )}
      //Setting the number of column
      numColumns={orintation === 'LANDSCAPE' ? 2 : 1}
      key={orintation === 'LANDSCAPE' ? 2 : 1}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

function mapStateToProps(state) {
  const { orintation, user } = state.style;
  const { posts_loading, posts_error } = state.posts;
  return {
    user,
    orintation,
    posts_loading,
    posts_error,
  };
}


const connectedPosts = connect(mapStateToProps)(Posts);
export { connectedPosts as Posts };
