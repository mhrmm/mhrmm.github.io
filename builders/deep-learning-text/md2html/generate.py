import latex2mathml.converter
import re
import marko
from marko import Markdown
from marko.helpers import MarkoExtension
 
   
def preprocess(text):
    pattern = r'(?s)@proof\[(.+?)@proof\]'
    all_proofs = re.findall(pattern, text)
    # text = text.replace('\\log ', '\\log \\: ')  
    replacements = []
    for proof in all_proofs:        
        steps = proof.split('@=')
        augmented = []
        for step in steps:
            step = step.strip()
            step = step + (' % ...' if '%' not in step else '') 
            expression, justification = step.split(' % ')
            step = f' @step[ @math[ {expression} @math] @why[ {justification} @why] @step] '
            augmented.append(step)
        replacements.append((proof, '\n'.join(augmented)))
    for (before, after) in replacements:
        text = text.replace(before, after)       
    return text

def postprocess(text):
    replacements = [('mathvariant="bold"', 'className="proof-highlight" mathvariant="bold"')]
    for (before, after) in replacements:
        text = text.replace(before, after) 
    return text


class Latex(marko.inline.InlineElement):

    pattern = r'\$ *(.+?) *\$'
    parse_children = True

    def __init__(self, match):
        latex_input = match.group(1)
        self.target = latex2mathml.converter.convert(latex_input)
        


class Definition(marko.inline.InlineElement):

    pattern = r'\[\[ *(.+?) *\]\]'
    parse_children = True

    def __init__(self, match):
        latex_input = match.group(1)
        self.target = latex_input

class Example(marko.inline.InlineElement):

    pattern = r'(?s)@eg\[(.+?)@eg\]'
    parse_children = True

    def __init__(self, match):
        
        latex_input = match.group(1)        
        self.target = latex_input

class Prologue(marko.inline.InlineElement):

    pattern = r'(?s)@prologue\[(.+?)\].*\[(.+?)\].*\[(.+?)\].*\[(.+?)\].*\[(.+?)\]'
    parse_children = True

    def __init__(self, match):
        self.title = match.group(1).strip()        
        self.image = match.group(2).strip()
        self.msg1 = match.group(3).strip().replace('"', '&quot;')
        self.msg2 = match.group(4).strip().replace('"', '&quot;')
        self.msg3 = match.group(5).strip().replace('"', '&quot;')
        
class Proof(marko.inline.InlineElement):

    pattern = r'(?s)@proof\[(.+?)@proof\](\[(.+?)\])?'
    parse_children = True

    def __init__(self, match):
        self.target = match.group(1)
        self.marker = match.group(3) if match.group(3) is not None else "="

class ProofStep(marko.inline.InlineElement):

    pattern = r'(?s)@step\[(.+?)@step\]'
    parse_children = True

    def __init__(self, match):
        self.target = match.group(1)

class ProofJustification(marko.inline.InlineElement):

    pattern = r'(?s)@why\[(.+?)@why\]'
    parse_children = True

    def __init__(self, match):
        self.target = match.group(1)

class Equation(marko.inline.InlineElement):

    pattern = r'(?s)@eq\[(.+?)@eq\]'
    parse_children = True

    def __init__(self, match):
        latex_input = match.group(1)
        self.target = latex2mathml.converter.convert(latex_input)

class Math(marko.inline.InlineElement):

    pattern = r'(?s)@math\[(.+?)@math\]'
    parse_children = True

    def __init__(self, match):
        latex_input = match.group(1)
        self.target = latex2mathml.converter.convert(latex_input)

class Component(marko.inline.InlineElement):

    pattern = r'@component\[(.+?)\]'
    parse_children = False

    def __init__(self, match):
        self.component_name = match.group(1)        

class Focus(marko.inline.InlineElement):

    pattern = r'(?s)@focus\[(.+?)@focus\]\[([a-zA-Z0-9_]+)\]'
    parse_children = True

    def __init__(self, match):
        self.focus_type = match.group(2)
        latex_input = match.group(1)        
        self.target = latex_input

class PopQuiz(marko.inline.InlineElement):

    pattern = r'(?s)@popquiz\[(.+?)@popquiz\]'
    parse_children = True

    def __init__(self, match):
        content = match.group(1)
        self.target = content

class PopQuizItem(marko.inline.InlineElement):

    pattern = r'(?s)@popquizitem\[(.+?)@popquizitem\]'
    parse_children = True

    def __init__(self, match): 
        self.target = match.group(1)

class PopQuizQuestion(marko.inline.InlineElement):

    pattern = r'(?s)@q\[(.+?)@q\]'
    parse_children = True

    def __init__(self, match):
        question = match.group(1)
        self.target = question

class PopQuizAnswer(marko.inline.InlineElement):

    pattern = r'(?s)@a\[(.+?)@a\]'
    parse_children = True

    def __init__(self, match):
        answer = match.group(1)
        self.target = answer

