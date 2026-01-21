import { useEffect, useRef, useState } from "react";
import Slider from '@mui/material/Slider';


export default function Meter({ title, initial, onChange, bounds, step, ariaLabel }) {

  const [value, setValue] = useState(initial);

  if (!onChange) { onChange = () => { } }

  const containerRef = useRef();

  
  useEffect(() => {
    setValue(initial)
  }, [initial])


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


  const createSlider = () => {
    if (bounds) {
      return (
        <Slider
          aria-label={ariaLabel}
          value={value}
          min={bounds[0]}
          step={step}
          max={bounds[1]}
          onChange={(event, newValue) => {
            setValue(newValue);
            onChange(newValue);
          }}
        />
      )
    } else {
      return null
    }
  }

  return (
    <div ref={containerRef} style={{
      flexGrow: 0,
      flexShrink: 0,
      width: '100%',
      padding: getFontSize(5),
      textAlign: "center"
    }}>
      <div style={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "stretch",
      }}>
        <div style={{ fontSize: getFontSize(20) }}>{title}</div>
        <div style={{ fontSize: getFontSize(45), borderStyle: "solid", padding: "5px" }}>
          {value.toFixed(2)}
        </div>
        {createSlider()}
      </div>
    </div>
  )

}
