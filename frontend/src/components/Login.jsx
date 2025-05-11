
import "./signup.css"
import React, { useState } from 'react'

import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authactions } from "../store";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch =useDispatch();
  const islogin=useSelector((state)=>state.islogin);

   const history=useNavigate();
   
   const [email,setemail]=useState("");
   const [password,setpassword]=useState("");
   const [data,setdata]=useState({});
   const submit= async (e)=>{
     e.preventDefault();
     const userdata={
       email,password
     }
     await axios.post("http://localhost:1000/api/v1/login",userdata)
     .then((response)=>{
      //  alert(response.data.message);
       if(response.data.message==="signin first"){
         alert("email not registered");
       }
       else if(response.data.message==="not the correct password"){
         alert("password is incorrect");
       }
       else if(response.data.message==="welcome"){
         setdata(userdata);
       setemail("");
       setpassword("");
       history("/");
       sessionStorage.setItem("id",response.data.others._id);
       sessionStorage.setItem("email",response.data.others.email);
          dispatch(authactions.login());
          console.log(islogin);
         alert("logging");
       }
       
       
   });
   }
  return (
    
      <div className='signblockk'>
   
   <div class="mb-3 signblock">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control my-4" id="exampleFormControlInput1" value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder="name@example.com"/>
</div>
   <label for="inputPassword5" class="form-label signblock">Password</label>
<input type="password" id="inputPassword5" class="form-control signblock" value={password} onChange={(e)=>{setpassword(e.target.value)}} aria-describedby="passwordHelpBlock"/>

<button type="button" class="btn btn-primary mx-4 my-4" onClick={submit}>login</button>
   </div>
    
  )
}

export default Login
