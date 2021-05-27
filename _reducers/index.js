import { combineReducers } from 'redux';

import { style } from './styles.reducer';
import { posts } from './posts.reducer';
import { categories } from './categories.reducer';

const rootReducer = combineReducers({
  style,
  posts,
  categories
});

export default rootReducer;