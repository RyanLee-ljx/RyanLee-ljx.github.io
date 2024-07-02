import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as i,e as n}from"./app-cviwNEn3.js";const a={},p=n('<h1 id="机器学习" tabindex="-1"><a class="header-anchor" href="#机器学习"><span>机器学习</span></a></h1><p>本节整理机器学习的基本问题</p><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h2><p>magnitude: 幅度 order of magnitude：数量级 converge: 收敛 oscillate: 振荡 fit: 拟合 fine-tune: 调参 generalization ability：泛化能力 dimension: 量纲 deviation：偏离</p><h3 id="一、绪论" tabindex="-1"><a class="header-anchor" href="#一、绪论"><span>一、绪论</span></a></h3><ol><li><p>什么是机器学习和深度学习？ 机器学习是一种实现人工智能的方法。人工智能是想要达成的目标，而机器学习是想要达成目标的手段：希望机器通过学习的手段，可以跟人一样聪明。机器学习是研究计算机怎样模拟或实现人类的学习行为，以获取新的知识或技能，重新组织已有的知识结构，使不断改善自身的性能。而深度学习，就是机器学习的其中一种方法。</p></li><li><p>机器学习流程？ **表示 represent：**将数据对象进行特征(feature)化表示</p><p>**训练 train：**给定一个数据样本集，从中学习出规律（模型），目标：该规律不仅适用于训练数据，也适用于未知数据(称为泛化能力)</p><p>**测试 test：**对于一个新的数据样本，利用学到的模型进行预测</p></li><li><p>在机器学习中，学习率这种参数叫什么？学习率太大和太小的可能影响？</p><p>学习率(learning rate)也叫步长，指更新参数步幅。表征了参数每次更新的幅度（represent the magnitude of parameter update）</p></li></ol><p>If the learning rate is too large, the gradient descent algorithm will not converge and will diverge or oscillate; if the learning rate is too small, the gradient descent algorithm will converge very slowly.</p><ol start="4"><li><p>根据学习方式的划分，机器学习三个主要分类是什么？请简要说明他们之间的关系。 划分为三个主要分类：监督学习、非监督学习、强化学习。关系见下</p></li><li><p>简述监督学习，非监督学习以及强化学习的定义和区别？ <strong>定义：</strong></p></li></ol><p>（1）监督学习：是一种通过使用已知输出来训练模型的学习方式。在监督学习中，训练数据包括输入数据和对应的输出数据（也称为标签或目标），算法通过学习这些数据，建立输入和输出之间的映射关系，以预测新的输入数据的输出。监督学习通常用于分类（分类器）和回归（回归器）问题。</p><p>（2）非监督学习：是一种在没有标签或目标的情况下，从数据中发现模式或结构的学习方式。在非监督学习中，算法只能使用输入数据进行学习，目标是找到输入数据之间的相似性和区别，以便对数据进行聚类、降维、异常检测等操作。</p><p>（3）强化学习：又称为再励学习，是指从环境状态到行为映射的学习，使系统行为从环境中获得的累积奖励值最大的一种机器学习方法。</p><p><strong>区别</strong>：</p><p>（1）监督学习有反馈，无监督学习无反馈，强化学习执行多步后反馈；</p><p>（2）强化学习的目标与监督学习目标不同，强化学习看重行为序列下的长期收益，监督学习关注与标签或已知输出的误差；</p><p>（3）强化学习的奖惩概念没有正确和错误之分，而监督学习的标签是正确的。 强化学习是一个学习+决策的过程，有和环境交互的能力，监督学习不具备。</p><ol start="6"><li>简要说明监督学习和非监督学习之间的区别，并分别给出监督和非监督学习的两种算法。</li></ol><p><strong>区别</strong></p><p>监督学习和非监督学习是机器学习中两种不同的学习方式。监督学习需要已知的输入和输出数据，目标是学习输入 和输出之间的映射关系。非监督学习只需要输入数据，目标是从数据中发现模式和结构，而不需要预先定义的目标 变量。在实际应用中，监督学习和非监督学习常常结合使用，以提高机器学习的效果和性能。</p><p><strong>举例</strong></p><p>常见的监督学习算法包括线性回归（linear regression）、逻辑回归(logistic regression)、决策树(decision tree)、支持向量机(support vector machine)、朴素贝叶斯、神经网络等。</p><p>常见的非监督学习算法包括聚类、主成分分析（Principle Component Analysis）、独立成分分析（ICA）、自编码器、变分自编码器等。</p><ol start="7"><li>训练集、测试集、验证集区别联系？</li></ol><ul><li><p>训练集:用于模型拟合的数据样本,即用于训练的样本集合,主要用来训练神经网络中的参数; train</p></li><li><p>验证集：模型训练过程中单独留出的样本集，它可以用于调整模型的超参数和用于对模型的能力进行初步评估; tuning</p></li><li><p>测试集：用来评估模最终模型的泛化能力。但不能作为调参、选择特征等算法相关的选择的依据。 evaluate</p></li></ul><p>各数据集的作用</p><p><strong>训练集的作用</strong></p><p>拟合模型，调整网络权重。</p><p><strong>验证集的作用</strong></p><ul><li><p>作用 1：快速调参，也就是通过验证集我们可以选择超参数（网络层数、网络节点数、迭代次数 epoch、学习率 learning rate、优化器）等。</p></li><li><p>作用 2：选择超参数，为了让我们的模型在测试集表现得更好，调参是不可避免地一部分，如果把测试集当验证集，调参去拟合测试集合，是不可行地，这相当于作弊。</p></li><li><p>作用 3：监控模型是否正常</p></li></ul><div class="hint-container important"><p class="hint-container-title">验证集的重要性</p><p>如果没有设置验证集，我们通常得等到测试集才可以知道我们模型真正得实力，然后再来调整参数，这样子时间代价较高，通过验证集我们可以训练几个 epoch 后查看模型的训练效果及我们的网络是否出现异常，然后决定怎么调整我们的超参数。</p></div><p><strong>测试集的作用</strong></p><p>仅仅用来评估模最终模型的泛化能力，确认网络的实际预测能力。</p><ol start="8"><li><p>什么是泛化性能？（generalization ability） 是指机器学习算法对新鲜样本的适应能力。 学习的目的是学到隐含在数据背后的规律，对具有同一规律的学习集以外的数据，经过训练的网络也能给出合适的输出，该能力称为泛化能力。</p></li><li><p>在数据处理时，为什么通常要进行标准化处理 在实际问题中，我们使用的样本通常是多维数据，每一维对应一个特征，这些特征的量纲和数量级都是不一样的 这时需要对数据进行标准化处理，使得所有的特征具有同样的尺度。</p></li></ol><h3 id="二、模型评估与选择" tabindex="-1"><a class="header-anchor" href="#二、模型评估与选择"><span>二、模型评估与选择</span></a></h3><ol><li>过拟合、欠拟合定义、原因、解决办法？</li></ol><p><strong>（1）定义：</strong></p><p>过拟合：学习器把训练样本学习的“太好”，将训练样本本身的特点当做所有（潜在）样本（都会具有）的一般性质，导致泛化性能下降。</p><p>欠拟合：训练样本的一般性质尚未学好，在训练样本上都存在较大的经验误差。</p><p><strong>（2）原因：</strong></p><p>过拟合原因： 1）模型复杂度过低 2）特征量过少 3）训练样本过少</p><p>欠拟合原因： 1）训练集的数量级 N 与模型复杂度 M 不匹配 2）训练集与测试集的特征分布不一致 3）样本噪声过多，模型过分记住了噪声，忽略了真实的输入输出 4）权值学习迭代次数过多，拟合了不具代表性的特征</p><p><strong>（3）解决办法：</strong></p><p>过拟合: 1）清洗数据 2）减小模型复杂度 3）增广训练集 4）交叉验证 5）正则化 regularization，约束模型特征 6）early stopping 迭代次数截断 7）dropout，让一些神经元以一定的概率不工作.</p><p>欠拟合应对： 1）增加新特征 2）增加模型复杂度，如决策树的扩展分支，神经网络的训练轮数等 3）扩大训练集。</p><ol start="2"><li>错误率及误差概念？</li></ol><p>错误率 &amp; 误差：</p><p>（1）错误率：错分样本的占比</p><p>（2）误差：样本真实输出与预测输出之间的差异</p><p>（3）训练(经验)误差： 训练集上</p><p>（4）测试误差： 测试集上</p><p>（5）泛化误差： 除训练集外所有样本</p><ol start="3"><li><p>评估方法</p><p>留出法、交叉验证法（k=m 时是留一法）、自助法等。</p></li><li><p>交叉验证法和自助法异同？</p></li></ol><p><strong>相同点</strong></p><p>交叉验证法和自助法都是随机采样法。它们作为人工智能中评估模型的方法，根据一定规则从数据集 D 中划分训练集和测试（验证）集，从而评价模型在数据集上的表现，便于我们选择合适的模型。</p><p><strong>不同点</strong></p><p>这两种方法最大的不同点在于每次划分过程中每个样本点是否只有一次被划入训练集或测试集的机会。下面将针对这方面详细展开论述：</p><ul><li><p>交叉验证法采用的是无放回的随机采样方式，这种方式可以保持数据分布的一致性条件，并严格划分训练集与测试集的界限，从而增强测试评估的稳定性和可靠性。</p></li><li><p>自助法主要面向数据集同规模的划分问题。其采用的是有放回的随机抽样方法，可以使得得到的模型更为稳健，解决了交叉验证法中模型选择阶段和最终模型训练阶段的训练集规模差异问题；但训练集 T 和原始数据集 D 中数据的分布未必相一致，因此对一些对数据分布敏感的模型选择并不适用。</p></li></ul><ol start="5"><li>偏差、方差、噪声含义？</li></ol><ul><li><p>偏差度量了学习算法期望预测与真实结果的偏离程度: 即刻画了学习法本身的拟合能力;</p></li><li><p>方差度量了同样大小训练集的变动所导致的学习性能的变化: 即刻画了数据扰动所造成的影响;</p></li><li><p>噪声表达了在当前任务上任何学习算法所能达到的期望泛化误差的下界即刻画了学习问题本身的难度。</p></li><li><p>Bias measures the degree of deviation between the expected prediction of the learning algorithm and the actual result: it depicts the fitting ability of the learning method itself;</p></li><li><p>Variance measures the change in learning performance caused by changes in the same size training set: it depicts the impact of data perturbations;</p></li><li><p>Noise expresses the lower bound of the expected generalization error that any learning algorithm can achieve on the current task, which depicts the difficulty of the learning problem itself.</p></li></ul><ol start="6"><li><p>偏差-方差分解角度解释泛化性能 泛化性能是出学习算法的能力、数据的充分性以及学习任务本身的难度所共同决定的。给定学习任务为了取得好的泛化性能，需要使偏差小(充分拟合数据)而且方差较小(减少数据扰动产生的影响)。</p></li><li><p>偏差方差冲突 PPT P9</p></li></ol><p>8．请给出你对泛化误差的理解</p><p><strong>泛化误差 = 偏差+方差+噪声</strong></p><p>偏差：度量了学习算法的期望预测与真实结果的偏离程度，刻画了学习算法本身的拟合能力</p><p>方差：度量了同样大小的训练集的变动所导致的学习性能的变化，即刻画了数据扰动所造成的影响</p><p>噪声：表达了在当前任务上任何学习算法所能达到的期望泛化误差的下界，即刻画了学习问题本身的难度</p><h3 id="三、线型模型" tabindex="-1"><a class="header-anchor" href="#三、线型模型"><span>三、线型模型</span></a></h3><ol><li><p>线型模型优势与不足？ 优势：第三章 3.1.2 P1 不足： 第三章 3.2.7 P10</p></li><li><p>什么是回归（分析）？ 第三章 3.2 P2</p></li><li><p>简述 LDA 算法的基本思想及算法流程。</p></li></ol><p>基本思想是将高维的模式样本投影到最佳鉴别矢量空间，以达到抽取分类信息和压缩特征空间维数的效果，投影后保证模式样本在新的子空间有最大的类间距离和最小的类内距离,即模式在该空间中有最佳的可分离性。 流程：</p><ol start="4"><li>逻辑回归和线性回归的异同</li></ol><p><strong>不同之处</strong>：</p><p>（1）逻辑回归解决的是分类问题，因此因变量是离散的；而线性回归解决的是回归问题，因此因变量是连续的。这是两者最本质的区别；</p><p>（2）在自变量和超参数确定的情况下逻辑回归可看作广义的线性模型在因变量下服从二元分布的一个特殊情况</p><p>（3）使用最小二乘法求解线性回归时我们认为因变量服从正态分布。</p><p><strong>相同之处</strong>：</p><p>（1）二者在求解超参数的过程中都使用梯度下降的方法 ；</p><p>（2）二者都使用了极大似然估计对训练样本进行建模。</p><h3 id="四、决策树" tabindex="-1"><a class="header-anchor" href="#四、决策树"><span>四、决策树</span></a></h3><ol><li><p>决策树三种导致递归返回的情况</p><p>PPT 第四章 4.1 P1</p></li><li><p>决策树中剪枝方式分为哪两种？请简述这两种方式的优缺点？</p><p>预剪枝（prepruning）和后剪枝(postpruning)。</p><p><strong>预剪枝</strong></p><ul><li><p>优点：降低过拟合风险，显著降低训练时间和测试时间的开销。</p></li><li><p>缺点：有些分支当前划分虽然不能提升泛化性能，但在其基础上进行的后续划分有可能使得性能显著提高，预剪枝基于“贪心”，禁止这些分支展开，有欠拟合风险。</p></li></ul><p><strong>后剪枝</strong></p><ul><li><p>优点：比预剪枝保留了更多分支，欠拟合风险小，泛化性能更好。</p></li><li><p>缺点：训练时间开销大，后剪枝过程是在生成完全的决策树之后，自底向上对所有非叶节点逐一考察。</p></li></ul></li></ol><h3 id="五、神经网络" tabindex="-1"><a class="header-anchor" href="#五、神经网络"><span>五、神经网络</span></a></h3><ol><li>在神经网络中，非线性激活函数的主要作用是什么？请给出常用的几种非线性激活函数及其导数；</li></ol><p>激活函数（activation function）可以加入非线性因素，解决线性模型所不能解决的问题。激活函数是神经网络的一个重要组成部分。如果不使用激活函数，则无论该神经网络有多少层，最终的输出都是输入的线性组合，与没有隐藏层的效果相当，这种情况就是最原始的感知机（perceptron），无法解决线性不可分问题。</p><ol start="2"><li>神经网络分类</li></ol><p>神经网络根据是否存在网络回路（联接方式），可以分为：前向型和反馈型。 按学习方式：有导师的学习（监督学习）、无导师的学习（无监督学习）、再励学习（强化学习），具体解释： PPT 第五章 P6-7</p><ol start="3"><li><p>神经网络与人脑相比计算特能力特点： PPT 第五章 P5</p></li><li><p>简述神经网络的学习过程 PPT 第五章 P5</p></li><li><p>简要介绍卷积概念及其作用、池化的作用是什么？卷积前后图像尺寸之间的关系是什么？</p></li><li><p>简述神经网络中梯度下降方法的原理和作用（作用请从机器学习训练阶段的三个步骤的角度来阐述）。 梯度下降方法的原理：梯度下降方法通过求出损失函数在某点对于参数 θ 的微分值，并以负梯度方向为搜索方向，沿着梯度下降的方向求解极小值；作用是在训练阶段的第三个步骤中，通过梯度下降来寻找更优的学习参数 b 和 w，达到优化模型的效果。</p></li></ol><h3 id="六、支持向量机-svm" tabindex="-1"><a class="header-anchor" href="#六、支持向量机-svm"><span>六、支持向量机 SVM</span></a></h3><ol><li>试述硬间隔、软间隔、基于核函数的 SVM 的原理、优缺点、三者最终计算方式以及限制条件。 <strong>硬间隔 SVM</strong>：</li></ol><ul><li><p>原理：硬间隔 SVM 假设数据本身是线性可分的，即存在一个超平面可以将不同类别的样本完全分开。这个超平面需要满足离其最近的点到其的距离最大化。</p></li><li><p>优点：简单明了，适用于线性可分的数据集。</p></li><li><p>缺点：对于非线性可分的数据集，硬间隔 SVM 无法找到一个有效的超平面。此外，硬间隔 SVM 对异常点非常敏感，因为异常点可能导致无法找到一个满足所有约束条件的超平面。</p></li></ul><p><strong>软间隔 SVM</strong>：</p><ul><li><p>原理：软间隔 SVM 放松了对数据线性可分的假设，允许在某些情况下出现分类错误。软间隔 SVM 通过引入松弛变量来处理噪声和异常点。通过调整这些变量，可以控制对分类错误的容忍程度。</p></li><li><p>优点：能够处理非线性可分的数据集和噪声数据。</p></li><li><p>缺点：需要调整松弛变量和惩罚参数，以找到最佳的分类效果。</p></li></ul><p><strong>基于核函数的 SVM</strong>：</p><ul><li><p>原理：对于非线性可分的数据集，基于核函数的 SVM 通过使用核函数将输入空间映射到高维特征空间，使得在高维特征空间中数据变得线性可分。常用的核函数有线性核、多项式核和 RBF 核（高斯核）。</p></li><li><p>优点：能够处理非线性可分的数据集。</p></li><li><p>缺点：选择合适的核函数和参数是一个挑战，同时计算复杂度可能会较高。</p></li></ul><ol start="2"><li>SVM 与 logistic 回归区别联系</li></ol><p><strong>相同点</strong>:</p><p>都是分类算法 如果不考虑核函数，LR 和 SVM 都是线性分类算法 LR 和 SVM 都是监督学习算法。 LR 和 SVM 都是判别模型.</p><p><strong>不同点</strong>:</p><p>本质上是其 loss function 不同 支持向量机只考虑局部的边界线附近的点，而逻辑回归考虑全局. 在解决非线性问题时，支持向量机采用核函数的机制，而 LR 通常不采用核函数的方法 线性 SVM 依赖数据表达的距离测度，所以需要对数据先做 normalization，LR 不受其影响。 SVM 的损失函数就自带正则。</p><ol start="3"><li>SVM、logistic 回归、决策树各自优缺点</li></ol><p><strong>逻辑回归</strong></p><p>逻辑回归的优点：</p><p>（1）便利的观测样本概率分数；</p><p>（2）已有工具的高效实现；</p><p>（3）对逻辑回归而言，多重共线性并不是问题，它可以结合 L2 正则化来解决；</p><p>（4）逻辑回归广泛的应用于工业问题上（这一点很重要）。</p><p>逻辑回归的缺点： （1）当特征空间很大时，逻辑回归的性能不是很好；</p><p>（2）不能很好地处理大量多类特征或变量；</p><p>（3）对于非线性特征，需要进行转换；</p><p>（4）依赖于全部的数据（个人觉得这并不是一个很严重的缺点）。</p><p><strong>决策树</strong></p><p>（1）直观的决策规则</p><p>（2）可以处理非线性特征</p><p>（3）考虑了变量之间的相互作用</p><p>（4）训练集上的效果高度优于测试集，即过拟合[随机森林克服了此缺点</p><p>（5）没有将排名分数作为直接结果</p><p><strong>SVM</strong></p><p>SVM 的优点：</p><p>（1）能够处理大型特征空间</p><p>（2）能够处理非线性特征之间的相互作用</p><p>（3）无需依赖整个数据</p><p>SVM 的缺点：</p><p>（1）当观测样本很多时，效率并不是很高</p><p>（2）有时候很难找到一个合适的核函数</p><ol start="4"><li>为什么要引入对偶问题? （1）对偶问题将原始问题中的约束转为了对偶问题中的等式约束。</li></ol><p>（2）改变了问题的复杂度。由求特征向量转化为求比例系数。在原始问题下，求解的复杂度与样本的维度有关即 w 的维度。在对偶问题下，求解的是 a，复杂度只与样本数量有关。</p><p>（3）可以自然地引入核函数，从而推广到非线性分类问题</p><h3 id="七、聚类-cluster" tabindex="-1"><a class="header-anchor" href="#七、聚类-cluster"><span>七、聚类 Cluster</span></a></h3><ol><li>聚类方法分类？</li></ol><p>无监督学习方法主要有两大类：基于概率密度函数的估计方法和基于样本间相似性度量的间接聚类方法。</p><ol start="2"><li>K-means、层次聚类、DBSCAN 聚类方法原理、区别、优缺点</li></ol><p><strong>K-means 聚类</strong></p><p>工作原理： K-means 算法将数据划分为 K 个簇，每个簇包含最接近其质心的数据点。它通过迭代地将数据点分配给最近的质心并更新质心来执行聚类。</p><p>优点： 简单且高效，适用于大型数据集。它的结果易于解释和可视化。</p><p>缺点：需要事先指定簇数 K。对于非球形簇或具有不同密度的簇效果较差。</p><p><strong>层次聚类</strong></p><p>工作原理： 层次聚类将数据集逐渐分割或合并成不同的层次簇。它可以是自底向上的聚合聚类（凝聚型）或自顶向下的分裂聚类（分裂型）。</p><p>优点： 不需要预先指定簇数，可视化结果以树状结构呈现，对不同形状的簇和噪声具有较好的鲁棒性。</p><p>缺点：不具有很好的可伸缩性: 时间复杂性至少是 0(n^2)，其中 n 对象总数。合并或分裂的决定需要检查和估算大量的对象或簇。不能撤消已做的处理，聚类之间不能交换对象。如果某一步没有很好地选择合并或分裂的决定，可能会导致低质量的聚类结果</p><p><strong>DBSCAN（密度聚类）</strong></p><p>工作原理： DBSCAN 根据数据点的密度将它们分为核心点、边界点和噪声点。核心点是在指定半径范围内有足够多邻居的点，它们被用于扩展簇。</p><p>优点： 可以对任意形状的稠密数据集进行聚类。可以在聚类的同时发现异常点，对数据集异常点不敏感。聚类结果没有偏倚。</p><p>缺点： 对参数的选择敏感，可能需要调整半径参数和最小邻居数。对高维数据和不均匀密度数据的处理相对困难。样本集较大时，聚类收敛时间较长。</p><p>区别：</p><p>（1）簇数的预先指定： K-means 需要提前指定簇数 K，而层次聚类和 DBSCAN 不需要。层次聚类会生成层次结构，可以根据需要切割簇。DBSCAN 通过密度自动确定簇的数量。</p><p>（2）对簇形状和密度的适应性： K-means 假定簇是球形且密度均匀，不适合不规则形状和不同密度的簇。层次聚类和 DBSCAN 能够发现各种形状和密度的簇。</p><p>（3）计算复杂度： K-means 通常是最快的，DBSCAN 次之，而层次聚类较慢，特别是在大型数据集上。</p><p>（4）噪声处理： DBSCAN 在处理噪声点时比较鲁棒，可以将它们识别为噪声。K-means 和层次聚类通常需要额外的后处理步骤来处理噪声点。</p><h3 id="八、降维" tabindex="-1"><a class="header-anchor" href="#八、降维"><span>八、降维</span></a></h3><ol><li>请简要说明主成分分析（PCA）和线性判别分析（LDA）之间的区别和联系</li></ol><p><strong>相同点：</strong></p><p>（1）两者均可以对数据进行降维。</p><p>（2）两者在降维时均使用了矩阵特征分解的思想。</p><p>（3）两者都假设数据符合高斯分布。</p><p><strong>不同点：</strong></p><p>（1）LDA 是有监督的降维方法，而 PCA 是无监督的降维方法</p><p>（2）LDA 降维最多降到类别数 k-1 的维数，而 PCA 没有这个限制。</p><p>（3）LDA 除了可以用于降维，还可以用于分类。</p><p>（4）LDA 选择分类性能最好的投影方向，而 PCA 选择样本点投影具有最大方差的方向。</p><h3 id="_1-what-is-regularization" tabindex="-1"><a class="header-anchor" href="#_1-what-is-regularization"><span>1. What is Regularization?</span></a></h3><p>Regularization is a technique used in machine learning to prevent overfitting by adding a <strong>penalty</strong>（惩罚项） to the model&#39;s complexity. It works by incorporating additional terms to the loss function, such as <strong>L1 (Lasso)</strong>（L1 正则化） or <strong>L2 (Ridge)</strong>（L2 正则化） penalties, which constrain the magnitude of the model parameters. This helps in reducing the variance without substantially increasing the bias, leading to better generalization on unseen data.</p><h3 id="_2-what-is-cross-validation" tabindex="-1"><a class="header-anchor" href="#_2-what-is-cross-validation"><span>2. What is Cross Validation?</span></a></h3><p>Cross validation is a technique for assessing the performance and robustness of a machine learning model. It involves partitioning the dataset into training and validation sets multiple times to ensure that the model&#39;s performance is evaluated on different subsets of data. The most common method is <strong>k-fold cross validation</strong>（k 折交叉验证）, where the dataset is divided into k equally sized folds, and the model is trained and validated k times, each time using a different fold as the validation set and the remaining folds as the training set. This helps in obtaining a more reliable estimate of model performance.</p><h3 id="_3-pca-principle" tabindex="-1"><a class="header-anchor" href="#_3-pca-principle"><span>3. PCA Principle</span></a></h3><p><strong>Principal Component Analysis (PCA)</strong>（主成分分析） is a dimensionality reduction technique that transforms the data into a new coordinate system such that the greatest variances by any projection of the data come to lie on the first coordinates (called <strong>principal components</strong>（主成分）). It achieves this by calculating the <strong>eigenvectors</strong>（特征向量） and <strong>eigenvalues</strong>（特征值） of the data&#39;s covariance matrix. The principal components are orthogonal to each other, and by selecting the top k principal components, we can reduce the dimensionality of the data while preserving most of its variance.</p><h3 id="_4-k-means-principle" tabindex="-1"><a class="header-anchor" href="#_4-k-means-principle"><span>4. K-Means Principle</span></a></h3><p><strong>K-Means</strong>（K 均值） is a clustering algorithm that partitions a dataset into k distinct, non-overlapping subgroups (<strong>clusters</strong>（簇）). It works by initializing k <strong>centroids</strong>（质心） randomly, assigning each data point to the nearest centroid, and then updating the centroids to be the mean of the data points assigned to them. This process iterates until the centroids no longer change significantly. The goal is to minimize the within-cluster variance, resulting in compact and well-separated clusters.</p><h3 id="_5-support-vector-machine-principle" tabindex="-1"><a class="header-anchor" href="#_5-support-vector-machine-principle"><span>5. Support Vector Machine Principle</span></a></h3><p><strong>Support Vector Machine (SVM)</strong>（支持向量机） is a supervised learning algorithm used for classification and regression tasks. The principle of SVM is to find the optimal <strong>hyperplane</strong>（超平面） that best separates the data into different classes. This hyperplane is defined by <strong>support vectors</strong>（支持向量）, which are the data points closest to the hyperplane. SVM aims to maximize the <strong>margin</strong>（间隔）, which is the distance between the hyperplane and the support vectors. For non-linearly separable data, SVM uses <strong>kernel functions</strong>（核函数） to transform the data into a higher-dimensional space where a linear separator can be found.</p><h3 id="_6-decision-tree-principle" tabindex="-1"><a class="header-anchor" href="#_6-decision-tree-principle"><span>6. Decision Tree Principle</span></a></h3><p>A <strong>Decision Tree</strong>（决策树） is a supervised learning algorithm used for both classification and regression tasks. It works by recursively splitting the data based on feature values to create a tree structure, where each internal node represents a decision based on a feature, each branch represents the outcome of the decision, and each leaf node represents a class label or a continuous value. The splits are chosen to maximize the reduction in <strong>impurity</strong>（杂质）, commonly measured by metrics like <strong>Gini impurity</strong>（基尼杂质） or <strong>information gain (entropy)</strong>（信息增益或熵）. The resulting model is a tree that predicts the target variable by traversing from the root to a leaf node based on the feature values of the input data.</p>',167),r=[p];function l(o,s){return t(),i("div",null,r)}const d=e(a,[["render",l],["__file","question.html.vue"]]),g=JSON.parse(`{"path":"/ML/question.html","title":"机器学习","lang":"zh-CN","frontmatter":{"icon":"jiqixuexi","ReadingTime":true,"date":"2024-05-03T00:00:00.000Z","Word":true,"PageView":true,"category":"ML","description":"机器学习 本节整理机器学习的基本问题 基本概念 magnitude: 幅度 order of magnitude：数量级 converge: 收敛 oscillate: 振荡 fit: 拟合 fine-tune: 调参 generalization ability：泛化能力 dimension: 量纲 deviation：偏离 一、绪论 什么是机器学习...","head":[["meta",{"property":"og:url","content":"https://ryanlee-ljx.github.io/ML/question.html"}],["meta",{"property":"og:site_name","content":"RyanLee's blog"}],["meta",{"property":"og:title","content":"机器学习"}],["meta",{"property":"og:description","content":"机器学习 本节整理机器学习的基本问题 基本概念 magnitude: 幅度 order of magnitude：数量级 converge: 收敛 oscillate: 振荡 fit: 拟合 fine-tune: 调参 generalization ability：泛化能力 dimension: 量纲 deviation：偏离 一、绪论 什么是机器学习..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-02T22:22:33.000Z"}],["meta",{"property":"article:author","content":"RyanLee_ljx"}],["meta",{"property":"article:published_time","content":"2024-05-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-02T22:22:33.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"机器学习\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-05-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-02T22:22:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"RyanLee_ljx\\",\\"email\\":\\"2284771024@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"基本概念","slug":"基本概念","link":"#基本概念","children":[{"level":3,"title":"一、绪论","slug":"一、绪论","link":"#一、绪论","children":[]},{"level":3,"title":"二、模型评估与选择","slug":"二、模型评估与选择","link":"#二、模型评估与选择","children":[]},{"level":3,"title":"三、线型模型","slug":"三、线型模型","link":"#三、线型模型","children":[]},{"level":3,"title":"四、决策树","slug":"四、决策树","link":"#四、决策树","children":[]},{"level":3,"title":"五、神经网络","slug":"五、神经网络","link":"#五、神经网络","children":[]},{"level":3,"title":"六、支持向量机 SVM","slug":"六、支持向量机-svm","link":"#六、支持向量机-svm","children":[]},{"level":3,"title":"七、聚类 Cluster","slug":"七、聚类-cluster","link":"#七、聚类-cluster","children":[]},{"level":3,"title":"八、降维","slug":"八、降维","link":"#八、降维","children":[]},{"level":3,"title":"1. What is Regularization?","slug":"_1-what-is-regularization","link":"#_1-what-is-regularization","children":[]},{"level":3,"title":"2. What is Cross Validation?","slug":"_2-what-is-cross-validation","link":"#_2-what-is-cross-validation","children":[]},{"level":3,"title":"3. PCA Principle","slug":"_3-pca-principle","link":"#_3-pca-principle","children":[]},{"level":3,"title":"4. K-Means Principle","slug":"_4-k-means-principle","link":"#_4-k-means-principle","children":[]},{"level":3,"title":"5. Support Vector Machine Principle","slug":"_5-support-vector-machine-principle","link":"#_5-support-vector-machine-principle","children":[]},{"level":3,"title":"6. Decision Tree Principle","slug":"_6-decision-tree-principle","link":"#_6-decision-tree-principle","children":[]}]}],"git":{"createdTime":1714744218000,"updatedTime":1719958953000,"contributors":[{"name":"Flame","email":"2284771024@qq.com","commits":6}]},"readingTime":{"minutes":22.48,"words":6743},"filePathRelative":"ML/question.md","localizedDate":"2024年5月3日","excerpt":"\\n<p>本节整理机器学习的基本问题</p>\\n<h2>基本概念</h2>\\n<p>magnitude: 幅度\\norder of magnitude：数量级\\nconverge: 收敛\\noscillate: 振荡\\nfit: 拟合\\nfine-tune: 调参\\ngeneralization ability：泛化能力\\ndimension: 量纲\\ndeviation：偏离</p>\\n<h3>一、绪论</h3>\\n<ol>\\n<li>\\n<p>什么是机器学习和深度学习？\\n机器学习是一种实现人工智能的方法。人工智能是想要达成的目标，而机器学习是想要达成目标的手段：希望机器通过学习的手段，可以跟人一样聪明。机器学习是研究计算机怎样模拟或实现人类的学习行为，以获取新的知识或技能，重新组织已有的知识结构，使不断改善自身的性能。而深度学习，就是机器学习的其中一种方法。</p>\\n</li>\\n<li>\\n<p>机器学习流程？\\n**表示 represent：**将数据对象进行特征(feature)化表示</p>\\n<p>**训练 train：**给定一个数据样本集，从中学习出规律（模型），目标：该规律不仅适用于训练数据，也适用于未知数据(称为泛化能力)</p>\\n<p>**测试 test：**对于一个新的数据样本，利用学到的模型进行预测</p>\\n</li>\\n<li>\\n<p>在机器学习中，学习率这种参数叫什么？学习率太大和太小的可能影响？</p>\\n<p>学习率(learning rate)也叫步长，指更新参数步幅。表征了参数每次更新的幅度（represent the magnitude of parameter update）</p>\\n</li>\\n</ol>","autoDesc":true}`);export{d as comp,g as data};
