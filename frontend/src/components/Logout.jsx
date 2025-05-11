import React from 'react'
import { useDispatch } from 'react-redux'
import { authactions } from '../store'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const history=useNavigate();
  const dispatch=useDispatch();
  const loggingout=()=>{
    sessionStorage.clear("id");
    dispatch(authactions.logout());
    history("/login");
  }
  return (
    <div>
      <button onClick={loggingout}>logout</button>
    </div>
  )
}

export default Logout
