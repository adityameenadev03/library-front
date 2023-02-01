import React from 'react'
import { useState } from 'react'

import { Book } from "../components/ul/Book"
import { useBooksContext } from '../Hooks/useBooksContext';

export const Books = () => {
    const {books : intialBooks} = useBooksContext()
    const [books, setBooks] = useState(intialBooks)

    function searchBooks(event) {
        let name = event.target.value.trim()
        let inputType = event.nativeEvent.inputType
        if (name === "") {
            setBooks(intialBooks)
        }
        else if (inputType == "insertText") {
            setBooks(books.filter(book => book.title.toLowerCase().includes(name.toLowerCase())))
        }
        else if (inputType == "deleteContentBackward") {
            setBooks(intialBooks.filter(book => book.title.toLowerCase().includes(name.toLowerCase())))
        }

    }

    function filterBooks(filter) {
        if (filter === "LOW_TO_HIGH") {
            setBooks(books.slice().sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)))
        }
        else if (filter === "HIGH_TO_LOW") {
            setBooks(books.slice().sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)))

        }
        else if (filter === "RATING") {
            setBooks(books.slice().sort((a, b) => b.rating - a.rating))

        }
    }
    return (
        <div id="books__body">
            <main id="books__main">
                <section>
                    <div className="books__container">
                        <div className="row">
                            <div className="books__header">
                                <h2 className="section__title books__header--title">
                                    All <span className="purple">Books</span>
                                </h2>

                                <div class="search-box">
                                <input type="text" id="search" name="search" onChange={(event) => searchBooks(event)} placeholder="Search For a Book" />    
                                </div>
                                
                                <select id="filter" defaultValue="DEFAULT" onChange={(event) => filterBooks(event.target.value)}>
                                    <option value="DEFAULT" disabled >Sort</option>
                                    <option value="LOW_TO_HIGH">Price, Low to High</option>
                                    <option value="HIGH_TO_LOW">Price, High to Low</option>
                                    <option value="RATING">Rating</option>
                                </select>
                            </div>
                            <div className="books">
                                {books.map(book => <Book
                                    key={book.id}
                                    id={book.id}
                                    title={book.title}
                                    url={book.url}
                                    salePrice={book.salePrice}
                                    originalPrice={book.originalPrice}
                                    rating={books.rating}
                                    summary={books.summary} />)}
                            </div>

                        </div>
                    </div>
                </section>
            </main>

        </div>
    )

}
