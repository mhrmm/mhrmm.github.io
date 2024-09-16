@prologue[
  gradient descent-driven machine learning
][
  /images/guessyourage.png
][
  Many people study deep learning in the hopes of making some money from it. Nothing terribly wrong with that, but deep learning can sometimes be a stressful pursuit. In the spirit of due diligence, let's explore an alternative but equally viable career path. Let's become carnies.
][
  Carny is slang for carnival worker, a career path often associated with roving wagons of the late nineteenth and early twentieth centuries. Carnies would set up booths to test your strength, your dexterity, your prowess with a BB gun. While less common nowadays, there still exist great neoned spaces of funnel cakes and cotton candy machines and different ways you can pay to go in circles, where everything is totally easy until you try it, and where questions like "why would I want my name on a grain of rice" lose their relevance in the intoxicating vapor of nacho cheese.
]
[
  One enduring carnival game challenges the passerby: «I WILL GUESS YOUR AGE OR YOU WIN A PRIZE!» This is the booth we'll try to manage.
]


# a statistical approach to carnyhood

In the traditional version of this game, the carnival worker estimates age based on physical characteristics. We will take a slightly different approach and permit ourselves to ask a single question of our customers. In particular, we'll ask them: "How many computer science (CS) courses have you taken?" We arrived at this particular question because we have three friends (being computer scientists, many of our friends are also computer scientists) whose data suggested it was a reliable indicator of age.

![our friends](/images/cs_friends.png)

Looks pretty bulletproof! It seems like we can safely assume that a person's age is approximately a linear function of the number of CS courses they've taken. Let variable $x$ represent the number of CS courses taken, and let variable $y$ represent the person's age. We'll assume that there exists some real number $\theta$ such that, for most people, $y \approx \theta x$.

What is this mystery multiplier $\theta$? We don't know, so we have to **estimate** it. One reasonable estimate is the value that best explains our observations about our friends. In other words, we'd like:

- $5\theta \approx 20$, or alternatively: $ \left\lvert 20-5\theta \right\rvert \approx 0$.
- $8\theta \approx 28$, or alternatively: $ \left\lvert 28-8\theta \right\rvert \approx 0$.
- $12\theta \approx 41$, or alternatively: $ \left\lvert 41-12\theta \right\rvert \approx 0$.

We can capture all three conditions with a single statement: 

@eq[\left\lvert 20-5\theta \right\rvert + \left\lvert 28-8\theta \right\rvert + \left\lvert 41-12\theta \right\rvert \approx 0
@eq]

Conveniently, the left-hand side of this statement is always non-negative, and it equals zero if and only if $5\theta=20$, $8\theta=28$, and $12\theta=41$, i.e. $\theta$ perfectly predicts our observations. This suggests a computational method for choosing a value for $\theta$ - find the value that minimizes the following function:

@eq[
	l_1(\theta)= \left\lvert 20-5\theta \right\rvert + \left\lvert 28-8\theta \right\rvert + \left\lvert 41-12\theta \right\rvert 
@eq]

But this isn't the only way to express our desire that $5\theta \approx 20$, $8\theta \approx 28$, and $12\theta \approx 41$. These conditions are also captured by the statement:

@eq[
	(20-5\theta)^2 +(28-8\theta)^2 +(41-12\theta)^2 \approx 0
@eq]

Again the left-hand side of this statement is always non-negative, and equals zero if and only if $\theta$ perfectly predicts our observations. So an alternative method of choosing $\theta$ is to find the value that minimizes:

@eq[
	l_2(\theta)= (20-5\theta)^2 +(28-8\theta)^2 +(41-12\theta)^2  
@eq]

Functions like $l_1(\theta)$ and $l_2(\theta)$ go by many names. Often they are called **objective functions**, because our training objective is to find its minimal value. Another common name is **loss functions**, because they quantitatively capture the loss of face we experience when we use a particular value for $\theta$. For instance, suppose we decide that $\theta=10$. If so, then we predict that Alice's age is 50, Bob's age is 80, and Chandra's age is 120. This incurs a loss (according to function $l_1$) of

@eq[
	\left\lvert 20 - 5 \cdot 10 \right\rvert + \left\lvert 28 - 8 \cdot 10 \right\rvert + \left\lvert 41 - 12 \cdot 10 \right\rvert = 161
@eq]

which corresponds to 161 units of acute embarrassment. Contrast this with the choice of $\theta=3$, which incurs only 14 units of loss:

@eq[
	\left\lvert 20 - 5 \cdot 3 \right\rvert + \left\lvert 28 - 8 \cdot 3 \right\rvert + \left\lvert 41 - 12 \cdot 3 \right\rvert = 14	
@eq]

