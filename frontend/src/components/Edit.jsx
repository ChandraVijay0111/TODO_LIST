import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Edit = () => {
    const navigate=useNavigate();
    
    const t=localStorage.getItem("title");
    const d=localStorage.getItem("desc");
    const id=localStorage.getItem("id");
    
    const[title,settitle]=useState(t);
  const[desc,setdesc]=useState(d);
  
  const save=async()=>{
    await axios.put(`https://todo-list-1-pntw.onrender.com/api/v1/update`,{title,"body":desc,id}).then((res)=>console.log(res));
    localStorage.clear();
    navigate("/");
  }
  const cancelit=()=>{
    localStorage.clear();
    navigate("/");
  }
  return (
    <div>
      <div className='home'>
          <div className="card">
            <div className="card-body">
                <input className="card-title my-4" id='title' placeholder='title' value={title} onChange={(e)=>settitle(e.target.value)}/>
    
                <textarea class="form-control" id="exampleFormControlTextarea1" placeholder='description' value={desc} onChange={(e)=>setdesc(e.target.value)} rows="3"></textarea>
                <div className="d-grid gap-2 d-md-block">
                  <button type="button" class="btn btn-primary mx-4 my-4" onClick={save}>save</button>
                  <button type="button" class="btn btn-primary mx-4 my-4" onClick={cancelit}>cancel</button>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Edit
