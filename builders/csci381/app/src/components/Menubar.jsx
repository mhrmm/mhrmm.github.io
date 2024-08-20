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
    <Link to={{ pathname: `/dlamp1` }} className="menubar-link" style={{flexGrow: 1, flexShrink: 1}}>1</Link> 
    <div className="textcolor">|</div>
    <Link to={{ pathname: `/dlamp2` }} className="menubar-link" style={{flexGrow: 1, flexShrink: 1}}>2</Link>
    <div className="textcolor">|</div>
    <Link to={{ pathname: `/dlamp3` }} className="menubar-link" style={{flexGrow: 1, flexShrink: 1}}>3</Link>
  </div>
)

export default Menubar;