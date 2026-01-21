import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import courseData from "./csci134.json";

const UpcomingItem = ({ description, deadline, border }) => {
  return (
    <div
      style={{
        border: "coral",
        padding: "3px",
      }}
    >
      <div className="csci134-upcoming">{description.toUpperCase()}</div>
      <div className="csci134-upcoming" style={{ color: "#F8E067" }}>
        {deadline}
      </div>
    </div>
  );
};

const getFutureDate = (daysAhead) => {
  return new Date(Date.now() + daysAhead * 8.64e7).toDateString();
};

const Upcoming = () => {
  const daysAhead = 0;
  const now = new Date(Date.now() + daysAhead * 8.64e7);
  const assignments = courseData.quizzes
    .concat(courseData.labs)
    .concat(courseData.readings)
    .sort((lab1, lab2) => new Date(lab1.due) - new Date(lab2.due));

  const labsDueSoon = assignments
    .filter((lab) => now <= new Date(lab.due))
    .slice(0, 3);

  return (
    <div
      className="upcoming"
      style={{
        fontSize: "20px",
      }}
    >
      {labsDueSoon.length > 0 ? "coming up..." : null}
      {labsDueSoon.length > 0 ? (
        <UpcomingItem
          key={labsDueSoon[0].id}
          description={`${labsDueSoon[0].id.split("-")[0]}: ${labsDueSoon[0].title}`}
          deadline={labsDueSoon[0].due}
        ></UpcomingItem>
      ) : null}
      {labsDueSoon.length > 1 ? (
        <UpcomingItem
          key={labsDueSoon[1].id}
          description={`${labsDueSoon[1].id.split("-")[0]}: ${labsDueSoon[1].title}`}
          deadline={labsDueSoon[1].due}
          border="1px solid orange"
        ></UpcomingItem>
      ) : null}
      {labsDueSoon.length > 2 ? (
        <UpcomingItem
          key={labsDueSoon[2].id}
          description={`${labsDueSoon[2].id.split("-")[0]}: ${labsDueSoon[2].title}`}
          deadline={labsDueSoon[2].due}
          border="1px solid orange"
        ></UpcomingItem>
      ) : null}
    </div>
  );
};

const Emphasis = (props) => {
  const colors = ["skyblue", "blue"];
  const [fontColor, setFontColor] = useState(colors[0]);
  let fontSize = 40;

  useEffect(() => {
    const interval = setInterval(() => {
      setFontColor((prevFontColor) =>
        prevFontColor === colors[0] ? colors[1] : colors[0],
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="csci134-course-number"
      style={{
        color: fontColor,
        fontSize: `${fontSize}px`,
        transition: "color 2s linear",
      }}
    >
      {props.children}
    </div>
  );
};

const Welcome = () => {
  return (
    <div
      className="csci134-welcome welcome"
      style={{
        fontSize: "50px",
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
      }}
    >
      <img
        style={{ maxHeight: "200px", width: "auto" }}
        src="images/cookiemonster.png"
      />
      <div
        style={{
          alignContent: "center",
        }}
      >
        <div>welcome to 134</div>
        <div style={{ fontSize: "20px", color: "aqua" }}>
          an introduction to computer science
        </div>
      </div>

      <TeachingAssistants />
    </div>
  );
};

const TeachingAssistant = ({ image, name, hours, hours2, where }) => {
  return (
    <div
      className="csci134-subtitle"
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "stretch",
        fontSize: "14px",
      }}
    >
      <img
        src={image}
        style={{
          borderStyle: "solid",
          borderColor: "white",
          width: "100px",
        }}
      />
      <div
        style={{
          width: "100px",
          fontWeight: "bold",
          fontSize: "29px",
        }}
      >
        {name.toLowerCase()}
      </div>
      <div>{hours.toLowerCase()}</div>
      {hours2 ? <div>{hours2.toLowerCase()}</div> : <div></div>}
      <div>{where.toLowerCase()}</div>
    </div>
  );
};

const TeachingAssistants = () => {
  return (
    <div
      className="csci134-colorblock"
      style={{
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "stretch",
          height: "100%",
        }}
      >
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-evenly",
          }}
        >
          <TeachingAssistant
            image="images/jeannie.jpg"
            name="Jeannie"
            hours="thu 130-330pm"
            where="tcl 305"
          />
          <TeachingAssistant
            image="images/lida.jpg"
            name="Lida"
            hours="wed 130-3pm"
            where="tcl 301"
          />
          <TeachingAssistant
            image="images/mark.png"
            name="Mark"
            hours="wed 2-4pm"
            where="tcl 307"
          />
          <TeachingAssistant
            image="images/beaker.png"
            name="tas"
            hours2="wed-thu 4-6pm"
            hours="mon-thu 7-10pm"
            where="tcl 216/217"
          />
        </div>
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
      </div>
    </div>
  );
};

