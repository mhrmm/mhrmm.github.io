# variables

Variables are such a central part of a mathematics education that one might wonder: why even bother reviewing them? But deep neural networks conscript so many variables into service that it helps to have formalisms for keeping them straight. 

A **variable** is a symbol associated with a **domain** of possible values. We will usually use capital (English and Greek) letters to represent variables, and we will assume that we can apply a global function $\Delta$ to any variable to obtain its domain.  Domains can be **discrete** (a "countable" set of distinct values, which can be **finite** or **infinite**) or **continuous** (like the set $\mathbb{R}$ of all real numbers), depending on our needs. 

![Examples of variables](boards/board-vars1.png)

@eg[
    To represent the current season, we could use a variable $S$ with the **finite discrete** domain:  
    @eq[ 
        \Delta(S) = \lbrace \texttt{winter}, \texttt{spring}, \texttt{summer}, \texttt{autumn} \rbrace 
    @eq] 
    To represent the current year, we could use a variable $Y$ with the **infinite discrete** domain: 
    @eq[ 
        \Delta(Y) = \lbrace \ldots, 2018, 2019, 2020, 2021, 2022, \ldots \rbrace 
    @eq] 
    To represent the current outdoor temperature, we could use a variable $T$ with **continuous** domain: 
    @eq[ 
        \Delta(T) = \mathbb{R} 
    @eq] 
@eg]

One important discrete domain is the **binary domain** $\lbrace 0, 1 \rbrace$. A variable $X$ with domain $\lbrace 0, 1 \rbrace$ is referred to as a **binary variable**. Binary variables are often interpreted as **booleans**, where the value $1$ corresponds to **true** and the value $0$ corresponds to **false**. 	

In deep learning, variables are often collected together into **sets**, and it helps to have notation for dealing with these variable sets. As with variables, we will usually use capital letters to refer to a variable set, but will often add subscripts to distinguish the components, e.g. 

@eq[X = \lbrace X_1, \dots, X_n \rbrace @eq]

We can extend the idea of the **value of a variable** (e.g. "winter" is a value of variable $S$ that we defined above) to the **value of a variable set**, which we will call an **event**.

[[Define an **event** of variable set $X=\lbrace X_1, \dots, X_n \rbrace $ as a function that maps each variable in set $X$ to a value in its domain $\Delta(X)$.]]

@eg[ 
    Assume $S$ and $Y$ are the example variables defined above. For variable set $V= \lbrace S, Y \rbrace$ , one event is:
    @eq[ 
        \lbrace S \mapsto \texttt{summer}, Y \mapsto 1969 \rbrace 
    @eq] 
    If you're unfamiliar with this way of representing a function, it says: $S$ maps to "summer" and $Y$ maps to 1969.  
@eg]

To refer to an event, we will usually use the **lowercase** version of the letter that represents its variable set. For instance, we would use $x$ to refer to an event of variable set $X$. Because an event $x$ of variable set

@eq[ 
    X= \lbrace X_1, \dots, X_n \rbrace 
@eq]

is a **function**, we can refer to the value of a particular variable $X_i \in X$ using this notation:

@eq[ x(X_i) @eq]

@eg[ 
    Consider the event: 
    @eq[ 
        v= \lbrace S \mapsto \texttt{summer}, Y \mapsto 1969 \rbrace 
    @eq]
    Then $v(S)= \texttt{summer}$ and $v(Y)=1969$. 
@eg]

It will sometimes be convenient to have a more compact notation for events.  To refer to an arbitrary event @eq[ \lbrace X_1 \mapsto x_1, X_2 \mapsto x_2, \dots , X_n \mapsto x_n \rbrace @eq] of a variable set $\lbrace X_1, X_2, \dots, X_n \rbrace$, we will sometimes just use the concatenation $x_1x_2...x_n$. Similarly, given two events $v \in \Delta(V)$,  $w \in \Delta(W)$ of disjoint variable sets $V$ and $W$, we will use the concatenation $vw$ to refer to the union $v \cup w$ of the events.

@eg[ 
    In a proof, we might state: "Let $sy$ be an event of variable set $\lbrace S, Y\rbrace $."  In this context, $sy$ is a shorthand for: 
    @eq[ 
        \lbrace S \mapsto s, Y \mapsto y\rbrace 
    @eq]
@eg]

Finally, define the **domain** $\Delta(X)$ of variable set $X=\lbrace X_1, \dots, X_n \rbrace$ as the set of all possible events of $X$.

@eg[ 
    Domain $\Delta({S, Y})$ contains the following events (among infinitely many others): 
    @eq[ 
        \lbrace S \mapsto \texttt{summer}, Y \mapsto 1969 \rbrace
    @eq] 
    @eq[ 
        \lbrace S \mapsto \texttt{winter}, Y \mapsto 1709 \rbrace
    @eq] 
    @eq[ 
        \lbrace S \mapsto \texttt{spring}, Y \mapsto 2020 \rbrace
    @eq] 
@eg]


# pop quiz

@popquiz[
    @popquizitem[
        @q[
            If we have three variables $A$, $B$, $C$, each with domain of size 4, what is the size of the domain of the variable set $\lbrace A, B, C \rbrace$?
        @q]
        @a[
            If variables $A$, $B$, and $C$ each have a domain of size 4, the size of the combined domain of the variables $A$, $B$, and $C$ is the product of the sizes of their individual domains, i.e.: 
            @eq[
                4 * 4 * 4 = 64
            @eq]
        @a]
    @popquizitem]
    @popquizitem[
        @q[
            Give a real-world example of a continuous value.
        @q]
        @a[
            A real-world example of a continuous variable is temperature. Temperature can take on any value within a given range and is not restricted to specific, separate values. For instance, the temperature in a city can be 72.3 degrees Fahrenheit, 72.31 degrees Fahrenheit, 72.314 degrees Fahrenheit, and so on, with the value changing continuously and smoothly over time.
        @a]  
    @popquizitem]     
@popquiz]     