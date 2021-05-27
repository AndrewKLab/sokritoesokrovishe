import React, { useState } from 'react';
import { categoriesConstants } from '../_constants';

const initialState = {
  categories_loading: false,
  categories_error: '',
  categories: [],
};

export function categories(state = initialState, action) {
  switch (action.type) {
    case categoriesConstants.READ_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        categories_error: '',
        categories_loading: true,
      };
    case categoriesConstants.READ_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories_loading: false,
        categories_error: '',
        categories: action.categories,
      };
    case categoriesConstants.READ_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        categories_loading: false,
        categories_error: action.error,
      };
    default:
      return state;
  }
}
