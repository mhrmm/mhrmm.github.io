@prologue[
  mathematical foundations
][
  /images/blackboard.png
][
  Without mathematics, there’s nothing you can do. Everything around you is mathematics. Everything around you is numbers. 「Shakuntala Devi」
][
  One, two, three, four, tell me that you love me more.「Feist」
 ]
[
  You can't kick ass if you can't kick.
  「Some contestant on season one of Race To Survive: Alaska. They didn't win.」
]


# vectors

A **vector** is an array of numbers, which we will represent like this:

@eq[
    \begin{pmatrix} 1.5\\ -2 \\ 50 \end{pmatrix}
@eq]

We will adopt the convention of using parentheses (as above) to delimit vectors. When using a variable to represent a vector, we will typically use upper-case letters, e.g.:

@eq[
    A = \begin{pmatrix} 1.5\\ -2 \\ 50 \end{pmatrix}
@eq]

Moreover, we will use subscripts to represent individual elements of a vector, e.g.:

@eq[
    A =  \begin{pmatrix} A_1\\ A_2 \\ A_3 \end{pmatrix} = \begin{pmatrix} 1.5\\ -2 \\ 50 \end{pmatrix}
@eq]

The number of elements in a vector is referred to as the **length** of the vector. For instance, the above example has length 3.

In deep learning, vectors are used extensively to organize related quantities. We will often use them to compute **weighted sums** using the **dot product** operator. 


@focus[
    Let $A =  \begin{pmatrix} A_1\\ \vdots \\ A_n \end{pmatrix}$ and 
    $B =  \begin{pmatrix} B_1\\ \vdots \\ B_n \end{pmatrix}$ be vectors of length $n$. The **dot product** operator is defined:
    @eq[
    A \cdot B
    =
    A_1 B_1 + \dots + A_n B_n
    @eq]
@focus][Definition]

@focus[
    For instance, suppose you taking a course whose grade breakdown was 20% homework, 30% midterm, and 50% final exam. If your homework score was 90/100, your midterm score was 80/100, and your final exam score was 70/100, then your overall score would be the following weighted sum:
    @eq[
        .20 \times 90 + .30 \times 80 + .50 \times 70 = 77
    @eq]
    Another way to express this weighted sum is to collect the percentages and the scores into two separate vectors:
    @eq[
        A =  \begin{pmatrix} .20\\ .30\\ .50 \end{pmatrix} 
        \mbox{ and }
        B =  \begin{pmatrix} 90\\ 80\\ 70 \end{pmatrix} 
    @eq]
    Then the weighted sum can be expressed using the **dot product** operator:
    @eq[
        A \cdot B
        =
        \begin{pmatrix} .20\\ .30\\ .50 \end{pmatrix} 
        \cdot
        \begin{pmatrix} 90\\ 80\\ 70 \end{pmatrix} 
        =
        .20 \times 90 + .30 \times 80 + .50 \times 70 
        = 77
    @eq]
@focus][Example]

# matrices

Sometimes we need to compute lots of similar weighted sums. Imagine that we didn't just want to compute the final grade of one student, but rather the final grades of several students.

Here's how each student performed in the course:

![Course grades](/boards/board-matrices1.jpg)

As before, the course has the following grade breakdown:

- 20% homework
- 30% midterm
- 50% final exam

But there's also an alternative grade breakdown for students who perform better on the final exam than on the midterm. In that case, they can opt for the following grade breakdown:

- 20% homework
- 0% midterm
- 80% final exam

Each student's final grade according to each grade breakdown can be calculated by computing six similar dot products:

![Final grade computation](/boards/board-matrices2.jpg)

For instance, the top-left box computes the final grade of the first student according to the first grade breakdown:

@eq[
    \begin{pmatrix} .2\\ .3\\ .5 \end{pmatrix} 
        \cdot
        \begin{pmatrix} 80\\ 95\\ 90 \end{pmatrix} 
        =
        .2 \times 80 + .3 \times 95 + .5 \times 90 
        = 89.5
@eq]

We can express the above grid of computations more compactly by flipping the grade breakdown vectors on their side and performing a **matrix multiplication**:

![Final grade computation as matrix multiplication](/boards/board-matrices3.jpg)

This is a general technique that will be central to our study of deep learning, so let's formalize these ideas.

@focus[
    A **matrix** is a two-dimensional array of numbers. 
@focus][Definition]

@focus[
    The matrices from our grade breakdown example can be defined:
    @eq[
        A = \begin{bmatrix} .2 & .3 & .5 \\ .2 & 0 & .8 \end{bmatrix} 
    @eq]
    @eq[
        B = \begin{bmatrix} 80 & 90 & 96 \\ 95 & 80 & 90 \\ 90 & 70 & 92 \end{bmatrix} 
    @eq]
    Since matrix $A$ has 2 rows and 3 columns, it can be referred to as a $2\times 3$ matrix, or we can say that it has **shape** $(2,3)$. We will adopt the convention of using square brackets (as above) to denote matrices.
@focus][Example]


