import { useRef } from 'react';

export default function Prologue({ title, image, intro1, intro2, intro3 }) {

  const containerRef = useRef();

  const getFontMultiplier = () => {
    if (!containerRef.current) {
      return 1.0
    } else {
      let multiplier = containerRef.current.offsetWidth / 800
      return Math.min(1.0, multiplier)
    }
  }

  const getFontSize = (base) => {
    let fontSize = Math.max(14, getFontMultiplier() * base)
    return `${fontSize}px`
  }
  const currentWidth = containerRef.current ? containerRef.current.offsetWidth : 800

  const bubbleStyle = {
    fontSize: getFontSize(20),
    padding: '15px',
    flexGrow: '1',
    flexShrink: '1',
    borderStyle: 'dotted'
  }

  const bubble1StyleNarrow = {
    ...bubbleStyle,
    marginTop: "10px", marginRight: "20px", alignSelf: 'flex-start',
  }

  const bubble1StyleWide = {
    ...bubbleStyle,
    marginBottom: "20px", alignSelf: 'flex-start',
  }

  const bubble2StyleNarrow = {
    ...bubbleStyle,
    marginLeft: "20px", alignSelf: 'flex-start',
  }

  const bubble2StyleWide = {
    ...bubbleStyle,
    marginTop: "10px", marginBottom: "10px", alignSelf: 'center',
  }

  const bubble3StyleNarrow = {
    ...bubbleStyle,
    marginLeft: "10px", marginRight: "10px", alignSelf: 'flex-start',
  }

  const bubble3StyleWide = {
    ...bubbleStyle,
    marginTop: "20px", alignSelf: 'flex-end',
  }

  const bubbleLayoutStyle = {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "stretch",
    gap: '10px',
    alignContent: "center",
    alignItems: "stretch",
  }

  const bubbleLayoutStyleNarrow = {
    display: "flex",
    flexFlow: "column nowrap",
    gap: '10px',
    justifyContent: "stretch",
    alignContent: "center",
    alignItems: "stretch",
  }

  return (
    <div ref={containerRef} style={{
      flexGrow: 0,
      flexShrink: 0,
      width: '100%',
      textAlign: "center"
    }}>
      <div style={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        alignContent: "stretch",
        alignItems: "stretch",
      }}>
        <div className="dlamp-prologue-header textcolor" style={{
          fontSize: getFontSize(45),
          padding: "15px",
          flexGrow: '1',
          flexShrink: '1',
          alignSelf: 'center',
          width: '50%'
        }}>
          {title}
        </div>
        <div style={{
          flexGrow: '1',
          flexShrink: '1',
          width: '50%'
        }}>
          <img className="dlamp-image" src={image} alt="title image" />
        </div>
      </div>

      <div style={currentWidth < 600 ? bubbleLayoutStyleNarrow : bubbleLayoutStyle}>

        <div
          className="bubble1 dlamp-prologue-bubble"
          style={currentWidth < 600 ? bubble1StyleNarrow : bubble1StyleWide}
        >
          {intro1}
        </div>
        <div
          className="bubble2 dlamp-prologue-bubble"
          style={currentWidth < 600 ? bubble2StyleNarrow : bubble2StyleWide}
        >
          {intro2}
        </div>
        <div
          className="bubble3 dlamp-prologue-bubble"
          style={currentWidth < 600 ? bubble3StyleNarrow : bubble3StyleWide}
        >
          {intro3}
        </div>
      </div>
    </div>
  )

}
