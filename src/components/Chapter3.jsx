import React from "react";
                 import Equation from './Equation.jsx'
                 import ColorPicker from './ColorPicker.jsx'
                 import PopQuiz, {PopQuizItem} from './PopQuiz.jsx'
                 import ProofWalkthru from './ProofWalkthru.jsx'
                 import GradientDescentDemo from './GradientDescentDemo.jsx';
                 import FollowTheFold from './FollowTheFold.jsx';
                 import ContourExplorer from './ContourExplorer.jsx';
                 import Prologue from './Prologue.jsx';
                 import MatrixMultiplication from './MatrixMultiplication.jsx';
                 
                const Chapter3 = ({bullet, color1, color2, color3}) => {
                    return (
                        <div>
                        <div className="dlamp-paragraph-spacer" /><div className="dlamp-text textcolor"><Prologue title="linear models" image="/images/lines_logo.png" intro1="The shortest distance between two points is a straight line.「Archimedes」" intro2="A line is a dot that went for a walk.「Paul Klee」" intro3="There are no straight lines or sharp corners in nature.
「Antoni Gaudí」" />
</div>
<div className="dlamp-paragraph-spacer" /><div className="dlamp-text textcolor">During our misbegotten carny youth (Chapter 2), we developed a model that predicted a person's age based on the saturation and lightness of their hair color.</div>
<div className="dlamp-paragraph-spacer" /><div className="dlamp-text textcolor"><img className="dlamp-image" src="images/sl_model.jpg" alt="Training cycle for the saturation/lightness model" /></div>
<div className="dlamp-paragraph-spacer" /><div className="dlamp-text textcolor">It turns out that these &quot;weighted sum&quot; models are useful for many prediction tasks. They are often referred to as <span className="term">linear models</span>.</div>

                        </div>
                    );
                }
    

                export default Chapter3;
                
