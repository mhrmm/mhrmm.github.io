import React, { useState, useEffect } from "react";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

const Chapter3 = () => {

    const { height, width } = useWindowDimensions();
    const imageWidthPct = 0.55;
    return (
        <div>
            <h4 className="header1" id="graphs">graphs</h4>
            <p className="text textcolor">Since ancient times, neural networks have been depicted as graphs. Consider this diagram from a 1962 academic paper, which is about as close to the <a href="https://en.wikipedia.org/wiki/Lascaux">Lascaux cave paintings</a> as we can get in the field of deep learning.</p>
            <p className="text textcolor"><img className="image" src="images/lascaux.png" alt="Neural network graph from a 1962 paper." width={width * imageWidthPct} /></p>
            <p className="text textcolor">Today, graphs continue to be a common way to express neural networks. Here's a more contemporary example from a popular 2017 paper.</p>
            <p className="text textcolor"><img className="image" src="images/transformer.png" alt="Neural network graph from a 2017 paper." width={width * imageWidthPct} /></p>
            <p className="text textcolor">In both diagrams, we see <span className="term">vertices</span> (expressed as small dots in the first diagram and rounded rectangles in the second) connected by <span className="term">edges</span> (expressed as arrows in both diagrams). Vertices and edges are the two fundamental elements of any graph. </p>
            <p className="text textcolor">Here is a simpler example of a graph:</p>
            <p className="text textcolor"><img className="image" src="boards/board3a.png" alt="Board 3A" width={width * imageWidthPct} /></p>
            <p className="text textcolor">To formally define a graph, we begin by assuming a set <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>V</mi></mrow></math> of unique symbols called <span className="term">vertices</span>. In the above graph: </p>
            <p className="text textcolor"><p className="equation"><math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>V</mi><mo>&#x0003D;</mo><mo stretchy="false">&#x0007B;</mo><mi>A</mi><mo>&#x0002C;</mo><mi>B</mi><mo>&#x0002C;</mo><mi>C</mi><mo>&#x0002C;</mo><mi>D</mi><mo stretchy="false">&#x0007D;</mo></mrow></math></p>
            </p>
            <p className="text textcolor">An <span className="term">edge</span> can then be defined as an ordered pair <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mo stretchy="false">&#x00028;</mo><msub><mi>v</mi><mn>1</mn></msub><mo>&#x0002C;</mo><msub><mi>v</mi><mn>2</mn></msub><mo stretchy="false">&#x00029;</mo></mrow></math>, where <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>1</mn></msub></mrow></math> and <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>2</mn></msub></mrow></math> are vertices. Because an edge is an ordered pair, that suggests it has a direction, namely that the edge <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mo stretchy="false">&#x00028;</mo><msub><mi>v</mi><mn>1</mn></msub><mo>&#x0002C;</mo><msub><mi>v</mi><mn>2</mn></msub><mo stretchy="false">&#x00029;</mo></mrow></math> goes from vertex <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>1</mn></msub></mrow></math> to vertex <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>2</mn></msub></mrow></math>. Typically, we draw an edge as an arrow pointing from <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>1</mn></msub></mrow></math> to <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><msub><mi>v</mi><mn>2</mn></msub></mrow></math>. </p>
            <p className="text textcolor">One could imagine defining an edge differently, as an unordered set of two vertices. In this case, there would be no direction between the vertices, and the natural visual representation would be a simple straight line. This is also a common way to define an edge (called an <span className="term">undirected edge</span>). However, we will be focusing exclusively on <span className="term">directed edges</span>, adopting the following definition of a graph.</p>
            <p className="text textcolor"><p className="definition"><span className="definitionheader">Definition:</span><br /><br />A (directed) graph is a pair <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mo stretchy="false">&#x00028;</mo><mi>V</mi><mo>&#x0002C;</mo><mi>E</mi><mo stretchy="false">&#x00029;</mo></mrow></math>, where <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>V</mi></mrow></math> is a set of vertices and <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>E</mi></mrow></math> is a subset of <math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow><mi>V</mi><mi>&#x000D7;</mi><mi>V</mi></mrow></math>.</p>
            </p>
            <p className="text textcolor">We can also talk about <span className="term">paths</span> in a graph.</p>
            <h4 className="header1" id="exercises">exercises</h4>
            <ol>
                <li><p className="text textcolor">Draw a neural network as a graph.</p>
                </li>
            </ol>

        </div>
    );
}


export default Chapter3;

