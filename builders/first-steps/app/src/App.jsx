import { useState, useEffect, React } from 'react'
import TableOfContents from './components/tableOfContents'
import Chapter3 from './components/Chapter3'
import Switch from "react-switch";



const App = () => {
  
  const cssDay = `
    .definition { padding: 10px; color: white; background-color: #201b71;}
    .definitionheader {color:aqua; font-weight: bold}
    .header1 {color:#d54a04;}
    .rightbg {background-color: #F0F0F0;} 
    .leftbg {background-color: #E3D79F;} 
    .logotitlecolor {color: #006298}
    .logosubtitlecolor {color: black;}
    .textcolor { color: rgb(80, 80, 80); }
    .term {color:#d54a04;}
    a {color: #0062a8; text-decoration: none; font-family: 'Futura', 'Trebuchet MS', sans-serif;}
    ol { color: rgb(80, 80, 80); }
    li > a:hover { color: #d54a04;}
    .image {border: 2px solid #0062a8;}
    hr {height: 1px; color: black; background: black;}
    a:hover {color: #d54a04;}
    a.menu {color: rgb(13, 12, 12);}
    
  `
  const cssNight = `
    .definition { padding: 10px; color: white; background-color: #ef7358;}
    .definitionheader {color:maroon; font-weight: bold}
    .header1 {color:aqua;}
    .leftbg {background-color: #3C4046;}
    .rightbg {background-color: #35383d;}
    .logotitlecolor {color: #E3D79F;}
    .logosubtitlecolor {color: white;}
    .textcolor { color: white; }
    .term {color:aqua;}
    a {color: #f88379; text-decoration: none; font-family: 'Futura', 'Trebuchet MS', sans-serif;}
    ol { color: white; }
    li > a:hover { color: aqua; }
    .image {border: 2px solid #81c8cd;}
    hr {height: 0.5px; color: aqua; background: aqua;}
    a:hover {color: red;}
    a.menu {color: grey;}
  `
  const [checked, setChecked] = useState(true)
  const [css, setCss] = useState(cssNight)
  const [goodcolor, setGoodcolor] = useState("chartreuse")
  const [badcolor, setBadcolor] = useState("red")
  const [labelcolor, setLabelcolor] = useState("#e28a24")

  useEffect(()=>{
    setCss(cssDay);
    setGoodcolor("chartreuse");
    setBadcolor("red");
    setLabelcolor("#e28a24")
  }, []) 

  const handleChange = () => {
    setChecked(!checked);
    if(checked) {
      setCss(cssNight);
      setGoodcolor("aqua");
      setBadcolor("red");
      setLabelcolor("#E3D79F")
    } else {
      setCss(cssDay);
      setGoodcolor("chartreuse");
      setBadcolor("red");
      setLabelcolor("#e69a34")
    }
  }

  return <div>
          <style>{css}</style>
          <div className="split right rightbg">
            <div className="leftaligned">
              <Chapter3 goodcolor={goodcolor} badcolor={badcolor} labelcolor={labelcolor} /> 
            </div>
          </div>
    
          <div className="split left leftbg">
            <div className="centered">
              
            <h2 className="logotitle logotitlecolor titleline1">computer</h2>
            <h2 className="logotitle logotitlecolor titleline2">science</h2>
            <img src="images/lambdasteps.png" width="100" />
            <hr/>
            
            <h3 className="logosubtitle logosubtitlecolor">first</h3>
            <h1 className="logosubtitle logosubtitlecolor">steps</h1>
            <br></br>
            <label>
            <Switch 
              onChange={handleChange} 
              checked={checked} 
              onColor="#006298"
              offColor="#9382ff"
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
              >🌙</div>}
              checkedIcon={<div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  paddingRight: 2
                }}
              >☀️</div>}
            />
            </label>   
            <TableOfContents />
          </div>
        </div> 
      </div>;
};

export default App;
