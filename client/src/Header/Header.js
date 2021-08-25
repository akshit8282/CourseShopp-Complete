import "./header.css";
import header from '../images/header.jpg'
export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Buy & Learn</span>
        <span className="headerTitleLg">Course Shop</span>
      </div>
      <img
        className="headerImg"
        src={header}
        alt=""
      />
    </div>
  );
}