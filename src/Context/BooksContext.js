import { createContext, useEffect, useReducer } from 'react'
import { useAuthContext } from '../Hooks/useAuthContext'

export const BooksContext = createContext()

export const BooksReducer = (state, action) => {
  const { books, favBooks, cartItems } = state

  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload }
    case 'SET_FAVBOOK':
      return { ...state, favBooks: [...favBooks, action.payload] }
      case 'SET_FAVBOOKS':
        return { ...state, favBooks: action.payload }
    case 'REMOVE_BOOK':
      return { ...state, favBooks: favBooks.filter(book => book.id != action.payload) }
      case 'SET_CART':
        return { ...state, cartItems: action.payload }
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...(action.payload.dupeItem ? [...cartItems.map(item => item.id === action.payload.dupeItem.id ? { ...item, quantity: item.quantity + 1 } : item)] : [...cartItems, { ...action.payload.book, quantity: 1 }])] }
    case "UPDATE_CART_ITEM":
      return {
        ...state, cartItems: [...cartItems.map((oldItem) => {
          if (oldItem.id === action.payload.item.id) {
            return {
              ...oldItem,
              quantity: action.payload.newQuantity,
            };
          } else {
            return oldItem;
          }
        })]
      }

    case 'REMOVE_CART_ITEM':
      return { ...state, cartItems: [...cartItems.filter(cartItem => cartItem.id !== action.payload.id)] }
    default:
      return state
  }
}

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BooksReducer, {
    books: [],
    favBooks: [],
    cartItems: []
  })




  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('/api/books')
      const books = await res.json()

      if (books) {
        dispatch({ type: 'SET_BOOKS', payload: books })
      }

    }
    fetchBooks()
  }, [])

  return (
    <BooksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BooksContext.Provider>
  )
}