import { useState, useEffect, useRef, React } from 'react'
import Milestones from './Milestones'
import Switch from "react-switch";


const Sidebar = ({ onChange, activeColor, inactiveColor }) => {

  const [checked, setChecked] = useState(true);
  const containerRef = useRef();

  const handleChange = () => {
    setChecked(!checked);
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

  const getFontSize = (base) => {
    return `${getFontMultiplier() * base}px`
  }

  return (
    <div ref={containerRef} className="split left leftbg" style={{
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "stretch",
      alignContent: "center",
      alignItems: "center",
    }}>
      <img src={logoImage} alt="Deep Learning: A Mathematical Primer" style={{
        width: logoWidth
      }} />
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
      <div style={{
        height: '20px',
        flexGrow: 1,
      }} />

      <Milestones activeColor={activeColor} inactiveColor={inactiveColor} />
      <div style={{ flexGrow: 0, flexShrink: 0, height: '30px' }} />      
      
    </div>)
};

export default Sidebar;