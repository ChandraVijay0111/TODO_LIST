import React from 'react'
import "./Todocard.css"
const Todocard = ({title,desc,id,delid,edid}) => {
  return (
    <div className="card-body card">
    <h5 className="card-title my-4">{title}</h5>
    
    <p className="card-text">{desc}</p>
    
    <div className="d-flex gap-2 d-md-block">
    <button type="button" class="btn btn-primary mx-4" onClick={()=>{edid(title,desc,id)}}>edit</button>
    <button type="button" class="btn btn-danger mx-4" onClick={()=>{delid(id)}}>delete</button>
    </div>
  </div>
  )
}

export default Todocard
