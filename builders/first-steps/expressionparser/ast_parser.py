import ast
import json
import rpyc
from rpyc.utils.server import ThreadedServer


def parse(expression):
    print("parsing")
    tree = ast.parse(expression, mode="eval")
    root = process(tree, expression)
    fix_spans(root)
    return {'text': expression, 
            'root': root,
            "nodeTypeToStyle": {
                "event": ["color6", "strong"],
                "entity": ["color4"],
                "detail": ["placeholder"],
                "sequence": ["seq"],
                "reference": ["placeholder"]
            }} 

COMPARATOR = {ast.Eq: "==", ast.Lt: "<", ast.Gt: ">",
              ast.LtE: "<=", ast.GtE: ">=", ast.NotEq: "!=",
              ast.Mult: "*", ast.Div: "/", ast.Add: "+",
              ast.Sub: "-", ast.Pow: "**", ast.Is: "is",
              ast.IsNot: "is not", ast.In: "in", 
              ast.NotIn: "not in", ast.And: "and",
              ast.Or: "or", ast.Not: "not", ast.FloorDiv: "//",
              ast.Mod: "%", ast.LShift: "<<", ast.RShift: ">>",
              ast.BitOr: "|", ast.BitXor: "^", ast.BitAnd: "&",
              ast.MatMult: "@", ast.USub: "-", ast.UAdd: "+",
              ast.Invert: "~"}


def process(tree, text, link=None):    
    if type(tree) is ast.Expression:
        result = process(tree.body, text)
    elif type(tree) is ast.Call:  
        result = {'nodeType': 'event', 
                  'word': tree.func.id,
                  'spans': [{'start': tree.col_offset, 
                             'end': tree.end_col_offset}],
                  'children': [process(child, text, 'arg') for child in tree.args]}
    elif type(tree) is ast.UnaryOp:  
        result = {'nodeType': 'event', 
                  'word': COMPARATOR[type(tree.op)],
                  'spans': [{'start': tree.col_offset, 
                             'end': tree.end_col_offset}],
                  'children': [process(tree.operand, text, 'arg')]}
    elif type(tree) is ast.BinOp:  
        result = {'nodeType': 'event', 
                  'word': COMPARATOR[type(tree.op)],
                  'spans': [{'start': tree.col_offset, 
                             'end': tree.end_col_offset}],
                  'children': [process(tree.left, text, 'left'), process(tree.right, text, 'right')]}
    elif type(tree) is ast.BoolOp:  
        result = {'nodeType': 'event', 
                  'word': COMPARATOR[type(tree.op)],
                  'spans': [{'start': tree.col_offset, 
                             'end': tree.end_col_offset}],
                  'children': [process(child, text, 'arg') for child in tree.values]}
    elif type(tree) is ast.Compare:  
        result = {'nodeType': 'event', 
                  'word': '.'.join([COMPARATOR[type(x)] for x in tree.ops]),
                  'spans': [{'start': tree.col_offset, 
                             'end': tree.end_col_offset}],
                  'children': [process(tree.left, text, 'arg')] + [process(x, text, 'arg') for x in tree.comparators]}
    elif type(tree) is ast.Constant:
        result = {'nodeType': 'entity', 
                  'word': str(tree.value),
                  'spans': [{'start': tree.col_offset, 
                             'end': tree.end_col_offset}]}
    elif type(tree) is ast.Attribute:
        result = {'nodeType': 'detail', 
                  'word': str(tree.attr),
                  'spans': [{'start': tree.col_offset, 
                             'end': tree.end_col_offset}],
                  'attributes': [str(tree.value.id)]}
    elif type(tree) is ast.Name:
        result = {'nodeType': 'detail', 
                  'word': str(tree.id),
                  'spans': [{'start': tree.col_offset, 
                             'end': tree.end_col_offset}]}
    else:
        raise Exception(f"Type not handled: {type(tree)}")
    if link is not None:
        result['link'] = link
    try:
        subexpr = text[tree.col_offset:tree.end_col_offset]
        result['attributes'] = [eval(subexpr)]
    except NameError:
        pass
    except AttributeError:
        pass
    return result
    

def fix_spans(hplane_node):
    if 'children' in hplane_node:
        covered = set()
        for child in hplane_node['children']:
            covered = covered | fix_spans(child)
        print(covered)
        new_spans = []
        span_start = hplane_node['spans'][0]['start']
        span_end = hplane_node['spans'][0]['end']
        next_span = []
        for i in range(span_start, span_end):
            if i not in covered:
                if len(next_span) == 0:
                    next_span = [i]
            else:
                if len(next_span) == 1:
                    new_spans.append({'start': next_span[0], 
                                      'end': i})
                    next_span = []
        if len(next_span) == 1:
            new_spans.append({'start': next_span[0], 
                              'end': span_end})
        hplane_node['spans'] = new_spans
        return set(range(span_start, span_end))
    else:
        span_start = hplane_node['spans'][0]['start']
        span_end = hplane_node['spans'][0]['end']
        return set(range(span_start, span_end))


class AstParsingService(rpyc.Service):
    def on_connect(self, conn):
        # code that runs when a connection is created
        # (to init the service, if needed)
        pass

    def on_disconnect(self, conn):
        # code that runs after the connection has already closed
        # (to finalize the service, if needed)
        pass

    def exposed_submit_response(self, expression_str):
        return parse(expression_str)
       



if __name__ == "__main__":
    tree_dict = parse('(2 + 3) * (4 + 5)')
    print(tree_dict)
    
    with open("tree.json", 'w') as writer:
        writer.write(json.dumps(tree_dict, indent=4))

    
    #t = ThreadedServer(AstParsingService, port=18861)
    #print("Starting AST parsing service.")
    #t.start()
