import React, { useEffect, useState } from "react";
function Profile() {
  let id = localStorage.getItem("userId");
  let [flag, setflag] = useState(true);
  let [getDetails, setDetails] = useState({});
  let [inputs, setInputs] = useState({Address1: "",Address2: "",City: "",FirstName: "",Gender: "",LastName: "",Mobile: "",Pincode: "",State: "",Telephone: "",id: id});
  let [err,setErr] = useState(false);

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
    })
    response = await response.json();
    if(response.empty){
      setflag(false);
      console.log(response)
    }
    else{
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
            console.log("Response", res)
            if(res.errors){
              setErr(true);
            }
            else{
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
        <div className="container mt-3 rounded bg-dark text-light py-4">
        <h3 className="text-start border-bottom w-75 my-3">Personal Information</h3>
        <div className="row g-3">
          <div className="col-md-6 text-start ">
            <h3>
              First Name
            </h3>
            <p className="bg-secondary text-light rounded p-1 text-uppercase font-weight-normal">{getDetails.FirstName}</p>
          </div>
          <div className="col-md-6 text-start ">
            <h3>
              Last Name
            </h3>
            <p className="bg-secondary text-light rounded p-1 text-uppercase font-weight-normal">{getDetails.LastName}</p>
          </div>
          <div className="col-12 text-start">
            <h3 className="form-label">
              Address
            </h3>
            <p className="bg-secondary text-light rounded p-1 text-uppercase font-weight-normal">{getDetails.Address1}</p>
          </div>
          <div className="col-12 text-start">
            <h3 className="form-label">
              Address 2
            </h3>
            <p className="bg-secondary text-light rounded p-1 text-uppercase font-weight-normal">{getDetails.Address2}</p>
          </div>
          <div className="col-md-6 text-start">
            <h3 htmlFor="inputCity" className="form-label">
              City
            </h3>
            <p className="bg-secondary text-light rounded p-1 text-uppercase font-weight-normal">{getDetails.City}</p>
          </div>
          <div className="col-md-4 text-start">
            <h3 htmlFor="inputState" className="form-label">
              State
            </h3>
            <p className="bg-secondary text-light rounded p-1 text-uppercase font-weight-normal">{getDetails.State}</p>
          </div>
          <div className="col-md-2 text-start">
            <h3 htmlFor="inputZip" className="form-label">
              Pincode
            </h3>
            <p className="bg-secondary text-light rounded p-1 text-uppercase font-weight-normal">{getDetails.Pincode}</p>
          </div>
          <div className="col-md-6 text-start">
            <h3 htmlFor="Phone" className="form-label">
              Phone
            </h3>
            <p className="bg-secondary text-light rounded p-1 text-uppercase font-weight-normal">
              {getDetails.Mobile}
            </p>
          </div>
          <div className="col-md-6 text-start">
            <h3 htmlFor="Telephone" className="form-label">
              Telephone
            </h3>
            <p className="bg-secondary text-light rounded p-1 text-uppercase font-weight-normal">{getDetails.Telephone}</p>
          </div>
          <div className="col-md-12 text-start">
            <h3 className="text-uppercase font-weight-normal">
             <p className="d-inline"> Gender </p>&nbsp; : &nbsp;
              <b>{getDetails.Gender}</b>
            </h3>
          </div>
          </div>
      </div>
      ) : (
      <div className="container mt-3 rounded bg-dark text-light py-4">
      <h3 className="text-start border-bottom w-75 my-3">Personal Information</h3>
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
          {err?<p className="text-danger">All Feilds are mandatory & should be correct</p>:""}
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


export default Profile;