@popquiz[
    @popquizitem[
        @q[
            What is the shape of matrix $B$?
        @q]
        @a[
            Since matrix $B$ has 3 rows and 3 columns, it is a 3x3 matrix. In other words, it has shape $(3,3)$.
        @a]
    @popquizitem]   
@popquiz]     

We can refer to individual elements, row, and columns of a matrix using subscripts:
- $X_{ij}$ refers to the **element** of matrix $X$ at row $i$ and column $j$. 
- $X_{i\star}$ refers to the $i$th **row** of matrix $X$, expressed as a vector.
- $X_{\star j}$ refers to the $j$th **column** of matrix $X$, expressed as a vector.

@focus[
    Define:
    @eq[
        A = \begin{bmatrix} .2 & .3 & .5 \\ .2 & 0 & .8 \end{bmatrix} 
    @eq]
    Then:
    @eq[ A_{11} = .2, A_{12} = .3, A_{13} = .5 @eq]
    @eq[ A_{21} = .2, A_{22} = 0, A_{23} = .8 @eq]
    @eq[ A_{1\star} = \begin{pmatrix} .2 \\ .3 \\ .5  \end{pmatrix}, A_{2\star} = \begin{pmatrix} .2 \\ 0 \\ .8 \end{pmatrix}  @eq]
    @eq[ A_{\star 1} = \begin{pmatrix} .2 \\ .2  \end{pmatrix}, A_{\star 2} = \begin{pmatrix} .3 \\ 0 \end{pmatrix} , A_{\star 3} = \begin{pmatrix} .5 \\ .8 \end{pmatrix}  @eq]
@focus][Example]

For the following questions, let:
@eq[
    B = \begin{bmatrix} 80 & 90 & 96 \\ 95 & 80 & 90 \\ 90 & 70 & 92 \end{bmatrix} 
@eq]

@popquiz[
    @popquizitem[
        @q[
            For matrix $B$, what is $B_{32}$?
        @q]
        @a[
            $B_{32}$ is the element at row 3 and column 2 of matrix $B$. So $B_{32} = 70$. 
        @a]
    @popquizitem]   
    @popquizitem[
        @q[
            For matrix $B$, what is $B_{\star 2}$?
        @q]
        @a[
            $B_{\star 2}$ is the vector corresponding to column 2 of matrix $B$. So: $B_{\star 2} = \begin{pmatrix} 90 \\ 80 \\ 70  \end{pmatrix} $ 
        @a]
    @popquizitem] 
    @popquizitem[
        @q[
            For matrix $B$, what is $B_{3 \star}$?
        @q]
        @a[
            $B_{3 \star}$ is the vector corresponding to row 3 of matrix $B$. So: $B_{3 \star} = \begin{pmatrix} 90 \\ 70 \\ 92  \end{pmatrix} $ 
        @a]
    @popquizitem]   
@popquiz]     


@focus[
    Let $A$ be a $m \times n$ matrix and let $B$ be a $n \times p$ matrix. Define $C = AB$ as the $m \times p$ matrix such that:
    @eq[
        C_{ij} = A_{i \star} \cdot B_{\star j}
    @eq]
@focus][Definition]



@focus[
    Let:
    @eq[
        A = \begin{bmatrix} .2 & .3 & .5 \\ .2 & 0 & .8 \end{bmatrix} 
    @eq]
    @eq[
        B = \begin{bmatrix} 80 & 90 & 96 \\ 95 & 80 & 90 \\ 90 & 70 & 92 \end{bmatrix} 
    @eq]
    Then:
    @eq[
        AB 
        = \begin{bmatrix} 
            \begin{pmatrix} .2 \\ .3 \\ .5 \end{pmatrix} \cdot 
            \begin{pmatrix} 80 \\ 95  \\ 90 \end{pmatrix}
            &
            \begin{pmatrix} .2 \\ .3 \\ .5 \end{pmatrix} \cdot 
            \begin{pmatrix} 90 \\ 80  \\ 70 \end{pmatrix}  
            &
            \begin{pmatrix} .2 \\ .3 \\ .5 \end{pmatrix} \cdot 
            \begin{pmatrix} 96 \\ 90  \\ 92 \end{pmatrix}  
            \\
            \begin{pmatrix} .2 \\ 0 \\ .8 \end{pmatrix} \cdot 
            \begin{pmatrix} 80 \\ 95  \\ 90 \end{pmatrix}
            &
            \begin{pmatrix} .2 \\ 0 \\ .8 \end{pmatrix} \cdot 
            \begin{pmatrix} 90 \\ 80  \\ 70 \end{pmatrix}  
            &
            \begin{pmatrix} .2 \\ 0 \\ .8 \end{pmatrix} \cdot 
            \begin{pmatrix} 96 \\ 90  \\ 92 \end{pmatrix}  
          \end{bmatrix}        
    @eq]
    Which means:
    @eq[
    AB = \begin{bmatrix} 
            89.5 & 77 & 92.2 \\
            88 & 74 & 92.8
    \end{bmatrix}
    @eq]
@focus][Example]

