import { useState, useRef, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Slider from '@mui/material/Slider';

const minValue = -1.6;
const maxValue = 2.01;

const inBounds = position => minValue <= position && position <= maxValue;

const generatePoints = (lossFn) => {
  var x_points = []
  var y_points = []
  for (let x = minValue; x < maxValue; x += 0.01) {
    let y = lossFn(x);
    x_points.push(x.toFixed(2))
    y_points.push(y)
  }
  return [x_points, y_points]
}



export default function GradientDescentDemo({ variant, textColor, areaColor, highlightColor }) {

  const [step, setStep] = useState(0);
  const [nextSteps, setNextSteps] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0.0);
  const [nextPosition, setNextPosition] = useState(null);
  const [learningRate, setLearningRate] = useState(0.2);
  const [originalLearningRate, setOriginalLearningRate] = useState(0.2);
  const [momentumRate, setMomentumRate] = useState(variant != "momentum" ? 0.0 : 0.1);
  const [prevStepSize, setPrevStepSize] = useState(0.0);
  const [odometer, setOdometer] = useState(0.0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [showNextMove, setShowNextMove] = useState(false);
  
  const computeLoss = x => {
    if (variant === "momentum") {
      return Math.abs(0.2 * x)
    } else {
      return x ** 4 - 3.0 * x ** 2 - x + 4.0
    }
  }
  const computeDerivative = x => {
    if (variant === "momentum") {
      return x < 0 ? -0.2 : 0.2
    } else {
      return 4.0 * x ** 3 - 6.0 * x - 1
    }
  }
  

  const [pointsX, pointsY] = generatePoints(computeLoss);


  const componentRef = useRef()

  const getFontMultiplier = () => {
    if (!componentRef.current) {
      return 1.0
    } else if (variant === "momentum") {
      return Math.min(1.0, (componentRef.current.offsetWidth) / 1000)
    } else {
      return Math.min(1.0, (componentRef.current.offsetWidth) / 800)
    }
  }

  const getFontSize = (base) => {
    return `${getFontMultiplier() * base}px`
  }

  const momentumRateBounds = [0.0, 2.0];
  const learningRateBounds = [0.0, 0.5];
  const learningRateFlameSize = (
    Math.min(40, 16 + 20 * ((learningRate - learningRateBounds[0]) / (learningRateBounds[1] - learningRateBounds[0])))
  );

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    console.log(componentRef.current.offsetWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); // effect is only run on mount    

  const getNextPosition = () => {
    return (currentPosition 
      - learningRate * computeDerivative(currentPosition)
      + momentumRate * prevStepSize
    )
  }

  const handleLearningRateChange = (event, newValue) => {
    setLearningRate(newValue)
    setOriginalLearningRate(newValue)
    setOdometer(0.0)
  }

  const handleMomentumRateChange = (event, newValue) => {
    setMomentumRate(newValue)
  }


  const handlePositionChange = (event, newValue) => {
    setCurrentPosition(newValue)
    setOdometer(0.0)
    setPrevStepSize(0.0)
  }

  const handleClick = () => {
    if (nextSteps.length == 0) {
      let granularity = 100;
      let current = currentPosition;
      let next = getNextPosition();
      let diff = next - current;
      let steps = [...Array(granularity).keys()].map(number => current + (number / granularity) * diff)
      setNextPosition(getNextPosition())
      setNextSteps(steps);
    }
  }

  const handleMouseEnter = () => {
    setShowNextMove(true);
  }

  const handleMouseLeave = () => {
    setShowNextMove(false);
  }

  const highlightPoint = point => {
    if (nextSteps.length > 0) {
      return Math.abs(nextPosition - point.position) < 0.005;
    } else if (showNextMove) {
      return Math.abs(getNextPosition() - point.position) < 0.005;
    } else {
      return false;
    }
  };

  // handles the animation transitions
  if (nextSteps.length > 0) {
    if (step < nextSteps.length) {
      setTimeout(
        () => {
          setStep(step + 1);
        },
        3) // count down again in 3 milliseconds
    } else {
      setNextSteps([])
      setStep(0)
      if (variant == "adagrad") {
        let newOdometerValue = odometer + computeDerivative(currentPosition) ** 2
        setOdometer(newOdometerValue)
        setLearningRate(originalLearningRate / (0.000001 + Math.sqrt(newOdometerValue)))
      }
      setPrevStepSize(nextPosition-currentPosition)
      setCurrentPosition(nextPosition)
    }
  }

  const getRelativePosition = () => {
    let pos = nextSteps.length > 0 ? nextSteps[step] : currentPosition
    return (100 * ((pos - minValue) / (maxValue - minValue)))
  }

  const tangent = pointsX.map((x, i) => {
    if (currentPosition - 0.1 <= x && x <= currentPosition + 0.1) {
      return pointsY[i];
    }
    return null
  });

  const gradient = computeDerivative(currentPosition)

  const getCurrentPosition = () => (currentPosition >= minValue && currentPosition <= maxValue) ? currentPosition.toFixed(2) : "🪐"
  const createCurrentPositionSlider = () => {
    return (
      <Slider
        aria-label="position"
        value={currentPosition}
        min={-1.6}
        step={0.01}
        max={2.0}
        onChange={handlePositionChange}
      />
    )
  }

  const createLearningRateDisplay = () => {
    return (
      <div>
        <span style={{ fontSize: getFontSize(learningRateFlameSize) }}>🔥</span>
        {learningRate.toFixed(2)}
        <span style={{ fontSize: getFontSize(learningRateFlameSize) }}>🔥</span>
      </div>
    )
  }

  const createLearningRateSlider = () => {
    return (
      <Slider
        aria-label="learning rate"
        value={learningRate}
        min={learningRateBounds[0]}
        step={0.01}
        max={learningRateBounds[1]}
        onChange={handleLearningRateChange}
      />
    )
  }

  const createMomentumRateSlider = () => {
    return (
      <Slider
        aria-label="momentum rate"
        value={momentumRate}
        min={momentumRateBounds[0]}
        step={0.01}
        max={momentumRateBounds[1]}
        onChange={handleMomentumRateChange}
      />
    )
  }

  const noSlider = () => {
    return (
      <div style={{ height: "30px" }}></div>
    )
  }

  const makeQuantityBox = (title, computeQuantity, createSlider) => {
    return (
      <div style={{
        flexGrow: 1,
        flexShrink: 0,
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
          <div style={{ fontSize: getFontSize(40), borderStyle: "solid", padding: "5px" }}>
            {computeQuantity()}
          </div>
          {createSlider()}
        </div>
      </div>
    )
  }

  const makeOperatorBox = operator => {
    return (
      <div style={{
        padding: "5px",
        textAlign: "center",
        fontSize: getFontSize(60)
      }}>{operator}</div>
    )
  }

  const makePlayButton = () => {
    return (
      <div style={{
        flexGrow: 0,
        flexShrink: 0,
        padding: "5px",
        textAlign: "center"
      }}>
        <div style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "stretch",
        }}>
          <div style={{ fontSize: getFontSize(20) }}>NEXT</div>
          <div onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              width: getFontSize(90),
              fontSize: getFontSize(42),
              borderStyle: "solid",
              padding: getFontSize(5),
              color: nextSteps.length > 0 ? textColor : showNextMove ? "chartreuse" : "lightgray",
              backgroundColor: nextSteps.length > 0 ? "inherit" : "darkgreen"
            }}
          >
            {nextSteps.length > 0 ? (inBounds(nextPosition) ? nextPosition.toFixed(2) : "🪐") : "  ▶  "}
          </div>
          <div style={{ height: "30px" }}></div>
        </div>
      </div>
    )
  }

  return (
    <div ref={componentRef} style={{
      color: textColor
    }}>
      <div width="100%">
        <div>
          <Hovercraft
            horizontal={`${getRelativePosition()}%`}
          />
        </div>
        <div>
          <LineChart
            sx={{
              "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                strokeWidth: "0.5",
                fill: textColor
              }
            }}
            title="adagrad"
            leftAxis={null}
            xAxis={[{
              scaleType: 'point',
              data: pointsX,
              tickInterval: time => time == 0 || time == -1 || time == 1,
            }]}
            margin={{ left: 5, right: 0, bottom: 20, top: 20 }}
            series={[
              {
                data: pointsY,
                color: areaColor,
                area: true,
                showMark: highlightPoint,
              },
              {
                data: tangent,
                area: false,
                showMark: false,
                color: highlightColor
              },
            ]}
            height={300}
          />
        </div>
        <div style={{
          paddingTop: "10px",
          fontFamily: "Latin Modern Math, monospace",
          fontWeight: "light",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-evenly",
          alignContent: "flex-start",
          alignItems: "center",
          width: '100%'
        }}>
          {variant === "adagrad" ? 
            <div style={{
              flexGrow: 1,
              flexShrink: 1,
              textAlign: "center"
            }}>
              <Gauge width={100} height={100} value={odometer} /> 
              <div style={{ textAlign: 'center', fontSize: getFontSize(20) }}>ODOMETER</div>
            </div> : null}
          {makeQuantityBox("POSITION", getCurrentPosition, createCurrentPositionSlider)}
          {makeOperatorBox("-")}
          {makeQuantityBox("LEARNING RATE", createLearningRateDisplay, createLearningRateSlider)}
          <div style={{
            padding: "0px",
            textAlign: "center",
            fontSize: getFontSize(40)
          }}>⋅</div>
          {makeQuantityBox("GRADIENT", () => Math.abs(gradient) < 1000 ? gradient.toFixed(2) : "big!", noSlider)}
          {variant === "momentum" ? makeOperatorBox("+") : null}
          {variant === "momentum" ? makeQuantityBox("µ", () => momentumRate.toFixed(1), createMomentumRateSlider) : null}
          {variant === "momentum" ? (
              <div style={{
                padding: "0px",
                textAlign: "center",
                fontSize: getFontSize(40)
              }}>⋅</div>) : null}
          {variant === "momentum" ? makeQuantityBox("PREV", () => Math.abs(prevStepSize) < 10 ? prevStepSize.toFixed(2) : "big!", noSlider) : null}
          {makeOperatorBox("=")}
          {makePlayButton()}
        </div>
      </div>
    </div>
  );
}


function Hovercraft({ horizontal }) {

  return (
    <div style={{
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      alignItems: "flex-start",
      width: '100%'
    }}
    >
      <div style={{
        flexGrow: 0,
        flexShrink: 0,
        width: horizontal
      }}>
      </div>
      <div style={{
        flexGrow: 0,
        flexShrink: 0,
        width: "auto",
        marginLeft: "-20px"
      }}>
        <img src="images/hovercraft.png" width="40" height="40" />
      </div>
      {false ? (
        <div style={{
          color: "hotpink",
          fontSize: "50px",
          flexGrow: 0,
        }}>⇾</div>)
        : <div />}

    </div>
  );
}