import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="bg-dark text-light">
  <footer className="container py-3 mt-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Home</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Features</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Pricing</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">FAQs</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">About</Link></li>
    </ul>
    <p className="text-center text-body-secondary">&copy; 2023 BuyNow, Inc</p>
  </footer>
</div>
  )
}

export default Footer