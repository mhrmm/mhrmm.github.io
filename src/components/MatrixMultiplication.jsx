import { useEffect, useRef, useState } from "react";


const MatrixCell = ({ id, row, col, value, width, height, className, onHover, style }) => {

  const trueHeight = height ? height : width
  const fontSize = trueHeight / 2.2;
  const formattedValue = Number(value).toFixed(1).replace(/[.,]0$/, "");

  return (
    <div
      className={className}
      onMouseEnter={() => onHover(id, row, col)}
      style={{
        ...style,
        fontSize: `${fontSize}px`,
        width: `${width}px`,
        height: `${trueHeight}px`,
        textAlign: "center"
      }}>
      <div className="vcenter">
        {formattedValue}
      </div>
    </div>
  )
}

function Matrix({ id, values, width, onHover, colorMap }) {

  const numCols = values.length > 0 ? values[0].length : 0;
  const colWidth = Math.floor(width / numCols);

  return (
    <div>
      {values.map((row, i) =>
        <div style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "stretch",
          gap: "1px"
        }}>
          {row.map((value, j) => (
            <MatrixCell
              id={id}
              row={i}
              col={j}
              value={value}
              width={colWidth}
              onHover={onHover}
              className={colorMap(i, j)}
            />)
          )}
        </div>
      )}
    </div>
  )

}

const WeightedSum = ({weights, values, width}) => {

  const operator = (op, width) => (
    <div><div className="vcenter" style={{
      width: `${width}px`,
      textAlign: 'center',
      fontSize: '30px',
    }}>{op}</div></div>
  )

  const widthSpacer = (width) => (
    <div style={{
      width: `${width}px`,
    }}></div>
  )

  const heightSpacer = (height) => (
    <div style={{
      height: `${height}px`,
    }}></div>
  )

  const sum = (
    weights[0] * values[0] + weights[1] * values[1] + weights[2] * values[2]
  )

  const cell = (value, width, height, colorMap) => {
    return (
      <MatrixCell
        id='top'
        row={0}
        col={0}
        value={value}
        width={width}
        height={height}
        onHover={() => { }}
        className={colorMap ? colorMap(0, 0) : ""}
      />
    )
  }
  
  return (
    <div style={{
      textAlign: "center",
      width: {width},
      backgroundColor: "#222222",
      border: "dotted 2px gold",
      paddingTop: "20px",
      paddingBottom: "20px"
    }}>
      <div style={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignContent: "center"
      }}>
        {widthSpacer(50)}
        {cell(weights[0], 50, 50, (i, j) => {return "mm-weight-0"})}
        {operator('×', 50)}
        {cell(values[0], 50, 50, (i, j) => {return "mm-value-0"})}
        {operator('+', 50)}
        {cell(weights[1], 50, 50, (i, j) => {return "mm-weight-1"})}
        {operator('×', 50)}
        {cell(values[1], 50, 50, (i, j) => {return "mm-value-1"})}
        {operator('+', 50)}
        {cell(weights[2], 50, 50, (i, j) => {return "mm-weight-2"})}
        {operator('×', 50)}
        {cell(values[2], 50, 50, (i, j) => {return "mm-value-2"})}
      </div>
      {heightSpacer(10)}
      <div style={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "stretch"
      }}>
        {operator('=', 50)}
        {cell(weights[0] * values[0], 150, 50, (i, j) => {return "mm-weight-0"})}
        {operator('+', 50)}
        {cell(weights[1] * values[1], 150, 50, (i, j) => {return "mm-weight-1"})}
        {operator('+', 50)}
        {cell(weights[2] * values[2], 150, 50, (i, j) => {return "mm-weight-2"})}
      </div>
      {heightSpacer(10)}
      <div style={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "stretch"
      }}>
        {operator('=', 50)}
        {cell(sum, 550, 50, (i, j) => {return "mm-dot-product"})}
      </div>
    </div>
  )
}