In the following interactive demo, hovering over an element of the $AB$ matrix will highlight the computation of that element.

@component[MatrixMultiplication]

For the following questions, let:

@eq[
    A = \begin{bmatrix} 
            1 & 2 \\
            3 & 4 \\
            5 & 6
    \end{bmatrix}
    ,
    B = \begin{bmatrix} 
            6 & 5 & 4 \\
            3 & 2 & 1 
    \end{bmatrix},
    C = \begin{bmatrix} 
            5 & 1 \\
            10 & 2
    \end{bmatrix},
@eq]

@popquiz[
    @popquizitem[
        @q[
            What is $AB$?
        @q]
        @a[
            $AB = \begin{bmatrix} 12 & 9 & 6 \\ 30 & 23 & 16 \\ 48 & 37 & 26 \end{bmatrix}$.
        @a]
    @popquizitem]   
    @popquizitem[
        @q[
            What is $BA$?
        @q]
        @a[
            $BA = \begin{bmatrix} 41 & 56 \\ 14 & 20 \\ \end{bmatrix}$. Note that matrix multiplication is not commutative, i.e. it is not always true that $AB = BA$.
        @a]
    @popquizitem] 
    @popquizitem[
        @q[
            What is $AC$?
        @q]
        @a[
            $AC = \begin{bmatrix} 25 & 5 \\ 55 & 11 \\ 85 & 17 \end{bmatrix}$.
        @a]
    @popquizitem]   
    @popquizitem[
        @q[
            What is $BC$?
        @q]
        @a[
            By the definition of matrix multiplication, $B$ must be a $m \times n$ matrix and $C$ must be a $n \times p$ matrix. In other words, the number of columns of $B$ must be equal to the number of rows of $C$. However, this is not the case here ($B$ has 3 columns and $C$ has 2 rows), so the matrix product $BC$ is not defined.
        @a]
    @popquizitem]   
@popquiz]    

# derivatives

This course assumes you have previously taken an introductory calculus course. However it uses calculus notation that, while not original, may be different from the notation that you have previously used.

@focus[
    Let $f$ be a function of variable $x$. Define $D_x(f)$ as the first derivative of $f$ with respect to $x$.
@focus][Definition]

A useful computer sciencey way to think about $D_x$ is as a function that takes another function $f$ as its argument, and returns a third function (the first derivative of $f$ with respect to $x$). 

Assume $f$, $g$, and $h$ are all functions of variable $x$, and that $k$ is a constant that doesn't depend on $x$. Here are some standard rules for computing derivatives:

@focus[
    Let $f(x) = k$. Then $D_x(f) = 0$.
@focus][Constant Rule]

@focus[
    Let $f(x) = x^k$. Then $D_x(f) = kx^{k-1}$.
@focus][Power Rule]

@focus[
    Let $f = g + h$. Then $D_x(f) = D_x(g) + D_x(h)$.
@focus][Sum Rule]

@focus[
    Let $f = gh$. Then $D_x(f) = h D_x(g) + g D_x(h)$.
@focus][Product Rule]

Let's exercise our skills by computing the derivative of $f(x) = 2x^3 + 7$.

@proof[
    D_x \left( f \right)

    @= D_x \left( 2x^3 + 7 \right) 
        % by the definition of $f$

    @= \mathbf{D_x} \left( 2x^3 \right) + \mathbf{D_x} \left( 7 \right) 
        % sum rule

    @= \mathbf{6x^2} + D_x \left( 7 \right) 
        % power rule

    @= 6x^2 + \mathbf{0}
        % constant rule

    @= 6x^2
        % simplifying

@proof]

@popquiz[
    @popquizitem[
        @q[
            If $f(x) = \sqrt{x}$, what is $D_x(f)$?
        @q]
        @a[
            Since $\sqrt{x}$ can be alternatively expressed as $x^{\frac{1}{2}}$, we can apply the Power Rule to obtain $D(f) = \frac{1}{2} x^{-\frac{1}{2}}$, which can also be expressed as $D(f) = \frac{1}{2\sqrt{x}}$.
        @a]
    @popquizitem]   
@popquiz]     
