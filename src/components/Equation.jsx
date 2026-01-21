import { useState, useEffect, useRef, React } from 'react'




const Equation = (props) => {

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [bootup, setBootup] = useState(true);
  const [originalContentWidth, setOriginalContentWidth] = useState(null);
  const containerRef = useRef();
  const eqRef = useRef();

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }   
    setOriginalContentWidth(eqRef.current.offsetWidth)
    window.addEventListener("resize", handleResize);
    setBootup(false)
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // effect is only run on mount    

  const computeFontSize = () => {
    let fontSize = "20px"
    if (!bootup) {      
      let ratio = containerRef.current.offsetWidth / originalContentWidth;      
      fontSize = `${Math.min(36, Math.floor(0.9*ratio * 20))}px`
    }   
    return fontSize; 
  }

  return (
    <div ref={containerRef} width="100%">
      <div className="equation" >
        <div className="equation-contents" ref={eqRef} style={{
            fontSize: `${computeFontSize()}`
        }}>
          {props.children}
        </div>
      </div>
    </div>
  )
};

export default Equation;