export default function MatrixMultiplication(style) {

  const containerRef = useRef();

  const [containerWidth, setContainerWidth] = useState(
    containerRef.current ? containerRef.current.offsetWidth : 0.7 * window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(
        containerRef.current ? containerRef.current.offsetWidth : 0.7 * window.innerWidth
      );
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [highlightRow, setHighlightRow] = useState(0)
  const [highlightCol, setHighlightCol] = useState(0)

  const labeledMatrixStyle = {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "stretch",
    textAlign: "center",
    fontSize: "30px"
  }

  const matrixA = (
    [[.2, .3, .5],
    [.2, 0, .8]]
  )

  const matrixB = (
    [[80, 90, 96],
    [95, 80, 90],
    [90, 70, 92]]
  )



  const matrixAColorMap = (i, j) => {
    if(i == highlightRow) {
      return `mm-weight-${j}`
    } else {
      return `mm-basic`
    }
  }

  const matrixBColorMap = (i, j) => {
    if(j == highlightCol) {
      return `mm-value-${i}`
    } else {
      return `mm-basic`
    }
  }

  const matrixCColorMap = (i, j) => {
    if(i== highlightRow && j == highlightCol) {
      return `mm-dot-product`
    } else {
      return `mm-basic`
    }
  }

 
  const handleHover = (id, row, col) => {
    console.log('hover', id, row, col)
    if (id === 'matrix-AB') {
      setHighlightRow(row)
      setHighlightCol(col)
    }
  }


  const getRowVector = (a, i) => {
    return a[i]
  }

  const getColVector = (b, j) => {
    return b.map(row => row[j])
  }

  const computeDotProduct = (v, w) => {
    let products = v.map((x, i) => x * w[i])
    return products.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
  }

  const computeMatrixProduct = (a, b) => {
    const rows = a.length;
    const columns = b.length > 0 ? b[0].length : 0;
    let result = Array(rows)
      .fill()
      .map(() => Array(columns).fill(0));
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        result[i][j] = computeDotProduct(getRowVector(a, i), getColVector(b, j)).toFixed(1)
      }
    }
    return result
  }


  

  return (
    <div>
    <div ref={containerRef} className="image" style={{
      backgroundColor: "#333333",
      color: "white"
    }}>
      <div style={{
        padding: '20px',
      }}>
        <WeightedSum 
          weights={matrixA[highlightRow]}
          values={matrixB.map(row => row[highlightCol])}
          width={containerWidth}
        />
      </div>
      <div style={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "stretch",
        width: containerWidth
      }}>
        <div style={labeledMatrixStyle}>

          <div style={{ padding: "20px" }}>
            <Matrix
              id="matrix-A"
              values={matrixA}
              width={containerWidth / 4}
              onHover={handleHover}
              colorMap={matrixAColorMap}
            />
          </div>
          <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
          <div style={{ paddingLeft: "20px", paddingRight: "20px", height: "1px", backgroundColor: "black" }}></div>
          <div style={{ padding: "20px" }}>A</div>
        </div>
        <div style={labeledMatrixStyle}>

          <div style={{ padding: "20px" }}>
            <Matrix
              id="matrix-B"
              values={matrixB}
              width={containerWidth / 4}
              onHover={handleHover}
              colorMap={matrixBColorMap}
            />
          </div>
          <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
          <div style={{ paddingLeft: "20px", paddingRight: "20px", height: "1px", backgroundColor: "black" }}></div>
          <div style={{ padding: "20px" }}>B</div>
        </div>
        <div style={labeledMatrixStyle}>
          <div style={{ padding: "20px" }}>
            <Matrix
              id="matrix-AB"
              values={computeMatrixProduct(matrixA, matrixB)}
              width={containerWidth / 4}
              onHover={handleHover}
              colorMap={matrixCColorMap}
            />
          </div>
          <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
          <div style={{ paddingLeft: "20px", paddingRight: "20px", height: "1px", backgroundColor: "black" }}></div>
          <div style={{ padding: "20px" }}>AB</div>
        </div>
      </div>
    </div>
    </div>
  )
}