Our goal is to find a value of $\theta$ that minimizes our loss. As an exercise, let's do so for loss function $l_2$. We can use standard calculus techniques. First, take the first derivative of $l_2$:

@proof[
    D_\theta \left( l_2 \right)

    @= D_\theta \left( (20-5\theta)^2 +(28-8\theta)^2 +(41-12\theta)^2 \right) 
        % by the definition of $l_2$

    @= \mathbf{D_\theta} \left( (20-5\theta)^2 \right) + \mathbf{D_\theta} \left( (28-8\theta)^2 \right) + \mathbf{D_\theta} \left( (41-12\theta)^2 \right) 
        % sum rule of derivatives

    @= \mathbf{2(-5)(20-5\theta)} + \mathbf{2(-8)(28-8\theta)} + \mathbf{2(-12)(41-12\theta)}
        % because $D_\theta \left( (a+b\theta)^2 \right) = 2b(a+b\theta)$

    @= \mathbf{466\theta - 1632}
        % simplifying

@proof]

Now set it equal to zero and solve for $\theta$: 

@proof[
    D_\theta \left( l_2 \right) = 0

    @= \mathbf{466\theta - 1632} = 0        

    @= 466\theta = \mathbf{1632}
        % add 1632 to both sides of the equation

    @= \theta = \frac{1632}{\mathbf{466}}
        % divide both sides by 466

    @= \theta \approx \mathbf{3.5}
        % approximating
@proof][⇒]

A value of approximately $\theta=3.5$ minimizes our $l_2$ loss.

# a statistical approach to carnyhood (epilogue)

With our statistically justified estimate of $\theta \approx 3.5$, we take our show on the road. Unfortunately, most carnival attendees have never taken a computer science course before (i.e. $x=0$), and so we guess that almost everybody is zero years old (as $x=0$).

![guessing that everyone is zero years old](/images/zero_years_old.png)

We quickly go out of business.

(Take this as a cautionary tale. Often we **wrongly** assume that our "training data" — the observations that we use to estimate our parameters — follows the **same** distribution as our evaluation data.)

While we didn't make money from it, our short-lived carny career did highlight several important elements of machine learning:

1. We collected **training data**: the observations about our friends Alice, Bob, and Chandra.
2. We identified a space of **models** for making predictions: the space of all functions of the form $y=\theta x$. The models were **parameterized**, i.e. one could identify a particular model by specifying its **parameter** $\theta$.
3. We developed a **loss function** over parameters that assigned a non-negative real loss to every model in the model space.
4. We performed an **optimization algorithm** (we took the first derivative of the loss function, set it equal to zero, and solved for parameter $\theta$) to find a model with minimal loss. 

# more challenging loss functions

For the rest of the module, our focus will be on the **optimization algorithm**: the procedure for finding a model with minimal loss. This was easy enough with the $l_2$ loss function. We just took the first derivative, set it equal to zero, and solved for $\theta$. But often the loss function is more complicated. What if it looked like this?

@eq[
	l(\theta)=(\sin\: 2\theta)(\log\: \theta^2)+3
@eq]

Let's try the same optimization algorithm. The first derivative is doable:

@proof[
	D_\theta \left( l \right) 
    
    @= D_\theta \left( (\sin\: 2\theta)(\log\: \theta^2)+3 \right)

    @= \mathbf{D_\theta} \left( (\sin\: 2\theta)(\log\: \theta^2) \right) + \mathbf{D_\theta} \left(3 \right) 
      % the sum rule of derivatives

    @= D_\theta \left( (\sin\: 2\theta)(\log\: \theta^2) \right) 
      % because: $D_\theta \left(3 \right)$ = 0

    @= \mathbf{(\log\: \theta^2) D_\theta \left( \sin\: 2\theta \right) +
    (\sin\: 2\theta) D_\theta \left( \log\: \theta^2 \right)}
      % the product rule of derivatives

    @= (\log\: \theta^2) \mathbf{(\cos\: 2\theta) D_\theta \left( 2\theta \right)} +
    (\sin\: 2\theta) D_\theta \left( \log\: \theta^2 \right)
      % because: $D_x \left( \sin\: f(x) \right) = \left( \cos\: f(x) \right) D_x \left( f(x) \right)$

    @= (\log\: \theta^2) (\cos\: 2\theta) \mathbf{\left( 2 \right)} +
    (\sin\: 2\theta) D_\theta \left( \log\: \theta^2 \right)
      % because: $D_x \left( ax \right) = a$

    @= (\log\: \theta^2) (\cos\: 2\theta) \left( 2 \right) +
    (\sin\: 2\theta) \mathbf{\frac{D_\theta \left( \theta^2 \right)}{\theta^2}}
      % because: $D_x \left( \log\: f(x) \right) = \frac{D_x \left( f(x) \right)}{f(x)}$

    @= (\log\: \theta^2) (\cos\: 2\theta) \left( 2 \right) + (\sin\: 2\theta) \cdot \frac{\mathbf{2\theta}}{\theta^2}
      % because: $D_x \left( x^a \right) = a x^{a-1}$

    @= \mathbf{2(\log\: \theta^2) (\cos\: 2\theta) + \frac{2(\sin\: 2\theta)}{\theta}}
      % simplifying
@proof]

