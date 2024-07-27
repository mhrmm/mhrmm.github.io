import { useState, useEffect, useRef, React } from 'react'
import TableOfContents from './components/tableOfContents'
import Chapter2 from './components/Chapter2'
import Switch from "react-switch";
import FollowTheFold from './components/FollowTheFold';

const computeEquationFontSize = () => {
  const [newCss, setNewCss] = useState(null);
  useEffect(() => {
    function handleResize() {
      let logoMultiplier = window.innerWidth > 1000 ? 1.0 : (window.innerWidth / 1000);
      setNewCss(`
        .deep {font-size: ${logoMultiplier * 3.7}em;}
        .learning {font-size: ${logoMultiplier * 2.2}em;}
        .logo-image {width: ${logoMultiplier * 160}px;}
        .logo-subtitle1 {font-size: ${logoMultiplier * 1.1}em;}
        .logo-subtitle2 {font-size: ${logoMultiplier * 2.5}em;}
        .proof-equals {font-size: ${logoMultiplier * 50}px;}
        .toc {margin-top: 0px; list-style-type: circle; margin-left: ${logoMultiplier * 15}px; padding: 15px;}
        .menu {font-size: ${logoMultiplier * 1.2}em;}
      `);      
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // effect is only run on mount
  return newCss;
}

const App = () => {
  
  // "light mode" color palette
  const dayHeaderColor = "#da5820";
  const dayLogoTitleColor = "#201b71";
  const dayLogoSubtitleColor = "#201b71";
  const dayLeftBgColor = "#d1def7";
  const dayRightBgColor = "#fffff5";
  const dayTextColor = "#000000";
  const dayTermColor = "#2222FF";
  const dayBullet = "🐳";

  // "dark mode" color palette
  const nightHeaderColor = "pink";
  const nightLogoTitleColor = "#9382ff";
  const nightLogoSubtitleColor = "white";
  const nightLeftBgColor = "#131518";
  const nightRightBgColor = "#131518"; //formerly "#3C4046";
  const nightTextColor = "white";
  const nightTermColor = "#65D6FB";
  const nightDefinitionColor = "#090430";
  const nightBullet = "🐠";

  const cssDay = `
    .border-glow { border-color: ${dayTermColor} }
    .border-dull { border-color: darkgray; } 
    .definition { border-style: dashed; border-color: ${dayTermColor}; padding: 10px; color: black; background-color: ${dayLeftBgColor}; font-weight: normal;}
    .definitionheader {color:${dayLogoTitleColor}; font-weight: bold}    
    .footer {color:${dayLogoTitleColor};}
    .footer-hr {height: 1.0px; border: 1px solid ${dayLogoTitleColor}; color: ${dayLogoTitleColor}; background: ${nightLogoTitleColor};}
    .header1 {color: black;}
    .header2 {color:${dayHeaderColor};}
    .leftbg {background-color: ${dayLeftBgColor};}
    .rightbg {background-color: ${dayRightBgColor};} 
    .logo-title {color: ${dayLogoTitleColor};}
    .logo-subtitle1 {color: ${dayLogoSubtitleColor};}
    .logo-subtitle2 {color: ${dayLogoSubtitleColor};}
    .pop-question {color: ${dayTextColor};}
    .pop-answer {color: ${dayTextColor}; font-weight: normal; background-color: ${dayLeftBgColor}; border-color: ${dayTermColor};}
    .permareveal {color: ${dayTextColor}; background-color: ${dayLeftBgColor}; border-color: ${dayHeaderColor};}
    .pq-unrevealed {color: ${dayLeftBgColor}}
    .proof-header {color:${dayLogoTitleColor}; font-weight: bold;}
    .proof-highlight {color: #cc3325;}
    .proof-highlight .proof-step-prev {color: red;}
    .proof-highlight-outline {border-color: ${dayHeaderColor};}
    .proof-inactive {color: gray;}     
    .proof-justification { color: ${dayTextColor} }
    .proof-step-prev .proof-highlight  {color: ${dayTextColor};}
    .textcolor { color: ${dayTextColor}; }
    .term {color:${dayTermColor};}
    .toc {color:${dayLogoTitleColor};}
    a {color: #0062a8; text-decoration: none; font-family: 'Trebuchet MS', sans-serif;}
    li > a:hover { font-weight: bold; color: ${dayHeaderColor}; }
    .image {border: 4px solid ${dayHeaderColor};}
    hr {height: 1.0px; border: 1px solid ${dayHeaderColor}; color: ${dayHeaderColor}; background: ${dayHeaderColor};}
    a:hover {color: #0A8808;}
    a.menu {color: ${dayTextColor};} 
  `
  

  const cssNight = `
    .border-glow { border-color: ${nightTermColor} }   
    .border-dull { border-color: darkgray; } 
    .definition { border-style: dashed; padding: 10px; color: ${nightTextColor}; background-color: ${nightDefinitionColor}; font-weight: normal;}
    .definitionheader {color:${nightHeaderColor}; font-weight: bold;}
    .header1 {color:${nightHeaderColor};}
    .header2 {color:${nightHeaderColor};}
    .footer {color:${nightTermColor};}
    .leftbg {background-color: ${nightLeftBgColor};}
    .rightbg {background-color: ${nightRightBgColor};}
    .logo-title {color: ${nightLogoTitleColor};}
    .logo-subtitle1 {color: ${nightLogoSubtitleColor};}
    .logo-subtitle2 {color: ${nightLogoSubtitleColor};}
    .pop-question {color: ${nightTextColor};}
    .pop-answer {color: ${nightTextColor}; background-color: ${nightDefinitionColor}; border-color: lightgray;}
    .permareveal {color: ${nightTextColor}; background-color: ${nightDefinitionColor}; border-color: ${nightTermColor};}
    .pq-unrevealed {color: ${nightDefinitionColor};}
    .proof-header {color:${nightHeaderColor}; font-weight: bold;}
    .proof-highlight {color: ${nightTermColor};}  
    .proof-step-prev .proof-highlight  {color: ${nightTextColor};}
    .proof-highlight-outline {border-color: ${nightHeaderColor};}   
    .proof-inactive {color: gray;} 
    .proof-justification { color: ${nightTextColor} }
    .proof-navigation-back { color: ${nightTextColor} }    
    .proof-navigation-forward { color: ${nightTextColor} }
    .textcolor { color: ${nightTextColor}; }
    .term {color:${nightTermColor}}
    .toc {color:gray;}
    a {color: #f88379; text-decoration: none; font-family: 'Trebuchet MS', sans-serif;}
    li::marker {color: ${nightHeaderColor}}
    li > a:hover { font-weight: bold; color: ${nightHeaderColor}; }
    .image {padding: 3px; border: 1px solid ${nightLogoTitleColor};}
    hr {height: 1.0px; border: 1px solid ${nightHeaderColor}; color: ${nightHeaderColor}; background: ${nightHeaderColor};}
    .footer-hr {height: 1.0px; border: 1px solid ${nightTermColor}; color: ${nightTermColor}; background: ${nightTermColor};}
    a:hover {color: red;}
    a.menu {color: grey;}
  `

  const [checked, setChecked] = useState(true);
  const [css, setCss] = useState(cssDay);
  
  const handleChange = () => {
    setChecked(!checked);
    if (checked) {
      setCss(cssNight);
    } else {
      setCss(cssDay);
    }
  }
 
  return <div>
    <style>{css + computeEquationFontSize()}</style>
    <div className="split right rightbg">
      <div className="leftaligned"> 
        <Chapter2 bullet={checked? dayBullet : nightBullet} 
          color1={checked? dayTextColor : nightTextColor}
          color2={checked? dayHeaderColor : nightHeaderColor}
          color3={checked? dayTermColor : nightTermColor}
        />
        <div className="footer">
          <hr className="footer-hr"/>
          © mark hopkins, williams college
        </div>
      </div>

    </div>


    <div className="split left leftbg">
      <div className="centered">
        <div className="logo-title deep">deep</div>
        <div className="logo-title learning">learning</div>
        <img className="logo-image" src="images/deep_learning_logo.png" />

        <div className="logo-subtitle1">a mathematical</div>
        <div className="logo-subtitle2">primer</div>        
        <label>
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
        </label>
        <TableOfContents />
      </div>
    </div>
  </div>;
};

export default App;