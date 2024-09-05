---
icon: lujingguihua
ReadingTime: true
cover: /newcover3.jpg
date: 2024-09-03
Word: true
PageView: true
category: PR
---

# Chapter 1 Introduction

PLANNING ALGORITHMS

Steven M. LaValle  

University of Illinois  

Copyright Steven M. LaValle 2006  

Available for downloading at [http://planning.cs.uiuc.edu/]

Published by Cambridge University Press

## 1 What is planning?

Planning is a branch of algorithms.

The user of the plan can be referred as robot or decision maker (robot, agent, controller are interchangeable)

## 2 Basic Ingredients of Planning

1. **State**

- State can represent the position and orientation of a robot, the locations of tiles in a puzzle, or the position and velocity of a helicopter.

- The collection of state: **state space**.

- Can be both discrete (finite, or countably infinite) and continuous (uncountably infinite).

- Can be explicitly represented or implicitly.


2. **Time**

- All planning problems involve a sequence of decisions that must be applied over time.

- Can be explicitly modeled or implicitly.


3. **Action**

- A plan generates actions that manipulate the state.

- States changes when actions applied (through state-valued function under discrete time or differential equation under continuous time)


4. **Initial and goal states**

- Planning problems involve starting from the initial state, finally arriving at the goal states (a set of)

5. **Criterion**

- Feasiblity or Optimality

6. **Plan**

- A plan can specify a sequence of actions to be taken or specify actions as a function of state. 

::: info

Once a plan is determined, there are three ways to use it.

1. Execution: Execute it either in simulation or in a mechanical device (robot) connected to the physical world.

2. Refinement: Refine it into a better plan. The new plan may take more problem aspects into account, or it may simply be more efficient (see at the following picture). Refinement can be executed repeatedly until the final one. 

![A refinement approach that has been used for decades in robotics](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pla/refinement.png?raw=true)

The first plan yields a collision-free path through the building. The second plan transforms the route into one that satisfies differential constraints based on wheel motions (recall Figure 1.11). The third plan considers how to move the robot along the path at various speeds while satisfying momentum considerations. The fourth plan incorporates feedback to ensure that the robot stays as close as possible to the planned path in spite of unpredictable behavior.

3. Hierarchical inclusion: Under hierarchical inclusion, a plan is incorporated as an action in a larger plan. The original plan can be imagined as a subroutine in the larger plan.Hierarchical inclusion can be performed any number of times, resulting in a *rooted tree of plans*. This leads to a general model of hierarchical planning. Each vertex in the tree is a plan. The root vertex represents the master plan. The children of any vertex are plans that are incorporated as actions in the plan of the vertex. There is no limit to the tree depth or number of children per vertex.

## 3 Organization of this book

PART 1 Intro: Chapter 1-2

PART 2 Motion planning: Chapter 3-8

PART 3 Decision-Theoretic Planning: Chapter 9-12

PART 4 Planning Under Differential Constraint 13-15
