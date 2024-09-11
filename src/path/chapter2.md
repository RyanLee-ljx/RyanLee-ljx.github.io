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

State: $x$

State space: $X$, nonempty, finite or infinite.

Action: $u$

Action space: $U(x)$ , $x \in X$

State transition fuction: $x'=f(x, u)$. Each current state *x*, when applied with each action *u*, produces a new state *x'*.

Initial state: $x_{I} \in X$

Goal state: $X_{G} \in X$

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

::: Forward Search
'''
Q.insert($x_{I}$) and mark $x_{I}$ as visited.
while Q not empty do:
    x = Q.GetFirst()
    if x $\in x_{G}$:
        return SUCCESS
    for all u in U(x):
        x' = f(x,u)
        if x' not visited:
            Q.insert(x')
            mark x' visited
        else:
            Resolve duplicate x'
Return FAILURE

'''

The above is a general template of forward search algorithm. Two focuses are presented here: How efficient is the test to determine whether $x \in X_{G}$ in line 4? How can one tell whether $x′$ has been visited in line 8 and line 9?

### 2.2.2 Particular Forward Search Methods
This section presents several search algorithms, each of which constructs a *search tree*. Each search algorithm is a special case of the algorithm of the forward search algorithm template demonstrated before, obtained by defining a different sorting function for Q. Most of these are just classical graph search algorithms.

1. **Breath First**: Specify Q as a First-In First-Out (FIFO) queue. All plans that have k steps are exhausted before plans with k + 1 steps are investigated. Therefore, breadth first guarantees that the first solution found will use the smallest number of steps. The asymptotic running time of breadth-first search is $O(|V|+|E|)$.

2. **Depth First**: Specify Q as a First-In Last-Out (FILO) stack. The running time of depth first search is also $O(|V|+|E|)$.

3. **Dijkstra’s algorithm**: Use cost-to-come, short for Function C，$C(x)$ to sort Q.

4. **A\***: Incorporate a heuristic estimate of the cost called cost-to-go, short for $G(x)$ with $C(x)$.

5. **Best first**: Only use $G(x)$ to sort Q.

6. **Iterative deepening**: An approach integrates Breath first and Depth first method. That means performs Depth first search at i depth (i=1, 2, 3....max depth). Initially, i is equal to 1 and will increase with step going on. For example, if i = 1, the algorithm cannot find $X_{G}$. Then i will be 2, perform the same operation. If we still cannot find the solution, i will be 3 until we reach $X_{G}$.

### 2.2.3 Other General Search Schemes

1. **Backward search**: For many planning problems, it might be the case that the branching factor is large when starting from xI. In this case, it might be more efficient to start the search at a goal state and work backward until the initial state is encountered.

::: BACKWARD SEARCH  

'''
Q.insert($x_{G}$) and mark $x_{G}$ as visited.
while Q not empty do:
    x = Q.GetFirst()
    if x $\in x_{I}$:
        return SUCCESS
    for all $u^{-1}$ in $U(x)^{-1}$:
        x' = $f^{-1}(x,$u^{-1})$
        if x' not visited:
            Q.insert(x')
            mark x' visited
        else:
            Resolve duplicate x'
Return FAILURE

'''

2. **Bidirectional search**: One tree is grown from the initial state, and the other is grown from the goal state. The search terminates with success when the two trees meet. Failure occurs if either priority queue has been exhausted.

::: BIDIRECTIONAL SEARCH  

'''
$Q_{G}$.insert($X_{G}$) and mark $x_{G}$ as visited.
$Q_{I}$.insert($X_{I}$) and mark $x_{I}$ as visited.
while $Q_{G}$ and $Q_{I} not empty do:
    x = $Q_{I}$.GetFirst()
    if x already visited from $x_{G}$
        return SUCCESS
    for all u in U(x):
        x' = f(x,u)
        if x' not visited:
            $Q_{I}$.insert(x')
            mark x' visited
        else:
            Resolve duplicate x'
    x = $Q_{G}$.GetFirst()
    if x already visited from $x_{I}$
        return SUCCESS
    for all $u^{-1}$ in $U(x)^{-1}$:
        x' = $f^{-1}(x,$u^{-1})$
        if x' not visited:
            $x_{G}$.insert(x')
            mark x' visited
        else:
            Resolve duplicate x'
Return FAILURE

'''

### 2.2.4 A Unified View of the Search Methods

For all search methods, there usually involves the following 6 steps:

1. Initialization: Initial graph G(V, E) and include some starting states in empty V, which could be $X_{G}$ or $X_{I}$ (Bidirectional search or backward search)

2. Select Vertex: Select states in priority queue Q sorted with some rules.

3. Apply an Action: Obtain a new state x' from f(x, u).

4. Insert a Directed Edge into the Graph: If certain algorithm-specific tests are passed, then generate an edge from x to x' for the forward case or an edge from xnew to x for the backward case. If x' is not yet in V , it will be inserted into V.

5. Check for Solution: Determine whether G encodes a path from $X_{I}$ to $X_{G}$. If there is a single search tree, then this is trivial. If there are two or more search trees, then this step could be expensive.


6. Return to Step 2: Iterate unless a solution has been found or an early termination condition is satisfied, in which case the algorithm reports failure.

