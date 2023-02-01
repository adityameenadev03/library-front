import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import LibraryLogo from "../assets/Library.svg";
import LibraryLogo from "../assets/Untitled (28).svg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";
// import { useAuthContext } from '../Context/AuthContext';
import { useLogout } from '../Hooks/useLogout'
import useUpdateFavBooks from "../Hooks/useUpdateFavBooks";
import { useBooksContext } from "../Hooks/useBooksContext";

export const Nav = ({ numberOfItems }) => {

  const {user } = useAuthContext()
  const {favBooks } = useBooksContext()
  const {logout} = useLogout()
const {fetchBooks} = useUpdateFavBooks()

useEffect(()=> {
  const result = fetchBooks()
},[favBooks])

  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  function handleLogout() {
    logout()
  }


  return (
    <nav>
      <div className="nav__container">
        <Link to="/">
          <img className="logo" src={LibraryLogo} alt="" />
        </Link>
        <ul className="nav__links">
          {user && <>
            <li className="nav__list">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__list">
            <Link to="/favorite" className="nav__link">
              Favorite
            </Link>
          </li>
          <li className="nav__list">
            <Link to="/books" className="nav__link nav__link--primary">
              Books
            </Link>
          </li>
          
          <button className="btn__menu" onClick={openMenu}>
            <FontAwesomeIcon icon="bars" />
          </button>
          <li className="nav__icon">
            <Link to="/cart" className="nav__link">
              <FontAwesomeIcon icon="shopping-cart" />
            </Link>
            {numberOfItems > 0 && (
              <span className="cart__length">{numberOfItems}</span>
            )}
          </li>
          <li className="nav__list">
            <button className="nav__link nav__link--primary" onClick={handleLogout}>
              Logout
            </button>
          </li>
         
          </>}
          {!user && <>
            <li className="nav__list">
            <Link to="/login" className="nav__link nav__link--primary">
              Login
            </Link>
          </li>
          <li className="nav__list">
            <Link to="/signup" className="nav__link nav__link--primary">
              SignUp
            </Link>
          </li>
          
          </>}
          
        </ul>

        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={closeMenu}>
            <FontAwesomeIcon icon="times" />
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/" className="menu__link" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/books" className="menu__link" onClick={closeMenu}>
                Books
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/cart" className="menu__link" onClick={closeMenu}>
                Cart
              </Link>
            </li>
          
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
