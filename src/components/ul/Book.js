import React, { useEffect } from 'react'
import { Price } from './Price'
import { Rating } from './Rating'
import { Link } from 'react-router-dom'

import {useBooksContext} from '../../Hooks/useBooksContext'
import useUpdateFavBooks from "../../Hooks/useUpdateFavBooks"
import { useAuthContext } from '../../Hooks/useAuthContext';

export const Book = ({ title, url, originalPrice, salePrice, rating, id }) => {
  const {favBooks,dispatch} = useBooksContext()
  const { user } = useAuthContext()
  const { fetchBooks } = useUpdateFavBooks()


    function removefav(removeId) {
        dispatch({ type: 'REMOVE_BOOK', payload: removeId })
             fetchBooks()
    }


    return (
        <div className="book">
            <Link to={`/books/${id}`}>
            <figure className="book__img--wrapper">
                <img className="book__img" src={url} alt="" />
            </figure>
            </Link>
            <div className="book__title">
                <Link to={`/books/${id}`} className="book__title--link">
                {title} 
                </Link>
            </div>
            <Rating rating={rating}/>
            <Price originalPrice={originalPrice} salePrice={salePrice} />
            <a className='remove--fav' onClick={()=>removefav(id)}> Remove</a>
        </div>
    )
}
