import React, {useState } from 'react'
import Todocard from './Todocard'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const navigate=useNavigate();
  const id=sessionStorage.getItem("id");
  const[title,settitle]=useState("");
  const[desc,setdesc]=useState("");
  const [array,setarray]=useState([]);

  const edid=(title,desc,Id)=>{
    localStorage.setItem("title",title);
    localStorage.setItem("desc",desc);
    localStorage.setItem("id",Id);
    navigate("/edit");
  }

  const del = async(Id) => {
    const res=await axios.delete(`https://todo-list-1-pntw.onrender.com/api/v1/delete/${Id}`,id);
    console.log(res);
    console.log(Id);
    

    const updatedArray = array.filter((task, index) => task._id !== Id);
    
    setarray(updatedArray);
    toast("your task is deleted");
  };

  const submit= async (e)=>{
    e.preventDefault();
    if(title.trim() && desc.trim()){
    const task={
      title:title,body:desc,id:id
    }
    await axios.post("https://todo-list-1-pntw.onrender.com/api/v1/add",task).then((response)=>{
      console.log(response.data)
    }
    
    );
    setarray(()=>{
      const set=[...array,task];
      console.log(set);
      settitle("");
    setdesc("");
    toast("your task is added")
      return set;
    });
    
  }
  else{
    toast("title or desc cannot be empty");
  }
  }
  useEffect(()=>{
    const fetch =async ()=>{
      await axios.get(`https://todo-list-1-pntw.onrender.com/api/v1/get/${id}`).then((res)=>{
        if(res.data.message!=="NO TASKS TO SHOW"){
        setarray(res.data.List);
        }
        console.log(res.data.List);
      })
    }
    if(id){
    fetch();
    }
  },[submit,del]);

  
  return (
    <div>
        <div className='home'>
          <ToastContainer/>
          <div className="card">
            <div className="card-body">
                <input className="card-title my-4" id='title' placeholder='title' value={title} onChange={(e)=>settitle(e.target.value)}/>
    
                <textarea class="form-control" id="exampleFormControlTextarea1" placeholder='description' value={desc} onChange={(e)=>setdesc(e.target.value)} rows="3"></textarea>
                <div className="d-grid gap-2 d-md-block">
                  <button type="button" class="btn btn-primary mx-4 my-4" onClick={submit}>add todo</button>
                </div>
            </div>
          </div>
        </div>
        <div className='row row-cols-2 my-5 mx-5'>
          {
            array && array.map((task,index)=>(
              <div>
              <Todocard title={task.title} desc={task.body} id={task._id}  delid={del} edid={edid}/>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Todo
