@prologue[
  graphs
][
  /images/lascaux.jpg
][
  A picture is worth a thousand words.「Fred R. Barnard」
][
  The intuitive appeal of graphs stems from their visual and structural simplicity. By providing a clear and concise representation of complex dependencies, graphs help to bridge the gap between probabilistic reasoning and human intuition. 「Judea Pearl」
][
  Tennis is more than just a sport. It's a passion that drives me every day.
  「Steffi Graf」
]

Since ancient times, neural networks have been depicted 
as graphs. Consider this diagram from a 1962 academic paper, 
which is about as close to the 
[Lascaux cave paintings](https://en.wikipedia.org/wiki/Lascaux)
as we can get in the field of deep learning.

![Neural network graph from a 1962 paper.](images/lascaux.png)

Today, graphs continue to be a common way to express 
neural networks. Here's a more contemporary example 
from a popular 2017 paper.

![Neural network graph from a 2017 paper.](images/transformer.png)

In both diagrams, we see **vertices** (expressed as small dots in the first diagram and rounded rectangles in the second) connected by **edges** (expressed as arrows in both diagrams). Vertices and edges are the two fundamental elements of any graph. 

Here is a simpler example of a graph:

![Board 3A](boards/board3a.png)

To formally define a graph, we begin by assuming a set $V$ of 
unique symbols called **vertices**. In the above graph: 

@eq[
    V = \{A, B, C, D\} 
@eq]

An **edge** can then be defined as an ordered pair $(v_1, v_2)$, where $v_1$ and $v_2$ are vertices. Because an edge is an ordered pair, that suggests it has a direction, namely that the edge $(v_1, v_2)$ goes from vertex $v_1$ to vertex $v_2$. Typically, we draw an edge as an arrow pointing from $v_1$ to $v_2$. 

One could imagine defining an edge differently, as an unordered set of two vertices. In this case, there would be no direction between the vertices, and the natural visual representation would be a simple straight line. This is also a common way to define an edge (called an **undirected edge**). However, we will be focusing exclusively on **directed edges**, adopting the following definition of a graph.

@focus[
    A (directed) graph is a pair $(V,E)$, where $V$ is a set of vertices and $E$ is a subset of $V \times V$.
@focus][Definition]	

We can also talk about **paths** in a graph.

# exercises

1. Draw a neural network as a graph.
