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
    <Link style={{ flexGrow: 1, flexShrink: 1 }} to={{ pathname: '/dlamp1' }}>
      <div className="dlamp-menubar-link" >1</div>
    </Link>
    <div className="textcolor">|</div>
    <Link style={{ flexGrow: 1, flexShrink: 1 }} to={{ pathname: '/dlamp2' }}>
      <div className="dlamp-menubar-link">2</div>
    </Link>    
  </div>
)

export default Menubar;