Now we have to set it equal to zero and solve for $\theta$. Go ahead! And good luck!

Actually, you may not want to bother trying. If we graph the loss function, it looks like this:

![a hard to optimize loss function](/images/hardtooptimize.png)

There are many **local minima**, and it appears that there isn't a **global minimum**, since the minima seem to just keep getting better as $\theta$ approaches (positive or negative) infinity. So there's really no hope of finding a value of $\theta$ that minimizes the loss. It doesn't exist.

But maybe we don't need to insist on finding the $\theta$ that gives us the **smallest possible** loss. Perhaps we can settle for a $\theta$ that gives a **small enough** loss. After all, in the "guess your age" booth, we don't always have to be perfect, we just don't want to embarrass ourselves. For the above loss function, the loss at $\theta=-7$ is somewhat better than at $\theta=-4$, but the loss at $\theta=-4$ might still be acceptably small.


# basic gradient descent

With our expectations lowered, let's develop an optimization algorithm that finds $\theta$ with an "acceptably small" loss. First, forget the notion that we can somehow graph the loss function as we did above -- where we're going, there are no maps. We're in a hovercraft with nothing but an altimeter (the ability to compute our loss function for any given $\theta$) and short-range sensors (the ability to compute the first derivative of our loss function for any $\theta$).

![initial landing](/images/initial_landing.png)

We make an initial landing at $\theta=-5$. The planet (i.e. the undulating surface of our loss function) is frigidly cold, but it gets warmer in its lower altitudes. Hopefully we can find a valley deep enough and warm enough for shelter. Our short range sensors (i.e. the first derivative of the loss function) indicate that the slope of the ground at $\theta=-5$ is negative. In other words, we can decrease our altitude if we increase $\theta$.

![negative slope](/images/sensors.png)

Sadly, this is an enemy planet. To avoid detection, we must travel above the clouds. That means we have to blindly guess how far to go before we re-land. If we're too conservative and increase $\theta$ only by a smidgen, then we'll waste fuel, re-landing again and again until finally locating the base of the valley. If we're too reckless and increase $\theta$ too much, we may skip over the valley entirely.

![conservative vs reckless](/images/reckless.png)

The first mate has a proposal. So far we've only used the sign of the derivative. Because the derivative was negative at $\theta =-5$, we knew we wanted to increase $\theta$. Can we somehow leverage the magnitude of the derivative to guide how far we go before re-landing?

![large vs small slopes](/images/gd_intuition.png)

Consider when the derivative has a small magnitude. This can happen when the loss function is flattening, which happens near local minima. Conversely, when the derivative has a large magnitude, the slope is steep and possibly suggests we're not yet close to the base of the valley. This gives us a heuristic for how far to fly before relanding:

- If the magnitude of the derivative $D_\theta(l)$ is **small** at $\theta$, then **increase** $\theta$ by a **small** amount.
- If the magnitude of the derivative $D_\theta(l)$ is **large** at $\theta$, then **increase** $\theta$ by a **large** amount.

In other words, **increase** $\theta$ by an amount proportional to the magnitude of the derivative at $\theta$:

@eq[
	\theta \leftarrow \theta + \alpha \left\lvert D_\theta(l)(\theta) \right\rvert	
@eq]

where $\alpha$ is a positive real number we'll refer to as the **learning rate**.

Great! We have a strategy for when the derivative is negative. When the derivative is positive, we can adopt a similar strategy, but now we want to move in the opposite direction.  In other words, **decrease** $\theta$ by an amount proportional to the magnitude of the derivative:

@eq[
	\theta \leftarrow \theta - \alpha \left\lvert D_\theta(l)(\theta) \right\rvert	
@eq]

To summarize:
- if $D_\theta(l)(\theta)$ is **negative**, then **add** $\alpha \left\lvert D_\theta(l) \right\rvert$ **to** $\theta$
- if $D_\theta(l)(\theta)$ is **positive**, then **subtract** $\alpha \left\lvert D_\theta(l) \right\rvert$ **from** $\theta$


