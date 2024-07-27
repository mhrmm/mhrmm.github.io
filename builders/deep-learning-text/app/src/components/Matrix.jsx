import { useEffect, useRef, useState } from "react";


export default function Matrix({ values }) {

  const [value, setValue] = useState(values);
  const cellRefs = values.map(value => useRef());


  useEffect(() => {
    setValue(values)
  }, [values])

  const handleCellMouseEnter = event => {
    console.log('enter', event.target)
  }

  const createCell = value => {
    return (
      <div onMouseEnter={handleCellMouseEnter} style={{
        flexGrow: 0,
        flexShrink: 0,
        borderStyle: "solid",
        width: '100%',
        padding: 2,
        textAlign: "center"
      }}>{value}</div>
    )
  }

  const createColumn = columnValues => {
    return (
      <div style={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "flex-start",
        alignContent: "center",
        alignItems: "stretch",
      }}>
       {columnValues.map(value => createCell(value))}
      </div>
    )
  }

  return (
    createColumn(values)
  )

}
