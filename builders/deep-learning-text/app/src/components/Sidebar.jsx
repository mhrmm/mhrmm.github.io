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

  const getFontMultiplier = () => {
    if (!containerRef.current) {
      return 1.0
    } else {
      let multiplier = containerRef.current.offsetWidth / 200
      return Math.min(1.0, multiplier)
    }
  }

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
      <div className="logo-title deep" style={{ textAlign: 'center' }}>deep</div>
      <div className="logo-title learning" style={{ textAlign: 'center' }}>learning</div>
      <img className="logo-image" src="images/deep_learning_logo.png" />
      <div className="logo-subtitle1" style={{ textAlign: 'center' }}>a mathematical</div>
      <div className="logo-subtitle2" style={{ textAlign: 'center' }}>primer</div>
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