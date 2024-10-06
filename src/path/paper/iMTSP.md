---
icon: lunwen
ReadingTime: true
date: 2024-10-06
Word: true
PageView: true
category: PR
---

# iMTSP: Solving Min-Max Multiple Traveling  Salesman Problem with Imperative Learning

[论文原址](https://arxiv.org/abs/2405.00285)

This paper presents a network-based approach to solving the Min-Max Multiple Traveling Salesman Problem (MTSP) by integrating a deep learning model with a traditional TSP solver. The MTSP problem is formulated as a bilevel optimization problem:

- Upper level: Optimizes the assignment of cities to agents using an allocation network. This network leverages a Compositional Message Passing Neural Network (CMPNN) to encode city topological relationships and an attention mechanism to determine which agent should visit which cities.

- Lower level: Uses a traditional TSP solver to compute the optimal visiting order of cities for each agent, based on the assignment provided by the upper level.
The objective is to minimize the longest tour length among all agents, which is non-differentiable and leads to high variance in gradient estimates, making optimization difficult. To address this:

- The log-derivative trick is applied to estimate the gradients for the non-differentiable allocation process.

- A surrogate network is introduced to predict the maximum tour length based on the city assignments. This acts as a control variate, reducing the variance in gradient estimates and stabilizing the training process.

The final gradient is a combination of:

1. The log-derivative-based gradient, adjusted by the difference between the surrogate network’s prediction and the actual maximum tour length.

2. The gradient of the surrogate network, which helps improve its prediction accuracy.

![the original loss function of allocation network](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/ori.png?raw=true)

![the new loss function of allocation network](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/paper/imtsp/new.png?raw=true)

Experimental results demonstrate that the proposed approach significantly improves convergence speed, solution quality (shorter tours), and scalability to larger problem instances.