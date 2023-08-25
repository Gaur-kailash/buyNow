import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("userId");
    console.log("logging out");
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ShopNow
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
          <Link className="nav-link" to="/">Link</Link>
        </li> */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </Link>
              <ul className="dropdown-menu p-0" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item text-light bg-dark" to="/category/smartphones">
                    Smartphones
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-light bg-dark" to="/category/laptops">
                    Laptops
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-light bg-dark" to="/category/sunglasses">
                    Sun Glasses
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-light bg-dark" to="/category/groceries">
                    Groceries
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-light bg-dark" to="/category/skincare">
                    Skin Care
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          {!localStorage.getItem("userId") ? (
            <div className="d-flex">
              <Link to="/login" className="btn btn-success mx-2">
                LogIn
              </Link>
              <Link to="/signup" className="btn btn-outline-danger mx-2">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="d-flex">
              <Link to="/mycart" className="btn btn-success mx-2">
                My Cart
              </Link>
              {/* <button onClick={handleLogout} className="btn btn-outline-danger mx-2">Log out</button> */}
              <div className="dropdown">
              <div className="dropdown-toggle"  role="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img
                  src="https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789-300x300.png"
                  alt="Profile"
                  width="40"
                  height="40"
                />
                <span className="ms-2 text-light">▼</span>
                </div>
                <ul
                  className="dropdown-menu dropdown-menu-end bg-dark text-light"
                  aria-labelledby="profileIcon"
                >
                  <li>
                    <Link className="dropdown-item text-light bg-dark" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-light bg-dark" to="/">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                  <button onClick={handleLogout} className="btn btn-outline-danger mx-2">Log out</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
