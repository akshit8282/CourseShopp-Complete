import React from 'react';
import {useEffect,useState,useContext} from 'react'
import {Context} from '../context/context'
import axios from 'axios';
import code from '../images/code.jpg'
import  './History.css'
import { Link } from "react-router-dom";

function History() {
    const { user } = useContext(Context);
    const [posts,setPosts]=useState([]);

    useEffect(() => {
        const fetchpost=async ()=>{
            console.log(user.username);
     const posts=await  axios.get(`/history/?user=${user.username}`, {headers: {'Access-Control-Allow-Origin': '*'},
        });
        setPosts(posts.data);
        }
        fetchpost();
       
    },[])
      console.log(posts);
    return (
        <div>
            <div className="write">
     <h1 className="heading">Your Courses!</h1>
     {posts.length>0?posts.map(post=>{
         
 return(<div class="card  main mb-3">
 <div className="cardbody">
 <div className="cardimg">

<img class="card-img-top" src={code} alt="Card image cap" />
</div>
<div className="bodyc card-body">
<h5 class="card-title">{post.title}</h5>

<p class="card-text"><button className="cbutton"><Link to={`/history/${post._id}`} className="link">Go to course!</Link></button></p>
</div>
</div>
</div>)
     }):<marquee>You are not enrolled in any courses</marquee>}
    

        </div>
        </div>
    )
}

export default History
