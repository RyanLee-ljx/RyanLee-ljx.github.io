---
icon: lunwen
ReadingTime: true
date: 2024-10-10
Word: true
PageView: true
category: PR
---

# Multi-Agent Teamwise Cooperative Path Finding and  Traffic Intersection Coordination

This paper is published at *2024 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2024.* Full paper [at](https://rap-lab.github.io/documents/publications/2024_IROS_TCCBSt.pdf)

## Abstract

*Abstract* — When coordinating the motion of connected autonomous vehicles at a signal-free intersection, the vehicles from each direction naturally forms a team and each team seeks to minimize their own traversal time through the intersection, without concerning the traversal times of other teams. Since the intersection is shared by all teams and agent-agent collision must be avoided, the coordination has to trade the traversal time of one team for the other. This paper thus investigates a problem called Multi-Agent Teamwise Cooperative Path Finding (TCPF), which seeks a set of collision-free paths for the agents from their respective start to goal locations, and agents are grouped into multiple teams with each team having its own objective function to optimize. In general, there are more than one teams and hence multiple objectives. TCPF thus seeks the Pareto-optimal front that represents possible tradeoffs among the teams. We develop a centralized planner for TCPF by leveraging the Multi-Agent Path Finding techniques to resolve agent-agent collision, and Multi-Objective Optimization to find Pareto-optimal solutions. We analyze the completeness and optimality of the planner, which is then tested in various settings with up to 40 agents to verify the runtime efficiency and showcase the usage in intersection coordination.

## Key Points in This Paper

### Problem Statement

#### 1. Workspace and Agents
There is a set of $N$ agents, each indexed by a set $I = \{1, 2, \dots, N\}$.

The environment is represented as a **finite graph** $G = (V, E)$, where:
- $V$ is the set of vertices (representing possible locations or states for agents).
- $E \subseteq V \times V$ is the set of edges (representing the actions or moves an agent can take between two vertices).

#### 2. Agent Paths and Costs
Each agent $i \in I$ has:
- A **start location** $v_i^o \in V$.
- A **goal location** $v_i^d \in V$.

The goal is to find a **collision-free path** $\pi^i$ for each agent, from its start to goal, which consists of a sequence of vertices $(v_i^1, v_i^2, \dots, v_i^k)$.

The cost of a path $\pi^i$, denoted as $g(\pi^i)$, is the sum of the costs of the edges along the path:
$$
g(\pi^i) = \sum_{j=1}^{k-1} \text{cost}(v_i^j, v_i^{j+1})
$$

The agents must avoid two types of conflicts:
- **Vertex conflict**: Two agents occupying the same vertex at the same time.
- **Edge conflict**: Two agents moving through the same edge in opposite directions at the same time.

#### 3. Teams and Objectives
The agents are grouped into $M$ teams, denoted as $\{T_j\}_{j=1}^{M}$, where each team $T_j \subseteq I$ consists of a subset of agents. Teams are not necessarily disjoint, meaning an agent can belong to multiple teams.

Each team $T_j$ has an objective function $g_{T_j}$ to minimize. The objective function depends on the paths of all agents in the team and is **non-decreasing** with respect to the individual path costs. That is, if an individual agent’s path cost increases, the team’s objective function will either stay the same or increase.

**- Common Objectives Include:**

- **Min-sum**: Minimize the sum of individual path costs of all agents in the team.
$$
g_{T_j} = \sum_{i \in T_j} g(\pi^i)
$$
- **Min-max**: Minimize the maximum individual path cost within the team.
$$
g_{T_j} = \max_{i \in T_j} g(\pi^i)
$$

#### 4. Pareto-Optimality
Since the TCPF problem involves multiple teams with different objectives, a single optimal solution is not always possible. Instead, the goal is to find **Pareto-optimal solutions**.

A solution is **Pareto-optimal** if no team’s objective can be improved without making another team’s objective worse. In other words, it's impossible to improve one team's traversal time without increasing that of another team.

The set of all non-dominated, feasible solutions forms the **Pareto-optimal front**. A solution **dominates** another if it has a lower (or equal) cost for all teams and strictly lower cost for at least one team.

#### 5. General and Fully Cooperative TCPF
- **General TCPF**: The standard TCPF problem, where each team has its own objective and the goal is to find a set of Pareto-optimal solutions.
  
- **Fully Cooperative TCPF**: A special case where all agents belong to the same team (i.e., $T_j = I$ for all $j$), meaning the entire system works together to minimize a common objective. In this case, the problem reduces to a single-objective **Multi-Agent Path Finding (MAPF)** problem.


### Dominance and Pareto-Optimality

In the TCPF problem, multiple teams of agents are navigating the environment, and each team has its own objective function to optimize. These objectives often conflict because the shared environment (such as an intersection) has limited resources (space and time), and improving one team's objective may worsen another's.

For example:

- Team 1 may aim to minimize the total traversal time for all its agents (min-sum objective).

- Team 2 may aim to minimize the maximum traversal time among its agents (min-max objective).

There is no single solution that can optimize both objectives simultaneously for different teams. As a result, we need a way to compare and evaluate trade-offs between different solutions where one team may benefit at the expense of another.

#### 1 Pareto-Optimality and Trade-Offs
To address these conflicting objectives, the paper seeks **Pareto-optimal solutions**—solutions where it's impossible to improve one team's objective without making another team’s worse. This leads to the introduction of **dominance**, which helps figure out which solutions deserve to be called Pareto-optimal.

#### 2 Definition of Dominance
Given two solutions $a$ and $b$, each represented by an **objective vector** (a set of objective values for all teams):

$$ a = (a_1, a_2, \dots, a_M) \quad \text{and} \quad b = (b_1, b_2, \dots, b_M) $$

where each $a_j$ and $b_j$ represents the objective value for team $T_j$.

**Solution $a$ dominates solution $b$ if:**
- $a_j \leq b_j$ for all teams $j = 1, 2, \dots, M$ (i.e., the objective values of $a$ are no worse than those of $b$ for all teams).
- There exists at least **one team $j$ where $a_j < b_j$** (i.e., $a$ is strictly better for at least one team).

If solution $a$ dominates solution $b$, then **$b$ can hit the road** 🛣 because it's worse and can be discarded from the search for optimal solutions.

#### 3 Why Dominance is Necessary

- **Pruning Inferior Solutions**: Dominance is your friend! It helps get rid of solutions that are just straight-up **inferior** and don't offer anything better. If one solution dominates another, you can **toss** the dominated one, making your search for optimal paths much more efficient .

- **Handling Multiple Objectives**: Each team has its own objective, and trade-offs are the name of the game . The dominance relation helps identify which solutions are on the **Pareto-optimal front**—aka the set of solutions representing the best possible trade-offs. If a solution is dominated, there's another one that's better **in at least one objective** without being worse in any other.

- **Comparing Non-Dominated Solutions**: Not all solutions are comparable. Two solutions $a$ and $b$ might be **non-dominated** with respect to each other—this means $a$ is better for some teams, while $b$ is better for others. Both solutions should be kept because they’re **valid trade-offs** .

#### 4 How to Choose the Final or Best Solution When Finding the Pareto-Optimal Front 

There is no one solution that can be called the best. The solution finally chose is up to the preferences, trade-offs balance or other rules.

Example:

Suppose TC-CBS has found the following three Pareto-optimal solutions for a system with two teams:

- Solution A: 

(20,40) → Team 1 has a cost of 20, Team 2 has a cost of 40.

- Solution B: 

(25,35) → Team 1 has a cost of 25, Team 2 has a cost of 35.

- Solution C: 

(30,30) → Team 1 has a cost of 30, Team 2 has a cost of 30.

*Preference-Based:* If Team 1 has higher priority, the system might choose Solution A because it gives Team 1 the lowest cost, even though it increases Team 2’s cost.

*Trade-Off Analysis:* If the decision-maker values fairness, they might choose Solution C, as it balances the costs for both teams equally.

or Using a *weighted sum with weights*

### Conflict-Based Search (CBS)

**Step 1：Initializing**

Construct a Search tree with root node $P_{root}$, which is a tuple of $(\pi, g, \Omega)$.

where: $π = (π^1, π^2, . . . , π^N )$ is a joint path that connects starts and goals of 

agents respectively; $g$ is the scalar cost value of $π (i.e., g = g(π) = \sum_{i\in I} g_i(π_i))$

$\Omega$ is a set of constraints, and each constraint is of form $(i, v, t)$ or $(i, e, t)$, which indicates agent $i$ is forbidden to enter node $v$ (or edge $e$) at time $t$.

Employ *A\** (Low level search) to generate $π$ of every agent without $\Omega$ and thus obtain $P_{root}$.

**Step 2：Expanding**

Choose the node with the minimum g-value for expansion. (High level search)

**Step 3：Check for Conflicts**

Check the conflicts of the selected node, namely $π = (π^1, π^2, . . . , π^N )$.

If there exists conflicts, the algorithm splits the search into two branches in the postion of the selected node, each of which has new constraint sets $\Omega S\{i, v, t\}$ and $\Omega S\{j, v, t\}$ are generated. 

**Step 4: Replanning**

*A\** is rerun for the affected agent, considering the newly added constraints(regarded as an obstacle)

A new joint path $π^′$ is then formed by first copying $π$ and then updating agent $i$’s individual path $π_i$ with $π^{′i}$. 

Finally, for each of the two split constraints, a corresponding node is generated and added to the tree for future expansion.

Run Step 2-4 iteratively until there exits one $π$ which contain no conflicts.

### Teamwise Cooperative CBS (TC-CBS)

TC-CBS follows a similar workflow as CBS.

**Key differences:**

- Instead of a single objective (like sum or max), each solution is associated with an objective vector $g(π) = (g^1, g^2, . . . , g^N )$.

- TC-CBS aims to find Pareto-optimal solutions, where no team’s objective can be improved without worsening another team’s objective.

- TC-CBS uses *lexicographic ordering* to compare objective vectors instead of using a scalar cost to prioritize nodes.

- TC-CBS terminates when the high-level search has explored all possible paths and found all non-dominated solutions. 

::: info Lexicographic Ordering for Comparing Objective Vectors

**Lexicographic ordering** is used in TC-CBS to compare **objective vectors** and prioritize solutions during the search process. Here's how it works:

1. Definition of Lexicographic Ordering:
Suppose we have two objective vectors, 
$$ a = (a_1, a_2, \dots, a_M) \quad \text{and} \quad b = (b_1, b_2, \dots, b_M) $$

where each component represents the objective value for a different team.

Lexicographic ordering compares the objective vectors **element by element**:
- $a$ is lexicographically smaller than $b$ (denoted as $a \prec b$) if there exists an index $k$ such that:
  $$ a_1 = b_1, a_2 = b_2, \dots, a_{k-1} = b_{k-1} $$ 
  (all previous elements are equal), and
  $$ a_k < b_k $$
  (the first non-equal element is smaller in $a$ than in $b$).

2. Example:
Let's say we have two objective vectors for a 3-team system:

$$ a = (5, 10, 15) $$
$$ b = (5, 12, 10) $$

To compare them lexicographically:
- Compare the first elements: $a_1 = b_1 = 5$ (they are equal).
- Compare the second elements: $a_2 = 10$ and $b_2 = 12$. Since $a_2 < b_2$, we conclude that $a \prec b$.

Thus, $a$ is **lexicographically smaller** than $b$, even though $b$’s third element is smaller than $a$’s third element. Lexicographic ordering only cares about the **first non-equal element**.

3. Why Lexicographic Ordering?
Lexicographic ordering helps in **prioritizing solutions** during the search:
- It allows TC-CBS to **expand the solution that is lexicographically smallest** (considering the first team, then the second team, and so on), ensuring a **structured exploration** of the solution space.
- It provides a way to **break ties** between solutions where multiple objectives (teams) are involved.

:::

### TC-CBS-t Algorithm

TC-CBS-t is a modified version of TC-CBS that addresses the incompleteness of the original TC-CBS. In some cases, TC-CBS may fail to terminate in finite time because it can generate an infinite number of non-dominated solutions. TC-CBS-t uses a transformation on the objective vector to ensure the algorithm always terminates while still finding a subset of the Pareto-optimal solutions.

The transformation involves adding a small weight $\epsilon$，$\epsilon$ to the objectives of other teams. This essentially converts the problem into a fully cooperative problem, where every team’s objective is slightly influenced by the others.

$$
g_f\left(\pi^{T_j}\right):=g\left(\pi^{T_j}\right)+\epsilon \Sigma_{i \notin T_j} g\left(\pi^i\right)
$$

The transformed problem is easier to solve because it guarantees that the algorithm will find a finite set of Pareto-optimal solutions. However, TC-CBS-t may not find all Pareto-optimal solutions.


## EXPERIMENTAL RESULTS and Conclusion

See at full paper.



