import React from 'react'
import { Book } from "./ul/Book"
import { useBooksContext } from '../Hooks/useBooksContext';

export const Discounted = () => {
    const {books} = useBooksContext()
    return (
        <section id="recent">
            <div className="container">
                <div className="row">
                    <h2 className="section__title">
                        Discounted <span className="purple">Books</span>
                    </h2>
                    <div className="books">
                        {books.filter(book => book.salePrice != null).slice(0,8).map(book => <Book
                            key={book.id}
                            title={book.title}
                            url={book.url}
                            salePrice={book.salePrice}
                            originalPrice={book.originalPrice}
                            rating={books.rating} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}
