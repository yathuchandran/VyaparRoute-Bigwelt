import {
  ADD_STAFF_FAILURE,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCSESS,
  ALL_CUSTOMER_FAILURE,
  ALL_CUSTOMER_REQUEST,
  ALL_CUSTOMER_SUCCSESS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCSESS,
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCSESS,
  STAFF_GROUP_FAILURE,
  STAFF_GROUP_REQUEST,
  STAFF_GROUP_SUCCSESS,
} from "../constant/productConstant";

// const initialState = {
//   loading: false,
//   product: [],
//   error: null,
// };

// Reducer function
export const PrdReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state, // Spread the current state
        loading: true, // Set loading to true
      };

    case CREATE_PRODUCT_SUCCSESS: // Corrected the spelling from SUCCSESS to SUCCESS
      return {
        ...state, // Spread the current state
        loading: false, // Set loading to false
        product: action.payload, // Update the product with the payload
      };

    case CREATE_PRODUCT_FAILURE:
      return {
        ...state, // Spread the current state
        loading: false, // Set loading to false
        error: action.payload, // Update the error with the payload
      };

    default:
      return state; // Return the current state if no action matches
  }
};

export const AddStaf = (state = {}, action) => {
  switch (action.type) {
    case ADD_STAFF_REQUEST:
    case STAFF_GROUP_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case ADD_STAFF_SUCCSESS:
    case STAFF_GROUP_SUCCSESS:
      return {
        loading: false,
        ...state,
        isAdded: action.payload,
      };

    case ADD_STAFF_FAILURE:
    case STAFF_GROUP_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const FetchAll = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
    case ALL_CUSTOMER_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case FETCH_SUCCSESS:
      return {
        loading: false,
        ...state,
        Allgroup: action.payload,
      };

    case ALL_CUSTOMER_SUCCSESS:
      return {
        loading: false,
        ...state,
        allCustomers: action.payload,
      };

    case FETCH_FAILURE:
    case ALL_CUSTOMER_FAILURE:
      return {
        loading: false,
        error: action.payload,
        ...state,
      };
    default:
      return state;
  }
};
