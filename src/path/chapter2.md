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

::: center

$L(\pi_{K}) = sum_{k=1}^{K} l(x_{k}, u_{k}) + L_{F}(x_{F})$

:::

$L$ denote a stage-additive cost (or loss) functional, which is applied to a K-step plan, $π_{K}$. This means that the sequence $(u_{1},......, u_{K})$ of actions and the sequence $(x_{1},......, x_{K+1})$ of states may appear in an expression of L.

For convenience, ==let F denote the final stage, $F=K+1$== (the application of $u_{K}$ advances the stage to $K+1$)

==The cost term $l(x_{k}, u_{k})$== yields a real value for every $x_{k} \in X and u_{k} \in U(x_{k})$.

The final term $l_{F}(x_{F})$ is outside of the sum and is defined as ==$l_{F}(x_{F})=0$ if $x_{F} \in X_{G}$, and $l_{F}(x_{F})=∞$ otherwise==.

::: important Distinguish

$l(x_{k}, u_{k})$ is the cost term after applying $u_{k}$ at $x_{k}$ while $f(x_{k}, u_{k})$ is the state transition fuction to obtain $x_{k+1}$

:::

### 2.3.1 Optimal Fixed-Length Plans

This section will mainly discuss the _value iteration_ algorithm, which is to iteratively compute optimal cost-to-go (or cost-to-come) functions over the state space. In some conditions, it can be reduced to Dijkstra algorithm. There are mainly two versions of this algorithm, namely backward value iteration and forward value iteration.

#### 2.3.1.1 Backward value iteration

Firstly, we will introduce a new cost fuctional called $G^{*}_{k}$, which represents the _cost-to-go_ fuction accumulated through stage k to F. It can be written as the following equation:

::: center

$$
G^{*}_{k}(x_{k})= \underset{uk...uK}{\min} {sum_{i=k}^{K} l(x_{k}, u_{k}) + l_F(x_F)}
$$

$(1)$
:::

This can be converted to the following equation (the proof process is omitted here as the formula will be well understood from its definition):

::: center

$$
G^{*}_{k}(x_{k}) = \underset{uk}{\min} {l(x_{k}, u_{k}) + G^{*}_{k+1}(x_{k+1})}
$$

$(2)$

:::

This produces the recurrence, which can be used to obtain $G^{*}_{k}(x_{k})$ iteratively from $G^{*}_{k+1}(x_{k+1})$. It's like:

::: center

$G^{*}_{F}(x_{F}) \to G^{*}_{K}(x_{K}) \to G^{*}_{K-1}(x_{K-1}) \to ... \to G^{*}_{k}(x_{k}) \to ... \to G^{*}_{1}(x_{1})$

:::

$x_{1}$ may contain the $x_{I}$.

::: tip Example 1

![Figure 1 A five-state example. Each vertex represents a state, and each edge represents an input that can be applied to the state transition equation to change the state. The weights on the edges represent l(xk, uk) (xk is the originating vertex of the edge).](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pla/example1.png?raw=true)

Suppose that $K=4, x_{I}=a, x_{G}={d}$. Hence, there will be four iterations by constructing $G^{*}_{4}(x_{4}), G^{*}_{3}(x_{3}), G^{*}_{2}(x_{2}), G^{*}_{1}(x_{1})$.

Firstly, $G^{*}_{5}(x_{5})=x_{F}$, For state a, b, c, e, they are not in $x_{G}$, so each value of them is $\infty$. For state d, the value is 0.

$K=4, G^{*}_{4}(x_{4})=\underset{u4}{\min} {l(x_{4}, u_{4}) + G^{*}_{5}(x_{5})}$, $x_{5}$ can be a, b, c, d, e. Let's assume a as the current state($x_{4}$) for instance. $G^{*}_{5}(c)=\infty$, the equation goes to $G^{*}_{4}(a)=\underset{u_{4}}{\min} {l(a, u_{4}) + G^{*}_{5}(x_{5})}$. Here, $x_{5}$ can be a, b, c, d, e. $u_{4}$ is the edge from a to $x_{5}$. We need to find out the smallest of the five combinations of $a$ and $x_{5}(a, b, c, d, e)$. Obviously, all of them is $\infty$.

