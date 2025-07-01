import React from 'react'
import "./home.css"
import Todocard from './Todocard'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Before from './Before'


const Home = () => {
  const navigate=useNavigate();
  const id=sessionStorage.getItem("id");
  
  const [array,setarray]=useState([]);

  const del = async(Id) => {
    const res=await axios.delete(`https://todo-list-1-pntw.onrender.com/delete/${Id}`,id);
    console.log(res);
    console.log(Id);
    

    const updatedArray = array.filter((task, index) => task._id !== Id);
    
    setarray(updatedArray);
  };
  const edid=(title,desc,Id)=>{
    localStorage.setItem("title",title);
    localStorage.setItem("desc",desc);
    localStorage.setItem("id",Id);
    navigate("/edit");
  }
  useEffect(()=>{
    const id=sessionStorage.getItem("id");
    const fetch =async ()=>{
      await axios.get(`https://todo-list-1-pntw.onrender.com/get/${id}`).then((res)=>{
        if(res.data.message!=="NO TASKS TO SHOW"){
        setarray(res.data.List);
        }
        console.log(res.data.List);
      })
    }
    if(id){
    fetch();
    }
  },[]);

  return (
    <div className='home'>
      <Before/>
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

export default Home
