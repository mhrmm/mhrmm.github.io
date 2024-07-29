import latex2mathml.converter
import marko
from marko import Markdown
from marko.helpers import MarkoExtension
from ast_parser import parse


hierplane_trees = []

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


class Equation(marko.inline.InlineElement):

    pattern = r'--- *(.+?) ---'
    parse_children = True

    def __init__(self, match):
        latex_input = match.group(1)
        self.target = latex2mathml.converter.convert(latex_input)


class PythonHierplane(marko.inline.InlineElement):

    pattern = r'@py! *(.+?) @by!'
    parse_children = True

    def __init__(self, match):
        expr = match.group(1)
        self.target = parse(expr)

class PythonExpression(marko.inline.InlineElement):

    pattern = r'@pye! *(.+?) @bye!'
    parse_children = True

    def __init__(self, match):
        expr = match.group(1)
        self.target = parse(expr)


class MyRendererMixin(object):

    def render_latex(self, element):
        return f"{element.target}"
    
    def render_heading(self, element):
        child_rendering = self.render_children(element)
        heading_id = '-'.join(child_rendering.split())
        return f'<h4 className="header1" id="{heading_id}">{child_rendering}</h4>\n'
    

    
    def render_image(self, element):
        child_rendering = self.render_children(element)
        return f'<img className="image" src="{element.dest}" alt="{child_rendering}" width="600" />'

    def render_line_break(self, element):
        return " "

    def render_strong_emphasis(self, element):
        child_rendering = self.render_children(element)
        return f'<span className="term">{child_rendering}</span>'    
    
    def render_paragraph(self, element):
        child_rendering = self.render_children(element)
        return f'<p className="text textcolor">{child_rendering}</p>\n'

    def render_equation(self, element):
        return f'<p className="equation">{element.target}</p>\n'

    def render_python_hierplane(self, element):
        hierplane_trees.append(element.target)
        return f'<Tree tree={{hierTree{len(hierplane_trees)-1}}} />\n'

    def render_python_expression(self, element):
        child_rendering = self.render_children(element)
        print(child_rendering)
        return f'<PythonInterpreter startingText="{child_rendering}" badcolor={{badcolor}} goodcolor={{goodcolor}} labelcolor={{labelcolor}}/>\n'


    def render_definition(self, element):
        child_rendering = self.render_children(element)
        return f'<p className="definition"><span className="definitionheader">Definition:</span><br/><br/>{child_rendering}</p>\n'


def markdown_to_html(markdown_file):
    component_name = markdown_file.split(".")[0].capitalize()
    lines = []
    with open(markdown_file) as reader:
        for line in reader:
            lines.append(line)
    text = ' '.join(lines)
    extension = MarkoExtension(
        elements=[Latex, Definition, Equation, PythonExpression, PythonHierplane],
        renderer_mixins=[MyRendererMixin]
    )
    markdown = Markdown(extensions=[extension])
    #parsed = markdown.parse(text) # print this to see the raw format
    generated = markdown(text)
    consts = "\n".join([f"const hierTree{i} = {tree};" for i, tree in enumerate(hierplane_trees)])
  
    output = f"""import React, {{ Component }} from "react";
import {{ Tree }} from "hierplane";
import PythonInterpreter from './PythonInterpreter';


    {consts}

    function Chapter3({{ goodcolor, badcolor, labelcolor }}) {{
        return (
            <div>
            {generated}
            </div>
        );
        }}
    

    export default {component_name};"""
    with open(f"../app/src/components/{component_name}.jsx", "w") as writer:
        writer.write(output)
        writer.write('\n')



if __name__ == "__main__":
    markdown_to_html('chapter3.md')