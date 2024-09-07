import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import { AddStaf, PrdReducer, FetchAll } from "./redux/reducer/productReducer";
import { addCustomer, newGrpReducer } from "./redux/reducer/AllReducer";

const reducers = combineReducers({
  products: PrdReducer,
  addStaff: AddStaf,
  allGroup: FetchAll,
  Addgroup : newGrpReducer,
  AddCustomer: addCustomer,
  
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
