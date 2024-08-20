import * as Plot from "@observablehq/plot";
import { useEffect, useRef, useState } from "react";
import Slider from '@mui/material/Slider';


export default function Contour({ variant, textColor, areaColor, highlightColor }) {
  const [point, setPoint] = useState([-2.5, 1.2])
  const [learningRate, setLearningRate] = useState(0.2);
  const [momentumRate, setMomentumRate] = useState(0.0);
  const [playButtonActive, setPlayButtonActive] = useState(false);
  const [prevStepSize, setPrevStepSize] = useState([0.0, 0.0]);
  const [plotId, setPlotId] = useState(null);

  const containerRef = useRef();
  const canvasRef = useRef();
  
  const lossFunction = {
    'a': (x, y) => -((x / 5) ** 2 + y ** 2 - 1),
    'b': (x, y) => -((.72*x + .06*y - 20)**2 + (.34*x + .25*y - 28)**2 + (.17*x + .57*y - 41)**2)
  }
  const lossDerivativeX = {
    'a': (x, _) => 2 * (x / 25),
    'b': (x, y) => (1.33*x + .45*y - 61.8)
  }

  const lossDerivativeY = {
    'a': (_, y) => 2 * y,
    'b': (x, y) => .45*x + .78*y - 63.1
  }
  const peaks = lossFunction.b
  const peaksDerivativeX = lossDerivativeX.b
  const peaksDerivativeY = lossDerivativeY.b

  //const [x1, x2, y1, y2] = [-3.2, 0, -1, 1.5];
  const [x1, x2, y1, y2] = [-100, 200, -40, 160];


  const learningRateBounds = [0.0, 1.0];
  const learningRateFlameSize = (
    Math.min(40, 16 + 20 * ((learningRate - learningRateBounds[0]) / (learningRateBounds[1] - learningRateBounds[0])))
  );
  const momentumRateBounds = [0.0, 0.5];

  const getFontMultiplier = () => {
    if (!containerRef.current) {
      return 1.0
    } else {
      return Math.min(1.0, (containerRef.current.offsetWidth) / 800)
    }
  }

  const getFontSize = (base) => {
    return `${getFontMultiplier() * base}px`
  }

  
  
  // try to take these derivatives!
  const moreFunPeaks = (x, y) =>
    10 * (y / 5 - y ** 3 - x ** 5) * Math.exp(-y * y - x * x) +
    (1 / 3) * Math.exp(-x * x - (y + 1) ** 2) -
    3 * (1 - y) ** 2 * Math.exp(-y * y - (x + 1) ** 2)

  

  const computeNextStep = (x, y) => {
    let deltaX = -learningRate * peaksDerivativeX(x, y) + momentumRate * prevStepSize[0]
    let deltaY = -learningRate * peaksDerivativeY(x, y) + momentumRate * prevStepSize[1]
    return [deltaX, deltaY]
  }

  const gradientDescentStep = () => {
    if (point) {
      const [x, y] = point
      let [deltaX, deltaY] = computeNextStep(x, y)
      let nextX = x + deltaX
      let nextY = y + deltaY
      setPrevStepSize([deltaX, deltaY])
      setPoint([nextX, nextY])
      //setCountdown(10)
      //setTimeout(drawCurrentPosition, 100)

      //let deltaX = -learningRate * peaksDerivativeX(x, y)
      //let deltaY = -learningRate * peaksDerivativeY(x, y)
      //let steps = [...Array(framesPerTransition).keys()].map(frame =>
      //  [x + (frame / framesPerTransition) * deltaX,
      //  y + (frame / framesPerTransition) * deltaY]
      //)
      //setTransitions(steps)
      //setCountdown(steps.length)
      //console.log('steps', steps)

    }
  }

  const boundingBox = document.getElementById(`plot${plotId}`) ? document.getElementById(`plot${plotId}`).getBoundingClientRect() : null

  // converts component coordinates to cartesian coordinates
  const cartesianCoords = (x, y) => {
    const relativeX = (x - boundingBox.x) / boundingBox.width
    const relativeY = (y - boundingBox.y) / boundingBox.height
    const componentX = (relativeX * (x2 - x1)) + x1
    const componentY = ((1 - relativeY) * (y2 - y1)) + y1
    return [componentX, componentY]
  }

  // converts cartesian coordinates to component coordinates
  const componentCoords = (x, y) => {
    if (boundingBox) {
      const containerBbox = canvasRef.current.getBoundingClientRect()
      const upperLeftX = (boundingBox.x - containerBbox.x)
      const upperLeftY = (boundingBox.y - containerBbox.y)
      const relativeX = (x - x1) / (x2 - x1)
      const relativeY = 1 - ((y - y1) / (y2 - y1))
      const cartesianX = upperLeftX + (relativeX * boundingBox.width)
      const cartesianY = upperLeftY + (relativeY * boundingBox.height)
      return [cartesianX, cartesianY]
    } else {
      return [0, 0]
    }
  }

  const canvasArrow = (context, fromx, fromy, tox, toy) => {
    let headlen = 10; // length of head in pixels
    let dx = tox - fromx;
    let dy = toy - fromy;
    let angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }

  const drawCurrentPosition = () => {
    if (canvasRef.current) {
      let canvas = canvasRef.current
      const ctx = canvas.getContext("2d");
      let side = 10
      let coords = componentCoords(point[0], point[1])
      let [deltaX, deltaY] = computeNextStep(point[0], point[1])
      let nextCoords = componentCoords(point[0] + deltaX, point[1] + deltaY)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      //sometimes just a humble square
      ctx.fillRect(coords[0] - side / 2, coords[1] - side / 2, side, side)
      //img.addEventListener("load", () => {
      //  ctx.drawImage(img, coords[0] - side / 2, coords[1] - side / 2, side, side);
      //  console.log("promise kept")
      //});

      ctx.save()
      ctx.beginPath();
      ctx.moveTo(coords[0], coords[1]);
      canvasArrow(ctx, coords[0], coords[1], nextCoords[0], nextCoords[1])

      ctx.stroke();
      ctx.restore()





    }
  }

  useEffect(() => {
    const plot = Plot.plot({
      color: { type: "diverging" },
      aspectRatio: 1,
      marks: [
        Plot.contour({
          fill: peaks,
          stroke: "currentColor",
          x1: x1,
          x2: x2,
          y1: y1,
          y2: y2
        })
      ]
    })
    setPoint([-2.5, 1.2])
    let randId = Math.floor(Math.random() * 10000000000);
    setPlotId(randId);
    plot.children[5].setAttribute("id", `plot${randId}`)
    containerRef.current.append(plot);    
    return () => plot.remove();
  }, []);

  const handleContourClick = e => {
    const relativeX = (e.clientX - boundingBox.x)
    const relativeY = (e.clientY - boundingBox.y)
    if (
      0 <= relativeX
      && relativeX <= boundingBox.width
      && 0 <= relativeY
      && relativeY <= boundingBox.height
    ) {
      setPoint(cartesianCoords(e.clientX, e.clientY))
      setPrevStepSize([0.0, 0.0])
    }
  }

  const img = new Image();
  img.src = "images/visiblecraft.png"

  useEffect(() => {
    drawCurrentPosition()
  }, [point]);

  const makePlayButton = () => {
    return (
      <div style={{
        flexGrow: 0,
        flexShrink: 0,
        width: '100%',
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
          <div onClick={() => gradientDescentStep()}
            onMouseEnter={() => setPlayButtonActive(true)}
            onMouseLeave={() => setPlayButtonActive(false)}
            style={{
              fontSize: getFontSize(42),
              borderStyle: "solid",
              borderColor: playButtonActive ? "chartreuse" : "darkgreen",
              padding: getFontSize(5),
              color: playButtonActive ? "chartreuse" : "darkgreen",
              backgroundColor: "darkgray"
            }}
          >
            {"▶"}
          </div>

        </div>
      </div>
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
        onChange={(event, newValue) => {
          setLearningRate(newValue);
          drawCurrentPosition();
        }}
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
        onChange={(event, newValue) => {
          setMomentumRate(newValue);
          drawCurrentPosition();
        }}
      />
    )
  }

  const makeQuantityBox = (title, computeQuantity, createSlider) => {
    return (
      <div style={{
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
          <div style={{ fontSize: getFontSize(40), borderStyle: "solid", padding: "5px" }}>
            {computeQuantity()}
          </div>
          {createSlider()}
        </div>
      </div>
    )
  }

  const renderSidebar = () => {
    if (variant === "gd") {
      return (<div style={{
        width: '20%',
        height: 'auto',
        padding: '20px'
      }}>
        <div style={{
          width: '100%', /* Make the element fill the container */
          height: '100%', /* Make the element fill the container */
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center'
        }}>
          {makeQuantityBox("LEARNING RATE", createLearningRateDisplay, createLearningRateSlider)}
          {makeQuantityBox("MOMENTUM RATE", () => momentumRate.toFixed(1), createMomentumRateSlider)}
          <div style={{
            height: 'auto',
            flexGrow: 1,
            flexShrink: 1
          }} />
          {makePlayButton()}
        </div>
      </div>)
    } else {
      return null
    }
  }

  return (
    <div style={{
      display: 'flex'
    }}>
      <div onClick={handleContourClick} ref={containerRef} style={{
        position: 'relative', /* This makes the container the reference point for absolutely positioned children */
        width: variant === "gd" ? '80%' : '100%',
        height: 'auto',
        //border: '1px solid #000', 
      }}>
        <div style={{
          position: 'absolute', /* This positions the elements absolutely within the container */
          top: 0,
          left: 0,
          width: '100%', /* Make the element fill the container */
          height: '100%', /* Make the element fill the container */
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}>
          <canvas ref={canvasRef} height={containerRef.current ? containerRef.current.offsetHeight : 0} width={containerRef.current ? containerRef.current.offsetWidth : 0}>
          </canvas>
        </div>
      </div>
      {renderSidebar()}

    </div>
  );

}
