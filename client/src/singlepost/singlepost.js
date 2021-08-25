import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import {useState,useEffect} from 'react'
import "./singlepost.css";
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
const post=await axios.get('/post/'+path);
setpost(post.data);
setTitle(post.data.title);
setDesc(post.data.desc);
  }
  fetch();
  }, [path])
  const handleBuy=async (e)=>{
    if(!user){
      window.location.replace('/login');
    }else{
    var answer = window.confirm("Do you want to buy course by "+post.username);
if (answer) {
    //some code
    e.preventDefault();
const forminput={
 
  title:post.title,
  desc:post.desc,
  username:user.username,

}
let data;
console.log(forminput);
if(post.photo){
 data=new FormData();
  
  forminput.photo=post.photo
}

//
await axios.post('/history',forminput).then(res=>{
  console.log(res);
  window.location.replace('/history');
}).catch(error=>{
  if(error.response.status==400){
seterror("404 BAD REQUEST!")
  }
  console.log(error);
});



}
else {
    //some code
    console.log("no");
}

  }}
//delete post
const handledelete = async () => {
  try {
    await axios.delete(`/post/${post._id}`, {
      data: { username: user.username },
    });
    window.location.replace("/");
  } catch (err) {}
};
//update
const handleUpdate = async () => {
  try {
    await axios.put(`/post/${post._id}`, {
      username: user.username,
      title,
      desc,
    });
    setUpdateMode(false)
    window.location.reload();
  } catch (err) {}
};
  const PF="http://localhost:5000/images/";
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="imgwrapper">
        <img
          className="singlePostImg"
          src={PF+post.photo}
          alt=""
        />
        </div>
       
        {updateMode?( <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />):
          <h1 className="singlePostTitle">
          {post.title}
         
{
  post.username==user?.username&&
  <div className="singlePostEdit">
     <i className="singlePostIcon far fa-edit" onClick={(e)=>{
       setUpdateMode(true)
     }}></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handledelete}></i>
          </div>
}
           
        </h1>}
        <div className="singlePostInfo">
          <span>
            Author:
            <Link to={`/?user=${post.username}`}>
            <b className="singlePostAuthor">
             
                {post.username}
            </b>
            </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">A Very Good Course With Lots Of Knowledge<br>
          </br>
          Will take You from Beginer To Advance.......</p>
          
        )}
         {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
         {!updateMode && (
          <button className="singlePostButton" onClick={handleBuy}>
            Buy now
          </button>
      
        )}
        <h1>{error}</h1>
      </div>
    </div>
  );
}