Either way, it's actually the same thing: simply **subtract** $\alpha D_\theta(l)(\theta)$ **from** $\theta$.

Our optimization algorithm is therefore:
- start at an arbitrary $\theta$
- keep "landing" at a new $\theta$, i.e. evaluate the derivative $D_\theta(l)$ at $\theta$ and update $\theta$:
    - @eq[ 
        \theta \leftarrow \theta - \alpha D_\theta(l)(\theta)
      @eq]


Algorithms like this, where we use the first derivative to guide our optimization, are known as **gradient descent** algorithms. Experiment with how gradient descent behaves using the following interactive demo:

@component[GradientDescentDemo]

Try some different learning rates and starting positions! Here are some phenomena you might observe:

- With a sufficiently low learning rate (e.g. 0.10), starting in either valley means that you ultimately arrive at the base of that valley. This is not necessarily a good thing or a bad thing. It's nice that the procedure converges to some minimum, but we can potentially miss a deeper valley when the learning rate is too small.
- With a learning rate of 0.20, the hovercraft typically doesn't converge to the deepest point of the rightmost valley, but rather bounces erratically around it.
- A learning rate of 0.30 can cause very erratic behavior, and the hovercraft might end up flying off towards infinity (depending on the initial position).



# setting a good learning rate

As the above demo suggests, one of the trickiest issues with gradient descent is the **learning rate**. If learning rate $\alpha$ is too small, then the optimization algorithm can take a very long time to reach a local minimum, because each position update is overly conservative. If $\alpha$ is too large, then the optimization algorithm may keep jumping past the nearest local minimum.

![learning rate pitfalls](/images/learningrates.png)

Unfortunately, there isn't a single fixed learning rate that works well for all loss functions. Fortunately, we don't necessarily need to adopt a single fixed learning rate. As we proceed with gradient descent, we could **adapt** the learning rate. One common strategy is to start with an aggressive (i.e. high) learning rate, and gradually become more conservative (i.e. lower the learning rate) as the algorithm continues. 

![intuition behind adagrad](/images/adagrad.png)

We don't know anything about the landscape at first, so it benefits us to survey a few different landing sites and get a sense of the more promising (i.e. deeper) areas. Once we locate a promising valley, we no longer want to jump around erratically. We want to remain in the valley and carefully find its lowest point.

To mathematically implement this strategy, we maintain a tally of the slopes $D_{\theta} (l)(\theta^{(t)})$ we land upon. Steeper slopes (more promising areas of exploration) have a larger magnitude, and therefore increase the tally more significantly. Since we care only about the magnitudes, our tally will be the sum of the squared derivatives:

@eq[
	\sum_{i=0}^t \left(D_{\theta}(l)(\theta^{(i)})\right)^2
@eq]

To counterbalance the effects of the squaring, we use the square root of the tally as our "odometer" of how much we've explored so far:

@eq[
	\sqrt{\sum_{i=0}^t \left( D_{\theta}(l)(\theta^{(i)}) \right)^2}
@eq]

We divide the original learning rate by our "exploration odometer" to set an increasingly conservative learning rate for each subsequent time step, adding in a positive constant $\delta$ to avoid division by zero. This optimization algorithm is called **adagrad**.

![adagrad pseudocode](/images/adagradcode.png)

Experiment with **adagrad** using the following interactive demo:

@component[AdagradDemo]


# going with the flow

Gradient descent is not unlike the classic game of "I'm thinking of a number between 1 and 100," except that this game is a more frustrating version: "I'm thinking of a number." Imagine you were playing this game. You start by guessing 10. Your opponent says "higher". Then you guess 20. Your opponent says "higher". Then you guess 30. Your opponent says "higher". 

Eventually you will likely get impatient with this. There's no upper bound, and your opponent keeps saying "higher". You'd probably start skipping ahead by larger and larger intervals (100, 1000, 1000000, etc.) until your opponent finally said "lower", giving you an upper bound, and perhaps a sense of peace.

We can implement the same strategy for gradient descent. If the slope repeatedly tells us to keep heading in the same direction, why not start accelerating, like a rolling stone? There's a variant of gradient descent, called **momentum**, that updates our position not just based on the derivative, but also based on the size of our previous step. Suppose the loss function is:

@eq[
l(\theta)= \left\lvert 0.2 \theta \right\rvert
@eq]

Using the basic gradient descent algorithm (with a fixed learning rate $\alpha=0.5$, and initial position $\theta^{(0)}=2.0$), here are the first five position updates: 

![demonstration of no momentum](/images/nomomentum.png)

Since the slope is **constant**, we always make the same update, reducing our position by 0.1.

