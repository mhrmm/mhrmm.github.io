import { useState, useRef, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Slider from '@mui/material/Slider';

const minValue = -1.6;
const maxValue = 2.01;

const inBounds = position => minValue <= position && position <= maxValue;

const generatePoints = () => {
  var x_points = []
  var y_points = []
  for (let x = minValue; x < maxValue; x += 0.01) {
    let y = (x ** 4 - 3.0 * x ** 2 - x + 4.0)
    x_points.push(x.toFixed(2))
    y_points.push(y)
  }
  return [x_points, y_points]
}

const computeDerivative = x => {
  return 4.0 * x ** 3 - 6.0 * x - 1
}

export default function AdagradDemo({ variant, textColor, areaColor, highlightColor }) {

  const [step, setStep] = useState(0);
  const [nextSteps, setNextSteps] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0.0);
  const [nextPosition, setNextPosition] = useState(false);
  const [learningRate, setLearningRate] = useState(0.2);
  const [originalLearningRate, setOriginalLearningRate] = useState(0.2);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [showNextMove, setShowNextMove] = useState(false);
  const [odometer, setOdometer] = useState(0.0);


  const sliderRef = useRef()

  const [pointsX, pointsY] = generatePoints();


  const componentRef = useRef()

  const getFontMultiplier = () => {
    if (!componentRef.current) {
      return 1.0
    } else {
      return Math.min(1.0, (componentRef.current.offsetWidth) / 800)
    }
  }

  const getFontSize = (base) => {
    return `${getFontMultiplier() * base}px`
  }

  const learningRateBounds = [0.0, 0.3];
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
    return currentPosition - learningRate * computeDerivative(currentPosition)
  }

  const handleLearningRateChange = (event, newValue) => {
    setLearningRate(newValue)
    setOriginalLearningRate(newValue)
    setOdometer(0.0)
  }


  const handlePositionChange = (event, newValue) => {
    setCurrentPosition(newValue)
    setOdometer(0.0)
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
      if(variant == "adagrad") {
        let newOdometerValue = odometer + computeDerivative(currentPosition)**2
        setOdometer(newOdometerValue)
        setLearningRate(originalLearningRate / (0.000001 + Math.sqrt(newOdometerValue)))
      }
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
              tickInterval: (time) => time == 0 || time == -1 || time == 1,

            }]}
            yAxis={[{

              tickInterval: false,

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
          paddingTop: "20px",
          fontFamily: "Latin Modern Math, monospace",

          fontWeight: "light",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "space-around",
          alignContent: "flex-start",
          alignItems: "center",
          width: '100%',
          gap: getFontSize(10)
        }}>
          <div style={{
            flexGrow: 0,
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
              <div style={{ fontSize: getFontSize(20) }}>POSITION</div>
              <div style={{ fontSize: getFontSize(40), borderStyle: "solid", padding: "5px" }}>
                {(currentPosition >= minValue && currentPosition <= maxValue) ? currentPosition.toFixed(2): "🪐"}
              </div>
              <Slider
                aria-label="position"
                value={currentPosition}
                min={-1.6}
                step={0.01}
                max={2.0}
                onChange={handlePositionChange}
              />
            </div>
          </div>
          <div style={{
            padding: "5px",
            textAlign: "center",
            fontSize: getFontSize(60)
          }}>+</div>
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
              alignItems: "stretch"
            }}>
              <div style={{ fontSize: getFontSize(20) }}>LEARNING RATE</div>
              <div style={{ fontSize: getFontSize(40), borderStyle: "solid", padding: "5px" }}>
                <span style={{ fontSize: getFontSize(learningRateFlameSize) }}>🔥</span>
                {learningRate.toFixed(4)}
                <span style={{ fontSize: getFontSize(learningRateFlameSize) }}>🔥</span>
              </div>
              <Slider
                ref={sliderRef}
                aria-label="learning rate"
                value={learningRate}
                min={learningRateBounds[0]}
                step={0.01}
                max={learningRateBounds[1]}
                onChange={handleLearningRateChange}
              />
            </div>

          </div>
          <div style={{
            padding: "5px",
            textAlign: "center",
            fontSize: getFontSize(60)
          }}>×</div>
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
              <div style={{ fontSize: getFontSize(20) }}>GRADIENT</div>
              <div style={{ fontSize: getFontSize(40), borderStyle: "solid", padding: "5px" }}>
                {Math.abs(gradient) < 1000 ? gradient.toFixed(2) : "big"}
              </div>
              <div style={{ height: "30px" }}></div>
            </div>
          </div>
          <div style={{
            padding: "5px",
            textAlign: "center",
            fontSize: getFontSize(60)
          }}>=</div>
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