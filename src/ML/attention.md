---
icon: jizhongzhuyili
ReadingTime: true
date: 2025-1-30
Word: true
PageView: true
category: ML
---

# Attention Mechanism

This article will introduce a powerful technique in machine learning called *Ateention Mechanism*. 

The core method of *attention mechanism* is to pay more attention to what we want. It allows model to weigh the importance of different parts of input dynamically rather than treating them equally. The model learns to assign higher weights to the most relevant elements.

Before stepping into the main text, we should first know some preliminary knowledge.

## Preliminaries

**1. RNNs and LSTM network**

The content introduced below is mainly from this three blog/article. For details, click the following link to learn more.

\[1\] [Recurrent neural network From Wikipedia](https://en.wikipedia.org/wiki/Recurrent_neural_network)

\[2\] [Understanding LSTM Networks](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)

\[3\] [如何从RNN起步，一步一步通俗理解LSTM](https://blog.csdn.net/v_JULY_v/article/details/89894058?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522169296729516800211518875%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=169296729516800211518875&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-89894058-null-null.142%5Ev93%5EchatgptT3_2&utm_term=RNN&spm=1018.2226.3001.4187)

RNNs, short for Recurrent Neural Networks, is a class of artificial nerural network used to process sequencial data. Unlike FFN(Forwardfeed Neural Network), RNNs process data across multiple times rather than in a single time, making them well-adapted for modelling and processing text, speech, and time series.

The following picture demonstrates the working flow of RNNs.

![An unrolled recurrent neural network from [2]](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/attention/rnn2.png?raw=true)

RNNs are made up of many units or a loop. Each unit are fed with the previous unit's state————the hidden state $h_{t-1}$ and the input element $x_{t}$. The hidden state is the extraction of the input's feature and can be calculated to obtain the output. We can use this formula to express:

$$
h_{t} = f(Uh_{t-1}, Wx_{t}, b) 
$$

Here $f$ are activation function like sigmoid, ReLu.

By applying another function/transformation like Softmax to $h$, we can obtain the output $y_{t}$ at each time step.

![Out put of RNNs from [2]](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/attention/rnn1.png?raw=true)

However, RNNs fall short in Long-TermDependencies, causing vanishing gradient problem. So here we introduce LSTM, short for Long Short Term Memory networks.

LSTM follows the main structure of RNNs, adapting the inner structure of each recurrent unit.
Each unit comprise of one cell state and three 'gates', the 'forget gate layer', 'input gate layer' and 'output gate layer'

The key to LSTMs is the cell state, the horizontal line running through the top of the diagram.The cell state is kind of like a conveyor belt. It runs straight down the entire chain, with only some minor linear interactions. It’s very easy for information to just flow along it unchanged.

![cell state from [2]](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/attention/LSTMcell.png?raw=true)

It receives information from the 'forget gate layer' and 'input gate layer'.

![Forget gate layer from [2]](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/attention/LSTM3forget.png?raw=true)

![Input gate layer from [2]](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/attention/LSTM3input.png?raw=true)

![Output gate layer from [2]](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/attention/LSTM3output.png?raw=true)

![Calculat new cell state](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/attention/LSTM3cell.png?raw=true)

![Overview of LSTM](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/attention/LSTM3whole.png?raw=true)

**2. Encoder and Decoder**

\[4\] [从Encoder-Decoder(Seq2Seq)理解Attention的本质](https://www.cnblogs.com/huangyc/p/10409626.html)

\[5\] [What are Attention Mechanisms in Deep Learning?](https://www.freecodecamp.org/news/what-are-attention-mechanisms-in-deep-learning/)

The Encoder-Decoder framework, also called Seq2Seq framework, is a widely used design pattern in ML.

The encoder’s job is to capture the context and important information from the input sequence.
Leveraging RNNs, LSTM, GRUs, it transforms the input sequence into a high-dimensional representation that can be used by the decoder to generate the output sequence.

The decoder’s job is to generate the output sequence one token at a time. It uses the information from the encoder as well as its own hidden states to produce coherent and contextually accurate outputs.

For example, here is a sentence pair $(Source, Target)$

$$
Source=(x_{1},x_{2},x_{3},...,x_{n})
$$

$$
Target=(y_{1},y_{2},y_{3},...,y_{n})
$$

The encoder, as its name suggests, encodes the input sentence Source, transforming the input sentence into an intermediate semantic representation C:

$$
C=f(x_{1},x_{2},x_{3},...,x_{n})
$$

For the decoder, its task is to generate the target sentence based on the intermediate semantic representation C of the sentence Source and the historical information generated previously.

$$
y_{i}=g(C,y_{1},y_{2},y_{3},...,y_{i-1})
$$

## Basic Components


## Key Components of Attention

The attention mechanism typically involves the following key elements:

### Query, Key, and Value

- **Query (Q)**: Represents what the model is currently focusing on (e.g., the word or token for which attention is being computed).
- **Key (K)**: Represents the features of the input elements that the model compares against the query.
- **Value (V)**: Represents the actual information or content of the input elements that the model uses for the output.

### Attention Score

The attention score measures the ==similarity== between the query and each key. A common approach is to compute the dot product between the query and the keys, optionally scaled by a factor to stabilize training:

$$
\text{Score}(Q, K) = \frac{QK^T}{\sqrt{d_k}}       

(1)
$$

where $d_k$ is the dimension of the key vector.

The implementation of attention algorithms differs based on the way it measures the similarity.

*Bahdanau Attention:*
$$
e(h_i, s_j) = Utanh(V_h + W_s)
$$

where $U$, $V$, and $W$ are model parameters, and $e(h, s)$ represents a fully connected layer.

*Luong Attention:*
$$
e(h, s) = hTWs
$$

However, both Bahdanau and Luong attention are soft attention mechanisms, calculating αi,j using a softmax function.

### Softmax

The scores are passed through a softmax function to produce normalized attention weights. These weights sum to 1, indicating the importance of each input element relative to the others:

$$
\text{Attention Weights} = \text{softmax}(\text{Score}(Q, K))

(2)
$$

### Weighted Sum

The attention weights are applied to the values (V) to compute a weighted sum, which becomes the output of the attention mechanism:

$$
\text{Output} = \text{Attention Weights} \cdot V

(3)
$$

## Working Flow

### Encoding Phase

The encoder processes the input(namely the **source**), transforming them into hidden state $[s_1, s_2, ..., s_k, ...,s_T]$(namely the **key**). $T$ is the length of the input.

This process is the content we introduce in the preliminaries.

### Attention Calculation

Calculate the similarity, namely the attention score, between its current hidden state $h_{t}$(namely the **query**) and each element of encoder's output($s_i, i=1,2...T$) with (1).

Derive attention score of $s_i$ using (2).

Calculate weighted sum using (3). The result is called the **context vector**, which is passed to the decoder to generate the its next hidden state and the output.

The context vector computed by the attention mechanism, which contains weighted information from the Encoder's hidden states.

### Decoding Phase

The next hidden state of the Decoder is determined by three main components:current hidden state, context vector, decoder input(e.g., the previously generated word in machine translation).

Specifically, the next hidden state $h_t$ is generated by feeding the current hidden state $h_{t-1}$, the Context Vector $c_t$, and the Decoder input $y_{t-1}$ into an RNNs, LSTM, GRUs. This can be expressed as:

$$
h_t = \text{RNN}(h_{t-1}, [c_t, y_{t-1}])
$$

Where:
- $h_t$ is the hidden state at the current time step,
- $h_{t-1}$ is the hidden state at the previous time step,
- $c_t$ is the Context Vector at the current time step,
- $y_{t-1}$ is the output from the previous time step (Decoder input).

The output of the Decoder is typically generated through the following steps:

1. Compute Logits Using Hidden State and Context Vector:
   The hidden state $h_t$ and the Context Vector $c_t$ are combined and passed through a fully connected layer (often a linear transformation followed by an activation function) to produce unnormalized scores (logits).

   $$
   \text{logits} = W_o [h_t; c_t] + b_o
   $$

   Where:
   - $W_o$ and $b_o$ are learnable parameters,
   - $[h_t; c_t]$ represents the concatenation of the hidden state and the Context Vector.

2. Generate Probability Distribution via Softmax:
   The logits are passed through a Softmax function to produce a probability distribution over possible outputs.

   $$
   p(y_t | y_{<t}, x) = \text{Softmax}(\text{logits})
   $$

3. Select the Output:
   Based on the probability distribution, the word with the highest probability is selected as the output $y_t$ for the current time step. Alternatively, sampling methods can be used to generate the output.

The following pictures can clearly illustrate this process.

![illustration of Attention Mechanism(1)](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/attention/attention1.png?raw=true)

![illustration of Attention Mechanism(2)](https://github.com/RyanLee-ljx/RyanLee-ljx.github.io/blob/image/attention/attention2.png?raw=true)

## Summary

The essence of attention mechanism is that we select important information from the input,giving them more weigths so as to omit redundant information.

The function of attention mechanism is to calculate the weighted sum between query and value. The weights are measured by the similarity between query and key.

$$
\text{Attention}(\text{Source}, \text{Query}_t) = \sum_{i=1}^{N}\text{Similarity}(\text{Query}_t, \text{Key}_i)\cdot \text{Value}_i
$$