Let's take b, c as the $x_{4}$, respectively. You can see that $G^{*}_{4}(b)={l(b, u_bd) + G^{*}_{5}(d)}={4+0}=4$. $G^{*}_{4}(c)={l(c, u_cd) + G^{*}_{5}(d)}={1+0}=1$.

$K=3$, the potential options of $x_{4}=b, c$. You need to take a,b,c,d,e as $x_{3}$ to calculate their optimal value $G^{*}_{3}(x_{3})$. For example, d as $x_{3}$. There are five circumstances, in which 3 of them are $\infty$(a, d, e). So the left two are $G^{*}_{3}(d)={l(d, u_dc) + G^{*}_{3}(c)}={1+1}=2$. $G^{*}_{3}(d)={l(d, u_db) + G^{*}_{3}(b)}={\infty+0}=\infty$ So $G^{*}_{3}(d)=2$.

In this way can you easily obtain $G^{*}_{2}(x_{2}), G^{*}_{1}(x_{1})$. The results are shown in the following table.

|      | a   | b   | c   | d   | e   |
| ---- | --- | --- | --- | --- | --- |
| G₅\* | ∞   | ∞   | ∞   | 0   | ∞   |
| G₄\* | ∞   | 4   | 1   | ∞   | ∞   |
| G₃\* | 6   | 2   | ∞   | 2   | ∞   |
| G₂\* | 4   | 6   | 3   | ∞   | ∞   |
| G₁\* | 6   | 4   | 5   | 4   | ∞   |

:::

#### 2.3.1.2 Forward value iteration

The ideas from Section 2.3.1.1 may be recycled to yield a symmetrically equivalent method that computes optimal cost-to-come functions from the initial stage.

In the backward case, $x_{G}$ must be fixed, and in the forward case, $x_{I}$ must be fixed.

Symmetrically, here we introduce $C^{*}_{k}$, which denotes the optimal _cost-to-come_ value from stage 1 to k. $l_{I}$ serves as the same role of $l_{F}$. That is

::: center

$C^{*}_{k}(x_{1})=l_{I}(x_{1})$

:::

in which $l_{I}$ is a new function that yields $l_{I}(x_{I})=0$, and $l_{I}(x)=\infty$ for all $x \ne x_{I}$. Thus, any plans that try to start from a state other than $x_{I}$ will immediately receive infinite cost.

Likewise, we can get the same equation:

:::center

$$
C^{*}_{k}(x_{k})= \underset{u1...uk-1}{\min} {sum_{i=1}^{k-1} l(x_{k}, u_{k}) + l_I(x_I)}
$$

$(3)$

:::

Also the recurrence:

::: center

$$
C^{*}_{k}(x_{k}) = \underset{uk-1}{\min} {l(x_{k}, u_{k}) + C^{*}_{k-1}(x_{k-1})}
$$

$(4)$

:::

::: tip Example 2

We can still use the net in Figure 1, perform the forward iteration:

Suppose K=4, we need to calculate $C^{*}_{4}$ for a, b, c, d, e. Each has 5 options of $C^{*}_{k-1}(x_{k-1})$. For instance, $C^{*}_{4}(x_{c})$, there exsits a-c, b-c, c-c, d-c, e-c. $C^{*}_{3}(x_{e})=\infty$, $l_{a-c}, l_{c-c}=\infty$. Thus we only need to compare $l_{b-c}+C^{*}_{3}(x_{b})$ and $l_{d-c}+C^{*}_{3}(x_{d})$. The former is smaller, which equals to 5 while the latter is 7.

|      | a   | b   | c   | d   | e   |
| ---- | --- | --- | --- | --- | --- |
| C₁\* | 0   | ∞   | ∞   | ∞   | ∞   |
| C₂\* | 2   | 2   | ∞   | ∞   | ∞   |
| C₃\* | 4   | 4   | 3   | 6   | ∞   |
| C₄\* | 4   | 6   | 5   | 4   | 7   |
| C₅\* | 6   | 6   | 5   | 6   | 5   |

:::

### 2.3.2 Optimal Plans of Unspecified Lengths

