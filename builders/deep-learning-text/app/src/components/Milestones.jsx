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
      rootMargin: "-110px 0px -40% 0px"
    });

    const headingElements = Array.from(document.querySelectorAll("h4, h5"));
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
};

const bgColor = "white";

const Heading = ({ id, title }) => (
  <a
    href={`#${id}`}
    onClick={(e) => {
      e.preventDefault();
      document.querySelector(`#${id}`).scrollIntoView({
        behavior: "smooth"
      });
    }}>
    <div className="text textcolor">{title}
    </div>

  </a>
);

const Headings = ({ headings, inactiveColor, activeColor }) => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <nav aria-label="Table of contents" style={{
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "flex-start",
      alignContent: "stretch",
      alignItems: "center",
      width: "80%",
      padding: "10%",
      height: (panelHeight) / 3,
    }}>
      <div
        onMouseEnter={() => setActiveUpArrow(true)}
        onMouseLeave={() => setActiveUpArrow(false)}
        onClick={handleUpArrowClick}
        style={{
          fontSize: "20px",
          alignSelf: "stretch",
          textAlign: "center",
          color: activeUpArrow ? activeColor : inactiveColor /*"aqua" : "#aaddff"*/
        }}>
        ▲
      </div>
      <div style={{ flexGrow: 1, flexShrink: 1 }} />
      <div
        style={{
          textAlign: 'center'
        }}
      >
        <Heading id={headingId} title={headingTitle} />
      </div>
      <div style={{ flexGrow: 1, flexShrink: 1 }} />
      <div
        onMouseEnter={() => setActiveDownArrow(true)}
        onMouseLeave={() => setActiveDownArrow(false)}
        onClick={handleDownArrowClick}
        style={{
          fontSize: "20px",
          alignSelf: "stretch",
          textAlign: "center",
          color: activeDownArrow ? activeColor : inactiveColor
        }}>
        ▼
      </div>

    </nav>
  );
}

const Milestones = ({ inactiveColor, activeColor }) => {
  const { nestedHeadings } = useHeadingsData();

  return (
    <Headings
      headings={nestedHeadings}
      inactiveColor={inactiveColor}
      activeColor={activeColor}
    />
  );
};

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H4") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === "H5" && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("h4, h5")
    );

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

export default Milestones;