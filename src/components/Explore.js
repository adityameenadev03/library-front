import React from 'react'
import {Link } from "react-router-dom"

export const Explore = () => {
    return (
        <section id="explore">
            <div className="container">
                <div className="row row__column">
                    <h2>Explore more <span class="purple">Books</span></h2>
                    <Link to="/books">
                        <button className="btn">Browse books</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