const BoxTitle = ({ title, color }) => {
  return (
    <div
      className="csci134-subtitle"
      style={{
        fontSize: "35px",
        color: color,
      }}
    >
      {title}
    </div>
  );
};

const Activity = ({ title, index, link, release }) => {
  const now = new Date(Date.now());
  const locked = release ? now <= new Date(release) : true;

  const renderContent = () => {
    return (
      <div
        className={
          locked ? "csci134-text csci134-locked" : "csci134-text csci134-button"
        }
        style={{
          borderStyle: "solid",
          margin: "2px",
          padding: "2px",
          color: "black",
        }}
      >
        <span>
          {index + 1}. {title}
        </span>{" "}
        {locked ? "🔒" : null}
      </div>
    );
  };

  return !locked ? (
    <a href={link} target="_blank">
      {renderContent()}
    </a>
  ) : (
    renderContent()
  );
};

const LectureSlides = () => {
  return (
    <div
      className="csci134-colorblock"
      style={{
        backgroundColor: "#226622",
        flexGrow: 6,
      }}
    >
      <BoxTitle title="lectures" color="#ccffcc" />
      <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "stretch",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "column wrap",
            gap: "5px",
            height: window.innerWidth > 800 ? "700px" : null,
          }}
        >
          {courseData.lectures.map((lecture, index) => (
            <SlideDeck
              key={lecture.id}
              index={index}
              title={lecture.title.toLowerCase()}
              link={lecture.link}
              release={lecture.release}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Activities = () => {
  return (
    <div
      className="csci134-colorblock"
      style={{
        backgroundColor: "#442244",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "stretch",
          alignItems: "stretch",
        }}
      >
        <BoxTitle title="activities" color="#ffccff" />
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
        <div
          style={{
            display: "flex",
            flexFlow: "column wrap",
            gap: "5px",
            height: window.innerWidth > 800 ? "600px" : null,
          }}
        >
          {courseData.activities.map((activity, index) => (
            <Activity
              key={activity.id}
              index={index}
              title={activity.title.toLowerCase()}
              link={activity.link}
              release={activity.release}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Lab = ({ title, index, link, due, release }) => {
  const now = new Date(Date.now());
  const locked = release ? now <= new Date(release) : true;

  const renderContent = () => {
    return (
      <div
        className={
          locked ? "csci134-text csci134-locked" : "csci134-text csci134-button"
        }
        style={{
          borderStyle: "solid",
          margin: "2px",
          padding: "2px",
          color: "black",
        }}
      >
        <span>
          {index}. {title}
        </span>{" "}
        {locked ? "🔒" : null}
      </div>
    );
  };

  return !locked ? (
    <a href={link} target="_blank">
      {renderContent()}
    </a>
  ) : (
    renderContent()
  );
};

const LabAssignments = () => {
  return (
    <div
      className="csci134-colorblock"
      style={{
        backgroundColor: "navy",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column wrap",
          gap: "5px",
          justifyContent: "stretch",
          alignContent: "stretch",
          height: "100%",
        }}
      >
        <BoxTitle title="labs" color="#aaffff" />
        {courseData.labs.map((lab, index) => (
          <Lab
            key={lab.id}
            index={index}
            title={lab.title.toLowerCase()}
            link={lab.link}
            due={lab.due}
            release={lab.release}
          ></Lab>
        ))}
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
      </div>
    </div>
  );
};

const WeekItem = ({ title }) => {
  const renderContent = () => {
    return (
      <div
        className={"csci134-text csci134-locked"}
        style={{
          borderStyle: "solid",
          margin: "2px",
          padding: "2px",
          color: "black",
          alignContent: "center",
        }}
      >
        <span>{title}</span>
      </div>
    );
  };

  return renderContent();
};

const LabAssignment = ({ type, title, link, release }) => {
  const now = new Date(Date.now());
  const locked = release ? now <= new Date(release) : true;

  const renderContent = () => {
    return (
      <div
        className={
          locked
            ? "csci134-lab-text csci134-locked"
            : "csci134-lab-text csci134-button"
        }
        style={{
          border: "5px solid #000044",
          margin: "0",
          padding: "2px",
          color: "black",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          alignContent: "center",
        }}
      >
        <span>{title}</span>
      </div>
    );
  };

  return !locked ? (
    <a href={link} target="_blank">
      {renderContent()}
    </a>
  ) : (
    renderContent()
  );
};

const SlideDeck = ({ type, title, link, release }) => {
  const now = new Date(Date.now());
  const locked = release ? now <= new Date(release) : true;
  const iconMap = {
    lecture: "👨‍🏫",
    activity: "✍️",
    kahoot: "🏆",
    holiday: "🏖️",
    quiz: "💪",
  };

  const icon = iconMap[type] ?? "";

  const renderContent = () => {
    return (
      <div
        className={
          locked ? "csci134-text csci134-locked" : "csci134-text csci134-button"
        }
        style={{
          borderStyle: "solid",
          margin: "2px",
          padding: "2px",
          color: "black",
        }}
      >
        <span>
          {icon} {title}
        </span>{" "}
        {locked ? "🔒" : null}
      </div>
    );
  };

  return !locked ? (
    <a href={link} target="_blank">
      {renderContent()}
    </a>
  ) : (
    renderContent()
  );
};

const Schedule = () => {
  const columnProportions = "1fr 2fr 2fr 2fr 2fr";
  const startMonday = new Date(2026, 1, 9); // Feb is month 1 (0-based!)

  const weeks = [];

  for (let week = 1; week <= 20; week++) {
    const monday = new Date(startMonday);
    monday.setDate(startMonday.getDate() + (week - 1) * 7);

    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    weeks.push({
      week,
      monday,
      friday,
    });
  }

  return (
    <div
      className="csci134-colorblock"
      style={{
        backgroundColor: "#000044",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "stretch",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columnProportions,
          }}
        >
          <div className="csci134-schedule-header">week</div>
          <div className="csci134-schedule-header">lab</div>
          <div className="csci134-schedule-header">mon</div>
          <div className="csci134-schedule-header">wed</div>
          <div className="csci134-schedule-header">fri</div>
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "stretch",
            height: "100%",
          }}
        >
          {courseData.schedule.map((week) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: columnProportions,
              }}
            >
              <WeekItem
                title={`${weeks[week.week - 1].monday.toDateString().toLowerCase()} – ${weeks[week.week - 1].friday.toDateString().toLowerCase()}`}
              />

              <LabAssignment
                type={week.lab.type}
                title={week.lab.title}
                link={week.lab.link}
                release={week.lab.release}
              />
              <div
                style={{
                  display: "flex",
                  flexFlow: "column nowrap",
                  justifyContent: "stretch",
                  height: "100%",
                }}
              >
                {week.mon.map((content) => (
                  <SlideDeck
                    type={content.type}
                    title={content.title}
                    link={content.link}
                    release={content.release}
                  />
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column nowrap",
                  justifyContent: "stretch",
                  height: "100%",
                }}
              >
                {week.wed.map((content) => (
                  <SlideDeck
                    type={content.type}
                    title={content.title}
                    link={content.link}
                    release={content.release}
                  />
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column nowrap",
                  justifyContent: "stretch",
                  height: "100%",
                }}
              >
                {week.fri.map((content) => (
                  <SlideDeck
                    type={content.type}
                    title={content.title}
                    link={content.link}
                    release={content.release}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Information = () => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-around",
        gap: "20px",
        height: "auto",
        padding: "10px",
        borderStyle: "solid",
      }}
    >
      {courseData.info.map((content) => (
        <Info title={content.title} link={content.link} />
      ))}
    </div>
  );
};

const Info = ({ title, link }) => {
  const renderContent = () => {
    return (
      <div
        className={"csci134-info"}
        style={{
          margin: "2px",
          padding: "2px",
        }}
      >
        <span>{title}</span>{" "}
      </div>
    );
  };

  return (
    <a href={link} target="_blank">
      {renderContent()}
    </a>
  );
};

function Csci134() {
  return (
    <div>
      <div
        className="csci134"
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "center",
          gap: "20px",
          height: "auto",
          paddingBottom: "20px",
        }}
      >
        <Welcome />
        <Information />
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "stretch",
            gap: "20px",
            height: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: "stretch",
              gap: "20px",
            }}
          >
            <Schedule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Csci134;
