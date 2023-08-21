import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";

function Home() {
  const [products, setProducts] = useState([]);
  const [flag, setFlag] = useState(false);
  const [skip, setSkip] = useState(0);
  const [noOfItem, setItem] = useState({});
  const initialQuantityState = {};

  const handleDummy = async () => {
    try{const fetchedProducts = await fetch("https://dummyjson.com/products?limit=9");
    const data = await fetchedProducts.json();
    console.log(data);
    setProducts(data.products);

    // Initialize the quantity state for each product
    data.products.forEach((product) => {
      initialQuantityState[product.id] = 1;
    });
    setItem(initialQuantityState);

    setFlag(true);
    setTimeout(()=>
      console.log(noOfItem),2000)
  }
  catch(e){
    console.log(e);
  }
  }

  const handlePrevious = async () => {
    if (skip > 0) {
      setSkip(skip - 9);
      const fetchedProducts = await fetch(`https://dummyjson.com/products?limit=9&${skip + 9}`);
      const data = await fetchedProducts.json();
      console.log(data);
      setProducts(data.products);
      setFlag(true);
      console.log(skip);
      const initialQuantityState = {};
      data.products.forEach((product) => {
        initialQuantityState[product.id] = 1;
      });
      setItem(initialQuantityState);
    }
  };

  const handleNext = async () => {
    if (skip <= 90) {
      setSkip(skip + 9);
      const fetchedProducts = await fetch(`https://dummyjson.com/products?limit=9&skip=${skip+9}`);
      const data = await fetchedProducts.json();
      console.log(data);
      setProducts(data.products);
      console.log(skip);
      data.products.forEach((product) => {
        initialQuantityState[product.id] = 1;
      });
      setItem(initialQuantityState);
      setFlag(true);
      setTimeout(()=>console.log(noOfItem),2000);
    }
  };

  function itemCount(productId, e) {
    setItem((prevItemState) => ({
      ...prevItemState,
      [productId]: parseInt(e.target.value),
    }));

  }

  function decreaseItem(productId) {
    if (noOfItem[productId] > 1) {
      setItem((prevItemState) => ({
        ...prevItemState,
        [productId]: prevItemState[productId] - 1,
      }));
    }
  }

  function increaseItem(productId) {
    if (noOfItem[productId] < 10) {
      setItem((prevItemState) => ({
        ...prevItemState,
        [productId]: prevItemState[productId] + 1,
      }));
    }
  }

  function addToCart(product){
    if(!localStorage.getItem("userId")){
      alert("Do Log in first")
      return
    }
    let userID = localStorage.getItem("userId");
    let id = product.id;
    let itemCount = noOfItem[product.id];
    let productTitle = product.title;
    let productPrice = product.price;
    let productImage = product.images[0];

    fetch("http://localhost:5000/cart",{
      method:'POST',
      headers:{
        'Content-Type': "application/json"
      },
      body: JSON.stringify({userID,id,itemCount,productTitle,productImage,productPrice})
    }).then(console.info("Data added to cart")).catch((err)=>{console.warn(err)})
  }

  useEffect(() => {
    handleDummy();
  }, []);

  return (
    <>
      <div className="bg-secondary">
        {flag ? <Carousel productsArray={products} /> : ""}
        <div className="container">
          {flag ? (
            <div className="d-flex flex-wrap justify-content-center ">
              {products.map((e) => (
                <div
                  key={e.id}
                  className="card m-3 bg-dark text-light "
                  style={{ width: "20rem" }}
                >
                  <img
                    src={e.images[0]}
                    className="card-img-top"
                    alt="..."
                    style={{ width: "100%", height: "15rem", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title ">
                      {e.title}
                    </h5>
                    <p className="card-text">
                      <b>Price:</b>
                      {e.price}
                    </p>
                    <p className="card-text">{e.description}</p>
                    <div className="d-flex justify-content-between align-items-baseline">
                      <div className="d-flex align-items-baseline">
                        <button onClick={() => decreaseItem(e.id)} className="btn btn-primary">
                          -
                        </button>
                        <input
                          type="number"
                          name=""
                          onChange={(event) => itemCount(e.id, event)}
                          className="no-spinners text-center"
                          value={noOfItem[e.id]||1}
                          style={{ width: "15%" }}
                        />
                        <button onClick={() => increaseItem(e.id)} className="btn btn-primary">
                          +
                        </button>
                      </div>
                      <button onClick={()=>{addToCart(e)}} className="btn btn-success" style={{ width: "60%" }}>
                        Add To card
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No Products</div>
          )}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={skip === 0} onClick={handlePrevious} className="btn btn-danger">Previous</button>
          <button disabled={skip === 90} onClick={handleNext} className="btn btn-danger">Next</button>
        </div>
      </div>
      {/* Footer */}
      <Footer/>
    </>
  );
}

export default Home;
