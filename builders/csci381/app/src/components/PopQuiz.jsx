import { useState } from "react";

const PopQuiz = (props) => {
  return (
    <div className="pop-quiz">
      {props.children}
    </div>
  );
};


export const PopQuizItem = (props) => {

  const [revealed, setRevealed] = useState(false)
  const [permanentlyRevealed, setPermanentlyRevealed] = useState(false)

  const handleClick = () => {
    setPermanentlyRevealed(!permanentlyRevealed);
  };

  const handleMouseEnter = () => {
    setRevealed(true);
  }

  const handleMouseLeave = () => {
    setRevealed(false);
  }

  const getAnswer = () => {
    if (permanentlyRevealed) {
      return (
        <div className="pop-answer permareveal" onClick={handleClick}>
          {answer}
        </div>
      )
    } else if (revealed) {
      return (
        <div className="pop-answer" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {answer}
        </div>
      )
    } else {
      return (
        <div className="pop-answer pq-unrevealed" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {answer}
        </div>
      )
    }
  }

  const question = props.children[0].props.children;
  const answer = props.children[1].props.children;

  return (
    <div>
      <div className="flex-container">
        <div className="pop-bullet">
          {props.bullet}
        </div>
        <div className="pop-question">
          {question}
        </div>
        {getAnswer()}
      </div> 
    </div>
        
  );
};


export default PopQuiz;
