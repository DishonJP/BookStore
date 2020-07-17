import * as actionTypes from './actionTypes'
import Axios from 'axios';
import Config from 'react-native-config'

export const getBooks=()=>{
    return async dispatch=>{
        try {
       const response= await Axios.get("http://192.168.43.133:3000/books");
       response.status===200?
            dispatch(storeBooks(response.data)):dispatch()
        } catch (error) {
            console.warn(error);
        }
    }
}

const storeBooks=(data)=>{
    return{
        type:actionTypes.GET_BOOKS,
        payload:data
    }
}

export const addToCart=(book,index)=>{
    return{
        type:actionTypes.ADD_TO_CART,
        payload:{book,index}
    }
}

export const removeFromCart=(book)=>{
    return{
        type:actionTypes.REMOVE_FROM_CART,
        payload:book
    }
}

export const increamentCount=(book,count)=>{
    return{
        type:actionTypes.INCREMENT_COUNT,
        payload:{book,count}
    }
}

export const decrementCount=(book,count)=>{
    return{
        type:actionTypes.DECREMENT_COUNT,
        payload:{book,count}
    }
}

export const wishlist=(book)=>{
    return{
        type:actionTypes.WISHLIST,
        payload:book
    }
}

export const orderBook=(books)=>{
    return{
        type:actionTypes.ORDER_BOOK,
        payload:books
    }
}