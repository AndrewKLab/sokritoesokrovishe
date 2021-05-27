import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const postsService = {
  readNewPosts,
  readRandomPosts,
  readPostsByCategory,
  getFavoritesPosts,
  setFavoritesPosts,
  searchPosts,
  getLastPostsType
};

function readNewPosts(url, offset, limit) {
  return axios.get(`${url}/api/v1/post/read_last_posts.php?l=${limit}&o=${offset}`);
}

function readRandomPosts(url, offset) {
  return axios.get(`${url}/api/v1/post/read_random_posts.php?o=${offset}&l=5`);
}

function readPostsByCategory(url, category, offset) {
  return axios.get(
    `${url}/api/v1/post/read_posts_by_category.php?c=${category}&o=${offset}`
  );
}

function searchPosts(url, keywords, offset) {
  return axios.get(
    `${url}/api/v1/post/search.php?s=${keywords}&o=${offset}`
  );
}

function getFavoritesPosts() {
  return AsyncStorage.getItem('favorites');
}

function setFavoritesPosts(item) {
  return AsyncStorage.setItem('favorites', item);
}

function getLastPostsType() {
  return AsyncStorage.getItem('lastPostsType');
}