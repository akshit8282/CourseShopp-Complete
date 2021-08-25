import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import {useState,useEffect} from 'react'

import axios from 'axios'
import {Context} from '../context/context'
import {useContext} from 'react'
export default function SinglePost() {
  const {user}=useContext(Context);
  const [post, setpost] = useState({});
  const [error, seterror] = useState("");
  const location=useLocation();
  console.log(location);
  const path=location.pathname.split('/')[2];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
  const fetch=async ()=>{
const post=await axios.get('/history/'+path);
console.log(post)
setpost(post.data);
setTitle(post.data.title);
setDesc(post.data.desc);
  }
  fetch();
  }, [path])

  const PF="http://localhost:5000/images/";
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo?(<div className="imgwrapper">
        <img
          className="singlePostImg"
          src={PF+post.photo}
          alt=""
        />
        </div>):""}
       
       
          <h1 className="singlePostTitle">
          {post.title}</h1>
         

 
  
           
    
        <div className="singlePostInfo">
          <span>
            Author:
           
            <b className="singlePostAuthor">
             
                {post.username}
            </b>
            
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        
          <p className="singlePostDesc">{post.desc}</p>
          
       
        
      </div>
    </div>
  );
}