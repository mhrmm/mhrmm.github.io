import { useEffect, useRef, useState } from "react";
import ContourPlot from './ContourPlot'
import Matrix from './Matrix'


export default function ContourExplorer() {
  const [point, setPoint] = useState([-2.5, 1.2])
  const [learningRate, setLearningRate] = useState(0.2);
  const [momentumRate, setMomentumRate] = useState(0.0);
  const [prevStepSize, setPrevStepSize] = useState([0.0, 0.0]);

  const containerRef = useRef();


  const lossFunction = (x, y) => {
    return -((.72 * x + .06 * y - 20) ** 2 + (.34 * x + .25 * y - 28) ** 2 + (.17 * x + .57 * y - 41) ** 2)
  }
  const lossGradient = (x, y) => {
    return [1.33 * x + .45 * y - 61.8, .45 * x + .78 * y - 63.1]
  }

  const [x1, x2, y1, y2] = [-100, 200, -40, 160];



  const computeNextStep = (x, y) => {
    let [gradX, gradY] = lossGradient(x, y)
    let deltaX = -learningRate * gradX + momentumRate * prevStepSize[0]
    let deltaY = -learningRate * gradY + momentumRate * prevStepSize[1]
    return [deltaX, deltaY]
  }


  const handleContourPlotClick = e => {
    let [x, y] = e
    setPoint([x, y])
    setPrevStepSize([0.0, 0.0])
  }

  const renderInfoBar = () => {
    return (<div style={{
      width: '100%',
      height: 'auto',
      padding: '10px'
    }}>
      <div style={{
        width: '100%', /* Make the element fill the container */
        height: '100%', /* Make the element fill the container */
        display: 'flex',
        flexFlow: 'row nowrap',
        fontFamily: 'Latin Modern Math',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
      }}>
        <div style={{
          height: 'auto',
          fontSize: '30px',
          flexGrow: 1,
          flexShrink: 1,
          textAlign: 'center'
        }}>
          l(
        </div>  
        <Matrix values={point.map(v => v.toFixed(2))}></Matrix>   
        <div style={{
          height: 'auto',
          fontSize: '30px',
          flexGrow: 1,
          flexShrink: 1,
          textAlign: 'center'
        }}>
          ) =
        </div> 
        <div style={{
          height: 'auto',
          fontSize: '30px',
          flexGrow: 1,
          flexShrink: 1,
          textAlign: 'center'
        }}>
          {-lossFunction(point[0], point[1]).toFixed(2)}
        </div> 
        
      </div>
    </div>)
  }

  return (
    <div ref={containerRef} style={{
      display: 'flex',
      flexFlow: 'row nowrap'
    }}>
      <ContourPlot
        handleClick={handleContourPlotClick}
        loss={lossFunction}
        lossGradient={lossGradient}
        axisBounds={[x1, x2, y1, y2]}
        point={point}
        nextStep={null}
      />
      {renderInfoBar()}
    </div>
  );

}
