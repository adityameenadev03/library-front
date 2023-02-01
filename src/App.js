import { Landing } from "./components/Landing";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home"
import { books } from "./data"
import { Books } from "./pages/Books";
import { BookInfo } from "./pages/BookInfo"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Cart } from "./components/Cart";
import { useEffect, useState } from "react";
import { Favourite } from "./pages/Favourite";
import Login from './pages/Login';
import Signup from "./pages/Signup";

import { useAuthContext } from './Hooks/useAuthContext';
import { useBooksContext } from './Hooks/useBooksContext';
import useUpdateFavBooks from "./Hooks/useUpdateFavBooks";
import SearchBooks from "./pages/SearchBooks";
function App() {
  const { user } = useAuthContext()
  const { fetchBooks } = useUpdateFavBooks()
  const { favBooks, dispatch, cartItems } = useBooksContext()
  let token
  if (user) {
    token = JSON.parse(localStorage.getItem('user')).token
  }


  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const res = await fetch('/api/user/getCartItems', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
          },
        })
        const cart = await res.json()
        if (cart) {
          dispatch({ type: 'SET_CART', payload: cart.cartItems })
        }

      }
      fetchCart()
    }

  }, [user])


  useEffect(() => {
    if (user) {
      const fetchFavBooks = async () => {
        const res = await fetch('/api/user/favBooks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
          },
        })
        const data = await res.json()
        if (data.favoriteBooks) {
          dispatch({ type: 'SET_FAVBOOKS', payload: data.favoriteBooks })
        }
      }
      fetchFavBooks()
    }

  }, [user])

  function numberOfItems() {
    let counter = 0;
    cartItems.forEach((item) => {
      counter += +item.quantity;
    });
    return counter;
  }
  return (
    <Router>
      <div className="App">

        <Nav numberOfItems={numberOfItems()} />
        <Routes>
        <Route
            path="/searchBooks"
            element={<SearchBooks />}
          />
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to='/' /> : <Signup />}
          />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookInfo
          />} />
          <Route path="/cart" element={<Cart
            numberOfItems={numberOfItems()}
          />} />
          {user && <Route path="/favorite"
            element={<Favourite
            />} />}

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
