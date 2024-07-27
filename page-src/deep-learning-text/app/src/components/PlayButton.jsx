import { useEffect, useRef, useState } from "react";

export default function PlayButton({ onClick }) {
  const [playButtonActive, setPlayButtonActive] = useState(false);
  const containerRef = useRef();

  const getFontMultiplier = () => {
    if (!containerRef.current) {
      return 1.0
    } else {
      return Math.min(1.0, (containerRef.current.offsetWidth) / 200)
    }
  }

  const getFontSize = (base) => {
    return `${getFontMultiplier() * base}px`
  }

  return (
    <div ref={containerRef} style={{
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
        <div onClick={onClick}
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
