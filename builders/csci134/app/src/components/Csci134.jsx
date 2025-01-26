import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from "react-router-dom";
import courseData from './csci134.json';


const UpcomingItem = ({ description, deadline, border }) => {
  return (
    <div style={{
      border: "coral",
      padding: "3px",
    }}>

      <div className="csci134-upcoming">
        {description.toUpperCase()}
      </div>
      <div className="csci134-upcoming" style={{color: "#F8E067"}}>
        {deadline}
      </div>
      
    </div>
  )
}

const getFutureDate = daysAhead => {
  return new Date(Date.now() + daysAhead * 8.64e+7).toDateString()
}

const Upcoming = () => {

  const daysAhead = 0
  const now = new Date(Date.now() + daysAhead * 8.64e+7)
  const assignments = courseData.quizzes.concat(courseData.labs).concat(courseData.readings).sort((lab1, lab2) => new Date(lab1.due) - new Date(lab2.due))

  const labsDueSoon = assignments.filter(lab =>
    now <= new Date(lab.due)
  ).slice(0, 3)

  return (
    <div className="upcoming" style={{
      fontSize: "20px",
    }}>
      {labsDueSoon.length > 0 ? "coming up..." : null}
      {labsDueSoon.length > 0 ? 
        <UpcomingItem 
          key={labsDueSoon[0].id} 
          description={`${labsDueSoon[0].id.split('-')[0]}: ${labsDueSoon[0].title}`} deadline={labsDueSoon[0].due}
        >
        </UpcomingItem> : null} 
        {labsDueSoon.length > 1 ? 
        <UpcomingItem 
          key={labsDueSoon[1].id} 
          description={`${labsDueSoon[1].id.split('-')[0]}: ${labsDueSoon[1].title}`} deadline={labsDueSoon[1].due}
          border="1px solid orange"
        >
        </UpcomingItem> : null}
        {labsDueSoon.length > 2 ? 
        <UpcomingItem 
          key={labsDueSoon[2].id} 
          description={`${labsDueSoon[2].id.split('-')[0]}: ${labsDueSoon[2].title}`} deadline={labsDueSoon[2].due}
          border="1px solid orange"
        >
        </UpcomingItem> : null}      
    </div>

  )
}

const Emphasis = (props) => {

  const colors = ["skyblue", "blue"]
  const [fontColor, setFontColor] = useState(colors[0]);
  let fontSize = 40

  useEffect(() => {
    const interval = setInterval(() => {
      setFontColor(prevFontColor => (prevFontColor === colors[0] ? colors[1] : colors[0]));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="csci134-course-number" style={{
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
    <div className="csci134-welcome" style={{
      fontSize: "40px",
      width: "200px"
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        gap: '20px',
        justifyContent: "space-around",
        height: '100%',
      }}>
        <img src="images/cookiemonster.png" />
        <div>
          <div>hello</div>
          <div style={{ fontSize: "16px" }}>welcome to</div>
          <Emphasis>134</Emphasis>
          <div style={{ fontSize: "16px" }}>
          an introduction to computer science
          <br></br>
          <span className="csci134-textlink" style={{fontSize: '26px'}}><a className="csci134-textlink" href="https://docs.google.com/document/d/1GZV2lnWXe-CkDdvNDZRMgENnicuhT-EEjW3T1HYRgZQ/edit?usp=sharing" target="_blank">
            (syllabus)
          </a></span>
         
        </div>
        </div>
        
        
        <Upcoming />
      </div>
    </div>

  )
}


const TeachingAssistant = ({ image, name, hours, where }) => {
  return (
    <div className="csci134-text" style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'stretch',
      fontSize: '14px'
    }}>
      <img src={image} style={{
        borderStyle: "solid",
        borderColor: "white",
        width: "100px"
      }} />
      <div style={{
        width: "100px",
        fontWeight: "bold",
        fontSize: "29px"
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
    <div className="csci134-colorblock" style={{
      backgroundColor: '#CC5F30'
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'stretch',
        height: '100%'
      }}>
        <BoxTitle title="help hours" color="#FFC590" />
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-evenly'
        }}>
          
          <TeachingAssistant
            image="images/laura.jpg"
            name="Laura"
            hours="thu 130-330pm"
            where="cs common room"
          />
          <TeachingAssistant
            image="images/lida.jpg"
            name="Lida"
            hours="wed, thu 1-3pm"
            where="cs common room"
          />
          <TeachingAssistant
            image="images/mark.png"
            name="Mark"
            hours="wed, thu 2-4pm"
            where="cs common room"
          />
          <TeachingAssistant
            image="images/beaker.png"
            name="tas"
            hours="sun-thu 7-9pm"
            where="mac lab"
          />
        </div>
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>        
      </div>
    </div>
  )
}






const BoxTitle = ({ title, color }) => {
  return (
    <div className="csci134-subtitle" style={{
      fontSize: "35px",
      color: color
    }}>
      {title}
    </div>
  )
}

const SlideDeck = ({ title, index, link, locked }) => {
  const renderContent = () => {
    return <div
      className={locked ? "csci134-text csci134-locked" : "csci134-text csci134-button"}
      style={{
        borderStyle: "solid",
        margin: '2px',
        padding: '2px',
        color: 'black',
      }}>
      <span>{index+1}. {title}</span> {locked ? '🔒' : null}
    </div>
  }

  return !locked ? (
    <a href={link} target="_blank">
      {renderContent()}
    </a>
  ) : renderContent()
}

const LectureSlides = () => {

  return (
    <div className="csci134-colorblock" style={{
      backgroundColor: "#226622",
      flexGrow: 6
    }}>
      <BoxTitle title="lectures" color="#ccffcc" />
      <div style={{ flexGrow: 1, flexShrink: 1 }}></div>        
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'stretch',
        alignItems: 'stretch',
      }}>

        <div style={{
          display: 'flex',
          flexFlow: 'column wrap',
          gap: '5px',
          height: window.innerWidth > 800 ? '700px' : null
        }}>
          {courseData.lectures.map((lecture, index) => (
            <SlideDeck
              key={lecture.id}
              index={index}
              title={lecture.title.toLowerCase()}
              link={lecture.link}
              locked={lecture.locked} />
          ))}
        </div>
        
      </div>
    </div>
  )
}

const Activities = () => {

  return (
    <div className="csci134-colorblock" style={{
      backgroundColor: '#442244'
    }}>

      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'stretch',
        alignItems: 'stretch',
      }}>
        <BoxTitle title="activities" color="#ffccff" />
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>          
        <div style={{
          display: 'flex',
          flexFlow: 'column wrap',
          gap: '5px',
          height: window.innerWidth > 800 ? '600px' : null
        }}>
          {courseData.activities.map((activity, index) => (
            <SlideDeck
              key={activity.id}
              index={index}
              title={activity.title.toLowerCase()}
              link={activity.link}
              locked={activity.locked} />
          ))}
        </div>
        
      </div>
    </div>
  )
}


