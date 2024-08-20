import { useState, useEffect, useRef, React } from 'react'
import Switch from "react-switch";
import Menubar from './Menubar';

const Topbar = ({ onChange, checked }) => {

  const containerRef = useRef();

  const handleChange = () => {
    onChange(!checked);
  }

  const logoImage = "images/deep_learning_logo.png" 

  const getFontMultiplier = () => {
    if (!containerRef.current) {
      return 1.0
    } else {
      let multiplier = containerRef.current.offsetWidth / 600
      return Math.max(0.6, Math.min(1.0, multiplier))
    }
  }

  const logoWidth = 60

  return (
    <div ref={containerRef} className="topbar leftbg" style={{
      display: "flex",
      flexFlow: "row nowrap",
      height: '70px',
      justifyContent: "stretch",
      alignContent: "center",
      alignItems: "center",
    }}>
      <img src={logoImage} alt="Deep Learning: A Mathematical Primer" style={{
        width: `${getFontMultiplier()*logoWidth}px`,
        paddingLeft: '20px',
        paddingRight: '10px'
      }} />
      <div className="logo-title" style={{
        fontSize: `${getFontMultiplier()*30}px`,
      }}>deep learning</div>
      <div className="logo-subtitle1" style={{
        fontSize: `${getFontMultiplier()*20}px`,
        paddingLeft: '10px',
        paddingRight: '10px'
      }}>a mathematical primer</div>
      <div style={{ flexGrow: 1 }}></div>
      <div style={{ width: '100px'}}><Menubar /></div>
      <div style={{ paddingRight: '20px', textAlign: 'center' }}>
        <Switch
          onChange={handleChange}
          checked={checked}
          onColor="#0082c8"
          offColor="#66bbbb"
          onHandleColor='#aaaaaa'
          uncheckedIcon={<div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 15,
              paddingRight: 2
            }}
          >🤿</div>}
          checkedIcon={<div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 15,
              paddingRight: 2
            }}
          >🏖️</div>}
        />
      </div>
      
    </div>)
};

export default Topbar;