---
icon: robotics
ReadingTime: true
date: 2025-11-20
Word: true
PageView: true
category: robot
---

# 现代机器人学

## 第 1 章：绪论 (Preliminary)

机器人的本质是由**刚体 (Rigid Bodies)** 组成的系统。

- **连杆 (Links):** 机器人系统中的刚体。
- **关节 (Joints):** 连接相邻连杆并允许其发生相对运动的部件。

## 第 2 章：位形空间 (Configuration Space)

### 2.1 基本概念

- **位形 (Configuration):** 指定机器人上每一个点的位置（Position）和姿态（Orientation）的一组参数。
- **位形空间 (C-space):** 所有可能位形的集合。
- **自由度 (Degrees of Freedom, dof):** C-space 的维度，即表示机器人位形所需的**最小实数**参数的个数。

**常见刚体的自由度：**

- 空间刚体 (Spatial Rigid Body): **6 dof** (3 个位置坐标 x,y,z + 3 个姿态坐标 roll, pitch, yaw)。
- 平面刚体 (Planar Rigid Body): **3 dof** (2 个位置坐标 x,y + 1 个姿态角 $\theta$)。

### 2.2 自由度计算 (Grübler's Formula)

机器人的总自由度取决于刚体数量和关节提供的约束。

**基本逻辑：**

$$
dof = (\text{所有刚体的自由度总和}) - (\text{关节提供的独立约束总数})
$$

**Grübler 公式 (Grübler's formula):**
假设 $N$ 为刚体总数（包括地基 ground），$J$ 为关节数量，$m$ 为单个刚体的自由度（空间为 6，平面为 3）。
每个关节 $i$ 提供 $c_i$ 个约束，允许 $f_i$ 个自由度（$f_i = m - c_i$）。

$$
dof = m(N - 1) - \sum_{i=1}^{J} c_i
$$

整理得到：

$$
dof = m(N - 1 - J) + \sum_{i=1}^{J} f_i
$$

### 2.3 拓扑 (Topology)

定义: C-space 的拓扑是指该空间的整体“形状”或“连通结构”，它不依赖于具体的坐标选择。 拓扑由关节所决定，C-space 中的每一个点代表刚体的一个位形。)

为什么要关心拓扑？
相同维度的空间可能有完全不同的拓扑形状，这决定了机器人运动的连续性（例如是否能绕圈）。

常见的拓扑形状：

$\mathbb{R}^1$ (直线): 移动关节 (Prismatic joint) 的位形空间。有边界，不循环。

$S^1$ (圆): 转动关节 (Revolute joint) 的位形空间。$0$ 和 $2\pi$ 是同一个点（首尾相接）。

$T^2 = S^1 \times S^1$ (环面 Torus): 2R 机械臂（两个转动关节）的 C-space。就像甜甜圈表面，两个方向都是循环的。

$S^2$ (球面): 球面关节 (Spherical joint) 的部分位形空间。

$SO(3)$: 刚体姿态的空间。

![拓扑与C-space](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/robot/topology.png?raw=true)

### 2.4 表达方式与约束

问题：位形的表示一定要用最少数量的变量吗？

答案是：不一定。虽然DOF告诉我们最少需要多少个变量，但在实际数学描述（坐标表示）中，我们有两种选择：

1. 显式表示 (Explicit Representation) / 广义坐标

方法: 使用与自由度数量相等 ($n$个) 的变量来表示。

例如：用经度 $\theta$ 和纬度 $\phi$ (2个变量) 来表示球面上的点 (2自由度)。

例如：用欧拉角 (3个变量) 来表示空间旋转 (3自由度)。

优点: 变量最少，没有多余信息。

缺点: 对于复杂的拓扑结构（如球体、旋转群），必然存在奇异点 (Singularities)。

例子: 在北极点，经度 $\theta$ 失去意义（无论经度是多少，都是北极）。这就是显式表示的局限性。

2. 隐式表示 (Implicit Representation)

方法: 使用多于自由度数量 ($m > n$) 的变量，并附加 $m-n$ 个约束方程。即把 $n$ 维空间嵌入到更高维的 $m$ 维空间中。

例如：用 $(x, y, z)$ (3个变量) 来表示球面，附加约束 $x^2 + y^2 + z^2 = 1$。

例如：用旋转矩阵 (9个变量) 来表示空间旋转，附加 6 个约束 ($R^T R = I, \det R = 1$)。

优点: 可以做到全局无奇异 (Singularity-free)，数学运算（如旋转矩阵乘法）通常更线性、更稳定。

缺点: 变量冗余，需要时刻维护约束条件（例如计算完旋转后，矩阵可能不再正交，需要修正）。

![约束表达](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/robot/representation.png?raw=true)

这里的约束表达很关键，后面在第三章，我们主要会用隐式表达，而不是显示表达，因为隐式表达可以用于矩阵运算。

**约束类型分类：**

1. **完整约束 (Holonomic):** 对位形的约束（可以减少自由度）。$g(\theta) = 0$。
2. **非完整约束 (Nonholonomic):** 对速度的约束（不减少位形空间的维数，但限制运动方向）。例如汽车不能横向平移 (Pfaffian constraints: $A(\theta)\dot{\theta}=0$，可积分的 Pfaffian constraints 可以转换为完整约束)。

### 2.5 任务空间和工作空间

任务空间(taskspace)，就是指完成该任务所需要的空间，由任务决定。

工作空间(workspace)，是指 end-effector 的 position 和 orientation，由机器人本身所决定。

## 第 3 章：刚体运动 (Rigid-Body Motions)

本章是从传统的欧拉角/DH 参数转向现代机器人学（指数积公式）的基础。

### 3.1 旋转矩阵 (Rotation Matrix)

旋转矩阵 $R$ 描述了刚体的姿态。所有的旋转矩阵构成了特殊正交群 (Special Orthogonal Group)，记作 $SO(3)$。