To simulate "momentum", we update our position not just based on the current **slope**, but also by adding in our **previous update**. This creates a snowball effect, with increasingly aggressive updates, as long as we keep heading in the same direction. To control the relative impact of momentum, we include a **momentum rate** $\mu$ as a multiplier. In this example, we use momentum rate $\mu=1.0$:

![demonstration of momentum](/images/momentumsteps.png)


Here is the pseudocode for gradient descent with momentum: 

![momentum pseudocode](/images/momentum_pseudocode.png)

Experiment with **momentum** using the following interactive demo:

@component[MomentumDemo]




# other variants of gradient descent

There are many other variants of gradient descent that follow the general template. For instance, instead of using the sum of squared derivatives as our "exploration odometer" (i.e. **adagrad**), a technique called **rmsprop** uses a decaying average of the squared derivatives. A decaying average gives more weight to the recent derivatives, allowing the algorithm to gradually forget the past and become aggressive again if it enters a phase during which it makes little vertical progress.  

It is also perfectly possible to mix-and-match strategies. A popular technique called **adam** can be roughly described as **rmsprop** with **momentum**, i.e. it uses the **SetLearningRate** subroutine of rmsprop in concert with the **UpdatePosition** subroutine of momentum.

One might wonder: why so many variants? which one should I use? As yet, there appears to be no single technique that consistently outperforms the rest. As Goodfellow, Bengio, and Courville put it in their book: "The choice of which algorithm to use, at this point, seems to depend largely on the user's familiarity with the algorithm."

# multivariable gradient descent


So far, we have only considered loss functions of a single variable $\theta$, but usually loss functions involve more than one variable. After the spectacular failure of our first **GUESS YOUR AGE** booth, we retool and relaunch, like a phoenix from the ashes. 

This time we collect different information from our friends. Using their photos, we analyze their hair colors with a color meter that measures **saturation** and **lightness**. Both are measured on a real scale from 0 to 1. Higher saturation corresponds to more intense color. As we vary lightness from 0 to 1, the color goes from very dark to very light:

@component[ColorPicker]

We notice that our older friends' hair has lower saturation and higher lightness. Based on this, we formulate a new strategy for our booth. Rather than asking customers how many CS classes they've taken, we'll wear a special set of glasses that measures the saturation and lightness of their hair. Based on these numbers, we'll predict their age using the formula: 

@eq[
\theta_1 x_1 + \theta_2 x_2
@eq]

where the variables $x_1$ and $x_2$ represent the **saturation** and **lightness** of their hair color, and the variables $\theta_1$ and $\theta_2$ are **parameters** that we'll **estimate** based on the following observations we've made about our friends:

![saturation and lightness data](/images/friendshair.png)

Just like before, we want to find parameter values that do a good job of predicting our friends' ages. We will refer to the values we find as **parameter estimates**. In this case, we want to find parameter estimates $\hat{\theta}_1$ and $\hat{\theta}_2$ that:

- approximately predict Alice's age:
  @eq[
    .72\hat{\theta}_1+.06\hat{\theta}_2 \approx 20
  @eq]
- approximately predict Bob's age:
  @eq[
    .34\hat{\theta}_1+.25\hat{\theta}_2 \approx 28
  @eq]
- approximately predict Chandra's age:
  @eq[
    .17\hat{\theta}_1+.57\hat{\theta}_2 \approx 41
  @eq]

We can combine these three conditions into a single objective. We want:

@eq[
  (.72\hat{\theta}_1+.06\hat{\theta}_2-20)^2 + (.34\hat{\theta}_1+.25\hat{\theta}_2-28)^2 +(.17\hat{\theta}_1+.57\hat{\theta}_2-41)^2	
@eq]

to be as close to zero as possible. Observe that this expression is always non-negative, and when it equals zero, the parameters predict our friends' ages perfectly. So we'll make it our loss function. Let:

@eq[
  l(\theta_1, \theta_2) = (.72\theta_1+.06\theta_2-20)^2 + (.34\theta_1+.25\theta_2-28)^2 +(.17\theta_1+.57\theta_2-41)^2
@eq]

Previously, we used gradient descent to find a sufficiently small value of our loss function, but that was for a loss function of one variable. Now we have a loss function of two variables. How can gradient descent be adapted? Rather than using variable $\theta$ to refer to a single parameter, we will now use it to refer to a **vector** of parameters. 

Our loss function $l$ assigns a non-negative loss to each 2-dimensional vector $\theta = \begin{pmatrix} \theta_1\\ \theta_2 \end{pmatrix}$. We can use a **contour plot** to visualize the loss function:

@component[ContourExplorer]

