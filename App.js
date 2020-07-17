import React from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import HomeScreen from './src/screens/HomeScreen';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import bookReducer from './src/store/reducer/bookReducer'
import thunk from 'redux-thunk'
import BookScreen from './src/screens/BookScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import SearchScreen from './src/screens/SearchScreen';
import OrderSummaryScreen from './src/screens/OrderSummaryScreen';

const store=createStore(bookReducer,compose(applyMiddleware(thunk)))

const navigation=createDrawerNavigator({
  BookStore:createStackNavigator({
    Home:HomeScreen,
    Book:BookScreen,
    Cart:CartScreen,
    Checkout:CheckoutScreen,
    Wishlist:WishlistScreen,
    Search:SearchScreen,
    OrderSummary:OrderSummaryScreen
  }),
  Cart:CartScreen,
  Wishlist:WishlistScreen,
  OrderSummary:OrderSummaryScreen
})

const App = createAppContainer(navigation);
export default ()=>{
  return(
    <Provider store={store}>
    <App/>
    </Provider>
  )
}
