---
icon: juanjiceng
ReadingTime: true
date: 2024-05-27
Word: true
PageView: true
category: ML
---

# 卷积

本节整理卷积方面基本概念

## 基本概念

1. 卷积：卷积就是用一个**可移动的窗口**（卷积核），按一定**步长**，与图像对应元素进行**点乘相加**的操作。卷积本质上也是一种对**数据维度的变换**，提取图像的特征，相较于全连接层直接把图像展开成一个行向量，其能**更好地捕获图像的空间特征**，当然通过改变参数的形状，任何全连接层都能被转换为一个等价卷积层。

Convolution: Convolution is to use a movable window (convolution kernel) to perform a dot multiplication and addition operation with the corresponding elements of the image at a certain step size. Convolution is essentially a transformation of the data dimension to extract the features of the image. Compared with the fully connected layer that directly expands the image into a row vector, it can better capture the spatial features of the image. Of course, by changing the shape of the parameters, any fully connected layer can be converted into an equivalent convolution layer.




2. 池化：一种下采样方式，池化层的引入是仿照人的视觉系统对视觉输入对象进行**降维（reduce demention）和抽象（abstract）**。主要有三个功效：

- 特征不变性：池化操作是模型**更加关注是否存在某些特征而不是特征具体的位置**。其中不变形性包括，平移不变性、旋转不变性和尺度不变性。平移不变性是指输出结果对输入对小量平移基本保持不变，例如，输入为(1, 5, 3), 最大池化将会取 5，如果将输入右移一位得到(0, 1, 5)，输出的结果仍将为 5。对伸缩的不变形，如果原先的神经元在最大池化操作后输出 5，那么经过伸缩（尺度变换）后，最大池化操作在该神经元上很大概率的输出仍是 5；

- **特征降维**（下采样）：池化相当于在空间范围内做了维度约减，从而使模型可以抽取更加广范围的特征。同时减小了下一层的输入大小，进而减少计算量和参数个数。

- 在一定程度上防止**过拟合**，更方便优化。

- 实现**非线性**（类似 relu）。

- 扩大**感受野**。

3. 上采样：放大图像，**反卷积/转置卷积**。

4. 下采样：缩小图像，如**池化**与**步长为 2 的卷积**。

5. relu 激活函数：负为 0，正 y=x

::: info 采用原因： 

- 第一，采用 sigmoid 等函数，算激活函数时（指数运算），**计算量大**，反向传播求误差梯度时，求导涉及除法，计算量相对大，而采用 Relu 激活函数，整个过程的计算量节省很多。

- 第二，对于深层网络，sigmoid 函数反向传播时，很容易就会出现**梯度消失**的情况（在 sigmoid 接近饱和区时，变换太缓慢，导数趋于 0，这种情况会造成信息丢失），从而无法完成深层网络的训练。

- 第三，ReLu 会使一部分神经元的输出为 0，这样就造成了网络的稀疏性，并且减少了参数的相互依存关系，缓解了**过拟合**问题的发生。

::: 
