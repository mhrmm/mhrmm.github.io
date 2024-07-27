import * as React from 'react';
import Slider from '@mui/material/Slider';

const ColorPicker = ({hue}) => {

  hue = hue ? hue : 0.972; // set default value if not defined
 
  const [saturation, setSaturation] = React.useState(0.6);
  const [lightness, setLightness] = React.useState(0.8);

  const handleSaturationChange = (event, newValue) => {
    setSaturation(newValue);
  };

  const handleLightnessChange = (event, newValue) => {
    setLightness(newValue);
  };

  function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1/3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1/3);
    }  
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  
  function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }
  
  const [red, green, blue] = hslToRgb(hue*1.0, saturation, lightness); 

  return (
      <div style={{
        fontFamily: "Latin Modern Math",
        fontSize: "30px",        
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center",
        alignContent: "flex-start",
        alignItems: "flex-start",      
        height: '100px',
        columnGap: '20px'
        }}
      >
        <div style={{
          flexGrow: 0,
          flexShrink: 0,
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
          borderColor: `rgb(${red}, ${green}, ${blue})`,
          height: '100px',
          width: '100px'
        }}>
          <img src="images/haircolor.png" width="100%"></img>
        </div>          
        <div className="textcolor" style={{
          flexGrow: 0,
          flexShrink: 0,          
          height: '50px',
          width: 'auto',
          alignSelf: 'flex-start'
        }}>saturation</div>
        <div className="textcolor" style={{
          flexGrow: 0,
          flexShrink: 0,          
          height: '40px',
          width: 'auto',
          alignSelf: 'flex-start'
        }}>lightness</div> 
        <div className="textcolor" style={{
          flexGrow: 2,
          flexShrink: 1,        
          height: '50px',
          width: '40%',
        }}>
          <Slider 
            aria-label="saturation" 
            value={saturation} 
            valueLabelDisplay="auto"
            min={0.0}
            step={0.01}
            max={1.0}
            onChange={handleSaturationChange}  
             />
        </div>  
        <div style={{
          flexGrow: 2,
          flexShrink: 1,          
          height: '40px',
          width: '40%',
        }}>
          <Slider 
            aria-label="lightness" 
            value={lightness} 
            valueLabelDisplay="auto"
            min={0.0}
            step={0.01}
            max={1.0}
            onChange={handleLightnessChange}
              />      
        </div>
      </div>
  );
}

export default ColorPicker;
