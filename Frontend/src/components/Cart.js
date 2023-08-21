import React, { useEffect, useState } from "react";

function Cart() {
  let [cartData, setData] = useState([]);
  let [flag, setFlag] = useState(false);
  const [noOfItem, setItem] = useState({});
  const initialQuantityState = {};

  async function myCart() {
    let response = await fetch("http://localhost:5000/cart");
    response = await response.json();
    setData(response);
    if (response.length > 0) {
      //   Initialize the quantity state for each product
      cartData.map((product) => {
        initialQuantityState[product.id] = product.itemCount;
      });
      setItem(initialQuantityState);
      setFlag(true);
    } else {
      setFlag(false);
    }
  }
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
  function removeFromCart(productId) {
    fetch("http://localhost:5000/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId }),
    })
      .then(myCart())
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (cartData.length > 0) {
      const initialQuantityState = {};
      cartData.forEach((product) => {
        initialQuantityState[product.id] = product.itemCount;
      });
      setItem(initialQuantityState);
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [cartData]);
  useEffect(() => {
    myCart();
  }, []);
  return (
    <>
      <div className="container">
        {flag ? (
          <div className="d-flex flex-wrap justify-content-center ">
            {cartData.map((e) => (
              <div
                key={e.id}
                className="card m-3 bg-dark text-light "
                style={{ width: "20rem" }}
              >
                <img
                  src={e.productImage}
                  className="card-img-top"
                  alt="..."
                  style={{ width: "100%", height: "15rem", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title ">{e.productTitle}</h5>
                  <p className="card-text">
                    <b>Price:</b>
                    {e.productPrice}
                  </p>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <div className="d-flex align-items-baseline">
                      <button
                        onClick={() => decreaseItem(e.id)}
                        className="btn btn-primary"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        name=""
                        onChange={(event) => itemCount(e.id, event)}
                        className="no-spinners text-center"
                        value={noOfItem[e.id] || e.itemCount}
                        style={{ width: "15%" }}
                      />
                      <button
                        onClick={() => increaseItem(e.id)}
                        className="btn btn-primary"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(e.id);
                      }}
                      className="btn btn-danger"
                      style={{ width: "60%" }}
                    >
                      Cancel
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
      <div className="bg-dark py-4">
        <div className="container">
        <h3 className="text-start text-light border-bottom">Price Preview </h3>
          {flag ? (
            cartData.map((element) => (
              <div className="d-flex justify-content-between text-light">
                <div>
                  <b>
                    {element.productTitle} * {noOfItem[element.id]}
                  </b>
                </div>
                <div>Rs {element.productPrice * noOfItem[element.id]} </div>
              </div>
            ))
          ) : (
            <div>No Products</div>
          )}
          <div className="d-flex justify-content-between text-light border-top border-bottom my-1">
            <div>
              <h4>Sub Total</h4>
            </div>
            <div>
            <h4>Rs {" "}
              {cartData.reduce((total, cartItem) => {
                const itemTotal =
                  parseInt(cartItem.productPrice) *
                  parseInt(noOfItem[cartItem.id]);
                return total + itemTotal;
              }, 0)}
              </h4>
            </div>
          </div>
          <div className="d-flex justify-content-end text-light py-1"><button className="btn btn-success">Place Order</button></div>
        </div>
      </div>
    </>
  );
}

export default Cart;
