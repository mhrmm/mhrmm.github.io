import { useState, useEffect, useRef, useLayoutEffect } from "react";

const ProofWalkthru = ({marker, title, children}) => {

  const [countdown, setCountdown] = useState(0);
  const [step, setStep] = useState(0)
  const [prelude, setPrelude] = useState(true)
  const [highlightResetButton, setHighlightResetButton] = useState(false)
  const [highlightBackButton, setHighlightBackButton] = useState(false)
  const [highlightForwardButton, setHighlightForwardButton] = useState(false)
  const [bootup, setBootup] = useState(true)
  const [stepFontSizes, setStepFontSizes] = useState([])
  const [windowSize, setWindowSize] = useState([0, 0]);

  const containerRef = useRef(null);
  const stepsRef = useRef([]); // you can access the elements with stepsRef.current[n]

  const steps = children.map(child => child.props.children[0])
  const justifications = children.map(child => child.props.children[1])

  const spacerHeight = 115; // TODO: should depend on content
    

  const startTimer = () => setCountdown(spacerHeight);

  // resets the walkthru
  const resetAll = () => {
    setStep(0);
    setPrelude(true);
    setHighlightResetButton(false);
  }

  const atProofStart = () => step == 0 && prelude;
  const atProofEnd = () => step == steps.length;

  const handleClick = () => {
    if (countdown == 0 && step + 1 <= steps.length) {
      if (step == 0) {
        setStep(1);
        setPrelude(true);
      } else if (step == 1) {
        setStep(2);
        setPrelude(false);
      } else if (prelude) {
        setPrelude(!prelude)
      } else if (step + 1 <= steps.length) {
        startTimer();
      }
    }
  }

  const handleBackClick = () => {
    if (countdown == 0 && step > 0) {
      if (step == 1) {
        setStep(0);
        setPrelude(true);
      } else if (step == 2) {
        setStep(1);
        setPrelude(true);
      } else if (prelude) {
        setStep(step - 1);
        setPrelude(!prelude)
      } else {
        setPrelude(!prelude)
      }
    }
  }

  const getResetButtonStatus = () => {
    if (atProofStart()) {
      return "proof-navigation-arrow proof-inactive";
    } else if (highlightResetButton) {
      return "proof-navigation-arrow proof-highlight";
    } else {
      return "proof-navigation-arrow";
    }
  }

  const getBackButtonStatus = () => {
    if (atProofStart()) {
      return "proof-navigation-arrow proof-inactive";
    } else if (highlightBackButton) {
      return "proof-navigation-arrow proof-highlight";
    } else {
      return "proof-navigation-arrow";
    }
  }

  const getForwardButtonStatus = () => {
    if (atProofEnd()) {
      return "proof-navigation-arrow proof-inactive";
    } else if (highlightForwardButton) {
      return "proof-navigation-arrow proof-highlight";
    } else {
      return "proof-navigation-arrow";
    }
  }

  const getWalkthruBarStatus = () => {
    if (atProofEnd()) {
      return "proof-walkthru-bar";
    } else if (highlightForwardButton) {
      return "proof-walkthru-bar proof-highlight";
    } else {
      return "proof-walkthru-bar";
    }
  }

  const computeFontSize = (step) => {
    let size = 20;
    if (!bootup && containerRef.current) {
      let ratio = (containerRef.current.offsetWidth / stepFontSizes[step])   
      size = Math.min(30, 0.9 * ratio * size)
    }
    return `${size}px`
  }

  const renderTopBar = () => {
    let upperLeft = title ? <div className="proof-header">{title}</div> : renderFirstStep();
    return (
      <div className="proof-walkthru-topbar">
        {upperLeft}
        <div className={getResetButtonStatus()}
          onClick={resetAll}
          onMouseEnter={() => setHighlightResetButton(true && !atProofStart())}
          onMouseLeave={() => setHighlightResetButton(false)}
        >
          ↩
        </div>
        <div className={getBackButtonStatus()}
          onClick={handleBackClick}
          onMouseEnter={() => setHighlightBackButton(true && !atProofStart())}
          onMouseLeave={() => setHighlightBackButton(false)}
        >
          ←
        </div>
        <div
          className={getForwardButtonStatus()}
          onClick={handleClick}
          onMouseEnter={() => setHighlightForwardButton(true && !atProofEnd())}
          onMouseLeave={() => setHighlightForwardButton(false)}
          style={{
            paddingRight: "0px"
          }}>
          →
        </div>
      </div>)
  }

  const renderFirstEquals = () => {
    if (countdown == 0) {
      return (
        <div className="proof-equals">
          {marker}
        </div>
      )
    } else {
      return <div></div>
    }

  }

  
  const renderFirstSpacer = () => {
    if (countdown == 0) {
      return (
        <div className="spacer" style={{
          height: `${spacerHeight}px`
        }}></div>
      )
    } else {
      return (
        <div className="spacer" style={{
          width: "99%",
          height: `${countdown}` + "px"
        }}></div>
      )
    }
  }

  const renderSecondSpacer = () => {
    if (step < steps.length) {
      return (
        <div className="spacer" style={{
          height: `${spacerHeight}px`
        }}></div>
      )
    } else {
      <div></div>
    }
  }

  const renderThirdSpacer = () => {
    if (countdown > 0) {
      if (step + 1 < steps.length) {
        return (
          <div className="spacer" style={{
            width: "100%",
            height: `${spacerHeight - countdown}px`
          }}></div>
        )
      } else {
        return (
          <div className="spacer" style={{
            width: "100%",
            height: "0px"
          }}></div>
        )
      }
    } else {
      return (
        <div></div>
      )
    }
  }

  const renderFirstStep = () => {
    return (
      <div className="proof-step-first"
        style={{
          fontSize: computeFontSize(0),
          width: title ? "100%" : "inherit"
        }}>
        {steps[0]}
      </div>
    )
  }
  
  const renderPreviousStep = () => {
    let prevStep = (step === 1 ? 1 : step - 1)
    if (countdown == 0) {
      return (
        <div className="proof-step-prev"
          style={{
            fontSize: computeFontSize(prevStep)
          }}
        > 
          {step > 0 ? (step === 1 ? steps[1] : steps[step - 1]) : ""}          
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  const renderNextStep = () => {
    if (step < steps.length) {
      return (
        <div className="proof-step"
          style={{
            fontSize: computeFontSize(step)
          }}
        >
          {!prelude && step > 1 ? steps[step] : ""}
        </div>
      )
    } else {
      return <div />
    }
  }

  useEffect(() => {
    resetAll();
  }, [])

  // this effect fires once to create the step references
  useEffect(() => {
    stepsRef.current = stepsRef.current.slice(0, steps.length);
  }, [steps]);

  // this effect fires once to compute the base equation font size
  useEffect(() => {
    if (bootup) {
      setStepFontSizes(stepsRef.current.map(item => {
        let width = item.offsetWidth;
        return width
      }))
      setBootup(false)
    }
  }, [stepsRef.current]);

  useLayoutEffect(() => {
    function updateSize() {
      setWindowSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // handles the animation transitions
  if (countdown > 0) {
    setTimeout(
      () => {
        setCountdown(countdown - 1);
        if (countdown - 1 == 0) {
          setStep(step + 1);
          setPrelude(true);
        }
      },
      3) // count down again in 3 milliseconds
  }

  if (bootup) {
    let contents = steps.map((step, i) => (
      <div className="proof-step-next-contents"
        key={i}
        ref={el => stepsRef.current[i] = el} >
        {step}
      </div>
    ));
    return (
      <div className="proof-step-next">{contents}</div>
    )
  } else {

    return (
      <div className={"text textcolor" + (atProofEnd() ? " border-glow" : " border-dull") + " definition"}>
        {renderTopBar()}
        <div className="proof-walkthru" ref={containerRef}>
          {title ? renderFirstStep() : <div />}
          {renderFirstEquals()}
          {renderFirstSpacer()}
          {renderPreviousStep()}
          {<div className="proof-equals">
            {step >= 2 && step < steps.length ? marker : ""}
          </div>}
          {renderSecondSpacer()}
          {renderNextStep()}
          {renderThirdSpacer()}
        </div>
        {!title && step == steps.length ? <div /> : (
        <div className={getWalkthruBarStatus()}
          onClick={handleClick}
          onMouseEnter={() => setHighlightForwardButton(true)}
          onMouseLeave={() => setHighlightForwardButton(false)}
        >
          <div className="proof-justification">
            {step == steps.length ? "💥 quod erat demonstrandum 💥" : (step > 1 && !prelude ? justifications[step] : (step == 1 ? justifications[1] : "..."))}
          </div>                   
          <div className="proof-spacer" style={{
            height: "50px"
          }}></div>
        </div>)}
      </div>
    );
  }

};


export default ProofWalkthru;
