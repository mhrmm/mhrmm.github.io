import { useEffect, useRef, useState } from "react";
import ContourPlot from './ContourPlot'
import Meter from './Meter'
import PlayButton from './PlayButton'


export default function FollowTheFold() {
  const [point, setPoint] = useState([-2.0, 0.4])
  const [learningRate, setLearningRate] = useState(1.0);
  const [momentumRate, setMomentumRate] = useState(0.0);
  const [prevStepSize, setPrevStepSize] = useState([0.0, 0.0]);

  const containerRef = useRef();

  const lossFunction = (x, y) => -((x / 5) ** 2 + y ** 2 - 1)
  const lossGradient = (x, y) => [2 * (x / 25), 2 * y]
  const [x1, x2, y1, y2] = [-3.2, 0, -1, 1.5];

  const computeNextStep = (x, y) => {
    let [gradX, gradY] = lossGradient(x, y)
    let deltaX = -learningRate * gradX + momentumRate * prevStepSize[0]
    let deltaY = -learningRate * gradY + momentumRate * prevStepSize[1]
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
    }
  }

  const handleContourPlotClick = e => {
    let [x, y] = e
    setPoint([x, y])
    setPrevStepSize([0.0, 0.0])
  }

  useEffect(() => {
    setPoint([-1.6, 0.55])
  }, []);

  const renderSidebar = () => {
      return (<div style={{
        width: '25%',
        height: 'auto',
        padding: '10px'
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
          <Meter onChange={newValue => setLearningRate(newValue)} title="LEARNING RATE" initial={1.0} bounds={[0.0, 1.0]} step={0.01} aria-label="learning-rate" />
          <Meter onChange={newValue => setMomentumRate(newValue)} title="MOMENTUM RATE" initial={0.0} bounds={[0.0, 0.5]} step={0.01} aria-label="momentum-rate" />
          <div style={{
            height: 'auto',
            flexGrow: 1,
            flexShrink: 1
          }} />
          <PlayButton onClick={() => gradientDescentStep()}></PlayButton>          
        </div>
      </div>)
    } 

  
  return (
    <div ref={containerRef} style={{
      display: 'flex'
    }}>
      <ContourPlot
        handleClick={handleContourPlotClick}
        loss={lossFunction}
        lossGradient={lossGradient}
        axisBounds={[x1, x2, y1, y2]}
        point={point}
        nextStep={computeNextStep(point[0], point[1])}
      />
      {renderSidebar()}
    </div>
  );

}