为什么旋转矩阵属于 $SO(3)$？
$SO(3)$ 是所有满足以下两个条件的 $3 \times 3$ 实矩阵的集合：

- 正交性 (Orthogonal): $R^T R = I$。这意味着矩阵的列向量是两两正交的单位向量。

- 特殊性 (Special): $\det R = 1$。这意味着坐标系遵循右手定则（排除了镜像反射）。

旋转矩阵的性质 (Properties of Rotation Matrices):
基于 $SO(3)$ 的定义，旋转矩阵具有以下重要性质：

逆即转置 (Inverse):

$$R^{-1} = R^T \in SO(3)$$

(这是因为 $R^T R = I$，所以 $R^T$ 就是 $R$ 的逆)

- 封闭性 (Closure):
若 $R_1, R_2 \in SO(3)$，则 $R_1 R_2 \in SO(3)$。
(两个旋转的组合依然是一个旋转)

- 结合律 (Associative):

$$(R_1 R_2) R_3 = R_1 (R_2 R_3)$$

- 非交换律 (Not Commutative):

$$R_1 R_2 \neq R_2 R_1$$

(先绕 X 轴转再绕 Y 轴转，与先绕 Y 轴再绕 X 轴，结果是不同的)

- 保范性 (Preserves Norm):
对于任意向量 $x \in \mathbb{R}^3$：

$$\|Rx\| = \|x\|$$

(旋转不会改变向量的长度，也不会改变两个向量之间的夹角，这是刚体运动的关键特征)

**旋转矩阵的三个主要用途：**

1. 表示姿态: 将刚体坐标系 $\{b\}$ 的坐标轴在参考坐标系 $\{s\}$ 中投影（因此旋转矩阵的每一列就是 b frame 的 x, y, z 轴分别在 s frame 的投影）。

2. 坐标系变换: 将向量从 $\{b\}$ 系表示变换为 $\{s\}$ 系表示：$p_s = R_{sb} p_b$。

3. 旋转算子: 将向量或坐标系绕原点旋转。

对于3，旋转矩阵和被旋转的向量/姿态都要在同一坐标系 frame 下表达，这与 2 不同，2 中，旋转矩阵表达在 s 坐标系而 b 向量表达在 b 坐标系。

**左乘与右乘：**

- **左乘 (Pre-multiply):** $R' = R \cdot R_{sb}$ $\rightarrow$ 绕 **固定坐标系 (Fixed Frame/Space Frame)** 旋转。
- **右乘 (Post-multiply):** $R'' = R_{sb} \cdot R$ $\rightarrow$ 绕 **当前体坐标系 (Body Frame)** 旋转。

![左乘右乘区别](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/robot/pre_and_post.png?raw=true)

**特殊正交群** $SO(3)$ **的性质:**

- $R^T R = I$
- $\det R = 1$
- 封闭性、结合律、但**不满足交换律**。

### 3.2 角速度 (Angular Velocity)

就像在平面运动中，向量的旋转总可以看作绕某个固定点以速度 $\dot{\theta}$ 旋转一样；在空间中，旋转也可以看作绕某个固定轴的旋转。

例如，旋转矩阵的第一点用途，表示一个姿态，我们也可以理解为，当前姿态是有一个与fixed frame重合(不一定是空间位置的重合，因为我们在这里只研究方向，因此我们说的是与基坐标系的x,y,z轴的方向重合)的初始姿态，绕某一轴的旋转得到的。

如下图所示:

![角速度与旋转](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/robot/angular.png?raw=true)

图中，frame b 在绕轴$\hat{w_s}$以$\dot{\theta}$速率旋转，这就是角速度的定义，任意角速度都可以由一个旋转轴 $\hat{\omega}_s$ (单位向量) 和绕该轴的旋转速率 $\dot{\theta}$ (标量) 来表示（注意，一般本书的 ^ 符号都表达单位向量）：

$$\omega_s = \hat{\omega}_s \dot{\theta}$$

这里 $\dot{\theta}$ 是标量，$\hat{\omega}_s$ 是单位向量。

由之前学到过的角速度的计算，我们知道对于 frame b 的 x, y, z 分量的变化（即垂直反向线速度的大小），可以用叉乘来表示。

$\dot{\hat{x}}_{b} = \omega_{s} \times \hat{x}_{b}$

$\dot{\hat{y}}_{b} = \omega_{s} \times \hat{y}_{b}$

$\dot{\hat{z}}_{b} = \omega_{s} \times \hat{z}_{b}$

所以姿态的变化率 $\dot{R} = (\dot{x}, \dot{y}, \dot{z})$，但这样的表达是不方便的，因此我们引入反对称矩阵 $so(3)$:

定义一个带有方括号 $[\cdot]$ 的算子，将 3 维向量映射为 $3 \times 3$ 的反对称矩阵（Skew-symmetric matrix），用于表示叉积运算：

$$x \times y = [x]y$$

对于向量 $x = [x_1, x_2, x_3]^T \in \mathbb{R}^3$，其对应的反对称矩阵为：

$$[x] = \begin{bmatrix} 0 & -x_3 & x_2 \\ x_3 & 0 & -x_1 \\ -x_2 & x_1 & 0 \end{bmatrix}$$

性质： $[x] = -[x]^T$。
由于它与 $SO(3)$ 的紧密关系，这组矩阵被称为 $so(3)$。

利用反对称矩阵，我们可以将姿态的变化率写为：

$$\dot{R}_{sb} = [\omega_s] R_{sb}$$

这里 $\omega_s$ 是在固定坐标系 $\{s\}$ 下表示的角速度。
:
由于 $\omega$ 本质上是一个自由向量，我们可以通过旋转矩阵在不同坐标系间转换它：

$$\omega_b = R_{sb}^T \omega_s = R_{sb}^{-1} \omega_s$$

或者

$$\omega_s = R_{sb} \omega_b$$

