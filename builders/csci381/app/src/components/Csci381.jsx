import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from "react-router-dom";
import courseData from './csci381.json';


const UpcomingItem = ({ description, deadline }) => {
  return (
    <div style={{
      border: "1px solid coral",
      padding: "3px",
    }}>

      <div className="csci381-upcoming">
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
  const assignments = courseData.labs.concat(courseData.readings).sort((lab1, lab2) => new Date(lab1.due) - new Date(lab2.due))

  const labsDueSoon = assignments.filter(lab =>
    now < new Date(lab.due)
  ).slice(0, 3)

  return (
    <div className="upcoming" style={{
      fontSize: "20px",
    }}>
      {labsDueSoon.length > 0 ? "coming up..." : null}
      {labsDueSoon.map(lab => {
        return <UpcomingItem key={lab.id} description={`${lab.id.split('-')[0]}: ${lab.title}`} deadline={lab.due}></UpcomingItem>
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
    <div className="csci381-course-number" style={{
      color: fontColor,
      fontSize: `${fontSize}px`,
      transition: 'color 2s linear'
    }}>
      {props.children}
    </div>
  );
};

const Welcome = () => {

  return (
    <div className="csci381-welcome" style={{
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
        <div style={{ fontSize: "16px" }}>
          an introduction to deep learning, presented to you without
          interruption<sup>†</sup> by <span className="csci381-textlink"><a className="csci381-textlink" href="http://markandrewhopkins.com/" target="_blank">mark
            hopkins</a></span> and <span className="csci381-textlink"><a className="csci381-textlink" href="http://www.williams.edu" target="_blank">williams
              college</a></span>
        </div>
        <Link to={{ pathname: `/dlamp1` }}>
          <div className="csci381-dlamp-promo">
            <div style={{
              display: 'flex',
              fontSize: '20pt',
              flexFlow: 'row nowrap',
              justifyContent: "space-around",
              alignContent: "center",
              alignItems: "center"
            }}>
              <img src="images/deep_learning_logo.png" width="70" />
              <div style={{
                display: 'flex',
                fontSize: '18pt',
                flexFlow: 'column nowrap',
                justifyContent: "space-around",
              }}>
                <div className="dlamp-logo-title" style={{ fontSize: '12pt', color: 'black' }}>deep learning:</div>
                <div className="dlamp-logo-subtitle" style={{ fontSize: '10pt' }}>a mathematical primer</div>
              </div>
            </div>
            <div className="csci381-subtitle" style={{ color: 'navy' }}>textbook</div>
          </div>
        </Link>
        <Upcoming />
        <div style={{ fontSize: "10px" }}><sup>†</sup> except for holidays and thanksgiving break and mountain day and any unforeseen emergencies</div>
      </div>
    </div>

  )
}



const SlideDeck = ({ title, link }) => {
  return (
    <a href={link} target="_blank">
      <div className="csci381-text csci381-button" style={{
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

const QuizItem = ({ title, link, locked }) => {
  return (
    <a href={link} target="_blank" style={{
      flexGrow: 1,
      flexShrink: 1,
    }}>
      <div className="csci381-text csci381-button" style={{
        color: 'black',
        borderStyle: "solid",
        margin: '2px',
        padding: '2px',
        width: '100%'
      }}>
        {title}
      </div>
    </a>
  )
}

const BoxTitle = ({ title, color }) => {
  return (
    <div className="csci381-subtitle" style={{
      fontSize: "35px",
      color: color
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


const Quizzes = () => {

  const colors = ["skyblue", '#EEEEFF']
  const [bgColor, setBgColor] = useState(colors[0]);

  return (
    <div style={{
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
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          gap: '5px'
        }}>
          {courseData.quizzes.map(quiz => (
            <QuizItem
              key={quiz.id}
              title={quiz.title.toLowerCase()}
              link={quiz.link}
              locked={quiz.locked} />
          ))}
        </div>
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
        <BoxTitle title="quizzes" color="navy" />
      </div>
    </div>
  )
}

const CourseInfo = () => {

  const fontColor = "black"

  return (
    <div style={{
      backgroundColor: 'pink',
      flexGrow: 1,
      flexShrink: 1,
      padding: '10px'
    }}>
      <div className="csci381-subtitle vcenter" style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
      }}>
        <div style={{ color: fontColor }}>
          <span className="csci381-question">where?</span> schow 30b
        </div>
        <div style={{ color: fontColor }}>
          <span className="csci381-question">when?</span> mwf 9-950am
        </div>
        <div style={{ color: fontColor }}>
          <span className="csci381-question">office hours?</span> w 10-noon
        </div>
        <div style={{ color: fontColor }}>
          <span className="csci381-question">office?</span> tcl 307
        </div>
        <div style={{ color: fontColor }}>
          <span className="csci381-question">
            syllabus?
          </span>
          <span> </span>
          <a
            className="csci381-textlink"
            href="https://drive.google.com/file/d/1fH8O449CQaVsnAvYG4BWw-FzCfdoaYzG/view?usp=sharing"
            target="_blank"
          >
            here
          </a>
        </div>
      </div>

    </div>
  )
}

const TeachingAssistant = ({ image, name, hours, where }) => {
  return (
    <div className="csci381-text" style={{
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
        width: "100px",
        fontWeight: "bold"
      }}>
        {name.toLowerCase()}
      </div>
      <div>
        {hours.toLowerCase()}
      </div>
      <div>
        {where.toLowerCase()}
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
        flexFlow: 'column nowrap',
        justifyContent: 'stretch',
        height: '100%'
      }}>
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
        <div style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-evenly'
        }}>
          <TeachingAssistant
            image="images/laws.jpeg"
            name="Matt"
            hours="mon, tue 8-10pm"
            where="tcl 312 (back lab)"
          />
          <TeachingAssistant
            image="images/faulkner.jpeg"
            name="Michael"
            hours="wed, thu 7-9pm"
            where="tcl 312 (back lab)"
          />
        </div>
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
        <BoxTitle title="tas" color="black" />
      </div>
    </div>
  )
}


const Lab = ({ title, link, due, locked }) => {

  const renderContent = () => {
    return <div
      className={locked ? "csci381-text csci381-locked" : "csci381-text csci381-button"}
      style={{
        borderStyle: "solid",
        margin: '2px',
        padding: '2px',
        color: 'black',
      }}>
      <span>{title}</span> {locked ? '🔒' : null}
    </div>
  }

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


function Csci381() {

  return (
    <div className="csci381" style={{
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
      <div style={{
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'stretch',
        gap: '20px',
        height: 'auto',
        width: '320px',
      }}>
        <LectureSlides />
        <Quizzes />
      </div>
    </div>
  )
}



export default Csci381
