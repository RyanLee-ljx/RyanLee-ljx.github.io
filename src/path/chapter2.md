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

Suppose that a robot moves on a grid in which each grid point has integer coordinates of the form (i, j). The robot takes discrete steps in one of four directions (up, down, left, right), each of which increments or decrements one coordinate. The motions and corresponding state transition graph are shown in Figure 2.1, which can be imagined as stepping from tile to tile on an infinite tile floor. This will be expressed using Formulation 2.1. Let X be the set of all integer pairs of the form $(i, j)$, in which $i, j \in Z$ (Z denotes the set of all integers). Let $U = \{(0, 1), (0, −1), (1, 0), (−1, 0)\}$ . Let $U(x) = U for all x \in X$. The state transition equation is $f(x, u) = x + u$, in which $x \in X$ and $u \in U$ are treated as two-dimensional vectors for the purpose of addition. For example, if x = (3, 4) and u = (0, 1), then f (x, u) = (3, 5). Suppose for convenience that the initial state is $x{I} = (0, 0)$. Many interesting goal sets are possible. Suppose, for example, that $x{G} = \{(100, 100)\}$. It is easy to find a sequence of actions that transforms the state from (0, 0) to (100, 100).

2. Rubik's Cube Puzzle

