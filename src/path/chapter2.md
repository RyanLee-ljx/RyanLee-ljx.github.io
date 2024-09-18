---
icon: lujingguihua
ReadingTime: true
date: 2024-09-03
Word: true
PageView: true
category: PR
---

# Chapter 2 Discrete Planning

## 2.1 Introduction to Discrete Feasible Planning

### 2.1.1 Problem Formulation

**Formulation 2.1**

**State**: $x$

**State space**: $X$, nonempty, finite or infinite.

**Action**: $u$

**Action space**: $U(x)$ , $x \in X$

**State transition fuction**: $x'=f(x, u)$. Each current state _x_, when applied with each action _u_, produces a new state _x'_.

**Initial state**: $x_{I} \in X$

**Goal state**: $X_{G} \in X$

### 2.1.2 Examples of Discrete Planning

1. Moving on a 2D gird

$\quad \quad$Suppose that a robot moves on a grid in which each grid point has integer coordinates of the form (i, j). The robot takes discrete steps in one of four directions (up, down, left, right), each of which increments or decrements one coordinate. The motions and corresponding state transition graph are shown in Figure 2.1, which can be imagined as stepping from tile to tile on an infinite tile floor. This will be expressed using Formulation 2.1. Let X be the set of all integer pairs of the form $(i, j)$, in which $i, j \in Z$ (Z denotes the set of all integers). Let $U = \{(0, 1), (0, −1), (1, 0), (−1, 0)\}$ . Let $U(x) = U for all x \in X$. The state transition equation is $f(x, u) = x + u$, in which $x \in X$ and $u \in U$ are treated as two-dimensional vectors for the purpose of addition. For example, if x = (3, 4) and u = (0, 1), then f (x, u) = (3, 5). Suppose for convenience that the initial state is $x{I} = (0, 0)$. Many interesting goal sets are possible. Suppose, for example, that $x{G} = \{(100, 100)\}$. It is easy to find a sequence of actions that transforms the state from (0, 0) to (100, 100).

2. Rubik's Cube Puzzle

## 2.2 Searching for Feasible Plans

The methods presented in this section are just graph search algorithms, but with the understanding that the state transition graph is revealed incrementally through the application of actions, instead of being fully specified in advance.

An important point is that the search algorithms must be systematic, that is, the algorithm must keep track of states already visited.

### 2.2.1 General Forward Search

The following figure gives a general template of search algorithms. At any point during the search, there will be three kinds of states:

1. **Unvisited**: States that have not been visited yet. Initially, this is every state except xI.

2. **Dead**: States that have been visited, and for which every possible next state has also been visited. A next state of $x$ is a state $x′$ for which there exists a $u \in U(x)$ such that $x′=f(x, u)$ In a sense, these states are dead because there is nothing more that they can contribute to the search. In some circumstances, of course, dead state can become alive again.

3. **Alive**: States that have been encountered, but possibly have unvisited next states. These are considered alive. Initially, the only alive state is $x_{I}$.

