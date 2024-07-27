# computing the partial derivative

In order to compute the partial derivative:
@eq[
	\frac{\partial l}{\partial z_i} =
	\frac{\partial}{\partial z_i} (-\log\: \sigma_y(z))
@eq]
which involves the softmax function $\sigma_y$, we first need to know how to compute partial derivatives of softmax. The following theorem tells us how.

@focus[
    For the (single-component) softmax function:
	@eq[
        \sigma_j(z) =
        \sigma_j\left(
        \begin{bmatrix}
            z_1\\
            \vdots\\
            z_C
        \end{bmatrix}
        \right) = \frac{\exp(z_j)}{\sum\limits_{c=1}^C \exp(z_c)}
	@eq]
    where $1 \leq j \leq C$, the partial derivative $\frac{\partial}{\partial z_i} \mathcal{\sigma}_j(z)$ is:
    @eq[
        \frac{\partial}{\partial z_i} \mathcal{\sigma}_j(z)
        =
        \sigma_j(z)(\mathbb{1}(i=j) - \sigma_i(z))        
    @eq]
@focus][theorem]


@proof[
    \frac{\partial}{\partial z_i} \sigma_j(z) 
    
    @= \sigma_j(z) \frac{\partial}{\partial z_i} \log\: \sigma_j(z)  
      %  because: $\frac{\partial}{\partial z_i} \log\: \sigma_j(z) = \frac{1}{\sigma_j(z)}\frac{\partial}{\partial z_i} \sigma_j(z)$

    @= \sigma_j(z) \frac{\partial}{\partial z_i} \log\: \mathbf{\frac{e^{z_j} }{\sum\limits_{c=1}^C e^{z_c} }} 
      % by the definition of softmax
    
    @= \sigma_j(z) \frac{\partial}{\partial z_i} \left( \mathbf{\log\:  e^{z_j} - \log\:\sum\limits_{c=1}^C e^{z_c}} \right)
      % because: $\log\: \frac{x}{y} = \log\: x - \log\: y$
    
    @= \sigma_j(z) \frac{\partial}{\partial z_i} \left( \mathbf{z_j} - \log\:\sum\limits_{c=1}^C e^{z_c} \right)
      % because: $\log\: e^x = x$
    
    @= \sigma_j(z) \left( \mathbf{\frac{\partial}{\partial z_i}} z_j - \mathbf{\frac{\partial}{\partial z_i}}\log\:\sum\limits_{c=1}^C e^{z_c} \right)
      % because: $\frac{\partial}{\partial x} (f(x) + g(x)) = \frac{\partial}{\partial x} f(x) + \frac{\partial}{\partial x} g(x)$
    
    @= \sigma_j(z) \left( \mathbf{1(i=j)} - \frac{\partial}{\partial z_i}\log\:\sum\limits_{c=1}^C e^{z_c} \right)
      % because: $\frac{\partial}{\partial z_i} z_j = 1$ if $i=j$; $\frac{\partial}{\partial z_i} z_j = 0$ if $i\neq j$
    
    @= \sigma_j(z) \left( \mathbb{1}(i=j) - \mathbf{\frac{1}{\sum\limits_{c=1}^C e^{z_c}} \frac{\partial}{\partial z_i} \sum\limits_{c=1}^C e^{z_c}} \right)
      % because: $\frac{\partial}{\partial x} \log\: f(x) = \frac{1}{f(x)} \frac{\partial}{\partial x} f(x)$
    
    @= \sigma_j(z) \left( \mathbb{1}(i=j) - \frac{\mathbf{e^{z_i}}}{\sum\limits_{c=1}^C e^{z_c}}  \right)
      % because: $\frac{\partial}{\partial z_i} \sum\limits_{c=1}^C e^{z_c} = e^{z_i}$
    
    @= \sigma_j(z) \left( \mathbb{1}(i=j) - \mathbf{\sigma_i(z)} \right)
      % by the definition of softmax
@proof]

