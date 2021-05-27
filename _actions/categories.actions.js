import { categoriesConstants } from '../_constants';
import { categoriesService } from '../_services';

export const categoriesActions = {
  readAllCategories,
};

function readAllCategories(url) {
  return (dispatch) => {
    dispatch(request());

    return categoriesService
      .readAllCategories(url)
      .then((response) => {
        dispatch(success(response.data));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: categoriesConstants.READ_ALL_CATEGORIES_REQUEST };
  }
  function success(categories) {
    return {
      type: categoriesConstants.READ_ALL_CATEGORIES_SUCCESS,
      categories,
    };
  }
  function failure(error) {
    return { type: categoriesConstants.READ_ALL_CATEGORIES_FAILURE, error };
  }
}