**Forward Search**

  Q.insert(x_I) and mark x_I as visited.

  while Q not empty do:

      x = Q.GetFirst()

      if x in x_G:

          return SUCCESS

      for all u in U(x):

          x' = f(x,u)

          if x' not visited:

              Q.insert(x')

              mark x' visited

          else:

              Resolve duplicate x'

  Return FAILURE

The above is a general template of forward search algorithm. Two focuses are presented here: How efficient is the test to determine whether $x \in X_{G}$ in line 4? How can one tell whether $x′$ has been visited in line 8 and line 9?

### 2.2.2 Particular Forward Search Methods

This section presents several search algorithms, each of which constructs a _search tree_. Each search algorithm is a special case of the algorithm of the forward search algorithm template demonstrated before, obtained by defining a different sorting function for Q. Most of these are just classical graph search algorithms.

1. **Breath First**: Specify Q as a First-In First-Out (FIFO) queue. All plans that have k steps are exhausted before plans with k + 1 steps are investigated. Therefore, breadth first guarantees that the first solution found will use the smallest number of steps. The asymptotic running time of breadth-first search is $O(|V|+|E|)$.

2. **Depth First**: Specify Q as a First-In Last-Out (FILO) stack. The running time of depth first search is also $O(|V|+|E|)$.

3. **Dijkstra’s algorithm**: Use _cost-to-come_ (distance between initial state and current state), short for Function C，$C(x)$ to sort Q.

4. **A\***: Incorporate a heuristic estimate of the cost called _cost-to-go_ (distance between current state and goal state), short for $G(x)$ with $C(x)$.

5. **Best first**: Only use $G(x)$ to sort Q.

6. **Iterative deepening**: An approach integrates Breath first and Depth first method. That means performs Depth first search at i depth (i=1, 2, 3....max depth). Initially, i is equal to 1 and will increase with step going on. For example, if i = 1, the algorithm cannot find $X_{G}$. Then i will be 2, perform the same operation. If we still cannot find the solution, i will be 3 until we reach $X_{G}$.

### 2.2.3 Other General Search Schemes

1. **Backward search**: For many planning problems, it might be the case that the branching factor is large when starting from xI. In this case, it might be more efficient to start the search at a goal state and work backward until the initial state is encountered.

**BACKWARD SEARCH**

  Q.insert(x_G) and mark x_G as visited.

  while Q not empty do:

  x = Q.GetFirst()

      if x in xI:

          return SUCCESS

      for all u^-1 in U(x)^-1:

          x' = f^-1(x,u^-1)

          if x' not visited:

              Q.insert(x')

              mark x' visited

          else:

              Resolve duplicate x'

  Return FAILURE

2. **Bidirectional search**: One tree is grown from the initial state, and the other is grown from the goal state. The search terminates with success when the two trees meet. Failure occurs if either priority queue has been exhausted.

**BIDIRECTIONAL SEARCH**

  Q_G.insert(X_G) and mark x_G as visited.

  Q_I.insert(X_I) and mark x_I as visited.

  while Q_G and Q_I not empty do:

      x = Q_I.GetFirst()

      if x already visited from x_G

          return SUCCESS

      for all u in U(x):

          x' = f(x,u)

          if x' not visited:

              Q_I.insert(x')

              mark x' visited

          else:

              Resolve duplicate x'

        x = Q_G.GetFirst()

     if x already visited from x_I

          return SUCCESS

      for all u^-1 in U(x)^-1:

          x' = f^-1(x,u^-1)

          if x' not visited:

              x_G.insert(x')

              mark x' visited

          else:

             Resolve duplicate x'

  Return FAILURE


### 2.2.4 A Unified View of the Search Methods

For all search methods, there usually involves the following 6 steps:

1. Initialization: Initial graph G(V, E) and include some starting states in empty V, which could be $X_{G}$ or $X_{I}$ (Bidirectional search or backward search)

2. Select Vertex: Select states in priority queue Q sorted with some rules.

3. Apply an Action: Obtain a new state x' from f(x, u).

4. Insert a Directed Edge into the Graph: If certain algorithm-specific tests are passed, then generate an edge from x to x' for the forward case or an edge from xnew to x for the backward case. If x' is not yet in V , it will be inserted into V.

5. Check for Solution: Determine whether G encodes a path from $X_{I}$ to $X_{G}$. If there is a single search tree, then this is trivial. If there are two or more search trees, then this step could be expensive.

6. Return to Step 2: Iterate unless a solution has been found or an early termination condition is satisfied, in which case the algorithm reports failure.

## 2.3 Discrete Optimal Planning

This section discusses optimal planning problems involving optimizing time, distance, energy consumed.

**Formulation 2.2**(Discrete Fixed-Length Optimal Planning)

1. All of the components from Formulation 2.1 will be inherited in this section like $X, U(x), f, x_{I}, x_{G}$. Notably, here $X$ is finite.

2. The number of the stages, K, is defined, which is the exact length of the plan. It can be measured as the number of the actions. $x_{k+1}$ is obtained after $u_{k}$ is applied.

3. Introduce cost functional:

$L(\pi_{K}) = sum_{k=1}^{K} l(x_{k}, u_{k}) + L_{F}(x_{F})                           (1)$

$L$ denote a stage-additive cost (or loss) functional, which is applied to a K-step plan, $π_{K}$. This means that the sequence $(u_{1},......, u_{K})$ of actions and the sequence $(x_{1},......, x_{K+1})$ of states may appear in an expression of L.

For convenience, ==let F denote the final stage, $F=K+1$== (the application of $u_{K}$ advances the stage to $K+1$)

==The cost term $l(x_{k}, u_{k})$== yields a real value for every $x_{k} \in X and u_{k} \in U(x_{k})$.

The final term $l_{F}(x_{F})$ is outside of the sum and is defined as ==$l_{F}(x_{F})=0$ if $x_{F} \in X_{G}$, and $l_{F}(x_{F})=∞$ otherwise==.

::: important Distinguish

$l(x_{k}, u_{k})$ is the cost term after applying $u_{k}$ at $x_{k}$ while $f(x_{k}, u_{k})$ is the state transition fuction to obtain $x_{k+1}$

:::

### 2.3.1 Optimal Fixed-Length Plans

This section will mainly discuss the *value iteration* algorithm, which is to iteratively compute optimal cost-to-go (or cost-to-come) functions over the state space. In some conditions, it can be reduced to Dijkstra algorithm. There are mainly two versions of this algorithm, namely backward value iteration and forward value iteration.

#### 2.3.1.1 Backward value iteration

Firstly, we will introduce a new cost fuctional called $G^{*}_{k}$, which represents the cost accumulated through stage k to F. It can be written as the following equation:

$\tag{2} G^{*}_{k}(x_{k})= \underset{uk}{\min} {sum_{i=k}^{K} l(x_{k}, u_{k}) + l_F(x_F)}$

This can be converted to the following equation (the proof process is omitted here as the formula will be well understood from its definition):

$\tag{3}  G^{*}_{k}(x_{k}) = \underset{uk}{\min} {l(x_{k}, u_{k}) + G^{*}_{k+1}(x_{k+1})}$

This produces the recurrence, which can be used to obtain $G^{*}_{k}(x_{k})$ iteratively from $G^{*}_{k+1}(x_{k+1})$. It's like:

::: center

$G^{*}_{F}(x_{F}) \to G^{*}_{K}(x_{K}) \to G^{*}_{K-1}(x_{K-1}) \to ... \to G^{*}_{k}(x_{k}) \to ... \to G^{*}_{1}(x_{1})$ 

:::

$x_{1}$ may contain the $x_{I}$.

::: tip **Example**

![A five-state example. Each vertex represents a state, and each edge represents an input that can be applied to the state transition equation to change the state. The weights on the edges represent l(xk, uk) (xk is the originating vertex of the edge).](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pla/example1.png?raw=true)

Suppose that $K=4, x_{I}=a, x_{G}={d}$. Hence, there will be four iterations by constructing $G^{*}_{4}(x_{4}), G^{*}_{3}(x_{3}), G^{*}_{2}(x_{2}), G^{*}_{1}(x_{1})$.

Firstly, $G^{*}_{5}(x_{5})=x_{F}$, For state a, b, c, e, they are not in $x_{G}$, so each value of them is $\infty$. For state d, the value is 0.

$K=4, G^{*}_{4}(x_{4})=\underset{u4}{\min} {l(x_{4}, u_{4}) + G^{*}_{5}(x_{5})}$, $x_{5}$ can be a, b, c, d, e. Let's assume a as the current state($x_{4}$)for instance. $G^{*}_{5}(c)=\infty$, the equation goes to $G^{*}_{4}(a)=\underset{u_{4}}{\min} {l(a, u_{4}) + G^{*}_{5}(x_{5})}$. Here, $x_{5} can be a, b, c, d, e$. $u_{4}$ is the edge from a to $x_{5}$. We need to find out the smallest of the five combinations of $a$ and $x_{5}(a, b, c, d, e)$. Obviously, all of them is $\infty$. 

Let's take b, c as the $x_{4}$, respectively. You can see that $G^{*}_{4}(b)={l(b, u_bd) + G^{*}_{5}(d)}={4+0}=4$. $G^{*}_{4}(c)={l(c, u_cd) + G^{*}_{5}(d)}={1+0}=1$.

$K=3$, the potential options of $x_{4}=b, c$. You need to take a,b,c,d,e as $x_{3}$ to calculate their optimal value $G^{*}_{3}(x_{3})$. For example, d as $x_{3}$. There are five circumstances, in which 3 of them are $\infty$(a, d, e). So the left two are $G^{*}_{3}(d)={l(d, u_dc) + G^{*}_{3}(c)}={1+1}=2$. $G^{*}_{3}(d)={l(d, u_db) + G^{*}_{3}(b)}={\infty+0}=\infty$ So $G^{*}_{3}(d)=2$.

In this way can you easily obtain $G^{*}_{2}(x_{2}), G^{*}_{1}(x_{1})$. The results are shown in the following table.

|     | a  | b  | c  | d  | e  |
|-----|----|----|----|----|----|
| G₅* | ∞  | ∞  | ∞  | 0  | ∞  |
| G₄* | ∞  | 4  | 1  | ∞  | ∞  |
| G₃* | 6  | 2  | ∞  | 2  | ∞  |
| G₂* | 4  | 6  | 3  | ∞  | ∞  |
| G₁* | 6  | 4  | 5  | 4  | ∞  |

:::