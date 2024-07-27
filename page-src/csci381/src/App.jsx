import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

import courseData from './csci381.json';

const SlideDeck = ({ title, link }) => {
  return (
    <a href={link} target="_blank">
      <div className="text button" style={{
        color: 'black',
        borderStyle: "solid",
        margin: '2px',
        padding: '2px'
      }}>
        {title}
      </div>
    </a>
  )
}

const BoxTitle = ({ title, color }) => {
  return (
    <div style={{
      fontFamily: "Futura",
      fontSize: "35px",
      color: color,
      paddingTop: "10px",
      fontWeight: "bold"
    }}>
      {title}
    </div>
  )
}

const LectureSlides = () => {

  const colors = ["skyblue", '#EEEEFF']
  const [bgColor, setBgColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor(prevColor => (prevColor === colors[0] ? colors[1] : colors[0]));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  console.log('width', window.innerWidth)

  return (
    <div style={{
      transition: 'background-color 2s linear',
      backgroundColor: bgColor,
      padding: '10px',
      flexGrow: 1,
      flexShrink: 1,
      width: '500px'
    }}>
      
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        height: '100%'
      }}>

        <div style={{
          display: 'flex',
          flexFlow: 'column wrap',
          height: window.innerWidth > 600 ? '680px' : null
        }}>
          {courseData.lectures.map(lecture => (
            <SlideDeck
              key={lecture.id}
              title={lecture.title.toLowerCase()}
              link={lecture.link} />
          ))}
        </div>
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
        <BoxTitle title="lectures" color="navy" />
      </div>
    </div>
  )
}

const CourseInfo = () => {

  const fontColor = "black"

  return (
    <div style={{
      backgroundColor: 'pink',
      padding: '5px',
      flexGrow: 1,
      flexShrink: 1,
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        height: '100%',
        alignContent: 'center',
        fontFamily: 'Futura',
        fontWeight: 'bold',
        fontSize: '20px'
      }}>
        <div style={{ color: fontColor }}>
          <span style={{ fontFamily: "Marker Felt", color: "crimson" }}>where?</span> schow 30b
        </div>
        <div style={{ color: fontColor }}>
          <span style={{ fontFamily: "Marker Felt", color: "crimson" }}>when?</span> mwf 9-950am
        </div>
        <div>
          <span style={{ fontFamily: "Marker Felt", color: "crimson" }}>office hours?</span> w 10-noon
        </div>
        <div>
          <span style={{ fontFamily: "Marker Felt", color: "crimson" }}>office?</span> tcl 307
        </div>
      </div>

    </div>
  )
}

const TeachingAssistant = ({ image, name }) => {
  return (
    <div className="text" style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'stretch'
    }}>
      <img src={image} style={{
        borderStyle: "solid",
        borderColor: "white",
        width: "100px"
      }} />
      <div style={{
        width: "100px"
      }}>
        {name.toLowerCase()}
      </div>
    </div>
  )
}

const TeachingAssistants = () => {

  return (
    <div style={{
      backgroundColor: 'coral',
      padding: '10px',
      flexGrow: 1,
      flexShrink: 1,
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly'
      }}>
        <TeachingAssistant image="images/faulkner.jpeg" name="Michael" />
        <TeachingAssistant image="images/laws.jpeg" name="Matt" />
      </div>
      <BoxTitle title="tas" color="black" />
    </div>
  )
}


const Lab = ({ title, link, due, locked }) => {

  const renderContent = () => {return <div
    className={locked ? "text locked" : "text button"}
    style={{
      borderStyle: "solid",
      margin: '2px',
      padding: '2px',
      color: 'black',
    }}>
    <span>{title}</span> {locked ? '🔒' : null}
  </div>}

  return !locked ? (
      <a href={link} target="_blank">
        {renderContent()}
      </a>
  ) : renderContent()
}

const LabAssignments = () => {

  const colors = ["navy", '#000022']
  const [bgColor, setBgColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor(prevColor => (prevColor === colors[0] ? colors[1] : colors[0]));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      backgroundColor: bgColor,
      padding: '10px',
      flexGrow: 1,
      flexShrink: 1,
      transition: 'background-color 2s linear'
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'stretch',
        height: '100%'
      }}>
        {courseData.labs.map(lab => <Lab key={lab.id} title={lab.title.toLowerCase()} link={lab.link} due={lab.due} locked={lab.locked}></Lab>)}
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
        <BoxTitle title="labs" color="#aaffff" />
      </div>

    </div>
  )
}


const UpcomingItem = ({ description, deadline }) => {
  return (
    <div style={{
      border: "1px solid coral",
      padding: "3px",
    }}>

      <div style={{

        fontFamily: "Futura",
        fontWeight: "bold"
      }}>
        {description.toUpperCase()}
      </div>
      {deadline}
    </div>
  )
}

const getFutureDate = daysAhead => {
  return new Date(Date.now() + daysAhead * 8.64e+7).toDateString()
}

const Upcoming = () => {

  const daysAhead = 0
  const now = new Date(Date.now() + daysAhead * 8.64e+7)
  const labsDueSoon = courseData.labs.filter(lab =>
    now < new Date(lab.due)
  ).slice(0, 3)

  return (
    <div className="upcoming" style={{
      fontSize: "20px",
    }}>
      {labsDueSoon.length > 0 ? "coming up..." : null}
      {labsDueSoon.map(lab => {
        return <UpcomingItem key={lab.id} description={`lab: ${lab.title}`} deadline={lab.due}></UpcomingItem>
      })}
    </div>

  )
}

const Emphasis = (props) => {

  const colors = ["skyblue", "indigo"]
  const [fontColor, setFontColor] = useState(colors[0]);
  let fontSize = 40

  useEffect(() => {
    const interval = setInterval(() => {
      setFontColor(prevFontColor => (prevFontColor === colors[0] ? colors[1] : colors[0]));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      color: fontColor,
      fontFamily: 'Futura',
      fontWeight: 'bold',
      fontSize: `${fontSize}px`,
      transition: 'color 2s linear'
    }}>
      {props.children}
    </div>
  );
};


const Welcome = () => {


  return (
    <div className="welcome" style={{
      fontSize: "40px",
      width: "200px",
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        gap: '20px',
        justifyContent: "space-around",
        height: '100%',
      }}>
        <div>
          <div>hello</div>
          <div style={{ fontSize: "16px" }}>welcome to</div>
          <Emphasis>381</Emphasis>
        </div>
        <div style={{ fontSize: "20px" }}>
          an introduction to deep learning, presented to you without interruption<sup>†</sup> by <span style={{ fontWeight: 'bold', color: '#6667AB' }}>mark hopkins</span> and <span style={{ fontWeight: 'bold', color: '#6667AB' }}>williams college</span>
        </div>
        <Upcoming />
        <div style={{ fontSize: "10px" }}><sup>†</sup> except for holidays and thanksgiving break and mountain day and any unforeseen emergencies</div>
      </div>
    </div>

  )
}


function App() {
  const [count, setCount] = useState(0)



  return (
    <div style={{
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      gap: '20px',
      height: 'auto',
    }}>
      <Welcome />
      <div style={{
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'stretch',
        gap: '20px',
        height: 'auto',
        width: '320px',
      }}>
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          flexGrow: 1,
          flexShrink: 1,
          justifyContent: 'stretch',
          gap: '20px',
          height: 'auto',
        }}>
          <CourseInfo />
          <TeachingAssistants />
        </div>
        <LabAssignments />
      </div>
      <LectureSlides />
    </div>
  )
}



export default App