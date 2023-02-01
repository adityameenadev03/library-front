import React, { useEffect, useState } from 'react'
import { Book } from '../components/ul/Book'
import { useBooksContext } from '../Hooks/useBooksContext';
import useUpdateFavBooks from "../Hooks/useUpdateFavBooks"
import { useAuthContext } from "../Hooks/useAuthContext";


export const Favourite = ({ removefav }) => {
  const { user } = useAuthContext()

    const { favBooks, dispatch } = useBooksContext()
    // const token = JSON.parse(localStorage.getItem('user')).token
    const { fetchBooks } = useUpdateFavBooks()


    return (
        <section id="favorite">
            <div className="container">
                <div className="row">
                    <h2 className="section__title">
                        My Favourite <span className="purple">Books</span>
                    </h2>
                    <div className="books">
                        {/* {!isLoading && <> */}
                        {favBooks && favBooks.map(book => {
                            return <Book
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                url={book.url}
                                salePrice={book.salePrice}
                                originalPrice={book.originalPrice}
                                rating={book.rating}
                                removefav={removefav}
                            />
                        })}
                        {/* </>} */}

                    </div>
                </div>
            </div>
        </section>
    )
}
