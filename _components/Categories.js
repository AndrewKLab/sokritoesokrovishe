import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { categoriesActions, postsActions } from '../_actions';
import { styles } from '../_styles';
import { Loading, Posts, Alert } from '../_components';

const Categories = ({
  dispatch,
  navigation,
  route,
  categories,
  categories_loading,
  categories_error,
  search_posts,
  posts_loading,
  posts_error,
}) => {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(categoriesActions.readAllCategories(route.params.link)).then(() =>
      setLoading(false)
    );
  }, [dispatch, route]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setLoading(true);
    setOffset(0);
    dispatch(postsActions.searchPosts(route.params.link, query, offset)).then(
      () => {
        setOffset(offset + 10);
        setLoading(false);
      }
    );
    console.log(query);
  };

  const readAllNewPosts = () => {
    if (!posts_loading && posts_error === '') {
      dispatch(
        postsActions.searchMorePosts(route.params.link, searchQuery, offset)
      ).then(() => {
        setOffset(offset + 10);
      });
    }
  };

  if (categories_error !== '') {
    return (
      <Alert
        message={"Ошибка соединения. Рубрики не найдены."}
        onRefresh={() => {
          dispatch(
            categoriesActions.readAllCategories(route.params.link)
          ).then(() => setLoading(false));
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.gridContainer}>
      <Searchbar
        placeholder="Поиск..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ borderRadius: 0 }}
      />
      {loading ? (
        <Loading />
      ) : searchQuery !== '' && !loading ? (
        <Posts
          navigation={navigation}
          posts={search_posts}
          posts_name={'search_posts'}
          readAllNewPosts={readAllNewPosts}
        />
      ) : (
        <FlatList
          data={categories}
          renderItem={({ item }) => {
            return item.subcategories.length > 0 ? (
              <List.Accordion
                title={item.name}
                left={(props) => <List.Icon {...props} icon="folder" />}>
                {item.subcategories.map((subcategory, index) => (
                  <List.Item
                    title={subcategory.name}
                    onPress={() => {
                      navigation.navigate('Записи', {
                        title: item.name,
                        category: item.term_id,
                        link: route.params.link,
                      });
                    }}
                  />
                ))}
              </List.Accordion>
            ) : (
              <List.Item
                left={(props) => <List.Icon {...props} icon="folder" />}
                title={item.name}
                onPress={() => {
                  navigation.navigate('Записи', {
                    title: item.name,
                    category: item.term_id,
                    link: route.params.link,
                  });
                }}
              />
            );
          }}
          keyExtractor={(reccord, index) => index}
        />
      )}
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  const { categories, categories_loading, categories_error } = state.categories;
  const { search_posts, posts_loading, posts_error } = state.posts;
  return {
    categories,
    categories_loading,
    categories_error,
    search_posts,
    posts_loading,
    posts_error,
  };
}
const connectedCategories = connect(mapStateToProps)(Categories);
export { connectedCategories as Categories };
