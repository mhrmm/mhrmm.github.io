import { useState, useEffect, useRef, React } from 'react'
import Csci134 from './components/Csci134'
import Chapter1 from './components/Chapter1'
import Chapter2 from './components/Chapter2'
import Chapter3 from './components/Chapter3'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { createHashRouter, RouterProvider } from "react-router-dom";
import './styles.css'

const computeEquationFontSize = () => {
  const [newCss, setNewCss] = useState(null);
  useEffect(() => {
    function handleResize() {
      let textMultiplier = Math.max(0.8, window.innerWidth > 1000 ? 1.0 : (window.innerWidth / 1000));
      let eqMultiplier = Math.max(0.4, window.innerWidth > 1000 ? 1.0 : (window.innerWidth / 1000));
      setNewCss(`
        .proof-equals {font-size: ${eqMultiplier * 50}px;}
        .dlamp-milestone {font-size: ${textMultiplier * 1.2}em;}
      `);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // effect is only run on mount
  return newCss;
}

const App = () => {

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    setLoading(false);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // "light mode" color palette
  const dayHeaderColor = "#da5820";
  const dayLogoTitleColor = "black";
  const dayLogoSubtitleColor = "#da5820";
  const dayLeftBgColor = "#d1def7";
  const dayMilestonesBgColor = "black";
  const dayRightBgColor = "#fffff5";
  const dayTextColor = "#000000";
  const dayTermColor = "#2222FF";
  const dayBullet = "🐳";

  // "dark mode" color palette
  const nightHeaderColor = "pink";
  const nightLogoTitleColor = "#9382ff";
  const nightLogoSubtitleColor = "white";
  const nightLeftBgColor = "#131518";
  const nightMilestonesBgColor = "black";
  const nightRightBgColor = "#131518"; //formerly "#3C4046";
  const nightTextColor = "white";
  const nightTermColor = "#65D6FB";
  const nightDefinitionColor = "#090430";
  const nightBullet = "🐠";

  const cssDay = `
    html, body { height: 100%; width: 100%; max-width: 1280px; }
    body { background-color: ${dayRightBgColor} }
    .border-glow { border-color: ${dayTermColor} }
    .border-dull { border-color: darkgray; } 
    .bubble1 { background-color: #ffddcc }
    .bubble2 { background-color: #ffccbb }
    .bubble3 { background-color: #ffc2af }
    #cover { background-color: ${dayRightBgColor} }
    .dlamp-focus-title {color:${dayLogoTitleColor};}    
    .dlamp-focus-container { border-style: dashed; border-color: ${dayTermColor}; color: black; background-color: ${dayLeftBgColor};}
    .dlamp-footer {color:${dayLogoTitleColor};}
    .dlamp-footer-hr {height: 1.0px; border: 1px solid ${dayLogoTitleColor}; color: ${dayLogoTitleColor}; background: ${nightLogoTitleColor};}
    .dlamp-image {border: 4px solid ${dayHeaderColor};}
    .dlamp-header1 {color: black;}
    .dlamp-header2 {color:${dayHeaderColor};}
    .dlamp-logo-title {color: ${dayLogoTitleColor};}
    .dlamp-logo-subtitle {color: ${dayLogoSubtitleColor};}
    .dlamp-milestone {border: dotted aqua; color: white; background-color: ${dayMilestonesBgColor}; }
    .leftbg {background-color: ${dayRightBgColor};}
    .rightbg {background-color: ${dayRightBgColor};} 
    .matrix-cell-highlight {background-color: ${dayHeaderColor}; color: white;}
    .matrix-cell-nohighlight {background-color: whitesmoke; color: black;}
    .pop-question {color: ${dayTextColor};}
    .pop-answer {color: ${dayTextColor}; font-weight: normal; background-color: ${dayLeftBgColor}; border-color: ${dayTermColor};}
    .permareveal {color: ${dayTextColor}; background-color: ${dayLeftBgColor}; border-color: ${dayHeaderColor};}
    .pq-unrevealed {color: ${dayLeftBgColor}}
    .proof-walkthru-container { border-style: dashed; border-color: ${dayTermColor}; color: black; background-color: ${dayLeftBgColor};}
    .proof-header {color:${dayLogoTitleColor}; font-weight: bold;}
    .proof-highlight {color: #cc3325;}
    .proof-highlight .proof-step-prev {color: red;}
    .proof-highlight-outline {border-color: ${dayHeaderColor};}
    .proof-inactive {color: gray;}     
    .proof-justification { color: ${dayTextColor} }
    .proof-step-prev .proof-highlight  {color: ${dayTextColor};}
    .textcolor { color: ${dayTextColor}; }
    .term {color:${dayTermColor};}
    a {color: #0062a8;}
    li > a:hover { font-weight: bold; color: ${dayHeaderColor}; }
    hr {height: 1.0px; border: 1px solid ${dayHeaderColor}; color: ${dayHeaderColor}; background: ${dayHeaderColor};}
    a:hover {color: #0A8808;}
  `


  const cssNight = `
    body { background-color: ${nightRightBgColor} }
    .border-glow { border-color: ${nightTermColor} }   
    .border-dull { border-color: darkgray; } 
    .bubble1 { background-color: ${nightDefinitionColor} }
    .bubble2 { background-color: ${nightDefinitionColor} }
    .bubble3 { background-color: ${nightDefinitionColor} }
    #cover { background-color: ${nightRightBgColor} }
    .dlamp-focus-container { border-style: dashed; padding: 10px; color: ${nightTextColor}; background-color: ${nightDefinitionColor};}
    .dlamp-focus-title {color:${nightHeaderColor};}
    .dlamp-header1 {color:${nightHeaderColor};}
    .dlamp-header2 {color:${nightHeaderColor};}
    .dlamp-footer {color:${nightTermColor};}
    .dlamp-footer-hr {height: 1.0px; border: 1px solid ${nightTermColor}; color: ${nightTermColor}; background: ${nightTermColor};}
    .dlamp-logo-title {color: ${nightLogoTitleColor};}
    .dlamp-logo-subtitle {color: ${nightLogoSubtitleColor};}
    .dlamp-image {padding: 3px; border: 1px solid ${nightLogoTitleColor};}
    .dlamp-milestone {border: dotted white; color: ${nightHeaderColor}; background-color: ${nightDefinitionColor}; }
    .leftbg {background-color: ${nightLeftBgColor};}
    .rightbg {background-color: ${nightRightBgColor};}
    .pop-question {color: ${nightTextColor};}
    .pop-answer {color: ${nightTextColor}; background-color: ${nightDefinitionColor}; border-color: lightgray;}
    .permareveal {color: ${nightTextColor}; background-color: ${nightDefinitionColor}; border-color: ${nightTermColor};}
    .pq-unrevealed {color: ${nightDefinitionColor};}
    .proof-walkthru-container { border-style: dashed; color: ${nightTextColor}; background-color: ${nightDefinitionColor};}
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
    a {color: #f88379}
    li::marker {color: ${nightHeaderColor}}
    li > a:hover { font-weight: bold; color: ${nightHeaderColor}; }
    hr {height: 1.0px; border: 1px solid ${nightHeaderColor}; color: ${nightHeaderColor}; background: ${nightHeaderColor};}
    a:hover {color: red;}
  `

  const [checked, setChecked] = useState(true);
  const [css, setCss] = useState(cssDay);

  const handleChange = (newStatus) => {
    setChecked(newStatus);
    if (checked) {
      setCss(cssNight);
    } else {
      setCss(cssDay);
    }
  }

  const narrowLayout = (content) => (
    <div className="dlamp-layout-narrow">
      <style>{css + computeEquationFontSize()}</style>
      <div id={loading ? "cover" : ""} />
      <div className="dlamp-top-container">
        <Topbar
          checked={checked}
          onChange={handleChange}
        />
      </div>
      <div className="rightbg dlamp-bottom-container">
        <div className="dlamp-content" style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'space-around',
          alignContent: 'center'
        }}>
          {content}
          <div className="dlamp-footer">
            <hr className="dlamp-footer-hr" />
            © mark hopkins, williams college
          </div>
        </div>
      </div>
    </div>
  )

  const standardLayout = (content) => (
    <div>
      <style>{css + computeEquationFontSize()}</style>
      <div id={loading ? "cover" : null} />
      <div className="dlamp-layout-wide dlamp-left-container">
        <Sidebar
          checked={checked}
          onChange={handleChange}
        />
      </div>
      <div className="dlamp-layout-wide dlamp-right-container rightbg">
        <div className="dlamp-content" style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'space-around',
          alignContent: 'center'
        }}>
          {content}
          <div className="dlamp-footer">
            <hr className="dlamp-footer-hr" />
            © mark hopkins, williams college
          </div>
        </div>
      </div>
    </div>
  )

  const autoLayout = (content) => (
    windowSize.width > 1100 ? standardLayout(content) : narrowLayout(content)
  )

  const router = createHashRouter([
    {
      path: "/",
      element: <Csci134 />
    },
    {
      path: "dlamp1/",
      element: autoLayout(
        <Chapter1 bullet={checked ? dayBullet : nightBullet}
          color1={checked ? dayTextColor : nightTextColor}
          color2={checked ? dayHeaderColor : nightHeaderColor}
          color3={checked ? dayTermColor : nightTermColor}
        />
      )
    },
    {
      path: "dlamp2/",
      element: autoLayout(
        <Chapter2 bullet={checked ? dayBullet : nightBullet}
          color1={checked ? dayTextColor : nightTextColor}
          color2={checked ? dayHeaderColor : nightHeaderColor}
          color3={checked ? dayTermColor : nightTermColor}
        />
      )
    },
    {
      path: "dlamp3/",
      element: autoLayout(
        <Chapter3 bullet={checked ? dayBullet : nightBullet}
          color1={checked ? dayTextColor : nightTextColor}
          color2={checked ? dayHeaderColor : nightHeaderColor}
          color3={checked ? dayTermColor : nightTermColor}
        />
      )
    },
  ]);

  return <RouterProvider router={router} />
};

export default App;