import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as r,e as a}from"./app-B8jjWZsL.js";const o={},i=a(`<h1 id="problem-record-of-learning-pytorch" tabindex="-1"><a class="header-anchor" href="#problem-record-of-learning-pytorch"><span>Problem record of learning pytorch</span></a></h1><h2 id="_1-torch-optim-————-scheduler" tabindex="-1"><a class="header-anchor" href="#_1-torch-optim-————-scheduler"><span>1. torch.optim ———— scheduler</span></a></h2><p>Scheduler is used to adjust learning rate.</p><p><code>torch.optim.lr_scheduler.LRScheduler</code> provides several methods to adjust the learning rate based on the number of epochs. <code>torch.optim.lr_scheduler.ReduceLROnPlateau</code> allows dynamic learning rate reducing based on some validation measurements.</p><p>ReduceLROnPlateau expects <mark>a scalar</mark> value (usually a summed loss or cost) that reflects the training progress. This scalar value is used to determine if the learning rate should be reduced.</p><p>like:</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>scheduler_p.step(torch.tensor(cost, device=device).sum())
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>It updates the learning rate based on the sum of the cost across the batch, reflecting the total loss over the batch.</p><p>The ReduceLROnPlateau scheduler observes this summed cost over several iterations.</p><ul><li><p>If the cost is improving (i.e., decreasing over time), the scheduler will keep the learning rate as it is or reduce it slightly (depending on the parameters).</p></li><li><p>If the cost plateaus (i.e., stops improving or starts increasing), the scheduler will reduce the learning rate. This helps in fine-tuning the model when the updates become small or stagnant.</p></li></ul><h2 id="_2-torch-autograd-grad" tabindex="-1"><a class="header-anchor" href="#_2-torch-autograd-grad"><span>2. torch.autograd.grad</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>torch.autograd.grad(outputs, inputs, grad_outputs=None, retain_graph=None, create_graph=False, only_inputs=True, allow_unused=None, is_grads_batched=False, materialize_grads=False)[source]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Compute and return the sum of gradients of outputs with respect to the inputs.</p><p><code>grad_outputs</code> should be a sequence of length matching output containing the “vector” in vector-Jacobian product, usually the pre-computed gradients w.r.t. each of the outputs. If an output doesn’t require_grad, then the gradient can be None).</p><p>That means grad_outputs is essentially the gradient of the loss with respect to the outputs you&#39;re interested in. It allows you to specify how much each output contributes to the overall loss, which is necessary when you manually compute gradients using <code>torch.autograd.grad.</code></p><p>grad_outputs should match the shape of the output tensor you are differentiating with respect to.</p><p>For example, if <code>loss = a + b</code>, then:</p><p><code>d(loss)/d(a) = 1 and d(loss)/d(b) = 1</code>.</p><p>By passing <code>grad_outputs=torch.ones_like(loss)</code>, you&#39;re telling PyTorch to propagate the gradient of 1 through the graph to compute the other gradients.</p><p><code>create_graph=True</code>: This argument allows you to compute the gradient of the gradient (i.e., second-order gradients). By setting it to True, you&#39;re telling PyTorch to track the computation for further differentiation. This is particularly useful when you&#39;re performing optimization on higher-order derivatives (like the variance of the gradients). Without create_graph=True, the computation graph would be discarded after the first backward pass, preventing higher-order gradients from being computed.</p><p><code>retain_graph=True</code>: Normally, after calling backward(), PyTorch releases the computation graph to save memory. Setting retain_graph=True prevents this, which is important when you want to compute more than one gradient with respect to the same graph (which seems to be the case here, as you&#39;re calculating the gradients for the surrogate network afterward).</p><h2 id="learning-rate" tabindex="-1"><a class="header-anchor" href="#learning-rate"><span>Learning rate</span></a></h2><p>When the cost stops improving (or plateaus), it often means that the model is near a local minimum or has reached a point where the gradient is very small, making it hard to improve further.</p><p>In such situations, reducing the learning rate encourages the optimizer to take smaller steps and refine the model&#39;s parameters more precisely.</p><p>If the learning rate is too high, the model might quickly converge to a suboptimal solution. It might not have fully explored the parameter space to find the true minimum of the cost function.</p><p>By gradually reducing the learning rate, the optimizer can continue exploring the space without making drastic changes to the parameters. This allows the model to refine its solution and potentially find better optima over time.</p><h2 id="manually-optimize-parameters" tabindex="-1"><a class="header-anchor" href="#manually-optimize-parameters"><span>Manually optimize parameters</span></a></h2><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>grad_ps = torch.square(grad_temp).mean(0)  # variance
grad_s = torch.autograd.grad(grad_ps, surrogate.parameters(),
                                     grad_outputs=torch.ones_like(grad_ps), retain_graph=True, allow_unused=True)
for params, grad in zip(surrogate.parameters(), grad_s):
    params.grad = grad
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We manually replace the derivative in updataing funciton <code>p = p - a*(derivative)</code> with the derivative we define.</p>`,29),n=[i];function s(d,l){return t(),r("div",null,n)}const p=e(o,[["render",s],["__file","document.html.vue"]]),u=JSON.parse(`{"path":"/ML/document.html","title":"Problem record of learning pytorch","lang":"zh-CN","frontmatter":{"icon":"jiqixuexi","ReadingTime":true,"date":"2024-05-03T00:00:00.000Z","Word":true,"PageView":true,"category":"ML","description":"Problem record of learning pytorch 1. torch.optim ———— scheduler Scheduler is used to adjust learning rate. torch.optim.lr_scheduler.LRScheduler provides several methods to adju...","head":[["meta",{"property":"og:url","content":"https://ryanlee-ljx.github.io/ML/document.html"}],["meta",{"property":"og:site_name","content":"RyanLee's blog"}],["meta",{"property":"og:title","content":"Problem record of learning pytorch"}],["meta",{"property":"og:description","content":"Problem record of learning pytorch 1. torch.optim ———— scheduler Scheduler is used to adjust learning rate. torch.optim.lr_scheduler.LRScheduler provides several methods to adju..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-21T14:44:43.000Z"}],["meta",{"property":"article:author","content":"RyanLee_ljx"}],["meta",{"property":"article:published_time","content":"2024-05-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-21T14:44:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Problem record of learning pytorch\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-05-03T00:00:00.000Z\\",\\"dateModified\\":\\"2025-02-21T14:44:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"RyanLee_ljx\\",\\"email\\":\\"2284771024@qq.com\\"}]}"]]},"headers":[{"level":2,"title":"1. torch.optim ———— scheduler","slug":"_1-torch-optim-————-scheduler","link":"#_1-torch-optim-————-scheduler","children":[]},{"level":2,"title":"2. torch.autograd.grad","slug":"_2-torch-autograd-grad","link":"#_2-torch-autograd-grad","children":[]},{"level":2,"title":"Learning rate","slug":"learning-rate","link":"#learning-rate","children":[]},{"level":2,"title":"Manually optimize parameters","slug":"manually-optimize-parameters","link":"#manually-optimize-parameters","children":[]}],"git":{"createdTime":1740149083000,"updatedTime":1740149083000,"contributors":[{"name":"Flame","email":"2284771024@qq.com","commits":1}]},"readingTime":{"minutes":2.2,"words":661},"filePathRelative":"ML/document.md","localizedDate":"2024年5月3日","excerpt":"\\n<h2>1. torch.optim ———— scheduler</h2>\\n<p>Scheduler is used to adjust learning rate.</p>\\n<p><code>torch.optim.lr_scheduler.LRScheduler</code> provides several methods to adjust the learning rate based on the number of epochs. <code>torch.optim.lr_scheduler.ReduceLROnPlateau</code> allows dynamic learning rate reducing based on some validation measurements.</p>","autoDesc":true}`);export{p as comp,u as data};
