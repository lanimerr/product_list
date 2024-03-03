import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from "../actions/types";

const initialState = {
  products: [],
  totalPages: 1,
  error: null,
  categories: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        error: null,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        error: null,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default dataReducer;