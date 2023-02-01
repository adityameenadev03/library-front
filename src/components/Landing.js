import React from 'react'
import UndrawBooks from "../assets/Undraw_Books.svg"
import {Link } from "react-router-dom"

export const Landing = () => {
  return (
<section id="landing">
    <header>
      <div className="header__container">
        <div className="header__description">
          <h1>Discover your next great read with BookKeeda.</h1>
          <h2>A world of <span className="purple"> books </span> at your fingertips </h2>
          <Link to="/books">
            <button className="btn">Browse books</button>
          </Link>
        </div>
        <figure className="header__img--wrapper">
          <img src={UndrawBooks} alt="" />
        </figure>
      </div>
    </header>
</section>
    )
}
