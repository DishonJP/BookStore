import * as actionTypes from '../actions/actionTypes'

const initialState = {
    books: null,
    cartCount: 0
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BOOKS:
            let allBooks = []
            for (let i = 0; i < action.payload.length; i++) {
                allBooks.push({
                    ...action.payload[i],
                    toCart: false,
                    id: i,
                    count: 1,
                    wishlist: false,
                    order: false
                })
            }
            return {
                ...state,
                books: allBooks,
            }
        case actionTypes.ADD_TO_CART:
            const updatedBook = {
                ...action.payload.book,
                toCart: true
            }
            state.books[action.payload.book.id] = updatedBook
            const count = state.books.filter(el => el.toCart === true)
            return {
                ...state,
                books: [
                    ...state.books
                ],
                cartCount: count.length
            }
        case actionTypes.REMOVE_FROM_CART:
            const updatedBok = {
                ...action.payload,
                toCart: false
            }
            state.books[action.payload.id] = updatedBok
            const cout = state.books.filter(el => el.toCart === true)
            return {
                ...state,
                books: [
                    ...state.books
                ],
                cartCount: cout.length
            }
        case actionTypes.INCREMENT_COUNT:
            const upBook = {
                ...action.payload.book,
                count: action.payload.book.count + 1
            }
            state.books[action.payload.book.id] = upBook
            return {
                ...state,
                books: [
                    ...state.books
                ]
            }
        case actionTypes.DECREMENT_COUNT:
            const upDaBook = {
                ...action.payload.book,
                count: action.payload.book.count - 1
            }
            state.books[action.payload.book.id] = upDaBook
            return {
                ...state,
                books: [
                    ...state.books
                ]
            }

        case actionTypes.WISHLIST:
            const upWishlist = {
                ...action.payload,
                wishlist: !action.payload.wishlist
            }
            state.books[action.payload.id] = upWishlist
            return {
                ...state,
                books: [...state.books]
            }
        case actionTypes.ORDER_BOOK:
            let orderedBooks = [];
            state.books.forEach(book => {
                let counter = 0;
                action.payload.forEach(element => {
                    if (element.id === book.id) {
                        orderedBooks.push({ ...element, order: true, date: new Date().toLocaleDateString() });
                        counter++;
                    }
                });
                if (counter === 0) {
                    orderedBooks.push({ ...book })
                }
            });

            console.warn(orderedBooks, "books");
            return {
                ...state,
                books: [...orderedBooks]
            };
        default:
            return state;
    }
}

export default bookReducer;