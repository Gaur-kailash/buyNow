import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'

function Navbar() {
  let navigate = useNavigate();
  function handleLogout(){
    localStorage.removeItem("userId");
    console.log("logging out");
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">ShopNow</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">Link</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/category/smartphones">Smartphones</Link></li>
            <li><Link className="dropdown-item" to="/category/laptops">Laptops</Link></li>
            <li><Link className="dropdown-item" to="/category/sunglasses">Sun Glasses</Link></li>
            <li><Link className="dropdown-item" to="/category/groceries">Groceries</Link></li>
            <li><Link className="dropdown-item" to="/category/skincare">Skin Care</Link></li>
          </ul>
        </li>
      </ul>
      {!localStorage.getItem("userId")?<div className="d-flex">
        <Link to="/login" className="btn btn-success mx-2">LogIn</Link>
        <Link to="/signup" className="btn btn-outline-danger mx-2">Sign Up</Link>
      </div>:<div className="d-flex">
        <Link to="/" className="btn btn-success mx-2">My Cart</Link>
        <button onClick={handleLogout} className="btn btn-outline-danger mx-2">Log out</button>
      </div>}
    </div>
  </div>
</nav>
  )
}

export default Navbar