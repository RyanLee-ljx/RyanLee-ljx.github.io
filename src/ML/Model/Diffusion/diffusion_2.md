---
icon: kuosanmoxing
ReadingTime: true
date: 2025-11-14
Word: true
PageView: true
category: ML
---

# 变分推断与VAE

## 隐变量

举一个例子（源于[【隐变量（潜在变量）模型】硬核介绍](https://blog.csdn.net/m0_54713489/article/details/143255466)）：

观察下图，表面上我们观测到的数据是一堆点 $x = \{x_1, x_2, \dots, x_n\}$，但实际上我们可以直观地发现这些点以某种概率采样自四个不同的分布（假设都是高斯分布）。而潜在变量 $z_i$ 控制了 $x_i$ 从哪个分布中采样：$z_i \sim N(\mu_k, \sigma_k^2)$，其中 $k = 1, 2, 3, 4$。设 $\sigma_k$ 已知。于是，潜在变量 $z_i$ 表示观测变量 $x_i$ 对应类别的序号。

![隐变量]()

由这个例子我们可以看出，数据可以由一个 $\theta$ 参数的分布来描述，也可以通过潜在的**隐变量**来描述。

就好像我们描述一个人的脸，它是由鼻子，眼睛，嘴巴......等组成的。

因此，我们做出以下假设，一组数据可以由一组未知的隐变量来描述，这些隐变量反应了数据分布特征的一些低层次特征（但又比数据本身要高）。现在我们有了另一种描述数据的方式，不同于用 $\theta$ 描述一个未知的分布，我们可以用隐变量 $z$ 来描述一组未知的数据。

引入这样隐变量的好处是，由原先的“参数($\theta$)——样本”的映射，变成了“样本——样本”的映射，更加便于后续的建模处理。

这样的隐变量，同样满足某个先验分布 $p(z)$，同样的，我们也可以写出隐变量视角的贝叶斯公式：

$$
P(z | x) = \frac{P(x | z) P(z)}{P(x)}=\frac{P(x | z) P(z)}{\int P(x | z) P(z) dz}
$$

如何理解？



## 变分推断





理想是美好的，但在现实中，贝叶斯预测 $P(\tilde{x} | x)$ 几乎无法直接计算。

困难的根源在于我们无法得到 $P(\theta | x)$。

回到贝叶斯公式：

$$
P(\theta | x) = \frac{P(x | \theta) P(\theta)}{P(x)}
$$

$$P(x) = \int P(x | \theta) P(\theta) d\theta$$

$P(x)$，即我们所说的证据，是一个归一化常数。要计算它，我们必须在所有可能的参数 $\theta$ 空间上进行积分。

对于抛硬币（只有一个参数 $\theta$）来说，这很容易。

但对于神经网络（$\theta$ 是几百万甚至几十亿个权重参数）来说，这是一个维度高到无法处理的积分。


由于 $P(D)$ 无法计算，导致 $P(\theta | D)$ 的精确形式也无法得知。因此，我们无法进行精确的贝叶斯预测。

1.4 近似推断（一）：变分推断 (Variational Inference)

既然无法精确计算后验 $P(\theta | D)$，我们就退而求其次：寻找一个近似。

变分推断 (VI) 就是一种强大的近似方法。其核心思想是：

我们定义一个更简单的、参数化的、我们能够处理的分布（例如高斯分布），记为 $Q(\theta; \phi)$。$\phi$ 是这个Q分布的参数（例如高斯分布的均值和方差）。

我们的目标是，调整参数 $\phi$，使得这个简单的 $Q(\theta; \phi)$ 尽量地逼近那个我们得不到的、复杂的真实后验 $P(\theta | D)$。

我们使用 KL 散度 (Kullback-Leibler Divergence) 来衡量 $Q$ 和 $P$ 之间的“距离”：

$$\phi^* = \underset{\phi}{\arg \min } KL(Q(\theta; \phi) \ || \ P(\theta | D))$$

通过数学推导（这一步是VI的核心），最小化这个KL散度被证明等价于最大化一个叫证据下界 (Evidence Lower Bound, ELBO) 的量：

$$\text{ELBO}(\phi) = \mathbb{E}_{Q(\theta; \phi)}[\log P(D | \theta)] - KL(Q(\theta; \phi) \ || \ P(\theta))$$

这个ELBO公式非常重要：

$\mathbb{E}_{Q(\theta; \phi)}[\log P(D | \theta)]$：期望对数似然。它鼓励 $Q$ 分布去采样那些能够很好地解释/重建数据 $D$ 的 $\theta$。

$KL(Q(\theta; \phi) \ || \ P(\theta))$：KL散度正则项。它惩罚 $Q$ 分布，使其不要与我们的先验信念 $P(\theta)$ 偏离太远。

最关键的是，ELBO $\text{ELBO}(\phi)$ 完全不依赖于那个无法计算的 $P(D)$！我们现在有了一个可以实际优化的目标函数。

1.5 从VI到VAE：当神经网络遇上贝叶斯

VI虽然解决了 $P(D)$ 的问题，但 $Q(\theta; \phi)$ 依然是关于全局参数 $\theta$ 的分布。

变分自编码器 (Variational Autoencoder, VAE) 做了一个巧妙的转换：
它不再为整个模型 $\theta$ 找一个分布，而是为每一个数据点 $x_i$ 引入一个对应的局部隐变量 (latent variable) $z_i$。

生成模型 (Decoder)：我们假设数据 $x$ 是由一个我们看不见的隐变量 $z$ 生成的。这个过程是 $P(x | z)$。

推断问题 (Inference)：现在，给定一个数据 $x$，我们想反向推断它对应的 $z$ 的分布是什么，即 $P(z | x)$。

这个 $P(z | x)$ 依然是棘手的（同样有 $P(x)$ 积分问题）。于是，我们再次使用VI：
我们引入一个简单的 $Q(z; \phi)$ 来近似 $P(z | x)$。

VAE的“杀手锏”—— 摊销推断 (Amortized Inference)：
我们不用为每一个 $x_i$ 单独优化一个 $\phi_i$，而是训练一个神经网络（称为 Encoder 或 Inference Network），它学习一个从 $x$ 到 $\phi$ 的映射。

$$\phi = \text{Encoder}(x)$$

这个 Encoder "用神经网络估计后验"，它接收一个数据 $x$，直接输出 $Q(z | x; \phi)$ 的参数 $\phi$（例如 $z$ 的均值和方差）。

组合起来，VAE诞生了：

Encoder (推断网络) $Q(z | x; \phi)$：一个神经网络，输入 $x$，输出 $z$ 的分布参数（$\mu_z, \sigma_z$）。

Decoder (生成网络) $P(x | z; \psi)$：一个神经网络，输入 $z$，尝试重建 $x$（$\psi$ 是decoder的权重）。

训练目标：最大化ELBO！

$$\text{ELBO}(x) = \mathbb{E}_{Q(z|x)}[\log P(x | z)] - KL(Q(z | x) \ || \ P(z))$$

$\mathbb{E}_{Q(z|x)}[\log P(x | z)]$ 变成了重建损失（例如MSE或交叉熵）。

$KL(Q(z | x) \ || \ P(z))$ 变成了KL正则项，迫使Encoder生成的 $z$ 分布（后验）接近于一个简单的先验 $P(z)$（通常是标准高斯分布 $N(0, I)$）。

1.6 展望：从VAE到Diffusion模型

VAE是一个强大的生成模型。它通过VI最大化ELBO，学习到了一个有意义的隐空间 $z$。

Diffusion模型可以被看作是这一思想的深度拓展。

Diffusion模型可以被严格地推导为一种层次化(Hierarchical)VAE。

它不再只有一个隐变量 $z$，而是有一系列的隐变量 $z_1, z_2, ..., z_T$。

它的Encoder（前向加噪过程）和Decoder（反向去噪过程）被分成了 $T$ 个微小的步骤。

Diffusion模型的训练目标（例如，预测噪声）也可以被推导为最大化ELBO的一种特殊形式。

因此，我们研究贝叶斯推断、VI和VAE，正是为了理解这些更前沿的生成模型（如Diffusion Model）的核心数学原理和理论根基。