---
icon: tujiegou
readingTime: true
date: 2025-02-01
word: true
pageView: true
category: ML
---

# Graph Neural Network

\[1\] [A Gentle Introduction to Graph Neural Networks](https://distill.pub/2021/gnn-intro/)

\[2\] [Graph neural networks: A review of methods and applications](https://arxiv.org/pdf/1812.08434)

\[3\] [【图神经网络】10分钟掌握图神经网络及其经典模型](https://blog.csdn.net/ARPOSPF/article/details/129817487#:~:text=%E9%80%9A%E5%B8%B8%E4%BD%BF%E7%94%A8%20G%20=%20(%20V%20,%20E%20)%20G=(V,%20E)%20G=(V,E)%E6%9D%A5%E8%A1%A8%E7%A4%BA%E5%9B%BE%EF%BC%8C%E5%85%B6%E4%B8%AD)

Graph Neural Networks (GNNs) are a class of deep learning models designed to process graph-structured data. Unlike traditional neural networks (e.g., CNNs for grids, RNNs for sequences), GNNs explicitly model relationships between entities by propagating information through nodes and edges. They have become essential tools for tasks involving relational or topological data.

## Graph

Graph Data: A graph $G=(V,E)$ consists of:

- **Nodes/Vertices (V)**: Represent entities (e.g., users, molecules, or cities).
- **Edges (E)**: Represent relationships or interactions between nodes.
- **Graph (G)**: The entire graph structure.

**Node/Edge/Graph Features**: Optional attributes associated with nodes, edges, and the graph (global feature or *master node*).

We can additionally specialize graphs by associating directionality to edges (directed, undirected).

![Graph representation](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/graph.png?raw=true)

We use an *adjacency matrix* to describe a graph. However, it can be inefficient when the scale of the graph is huge (e.g., for $n$ nodes, the scale of the matrix is $(n^2, n^2)$). So, an *adjacency list* can be a great option. We avoid computation and storage on the disconnected parts of the graph.

![Graph attributes representation](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/adlist.png?raw=true)

Each node and edge has its feature vector.

The key feature of a graph is its **permutation invariance**. Permutation invariance refers to a property where the output of a function remains unchanged when the input's order is rearranged. For example, summation is permutation invariant because the order of elements doesn't affect the result (e.g., $1+2+3=3+1+2=2+1+3$). This requires GNNs to perform optimizable transformations on all attributes of the graph (nodes, edges, global-context) that preserve graph symmetries (permutation invariances).

## Task

GNNs have three levels of tasks: node-level, edge-level, and graph-level.

- **Node-level prediction problems** are analogous to image segmentation, where we are trying to label the role of each pixel in an image. With text, a similar task would be predicting the parts-of-speech of each word in a sentence (e.g., noun, verb, adverb, etc.).
- **Edge-level problems** predict which of these nodes share an edge or what the value of that edge is.
- **Graph-level tasks** are analogous to image classification problems with MNIST and CIFAR, where we want to associate a label to an entire image. With text, a similar problem is sentiment analysis, where we want to identify the mood or emotion of an entire sentence at once.

Graphs have up to four types of information that we will potentially want to use to make predictions: nodes, edges, global-context, and connectivity. After several iterations, we can apply a classification layer to each of its information (feature vector) to predict.

![An end-to-end prediction task with a GNN model](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/TASK.png?raw=true)

## Message Passing

Neighboring nodes or edges exchange information and influence each other’s updated embeddings.

Message passing works in three steps:

1. For each node in the graph, gather (concatenate) all the neighboring node embeddings (or messages).
2. Aggregate all messages via an aggregate function (like sum).
3. All pooled messages are passed through an update function, usually a learned neural network.

This is the node-node message passing process.

![Node-node message passing](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/n_n.png?raw=true)

![Node-node message passing](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/n_n1.png?raw=true)

In the picture, $\rho$ is the pooling process (step 1 and step 2 in message passing).

We also have node-level, node-graph, edge-graph message passing patterns and vice versa.

![Node-edge-node](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/n_v_n.png?raw=true)

Which graph attributes we update and in which order we update them is one design decision when constructing GNNs. We could choose whether to update node embeddings before edge embeddings or the other way around. This is an open area of research with a variety of solutions–for example, we could update in a ‘weave’ fashion, where we have four updated representations that get combined into new node and edge representations: node to node (linear), edge to edge (linear), node to edge (edge layer), edge to node (node layer).

![Weave node-edge-node, edge-node-edge](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/weave.png?raw=true)

When we want to add a global representation (graph feature), one solution to this problem is to add a *master node* or *context vector*, which is virtually proposed. This global context vector is connected to all other nodes and edges in the network and can act as a bridge between them to pass information, building up a representation for the graph as a whole. This creates a richer and more complex representation of the graph than could have otherwise been learned.

So, we have node, edge, and global representations. We can choose which of them to aggregate and update in the iterations.

![Conditioning information](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/condi.png?raw=true)

## Key GNN Architectures

### GCN

A **Graph Convolutional Network (GCN)** is a neural network architecture designed to process graph-structured data. It extends convolutional operations to irregular graphs by aggregating features from a node's local neighborhood. GCNs are widely used for tasks like node classification, link prediction, and graph classification.

#### Key Components:
- **Graph Structure**:
  - Adjacency matrix $A \in \mathbb{R}^{N \times N}$, where $N$ is the number of nodes.
  - Degree matrix $D$, where $D_{ii} = \sum_j A_{ij}$.
  - Node feature matrix $X \in \mathbb{R}^{N \times F}$, where $F$ is the feature dimension.

- **Self-Loops**: Add self-connections to $A$ to include a node’s own features:

  $$
  \tilde{A} = A + I
  $$

- **Normalized Adjacency Matrix**:

  $$
  \hat{A} = \tilde{D}^{-\frac{1}{2}} \tilde{A} \tilde{D}^{-\frac{1}{2}}
  $$

  where $\tilde{D}$ is the degree matrix of $\tilde{A}$.

#### Layer-wise Propagation Rule

The output $H^{(l+1)}$ of the $(l+1)$-th GCN layer is computed as:

$$
H^{(l+1)} = \sigma\left( \hat{A} H^{(l)} W^{(l)} \right)
$$

- $H^{(l)}$: Input features of the $l$-th layer ($H^{(0)} = X$).
- $W^{(l)}$: Trainable weight matrix.
- $\sigma$: Activation function (e.g., ReLU).

::: tip Example

**Step 1: Define Inputs**

- **Adjacency Matrix** (3 nodes):

  $$
  A = \begin{bmatrix}
  0 & 1 & 1 \\
  1 & 0 & 0 \\
  1 & 0 & 0
  \end{bmatrix}, \quad
  \tilde{A} = A + I = \begin{bmatrix}
  1 & 1 & 1 \\
  1 & 1 & 0 \\
  1 & 0 & 1
  \end{bmatrix}
  $$

- **Node Features** ($X \in \mathbb{R}^{3 \times 2}$):

  $$
  X = \begin{bmatrix}
  1 & 0 \\
  0 & 1 \\
  1 & 1
  \end{bmatrix}
  $$

**Step 2: Compute Normalized Adjacency Matrix**

- **Degree Matrix** $\tilde{D}$:

  $$
  \tilde{D} = \text{diag}(3, 2, 2)
  $$

- **Normalized $\hat{A}$** (values rounded for simplicity):

  $$
  \hat{A} = \tilde{D}^{-\frac{1}{2}} \tilde{A} \tilde{D}^{-\frac{1}{2}} \approx \begin{bmatrix}
  0.33 & 0.41 & 0.41 \\
  0.41 & 0.5 & 0 \\
  0.41 & 0 & 0.5
  \end{bmatrix}
  $$

**Step 3: Apply GCN Layer**

Assume $W^{(0)} = \begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix}$ and ReLU activation:

$$
H^{(1)} = \text{ReLU}\left( \hat{A} X W^{(0)} \right) = \text{ReLU}\left( \begin{bmatrix}
0.33 & 0.41 & 0.41 \\
0.41 & 0.5 & 0 \\
0.41 & 0 & 0.5
\end{bmatrix} \begin{bmatrix}
1 & 0 \\
0 & 1 \\
1 & 1
\end{bmatrix} \begin{bmatrix}
1 & -1 \\
-1 & 1
\end{bmatrix} \right)
$$

After matrix multiplication and ReLU, the output features are transformed.

:::

### GAT

A **Graph Attention Network (GAT)** is a neural network architecture designed to process graph-structured data, similar to GCNs. However, GAT introduces an **attention mechanism** to weigh the importance of neighboring nodes dynamically. This allows the model to focus on more relevant neighbors during feature aggregation, making it more flexible and expressive than GCNs.

#### Key Components:

- **Graph Structure**:
  - Adjacency matrix $A \in \mathbb{R}^{N \times N}$, where $N$ is the number of nodes.
  - Node feature matrix $X \in \mathbb{R}^{N \times F}$, where $F$ is the feature dimension.

- **Attention Mechanism**: Computes attention coefficients between nodes to weigh their contributions during aggregation.

#### Attention Mechanism

For a node $i$ and its neighbor $j$, the attention coefficient $e_{ij}$ is computed as:

$$
e_{ij} = \text{LeakyReLU}\left( \mathbf{a}^T [W h_i \| W h_j] \right)
$$

- $h_i, h_j$: Feature vectors of nodes $i$ and $j$.
- $W \in \mathbb{R}^{F' \times F}$: Shared weight matrix for feature transformation.
- $\mathbf{a} \in \mathbb{R}^{2F'}$: Weight vector for the attention mechanism.
- $\|$: Concatenation operation.

- **LeakyReLU**: Nonlinear activation function.

#### Normalized Attention Coefficients

The attention coefficients are normalized using the softmax function:

$$
\alpha_{ij} = \text{softmax}_j(e_{ij}) = \frac{\exp(e_{ij})}{\sum_{k \in \mathcal{N}_i} \exp(e_{ik})}
$$

- $\mathcal{N}_i$: Set of neighbors of node $i$.

#### Feature Aggregation

The output feature $h_i'$ for node $i$ is computed as a weighted sum of its neighbors' features:

$$
h_i' = \sigma\left( \sum_{j \in \mathcal{N}_i} \alpha_{ij} W h_j \right)
$$

- $\sigma$: Nonlinear activation function (e.g., ReLU).

::: tip Example

**Step 1: Define Inputs**

- **Adjacency Matrix** (3 nodes):

  $$
  A = \begin{bmatrix}
  0 & 1 & 1 \\
  1 & 0 & 0 \\
  1 & 0 & 0
  \end{bmatrix}
  $$

- **Node Features** ($X \in \mathbb{R}^{3 \times 2}$):

  $$
  X = \begin{bmatrix}
  1 & 0 \\
  0 & 1 \\
  1 & 1
  \end{bmatrix}
  $$

**Step 2: Compute Attention Coefficients**

Assume $W = \begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix}$ and $\mathbf{a} = [1, -1]$:

- For node 1 and its neighbors (nodes 2 and 3):

  $$
  e_{12} = \text{LeakyReLU}\left( [1, -1]^T [W h_1 \| W h_2] \right)
  $$

  $$
  e_{13} = \text{LeakyReLU}\left( [1, -1]^T [W h_1 \| W h_3] \right)
  $$

- Normalize using softmax:

  $$
  \alpha_{12} = \frac{\exp(e_{12})}{\exp(e_{12}) + \exp(e_{13})}
  $$

  $$
  \alpha_{13} = \frac{\exp(e_{13})}{\exp(e_{12}) + \exp(e_{13})}
  $$

**Step 3: Aggregate Features**

Compute the output feature for node 1:

$$
h_1' = \text{ReLU}\left( \alpha_{12} W h_2 + \alpha_{13} W h_3 \right)
$$

:::

### GraphSAGE

**GraphSAGE** is a framework for inductive representation learning on large graphs. Unlike GCNs, which require the entire graph during training, GraphSAGE generates node embeddings by sampling and aggregating features from a node's local neighborhood. This makes it scalable to large graphs and capable of generalizing to unseen nodes.

#### Key Components:
- **Graph Structure**:
  - Adjacency matrix $A \in \mathbb{R}^{N \times N}$, where $N$ is the number of nodes.
  - Node feature matrix $X \in \mathbb{R}^{N \times F}$, where $F$ is the feature dimension.

- **Neighborhood Sampling**: For each node, a fixed-size subset of neighbors is sampled to reduce computational complexity.

- **Aggregation Functions**: Combines features from a node's neighbors. Common choices include mean, LSTM, or pooling aggregators.

#### Layer-wise Propagation Rule

For each node $v$, the embedding $h_v^{(k)}$ at the $k$-th layer is computed as:

1. **Aggregate Neighbor Features**

   $$
   h_{\mathcal{N}(v)}^{(k)} = \text{AGGREGATE}\left( \{ h_u^{(k-1)}, \forall u \in \mathcal{N}(v) \} \right)
   $$

   - $\mathcal{N}(v)$: Sampled neighbors of node $v$.
   - $\text{AGGREGATE}$: Aggregation function (e.g., mean, LSTM, max-pooling).

2. **Combine Features**:

   $$
   h_v^{(k)} = \sigma\left( W^{(k)} \cdot [h_v^{(k-1)} \| h_{\mathcal{N}(v)}^{(k)}] \right)
   $$

   - $W^{(k)}$: Trainable weight matrix.
   - $\|$: Concatenation operation.
   - $\sigma$: Nonlinear activation function (e.g., ReLU).

#### Output Embedding

After $K$ layers, the final embedding for node $v$ is:

$$
z_v = h_v^{(K)}
$$

![GraphSAGE](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/gsage.png?raw=true)

## Summary

In summary, GNNs differ in which components exchange information with each other, the aggregation function, and the update function.

![Types of GNN](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/tpyes.png?raw=true)

## Code

Here we write codes that can randomly produce several graph alongside their features. We use *networkx* to visualize. For better understand the calculation process, we preset the parameters to be identity matrix.


![input graph](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/Figure_1.png?raw=true)

![result](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/gnn/result.png?raw=true)

```
import networkx as nx
import matplotlib.pyplot as plt
import torch
import torch.nn as nn


class GCNs(nn.Module):
    def __init__(self, num_feature_in, num_feature_out):
        super(GCNs, self).__init__()
        # self.W = torch.nn.Parameter(torch.randn([num_feature_in, num_feature_out]))  
        self.W = torch.nn.Parameter(torch.eye(num_feature_in, num_feature_out))

    def forward(self, adj_matrix, node_feature):
        '''
        if the input is not in batch, we need to 
        add a dimension(batch dimension) to the input.
        '''
        if len(adj_matrix.shape) == 2:
            adj_matrix = torch.unsqueeze(adj_matrix, dim=0)
        if len(node_feature.shape) == 2:
            node_feature = torch.unsqueeze(node_feature, dim=0)
        # make sure the input is float type. 
        adj_matrix = adj_matrix.float()
        node_feature = node_feature.float()
        # number of nodes
        num_nodes = adj_matrix.shape[1]

        A = adj_matrix + torch.eye(num_nodes)
        A = A.float()
        # calculate degree matrix
        D = torch.diag_embed(A.sum(dim=-1))
        D = D.float()
        D_sqrt = D.pow(-0.5)
        D_sqrt[D_sqrt.isinf()] = 0

        H_t1 = torch.bmm(D_sqrt, A)
        H_t1 = torch.bmm(H_t1, D_sqrt)
        H_t1 = torch.bmm(H_t1, node_feature)
        H_t1 = torch.nn.functional.relu(torch.matmul(H_t1, self.W))
        return H_t1

# input
batch_size = 4
num_node = 6
num_feature = 2

# create upper triangular part of the adjacent matrix
map_input_n = torch.triu(torch.randint(0, 2, (batch_size, num_node, num_node)))  
map_input_n = map_input_n + map_input_n.transpose(-2, -1)
map_input_n.diagonal(dim1=1, dim2=2).zero_()  # diagonal part = 0
print(map_input_n)
# node feature
map_input_feature_n = torch.randint(0, 3, (batch_size, num_node, num_feature))  

# visualize
graph = [nx.Graph(i.numpy()) for i in map_input_n]  # list conatins nxgraph
fig, axe = plt.subplots(2, 2)  
axe = axe.flatten()  # flatten for better index
for i in range(batch_size):
    ax = axe[i]
    for j in range(num_node):  # add feature vector to every node
        graph[i].nodes[j]['feature_vector'] = map_input_feature_n[i][j][:].numpy()
    nx.draw(graph[i], ax=ax, with_labels=True, font_size=12, font_color='black', node_color='lightblue',
            edge_color='gray')
    ax.set_title(f"Graph {i + 1}")
plt.tight_layout()
plt.show()

# output
net = GCNs(num_feature, num_feature)
with torch.no_grad():
    print(f"Your input is: \n {map_input_feature_n}")
    output = net(map_input_n, map_input_feature_n)
    print(f"Your output is: \n {output}")
```