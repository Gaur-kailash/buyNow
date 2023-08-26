import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [otp, setOtp] = useState(0);
  let [password, setPass] = useState("");
  let [passFlag, setPassFlag] = useState(true);
  let [validationFlag, setValidataionFlag] = useState(false);
  let [RegistrationFlag, setRegFlag] = useState(false);
  let [emailConfirmation, setEmailConfirmation] = useState("");
  let [RegConfirmation, setRegConfirmation] = useState("");
  let navigate = useNavigate();

  let onRegister = async () => {
    let response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, otp, password }),
    });
    response = await response.json();
    console.log(response);
    setRegFlag(true);
    if (response.email) {
      let regMSg = document.getElementById("regMsg");
      regMSg.style.display = "block";
      regMSg.style.backgroundColor = "green";
      regMSg.style.color = "white";
      setRegConfirmation("Registration Scucesfull");
      setTimeout(() => {
        regMSg.style.display = "none";
        navigate("/login");
      }, 2000);
    }
    if (response.errors) {
      let regMSg = document.getElementById("regMsg");
      regMSg.style.display = "block";
      regMSg.style.backgroundColor = "red";
      regMSg.style.color = "white";
      setRegConfirmation(`Registration Failed ! ,${response.errors[0].msg}`);
      setTimeout(() => {
        regMSg.style.display = "none";
      }, 4000);
    }
  };

  let getVerified = async () => {
    setValidataionFlag(false);
    setEmailConfirmation("Mail is going");
    let response = await fetch("http://localhost:5000/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    response = await response.json();
    console.log(response);
    setValidataionFlag(true);
    if (response.email) {
      let emailMSg = document.getElementById("emailMsg");
      emailMSg.style.display = "block";
      emailMSg.style.backgroundColor = "green";
      emailMSg.style.color = "white";
      setEmailConfirmation("OTP sent successfully");
      setTimeout(() => {
        emailMSg.style.display = "none";
      }, 5000);
    }
    if (response.errors) {
      let emailMSg = document.getElementById("emailMsg");
      emailMSg.style.display = "block";
      emailMSg.style.backgroundColor = "red";
      emailMSg.style.color = "white";
      setEmailConfirmation(`Mail not sent ! ,${response.errors[0].msg}`);
    }
  };

  return (
    <div className="container">
      <div className="bg-dark text-light py-4 px-5 my-4 mx-auto rounded-3 custom-width custom-padding">
        <h3 className="mb-4">Register Here</h3>
        <div style={{ textAlign: "left" }} className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div style={{ textAlign: "left" }} className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <div className="d-flex">
            <input
              type="email"
              className="form-control custom-right-border"
              id="exampleInputEmail1"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              aria-describedby="emailHelp"
            />
            <button
              className="btn btn-primary custom-left-border custom-btn-padding"
              onClick={getVerified}
            >
              Verify
            </button>
          </div>
          {validationFlag ? (
            <div id="emailMsg">{emailConfirmation}</div>
          ) : (
            <div id="emailMsg">{emailConfirmation}</div>
          )}
        </div>
        <div style={{ textAlign: "left" }} className="mb-3">
          <label htmlFor="exampleInputOtp" className="form-label">
            OTP
          </label>
          <input
            type="number"
            className="form-control no-spinners"
            id="exampleInputOtp"
            name="otp"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </div>
        <div style={{ textAlign: "left" }} className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={(e) => {
              const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
              setPass(e.target.value);
              const isValidPassword = passwordRegex.test(password);
              if (isValidPassword) {
                setPassFlag(true)
              } else {
                setPassFlag(false)
              }
            }}
          />
          {!passFlag?<div className="text-warning">
            <ul>
            <li>At least 8 characters long.</li>
            <li>Contains at least one letter (uppercase or lowercase).</li>
            <li>Contains at least one digit.</li>
            <li>Contains at least one special character from @$!%*#?&.</li>
            </ul>
          </div>:""}
        </div>
        <div className="text-center">
          <button onClick={onRegister} className="btn btn-danger">
            Register
          </button>
        </div>
        {RegistrationFlag ? (
          <div id="regMsg">{RegConfirmation}</div>
        ) : (
          <div id="regMsg">{RegConfirmation}</div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
