import spacy
nlp = spacy.load("en_core_web_sm")

class TreeNode:
   def __init__(self, token, children):
      self.token = token
      self.children = children

def make_tree(root_index, child_indices, doc):
   for child_index in child_indices[root_index]:
      make_tree(doc[child_index], child_indices, doc)

def parse(sent):
   doc = nlp(sent)
   children = [[] for _ in range(len(doc))]
   root = None
   for word in doc:
      if word.i != word.head.i:
         children[word.head.i].append(word.i)
      else:
         root = word.head.i
   make_tree(root, children, doc)

   print(children)

if __name__ == "__main__":
   parse("But Google is starting from behind.")