const Lab = ({ title, index, link, due, locked }) => {

  const renderContent = () => {
    return <div
      className={locked ? "csci134-text csci134-locked" : "csci134-text csci134-button"}
      style={{
        borderStyle: "solid",
        margin: '2px',
        padding: '2px',
        color: 'black',
      }}>
      <span>{index}. {title}</span> {locked ? '🔒' : null}
    </div>
  }

  return !locked ? (
    <a href={link} target="_blank">
      {renderContent()}
    </a>
  ) : renderContent()
}

const LabAssignments = () => {

  return (
    <div className="csci134-colorblock" style={{
      backgroundColor: "navy"
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'column wrap',
        gap: '5px',
        justifyContent: 'stretch',
        alignContent: 'stretch',
        height: '100%'
      }}>
        <BoxTitle title="labs" color="#aaffff" />
        {courseData.labs.map((lab, index) => <Lab key={lab.id} index={index} title={lab.title.toLowerCase()} link={lab.link} due={lab.due} locked={lab.locked}></Lab>)}
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>        
      </div>
    </div>
  )
}

const Video = ({ title, link, due, locked }) => {

  const renderContent = () => {
    return <div
      className={locked ? "csci134-text csci134-locked" : "csci134-text csci134-button"}
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

const Videos = () => {

  return (
    <div className="csci134-colorblock" style={{
      backgroundColor: "darkred"
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'stretch',
        height: '100%'
      }}>
        <BoxTitle title="videos" color="#ff8888" />
        {courseData.videos.map(lab => <Video key={lab.id} title={lab.title.toLowerCase()} link={lab.link} due={lab.due} locked={lab.locked}></Video>)}
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
        
      </div>

    </div>
  )
}



function Csci134() {

  if (window.innerWidth > 1300) {
    return (
      <div>
        <div className="csci134" style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          gap: '20px',
          height: 'auto',
          paddingBottom: '20px'
        }}>
          <Welcome />
          <div style={{
            flexGrow: 1,
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'stretch',
            gap: '20px',
            height: 'auto'
          }}>
            <div style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: 'stretch',
              gap: '20px'
            }}>
              <Videos />
              <TeachingAssistants />
            </div>
            <div style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: 'stretch',
              gap: '20px'
            }}>
              <LabAssignments />
              <LectureSlides />
            </div>

          </div>
          
        </div>
        <div className="csci134" style={{
          marginTop: '0px',
          paddingTop: '0px'
        }}>
            <Activities />
            

        </div>
      </div>

    )
  } else {
    return (
      <div>
        <div className="csci134" style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          gap: '20px',
          height: 'auto',
          paddingBottom: '20px'
        }}>
          <Welcome />
          <div style={{
            flexGrow: 1,
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'stretch',
            gap: '20px',
            height: 'auto'
          }}>
            <div style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: 'stretch',
              gap: '20px'
            }}>
              <LabAssignments />              
            </div>

          </div>
          
        </div>
        <div className="csci134" style={{
          marginTop: '0px',
          paddingTop: '0px'
        }}>
          <TeachingAssistants />
        </div>
        <div className="csci134" style={{
          marginTop: '0px',
          paddingTop: '0px'
        }}>
          <Videos />
        </div>
        <div className="csci134" style={{
          marginTop: '0px',
          paddingTop: '0px'
        }}>
          <LectureSlides />
        </div>
        <div className="csci134" style={{
          marginTop: '0px',
          paddingTop: '0px'
        }}>
          
            <Activities />
            

        </div>
      </div>

    )
  }
}



export default Csci134
