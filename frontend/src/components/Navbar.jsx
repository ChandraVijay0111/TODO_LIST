import React from 'react'
import {Link} from "react-router-dom"; 
import { useSelector } from 'react-redux';

const Navbar = () => {
  const islogin = useSelector((state)=>state.islogin);
  console.log(islogin);

  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">TODO</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        
        {
          !islogin && (
            <>
           
            <li className="nav-item">
          <Link className="nav-link" to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">login</Link>
        </li></>
          )
        }
        {
          islogin && (<>
           <li className="nav-item">
          <Link className="nav-link" to="/addtodo">add todo</Link>
        </li>
          <li className="nav-item">
          <Link className="nav-link" to="/logout">log out</Link>
        </li></>)
        }

        
        
      </ul>
      
    </div>
  </div>
</nav>
</div>
  )
}

export default Navbar
