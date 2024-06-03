---
icon: tuxingyinqing
date: 2024-04-30
category: 交通
isOriginal: true
star: true
tag: traffic
---

# 行人流仿真 _Pedestrian Simulation_

本文探讨基于 CA 模型的行人流仿真，如果你还不了解 CA 模型，请先移步[这篇文章](https://ryanlee-ljx.pages.dev/traffic/CA.html)。

## 概述

行人流仿真是通过模拟人群在不同环境下的移动，研究行人行为及心理的特点的研究，其在城市规划、交通管理、疏散计划、建筑平面设计等方面有着广泛的应用。

_Pedestrian simulation studies pedestrians' behavioral patterns and psychological aspects by modeling and simulating the movement of crowds in various scnarios. It finds extensive applications in urban planning, traffic management, evacuation planning, and architectural layout design._

::: important 分类

行人流仿真按仿真规模可以大致分为三种，即 **宏观(macroscopic)** 、 **微观(microscopic)** 、**介于宏微观之间(mesoscopic)** 这三种：

- 宏观：以整个人群为研究对象，研究整体移动特征如速度、密度、流向等，每个个体没有行为特征（distinct behavior），如研究拥堵、紧急疏散人群移动特点。
- 微观：以个体为研究对象，研究个体行为，每个个体有着独特的行为特征。
- 介观：介于宏微观之间，人群中每个个体有着相同的行为特征，既研究整体特征也研究个体特征。

常见的模型方法有：

- **基于物理规则模型**：这类模型主要是基于物理规则（law of physics），来模拟人与环境的交互，如**流体动力学模型(fluid dynamic model)**，**社会力模型（social force model）**等。
社会力模型由几种力组成，如使人达到向着目的地前进，达到一定期望速度的**acceleration force**，以及一些环境阻碍的力**repulsive force**，如来自人行道边界（crosswalk boundary）、周围行人（surrounding pedestrian）、冲突车辆（conflicting vehicles）和信号灯状态（signal phase）等阻力，这些力的合力即为行人朝着什么方向（力的方向），以多大的速度（由力的大小决定）前进。

- [**元胞自动机模型（Celluar Automata, CA）**](https://ryanlee-ljx.pages.dev/traffic/CA.html)

- [**数据驱动模型**](https://arxiv.org/pdf/2012.00514)：基于现实场景数据，对数据进行合适的编码（encode），采用深度学习等方法预测行人的轨迹、行为，常见的数据有：
    - 轨迹信息（trajectory information），可以是2D平面图，也可以是3D坐标（第三维为速度）的形式（2D spatial or 3D global coordinates + velocity）。
    - 视觉信息（visual information）：包含做过[语义分割处理](https://developer.baidu.com/article/details/2868050)的地图（semantic map）与行人图像(images of pedestrian)，地图主要是反应道路周围的环境，如道路结构（road structure）、其他道路使用者状态（the state of other road users）以及信号状态（signal phase），行人图像主要是反应行人的行为，如动作（motion）、姿势（pose）、朝向（head orientation）等。
    - 自主车辆（ego vehicle）：包含感知周围环境传感器的车辆的信息(vehicle equiped with sensors)，如车辆坐标（coordinates）、速度（velocity）等。

:::

![数据驱动模型](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pedestrain/ml.png?raw=true)

:fast_forward: 不同方法并非只适用于一个规模，对行人流仿真进一步了解可以移步[此篇论文](https://arxiv.org/abs/2102.03289)

## 问题描述

模拟行人穿过以平台

::: info

平台基本信息：

- 平台 16×30，左三个入口，大小分别为 1×1,1×4,1×1，右四个出口，均为 1×1，中间设有障碍，行人不得通过障碍。
- 行人每秒走一格，每个行人占一格。
- 行人随机从各个入口进入。
- 规定仿真时间为 960s

:::

![图1 平面示意图 ](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pedestrain/platform.png?raw=true)

## 模型设置

### 基本设置

- 元胞：状态设置为占有（0）与不占有（1）
- 元胞空间：划分为方格形。
- 元胞邻居：采用基本 Moore 型（r=1）
- 边界条件：采用固定型。

### 更新规则

更新规则即行人如何选择下一步走到哪里一个方格，这里引入**元胞潜能 Cell Potential**，其定义如下：

$$
N_{i, j}=E_{i, j} \exp \left(k_S S_{i, j}+k_D D_{i, j}\right)
$$

其中，$E_{i, j}$ 代表位置(i, j)处元胞状态，0 代表占有，1 代表不占有，$N_{i, j}$ 代表位置(i, j)处的元胞潜能，可以发现，当元胞占有时 $E_{i, j}=0$ ，即该处元胞潜能为 0，反应了元胞有人占据，就无法选择。$S_{i, j}$ 为**元胞静态势能 Static Potential**，$D_{i, j}$ 为**元胞动态势能 Dynamic Potential**， $k_S$ 和 $k_D$ 分别为对应系数。

元胞静态势能反应了行人在选择下一步时，环境中静止物体的影响，这里主要考虑为出口与障碍物，定义为：

$$
S_{i, j}=k_L L_{i, j}+k_O O_{i, j}
$$

其中，$L_{i, j}$ 为位置为(i, j)的元胞距出口的距离，$O_{i, j}$ 为位置为(i, j)的元胞周边的非障碍数目。

元胞动态势能反应行人在选择下一步时，环境的动态影响，这里以位置为(i, j)的元胞周围空元胞数目 $D_{i, j}$ 为指标。

所以最后，元胞潜能可以写为：

$$
N_{i, j}=E_{i, j} \exp \left(k_1 L_{i, j}+k_2 O_{i, j}+k_3 D_{i, j}\right)
$$

最后对 9 个位置进行标号、对元胞潜能进行归一化，即可得到选择 9 个位置的**选择概率 Transition Probabilitie** $P_{i, j}$。

![图2 Moore邻居选择示意图](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pedestrain/Moore.png?raw=true)

## 部分代码解释

代码整体思路如下：

![图3 代码流程图](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pedestrain/code.png?raw=true)

### 参数设置

```
clc,clear
format short;
n=16; %平台宽度
h=30; %平台长度
star_x = ones(1,6); % 入口横坐标
star_y = [4,7:10,13]; % 入口纵坐标
hurdle_x = repelem(14:16,2); % 障碍
hurdle_x = cat(2,hurdle_x,[20 20]);
hurdle_y = repmat(8:9,1,3);
hurdle_y = cat(2,hurdle_y,[5 12]);
final_x = ones(1,4)\*h; % 出口
final_y = [3,6,11,14];
x=n+2; % 边界矩阵宽
y=h+2; % 边界矩阵长
platform=ones(n,h); %初始化平台
obstacle_map=ones(n+4,h+4); %设置非障碍矩阵
obstacle_map(1:2,:)=0;
obstacle_map(end-1:end,:)=0;
obstacle_map(:,1:2)=0;
obstacle_map(:,end-1:end);
border=ones(x,y); %边界矩阵
border(1,:)=0;
 border(end,:)=0;
border(:,1)=0;
border(:,end)=0;
Sm=ones(n+4,h+4); % 图
Sm(1:2,:)=0;
Sm(end-1:end,:)=0;
Sm(:,1:2)=0;
Sm(:,end-1:end);
for i = 1:size(hurdle_y,2)
Sm(hurdle_y(i)+2,hurdle_x(i)+2)=0; %设置障碍
obstacle_map(hurdle_y(i)+2,hurdle_x(i)+2)=0; %设置障碍
end
step=1; %初始迭代次数
po=1:1:9; %位置矩阵
pp = zeros(1,9);
neigh = [-1,-1;0,-1;1,-1;-1,0;0,0;1,0;-1,1;0,1;1,1];
L=zeros(n,h,size(final_y,2)); % 不含边界距离矩阵
N=zeros(n+2,h+2,size(final_y,2)); % 元胞潜力
N_choose=zeros(n+2,h+2); % 最终选择
P=zeros(n+2,h+2); %预留内存
prob=zeros(1,9); %概率矩阵、预留内存
go=0; % 出发人数
arrive=0; % 到达终点人数
total=960; % 迭代时间
time_people_star = zeros(n,h,total); % 记录时刻平台信息
```

这里设置了 4 个 map：

- platform：反应平台实时状态
- border：在 platform 外加了一圈障碍，表示边界条件。
- Sm 与 obstacle：在 platform 外加了两圈障碍，分别用计算 $ O\*{i, j} $ 与 $ D\_{i, j} $。

### 参数计算

$L_{i,j}$ 的计算：

```
Dis = zeros(n+2,h+2,size(final_y,2));
Dis = Dis + inf;
% 分别计算边界内每个原胞到出口的距离
for f=1:size(final_y,2)
for i=1:n
for j=1:h
L(i,j,f)=sqrt((i-final_y(f))^2+(j-final_x(f))^2); %不含边界的距离矩阵 Lij
end
end
end
Dis(2:n+1,2:h+1,:)=L;
for i = 1:size(hurdle_y,2)
Dis(hurdle_y(i)+1,hurdle_x(i)+1,:)=inf; %障碍视为距离无穷
end
```

$O_{i, j}$ 与 $D_{i, j}$ 的计算：

```
O=obstacle_map(1:x,2:y+1)+obstacle_map(3:x+2,2:y+1)+obstacle_map(2:x+1,1:y)+obstacle_map(2:x+1,3:y+2)+obstacle_map(1:x,1:y)+obstacle_map(3:x+2,1:y)+obstacle_map(1:x,3:y+2)+obstacle_map(3:x+2,3:y+2);

D=Sm(1:x,2:y+1)+Sm(3:x+2,2:y+1)+Sm(2:x+1,1:y)+Sm(2:x+1,3:y+2)+Sm(1:x,1:y)+Sm(3:x+2,1:y)+Sm(1:x,3:y+2)+Sm(3:x+2,3:y+2);
```

这段代码思想为用一个 n-2×n-2 大小的滑动窗口在 n×n 的平台上，依次从需要计算的 8 个周边位置滑动，最后得到所求，可以自己手动画一个图验证一下。

计算元胞潜力：

```
% 计算原胞潜力 N
for f = 1:size(final_y,2)
for i=1:x
for j=1:y
N(i,j,f)=border(i,j)*exp(-5*Dis(i,j,f)+D(i,j)+O(i,j));
end
end
end
for i = 1:size(final_y,2)
N(final_y(i)+1,final_x(i)+1)=1e10; % 设置出口原胞潜力为 1e10，可视为无穷大
end
N_1 = max(N(:,:,1),N(:,:,2)); %最大作为原胞潜力 N
N_2 = max(N(:,:,3),N(:,:,4));
N_choose = max(N_1,N_2);
```

这里因为有四个入口，所以需要分别计算四个出口的元胞潜力大小，最后取最大。

位置更新：

```
for j=h+1:-1:2
    for i=2:n+1
        if(border(i,j)==0)    %如果位置（即原胞）有人，计算所有邻居原胞的原胞潜力N
            % 计算位置1到9各原胞潜力大小，并进行归一化处理
            for xy = po
                pp(1,xy) = N_choose(i+neigh(xy,2),j+neigh(xy,1));
            end
            prob = pp/sum(pp);
            if sum([pp(2),pp(3),pp(6),pp(8),pp(9)]~=0)   % 上下前三个方向不全都有人
                S=randsrc(1,1,[po;prob]);  %依原胞潜力N，选择下一位置，即进行位置更新
            else
                S = 5;
            end
            k = i + neigh(S,2);
            t = j + neigh(S,1);
            if platform(k-1,t-1)==0   % 选择新位置已占，则选回原位置
                S = 5;
                k = i + neigh(S,2);
                t = j + neigh(S,1);
            end
            platform(i-1,j-1)=1;      % 位置更新，原来原胞更新为空状态
            platform(k-1,t-1)=0;      % 位置更新，新选择原胞更新为占有状态
        end
    end
end
```

这里用 border 矩阵进行计算，然后在 platform 上进行更新，最后把再 `border = platform` ，从而实现每一次迭代的整体更新。此外，代码设定，如果上下和前面三个位置共 5 个位置没有人的话才进行选择，否则就待在原地，贴近现实中人是向前走的；如果选择的位置被占，则待在原地。代码从离平台近的位置向远处开始遍历，反应人流变化的方向与源头。

## 结果

![图4 动态演示](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pedestrain/demo.gif?raw=true)

![图5 热力图（迭代周期960s）](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/Pedestrain/hot.png?raw=true)

[完整代码](https://github.com/RyanLee-ljx/CA.git)