In section 2.3.1 we learn algorithm solving optimal fixed-length plans. However, it is obviously unreasonable. To begin with, we don't know the exact length of the solution. We need to set it in advance, which can be inappropriate. In example 1, we can obtain the optimal path from $G_{2}(a)$. But we repeat another redundant iteration in $G_{1}$.

So how to address this issue? That is variable-length plan.

The value-iteration method, originally used for fixed-length plans, is generalized for plans of different lengths. There is no upper limit to how long a plan can be, making this approach a true generalization of earlier fixed-length formulations.

How to accomplish this? Here we introduce a special "termination" action, denoted as $u_{T}$. This action allows a plan to stop at any state, effectively saying, "We are done." Once this action is applied, the state no longer changes, and no additional costs are incurred. This enables plans of different lengths to be handled uniformly. For example, a two-step plan $(u_{1}, u_{2})$ that reaches the goal can be extended to a longer plan by simply repeating the termination action without changing the cost like $(u_{1}, u_{2}, u_{T}, u_{T}, u_{T})$.

The termination action is applied when the system has reached a goal state, meaning the current state $x \in x_{G}$.

Once the goal is achieved, further actions are unnecessary, and the cost will not increase. So, the system applies the termination action to "stop" further planning or changes in the state.

For iteration going on, we introduce two similar formulas.

**For backward value iteration:**

This formula calculates the optimal action $(u^{*})$ at a given state $x$:

::: center

$$
u^* = \arg \min_{u \in U(x)} \left( l(x, u) + G^*(f(x, u)) \right)
$$

$(5)$

:::

- **$l(x, u)$**: Represents the cost incurred by taking action $u$ in state $x$.
- **$G^*(f(x, u))$**: The optimal _cost-to-go_ function, which estimates the remaining cost to the goal from the next state $f(x, u)$, the state that results from applying action $u $ to state $x$.

The formula minimizes the total cost, which is the sum of the immediate cost $l(x, u)$ and the cost-to-go from the resulting state. The `argmin` part means we are selecting the action $u^{*}$ that yields the lowest total cost.

**For forward value iteration:**

::: center

