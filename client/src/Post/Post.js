import { Link } from "react-router-dom";
import "./Post.css";

export default function Post({img,post}) {
  const PF="http://localhost:5000/images/";
  console.log(post);
  return (
    <div>
         <div className="post">
      {post.photo&&(<img
        className="postImg"
        src={PF+post.photo}
        alt=""
      />)}
      
      <div className="postInfo">
        <div className="postCats">
          {post.category.map(c=>{
            <span className="postCat">
            
           {c.name}
         
        </span>
          })}
          
         
        </div>
        <Link to={`/post/${post._id}`} className="link">
        <span className="postTitle">
        
           {post.title}
         
        </span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
       {post.desc}
      </p>
      <div className="postCats">
          <span className="postCat">
            <Link className="link" to={`/post/${post._id}`}>
            Buy
            </Link>
          </span>
          <span className="postCat">
          <Link className="link" to={`/post/${post._id}`}>
            Couse Details
            </Link>
          </span>
        </div>
    </div>
    <hr style={{height:'2px'}}/>
    <div style={{margin:'20px'}}></div>
    </div>
    
  );
}