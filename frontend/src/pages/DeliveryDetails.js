import React, { useEffect, useState } from "react";

function DeliveryDetails() {
  let id = localStorage.getItem("userId");
  let [flag, setflag] = useState(true);
  let [getDetails, setDetails] = useState({});
  let [inputs, setInputs] = useState({
    Address1: "",
    Address2: "",
    City: "",
    FirstName: "",
    Gender: "",
    LastName: "",
    Mobile: "",
    Pincode: "",
    State: "",
    Telephone: "",
    id: id,
  });
  let [err, setErr] = useState(false);

  async function settingInputs(e) {
    let name = e.target.name;
    let value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  }

  async function onLoad() {
    let id = localStorage.getItem("userId");
    let response = await fetch("http://localhost:5000/getProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    response = await response.json();
    if (response.empty) {
      setflag(false);
      console.log(response);
    } else {
      setDetails(response);
      setflag(true);
      console.log(response);
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) =>
        (res = res.json()).then((res) => {
          console.log("Response", res);
          if (res.errors) {
            setErr(true);
          } else {
            onLoad();
          }
        })
      )
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      {flag ? (
        <div className="container mt-3 rounded bg-dark text-light py-4 text-start">
          <h3>Delivery Address</h3>
          <input
            type="radio"
            name="adress"
            id="add1"
            value="Add1"
            className="form-check-input"
          />
          <label htmlFor="add1" className="form-label">
            &nbsp;
            {getDetails.FirstName}
            {<br />}
            {getDetails.Address1}
            {<br />}
            {getDetails.Mobile}
          </label>
          <br />
          <input
            type="radio"
            name="adress"
            value="Add2"
            id="add2"
            className="form-check-input"
          />
          <label htmlFor="add2" className="form-label">
            &nbsp;
            {getDetails.FirstName}
            {<br />}
            {getDetails.Address2}
            {<br />}
            {getDetails.Telephone}
          </label>
          <br />
          <input type="radio" checked/>
          <label>
          &nbsp;
            Cash on Delivery
          </label>
        </div>
      ) : (
        <div className="container mt-3 rounded bg-dark text-light py-4">
          <h3 className="text-start border-bottom w-75 my-3">
            Personal Information
          </h3>
          <form
            className="row g-3"
            onSubmit={(e) => {
              handleOnSubmit(e);
            }}
          >
            <div className="col-md-6 text-start ">
              <label htmlFor="inputEmail4" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  settingInputs(e);
                }}
                id="inputEmail4"
                name="FirstName"
              />
            </div>
            <div className="col-md-6 text-start">
              <label htmlFor="inputPassword4" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  settingInputs(e);
                }}
                id="inputPassword4"
                name="LastName"
              />
            </div>
            <div className="col-12 text-start">
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  settingInputs(e);
                }}
                id="inputAddress"
                placeholder="1234 Main St"
                name="Address1"
              />
            </div>
            <div className="col-12 text-start">
              <label htmlFor="inputAddress2" className="form-label">
                Address 2
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  settingInputs(e);
                }}
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                name="Address2"
              />
            </div>
            <div className="col-md-6 text-start">
              <label htmlFor="inputCity" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  settingInputs(e);
                }}
                id="inputCity"
                name="City"
              />
            </div>
            <div className="col-md-4 text-start">
              <label htmlFor="inputState" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  settingInputs(e);
                }}
                id="inputState"
                name="State"
              />
            </div>
            <div className="col-md-2 text-start">
              <label htmlFor="inputZip" className="form-label">
                Pincode
              </label>
              <input
                type="number"
                className="form-control no-spinners"
                id="inputZip"
                name="Pincode"
                onChange={(e) => {
                  settingInputs(e);
                }}
              />
            </div>
            <div className="col-md-6 text-start">
              <label htmlFor="Phone" className="form-label">
                Mobile
              </label>
              <input
                type="number"
                className="form-control no-spinners"
                id="Phone"
                name="Mobile"
                onChange={(e) => {
                  settingInputs(e);
                }}
              />
            </div>
            <div className="col-md-6 text-start">
              <label htmlFor="Telephone" className="form-label">
                Telephone
              </label>
              <input
                type="number"
                className="form-control no-spinners"
                id="Telephone"
                name="Telephone"
                onChange={(e) => {
                  settingInputs(e);
                }}
              />
            </div>
            <div className="col-md-12 text-start">
              <label htmlFor="male" className="form-label">
                Gender &nbsp; : &nbsp;
              </label>
              <label htmlFor="male" className="form-label">
                &nbsp;Male&nbsp;
              </label>
              <input
                type="radio"
                className="form-check-input"
                id="male"
                value="male"
                name="Gender"
                onChange={(e) => {
                  settingInputs(e);
                }}
              />
              <label htmlFor="female" className="form-label">
                &nbsp; Female &nbsp;
              </label>
              <input
                type="radio"
                className="form-check-input"
                id="female"
                name="Gender"
                value="female"
                onChange={(e) => {
                  settingInputs(e);
                }}
              />
            </div>
            <div className="col-12 text-center">
              {err ? (
                <p className="text-danger">
                  All Feilds are mandatory & should be correct
                </p>
              ) : (
                ""
              )}
              <button type="submit" className="btn btn-primary btn-lg">
                Complete Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default DeliveryDetails;
