import React from 'react'
// import Logo from "../assets/Library.svg"
import {Link } from "react-router-dom"
import Logo from "../assets/Untitled (26).svg";


export const Footer = () => {
  return (
    <footer>
    <div className="container">
      <div className="row row__column">
        <Link to="#">
          <figure className="footer__logo">
            <img src={Logo} className="footer__logo--img" alt="" />
          </figure>
        </Link>
        <div className="footer__list">
          <Link to="/" className="footer__link">Home</Link>
          <Link to='/' className="footer__link no-cursor">About</Link>
          <Link to="#books" className="footer__link">Books</Link>
          <Link to='/cart' className="footer__link no-cursor">cart</Link>
        </div>
        <div className="footer__copyright">Copyright &copy; 2021 Library</div>
      </div>
    </div>
  </footer>
    )
}
