import { useState, useEffect, useRef, React } from 'react'
import Csci381 from './components/Csci381'
import Chapter1 from './components/Chapter1'
import Chapter2 from './components/Chapter2'
import Chapter3 from './components/Chapter3'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles.css'

const computeEquationFontSize = () => {
  const [newCss, setNewCss] = useState(null);
  useEffect(() => {
    function handleResize() {
      let textMultiplier = Math.max(0.8, window.innerWidth > 1000 ? 1.0 : (window.innerWidth / 1000));
      let eqMultiplier = Math.max(0.4, window.innerWidth > 1000 ? 1.0 : (window.innerWidth / 1000));
      setNewCss(`
        .proof-equals {font-size: ${eqMultiplier * 50}px;}
        .menu {font-size: ${textMultiplier * 1.2}em;}
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
    .definition { border-style: dashed; border-color: ${dayTermColor}; padding: 10px; color: black; background-color: ${dayLeftBgColor}; font-weight: normal;}
    .definitionheader {color:${dayLogoTitleColor}; font-weight: bold}    
    .footer {color:${dayLogoTitleColor};}
    .footer-hr {height: 1.0px; border: 1px solid ${dayLogoTitleColor}; color: ${dayLogoTitleColor}; background: ${nightLogoTitleColor};}
    .header1 {color: black;}
    .header2 {color:${dayHeaderColor};}
    .leftbg {background-color: ${dayRightBgColor};}
    .rightbg {background-color: ${dayRightBgColor};} 
    .logo-title {color: ${dayLogoTitleColor};}
    .logo-subtitle1 {color: ${dayLogoSubtitleColor};}
    .logo-subtitle2 {color: ${dayLogoSubtitleColor};}
    .matrix-cell-highlight {background-color: ${dayHeaderColor}; color: white;}
    .matrix-cell-nohighlight {background-color: whitesmoke; color: black;}
    .menu {border: dotted aqua; color: white; background-color: ${dayMilestonesBgColor}; }
    .milestones {backgroundColor: ${dayMilestonesBgColor}}
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
    a {color: #0062a8; text-decoration: none; font-family: 'Trebuchet MS', sans-serif;}
    li > a:hover { font-weight: bold; color: ${dayHeaderColor}; }
    .image {border: 4px solid ${dayHeaderColor};}
    hr {height: 1.0px; border: 1px solid ${dayHeaderColor}; color: ${dayHeaderColor}; background: ${dayHeaderColor};}
    a:hover {color: #0A8808;}
    a.menu {color: ${dayTextColor};} 
  `


  const cssNight = `
    body { background-color: ${nightRightBgColor} }
    .border-glow { border-color: ${nightTermColor} }   
    .border-dull { border-color: darkgray; } 
    .bubble1 { background-color: ${nightDefinitionColor} }
    .bubble2 { background-color: ${nightDefinitionColor} }
    .bubble3 { background-color: ${nightDefinitionColor} }
    #cover { background-color: ${nightRightBgColor} }
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
    .menu {border: dotted white; color: ${nightHeaderColor}; background-color: ${nightDefinitionColor}; }
    .milestones {backgroundColor: ${nightMilestonesBgColor};}
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

  const handleChange = (newStatus) => {
    setChecked(newStatus);
    if (checked) {
      setCss(cssNight);
    } else {
      setCss(cssDay);
    }
  }




  const narrowLayout = (content) => (

    <div className="main-container">
      <style>{css + computeEquationFontSize()}</style>
      <div id={loading ? "cover" : null}/>
      <div className="top-container">
        <Topbar
          checked={checked}
          onChange={handleChange}
        />
      </div>

      <div className="rightbg bottom-container">
        <div className="leftaligned">
          {content}
          <div className="footer">
            <hr className="footer-hr" />
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
      <div className="split left">
        <Sidebar
          checked={checked}
          onChange={handleChange}
        />
      </div>
      <div className="split right rightbg">
        <div className="leftaligned">
          {content}

          <div className="footer">
            <hr className="footer-hr" />
            © mark hopkins, williams college
          </div>
        </div>
      </div>
    </div>
  )

  const autoLayout = (content) => (
    windowSize.width > 1100 ? standardLayout(content) : narrowLayout(content)
  )

  const router = createBrowserRouter([
    {
      path: "cs381/",
      element: <Csci381 />       
    },
    {
      path: "/",
      element: autoLayout(
        <Chapter1 bullet={checked ? dayBullet : nightBullet}
          color1={checked ? dayTextColor : nightTextColor}
          color2={checked ? dayHeaderColor : nightHeaderColor}
          color3={checked ? dayTermColor : nightTermColor}
        />
      )
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