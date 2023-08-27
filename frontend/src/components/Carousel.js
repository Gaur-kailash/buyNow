import React from 'react'

function Carousel(props) {
  return (
    <>
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900×700/?iphone" className="d-block w-100 custom-img-height" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className='text-dark'>IPhone 14</h5>
        <p className='text-dark'>{props.productsArray[2].description}</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?sunglasses" className="d-block w-100 custom-img-height" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className='text-dark'>Sun Glasses </h5>
        <p className='text-dark'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis, quae! Commodi, eligendi. Delectus tempora sed magni? Ea, voluptas?</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?macbook" className="d-block w-100 custom-img-height" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5 className='text-dark'>MacBook Pro</h5>
        <p className='text-dark'>MacBook Pro 2021 with mini-LED display may launch between September, November</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </>
  )
}

export default Carousel