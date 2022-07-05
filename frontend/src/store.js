import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from './reducers/productReducer.js';


const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
});

let initalState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;