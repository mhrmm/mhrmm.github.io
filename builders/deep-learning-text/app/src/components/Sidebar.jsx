import { Menu } from '@mui/material';
import { useState, useEffect, useRef, React } from 'react'
import Switch from "react-switch";
import Menubar from './Menubar';


const Sidebar = ({ onChange, checked }) => {

  const containerRef = useRef();

  const handleChange = () => {
    onChange(!checked);
  }

  const logoImage = checked ? "images/lightlogo.png" : "images/darklogo.png"

  const getFontMultiplier = () => {
    if (!containerRef.current) {
      return 1.0
    } else {
      let multiplier = containerRef.current.offsetWidth / 200
      return Math.min(1.0, multiplier)
    }
  }

  const logoWidth = `${getFontMultiplier() * 180}px`


  return (
    <div ref={containerRef} style={{
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "flex-start",
      alignContent: "center",
      alignItems: "center",
      marginLeft: "40px",
      padding: "20px"
    }}>
      <img src={logoImage} alt="Deep Learning: A Mathematical Primer" style={{
        width: logoWidth
      }} />
      <div style={{ width: '100%', padding: '10px'}}>
        <Menubar />
      </div>
      <div style={{ textAlign: 'center' }}>
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

export default Sidebar;