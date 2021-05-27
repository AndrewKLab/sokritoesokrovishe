import { postsConstants } from '../_constants';
import { postsService } from '../_services';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import {config} from '../_helpers';

export const postsActions = {
  readNewPosts,
  readMoreNewPosts,
  readRandomPosts,
  readMoreRandomPosts,
  readPostsByCategory,
  readPostsMoreByCategory,
  toggleFavorites,
  readFavorites,
  searchPosts,
  searchMorePosts,
  getLastPostsType,
  setLastPostsType
};

function readNewPosts(offset) {
  return (dispatch) => {
    dispatch(request(offset));
    return postsService
      .readNewPosts('https://sokrsokr.net', offset, config.postsLimits.sokrsokr)
      .then((sokrsokr) => {
        return postsService
          .readNewPosts('https://8doktorov.ru', offset, config.postsLimits.kkz)
          .then((kkz) => {
            return postsService
              .readNewPosts('https://proekt7d.ru', offset, config.postsLimits.semD)
              .then((proekt7d) => {
                let lp = sokrsokr.data.concat(kkz.data.concat(proekt7d.data));
                lp.sort((a, b) => moment(b.post_date) - moment(a.post_date));
                return postsService
                  .getFavoritesPosts()
                  .then((req) => JSON.parse(req))
                  .then((favorites) => {
                    dispatch(success(lp, favorites));
                  });
              });
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(offset) {
    return { type: postsConstants.READ_LAST_POSTS_REQUEST, offset };
  }
  function success(posts, favorites) {
    return { type: postsConstants.READ_LAST_POSTS_SUCCESS, posts, favorites };
  }
  function failure(error) {
    return { type: postsConstants.READ_LAST_POSTS_FAILURE, error };
  }
}

function readMoreNewPosts(offset) {
  return (dispatch) => {
    dispatch(request(offset));

    return postsService
      .readNewPosts('https://sokrsokr.net', offset.sokrsokr, config.postsLimits.sokrsokr)
      .then((sokrsokr) => {
        return postsService
          .readNewPosts('https://8doktorov.ru', offset.kkz, config.postsLimits.kkz)
          .then((kkz) => {
            return postsService
              .readNewPosts('https://proekt7d.ru', offset.semD, config.postsLimits.semD)
              .then((proekt7d) => {
                let lp = sokrsokr.data.concat(kkz.data.concat(proekt7d.data));
                lp.sort((a, b) => moment(b.post_date) - moment(a.post_date));
                return postsService
                  .getFavoritesPosts()
                  .then((req) => JSON.parse(req))
                  .then((favorites) => {
                    dispatch(success(lp, favorites));
                  });
              });
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(offset) {
    return { type: postsConstants.READ_LAST_POSTS_REQUEST, offset };
  }
  function success(posts, favorites) {
    return { type: postsConstants.READ_MORE_LAST_POSTS_SUCCESS, posts, favorites };
  }
  function failure(error) {
    return { type: postsConstants.READ_LAST_POSTS_FAILURE, error };
  }
}

function readRandomPosts(offset) {
  return (dispatch) => {
    dispatch(request(offset));
    return postsService
      .readRandomPosts('https://sokrsokr.net', offset)
      .then((sokrsokr) => {
        return postsService
          .readRandomPosts('https://8doktorov.ru', offset)
          .then((kkz) => {
            return postsService
              .readRandomPosts('https://proekt7d.ru', offset)
              .then((proekt7d) => {
                let lp = sokrsokr.data.concat(kkz.data.concat(proekt7d.data));
                lp.sort((a, b) => moment(b.post_date) - moment(a.post_date));
                return postsService
                  .getFavoritesPosts()
                  .then((req) => JSON.parse(req))
                  .then((favorites) => {
                    dispatch(success(lp, favorites));
                  });
              });
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(offset) {
    return { type: postsConstants.READ_RANDOM_POSTS_REQUEST, offset };
  }
  function success(posts, favorites) {
    return {
      type: postsConstants.READ_RANDOM_POSTS_SUCCESS,
      posts,
      favorites,
    };
  }
  function failure(error) {
    return { type: postsConstants.READ_RANDOM_POSTS_FAILURE, error };
  }


}

function readMoreRandomPosts(offset) {
  return (dispatch) => {
    dispatch(request(offset));

    return postsService
      .readRandomPosts('https://sokrsokr.net', offset)
      .then((sokrsokr) => {
        return postsService
          .readRandomPosts('https://8doktorov.ru', offset)
          .then((kkz) => {
            return postsService
              .readRandomPosts('https://proekt7d.ru', offset)
              .then((proekt7d) => {
                let lp = sokrsokr.data.concat(kkz.data.concat(proekt7d.data));
                lp.sort((a, b) => moment(b.post_date) - moment(a.post_date));
                return postsService
                  .getFavoritesPosts()
                  .then((req) => JSON.parse(req))
                  .then((favorites) => {
                    dispatch(success(lp, favorites));
                  });
              });
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };


  function request(offset) {
    return { type: postsConstants.READ_RANDOM_POSTS_REQUEST, offset };
  }
  function success(posts, favorites) {
    return { type: postsConstants.READ_MORE_RANDOM_POSTS_SUCCESS, posts, favorites };
  }
  function failure(error) {
    return { type: postsConstants.READ_RANDOM_POSTS_FAILURE, error };
  }
}

function readPostsByCategory(url, category, offset) {
  return (dispatch) => {
    // dispatch(request(category_name));
    return postsService
      .readPostsByCategory(url, category, offset)
      .then((response) => {
        return postsService
          .getFavoritesPosts()
          .then((req) => JSON.parse(req))
          .then((favorites) => {
            dispatch(success(response.data, favorites));
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: postsConstants.READ_ALL_POSTS_BY_CATEGORY_REQUEST };
  }
  function success(posts, favorites) {
    return {
      type: postsConstants.READ_ALL_POSTS_BY_CATEGORY_SUCCESS,
      posts,
      favorites,
    };
  }
  function failure(error) {
    return { type: postsConstants.READ_ALL_POSTS_BY_CATEGORY_FAILURE, error };
  }
}

function readPostsMoreByCategory(url, category, offset) {
  return (dispatch) => {
    // dispatch(request(category_name));
    return postsService
      .readPostsByCategory(url, category, offset)
      .then((response) => {
        return postsService
          .getFavoritesPosts()
          .then((req) => JSON.parse(req))
          .then((favorites) => {
            dispatch(success(response.data, favorites));
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: postsConstants.READ_ALL_POSTS_BY_CATEGORY_REQUEST };
  }
  function success(posts, favorites) {
    return {
      type: postsConstants.READ_MORE_POSTS_BY_CATEGORY_SUCCESS,
      posts,
      favorites,
    };
  }
  function failure(error) {
    return { type: postsConstants.READ_ALL_POSTS_BY_CATEGORY_FAILURE, error };
  }
}

function readFavorites() {
  return (dispatch) => {
    return postsService
      .getFavoritesPosts()
      .then((req) => JSON.parse(req))
      .then((json) => {
        if (json !== null && json.length !== 0) {
          dispatch(success(json));
        } else {
          dispatch(failure('Ваш список избранных записей пуст.'));
        }
      });
  };

  function success(posts) {
    return { type: postsConstants.GET_FAVORITES_POSTS_SUCCESS, posts };
  }

  function failure(error) {
    return { type: postsConstants.GET_FAVORITES_POSTS_FAILURE, error };
  }
}

function toggleFavorites(item, posts) {
  return (dispatch) => {
    return postsService
      .getFavoritesPosts()
      .then((req) => JSON.parse(req))
      .then((json) => {
        if (json !== null) {
          var val = false;
          for (var i = 0; i < json.length; i++) {
            if (json[i].ID === item.ID) {
              val = true;
            }
          }
          if (val) {
            const result = json.filter((post) => post.ID !== item.ID);
            postsService.setFavoritesPosts(JSON.stringify(result));
            console.log('Убранно из избранного');
          } else {
            postsService.setFavoritesPosts(
              JSON.stringify([...json, { ...item, favorite: true }])
            );
            console.log('Добавленно в избраное');
          }
        } else {
          postsService.setFavoritesPosts(JSON.stringify([{ ...item, favorite: true }]));
        }
        dispatch(success(item, posts));
      });
  };

  function success(item, value) {
    return { type: postsConstants.SET_FAVORITES_POST, item, value };
  }
}

function searchPosts(url, keywords, offset) {
  return (dispatch) => {
    dispatch(request(url, keywords, offset));
    return postsService
      .searchPosts(url, keywords, offset)
      .then((posts) => {
        return postsService
          .getFavoritesPosts()
          .then((req) => JSON.parse(req))
          .then((favorites) => {
            dispatch(success(posts.data, favorites));
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(url, keywords, offset) {
    return { type: postsConstants.SEARCH_POSTS_REQUEST, url, keywords, offset };
  }
  function success(posts, favorites) {
    return { type: postsConstants.SEARCH_POSTS_SUCCESS, posts, favorites };
  }
  function failure(error) {
    return { type: postsConstants.SEARCH_POSTS_FAILURE, error };
  }
}

function searchMorePosts(url, keywords, offset) {
  return (dispatch) => {
    dispatch(request(url, keywords, offset));
    return postsService
      .searchPosts(url, keywords, offset)
      .then((posts) => {
        return postsService
          .getFavoritesPosts()
          .then((req) => JSON.parse(req))
          .then((favorites) => {
            dispatch(success(posts.data, favorites));
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: postsConstants.SEARCH_POSTS_REQUEST };
  }
  function success(posts, favorites) {
    return { type: postsConstants.SEARCH_MORE_POSTS_SUCCESS, posts, favorites };
  }
  function failure(error) {
    return { type: postsConstants.SEARCH_POSTS_FAILURE, error };
  }
}

function getLastPostsType() {
  return (dispatch) => {
    return postsService.getLastPostsType().then((response) => {
      if (response !== null) {
        dispatch(success(response));
      } else {
        AsyncStorage.setItem('lastPostsType', 'last');
        dispatch(failure('last'));
      }
    });
  };

  function success(lastPostsType) {
    return { type: postsConstants.GET_LAST_POSTS_TYPE, lastPostsType };
  }
  function failure(lastPostsType) {
    return { type: postsConstants.GET_LAST_POSTS_TYPE, lastPostsType };
  }
}

function setLastPostsType(lastPostsType) {
  AsyncStorage.setItem('lastPostsType', lastPostsType);
  return { type: postsConstants.SET_LAST_POSTS_TYPE, lastPostsType };
}