Each curve of the plot connects values of $\theta$ for which loss $l(\theta)$ is equivalent. The plot also uses shading to indicate the magnitude of $l(\theta)$: darker shades of red indicate larger values of $l(\theta)$, which means that the pale oval at the center is a valley.

The above contour plot is interactive. Try clicking on different points on the innermost curve. They should all have the same loss, but it's difficult to click exactly on the curve, so you'll probably see losses between 1900 and 2000 (unless you're bad at clicking). If you click close to the bottom of the valley, then you should get a loss that is reasonably close to zero (I can get a loss of less than 15 if I keep clicking). Note that there is no point that has a loss of zero, because technically there is no value of $\theta$ that perfectly predicts our data.

For multivariable gradient descent, we execute single-variable gradient descent in parallel for each variable, while pretending the other variables don't exist. Or, more accurately, we pretend that the other variables have already been set to their ideal values, so the only thing left to do is optimize the remaining variable. In our example then, we need to compute two derivatives: one where we treat $\theta_2$ as a constant and differentiate with respect to $\theta_1$, and one where we treat $\theta_1$ as a constant and differentiate with respect to $\theta_2$. In other words, we need to compute the **partial derivatives** $D_{\theta_1}(l)$ and $D_{\theta_2}(l)$. 

@proof[
    D_{\theta_1}(l)

    @= D_{\theta_1} \left( (.72\theta_1+.06\theta_2-20)^2 + (.34\theta_1+.25\theta_2-28)^2 +(.17\theta_1+.57\theta_2-41)^2 \right)

    @= \begin{matrix}&\mathbf{D_{\theta_1}} \left( (.72\theta_1+.06\theta_2-20)^2 \right) \\ +& \mathbf{D_{\theta_1}} \left( (.34\theta_1+.25\theta_2-28)^2 \right) \\ +& \mathbf{D_{\theta_1}} \left( (.17\theta_1+.57\theta_2-41)^2 \right) \end{matrix}
      % sum rule

    @= \begin{matrix}&2(.72\theta_1+.06\theta_2-20)  D_{\theta_1} \left( .72\theta_1+.06\theta_2-20 \right) \\ +& 2(.34\theta_1+.25\theta_2-28) D_{\theta_1} \left( .34\theta_1+.25\theta_2-28 \right) \\ +& 2(.17\theta_1+.57\theta_2-41) D_{\theta_1} \left( .17\theta_1+.57\theta_2-41 \right) \end{matrix}
      % because: $D_x \left( f(x)^a \right) = a f(x)^{a-1} D_x(f(x))$

    @= \begin{matrix}&2(.72\theta_1+.06\theta_2-20) \left( \mathbf{D_{\theta_1}}(.72\theta_1) + \mathbf{D_{\theta_1}}(.06\theta_2 - 20) \right) \\ +& 2(.34\theta_1+.25\theta_2-28) \left( \mathbf{D_{\theta_1}}(.34\theta_1) + \mathbf{D_{\theta_1}}(.25\theta_2 - 28) \right) \\ +& 2(.17\theta_1+.57\theta_2-41) \left( \mathbf{D_{\theta_1}}(.17\theta_1) + \mathbf{D_{\theta_1}}(.57\theta_2 - 41) \right) \end{matrix}
      % sum rule

    @= \begin{matrix}&2(.72\theta_1+.06\theta_2-20) \left( D_{\theta_1}(.72\theta_1) + \mathbf{0} \right) \\ +& 2(.34\theta_1+.25\theta_2-28) \left( D_{\theta_1}(.34\theta_1) + \mathbf{0} \right) \\ +& 2(.17\theta_1+.57\theta_2-41) \left( D_{\theta_1}(.17\theta_1) + \mathbf{0} \right) \end{matrix}
      % constant rule

    @= \begin{matrix}&2(.72\theta_1+.06\theta_2-20)(\mathbf{.72}) \\ +& 2(.34\theta_1+.25\theta_2-28) (\mathbf{.34}) \\ +& 2(.17\theta_1+.57\theta_2-41)(\mathbf{.17}) \end{matrix}
      % power rule

    @= 1.33 \theta_1 + .45 \theta_2 - 61.8
      % approximating
@proof]

@proof[
    D_{\theta_2}(l)

    @= D_{\theta_2} \left( (.72\theta_1+.06\theta_2-20)^2 + (.34\theta_1+.25\theta_2-28)^2 +(.17\theta_1+.57\theta_2-41)^2 \right)

    @= \begin{matrix}&\mathbf{D_{\theta_2}} \left( (.72\theta_1+.06\theta_2-20)^2 \right) \\ +& \mathbf{D_{\theta_2}} \left( (.34\theta_1+.25\theta_2-28)^2 \right) \\ +& \mathbf{D_{\theta_2}} \left( (.17\theta_1+.57\theta_2-41)^2 \right) \end{matrix}
      % sum rule

    @= \begin{matrix}&2(.72\theta_1+.06\theta_2-20)  D_{\theta_2} \left( .72\theta_1+.06\theta_2-20 \right) \\ +& 2(.34\theta_1+.25\theta_2-28) D_{\theta_2} \left( .34\theta_1+.25\theta_2-28 \right) \\ +& 2(.17\theta_1+.57\theta_2-41) D_{\theta_2} \left( .17\theta_1+.57\theta_2-41 \right) \end{matrix}
      % because: $D_x \left( f(x)^a \right) = a f(x)^{a-1} D_x(f(x))$

    @= \begin{matrix}&2(.72\theta_1+.06\theta_2-20) \left( \mathbf{D_{\theta_2}}(.06\theta_2 ) + \mathbf{D_{\theta_2}}(.72\theta_1- 20) \right) \\ +& 2(.34\theta_1+.25\theta_2-28) \left( \mathbf{D_{\theta_2}}(.25\theta_2) + \mathbf{D_{\theta_2}}(.34\theta_1 - 28) \right) \\ +& 2(.17\theta_1+.57\theta_2-41) \left( \mathbf{D_{\theta_2}}(.57\theta_2) + \mathbf{D_{\theta_2}}(.17\theta_1 - 41) \right) \end{matrix}
      % sum rule

    @= \begin{matrix}&2(.72\theta_1+.06\theta_2-20) \left( D_{\theta_2}(.06\theta_1) + \mathbf{0} \right) \\ +& 2(.34\theta_1+.25\theta_2-28) \left( D_{\theta_2}(.25\theta_1) + \mathbf{0} \right) \\ +& 2(.17\theta_1+.57\theta_2-41) \left( D_{\theta_2}(.57\theta_1) + \mathbf{0} \right) \end{matrix}
      % constant rule

    @= \begin{matrix}&2(.72\theta_1+.06\theta_2-20)(\mathbf{.06}) \\ +& 2(.34\theta_1+.25\theta_2-28) (\mathbf{.25}) \\ +& 2(.17\theta_1+.57\theta_2-41)(\mathbf{.57}) \end{matrix}
      % power rule

    @= .45 \theta_1 + .78 \theta_2 - 63.1
      % approximating
@proof]

With the partial derivatives computed, we're ready to execute gradient descent in parallel for parameters $\theta_1$ and $\theta_2$. Suppose our initial position is $\begin{pmatrix}-4 \\ 2\end{pmatrix}$ and our learning rate is $\alpha=.05$.

Initially, $\theta_1=-4$. Our updated $\theta_1$ is:

@proof[
  \theta_1 - \alpha D_{\theta_1}(l)(\theta)

  @= \theta_1 - \alpha(1.33 \theta_1 + .45 \theta_2 - 61.8)

  @= -4 - .05(1.33(-4) + .45(2) - 61.8)
    % because $\theta_1=-4$, $\theta_2=2$, and $\alpha=.05$

  @= -0.689
    % simplifying
@proof]

Initially, $\theta_2=2$. Our updated $\theta_2$ is:

@proof[
  \theta_2 - \alpha D_{\theta_2}(l)(\theta)

  @= \theta_2 - \alpha(.45 \theta_1 + .78 \theta_2 - 63.1)

  @= 2 - .05(.45(-4) + .78(2) - 63.1)
    % because $\theta_1=-4$, $\theta_2=2$, and $\alpha=.05$

  @= 5.167
    % simplifying
@proof]

Therefore, the next step of gradient descent moves from $\begin{pmatrix} -4\\2 \end{pmatrix}$ to $\begin{pmatrix} -0.689\\5.167 \end{pmatrix}$:

![two dimensional gradient descent](/images/twodims.jpg)


Notationally, it helps to introduce a function called the **gradient** that simultaneously computes all the partial derivatives of a vector function, i.e. the gradient maps a vector function to a vector of all its partial derivatives. 
Let vector $x = \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix}$.
The **gradient** of a vector function $f(x)$ is defined:

