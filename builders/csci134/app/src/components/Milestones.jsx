import { useState, useEffect, useRef } from 'react'


const useIntersectionObserver = (setActiveIndex) => {
  const headingElementsRef = useRef({});

  useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveIndex(getIndexFromId(visibleHeadings[0].target.id));
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );
        setActiveIndex(getIndexFromId(sortedVisibleHeadings[0].target.id));
      }
    }
    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -40% 0px"
    });

    const headingElements = Array.from(document.querySelectorAll("h4, h5"));
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
};

const Heading = ({ id, title }) => (
  <a
    href={`#${id}`}
    onClick={(e) => {
      e.preventDefault();
      document.querySelector(`#${id}`).scrollIntoView({
        behavior: "smooth"
      });
    }}>
    <div className="dlamp-text dlamp-milestone">{title}
    </div>

  </a>
);

const Milestones = ({ inactiveColor, activeColor, layout }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { headings } = useHeadingsData();

  const [activeUpArrow, setActiveUpArrow] = useState(false);
  const [activeDownArrow, setActiveDownArrow] = useState(false);


  useIntersectionObserver(setActiveIndex);

  const panelHeight = window.innerHeight;

  const handleUpArrowClick = (e) => {
    e.preventDefault();
    let nextActiveIndex = activeIndex > 0 ? activeIndex - 1 : activeIndex
    setActiveIndex(nextActiveIndex)
    document.querySelector(`#${headings[nextActiveIndex].id}`).scrollIntoView({
      behavior: "smooth"
    });
  }

  const handleDownArrowClick = (e) => {
    e.preventDefault();
    let nextActiveIndex = activeIndex + 1 < headings.length ? activeIndex + 1 : activeIndex
    setActiveIndex(nextActiveIndex)
    document.querySelector(`#${headings[nextActiveIndex].id}`).scrollIntoView({
      behavior: "smooth"
    });
  }

  const headingId = headings.length > 0 ? headings[activeIndex].id : 0
  const headingTitle = headings.length > 0 ? headings[activeIndex].title : "?"

  const renderUpArrow = () => {
    <div
      onMouseEnter={() => setActiveUpArrow(true)}
      onMouseLeave={() => setActiveUpArrow(false)}
      onClick={handleUpArrowClick}
      style={{
        fontSize: activeUpArrow ? "30px" : "20px",
        transition: "font-size 0.5s",
        alignSelf: "stretch",
        textAlign: "center",
        color: activeUpArrow ? activeColor : inactiveColor
      }}>
      {activeIndex > 0 ? '🎈' : null}
    </div>
  }

  const renderDownArrow = () => (
    <div
      onMouseEnter={() => setActiveDownArrow(true)}
      onMouseLeave={() => setActiveDownArrow(false)}
      onClick={handleDownArrowClick}
      style={{
        fontSize: activeDownArrow ? "30px" : "20px",
        transition: "font-size 0.5s",
        alignSelf: "stretch",
        textAlign: "center",
        color: activeDownArrow ? activeColor : inactiveColor
      }}>
      {activeIndex + 1 < headings.length ? '⚓' : null}
    </div>
  )

  const wideLayout = (
    <nav aria-label="Table of contents" style={{
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "flex-start",
      alignContent: "stretch",
      alignItems: "center",
      width: "80%",
      padding: "10%",
      height: (panelHeight) / 3,
    }}><div style={{ flexGrow: 1, flexShrink: 1 }} />
      <div className="dlamp-milestone">
        <Heading id={headingId} title={headingTitle} />
      </div>
    </nav>
  )

  const narrowLayout = (
    <div className="dlamp-milestone">
      <Heading id={headingId} title={headingTitle} />
    </div>
  )

  return layout === "wide" ? wideLayout : narrowLayout;
}



const useHeadingsData = () => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("h4")
    );
    const newHeadings = [];
    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading;
      console.log('title', title, id)
      if (heading.nodeName === "H4") {
        newHeadings.push({ id, title, items: [] });
      }
    });
    setHeadings(newHeadings);
  }, []);

  return { headings };
};

export default Milestones;