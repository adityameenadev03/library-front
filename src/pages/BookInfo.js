import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { Rating } from "../components/ul/Rating";
import { Price } from "../components/ul/Price";
import { Book } from "../components/ul/Book";
import { Books } from "./Books";
import { useBooksContext } from '../Hooks/useBooksContext';
import useUpdateFavBooks from "../Hooks/useUpdateFavBooks";
import { useAuthContext } from "../Hooks/useAuthContext";
import useUpdateCart from "../Hooks/useUpdateCart";

export const BookInfo = () => {
  const { books, favBooks, dispatch, cartItems } = useBooksContext()
  const { user } = useAuthContext()
  // const token = JSON.parse(localStorage.getItem('user')).token
  const { fetchBooks } = useUpdateFavBooks()
  const { fetchCartItems } = useUpdateCart()
  const navigate = useNavigate()

  const { id } = useParams();
  const book = books.find(book => +book.id === +id);

  async function addToFavourite(favBook) {

    if (!user) {
      return navigate('/login')
    } else {
      let isDuplicate = favBooks?.find(book => book.id == favBook.id) ? true : false
      if (!isDuplicate) {
        dispatch({ type: 'SET_FAVBOOK', payload: favBook })
        const result = await fetchBooks()
      }
    }


  }


  useEffect(() => {
    const updateCart = async () => {
      const result1 = await fetchCartItems()
    }
    updateCart()
  }, [cartItems])


  function addItemToCart(book) {
    if (!user) {
      return navigate('/login')
    } else {
      const dupeItem = cartItems.find((item) => item.id === book.id);
      dispatch({ type: "ADD_TO_CART", payload: { dupeItem, book } })
    }
  }


  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to="/books" className="book__link">
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to="/books" className="book__link">
                <h2 className="book__selected--title--top">Books</h2>
              </Link>
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img className="book__selected--img" src={book.url} alt="" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">{book.title} <span className="purple">- (2019)</span></h2>
                <Rating rating={book.rating} key={book.id} />
                <div className="book__selected--price">
                  <Price
                    originalPrice={book.originalPrice}
                    salePrice={book.salePrice}
                  />
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                    {book.summary}
                  </p>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iure omnis asperiores eaque fugit eos harum tempora nihil deserunt, explicabo incidunt distinctio ea consequatur, amet odio rem obcaecati tempore, minima autem quam accusantium vitae nesciunt?
                  </p>
                </div>
                <div  >
                  <button className="btn" onClick={() => addItemToCart(book)}>
                    Add to Cart
                  </button>
                  <button className="btn btn--favourite" onClick={() => addToFavourite(book)}>
                    Add to Favourite
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="book__selected--title--top">Recommended Books</h2>
            </div>
            <div className="books">

              {books.filter(book => book.rating >= 4 && +book.id != +id).slice(0, 8).map(book => <Book key={book.id}
                id={book.id}
                title={book.title}
                url={book.url}
                salePrice={book.salePrice}
                originalPrice={book.originalPrice}
                rating={books.rating} />)}
              {/* <BestBooks id={id} /> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
