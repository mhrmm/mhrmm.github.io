import React, { Component } from "react";
import { Tree } from "hierplane";
import aTree from "/Users/markhopkins/Documents/projects/teaching/online-134/expressionparser/tree.json"

const aTree2 = {
    "text": "(2 + 3) * (4 + 5)",
    "root": {
        "nodeType": "event",
        "word": "*",
        "spans": [
            {
                "start": 0,
                "end": 1
            },
            {
                "start": 6,
                "end": 11
            },
            {
                "start": 16,
                "end": 17
            }
        ],
        "children": [
            {
                "nodeType": "event",
                "word": "+",
                "spans": [
                    {
                        "start": 2,
                        "end": 5
                    }
                ],
                "children": [
                    {
                        "nodeType": "entity",
                        "word": "2",
                        "spans": [
                            {
                                "start": 1,
                                "end": 2
                            }
                        ],
                        "link": "left",
                        "attributes": [
                            2
                        ]
                    },
                    {
                        "nodeType": "entity",
                        "word": "3",
                        "spans": [
                            {
                                "start": 5,
                                "end": 6
                            }
                        ],
                        "link": "right",
                        "attributes": [
                            3
                        ]
                    }
                ],
                "link": "left",
                "attributes": [
                    5
                ]
            },
            {
                "nodeType": "event",
                "word": "+",
                "spans": [
                    {
                        "start": 12,
                        "end": 15
                    }
                ],
                "children": [
                    {
                        "nodeType": "entity",
                        "word": "4",
                        "spans": [
                            {
                                "start": 11,
                                "end": 12
                            }
                        ],
                        "link": "left",
                        "attributes": [
                            4
                        ]
                    },
                    {
                        "nodeType": "entity",
                        "word": "5",
                        "spans": [
                            {
                                "start": 15,
                                "end": 16
                            }
                        ],
                        "link": "right",
                        "attributes": [
                            5
                        ]
                    }
                ],
                "link": "right",
                "attributes": [
                    9
                ]
            }
        ],
        "attributes": [
            45
        ]
    },
    "nodeTypeToStyle": {
        "event": [
            "color6",
            "strong"
        ],
        "entity": [
            "color4"
        ],
        "detail": [
            "placeholder"
        ],
        "sequence": [
            "seq"
        ],
        "reference": [
            "placeholder"
        ]
    }
};

    class Chapter3 extends Component {
        render() {
        return (
            <div>
            <h4 className="header1" id="arithmetic expressions">arithmetic expressions</h4>
<p className="text textcolor"><img className="image" src="images/lascaux.png" alt="img" width="500" /></p>
<p className="text textcolor">Here is an example of an arithmetic expression in Python.</p>
<Tree tree={aTree2} />
<p className="text textcolor">Notice that you can expand and collapse the nodes of the above tree.</p>
<h4 className="header1" id="exercises">exercises</h4>
<ol>
<li><p className="text textcolor">Draw a neural network as a graph.</p>
</li>
</ol>

            </div>
        );
        }
    }

    export default Chapter3;
