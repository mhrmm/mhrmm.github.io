import React, { Component } from "react";
import { Tree } from "hierplane";
import PythonInterpreter from './PythonInterpreter';


    const hierTree0 = {'text': '(5+6) * (7+8)', 'root': {'nodeType': 'event', 'word': '*', 'spans': [{'start': 0, 'end': 1}, {'start': 4, 'end': 9}, {'start': 12, 'end': 13}], 'children': [{'nodeType': 'event', 'word': '+', 'spans': [{'start': 2, 'end': 3}], 'children': [{'nodeType': 'entity', 'word': '5', 'spans': [{'start': 1, 'end': 2}], 'link': 'left', 'attributes': [5]}, {'nodeType': 'entity', 'word': '6', 'spans': [{'start': 3, 'end': 4}], 'link': 'right', 'attributes': [6]}], 'link': 'left', 'attributes': [11]}, {'nodeType': 'event', 'word': '+', 'spans': [{'start': 10, 'end': 11}], 'children': [{'nodeType': 'entity', 'word': '7', 'spans': [{'start': 9, 'end': 10}], 'link': 'left', 'attributes': [7]}, {'nodeType': 'entity', 'word': '8', 'spans': [{'start': 11, 'end': 12}], 'link': 'right', 'attributes': [8]}], 'link': 'right', 'attributes': [15]}], 'attributes': [165]}, 'nodeTypeToStyle': {'event': ['color6', 'strong'], 'entity': ['color4'], 'detail': ['placeholder'], 'sequence': ['seq'], 'reference': ['placeholder']}};
const hierTree1 = {'text': 'pow(1, pow(pow(pow(3, 3), 3), 3))', 'root': {'nodeType': 'event', 'word': 'pow', 'spans': [{'start': 0, 'end': 4}, {'start': 5, 'end': 7}, {'start': 32, 'end': 33}], 'children': [{'nodeType': 'entity', 'word': '1', 'spans': [{'start': 4, 'end': 5}], 'link': 'arg', 'attributes': [1]}, {'nodeType': 'event', 'word': 'pow', 'spans': [{'start': 7, 'end': 11}, {'start': 28, 'end': 30}, {'start': 31, 'end': 32}], 'children': [{'nodeType': 'event', 'word': 'pow', 'spans': [{'start': 11, 'end': 15}, {'start': 24, 'end': 26}, {'start': 27, 'end': 28}], 'children': [{'nodeType': 'event', 'word': 'pow', 'spans': [{'start': 15, 'end': 19}, {'start': 20, 'end': 22}, {'start': 23, 'end': 24}], 'children': [{'nodeType': 'entity', 'word': '3', 'spans': [{'start': 19, 'end': 20}], 'link': 'arg', 'attributes': [3]}, {'nodeType': 'entity', 'word': '3', 'spans': [{'start': 22, 'end': 23}], 'link': 'arg', 'attributes': [3]}], 'link': 'arg', 'attributes': [27]}, {'nodeType': 'entity', 'word': '3', 'spans': [{'start': 26, 'end': 27}], 'link': 'arg', 'attributes': [3]}], 'link': 'arg', 'attributes': [19683]}, {'nodeType': 'entity', 'word': '3', 'spans': [{'start': 30, 'end': 31}], 'link': 'arg', 'attributes': [3]}], 'link': 'arg', 'attributes': [7625597484987]}], 'attributes': [1]}, 'nodeTypeToStyle': {'event': ['color6', 'strong'], 'entity': ['color4'], 'detail': ['placeholder'], 'sequence': ['seq'], 'reference': ['placeholder']}};
const hierTree2 = {'text': 'min(len("seven"), len("seventy"))', 'root': {'nodeType': 'event', 'word': 'min', 'spans': [{'start': 0, 'end': 4}, {'start': 16, 'end': 18}, {'start': 32, 'end': 33}], 'children': [{'nodeType': 'event', 'word': 'len', 'spans': [{'start': 4, 'end': 8}, {'start': 15, 'end': 16}], 'children': [{'nodeType': 'entity', 'word': 'seven', 'spans': [{'start': 8, 'end': 15}], 'link': 'arg', 'attributes': ['seven']}], 'link': 'arg', 'attributes': [5]}, {'nodeType': 'event', 'word': 'len', 'spans': [{'start': 18, 'end': 22}, {'start': 31, 'end': 32}], 'children': [{'nodeType': 'entity', 'word': 'seventy', 'spans': [{'start': 22, 'end': 31}], 'link': 'arg', 'attributes': ['seventy']}], 'link': 'arg', 'attributes': [7]}], 'attributes': [5]}, 'nodeTypeToStyle': {'event': ['color6', 'strong'], 'entity': ['color4'], 'detail': ['placeholder'], 'sequence': ['seq'], 'reference': ['placeholder']}};

    function Chapter3({ goodcolor, badcolor, labelcolor }) {
        return (
            <div>
            <h4 className="header1" id="arithmetic-expressions">arithmetic expressions</h4>
<p className="text textcolor">Arithmetic expressions are common in Python.</p>
<p className="text textcolor"><PythonInterpreter startingText="(5+6) * (7+8)" badcolor={badcolor} goodcolor={goodcolor} labelcolor={labelcolor}/>
</p>
<p className="text textcolor">Here is an example of an arithmetic expression in Python, and its corresponding expression tree.</p>
<p className="text textcolor"><Tree tree={hierTree0} />
</p>
<p className="text textcolor">Notice that you can expand and collapse the nodes of the above tree. And we can do this:</p>
<p className="text textcolor"><Tree tree={hierTree1} />
</p>
<p className="text textcolor">And this:</p>
<p className="text textcolor"><Tree tree={hierTree2} />
</p>
<h4 className="header1" id="exercises">exercises</h4>
<ol>
<li><p className="text textcolor">Draw a neural network as a graph.</p>
</li>
</ol>

            </div>
        );
        }
    

    export default Chapter3;
