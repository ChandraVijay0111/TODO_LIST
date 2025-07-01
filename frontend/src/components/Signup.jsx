import React, { useState } from 'react'
import "./signup.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const history=useNavigate();
  const [user,setuser]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [data,setdata]=useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const submit= async (e)=>{
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const userdata={
      username:user,email,password
    }
    await axios.post("https://todo-list-1-pntw.onrender.com/signup",userdata)
    .then((response)=>{
      alert(response.data.message);
      if(response.data.message==="sign up successful"){
      setdata(userdata);
      setuser("");
      setemail("");
      setpassword("");
      history("/login");
      }
  });
  }

  return (
   <div className='signblockk'>
   <div class="mb-3 signblock">
  <label for="exampleFormControlInput1" class="form-label">Username</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" value={user} onChange={(e)=>{setuser(e.target.value)}} placeholder="Username"/>
</div>
   <div class="mb-3 signblock">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" value={email} onChange={(e)=>{setemail(e.target.value)}}  placeholder="name@example.com"/>
</div>
   <label for="inputPassword5" class="form-label signblock">Password</label>
<input type="password" id="inputPassword5" class="form-control signblock" value={password} onChange={(e)=>{setpassword(e.target.value)}} aria-describedby="passwordHelpBlock"/>
<div id="passwordHelpBlock" class="form-text signblock">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div>
<button type="button" class="btn btn-primary mx-4 " onClick={submit}>Signup</button>
   </div>
  )
}

export default Signup