$$
u^{} = \arg \min_{u^{-1} \in U^{-1}(x)} \left( C^*(f^{-1}(x, u^{-1})) + l(f^{-1}(x, u^{-1}), u') \right)
$$

$(6)$

:::

- **$f^{-1}(x, u^{-1})$**: Refers to the state from which action $u^{-1}$ would bring the system into state $x$.
- **$C^{*}$**: The optimal _cost-to-come_ function, analogous to $G^{*}$, but in a forward direction. It tells us the best cost incurred to reach $x$ from some previous state.
- **$l(f^{-1}(x, u^{-1}), u')$**: Represents the cost of the action leading from the predecessor state to $x$.

In this way can we not rely on the specified $k$. Since we select the action $u^{*}$ that yields the lowest total cost every iteration.

::: important Distinguish

**Key Differences between (2) (4) in fixed-length planning and (5) (6) in variable-length planning**

1. **Fixed vs. Variable Length**:

   - **(2)(4)** is used in the context of fixed-length planning, where the number of stages is known and the goal is to minimize the cost over a set number of steps.
   - **(5)(6)** is for variable-length planning, where the number of stages is unspecified, and you want to minimize the overall _cost-to-go/cost-to-come_, with no constraint on the number of steps.

2. **Stage Dependency**:
   - **(2)(4)** depends on the stage index $k$ (since the cost-to-go depends on the specific stage).
   - **(5)(6)** is independent of any stage index because it is used for unspecified-length plans, where the focus is on minimizing the total cost regardless of how long the plan takes.

**Similarity**

Both formulas aim to minimize the total cost by selecting the optimal action at each state based on a cost function that combines immediate cost and the future _cost-to-go_/past _cost-to-come_. The mechanism for selecting actions is the same—iteratively finding the action that leads to the least total cost.

Example 1 will be changed into:

|       | a   | b   | c   | d   | e   |
| ----- | --- | --- | --- | --- | --- |
| G₀\*  | ∞   | ∞   | ∞   | 0   | ∞   |
| G₋₁\* | ∞   | 4   | 1   | 0   | ∞   |
| G₋₂\* | 6   | 2   | 1   | 0   | ∞   |
| G₋₃\* | 4   | 2   | 1   | 0   | ∞   |
| G₋₄\* | 4   | 2   | 1   | 0   | ∞   |
| G\*   | 4   | 2   | 1   | 0   | ∞   |

:::

### 2.3.3 Dijkstra Revisited

The key differences between Dijkstra algorithm and forward value iteration algorithm are shown as below:

| Feature                  | Dijkstra's Algorithm                                                | Forward Value Iteration                                      |
| ------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Cost Metric**          | Minimizes **cost-to-come** (from start to current state)            | Propagates **cost-to-come** in forward iteration             |
| **Approach**             | Greedy, explores states with minimum cost-to-come                   | Dynamic programming, iterates over all states simultaneously |
| **Exploration Strategy** | Expands one state at a time based on smallest cost-to-come          | Updates all states simultaneously in each iteration          |
| **Priority**             | Uses a priority queue to expand least-cost states first             | Does not prioritize; updates globally                        |
| **Set of Alive States**  | Yes, maintains a set of "alive" states (states yet to be finalized) | No, updates all states without maintaining alive states      |
| **Best Use Case**        | Finding the shortest path to a goal state                           | Computing global cost-to-come for all states                 |
| **Efficiency**           | More efficient for single-goal problems                             | Less efficient; explores the entire state space              |

If Dijkstra’s algorithm seems so clever, then why have we spent time covering the value-iteration method? For some problems it may become too expensive to maintain the sorted queue, and value iteration could provide a more efficient alternative. A more important reason is that value iteration extends easily to a much broader class of problems. Examples include optimal planning over continuous state spaces (Sections 8.5.2 and 14.5), stochastic optimal planning (Section 10.2), and computing dynamic game equilibria (Section 10.5).

Dijkstra’s algorithm belongs to a broader family of _label-correcting algorithms_, which all produce optimal plans by making small modifications to the general forward-search algorithm.

**FORWARD LABEL CORRECTING($x_G$)**

    1   Set C(x) = ∞ for all x(except xI), and set C(xI) = 0.

    2   Q.Insert(xI)

    3   while Q not empty do:

    4       x ← GetFirst(Q)

    5       for all u in U(x)

    6           x' ← f(x, u)

    7           if C(x) + l(x, u) < min{C(x'), C(xG)}

    8               C(x') ← C(x) + l(x, u)

    9               if x' is not xG

    10                  Q.Insert(x')

Notably, the label-correcting approach uses the cost at the goal state to ==prune away== many candidate paths; this is shown in line 7. Thus, it is only formulated to work for a single goal state; it can be adapted to work for multiple goal states, but performance degrades. The motivation for including $C(x_G)$ in line 7 is that there is no need to worry about improving costs at some state, $x′$, if its new cost-to-come would be higher than $C(x_G)$; there is no way it could be along a path that improves the cost to go to $x_G$.

## 2.4 Using Logic to Formulate Discrete Planning

For many discrete planning problems that we would like a computer to solve, the state space is enormous (e.g., $10^{100}$ states). Therefore, substantial effort has been invested in constructing implicit encodings of problems in hopes that the entire state space does not have to be explored by the algorithm to solve the problem.

**Pros and Cons of logic-based representations:**

::: tabs

@tab Pros

1. Such representations were the basis of the majority of artificial intelligence research during the 1950s–1980s.

2. It is useful for representing certain kinds of planning problems very compactly.

3. Many discrete planning algorithms are implemented in large software systems. At some point, when these systems solve a problem, they must provide the complete plan to a user, who may not care about the internals of planning. Logic-based representations have seemed convenient for producing output that logically explains the steps involved to arrive at some goal.

@tab Cons

Logic-based representations are difficult to generalize.

:::

### 2.4.1 A STRIPS-Like Representation

STRIPS-like representations have been the most common logic-based representations for discrete planning problems. This refers to the STRIPS system, which is considered one of the first planning algorithms and representations; its name is derived from the STanford Research Institute Problem Solver. There are many variations of STRIPS-like representations. Here is one formulation:

1. A finite, nonempty set $I$ of _instances_. _Instances_ are just the object existing in the world like books or trees.

2. A finite, nonempty set $P$ of _predicates_, which are binary-valued (partial) functions of one of more instances. Each application of a _predicate_ to a specific set of _instances_ is called a _positive literal_. A logically negated positive literal is called a _negative literal_.

The _predicates_ can form the basic properties or statements of certain _instances_. For example, a predicate called _Under_ might be used to indicate things like Under(Book, T able) (the book is under the table) or Under(Dirt, Rug).

A _predicate_ can be interpreted as a kind of function that yields _true_ or _false_ values;

however, it is important to note that it is only a partial function because it might not be desirable to allow any _instance_ to be inserted as an argument to the _predicate_.(In other words, some combinations of _predicates_ and _instance_ are obviously _true_ or _false_.)

**Summary: instances + predicates = positive/negative literal**

3. A finite, nonempty set $O$ of operators, each of which has: 1) _preconditions_, which are positive or negative literals that must hold for the operator to apply, and 2) _effects_, which are positive or negative literals that are the result of applying the operator.

4. An _initial set_ $S$ which is expressed as a set of positive literals. Negative literals are implied. For any positive literal that does not appear in $S$, its corresponding negative literal is assumed to hold initially.

5. A _goal set_ $G$ which is expressed as a set of both positive and negative literals.

Summary: preconditions, effects, initial sets and goal sets are all made up of literals.

**The process involves:**

Initially, we have several instances and define several predicates so as to form literals. We set the initial sets and goal sets. Based on corresponding preconditions, we need to find the operators that prodces the effects we want (reach the destination).

::: tip Example 3

![An example that involves putting batteries into a flashlight](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pla/example%203.png?raw=true)

Imagine a planning problem that involves putting two batteries into a flashlight, as shown in the following figure. The set of instances are

$$
I = \{Battery1, Battery2, Cap, Flashlight\}
$$

::: left

Two different predicates will be defined, _On_ and _In_, each of which is a partial function on _I_. The predicate On may only be applied to evaluate whether the Cap is On the Flashlight and is written as _On(Cap, Flashlight)_. The predicate _In_ may be applied in the following two ways: _In(Battery1, Flashlight)_, _In(Battery2, F lashlight)_, to indicate whether either battery is in the flashlight.

Recall that predicates are only partial functions in general. For the predicate In, it is not desirable to apply any instance to any argument. For example, it is meaningless to define _In(Battery1, Battery1)_ and _In(F lashlight, Battery2)_ (they could be included in the model, always retaining a negative value, but it is inefficient).

The initial set is

$$
S = {On(Cap, F lashlight)}.
$$

Based on S, both _¬In(Battery1, F lashlight)_ and _¬In(Battery2, Flashlight)_ are assumed to hold. Thus, S indicates that the cap is on the flashlight, but the batteries are outside. The goal state is

$$
G = {On(Cap, Flashlight), In(Battery1, Flashlight),  In(Battery2, Flashlight)}
$$

which means that both batteries must be in the flashlight, and the cap must be on. The set O consists of the four operators, which are

| Name    | Preconditions | Effects |
| ------- | ------------- | ------- |
| PlaceCap | {¬On(Cap, Flashlight)} | {On(Cap, Flashlight)} |
| RemoveCap | {On(Cap, Flashlight)} | {¬On(Cap, Flashlight)} |
| Insert(i) | {¬On(Cap, Flashlight), ¬In(i, Flashlight)} | {In(i, Flashlight)} |

Here is a plan that reaches the goal state in the smallest number of steps:

$$
(Remove(Cap), Insert(Battery1), Insert(Battery2), Place(Cap))
$$

In words, the plan simply says to take the cap off, put the batteries in, and place the cap back on.


:::

This example appears quite simple, and one would expect a planning algorithm to easily find such a solution. It can be made more challenging by adding many more instances to I, such as more batteries, more flashlights, and a bunch of objects that are irrelevant to achieving the goal. Also, many other predicates and operators can be added so that the different combinations of operators become overwhelming.