通过姿态变化率方程 $\dot{R} = [\omega_s]R$，我们可以反解出角速度的矩阵形式。

空间角速度 (Spatial Angular Velocity):
已知 $\dot{R} = [\omega_s]R$，我们在等式两边右乘 $R^{-1}$ (即 $R^T$)：

$$[\omega_s] = \dot{R} R^{-1} = \dot{R} R^T$$

物体角速度 (Body Angular Velocity):
类似地，对于物体角速度 $[\omega_b]$：

$$[\omega_b] = R^{-1} \dot{R} = R^T \dot{R}$$

最后，我们再明确一点， $\dot{R}$ 是反应旋转的变化，而旋转反应在空间的是orientation的变化，而不是对于旋转矩阵 $R$ 求导。 $R$ 只是对orientation的隐式表达。

### 3.3 旋转的指数坐标 (Exponential Coordinates of Rotation)

在 3.2 节中我们建立了微分方程 $\dot{R} = [\omega]R$。就像通过积分速度 $v$ 得到位置 $x$ 一样，我们也希望能通过“积分”角速度来求得最终的旋转矩阵。这种用旋转轴 $\hat{\omega}$ 和转角 $\theta$ 来参数化旋转的方式，称为指数坐标。

具体的推导过程 (From Differential Equation to Matrix Exponential)如下：

我们已经知道 $\dot{R} = [\omega_s]R$。
如果我们考虑绕着一个固定的单位旋转轴 $\hat{\omega}_s$ 以恒定速率（例如单位速率）旋转，那么角速度矩阵 $[\omega_s] = [\hat{\omega}_s]$ 是一个常数矩阵。
此时，微分方程变为一个常系数线性常微分方程 (Linear ODE)：

$$\dot{R} = A R \quad (A = [\hat{\omega}_s] \text{ 为常矩阵})$$

回忆标量方程 $\dot{x} = ax$ 的解是 $x(t) = e^{at}x(0)$。同理，矩阵微分方程的解为：

$$R(t) = e^{At} R(0)$$

假设初始时刻 $t=0$ 时没有旋转，即初始条件 $R(0) = I$。代入 $A = [\hat{\omega}_s]$，我们得到：

$$R(t) = e^{[\hat{\omega}_s]t}$$

这就是在 $t$ 时刻的旋转矩阵。如果我们旋转的总角度为 $\theta$（相当于令 $t=\theta$ 且速率为 1），则最终的指数映射 (Exponential Map) 为：

$$R(\theta) = e^{[\hat{\omega}]\theta}$$

::: important 意义

这个公式建立了从李代数 $so(3)$（反对称矩阵 $[\hat{\omega}]\theta$）到李群 $SO(3)$（旋转矩阵 $R$）的映射关系。

即一个姿态orientation可以用一个 $SO(3)$ 的旋转矩阵 $R$ 来表达, 也可以用一个旋转轴 $\hat{\omega}_s$ 以单位速率 $\dot{\theta}=1$ 旋转 $\theta$ 时间/角度 来表示，后者的表示需要将这样的旋转轴矩阵化，也就是 $so(3)$ 的形式，再借助指数映射来表达。即 $SO(3) \to exp(so(3))$.

**即印证了两种姿态表示的等价性**。

::: 

