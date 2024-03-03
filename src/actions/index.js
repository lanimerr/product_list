import axios from 'axios';
import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from "./types";

const useProxy = function (route) {
  return `http://localhost:8000${route}`;
};

export const fetchData = (page = 1, category, price, searchQuery) => async (dispatch) => {
  try {
    const response = await axios.get(useProxy("/products"), {
      params: {
        page,
        category,
        price,
        query: searchQuery,
      },
    });

    dispatch({
      type: FETCH_DATA_SUCCESS,
      payload: {
        products: response.data.products,
        totalPages: response.data.pages,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    dispatch({
      type: FETCH_DATA_FAILURE,
      payload: error,
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(useProxy("/categories"));
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: response.data.categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      payload: error,
    });
  }
};