import * as Plot from "@observablehq/plot";
import { useEffect, useRef, useState } from "react";


export default function ContourPlot({ handleClick, loss, axisBounds, point, nextStep }) {

  const [plotId, setPlotId] = useState(null);

  const containerRef = useRef();
  const canvasRef = useRef();

  const [x1, x2, y1, y2] = axisBounds;

  const boundingBox = document.getElementById(`plot${plotId}`) ? document.getElementById(`plot${plotId}`).getBoundingClientRect() : null

  const handleMyClick = e => {
    let coords = cartesianCoords(e.clientX, e.clientY);
    handleClick(coords)
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

  // converts component coordinates to cartesian coordinates
  const cartesianCoords = (x, y) => {
    const relativeX = (x - boundingBox.x) / boundingBox.width
    const relativeY = (y - boundingBox.y) / boundingBox.height
    const componentX = (relativeX * (x2 - x1)) + x1
    const componentY = ((1 - relativeY) * (y2 - y1)) + y1
    return [componentX, componentY]
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
      let coords = componentCoords(point[0], point[1])
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      //sometimes a humble square
      let side = 10
      //ctx.fillRect(coords[0] - side / 2, coords[1] - side / 2, side, side)
      //othertimes an exciting hovercraft
      side = 40;
      img.addEventListener("load", () => {
        ctx.drawImage(img, coords[0] - side / 2, coords[1] - side / 2, side, side);
      });
      ctx.beginPath();
      if (nextStep) {
        ctx.moveTo(coords[0], coords[1]);
        let nextCoords = componentCoords(point[0] + nextStep[0], point[1] + nextStep[1])
        canvasArrow(ctx, coords[0], coords[1], nextCoords[0], nextCoords[1])
        ctx.stroke();
      }
    }
  }

  useEffect(() => {
    const plot = Plot.plot({
      color: { type: "diverging" },
      aspectRatio: 1,
      marks: [
        Plot.contour({
          fill: loss,
          stroke: "currentColor",
          x1: x1,
          x2: x2,
          y1: y1,
          y2: y2
        })
      ]
    })
    let randId = Math.floor(Math.random() * 10000000000);
    setPlotId(randId);
    plot.children[5].setAttribute("id", `plot${randId}`)
    containerRef.current.append(plot);
    drawCurrentPosition()
    return () => plot.remove();
  }, []);

  const img = new Image();
  img.src = "images/visiblecraft.png"

  useEffect(() => {
    drawCurrentPosition()
  }, [canvasRef.current, point, nextStep]);

  return (
    <div onClick={handleMyClick} ref={containerRef} style={{
      position: 'relative', /* This makes the container the reference point for absolutely positioned children */
      width: '100%',
      height: 'auto'
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

  );

}
