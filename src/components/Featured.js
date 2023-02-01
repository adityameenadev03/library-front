import React from 'react'
import { Book } from './ul/Book'
import { useBooksContext } from '../Hooks/useBooksContext';

export const Featured = () => {
    const {books} = useBooksContext()


    return (
        <section id="features">
            <div className="container">
                <div className="row">
                    <h2 className="section__title">
                        Featured <span className="purple">Books</span>
                    </h2>
                    <div className="books">
                        {books.filter(book => book.rating === 5).slice(0, 4).map(book => {
                           return <Book
                                key={book.id}
                                title={book.title}
                                url={book.url}
                                salePrice={book.salePrice}
                                originalPrice={book.originalPrice}
                                rating={books.rating}

                            />
                        })}

                        
                    </div>
                </div>
            </div>
        </section>
    )
}
