import axios from 'axios';

export const categoriesService = {
  readAllCategories,
};

function readAllCategories(url) {
  return axios.get(`${url}/api/v1/category/read.php`)
}
