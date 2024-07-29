import { useState, useEffect, useRef } from "react";
import { Pyodide } from "./pyodide";
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';

function PythonInterpreter({ startingText, goodcolor, badcolor, labelcolor }) {
  const [pyprompt, setPyprompt] = useState(startingText);
  const [pyoutput, setPyoutput] = useState("please wait");
  const [pysuccess, setPysuccess] = useState(false);
  const [pyinit, setPyinit] = useState(false);

  const submitExpression = (expr) => {
    try {
      pyodide.run('print(' + expr + ')');
    } catch (e) {
      setPysuccess(false);
      setPyoutput("");
      console.log("ERROR: " + e);
    }
  }

  useEffect(() => {
    submitExpression(startingText);
  }, [pyinit])


  const handleChange = (event) => {
    const key = event.nativeEvent.inputType;
    if (key === 'insertLineBreak') {
      return;
    }
    console.log('target', key);
    setPyprompt(event.target.value);
    submitExpression(event.target.value);
  };

  const noOp = () => { }

  

  const pyodide = Pyodide.getInstance();
  pyodide.setOutput((text) => {
    if (pyinit) {
      setPysuccess(true);
      setPyoutput(text);
    } else {
      setPyinit(true);
    }
  });

  const inputTextFontSize = Math.min(2.0, 26.0 / pyprompt.length);
  const outputTextFontSize = Math.min(2.0, 26.0 / pyoutput.length);

  const myStyle = {
    width: "100%",
    height: "50px",
    fontFamily: "monospace",
    fontSize: `${outputTextFontSize}rem`,
    backgroundColor: "black",
    borderWidth: "2px",
    borderColor: pysuccess ? goodcolor : badcolor,
    color: pysuccess ? goodcolor : badcolor
  }

  return (
    <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <Item><textarea
          style={{
            width: "100%",
            height: "50px",
            fontFamily: "monospace",
            fontSize: `${inputTextFontSize}rem`,
            borderWidth: "2px",
            borderColor: "black",
            backgroundColor: "black",
            resize: "none",
            color: "white"
          }}
          value={pyprompt}
          onChange={handleChange}
        ></textarea></Item>
      </Grid>
      <Grid item xs={6}>
        <Item><textarea
          style={myStyle}
          value={pyoutput}
        ></textarea>
        </Item>
      </Grid>
      <Grid item xs={6}>

        <Item><textarea
          style={{
            width: "100%",
            height: "30px",
            fontFamily: "monospace",
            fontSize: "1rem",
            borderWidth: "2px",
            borderColor: "black",
            backgroundColor: "black",
            resize: "none",
            color: labelcolor
          }}
          value={"expression"}
          onChange={noOp}
        ></textarea></Item>
      </Grid>
      <Grid item xs={6}>
        <Item><textarea
          style={{
            width: "100%",
            height: "30px",
            resize: "none",
            fontFamily: "monospace",
            fontSize: "1rem",
            borderWidth: "2px",
            borderColor: "black",
            backgroundColor: "black",
            color: labelcolor
          }}
          value={"value"}
          onChange={noOp}
        ></textarea></Item>
      </Grid>
    </Grid>
  );
}

export default PythonInterpreter;
