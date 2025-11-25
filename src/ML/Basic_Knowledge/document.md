---
icon: jiqixuexi
ReadingTime: true
date: 2024-05-03
Word: true
PageView: true
category: ML
---

# Problem record of learning pytorch

## 1. torch.optim ———— scheduler

Scheduler is used to adjust learning rate.

`torch.optim.lr_scheduler.LRScheduler` provides several methods to adjust the learning rate based on the number of epochs. `torch.optim.lr_scheduler.ReduceLROnPlateau` allows dynamic learning rate reducing based on some validation measurements.

ReduceLROnPlateau expects ==a scalar== value (usually a summed loss or cost) that reflects the training progress. This scalar value is used to determine if the learning rate should be reduced.

like:

```
scheduler_p.step(torch.tensor(cost, device=device).sum())
```

It updates the learning rate based on the sum of the cost across the batch, reflecting the total loss over the batch.

The ReduceLROnPlateau scheduler observes this summed cost over several iterations.

- If the cost is improving (i.e., decreasing over time), the scheduler will keep the learning rate as it is or reduce it slightly (depending on the parameters).

- If the cost plateaus (i.e., stops improving or starts increasing), the scheduler will reduce the learning rate. This helps in fine-tuning the model when the updates become small or stagnant.

## 2. torch.autograd.grad

```
torch.autograd.grad(outputs, inputs, grad_outputs=None, retain_graph=None, create_graph=False, only_inputs=True, allow_unused=None, is_grads_batched=False, materialize_grads=False)[source]
```

Compute and return the sum of gradients of outputs with respect to the inputs.

`grad_outputs` should be a sequence of length matching output containing the “vector” in vector-Jacobian product, usually the pre-computed gradients w.r.t. each of the outputs. If an output doesn’t require_grad, then the gradient can be None).

That means grad_outputs is essentially the gradient of the loss with respect to the outputs you're interested in. It allows you to specify how much each output contributes to the overall loss, which is necessary when you manually compute gradients using `torch.autograd.grad.`

grad_outputs should match the shape of the output tensor you are differentiating with respect to.

For example, if `loss = a + b`, then:

`d(loss)/d(a) = 1 and d(loss)/d(b) = 1`.

By passing `grad_outputs=torch.ones_like(loss)`, you're telling PyTorch to propagate the gradient of 1 through the graph to compute the other gradients.

`create_graph=True`: This argument allows you to compute the gradient of the gradient (i.e., second-order gradients). By setting it to True, you're telling PyTorch to track the computation for further differentiation. This is particularly useful when you're performing optimization on higher-order derivatives (like the variance of the gradients). Without create_graph=True, the computation graph would be discarded after the first backward pass, preventing higher-order gradients from being computed.

`retain_graph=True`: Normally, after calling backward(), PyTorch releases the computation graph to save memory. Setting retain_graph=True prevents this, which is important when you want to compute more than one gradient with respect to the same graph (which seems to be the case here, as you're calculating the gradients for the surrogate network afterward).

## Learning rate

When the cost stops improving (or plateaus), it often means that the model is near a local minimum or has reached a point where the gradient is very small, making it hard to improve further.

In such situations, reducing the learning rate encourages the optimizer to take smaller steps and refine the model's parameters more precisely.

If the learning rate is too high, the model might quickly converge to a suboptimal solution. It might not have fully explored the parameter space to find the true minimum of the cost function.

By gradually reducing the learning rate, the optimizer can continue exploring the space without making drastic changes to the parameters. This allows the model to refine its solution and potentially find better optima over time.

## Manually optimize parameters

```
grad_ps = torch.square(grad_temp).mean(0)  # variance
grad_s = torch.autograd.grad(grad_ps, surrogate.parameters(),
                                     grad_outputs=torch.ones_like(grad_ps), retain_graph=True, allow_unused=True)
for params, grad in zip(surrogate.parameters(), grad_s):
    params.grad = grad
```

We manually replace the derivative in updataing funciton `p = p - a*(derivative)` with the derivative we define.