@eq[
	D_x(f) =
	\begin{pmatrix}
		D_{x_1}(f)\\
		\vdots\\
		D_{x_n}(f)
	\end{pmatrix}	
@eq]

To evaluate every partial derivative at a particular value $\hat{x}$ of $x$, we define the following notation:

@eq[
	D_x(f)(\hat{x}) =
	\begin{pmatrix}
		D_{x_1}(f)(\hat{x})\\
    \vdots\\
		D_{x_n}(f)(\hat{x})
	\end{pmatrix}	
@eq]

@focus[
    Consider the following loss function:
	@eqp[
		l
		\begin{pmatrix}
			\theta_1\\
			\theta_2\\
			\theta_3
		\end{pmatrix}			
		= 5\theta_1 + \theta_1\theta_2 + \theta_3^3
	@eqp]
	The gradient is:
    @eqp[
	\begin{matrix}
		D_\theta(l)
		&=& 
		\begin{pmatrix}
			D_{\theta_1} \left( 5\theta_1 + \theta_1\theta_2 + \theta_3^3 \right)\\
			D_{\theta_2} \left( 5\theta_1 + \theta_1\theta_2 + \theta_3^3 \right)\\
			D_{\theta_3} \left( 5\theta_1 + \theta_1\theta_2 + \theta_3^3 \right)
		\end{pmatrix}
		= 
		\begin{pmatrix}
			5 + \theta_2\\
			\theta_1\\
			3\theta_3^2
		\end{pmatrix}	
	\end{matrix}
    @eqp]
  The value of the gradient at $\hat{\theta} = \begin{pmatrix}1\\2\\3\end{pmatrix}$ is:
  @eqp[
	\begin{matrix}
		D_\theta(l)(\hat{\theta})
		&=& 
		\begin{pmatrix}
			5 + 2\\
			1\\
			3(3^2)
		\end{pmatrix}
		= 
		\begin{pmatrix}
			7\\
			1\\
			27
		\end{pmatrix}	
	\end{matrix}
    @eqp]
@focus][example]
	