class MyRendererMixin(object):

    def render_latex(self, element):
        return f"{element.target}"
    
    def render_heading(self, element):
        
        child_rendering = self.render_children(element)
        header_id = '-'.join(child_rendering.split())
        if element.level == 1:
            return f'<div className="header-padding" /><hr></hr><h4 className="header1" id="{header_id}">{child_rendering}</h4>\n'
        else:
            return f'<div className="header-padding" /><h4 className="header2" id="{header_id}">{child_rendering}</h4>\n'


    def render_image(self, element):
        child_rendering = self.render_children(element)
        return f'<img className="image" src="{element.dest}" alt="{child_rendering}" />'

    def render_line_break(self, element):
        return " "

    def render_strong_emphasis(self, element):
        child_rendering = self.render_children(element)
        return f'<span className="term">{child_rendering}</span>'    
    
    def render_paragraph(self, element):
        child_rendering = self.render_children(element)
        return f'<div className="text textcolor">{child_rendering}</div>\n'

    def render_equation(self, element):
        return f'<Equation>{element.target}</Equation>\n'

    def render_math(self, element):
        return f'<div className="math">{element.target}</div>\n'

    def render_focus(self, element):
        child_rendering = self.render_children(element)
        return f'<div className="definition"><span className="definitionheader">{element.focus_type}</span><br/><br/>{child_rendering}</div>\n'

    def render_definition(self, element):
        child_rendering = self.render_children(element)
        return f'<div className="definition"><span className="definitionheader">Definition</span><br/><br/>{child_rendering}</div>\n'

    def render_prologue(self, element):
        return f'<Prologue title="{element.title}" image="{element.image}" intro1="{element.msg1}" intro2="{element.msg2}" intro3="{element.msg3}" />\n'


    def render_component(self, element):
        if element.component_name == "GradientDescentDemo":
            return '<GradientDescentDemo variant="vanilla" textColor={color1} areaColor={color2} highlightColor={color3}/>\n'
        elif element.component_name == "AdagradDemo":
            return '<GradientDescentDemo variant="adagrad" textColor={color1} areaColor={color2} highlightColor={color3}/>\n'
        elif element.component_name == "MomentumDemo":
            return '<GradientDescentDemo variant="momentum" textColor={color1} areaColor={color2} highlightColor={color3}/>\n'
        elif element.component_name == "Contour":
            return '<Contour variant="explorer" textColor={color1} areaColor={color2} highlightColor={color3}/>\n'
        else:
            return f'<{element.component_name} />\n'

    def render_example(self, element):
        child_rendering = self.render_children(element)
        return f'<div className="definition"><span className="definitionheader">Example</span><br/><br/>{child_rendering}</div>\n'

    def render_pop_quiz(self, element):
        child_rendering = self.render_children(element)
        return f'<PopQuiz>\n{child_rendering}</PopQuiz>\n'

    def render_pop_quiz_item(self, element):
        child_rendering = self.render_children(element)
        return '<PopQuizItem bullet={bullet}>' + f'\n{child_rendering}</PopQuizItem>\n'

    def render_pop_quiz_question(self, element):
        child_rendering = self.render_children(element)
        return f'<div className="pop-question">{child_rendering}</div>\n'

    def render_pop_quiz_answer(self, element):
        child_rendering = self.render_children(element)
        return f'<div className="pop-answer">{child_rendering}</div>\n'

    def render_proof(self, element):
        child_rendering = self.render_children(element)
        return f'<ProofWalkthru marker="{element.marker}">{child_rendering.strip()}</ProofWalkthru>\n'
    
    def render_proof_step(self, element):
        child_rendering = self.render_children(element)
        return f'<div className="step">{child_rendering.strip()}</div>\n'

    def render_proof_justification(self, element):
        child_rendering = self.render_children(element)
        return f'<div className="justification">{child_rendering.strip()}</div>\n'



def markdown_to_html(markdown_file):
    component_name = markdown_file.split(".")[0].capitalize()
    lines = []
    with open(markdown_file) as reader:
        for line in reader:
            lines.append(line)
    text = ' '.join(lines)
    extension = MarkoExtension(
        elements=[Latex, Equation, Math, Definition, Example, Focus, Proof, ProofStep, Component,
                  ProofJustification, Prologue, PopQuiz, PopQuizItem, PopQuizQuestion, PopQuizAnswer],
        renderer_mixins=[MyRendererMixin]
    )
    markdown = Markdown(extensions=[extension])
    #parsed = markdown.parse(text) # print this to see the raw format
    text = preprocess(text)
    generated = markdown(text)
    output = f"""import React from "react";
                 import Equation from './Equation.jsx'
                 import ColorPicker from './ColorPicker.jsx'
                 import PopQuiz, {{PopQuizItem}} from './PopQuiz.jsx'
                 import ProofWalkthru from './ProofWalkthru.jsx'
                 import GradientDescentDemo from './GradientDescentDemo.jsx';
                 import FollowTheFold from './FollowTheFold.jsx';
                 import ContourExplorer from './ContourExplorer.jsx';
                 import Prologue from './Prologue.jsx';
                 
                const {component_name} = ({{bullet, color1, color2, color3}}) => {{
                    return (
                        <div>
                        {generated}
                        </div>
                    );
                }}
    

                export default {component_name};
                """
    output = postprocess(output)
    with open(f"../app/src/components/{component_name}.jsx", "w") as writer:
        writer.write(output)
        writer.write('\n')



if __name__ == "__main__":
    import sys
    markdown_file = sys.argv[1]
    markdown_to_html(markdown_file)