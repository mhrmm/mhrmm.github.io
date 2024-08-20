import { React } from 'react'
import { Link } from "react-router-dom";

const Menubar = () => (
  <div style={{
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center"
  }}>
    <Link to={{ pathname: '/dlamp1' }}><div className="menubar-link" style={{flexGrow: 1, flexShrink: 1}}>1</div></Link> 
    <div className="textcolor">|</div>
    <Link to={{ pathname: '/dlamp2' }}><div className="menubar-link" style={{flexGrow: 1, flexShrink: 1}}>2</div></Link>
    <div className="textcolor">|</div>
    <Link to={{ pathname: '/dlamp3' }}><div className="menubar-link" style={{flexGrow: 1, flexShrink: 1}}>3</div></Link>
  </div>
)

export default Menubar;