Conveniently, we barely have to change our gradient descent code (and perhaps now it's clearer why we called it gradient descent). For basic gradient descent and gradient descent with momentum, we just have to recognize that some of the quantities are now **vectors**, not **scalars**. 

![multidimensional gradient descent](/images/multidimensional_gd.jpg)

Experiment with multidimensional gradient descent using the following interactive demo:

@component[FollowTheFold]

By default, the demo starts the hovercraft at point $\begin{pmatrix}-1.6\\0.55\end{pmatrix}$, using a learning rate of 1.0 and no momentum. 

Push the play button a few times to see what happens. Observe that the hovercraft keeps skipping over the valley in the $\theta_2$ direction, even as it makes progress along the $\theta_1$ axis. 

However, momentum will act **independently** for the two axes $\theta_1$ and $\theta_2$. Whereas the steps along the $\theta_1$ axis are always in the same direction (and therefore can accumulate momentum), the steps along the $\theta_2$ axis keep reversing direction (and therefore cancel each other out). 

Reset the hovercraft to its original position (click directly on the contour plot to reposition the hovercraft). Now try a momentum rate of 0.5. You should observe both an acceleration along the $\theta_1$ axis, and a dampening effect along the $\theta_2$ axis, as the fluctuating step direction gradually moderates the step size.

For the multidimensional case, we need to slightly modify the code for adagrad:

![multidimensional adagrad](/images/multidimensional_adagrad.jpg)

Instead of a single learning rate, there is now a learning rate vector that captures independently learning rates for each axis. This is necessary, because the slopes encountered along each axis are different. Along one axis, the slopes could be gentle (and therefore the adagrad "odometer" would grow slowly), whereas along another axis, the slopes could be steep (and therefore the odometer would grow quickly). We separately track the odometer for each axis.

There are two notations in the above code that may be unfamiliar. The first is **Hadamard product**, denoted using the symbol $\odot$:

@focus[
The **Hadamard product** of two length-$n$ vectors $v$ and $w$ is the elementwise multiplication of the vectors, i.e.
  @eq[
    v \odot w 
    = \begin{pmatrix} v_1\\ \vdots \\ v_n \end{pmatrix} \odot \begin{pmatrix} w_1\\ \vdots \\ w_n \end{pmatrix}
    = \begin{pmatrix} v_1 w_1\\ \vdots \\ v_n w_n\end{pmatrix}
  @eq]
@focus][definition]

In the above adagrad code, Hadamard product is used to show the multiplication of each learning rate with its corresponding derivative in the loss gradient.

The other notation in the adagrad code that might need explanation is when we do the following division:

@eq[
  \frac{1}{\delta + \sqrt{\sum_{i=0}^t D_\theta(l)(\theta^{(i)}) \odot D_\theta(l)(\theta^{(i)})}}
@eq]

In this case, the denominator is a vector, so it might be unclear what $\frac{1}{v}$ means when $v$ is a vector. We simply mean that we take the original vector, and replace all its elements with their reciprocals.

With multidimensional gradient descent, we are now free to minimize loss functions with any (finite) number of parameters. In the future, we will be making the most of this freedom.
