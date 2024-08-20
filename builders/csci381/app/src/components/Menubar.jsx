import { React } from 'react'

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
    <a href="/dlamp1" className="menubar-link" style={{flexGrow: 1, flexShrink: 1}}>1</a> 
    <div className="textcolor">|</div>
    <a href="/dlamp2" className="menubar-link" style={{flexGrow: 1, flexShrink: 1}}>2</a>
    <div className="textcolor">|</div>
    <a href="/dlamp3" className="menubar-link" style={{flexGrow: 1, flexShrink: 1}}>3</a>
  </div>
)

export default Menubar;