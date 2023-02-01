import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Book } from '../components/ul/Book'

const SearchBooks = () => {
    const [boo,setBoo]= useState(null)

    const handleSearch = (event) => {
        console.log(event)
        const searchTerm = event.target.value

        const fetchGoogleBooks= async () => {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}+intitle:${searchTerm}&key=AIzaSyC0W194CXEjLOpNB2-haFmX8QdMlCFJBXg`)
            const data = await res.json()
            setBoo(data.items[1])
            console.log(data.items)
        }
        fetchGoogleBooks()
    }
    useEffect(()=> {
        const fetchGoogleBooks= async () => {
            const res = await fetch('https://www.googleapis.com/books/v1/volumes?q=atomic+habit+intitle:atomic&key=AIzaSyC0W194CXEjLOpNB2-haFmX8QdMlCFJBXg')
            const data = await res.json()
            setBoo(data.items[2])
            console.log(data.items)
        }
        fetchGoogleBooks()
    },[])
    return (
        <div className='searchPage'>
            <div class="search-box">
                <input type="text" id="search" onChange={(event) => handleSearch(event)} name="search" placeholder="Search For a Book" />
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img className="book__selected--img" src={boo?.volumeInfo?.imageLinks?.smallThumbnail} alt="" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">{boo?.volumeInfo?.title}<span className="purple">- (2019)</span></h2>
                <h4>Rating : {boo?.volumeInfo?.averageRating}</h4>
                <div className="book__selected--price">
                
                    <h4>Price : {boo?.saleInfo?.retailPrice?.amount}  </h4>
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                  {boo?.volumeInfo?.description?.slice(0,500)}
                  </p>
                  <p className="book__summary--para">
                  </p>
                </div>
                <div  >
                  <button className="btn">
                    Add to Cart
                  </button>
                  <button className="btn btn--favourite">
                    Add to Favourite
                  </button>
                </div>

              </div>
            </div>
        </div>
    )
}

export default SearchBooks