---
icon: wangge
date: 2024-04-26
category: 交通
---

# 元胞自动机 _Cellular Automata_

本节简单介绍一下元胞自动机模型，包括其定义、基本概念、应用等方面，具体讲解可以看[这篇文章](https://link.springer.com/referenceworkentry/10.1007/978-1-4419-9863-7_989)与[这篇](https://plato.stanford.edu/entries/cellular-automata/)文章。

## 定义 _Definition_

**元胞自动机**（Cellular Automata, CA）是自动机理论（Theory of automata）中的一种离散计算模型，最初由[Stanislaw Ulam](https://en.wikipedia.org/wiki/Stanislaw_Ulam)和[John von Neumann](https://en.wikipedia.org/wiki/John_von_Neumann) 于 20 世纪 40 年代在洛斯阿拉莫斯国家实验室同时提出[[1]][a]。一个完整的元胞自动机模型包含 ==元胞、元胞空间、元胞邻居、元胞边界、元胞规则== 五大部分，下面将分别做进一步阐述。

## 元胞 _Cell_

**元胞**是 CA 模型的基本单元，是模型迭代的直接参与者，从概念上就可以理解元胞就好似生物体的细胞。每一个元胞都有一个**状态**,一般为二维（如 0-1），复杂情况下也有多维。

[a]: https://en.wikipedia.org/wiki/Cellular_automaton

## 元胞空间 _Space_

**元胞空间**为空间内元胞的集合，即按一定方式对空间划分，元胞呈一定形状。元胞空间划分方式大致有 ==正方形（类似栅格化）、三角形、正六边形== 等类型。

## 元胞邻居 _Neighbour_

**元胞邻居**是某一元胞周围的元胞，是否为邻居，取决于元胞状态更新时所要搜索的空间域，在二维空间下，最常用的邻居类型是 Moore 型和 Von Neumann 型，如图一所示：

![图1 元胞类型](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/CA/neighbour.png?raw=true)

Moore 邻居定义为下式：
:::: center

$$
{{N_M}({x_0},{y_0})} = \{ (x,y):\;|x - {x_0}|\; < = r,|y - {y_0}|\; < = r\}                             
$$

::: left
Von Neumann 邻居定义为：
:::

$$
{ {N_V}({x_0},{y_0})} = \{ (x,y):\;|x - {x_0}| + |y - {y_0}|\; < = r\}                                   
$$

::::

## 边界条件 _Boundary_

**边界条件**是元胞空间外的部分，是为了让最外围元胞能够有像内部元胞一样的邻域条件所创建的虚拟元胞。常用的邻居边界条件类型有：==固定型，周期型，绝热型和映射型==这四种，常用为固定型和周期型。
::: note

- 固定型：在外围补上固定不变的、虚拟的元胞。
- 周期型：每个维度的第一个元胞与最后一个元胞互为边界。
- 绝热型：边界元胞与自己相同。
- 映射型：边界元胞为元胞每个维度内侧邻近元胞。
  一般常用为固定型和周期型边界条件。
  :::

## 元胞规则 _Rule_

**元胞规则**即每次迭代，每个元胞按照当前状态及周围邻居的状态来更新下一时刻该元胞状态，每个元胞按照该规则进行状态更新，相互作用，由局部到整体，从而引起全局的变化。元胞规则是整个 CA 模型最为关键的部分。
::: info
元胞自动机更新规则特征[[2]][b]：
1.  离散型：空间、时间及状态都是离散的;
2.  同质性：服从相同的规律分布方式相同；
3.  并行性：元胞的状态更新规则变化是同步进行的；
4.  高维度：元胞自动机是一类无穷维动力系统。
:::
[b]: https://blog.csdn.net/yifantan/article/details/122527525?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-122527525-blog-86798384.pc_relevant_3mothn_strategy_and_data_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2-122527525-blog-86798384.pc_relevant_3mothn_strategy_and_data_recovery&utm_relevant_index=5

## 生命游戏 _The Game of Life_

[**生命游戏**][c]是最著名的二维元胞自动机生命游戏，由[John Conway][d]于 1970 年设计。它由二维元胞网格组成，其状态可能是死亡 (0) 或活着 (1)。该游戏采用标准 Moore 邻居，其元胞规则为：
:::: center
对于“活着”的格子，若它的 8 个 Moore 邻居中有 2-3 个为“活着”，则该格继续保持“活着”，否则就变为“死亡”。
对于“死亡”的格子，若它的 8 个邻居中有 3 个“生”，则该格变为“生”，否则继续保持“死”。
::: left
用函数表示如下：
:::

$$
{v^{{t + 1}}}(\alpha ) = \left\{ \begin{array}{ll} {0,} & {S < 2 \vee S\,> 3} \cr {{\nu^t}(\alpha ),} & \qquad {S = 2} \cr {1,} & \qquad {S = 3} \cr \end{array} \right.                                          
$$

::::

![图2 生命游戏](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/CA/lifegame.gif?raw=true)

[c]: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
[d]: https://en.wikipedia.org/wiki/John_Horton_Conway

## 应用 _Application_

元胞自动机的应用大致有以下几类：

- 作为物理、化学、生物过程的基础模型
- 计算单元
- 模拟现实复杂动态系统

::: important 英文介绍
*Cellular automaton is a discrete computing model in the Theory of automata. A complete cellular automaton model includes five parts: cell, cell space, cell neighbor, cell boundary, and cell rules. Each cell has a state which can be 0 or 1, alive or dead. Each cell follows a set of rules and updates the state at every time step based on the current state and their neighbors' state, thereby triggering global changes. It has many applications in computing and simulation.* 
:::