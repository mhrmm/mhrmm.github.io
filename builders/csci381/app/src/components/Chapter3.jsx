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
                        <div className="text textcolor"><Prologue title="graphs" image="/images/lascaux.jpg" intro1="A picture is worth a thousand words.「Fred R. Barnard」" intro2="The intuitive appeal of graphs stems from their visual and structural simplicity. By providing a clear and concise representation of complex dependencies, graphs help to bridge the gap between probabilistic reasoning and human intuition. 「Judea Pearl」" intro3="Tennis is more than just a sport. It's a passion that drives me every day.
「Steffi Graf」" />
</div>
<div className="text textcolor">Since ancient times, neural networks have been depicted as graphs. Consider this diagram from a 1962 academic paper, which is about as close to the <a href="https://en.wikipedia.org/wiki/Lascaux">Lascaux cave paintings</a> as we can get in the field of deep learning.</div>
<div className="text textcolor"><img className="image" src="images/lascaux.png" alt="Neural network graph from a 1962 paper." /></div>
<div className="text textcolor">Today, graphs continue to be a common way to express neural networks. Here's a more contemporary example from a popular 2017 paper.</div>
<div className="text textcolor"><img className="image" src="images/transformer.png" alt="Neural network graph from a 2017 paper." /></div>
<div className="text textcolor">In both diagrams, we see <span className="term">vertices</span> (expressed as small dots in the first diagram and rounded rectangles in the second) connected by <span className="term">edges</span> (expressed as arrows in both diagrams). Vertices and edges are the two fundamental elements of any graph. </div>
<div className="text textcolor">Here is a simpler example of a graph:</div>
<div className="text textcolor"><img className="image" src="boards/board3a.png" alt="Board 3A" /></div>
<div className="text textcolor">To formally define a graph, we begin by assuming a set <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>V</mi></mrow></math> of unique symbols called <span className="term">vertices</span>. In the above graph: </div>
<div className="text textcolor"><Equation><math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>V</mi><mo>&#x0003D;</mo><mo stretchy="false">&#x0007B;</mo><mi>A</mi><mo>&#x0002C;</mo><mi>B</mi><mo>&#x0002C;</mo><mi>C</mi><mo>&#x0002C;</mo><mi>D</mi><mo stretchy="false">&#x0007D;</mo></mrow></math></Equation>
</div>
<div className="text textcolor">An <span className="term">edge</span> can then be defined as an ordered pair <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mo stretchy="false">&#x00028;</mo><msub><mi>v</mi><mn>1</mn></msub><mo>&#x0002C;</mo><msub><mi>v</mi><mn>2</mn></msub><mo stretchy="false">&#x00029;</mo></mrow></math>, where <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>1</mn></msub></mrow></math> and <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>2</mn></msub></mrow></math> are vertices. Because an edge is an ordered pair, that suggests it has a direction, namely that the edge <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mo stretchy="false">&#x00028;</mo><msub><mi>v</mi><mn>1</mn></msub><mo>&#x0002C;</mo><msub><mi>v</mi><mn>2</mn></msub><mo stretchy="false">&#x00029;</mo></mrow></math> goes from vertex <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>1</mn></msub></mrow></math> to vertex <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>2</mn></msub></mrow></math>. Typically, we draw an edge as an arrow pointing from <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>1</mn></msub></mrow></math> to <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>2</mn></msub></mrow></math>. </div>
<div className="text textcolor">One could imagine defining an edge differently, as an unordered set of two vertices. In this case, there would be no direction between the vertices, and the natural visual representation would be a simple straight line. This is also a common way to define an edge (called an <span className="term">undirected edge</span>). However, we will be focusing exclusively on <span className="term">directed edges</span>, adopting the following definition of a graph.</div>
<div className="text textcolor"><div className="definition"><span className="definitionheader">Definition</span><br/><br/> A (directed) graph is a pair <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mo stretchy="false">&#x00028;</mo><mi>V</mi><mo>&#x0002C;</mo><mi>E</mi><mo stretchy="false">&#x00029;</mo></mrow></math>, where <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>V</mi></mrow></math> is a set of vertices and <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>E</mi></mrow></math> is a subset of <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>V</mi><mi>&#x000D7;</mi><mi>V</mi></mrow></math>. </div>
	</div>
<div className="text textcolor">We can also talk about <span className="term">paths</span> in a graph.</div>
<div className="header-padding" /><hr></hr><h4 className="header1" id="exercises">exercises</h4>
<ol>
<li><div className="text textcolor">Draw a neural network as a graph.</div>
</li>
</ol>

                        </div>
                    );
                }
    

                export default Chapter3;
                