罗德里格斯公式 (Rodrigues' Formula)
如何计算矩阵指数 $e^{[\hat{\omega}]\theta}$？
通过泰勒级数展开 $e^X = I + X + \frac{X^2}{2!} + \dots$，利用 $[\hat{\omega}]$ 的性质，可以推导出闭式解：

$$Rot(\hat{\omega}, \theta) = e^{[\hat{\omega}]\theta} = I + \sin\theta [\hat{\omega}] + (1 - \cos\theta) [\hat{\omega}]^2$$

### 3.4 齐次变换矩阵 (Homogeneous Transformation Matrix)

前面我们只研究了刚体的姿态 row, yaw, pitch。它可以通过旋转矩阵来表达，但是正如前文提到，一个刚体在空间中的完整表达需要 position 和 orientation。因此，我们引入齐次变换矩阵来联合描述二者。

![齐次变换矩阵](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/robot/transformation1.png?raw=true)

![齐次变换矩阵](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/robot/transformation2.png?raw=true)

描述刚体在空间中的位置和姿态。

集合 $SE(3)$ (Special Euclidean Group)：

$$
T = \begin{bmatrix} R & p \\ 0 & 1 \end{bmatrix} \in \mathbb{R}^{4 \times 4}, \quad R \in SO(3), p \in \mathbb{R}^3
$$

**逆矩阵:**

$$T^{-1} = \begin{bmatrix} R^T & -R^T p \\ 0 & 1 \end{bmatrix}$$

同样的，齐次变换矩阵也有三个用途：

1. 表示位形 configuration。

2. 坐标系变换: 将向量从 $\{b\}$ 系表示变换为 $\{s\}$ 系表示：$p_s = T_{sb} p_b$。

3. 螺旋算子: 将向量或坐标系绕原点作螺旋变换，即位移+旋转。

在3.2节提到，对于*旋转矩阵的第一点用途，表示一个姿态，我们也可以理解为，当前姿态是有一个与fixed frame重合(不一定是空间位置的重合，因为我们在这里只研究方向，因此我们说的是与基坐标系的x,y,z轴的方向重合)的初始姿态，绕某一轴的旋转得到的*。

那么在这里，对于1，我们可以理解当前的位姿是由一个与fixed frame重合的初始位姿（这里的*重合*，就指的是空间位置（在原点）和旋转方向均重合），绕某一个螺旋轴，作平移和旋转得到的。

那么平移是从原点发生的，因此这里的速度是原点处的速度。

对于 2.由于齐次变换矩阵是 4\*4，而向量是三维，因此需要做齐次坐标变换，即将 3 维向量 $x$ 扩展为 4 维向量 $\begin{bmatrix} x \\ 1 \end{bmatrix}。$。

### 3.5 刚体运动的指数坐标 (Exponential Coordinates of Rigid-body Motion)

正如旋转矩阵 $R$ 是旋转微分方程 $\dot{R} = [\hat{\omega}]R$ 的解，其形式为 $R = e^{[\hat{\omega}]\theta}$；

齐次变换矩阵 $T$ 也是运动微分方程 $\dot{T} = [S]T$ 的解，其形式为 $T = e^{[S]\theta}$。

那这里的 $S$ 到底是什么?

这是本书最核心的理论迁移：从单纯的**旋转**推广到一般的**刚体运动（螺旋运动 Screw Motion）**。

在旋转中，我们有“欧拉定理”：任何旋转都可以看作绕某轴转了 $\theta$ 角。

在一般刚体运动中，我们有 Chasles-Mozzi 定理：

Chasles' Theorem: 任何刚体位移都可以通过**绕某一轴的旋转**和**沿该轴的平移复合而成**。这种运动称为螺旋运动（Screw Motion）。

就像任何旋转都可以看作绕某轴转了 $\theta$ 角度，那么同样，任何刚体位移都可以通过绕一个螺旋轴运动 $\theta$ 角度。

在旋转中，我们用的是一个单位方向向量和一个速度标量来表示这样的旋转速度，即角速度：

$$\omega_s = \hat{\omega}_s \dot{\theta}$$

那么在这里，我们也是用一个单位螺旋轴和一个速度标量来表示这样的空间移动速度（刚体移动速度/螺旋速度）：

$$
\mathcal{V} = \mathcal{S} \dot{\theta}
$$

这里的 $\mathcal{V}$ 就是所谓的**旋量（twist）**，这里的 $\mathcal{S}$ 就是所谓的**螺旋（screw）**。

这就是我们本节主要研究的内容。

另外，在研究姿态orientation中，我们可以通过rotation matrix来表示，也可以通过前面提到的旋转概念来表示，并且通过指数映射建立了两者的关系，同样的本节我们也会建立表示位形transformation matrix和螺旋间的关系。

#### 3.5.1 旋量 (Twist) $\mathcal{V}$

旋转有角速度，刚体在空间的的运动不止旋转，也包含平移，因此，描述刚体运动的空间速度就包含角速度和线速度，称之为旋量。

$$\mathcal{V} = \begin{bmatrix} \omega \\ v \end{bmatrix} \in \mathbb{R}^6$$

**注意：这里的* $v$ *不是刚体质心的线速度，而是刚体上与坐标原点重合的点的线速度。**

Why?

**矩阵形式** $[\mathcal{V}] \in se(3)$**:**

$$
[\mathcal{V}] = \begin{bmatrix} [\omega] & v \\ 0 & 0 \end{bmatrix} \in \mathbb{R}^{4 \times 4}
$$

注意这里的[]与上文对于 so(3)的意义不一样。

其中 $[\omega]$ 为

$$
\begin{bmatrix}
0 & -\omega_3 & \omega_2\\
\omega_3 & 0 & -\omega_1\\
-\omega_2 & \omega_1 & 0
\end{bmatrix}.
$$

#### 3.5.2 螺旋轴 (Screw Axis) $\mathcal{S}$

螺旋轴 $\mathcal{S}$ 以下要素定义：

- **单位方向向量 (Axis Direction):** $\hat{s}$ (即旋转轴的方向, $\|\hat{s}\|=1$)
- **轴上一点 (Point on Axis):** $q$ (确定轴在空间的位置)
- **节距 (Pitch):** $h$ (旋转 1 弧度时，沿轴平移的距离。$h = \text{linear\_speed} / \text{angular\_speed}$)

当我们说刚体进行了螺旋运动，是指它绕着轴 $\mathcal{S}$ 旋转了 $\theta$ 角度，同时沿轴平移了 $h\theta$ 的距离。

![螺旋](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/robot/screw.png?raw=true)

#### 3.5.3 螺旋轴 $\mathcal{S}$ 与 旋量 $\mathcal{V}$ 的关系

前面提到了，螺旋轴 $\mathcal{S}$ 是**归一化**后的旋量。

$$
\mathcal{V} = \mathcal{S} \dot{\theta}
$$

- 如果 $\omega \neq 0$ (有旋转)，归一化使得 $\|\omega\|=1$，此时参数 $\theta$ 代表旋转角度, $v=-\omega \times q + h\omega$
- 如果 $\omega = 0$ (纯平移)，归一化使得 $\|v\|=1$，此时参数 $\theta$ 代表平移距离。

如果我们已知螺旋轴的几何参数 $\{q, \hat{s}, h\}$，那么 $S$ 的 6 维向量形式为：

$$\mathcal{S} = \begin{bmatrix} \omega \\ v \end{bmatrix} = \begin{bmatrix} \hat{s} \\ -\hat{s} \times q + h\hat{s} \end{bmatrix}$$

其中：

- $\omega = \hat{s}$ (旋转部分)
- $v = -\hat{s} \times q + h\hat{s}$ (线速度部分，由力矩项和节距项组成)

因此旋量也可以表示为：

$$
\mathcal{V} = \mathcal{S} \dot{\theta} = \begin{bmatrix} \hat{s}\dot{\theta} \\ -\hat{s}\dot{\theta} \times q + h\hat{s}\dot{\theta} \end{bmatrix}
$$

**矩阵形式** $[\mathcal{S}] \in se(3)$**:**

$$
[\mathcal{S}] = \begin{bmatrix} [\omega] & v \\ 0 & 0 \end{bmatrix} \in \mathbb{R}^{4 \times 4}
$$

这里的 $\omega$ 应该是单位化后的（如果不为0）。

#### 3.5.4 伴随变换 (Adjoint Map) $[Ad_T]$

用于在不同坐标系之间**变换旋量（Twist）**。
如果 $T = (R, p)$，则伴随矩阵为 $6 \times 6$ 矩阵：

$$[Ad_T] = \begin{bmatrix} R & 0 \\ [p]R & R \end{bmatrix}$$

变换公式：

$$\mathcal{V}_s = [Ad_{T_{sb}}] \mathcal{V}_b$$


#### 3.5.5 刚体运动的指数映射

类比旋转的指数映射，我们只需要把 $\hat{\omega_s}$ 替换为 $\mathcal{S}$就可以得到：

给定螺旋轴 $\mathcal{S}$ 和运动量 $\theta$，刚体的位姿变换为：

$$T(\theta) = e^{[\mathcal{S}]\theta} = \begin{bmatrix} e^{[\omega]\theta} & G(\theta)v \\ 0 & 1 \end{bmatrix}$$

*(其中* $G(\theta)$ *是类似罗德里格斯公式的积分项)*

这被称为 $SE(3)$ 上的指数映射 (Exponential Map)，反映了 $se(3)$ 到 $SE(3)$ （齐次变换矩阵）的变换

同样的有：

$$
\begin{align*}
[\omega_b] &= \dot{R}^{-1} \dot{R} \in \mathfrak{so}(3) \\[8pt]
[\omega_s] &= \dot{R} R^{-1} \in \mathfrak{so}(3) \\[12pt]
[V_b] &= \dot{T}^{-1} \dot{T} =
\begin{bmatrix}
[\omega_b] & v_b \\
0 & 0
\end{bmatrix} \in \mathfrak{se}(3) \\[12pt]
[V_s] &= \dot{T} T^{-1} =
\begin{bmatrix}
[\omega_s] & v_s \\
0 & 0
\end{bmatrix} \in \mathfrak{se}(3)
\end{align*}
$$

#### 3.5.6 **总结对比：旋转 vs 刚体运动**

| **概念** | **旋转 (Rotation, SO(3))** | **刚体运动 (Motion, SE(3))** |
| --- | --- | --- |
| **微分方程** | $\dot{R} = [\omega]R$ | $\dot{T} = [\mathcal{V}]T$ |
| **速度描述** | 角速度 $\omega \in \mathbb{R}^3$ | 旋量 (Twist) $\mathcal{V} \in \mathbb{R}^6$ |
| **归一化基** | 转轴 $\hat{\omega}$ (Unit Axis) | 螺旋轴 $\mathcal{S}$ (Screw Axis) |
| **分解关系** | $\omega = \hat{\omega} \dot{\theta}$ | $\mathcal{V} = \mathcal{S} \dot{\theta}$ |
| **李代数矩阵** | $[\hat{\omega}] \in so(3)$ ($3\times3$ 反对称) | $[\mathcal{S}] \in se(3)$ ($4\times4$ 矩阵) |
| **指数映射** | $R(\theta) = e^{[\hat{\omega}]\theta}$ | $T(\theta) = e^{[\mathcal{S}]\theta}$ |

## 第4章：正运动学 (Forward Kinematics)

给定关节角 $\theta$，计算末端执行器end-effector的位姿 $T$。

![前向运动学](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/robot/forward.png?raw=true)

有两种计算方法：

### D-H 参数法 (Denavit-Hartenberg):

- 基于连杆坐标系的变换链：即将每一个连杆末端表示在前一个连杆坐标系里，$T_{04} = T_{01} T_{12} T_{23} T_{34}$。
- 依赖坐标系的建立规则，容易出错。

![DH法](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/robot/dh.png?raw=true)

### 指数积公式 (Product of Exponentials, PoE):

- 不需要建立中间连杆坐标系，只需要基坐标系 $\{s\}$ 和末端坐标系 $\{b\}$。
- 需要知道：
    1. **零位 (Home Position)** $M$**:** 当所有 $\theta=0$ 时，末端相对于基座的位姿。
    2. **螺旋轴** $\mathcal{S}_i$**:** 当机器人处于零位时，各关节轴在基座标系下的螺旋轴参数。

**空间坐标系下的 PoE 公式:**

$$T(\theta) = e^{[\mathcal{S}_1]\theta_1} e^{[\mathcal{S}_2]\theta_2} \cdots e^{[\mathcal{S}_n]\theta_n} M$$

**体坐标系body frame下的** PoE **公式:**

$$T(\theta) = M e^{[\mathcal{B}_1]\theta_1} e^{[\mathcal{B}_2]\theta_2} \cdots e^{[\mathcal{B}_n]\theta_n}$$

*(注意：体坐标系下的螺旋轴* $\mathcal{B}_i$ *也是在零位时测量的，但在公式中是右乘)*

推导：

从基座出发，从后往前（先固定前面的，只运动当前的），依次累积每个关节的作用于M的螺旋运动：

在前面前向运动学的示意图里，是一个3R机械臂，我们以此为例，通过运动叠加的视角来推导PoE公式。其逻辑是：将每个关节的运动视为对“该关节之后的所有连杆组成的刚体”施加螺旋运动。

定义零位 (Home Configuration, M):
设定所有关节角为0 ($\theta_1 = \theta_2 = \theta_3 = 0$)。此时末端执行器坐标系 $\{4\}$ 相对于基座标系 $\{0\}$ 的位姿记为 $M$。

$$M = T_{04}(0)$$

1. Step 1: 仅旋转关节 3
假设关节 1 和 2 固定在零位不动，仅关节 3 旋转 $\theta_3$。
这相当于末端坐标系 $M$ 绕着关节 3 的螺旋轴 $\mathcal{S}_3$（在 $\{0\}$ 系中定义）进行了螺旋运动。

$$T_{04} = e^{[\mathcal{S}_3]\theta_3} M \quad (\text{当 } \theta_1=\theta_2=0)$$

2. Step 2: 引入关节 2
现在保持 $\theta_1=0$，并固定 $\theta_3$ 为任意值。旋转关节 2 $\theta_2$。
这相当于把“连杆2 + 连杆3”组成的整体（其当前末端位姿已经是 $e^{[\mathcal{S}_3]\theta_3}M$）绕着关节 2 的螺旋轴 $\mathcal{S}_2$ 进行旋转。

$$T_{04} = e^{[\mathcal{S}_2]\theta_2} \left( e^{[\mathcal{S}_3]\theta_3} M \right)$$

注意：这里的 $\mathcal{S}_2$ 也是在机器人处于零位时，在 $\{0\}$ 系下测量的。

3. Step 3: 引入关节 1
最后，保持 $\theta_2, \theta_3$ 固定，旋转关节 1 $\theta_1$。
这相当于把整个机械臂组件（其末端位姿为 $e^{[\mathcal{S}_2]\theta_2} e^{[\mathcal{S}_3]\theta_3} M$）绕着关节 1 的螺旋轴 $\mathcal{S}_1$ 进行旋转。

$$T_{04} = e^{[\mathcal{S}_1]\theta_1} \left( e^{[\mathcal{S}_2]\theta_2} e^{[\mathcal{S}_3]\theta_3} M \right)$$

通用公式:
对于 $n$ 自由度的开链机器人，空间坐标系下的正运动学公式为：

$$T(\theta) = e^{[\mathcal{S}_1]\theta_1} e^{[\mathcal{S}_2]\theta_2} \cdots e^{[\mathcal{S}_n]\theta_n} M$$

::: tip **对于“零位”辨析**

1. 末端“零位”：
设定所有关节角为0 ($\theta_1 = \theta_2 = \theta_3 = 0$)。此时末端执行器坐标系 $\{4\}$ 相对于基座标系 $\{0\}$ 的位姿记为 $M$。

2. 对于单个关节“零位”的含义:
对于某个特定的关节 $i$，其螺旋轴 $\mathcal{S}_i$ 在基座标系 $\{s\}$ 中的位置和方向，物理上只取决于它之前的关节 ($1$ 到 $i-1$) 的状态。它之后的关节 ($i+1$ 到 $n$) 怎么动，都不会影响关节 $i$ 轴线在空间中的位置。因此对于 $\mathcal{S}_i$ ，有 $\theta_1 = \dots = \theta_{i-1} = 0$。

:::

## 第5章：速度运动学与拟运动学 (Velocity Kinematics, Inverse Kinematics, Statics)

### 5.1 雅可比矩阵 (Jacobian)

#### 5.1.1 引言：从PoE到雅可比矩阵

在前面的章节中，我们学习了正运动学的指数积公式 (Product of Exponentials, PoE)。对于一个开链机器人，其末端执行器在固定坐标系 $\{s\}$ 下的位形 $T(\theta)$ 可以表示为：

$$T(\theta) = e^{[\mathcal{S}_1]\theta_1} e^{[\mathcal{S}_2]\theta_2} \cdots e^{[\mathcal{S}_n]\theta_n} M$$

其中：

$[\mathcal{S}_i]$ 是第 $i$ 个关节在零位（$\theta=0$）时的螺旋轴（Screw axis）的矩阵表示。

$M$ 是机器人在零位时末端执行器的构型。

$\theta_1, \dots, \theta_n$ 是关节变量。

直观理解：
PoE 告诉我们，机器人的总运动是各个关节螺旋运动的“叠加”（通过矩阵乘法）。既然位置是螺旋运动的累积，那么速度自然也应该与这些螺旋轴有关。

当我们谈论机器人的速度时，我们关心的是关节速度 $\dot{\theta}$ 如何映射到末端执行器的旋量（Spatial Twist）$\mathcal{V}$。这种线性的映射关系就是由雅可比矩阵 (Jacobian Matrix) 描述的：

$$\mathcal{V} = J(\theta)\dot{\theta}$$

维度的含义：

$J(\theta) \in \mathbb{R}^{6 \times n}$

行数 (6)：代表空间旋量 $\mathcal{V}$ 的维度（3个角速度分量 + 3个线速度分量）。

列数 (n)：代表机器人的关节数量（自由度）。

这个矩阵描述了关节空间的微小变化如何传递到笛卡尔空间的微小运动。

#### 5.1.2 Spatial Jacobian 的详细推导

为了找到关节速度 $\dot{\theta}$ 和空间旋量 $\mathcal{V}_s$ 的关系，我们需要对正运动学公式求导。

1. 空间速度的定义回顾

空间旋量 $[\mathcal{V}_s]$ 定义为：

$$[\mathcal{V}_s] = \dot{T}T^{-1}$$

2. 对 PoE 公式求导

已知 $T(\theta) = e^{[\mathcal{S}_1]\theta_1} \cdots e^{[\mathcal{S}_n]\theta_n} M$，根据链式法则，$\dot{T}$ 是 $n$ 项之和。每一项对应一个关节的变化：

$$\begin{aligned}
\dot{T} &= \left(\frac{d}{dt}e^{[\mathcal{S}_1]\theta_1}\right) \cdots e^{[\mathcal{S}_n]\theta_n} M + e^{[\mathcal{S}_1]\theta_1} \left(\frac{d}{dt}e^{[\mathcal{S}_2]\theta_2}\right) \cdots e^{[\mathcal{S}_n]\theta_n} M + \cdots \\
&= [\mathcal{S}_1]\dot{\theta}_1 e^{[\mathcal{S}_1]\theta_1} \cdots M + e^{[\mathcal{S}_1]\theta_1} [\mathcal{S}_2]\dot{\theta}_2 e^{[\mathcal{S}_2]\theta_2} \cdots M + \cdots
\end{aligned}$$

3. 计算 $\dot{T}T^{-1}$

将上式右乘 $T^{-1}$。注意 $T^{-1} = M^{-1} e^{-[\mathcal{S}_n]\theta_n} \cdots e^{-[\mathcal{S}_1]\theta_1}$。

观察每一项的相乘结果：

第一项：

$$[\mathcal{S}_1]\dot{\theta}_1 \underbrace{e^{[\mathcal{S}_1]\theta_1} \cdots M}_{T} T^{-1} = [\mathcal{S}_1]\dot{\theta}_1$$

第二项：

$$e^{[\mathcal{S}_1]\theta_1} [\mathcal{S}_2]\dot{\theta}_2 \underbrace{e^{[\mathcal{S}_2]\theta_2} \cdots M \cdot M^{-1} \cdots e^{-[\mathcal{S}_2]\theta_2}}_{I} e^{-[\mathcal{S}_1]\theta_1} = e^{[\mathcal{S}_1]\theta_1} [\mathcal{S}_2] e^{-[\mathcal{S}_1]\theta_1} \dot{\theta}_2$$

第 $i$ 项：
利用伴随变换性质 $A X A^{-1} = [Ad_A](X)$，通项可以写为伴随变换的形式。

最终得到空间速度的向量形式 $\mathcal{V}_s$：

$$\mathcal{V}_s = \mathcal{S}_1 \dot{\theta}_1 + [Ad_{e^{[\mathcal{S}_1]\theta_1}}](\mathcal{S}_2)\dot{\theta}_2 + [Ad_{e^{[\mathcal{S}_1]\theta_1}e^{[\mathcal{S}_2]\theta_2}}](\mathcal{S}_3)\dot{\theta}_3 + \cdots$$

4. 整理为矩阵形式

将上式写成矩阵乘法形式 $\mathcal{V}_s = J_s(\theta)\dot{\theta}$，其中 $J_s(\theta)$ 就是 Spatial Jacobian：

$$J_s(\theta) = \begin{bmatrix} J_{s1} & J_{s2}(\theta) & \cdots & J_{sn}(\theta) \end{bmatrix}$$

#### 5.1.2 Spatial Jacobian 定义与物理意义

1. 定义

Spatial Jacobian (空间雅可比矩阵) $J_s(\theta)$ 的第 $i$ 列 $J_{si}(\theta)$ 由下式给出：

$$J_{s1} = \mathcal{S}_1$$

$$J_{si}(\theta) = Ad_{e^{[\mathcal{S}_1]\theta_1} \cdots e^{[\mathcal{S}_{i-1}]\theta_{i-1}}}(\mathcal{S}_i), \quad i = 2, \dots, n$$

2. 物理意义

每一列 $J_{si}(\theta)$ 本质上都是一个螺旋轴（Screw Axis）。

数学上：它是零位时的螺旋轴 $\mathcal{S}_i$，经过前 $i-1$ 个关节的刚体变换 $T_{i-1} = e^{[\mathcal{S}_1]\theta_1} \cdots e^{[\mathcal{S}_{i-1}]\theta_{i-1}}$ 变换后的结果。

物理上：$J_{si}(\theta)$ 表示当机器人在当前构型 $\theta$ 下，第 $i$ 个关节的瞬时运动轴在固定坐标系 $\{s\}$ 中的描述。

这意味着，雅可比矩阵把所有关节在当前时刻的瞬时转轴都统一表达在了同一个固定坐标系 $\{s\}$ 下。

3. Spatial Jacobian 的可视化理解

为了直观理解为什么第 $i$ 列只和前 $i-1$ 个关节有关，或者说直观感受下为什么雅可比矩阵的第i列是第
i个关节结果i-1关节变换后在s frame下的表示，我们可以看下面这个图。

![雅可比矩阵可视化](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/robot/jacobian.png?raw=true)

假设我们要通过观察来确定第 $i$ 个关节对末端空间速度的贡献（即 $J_{si}$）。

冻结后续关节：将关节 $i+1$ 到 $n$ 固定不动（或设为0）。它们对第 $i$ 个关节轴的位置没有影响。

前序关节的影响：关节 $1$ 到 $i-1$ 的转动 $\theta_1, \dots, \theta_{i-1}$ 会带动第 $i$ 个关节运动，改变其在空间中的位置和姿态。

当前的轴：

在零位时，第 $i$ 个关节的轴是 $\mathcal{S}_i$，例如图中的 $\mathcal{S}_3$。

当第二个关节转动 $\theta_2$ 角度后，其第二个关节的末端就用 $e^{[\mathcal{S_2}]\theta_2}$表示。

由于第三个关节连着第二个关节，其也跟着做了这样一个变化，即由 $s$ 变为了 $s'$

那么第二再到第一，也是一样的。

那么一般化这个过程：

在当前位形下，前 $i-1$ 个关节形成的变换是 $T_{0, i-1}$。

第 $i$ 个关节现在的轴就是 $\mathcal{S}_i$ 经过 $T_{0, i-1}$ 变换后的结果，即 $Ad_{T_{0, i-1}}(\mathcal{S}_i)$（Adjoint为了维度一致）。

这就是为什么 $J_{si}$ 仅仅是 $\mathcal{S}_i$ 被前面的关节“推”到了新的位置。

#### 5.1.3 Spatial Jacobian 与 Body Jacobian 的关系

除了在固定坐标系表示速度，我们也可以在末端执行器的物体坐标系 $\{b\}$ 中表示速度，即 Body Jacobian $J_b(\theta)$。

1. 关系推导

根据伴随变换的性质，空间速度 $\mathcal{V}_s$ 和物体速度 $\mathcal{V}_b$ 存在如下关系：

$$\mathcal{V}_s = [Ad_{T_{sb}}] \mathcal{V}_b$$

其中 $T_{sb} = T(\theta)$ 是当前的末端位姿。

代入雅可比矩阵的定义：

$$J_s(\theta)\dot{\theta} = [Ad_{T_{sb}}] (J_b(\theta)\dot{\theta})$$

消去 $\dot{\theta}$（对任意速度成立），得到两者关系：

$$J_s(\theta) = [Ad_{T_{sb}}] J_b(\theta)$$

或者反过来：

$$J_b(\theta) = [Ad_{T_{sb}^{-1}}] J_s(\theta) = [Ad_{T_{bs}}] J_s(\theta)$$

2. Body Jacobian 的列

类似地，Body Jacobian 的第 $i$ 列也有明确的物理意义：它是在当前构型下，第 $i$ 个关节的瞬时运动轴在末端物体坐标系 $\{b\}$ 中的描述。

由于是从末端往回看，Body Jacobian 的第 $i$ 列通常只与第 $i$ 个关节之后的关节变量有关（因为只有后面的关节变化会改变坐标系 $\{b\}$ 相对关节 $i$ 的位置）。

### 5.2 逆运动学（Inverse Kinematics）

1. 问题定义 (Problem Definition)

已知：末端执行器 (End-effector) 的目标位姿 (Position and Orientation)，通常记为变换矩阵 $T$ 或目标位形向量 $x_d$。

求解：为了达到该目标位姿所需的关节角度向量 $\theta = [\theta_1, \theta_2, ..., \theta_n]^T$。

对于结构简单的机械臂（如满足 Pieper 准则的 6 轴机械臂），我们可以求得解析解 (Analytical Solution)。但对于自由度冗余、结构复杂或非标准的串联机械臂，解析解往往不存在或极难推导。此时，数值解法 (Numerical Methods) 是通用的解决方案。

2. 原理：求根问题 (Root Finding Problem)

本质上，数值逆运动学是一个非线性方程求根的问题。

我们要找到一组关节角 $\theta_d$，使得经过前向运动学函数 $f(\cdot)$ 变换后，末端实际位姿等于目标位姿 $x_d$。

定义误差函数 $g(\theta)$ 如下：

$$g(\theta_d) = x_d - f(\theta_d) = 0$$

我们的目标就是找到 $\theta_d$ 使得 $g(\theta_d) = 0$。

3. 核心算法：牛顿-拉夫森法 (Newton-Raphson Method)

经典牛顿迭代法：

对于一个可微函数 $g: \mathbb{R} \to \mathbb{R}$，假设 $\theta^0$ 是解的初始猜测值 (Initial Guess)。
牛顿法的迭代公式为：

$$\theta^{k+1} = \theta^k - \left( \frac{\partial g}{\partial \theta}(\theta^k) \right)^{-1} g(\theta^k)$$

4. 将牛顿法应用于逆运动学

误差函数：

$$g(\theta) = x_d - f(\theta)$$

对 $g(\theta)$ 关于 $\theta$ 求导：

$$g'(\theta) = \frac{\partial}{\partial \theta}(x_d - f(\theta)) = -\frac{\partial f}{\partial \theta}$$

其中，$\frac{\partial f}{\partial \theta}$ 正是机械臂的雅可比矩阵 (Jacobian Matrix) $J(\theta)$。
因此：

$$g'(\theta) = -J(\theta)$$

迭代公式推导：
代入牛顿法公式：

$$\begin{aligned}
\theta^{k+1} &= \theta^k - \left[ -J(\theta^k) \right]^{-1} (x_d - f(\theta^k)) \\
\theta^{k+1} &= \theta^k + J^{-1}(\theta^k) \underbrace{(x_d - f(\theta^k))}_{误差 e}
\end{aligned}$$

最终迭代更新律：

$$\theta^{k+1} = \theta^k + J^{-1}(\theta^k) e$$

5. 算法流程 (Algorithm Workflow)

- step 1: 初始化 (Initialization)：

给定目标位姿 $x_d \in \mathbb{R}^m$。

给定一个初始关节角猜测值 $\theta^0 \in \mathbb{R}^n$。

设置迭代计数器 $i = 0$。

设定收敛阈值 $\epsilon$ (e.g., $1e^{-6}$)。

- step 2: 迭代循环 (Iteration Loop)：

计算误差：$e = x_d - f(\theta^i)$

判断收敛：检查误差范数是否满足 $||e|| > \epsilon$。如果满足（即误差仍较大），则继续：

更新关节角：

$$\theta^{i+1} = \theta^i + J^{\dagger}(\theta^i)e$$

(其中 $J^{\dagger}$ 是 $J$ 的伪逆矩阵)

更新计数：$i = i + 1$

如果 $||e|| \leq \epsilon$，则算法停止，输出 $\theta^i$ 作为解。

6. 对于雅可比矩阵逆的说明：

$J^{-1}$：仅适用于非冗余机械臂（关节数 $n$ = 用于表示末端位形的维度 $m$）且非奇异位形。

但更多情况下 $n ≠ m$, 这时使用的是 伪逆 $J^{\dagger}$。

计算公式（右伪逆）：$J^{\dagger} = J^T(JJ^T)^{-1}$。

7. 初始值的选择 (Initial Guess)

牛顿法是局部收敛算法。

如果 $\theta^0$ 距离真实解太远，算法可能无法收敛，或者收敛到错误的解（例如机械臂以一种奇怪的姿态到达目标点）。通常利用上一时刻的关节角作为当前时刻的初始猜测（利用运动连续性）。

### 5.3 静力学 (Jacobian)

利用虚功原理，关节力矩 $\tau$ 与末端受力（力旋量/Wrench）$\mathcal{F}$ 存在对偶关系。

**力矩-力 关系公式:**

$$\tau = J^T(\theta) \mathcal{F}$$

- $\tau$: 关节力矩/力 ($n \times 1$ 向量)
- $\mathcal{F}$: 末端施加的广义力 (Wrench, 包含力矩 $m$ 和力 $f$, $6 \times 1$ 向量)
- $J^T$: 雅可比矩阵的转置。

**理解:**
不需要通过复杂的力分析，只要知道速度关系的雅可比矩阵，转置后即可得到力传递关系。如果机器人在某方向运动“很费力”（$J$ 奇异），那么它在该方向“很能承重”。

