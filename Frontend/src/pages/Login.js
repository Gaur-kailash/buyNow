import React,{useState} from "react";
import {useNavigate} from "react-router-dom"


function Login() {
  let [email,setEmail]= useState("");
  let [pass,setPass]= useState("");
  let navigate = useNavigate();
  async function onLogin(e){
    e.preventDefault();
    let response = await fetch("http://localhost:5000/login",{
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body : JSON.stringify({email:email,password:pass})
    })
    response = await response.json();
    console.log(response);
    if(response.errors){
      console.log(response.errors);
    }else{
    console.log(response._id);
    localStorage.setItem("userId",response._id);
    navigate('/');
    }
  }

  return (
    <div className="container">
      <form className="bg-dark text-light py-4 px-5 my-4 mx-auto rounded-3 custom-width custom-padding"  onSubmit={onLogin}>
        <h3 className="mb-4">Login Here</h3>
        <div style={{"textAlign":"left"}} className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input 
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div style={{"textAlign":"left"}} className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input 
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={pass}
            onChange={(e)=>{setPass(e.target.value)}}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
