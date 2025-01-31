---
icon: fangchahexiefangchafenxi-xuanzhong
ReadingTime: true
date: 2024-12-17
Word: true
PageView: true
category: ML
---

# Control Variate 

---
layout: Slide
sidebar: false
breadcrumb: false
pageInfo: false
---

# Introduction to Control Variate

## Target
Reduce the variance of a random variable $X$.

## Method
Generate an alternative random variable $Y$ such that:
- $\mathbb{E}(Y) = \mathbb{E}(X)$
- $\text{Var}(Y) < \text{Var}(X)$

## Approach and Proof
The control variate $Y$ is defined as:

$$
Y = X + b(C - \mathbb{E}(C)) \tag{1}
$$

Where:
- $C$ is any other random variable (different from $X$) with known $\mathbb{E}(C)$
- $b \in \mathbb{R}$ is a constant

::: tip Key Requirements
1. $C$ must be such that $\mathbb{E}(C)$ is known **a priori**
2. $C$ should be an inherent part of the simulation output for $X$ (generated "for free" with $X$)
:::

---

## Control Variate in IMTSP

### Problem Formulation
View MTSP as a bilevel optimization problem:

**Upper Level**:
- Optimize allocation network $f(\theta)$ (city-agent assignment)
- Optimize surrogate network $s(\gamma)$

**Lower Level**:
- Optimize TSP solver $g(\mu^*)$ (single-agent routing)

$$
\min L = \max D(g(h(f(\theta))), \mu)
$$

::: details Notation Breakdown
| Component         | Description                          |
|--------------------|--------------------------------------|
| $f(\theta)$       | Allocation network (parameters $\theta$) |
| $h(\cdot)$        | Sampling function                   |
| $g(\cdot)$        | TSP solver                          |
| $\mu$             | TSP solver parameters               |
| $D(\cdot)$        | Euclidean distance cost function    |
:::

---

## Gradient Estimation

### Challenge 1: Non-Differentiability
::: warning Solution: Log-Derivative Trick
Implement gradient computation through:
1. Allocation network $f$
2. TSP solver $g$ and parameters $\mu$

Compact form:
$$
\min L = \max D(g(h(f(\theta))), \mu)
$$
:::

---

## Proof of Gradient Interchange
Under regularity conditions:
$$
\nabla_\theta L = \nabla_\theta \mathbb{E}[D(g(h(f(\theta))), \mu)]
$$

Rewritten as:
$$
\nabla_\theta L = \mathbb{E}[\nabla_\theta D(g(h(f(\theta))), \mu)]
$$

---

## Variance Reduction

### Challenge 2: High Variance
::: success Solution: Control Variate
Introduce surrogate network to:
1. Provide control variate for allocation network
2. Minimize single-sample gradient variance
:::

---

## Surrogate Network Design

**Input**: Allocation matrix $P(\theta)$  
**Output**: Maximum tour length $L'$

$$
\mathbb{E}(C) = \mathbb{E}[\nabla_\theta \log P(\theta)]
$$


