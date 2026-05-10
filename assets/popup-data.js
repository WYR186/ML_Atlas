// Per-topic content shown inside the click-popup:
//   - tutorial:  short summary that complements the full notes page
//   - code:      Python templates (concise; not the focus of the course)
//   - problems:  HW problem entries — paraphrased one-liners + my own
//                conceptual answer sketch + a link to the original PDF.
//                Full problem text lives in the source PDF; we don't
//                reproduce it here.
window.POPUP_DATA = {

  // ─────────────────── Foundations ───────────────────
  "probability": {
    tutorial: {
      cn: "1. 先把题目翻译成事件：联合、条件、独立、条件独立。\n2. 条件概率就是缩小样本空间；贝叶斯就是 posterior ∝ likelihood × prior。\n3. 期末最容易考两类：手算 Bayes / 全概率，以及解释 Naive Bayes 为什么能把 P(X1,...,Xd|Y) 拆成乘积。",
      en: "1. Translate the question into events first: joint, conditional, independence, or conditional independence.\n2. Conditioning shrinks the sample space; Bayes is posterior ∝ likelihood × prior.\n3. Exam favorites: hand Bayes / total-probability calculations, and explaining why Naive Bayes can factor P(X1,...,Xd|Y) into a product."
    },
    code: [{
      title: { cn: "Bayes / 期望 (Python)", en: "Bayes / Expectation (Python)" },
      code: `# Posterior ∝ Likelihood × Prior
def bayes(prior_a, p_b_given_a, p_b_given_not_a):
    p_b = p_b_given_a * prior_a + p_b_given_not_a * (1 - prior_a)
    return p_b_given_a * prior_a / p_b

# 离散期望与方差
import numpy as np
def mean_var(values, probs):
    values, probs = np.asarray(values), np.asarray(probs)
    mu = (values * probs).sum()
    var = ((values - mu) ** 2 * probs).sum()
    return mu, var
`
    }],
    problems: [
      {
        id: "lec2-dice-conditioning", hw: "Lecture_2", section: "p. 5-6",
        title: { cn: "两骰子条件概率：给定和不超过 4，求第一枚骰子的条件分布",
                 en: "Two-dice conditioning: given a small sum, compute a die's conditional probability" },
        solution: {
          cn: "先只保留满足条件的样本空间：和 ≤ 4 的结果共有 6 个。再在这 6 个里数目标事件，例如 X1=2 出现 2 次，所以概率是 2/6=1/3。重点不是公式，而是分母必须换成“已知条件后的世界”。",
          en: "Restrict the sample space first: the event sum ≤ 4 leaves 6 outcomes. Count the target event inside that reduced world; X1=2 appears twice, so 2/6=1/3. The key is that the denominator becomes the conditioned world."
        }
      },
      {
        id: "lec2-conditional-independence", hw: "Lecture_2", section: "p. 9-10",
        title: { cn: "独立不等于条件独立：用骰子奇偶与和的奇偶构造反例",
                 en: "Independence is not conditional independence: parity counterexample with dice" },
        solution: {
          cn: "无条件下，第一枚为奇数与第二枚为奇数互不影响；但给定“两枚和为偶数”后，知道第一枚为奇数就强迫第二枚也为奇数。结论：判断条件独立一定回到定义 P(A|B,C)=P(A|C)，不能凭直觉套独立。",
          en: "Unconditionally, the two dice parities are independent. After conditioning on the sum being even, knowing the first die is odd forces the second to be odd. Always test CI with P(A|B,C)=P(A|C), not by intuition."
        }
      }
    ]
  },

  "linear-algebra": {
    tutorial: {
      cn: "1. 线代是 ML 的 shape 语法：x、w、X、gradient、Hessian 都要先知道维度。\n2. 点积是相似度 / 投影，矩阵是线性变换；SVD 把矩阵拆成旋转、伸缩、旋转。\n3. HW1 高频是 rank / null space / pseudo-inverse，以及用 XᵀBX 的夹心结构证明 PSD。",
      en: "1. Linear algebra is ML's shape grammar: know the dimensions of x, w, X, gradients, and Hessians first.\n2. Dot products measure similarity / projection; matrices are linear maps; SVD is rotate-stretch-rotate.\n3. HW1 favorites: rank / null space / pseudo-inverse, and proving PSD via the XᵀBX sandwich."
    },
    code: [{
      title: { cn: "Shape 检查 + 特征值", en: "Shape check + eigendecomp" },
      code: `import numpy as np
A = np.random.randn(4, 3)
x = np.random.randn(3, 1)
assert (A @ x).shape == (4, 1)              # (m,n) @ (n,1) → (m,1)
assert (x.T @ A.T).shape == (1, 4)

# 协方差矩阵 + 最大特征向量（PCA 直觉）
X = np.random.randn(100, 5)
Xc = X - X.mean(axis=0)
S = Xc.T @ Xc / len(X)
w, v = np.linalg.eigh(S)
pc1 = v[:, np.argmax(w)]
`
    }],
    problems: []
  },

  "optimization": {
    tutorial: {
      cn: "1. 优化就是最小化损失：无约束看 ∇f=0，有约束先写 Lagrangian。\n2. 凸性是安全网：Hessian PSD ⇒ 凸；凸问题里局部最优就是全局最优。\n3. GD 是反复走负梯度，步长决定快慢与稳定；对偶则把“变量选择”换成“约束价格选择”。",
      en: "1. Optimization means minimizing loss: unconstrained problems look for ∇f=0; constrained problems start with the Lagrangian.\n2. Convexity is the safety net: PSD Hessian ⇒ convex; in convex problems, local minima are global.\n3. GD repeatedly walks against the gradient; step size controls speed and stability. Duality swaps choosing variables for choosing constraint prices."
    },
    code: [{
      title: { cn: "梯度下降模板", en: "Gradient Descent template" },
      code: `import numpy as np

def grad_descent(grad_fn, w0, eta=1e-2, n_iter=1000, tol=1e-6):
    w = w0.copy()
    for t in range(n_iter):
        g = grad_fn(w)
        w_new = w - eta * g
        if np.linalg.norm(w_new - w) < tol:
            break
        w = w_new
    return w
`
    }],
    problems: [
      {
        id: "hw1-p4-c",
        hw: "hw1",
        section: "Problem 4(c)",
        title: { en: "Prove the Euclidean norm is convex", cn: "证明欧氏范数是凸函数" },
        original_excerpt: { en: "f(x)=||x||_2", cn: "f(x)=||x||_2" },
        problem_understanding: {
          en: "The row is asking for the convexity definition, not a derivative test. You need to compare the norm of a convex combination with the same convex combination of norms.",
          cn: "这一问要用凸性的定义，而不是求导。核心是比较“凸组合的范数”和“范数的凸组合”。"
        },
        knowledge_points: {
          en: "Use the triangle inequality and positive homogeneity of norms: ||a+b|| <= ||a||+||b|| and ||c x||=|c| ||x||. For lambda in [0,1], these facts give the convexity inequality directly.",
          cn: "用范数的三角不等式和齐次性：||a+b|| <= ||a||+||b||，||c x||=|c| ||x||。当 lambda 在 [0,1] 内时，可以直接推出凸性不等式。"
        },
        tips: {
          en: [
            "Start with ||lambda x+(1-lambda)y||_2 and split it into two vectors.",
            "Keep lambda in [0,1] so absolute values disappear cleanly.",
            "End by matching the exact convexity definition."
          ],
          cn: [
            "从 ||lambda x+(1-lambda)y||_2 开始，把它看成两个向量之和。",
            "注意 lambda 在 [0,1]，所以齐次性里的绝对值可以直接去掉。",
            "最后要把式子写回凸性定义的标准形式。"
          ]
        },
        detailed_solution: {
          en: String.raw`### Goal

- Prove the convexity inequality directly.
- Do not use gradients; a norm proof should use norm properties.

### Main step

$$
\|\lambda x+(1-\lambda)y\|_2
\le \|\lambda x\|_2+\|(1-\lambda)y\|_2
$$

### Use homogeneity

$$
\|\lambda x\|_2+\|(1-\lambda)y\|_2
= \lambda\|x\|_2+(1-\lambda)\|y\|_2
$$

### Conclusion

- This matches the definition of convexity for \(f(x)=\|x\|_2\).
- Therefore the Euclidean norm is convex.`,
          cn: String.raw`### 目标

- 直接证明凸性不等式。
- 不需要求导；范数题优先用范数性质。

### 关键一步

$$
\|\lambda x+(1-\lambda)y\|_2
\le \|\lambda x\|_2+\|(1-\lambda)y\|_2
$$

### 使用齐次性

$$
\|\lambda x\|_2+\|(1-\lambda)y\|_2
= \lambda\|x\|_2+(1-\lambda)\|y\|_2
$$

### 结论

- 这正好就是 \(f(x)=\|x\|_2\) 的凸性定义。
- 所以欧氏范数是凸函数。`
        }
      },
      {
        id: "hw1-p4-d",
        hw: "hw1",
        section: "Problem 4(d)",
        title: { en: "Show log-sum-exp is convex", cn: "证明 log-sum-exp 函数凸" },
        original_excerpt: { en: "log sum_i exp(x_i)", cn: "log sum_i exp(x_i)" },
        problem_understanding: {
          en: "This asks you to justify why the smooth maximum-like function has no negative curvature. A clean route is to compute its Hessian and show it is PSD.",
          cn: "这一问要说明这个“平滑最大值”函数没有负曲率。最干净的路线是算 Hessian 并证明它半正定。"
        },
        knowledge_points: {
          en: "The gradient of log-sum-exp is the softmax vector p. Its Hessian is diag(p)-pp^T. For any direction v, v^T(diag(p)-pp^T)v is a weighted variance, so it is nonnegative.",
          cn: "log-sum-exp 的梯度是 softmax 向量 p，Hessian 是 diag(p)-pp^T。对任意方向 v，v^T(diag(p)-pp^T)v 是一个加权方差，因此非负。"
        },
        tips: {
          en: [
            "Name p_i=exp(x_i)/sum_j exp(x_j) before differentiating twice.",
            "When proving PSD, switch from matrix symbols to v^T H v.",
            "Recognize E_p[v_i^2]-(E_p[v_i])^2 as variance."
          ],
          cn: [
            "先定义 p_i=exp(x_i)/sum_j exp(x_j)，再做二阶导会清楚很多。",
            "证明 PSD 时，把矩阵形式换成 v^T H v。",
            "看到 E_p[v_i^2]-(E_p[v_i])^2，要立刻联想到方差。"
          ]
        },
        detailed_solution: {
          en: String.raw`### Setup

- Let \(f(x)=\log\sum_i e^{x_i}\).
- Define the softmax weights:

$$
p_i=\frac{e^{x_i}}{\sum_j e^{x_j}}
$$

### Gradient and Hessian

$$
\nabla f(x)=p
$$

$$
\nabla^2 f(x)=\operatorname{diag}(p)-pp^\top
$$

### PSD check

For any vector \(v\),

$$
v^\top \nabla^2 f(x)v
=\sum_i p_i v_i^2-\left(\sum_i p_i v_i\right)^2
$$

### Conclusion

- The last expression is a weighted variance.
- A variance is always nonnegative.
- Therefore the Hessian is PSD everywhere, so log-sum-exp is convex.`,
          cn: String.raw`### 设置

- 令 \(f(x)=\log\sum_i e^{x_i}\)。
- 先定义 softmax 权重：

$$
p_i=\frac{e^{x_i}}{\sum_j e^{x_j}}
$$

### 梯度与 Hessian

$$
\nabla f(x)=p
$$

$$
\nabla^2 f(x)=\operatorname{diag}(p)-pp^\top
$$

### PSD 检查

对任意向量 \(v\)，

$$
v^\top \nabla^2 f(x)v
=\sum_i p_i v_i^2-\left(\sum_i p_i v_i\right)^2
$$

### 结论

- 最后一项是加权方差。
- 方差一定非负。
- 因此 Hessian 处处 PSD，所以 log-sum-exp 是凸函数。`
        }
      },
      {
        id: "hw1-p4-e",
        hw: "hw1",
        section: "Problem 4(e)",
        title: { en: "Evaluate convex optimization true/false claims", cn: "判断凸优化约束与对偶的真假" },
        original_excerpt: { en: "g(x)<=0; dual function", cn: "g(x)<=0; dual function" },
        problem_understanding: {
          en: "The question checks whether you know which facts are guaranteed by convexity and duality definitions, and which are stronger claims that need extra assumptions.",
          cn: "这一问检查你是否分得清哪些结论由凸性和对偶定义保证，哪些是更强、不能随便说的结论。"
        },
        knowledge_points: {
          en: "A sublevel set of a convex function is convex. The dual function is always concave because it is an infimum of affine functions in the multipliers. Strong duality is equality of optimal values, not equality of the primal and dual optimizers.",
          cn: "凸函数的下水平集是凸集。对偶函数总是凹的，因为它是关于乘子的仿射函数族的下确界。强对偶说的是最优值相等，不是原始解和对偶解本身相同。"
        },
        tips: {
          en: [
            "For feasible-set convexity, test lambda x+(1-lambda)y with g's convexity.",
            "Separate optimal values from optimizer vectors.",
            "Remember that the dual variable usually lives in a different space from x."
          ],
          cn: [
            "证明可行域凸时，直接把 lambda x+(1-lambda)y 代进 g 的凸性。",
            "把最优值相等和最优解相同分开看。",
            "记住对偶变量通常和原变量 x 根本不在同一个空间。"
          ]
        },
        detailed_solution: {
          en: String.raw`### (a) Feasible set

- True.
- If \(x\) and \(y\) are feasible, then \(g(x)\le 0\) and \(g(y)\le 0\).

$$
g(\lambda x+(1-\lambda)y)
\le \lambda g(x)+(1-\lambda)g(y)
\le 0
$$

### (b) Dual function

- True.
- The dual function is concave in the multipliers because it is the infimum of affine functions.
- This concavity does not require the primal problem itself to be convex.

### (c) Strong duality

- True.
- Strong duality means the primal optimum value equals the dual optimum value.

### (d) Dual solution versus primal solution

- False.
- The dual problem can have the same optimal value without having the same decision variables.
- Equality of values is not equality of optimizers.`,
          cn: String.raw`### (a) 可行域

- True。
- 若 \(x\) 和 \(y\) 可行，则 \(g(x)\le 0\)、\(g(y)\le 0\)。

$$
g(\lambda x+(1-\lambda)y)
\le \lambda g(x)+(1-\lambda)g(y)
\le 0
$$

### (b) 对偶函数

- True。
- 对偶函数关于乘子是凹函数，因为它是仿射函数族的下确界。
- 这个凹性不要求原问题本身是凸的。

### (c) 强对偶

- True。
- 强对偶说的是原始最优值等于对偶最优值。

### (d) 对偶解与原始解

- False。
- 对偶问题可以有相同最优值，但变量空间通常不同。
- 最优值相等不代表最优解本身相同。`
        }
      },
      {
        id: "hw1-p4-f",
        hw: "hw1",
        section: "Problem 4(f)",
        title: { en: "Prove the subgradient descent distance inequality", cn: "证明次梯度下降的距离不等式" },
        original_excerpt: { en: "x_{t+1}=x_t-eta_t s_t", cn: "x_{t+1}=x_t-eta_t s_t" },
        problem_understanding: {
          en: "The problem wants the basic one-step descent-style inequality for nonsmooth convex optimization. First turn convexity into a subgradient inequality, then expand a squared norm after one update.",
          cn: "这一问要证明非光滑凸优化里的基本单步距离界。先把凸性写成次梯度不等式，再展开一次更新后的平方距离。"
        },
        knowledge_points: {
          en: "For s in partial f(x), f(z) >= f(x)+<s,z-x> for every z. Taking z=x* gives f(x)-f(x*) <= <s,x-x*>. Then use ||a-eta s||^2 = ||a||^2 - 2 eta <s,a> + eta^2 ||s||^2.",
          cn: "若 s in partial f(x)，则任意 z 都有 f(z) >= f(x)+<s,z-x>。取 z=x* 得到 f(x)-f(x*) <= <s,x-x*>。之后用 ||a-eta s||^2 = ||a||^2 - 2 eta <s,a> + eta^2 ||s||^2。"
        },
        tips: {
          en: [
            "Use x* only after writing the general subgradient inequality.",
            "Set a=x_t-x* before expanding the norm.",
            "The G bound is used only at the final eta_t^2 ||s_t||^2 term."
          ],
          cn: [
            "先写一般的次梯度不等式，再把 z 取成 x*。",
            "展开前令 a=x_t-x*，式子会干净很多。",
            "G 的上界只在最后处理 eta_t^2 ||s_t||^2 那一项时使用。"
          ]
        },
        detailed_solution: {
          en: String.raw`### Start from the subgradient inequality

For \(s_t\in \partial f(x_t)\),

$$
f(z)\ge f(x_t)+\langle s_t,z-x_t\rangle
$$

Set \(z=x^\star\), then rearrange:

$$
f(x_t)-f(x^\star)\le \langle s_t,x_t-x^\star\rangle
$$

### Expand one update

The update is \(x_{t+1}=x_t-\eta_t s_t\). Therefore,

$$
\|x_{t+1}-x^\star\|^2
=\|x_t-x^\star-\eta_t s_t\|^2
$$

Expand the square:

$$
\|x_t-x^\star\|^2
-2\eta_t\langle s_t,x_t-x^\star\rangle
+\eta_t^2\|s_t\|^2
$$

### Substitute the bounds

- Replace the inner product using the subgradient inequality.
- Use \(\|s_t\|\le G\) for the last term.

$$
\|x_{t+1}-x^\star\|^2
\le
\|x_t-x^\star\|^2
-2\eta_t\bigl(f(x_t)-f(x^\star)\bigr)
+\eta_t^2G^2
$$

### Meaning

- The middle term is the progress term.
- The final term is the step-size penalty.
- Smaller \(\eta_t\) makes the penalty easier to control.`,
          cn: String.raw`### 从次梯度不等式开始

若 \(s_t\in \partial f(x_t)\)，则

$$
f(z)\ge f(x_t)+\langle s_t,z-x_t\rangle
$$

令 \(z=x^\star\)，并移项：

$$
f(x_t)-f(x^\star)\le \langle s_t,x_t-x^\star\rangle
$$

### 展开一次更新

更新式是 \(x_{t+1}=x_t-\eta_t s_t\)。因此，

$$
\|x_{t+1}-x^\star\|^2
=\|x_t-x^\star-\eta_t s_t\|^2
$$

展开平方：

$$
\|x_t-x^\star\|^2
-2\eta_t\langle s_t,x_t-x^\star\rangle
+\eta_t^2\|s_t\|^2
$$

### 代入两个界

- 用次梯度不等式替换内积项。
- 用 \(\|s_t\|\le G\) 控制最后一项。

$$
\|x_{t+1}-x^\star\|^2
\le
\|x_t-x^\star\|^2
-2\eta_t\bigl(f(x_t)-f(x^\star)\bigr)
+\eta_t^2G^2
$$

### 直觉

- 中间项是目标函数带来的进步。
- 最后一项是步长带来的误差代价。
- \(\eta_t\) 越小，这个误差项越容易控制。`
        }
      }
    ]
  },

  // ─────────────────── Classical Supervised ───────────────────
  "knn": {
    tutorial: {
      cn: "记忆型分类器：取最近 k 个训练点投票（分类）或平均（回归）。距离用欧氏；高维下需小心 distance concentration。",
      en: "Memory-based classifier: vote/average over k nearest training points by Euclidean distance. Watch distance concentration in high dim."
    },
    code: [{
      title: { cn: "Python (NumPy)", en: "Python (NumPy)" },
      code: `import numpy as np
def knn_predict(X_train, y_train, q, k=3):
    d = np.linalg.norm(X_train - q, axis=1)
    idx = np.argsort(d)[:k]
    vals, cnts = np.unique(y_train[idx], return_counts=True)
    return vals[np.argmax(cnts)]
`
    }],
    problems: [
      {
        id: "hw1-p1-a",
        hw: "hw1",
        section: "Problem 1(a)",
        title: { en: "Compute KNN predictions for k=1 and k=3", cn: "计算 k=1 与 k=3 的 KNN 预测" },
        original_excerpt: { en: "q=(3,2,4); k=1,3", cn: "q=(3,2,4); k=1,3" },
        problem_understanding: {
          en: "You need to measure every training point's Euclidean distance to the query, sort the neighbors, and vote among the closest k labels.",
          cn: "这一问要先计算每个训练点到查询点的欧氏距离，再排序，并用最近 k 个点的标签投票。"
        },
        knowledge_points: {
          en: "KNN is a distance-based, nonparametric method. For classification, k=1 copies the nearest label, while k=3 takes the majority label among the three nearest points.",
          cn: "KNN 是基于距离的非参数方法。分类时，k=1 直接取最近邻标签；k=3 则在最近三个点中做多数投票。"
        },
        tips: {
          en: [
            "Use squared distances for sorting if you want to avoid extra square roots.",
            "Write the label next to each distance before voting.",
            "Check the third-nearest point carefully; it changes the k=3 answer."
          ],
          cn: [
            "如果只为了排序，可以先算平方距离，避免多开根号。",
            "每个距离旁边同步写上标签，投票时不容易错。",
            "第三近的点要特别小心，它会决定 k=3 的多数票。"
          ]
        },
        detailed_solution: {
          en: "The distances from q are: x5 has distance 2, x4 has sqrt(6), x7 has 3, x2 has sqrt(10), x1 and x3 each have sqrt(14), and x6 has sqrt(21). The nearest point is x5, whose label is 2, so k=1 predicts 2.\nFor k=3, the nearest points are x5, x4, and x7. Their labels are 2, 1, and 1, so the majority vote is label 1.",
          cn: "q 到各点的距离为：x5 是 2，x4 是 sqrt(6)，x7 是 3，x2 是 sqrt(10)，x1 和 x3 都是 sqrt(14)，x6 是 sqrt(21)。最近点是 x5，标签为 2，所以 k=1 预测 2。\n当 k=3 时，最近三个点是 x5、x4、x7，它们的标签分别是 2、1、1，多数票为 1。"
        }
      },
      {
        id: "hw1-p1-b",
        hw: "hw1",
        section: "Problem 1(b)",
        title: { en: "Show high-dimensional squared distances concentrate", cn: "证明高维平方距离会集中" },
        original_excerpt: { en: "mean d/6; fixed n", cn: "mean d/6; fixed n" },
        problem_understanding: {
          en: "The question asks why random query-to-point distances stop varying much relative to their size when dimension grows, first for one point and then for all fixed n points.",
          cn: "这一问要解释为什么维度增大时，随机查询点到训练点的距离相对波动会变小；先看单个点，再推广到固定数量的所有点。"
        },
        knowledge_points: {
          en: "Write the squared distance as a sum of independent coordinate contributions. Each coordinate has mean 1/6 and finite variance, so Chebyshev makes relative deviation shrink like 1/d. A union bound handles finitely many points.",
          cn: "把平方距离写成独立坐标贡献的和。每个坐标的均值是 1/6、方差有限，因此 Chebyshev 可以让相对偏差随 1/d 缩小。对固定 n 个点再用 union bound。"
        },
        tips: {
          en: [
            "Reduce the problem to one coordinate: (X_{j,i}-q_i)^2.",
            "Chebyshev should be applied to a relative error around d/6.",
            "The union bound works only because n is fixed while d grows."
          ],
          cn: [
            "先把问题降到一个坐标：(X_{j,i}-q_i)^2。",
            "Chebyshev 要用在围绕 d/6 的相对误差上。",
            "union bound 能收尾，是因为 n 固定而 d 变大。"
          ]
        },
        detailed_solution: {
          en: "For one coordinate with two independent U[0,1] variables, E[(X-q)^2]=1/6 and the variance is a constant, in fact 7/180. Summing d coordinates gives E||X_j-q||^2=d/6 and Var(||X_j-q||^2)=7d/180.\nFor any fixed epsilon>0,\nP(| ||X_j-q||^2-d/6 | > epsilon d/6) <= (7d/180)/(epsilon^2 d^2/36), which goes to 0. For all n points, add these n failure probabilities with a union bound. Since n does not grow with d, the simultaneous failure probability also goes to 0.",
          cn: "一个坐标里有两个独立的 U[0,1] 变量，E[(X-q)^2]=1/6，方差是常数，具体为 7/180。d 个坐标相加后，E||X_j-q||^2=d/6，Var(||X_j-q||^2)=7d/180。\n对任意固定 epsilon>0，\nP(| ||X_j-q||^2-d/6 | > epsilon d/6) <= (7d/180)/(epsilon^2 d^2/36)，该上界趋向 0。对 n 个点，把失败概率用 union bound 相加；因为 n 固定，总失败概率仍趋向 0。"
        }
      },
      {
        id: "hw1-p1-c",
        hw: "hw1",
        section: "Problem 1(c)",
        title: { en: "Show the nearest-neighbor distance grows like sqrt(d)", cn: "证明最近邻距离是 sqrt(d) 量级" },
        original_excerpt: { en: "R_(1)=min_j ||X_j-q||", cn: "R_(1)=min_j ||X_j-q||" },
        problem_understanding: {
          en: "After proving that every squared distance is close to d/6, you need to translate that into the scale of the minimum distance.",
          cn: "前一问已经证明每个平方距离都接近 d/6；这一问要把它转成最小距离的量级。"
        },
        knowledge_points: {
          en: "If all squared distances are d/6 times a factor tending to 1, then all distances are sqrt(d/6) times a factor tending to 1. Taking a minimum over fixed n values preserves the sqrt(d) scale.",
          cn: "若所有平方距离都是 d/6 乘上趋近 1 的因子，那么所有距离都是 sqrt(d/6) 乘上趋近 1 的因子。对固定 n 个数取最小值，不会改变量级。"
        },
        tips: {
          en: [
            "Do not use order statistics; the concentration result is enough.",
            "Take square roots only after writing the multiplicative form.",
            "Use Theta(sqrt(d)) or order sqrt(d), not an exact finite-d formula."
          ],
          cn: [
            "不用 order statistics；前面的集中结论已经够了。",
            "先写成乘法形式，再开平方。",
            "结论写 Theta(sqrt(d)) 或 sqrt(d) 量级，不要追求有限 d 的精确公式。"
          ]
        },
        detailed_solution: {
          en: "With high probability, every j satisfies ||X_j-q||^2 = (d/6)(1+o(1)). Taking square roots gives ||X_j-q|| = sqrt(d/6)(1+o(1)). Since the number of points n is fixed, the minimum over j stays within the same narrow band. Thus R_(1)=Theta(sqrt(d)).",
          cn: "以高概率，对所有 j 都有 ||X_j-q||^2 = (d/6)(1+o(1))。开平方得到 ||X_j-q|| = sqrt(d/6)(1+o(1))。由于点数 n 固定，对 j 取最小值仍然落在同一窄区间内。因此 R_(1)=Theta(sqrt(d))。"
        }
      },
      {
        id: "hw1-p1-d",
        hw: "hw1",
        section: "Problem 1(d)",
        title: { en: "Explain why nearest and farthest distances become equal", cn: "解释最近与最远距离为何趋同" },
        original_excerpt: { en: "R_(1)/R_(n) -> 1", cn: "R_(1)/R_(n) -> 1" },
        problem_understanding: {
          en: "This asks for the punchline of distance concentration: in high dimensions, nearest and farthest random points have almost the same distance to the query.",
          cn: "这一问是距离集中现象的结论：高维中，随机点到查询点的最近距离和最远距离几乎一样。"
        },
        knowledge_points: {
          en: "Both the minimum and maximum of a fixed number of concentrated distances equal sqrt(d/6) times a vanishing relative error. Their ratio therefore tends to 1.",
          cn: "固定数量的集中距离中，最小值和最大值都等于 sqrt(d/6) 乘上一个相对误差趋零的因子，所以二者比值趋向 1。"
        },
        tips: {
          en: [
            "Define the farthest distance R_(n) alongside R_(1).",
            "Use the same high-probability band for min and max.",
            "State the KNN implication: distance contrast disappears."
          ],
          cn: [
            "把最远距离 R_(n) 和 R_(1) 一起定义清楚。",
            "对最小值和最大值使用同一个高概率窄区间。",
            "最后点出 KNN 含义：距离对比度消失。"
          ]
        },
        detailed_solution: {
          en: "From concentration, every distance can be written as sqrt(d/6)(1+delta_j), where the largest absolute delta_j among the fixed n points goes to 0 in probability. Therefore the nearest distance is sqrt(d/6)(1+delta_min) and the farthest distance is sqrt(d/6)(1+delta_max), with both errors going to 0. Their ratio is (1+delta_min)/(1+delta_max), which tends to 1. This is the curse-of-dimensionality warning for KNN: the nearest point no longer stands out much from the farthest point.",
          cn: "由集中性，每个距离都可写成 sqrt(d/6)(1+delta_j)，并且固定 n 个点中最大的 |delta_j| 依概率趋向 0。因此最近距离是 sqrt(d/6)(1+delta_min)，最远距离是 sqrt(d/6)(1+delta_max)，两个误差都趋向 0。比值为 (1+delta_min)/(1+delta_max)，所以趋向 1。这就是 KNN 的高维警告：最近点和最远点的距离差异会变得不明显。"
        }
      }
    ]
  },

  "naive-bayes": {
    tutorial: {
      cn: "生成式分类器：用 P(Y) P(X|Y) 建模联合分布；核心假设是给定 Y 时各特征条件独立 ⇒ P(X|Y) = ∏ⱼ P(Xⱼ|Y)。Gaussian NB 在共享方差下边界线性。",
      en: "Generative classifier: P(X,Y) = P(Y) P(X|Y) factored under conditional independence. Gaussian NB with shared variance ⇒ linear boundary."
    },
    code: [{
      title: { cn: "Gaussian NB 训练 + 预测", en: "Gaussian NB train + predict" },
      code: `import numpy as np
def gnb_fit(X, y):
    classes = np.unique(y)
    mu = np.array([X[y == c].mean(axis=0) for c in classes])
    var = np.array([X[y == c].var(axis=0) for c in classes]) + 1e-9
    prior = np.array([(y == c).mean() for c in classes])
    return classes, mu, var, prior

def gnb_predict(X, classes, mu, var, prior):
    # log P(y) + Σⱼ log N(xⱼ; μ_yⱼ, σ²_yⱼ)
    log_p = np.log(prior)[None, :]                                  # (1, C)
    log_lik = -0.5 * (((X[:, None, :] - mu) ** 2 / var)
                       + np.log(2 * np.pi * var)).sum(axis=2)        # (n, C)
    return classes[(log_p + log_lik).argmax(axis=1)]
`
    }],
    problems: [
      {
        id: "hw1-p2-a",
        hw: "hw1",
        section: "Problem 2(a)",
        title: { en: "Rewrite the Gaussian NB posterior as a sigmoid", cn: "把 Gaussian NB 后验写成 sigmoid 形式" },
        original_excerpt: { en: "P(y=+1)=p", cn: "P(y=+1)=p" },
        problem_understanding: {
          en: "This part is not yet using the Gaussian assumption. It only asks you to apply Bayes' rule and rewrite the binary posterior as one over one plus a likelihood-prior ratio.",
          cn: "这一问还没有真正用到高斯假设，只是让你用 Bayes 公式，把二分类后验整理成 1 除以 1 加一个先验-似然比。"
        },
        knowledge_points: {
          en: "For binary classes, posterior odds are prior odds times likelihood odds. A ratio r can always be written as exp(log r), which exposes the sigmoid shape.",
          cn: "二分类里，后验 odds 等于先验 odds 乘似然 odds。任意正比值 r 都可写成 exp(log r)，于是就出现 sigmoid 形状。"
        },
        tips: {
          en: [
            "Write the numerator p P(x|+1) first.",
            "Use total probability for the denominator.",
            "Divide by the +1 numerator to get 1/(1+ratio)."
          ],
          cn: [
            "先写分子 p P(x|+1)。",
            "分母用全概率公式展开。",
            "最后同除 +1 类的分子，得到 1/(1+ratio)。"
          ]
        },
        detailed_solution: {
          en: "Bayes' rule gives\nP(y=+1|x)=p P(x|+1)/(p P(x|+1)+(1-p)P(x|-1)).\nDivide the top and bottom by p P(x|+1):\nP(y=+1|x)=1/(1+((1-p)P(x|-1))/(p P(x|+1))).\nIf A=(1-p)P(x|-1) and B=p P(x|+1), the ratio is A/B, and the denominator can be written as 1+exp(log(A/B)).",
          cn: "由 Bayes 公式，\nP(y=+1|x)=p P(x|+1)/(p P(x|+1)+(1-p)P(x|-1))。\n分子分母同除 p P(x|+1)，得到\nP(y=+1|x)=1/(1+((1-p)P(x|-1))/(p P(x|+1)))。\n若 A=(1-p)P(x|-1)，B=p P(x|+1)，这个比值就是 A/B，因此分母也可写成 1+exp(log(A/B))。"
        }
      },
      {
        id: "hw1-p2-b",
        hw: "hw1",
        section: "Problem 2(b)",
        title: { en: "Combine independent one-dimensional Gaussians into N(mu,I)", cn: "把独立一维高斯合成 N(mu,I)" },
        original_excerpt: { en: "x_j|y ~ N(mu_j,1)", cn: "x_j|y ~ N(mu_j,1)" },
        problem_understanding: {
          en: "The problem asks you to translate conditional independence across features into the joint density of a multivariate Gaussian with diagonal identity covariance.",
          cn: "这一问要把“给定类别后特征相互独立”翻译成联合密度，并认出它就是协方差为 I 的多元高斯。"
        },
        knowledge_points: {
          en: "Naive Bayes factors P(x|y) into a product over features. A product of independent unit-variance Gaussian coordinates is exactly a multivariate Gaussian with covariance I.",
          cn: "Naive Bayes 把 P(x|y) 分解成各特征密度的乘积。独立、方差为 1 的高斯坐标相乘，就是协方差矩阵为 I 的多元高斯。"
        },
        tips: {
          en: [
            "Write the product over j explicitly.",
            "Group the exponential terms into ||x-mu||^2.",
            "Check the covariance: no cross terms means identity covariance."
          ],
          cn: [
            "先把关于 j 的乘积写出来。",
            "把指数里的平方项合并成 ||x-mu||^2。",
            "检查协方差：没有交叉项就对应单位协方差。"
          ]
        },
        detailed_solution: {
          en: "Given y, the coordinates are independent, so\nP(x|y=±1)=prod_j N(x_j; mu_{±,j},1).\nMultiplying the normalizing constants gives (2pi)^(-d/2), and adding the coordinate exponents gives exp(-1/2 sum_j (x_j-mu_{±,j})^2). This is the density of N(mu_±, I).",
          cn: "给定 y 后，各坐标独立，因此\nP(x|y=±1)=prod_j N(x_j; mu_{±,j},1)。\n归一化常数相乘得到 (2pi)^(-d/2)，指数中的各坐标平方项相加得到 exp(-1/2 sum_j (x_j-mu_{±,j})^2)。这正是 N(mu_±, I) 的密度。"
        }
      },
      {
        id: "hw1-p2-c",
        hw: "hw1",
        section: "Problem 2(c)",
        title: { en: "Show the Gaussian log-odds are linear in x", cn: "证明 Gaussian NB 的 log-odds 对 x 是线性的" },
        original_excerpt: { en: "log-ratio = w^T x + b", cn: "log-ratio = w^T x + b" },
        problem_understanding: {
          en: "This asks why equal-covariance Gaussian NB produces a linear decision score. The squared terms in x cancel when taking the log ratio.",
          cn: "这一问要说明为什么同协方差 Gaussian NB 会产生线性决策分数。关键是取 log ratio 后，x 的二次项会抵消。"
        },
        knowledge_points: {
          en: "For identity covariance, log N(x;mu_+,I)-log N(x;mu_-,I) is linear in x plus a constant. The prior contributes another constant term.",
          cn: "单位协方差下，log N(x;mu_+,I)-log N(x;mu_-,I) 是关于 x 的线性项加常数项。先验只再贡献一个常数。"
        },
        tips: {
          en: [
            "Expand ||x-mu||^2 only after taking logs.",
            "Watch the sign of the ratio you choose; the inverse ratio flips w and b.",
            "The decision boundary is where the linear score equals zero."
          ],
          cn: [
            "先取 log，再展开 ||x-mu||^2。",
            "注意你选的比值方向；倒数会让 w 和 b 同时变号。",
            "决策边界就是线性分数等于 0 的地方。"
          ]
        },
        detailed_solution: {
          en: "Use the positive-class log-odds score\ns(x)=log((p P(x|+1))/((1-p)P(x|-1))).\nWith identity covariance, the Gaussian constants cancel and\ns(x)=log(p/(1-p)) - 1/2||x-mu_+||^2 + 1/2||x-mu_-||^2.\nAfter expansion, the x^T x terms cancel, leaving\ns(x)=(mu_+-mu_-)^T x + log(p/(1-p)) + (||mu_-||^2-||mu_+||^2)/2.\nThus s(x)=w^T x+b with w=mu_+-mu_- and the displayed constant b. If using the inverse ratio A/B from part (a), the same expression appears with the opposite sign.",
          cn: "定义正类 log-odds 分数\ns(x)=log((p P(x|+1))/((1-p)P(x|-1)))。\n在单位协方差下，高斯常数会抵消，\ns(x)=log(p/(1-p)) - 1/2||x-mu_+||^2 + 1/2||x-mu_-||^2。\n展开后 x^T x 项抵消，剩下\ns(x)=(mu_+-mu_-)^T x + log(p/(1-p)) + (||mu_-||^2-||mu_+||^2)/2。\n因此 s(x)=w^T x+b，其中 w=mu_+-mu_-，b 为上面的常数。若沿用 part (a) 的反向比值 A/B，则整体符号相反。"
        }
      },
      {
        id: "hw1-p2-d",
        hw: "hw1",
        section: "Problem 2(d)",
        title: { en: "Write one posterior formula for both labels", cn: "为两个标签写统一后验公式" },
        original_excerpt: { en: "P(y|x) using y,w,b", cn: "P(y|x) using y,w,b" },
        problem_understanding: {
          en: "The problem wants a compact expression that covers y=+1 and y=-1 at once, instead of writing two separate posterior formulas.",
          cn: "这一问要用一个紧凑公式同时覆盖 y=+1 和 y=-1，而不是分别写两条后验公式。"
        },
        knowledge_points: {
          en: "If s=w^T x+b and labels are ±1, then P(+1|x)=sigma(s) and P(-1|x)=sigma(-s). Combining them gives P(y|x)=sigma(y s).",
          cn: "若 s=w^T x+b 且标签为 ±1，则 P(+1|x)=sigma(s)，P(-1|x)=sigma(-s)。合并后就是 P(y|x)=sigma(y s)。"
        },
        tips: {
          en: [
            "Let s=w^T x+b to keep the notation short.",
            "Use sigma(-s)=1-sigma(s).",
            "Check both y=+1 and y=-1 after writing the combined expression."
          ],
          cn: [
            "先令 s=w^T x+b，公式会短很多。",
            "使用 sigma(-s)=1-sigma(s)。",
            "写完统一表达式后，分别代 y=+1 和 y=-1 检查。"
          ]
        },
        detailed_solution: {
          en: "Let s=w^T x+b be the positive-class score from the previous part. Then P(y=+1|x)=sigma(s). The negative-class posterior is 1-sigma(s), which equals sigma(-s). Since y is either +1 or -1, both cases are summarized by\nP(y|x)=sigma(y(w^T x+b)).",
          cn: "令 s=w^T x+b 为上一问得到的正类分数。则 P(y=+1|x)=sigma(s)。负类后验是 1-sigma(s)，也就是 sigma(-s)。因为 y 只取 +1 或 -1，所以两种情况可统一写为\nP(y|x)=sigma(y(w^T x+b))。"
        }
      },
      {
        id: "hw1-p2-e",
        hw: "hw1",
        section: "Problem 2(e)",
        title: { en: "Classify the midpoint in a one-dimensional GNB model", cn: "判断一维 Gaussian NB 中点的类别" },
        original_excerpt: { en: "x=1; N(0,1) vs N(2,1)", cn: "x=1; N(0,1) vs N(2,1)" },
        problem_understanding: {
          en: "The test point lies exactly between two class means with equal priors and equal variances, so the question is about symmetry.",
          cn: "测试点正好位于两个类别均值的中点，且先验和方差相同，所以这一问本质上考对称性。"
        },
        knowledge_points: {
          en: "With equal priors, compare likelihoods. A unit-variance Gaussian centered at 0 and one centered at 2 assign the same density to x=1.",
          cn: "先验相等时，只需比较似然。均值为 0 和 2、方差相同的高斯，在 x=1 处给出的密度相同。"
        },
        tips: {
          en: [
            "Do not worry about the normalization constant; it is the same for both classes.",
            "Compute squared distance to each mean.",
            "A tie means both classes are equally likely."
          ],
          cn: [
            "不用担心归一化常数；两类的常数相同。",
            "分别计算 x 到两个均值的平方距离。",
            "似然打平时，两个类别后验相同。"
          ]
        },
        detailed_solution: {
          en: "For y=+1, the squared distance from x=1 to the mean 0 is 1. For y=-1, the squared distance from x=1 to the mean 2 is also 1. The priors are equal and the variances are equal, so the two posterior numerators match. The classifier has a tie: both classes are equally likely.",
          cn: "对 y=+1，x=1 到均值 0 的平方距离为 1。对 y=-1，x=1 到均值 2 的平方距离也为 1。两类先验相等、方差相等，所以后验分子完全相同。分类器打平：两个类别概率相同。"
        }
      }
    ]
  },

  "linear-regression": {
    tutorial: {
      cn: "MSE 最小化 → 闭式解 w* = (XᵀX)⁻¹Xᵀy。考点：闭式解存在条件、共线性、GD 收敛到最小范数解。",
      en: "Minimize MSE; closed form w* = (XᵀX)⁻¹Xᵀy. Exam: existence conditions, collinearity, GD converges to min-norm solution."
    },
    code: [{
      title: { cn: "正规方程 + GD", en: "Normal equation + GD" },
      code: `import numpy as np

def linreg_closed_form(X, y):
    return np.linalg.solve(X.T @ X, X.T @ y)

def linreg_gd(X, y, eta=1e-3, n_iter=1000):
    w = np.zeros(X.shape[1])
    for _ in range(n_iter):
        w -= eta * X.T @ (X @ w - y)
    return w
`
    }],
    problems: [
      {
        id: "hw1-p3-a",
        hw: "hw1",
        section: "Problem 3(a)",
        title: { en: "Use full row rank to show Xw=y is solvable", cn: "用满行秩证明 Xw=y 有解" },
        original_excerpt: { en: "rank(X)=n, X in R^{nxd}", cn: "rank(X)=n, X in R^{nxd}" },
        problem_understanding: {
          en: "The question asks why every target vector y in R^n can be represented as Xw when X has full row rank.",
          cn: "这一问要说明：当 X 满行秩时，任意 y in R^n 都能写成 Xw。"
        },
        knowledge_points: {
          en: "Rank n means the column space of X has dimension n. Since the column space sits inside R^n, it must be all of R^n, so every y is reachable.",
          cn: "rank 为 n 表示 X 的列空间维度为 n。列空间本来就在 R^n 中，因此它只能等于整个 R^n，所以任意 y 都可达到。"
        },
        tips: {
          en: [
            "Focus on the column space of X, not the row space.",
            "Use the fact that an n-dimensional subspace of R^n is R^n.",
            "Once y is in Col(X), the existence of w follows by definition."
          ],
          cn: [
            "重点看 X 的列空间，而不是行空间。",
            "用 n 维子空间若处在 R^n 中就等于 R^n 这个事实。",
            "一旦 y 属于 Col(X)，存在 w 就是列空间定义。"
          ]
        },
        detailed_solution: {
          en: "Because rank(X)=n, the image of the linear map w -> Xw has dimension n. This image is a subspace of R^n, and the only n-dimensional subspace of R^n is R^n itself. Therefore y belongs to Col(X) for every y in R^n. By the definition of column space, there is at least one w with Xw=y.",
          cn: "因为 rank(X)=n，线性映射 w -> Xw 的像空间维度为 n。这个像空间是 R^n 的子空间，而 R^n 中唯一的 n 维子空间就是 R^n 本身。所以任意 y in R^n 都属于 Col(X)。根据列空间定义，存在至少一个 w 使 Xw=y。"
        }
      },
      {
        id: "hw1-p3-b",
        hw: "hw1",
        section: "Problem 3(b)",
        title: { en: "Construct an exact solution from the reduced SVD", cn: "用 reduced SVD 构造精确解" },
        original_excerpt: { en: "X=U Sigma V^T", cn: "X=U Sigma V^T" },
        problem_understanding: {
          en: "The problem gives the SVD pieces and asks you to build a concrete w that maps to y.",
          cn: "题目给了 SVD 的各个部分，要求你显式构造一个能映射到 y 的 w。"
        },
        knowledge_points: {
          en: "For full row rank X, the reduced SVD has invertible Sigma. The pseudoinverse action is V Sigma^{-1} U^T, and applying X to it gives the identity on R^n.",
          cn: "对满行秩 X，reduced SVD 中的 Sigma 可逆。伪逆作用是 V Sigma^{-1} U^T，把 X 乘上它会在 R^n 上得到恒等映射。"
        },
        tips: {
          en: [
            "Let w*=V Sigma^{-1} U^T y.",
            "Use V^T V=I for the reduced right singular vectors.",
            "Use U U^T=I because U is square orthogonal here."
          ],
          cn: [
            "直接设 w*=V Sigma^{-1} U^T y。",
            "用 reduced 右奇异向量满足 V^T V=I。",
            "这里 U 是方阵正交矩阵，所以 U U^T=I。"
          ]
        },
        detailed_solution: {
          en: "Choose w*=V Sigma^{-1} U^T y. Then\nXw* = U Sigma V^T V Sigma^{-1} U^T y = U Sigma Sigma^{-1} U^T y = U U^T y = y.\nSo this w* is an exact interpolating solution. It is also the standard pseudoinverse solution X^+ y.",
          cn: "取 w*=V Sigma^{-1} U^T y。则\nXw* = U Sigma V^T V Sigma^{-1} U^T y = U Sigma Sigma^{-1} U^T y = U U^T y = y。\n所以这个 w* 是一个精确插值解，也就是标准伪逆解 X^+ y。"
        }
      },
      {
        id: "hw1-p3-c",
        hw: "hw1",
        section: "Problem 3(c)",
        title: { en: "Show exact interpolators globally minimize squared loss", cn: "证明精确插值解全局最小化平方损失" },
        original_excerpt: { en: "L(w)=1/2 ||Xw-y||^2", cn: "L(w)=1/2 ||Xw-y||^2" },
        problem_understanding: {
          en: "The question is asking you to connect zero residual to global optimality for a nonnegative loss.",
          cn: "这一问要把“残差为零”和“全局最优”联系起来，因为平方损失本身非负。"
        },
        knowledge_points: {
          en: "A squared norm is always nonnegative. If any feasible w makes the residual zero, then the minimum possible loss value is exactly zero.",
          cn: "平方范数总是非负。如果某个 w 让残差为零，那么损失的最小可能值就是 0。"
        },
        tips: {
          en: [
            "Begin with L(w)>=0 for every w.",
            "Plug in Xw=y to get L(w)=0.",
            "A nonnegative function attaining 0 is globally minimized there."
          ],
          cn: [
            "先写出对任意 w 都有 L(w)>=0。",
            "再代入 Xw=y 得到 L(w)=0。",
            "非负函数一旦达到 0，就已经全局最小。"
          ]
        },
        detailed_solution: {
          en: "For every w, L(w)=1/2||Xw-y||^2 is at least 0. If w satisfies Xw=y, then the residual is zero and L(w)=0. No value below 0 is possible, so every exact solution is a global minimizer and the minimum empirical loss is 0.",
          cn: "对任意 w，L(w)=1/2||Xw-y||^2 都大于等于 0。若 w 满足 Xw=y，则残差为零，L(w)=0。损失不可能小于 0，所以每个精确解都是全局最优解，最小经验损失为 0。"
        }
      },
      {
        id: "hw1-p3-d",
        hw: "hw1",
        section: "Problem 3(d)",
        title: { en: "Explain why gradient descent from zero finds the min-norm solution", cn: "解释零初始化 GD 为什么收敛到最小范数解" },
        original_excerpt: { en: "w_0=0; min ||w||", cn: "w_0=0; min ||w||" },
        problem_understanding: {
          en: "This longer part asks you to describe the geometry of all exact solutions and then show that gradient descent stays in the one subspace that selects the minimum-norm member.",
          cn: "这一问较长：先描述所有精确解的几何结构，再说明 GD 始终留在会选出最小范数解的那个子空间里。"
        },
        knowledge_points: {
          en: "All solutions differ by nullspace vectors. The row space Range(X^T) is orthogonal to Ker(X). Starting at zero and updating by X^T times a residual keeps every iterate in Range(X^T), so the limit cannot contain a nullspace component.",
          cn: "所有解之间只差一个 nullspace 向量。Range(X^T) 与 Ker(X) 正交。零初始化时，每步更新都是 X^T 乘残差，因此所有迭代都留在 Range(X^T)，极限不会带 nullspace 分量。"
        },
        tips: {
          en: [
            "Write any solution as one chosen solution plus a vector in Ker(X).",
            "Use Pythagoras after separating row-space and nullspace components.",
            "Track the subspace of the updates, not only the loss value."
          ],
          cn: [
            "把任意解写成某个选定解加上 Ker(X) 中的向量。",
            "分解成 row-space 与 nullspace 分量后，用勾股定理。",
            "除了看 loss，也要追踪每次更新所在的子空间。"
          ]
        },
        detailed_solution: {
          en: "If w and w_inf both solve Xw=y, then X(w-w_inf)=0, so w-w_inf is in Ker(X). Thus every exact solution equals w_inf+v for some nullspace vector v.\nThe minimum-norm solution lies in Range(X^T), which is orthogonal to Ker(X). Hence ||w_inf+v||^2=||w_inf||^2+||v||^2, so the norm is minimized uniquely when v=0.\nGradient descent updates by -eta X^T(Xw_t-y), a vector in Range(X^T). Since w_0=0 is also in Range(X^T), every iterate remains in Range(X^T). If the iterates converge to an exact solution, that limit is both in Range(X^T) and in the solution set, so it must be the unique minimum-norm solution.",
          cn: "若 w 与 w_inf 都满足 Xw=y，则 X(w-w_inf)=0，所以 w-w_inf 属于 Ker(X)。因此任意精确解都可写成 w_inf+v，其中 v 是 nullspace 向量。\n最小范数解位于 Range(X^T)，而 Range(X^T) 与 Ker(X) 正交。因此 ||w_inf+v||^2=||w_inf||^2+||v||^2，范数只在 v=0 时最小，且唯一。\nGD 每步更新为 -eta X^T(Xw_t-y)，该向量属于 Range(X^T)。由于 w_0=0 也在 Range(X^T)，所有迭代都留在 Range(X^T)。若迭代收敛到某个精确解，那么该极限既在 Range(X^T) 又在解集中，只能是唯一的最小范数解。"
        }
      },
      {
        id: "hw1-p3-e",
        hw: "hw1",
        section: "Problem 3(e)",
        title: { en: "Fit the one-parameter line yhat=wx to two points", cn: "用一个参数 w 拟合两点线性回归" },
        original_excerpt: { en: "D={(1,2),(2,4)}", cn: "D={(1,2),(2,4)}" },
        problem_understanding: {
          en: "The problem is a small squared-loss minimization for a line constrained to pass through the origin.",
          cn: "这一问是一个很小的平方损失最小化问题，模型是一条必须过原点的直线。"
        },
        knowledge_points: {
          en: "For one-parameter least squares, expand the loss, differentiate with respect to w, and set the derivative to zero. Here the data already lie exactly on y=2x.",
          cn: "单参数最小二乘可以展开损失，对 w 求导并令导数为 0。本题两点本身就在 y=2x 上。"
        },
        tips: {
          en: [
            "Write the loss as (2-w)^2+(4-2w)^2.",
            "Differentiate before expanding if that feels cleaner.",
            "Sanity-check the answer by seeing whether both residuals vanish."
          ],
          cn: [
            "把损失写成 (2-w)^2+(4-2w)^2。",
            "若觉得更清楚，可以不完全展开就直接求导。",
            "最后检查两个残差是否都为零。"
          ]
        },
        detailed_solution: {
          en: "The squared loss is L(w)=(2-w)^2+(4-2w)^2. Differentiating gives L'(w)=2(w-2)+4(2w-4)=10w-20. Setting this to zero yields w=2. With w=2, both points are fit exactly, so this is the minimizer.",
          cn: "平方损失为 L(w)=(2-w)^2+(4-2w)^2。求导得 L'(w)=2(w-2)+4(2w-4)=10w-20。令其为 0，得到 w=2。当 w=2 时两个点都被精确拟合，所以它就是最优解。"
        }
      }
    ]
  },

  "logistic-regression": {
    tutorial: {
      cn: "Sigmoid + NLL（交叉熵）。决策边界仍线性。考点：Hessian PSD ⇒ 凸；为什么用 log loss 而非 MSE。",
      en: "Sigmoid + NLL. Linear decision boundary. Convex (PSD Hessian). Use log loss for classification, not MSE."
    },
    code: [{
      title: { cn: "logistic + GD", en: "logistic + GD" },
      code: `import numpy as np
def sigmoid(z): return 1.0 / (1.0 + np.exp(-z))

def logreg_gd(X, y, eta=1e-2, n_iter=1000):
    # y ∈ {0, 1}
    w = np.zeros(X.shape[1])
    for _ in range(n_iter):
        p = sigmoid(X @ w)
        w -= eta * X.T @ (p - y)
    return w
`
    }],
    problems: [
      {
        id: "hw1-p4-a",
        hw: "hw1",
        section: "Problem 4(a)",
        title: { en: "Derive the logistic-loss Hessian and prove it is PSD", cn: "推导 logistic 损失 Hessian 并证明半正定" },
        original_excerpt: { en: "H = X^T B X", cn: "H = X^T B X" },
        problem_understanding: {
          en: "The problem asks you to differentiate binary cross-entropy twice and then recognize the Hessian as a weighted sum of outer products.",
          cn: "这一问要对二元交叉熵求二阶导，并把 Hessian 认成外积的非负加权和。"
        },
        knowledge_points: {
          en: "For z_i=w^T x_i and p_i=sigma(z_i), the scalar second derivative is p_i(1-p_i). Stacking rows gives H=X^T B X with B=diag(p_i(1-p_i)). A sandwich X^T B X is PSD when B has nonnegative diagonal entries.",
          cn: "令 z_i=w^T x_i、p_i=sigma(z_i)，单样本对 z_i 的二阶导为 p_i(1-p_i)。堆叠后 H=X^T B X，其中 B=diag(p_i(1-p_i))。当 B 的对角元非负时，X^T B X 半正定。"
        },
        tips: {
          en: [
            "First compute the derivative with respect to z_i, then apply the chain rule to w.",
            "Keep X as rows x_i^T so the final shape is d by d.",
            "For PSD, test v^T H v instead of inspecting entries."
          ],
          cn: [
            "先对 z_i 求导，再用链式法则转到 w。",
            "把 X 记成每行是 x_i^T，这样最终 H 的形状是 d by d。",
            "证明 PSD 时，不要看元素，直接检验 v^T H v。"
          ]
        },
        detailed_solution: {
          en: "For one example, let z_i=w^T x_i and p_i=sigma(z_i). The derivative of the cross-entropy loss with respect to z_i is p_i-y_i, and the second derivative is p_i(1-p_i). By the chain rule, the contribution to the Hessian in w is p_i(1-p_i)x_i x_i^T.\nSumming examples gives H=sum_i p_i(1-p_i)x_i x_i^T. With X storing x_i^T as rows and B=diag(p_i(1-p_i)), this is H=X^T B X.\nFor any vector v, v^T H v=(Xv)^T B (Xv)=sum_i p_i(1-p_i)(x_i^T v)^2 >= 0, so H is positive semidefinite.",
          cn: "对单个样本，令 z_i=w^T x_i，p_i=sigma(z_i)。交叉熵损失对 z_i 的一阶导为 p_i-y_i，二阶导为 p_i(1-p_i)。由链式法则，它对 w 的 Hessian 贡献是 p_i(1-p_i)x_i x_i^T。\n对所有样本求和，H=sum_i p_i(1-p_i)x_i x_i^T。若 X 的每行是 x_i^T，且 B=diag(p_i(1-p_i))，则 H=X^T B X。\n对任意向量 v，v^T H v=(Xv)^T B (Xv)=sum_i p_i(1-p_i)(x_i^T v)^2 >= 0，因此 H 半正定。"
        }
      },
      {
        id: "hw1-p4-b",
        hw: "hw1",
        section: "Problem 4(b)",
        title: { en: "Use the Hessian to prove logistic loss is convex", cn: "用 Hessian 证明 logistic 损失凸" },
        original_excerpt: { en: "local minimum = global minimum", cn: "local minimum = global minimum" },
        problem_understanding: {
          en: "This part asks you to turn the PSD Hessian result into convexity, then use a basic property of convex functions.",
          cn: "这一问要把上一问的 Hessian 半正定结论转成凸性，再使用凸函数的基本最优性性质。"
        },
        knowledge_points: {
          en: "A twice-differentiable function with PSD Hessian everywhere is convex. For a convex function, a local minimum cannot be merely local; the convexity inequality rules out a lower point elsewhere.",
          cn: "二阶可导函数若 Hessian 处处半正定，则函数凸。对凸函数而言，局部最小不可能只是局部的；凸性不等式会排除远处存在更低点的情况。"
        },
        tips: {
          en: [
            "Cite the PSD Hessian from the previous part.",
            "Do not try to solve for the minimizer explicitly.",
            "To justify local implies global, use a line segment from the local point to any other point."
          ],
          cn: [
            "直接引用上一问的 Hessian 半正定结论。",
            "不需要显式求出最优解。",
            "说明局部最小推出全局最小时，可考虑从局部点到任意点的线段。"
          ]
        },
        detailed_solution: {
          en: "From part (a), the Hessian of the logistic loss is PSD for every w. Therefore the logistic loss is convex. Now suppose w0 is a local minimum but there is another point u with L(u)<L(w0). For small t in (0,1), convexity gives L((1-t)w0+t u) <= (1-t)L(w0)+tL(u) < L(w0), and this point can be made arbitrarily close to w0. That contradicts local minimality. Hence every local minimum is global.",
          cn: "由 part (a)，logistic 损失的 Hessian 对任意 w 都半正定，因此 logistic 损失是凸函数。假设 w0 是局部最小点，但存在某个 u 使 L(u)<L(w0)。对很小的 t in (0,1)，凸性给出 L((1-t)w0+t u) <= (1-t)L(w0)+tL(u) < L(w0)，而这个点可以任意接近 w0。这与局部最小矛盾。因此任意局部最小都是全局最小。"
        }
      }
    ]
  },

  "svm": {
    tutorial: {
      cn: "最大间隔分类器：1/2‖w‖² s.t. yᵢ(wᵀxᵢ+b)≥1。Soft margin 加 ξᵢ + C 项，hinge loss = max(0, 1 - yf(x))。对偶仅依赖 xᵢᵀxⱼ ⇒ 可用核技巧。",
      en: "Max-margin classifier; soft-margin adds slack ξᵢ. Hinge loss max(0, 1-yf(x)). Dual depends only on inner products → kernel trick."
    },
    code: [{
      title: { cn: "Soft-margin (sklearn) + hinge loss", en: "Soft-margin (sklearn) + hinge" },
      code: `import numpy as np
from sklearn.svm import LinearSVC, SVC

# 线性 soft-margin SVM
clf = LinearSVC(C=1.0, loss='hinge')
clf.fit(X, y)

# RBF kernel SVM
clf_rbf = SVC(kernel='rbf', gamma=0.5, C=1.0)
clf_rbf.fit(X, y)

# Hinge loss 手算
def hinge(y, fx):
    return np.maximum(0, 1 - y * fx).mean()
`
    }],
    problems: [
      {
        id: "hw2-1-1", hw: "hw2", section: "§1.1",
        title: { cn: "T/F · 全体训练样本平移同一常数向量 → SVM 结果改变",
                 en: "T/F: translating all samples by a constant changes SVM result" },
        solution: {
          cn: "True。Hard-margin SVM 没有截距 b 时（或带 b 但需要重新拟合），平移会改变到原点的距离从而影响 ‖w‖²。带可学截距 b 的标准 SVM 平移会通过 b 自动吸收，但题设把所有 xᵢ 替换 → wᵀx+b 变成 wᵀ(x-c)+b = wᵀx + (b - wᵀc)，等价拟合一个新的 b'，分类结果不变。题目期望答案视约定而定，UIUC 板书一般答 False（带 b 的 SVM 对平移不变）。",
          en: "Depends: with bias term b, SVM is translation-invariant (False). Without b, the result changes (True). Course convention: SVM has b → False."
        }
      },
      {
        id: "hw2-1-2", hw: "hw2", section: "§1.2",
        title: { cn: "T/F · 核技巧让我们在不显式映射的情况下计算高维内积",
                 en: "T/F: kernel trick computes high-dim inner products without explicit map" },
        solution: { cn: "True。这正是 kernel 的定义：k(x,x') = φ(x)ᵀφ(x')，无需算 φ。", en: "True — that's the kernel trick by definition." }
      },
      {
        id: "hw2-1-3", hw: "hw2", section: "§1.3",
        title: { cn: "T/F · 决策树长到完全无限制 → 测试误差降低、训练误差升高",
                 en: "T/F: unrestricted tree decreases test error, increases training" },
        solution: { cn: "False，正好相反：训练误差降到 0，但方差增大、测试误差通常升高（过拟合）。", en: "False — it's the opposite: training error → 0, test error rises (overfit)." }
      },
      {
        id: "hw2-1-4", hw: "hw2", section: "§1.4",
        title: { cn: "T/F · PCA 找正交方向最大化投影方差",
                 en: "T/F: PCA finds orthogonal directions maximizing projected variance" },
        solution: { cn: "True，这就是 PCA 的定义。", en: "True — this is the PCA definition." }
      },
      {
        id: "hw2-2", hw: "hw2", section: "§2",
        title: { cn: "Soft-margin SVM 对偶推导",
                 en: "Soft-margin SVM dual derivation" },
        solution: {
          cn: "构造 Lagrangian L = (1/2)‖w‖² + CΣξᵢ - Σαᵢ[yᵢ(wᵀxᵢ+b) - 1 + ξᵢ] - Σμᵢξᵢ。对 w, b, ξ 求导置零：w = Σαᵢyᵢxᵢ；Σαᵢyᵢ = 0；C - αᵢ - μᵢ = 0 ⇒ μᵢ ≥ 0 ⇒ αᵢ ≤ C。代回得：max_α Σαᵢ - (1/2)ΣᵢΣⱼαᵢαⱼyᵢyⱼxᵢᵀxⱼ s.t. 0 ≤ αᵢ ≤ C, Σαᵢyᵢ = 0。与 hard-margin 相比唯一变化是 αᵢ 上界变成 C（box constraint）。",
          en: "Lagrangian → KKT gives same dual objective as hard-margin but with box constraint 0 ≤ αᵢ ≤ C from C − αᵢ − μᵢ = 0."
        }
      },
      {
        id: "hw2-3-1", hw: "hw2", section: "§3.1",
        title: { cn: "硬间隔 SVM 用对偶 α̂ 写预测 f(x) = ŵᵀx",
                 en: "Hard-margin prediction in α̂ form" },
        solution: { cn: "ŵ = Σ α̂ᵢ yᵢ xᵢ ⇒ f(x) = Σ α̂ᵢ yᵢ xᵢᵀ x。", en: "f(x) = Σ α̂ᵢ yᵢ xᵢᵀx." }
      },
      {
        id: "hw2-3-2", hw: "hw2", section: "§3.2",
        title: { cn: "RBF 核下 fσ(x) 的表达式",
                 en: "fσ(x) under RBF kernel" },
        solution: { cn: "用 k(xᵢ,x) = exp(-‖xᵢ-x‖²/(2σ²)) 替换内积：fσ(x) = Σ α̂ᵢ yᵢ exp(-‖xᵢ-x‖²/(2σ²))。", en: "fσ(x) = Σ α̂ᵢ yᵢ exp(-‖xᵢ-x‖²/(2σ²))." }
      },
      {
        id: "hw2-3-3", hw: "hw2", section: "§3.3",
        title: { cn: "σ→0 时 RBF SVM ≈ 1-NN（对支持向量集）",
                 en: "RBF SVM with σ→0 reduces to 1-NN over support vectors" },
        solution: {
          cn: "把 S 拆成 T (距 x 最近的支持向量) 和 S\\T。对 i ∈ T：exp(-ρ²/(2σ²)) 是公因子；对 i ∉ T：exp(-‖xᵢ-x‖²/(2σ²)) 比 ρ² 衰减更快，比值 → 0。除以公因子取极限：fσ(x)/exp(-ρ²/(2σ²)) → Σᵢ∈T α̂ᵢyᵢ。等价于只看最近支持向量的（加权）标签。",
          en: "Split S into T (closest SVs) and S\\T. The latter contributes terms exponentially smaller than ρ², so the ratio goes to 0. Limit equals Σᵢ∈T α̂ᵢyᵢ — essentially 1-NN over the SVs."
        }
      },
      {
        id: "hw2-3-4", hw: "hw2", section: "§3.4",
        title: { cn: "二次核 k(x,x') = (1+xᵀx')² 的显式特征映射 φ(x)",
                 en: "Explicit feature map φ(x) for quadratic kernel" },
        solution: {
          cn: "展开 (1+xᵀx')² = 1 + 2xᵀx' + (xᵀx')²，每项对应 φ(x) 的分量：常数项 1、线性项 √2 xᵢ、二次项 xᵢ² 和 √2 xᵢxⱼ (i<j)。即 φ(x) = (1, √2 x₁,...,√2 xd, x₁², x₂²,...,xd², √2 x₁x₂,..., √2 xd-1xd)。维数 1 + d + d(d+1)/2。",
          en: "(1 + xᵀx')² expands to constant 1, terms 2 xᵀx', and (xᵀx')². Map: φ(x) = (1, √2 xᵢ, xᵢ², √2 xᵢxⱼ). Dimension 1 + d + d(d+1)/2."
        }
      }
    ]
  },

  "kernel-methods": {
    tutorial: {
      cn: "核技巧：k(x,x') = φ(x)ᵀφ(x')，让你在不显式构造 φ 的情况下做高维线性。常见 Polynomial (1+xᵀx')ᵈ 与 RBF exp(-γ‖x-x'‖²)。",
      en: "Kernel trick: k(x,x') = φ(x)ᵀφ(x'). Use polynomial or RBF; γ controls RBF locality."
    },
    code: [{
      title: { cn: "RBF / Polynomial kernel", en: "RBF / Polynomial kernel" },
      code: `import numpy as np
def rbf_kernel(X, Y, gamma):
    sq = np.sum(X**2, 1)[:, None] - 2*X@Y.T + np.sum(Y**2, 1)[None, :]
    return np.exp(-gamma * sq)

def poly_kernel(X, Y, d=3, c=1):
    return (X @ Y.T + c) ** d
`
    }],
    problems: []
  },

  // ─────────────────── Trees & Ensemble ───────────────────
  "decision-trees": {
    tutorial: {
      cn: "递归划分输入空间。每次分裂选最大化 Information Gain 的 (特征, 阈值)。考点：手算 entropy/IG，过拟合-剪枝。",
      en: "Recursive axis-aligned splits chosen by max IG. Exam: hand compute entropy/IG, overfit/prune."
    },
    code: [{
      title: { cn: "手算 IG（NumPy）", en: "Hand-compute IG (NumPy)" },
      code: `import numpy as np
def entropy(y):
    _, c = np.unique(y, return_counts=True)
    p = c / c.sum()
    return -(p * np.log2(p + 1e-12)).sum()

def info_gain(y, y_left, y_right):
    n, nl, nr = len(y), len(y_left), len(y_right)
    return entropy(y) - (nl/n)*entropy(y_left) - (nr/n)*entropy(y_right)
`
    }],
    problems: [
      {
        id: "hw2-4-1", hw: "hw2", section: "§4.1",
        title: { cn: "6 点二维数据集求样本熵 I(D)",
                 en: "6-point dataset entropy I(D)" },
        solution: {
          cn: "数蓝/绿点比例代入 -p log₂ p - (1-p) log₂(1-p)。例如 3:3 ⇒ I=1；4:2 ⇒ I = -(2/3)log₂(2/3) - (1/3)log₂(1/3) ≈ 0.918。",
          en: "Count class proportions and apply -Σ p log₂ p. 3:3 → 1, 4:2 → ≈0.918, etc."
        }
      },
      {
        id: "hw2-4-2", hw: "hw2", section: "§4.2",
        title: { cn: "求第一刀最大 IG 的分裂规则",
                 en: "Best first split: max IG" },
        solution: {
          cn: "枚举每个 (xⱼ ≥ τ)，τ 取整数；对每种分裂算左右子节点熵 + 加权和；取 IG = I(D) - 加权熵 最大的那刀。手算时整理所有候选分裂，比较 IG 值即可。",
          en: "Enumerate (xⱼ ≥ τ) over integer thresholds; pick split with max IG. Show each child's entropy and the weighted sum."
        }
      },
      {
        id: "hw2-4-3", hw: "hw2", section: "§4.3",
        title: { cn: "对子节点继续递归切分",
                 en: "Recursive split of child nodes" },
        solution: {
          cn: "对每个非纯子节点重复 §4.2 的流程：枚举特征+阈值，找最大 IG。直到节点纯净或所有 IG = 0。",
          en: "Repeat §4.2 on each impure child until pure or no IG > 0."
        }
      }
    ]
  },

  "bagging": {
    tutorial: {
      cn: "Bootstrap aggregating：有放回抽样训练 T 个模型，平均预测。降方差，偏差几乎不变。Random Forest 是 bagging + 特征随机。",
      en: "Bootstrap → train T models → average. Variance reduction without bias change. RF = bagging + feature subsampling."
    },
    code: [{
      title: { cn: "Bagging from scratch", en: "Bagging from scratch" },
      code: `import numpy as np
from sklearn.tree import DecisionTreeClassifier

def bagging_fit(X, y, T=20, base=None):
    n = len(X)
    models = []
    for _ in range(T):
        idx = np.random.choice(n, n, replace=True)
        m = (base or DecisionTreeClassifier()).fit(X[idx], y[idx])
        models.append(m)
    return models

def bagging_predict(models, X):
    preds = np.array([m.predict(X) for m in models])
    return np.array([np.bincount(preds[:, i]).argmax() for i in range(X.shape[0])])
`
    }],
    problems: [
      {
        id: "hw2-5-1", hw: "hw2", section: "§5.1",
        title: { cn: "简述 Bagging vs Boosting 的核心区别",
                 en: "Bagging vs Boosting: main differences" },
        solution: {
          cn: "Bagging 并行 · bootstrap 抽样独立训练 · 平均 → 降方差；模型权重相等。Boosting 串行 · 后续模型关注前面错分样本（重赋权） → 降偏差；模型权重不等（按错误率加权）。Boosting 对噪声更敏感。",
          en: "Bagging: parallel, bootstrap, equal-weight average → ↓variance. Boosting: sequential, reweight hard examples, weighted vote → ↓bias, more noise sensitive."
        }
      }
    ]
  },

  "boosting": {
    tutorial: {
      cn: "AdaBoost：序贯加权弱分类器 Fₜ = Fₜ₋₁ + αₜfₜ，最小化指数损失。最优系数 α* = (1/2) ln((1-ε)/ε)，正确率高的弱分类器权重更大。",
      en: "AdaBoost: sequentially add weak classifiers minimizing exp loss. Optimal α* = (1/2) ln((1-ε)/ε)."
    },
    code: [{
      title: { cn: "AdaBoost 主循环", en: "AdaBoost main loop" },
      code: `import numpy as np
from sklearn.tree import DecisionTreeClassifier

def adaboost(X, y, T=50):
    n = len(X)
    w = np.ones(n) / n
    models, alphas = [], []
    for _ in range(T):
        h = DecisionTreeClassifier(max_depth=1).fit(X, y, sample_weight=w)
        pred = h.predict(X)
        eps = (w * (pred != y)).sum() / w.sum()
        if eps >= 0.5: break
        a = 0.5 * np.log((1 - eps) / max(eps, 1e-12))
        w = w * np.exp(-a * y * pred)
        w /= w.sum()
        models.append(h); alphas.append(a)
    return models, alphas
`
    }],
    problems: [
      {
        id: "hw2-5-2a", hw: "hw2", section: "§5.2(a)",
        title: { cn: "推导：L(Fₜ) = (1/m) Σ wᵢ exp(-αₜ yᵢ fₜ(xᵢ))，wᵢ = exp(-yᵢFₜ₋₁(xᵢ))",
                 en: "Show L decomposes via weights wᵢ" },
        solution: {
          cn: "L = (1/m) Σ exp(-yᵢ(Fₜ₋₁(xᵢ) + αₜfₜ(xᵢ))) = (1/m) Σ exp(-yᵢFₜ₋₁) · exp(-αₜyᵢfₜ) = (1/m) Σ wᵢ exp(-αₜyᵢfₜ)。wᵢ 携带了 Fₜ₋₁ 在样本 i 上的‘错误程度’。",
          en: "Factor exp(-yᵢ(Fₜ₋₁ + αfₜ)) = wᵢ · exp(-αyᵢfₜ)."
        }
      },
      {
        id: "hw2-5-2b", hw: "hw2", section: "§5.2(b)",
        title: { cn: "为什么大 wᵢ 对应 Fₜ₋₁ 表现差的样本",
                 en: "Why large wᵢ ⇔ poor performance on i" },
        solution: {
          cn: "wᵢ = exp(-yᵢFₜ₋₁(xᵢ))。yᵢFₜ₋₁(xᵢ) > 0（分对）⇒ wᵢ < 1；yᵢFₜ₋₁ < 0（分错）⇒ wᵢ > 1。错得越严重 wᵢ 越大 ⇒ 下一轮更关注它。",
          en: "wᵢ = exp(-yF). Misclassified → yF<0 → wᵢ>1; correct → wᵢ<1."
        }
      },
      {
        id: "hw2-5-2c", hw: "hw2", section: "§5.2(c)",
        title: { cn: "固定 αₜ>0 时，最优 fₜ ⇔ 最小加权错误率",
                 en: "Min L ⇔ choose fₜ with min weighted error" },
        solution: {
          cn: "拆 Σ 为预测正确（yfₜ=+1）和错误（yfₜ=-1）两部分：L ∝ (Σ正确 wᵢ)e^(-α) + (Σ错误 wᵢ)e^α。固定 α>0 ⇒ 最小化 L 等价于最小化 Σ错误 wᵢ ∝ ε(fₜ) := Pr_{i∼D}[fₜ(xᵢ)≠yᵢ]。",
          en: "Split sum by yfₜ = ±1; with α>0, only the misclassified sum matters → minimize weighted error ε(fₜ)."
        }
      },
      {
        id: "hw2-5-2d", hw: "hw2", section: "§5.2(d)",
        title: { cn: "L = C·[(1-ε)e^(-α) + εe^α]",
                 en: "L = C·[(1-ε)e^(-α) + εe^α]" },
        solution: {
          cn: "用 (c) 中的拆分 + 归一化常数 C = (1/m) Σ wᵢ：正确部分占比 (1-ε)，错误部分占比 ε ⇒ L/C = (1-ε)e^{-α} + εe^α。",
          en: "After normalizing weights by ε / 1−ε, L = C[(1−ε)e^{-α} + ε e^α]."
        }
      },
      {
        id: "hw2-5-2e", hw: "hw2", section: "§5.2(e)",
        title: { cn: "求最优 α* = (1/2) ln((1-ε)/ε)",
                 en: "Optimal α* = (1/2) ln((1-ε)/ε)" },
        solution: {
          cn: "对 (1-ε)e^{-α} + εe^α 求导：-(1-ε)e^{-α} + εe^α = 0 ⇒ e^{2α} = (1-ε)/ε ⇒ α* = (1/2) ln((1-ε)/ε)。",
          en: "Set derivative to 0: -(1-ε)e^{-α} + εe^α = 0 → e^{2α} = (1-ε)/ε → α* = (1/2) ln((1-ε)/ε)."
        }
      },
      {
        id: "hw2-5-2f", hw: "hw2", section: "§5.2(f)",
        title: { cn: "解释 α* 的符号与大小",
                 en: "Interpret sign / magnitude of α*" },
        solution: {
          cn: "ε < 1/2（比随机好）⇒ α* > 0，正向加入；ε 越接近 0 ⇒ α* 越大（信任度高）。ε > 1/2 ⇒ α* < 0，反向使用（也可直接翻转标签）。ε = 1/2 ⇒ α* = 0，没用。直觉：弱分类器越准信任度越高。",
          en: "ε<1/2 → α*>0 (trust more as ε→0). ε>1/2 → α*<0 (flip). ε=1/2 → α*=0."
        }
      }
    ]
  },

  // ─────────────────── Unsupervised ───────────────────
  "pca": {
    tutorial: {
      cn: "找最大方差方向。先中心化 → 算协方差 Σ → 取最大特征值的特征向量。",
      en: "Find max-variance direction. Center → compute Σ → take top eigenvector."
    },
    code: [{
      title: { cn: "PCA from scratch", en: "PCA from scratch" },
      code: `import numpy as np
def pca(X, k=2):
    Xc = X - X.mean(axis=0)
    cov = Xc.T @ Xc / len(X)
    w, V = np.linalg.eigh(cov)        # 升序
    top = V[:, np.argsort(-w)[:k]]    # 前 k 个最大特征向量
    return Xc @ top, top, w
`
    }],
    problems: [
      {
        id: "hw2-6-1", hw: "hw2", section: "§6.1",
        title: { cn: "两点 (1,3),(4,7) 求第一主成分",
                 en: "First PC of {(1,3), (4,7)}" },
        solution: {
          cn: "均值 μ=(2.5,5)，居中后 (-1.5,-2),(1.5,2)。两点差 (3,4)，归一化方向 (3/5, 4/5) = (0.6, 0.8)。即 PC1 沿这个方向（最大方差方向）。",
          en: "Centered points lie on direction (3,4) → unit vector (0.6, 0.8)."
        }
      },
      {
        id: "hw2-6-2", hw: "hw2", section: "§6.2",
        title: { cn: "4 点 (2,0),(2,2),(6,0),(6,2) 求协方差矩阵 Σ",
                 en: "Covariance Σ of 4 given points" },
        solution: {
          cn: "均值 (4,1)。居中：(-2,-1),(-2,1),(2,-1),(2,1)。Σ = (1/4) Σ xᵢxᵢᵀ = [[4, 0], [0, 1]]。x 方向方差大（4），y 方向小（1）。",
          en: "After centering, Σ = diag(4, 1)."
        }
      },
      {
        id: "hw2-6-3", hw: "hw2", section: "§6.3",
        title: { cn: "对角 Σ = diag(12,6,20,10) 求最优 w 与最优值",
                 en: "Find optimal w / value for diagonal Σ" },
        solution: {
          cn: "对角矩阵 Σ 的特征向量是标准基，特征值是对角元。最大特征值 20 对应第三个轴 ⇒ w = e₃ = (0,0,1,0)，最优值 wᵀΣw = 20。",
          en: "Diagonal Σ → eigenvectors are standard basis. Max eigenvalue 20 → w = e₃, value 20."
        }
      }
    ]
  },

  "kmeans": {
    tutorial: {
      cn: "WCSS = Σᵢ minₖ ‖xᵢ-μₖ‖² 的硬分配最小化。E-step 分配最近中心；M-step 中心 = 簇均值。对初始化敏感，可能收敛到局部最优。",
      en: "Minimize WCSS via E (assign) / M (update means). Sensitive to init; can hit local minima."
    },
    code: [{
      title: { cn: "K-means from scratch", en: "K-means from scratch" },
      code: `import numpy as np
def kmeans(X, K, n_iter=100, seed=0):
    rng = np.random.default_rng(seed)
    mu = X[rng.choice(len(X), K, replace=False)]
    for _ in range(n_iter):
        d = ((X[:, None, :] - mu[None, :, :]) ** 2).sum(-1)
        a = d.argmin(axis=1)                        # E-step
        new_mu = np.array([X[a == k].mean(0) if (a == k).any() else mu[k]
                           for k in range(K)])
        if np.allclose(new_mu, mu): break
        mu = new_mu                                  # M-step
    return a, mu
`
    }],
    problems: [
      {
        id: "hw2-7-1", hw: "hw2", section: "§7.1",
        title: { cn: "证明硬分配最优 ≤ 软分配最优",
                 en: "Hard ≤ soft optimum (subset argument)" },
        solution: {
          cn: "{0,1}^{n×K} ⊂ [0,1]^{n×K}，所以 hard 解集是 soft 解集的子集。在更大集合上取 inf ⇒ 值更小（或相等）。",
          en: "Hard set ⊆ soft set, so inf over larger set is ≤ inf over smaller."
        }
      },
      {
        id: "hw2-7-2", hw: "hw2", section: "§7.2",
        title: { cn: "证明软分配最优 ≥ 把每点分给最近中心的硬分配",
                 en: "Soft ≥ best-cluster hard assignment" },
        solution: {
          cn: "对任意可行 A：Σₖ Aᵢₖ ‖xᵢ-μₖ‖² ≥ Σₖ Aᵢₖ minₖ‖xᵢ-μₖ‖² = minₖ‖xᵢ-μₖ‖²（因 Σₖ Aᵢₖ = 1）。对 i 求和并对 μ 取 inf 即得。",
          en: "Apply min ≤ each term and use Σ Aᵢₖ = 1 per row."
        }
      },
      {
        id: "hw2-7-3", hw: "hw2", section: "§7.3",
        title: { cn: "结论：软分配最优值 = 硬分配最优值",
                 en: "Soft optimum equals hard optimum" },
        solution: {
          cn: "由 §7.1 软 ≤ 硬，由 §7.2 软 ≥ 硬，三明治 ⇒ 相等。即使把约束放松到 [0,1]，最优解仍然是 0/1 极点。",
          en: "Sandwich §7.1 and §7.2 — both inequalities are equalities."
        }
      }
    ]
  },

  // ─────────────────── Neural Networks ───────────────────
  "mlp": {
    tutorial: {
      cn: "线性 → 非线性 → 线性。隐藏层 + 非线性激活让 XOR 这种线性不可分问题变可分。通用近似：一隐层 + 非线性 ⇒ 任意连续函数（在紧集上）可任意逼近。",
      en: "Linear → nonlinearity → linear. One hidden layer with nonlinearity gives universal approximation on compacts."
    },
    code: [{
      title: { cn: "PyTorch MLP", en: "PyTorch MLP" },
      code: `import torch.nn as nn
class MLP(nn.Module):
    def __init__(self, d_in, d_hid, d_out):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(d_in, d_hid), nn.ReLU(),
            nn.Linear(d_hid, d_hid), nn.ReLU(),
            nn.Linear(d_hid, d_out),
        )
    def forward(self, x): return self.net(x)
`
    }],
    problems: [
      {
        id: "hw3-1-1", hw: "hw3", section: "§1.1",
        title: { cn: "d=2, b₀=0, ReLU：构造 f(x)=x",
                 en: "d=2, b₀=0, ReLU: realize f(x)=x" },
        solution: {
          cn: "把 x 拆成正负：ReLU(x) - ReLU(-x) = x。取 w₀=(1,-1)ᵀ ⇒ ReLU(w₀x) = (ReLU(x), ReLU(-x))ᵀ；w₁=(1,-1)ᵀ ⇒ w₁ᵀ·... = ReLU(x) - ReLU(-x) = x。",
          en: "ReLU(x) − ReLU(−x) = x. Use w₀ = (1, −1)ᵀ, w₁ = (1, −1)ᵀ."
        }
      },
      {
        id: "hw3-1-2", hw: "hw3", section: "§1.2",
        title: { cn: "ReLU 构造 f(x)=mx+b",
                 en: "ReLU realize f(x)=mx+b" },
        solution: {
          cn: "在上一题基础上引入大常数偏置：取 w₀=(1,-1), b₀=(C,C)（C 足够大使 ReLU 在所有 x 上都 active）。这样 ReLU 退化为线性，输出 w₁ᵀ(w₀x + C) = (w₁₁ - w₁₂)x + C(w₁₁ + w₁₂)。设 w₁₁ - w₁₂ = m, C(w₁₁+w₁₂) = b 即可。",
          en: "Choose b₀ = (C, C) with large C so both ReLUs stay active; pick w₁ to get slope m and intercept b."
        }
      },
      {
        id: "hw3-1-3", hw: "hw3", section: "§1.3",
        title: { cn: "d=1, b₀=0, sigmoid：构造 f(x)=b（常数）",
                 en: "d=1, b₀=0, sigmoid: f(x)=b" },
        solution: {
          cn: "sigmoid(w₀x) 在 w₀=0 时恒等于 1/2 ⇒ f(x) = w₁·(1/2) = w₁/2。取 w₁ = 2b 即可。",
          en: "w₀ = 0 ⇒ sigmoid output is constant 1/2 ⇒ choose w₁ = 2b."
        }
      },
      {
        id: "hw3-1-4", hw: "hw3", section: "§1.4",
        title: { cn: "d=3 ReLU 构造三角形（顶点 (0,6)，底边 [-2,2]）",
                 en: "d=3 ReLU triangle wave on [-2,2]" },
        solution: {
          cn: "三个 ReLU 拼出折线：ReLU(3x+6) 在 x>-2 激活、ReLU(-3x+6) 在 x<2 激活，叠加后中间为正、两端为 0。直接取 w₀=(3,-3,?), b₀=(6,6,?), w₁=(1,1,?)，第三个 hidden 用作减项裁掉两端的多余部分（详见解答 PDF）。",
          en: "Three ReLU pieces glued: 3x+6, -3x+6, and a clipping correction. Construct via piecewise hinges."
        }
      },
      {
        id: "hw3-1-5", hw: "hw3", section: "§1.5",
        title: { cn: "d=1 ReLU 是否能拟合 f(x)=x²？",
                 en: "Can d=1 ReLU realize x²?" },
        solution: { cn: "不能。w₁ᵀσ(w₀x) 是 x 的分段线性函数；x² 是严格凸的曲线，分段线性不能精确表示曲线（只能在有限点重合）。", en: "No: 1-hidden-unit ReLU output is piecewise linear; x² is curved, not exactly piecewise linear." }
      },
      {
        id: "hw3-1-6", hw: "hw3", section: "§1.6",
        title: { cn: "ReLU 能在 ℝ 上 ε-逼近 x² 吗？",
                 en: "Can ReLU ε-approximate x² on ℝ?" },
        solution: { cn: "不能。x² 在 ℝ 上无界，但有限个 ReLU 单元的网络是 piecewise linear，超出区间外斜率最多线性增长（O(|x|)），与 x² 的 Θ(x²) 增速无法匹配 ⇒ 在 |x| 足够大时差异 → ∞。", en: "No: a finite ReLU net is piecewise linear with O(|x|) growth; cannot match Θ(x²) on all of ℝ." }
      },
      {
        id: "hw3-1-7", hw: "hw3", section: "§1.7",
        title: { cn: "在 [0,1] 上能 ε-逼近 x²（通用近似）",
                 en: "On [0,1] can ε-approximate x² (UAT)" },
        solution: {
          cn: "可以。把 [0,1] 划分成 N 段，每段用线性插值近似 x²。每段误差 O(1/N²)。N 足够大时误差 < ε。具体：每个分段端点 (k/N, k²/N²)，分段线性折线即可。每个折点用一个 ReLU 实现（ReLU 拼接折线是经典技巧）。",
          en: "Yes by piecewise-linear interpolation: N segments give O(1/N²) error. Each kink is a ReLU."
        }
      }
    ]
  },

  "backpropagation": {
    tutorial: {
      cn: "Chain rule 在计算图上传梯度。downstream = local × upstream。考点：shape check（∂L/∂W shape = W shape）。",
      en: "Chain rule on computational graph. Trick: downstream = local × upstream. Check shapes match weights."
    },
    code: [{
      title: { cn: "PyTorch autograd 示例", en: "PyTorch autograd" },
      code: `import torch
W1 = torch.randn(4, 3, requires_grad=True)
W2 = torch.randn(1, 4, requires_grad=True)
x  = torch.randn(3)
y  = torch.tensor(1.0)

z1 = W1 @ x
a1 = torch.relu(z1)
z2 = W2 @ a1
yhat = torch.sigmoid(z2)
loss = -(y*torch.log(yhat) + (1-y)*torch.log(1-yhat))
loss.backward()
print(W1.grad.shape, W2.grad.shape)        # 自动得到正确 shape
`
    }],
    problems: [
      {
        id: "hw3-2-1-1", hw: "hw3", section: "§2.1.1",
        title: { cn: "二层网络 shape：W⁽¹⁾, b⁽¹⁾, W⁽²⁾, ∂L/∂W⁽¹⁾",
                 en: "Two-layer net shapes" },
        solution: {
          cn: "x∈ℝ³, hidden 4, output 1 ⇒ W⁽¹⁾∈ℝ^{4×3}, b⁽¹⁾∈ℝ⁴, W⁽²⁾∈ℝ^{1×4}。梯度同 shape：∂L/∂W⁽¹⁾∈ℝ^{4×3}。",
          en: "W⁽¹⁾: 4×3, b⁽¹⁾: 4, W⁽²⁾: 1×4, ∂L/∂W⁽¹⁾: 4×3 (matches W⁽¹⁾)."
        }
      },
      {
        id: "hw3-2-1-2", hw: "hw3", section: "§2.1.2",
        title: { cn: "代入数值算 z⁽¹⁾, a⁽¹⁾, z⁽²⁾, ∂L/∂W⁽²⁾, ∂L/∂W⁽¹⁾",
                 en: "Numerical forward + backward" },
        solution: {
          cn: "z⁽¹⁾ = W⁽¹⁾x = (1·1+0·2+(-1)(-1), 0+2+(-1), 1+2+0, 0-2-1)ᵀ = (2,1,3,-3)ᵀ。a⁽¹⁾ = ReLU(z⁽¹⁾) = (2,1,3,0)ᵀ。z⁽²⁾ = (1,-1,0,1)·(2,1,3,0) = 2-1+0+0 = 1。ŷ = σ(1) = 1/(1+e⁻¹). ∂L/∂z⁽²⁾ = ŷ-y = σ(1)-1 = -1/(1+e⁻¹)·e⁻¹/(1+e⁻¹) ... 实际 ∂L/∂z⁽²⁾ = ŷ - y。∂L/∂W⁽²⁾ = (ŷ-y)·(a⁽¹⁾)ᵀ = (ŷ-1)·(2,1,3,0)。∂L/∂a⁽¹⁾ = (ŷ-1)·W⁽²⁾ᵀ = (ŷ-1)·(1,-1,0,1)ᵀ。∂L/∂z⁽¹⁾ = ∂L/∂a⁽¹⁾ ⊙ 1[z⁽¹⁾>0] = (ŷ-1)·(1,-1,0,0)ᵀ（注意 z⁽¹⁾_3 < 0 不传梯度）。∂L/∂W⁽¹⁾ = ∂L/∂z⁽¹⁾·xᵀ。",
          en: "z⁽¹⁾ = (2,1,3,-3); a⁽¹⁾ = (2,1,3,0); z⁽²⁾ = 1; ŷ = σ(1). ∂L/∂z⁽²⁾ = ŷ−y; chain through to W⁽²⁾ and W⁽¹⁾, masking the negative pre-activations from ReLU."
        }
      }
    ]
  },

  "rnn": {
    tutorial: {
      cn: "BPTT：把 RNN 在时间上展开成深网络，再做标准 backprop。长序列下重复乘同一权重 ⇒ 梯度消失/爆炸。",
      en: "BPTT: unroll RNN over time and apply standard backprop. Repeated weight multiplications cause vanishing/exploding gradients."
    },
    code: [{
      title: { cn: "纯 NumPy RNN forward", en: "Pure NumPy RNN forward" },
      code: `import numpy as np
def rnn_forward(xs, w, h0=0.0):
    h = h0
    hs = [h0]
    for x in xs:
        h = w * (x + h)
        hs.append(h)
    return hs
`
    }],
    problems: [
      {
        id: "hw3-2-2-1", hw: "hw3", section: "§2.2.1-2",
        title: { cn: "hₜ = w(xₜ+hₜ₋₁)，h₀=0：展开 3 步并写 forward",
                 en: "Unroll RNN 3 steps; write forward" },
        solution: {
          cn: "h₀=0, y₁=x₁+0=x₁ ⇒ h₁=w·x₁。y₂=x₂+wx₁ ⇒ h₂=w(x₂+wx₁)=wx₂+w²x₁。y₃=x₃+h₂ ⇒ h₃=w(x₃+wx₂+w²x₁) = wx₃+w²x₂+w³x₁。",
          en: "h₁=wx₁; h₂=wx₂+w²x₁; h₃=wx₃+w²x₂+w³x₁."
        }
      },
      {
        id: "hw3-2-2-3", hw: "hw3", section: "§2.2.3",
        title: { cn: "用反向传播求 ∂h₃/∂w",
                 en: "Backprop ∂h₃/∂w" },
        solution: {
          cn: "h₃ = wy₃, y₃ = x₃+h₂, h₂ = wy₂, y₂ = x₂+h₁, h₁ = w·x₁。∂h₃/∂w 直接展开：= y₃ + w·(∂y₃/∂w) = (x₃+wx₂+w²x₁) + w·(y₂+w·∂y₂/∂w) = x₃ + 2wx₂ + 3w²x₁。验证：直接对 h₃=wx₃+w²x₂+w³x₁ 求导一致。",
          en: "Direct: ∂(wx₃+w²x₂+w³x₁)/∂w = x₃ + 2wx₂ + 3w²x₁."
        }
      },
      {
        id: "hw3-2-2-4", hw: "hw3", section: "§2.2.4",
        title: { cn: "f(z)=hT, hₜ=w·σ(xₜ+hₜ₋₁)：求 ∂f/∂h₁ 和 ∂hT/∂h₁",
                 en: "∂hT/∂h₁ for nonlinear recurrence" },
        solution: {
          cn: "递推 ∂hₜ/∂hₜ₋₁ = w·σ'(xₜ+hₜ₋₁)。∂hT/∂h₁ = ∏ₜ₌₂^T w·σ'(xₜ+hₜ₋₁) = w^(T-1) ∏ σ'(·)。同样 ∂f/∂h₁ = ∂hT/∂h₁。",
          en: "∂hT/∂h₁ = w^(T−1) · ∏ₜ σ'(xₜ + hₜ₋₁)."
        }
      },
      {
        id: "hw3-2-2-5", hw: "hw3", section: "§2.2.5",
        title: { cn: "由 ∏ wσ' 解释 RNN 梯度消失/爆炸",
                 en: "Explain vanishing / exploding from ∏ wσ'" },
        solution: {
          cn: "若 |wσ'| < 1，乘 T-1 次 ⇒ 0（消失）；若 > 1 ⇒ 爆炸。sigmoid σ' ≤ 1/4，更易消失。LSTM 用门控让梯度沿 cell-state 走 ‘高速路’，避免反复乘 < 1 的因子。",
          en: "Product of (T−1) factors |wσ'|. If <1 → 0; >1 → ∞. Gating in LSTM keeps gradient ≈ identity along the cell state."
        }
      }
    ]
  },

  "lstm": {
    tutorial: {
      cn: "门控（Forget / Input / Output）让信息在 cell state 上有选择地流动，缓解长依赖。GRU 把门减到 (Update, Reset)，参数更少。",
      en: "Gates (forget/input/output) regulate info flow along the cell state. GRU has fewer gates (update/reset)."
    },
    code: [{
      title: { cn: "PyTorch LSTM/GRU", en: "PyTorch LSTM/GRU" },
      code: `import torch.nn as nn
lstm = nn.LSTM(input_size=d_in, hidden_size=h, batch_first=True)
gru  = nn.GRU(input_size=d_in,  hidden_size=h, batch_first=True)
out, (h_n, c_n) = lstm(x)
out, h_n         = gru(x)
`
    }],
    problems: []
  },

  "cnn": {
    tutorial: {
      cn: "局部连接 + 权重共享：参数远少于全连接，并自带平移不变性。输出尺寸 ⌊(N+2P-F)/S⌋ + 1。",
      en: "Local connectivity + weight sharing: fewer params, translation invariance. Output size ⌊(N+2P-F)/S⌋ + 1."
    },
    code: [{
      title: { cn: "PyTorch Conv + 输出尺寸函数", en: "PyTorch Conv + size formula" },
      code: `import torch.nn as nn
def conv_out(N, F, P=0, S=1): return (N + 2*P - F) // S + 1

conv = nn.Conv2d(in_channels=3, out_channels=16,
                 kernel_size=3, stride=1, padding=1)   # 32 → 32
pool = nn.MaxPool2d(kernel_size=2, stride=2)           # 32 → 16
`
    }],
    problems: [
      {
        id: "hw3-3-1-1", hw: "hw3", section: "§3.1.1",
        title: { cn: "Conv 层 (3×32×32) + 16 个 3×3 filter, S=1, P=1：输出尺寸与参数量",
                 en: "Output shape and trainable params" },
        solution: {
          cn: "输出 H=W = (32+2-3)/1 + 1 = 32 ⇒ 16×32×32。参数量 = 3×3 kernel × 3 input ch × 16 filters + 16 bias = 432 + 16 = 448。",
          en: "Output 16×32×32; params 3·3·3·16 + 16 = 448."
        }
      },
      {
        id: "hw3-3-1-2", hw: "hw3", section: "§3.1.2",
        title: { cn: "4×4 输入 + 0.25-kernel, S=2, no pad, no bias：输出 + 是否等同 avg pooling",
                 en: "0.25-kernel avg-like conv" },
        solution: {
          cn: "输出 (4-2)/2 + 1 = 2 ⇒ 2×2。每个输出 = 0.25×4 邻居和 = 邻居均值。所以等同于 2×2 步长为 2 的 average pooling。具体值：左上 = (1+2+0+1)/4=1，右上 = (0+3+3+1)/4=1.75，左下 = (2+1+2+1)/4=1.5，右下 = (1+3+3+1)/4=2。",
          en: "Output 2×2 with each value = mean of a 2×2 patch — same as 2×2 average pooling stride 2."
        }
      },
      {
        id: "hw3-3-2-1", hw: "hw3", section: "§3.2.1",
        title: { cn: "4×4 输入 max-pool 2×2 stride 2：无 pad / 加 pad=1 时的输出",
                 en: "Max pool 4×4: no pad vs pad=1" },
        solution: {
          cn: "无 pad：输出 2×2 = [[6,8],[14,16]]（每个 2×2 块的最大值）。pad=1（填零到 6×6）：输出 (6-2)/2+1=3 ⇒ 3×3。新分块包含一些 0 + 边角，例如左上 max(0,0,0,1)=1。",
          en: "No pad → 2×2 of max in each block. With pad=1, input becomes 6×6 → output 3×3."
        }
      },
      {
        id: "hw3-3-2-2", hw: "hw3", section: "§3.2.2",
        title: { cn: "6×6 输入 + 3×3 max pool stride 1：输出尺寸",
                 en: "Output size for 6×6 with 3×3 pool stride 1" },
        solution: { cn: "(6-3)/1 + 1 = 4 ⇒ 输出 4×4。", en: "(6−3)/1 + 1 = 4 → 4×4." }
      },
      {
        id: "hw3-3-2-3", hw: "hw3", section: "§3.2.3",
        title: { cn: "5×5 输入 + 2×2 pool stride 2 + pad=1：输出尺寸",
                 en: "5×5, 2×2 pool, stride 2, pad 1" },
        solution: { cn: "padding 后 7×7。(7-2)/2+1 = 3.5 → ⌊⌋+1 = 3 ⇒ 输出 3×3。", en: "Pad → 7×7; output ⌊(7−2)/2⌋+1 = 3 → 3×3." }
      },
      {
        id: "hw3-3-3", hw: "hw3", section: "§3.3",
        title: { cn: "把 Conv 层写成稀疏矩阵 W ∈ ℝ^{4×9}",
                 en: "Conv as sparse Toeplitz-like matrix" },
        solution: {
          cn: "y₁₁ = k₁₁x₁₁+k₁₂x₁₂+k₂₁x₂₁+k₂₂x₂₂；y₁₂ = k₁₁x₁₂+k₁₂x₁₃+k₂₁x₂₂+k₂₂x₂₃；y₂₁/y₂₂ 同理（向下平移一行）。把这 4 个等式写成 Wx = y，每行只有 4 个非零位置（kernel 元素），其余为 0。W 是 (block) Toeplitz / 稀疏。结构特点：每行参数仅 4 个不同值（核共享），行与行通过位移相互关联。",
          en: "Each output row has 4 non-zero entries, sliding by stride. W is sparse, weight-shared (Toeplitz-like)."
        }
      }
    ]
  },

  // ─────────────────── Representation & Generative ───────────────────
  "autoencoder": {
    tutorial: {
      cn: "Encoder-Decoder 学压缩表示。线性 AE ≈ PCA；非线性激活 + 容量限制 ⇒ 可学到非线性流形。",
      en: "Encoder-Decoder learns compressed code. Linear AE ≈ PCA; nonlinear AEs learn manifolds."
    },
    code: [{
      title: { cn: "PyTorch AE", en: "PyTorch AE" },
      code: `import torch.nn as nn
class AE(nn.Module):
    def __init__(self, d_in=784, d_z=32):
        super().__init__()
        self.enc = nn.Sequential(nn.Linear(d_in, 128), nn.ReLU(), nn.Linear(128, d_z))
        self.dec = nn.Sequential(nn.Linear(d_z, 128), nn.ReLU(), nn.Linear(128, d_in))
    def forward(self, x):
        z = self.enc(x); return self.dec(z), z
`
    }],
    problems: []
  },

  "vae": {
    tutorial: {
      cn: "ELBO = 重建项 - KL(q‖p)。编码器输出 N(μ,σ²) 后用重参数化 z=μ+σ⊙ε 让梯度可传。Gaussian KL 闭式解必须背。",
      en: "ELBO = reconstruction − KL(q‖p). Reparameterize z = μ + σε. Memorize the Gaussian KL formula."
    },
    code: [{
      title: { cn: "PyTorch VAE", en: "PyTorch VAE" },
      code: `import torch
import torch.nn as nn
class VAE(nn.Module):
    def __init__(self, d_in=784, d_z=20):
        super().__init__()
        self.enc = nn.Sequential(nn.Linear(d_in, 256), nn.ReLU())
        self.mu, self.logvar = nn.Linear(256, d_z), nn.Linear(256, d_z)
        self.dec = nn.Sequential(nn.Linear(d_z, 256), nn.ReLU(), nn.Linear(256, d_in))

    def forward(self, x):
        h = self.enc(x); mu, logvar = self.mu(h), self.logvar(h)
        z = mu + torch.exp(0.5*logvar) * torch.randn_like(mu)            # reparam
        return self.dec(z), mu, logvar

def vae_loss(x_hat, x, mu, logvar):
    rec = ((x_hat - x) ** 2).sum()
    kl  = -0.5 * (1 + logvar - mu.pow(2) - logvar.exp()).sum()
    return rec + kl
`
    }],
    problems: [
      {
        id: "hw3-4-1", hw: "hw3", section: "§4.1",
        title: { cn: "VAE 训练中的所有近似源",
                 en: "All sources of approximation in VAE" },
        solution: {
          cn: "(1) 真实后验 p(z|x) 不可解析，用 q_φ(z|x) 近似。 (2) q_φ 限制为对角高斯（变分族不够大）。 (3) 期望 E_q[log p(x|z)] 用单点蒙特卡洛估计（reparameterization trick + 一个 ε 样本）。 (4) 优化 ELBO ≤ log p(x)，并不直接最大化 log p(x)。 (5) 最终用 SGD 优化非凸目标，不一定全局最优。",
          en: "1) approximate posterior q_φ ≠ true p(z|x); 2) Gaussian variational family; 3) MC estimate of E_q[log p(x|z)] with reparameterization; 4) ELBO ≤ log p(x); 5) SGD on non-convex loss."
        }
      },
      {
        id: "hw3-4-2", hw: "hw3", section: "§4.2",
        title: { cn: "Gaussian KL 闭式：D_KL(N(μ,σ²) ‖ N(0,1))",
                 en: "Gaussian KL closed form" },
        solution: {
          cn: "D_KL = ∫ q log(q/p) = E_q[log q] - E_q[log p]。代入两个高斯密度并展开：D_KL = (1/2)(μ² + σ² - log σ² - 1)。多维对角时各分量求和。",
          en: "D_KL = (1/2)(μ² + σ² − log σ² − 1)."
        }
      },
      {
        id: "hw3-4-3", hw: "hw3", section: "§4.3",
        title: { cn: "为什么 VAE 生成在 latent 上插值平滑",
                 en: "Why VAE generations vary smoothly in z" },
        solution: {
          cn: "ELBO 中的 KL 项把后验拉向 N(0,I)，使 latent 空间被平滑地 ‘压实’（不允许后验集中在尖锐点上）；同时重建项要求附近的 z 解码为相近的 x。两个力共同作用 ⇒ z 上的小变动 ↔ x 上的小变动 ⇒ 插值平滑。",
          en: "KL term forces q close to a smooth prior, while reconstruction makes nearby zs decode to similar x. Together they make latent space smooth."
        }
      }
    ]
  },

  "contrastive": {
    tutorial: {
      cn: "InfoNCE：拉近正样本对、推开负样本对。τ 越小 softmax 越尖锐。负样本能防止表示坍塌。",
      en: "InfoNCE: pull positives, push negatives. Small τ sharpens softmax. Negatives prevent collapse."
    },
    code: [{
      title: { cn: "InfoNCE loss", en: "InfoNCE loss" },
      code: `import torch
import torch.nn.functional as F
def info_nce(z_a, z_p, z_neg, tau=0.1):
    z_a = F.normalize(z_a, dim=-1); z_p = F.normalize(z_p, dim=-1)
    z_neg = F.normalize(z_neg, dim=-1)
    pos = (z_a * z_p).sum(-1) / tau                          # (B,)
    neg = z_a @ z_neg.T / tau                                # (B, K)
    logits = torch.cat([pos.unsqueeze(1), neg], dim=1)       # (B, 1+K)
    labels = torch.zeros(logits.size(0), dtype=torch.long, device=logits.device)
    return F.cross_entropy(logits, labels)
`
    }],
    problems: [
      {
        id: "hw4-1-1-1", hw: "hw4", section: "§1.1.1",
        title: { cn: "三个 cosine 相似度计算（向量已单位化）",
                 en: "Compute three cosine similarities" },
        solution: {
          cn: "归一化后是 dot product。s(f(x⁽¹⁾), f(x̃⁽¹⁾)) = (1,0)·(√3/2, 1/2) = √3/2。s(f(x⁽¹⁾), f(x⁽²⁾)) = (1,0)·(0,1) = 0。s(f(x⁽¹⁾), f(x̃⁽²⁾)) = (1,0)·(-1/2, √3/2) = -1/2。",
          en: "Dot products: √3/2, 0, −1/2."
        }
      },
      {
        id: "hw4-1-1-2", hw: "hw4", section: "§1.1.2",
        title: { cn: "τ=1 vs τ=1/2 时 InfoNCE 损失增减？",
                 en: "Does InfoNCE go up or down at τ=1/2 vs τ=1?" },
        solution: {
          cn: "τ↓ 让 softmax 更尖锐：正样本（√3/2）相对负样本（0, -1/2）的对比被放大 ⇒ 分子 e^{(√3/2)/τ} 相对总和占比更大 ⇒ -log(.) 更小 ⇒ 损失变小。直观：本题正比负更高，τ↓ 鼓励这种‘高对比’。",
          en: "Smaller τ sharpens softmax. Since the positive's similarity (√3/2) > negatives, the positive ratio grows → loss decreases."
        }
      },
      {
        id: "hw4-1-2-1", hw: "hw4", section: "§1.2.1",
        title: { cn: "证明：监督交叉熵是 dual-encoder 对比学习的特例",
                 en: "Show CE is a special case of dual-encoder contrastive" },
        solution: {
          cn: "取 X₁ = 图像空间, X₂ = 类别空间; f₁ = h（特征抽取器）, f₂(c) = w_c（W 的第 c 列）。anchor x = x⁽ᵏ⁾, positive z = y⁽ᵏ⁾, candidates {z_j} = {1..C} 全体类别。L_dual = -log(exp(hᵀw_y) / Σ_c exp(hᵀw_c)) = L_CE。",
          en: "Set f₁ = h (feature extractor), f₂(c) = w_c. Then dual loss equals cross-entropy."
        }
      },
      {
        id: "hw4-1-2-2", hw: "hw4", section: "§1.2.2",
        title: { cn: "为什么 CLIP 能 zero-shot 而标准分类器不行",
                 en: "Why CLIP can zero-shot but a CE classifier can't" },
        solution: {
          cn: "标准分类器中 f₂ 是固定矩阵 W，每个类是固定向量 w_c，要新增类必须重训。CLIP 中 f₂ 是 text encoder，对任何文本都能即时编码 ⇒ 对未见过的类，只要给它一个文本描述，就能算 f₂(z) 与图像对比 ⇒ zero-shot。",
          en: "CE: f₂ is a fixed matrix W with one column per class — new classes need retraining. CLIP: f₂ is a text encoder, so any new class label can be embedded on the fly."
        }
      }
    ]
  },

  "attention": {
    tutorial: {
      cn: "Attention(Q,K,V) = softmax(QKᵀ/√d_k) V。除以 √d_k 防止 softmax 饱和。Mask 加在 softmax 前。",
      en: "Attention(Q,K,V)=softmax(QKᵀ/√d_k)V. Scale by √d_k; mask added before softmax."
    },
    code: [{
      title: { cn: "Scaled dot-product attention", en: "Scaled dot-product attention" },
      code: `import torch
import torch.nn.functional as F
def attention(Q, K, V, mask=None):
    d_k = K.size(-1)
    scores = Q @ K.transpose(-2, -1) / d_k**0.5
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))
    return F.softmax(scores, dim=-1) @ V
`
    }],
    problems: [
      {
        id: "hw4-2-2", hw: "hw4", section: "§2.2",
        title: { cn: "正交单位 K 下计算两个 query 的 attention 输出 + 总结一句",
                 en: "Compute attention output for two queries; summarize in one sentence" },
        solution: {
          cn: "K = I₃ ⇒ kᵢᵀq = qᵢ。q⁽¹⁾=(6,1,0)：scores=(6,1,0)，softmax 后 α₁≈e⁶/(e⁶+e+1) ≈ 1，输出 ≈ v₁=(2,0,1)。q⁽²⁾=(1,1,6)：α₃ 主导 ⇒ 输出 ≈ v₃=(1,1,2)。一句结论：当 q 与某个 kⱼ 的内积远大于其他 ⇒ softmax 饱和到 j 上 ⇒ 输出 ≈ vⱼ。",
          en: "With orthonormal keys, kᵢᵀq = qᵢ. q1 → softmax dominated by 1st coord → output ≈ v₁. q2 → output ≈ v₃. Output ≈ vⱼ when q is much more aligned with kⱼ than the other keys."
        }
      }
    ]
  },

  "positional-encoding": {
    tutorial: {
      cn: "Self-attention 对顺序不敏感，sin/cos PE 注入位置。PE(pos+k) 是 PE(pos) 的线性变换（旋转）。",
      en: "Self-attention is permutation-invariant; sinusoidal PE injects position. PE(pos+k) = linear function (rotation) of PE(pos)."
    },
    code: [{
      title: { cn: "Sinusoidal PE", en: "Sinusoidal PE" },
      code: `import torch, math
def sinusoidal_pe(seq_len, d):
    pos = torch.arange(seq_len).unsqueeze(1)
    i   = torch.arange(d // 2).unsqueeze(0)
    w   = 1.0 / (10000 ** (2 * i / d))
    pe  = torch.zeros(seq_len, d)
    pe[:, 0::2] = torch.sin(pos * w)
    pe[:, 1::2] = torch.cos(pos * w)
    return pe
`
    }],
    problems: [
      {
        id: "hw4-2-1-1", hw: "hw4", section: "§2.1.1",
        title: { cn: "写出 sinusoidal PE 的两条公式",
                 en: "Write the sinusoidal PE formulas" },
        solution: {
          cn: "PE(pos, 2i) = sin(pos / 10000^{2i/d_model})；PE(pos, 2i+1) = cos(pos / 10000^{2i/d_model})。低维高频、高维低频。",
          en: "PE(pos, 2i) = sin(pos · ω_i); PE(pos, 2i+1) = cos(pos · ω_i) with ω_i = 1/10000^{2i/d}."
        }
      },
      {
        id: "hw4-2-1-2", hw: "hw4", section: "§2.1.2",
        title: { cn: "证明 PE(pos+k) 是 PE(pos) 的线性函数",
                 en: "PE(pos+k) is linear in PE(pos)" },
        solution: {
          cn: "用三角和角公式：sin((pos+k)w) = sin(pos·w)cos(k·w) + cos(pos·w)sin(k·w)；cos((pos+k)w) = cos(pos·w)cos(k·w) - sin(pos·w)sin(k·w)。所以 a=cos(kw), b=sin(kw), c=-sin(kw), d=cos(kw)（与 pos 无关）。即 PE(pos+k) = R(kw) PE(pos)，R 是 2×2 旋转。",
          en: "Apply sum-to-product. Coefficients (a,b,c,d) = (cos kw, sin kw, −sin kw, cos kw): a 2×2 rotation depending only on k."
        }
      },
      {
        id: "hw4-2-1-3", hw: "hw4", section: "§2.1.3",
        title: { cn: "证明 PE(pos₁)ᵀPE(pos₂) 只依赖 k = pos₂-pos₁",
                 en: "PE dot product depends only on k" },
        solution: {
          cn: "对每个频率分量 i：sin(pos₁wᵢ)sin(pos₂wᵢ) + cos(pos₁wᵢ)cos(pos₂wᵢ) = cos((pos₂-pos₁)wᵢ) = cos(kwᵢ)。求和得 Σᵢ cos(kwᵢ)，与绝对位置无关。",
          en: "Per frequency: sin·sin + cos·cos = cos((pos₂−pos₁)w) = cos(kw). Sum over frequencies depends only on k."
        }
      }
    ]
  },

  "transformer": {
    tutorial: {
      cn: "Transformer block：LN + MHA + Add + LN + FFN + Add。多头让模型在不同子空间并行学关系，提升鲁棒性。",
      en: "Block: LN + MHA + Add + LN + FFN + Add. Multi-heads parallelize across subspaces for robustness."
    },
    code: [{
      title: { cn: "PyTorch Transformer encoder layer", en: "PyTorch encoder layer" },
      code: `import torch.nn as nn
layer = nn.TransformerEncoderLayer(
    d_model=512, nhead=8, dim_feedforward=2048,
    activation='gelu', batch_first=True, norm_first=True,   # Pre-LN
)
encoder = nn.TransformerEncoder(layer, num_layers=6)
`
    }],
    problems: [
      {
        id: "hw4-2-3-1", hw: "hw4", section: "§2.3.1",
        title: { cn: "正交单位 K 下用单头实现 (vₐ + v_b)/2",
                 en: "Single-head produces (v_a + v_b)/2" },
        solution: {
          cn: "取 q = λ(μₐ+μ_b)，λ→∞。kᵢᵀq = λ(μₐᵀμᵢ + μ_bᵀμᵢ) = λ·(δᵢₐ + δᵢ_b)。其他 keys 内积 0。当 λ 足够大时 softmax → (1/2, 1/2) 在 a,b 上，0 在其他 ⇒ 输出 ≈ (vₐ+v_b)/2。",
          en: "q = λ(μ_a + μ_b) with large λ pushes softmax to put mass 1/2 on each of a, b → output ≈ (v_a + v_b)/2."
        }
      },
      {
        id: "hw4-2-3-2", hw: "hw4", section: "§2.3.2",
        title: { cn: "k_a 方差含 μₐμₐᵀ ⇒ 单头平均不鲁棒",
                 en: "Single-head averaging brittle under noisy k_a" },
        solution: {
          cn: "k_a 沿 μₐ 方向幅值波动很大。kₐᵀq = λ‖kₐ‖·cos(...) 也跟着大幅波动，可能远超 k_bᵀq。softmax 是指数 ⇒ 注意力可能整堆压在 k_a 上 ⇒ 输出趋近 v_a 而非平均。",
          en: "Magnitude jitter in k_a along μ_a swings k_aᵀq strongly; softmax saturates → output collapses to v_a, breaking the average."
        }
      },
      {
        id: "hw4-2-3-3", hw: "hw4", section: "§2.3.3",
        title: { cn: "用两个 head 分别 ‘只挑 a’ / ‘只挑 b’ 再平均：更鲁棒",
                 en: "Two heads each pick one — more robust" },
        solution: {
          cn: "q₁=λμₐ ⇒ y₁≈vₐ；q₂=λμ_b ⇒ y₂≈v_b。最终 y=(y₁+y₂)/2 ≈ (vₐ+v_b)/2。每头只依赖单一 key，对另一个 key 的噪声免疫；k_a 抖动只让 head 1 的输出稍受影响（但仍主要取 v_a），head 2 不受影响。",
          en: "Each head focuses on one key, making the other key's noise irrelevant. k_a noise only perturbs head 1, head 2 stays clean."
        }
      }
    ]
  },

  "llm": {
    tutorial: {
      cn: "Decoder-only Transformer + 自回归 NLL。困惑度 PP = exp(L)。Post-training 链：Pre-train → SFT → RLHF / ICL。",
      en: "Decoder-only with autoregressive NLL. Perplexity = exp(L). Pipeline: pre-train → SFT → RLHF / ICL."
    },
    code: [{
      title: { cn: "参数量估算", en: "Param count" },
      code: `def llm_params(D, L, F, V):
    attn = 4 * D * D                       # W_Q, W_K, W_V, W_O
    mlp  = 2 * D * F                       # W_up, W_down
    layer = attn + mlp
    embed = 2 * V * D                      # input + LM head (untied)
    return L * layer + embed

# OLMo-style 配置
print(llm_params(D=4096, L=32, F=11008, V=50304))
`
    }],
    problems: [
      {
        id: "hw4-2-4-1", hw: "hw4", section: "§2.4.1",
        title: { cn: "MHA block 一层的参数量",
                 en: "Params in one attention block" },
        solution: {
          cn: "每个 head 维度 D/N，共 N 个 head；W_Q, W_K, W_V 都把 D 投到 N·(D/N)=D，参数 D×D 一个。W_O 也 D×D。无 bias ⇒ 共 4D²。",
          en: "W_Q, W_K, W_V, W_O each D×D (heads concatenate to D). Total = 4D²."
        }
      },
      {
        id: "hw4-2-4-2", hw: "hw4", section: "§2.4.2",
        title: { cn: "MLP block 参数量",
                 en: "Params in MLP block" },
        solution: { cn: "W_up ∈ ℝ^{D×F} = DF；W_down ∈ ℝ^{F×D} = FD；总 2DF。", en: "2DF." }
      },
      {
        id: "hw4-2-4-3a", hw: "hw4", section: "§2.4.3(a)",
        title: { cn: "一层 transformer 的参数量公式",
                 en: "Per-layer params formula" },
        solution: { cn: "attn + mlp = 4D² + 2DF = 2D(2D + F)。", en: "4D² + 2DF = 2D(2D + F)." }
      },
      {
        id: "hw4-2-4-3b", hw: "hw4", section: "§2.4.3(b)",
        title: { cn: "整模型参数量",
                 en: "Total LLM params formula" },
        solution: { cn: "L 层 + embedding (V×D) + LM head (D×V) = L·(4D² + 2DF) + 2VD。", en: "L · (4D² + 2DF) + 2VD." }
      },
      {
        id: "hw4-2-4-3c", hw: "hw4", section: "§2.4.3(c)",
        title: { cn: "代入 D=4096, L=32, N=32, F=11008, V=50304 计算",
                 en: "Plug in OLMo-style config" },
        solution: {
          cn: "4D² = 4·4096² ≈ 6.71×10⁷；2DF = 2·4096·11008 ≈ 9.02×10⁷；一层 ≈ 1.57×10⁸。32 层 ≈ 5.04×10⁹。embedding+head = 2·50304·4096 ≈ 4.12×10⁸。总计 ≈ 5.45×10⁹（约 5.5B 参数，与 7B 量级模型一致量级，少了点 LayerNorm/bias）。",
          en: "Per layer ≈ 1.57×10⁸; ×32 ≈ 5.04×10⁹; embed+head ≈ 4.12×10⁸; total ≈ 5.45×10⁹."
        }
      }
    ]
  },

  "diffusion": {
    tutorial: {
      cn: "前向：x₀ → ... → xT 加高斯噪声直到接近 N(0,I)。逆向：神经网络学每步去噪（常预测 ε）。训练目标 = ELBO。",
      en: "Forward adds Gaussian noise until ≈ N(0,I); reverse network learns to denoise (often predicting ε). Train via ELBO."
    },
    code: [{
      title: { cn: "Forward sampling x_t from x_0", en: "Sample x_t from x_0" },
      code: `import torch
def sample_xt(x0, t, alpha_bar, eps=None):
    eps = torch.randn_like(x0) if eps is None else eps
    a = alpha_bar[t][..., None, None, None]                  # 广播到图像形状
    return a.sqrt() * x0 + (1 - a).sqrt() * eps, eps
`
    }],
    problems: [
      {
        id: "hw4-3-1", hw: "hw4", section: "§3.1",
        title: { cn: "写 diffusion 的 ELBO 并指明期望分布",
                 en: "Write diffusion ELBO with expectation distribution" },
        solution: {
          cn: "ELBO = E_{q(x₁|x₀)}[log p_θ(x₀|x₁)] - D_KL(q(xT|x₀) ‖ p(xT)) - Σ_{t=2}^T E_{q(xt|x₀)}[D_KL(q(x_{t-1}|xt,x₀) ‖ p_θ(x_{t-1}|xt))]。期望对 q（前向链给出的分布）取。",
          en: "ELBO has reconstruction term (E under q(x₁|x₀)), prior matching KL, and per-step KLs (E under q(xt|x₀))."
        }
      },
      {
        id: "hw4-3-2", hw: "hw4", section: "§3.2",
        title: { cn: "扩散模型能直接估计密度 p_θ(x₀) 吗？",
                 en: "Can we directly estimate p_θ(x₀)?" },
        solution: {
          cn: "不能直接。p_θ(x₀) = ∫ p_θ(x₀:T) dx₁:T 是高维积分，难以闭式或精确数值计算。我们一般用 ELBO 作为下界来评估或训练；精确密度需要重要性采样或 ODE-flow 形式才能估计。",
          en: "No: p_θ(x₀) = ∫ p_θ(x₀:T)dx₁:T is intractable. Use ELBO as proxy or importance sampling."
        }
      },
      {
        id: "hw4-3-3", hw: "hw4", section: "§3.3",
        title: { cn: "推导 q(xt|x₀) 关于 βᵢ 的形式",
                 en: "Derive q(xt|x₀) in terms of βᵢ" },
        solution: {
          cn: "记 αᵢ = 1 - βᵢ, ᾱₜ = ∏ᵢ₌₁ᵗ αᵢ。递推用 reparam：xₜ = √αₜ xₜ₋₁ + √(1-αₜ) εₜ。展开 t 步：xₜ = √ᾱₜ x₀ + √(1-ᾱₜ) ε（合并独立高斯）。所以 q(xt|x₀) = N(√ᾱₜ x₀, (1-ᾱₜ)I)。",
          en: "Recursive reparam, sum of independent Gaussians: q(xt|x₀) = N(√ᾱₜ x₀, (1−ᾱₜ)I) with ᾱₜ = ∏(1−βᵢ)."
        }
      },
      {
        id: "hw4-3-4", hw: "hw4", section: "§3.4",
        title: { cn: "推导后验均值 μ̃ₜ(xₜ, x₀)",
                 en: "Derive posterior mean μ̃ₜ(xt, x₀)" },
        solution: {
          cn: "用 Bayes：q(xₜ₋₁|xₜ, x₀) ∝ q(xₜ|xₜ₋₁) q(xₜ₋₁|x₀)。两项都是高斯，乘积仍为高斯。配方后均值为 μ̃ₜ = (√αₜ(1-ᾱₜ₋₁)/(1-ᾱₜ)) xₜ + (√ᾱₜ₋₁ βₜ/(1-ᾱₜ)) x₀。这是经典 DDPM 公式。",
          en: "Bayes' rule on Gaussians; complete the square: μ̃ₜ = (√αₜ (1−ᾱₜ₋₁)/(1−ᾱₜ)) xt + (√ᾱₜ₋₁ βₜ/(1−ᾱₜ)) x₀."
        }
      }
    ]
  },

  // ─────────────────── Theory ───────────────────
  "bayes-classifier": {
    tutorial: {
      cn: "Bayes 分类器 = 在 0-1 loss 下 η(x)≥0.5 预测 1。Bayes error 是任何分类器都无法突破的下界。",
      en: "Bayes classifier (under 0-1 loss): predict 1 iff η(x)≥0.5. Bayes error is the irreducible lower bound."
    },
    code: [{
      title: { cn: "Bayes 边界 + 错误率（高斯类）", en: "Gaussian classes: boundary + error" },
      code: `import numpy as np
from scipy.stats import norm
def gauss_bayes(mu_pos, mu_neg, sigma, lam=0.5):
    # P(Y=1)=lam; threshold from log-likelihood + log-prior
    z = (mu_pos + mu_neg) / 2 + (sigma**2 / (mu_pos - mu_neg)) * np.log((1-lam)/lam)
    err = lam * norm.cdf(z, mu_pos, sigma) + (1-lam) * (1 - norm.cdf(z, mu_neg, sigma))
    return z, err
`
    }],
    problems: [
      {
        id: "hw5-1-2-1", hw: "hw5", section: "§1.2.1",
        title: { cn: "推导 Bayes 最优分类器 f*(x)（高斯类、共享 σ²）",
                 en: "Derive Bayes optimal f*(x) for Gaussian classes" },
        solution: {
          cn: "f* = argmax_y P(Y=y) p(x|Y=y)。比较 λ N(x; μ, σ²) vs (1-λ) N(x; -μ, σ²)，取 log 比值得线性形式 (2μ/σ²) x + log(λ/(1-λ))，正则预测 1，否则 0。",
          en: "Compare class-conditional likelihoods × priors; the log-ratio is linear in x."
        }
      },
      {
        id: "hw5-1-2-2", hw: "hw5", section: "§1.2.2",
        title: { cn: "决策边界线性 + 显式阈值",
                 en: "Linear boundary + explicit threshold" },
        solution: {
          cn: "把 log 比设为 0：(2μ/σ²) x + log(λ/(1-λ)) = 0 ⇒ x* = -(σ²/(2μ)) log(λ/(1-λ))。等价 x* = (σ²/(2μ)) log((1-λ)/λ)。等先验 λ=1/2 ⇒ 阈值 = 0（中点）。",
          en: "Threshold x* = (σ²/(2μ)) log((1−λ)/λ). For λ=1/2 it's 0."
        }
      },
      {
        id: "hw5-1-2-3", hw: "hw5", section: "§1.2.3",
        title: { cn: "Bayes 错误率的表达式",
                 en: "Bayes error expression" },
        solution: {
          cn: "ε* = λ Φ((x* - μ)/σ) + (1-λ)(1 - Φ((x* + μ)/σ))（Φ 为标准正态 CDF）。等先验时简化为 Φ(-μ/σ)。",
          en: "ε* = λ Φ((x*−μ)/σ) + (1−λ)(1−Φ((x*+μ)/σ)). Equal prior → ε* = Φ(−μ/σ)."
        }
      },
      {
        id: "hw5-1-2-4", hw: "hw5", section: "§1.2.4",
        title: { cn: "μ→∞ vs μ→0 时 Bayes 错误率行为",
                 en: "Bayes error as μ→∞ or μ→0" },
        solution: {
          cn: "μ→∞ ⇒ 两类完全分开 ⇒ Φ(-μ/σ) → 0 ⇒ 错误率 → 0。μ→0 ⇒ 两类完全重叠 ⇒ Φ(0) = 1/2 ⇒ 错误率 → min(λ, 1-λ)（猜众类）。",
          en: "μ→∞ → ε* → 0 (perfect separation). μ→0 → ε* → min(λ, 1−λ) (guess majority)."
        }
      },
      {
        id: "hw5-1-2-5", hw: "hw5", section: "§1.2.5",
        title: { cn: "类别不平衡 (λ ≠ 1/2) 如何挪边界",
                 en: "How class imbalance shifts the boundary" },
        solution: {
          cn: "log((1-λ)/λ) 决定边界位置：λ < 1/2（正类罕见）⇒ log > 0 ⇒ 边界向 +μ 方向挪 ⇒ 更难被预测为 1（更倾向多数类）。反之亦然。",
          en: "Boundary shifts by (σ²/(2μ)) log((1-λ)/λ): rare class → boundary moves toward that class's mean (predict it less)."
        }
      }
    ]
  },

  "error-decomposition": {
    tutorial: {
      cn: "ε(f) = Estimation + Approximation + Bayes。加数据 → 降 Estimation；换模型 → 降 Approximation。Bayes 错误是数据噪声，不可消。",
      en: "ε(f) = Estimation + Approximation + Bayes. More data ↓ estimation; richer model ↓ approximation; Bayes is irreducible."
    },
    code: [{
      title: { cn: "Bias-variance 经验估计", en: "Empirical bias-variance" },
      code: `import numpy as np
def bias_variance(model_fn, X_train, y_train, X_test, y_true, n_bootstrap=50):
    preds = []
    for _ in range(n_bootstrap):
        idx = np.random.choice(len(X_train), len(X_train), replace=True)
        m = model_fn().fit(X_train[idx], y_train[idx])
        preds.append(m.predict(X_test))
    preds = np.array(preds)
    bias2 = ((preds.mean(0) - y_true) ** 2).mean()
    var   = preds.var(0).mean()
    return bias2, var
`
    }],
    problems: []
  },

  "pac": {
    tutorial: {
      cn: "PAC：以高概率 (≥1-δ) 保证测试误差 ≤ ε。有限假设类样本量 n ≥ (1/ε)(ln|F| + ln(1/δ))。ERM = 经验风险最小化。",
      en: "PAC: with prob ≥1-δ achieve ε true error. Finite class: n ≥ (1/ε)(ln|F|+ln(1/δ)). ERM minimizes empirical risk."
    },
    code: [{
      title: { cn: "样本复杂度计算", en: "Sample complexity" },
      code: `import math
def pac_sample_complexity(eps, delta, F_size):
    return math.ceil((math.log(F_size) + math.log(1/delta)) / eps)
print(pac_sample_complexity(0.05, 0.01, 1000))     # ≈ 231
`
    }],
    problems: [
      {
        id: "hw5-1-1-1", hw: "hw5", section: "§1.1.1",
        title: { cn: "Hoeffding 应用：用 T = Σ(Zᵢ - R(h)) 推 P(|R̂_S(h)-R(h)| > ε) 的界",
                 en: "Apply Hoeffding to bound P(|R̂_S(h)−R(h)| > ε)" },
        solution: {
          cn: "(a) E[T] = Σ E[Zᵢ - R(h)] = 0；Zᵢ ∈ {0,1}, R(h) 是常数 ⇒ Zᵢ - R(h) ∈ [-R(h), 1-R(h)]，长度 1。 (b) Hoeffding：P(|T| > mε) ≤ 2 exp(-2(mε)²/(m·1²)) = 2 exp(-2mε²)。即 P(|R̂-R|>ε) = P(|T/m|>ε) ≤ 2 exp(-2mε²)。",
          en: "E[T]=0; each |Zᵢ - R(h)| ∈ length-1 interval. Hoeffding gives P(|R̂_S(h) − R(h)| > ε) ≤ 2 exp(−2mε²)."
        }
      },
      {
        id: "hw5-1-1-2", hw: "hw5", section: "§1.1.2",
        title: { cn: "为何 §1 的界不能直接用于 ĥ；有限 H 的 union bound",
                 en: "Why bound fails for ĥ; union bound for finite H" },
        solution: {
          cn: "(a) 单个 h 的 Hoeffding 假设 h 是固定的（与数据独立）。但 ĥ = argmin_h R̂_S 依赖 S，不再独立 ⇒ 不能直接套。 (b) 有限 H：union bound：P(∃h: |R̂_S(h)-R(h)|>ε) ≤ Σ_h P(|R̂_S(h)-R(h)|>ε) ≤ 2|H| exp(-2mε²)。所以对任何 ĥ 都有同界。",
          en: "Hoeffding requires fixed h independent of S; ĥ depends on S. For finite H, union bound: ≤ 2|H| exp(−2mε²)."
        }
      },
      {
        id: "hw5-1-1-3", hw: "hw5", section: "§1.1.3",
        title: { cn: "在 uniform convergence 下 R(ĥ_ERM) - R(h*_H) ≤ 2ε",
                 en: "Under uniform convergence, R(ĥ_ERM) − R(h*) ≤ 2ε" },
        solution: {
          cn: "R(ĥ_ERM) ≤ R̂_S(ĥ_ERM) + ε（一致收敛）。R̂_S(ĥ_ERM) ≤ R̂_S(h*)（ERM 最小化）。R̂_S(h*) ≤ R(h*) + ε（一致收敛）。三段拼起来 ⇒ R(ĥ_ERM) ≤ R(h*) + 2ε。",
          en: "R(ĥ) ≤ R̂(ĥ)+ε ≤ R̂(h*)+ε ≤ R(h*)+2ε (use uniform convergence twice + ERM optimality)."
        }
      }
    ]
  },

  "vc-dimension": {
    tutorial: {
      cn: "VC 维 = 假设类能 shatter 的最大点集大小。VC 泛化界 ε(f) ≤ ε̂(f) + O(√((d + ln(1/δ))/n))。",
      en: "VC dim = max set H can shatter. Generalization bound ε ≤ ε̂ + O(√((d + ln(1/δ))/n))."
    },
    code: [{
      title: { cn: "VC 界估算", en: "VC bound" },
      code: `import math
def vc_bound(d_vc, n, delta=0.05):
    return math.sqrt((d_vc + math.log(1/delta)) / n)
print(vc_bound(d_vc=10, n=1000))
`
    }],
    problems: [
      {
        id: "hw5-1-3-1", hw: "hw5", section: "§1.3.1",
        title: { cn: "阈值族 H = {1[x≥c]} 的 VC 维",
                 en: "VC dim of threshold class" },
        solution: {
          cn: "VC = 1。任 1 点 {x₀}：c≤x₀ 标 1，c>x₀ 标 0 ⇒ 可 shatter。任 2 点 x₁<x₂：标 (1,0) 不可达（1[x≥c]=1 时 c≤x₁≤x₂ ⇒ x₂ 也是 1） ⇒ 不能 shatter。",
          en: "Shatters 1 point but not 2 (the labeling (+,−) on x₁<x₂ is impossible). VC = 1."
        }
      },
      {
        id: "hw5-1-3-2", hw: "hw5", section: "§1.3.2",
        title: { cn: "VC bound 给出的样本复杂度",
                 en: "Sample complexity from VC bound" },
        solution: {
          cn: "m = O((d + ln(1/δ))/ε²)，d=1 ⇒ m = O((1 + ln(1/δ))/ε²)。常数取决于具体定理（如 Vapnik-Chervonenkis）。",
          en: "m = O((d + ln(1/δ))/ε²) — for threshold class (d=1), O((1+ln(1/δ))/ε²)."
        }
      },
      {
        id: "hw5-1-3-3", hw: "hw5", section: "§1.3.3",
        title: { cn: "解释为什么阈值类是 PAC 可学习",
                 en: "Why threshold class is PAC learnable" },
        solution: {
          cn: "VC 维有限 ⇒ 由 Fundamental Theorem of Statistical Learning 知 PAC 可学习；用 ERM（在训练集上选最优阈值）即可达到。",
          en: "Finite VC dim ⇒ PAC learnable (Fundamental Theorem). ERM picking best threshold on training data suffices."
        }
      }
    ]
  },

  // ─────────────────── RL ───────────────────
  "mdp": {
    tutorial: {
      cn: "Lecture 23/25/27：MDP 五元组 (S,A,P,R,γ)，model-free RL 从 trajectory 学；LLM-as-MDP：state=prompt+已生成 tokens，action=next token，reward=答案是否正确 / 可验证。",
      en: "Lectures 23/25/27: MDP tuple is (S,A,P,R,γ), model-free RL learns from trajectories, and LLM-as-MDP uses state=prompt+generated tokens, action=next token, reward=answer correctness / verifiable reward."
    },
    code: [{
      title: { cn: "Gym MDP loop", en: "Gym MDP loop" },
      code: `import gymnasium as gym
env = gym.make('CartPole-v1')
obs, info = env.reset()
done = False
while not done:
    a = env.action_space.sample()                      # placeholder policy
    obs, r, terminated, truncated, info = env.step(a)
    done = terminated or truncated
`
    }],
    problems: []
  },

  "value-functions": {
    tutorial: {
      cn: "Lecture 27：Actor-critic 用 value function 降低 policy-gradient 方差。V 是状态平均价值，Q 是先做动作 a 的价值，Advantage A=Q−V 表示比平均动作好/差多少。",
      en: "Lecture 27: actor-critic uses value functions to reduce policy-gradient variance. V is state value, Q fixes the first action, and advantage A=Q−V measures better/worse than average."
    },
    code: [{
      title: { cn: "Tabular value-iter helper", en: "Tabular helper" },
      code: `import numpy as np
def value_to_q(V, P, R, gamma):
    # P: (S, A, S'), R: (S, A) → Q: (S, A)
    return R + gamma * (P * V[None, None, :]).sum(-1)
`
    }],
    problems: []
  },

  "bellman": {
    tutorial: {
      cn: "Bellman 最优：V*(s) = maxₐ Q*(s,a)；Q*(s,a) = R(s,a) + γ E[maxₐ' Q*(s',a')]。算子 T 在 ℓ_∞ 下是 γ-收缩 ⇒ 不动点存在唯一。",
      en: "Bellman optimality: V*(s)=maxₐ Q*; Q* = R + γE[max Q*]. Bellman operator T is γ-contraction ⇒ unique fixed point."
    },
    code: [{
      title: { cn: "Bellman 算子（数组版）", en: "Bellman operator" },
      code: `import numpy as np
def bellman_T(V, P, R, gamma):
    # T V (s) = max_a [R(s,a) + γ Σ_s' P(s'|s,a) V(s')]
    Q = R + gamma * (P * V[None, None, :]).sum(-1)
    return Q.max(axis=1)
`
    }],
    problems: [
      {
        id: "hw5-2-1", hw: "hw5", section: "§2.1",
        title: { cn: "无限折扣下 Q^π(s,a) 的定义",
                 en: "Definition of Q^π(s,a) for infinite-horizon discount" },
        solution: { cn: "Q^π(s,a) = E_π[Σₜ₌₀^∞ γᵗ R(sₜ, aₜ) | s₀=s, a₀=a]，其中 sₜ₊₁ ∼ p(·|sₜ,aₜ), aₜ ∼ π(·|sₜ)（t≥1）。", en: "Q^π(s,a) = E_π[Σ γᵗ R(sₜ,aₜ) | s₀=s, a₀=a]." }
      },
      {
        id: "hw5-2-2", hw: "hw5", section: "§2.2",
        title: { cn: "由定义推 Bellman 等式",
                 en: "Derive Bellman equation" },
        solution: {
          cn: "Q^π(s,a) = R(s,a) + γ E_{s'∼p, a'∼π}[Q^π(s', a')]。把第一步奖励拿出来，剩余从 t=1 开始重写为对下一个状态-动作对的 Q^π 期望。",
          en: "Q^π(s,a) = R(s,a) + γ E_{s'∼p, a'∼π}[Q^π(s',a')] — pull out first reward, recurse."
        }
      },
      {
        id: "hw5-2-3", hw: "hw5", section: "§2.3",
        title: { cn: "Q-learning 单步更新",
                 en: "Q-learning update" },
        solution: { cn: "Q(s,a) ← (1-α)Q(s,a) + α(r + γ maxₐ' Q(s',a'))。等价 Q(s,a) ← Q(s,a) + α[(r + γ maxₐ' Q(s',a')) − Q(s,a)]。", en: "Q ← Q + α[r + γ max_{a'} Q(s',a') − Q]." }
      },
      {
        id: "hw5-2-4", hw: "hw5", section: "§2.4",
        title: { cn: "max Q* 的上界与 R_max 的关系",
                 en: "Upper bound of max Q* in terms of R_max" },
        solution: { cn: "几何级数：Σₜ γᵗ R_max = R_max/(1-γ) ⇒ max Q* ≤ R_max/(1-γ)。", en: "max Q* ≤ R_max/(1−γ)." }
      },
      {
        id: "hw5-2-5", hw: "hw5", section: "§2.5",
        title: { cn: "证明 Bellman 算子 T 在 ℓ_∞ 下是 γ-收缩",
                 en: "T is γ-contraction in ℓ_∞" },
        solution: {
          cn: "对任意 s：(TV)(s) - (TU)(s) = maxₐ[R + γΣP·V] - maxₐ[R + γΣP·U]。max 之差 ≤ max 中差的 max（凸函数 ‘上包’）：≤ γ maxₐ ΣP(s'|s,a) (V(s')-U(s')) ≤ γ ‖V-U‖_∞ · maxₐ ΣP = γ‖V-U‖_∞。两侧取 |·| 与 sup 同理 ⇒ ‖TV-TU‖_∞ ≤ γ‖V-U‖_∞。",
          en: "|TV − TU|(s) ≤ γ max_a Σ P(s'|s,a)|V(s') − U(s')| ≤ γ‖V−U‖_∞."
        }
      }
    ]
  },

  "dynamic-programming": {
    tutorial: {
      cn: "Value iteration：反复用 Bellman 最优算子。Policy iteration：评估 V^π → 改进策略 → 重复。两者都需 model 已知。",
      en: "Value iter: repeat Bellman operator. Policy iter: evaluate, improve, repeat. Both need known P, R."
    },
    code: [{
      title: { cn: "Value Iteration", en: "Value Iteration" },
      code: `import numpy as np
def value_iter(P, R, gamma, tol=1e-6):
    S = P.shape[0]
    V = np.zeros(S)
    while True:
        Q = R + gamma * (P * V[None, None, :]).sum(-1)
        V_new = Q.max(axis=1)
        if np.max(np.abs(V_new - V)) < tol: break
        V = V_new
    pi = Q.argmax(axis=1)
    return V, pi
`
    }],
    problems: []
  },

  "q-learning": {
    tutorial: {
      cn: "Lecture 25 主线，Lecture 27 recap：Q-learning 是 model-free + off-policy。对每个 observed (s,a,r,s')，用 target r+γ maxₐ Q(s',a) 做指数滑动平均更新；α 是 learning rate。",
      en: "Lecture 25 main topic, Lecture 27 recap: Q-learning is model-free + off-policy. For each observed (s,a,r,s'), update by an exponential moving average toward target r+γ max_a Q(s',a); α is the learning rate."
    },
    code: [{
      title: { cn: "Tabular Q-learning", en: "Tabular Q-learning" },
      code: `import numpy as np
def qlearn_step(Q, s, a, r, s_next, alpha=0.1, gamma=0.9):
    target = r + gamma * Q[s_next].max()
    Q[s, a] += alpha * (target - Q[s, a])
`
    }],
    problems: [
      {
        id: "hw5-3-1", hw: "hw5", section: "§3.1",
        title: { cn: "Combination Lock：每个策略到 sₙ 的期望步数（学习前）",
                 en: "Expected steps to s_n before learning" },
        solution: {
          cn: "两种初始化在学习前都全平局，greedy policy 会随机打破平局。要从 $s_1$ 到 $s_n$，必须连续选 $n-1$ 次 $a_1$；等待 $n-1$ 连续成功的期望为 $2^n-2$。",
          en: "Both policies are random under ties. Reaching s_n requires n−1 consecutive a_1 choices, so the expected waiting time is 2^n−2."
        }
      },
      {
        id: "hw5-3-2", hw: "hw5", section: "§3.2",
        title: { cn: "在线更新 + π₁：仍然指数级期望步数",
                 en: "π₁ with online updates still exponential" },
        solution: {
          cn: "第一次观察到奖励前，所有非终点 transition 的 reward 都是 0，$Q_1$ 仍全为 0，因此策略仍随机，期望仍是 $2^n-2$。",
          en: "Before the rewarding transition is observed, all rewards are 0 and Q_1 stays tied, so the expected time remains 2^n−2."
        }
      },
      {
        id: "hw5-3-3", hw: "hw5", section: "§3.3",
        title: { cn: "重置后 π₁ 再到 sₙ 的期望步数",
                 en: "After first reach + reset, expected steps for π₁" },
        solution: {
          cn: "奖励 transition $(s_n,a_1,1,s_n)$ 更新后，$Q_1(s_n,a_1)>0$，但 $s_1$ 到 $s_{n-1}$ 仍全平局；从 $s_1$ 再到 $s_n$ 仍需随机连续选对，期望仍是 $2^n-2$。",
          en: "After updating the rewarding self-loop, only s_n changes; earlier states remain tied, so another run from s_1 still has expected time 2^n−2."
        }
      },
      {
        id: "hw5-3-4", hw: "hw5", section: "§3.4",
        title: { cn: "Replay buffer 如何加快 π₁ 收敛",
                 en: "Replay buffer speeds up π₁" },
        solution: {
          cn: "把整个轨迹存进 buffer 后反复 replay：从尾到头多次更新 ⇒ Q 值能一次反向传到 s₁。一次成功 trajectory 后下一次几乎贪心选 a₁ ⇒ 收敛速度从指数变成线性级。",
          en: "Replaying transitions in reverse order propagates the reward back to s₁ in one buffer pass — exponential → linear."
        }
      },
      {
        id: "hw5-3-5", hw: "hw5", section: "§3.5",
        title: { cn: "π₂（乐观初始化）：到 sₙ 的最少步数",
                 en: "Min steps for π₂ to reach s_n" },
        solution: {
          cn: "Q₂ ≡ R_max，全部相等 ⇒ argmax 每个状态都平局 ⇒ 但一旦走过 a₁ 一次没拿到奖励 ⇒ Q(s,a₁) ← (1-α)R_max + αγR_max < R_max。这时 a₂ (没走过) 仍 = R_max > a₁，πₙ 切到 a₂ ⇒ 回 s₁。但 s₁ 的 a₁ 也下降 → 这种 ‘乐观惩罚’ 反而探索整张图。",
          en: "Optimistic init makes the agent prefer untried actions; once visited, Q drops below R_max so policy switches. Min path = n−1 (going straight a₁..a₁) is the lower bound."
        }
      },
      {
        id: "hw5-3-6", hw: "hw5", section: "§3.6",
        title: { cn: "π₂ 到 sₙ 步数上界 ≤ §3.2 答案",
                 en: "π₂ steps ≤ π₁ steps from §3.2" },
        solution: {
          cn: "乐观初始化让未试动作保持高值；已试过且无奖励的动作会降到 1 以下。最坏情况可按“先在每个状态试错再走正路”估计，为 $(n-1)(n+2)/2$，并且对 $n\\ge2$ 不超过 $2^n-2$。",
          en: "Optimistic values make untried actions attractive; a tried zero-reward action drops below 1. Worst case is (n−1)(n+2)/2, which is no larger than 2^n−2 for n≥2."
        }
      }
    ]
  },

  "policy-gradient": {
    tutorial: {
      cn: "Lecture 25 推导 Policy Gradient：直接优化 J(θ)=Eτ[R(τ)]，用 log-derivative trick 得到 R(τ)Σ∇logπ。Lecture 27 practical extensions：advantage/actor-critic、PPO、LLM-as-MDP、GRPO（PPT 标注不考）。",
      en: "Lecture 25 derives policy gradient: maximize J(θ)=Eτ[R(τ)] using the log-derivative trick R(τ)Σ∇logπ. Lecture 27 practical extensions: advantage/actor-critic, PPO, LLM-as-MDP, GRPO (marked not exam-covered in slides)."
    },
    code: [{
      title: { cn: "REINFORCE", en: "REINFORCE" },
      code: `import torch
def reinforce_step(policy, traj, gamma=0.99):
    states, actions, rewards = zip(*traj)
    G = 0; returns = []
    for r in reversed(rewards):
        G = r + gamma * G; returns.insert(0, G)
    returns = torch.tensor(returns)
    returns = (returns - returns.mean()) / (returns.std() + 1e-8)   # baseline
    log_probs = torch.stack([policy.log_prob(s, a) for s, a in zip(states, actions)])
    return -(log_probs * returns).sum()
`
    }],
    problems: [
      {
        id: "hw5-4-1", hw: "hw5", section: "§4.1",
        title: { cn: "推导 ∇θJ = E_τ[R(τ) Σₜ ∇θ log πθ(aₜ|sₜ)]",
                 en: "Derive policy gradient via log-deriv trick" },
        solution: {
          cn: "J = E_τ[R(τ)] = ∫ Pπ(τ) R(τ) dτ。∇θ J = ∫ ∇θ Pπ(τ) R(τ) dτ = ∫ Pπ(τ) ∇θ log Pπ(τ) R(τ) dτ = E_τ[R(τ) ∇θ log Pπ(τ)]。Pπ(τ) = d₀(s₀) ∏ π(aₜ|sₜ) p(sₜ₊₁|sₜ,aₜ)；log 后 d₀ 与 p 与 θ 无关 ⇒ ∇θ log Pπ = Σₜ ∇θ log πθ(aₜ|sₜ)。",
          en: "Use ∇P = P·∇log P; only π depends on θ in P_π, leaving Σ ∇log π."
        }
      },
      {
        id: "hw5-4-2", hw: "hw5", section: "§4.2",
        title: { cn: "改写为 ∇θJ = E_{s∼dπ, a∼π}[Q^π(s,a) ∇θ log π(a|s)]",
                 en: "Rewrite as expectation under dπ" },
        solution: {
          cn: "J = E_{s∼d₀}[V^π(s)]，∇θ V^π(s) = Σₐ ∇π(a|s)·Q^π(s,a) + π(a|s)·γ Σ_{s'} p(s'|s,a)·∇V^π(s')。展开递归后用 dπ(s) = Σ_t γᵗ d₀^π_t(s) 累计折扣占用，化简为 ∇J = E_{s∼dπ, a∼π}[Q^π(s,a) ∇log π(a|s)]。",
          en: "Use V = Σ_a π(a|s)Q(s,a); apply policy gradient theorem (recursion) to get sum over discounted state-occupation dπ."
        }
      },
      {
        id: "hw5-4-3", hw: "hw5", section: "§4.3",
        title: { cn: "证明对任意 baseline f(s)：∇θJ = E[(Q^π - f(s)) ∇θ log π(a|s)]",
                 en: "Adding a baseline f(s) doesn't change the gradient" },
        solution: {
          cn: "只需证 E_{a∼π}[f(s) ∇log π(a|s)] = 0 = f(s) E_a[∇log π] = f(s) ∇θ Σ_a π(a|s) = f(s) ∇θ 1 = 0。所以减去 f(s) 不改变期望，但能降方差（选 V^π 是常用）。",
          en: "E_a[∇log π] = ∇Σπ = ∇1 = 0, so any state-only baseline is unbiased; reduces variance."
        }
      }
    ]
  },

};

// Structured HW2 data override. Runtime removes the older terse HW2 entries
// above, then re-adds the same progress ids with detailed paraphrased cues and
// step-by-step explanations.
(function () {
  const data = window.POPUP_DATA || {};
  const hw = "hw2";
  const join = parts => parts.join("\n\n");
  const detail = (en, cn) => ({ en: join(en), cn: join(cn) });

  Object.values(data).forEach(topic => {
    topic.problems = (topic.problems || []).filter(p => p.hw !== hw);
  });

  function add(slug, items) {
    if (!data[slug]) return;
    data[slug].problems = data[slug].problems || [];
    data[slug].problems.push(...items.map(item => ({ ...item, hw })));
  }

  add("svm", [
    {
      id: "hw2-1-1",
      section: "Problem 1.1",
      title: { en: "Check whether translating all samples changes SVM classification", cn: "判断整体平移训练样本是否改变 SVM classification" },
      original_excerpt: {
        en: "Detailed cue: true/false about adding the same constant vector to every training input and asking whether the SVM classification result changes.",
        cn: "题目要点：True/False；把所有 training inputs 同时加同一个 constant vector，判断 SVM classification result 是否改变。"
      },
      problem_understanding: {
        en: "The question is really about the bias term. A global coordinate shift can be absorbed by the intercept in an affine SVM decision rule.",
        cn: "这题真正考 bias / intercept。Affine SVM decision rule 里的 intercept 可以吸收整体坐标平移。"
      },
      knowledge_points: {
        en: "Standard SVM predicts sign(w^T x+b). If x'=x+c, choosing b'=b-w^T c keeps every score unchanged.",
        cn: "标准 SVM 用 sign(w^T x+b)。若 x'=x+c，取 b'=b-w^T c，就能让每个 score 不变。"
      },
      tips: {
        en: ["Check whether the model includes a bias term.", "A translation changes coordinates, not relative geometry.", "Prove invariance by rewriting the intercept."],
        cn: ["先确认 model 是否有 bias term。", "translation 改坐标，不改相对几何结构。", "用改写 intercept 的方式证明 invariance。"]
      },
      detailed_solution: detail([
        "### Answer",
        "- For the standard SVM with a bias term, the statement is false.\n- Translating every sample by the same vector does not change the classifier's predictions.",
        "### Original classifier",
        "$$\nf(x)=w^\\top x+b\n$$",
        "The class prediction is:",
        "$$\n\\operatorname{sign}(f(x))\n$$",
        "### Translate every input",
        "$$\nx'=x+c\n$$",
        "Use the same \(w\), but allow a new bias \(b'\):",
        "$$\nw^\\top x'+b'\n=w^\\top(x+c)+b'\n=w^\\top x+w^\\top c+b'\n$$",
        "### Choose the new bias",
        "$$\nb'=b-w^\\top c\n$$",
        "Then:",
        "$$\nw^\\top x'+b'=w^\\top x+b\n$$",
        "### Conclusion",
        "- Every score is unchanged.\n- Every sign prediction is unchanged.\n- Therefore the SVM classification result is unchanged."
      ], [
        "### 答案",
        "- 对带 bias term 的标准 SVM，这个说法是 False。\n- 把每个 sample 平移同一个 vector，不会改变 predictions。",
        "### 原 classifier",
        "$$\nf(x)=w^\\top x+b\n$$",
        "class prediction 是：",
        "$$\n\\operatorname{sign}(f(x))\n$$",
        "### 平移每个输入",
        "$$\nx'=x+c\n$$",
        "保持同一个 \(w\)，但允许新的 bias \(b'\)：",
        "$$\nw^\\top x'+b'\n=w^\\top(x+c)+b'\n=w^\\top x+w^\\top c+b'\n$$",
        "### 选择新的 bias",
        "$$\nb'=b-w^\\top c\n$$",
        "于是：",
        "$$\nw^\\top x'+b'=w^\\top x+b\n$$",
        "### 结论",
        "- 每个 score 不变。\n- 每个 sign prediction 不变。\n- 因此 SVM classification result 不变。"
      ])
    },
    {
      id: "hw2-2",
      section: "Problem 2",
      title: { en: "Derive the soft-margin SVM dual and compare it with hard-margin SVM", cn: "推导 soft-margin SVM dual，并比较 hard-margin SVM" },
      original_excerpt: {
        en: "Detailed cue: start from the soft-margin primal with slack variables, penalty C, margin constraints, and nonnegative slack constraints; derive the dual and explain the connection to hard-margin SVM.",
        cn: "题目要点：从 soft-margin primal 出发，包含 slack variables、penalty C、margin constraints、nonnegative slack constraints；推导 dual，并说明和 hard-margin SVM 的关系。"
      },
      problem_understanding: {
        en: "This is a Lagrangian/KKT derivation. You introduce multipliers, take stationarity over primal variables, and read the dual constraints.",
        cn: "这是 Lagrangian / KKT 推导。引入 multipliers，对 primal variables 求 stationarity，再读出 dual constraints。"
      },
      knowledge_points: {
        en: "Soft-margin SVM adds slack xi_i and C sum_i xi_i. The dual objective matches hard-margin SVM but gains the box constraint 0<=alpha_i<=C.",
        cn: "Soft-margin SVM 加 slack \\(\\xi_i\\) 和 \\(C\\sum_i\\xi_i\\)。dual objective 与 hard-margin 相同，但多出 box constraint \\(0<=alpha_i<=C\\)。"
      },
      tips: {
        en: ["Put each inequality into <=0 form first.", "Differentiate with respect to w, b, and xi_i.", "The upper bound on alpha_i comes from the xi_i derivative."],
        cn: ["先把每个 inequality 写成 <=0。", "分别对 w、b、xi_i 求导。", "alpha_i 的上界来自 xi_i derivative。"]
      },
      detailed_solution: detail([
        "### Primal",
        "$$\n\\min_{w,b,\\xi}\\ \\frac12\\|w\\|^2+C\\sum_i\\xi_i\n$$",
        "subject to:",
        "$$\ny_i(w^\\top x_i+b)\\ge 1-\\xi_i,\\qquad \\xi_i\\ge0\n$$",
        "### Lagrangian",
        "Rewrite the constraints as:",
        "$$\n1-\\xi_i-y_i(w^\\top x_i+b)\\le0,\\qquad -\\xi_i\\le0\n$$",
        "Use multipliers \\(\\alpha_i\\ge0\\) and \\(\\mu_i\\ge0\\):",
        "$$\nL=\\frac12\\|w\\|^2+C\\sum_i\\xi_i\n+\\sum_i\\alpha_i(1-\\xi_i-y_i(w^\\top x_i+b))\n-\\sum_i\\mu_i\\xi_i\n$$",
        "### Stationarity in \(w\)",
        "$$\n\\frac{\\partial L}{\\partial w}=w-\\sum_i\\alpha_i y_i x_i=0\n$$",
        "$$\nw=\\sum_i\\alpha_i y_i x_i\n$$",
        "### Stationarity in \(b\)",
        "$$\n\\frac{\\partial L}{\\partial b}=-\\sum_i\\alpha_i y_i=0\n$$",
        "$$\n\\sum_i\\alpha_i y_i=0\n$$",
        "### Stationarity in \\(\\xi_i\\)",
        "$$\n\\frac{\\partial L}{\\partial \\xi_i}=C-\\alpha_i-\\mu_i=0\n$$",
        "Since \\(\\mu_i\\ge0\\):",
        "$$\n0\\le\\alpha_i\\le C\n$$",
        "### Dual",
        "$$\n\\max_\\alpha\\ \\sum_i\\alpha_i\n-\\frac12\\sum_i\\sum_j\\alpha_i\\alpha_j y_i y_j x_i^\\top x_j\n$$",
        "subject to:",
        "$$\n0\\le\\alpha_i\\le C,\\qquad \\sum_i\\alpha_i y_i=0\n$$",
        "### Connection",
        "- Same quadratic objective as hard-margin SVM.\n- Same equality constraint.\n- New box constraint \(0\\le\\alpha_i\\le C\), which allows controlled margin violations."
      ], [
        "### Primal",
        "$$\n\\min_{w,b,\\xi}\\ \\frac12\\|w\\|^2+C\\sum_i\\xi_i\n$$",
        "约束是：",
        "$$\ny_i(w^\\top x_i+b)\\ge 1-\\xi_i,\\qquad \\xi_i\\ge0\n$$",
        "### Lagrangian",
        "先改写 constraints：",
        "$$\n1-\\xi_i-y_i(w^\\top x_i+b)\\le0,\\qquad -\\xi_i\\le0\n$$",
        "使用 multipliers \\(\\alpha_i\\ge0\\) 和 \\(\\mu_i\\ge0\\)：",
        "$$\nL=\\frac12\\|w\\|^2+C\\sum_i\\xi_i\n+\\sum_i\\alpha_i(1-\\xi_i-y_i(w^\\top x_i+b))\n-\\sum_i\\mu_i\\xi_i\n$$",
        "### 对 \(w\) 求 stationarity",
        "$$\n\\frac{\\partial L}{\\partial w}=w-\\sum_i\\alpha_i y_i x_i=0\n$$",
        "$$\nw=\\sum_i\\alpha_i y_i x_i\n$$",
        "### 对 \(b\) 求 stationarity",
        "$$\n\\frac{\\partial L}{\\partial b}=-\\sum_i\\alpha_i y_i=0\n$$",
        "$$\n\\sum_i\\alpha_i y_i=0\n$$",
        "### 对 \\(\\xi_i\\) 求 stationarity",
        "$$\n\\frac{\\partial L}{\\partial \\xi_i}=C-\\alpha_i-\\mu_i=0\n$$",
        "因为 \\(\\mu_i\\ge0\\)：",
        "$$\n0\\le\\alpha_i\\le C\n$$",
        "### Dual",
        "$$\n\\max_\\alpha\\ \\sum_i\\alpha_i\n-\\frac12\\sum_i\\sum_j\\alpha_i\\alpha_j y_i y_j x_i^\\top x_j\n$$",
        "约束：",
        "$$\n0\\le\\alpha_i\\le C,\\qquad \\sum_i\\alpha_i y_i=0\n$$",
        "### 关系",
        "- quadratic objective 与 hard-margin SVM 相同。\n- equality constraint 相同。\n- 新增 box constraint \(0\\le\\alpha_i\\le C\)，表示允许受控的 margin violations。"
      ])
    },
    {
      id: "hw2-3-1",
      section: "Problem 3.1",
      title: { en: "Write hard-margin SVM prediction using the dual solution", cn: "用 dual solution 写 hard-margin SVM prediction" },
      original_excerpt: {
        en: "Detailed cue: given the optimal dual variables, training examples and labels, express f(x)=w-hat^T x for a new x.",
        cn: "题目要点：已知 optimal dual variables、training examples 和 labels；对新输入 x 写出 \(f(x)=\hat w^\top x\)。"
      },
      problem_understanding: {
        en: "Use stationarity to reconstruct w from alpha, then substitute into the prediction score.",
        cn: "用 stationarity 从 alpha 重构 w，再代入 prediction score。"
      },
      knowledge_points: {
        en: "Hard-margin SVM satisfies w=sum_i alpha_i y_i x_i. Prediction is sign of the resulting score.",
        cn: "Hard-margin SVM 满足 \(w=\sum_i\alpha_i y_i x_i\)。Prediction 是 score 的 sign。"
      },
      tips: {
        en: ["Write w-hat first.", "Substitute into f(x)=w-hat^T x.", "Do not use the RBF kernel in this subpart."],
        cn: ["先写 \(\hat w\)。", "代入 \(f(x)=\hat w^\top x\)。", "这一小问不要用 RBF kernel。"]
      },
      detailed_solution: detail([
        "### Reconstruct the weight",
        "$$\n\\hat w=\\sum_{i=1}^N \\hat\\alpha_i y_i x_i\n$$",
        "### Substitute into prediction",
        "$$\nf(x)=\\hat w^\\top x\n$$",
        "$$\nf(x)=\\left(\\sum_{i=1}^N \\hat\\alpha_i y_i x_i\\right)^\\top x\n$$",
        "Use linearity:",
        "$$\nf(x)=\\sum_{i=1}^N \\hat\\alpha_i y_i x_i^\\top x\n$$",
        "### Final label",
        "$$\n\\hat y=\\operatorname{sign}(f(x))\n$$"
      ], [
        "### 重构 weight",
        "$$\n\\hat w=\\sum_{i=1}^N \\hat\\alpha_i y_i x_i\n$$",
        "### 代入 prediction",
        "$$\nf(x)=\\hat w^\\top x\n$$",
        "$$\nf(x)=\\left(\\sum_{i=1}^N \\hat\\alpha_i y_i x_i\\right)^\\top x\n$$",
        "利用 linearity：",
        "$$\nf(x)=\\sum_{i=1}^N \\hat\\alpha_i y_i x_i^\\top x\n$$",
        "### 最终 label",
        "$$\n\\hat y=\\operatorname{sign}(f(x))\n$$"
      ])
    }
  ]);
})();

// Final practice problem cards. These use the practice PDF as the source and
// intentionally suppress the missing official-solution chip with sol_pdf: null.
(function addFinalPracticeProblems() {
  const data = window.POPUP_DATA || {};
  const hw = "final-practice";
  const hw_pdf = "HW/final_practice_problems.pdf";
  const sol_pdf = null;
  const join = parts => parts.join("\n\n");
  const detail = (en, cn) => ({ en: join(en), cn: join(cn) });

  Object.values(data).forEach(topic => {
    topic.problems = (topic.problems || []).filter(p => p.hw !== hw);
  });

  const add = (slug, items) => {
    if (!data[slug]) return;
    data[slug].problems = data[slug].problems || [];
    data[slug].problems.push(...items.map(item => ({ ...item, hw, hw_pdf, sol_pdf })));
  };

  add("kernel-methods", [
    {
      id: "final-practice-p1",
      section: "Problem 1",
      title: { en: "Compute a polynomial-kernel matrix and verify the feature map", cn: "计算 polynomial-kernel matrix 并验证 feature map" },
      original_excerpt: { en: "Detailed cue: two vectors in R2, x1=(1,1) and x2=(2,-1); kernel k(x,y)=(x^T y)^2; compute the 2 by 2 kernel matrix, verify the explicit quadratic feature map, and explain the kernel trick.", cn: "题目要点：两个 R2 vectors，x1=(1,1)、x2=(2,-1)；kernel 为 k(x,y)=(x^T y)^2；计算 2 by 2 kernel matrix，验证 explicit quadratic feature map，并解释 kernel trick。" },
      problem_understanding: { en: "The problem checks that a kernel matrix can be computed either directly from the kernel or indirectly by inner products after a feature map. Both routes must give the same Gram matrix.", cn: "这题检查 kernel matrix 可以直接用 kernel 算，也可以先做 feature map 再算 inner products。两条路线必须得到同一个 Gram matrix。" },
      knowledge_points: { en: "For the degree-2 homogeneous polynomial kernel in R2, phi(x)=(x_1^2, sqrt(2)x_1x_2, x_2^2) makes phi(x)^T phi(y)=(x^T y)^2.", cn: "对 R2 中 degree-2 homogeneous polynomial kernel，phi(x)=(x_1^2, sqrt(2)x_1x_2, x_2^2) 使得 phi(x)^T phi(y)=(x^T y)^2。" },
      tips: { en: ["Compute the four dot products before squaring.", "Use the sqrt(2) coordinate to create the coefficient 2 cross term.", "Explain that the kernel trick avoids explicitly building phi(x)."], cn: ["先算四个 dot products，再平方。", "用 sqrt(2) coordinate 产生 coefficient 2 的 cross term。", "说明 kernel trick 避免显式构造 phi(x)。"] },
      detailed_solution: detail([
        "### Dot products",
        "$$\nx_1^\\top x_1=2,\n\\qquad\nx_1^\\top x_2=1,\n\\qquad\nx_2^\\top x_2=5\n$$",
        "The matrix is symmetric, so x2^T x1 is also 1.",
        "### Square for the polynomial kernel",
        "$$\nK_{ij}=k(x_i,x_j)=(x_i^\\top x_j)^2\n$$",
        "$$\nK=\\begin{pmatrix}\n2^2 & 1^2\\\\\n1^2 & 5^2\n\\end{pmatrix}\n=\n\\begin{pmatrix}\n4 & 1\\\\\n1 & 25\n\\end{pmatrix}\n$$",
        "### Feature-map values",
        "$$\n\\phi(x)=\\begin{pmatrix}x_1^2\\\\ \\sqrt2 x_1x_2\\\\ x_2^2\\end{pmatrix}\n$$",
        "$$\n\\phi(1,1)=\\begin{pmatrix}1\\\\ \\sqrt2\\\\ 1\\end{pmatrix},\n\\qquad\n\\phi(2,-1)=\\begin{pmatrix}4\\\\ -2\\sqrt2\\\\ 1\\end{pmatrix}\n$$",
        "### Verify inner products",
        "$$\n\\phi(x_1)^\\top\\phi(x_1)=1+2+1=4\n$$",
        "$$\n\\phi(x_1)^\\top\\phi(x_2)=4-4+1=1\n$$",
        "$$\n\\phi(x_2)^\\top\\phi(x_2)=16+8+1=25\n$$",
        "These match the entries of K.",
        "### General identity",
        "$$\n\\phi(x)^\\top\\phi(y)\n=x_1^2y_1^2+2x_1x_2y_1y_2+x_2^2y_2^2\n=(x^\\top y)^2\n$$",
        "### Kernel trick",
        "Instead of forming phi(x) in a larger feature space, compute (x^T y)^2 directly in the original space. For higher dimensions or higher degrees, this avoids a much larger explicit feature vector."
      ], [
        "### Dot products",
        "$$\nx_1^\\top x_1=2,\n\\qquad\nx_1^\\top x_2=1,\n\\qquad\nx_2^\\top x_2=5\n$$",
        "matrix symmetric，所以 x2^T x1 也是 1。",
        "### 对 polynomial kernel 平方",
        "$$\nK_{ij}=k(x_i,x_j)=(x_i^\\top x_j)^2\n$$",
        "$$\nK=\\begin{pmatrix}\n2^2 & 1^2\\\\\n1^2 & 5^2\n\\end{pmatrix}\n=\n\\begin{pmatrix}\n4 & 1\\\\\n1 & 25\n\\end{pmatrix}\n$$",
        "### Feature-map values",
        "$$\n\\phi(x)=\\begin{pmatrix}x_1^2\\\\ \\sqrt2 x_1x_2\\\\ x_2^2\\end{pmatrix}\n$$",
        "$$\n\\phi(1,1)=\\begin{pmatrix}1\\\\ \\sqrt2\\\\ 1\\end{pmatrix},\n\\qquad\n\\phi(2,-1)=\\begin{pmatrix}4\\\\ -2\\sqrt2\\\\ 1\\end{pmatrix}\n$$",
        "### Verify inner products",
        "$$\n\\phi(x_1)^\\top\\phi(x_1)=1+2+1=4\n$$",
        "$$\n\\phi(x_1)^\\top\\phi(x_2)=4-4+1=1\n$$",
        "$$\n\\phi(x_2)^\\top\\phi(x_2)=16+8+1=25\n$$",
        "这些值正好 match K 的 entries。",
        "### General identity",
        "$$\n\\phi(x)^\\top\\phi(y)\n=x_1^2y_1^2+2x_1x_2y_1y_2+x_2^2y_2^2\n=(x^\\top y)^2\n$$",
        "### Kernel trick",
        "不用显式构造更高维 feature space 中的 phi(x)，直接在 original space 计算 (x^T y)^2。dimension 或 degree 变大时，这能避免很大的 explicit feature vector。"
      ])
    }
  ]);

  add("q-learning", [
    {
      id: "final-practice-p2",
      section: "Problem 2",
      title: { en: "Update a Q-learning table through two line-world episodes", cn: "通过两个 line-world episodes 更新 Q-learning table" },
      original_excerpt: { en: "Detailed cue: four-state line world 0-1-2-3 with terminal goal 3, actions L/R, step reward -1 plus extra +10 when entering 3, gamma=0.9, alpha=1, zero initial Q table, and two specified episodes to process in order.", cn: "题目要点：四状态 line world 0-1-2-3，terminal goal 为 3，actions 为 L/R；每步 reward -1，进入 3 额外 +10；gamma=0.9、alpha=1、initial Q table 全 0，并按顺序处理两个给定 episodes。" },
      problem_understanding: { en: "Because alpha is 1, each visited Q entry is replaced by the one-step target. The table must be updated immediately after each transition, so later transitions in episode 2 can use earlier updates.", cn: "因为 alpha=1，每个 visited Q entry 会直接替换成 one-step target。table 必须在每个 transition 后立刻更新，所以 episode 2 后面的 transitions 会使用前面刚更新的值。" },
      knowledge_points: { en: "Q-learning target is r + gamma max_{a'} Q(s',a'). Terminal next states have future value 0.", cn: "Q-learning target 是 r + gamma max_{a'} Q(s',a')。terminal next state 的 future value 是 0。" },
      tips: { en: ["With alpha=1, ignore the old value except through the current table.", "Update in trajectory order.", "Use terminal future value 0 when the agent reaches state 3."], cn: ["alpha=1 时，old value 不做 averaging，只通过 current table 影响 max。", "严格按 trajectory order 更新。", "到达 state 3 时 terminal future value 取 0。"] },
      detailed_solution: detail([
        "### Update rule",
        "$$\nQ(s,a)\\leftarrow r+\\gamma\\max_{a'}Q(s',a')\n$$",
        "because alpha=1.",
        "### Episode 1",
        "Transition 0 --R--> 1 has reward -1 and next values all zero.",
        "$$\nQ(0,R)=-1+0.9\\max(0,0)=-1\n$$",
        "Transition 1 --R--> 2 also has reward -1 and next values still zero.",
        "$$\nQ(1,R)=-1+0.9\\max(0,0)=-1\n$$",
        "Transition 2 --R--> 3 enters the terminal goal, so reward is 9 and future value is 0.",
        "$$\nQ(2,R)=9+0.9\\cdot0=9\n$$",
        "### Table after episode 1",
        "$$\n\\begin{array}{c|cc}\ns & Q(s,L) & Q(s,R)\\\\\n\\hline\n0 & 0 & -1\\\\\n1 & 0 & -1\\\\\n2 & 0 & 9\\\\\n3 & 0 & 0\n\\end{array}\n$$",
        "### Episode 2, first transition",
        "Transition 1 --L--> 0 has reward -1.",
        "$$\nQ(1,L)=-1+0.9\\max(Q(0,L),Q(0,R))=-1+0.9\\max(0,-1)=-1\n$$",
        "### Episode 2, second transition",
        "Transition 0 --R--> 1 uses the already-updated row for state 1.",
        "$$\nQ(0,R)=-1+0.9\\max(Q(1,L),Q(1,R))=-1+0.9\\max(-1,-1)=-1.9\n$$",
        "### Episode 2, third transition",
        "Transition 1 --R--> 2 now sees Q(2,R)=9.",
        "$$\nQ(1,R)=-1+0.9\\max(Q(2,L),Q(2,R))=-1+0.9\\max(0,9)=7.1\n$$",
        "### Episode 2, final transition",
        "Transition 2 --R--> 3 again has terminal reward 9.",
        "$$\nQ(2,R)=9+0.9\\cdot0=9\n$$",
        "### Final table",
        "$$\n\\begin{array}{c|cc}\ns & Q(s,L) & Q(s,R)\\\\\n\\hline\n0 & 0 & -1.9\\\\\n1 & -1 & 7.1\\\\\n2 & 0 & 9\\\\\n3 & 0 & 0\n\\end{array}\n$$"
      ], [
        "### Update rule",
        "$$\nQ(s,a)\\leftarrow r+\\gamma\\max_{a'}Q(s',a')\n$$",
        "因为 alpha=1。",
        "### Episode 1",
        "transition 0 --R--> 1 的 reward 是 -1，next values 全为 zero。",
        "$$\nQ(0,R)=-1+0.9\\max(0,0)=-1\n$$",
        "transition 1 --R--> 2 也是 reward -1，next values 仍为 zero。",
        "$$\nQ(1,R)=-1+0.9\\max(0,0)=-1\n$$",
        "transition 2 --R--> 3 进入 terminal goal，reward 是 9，future value 是 0。",
        "$$\nQ(2,R)=9+0.9\\cdot0=9\n$$",
        "### Episode 1 后 table",
        "$$\n\\begin{array}{c|cc}\ns & Q(s,L) & Q(s,R)\\\\\n\\hline\n0 & 0 & -1\\\\\n1 & 0 & -1\\\\\n2 & 0 & 9\\\\\n3 & 0 & 0\n\\end{array}\n$$",
        "### Episode 2，第一个 transition",
        "transition 1 --L--> 0 的 reward 是 -1。",
        "$$\nQ(1,L)=-1+0.9\\max(Q(0,L),Q(0,R))=-1+0.9\\max(0,-1)=-1\n$$",
        "### Episode 2，第二个 transition",
        "transition 0 --R--> 1 会使用 state 1 已经更新过的 row。",
        "$$\nQ(0,R)=-1+0.9\\max(Q(1,L),Q(1,R))=-1+0.9\\max(-1,-1)=-1.9\n$$",
        "### Episode 2，第三个 transition",
        "transition 1 --R--> 2 现在能看到 Q(2,R)=9。",
        "$$\nQ(1,R)=-1+0.9\\max(Q(2,L),Q(2,R))=-1+0.9\\max(0,9)=7.1\n$$",
        "### Episode 2，最后一个 transition",
        "transition 2 --R--> 3 再次获得 terminal reward 9。",
        "$$\nQ(2,R)=9+0.9\\cdot0=9\n$$",
        "### Final table",
        "$$\n\\begin{array}{c|cc}\ns & Q(s,L) & Q(s,R)\\\\\n\\hline\n0 & 0 & -1.9\\\\\n1 & -1 & 7.1\\\\\n2 & 0 & 9\\\\\n3 & 0 & 0\n\\end{array}\n$$"
      ])
    }
  ]);

  add("vae", [
    {
      id: "final-practice-p3",
      section: "Problem 3",
      title: { en: "Derive the VAE Gaussian KL term and gradients", cn: "推导 VAE Gaussian KL term 和 gradients" },
      original_excerpt: { en: "Detailed cue: q_phi(z|x) is N(mu, sigma squared I), prior p0 is N(0,I), z is d-dimensional; simplify the KL and compute gradients with respect to mu and scalar sigma.", cn: "题目要点：q_phi(z|x)=N(mu, sigma squared I)，prior p0=N(0,I)，z 为 d-dimensional；化简 KL，并计算对 mu 与 scalar sigma 的 gradients。" },
      problem_understanding: { en: "This is the closed-form Gaussian KL used in a VAE ELBO. The isotropic covariance makes the trace and determinant terms simple.", cn: "这是 VAE ELBO 中常用的 closed-form Gaussian KL。isotropic covariance 让 trace 和 determinant terms 变得很简单。" },
      knowledge_points: { en: "For q=N(mu,Sigma) and p=N(0,I), KL is one half of trace(Sigma)+mu^T mu-d-log det(Sigma).", cn: "对 q=N(mu,Sigma)、p=N(0,I)，KL 是 one half of trace(Sigma)+mu^T mu-d-log det(Sigma)。" },
      tips: { en: ["Use the multivariate Gaussian KL formula.", "For sigma squared I, trace is d sigma squared and determinant is sigma to the 2d.", "Differentiate the simplified expression."], cn: ["使用 multivariate Gaussian KL formula。", "sigma squared I 的 trace 是 d sigma squared，determinant 是 sigma to the 2d。", "对化简后的 expression 求导。"] },
      detailed_solution: detail([
        "### Gaussian KL formula",
        "$$\nD_{KL}(q\\|p)=\\frac12\\left[\\operatorname{tr}(\\Sigma_p^{-1}\\Sigma_q)+(\mu_p-\mu_q)^\\top\\Sigma_p^{-1}(\\mu_p-\mu_q)-d+\log\\frac{|\\Sigma_p|}{|\\Sigma_q|}\\right]\n$$",
        "Here Sigma_p=I, mu_p=0, Sigma_q=sigma^2 I, and mu_q=mu.",
        "### Compute terms",
        "$$\n\\operatorname{tr}(I\\cdot\\sigma^2I)=d\\sigma^2\n$$",
        "$$\n(0-\\mu)^\\top I(0-\\mu)=\\|\\mu\\|_2^2\n$$",
        "$$\n|I|=1,\n\\qquad\n|\\sigma^2I|=\\sigma^{2d}\n$$",
        "$$\n\\log\\frac{|I|}{|\\sigma^2I|}=-2d\\log\\sigma\n$$",
        "### KL expression",
        "$$\nD_{KL}(q_\\phi(z\\mid x)\\|p_0)=\n\\frac12\\left[\\|\\mu\\|_2^2+d\\sigma^2-d-2d\\log\\sigma\\right]\n$$",
        "Equivalently,",
        "$$\nD_{KL}=\\frac12\\left[\\|\\mu\\|_2^2+d(\\sigma^2-1-\\log\\sigma^2)\\right]\n$$",
        "### Gradient with respect to mu",
        "$$\n\\nabla_\\mu D_{KL}=\\mu\n$$",
        "### Gradient with respect to scalar sigma",
        "$$\n\\frac{\\partial D_{KL}}{\\partial\\sigma}\n=\\frac12d\\left(2\\sigma-\\frac{2}{\\sigma}\\right)\n=d\\left(\\sigma-\\frac1\\sigma\\right)\n$$",
        "If sigma is diagonal with separate entries, the same derivative applies coordinatewise."
      ], [
        "### Gaussian KL formula",
        "$$\nD_{KL}(q\\|p)=\\frac12\\left[\\operatorname{tr}(\\Sigma_p^{-1}\\Sigma_q)+(\mu_p-\mu_q)^\\top\\Sigma_p^{-1}(\\mu_p-\mu_q)-d+\log\\frac{|\\Sigma_p|}{|\\Sigma_q|}\\right]\n$$",
        "这里 Sigma_p=I，mu_p=0，Sigma_q=sigma^2 I，mu_q=mu。",
        "### Compute terms",
        "$$\n\\operatorname{tr}(I\\cdot\\sigma^2I)=d\\sigma^2\n$$",
        "$$\n(0-\\mu)^\\top I(0-\\mu)=\\|\\mu\\|_2^2\n$$",
        "$$\n|I|=1,\n\\qquad\n|\\sigma^2I|=\\sigma^{2d}\n$$",
        "$$\n\\log\\frac{|I|}{|\\sigma^2I|}=-2d\\log\\sigma\n$$",
        "### KL expression",
        "$$\nD_{KL}(q_\\phi(z\\mid x)\\|p_0)=\n\\frac12\\left[\\|\\mu\\|_2^2+d\\sigma^2-d-2d\\log\\sigma\\right]\n$$",
        "等价地，",
        "$$\nD_{KL}=\\frac12\\left[\\|\\mu\\|_2^2+d(\\sigma^2-1-\\log\\sigma^2)\\right]\n$$",
        "### 对 mu 的 gradient",
        "$$\n\\nabla_\\mu D_{KL}=\\mu\n$$",
        "### 对 scalar sigma 的 gradient",
        "$$\n\\frac{\\partial D_{KL}}{\\partial\\sigma}\n=\\frac12d\\left(2\\sigma-\\frac{2}{\\sigma}\\right)\n=d\\left(\\sigma-\\frac1\\sigma\\right)\n$$",
        "如果 sigma 是 diagonal entries，各 coordinate 使用同样的 derivative。"
      ])
    }
  ]);

  add("diffusion", [
    {
      id: "final-practice-p4",
      section: "Problem 4",
      title: { en: "Prove the diffusion terminal KL expectation identity", cn: "证明 diffusion terminal KL expectation identity" },
      original_excerpt: { en: "Detailed cue: using the Markov forward noising factorization, rewrite an expectation over q(x_{T-1},x_T|x0) of log p(x_T)/q(x_T|x_{T-1}) as a negative expected KL over x_{T-1}.", cn: "题目要点：使用 Markov forward noising factorization，把 q(x_{T-1},x_T|x0) 下 log p(x_T)/q(x_T|x_{T-1}) 的 expectation 改写成对 x_{T-1} 的 negative expected KL。" },
      problem_understanding: { en: "The inner expectation is over x_T conditioned on x_{T-1}. Since KL(q||p)=E_q log(q/p), the problem's log(p/q) is exactly negative KL.", cn: "inner expectation 是在给定 x_{T-1} 后对 x_T 取。因为 KL(q||p)=E_q log(q/p)，题里的 log(p/q) 正好是 negative KL。" },
      knowledge_points: { en: "Use Markov factorization q(x_{T-1},x_T|x0)=q(x_{T-1}|x0)q(x_T|x_{T-1}) and recognize an inner KL divergence.", cn: "使用 Markov factorization q(x_{T-1},x_T|x0)=q(x_{T-1}|x0)q(x_T|x_{T-1})，并识别 inner KL divergence。" },
      tips: { en: ["Write the joint expectation as a nested integral.", "Keep the minus sign from log(p/q).", "The outer expectation remains over q(x_{T-1}|x0)."], cn: ["把 joint expectation 写成 nested integral。", "不要丢掉 log(p/q) 带来的 minus sign。", "outer expectation 仍然是对 q(x_{T-1}|x0)。"] },
      detailed_solution: detail([
        "### Markov factorization",
        "$$\nq(x_{T-1},x_T\\mid x_0)=q(x_{T-1}\\mid x_0)q(x_T\\mid x_{T-1})\n$$",
        "### Write the expectation as nested expectations",
        "$$\n\\mathbb E_{q(x_{T-1},x_T\\mid x_0)}\\left[\\log\\frac{p(x_T)}{q(x_T\\mid x_{T-1})}\\right]\n$$",
        "$$\n=\n\\mathbb E_{q(x_{T-1}\\mid x_0)}\\left[\n\\mathbb E_{q(x_T\\mid x_{T-1})}\\left[\n\\log\\frac{p(x_T)}{q(x_T\\mid x_{T-1})}\n\\right]\n\\right]\n$$",
        "### Recognize the inner term",
        "For fixed x_{T-1},",
        "$$\nD_{KL}(q(x_T\\mid x_{T-1})\\|p(x_T))\n=\n\\mathbb E_{q(x_T\\mid x_{T-1})}\\left[\n\\log\\frac{q(x_T\\mid x_{T-1})}{p(x_T)}\n\\right]\n$$",
        "Therefore",
        "$$\n\\mathbb E_{q(x_T\\mid x_{T-1})}\\left[\n\\log\\frac{p(x_T)}{q(x_T\\mid x_{T-1})}\n\\right]\n=\n-D_{KL}(q(x_T\\mid x_{T-1})\\|p(x_T))\n$$",
        "### Substitute back",
        "$$\n\\mathbb E_{q(x_{T-1},x_T\\mid x_0)}\\left[\\log\\frac{p(x_T)}{q(x_T\\mid x_{T-1})}\\right]\n=\n-\\mathbb E_{q(x_{T-1}\\mid x_0)}\\left[\nD_{KL}(q(x_T\\mid x_{T-1})\\|p(x_T))\n\\right]\n$$"
      ], [
        "### Markov factorization",
        "$$\nq(x_{T-1},x_T\\mid x_0)=q(x_{T-1}\\mid x_0)q(x_T\\mid x_{T-1})\n$$",
        "### 写成 nested expectations",
        "$$\n\\mathbb E_{q(x_{T-1},x_T\\mid x_0)}\\left[\\log\\frac{p(x_T)}{q(x_T\\mid x_{T-1})}\\right]\n$$",
        "$$\n=\n\\mathbb E_{q(x_{T-1}\\mid x_0)}\\left[\n\\mathbb E_{q(x_T\\mid x_{T-1})}\\left[\n\\log\\frac{p(x_T)}{q(x_T\\mid x_{T-1})}\n\\right]\n\\right]\n$$",
        "### 识别 inner term",
        "固定 x_{T-1} 时，",
        "$$\nD_{KL}(q(x_T\\mid x_{T-1})\\|p(x_T))\n=\n\\mathbb E_{q(x_T\\mid x_{T-1})}\\left[\n\\log\\frac{q(x_T\\mid x_{T-1})}{p(x_T)}\n\\right]\n$$",
        "因此",
        "$$\n\\mathbb E_{q(x_T\\mid x_{T-1})}\\left[\n\\log\\frac{p(x_T)}{q(x_T\\mid x_{T-1})}\n\\right]\n=\n-D_{KL}(q(x_T\\mid x_{T-1})\\|p(x_T))\n$$",
        "### Substitute back",
        "$$\n\\mathbb E_{q(x_{T-1},x_T\\mid x_0)}\\left[\\log\\frac{p(x_T)}{q(x_T\\mid x_{T-1})}\\right]\n=\n-\\mathbb E_{q(x_{T-1}\\mid x_0)}\\left[\nD_{KL}(q(x_T\\mid x_{T-1})\\|p(x_T))\n\\right]\n$$"
      ])
    }
  ]);

  add("optimization", [
    {
      id: "final-practice-p5",
      section: "Problem 5",
      title: { en: "Derive Gamma log-likelihood and prove concavity by Hessian", cn: "推导 Gamma log-likelihood 并用 Hessian 证明 concavity" },
      original_excerpt: { en: "Detailed cue: iid Gamma(alpha,beta) samples with shape alpha and rate beta; derive log-likelihood, compute the Hessian using digamma/trigamma, and show the Hessian is negative semidefinite on alpha>0,beta>0.", cn: "题目要点：iid Gamma(alpha,beta) samples，alpha 是 shape、beta 是 rate；推导 log-likelihood，使用 digamma/trigamma 计算 Hessian，并在 alpha>0,beta>0 上证明 Hessian negative semidefinite。" },
      problem_understanding: { en: "The likelihood becomes easier after taking logs. Concavity is checked by the 2 by 2 Hessian: negative diagonal entries plus nonnegative determinant.", cn: "likelihood 取 log 后更容易处理。concavity 通过 2 by 2 Hessian 检查：diagonal entries 为 negative，并且 determinant nonnegative。" },
      knowledge_points: { en: "Derivative of log Gamma is digamma psi; derivative of psi is trigamma psi_1. The bound alpha psi_1(alpha)>1 makes the Hessian determinant positive.", cn: "log Gamma 的 derivative 是 digamma psi；psi 的 derivative 是 trigamma psi_1。bound alpha psi_1(alpha)>1 使 Hessian determinant 为 positive。" },
      tips: { en: ["Use sufficient statistics sum x_i and sum log x_i.", "Differentiate log Gamma through psi and psi_1.", "For a symmetric 2 by 2 Hessian, check diagonal signs and determinant."], cn: ["使用 sufficient statistics sum x_i 和 sum log x_i。", "通过 psi 与 psi_1 来 differentiate log Gamma。", "对 symmetric 2 by 2 Hessian，检查 diagonal signs 与 determinant。"] },
      detailed_solution: detail([
        "### Log-likelihood",
        "For iid samples, define",
        "$$\nS_x=\\sum_{i=1}^n x^{(i)},\n\\qquad\nS_{\\log x}=\\sum_{i=1}^n\\log x^{(i)}\n$$",
        "The log-likelihood is",
        "$$\n\\ell(\\alpha,\\beta)=n\\alpha\\log\\beta-n\\log\\Gamma(\\alpha)+(\\alpha-1)S_{\\log x}-\\beta S_x\n$$",
        "### First derivatives",
        "$$\n\\frac{\\partial\\ell}{\\partial\\alpha}=n\\log\\beta-n\\psi(\\alpha)+S_{\\log x}\n$$",
        "$$\n\\frac{\\partial\\ell}{\\partial\\beta}=\\frac{n\\alpha}{\\beta}-S_x\n$$",
        "### Second derivatives",
        "$$\n\\frac{\\partial^2\\ell}{\\partial\\alpha^2}=-n\\psi_1(\\alpha),\n\\qquad\n\\frac{\\partial^2\\ell}{\\partial\\alpha\\partial\\beta}=\\frac{n}{\\beta},\n\\qquad\n\\frac{\\partial^2\\ell}{\\partial\\beta^2}=-\\frac{n\\alpha}{\\beta^2}\n$$",
        "### Hessian",
        "$$\n\\nabla^2\\ell(\\alpha,\\beta)=\n\\begin{pmatrix}\n-n\\psi_1(\\alpha) & n/\\beta\\\\\nn/\\beta & -n\\alpha/\\beta^2\n\\end{pmatrix}\n$$",
        "### Negative semidefinite check",
        "The diagonal entries are negative because psi_1(alpha)>0, alpha>0, and beta>0.",
        "The determinant is",
        "$$\n\\det(\\nabla^2\\ell)=\n\\frac{n^2}{\\beta^2}\\left(\\alpha\\psi_1(\\alpha)-1\\right)\n$$",
        "Using the given trigamma lower bound, alpha psi_1(alpha)>1, so the determinant is positive.",
        "### Conclusion",
        "The Hessian is negative definite, hence negative semidefinite. The Gamma log-likelihood is concave in (alpha,beta) over the positive parameter region."
      ], [
        "### Log-likelihood",
        "对 iid samples，定义",
        "$$\nS_x=\\sum_{i=1}^n x^{(i)},\n\\qquad\nS_{\\log x}=\\sum_{i=1}^n\\log x^{(i)}\n$$",
        "log-likelihood 是",
        "$$\n\\ell(\\alpha,\\beta)=n\\alpha\\log\\beta-n\\log\\Gamma(\\alpha)+(\\alpha-1)S_{\\log x}-\\beta S_x\n$$",
        "### First derivatives",
        "$$\n\\frac{\\partial\\ell}{\\partial\\alpha}=n\\log\\beta-n\\psi(\\alpha)+S_{\\log x}\n$$",
        "$$\n\\frac{\\partial\\ell}{\\partial\\beta}=\\frac{n\\alpha}{\\beta}-S_x\n$$",
        "### Second derivatives",
        "$$\n\\frac{\\partial^2\\ell}{\\partial\\alpha^2}=-n\\psi_1(\\alpha),\n\\qquad\n\\frac{\\partial^2\\ell}{\\partial\\alpha\\partial\\beta}=\\frac{n}{\\beta},\n\\qquad\n\\frac{\\partial^2\\ell}{\\partial\\beta^2}=-\\frac{n\\alpha}{\\beta^2}\n$$",
        "### Hessian",
        "$$\n\\nabla^2\\ell(\\alpha,\\beta)=\n\\begin{pmatrix}\n-n\\psi_1(\\alpha) & n/\\beta\\\\\nn/\\beta & -n\\alpha/\\beta^2\n\\end{pmatrix}\n$$",
        "### Negative semidefinite check",
        "diagonal entries 为 negative，因为 psi_1(alpha)>0、alpha>0、beta>0。",
        "determinant 是",
        "$$\n\\det(\\nabla^2\\ell)=\n\\frac{n^2}{\\beta^2}\\left(\\alpha\\psi_1(\\alpha)-1\\right)\n$$",
        "由题目给的 trigamma lower bound，alpha psi_1(alpha)>1，所以 determinant positive。",
        "### Conclusion",
        "Hessian 是 negative definite，因此也是 negative semidefinite。Gamma log-likelihood 在 positive parameter region 上 concave。"
      ])
    }
  ]);

  add("positional-encoding", [
    {
      id: "final-practice-p6",
      section: "Problem 6",
      title: { en: "Represent sinusoidal position shifts as rotation matrices", cn: "把 sinusoidal position shift 表示成 rotation matrix" },
      original_excerpt: { en: "Detailed cue: for each frequency w_i, p_i(pos)=(sin(w_i pos), cos(w_i pos)); find a 2 by 2 matrix R_i(k) so that p_i(pos+k)=R_i(k)p_i(pos), explain relative-position usefulness, and count learnable parameters.", cn: "题目要点：对每个 frequency w_i，p_i(pos)=(sin(w_i pos), cos(w_i pos))；找 2 by 2 matrix R_i(k) 使 p_i(pos+k)=R_i(k)p_i(pos)，解释对 relative position 的作用，并数 learnable parameters。" },
      problem_understanding: { en: "The shift pos to pos+k becomes angle addition. The sine/cosine pair at the shifted position is a linear transformation of the original pair, with coefficients depending only on k.", cn: "pos 到 pos+k 的 shift 变成 angle addition。shifted position 的 sine/cosine pair 是 original pair 的 linear transformation，coefficients 只依赖 k。" },
      knowledge_points: { en: "Angle addition identities turn sinusoidal encodings into a rotation-like 2D linear map. Fixed sinusoidal encodings have zero learnable parameters.", cn: "angle addition identities 把 sinusoidal encodings 转成 rotation-like 2D linear map。fixed sinusoidal encodings 有 zero learnable parameters。" },
      tips: { en: ["Let a=w_i pos and b=w_i k.", "Keep the vector order as (sin, cos).", "The matrix depends on k but not on pos."], cn: ["令 a=w_i pos，b=w_i k。", "注意 vector order 是 (sin, cos)。", "matrix 依赖 k，但不依赖 pos。"] },
      detailed_solution: detail([
        "### Define the pair",
        "$$\np_i(pos)=\\begin{pmatrix}\\sin(w_i pos)\\\\ \\cos(w_i pos)\\end{pmatrix}\n$$",
        "For a shift k, set a=w_i pos and b=w_i k.",
        "### Apply angle addition",
        "$$\n\\sin(a+b)=\\sin a\\cos b+\\cos a\\sin b\n$$",
        "$$\n\\cos(a+b)=\\cos a\\cos b-\\sin a\\sin b\n$$",
        "### Matrix form",
        "$$\np_i(pos+k)=\n\\begin{pmatrix}\n\\cos b & \\sin b\\\\\n-\\sin b & \\cos b\n\\end{pmatrix}\n\\begin{pmatrix}\\sin a\\\\ \\cos a\\end{pmatrix}\n$$",
        "Substitute b=w_i k.",
        "$$\nR_i(k)=\n\\begin{pmatrix}\n\\cos(w_i k) & \\sin(w_i k)\\\\\n-\\sin(w_i k) & \\cos(w_i k)\n\\end{pmatrix}\n$$",
        "### Relative-position meaning",
        "R_i(k) depends on the offset k but not the absolute position. This gives a linear relationship between encodings at positions separated by the same offset.",
        "### Learnable parameters",
        "The frequencies are fixed by the sinusoidal scheme, so the number of learnable parameters is",
        "$$\n0\n$$"
      ], [
        "### Define the pair",
        "$$\np_i(pos)=\\begin{pmatrix}\\sin(w_i pos)\\\\ \\cos(w_i pos)\\end{pmatrix}\n$$",
        "对 shift k，令 a=w_i pos，b=w_i k。",
        "### Apply angle addition",
        "$$\n\\sin(a+b)=\\sin a\\cos b+\\cos a\\sin b\n$$",
        "$$\n\\cos(a+b)=\\cos a\\cos b-\\sin a\\sin b\n$$",
        "### Matrix form",
        "$$\np_i(pos+k)=\n\\begin{pmatrix}\n\\cos b & \\sin b\\\\\n-\\sin b & \\cos b\n\\end{pmatrix}\n\\begin{pmatrix}\\sin a\\\\ \\cos a\\end{pmatrix}\n$$",
        "代入 b=w_i k。",
        "$$\nR_i(k)=\n\\begin{pmatrix}\n\\cos(w_i k) & \\sin(w_i k)\\\\\n-\\sin(w_i k) & \\cos(w_i k)\n\\end{pmatrix}\n$$",
        "### Relative-position meaning",
        "R_i(k) 依赖 offset k，而不依赖 absolute position。这说明相同 offset 的 positional encodings 之间有固定 linear relationship。",
        "### Learnable parameters",
        "sinusoidal scheme 的 frequencies 是 fixed 的，所以 learnable parameters 数量是",
        "$$\n0\n$$"
      ])
    }
  ]);

  add("pac", [
    {
      id: "final-practice-p7",
      section: "Problem 7",
      title: { en: "Compare realizable and agnostic PAC guarantees", cn: "比较 realizable 与 agnostic PAC guarantees" },
      original_excerpt: { en: "Detailed cue: state the agnostic PAC guarantee, compare sample requirements with the realizable case, and give a real-world example where zero-error realizability fails.", cn: "题目要点：写出 agnostic PAC guarantee，比较它和 realizable case 的 sample requirements，并给出现实中 zero-error realizability 失败的例子。" },
      problem_understanding: { en: "Realizable PAC compares the learned classifier to zero error. Agnostic PAC compares it to the best hypothesis available inside H, because zero error may be impossible.", cn: "realizable PAC 把 learned classifier 和 zero error 比。agnostic PAC 则和 H 内 best hypothesis 比，因为 zero error 可能根本不可能。" },
      knowledge_points: { en: "Agnostic learning gives excess-risk guarantees. Typical finite-class sample complexity changes from 1/epsilon in the realizable case to 1/epsilon squared in the agnostic case.", cn: "agnostic learning 给出 excess-risk guarantee。finite-class 中常见 sample complexity 从 realizable case 的 1/epsilon 变成 agnostic case 的 1/epsilon squared。" },
      tips: { en: ["Use best-in-class loss, not zero.", "Mention the worse epsilon dependence for agnostic learning.", "Use label noise or missing features as the real-world failure mode."], cn: ["用 best-in-class loss，不要和 zero 比。", "说明 agnostic learning 对 epsilon 的依赖更差。", "现实例子可用 label noise 或 missing features。"] },
      detailed_solution: detail([
        "### Agnostic guarantee",
        "In the agnostic setting, H may not contain a perfect classifier. The correct target is the best loss achievable inside H.",
        "$$\nL(\\hat h)\\le \\inf_{h\\in H}L(h)+\\epsilon\n$$",
        "with probability at least 1-delta.",
        "### Sample comparison",
        "For finite H, a common comparison is",
        "$$\n\\text{realizable: } n=O\\left(\\frac{\\log|H|+\\log(1/\\delta)}{\\epsilon}\\right)\n$$",
        "$$\n\\text{agnostic: } n=O\\left(\\frac{\\log|H|+\\log(1/\\delta)}{\\epsilon^2}\\right)\n$$",
        "Agnostic learning usually needs more samples because it must estimate noisy losses accurately enough to compare hypotheses.",
        "### Intuition",
        "- Realizable: a perfect classifier exists, so samples can eliminate hypotheses that make mistakes.\n- Agnostic: every classifier may make mistakes, so the learner must distinguish small differences in true risk.",
        "### Real-world example",
        "Medical diagnosis from limited measurements violates realizability: two patients can share the same recorded features but have different true labels due to unobserved factors, measurement noise, or disease stage. Then no classifier using only those features can have zero true error."
      ], [
        "### Agnostic guarantee",
        "agnostic setting 中，H 里不一定有 perfect classifier。正确目标是 H 内能达到的 best loss。",
        "$$\nL(\\hat h)\\le \\inf_{h\\in H}L(h)+\\epsilon\n$$",
        "with probability at least 1-delta。",
        "### Sample comparison",
        "对 finite H，常见比较是",
        "$$\n\\text{realizable: } n=O\\left(\\frac{\\log|H|+\\log(1/\\delta)}{\\epsilon}\\right)\n$$",
        "$$\n\\text{agnostic: } n=O\\left(\\frac{\\log|H|+\\log(1/\\delta)}{\\epsilon^2}\\right)\n$$",
        "agnostic learning 通常需要更多 samples，因为它要准确估计 noisy losses，才能比较 hypotheses。",
        "### Intuition",
        "- realizable：存在 perfect classifier，samples 用来 eliminate 会犯错的 hypotheses。\n- agnostic：每个 classifier 都可能犯错，learner 要分辨 true risk 的小差异。",
        "### Real-world example",
        "用 limited measurements 做 medical diagnosis 会违反 realizability：两个 patients 可能 recorded features 几乎相同，但因为 unobserved factors、measurement noise 或 disease stage 不同而 labels 不同。因此只用这些 features 的 classifier 不可能 zero true error。"
      ])
    }
  ]);

  add("linear-algebra", [
    {
      id: "final-practice-p8",
      section: "Problem 8",
      title: { en: "Derive Wishart log-likelihood and precision-matrix concavity", cn: "推导 Wishart log-likelihood 与 precision-matrix concavity" },
      original_excerpt: { en: "Detailed cue: iid Wishart matrices with known degrees of freedom n and unknown scale Sigma; compute the log-likelihood, rewrite using precision Omega=Sigma^{-1}, and show the Hessian in Omega is negative semidefinite.", cn: "题目要点：iid Wishart matrices，degrees of freedom n known，scale Sigma unknown；计算 log-likelihood，改写为 precision Omega=Sigma^{-1}，并证明 Omega parameterization 下 Hessian negative semidefinite。" },
      problem_understanding: { en: "The log-likelihood is not globally concave in Sigma, but it is concave in the precision matrix Omega. The nonlinear part is log det Omega, whose second differential is negative.", cn: "log-likelihood 对 Sigma 不一定 globally concave，但对 precision matrix Omega 是 concave。非线性部分是 log det Omega，它的 second differential 为 negative。" },
      knowledge_points: { en: "Use trace linearity, log determinant identities, d log|Omega|=tr(Omega^{-1}dOmega), and d(Omega^{-1})=-Omega^{-1}(dOmega)Omega^{-1}.", cn: "使用 trace linearity、log determinant identities、d log|Omega|=tr(Omega^{-1}dOmega)、以及 d(Omega^{-1})=-Omega^{-1}(dOmega)Omega^{-1)。" },
      tips: { en: ["Collect all data into S=sum X_r.", "Drop constants before differentiating.", "Use a direction H to show the Hessian quadratic form is nonpositive."], cn: ["把 data 汇总成 S=sum X_r。", "differentiate 前先 drop constants。", "用 direction H 证明 Hessian quadratic form nonpositive。"] },
      detailed_solution: detail([
        "### Log-likelihood in Sigma",
        "Let S=sum_{r=1}^m X_r and collect all terms independent of Sigma into C.",
        "$$\n\\ell(\\Sigma)=C-\\frac12\\operatorname{tr}(\\Sigma^{-1}S)-\\frac{mn}{2}\\log|\\Sigma|\n$$",
        "### Switch to precision",
        "Let Omega=Sigma^{-1}. Then log|Sigma|=-log|Omega| and tr(Sigma^{-1}S)=tr(Omega S).",
        "$$\n\\ell(\\Omega)=C+\\frac{mn}{2}\\log|\\Omega|-\\frac12\\operatorname{tr}(\\Omega S)\n$$",
        "### First differential",
        "$$\nd\\log|\\Omega|=\\operatorname{tr}(\\Omega^{-1}d\\Omega)\n$$",
        "$$\nd\\ell=\\operatorname{tr}\\left[\\left(\\frac{mn}{2}\\Omega^{-1}-\\frac12S\\right)d\\Omega\\right]\n$$",
        "So",
        "$$\n\\nabla_\\Omega\\ell=\\frac{mn}{2}\\Omega^{-1}-\\frac12S\n$$",
        "### Hessian operator",
        "Only Omega^{-1} is nonlinear.",
        "$$\nd(\\Omega^{-1})[H]=-\\Omega^{-1}H\\Omega^{-1}\n$$",
        "Therefore",
        "$$\n\\nabla_\\Omega^2\\ell[H]=-\frac{mn}{2}\\Omega^{-1}H\\Omega^{-1}\n$$",
        "### Negative semidefinite quadratic form",
        "Using Frobenius inner product and symmetric direction H,",
        "$$\nD^2\\ell(\\Omega)[H,H]\n=\\left\\langle H,-\\frac{mn}{2}\\Omega^{-1}H\\Omega^{-1}\\right\\rangle\n$$",
        "$$\n=-\\frac{mn}{2}\\operatorname{tr}(H\\Omega^{-1}H\\Omega^{-1})\n$$",
        "$$\n=-\\frac{mn}{2}\\left\\|\\Omega^{-1/2}H\\Omega^{-1/2}\\right\\|_F^2\\le0\n$$",
        "### Conclusion",
        "The Hessian is negative semidefinite in the precision parameter Omega, so the Wishart log-likelihood is concave in Omega."
      ], [
        "### Sigma parameterization 下的 log-likelihood",
        "令 S=sum_{r=1}^m X_r，并把所有与 Sigma 无关的 terms 放进 C。",
        "$$\n\\ell(\\Sigma)=C-\\frac12\\operatorname{tr}(\\Sigma^{-1}S)-\\frac{mn}{2}\\log|\\Sigma|\n$$",
        "### 换成 precision",
        "令 Omega=Sigma^{-1}。则 log|Sigma|=-log|Omega|，tr(Sigma^{-1}S)=tr(Omega S)。",
        "$$\n\\ell(\\Omega)=C+\\frac{mn}{2}\\log|\\Omega|-\\frac12\\operatorname{tr}(\\Omega S)\n$$",
        "### First differential",
        "$$\nd\\log|\\Omega|=\\operatorname{tr}(\\Omega^{-1}d\\Omega)\n$$",
        "$$\nd\\ell=\\operatorname{tr}\\left[\\left(\\frac{mn}{2}\\Omega^{-1}-\\frac12S\\right)d\\Omega\\right]\n$$",
        "所以",
        "$$\n\\nabla_\\Omega\\ell=\\frac{mn}{2}\\Omega^{-1}-\\frac12S\n$$",
        "### Hessian operator",
        "只有 Omega^{-1} 是 nonlinear。",
        "$$\nd(\\Omega^{-1})[H]=-\\Omega^{-1}H\\Omega^{-1}\n$$",
        "因此",
        "$$\n\\nabla_\\Omega^2\\ell[H]=-\frac{mn}{2}\\Omega^{-1}H\\Omega^{-1}\n$$",
        "### Negative semidefinite quadratic form",
        "使用 Frobenius inner product 和 symmetric direction H，",
        "$$\nD^2\\ell(\\Omega)[H,H]\n=\\left\\langle H,-\\frac{mn}{2}\\Omega^{-1}H\\Omega^{-1}\\right\\rangle\n$$",
        "$$\n=-\\frac{mn}{2}\\operatorname{tr}(H\\Omega^{-1}H\\Omega^{-1})\n$$",
        "$$\n=-\\frac{mn}{2}\\left\\|\\Omega^{-1/2}H\\Omega^{-1/2}\\right\\|_F^2\\le0\n$$",
        "### Conclusion",
        "Hessian 在 precision parameter Omega 下 negative semidefinite，所以 Wishart log-likelihood 对 Omega concave。"
      ])
    }
  ]);
})();

// Structured HW5 data override. Removes older terse HW5 sketches and re-adds
// the same homework as detailed bilingual problem cards.
(function enhanceHw5Problems() {
  const data = window.POPUP_DATA || {};
  const hw = "hw5";
  const join = parts => parts.join("\n\n");
  const detail = (en, cn) => ({ en: join(en), cn: join(cn) });

  Object.values(data).forEach(topic => {
    topic.problems = (topic.problems || []).filter(p => p.hw !== hw);
  });

  const add = (slug, items) => {
    if (!data[slug]) return;
    data[slug].problems = data[slug].problems || [];
    data[slug].problems.push(...items.map(item => ({ ...item, hw })));
  };

  add("pac", [
    {
      id: "hw5-1-1-1",
      section: "Problem 1.1.1",
      title: { en: "Apply Hoeffding to a fixed classifier's empirical risk", cn: "对固定 classifier 的 empirical risk 应用 Hoeffding" },
      original_excerpt: { en: "Detailed cue: fix h before seeing data; define Zi as the 0-1 mistake indicator and T as the sum of Zi - R(h); prove mean zero, interval length one, then convert a tail bound for T into a tail bound for empirical risk.", cn: "题目要点：先固定 h；令 Zi 为 0-1 mistake indicator，T 是 Zi - R(h) 的求和；先证明 mean zero 与 interval length one，再把 T 的 tail bound 转成 empirical risk 的 tail bound。" },
      problem_understanding: { en: "This asks you to show why empirical error concentrates around true error for one fixed hypothesis. The key is that once h is fixed, each mistake indicator is an independent bounded Bernoulli variable.", cn: "这题是在问：为什么对一个固定 hypothesis，empirical error 会集中在 true error 附近。关键是 h 固定后，每个 mistake indicator 都是 independent bounded Bernoulli variable。" },
      knowledge_points: { en: "For fixed h, E[Zi]=R(h). Hoeffding bounds sums of independent bounded variables, and the empirical risk deviation is exactly T divided by m.", cn: "对 fixed h，有 E[Zi]=R(h)。Hoeffding 控制 independent bounded variables 的和；empirical risk deviation 正好是 T 除以 m。" },
      tips: { en: ["Do not treat h as data-dependent in this part.", "Use interval length 1, not the exact variance.", "After Hoeffding, substitute t=m epsilon."], cn: ["这一问不要把 h 当成 data-dependent。", "用 interval length 1，不需要 exact variance。", "套 Hoeffding 后代入 t=m epsilon。"] },
      detailed_solution: detail([
        "### Step 1: Mean of one summand",
        "For a fixed classifier h, the variable Zi equals 1 when h makes a mistake on the i-th sampled point.",
        "$$\n\\mathbb E[Z_i]=\\Pr(h(X)\\ne Y)=R(h)\n$$",
        "Therefore each centered term has mean zero.",
        "$$\n\\mathbb E[Z_i-R(h)]=0\n$$",
        "### Step 2: Mean of T",
        "$$\nT=\\sum_{i=1}^m (Z_i-R(h))\n$$",
        "$$\n\\mathbb E[T]=\\sum_{i=1}^m \\mathbb E[Z_i-R(h)]=0\n$$",
        "### Step 3: Bounded interval",
        "Because Zi is either 0 or 1, the centered variable can only be one of two values.",
        "$$\nZ_i-R(h)\\in\\{-R(h),1-R(h)\\}\n$$",
        "Both values lie inside the interval [-R(h), 1-R(h)], whose length is exactly 1.",
        "### Step 4: Connect T to empirical risk",
        "$$\n\\widehat R_S(h)=\\frac1m\\sum_{i=1}^m Z_i\n$$",
        "$$\n\\widehat R_S(h)-R(h)=\\frac1m\\sum_{i=1}^m (Z_i-R(h))=\\frac{T}{m}\n$$",
        "### Step 5: Apply Hoeffding",
        "Hoeffding with m independent length-1 summands gives",
        "$$\n\\Pr(|T|>t)\\le 2\\exp\\left(-\\frac{2t^2}{m}\\right)\n$$",
        "Set t=m epsilon.",
        "$$\n\\Pr(|\\widehat R_S(h)-R(h)|>\\epsilon)\n=\\Pr(|T|>m\\epsilon)\n\\le 2e^{-2m\\epsilon^2}\n$$",
        "### Conclusion",
        "For one fixed h, the empirical risk is close to the true risk with probability increasing exponentially fast in m."
      ], [
        "### Step 1: 单个 summand 的 mean",
        "对 fixed classifier h，Zi 表示第 i 个样本上是否预测错误。",
        "$$\n\\mathbb E[Z_i]=\\Pr(h(X)\\ne Y)=R(h)\n$$",
        "所以 centered term 的 mean 为 0。",
        "$$\n\\mathbb E[Z_i-R(h)]=0\n$$",
        "### Step 2: T 的 mean",
        "$$\nT=\\sum_{i=1}^m (Z_i-R(h))\n$$",
        "$$\n\\mathbb E[T]=\\sum_{i=1}^m \\mathbb E[Z_i-R(h)]=0\n$$",
        "### Step 3: Bounded interval",
        "Zi 只能取 0 或 1，因此 centered variable 也只有两个可能值。",
        "$$\nZ_i-R(h)\\in\\{-R(h),1-R(h)\\}\n$$",
        "这两个值落在 [-R(h), 1-R(h)] 中，interval length 正好是 1。",
        "### Step 4: 把 T 和 empirical risk 连接起来",
        "$$\n\\widehat R_S(h)=\\frac1m\\sum_{i=1}^m Z_i\n$$",
        "$$\n\\widehat R_S(h)-R(h)=\\frac1m\\sum_{i=1}^m (Z_i-R(h))=\\frac{T}{m}\n$$",
        "### Step 5: Apply Hoeffding",
        "对 m 个 independent length-1 summands 使用 Hoeffding：",
        "$$\n\\Pr(|T|>t)\\le 2\\exp\\left(-\\frac{2t^2}{m}\\right)\n$$",
        "令 t=m epsilon。",
        "$$\n\\Pr(|\\widehat R_S(h)-R(h)|>\\epsilon)\n=\\Pr(|T|>m\\epsilon)\n\\le 2e^{-2m\\epsilon^2}\n$$",
        "### Conclusion",
        "对一个 fixed h，empirical risk 会以 exponential rate 集中到 true risk 附近。"
      ])
    },
    {
      id: "hw5-1-1-2",
      section: "Problem 1.1.2",
      title: { en: "Use a union bound for a data-chosen hypothesis", cn: "对 data-chosen hypothesis 使用 union bound" },
      original_excerpt: { en: "Detailed cue: h-hat is selected after seeing S, so the fixed-h Hoeffding event cannot be reused directly; if H is finite, control every h in H at once and then cover h-hat as one of them.", cn: "题目要点：h-hat 是看过 S 后选出来的，不能直接套 fixed-h Hoeffding；若 H finite，就同时控制 H 中所有 h，再把 h-hat 作为其中一个覆盖进去。" },
      problem_understanding: { en: "The problem is about the difference between testing a preselected classifier and testing the classifier chosen by the same data. The fix for a finite class is uniform control through a union bound.", cn: "这题区分 preselected classifier 与由同一份 data 选出来的 classifier。finite class 的补救方法是用 union bound 做 uniform control。" },
      knowledge_points: { en: "A learned hypothesis is random because it depends on S. For finite H, the event that h-hat generalizes badly is contained in the union of bad events over all h in H.", cn: "learned hypothesis 依赖 S，所以它是 random。H finite 时，h-hat generalization badly 这个事件包含在所有 h 的 bad events 的 union 里。" },
      tips: { en: ["State clearly why h-hat is not independent of S.", "Use event containment before applying the union bound.", "Only after the union bound reuse the fixed-h result."], cn: ["先说清楚 h-hat 不 independent of S。", "先写 event containment，再用 union bound。", "union bound 之后才能复用 fixed-h result。"] },
      detailed_solution: detail([
        "### Why the old bound is not enough",
        "In Problem 1.1.1, h was fixed before the sample was drawn.",
        "- The random variables Zi were generated using that fixed h.\n- Hoeffding controlled one preselected empirical average.\n- h-hat is chosen from S, so it can adapt to sample noise.",
        "Thus we cannot simply replace h by h-hat in the fixed-h probability bound.",
        "### Bad event for h-hat",
        "If h-hat has empirical risk far from true risk, then at least one hypothesis in H must have that same bad deviation.",
        "$$\n\\{ |\\widehat R_S(\\hat h)-R(\\hat h)|>\\epsilon\\}\n\\subseteq\n\\bigcup_{h\\in H}\\{ |\\widehat R_S(h)-R(h)|>\\epsilon\\}\n$$",
        "### Union bound",
        "$$\n\\Pr\\left(\\bigcup_{h\\in H} A_h\\right)\\le \\sum_{h\\in H}\\Pr(A_h)\n$$",
        "Here A_h is the bad deviation event for a fixed h.",
        "### Plug in the fixed-h Hoeffding bound",
        "$$\n\\Pr(A_h)\\le 2e^{-2m\\epsilon^2}\n$$",
        "Therefore",
        "$$\n\\Pr(|\\widehat R_S(\\hat h)-R(\\hat h)|>\\epsilon)\n\\le\n\\sum_{h\\in H}2e^{-2m\\epsilon^2}\n=2|H|e^{-2m\\epsilon^2}\n$$",
        "### Conclusion",
        "Finite H pays a multiplicative |H| price because we ask all hypotheses to generalize at once."
      ], [
        "### 为什么 old bound 不能直接用",
        "Problem 1.1.1 里 h 是 sample 抽取之前就 fixed 的。",
        "- Zi 是用这个 fixed h 定义的。\n- Hoeffding 控制的是一个预先选好的 empirical average。\n- h-hat 是根据 S 选出来的，会 adapt to sample noise。",
        "所以不能把 fixed-h bound 里的 h 直接替换成 h-hat。",
        "### h-hat 的 bad event",
        "如果 h-hat 的 empirical risk 和 true risk 差很多，那 H 里至少存在一个 h 有同样的 bad deviation。",
        "$$\n\\{ |\\widehat R_S(\\hat h)-R(\\hat h)|>\\epsilon\\}\n\\subseteq\n\\bigcup_{h\\in H}\\{ |\\widehat R_S(h)-R(h)|>\\epsilon\\}\n$$",
        "### Union bound",
        "$$\n\\Pr\\left(\\bigcup_{h\\in H} A_h\\right)\\le \\sum_{h\\in H}\\Pr(A_h)\n$$",
        "这里 A_h 是 fixed h 的 bad deviation event。",
        "### 代入 fixed-h Hoeffding bound",
        "$$\n\\Pr(A_h)\\le 2e^{-2m\\epsilon^2}\n$$",
        "因此",
        "$$\n\\Pr(|\\widehat R_S(\\hat h)-R(\\hat h)|>\\epsilon)\n\\le\n\\sum_{h\\in H}2e^{-2m\\epsilon^2}\n=2|H|e^{-2m\\epsilon^2}\n$$",
        "### Conclusion",
        "finite H 的代价是多一个 |H| factor，因为我们需要同时控制所有 hypotheses。"
      ])
    },
    {
      id: "hw5-1-1-3",
      section: "Problem 1.1.3",
      title: { en: "Prove the ERM excess-risk bound under uniform convergence", cn: "用 uniform convergence 证明 ERM excess-risk bound" },
      original_excerpt: { en: "Detailed cue: assume sup over H of absolute empirical-true risk gap is at most epsilon; compare ERM h-hat with the best-in-class h-star and prove the true-risk gap is at most 2 epsilon.", cn: "题目要点：假设 H 上 empirical risk 与 true risk 的最大绝对差不超过 epsilon；比较 ERM h-hat 与 class 内最优 h-star，证明 true-risk gap 至多 2 epsilon。" },
      problem_understanding: { en: "This is the standard three-line ERM argument. Uniform convergence lets you move from true risk to empirical risk for h-hat, use ERM optimality, then move back from empirical risk to true risk for h-star.", cn: "这是标准 ERM 三段论。uniform convergence 让你从 h-hat 的 true risk 切到 empirical risk，用 ERM optimality，再从 h-star 的 empirical risk 切回 true risk。" },
      knowledge_points: { en: "Uniform convergence gives both R(h) <= Rhat(h)+epsilon and Rhat(h) <= R(h)+epsilon for every h. ERM gives Rhat(h-hat) <= Rhat(h-star).", cn: "uniform convergence 对每个 h 都给出 R(h) <= Rhat(h)+epsilon 和 Rhat(h) <= R(h)+epsilon。ERM 给出 Rhat(h-hat) <= Rhat(h-star)。" },
      tips: { en: ["Write the chain of inequalities in order.", "Use uniform convergence twice.", "The middle inequality is exactly the ERM property."], cn: ["按顺序写 inequality chain。", "uniform convergence 用两次。", "中间那步就是 ERM property。"] },
      detailed_solution: detail([
        "### Names",
        "Let h_hat be the empirical risk minimizer and h_star be the true-risk minimizer inside H.",
        "$$\n\\hat h_{ERM}\\in\\arg\\min_{h\\in H}\\widehat R_S(h),\n\\qquad\nh_H^*\\in\\arg\\min_{h\\in H}R(h)\n$$",
        "### Uniform convergence event",
        "$$\n\\sup_{h\\in H}|\\widehat R_S(h)-R(h)|\\le\\epsilon\n$$",
        "This implies, for every h,",
        "$$\nR(h)\\le \\widehat R_S(h)+\\epsilon,\n\\qquad\n\\widehat R_S(h)\\le R(h)+\\epsilon\n$$",
        "### Start from the ERM hypothesis",
        "$$\nR(\\hat h_{ERM})\\le \\widehat R_S(\\hat h_{ERM})+\\epsilon\n$$",
        "### Use ERM optimality",
        "Because h_hat minimizes empirical risk over H,",
        "$$\n\\widehat R_S(\\hat h_{ERM})\\le \\widehat R_S(h_H^*)\n$$",
        "### Move h-star back to true risk",
        "$$\n\\widehat R_S(h_H^*)\\le R(h_H^*)+\\epsilon\n$$",
        "### Chain the three steps",
        "$$\nR(\\hat h_{ERM})\n\\le \\widehat R_S(\\hat h_{ERM})+\\epsilon\n\\le \\widehat R_S(h_H^*)+\\epsilon\n\\le R(h_H^*)+2\\epsilon\n$$",
        "Therefore",
        "$$\nR(\\hat h_{ERM})-R(h_H^*)\\le 2\\epsilon\n$$"
      ], [
        "### 记号",
        "令 h_hat 为 empirical risk minimizer，h_star 为 H 内 true-risk minimizer。",
        "$$\n\\hat h_{ERM}\\in\\arg\\min_{h\\in H}\\widehat R_S(h),\n\\qquad\nh_H^*\\in\\arg\\min_{h\\in H}R(h)\n$$",
        "### Uniform convergence event",
        "$$\n\\sup_{h\\in H}|\\widehat R_S(h)-R(h)|\\le\\epsilon\n$$",
        "这表示对任意 h，",
        "$$\nR(h)\\le \\widehat R_S(h)+\\epsilon,\n\\qquad\n\\widehat R_S(h)\\le R(h)+\\epsilon\n$$",
        "### 从 ERM hypothesis 开始",
        "$$\nR(\\hat h_{ERM})\\le \\widehat R_S(\\hat h_{ERM})+\\epsilon\n$$",
        "### 使用 ERM optimality",
        "因为 h_hat 在 H 上最小化 empirical risk，",
        "$$\n\\widehat R_S(\\hat h_{ERM})\\le \\widehat R_S(h_H^*)\n$$",
        "### 把 h-star 切回 true risk",
        "$$\n\\widehat R_S(h_H^*)\\le R(h_H^*)+\\epsilon\n$$",
        "### 串起来",
        "$$\nR(\\hat h_{ERM})\n\\le \\widehat R_S(\\hat h_{ERM})+\\epsilon\n\\le \\widehat R_S(h_H^*)+\\epsilon\n\\le R(h_H^*)+2\\epsilon\n$$",
        "因此",
        "$$\nR(\\hat h_{ERM})-R(h_H^*)\\le 2\\epsilon\n$$"
      ])
    }
  ]);

  add("bayes-classifier", [
    {
      id: "hw5-1-2-1",
      section: "Problem 1.2.1",
      title: { en: "Derive the Bayes classifier for two equal-variance Gaussians", cn: "推导 equal-variance Gaussian 两类的 Bayes classifier" },
      original_excerpt: { en: "Detailed cue: binary Y with prior lambda for class 1; X|Y=1 is centered at +mu and X|Y=0 is centered at -mu with shared variance sigma squared; choose the larger posterior probability.", cn: "题目要点：binary Y，class 1 prior 为 lambda；X|Y=1 centered at +mu，X|Y=0 centered at -mu，shared variance 为 sigma squared；选择 posterior probability 更大的类别。" },
      problem_understanding: { en: "The classifier should compare prior times class-conditional density. Since both Gaussians share the same variance, the log-posterior ratio becomes a linear function of x.", cn: "classifier 要比较 prior times class-conditional density。因为两个 Gaussian 共享同一 variance，log-posterior ratio 会变成 x 的 linear function。" },
      knowledge_points: { en: "Bayes classifier under 0-1 loss predicts argmax_y P(Y=y|X=x). Bayes rule lets us compare P(X=x|Y=y)P(Y=y) without computing the evidence.", cn: "0-1 loss 下 Bayes classifier 预测 argmax_y P(Y=y|X=x)。Bayes rule 允许只比较 P(X=x|Y=y)P(Y=y)，不用算 evidence。" },
      tips: { en: ["Compare unnormalized posteriors.", "Cancel the common Gaussian normalizing constant.", "Take logs before simplifying the quadratic terms."], cn: ["比较 unnormalized posteriors。", "消掉 shared Gaussian normalizing constant。", "先取 log，再化简 quadratic terms。"] },
      detailed_solution: detail([
        "### Bayes decision rule",
        "Predict class 1 when its unnormalized posterior is at least the class-0 one.",
        "$$\n\\lambda p_1(x)\\ge (1-\\lambda)p_0(x)\n$$",
        "where",
        "$$\np_1(x)=\\mathcal N(x;\\mu,\\sigma^2),\n\\qquad\np_0(x)=\\mathcal N(x;-\\mu,\\sigma^2)\n$$",
        "### Take the log ratio",
        "$$\n\\log\\frac{\\lambda p_1(x)}{(1-\\lambda)p_0(x)}\n=\n\\log\\frac{\\lambda}{1-\\lambda}\n-\n\\frac{(x-\\mu)^2}{2\\sigma^2}\n+\n\\frac{(x+\\mu)^2}{2\\sigma^2}\n$$",
        "### Simplify the square difference",
        "$$\n(x+\\mu)^2-(x-\\mu)^2=4\\mu x\n$$",
        "So the log ratio is",
        "$$\n\\log\\frac{\\lambda}{1-\\lambda}+\\frac{2\\mu}{\\sigma^2}x\n$$",
        "### Final classifier",
        "$$\nf^*(x)=\\mathbf 1\\left\\{\n\\log\\frac{\\lambda}{1-\\lambda}+\\frac{2\\mu}{\\sigma^2}x\\ge0\n\\right\\}\n$$",
        "Ties can be assigned to either class because they do not change the Bayes risk."
      ], [
        "### Bayes decision rule",
        "class 1 的 unnormalized posterior 不小于 class 0 时预测 1。",
        "$$\n\\lambda p_1(x)\\ge (1-\\lambda)p_0(x)\n$$",
        "其中",
        "$$\np_1(x)=\\mathcal N(x;\\mu,\\sigma^2),\n\\qquad\np_0(x)=\\mathcal N(x;-\\mu,\\sigma^2)\n$$",
        "### 取 log ratio",
        "$$\n\\log\\frac{\\lambda p_1(x)}{(1-\\lambda)p_0(x)}\n=\n\\log\\frac{\\lambda}{1-\\lambda}\n-\n\\frac{(x-\\mu)^2}{2\\sigma^2}\n+\n\\frac{(x+\\mu)^2}{2\\sigma^2}\n$$",
        "### 化简 square difference",
        "$$\n(x+\\mu)^2-(x-\\mu)^2=4\\mu x\n$$",
        "所以 log ratio 是",
        "$$\n\\log\\frac{\\lambda}{1-\\lambda}+\\frac{2\\mu}{\\sigma^2}x\n$$",
        "### Final classifier",
        "$$\nf^*(x)=\\mathbf 1\\left\\{\n\\log\\frac{\\lambda}{1-\\lambda}+\\frac{2\\mu}{\\sigma^2}x\\ge0\n\\right\\}\n$$",
        "tie 怎么分都可以，因为不会改变 Bayes risk。"
      ])
    },
    {
      id: "hw5-1-2-2",
      section: "Problem 1.2.2",
      title: { en: "Compute the linear decision threshold", cn: "计算 linear decision threshold" },
      original_excerpt: { en: "Detailed cue: show the Gaussian Bayes boundary is a threshold in x and solve the equality where the two class posteriors match.", cn: "题目要点：证明 Gaussian Bayes boundary 是 x 上的 threshold，并求两类 posterior 相等时的显式边界。" },
      problem_understanding: { en: "The decision boundary is where the log-posterior ratio equals zero. Because the ratio is linear in x, the boundary is one scalar threshold.", cn: "decision boundary 是 log-posterior ratio 等于 0 的点。因为 ratio 对 x 是 linear，所以 boundary 是一个 scalar threshold。" },
      knowledge_points: { en: "Equal covariance Gaussians give a linear discriminant. The class prior shifts the intercept and therefore moves the threshold.", cn: "equal covariance Gaussians 产生 linear discriminant。class prior 改变 intercept，因此移动 threshold。" },
      tips: { en: ["Set the log ratio to zero.", "Keep mu positive when dividing.", "Check lambda=1/2 as a sanity check."], cn: ["令 log ratio 等于 0。", "除以 mu 时记得 mu 为 positive。", "用 lambda=1/2 做 sanity check。"] },
      detailed_solution: detail([
        "### Boundary equation",
        "From Problem 1.2.1, the boundary solves",
        "$$\n\\log\\frac{\\lambda}{1-\\lambda}+\\frac{2\\mu}{\\sigma^2}x=0\n$$",
        "### Solve for x",
        "$$\n\\frac{2\\mu}{\\sigma^2}x=-\\log\\frac{\\lambda}{1-\\lambda}\n$$",
        "$$\nx= -\\frac{\\sigma^2}{2\\mu}\\log\\frac{\\lambda}{1-\\lambda}\n$$",
        "Equivalently,",
        "$$\n\\tau=\\frac{\\sigma^2}{2\\mu}\\log\\frac{1-\\lambda}{\\lambda}\n$$",
        "### Classifier as threshold",
        "$$\nf^*(x)=\\mathbf 1\\{x\\ge \\tau\\}\n$$",
        "### Sanity check",
        "If lambda=1/2, the log term is zero, so tau=0. With equal priors and symmetric means, the boundary sits at the midpoint."
      ], [
        "### Boundary equation",
        "由 Problem 1.2.1，boundary 满足",
        "$$\n\\log\\frac{\\lambda}{1-\\lambda}+\\frac{2\\mu}{\\sigma^2}x=0\n$$",
        "### 解 x",
        "$$\n\\frac{2\\mu}{\\sigma^2}x=-\\log\\frac{\\lambda}{1-\\lambda}\n$$",
        "$$\nx= -\\frac{\\sigma^2}{2\\mu}\\log\\frac{\\lambda}{1-\\lambda}\n$$",
        "等价写成",
        "$$\n\\tau=\\frac{\\sigma^2}{2\\mu}\\log\\frac{1-\\lambda}{\\lambda}\n$$",
        "### Threshold classifier",
        "$$\nf^*(x)=\\mathbf 1\\{x\\ge \\tau\\}\n$$",
        "### Sanity check",
        "如果 lambda=1/2，log term 为 0，所以 tau=0。equal priors 且 means symmetric 时，boundary 在中点。"
      ])
    },
    {
      id: "hw5-1-2-3",
      section: "Problem 1.2.3",
      title: { en: "Write the Bayes error rate for the threshold rule", cn: "写出 threshold rule 的 Bayes error rate" },
      original_excerpt: { en: "Detailed cue: combine the class-1 left-tail error below the threshold with the class-0 right-tail error above the threshold.", cn: "题目要点：把 class 1 落到 threshold 左侧的错误概率，与 class 0 落到 threshold 右侧的错误概率相加。" },
      problem_understanding: { en: "Bayes error is the probability that the optimal classifier is wrong, averaged over the two priors. With a threshold, each term is one Gaussian tail probability.", cn: "Bayes error 是 optimal classifier 出错的概率，再按两个 priors 加权。对 threshold classifier，每一项都是一个 Gaussian tail probability。" },
      knowledge_points: { en: "Standardize Gaussian tails with Phi. Class 1 is misclassified when X<tau; class 0 is misclassified when X>=tau.", cn: "用 Phi 标准化 Gaussian tails。class 1 在 X<tau 时错分；class 0 在 X>=tau 时错分。" },
      tips: { en: ["Condition on Y first.", "Use the threshold direction from part 1.2.2.", "Convert both Gaussian probabilities to standard normal CDFs."], cn: ["先 condition on Y。", "沿用 1.2.2 的 threshold direction。", "把两个 Gaussian probabilities 都转成 standard normal CDF。"] },
      detailed_solution: detail([
        "### Split by true class",
        "$$\n\\epsilon^*=\\Pr(f^*(X)\\ne Y)\n$$",
        "$$\n\\epsilon^*=\lambda\\Pr(f^*(X)=0\\mid Y=1)+(1-\\lambda)\\Pr(f^*(X)=1\\mid Y=0)\n$$",
        "### Use the threshold rule",
        "Since f*(x)=1{x>=tau}, the two error events are",
        "- For Y=1, error means X<tau.\n- For Y=0, error means X>=tau.",
        "$$\n\\epsilon^*=\\lambda\\Pr(X<\\tau\\mid Y=1)+(1-\\lambda)\\Pr(X\\ge\\tau\\mid Y=0)\n$$",
        "### Standardize class 1",
        "$$\nX\\mid Y=1\\sim\\mathcal N(\\mu,\\sigma^2)\n$$",
        "$$\n\\Pr(X<\\tau\\mid Y=1)=\\Phi\\left(\\frac{\\tau-\\mu}{\\sigma}\\right)\n$$",
        "### Standardize class 0",
        "$$\nX\\mid Y=0\\sim\\mathcal N(-\\mu,\\sigma^2)\n$$",
        "$$\n\\Pr(X\\ge\\tau\\mid Y=0)=1-\\Phi\\left(\\frac{\\tau+\\mu}{\\sigma}\\right)\n$$",
        "### Final expression",
        "$$\n\\epsilon^*=\lambda\\Phi\\left(\\frac{\\tau-\\mu}{\\sigma}\\right)\n+(1-\\lambda)\\left[1-\\Phi\\left(\\frac{\\tau+\\mu}{\\sigma}\\right)\\right]\n$$"
      ], [
        "### 按 true class 拆开",
        "$$\n\\epsilon^*=\\Pr(f^*(X)\\ne Y)\n$$",
        "$$\n\\epsilon^*=\lambda\\Pr(f^*(X)=0\\mid Y=1)+(1-\\lambda)\\Pr(f^*(X)=1\\mid Y=0)\n$$",
        "### 使用 threshold rule",
        "因为 f*(x)=1{x>=tau}，两个 error events 是：",
        "- 对 Y=1，错误表示 X<tau。\n- 对 Y=0，错误表示 X>=tau。",
        "$$\n\\epsilon^*=\\lambda\\Pr(X<\\tau\\mid Y=1)+(1-\\lambda)\\Pr(X\\ge\\tau\\mid Y=0)\n$$",
        "### Standardize class 1",
        "$$\nX\\mid Y=1\\sim\\mathcal N(\\mu,\\sigma^2)\n$$",
        "$$\n\\Pr(X<\\tau\\mid Y=1)=\\Phi\\left(\\frac{\\tau-\\mu}{\\sigma}\\right)\n$$",
        "### Standardize class 0",
        "$$\nX\\mid Y=0\\sim\\mathcal N(-\\mu,\\sigma^2)\n$$",
        "$$\n\\Pr(X\\ge\\tau\\mid Y=0)=1-\\Phi\\left(\\frac{\\tau+\\mu}{\\sigma}\\right)\n$$",
        "### Final expression",
        "$$\n\\epsilon^*=\lambda\\Phi\\left(\\frac{\\tau-\\mu}{\\sigma}\\right)\n+(1-\\lambda)\\left[1-\\Phi\\left(\\frac{\\tau+\\mu}{\\sigma}\\right)\\right]\n$$"
      ])
    },
    {
      id: "hw5-1-2-4",
      section: "Problem 1.2.4",
      title: { en: "Analyze Bayes error as class means separate or merge", cn: "分析 class means 分离或重合时的 Bayes error" },
      original_excerpt: { en: "Detailed cue: describe what happens to the Bayes error when mu grows without bound, and when mu shrinks to zero while the priors remain lambda and 1-lambda.", cn: "题目要点：描述 mu 趋向 infinity 与 mu 趋向 zero 时 Bayes error 的变化，同时 priors 保持 lambda 与 1-lambda。" },
      problem_understanding: { en: "This is a limiting-intuition question. Large mu makes the two Gaussians separable; zero mu makes the feature distribution identical under both labels, so only the prior remains useful.", cn: "这是 limiting intuition 题。mu 很大时两个 Gaussians 可分；mu 为 0 时两个 label 下 feature distribution 完全相同，只剩 prior 有用。" },
      knowledge_points: { en: "Bayes error is irreducible overlap. If class-conditional densities separate, overlap vanishes. If they become identical, no x-based rule beats always predicting the majority class.", cn: "Bayes error 是 irreducible overlap。class-conditional densities 分离时 overlap 消失；它们 identical 时，任何 x-based rule 都不能超过 always predicting majority class。" },
      tips: { en: ["Think about distribution overlap, not only formulas.", "When mu goes to zero, X contains no label information.", "Majority-class guessing has error min(lambda, 1-lambda)."], cn: ["想 distribution overlap，不要只看公式。", "mu 到 0 时，X 不含 label information。", "majority-class guessing 的 error 是 min(lambda, 1-lambda)。"] },
      detailed_solution: detail([
        "### Case 1: mu goes to infinity",
        "The class-0 Gaussian is centered at -mu and the class-1 Gaussian is centered at +mu.",
        "- As mu grows, the two means move farther apart.\n- The shared standard deviation sigma stays fixed.\n- The overlap between the two Gaussian densities goes to zero.",
        "Therefore the Bayes classifier almost never confuses the two classes.",
        "$$\n\\mu\\to\\infty\\quad\\Longrightarrow\\quad \\epsilon^*\\to 0\n$$",
        "### Case 2: mu goes to zero",
        "Both class-conditionals become the same distribution.",
        "$$\nX\\mid Y=1\\sim\\mathcal N(0,\\sigma^2),\n\\qquad\nX\\mid Y=0\\sim\\mathcal N(0,\\sigma^2)\n$$",
        "When the conditional distributions are identical, observing x gives no information about Y.",
        "### Best possible action when x is useless",
        "The Bayes rule should always predict the more likely class.",
        "- If lambda >= 1/2, always predict class 1; error is 1-lambda.\n- If lambda < 1/2, always predict class 0; error is lambda.",
        "Thus",
        "$$\n\\mu\\to0\\quad\\Longrightarrow\\quad \\epsilon^*\\to \\min(\\lambda,1-\\lambda)\n$$"
      ], [
        "### Case 1: mu 趋向 infinity",
        "class 0 Gaussian centered at -mu，class 1 Gaussian centered at +mu。",
        "- mu 增大时，两个 means 越来越远。\n- shared standard deviation sigma 不变。\n- 两个 Gaussian densities 的 overlap 趋向 0。",
        "因此 Bayes classifier 几乎不会混淆两类。",
        "$$\n\\mu\\to\\infty\\quad\\Longrightarrow\\quad \\epsilon^*\\to 0\n$$",
        "### Case 2: mu 趋向 zero",
        "两个 class-conditionals 变成同一个 distribution。",
        "$$\nX\\mid Y=1\\sim\\mathcal N(0,\\sigma^2),\n\\qquad\nX\\mid Y=0\\sim\\mathcal N(0,\\sigma^2)\n$$",
        "conditional distributions identical 时，观察 x 对判断 Y 没有信息。",
        "### x useless 时的最佳策略",
        "Bayes rule 应该永远预测 prior 更大的 class。",
        "- 如果 lambda >= 1/2，always predict class 1，error 是 1-lambda。\n- 如果 lambda < 1/2，always predict class 0，error 是 lambda。",
        "所以",
        "$$\n\\mu\\to0\\quad\\Longrightarrow\\quad \\epsilon^*\\to \\min(\\lambda,1-\\lambda)\n$$"
      ])
    },
    {
      id: "hw5-1-2-5",
      section: "Problem 1.2.5",
      title: { en: "Explain how class imbalance shifts the Bayes boundary", cn: "解释 class imbalance 如何移动 Bayes boundary" },
      original_excerpt: { en: "Detailed cue: compare lambda with one half and use the threshold formula to say which class becomes easier to predict and why the boundary moves toward the rarer class.", cn: "题目要点：比较 lambda 与 one half，并用 threshold formula 说明哪一类更容易被预测，以及 boundary 为什么向 rarer class 方向移动。" },
      problem_understanding: { en: "The prior acts like an intercept in the log-posterior ratio. If one class is more common, the classifier needs less feature evidence to choose it.", cn: "prior 像 log-posterior ratio 里的 intercept。如果某个 class 更常见，classifier 选择它所需的 feature evidence 更少。" },
      knowledge_points: { en: "Threshold tau equals sigma squared over 2mu times log((1-lambda)/lambda). Positive tau favors class 0; negative tau favors class 1.", cn: "threshold tau 等于 sigma squared over 2mu times log((1-lambda)/lambda)。positive tau 更偏向 class 0；negative tau 更偏向 class 1。" },
      tips: { en: ["Use the sign of log((1-lambda)/lambda).", "A boundary moving toward a class makes that class harder to predict.", "Check the balanced case where tau=0."], cn: ["看 log((1-lambda)/lambda) 的 sign。", "boundary 向某个 class 移动，会让该 class 更难被预测。", "用 balanced case tau=0 检查。"] },
      detailed_solution: detail([
        "### Threshold formula",
        "$$\n\\tau=\\frac{\\sigma^2}{2\\mu}\\log\\frac{1-\\lambda}{\\lambda}\n$$",
        "The classifier predicts class 1 when x>=tau.",
        "### Balanced priors",
        "If lambda=1/2, then tau=0. The boundary is exactly between -mu and +mu.",
        "### Class 1 is more common",
        "If lambda>1/2, then",
        "$$\n\\log\\frac{1-\\lambda}{\\lambda}<0\n$$",
        "so tau<0.",
        "- The boundary moves left toward the class-0 mean.\n- More x values satisfy x>=tau.\n- The classifier predicts class 1 more often.",
        "### Class 1 is rarer",
        "If lambda<1/2, then",
        "$$\n\\log\\frac{1-\\lambda}{\\lambda}>0\n$$",
        "so tau>0.",
        "- The boundary moves right toward the class-1 mean.\n- Fewer x values satisfy x>=tau.\n- The classifier requires stronger evidence before predicting class 1.",
        "### Summary",
        "Class imbalance shifts the boundary toward the less probable class, making that rarer class harder to predict."
      ], [
        "### Threshold formula",
        "$$\n\\tau=\\frac{\\sigma^2}{2\\mu}\\log\\frac{1-\\lambda}{\\lambda}\n$$",
        "classifier 在 x>=tau 时预测 class 1。",
        "### Balanced priors",
        "如果 lambda=1/2，则 tau=0。boundary 正好在 -mu 和 +mu 中间。",
        "### Class 1 更常见",
        "如果 lambda>1/2，则",
        "$$\n\\log\\frac{1-\\lambda}{\\lambda}<0\n$$",
        "所以 tau<0。",
        "- boundary 向左移动，靠近 class-0 mean。\n- 更多 x 会满足 x>=tau。\n- classifier 更常预测 class 1。",
        "### Class 1 更少见",
        "如果 lambda<1/2，则",
        "$$\n\\log\\frac{1-\\lambda}{\\lambda}>0\n$$",
        "所以 tau>0。",
        "- boundary 向右移动，靠近 class-1 mean。\n- 更少 x 会满足 x>=tau。\n- classifier 需要更强 feature evidence 才预测 class 1。",
        "### Summary",
        "class imbalance 会把 boundary 推向 less probable class，让 rarer class 更难被预测出来。"
      ])
    }
  ]);

  add("vc-dimension", [
    {
      id: "hw5-1-3-1",
      section: "Problem 1.3.1",
      title: { en: "Find the VC dimension of one-dimensional thresholds", cn: "求 one-dimensional thresholds 的 VC dimension" },
      original_excerpt: { en: "Detailed cue: H consists of threshold functions h_c(x)=1{x>=c}; show one point can realize both labels, but two ordered points cannot realize label pattern (1,0).", cn: "题目要点：H 是 threshold functions h_c(x)=1{x>=c}；证明一个点能实现两种 labels，但两个有序点不能实现 label pattern (1,0)。" },
      problem_understanding: { en: "VC dimension requires the largest set size that can be shattered. Thresholds on the line are monotone: once a smaller point is labeled 1, every larger point must also be 1.", cn: "VC dimension 是能被 shattered 的最大 set size。line 上的 thresholds 是 monotone：小点一旦标 1，所有更大的点也必须是 1。" },
      knowledge_points: { en: "To prove VC dimension equals 1, show lower bound at size 1 and upper bound below size 2.", cn: "要证明 VC dimension 等于 1，需要同时证明 size 1 的 lower bound 和 size 2 不可 shatter 的 upper bound。" },
      tips: { en: ["For the lower bound, exhibit thresholds for labels 0 and 1 on one point.", "For the upper bound, use two points x1<x2.", "Find one impossible labeling, not all impossible labelings."], cn: ["lower bound：对一个点分别构造 label 0 和 1 的 thresholds。", "upper bound：取两个点 x1<x2。", "只需找一个 impossible labeling，不用全部 labelings 都证明。"] },
      detailed_solution: detail([
        "### Lower bound: shatter one point",
        "Take any point x1.",
        "- To label x1 as 1, choose c <= x1.\n- To label x1 as 0, choose c > x1.",
        "So a one-point set can be shattered.",
        "$$\n\\operatorname{VCdim}(H)\\ge1\n$$",
        "### Upper bound: two points cannot be shattered",
        "Take two ordered points x1<x2.",
        "For any threshold function h_c(x)=1{x>=c}, predictions are monotone in x.",
        "That means the labeling",
        "$$\nh_c(x_1)=1,\\qquad h_c(x_2)=0\n$$",
        "is impossible. If x1>=c, then x2>x1>=c, so x2 must also be labeled 1.",
        "### Conclusion",
        "Since one point can be shattered but no two-point set can be shattered,",
        "$$\n\\operatorname{VCdim}(H)=1\n$$"
      ], [
        "### Lower bound: shatter one point",
        "取任意一个点 x1。",
        "- 要把 x1 标成 1，选 c <= x1。\n- 要把 x1 标成 0，选 c > x1。",
        "所以一个点可以被 shattered。",
        "$$\n\\operatorname{VCdim}(H)\\ge1\n$$",
        "### Upper bound: 两个点不能被 shattered",
        "取两个有序点 x1<x2。",
        "对任意 threshold function h_c(x)=1{x>=c}，predictions 对 x 是 monotone 的。",
        "因此下面这个 labeling 不可能：",
        "$$\nh_c(x_1)=1,\\qquad h_c(x_2)=0\n$$",
        "因为如果 x1>=c，那么 x2>x1>=c，所以 x2 也必须标成 1。",
        "### Conclusion",
        "一个点能 shattered，但两个点不能 shattered，所以",
        "$$\n\\operatorname{VCdim}(H)=1\n$$"
      ])
    },
    {
      id: "hw5-1-3-2",
      section: "Problem 1.3.2",
      title: { en: "Give the VC sample complexity for threshold classifiers", cn: "给出 threshold classifiers 的 VC sample complexity" },
      original_excerpt: { en: "Detailed cue: use a VC generalization bound with VC dimension one to state the sample size, up to constants, needed for error at most epsilon with confidence one minus delta.", cn: "题目要点：使用 VC generalization bound，并代入 VC dimension one，给出使 error 至多 epsilon、confidence 至少 one minus delta 的 sample size order。" },
      problem_understanding: { en: "The problem is not asking for an exact constant. It wants the dependence on epsilon, delta, and VC dimension.", cn: "这题不是要 exact constant，而是要 sample complexity 对 epsilon、delta、VC dimension 的依赖关系。" },
      knowledge_points: { en: "A typical VC bound gives sample complexity on the order of (d log(1/epsilon)+log(1/delta))/epsilon squared. For thresholds, d=1.", cn: "典型 VC bound 给出的 sample complexity 约为 (d log(1/epsilon)+log(1/delta))/epsilon squared。对 thresholds，d=1。" },
      tips: { en: ["State the general VC form first.", "Substitute d=1 from Problem 1.3.1.", "Say up to constants and log factors if the exact theorem version differs."], cn: ["先写 general VC form。", "代入 Problem 1.3.1 的 d=1。", "若不同 theorem version 常数不同，就说明 up to constants / log factors。"] },
      detailed_solution: detail([
        "### General VC sample-complexity shape",
        "For a binary class with VC dimension d, a standard sufficient sample size has the form",
        "$$\nm=O\\left(\\frac{d\\log(1/\\epsilon)+\\log(1/\\delta)}{\\epsilon^2}\\right)\n$$",
        "The exact constants depend on which VC bound version is used.",
        "### Substitute the threshold VC dimension",
        "From Problem 1.3.1, d=1.",
        "$$\nm=O\\left(\\frac{\\log(1/\\epsilon)+\\log(1/\\delta)}{\\epsilon^2}\\right)\n$$",
        "### Interpretation",
        "- Smaller epsilon requires many more samples because the dependence is quadratic.\n- Smaller delta only enters logarithmically.\n- The hypothesis class is simple because d=1."
      ], [
        "### General VC sample-complexity shape",
        "对 VC dimension 为 d 的 binary class，常见 sufficient sample size 是",
        "$$\nm=O\\left(\\frac{d\\log(1/\\epsilon)+\\log(1/\\delta)}{\\epsilon^2}\\right)\n$$",
        "具体 constants 取决于使用哪一个 VC bound version。",
        "### 代入 threshold 的 VC dimension",
        "由 Problem 1.3.1，d=1。",
        "$$\nm=O\\left(\\frac{\\log(1/\\epsilon)+\\log(1/\\delta)}{\\epsilon^2}\\right)\n$$",
        "### Interpretation",
        "- epsilon 越小，sample size 增长很快，因为是 quadratic dependence。\n- delta 越小，只通过 logarithm 进入。\n- hypothesis class 很简单，因为 d=1。"
      ])
    },
    {
      id: "hw5-1-3-3",
      section: "Problem 1.3.3",
      title: { en: "Explain why threshold functions are PAC learnable", cn: "解释 threshold functions 为什么 PAC learnable" },
      original_excerpt: { en: "Detailed cue: connect finite VC dimension, uniform convergence, ERM over thresholds, and polynomial sample complexity in one over epsilon and log one over delta.", cn: "题目要点：把 finite VC dimension、uniform convergence、thresholds 上的 ERM，以及关于 one over epsilon 和 log one over delta 的 polynomial sample complexity 连接起来。" },
      problem_understanding: { en: "The question wants a concept explanation: simple hypothesis class means uniform convergence holds with enough samples, so ERM generalizes.", cn: "这题要 concept explanation：hypothesis class 简单，因此 enough samples 下 uniform convergence 成立，ERM 会 generalize。" },
      knowledge_points: { en: "The fundamental VC theorem says finite VC dimension is equivalent to PAC learnability for binary classification under ERM-style learning.", cn: "fundamental VC theorem 说明 finite VC dimension 与 binary classification 的 PAC learnability 密切等价，ERM-style learning 可实现。" },
      tips: { en: ["Mention finite VC dimension explicitly.", "Mention uniform convergence as the mechanism.", "Mention polynomial sample complexity."], cn: ["明确提 finite VC dimension。", "说明 mechanism 是 uniform convergence。", "说明 sample complexity 是 polynomial。"] },
      detailed_solution: detail([
        "### Complexity fact",
        "Thresholds on the real line have VC dimension 1.",
        "$$\n\\operatorname{VCdim}(H)=1<\\infty\n$$",
        "### Why finite VC dimension matters",
        "Finite VC dimension implies uniform convergence: with enough samples, empirical risk is close to true risk for every threshold simultaneously.",
        "$$\n\\sup_{h\\in H}|\\widehat R_S(h)-R(h)|\\text{ is small with high probability}\n$$",
        "### ERM consequence",
        "If empirical and true risks are uniformly close, the threshold chosen by ERM has true risk close to the best threshold in H.",
        "This is exactly the guarantee proved in the Hoeffding / ERM part of HW5.",
        "### PAC condition",
        "The required sample size is polynomial in 1/epsilon and log(1/delta), so the class is PAC learnable."
      ], [
        "### Complexity fact",
        "real line 上的 threshold class 的 VC dimension 是 1。",
        "$$\n\\operatorname{VCdim}(H)=1<\\infty\n$$",
        "### finite VC dimension 为什么重要",
        "finite VC dimension 推出 uniform convergence：samples 足够时，所有 thresholds 的 empirical risk 都会同时接近 true risk。",
        "$$\n\\sup_{h\\in H}|\\widehat R_S(h)-R(h)|\\text{ is small with high probability}\n$$",
        "### ERM consequence",
        "如果 empirical 和 true risks uniformly close，那么 ERM 选出的 threshold 的 true risk 会接近 H 内最优 threshold。",
        "这正是 HW5 前面 Hoeffding / ERM 部分证明的 guarantee。",
        "### PAC condition",
        "所需 sample size 对 1/epsilon 和 log(1/delta) 是 polynomial，所以这个 class 是 PAC learnable。"
      ])
    }
  ]);

  add("bellman", [
    {
      id: "hw5-2-1",
      section: "Problem 2.1",
      title: { en: "Define the infinite-horizon discounted Q-function", cn: "定义 infinite-horizon discounted Q-function" },
      original_excerpt: { en: "Detailed cue: MDP has deterministic reward R(s,a), stochastic transition p(s'|s,a), policy pi(a|s), and discount gamma; define Q^pi(s,a) after taking a first action a in state s.", cn: "题目要点：MDP 有 deterministic reward R(s,a)、stochastic transition p(s'|s,a)、policy pi(a|s)、discount gamma；定义在 state s 先采取 action a 后的 Q^pi(s,a)。" },
      problem_understanding: { en: "Q^pi(s,a) is the expected discounted return if the first state-action pair is fixed and all later actions follow pi.", cn: "Q^pi(s,a) 是 first state-action pair 固定后，后续 actions 按 pi 执行时的 expected discounted return。" },
      knowledge_points: { en: "Q-values condition on both state and first action. After the first action, randomness comes from transitions and the policy.", cn: "Q-value 同时 condition on state 和 first action。第一步之后，randomness 来自 transitions 和 policy。" },
      tips: { en: ["Condition on s0=s and a0=a.", "Include the full infinite discounted sum.", "State that future actions follow pi."], cn: ["condition on s0=s 和 a0=a。", "写出完整 infinite discounted sum。", "说明 future actions follow pi。"] },
      detailed_solution: detail([
        "### Definition",
        "$$\nQ^\\pi(s,a)=\\mathbb E_\\pi\\left[\\sum_{t=0}^{\\infty}\\gamma^t R(s_t,a_t)\\mid s_0=s, a_0=a\\right]\n$$",
        "### What the conditioning means",
        "- At time 0, the state is forced to be s.\n- At time 0, the action is forced to be a.\n- For t>=1, actions are sampled from pi(.|s_t).\n- Next states are sampled from p(.|s_t,a_t).",
        "### Why discount appears",
        "The factor gamma^t makes later rewards count less and keeps the infinite horizon well behaved when gamma<1.",
        "### Equivalent first-step view",
        "$$\nQ^\\pi(s,a)=R(s,a)+\\mathbb E_\\pi\\left[\\sum_{t=1}^{\\infty}\\gamma^t R(s_t,a_t)\\mid s_0=s,a_0=a\\right]\n$$"
      ], [
        "### Definition",
        "$$\nQ^\\pi(s,a)=\\mathbb E_\\pi\\left[\\sum_{t=0}^{\\infty}\\gamma^t R(s_t,a_t)\\mid s_0=s, a_0=a\\right]\n$$",
        "### Conditioning 的含义",
        "- time 0 的 state 固定为 s。\n- time 0 的 action 固定为 a。\n- 对 t>=1，actions 从 pi(.|s_t) sample。\n- next states 从 p(.|s_t,a_t) sample。",
        "### 为什么有 discount",
        "gamma^t 让 later rewards 权重变小，并且在 gamma<1 时让 infinite horizon 更稳定。",
        "### Equivalent first-step view",
        "$$\nQ^\\pi(s,a)=R(s,a)+\\mathbb E_\\pi\\left[\\sum_{t=1}^{\\infty}\\gamma^t R(s_t,a_t)\\mid s_0=s,a_0=a\\right]\n$$"
      ])
    },
    {
      id: "hw5-2-2",
      section: "Problem 2.2",
      title: { en: "Derive the Bellman equation for Q^pi", cn: "推导 Q^pi 的 Bellman equation" },
      original_excerpt: { en: "Detailed cue: start from the infinite discounted return, peel off the first reward, then express the remaining future return through the next state and next action under pi.", cn: "题目要点：从 infinite discounted return 出发，先拆出 first reward，再把剩余 future return 通过 next state 与 policy pi 下的 next action 表示。" },
      problem_understanding: { en: "Bellman equations are recursive definitions of value. The first step gives immediate reward; the rest is the expected Q-value at the next state-action pair.", cn: "Bellman equations 是 value 的 recursive definitions。第一步给 immediate reward；剩余部分是 next state-action pair 的 expected Q-value。" },
      knowledge_points: { en: "Use transition expectation over s' and policy expectation over a'. For policy evaluation, the next action is averaged under pi, not maximized.", cn: "对 s' 用 transition expectation，对 a' 用 policy expectation。policy evaluation 中 next action 按 pi average，不是 max。" },
      tips: { en: ["Pull out r0 first.", "Re-index the remaining sum.", "Average over both s' and a'."], cn: ["先 pull out r0。", "对剩余 sum re-index。", "同时对 s' 和 a' average。"] },
      detailed_solution: detail([
        "### Start from Q definition",
        "$$\nQ^\\pi(s,a)=\\mathbb E_\\pi\\left[\\sum_{t=0}^{\\infty}\\gamma^t R(s_t,a_t)\\mid s_0=s,a_0=a\\right]\n$$",
        "### Peel off the first reward",
        "$$\nQ^\\pi(s,a)=R(s,a)+\\gamma\\mathbb E_\\pi\\left[\\sum_{t=0}^{\\infty}\\gamma^t R(s_{t+1},a_{t+1})\\mid s_0=s,a_0=a\\right]\n$$",
        "### Condition on next state and action",
        "After taking a in s, the next state s' follows p(s'|s,a). Then policy pi chooses a' from pi(a'|s').",
        "The future return from that pair is Q^pi(s',a').",
        "### Bellman equation",
        "$$\nQ^\\pi(s,a)=R(s,a)+\\gamma\\sum_{s'}p(s'\\mid s,a)\\sum_{a'}\\pi(a'\\mid s')Q^\\pi(s',a')\n$$",
        "### Key distinction",
        "This is policy evaluation. If this were optimal control, the inner expectation over pi would become a max over actions."
      ], [
        "### 从 Q definition 开始",
        "$$\nQ^\\pi(s,a)=\\mathbb E_\\pi\\left[\\sum_{t=0}^{\\infty}\\gamma^t R(s_t,a_t)\\mid s_0=s,a_0=a\\right]\n$$",
        "### 拆出 first reward",
        "$$\nQ^\\pi(s,a)=R(s,a)+\\gamma\\mathbb E_\\pi\\left[\\sum_{t=0}^{\\infty}\\gamma^t R(s_{t+1},a_{t+1})\\mid s_0=s,a_0=a\\right]\n$$",
        "### Condition on next state and action",
        "在 s 中采取 a 后，next state s' 服从 p(s'|s,a)。随后 policy pi 从 pi(a'|s') 选择 a'。",
        "从这个 next pair 开始的 future return 就是 Q^pi(s',a')。",
        "### Bellman equation",
        "$$\nQ^\\pi(s,a)=R(s,a)+\\gamma\\sum_{s'}p(s'\\mid s,a)\\sum_{a'}\\pi(a'\\mid s')Q^\\pi(s',a')\n$$",
        "### Key distinction",
        "这是 policy evaluation。若是 optimal control，inner expectation over pi 会换成 max over actions。"
      ])
    },
    {
      id: "hw5-2-3",
      section: "Problem 2.3",
      title: { en: "Write the one-step Q-learning update", cn: "写出 one-step Q-learning update" },
      original_excerpt: { en: "Detailed cue: given one observed transition (s,a,r,s'), discount gamma, learning rate alpha, and current Q table, update only Q(s,a) toward r plus gamma times the best next-state action value.", cn: "题目要点：给定 observed transition (s,a,r,s')、discount gamma、learning rate alpha 与 current Q table；只更新 Q(s,a)，target 是 r 加 gamma times best next-state action value。" },
      problem_understanding: { en: "Q-learning uses a sample transition to do a Bellman optimality backup. It is off-policy because the target uses max over next actions, regardless of which action the behavior policy will actually take.", cn: "Q-learning 用 sample transition 做 Bellman optimality backup。它是 off-policy，因为 target 对 next actions 取 max，不管 behavior policy 实际会怎么走。" },
      knowledge_points: { en: "Target equals r + gamma max_{a'}Q(s',a'). Update is an exponential moving average between old value and target.", cn: "target 等于 r + gamma max_{a'}Q(s',a')。update 是 old value 与 target 的 exponential moving average。" },
      tips: { en: ["Only the entry Q(s,a) changes.", "The max is over actions at s'.", "Alpha controls how far to move toward the target."], cn: ["只有 Q(s,a) 这个 entry 改变。", "max 是对 s' 处的 actions 取。", "alpha 控制向 target 移动多少。"] },
      detailed_solution: detail([
        "### Bellman optimality target",
        "$$\ny=r+\\gamma\\max_{a'}Q(s',a')\n$$",
        "### Moving-average form",
        "$$\nQ_{new}(s,a)=(1-\\alpha)Q(s,a)+\\alpha y\n$$",
        "Substitute the target:",
        "$$\nQ_{new}(s,a)=(1-\\alpha)Q(s,a)+\\alpha\\left[r+\\gamma\\max_{a'}Q(s',a')\\right]\n$$",
        "### TD-error form",
        "The same update can be written as old value plus learning-rate times temporal-difference error.",
        "$$\nQ(s,a)\\leftarrow Q(s,a)+\\alpha\\left[r+\\gamma\\max_{a'}Q(s',a')-Q(s,a)\\right]\n$$",
        "### Entries not touched",
        "For every pair (u,b) not equal to (s,a), Q(u,b) remains unchanged in this one update."
      ], [
        "### Bellman optimality target",
        "$$\ny=r+\\gamma\\max_{a'}Q(s',a')\n$$",
        "### Moving-average form",
        "$$\nQ_{new}(s,a)=(1-\\alpha)Q(s,a)+\\alpha y\n$$",
        "代入 target：",
        "$$\nQ_{new}(s,a)=(1-\\alpha)Q(s,a)+\\alpha\\left[r+\\gamma\\max_{a'}Q(s',a')\\right]\n$$",
        "### TD-error form",
        "同一个 update 也可以写成 old value 加 learning-rate times temporal-difference error。",
        "$$\nQ(s,a)\\leftarrow Q(s,a)+\\alpha\\left[r+\\gamma\\max_{a'}Q(s',a')-Q(s,a)\\right]\n$$",
        "### Entries not touched",
        "除了 (s,a) 这个 pair，其他所有 Q(u,b) 在这一步都不变。"
      ])
    },
    {
      id: "hw5-2-4",
      section: "Problem 2.4",
      title: { en: "Bound the maximum optimal Q-value by the reward maximum", cn: "用 maximum reward 约束 optimal Q-value 上界" },
      original_excerpt: { en: "Detailed cue: if every reward is at most Rmax and discount gamma is below one, compute the largest possible infinite discounted return.", cn: "题目要点：如果每一步 reward 至多为 Rmax 且 discount gamma 小于 1，计算最大可能 infinite discounted return。" },
      problem_understanding: { en: "The best imaginable trajectory receives Rmax forever. The discounted sum of that constant reward is a geometric series.", cn: "最理想 trajectory 是每一步都拿 Rmax。这个 constant reward 的 discounted sum 是 geometric series。" },
      knowledge_points: { en: "For gamma in [0,1), sum_{t>=0} gamma^t equals 1/(1-gamma). Therefore discounted returns are bounded when rewards are bounded.", cn: "gamma in [0,1) 时，sum_{t>=0} gamma^t 等于 1/(1-gamma)。因此 rewards bounded 时 discounted returns 也 bounded。" },
      tips: { en: ["Upper-bound every reward by Rmax.", "Pull Rmax outside the sum.", "Use the infinite geometric series."], cn: ["把每个 reward 都 upper-bound 成 Rmax。", "把 Rmax 提到 sum 外面。", "使用 infinite geometric series。"] },
      detailed_solution: detail([
        "### Start from any return",
        "$$\n\\sum_{t=0}^{\\infty}\\gamma^t R(s_t,a_t)\n$$",
        "Since R(s,a)<=Rmax for all state-action pairs,",
        "$$\n\\sum_{t=0}^{\\infty}\\gamma^t R(s_t,a_t)\n\\le\n\\sum_{t=0}^{\\infty}\\gamma^t R_{max}\n$$",
        "### Geometric series",
        "$$\n\\sum_{t=0}^{\\infty}\\gamma^t=\\frac{1}{1-\\gamma}\n$$",
        "Thus",
        "$$\n\\sum_{t=0}^{\\infty}\\gamma^t R_{max}=\\frac{R_{max}}{1-\\gamma}\n$$",
        "### Apply to optimal Q",
        "Optimal Q is the supremum over policies and futures, but no future can beat receiving Rmax forever.",
        "$$\n\\max_{s,a}Q^*(s,a)\\le \\frac{R_{max}}{1-\\gamma}\n$$",
        "If an MDP has a path that actually receives Rmax forever, the bound is tight."
      ], [
        "### 从任意 return 开始",
        "$$\n\\sum_{t=0}^{\\infty}\\gamma^t R(s_t,a_t)\n$$",
        "因为所有 state-action pairs 都满足 R(s,a)<=Rmax，",
        "$$\n\\sum_{t=0}^{\\infty}\\gamma^t R(s_t,a_t)\n\\le\n\\sum_{t=0}^{\\infty}\\gamma^t R_{max}\n$$",
        "### Geometric series",
        "$$\n\\sum_{t=0}^{\\infty}\\gamma^t=\\frac{1}{1-\\gamma}\n$$",
        "所以",
        "$$\n\\sum_{t=0}^{\\infty}\\gamma^t R_{max}=\\frac{R_{max}}{1-\\gamma}\n$$",
        "### Apply to optimal Q",
        "optimal Q 是对 policies 和 futures 的最优，但没有任何 future 能超过每一步都拿 Rmax。",
        "$$\n\\max_{s,a}Q^*(s,a)\\le \\frac{R_{max}}{1-\\gamma}\n$$",
        "如果某个 MDP 确实能 forever 拿到 Rmax，这个 bound 就是 tight。"
      ])
    },
    {
      id: "hw5-2-5",
      section: "Problem 2.5",
      title: { en: "Prove Bellman optimality is a gamma-contraction", cn: "证明 Bellman optimality 是 gamma-contraction" },
      original_excerpt: { en: "Detailed cue: Bellman optimality operator takes a value function V to max over actions of immediate reward plus discounted transition expectation; prove sup-norm distance between TV and TU is at most gamma times sup-norm distance between V and U.", cn: "题目要点：Bellman optimality operator 把 V 映射成 max over actions 的 immediate reward plus discounted transition expectation；证明 TV 与 TU 的 sup-norm distance 至多是 gamma times V 与 U 的 sup-norm distance。" },
      problem_understanding: { en: "The reward terms cancel because both backups use the same R. The only difference comes from future values, and those are discounted by gamma and averaged by probabilities.", cn: "reward terms 会 cancel，因为两个 backups 使用同一个 R。差异只来自 future values，而 future values 被 gamma discount，并由 probabilities average。" },
      knowledge_points: { en: "Use the inequality |max_a A_a - max_a B_a| <= max_a |A_a-B_a| and the fact that transition probabilities sum to one.", cn: "使用 inequality |max_a A_a - max_a B_a| <= max_a |A_a-B_a|，以及 transition probabilities sum to one。" },
      tips: { en: ["Fix one state s first.", "Name the two action-backup quantities A_a and B_a.", "Only take max over states at the end."], cn: ["先 fix 一个 state s。", "把两个 action-backup quantities 命名为 A_a 和 B_a。", "最后再对 states 取 max。"] },
      detailed_solution: detail([
        "### Bellman operator",
        "$$\n(TV)(s)=\\max_a\\left[R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)V(s')\\right]\n$$",
        "$$\n(TU)(s)=\\max_a\\left[R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)U(s')\\right]\n$$",
        "### Fix a state and define action backups",
        "$$\nA_a=R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)V(s')\n$$",
        "$$\nB_a=R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)U(s')\n$$",
        "Then (TV)(s)=max_a A_a and (TU)(s)=max_a B_a.",
        "### Compare maxima",
        "$$\n|(TV)(s)-(TU)(s)|\n=|\\max_a A_a-\\max_a B_a|\n\\le \\max_a |A_a-B_a|\n$$",
        "### Bound one action difference",
        "The reward cancels.",
        "$$\n|A_a-B_a|\n=\\gamma\\left|\\sum_{s'}P(s'\\mid s,a)(V(s')-U(s'))\\right|\n$$",
        "$$\n|A_a-B_a|\n\\le \\gamma\\sum_{s'}P(s'\\mid s,a)|V(s')-U(s')|\n$$",
        "Since every absolute difference is at most ||V-U||_infinity,",
        "$$\n|A_a-B_a|\\le \\gamma\\sum_{s'}P(s'\\mid s,a)\\|V-U\\|_\\infty\n=\\gamma\\|V-U\\|_\\infty\n$$",
        "### Take the supremum over states",
        "$$\n\\|TV-TU\\|_\\infty\n=\\max_s |(TV)(s)-(TU)(s)|\n\\le \\gamma\\|V-U\\|_\\infty\n$$",
        "Thus T is a gamma-contraction."
      ], [
        "### Bellman operator",
        "$$\n(TV)(s)=\\max_a\\left[R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)V(s')\\right]\n$$",
        "$$\n(TU)(s)=\\max_a\\left[R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)U(s')\\right]\n$$",
        "### Fix 一个 state，并定义 action backups",
        "$$\nA_a=R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)V(s')\n$$",
        "$$\nB_a=R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)U(s')\n$$",
        "于是 (TV)(s)=max_a A_a，(TU)(s)=max_a B_a。",
        "### Compare maxima",
        "$$\n|(TV)(s)-(TU)(s)|\n=|\\max_a A_a-\\max_a B_a|\n\\le \\max_a |A_a-B_a|\n$$",
        "### Bound one action difference",
        "reward 会 cancel。",
        "$$\n|A_a-B_a|\n=\\gamma\\left|\\sum_{s'}P(s'\\mid s,a)(V(s')-U(s'))\\right|\n$$",
        "$$\n|A_a-B_a|\n\\le \\gamma\\sum_{s'}P(s'\\mid s,a)|V(s')-U(s')|\n$$",
        "由于每个 absolute difference 都不超过 ||V-U||_infinity，",
        "$$\n|A_a-B_a|\\le \\gamma\\sum_{s'}P(s'\\mid s,a)\\|V-U\\|_\\infty\n=\\gamma\\|V-U\\|_\\infty\n$$",
        "### 对 states 取 supremum",
        "$$\n\\|TV-TU\\|_\\infty\n=\\max_s |(TV)(s)-(TU)(s)|\n\\le \\gamma\\|V-U\\|_\\infty\n$$",
        "因此 T 是 gamma-contraction。"
      ])
    }
  ]);

  add("q-learning", [
    {
      id: "hw5-3-1",
      section: "Problem 3.1",
      title: { en: "Compute the random-policy hitting time in the combination lock", cn: "计算 combination lock 中 random policy 的 hitting time" },
      original_excerpt: { en: "Detailed cue: before learning, Q1 is all zero and Q2 is all Rmax, so both greedy policies break ties uniformly; reaching sn from s1 requires n-1 consecutive a1 actions because any a2 resets to s1.", cn: "题目要点：learning 前，Q1 全为 zero，Q2 全为 Rmax，因此两个 greedy policies 都 uniform tie-break；从 s1 到 sn 需要连续 n-1 次选择 a1，因为任意 a2 都 reset 到 s1。" },
      problem_understanding: { en: "This is a waiting-time problem for a streak of successes. Each action choice is like a fair coin: a1 advances and a2 resets.", cn: "这题是 consecutive successes 的 waiting-time problem。每次 action choice 像 fair coin：a1 前进，a2 reset。" },
      knowledge_points: { en: "The expected waiting time for k consecutive successes in Bernoulli(1/2) trials is 2^{k+1}-2. Here k=n-1.", cn: "Bernoulli(1/2) trials 中等待 k consecutive successes 的期望时间是 2^{k+1}-2。这里 k=n-1。" },
      tips: { en: ["Both initial Q tables induce random tie-breaking.", "Set k=n-1 successful a1 moves.", "Any a2 destroys the current streak."], cn: ["两个 initial Q tables 都导致 random tie-breaking。", "令 k=n-1 个 successful a1 moves。", "任意 a2 都会打断当前 streak。"] },
      detailed_solution: detail([
        "### Initial policies",
        "Before any learning, both action values are tied at every state.",
        "- Q1(s,a)=0 for all pairs.\n- Q2(s,a)=Rmax for all pairs.\n- Greedy tie-breaking chooses a1 or a2 with probability 1/2.",
        "### What is required to reach sn",
        "From s1, action a1 advances one state. Action a2 sends the agent back to s1.",
        "Therefore the agent must choose",
        "$$\na_1,a_1,\\ldots,a_1\n$$",
        "for n-1 consecutive steps.",
        "### Waiting time formula",
        "For k consecutive successes with success probability 1/2, the expected waiting time is",
        "$$\n2^{k+1}-2\n$$",
        "Here k=n-1, so",
        "$$\n\\mathbb E[T]=2^n-2\n$$",
        "### Conclusion",
        "Both initial greedy policies have the same expected number of steps before learning: 2^n-2."
      ], [
        "### Initial policies",
        "learning 前，每个 state 的两个 action values 都 tied。",
        "- Q1(s,a)=0 for all pairs。\n- Q2(s,a)=Rmax for all pairs。\n- greedy tie-breaking 以 1/2 概率选择 a1 或 a2。",
        "### 到达 sn 需要什么",
        "从 s1 出发，action a1 前进一个 state；action a2 把 agent reset 到 s1。",
        "因此 agent 必须连续选择",
        "$$\na_1,a_1,\\ldots,a_1\n$$",
        "共 n-1 步。",
        "### Waiting time formula",
        "success probability 为 1/2 时，等待 k consecutive successes 的 expected time 是",
        "$$\n2^{k+1}-2\n$$",
        "这里 k=n-1，所以",
        "$$\n\\mathbb E[T]=2^n-2\n$$",
        "### Conclusion",
        "learning 前两个 initial greedy policies 的 expected steps 相同，都是 2^n-2。"
      ])
    },
    {
      id: "hw5-3-2",
      section: "Problem 3.2",
      title: { en: "Show zero-initialized Q-learning still reaches sn exponentially slowly", cn: "说明 zero-initialized Q-learning 到 sn 仍然 exponentially slow" },
      original_excerpt: { en: "Detailed cue: with Q1 initialized to zero and online Bellman updates at every observed transition, compute the expected time for pi1 to first reach sn from s1.", cn: "题目要点：Q1 initialized to zero，并且每个 observed transition 都 online Bellman update；计算 pi1 第一次从 s1 到达 sn 的 expected time。" },
      problem_understanding: { en: "Before the rewarding transition is seen, every observed reward is zero and the next-state max Q is also zero. So the Q table stays tied and the policy remains random.", cn: "在看到 rewarding transition 之前，每个 observed reward 都是 zero，next-state max Q 也为 zero。因此 Q table 保持 tied，policy 仍然 random。" },
      knowledge_points: { en: "Q-learning cannot propagate an unseen reward. With zero initialization and no positive reward yet, all updates have target zero.", cn: "Q-learning 不能传播还没见过的 reward。zero initialization 且尚无 positive reward 时，所有 updates 的 target 都是 zero。" },
      tips: { en: ["Focus on the period before first reaching sn.", "Compute the update target for zero-reward transitions.", "Reuse the hitting-time result from Problem 3.1."], cn: ["只关注 first reaching sn 之前。", "计算 zero-reward transitions 的 update target。", "复用 Problem 3.1 的 hitting-time result。"] },
      detailed_solution: detail([
        "### Q1 initialization",
        "$$\nQ_1(s,a)=0\\quad\\text{for all }(s,a)\n$$",
        "### Before the first rewarding transition",
        "Until the agent reaches sn and chooses a1 there, every observed reward is zero.",
        "For any such transition, the Q-learning target is",
        "$$\nr+\\gamma\\max_{a'}Q_1(s',a')=0+\\gamma\\cdot0=0\n$$",
        "### Update stays zero",
        "$$\nQ_1(s,a)\\leftarrow (1-\\alpha)0+\\alpha\\cdot0=0\n$$",
        "So all action values remain tied.",
        "### Policy behavior",
        "Because all values are tied, pi1 keeps choosing a1 or a2 uniformly at random.",
        "To reach sn from s1, it still needs n-1 consecutive a1 choices.",
        "### Expected steps",
        "$$\n\\mathbb E[T]=2^n-2\n$$"
      ], [
        "### Q1 initialization",
        "$$\nQ_1(s,a)=0\\quad\\text{for all }(s,a)\n$$",
        "### 第一次 rewarding transition 之前",
        "直到 agent 到达 sn 并在 sn 选择 a1 之前，所有 observed reward 都是 zero。",
        "对任意这样的 transition，Q-learning target 是",
        "$$\nr+\\gamma\\max_{a'}Q_1(s',a')=0+\\gamma\\cdot0=0\n$$",
        "### Update 仍然是 zero",
        "$$\nQ_1(s,a)\\leftarrow (1-\\alpha)0+\\alpha\\cdot0=0\n$$",
        "所以所有 action values 继续 tied。",
        "### Policy behavior",
        "因为所有 values 都 tied，pi1 继续 uniform random 选择 a1 或 a2。",
        "从 s1 到 sn 仍然需要 n-1 consecutive a1 choices。",
        "### Expected steps",
        "$$\n\\mathbb E[T]=2^n-2\n$$"
      ])
    },
    {
      id: "hw5-3-3",
      section: "Problem 3.3",
      title: { en: "Analyze pi1 after observing the rewarding self-loop once", cn: "分析 pi1 观察一次 rewarding self-loop 后的行为" },
      original_excerpt: { en: "Detailed cue: after observing (sn,a1,1,sn), reset immediately to s1; determine the expected steps for zero-initialized pi1 to reach sn again.", cn: "题目要点：观察到 (sn,a1,1,sn) 后立刻 reset 到 s1；求 zero-initialized pi1 再次到达 sn 的 expected steps。" },
      problem_understanding: { en: "The reward updates only Q(sn,a1). It does not magically change earlier states, so from s1 through s_{n-1}, the policy is still random.", cn: "reward 只更新 Q(sn,a1)。它不会自动改变 earlier states，所以从 s1 到 s_{n-1}，policy 仍然 random。" },
      knowledge_points: { en: "Tabular Q-learning updates one state-action pair at a time. Without replay or revisiting predecessor transitions, value does not propagate backward immediately.", cn: "tabular Q-learning 每次只更新一个 state-action pair。没有 replay 或重新访问 predecessor transitions 时，value 不会立刻 backward propagate。" },
      tips: { en: ["Compute the update at sn first.", "List which states are still tied.", "The target event is reaching sn, not staying there forever."], cn: ["先计算 sn 处的 update。", "列出哪些 states 仍然 tied。", "target event 是 reaching sn，不是 forever stay there。"] },
      detailed_solution: detail([
        "### Rewarding update",
        "When the agent observes (sn,a1,1,sn), the old Q values are still zero.",
        "$$\nQ_1(s_n,a_1)\\leftarrow (1-\\alpha)0+\\alpha\\left(1+\\gamma\\max_{a'}Q_1(s_n,a')\\right)=\\alpha\n$$",
        "So at sn, action a1 is now preferred.",
        "### What did not change",
        "For every earlier state s1 through s_{n-1}, no positive value has reached those actions yet.",
        "$$\nQ_1(s_i,a_1)=Q_1(s_i,a_2)=0\\quad\\text{for }i<n\n$$",
        "### After reset to s1",
        "From s1 to s_{n-1}, pi1 still breaks ties randomly.",
        "Reaching sn again still requires n-1 consecutive a1 actions before any a2 reset.",
        "### Expected steps",
        "$$\n\\mathbb E[T]=2^n-2\n$$",
        "The rewarding self-loop is useful only after the agent is already at sn; it does not yet guide the path into sn."
      ], [
        "### Rewarding update",
        "当 agent 观察到 (sn,a1,1,sn) 时，old Q values 仍然是 zero。",
        "$$\nQ_1(s_n,a_1)\\leftarrow (1-\\alpha)0+\\alpha\\left(1+\\gamma\\max_{a'}Q_1(s_n,a')\\right)=\\alpha\n$$",
        "所以在 sn，action a1 现在被 preferred。",
        "### 什么没有改变",
        "对 earlier states s1 到 s_{n-1}，positive value 还没有传回来。",
        "$$\nQ_1(s_i,a_1)=Q_1(s_i,a_2)=0\\quad\\text{for }i<n\n$$",
        "### Reset 到 s1 后",
        "从 s1 到 s_{n-1}，pi1 仍然 random tie-break。",
        "再次到达 sn 仍然需要 n-1 consecutive a1 actions，且中途不能选到 a2 reset。",
        "### Expected steps",
        "$$\n\\mathbb E[T]=2^n-2\n$$",
        "rewarding self-loop 只在 agent 已经到 sn 后有用；它还没有 guide agent 进入 sn。"
      ])
    },
    {
      id: "hw5-3-4",
      section: "Problem 3.4",
      title: { en: "Explain how replay propagates sparse reward backward", cn: "解释 replay 如何把 sparse reward backward propagate" },
      original_excerpt: { en: "Detailed cue: describe how a replay buffer can reduce episodes for pi1 to become optimal after a rare successful trajectory reaches the rewarding self-loop.", cn: "题目要点：说明 replay buffer 如何在一次 rare successful trajectory 到达 rewarding self-loop 后，减少 pi1 变 optimal 所需 episodes。" },
      problem_understanding: { en: "Replay lets the algorithm update old predecessor transitions many times. Once the end reward is known, backing up transitions from the end toward the start spreads the value to earlier states.", cn: "replay 允许 algorithm 多次更新 old predecessor transitions。一旦 end reward 已知，从尾到头 backup transitions 可以把 value 传到 earlier states。" },
      knowledge_points: { en: "Experience replay breaks the need to rediscover the full rare trajectory repeatedly. It turns value propagation into repeated Bellman backups over stored samples.", cn: "experience replay 让 agent 不必反复重新发现完整 rare trajectory。它把 value propagation 变成对 stored samples 反复做 Bellman backups。" },
      tips: { en: ["Store the successful trajectory.", "Replay in reverse order for intuition.", "Emphasize fewer episodes, not necessarily fewer gradient updates."], cn: ["存下 successful trajectory。", "用 reverse order replay 来理解。", "强调 fewer episodes，不一定是 fewer gradient updates。"] },
      detailed_solution: detail([
        "### What is hard without replay",
        "With zero initialization, the agent only learns about a predecessor state after it revisits the transition from that predecessor to a state with positive value.",
        "In the combination lock, revisiting the whole successful path is exponentially unlikely under random tie-breaking.",
        "### What the buffer stores",
        "After one lucky successful episode, the buffer contains transitions like",
        "$$\n(s_1,a_1,0,s_2),\n(s_2,a_1,0,s_3),\n\\ldots,\n(s_{n-1},a_1,0,s_n),\n(s_n,a_1,1,s_n)\n$$",
        "### Backward propagation",
        "Replay can first update the rewarding self-loop, then update the transition into sn, then the transition into s_{n-1}, and so on.",
        "- Q(sn,a1) becomes positive.\n- Then Q(s_{n-1},a1) can become positive because its target looks at sn.\n- Then Q(s_{n-2},a1) can become positive, and the signal continues backward.",
        "### Result",
        "After enough replay backups, each state prefers a1, so pi1 becomes the optimal path policy without waiting for many new rare episodes."
      ], [
        "### 没有 replay 时难在哪里",
        "zero initialization 下，agent 只有重新访问某个 predecessor transition，才会把 positive value 传到 predecessor state。",
        "在 combination lock 中，靠 random tie-breaking 反复重新走完整 successful path 是 exponentially unlikely。",
        "### Buffer 存什么",
        "一次 lucky successful episode 后，buffer 里有类似 transitions：",
        "$$\n(s_1,a_1,0,s_2),\n(s_2,a_1,0,s_3),\n\\ldots,\n(s_{n-1},a_1,0,s_n),\n(s_n,a_1,1,s_n)\n$$",
        "### Backward propagation",
        "replay 可以先更新 rewarding self-loop，再更新进入 sn 的 transition，再更新进入 s_{n-1} 的 transition，依次往前。",
        "- Q(sn,a1) 变 positive。\n- 然后 Q(s_{n-1},a1) 因为 target 看 sn，也能变 positive。\n- 接着 Q(s_{n-2},a1) 变 positive，signal 继续 backward。",
        "### Result",
        "足够多 replay backups 后，每个 state 都 prefer a1，因此 pi1 不需要等待很多新 rare episodes 也能学到 optimal path policy。"
      ])
    },
    {
      id: "hw5-3-5",
      section: "Problem 3.5",
      title: { en: "Find the minimum hitting steps under optimistic initialization", cn: "求 optimistic initialization 下的 minimum hitting steps" },
      original_excerpt: { en: "Detailed cue: Q2 starts at Rmax for every state-action pair and updates after each step; find the smallest possible number of actions needed to reach sn from s1.", cn: "题目要点：Q2 对所有 state-action pairs 从 Rmax 开始，并且每一步后 update；求从 s1 到 sn 所需的 smallest possible number of actions。" },
      problem_understanding: { en: "The minimum path ignores unlucky tie-breaking and asks for the best possible sequence of choices. The shortest route is simply choosing a1 at every earlier state.", cn: "minimum path 忽略 unlucky tie-breaking，问 best possible sequence。最短 route 就是在每个 earlier state 都选择 a1。" },
      knowledge_points: { en: "In the combination lock, a1 moves forward and a2 resets. Any a2 before sn only adds extra steps, so the lower bound is the straight path length.", cn: "combination lock 中，a1 forward，a2 reset。到 sn 前任何 a2 只会增加 steps，所以 lower bound 是 straight path length。" },
      tips: { en: ["Minimum means best tie outcomes.", "Count transitions, not states.", "From s1 to sn requires n-1 forward moves."], cn: ["minimum 表示 tie outcomes 最好。", "数 transitions，不是数 states。", "从 s1 到 sn 需要 n-1 个 forward moves。"] },
      detailed_solution: detail([
        "### Shortest route",
        "The direct route is",
        "$$\ns_1\\xrightarrow{a_1}s_2\\xrightarrow{a_1}\\cdots\\xrightarrow{a_1}s_n\n$$",
        "This route uses one forward action for each gap between consecutive states.",
        "### Count the gaps",
        "There are n states from s1 to sn, so there are n-1 transitions between them.",
        "$$\nT_{min}=n-1\n$$",
        "### Why nothing shorter is possible",
        "Each action can advance by at most one state. Therefore no policy can reach sn in fewer than n-1 steps.",
        "### Role of optimistic initialization",
        "Optimistic Q2 affects which actions may be explored after updates, but the minimum possible hitting time is still the straight all-a1 path."
      ], [
        "### Shortest route",
        "direct route 是",
        "$$\ns_1\\xrightarrow{a_1}s_2\\xrightarrow{a_1}\\cdots\\xrightarrow{a_1}s_n\n$$",
        "这条 route 对每一对 consecutive states 用一次 forward action。",
        "### Count the gaps",
        "从 s1 到 sn 一共有 n 个 states，因此中间有 n-1 个 transitions。",
        "$$\nT_{min}=n-1\n$$",
        "### 为什么不能更短",
        "每个 action 最多只能前进一个 state。因此任何 policy 都不可能少于 n-1 步到达 sn。",
        "### Optimistic initialization 的作用",
        "optimistic Q2 会影响 updates 后探索哪些 actions，但 minimum possible hitting time 仍然是 all-a1 straight path。"
      ])
    },
    {
      id: "hw5-3-6",
      section: "Problem 3.6",
      title: { en: "Upper-bound optimistic Q-learning's hitting time", cn: "upper-bound optimistic Q-learning 的 hitting time" },
      original_excerpt: { en: "Detailed cue: show that with Q2 initialized to Rmax and updated every step, tried zero-reward actions drop below untried actions, so the worst-case path length is at most the random-policy expectation from Problem 3.2.", cn: "题目要点：证明 Q2 initialized to Rmax 且每步 update 时，tried zero-reward actions 会低于 untried actions；因此 worst-case path length 不超过 Problem 3.2 的 random-policy expectation。" },
      problem_understanding: { en: "Optimistic initialization encourages systematic exploration. Once a zero-reward action is tried, its value falls below the still-untried optimistic value, so the agent does not keep repeating the same unhelpful action forever.", cn: "optimistic initialization 鼓励 systematic exploration。zero-reward action 一旦被 tried，它的 value 会低于 still-untried optimistic value，因此 agent 不会一直重复同一个无用 action。" },
      knowledge_points: { en: "For nonterminal zero-reward transitions, the target is gamma times a max Q no bigger than Rmax, so with gamma<1 the updated value becomes strictly below Rmax.", cn: "对 nonterminal zero-reward transitions，target 是 gamma times max Q，最多 gamma Rmax；因为 gamma<1，updated value 会严格小于 Rmax。" },
      tips: { en: ["Assume Rmax=1 for the comparison.", "Show tried zero-reward actions drop below 1.", "Count worst-case resets plus the final forward run."], cn: ["比较时可设 Rmax=1。", "先证明 tried zero-reward actions drop below 1。", "数 worst-case resets 加 final forward run。"] },
      detailed_solution: detail([
        "### Optimistic initial values",
        "Here Rmax=1, so",
        "$$\nQ_2(s,a)=1\\quad\\text{for all }(s,a)\n$$",
        "### What happens after trying a zero-reward action",
        "For a nonrewarding transition, r=0. Before all actions are exhausted, the next-state max is at most 1.",
        "$$\nQ_2(s,a)\\leftarrow (1-\\alpha)1+\alpha(0+\gamma\\cdot1)\n=1-\alpha(1-\gamma)<1\n$$",
        "So a tried zero-reward action drops below an untried action that still has value 1.",
        "### Exploration consequence",
        "At each state, the policy is pushed to try actions it has not tried yet.",
        "In the worst case, the agent tries the reset action a2 at state s_i before eventually using a1 to progress past that state.",
        "### Count worst-case steps",
        "Trying a2 at s_i costs i steps: it takes i-1 forward moves to get from s1 to s_i, then one reset action.",
        "Summing over i=1 to n-1 gives",
        "$$\n1+2+\\cdots+(n-1)=\\frac{n(n-1)}2\n$$",
        "After those mistakes, the final direct run costs n-1 more steps.",
        "$$\nT_{max}\\le \\frac{n(n-1)}2+(n-1)=\\frac{(n-1)(n+2)}2\n$$",
        "### Compare with pi1 from Problem 3.2",
        "Problem 3.2 gave the expected time 2^n-2. For n>=2,",
        "$$\n\\frac{(n-1)(n+2)}2\\le 2^n-2\n$$",
        "Thus the optimistic-policy maximum hitting time is bounded by the zero-initialized random-policy expectation from Problem 3.2."
      ], [
        "### Optimistic initial values",
        "这里 Rmax=1，所以",
        "$$\nQ_2(s,a)=1\\quad\\text{for all }(s,a)\n$$",
        "### 尝试 zero-reward action 后会怎样",
        "对 nonrewarding transition，r=0。在 actions 没全部 exhausted 前，next-state max 最多是 1。",
        "$$\nQ_2(s,a)\\leftarrow (1-\\alpha)1+\alpha(0+\gamma\\cdot1)\n=1-\alpha(1-\gamma)<1\n$$",
        "所以 tried zero-reward action 会低于 still value 1 的 untried action。",
        "### Exploration consequence",
        "在每个 state，policy 会被推着尝试还没 tried 的 action。",
        "worst case 下，agent 会在每个 s_i 先尝试 reset action a2，然后才最终用 a1 通过这个 state。",
        "### Count worst-case steps",
        "在 s_i 尝试 a2 的成本是 i 步：先从 s1 用 i-1 个 forward moves 到 s_i，再执行一次 reset action。",
        "对 i=1 到 n-1 求和：",
        "$$\n1+2+\\cdots+(n-1)=\\frac{n(n-1)}2\n$$",
        "这些 mistakes 后，final direct run 还需要 n-1 步。",
        "$$\nT_{max}\\le \\frac{n(n-1)}2+(n-1)=\\frac{(n-1)(n+2)}2\n$$",
        "### 和 Problem 3.2 的 pi1 比较",
        "Problem 3.2 的 expected time 是 2^n-2。对 n>=2，",
        "$$\n\\frac{(n-1)(n+2)}2\\le 2^n-2\n$$",
        "因此 optimistic-policy 的 maximum hitting time 被 zero-initialized random-policy expectation upper-bound。"
      ])
    }
  ]);

  add("policy-gradient", [
    {
      id: "hw5-4-1",
      section: "Problem 4.1",
      title: { en: "Derive REINFORCE using the trajectory log-derivative trick", cn: "用 trajectory log-derivative trick 推导 REINFORCE" },
      original_excerpt: { en: "Detailed cue: trajectory probability factors into initial distribution, policy probabilities, environment transitions, and the final policy factor; show that gradient of expected return equals return times the sum of policy log-gradient terms.", cn: "题目要点：trajectory probability 分解为 initial distribution、policy probabilities、environment transitions 和 final policy factor；证明 expected return 的 gradient 等于 return 乘 policy log-gradient terms 的求和。" },
      problem_understanding: { en: "The environment dynamics do not depend on theta. When differentiating trajectory probability, only policy factors contribute, and the log-derivative trick turns gradient of probability into probability times gradient of log probability.", cn: "environment dynamics 不依赖 theta。对 trajectory probability 求导时，只有 policy factors 有贡献；log-derivative trick 把 probability 的 gradient 变成 probability times log probability 的 gradient。" },
      knowledge_points: { en: "Use grad P = P grad log P. The log of a trajectory factorization becomes a sum, and theta-dependent terms are only log pi_theta(a_t|s_t).", cn: "使用 grad P = P grad log P。trajectory factorization 取 log 后变成 sum，theta-dependent terms 只有 log pi_theta(a_t|s_t)。" },
      tips: { en: ["Write J as a sum or integral over trajectories.", "Factor P_pi(theta)(tau) before taking logs.", "Drop gradients of d0 and transition probabilities."], cn: ["把 J 写成 trajectories 上的 sum/integral。", "先 factor P_pi(theta)(tau)，再取 logs。", "d0 和 transition probabilities 的 gradients 为 zero。"] },
      detailed_solution: detail([
        "### Objective",
        "$$\nJ(\\theta)=\\mathbb E_{\\tau\\sim\\pi_\\theta}[R(\\tau)]\n=\\sum_\\tau P_{\\pi_\\theta}(\\tau)R(\\tau)\n$$",
        "### Differentiate",
        "$$\n\\nabla_\\theta J(\\theta)=\\sum_\\tau R(\\tau)\\nabla_\\theta P_{\\pi_\\theta}(\\tau)\n$$",
        "Use the log-derivative trick.",
        "$$\n\\nabla_\\theta P_{\\pi_\\theta}(\\tau)=P_{\\pi_\\theta}(\\tau)\\nabla_\\theta\\log P_{\\pi_\\theta}(\\tau)\n$$",
        "So",
        "$$\n\\nabla_\\theta J(\\theta)=\\mathbb E_{\\tau\\sim\\pi_\\theta}\\left[R(\\tau)\\nabla_\\theta\\log P_{\\pi_\\theta}(\\tau)\\right]\n$$",
        "### Trajectory factorization",
        "$$\nP_{\\pi_\\theta}(\\tau)=d_0(s_0)\\left[\\prod_{t=0}^{T-1}\\pi_\\theta(a_t\\mid s_t)P(s_{t+1}\\mid s_t,a_t)\\right]\\pi_\\theta(a_T\\mid s_T)\n$$",
        "### Take logs and differentiate",
        "The initial distribution and transition probabilities do not depend on theta, so their gradients vanish.",
        "$$\n\\nabla_\\theta\\log P_{\\pi_\\theta}(\\tau)\n=\\sum_{t=0}^{T}\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)\n$$",
        "### Final policy-gradient estimator",
        "$$\n\\nabla_\\theta J(\\theta)=\n\\mathbb E_{\\tau\\sim\\pi_\\theta}\\left[\nR(\\tau)\\sum_{t=0}^{T}\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)\n\\right]\n$$"
      ], [
        "### Objective",
        "$$\nJ(\\theta)=\\mathbb E_{\\tau\\sim\\pi_\\theta}[R(\\tau)]\n=\\sum_\\tau P_{\\pi_\\theta}(\\tau)R(\\tau)\n$$",
        "### Differentiate",
        "$$\n\\nabla_\\theta J(\\theta)=\\sum_\\tau R(\\tau)\\nabla_\\theta P_{\\pi_\\theta}(\\tau)\n$$",
        "使用 log-derivative trick。",
        "$$\n\\nabla_\\theta P_{\\pi_\\theta}(\\tau)=P_{\\pi_\\theta}(\\tau)\\nabla_\\theta\\log P_{\\pi_\\theta}(\\tau)\n$$",
        "所以",
        "$$\n\\nabla_\\theta J(\\theta)=\\mathbb E_{\\tau\\sim\\pi_\\theta}\\left[R(\\tau)\\nabla_\\theta\\log P_{\\pi_\\theta}(\\tau)\\right]\n$$",
        "### Trajectory factorization",
        "$$\nP_{\\pi_\\theta}(\\tau)=d_0(s_0)\\left[\\prod_{t=0}^{T-1}\\pi_\\theta(a_t\\mid s_t)P(s_{t+1}\\mid s_t,a_t)\\right]\\pi_\\theta(a_T\\mid s_T)\n$$",
        "### 取 log 并求导",
        "initial distribution 和 transition probabilities 不依赖 theta，所以 gradients vanish。",
        "$$\n\\nabla_\\theta\\log P_{\\pi_\\theta}(\\tau)\n=\\sum_{t=0}^{T}\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)\n$$",
        "### Final policy-gradient estimator",
        "$$\n\\nabla_\\theta J(\\theta)=\n\\mathbb E_{\\tau\\sim\\pi_\\theta}\\left[\nR(\\tau)\\sum_{t=0}^{T}\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)\n\\right]\n$$"
      ])
    },
    {
      id: "hw5-4-2",
      section: "Problem 4.2",
      title: { en: "Rewrite policy gradient using discounted state occupancy", cn: "用 discounted state occupancy 重写 policy gradient" },
      original_excerpt: { en: "Detailed cue: define d_pi(s) as the discounted sum of state visitation probabilities and show the gradient can be written as an expectation over s from d_pi and a from pi of Q^pi(s,a) times grad log pi.", cn: "题目要点：定义 d_pi(s) 为 discounted state visitation probabilities 的求和，并证明 gradient 可写成 s from d_pi、a from pi 的 expectation， integrand 是 Q^pi(s,a) times grad log pi。" },
      problem_understanding: { en: "Instead of weighting whole trajectories by total return, the policy-gradient theorem says we can view the gradient as local action scores weighted by Q at visited states.", cn: "policy-gradient theorem 说明：不用整条 trajectory 的 total return 来看，也可以把 gradient 看成 visited states 上由 Q 加权的 local action scores。" },
      knowledge_points: { en: "Use V^pi(s)=sum_a pi(a|s)Q^pi(s,a), differentiate it, and unroll the recursive term through future discounted state visits.", cn: "使用 V^pi(s)=sum_a pi(a|s)Q^pi(s,a)，对它求导，并把 recursive term 沿 future discounted state visits 展开。" },
      tips: { en: ["Start from J=E_{s0~d0} V^pi(s0).", "Differentiate V as policy term plus future-value term.", "Use grad pi = pi grad log pi at the end."], cn: ["从 J=E_{s0~d0} V^pi(s0) 开始。", "把 V 的 derivative 分成 policy term 和 future-value term。", "最后用 grad pi = pi grad log pi。"] },
      detailed_solution: detail([
        "### Start with value form of J",
        "$$\nJ(\\theta)=\\mathbb E_{s_0\\sim d_0}[V^{\\pi_\\theta}(s_0)]\n$$",
        "### Express V through Q",
        "$$\nV^{\\pi_\\theta}(s)=\\sum_a\\pi_\\theta(a\\mid s)Q^{\\pi_\\theta}(s,a)\n$$",
        "### Differentiate V",
        "$$\n\\nabla_\\theta V^{\\pi_\\theta}(s)\n=\n\\sum_a \\nabla_\\theta\\pi_\\theta(a\\mid s)Q^{\\pi_\\theta}(s,a)\n+\n\\sum_a\\pi_\\theta(a\\mid s)\\nabla_\\theta Q^{\\pi_\\theta}(s,a)\n$$",
        "### Differentiate Q through Bellman recursion",
        "$$\nQ^{\\pi_\\theta}(s,a)=R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)V^{\\pi_\\theta}(s')\n$$",
        "$$\n\\nabla_\\theta Q^{\\pi_\\theta}(s,a)=\\gamma\\sum_{s'}P(s'\\mid s,a)\\nabla_\\theta V^{\\pi_\\theta}(s')\n$$",
        "### Unroll the recursion",
        "The first term can occur at time 0, or after one transition, or after two transitions, and so on. This creates the discounted occupancy measure",
        "$$\nd^\\pi(s)=\\sum_{t=0}^{\\infty}\\gamma^t d_t^\\pi(s)\n$$",
        "Therefore",
        "$$\n\\nabla_\\theta J(\\theta)=\n\\sum_s d^\\pi(s)\\sum_a \\nabla_\\theta\\pi_\\theta(a\\mid s)Q^\\pi(s,a)\n$$",
        "### Convert to log-gradient form",
        "$$\n\\nabla_\\theta\\pi_\\theta(a\\mid s)=\\pi_\\theta(a\\mid s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\n$$",
        "So",
        "$$\n\\nabla_\\theta J(\\theta)=\n\\mathbb E_{s\\sim d^\\pi,\\,a\\sim\\pi_\\theta(\\cdot\\mid s)}\n\\left[Q^\\pi(s,a)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\right]\n$$"
      ], [
        "### 从 value form 的 J 开始",
        "$$\nJ(\\theta)=\\mathbb E_{s_0\\sim d_0}[V^{\\pi_\\theta}(s_0)]\n$$",
        "### 用 Q 表示 V",
        "$$\nV^{\\pi_\\theta}(s)=\\sum_a\\pi_\\theta(a\\mid s)Q^{\\pi_\\theta}(s,a)\n$$",
        "### 对 V 求导",
        "$$\n\\nabla_\\theta V^{\\pi_\\theta}(s)\n=\n\\sum_a \\nabla_\\theta\\pi_\\theta(a\\mid s)Q^{\\pi_\\theta}(s,a)\n+\n\\sum_a\\pi_\\theta(a\\mid s)\\nabla_\\theta Q^{\\pi_\\theta}(s,a)\n$$",
        "### 通过 Bellman recursion 对 Q 求导",
        "$$\nQ^{\\pi_\\theta}(s,a)=R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)V^{\\pi_\\theta}(s')\n$$",
        "$$\n\\nabla_\\theta Q^{\\pi_\\theta}(s,a)=\\gamma\\sum_{s'}P(s'\\mid s,a)\\nabla_\\theta V^{\\pi_\\theta}(s')\n$$",
        "### Unroll recursion",
        "第一个 policy derivative term 可以出现在 time 0，也可以经过一次 transition 后出现，也可以经过两次 transition 后出现，如此继续。这就产生 discounted occupancy measure：",
        "$$\nd^\\pi(s)=\\sum_{t=0}^{\\infty}\\gamma^t d_t^\\pi(s)\n$$",
        "因此",
        "$$\n\\nabla_\\theta J(\\theta)=\n\\sum_s d^\\pi(s)\\sum_a \\nabla_\\theta\\pi_\\theta(a\\mid s)Q^\\pi(s,a)\n$$",
        "### 转成 log-gradient form",
        "$$\n\\nabla_\\theta\\pi_\\theta(a\\mid s)=\\pi_\\theta(a\\mid s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\n$$",
        "所以",
        "$$\n\\nabla_\\theta J(\\theta)=\n\\mathbb E_{s\\sim d^\\pi,\\,a\\sim\\pi_\\theta(\\cdot\\mid s)}\n\\left[Q^\\pi(s,a)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\right]\n$$"
      ])
    },
    {
      id: "hw5-4-3",
      section: "Problem 4.3",
      title: { en: "Prove a state-only baseline does not bias policy gradient", cn: "证明 state-only baseline 不改变 policy gradient" },
      original_excerpt: { en: "Detailed cue: show that subtracting any function f(s) from Q^pi(s,a) inside the policy-gradient expectation adds a zero-mean term because the policy probabilities sum to one.", cn: "题目要点：证明在 policy-gradient expectation 中从 Q^pi(s,a) 减去任意 f(s) 只会加入 zero-mean term，因为 policy probabilities sum to one。" },
      problem_understanding: { en: "The baseline can depend on state but not action. Conditional on a state, the expected score function grad log pi(a|s) under the policy is zero.", cn: "baseline 可以依赖 state，但不能依赖 action。给定 state 后，policy 下 score function grad log pi(a|s) 的 expectation 是 zero。" },
      knowledge_points: { en: "Score-function identity: E_{a~pi}[grad log pi(a|s)] = grad sum_a pi(a|s) = grad 1 = 0.", cn: "score-function identity：E_{a~pi}[grad log pi(a|s)] = grad sum_a pi(a|s) = grad 1 = 0。" },
      tips: { en: ["Separate the baseline term from the Q term.", "Condition on a fixed state s.", "Use f(s) independent of action."], cn: ["把 baseline term 从 Q term 里分离。", "先 condition on fixed state s。", "使用 f(s) independent of action。"] },
      detailed_solution: detail([
        "### Start from the policy-gradient theorem",
        "$$\n\\nabla_\\theta J(\\theta)=\n\\mathbb E_{s\\sim d^\\pi,a\\sim\\pi}\\left[Q^\\pi(s,a)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\right]\n$$",
        "We want to show subtracting f(s) changes nothing.",
        "### Baseline term",
        "It is enough to prove",
        "$$\n\\mathbb E_{s\\sim d^\\pi,a\\sim\\pi}\\left[f(s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\right]=0\n$$",
        "### Condition on one state",
        "For fixed s, f(s) is constant with respect to a.",
        "$$\n\\sum_a \\pi_\\theta(a\\mid s) f(s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\n= f(s)\\sum_a \\pi_\\theta(a\\mid s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\n$$",
        "### Use the score identity",
        "$$\n\\pi_\\theta(a\\mid s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)=\\nabla_\\theta\\pi_\\theta(a\\mid s)\n$$",
        "So",
        "$$\nf(s)\\sum_a \\nabla_\\theta\\pi_\\theta(a\\mid s)\n=f(s)\\nabla_\\theta\\sum_a\\pi_\\theta(a\\mid s)\n=f(s)\\nabla_\\theta 1=0\n$$",
        "### Final result",
        "$$\n\\nabla_\\theta J(\\theta)=\n\\mathbb E_{s\\sim d^\\pi,a\\sim\\pi}\\left[(Q^\\pi(s,a)-f(s))\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\right]\n$$",
        "The baseline can reduce variance while keeping the gradient unbiased."
      ], [
        "### 从 policy-gradient theorem 开始",
        "$$\n\\nabla_\\theta J(\\theta)=\n\\mathbb E_{s\\sim d^\\pi,a\\sim\\pi}\\left[Q^\\pi(s,a)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\right]\n$$",
        "我们要证明减去 f(s) 不改变结果。",
        "### Baseline term",
        "只需证明",
        "$$\n\\mathbb E_{s\\sim d^\\pi,a\\sim\\pi}\\left[f(s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\right]=0\n$$",
        "### Condition on one state",
        "对 fixed s，f(s) 相对 action a 是 constant。",
        "$$\n\\sum_a \\pi_\\theta(a\\mid s) f(s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\n= f(s)\\sum_a \\pi_\\theta(a\\mid s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\n$$",
        "### 使用 score identity",
        "$$\n\\pi_\\theta(a\\mid s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)=\\nabla_\\theta\\pi_\\theta(a\\mid s)\n$$",
        "所以",
        "$$\nf(s)\\sum_a \\nabla_\\theta\\pi_\\theta(a\\mid s)\n=f(s)\\nabla_\\theta\\sum_a\\pi_\\theta(a\\mid s)\n=f(s)\\nabla_\\theta 1=0\n$$",
        "### Final result",
        "$$\n\\nabla_\\theta J(\\theta)=\n\\mathbb E_{s\\sim d^\\pi,a\\sim\\pi}\\left[(Q^\\pi(s,a)-f(s))\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\right]\n$$",
        "baseline 可以 reduce variance，同时保持 gradient unbiased。"
      ])
    }
  ]);
})();

// Structured HW4 data override. Runtime removes older terse HW4 entries and
// re-adds the same homework as detailed, bilingual, step-by-step problem cards.
(function enhanceHw4Problems() {
  const data = window.POPUP_DATA || {};
  const hw = "hw4";
  const join = parts => parts.join("\n\n");
  const detail = (en, cn) => ({ en: join(en), cn: join(cn) });

  Object.values(data).forEach(topic => {
    topic.problems = (topic.problems || []).filter(p => p.hw !== hw);
  });

  const add = (slug, items) => {
    if (!data[slug]) return;
    data[slug].problems = data[slug].problems || [];
    data[slug].problems.push(...items.map(item => ({ ...item, hw })));
  };

  add("contrastive", [
    {
      id: "hw4-1-1-1",
      section: "Problem 1.1.1",
      title: { en: "Compute normalized-feature InfoNCE similarities", cn: "计算 normalized-feature InfoNCE similarities" },
      original_excerpt: { en: "Detailed cue: four 2D feature vectors all have unit norm; use x(1) as anchor, augmented x(1) as positive, and x(2), augmented x(2) as negatives; compute three cosine similarities.", cn: "题目要点：四个 2D feature vectors 都已经 unit norm；以 \(x^{(1)}\) 为 anchor、augmented \(x^{(1)}\) 为 positive，\(x^{(2)}\)、augmented \(x^{(2)}\) 为 negatives；计算三个 cosine similarities。" },
      problem_understanding: { en: "Because every feature is normalized, cosine similarity becomes a plain dot product. The task is just to dot the anchor vector with the positive and two negative vectors.", cn: "因为每个 feature 都已经 normalized，cosine similarity 退化成 plain dot product。这题就是把 anchor vector 分别和 positive、两个 negative vectors 做 dot product。" },
      knowledge_points: { en: "Cosine similarity is u^T v/(||u|| ||v||). When both norms are 1, it equals u^T v.", cn: "Cosine similarity 是 \(u^\\top v/(\\|u\\|\\|v\\|)\)。当两个 norms 都是 1 时，它等于 \(u^\\top v\)。" },
      tips: { en: ["Use normalization before computing cosine.", "Dot the anchor with each candidate separately.", "Keep the signs of the negative sample coordinates."], cn: ["先利用 normalization。", "anchor 分别和每个 candidate 做 dot product。", "注意 negative sample coordinates 的符号。"] },
      detailed_solution: detail([
        "### Anchor and candidates",
        "$$\nf(x^{(1)})=\\begin{pmatrix}1\\\\0\\end{pmatrix}\n$$",
        "$$\nf(\\tilde x^{(1)})=\\begin{pmatrix}\\sqrt3/2\\\\1/2\\end{pmatrix},\\quad\nf(x^{(2)})=\\begin{pmatrix}0\\\\1\\end{pmatrix},\\quad\nf(\\tilde x^{(2)})=\\begin{pmatrix}-1/2\\\\\\sqrt3/2\\end{pmatrix}\n$$",
        "### Normalized cosine",
        "All vectors have norm 1, so",
        "$$\ns(u,v)=u^\\top v\n$$",
        "### Positive similarity",
        "$$\ns(f(x^{(1)}),f(\\tilde x^{(1)}))=(1)(\\sqrt3/2)+(0)(1/2)=\\sqrt3/2\n$$",
        "### First negative similarity",
        "$$\ns(f(x^{(1)}),f(x^{(2)}))=(1)(0)+(0)(1)=0\n$$",
        "### Second negative similarity",
        "$$\ns(f(x^{(1)}),f(\\tilde x^{(2)}))=(1)(-1/2)+(0)(\\sqrt3/2)=-1/2\n$$",
        "### Final values",
        "$$\n\\sqrt3/2,\\quad 0,\\quad -1/2\n$$"
      ], [
        "### Anchor and candidates",
        "$$\nf(x^{(1)})=\\begin{pmatrix}1\\\\0\\end{pmatrix}\n$$",
        "$$\nf(\\tilde x^{(1)})=\\begin{pmatrix}\\sqrt3/2\\\\1/2\\end{pmatrix},\\quad\nf(x^{(2)})=\\begin{pmatrix}0\\\\1\\end{pmatrix},\\quad\nf(\\tilde x^{(2)})=\\begin{pmatrix}-1/2\\\\\\sqrt3/2\\end{pmatrix}\n$$",
        "### Normalized cosine",
        "所有 vectors 的 norm 都是 1，所以",
        "$$\ns(u,v)=u^\\top v\n$$",
        "### Positive similarity",
        "$$\ns(f(x^{(1)}),f(\\tilde x^{(1)}))=(1)(\\sqrt3/2)+(0)(1/2)=\\sqrt3/2\n$$",
        "### First negative similarity",
        "$$\ns(f(x^{(1)}),f(x^{(2)}))=(1)(0)+(0)(1)=0\n$$",
        "### Second negative similarity",
        "$$\ns(f(x^{(1)}),f(\\tilde x^{(2)}))=(1)(-1/2)+(0)(\\sqrt3/2)=-1/2\n$$",
        "### Final values",
        "$$\n\\sqrt3/2,\\quad 0,\\quad -1/2\n$$"
      ])
    },
    {
      id: "hw4-1-1-2",
      section: "Problem 1.1.2",
      title: { en: "Compare InfoNCE loss at lower temperature", cn: "比较 lower temperature 下的 InfoNCE loss" },
      original_excerpt: { en: "Detailed cue: use the three similarities from part 1.1.1 in the single-example InfoNCE formula; compare tau=1 with tau=1/2 without needing exact decimal values.", cn: "题目要点：把 1.1.1 的三个 similarities 代入 single-example InfoNCE formula；比较 \(\tau=1\) 与 \(\tau=1/2\)，不需要精确 decimal values。" },
      problem_understanding: { en: "The positive similarity is the largest score. Reducing temperature sharpens the softmax, so it increases the probability assigned to the already-best positive pair.", cn: "positive similarity 是最大的 score。降低 temperature 会 sharpen softmax，所以会提高 already-best positive pair 的 probability。" },
      knowledge_points: { en: "InfoNCE is negative log probability of the positive pair under a softmax over positive plus negatives. Smaller temperature magnifies score gaps.", cn: "InfoNCE 是 positive pair 在 positive plus negatives 的 softmax 中的 negative log probability。smaller temperature 会放大 score gaps。" },
      tips: { en: ["Factor out the positive exponential.", "Look at score differences divided by tau.", "If the positive score is highest, lowering tau lowers the loss."], cn: ["把 positive exponential factor out。", "看 score differences divided by tau。", "如果 positive score 最高，lowering tau 会降低 loss。"] },
      detailed_solution: detail([
        "### Scores from part 1",
        "$$\ns_+=\\sqrt3/2,\\qquad s_1=0,\\qquad s_2=-1/2\n$$",
        "### InfoNCE loss",
        "$$\nL(\\tau)=-\\log\\frac{\\exp(s_+/\\tau)}{\\exp(s_+/\\tau)+\\exp(s_1/\\tau)+\\exp(s_2/\\tau)}\n$$",
        "### Factor out the positive term",
        "$$\nL(\\tau)=\\log\\left(1+\\exp\\left(\\frac{s_1-s_+}{\\tau}\\right)+\\exp\\left(\\frac{s_2-s_+}{\\tau}\\right)\\right)\n$$",
        "### Substitute differences",
        "$$\ns_1-s_+=-\\sqrt3/2\n$$",
        "$$\ns_2-s_+=-1/2-\\sqrt3/2\n$$",
        "Both differences are negative.",
        "### Effect of reducing tau",
        "- When \(\tau\) decreases, a negative number divided by \(\tau\) becomes more negative.\n- Therefore both exponential terms become smaller.\n- The quantity inside the log decreases.",
        "### Conclusion",
        "The InfoNCE loss decreases when moving from \(\tau=1\) to \(\tau=1/2\), because the positive pair already has the highest similarity."
      ], [
        "### 来自 part 1 的 scores",
        "$$\ns_+=\\sqrt3/2,\\qquad s_1=0,\\qquad s_2=-1/2\n$$",
        "### InfoNCE loss",
        "$$\nL(\\tau)=-\\log\\frac{\\exp(s_+/\\tau)}{\\exp(s_+/\\tau)+\\exp(s_1/\\tau)+\\exp(s_2/\\tau)}\n$$",
        "### Factor out positive term",
        "$$\nL(\\tau)=\\log\\left(1+\\exp\\left(\\frac{s_1-s_+}{\\tau}\\right)+\\exp\\left(\\frac{s_2-s_+}{\\tau}\\right)\\right)\n$$",
        "### 代入 differences",
        "$$\ns_1-s_+=-\\sqrt3/2\n$$",
        "$$\ns_2-s_+=-1/2-\\sqrt3/2\n$$",
        "两个 differences 都是 negative。",
        "### 降低 tau 的影响",
        "- 当 \(\tau\) decrease 时，negative number divided by \(\tau\) 会变得更 negative。\n- 因此两个 exponential terms 都变小。\n- log 里面的 quantity decrease。",
        "### 结论",
        "从 \(\tau=1\) 到 \(\tau=1/2\)，InfoNCE loss decreases，因为 positive pair 已经有最高 similarity。"
      ])
    },
    {
      id: "hw4-1-2-1",
      section: "Problem 1.2.1",
      title: { en: "Show cross-entropy classification is a dual-encoder contrastive loss", cn: "证明 cross-entropy classification 是 dual-encoder contrastive loss" },
      original_excerpt: { en: "Detailed cue: define the two domains, both encoders, the anchor image, positive label target, and candidate label set so that the dual-encoder loss becomes standard supervised cross-entropy.", cn: "题目要点：定义两个 domains、两个 encoders、anchor image、positive label target、candidate label set，使 dual-encoder loss 变成 standard supervised cross-entropy。" },
      problem_understanding: { en: "A linear classifier can be viewed as matching an image embedding to one of C learned class embeddings.", cn: "linear classifier 可以看成把 image embedding 与 C 个 learned class embeddings 之一做 matching。" },
      knowledge_points: { en: "Cross-entropy uses logits w_c^T h(x). A dual encoder uses dot products f1(x)^T f2(z_c). Match these by choosing f1=h and f2(c)=w_c.", cn: "Cross-entropy 使用 logits \(w_c^\\top h(x)\)。dual encoder 使用 dot products \(f_1(x)^\\top f_2(z_c)\)。令 \(f_1=h\)、\(f_2(c)=w_c\) 即可匹配。" },
      tips: { en: ["Let label space be the second domain.", "Represent each class by a column of W.", "Use symmetry of dot products to match the logits."], cn: ["让 label space 成为第二个 domain。", "每个 class 用 W 的一列表示。", "用 dot product 的 symmetry 匹配 logits。"] },
      detailed_solution: detail([
        "### Standard classifier",
        "The classifier has feature extractor",
        "$$\nh(x)\\in\\mathbb R^d\n$$",
        "and class weights",
        "$$\nW=[w_1,\\ldots,w_C]\\in\\mathbb R^{d\\times C}\n$$",
        "For a sample \((x^{(k)},y^{(k)})\), cross-entropy is",
        "$$\nL_{CE}=-\\log\\frac{\\exp(w_{y^{(k)}}^\\top h(x^{(k)}))}{\\sum_{c=1}^C\\exp(w_c^\\top h(x^{(k)}))}\n$$",
        "### Dual-encoder choices",
        "- Domain 1: \(X_1=X\), the image space.\n- Domain 2: \(X_2=\\{1,2,\\ldots,C\\}\), the label space.\n- Anchor: \(x=x^{(k)}\).\n- Positive target: \(z=y^{(k)}\).\n- Candidate set: \(z_j=j\) for \(j=1,\\ldots,C\).",
        "### Encoders",
        "$$\nf_1(x)=h(x)\n$$",
        "$$\nf_2(c)=w_c\n$$",
        "### Substitute into dual loss",
        "$$\nL_{dual}(x^{(k)},y^{(k)})=-\\log\\frac{\\exp(f_1(x^{(k)})^\\top f_2(y^{(k)}))}{\\sum_{c=1}^C\\exp(f_1(x^{(k)})^\\top f_2(c))}\n$$",
        "Using the encoder definitions:",
        "$$\nL_{dual}=-\\log\\frac{\\exp(h(x^{(k)})^\\top w_{y^{(k)}})}{\\sum_{c=1}^C\\exp(h(x^{(k)})^\\top w_c)}\n$$",
        "Since \(h^\\top w_c=w_c^\\top h\), this equals \(L_{CE}\).",
        "### Conclusion",
        "Supervised cross-entropy with a linear classifier is a special case of dual-encoder contrastive learning."
      ], [
        "### Standard classifier",
        "classifier 有 feature extractor",
        "$$\nh(x)\\in\\mathbb R^d\n$$",
        "以及 class weights",
        "$$\nW=[w_1,\\ldots,w_C]\\in\\mathbb R^{d\\times C}\n$$",
        "对 sample \((x^{(k)},y^{(k)})\)，cross-entropy 是",
        "$$\nL_{CE}=-\\log\\frac{\\exp(w_{y^{(k)}}^\\top h(x^{(k)}))}{\\sum_{c=1}^C\\exp(w_c^\\top h(x^{(k)}))}\n$$",
        "### Dual-encoder choices",
        "- Domain 1: \(X_1=X\)，image space。\n- Domain 2: \(X_2=\\{1,2,\\ldots,C\\}\)，label space。\n- Anchor: \(x=x^{(k)}\)。\n- Positive target: \(z=y^{(k)}\)。\n- Candidate set: \(z_j=j\)，\(j=1,\\ldots,C\)。",
        "### Encoders",
        "$$\nf_1(x)=h(x)\n$$",
        "$$\nf_2(c)=w_c\n$$",
        "### 代入 dual loss",
        "$$\nL_{dual}(x^{(k)},y^{(k)})=-\\log\\frac{\\exp(f_1(x^{(k)})^\\top f_2(y^{(k)}))}{\\sum_{c=1}^C\\exp(f_1(x^{(k)})^\\top f_2(c))}\n$$",
        "使用 encoder definitions：",
        "$$\nL_{dual}=-\\log\\frac{\\exp(h(x^{(k)})^\\top w_{y^{(k)}})}{\\sum_{c=1}^C\\exp(h(x^{(k)})^\\top w_c)}\n$$",
        "因为 \(h^\\top w_c=w_c^\\top h\)，这正好等于 \(L_{CE}\)。",
        "### 结论",
        "带 linear classifier 的 supervised cross-entropy 是 dual-encoder contrastive learning 的 special case。"
      ])
    },
    {
      id: "hw4-1-2-2",
      section: "Problem 1.2.2",
      title: { en: "Explain CLIP zero-shot prediction through the second encoder", cn: "通过 second encoder 解释 CLIP zero-shot prediction" },
      original_excerpt: { en: "Detailed cue: compare a standard classifier whose class representations are fixed columns of W with CLIP, whose second encoder maps arbitrary text prompts into the shared embedding space.", cn: "题目要点：比较 standard classifier 中固定为 W columns 的 class representations，与 CLIP 中把 arbitrary text prompts 映射到 shared embedding space 的 second encoder。" },
      problem_understanding: { en: "The key distinction is whether the model can create an embedding for a new class at test time.", cn: "核心区别是 model 能不能在 test time 为 new class 创建 embedding。" },
      knowledge_points: { en: "A closed-set classifier has one learned vector per training class. CLIP uses a text encoder, so new labels can be embedded from natural language without changing model parameters.", cn: "closed-set classifier 对每个 training class 有一个 learned vector。CLIP 使用 text encoder，所以 new labels 可以通过 natural language 被 embed，不需要改变 model parameters。" },
      tips: { en: ["Use the f2(c)=w_c view from part 1.", "Ask what happens for class C+1.", "Contrast lookup-table class vectors with a text encoder."], cn: ["使用 part 1 的 \(f_2(c)=w_c\) 视角。", "问出现 class C+1 时会怎样。", "对比 lookup-table class vectors 与 text encoder。"] },
      detailed_solution: detail([
        "### Standard classifier as dual encoder",
        "From part 1, standard classification uses",
        "$$\nf_2(c)=w_c\n$$",
        "where \(w_c\) is the c-th column of W.",
        "### Closed class set",
        "- W has exactly C columns.\n- Therefore the classifier has embeddings only for classes \(1,\\ldots,C\).\n- A new class \(C+1\) has no learned column \(w_{C+1}\).",
        "### Why retraining is needed",
        "To score a new class, the classifier would need",
        "$$\nw_{C+1}^\\top h(x)\n$$",
        "but \(w_{C+1}\) does not exist unless the model is modified and trained for that class.",
        "### CLIP structure",
        "In CLIP, the second encoder is a text encoder:",
        "$$\nf_2(\\text{text prompt})\\in\\mathbb R^d\n$$",
        "For example, it can embed prompts such as a photo of a zebra or a photo of a microscope.",
        "### Zero-shot prediction",
        "- At test time, write one prompt per candidate class.\n- Encode each prompt with the text encoder.\n- Compare the image embedding against these text embeddings.\n- No new class column has to be learned.",
        "### Conclusion",
        "Standard CE classifiers use a fixed learned class table. CLIP uses a reusable language encoder, so it can create embeddings for unseen class descriptions on demand."
      ], [
        "### Standard classifier as dual encoder",
        "从 part 1，standard classification 使用",
        "$$\nf_2(c)=w_c\n$$",
        "其中 \(w_c\) 是 W 的第 c 列。",
        "### Closed class set",
        "- W 正好有 C 列。\n- 因此 classifier 只拥有 classes \(1,\\ldots,C\) 的 embeddings。\n- new class \(C+1\) 没有 learned column \(w_{C+1}\)。",
        "### 为什么需要 retraining",
        "为了给 new class 打分，classifier 需要",
        "$$\nw_{C+1}^\\top h(x)\n$$",
        "但 \(w_{C+1}\) 不存在，除非修改 model 并为该 class 训练。",
        "### CLIP structure",
        "CLIP 的 second encoder 是 text encoder：",
        "$$\nf_2(\\text{text prompt})\\in\\mathbb R^d\n$$",
        "例如它可以 embed prompts，比如 a photo of a zebra 或 a photo of a microscope。",
        "### Zero-shot prediction",
        "- test time 为每个 candidate class 写一个 prompt。\n- 用 text encoder encode 每个 prompt。\n- 比较 image embedding 和这些 text embeddings。\n- 不需要 learn new class column。",
        "### 结论",
        "standard CE classifiers 使用 fixed learned class table。CLIP 使用 reusable language encoder，所以能按需为 unseen class descriptions 创建 embeddings。"
      ])
    }
  ]);

  add("positional-encoding", [
    {
      id: "hw4-2-1-1",
      section: "Problem 2.1.1",
      title: { en: "Write the sinusoidal positional encoding equations", cn: "写出 sinusoidal positional encoding equations" },
      original_excerpt: { en: "Detailed cue: given token position, frequency index, and model dimension, write the even and odd coordinates of the Transformer sinusoidal positional encoding.", cn: "题目要点：给定 token position、frequency index、model dimension，写出 Transformer sinusoidal positional encoding 的 even 与 odd coordinates。" },
      problem_understanding: { en: "The question asks for the standard pair of sine and cosine formulas, one pair per frequency.", cn: "这题要写 standard sine/cosine formulas，每个 frequency 对应一对 coordinates。" },
      knowledge_points: { en: "Sinusoidal PE uses PE(pos,2i)=sin(pos/10000^{2i/d_model}) and PE(pos,2i+1)=cos(pos/10000^{2i/d_model}).", cn: "Sinusoidal PE 使用 \(PE(pos,2i)=\\sin(pos/10000^{2i/d_{model}})\) 和 \(PE(pos,2i+1)=\\cos(pos/10000^{2i/d_{model}})\)。" },
      tips: { en: ["Even coordinate uses sine.", "Odd coordinate uses cosine.", "The denominator controls frequency."], cn: ["even coordinate 用 sine。", "odd coordinate 用 cosine。", "denominator 控制 frequency。"] },
      detailed_solution: detail([
        "### Frequency",
        "For each frequency index \(i\), define",
        "$$\n\\omega_i=\\frac{1}{10000^{2i/d_{model}}}\n$$",
        "### Even coordinate",
        "$$\nPE(pos,2i)=\\sin(pos\\cdot\\omega_i)\n$$",
        "Equivalently,",
        "$$\nPE(pos,2i)=\\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)\n$$",
        "### Odd coordinate",
        "$$\nPE(pos,2i+1)=\\cos(pos\\cdot\\omega_i)\n$$",
        "Equivalently,",
        "$$\nPE(pos,2i+1)=\\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)\n$$",
        "### Meaning",
        "Each pair \((2i,2i+1)\) stores sine and cosine at the same frequency, which is what enables relative-position algebra later."
      ], [
        "### Frequency",
        "对每个 frequency index \(i\)，定义",
        "$$\n\\omega_i=\\frac{1}{10000^{2i/d_{model}}}\n$$",
        "### Even coordinate",
        "$$\nPE(pos,2i)=\\sin(pos\\cdot\\omega_i)\n$$",
        "等价地，",
        "$$\nPE(pos,2i)=\\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)\n$$",
        "### Odd coordinate",
        "$$\nPE(pos,2i+1)=\\cos(pos\\cdot\\omega_i)\n$$",
        "等价地，",
        "$$\nPE(pos,2i+1)=\\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)\n$$",
        "### Meaning",
        "每一对 \((2i,2i+1)\) 在同一个 frequency 上存 sine 和 cosine，这让后面的 relative-position algebra 成立。"
      ])
    },
    {
      id: "hw4-2-1-2",
      section: "Problem 2.1.2",
      title: { en: "Prove shifted positional encoding is linear in the original encoding", cn: "证明 shifted positional encoding 是 original encoding 的 linear function" },
      original_excerpt: { en: "Detailed cue: define omega_i as the sinusoidal frequency and prove that PE(pos+k) can be written using only PE(pos,2i) and PE(pos,2i+1) with coefficients depending on k.", cn: "题目要点：定义 \(\omega_i\) 为 sinusoidal frequency，证明 \(PE(pos+k)\) 可以只用 \(PE(pos,2i)\)、\(PE(pos,2i+1)\) 表示，且 coefficients 只依赖 k。" },
      problem_understanding: { en: "Each sine/cosine pair rotates when the position is shifted. The rotation matrix depends on the relative shift k, not on the absolute position.", cn: "每个 sine/cosine pair 在 position shift 后会发生 rotation。rotation matrix 依赖 relative shift k，而不是 absolute position。" },
      knowledge_points: { en: "Use sin(a+b)=sin a cos b + cos a sin b and cos(a+b)=cos a cos b - sin a sin b.", cn: "使用 \(\sin(a+b)=\sin a\cos b+\cos a\sin b\) 和 \(\cos(a+b)=\cos a\cos b-\sin a\sin b\)。" },
      tips: { en: ["Set a=pos omega_i and b=k omega_i.", "Write the sine shifted coordinate first.", "Write the cosine shifted coordinate second."], cn: ["设 \(a=pos\\,\omega_i\)、\(b=k\\omega_i\)。", "先写 shifted sine coordinate。", "再写 shifted cosine coordinate。"] },
      detailed_solution: detail([
        "### Define frequency",
        "$$\n\\omega_i=\\frac{1}{10000^{2i/d_{model}}}\n$$",
        "### Even coordinate after shift",
        "$$\nPE(pos+k,2i)=\\sin((pos+k)\\omega_i)\n$$",
        "Use the sine addition identity:",
        "$$\n\\sin((pos+k)\\omega_i)=\\sin(pos\\omega_i)\\cos(k\\omega_i)+\\cos(pos\\omega_i)\\sin(k\\omega_i)\n$$",
        "Replace sine and cosine by PE coordinates:",
        "$$\nPE(pos+k,2i)=PE(pos,2i)\\cos(k\\omega_i)+PE(pos,2i+1)\\sin(k\\omega_i)\n$$",
        "### Odd coordinate after shift",
        "$$\nPE(pos+k,2i+1)=\\cos((pos+k)\\omega_i)\n$$",
        "$$\n\\cos((pos+k)\\omega_i)=\\cos(pos\\omega_i)\\cos(k\\omega_i)-\\sin(pos\\omega_i)\\sin(k\\omega_i)\n$$",
        "Therefore",
        "$$\nPE(pos+k,2i+1)=-PE(pos,2i)\\sin(k\\omega_i)+PE(pos,2i+1)\\cos(k\\omega_i)\n$$",
        "### Matrix form",
        "$$\n\\begin{pmatrix}PE(pos+k,2i)\\\\PE(pos+k,2i+1)\\end{pmatrix}\n=\n\\begin{pmatrix}\\cos(k\\omega_i)&\\sin(k\\omega_i)\\\\-\\sin(k\\omega_i)&\\cos(k\\omega_i)\\end{pmatrix}\n\\begin{pmatrix}PE(pos,2i)\\\\PE(pos,2i+1)\\end{pmatrix}\n$$",
        "### Conclusion",
        "The shifted encoding is a linear function of the original encoding, with coefficients depending only on k and the frequency index."
      ], [
        "### 定义 frequency",
        "$$\n\\omega_i=\\frac{1}{10000^{2i/d_{model}}}\n$$",
        "### Shift 后的 even coordinate",
        "$$\nPE(pos+k,2i)=\\sin((pos+k)\\omega_i)\n$$",
        "使用 sine addition identity：",
        "$$\n\\sin((pos+k)\\omega_i)=\\sin(pos\\omega_i)\\cos(k\\omega_i)+\\cos(pos\\omega_i)\\sin(k\\omega_i)\n$$",
        "用 PE coordinates 替换 sine/cosine：",
        "$$\nPE(pos+k,2i)=PE(pos,2i)\\cos(k\\omega_i)+PE(pos,2i+1)\\sin(k\\omega_i)\n$$",
        "### Shift 后的 odd coordinate",
        "$$\nPE(pos+k,2i+1)=\\cos((pos+k)\\omega_i)\n$$",
        "$$\n\\cos((pos+k)\\omega_i)=\\cos(pos\\omega_i)\\cos(k\\omega_i)-\\sin(pos\\omega_i)\\sin(k\\omega_i)\n$$",
        "因此",
        "$$\nPE(pos+k,2i+1)=-PE(pos,2i)\\sin(k\\omega_i)+PE(pos,2i+1)\\cos(k\\omega_i)\n$$",
        "### Matrix form",
        "$$\n\\begin{pmatrix}PE(pos+k,2i)\\\\PE(pos+k,2i+1)\\end{pmatrix}\n=\n\\begin{pmatrix}\\cos(k\\omega_i)&\\sin(k\\omega_i)\\\\-\\sin(k\\omega_i)&\\cos(k\\omega_i)\\end{pmatrix}\n\\begin{pmatrix}PE(pos,2i)\\\\PE(pos,2i+1)\\end{pmatrix}\n$$",
        "### 结论",
        "shifted encoding 是 original encoding 的 linear function，coefficients 只依赖 k 和 frequency index。"
      ])
    },
    {
      id: "hw4-2-1-3",
      section: "Problem 2.1.3",
      title: { en: "Show sinusoidal PE dot products depend only on relative position", cn: "证明 sinusoidal PE dot product 只依赖 relative position" },
      original_excerpt: { en: "Detailed cue: let pos2=pos1+k and show the dot product between PE(pos1) and PE(pos2) depends only on k, not the absolute value of pos1.", cn: "题目要点：令 \(pos_2=pos_1+k\)，证明 \(PE(pos_1)\) 与 \(PE(pos_2)\) 的 dot product 只依赖 k，而不依赖 \(pos_1\) 的绝对值。" },
      problem_understanding: { en: "For each sine/cosine frequency pair, the dot product is a cosine of the difference between positions. Summing over frequencies keeps only the relative offset.", cn: "对每个 sine/cosine frequency pair，dot product 是 positions difference 的 cosine。对 frequencies 求和后只保留 relative offset。" },
      knowledge_points: { en: "Use sin a sin b + cos a cos b = cos(a-b).", cn: "使用 \(\sin a\sin b+\cos a\cos b=\cos(a-b)\)。" },
      tips: { en: ["Work one frequency pair at a time.", "Set alpha=pos1 omega_i and beta=k omega_i.", "Sum the pair contributions over i."], cn: ["一次只处理一个 frequency pair。", "设 \(\alpha=pos_1\\omega_i\)、\(\beta=k\\omega_i\)。", "对 i sum pair contributions。"] },
      detailed_solution: detail([
        "### One frequency pair",
        "Let",
        "$$\n\\alpha=pos_1\\omega_i,\\qquad \\beta=k\\omega_i\n$$",
        "Since \(pos_2=pos_1+k\),",
        "$$\npos_2\\omega_i=\\alpha+\\beta\n$$",
        "### Pair contribution to the dot product",
        "$$\nPE(pos_1,2i)PE(pos_2,2i)+PE(pos_1,2i+1)PE(pos_2,2i+1)\n$$",
        "Substitute sine and cosine:",
        "$$\n\\sin(\\alpha)\\sin(\\alpha+\\beta)+\\cos(\\alpha)\\cos(\\alpha+\\beta)\n$$",
        "### Use cosine-difference identity",
        "$$\n\\sin(\\alpha)\\sin(\\alpha+\\beta)+\\cos(\\alpha)\\cos(\\alpha+\\beta)=\\cos(\\beta)\n$$",
        "Thus the pair contributes",
        "$$\n\\cos(k\\omega_i)\n$$",
        "### Sum over all frequency pairs",
        "$$\nPE(pos_1)^\\top PE(pos_2)=\\sum_i \\cos(k\\omega_i)\n$$",
        "### Conclusion",
        "The result depends on \(k\) and frequencies \(\\omega_i\), but not on absolute position \(pos_1\)."
      ], [
        "### One frequency pair",
        "令",
        "$$\n\\alpha=pos_1\\omega_i,\\qquad \\beta=k\\omega_i\n$$",
        "因为 \(pos_2=pos_1+k\)，",
        "$$\npos_2\\omega_i=\\alpha+\\beta\n$$",
        "### 该 pair 对 dot product 的 contribution",
        "$$\nPE(pos_1,2i)PE(pos_2,2i)+PE(pos_1,2i+1)PE(pos_2,2i+1)\n$$",
        "代入 sine 和 cosine：",
        "$$\n\\sin(\\alpha)\\sin(\\alpha+\\beta)+\\cos(\\alpha)\\cos(\\alpha+\\beta)\n$$",
        "### 使用 cosine-difference identity",
        "$$\n\\sin(\\alpha)\\sin(\\alpha+\\beta)+\\cos(\\alpha)\\cos(\\alpha+\\beta)=\\cos(\\beta)\n$$",
        "因此该 pair 贡献",
        "$$\n\\cos(k\\omega_i)\n$$",
        "### 对所有 frequency pairs 求和",
        "$$\nPE(pos_1)^\\top PE(pos_2)=\\sum_i \\cos(k\\omega_i)\n$$",
        "### 结论",
        "结果依赖 \(k\) 和 frequencies \(\\omega_i\)，但不依赖 absolute position \(pos_1\)。"
      ])
    }
  ]);

  add("attention", [
    {
      id: "hw4-2-2",
      section: "Problem 2.2",
      title: { en: "Compute attention weights and outputs for two queries", cn: "计算两个 queries 的 attention weights 与 outputs" },
      original_excerpt: { en: "Detailed cue: keys are the three standard basis vectors in R3; values are three given 3D vectors; compute attention scores, softmax weights, and final weighted outputs for queries (6,1,0) and (1,1,6), then explain when output approximates one value vector.", cn: "题目要点：keys 是 \(R^3\) 中三个 standard basis vectors；values 是三个给定 3D vectors；对 queries \((6,1,0)\) 和 \((1,1,6)\) 计算 attention scores、softmax weights、final weighted outputs，并解释何时 output 近似某个 value vector。" },
      problem_understanding: { en: "Because the keys are coordinate basis vectors, each score is simply one coordinate of the query. Softmax then puts most mass on the largest coordinate.", cn: "因为 keys 是 coordinate basis vectors，每个 score 就是 query 的一个 coordinate。softmax 会把大部分 mass 放到最大 coordinate 上。" },
      knowledge_points: { en: "Attention output is a weighted average of values. If one key has a much larger dot product with the query than all other keys, its softmax weight is near 1.", cn: "Attention output 是 values 的 weighted average。如果某个 key 与 query 的 dot product 远大于其他 keys，它的 softmax weight 接近 1。" },
      tips: { en: ["Use k_i^T q as a coordinate selector.", "Write weights in exponential form before approximating.", "Only approximate after the exact expression is written."], cn: ["把 \(k_i^Tq\) 当作 coordinate selector。", "先用 exponential form 写 weights，再 approximate。", "先写 exact expression，再做 approximation。"] },
      detailed_solution: detail([
        "### Query 1 scores",
        "For \(q^{(1)}=(6,1,0)^\\top\) and basis keys,",
        "$$\nk_1^\\top q^{(1)}=6,\\qquad k_2^\\top q^{(1)}=1,\\qquad k_3^\\top q^{(1)}=0\n$$",
        "### Query 1 weights",
        "$$\n\\alpha_1^{(1)}=\\frac{e^6}{e^6+e+1},\\quad\n\\alpha_2^{(1)}=\\frac{e}{e^6+e+1},\\quad\n\\alpha_3^{(1)}=\\frac{1}{e^6+e+1}\n$$",
        "### Query 1 output",
        "$$\ny^{(1)}=\\alpha_1^{(1)}v_1+\\alpha_2^{(1)}v_2+\\alpha_3^{(1)}v_3\n$$",
        "$$\ny^{(1)}=\\frac{1}{e^6+e+1}\\begin{pmatrix}2e^6+1\\\\3e+1\\\\e^6+e+2\\end{pmatrix}\n$$",
        "Since \(e^6\) dominates,",
        "$$\ny^{(1)}\\approx v_1=\\begin{pmatrix}2\\\\0\\\\1\\end{pmatrix}\n$$",
        "### Query 2 scores",
        "For \(q^{(2)}=(1,1,6)^\\top\),",
        "$$\nk_1^\\top q^{(2)}=1,\\qquad k_2^\\top q^{(2)}=1,\\qquad k_3^\\top q^{(2)}=6\n$$",
        "### Query 2 weights",
        "$$\n\\alpha_1^{(2)}=\\frac{e}{2e+e^6},\\quad\n\\alpha_2^{(2)}=\\frac{e}{2e+e^6},\\quad\n\\alpha_3^{(2)}=\\frac{e^6}{2e+e^6}\n$$",
        "### Query 2 output",
        "$$\ny^{(2)}=\\frac{1}{2e+e^6}\\begin{pmatrix}2e+e^6\\\\3e+e^6\\\\2e+2e^6\\end{pmatrix}\n$$",
        "Since \(e^6\) dominates,",
        "$$\ny^{(2)}\\approx v_3=\\begin{pmatrix}1\\\\1\\\\2\\end{pmatrix}\n$$",
        "### Comparison",
        "- Query 1 aligns most with \(k_1\), so it retrieves mostly \(v_1\).\n- Query 2 aligns most with \(k_3\), so it retrieves mostly \(v_3\).",
        "### One-sentence condition",
        "The output is approximately \(v_j\) when \(q^\\top k_j\) is much larger than \(q^\\top k_i\) for all \(i\\ne j\), making \(\alpha_j\\approx1\) and all other attention weights near 0."
      ], [
        "### Query 1 scores",
        "对 \(q^{(1)}=(6,1,0)^\\top\) 和 basis keys，",
        "$$\nk_1^\\top q^{(1)}=6,\\qquad k_2^\\top q^{(1)}=1,\\qquad k_3^\\top q^{(1)}=0\n$$",
        "### Query 1 weights",
        "$$\n\\alpha_1^{(1)}=\\frac{e^6}{e^6+e+1},\\quad\n\\alpha_2^{(1)}=\\frac{e}{e^6+e+1},\\quad\n\\alpha_3^{(1)}=\\frac{1}{e^6+e+1}\n$$",
        "### Query 1 output",
        "$$\ny^{(1)}=\\alpha_1^{(1)}v_1+\\alpha_2^{(1)}v_2+\\alpha_3^{(1)}v_3\n$$",
        "$$\ny^{(1)}=\\frac{1}{e^6+e+1}\\begin{pmatrix}2e^6+1\\\\3e+1\\\\e^6+e+2\\end{pmatrix}\n$$",
        "因为 \(e^6\) dominates，",
        "$$\ny^{(1)}\\approx v_1=\\begin{pmatrix}2\\\\0\\\\1\\end{pmatrix}\n$$",
        "### Query 2 scores",
        "对 \(q^{(2)}=(1,1,6)^\\top\)，",
        "$$\nk_1^\\top q^{(2)}=1,\\qquad k_2^\\top q^{(2)}=1,\\qquad k_3^\\top q^{(2)}=6\n$$",
        "### Query 2 weights",
        "$$\n\\alpha_1^{(2)}=\\frac{e}{2e+e^6},\\quad\n\\alpha_2^{(2)}=\\frac{e}{2e+e^6},\\quad\n\\alpha_3^{(2)}=\\frac{e^6}{2e+e^6}\n$$",
        "### Query 2 output",
        "$$\ny^{(2)}=\\frac{1}{2e+e^6}\\begin{pmatrix}2e+e^6\\\\3e+e^6\\\\2e+2e^6\\end{pmatrix}\n$$",
        "因为 \(e^6\) dominates，",
        "$$\ny^{(2)}\\approx v_3=\\begin{pmatrix}1\\\\1\\\\2\\end{pmatrix}\n$$",
        "### Comparison",
        "- Query 1 最匹配 \(k_1\)，所以主要 retrieve \(v_1\)。\n- Query 2 最匹配 \(k_3\)，所以主要 retrieve \(v_3\)。",
        "### One-sentence condition",
        "当 \(q^\\top k_j\) 远大于所有 \(i\\ne j\) 的 \(q^\\top k_i\) 时，\(\alpha_j\\approx1\)，其他 attention weights 接近 0，output 就近似 \(v_j\)。"
      ])
    }
  ]);

  add("transformer", [
    {
      id: "hw4-2-3-1",
      section: "Problem 2.3.1",
      title: { en: "Use one attention head to average two selected values", cn: "用 single attention head 平均两个 selected values" },
      original_excerpt: { en: "Detailed cue: keys are mutually orthogonal unit vectors; choose a query so one attention head places about half its mass on key a and half on key b, producing approximately (v_a+v_b)/2.", cn: "题目要点：keys 是 mutually orthogonal unit vectors；选择 query，使 single attention head 约一半 mass 放在 key a、一半放在 key b，从而输出近似 \((v_a+v_b)/2\)。" },
      problem_understanding: { en: "Make the query align equally with k_a and k_b and not align with the other orthogonal keys. A large scale lambda makes softmax ignore the other keys.", cn: "让 query 与 \(k_a\)、\(k_b\) 等量 align，并且与其他 orthogonal keys 不 align。大的 scale \(\lambda\) 让 softmax 忽略其他 keys。" },
      knowledge_points: { en: "With orthonormal keys, dot products isolate components. Softmax over two equal large scores gives weights near 1/2 and 1/2.", cn: "在 orthonormal keys 下，dot products 会 isolate components。softmax 对两个相等的大 scores 会给出接近 1/2 和 1/2 的 weights。" },
      tips: { en: ["Choose q along k_a+k_b.", "Use orthogonality to compute scores.", "Let lambda be large before approximating."], cn: ["让 q 沿着 \(k_a+k_b\)。", "用 orthogonality 计算 scores。", "先让 lambda 足够大，再 approximate。"] },
      detailed_solution: detail([
        "### Query choice",
        "$$\nq=\\lambda(k_a+k_b),\\qquad \\lambda>0\n$$",
        "### Score for key a",
        "$$\nk_a^\\top q=\\lambda k_a^\\top k_a+\\lambda k_a^\\top k_b=\\lambda(1)+\\lambda(0)=\\lambda\n$$",
        "### Score for key b",
        "$$\nk_b^\\top q=\\lambda k_b^\\top k_a+\\lambda k_b^\\top k_b=\\lambda(0)+\\lambda(1)=\\lambda\n$$",
        "### Score for any other key",
        "For \(i\\notin\\{a,b\\}\), orthogonality gives",
        "$$\nk_i^\\top q=\\lambda k_i^\\top k_a+\\lambda k_i^\\top k_b=0\n$$",
        "### Attention weights",
        "$$\n\\alpha_a=\\frac{e^\\lambda}{2e^\\lambda+(n-2)},\\qquad\n\\alpha_b=\\frac{e^\\lambda}{2e^\\lambda+(n-2)}\n$$",
        "and for other keys,",
        "$$\n\\alpha_i=\\frac{1}{2e^\\lambda+(n-2)}\n$$",
        "### Large lambda limit",
        "As \(\lambda\\to\\infty\),",
        "$$\n\\alpha_a\\to\\frac12,\qquad \\alpha_b\\to\\frac12,\qquad \\alpha_i\\to0\n$$",
        "### Output",
        "$$\ny=\\sum_i\\alpha_i v_i\\approx\\frac12v_a+\frac12v_b\n$$"
      ], [
        "### Query choice",
        "$$\nq=\\lambda(k_a+k_b),\\qquad \\lambda>0\n$$",
        "### key a 的 score",
        "$$\nk_a^\\top q=\\lambda k_a^\\top k_a+\\lambda k_a^\\top k_b=\\lambda(1)+\\lambda(0)=\\lambda\n$$",
        "### key b 的 score",
        "$$\nk_b^\\top q=\\lambda k_b^\\top k_a+\\lambda k_b^\\top k_b=\\lambda(0)+\\lambda(1)=\\lambda\n$$",
        "### 其他 key 的 score",
        "对 \(i\\notin\\{a,b\\}\)，orthogonality 给出",
        "$$\nk_i^\\top q=\\lambda k_i^\\top k_a+\\lambda k_i^\\top k_b=0\n$$",
        "### Attention weights",
        "$$\n\\alpha_a=\\frac{e^\\lambda}{2e^\\lambda+(n-2)},\\qquad\n\\alpha_b=\\frac{e^\\lambda}{2e^\\lambda+(n-2)}\n$$",
        "其他 keys 的 weight 是",
        "$$\n\\alpha_i=\\frac{1}{2e^\\lambda+(n-2)}\n$$",
        "### Large lambda limit",
        "当 \(\lambda\\to\\infty\)，",
        "$$\n\\alpha_a\\to\\frac12,\qquad \\alpha_b\\to\\frac12,\qquad \\alpha_i\\to0\n$$",
        "### Output",
        "$$\ny=\\sum_i\\alpha_i v_i\\approx\\frac12v_a+\frac12v_b\n$$"
      ])
    },
    {
      id: "hw4-2-3-2",
      section: "Problem 2.3.2",
      title: { en: "Explain why noisy key magnitude makes single-head averaging brittle", cn: "解释 noisy key magnitude 为什么让 single-head averaging brittle" },
      original_excerpt: { en: "Detailed cue: key means are orthogonal unit vectors; key a has extra covariance along its mean direction, so its sampled magnitude fluctuates; use the same single-head query lambda(mu_a+mu_b) and describe output variability.", cn: "题目要点：key means 是 orthogonal unit vectors；key a 在 mean direction 上有额外 covariance，因此 sampled magnitude fluctuates；使用同一个 single-head query \(\lambda(\\mu_a+\\mu_b)\)，描述 output variability。" },
      problem_understanding: { en: "The single head needs the scores for a and b to be balanced. If k_a's magnitude changes, that balance is broken before softmax, and exponentials amplify the difference.", cn: "single head 需要 a 和 b 的 scores 保持 balance。如果 \(k_a\) 的 magnitude 改变，softmax 前的 balance 被破坏，而 exponentials 会放大差异。" },
      knowledge_points: { en: "Softmax is sensitive to score gaps. With query lambda(mu_a+mu_b), the score for noisy k_a behaves like c lambda while the score for k_b stays near lambda.", cn: "Softmax 对 score gaps 很敏感。在 query \(\lambda(\\mu_a+\\mu_b)\) 下，noisy \(k_a\) 的 score 像 \(c\\lambda\)，而 \(k_b\) 的 score 接近 \(\lambda\)。" },
      tips: { en: ["Approximate k_a as c mu_a.", "Compare e^{c lambda} to e^{lambda}.", "Explain both c>1 and c<1 cases."], cn: ["把 \(k_a\) approximate 成 \(c\\mu_a\)。", "比较 \(e^{c\\lambda}\) 和 \(e^{\\lambda}\)。", "分别解释 c>1 和 c<1。"] },
      detailed_solution: detail([
        "### Single-head query",
        "$$\nq=\\lambda(\\mu_a+\\mu_b)\n$$",
        "### Approximate the noisy key",
        "Because key a fluctuates along \(\mu_a\), write a typical sample as",
        "$$\nk_a\\approx c\\mu_a\n$$",
        "where c varies across samples.",
        "The other key is more stable:",
        "$$\nk_b\\approx \\mu_b\n$$",
        "### Scores",
        "$$\nk_a^\\top q\\approx (c\\mu_a)^\\top\\lambda(\\mu_a+\mu_b)=c\\lambda\n$$",
        "$$\nk_b^\\top q\\approx \\mu_b^\\top\\lambda(\\mu_a+\mu_b)=\\lambda\n$$",
        "### Softmax sensitivity",
        "The two relevant softmax numerators are",
        "$$\ne^{c\\lambda}\\quad\\text{and}\\quad e^\\lambda\n$$",
        "### If c is larger than 1",
        "- \(e^{c\\lambda}\\) can become much larger than \(e^\\lambda\).\n- The attention weight on a approaches 1.\n- The output becomes close to \(v_a\), not the average.",
        "### If c is smaller than 1",
        "- \(e^{c\\lambda}\\) can become much smaller than \(e^\\lambda\).\n- The attention weight on b approaches 1.\n- The output becomes close to \(v_b\), not the average.",
        "### Conclusion",
        "Single-head averaging is brittle because it relies on a delicate equality of two scores, and softmax exponentials turn small geometric magnitude fluctuations into large changes in attention weights."
      ], [
        "### Single-head query",
        "$$\nq=\\lambda(\\mu_a+\\mu_b)\n$$",
        "### Approximate noisy key",
        "因为 key a 沿 \(\mu_a\) 方向 fluctuate，把一个 sample 写成",
        "$$\nk_a\\approx c\\mu_a\n$$",
        "其中 c 会随 sample 变化。",
        "另一个 key 更稳定：",
        "$$\nk_b\\approx \\mu_b\n$$",
        "### Scores",
        "$$\nk_a^\\top q\\approx (c\\mu_a)^\\top\\lambda(\\mu_a+\mu_b)=c\\lambda\n$$",
        "$$\nk_b^\\top q\\approx \\mu_b^\\top\\lambda(\\mu_a+\mu_b)=\\lambda\n$$",
        "### Softmax sensitivity",
        "两个相关的 softmax numerators 是",
        "$$\ne^{c\\lambda}\\quad\\text{and}\\quad e^\\lambda\n$$",
        "### 如果 c 大于 1",
        "- \(e^{c\\lambda}\\) 可能远大于 \(e^\\lambda\)。\n- a 上的 attention weight 接近 1。\n- output 接近 \(v_a\)，不是 average。",
        "### 如果 c 小于 1",
        "- \(e^{c\\lambda}\\) 可能远小于 \(e^\\lambda\)。\n- b 上的 attention weight 接近 1。\n- output 接近 \(v_b\)，不是 average。",
        "### 结论",
        "Single-head averaging brittle，因为它依赖两个 scores 的精细相等，而 softmax exponentials 会把小的 geometric magnitude fluctuations 放大成 attention weights 的大变化。"
      ])
    },
    {
      id: "hw4-2-3-3",
      section: "Problem 2.3.3",
      title: { en: "Use two attention heads to robustly average two values", cn: "用 two attention heads 更稳健地平均两个 values" },
      original_excerpt: { en: "Detailed cue: choose two queries for a two-headed attention mechanism whose two head outputs are averaged; make the final output approximately (v_a+v_b)/2 and explain robustness compared with single-head averaging.", cn: "题目要点：为 two-headed attention mechanism 选择两个 queries，两个 head outputs 最后平均；让 final output 近似 \((v_a+v_b)/2\)，并解释为何比 single-head averaging 更 robust。" },
      problem_understanding: { en: "Instead of forcing one head to balance two scores, make each head retrieve one value confidently, then average the head outputs afterward.", cn: "不要让一个 head 平衡两个 scores，而是让每个 head confident 地 retrieve 一个 value，然后在 head outputs 层面 average。" },
      knowledge_points: { en: "Multi-head attention can decompose one fragile task into separate retrieval tasks. Each head can focus on one key, avoiding score-balancing brittleness.", cn: "Multi-head attention 可以把一个 fragile task 分解成 separate retrieval tasks。每个 head focus 一个 key，避免 score-balancing brittleness。" },
      tips: { en: ["Set q1 along mu_a.", "Set q2 along mu_b.", "Average y1 and y2, not the scores inside one softmax."], cn: ["让 \(q_1\) 沿 \(\mu_a\)。", "让 \(q_2\) 沿 \(\mu_b\)。", "average \(y_1,y_2\)，而不是在一个 softmax 内 average scores。"] },
      detailed_solution: detail([
        "### Query choices",
        "$$\nq_1=\\lambda\\mu_a,\qquad q_2=\\lambda\\mu_b\n$$",
        "with \(\lambda\) large.",
        "### Head 1 behavior",
        "For \(q_1\),",
        "$$\nk_a^\\top q_1\\approx c\\lambda\n$$",
        "while for \(b\),",
        "$$\nk_b^\\top q_1\\approx0\n$$",
        "As long as \(k_a\) still points mostly in the \(\mu_a\) direction, head 1 puts most mass on a:",
        "$$\ny_1\\approx v_a\n$$",
        "### Head 2 behavior",
        "For \(q_2\),",
        "$$\nk_b^\\top q_2\\approx\\lambda\n$$",
        "and",
        "$$\nk_a^\\top q_2\\approx0\n$$",
        "so",
        "$$\ny_2\\approx v_b\n$$",
        "### Final output",
        "$$\ny=\\frac12(y_1+y_2)\\approx\\frac12(v_a+v_b)\n$$",
        "### Why this is more robust",
        "- The single-head method needs \(a\) and \(b\) to have equal scores in one softmax.\n- The two-head method asks each head to win one retrieval task.\n- Fluctuation in \(k_a\)'s magnitude affects head 1's confidence, but does not force head 2 away from \(v_b\).\n- The averaging happens after retrieval, so it is less sensitive to softmax score imbalance."
      ], [
        "### Query choices",
        "$$\nq_1=\\lambda\\mu_a,\qquad q_2=\\lambda\\mu_b\n$$",
        "其中 \(\lambda\) 很大。",
        "### Head 1 behavior",
        "对 \(q_1\)，",
        "$$\nk_a^\\top q_1\\approx c\\lambda\n$$",
        "而对 \(b\)，",
        "$$\nk_b^\\top q_1\\approx0\n$$",
        "只要 \(k_a\) 仍主要指向 \(\mu_a\) direction，head 1 就会把大部分 mass 放在 a 上：",
        "$$\ny_1\\approx v_a\n$$",
        "### Head 2 behavior",
        "对 \(q_2\)，",
        "$$\nk_b^\\top q_2\\approx\\lambda\n$$",
        "并且",
        "$$\nk_a^\\top q_2\\approx0\n$$",
        "所以",
        "$$\ny_2\\approx v_b\n$$",
        "### Final output",
        "$$\ny=\\frac12(y_1+y_2)\\approx\\frac12(v_a+v_b)\n$$",
        "### 为什么更 robust",
        "- single-head method 需要 a 和 b 在同一个 softmax 里有 equal scores。\n- two-head method 让每个 head 分别赢一个 retrieval task。\n- \(k_a\) magnitude fluctuation 会影响 head 1 的 confidence，但不会把 head 2 从 \(v_b\) 拉走。\n- averaging 发生在 retrieval 之后，所以对 softmax score imbalance 没那么敏感。"
      ])
    }
  ]);

  add("llm", [
    {
      id: "hw4-2-4-1",
      section: "Problem 2.4.1",
      title: { en: "Count parameters in one multi-head self-attention block", cn: "计算 one multi-head self-attention block 的参数量" },
      original_excerpt: { en: "Detailed cue: decoder-only transformer with model width D and N heads; attention head dimension is D/N; count trainable parameters in W_Q, W_K, W_V, and W_O with no bias.", cn: "题目要点：decoder-only transformer 有 model width D 和 N heads；attention head dimension 是 D/N；在 no bias 下计算 \(W_Q,W_K,W_V,W_O\) 的 trainable parameters。" },
      problem_understanding: { en: "Even though attention is split into heads, the packed Q, K, and V projections each map D dimensions back to total D dimensions.", cn: "虽然 attention 被 split 成 heads，但 packed Q/K/V projections 各自都是从 D dimensions 映射回 total D dimensions。" },
      knowledge_points: { en: "Each of W_Q, W_K, W_V, and W_O has D by D parameters in standard MHA when heads concatenate back to D.", cn: "在 standard MHA 中，heads concatenate 回 D 后，\(W_Q,W_K,W_V,W_O\) 每个都有 \(D\\times D\) parameters。" },
      tips: { en: ["Compute total head dimension N(D/N).", "Count each projection as D by D.", "No bias means no extra D terms."], cn: ["先算 total head dimension \(N(D/N)\)。", "每个 projection 都按 \(D\\times D\) 数。", "no bias 表示没有额外 D terms。"] },
      detailed_solution: detail([
        "### Head dimension",
        "$$\nd_{head}=\\frac{D}{N}\n$$",
        "With N heads, the concatenated head dimension is",
        "$$\nN\\cdot d_{head}=N\\cdot\\frac{D}{N}=D\n$$",
        "### Q, K, V projections",
        "Each projection maps",
        "$$\n\\mathbb R^D\\to\\mathbb R^D\n$$",
        "so",
        "$$\nW_Q,W_K,W_V\\in\\mathbb R^{D\\times D}\n$$",
        "Each has",
        "$$\nD^2\n$$",
        "parameters.",
        "### Output projection",
        "After concatenation, the output projection also maps",
        "$$\n\\mathbb R^D\\to\\mathbb R^D\n$$",
        "so",
        "$$\nW_O\\in\\mathbb R^{D\\times D}\n$$",
        "with \(D^2\) parameters.",
        "### Total",
        "$$\nP_{attn}=D^2+D^2+D^2+D^2=4D^2\n$$"
      ], [
        "### Head dimension",
        "$$\nd_{head}=\\frac{D}{N}\n$$",
        "N 个 heads concatenate 后的总维度是",
        "$$\nN\\cdot d_{head}=N\\cdot\\frac{D}{N}=D\n$$",
        "### Q, K, V projections",
        "每个 projection 映射",
        "$$\n\\mathbb R^D\\to\\mathbb R^D\n$$",
        "所以",
        "$$\nW_Q,W_K,W_V\\in\\mathbb R^{D\\times D}\n$$",
        "每个有",
        "$$\nD^2\n$$",
        "parameters。",
        "### Output projection",
        "concatenation 之后，output projection 也映射",
        "$$\n\\mathbb R^D\\to\\mathbb R^D\n$$",
        "所以",
        "$$\nW_O\\in\\mathbb R^{D\\times D}\n$$",
        "有 \(D^2\) parameters。",
        "### Total",
        "$$\nP_{attn}=D^2+D^2+D^2+D^2=4D^2\n$$"
      ])
    },
    {
      id: "hw4-2-4-2",
      section: "Problem 2.4.2",
      title: { en: "Count parameters in the standard two-layer transformer MLP", cn: "计算 standard two-layer transformer MLP 的参数量" },
      original_excerpt: { en: "Detailed cue: standard MLP projects from D to F using W_up, applies elementwise nonlinearity, then projects from F back to D using W_down; count parameters in both matrices with no bias.", cn: "题目要点：standard MLP 先用 \(W_{up}\) 从 D project 到 F，经过 elementwise nonlinearity，再用 \(W_{down}\) 从 F project 回 D；在 no bias 下计算两个 matrices 的 parameters。" },
      problem_understanding: { en: "This is matrix-size counting. The nonlinearity has no parameters.", cn: "这是 matrix-size counting。nonlinearity 没有 parameters。" },
      knowledge_points: { en: "An a by b matrix has ab parameters. W_up has DF, W_down has FD, so the MLP has 2DF.", cn: "一个 \(a\\times b\) matrix 有 \(ab\) 个 parameters。\(W_{up}\) 有 \(DF\)，\(W_{down}\) 有 \(FD\)，所以 MLP 有 \(2DF\)。" },
      tips: { en: ["Count only learned matrices.", "Do not count the elementwise nonlinearity.", "No bias means no +F or +D terms."], cn: ["只数 learned matrices。", "不要数 elementwise nonlinearity。", "no bias 表示没有 +F 或 +D terms。"] },
      detailed_solution: detail([
        "### Up projection",
        "$$\nW_{up}\\in\\mathbb R^{D\\times F}\n$$",
        "A \(D\\times F\) matrix has",
        "$$\nDF\n$$",
        "parameters.",
        "### Down projection",
        "$$\nW_{down}\\in\\mathbb R^{F\\times D}\n$$",
        "A \(F\\times D\) matrix has",
        "$$\nFD=DF\n$$",
        "parameters.",
        "### Nonlinearity",
        "The elementwise nonlinearity has no trainable parameters.",
        "### Total",
        "$$\nP_{MLP}=DF+DF=2DF\n$$"
      ], [
        "### Up projection",
        "$$\nW_{up}\\in\\mathbb R^{D\\times F}\n$$",
        "一个 \(D\\times F\) matrix 有",
        "$$\nDF\n$$",
        "parameters。",
        "### Down projection",
        "$$\nW_{down}\\in\\mathbb R^{F\\times D}\n$$",
        "一个 \(F\\times D\) matrix 有",
        "$$\nFD=DF\n$$",
        "parameters。",
        "### Nonlinearity",
        "elementwise nonlinearity 没有 trainable parameters。",
        "### Total",
        "$$\nP_{MLP}=DF+DF=2DF\n$$"
      ])
    },
    {
      id: "hw4-2-4-3a",
      section: "Problem 2.4.3(a)",
      title: { en: "Derive parameters in one decoder-only transformer layer", cn: "推导 one decoder-only transformer layer 的参数量" },
      original_excerpt: { en: "Detailed cue: one transformer layer contains one attention block and one standard two-layer MLP block; use the previous two parts to derive the symbolic per-layer parameter formula.", cn: "题目要点：one transformer layer 包含 one attention block 与 one standard two-layer MLP block；使用前两问推导 symbolic per-layer parameter formula。" },
      problem_understanding: { en: "Add attention parameters and MLP parameters. Layer norm and positional encoding are declared non-parametric or non-trainable in the problem assumptions.", cn: "把 attention parameters 和 MLP parameters 相加。题目假设里 layer norm 与 positional encoding 都是 non-parametric 或 non-trainable。" },
      knowledge_points: { en: "Per layer: attention contributes 4D^2, MLP contributes 2DF, so P_layer=4D^2+2DF.", cn: "每层：attention 贡献 \(4D^2\)，MLP 贡献 \(2DF\)，所以 \(P_{layer}=4D^2+2DF\)。" },
      tips: { en: ["Use part 1 for attention.", "Use part 2 for MLP.", "Do not add layer norm or positional parameters under these assumptions."], cn: ["用 part 1 的 attention。", "用 part 2 的 MLP。", "在这些 assumptions 下不要加 layer norm 或 positional parameters。"] },
      detailed_solution: detail([
        "### Attention block",
        "From part 1,",
        "$$\nP_{attn}=4D^2\n$$",
        "### MLP block",
        "From part 2,",
        "$$\nP_{MLP}=2DF\n$$",
        "### Other components",
        "- No bias terms are counted.\n- Positional encoding is not learned.\n- Layer normalization is assumed non-parametric.",
        "### Per-layer formula",
        "$$\nP_{layer}=P_{attn}+P_{MLP}=4D^2+2DF\n$$",
        "Equivalently,",
        "$$\nP_{layer}=2D(2D+F)\n$$"
      ], [
        "### Attention block",
        "由 part 1，",
        "$$\nP_{attn}=4D^2\n$$",
        "### MLP block",
        "由 part 2，",
        "$$\nP_{MLP}=2DF\n$$",
        "### Other components",
        "- no bias terms 被 count。\n- positional encoding 不是 learned。\n- layer normalization 被假设为 non-parametric。",
        "### Per-layer formula",
        "$$\nP_{layer}=P_{attn}+P_{MLP}=4D^2+2DF\n$$",
        "等价地，",
        "$$\nP_{layer}=2D(2D+F)\n$$"
      ])
    },
    {
      id: "hw4-2-4-3b",
      section: "Problem 2.4.3(b)",
      title: { en: "Derive total decoder-only LLM parameter formula", cn: "推导 decoder-only LLM 总参数量公式" },
      original_excerpt: { en: "Detailed cue: full model has L identical transformer layers, an input embedding matrix V by D, and an untied output LM head D by V; derive total trainable parameters.", cn: "题目要点：full model 有 L 个 identical transformer layers、一个 \(V\\times D\) input embedding matrix、一个 untied \(D\\times V\) output LM head；推导 total trainable parameters。" },
      problem_understanding: { en: "Multiply the per-layer count by L, then add input embeddings and the separate output head.", cn: "把 per-layer count 乘以 L，再加 input embeddings 和 separate output head。" },
      knowledge_points: { en: "Untied input and output embeddings contribute VD+DV=2VD. If they were tied, this term would be different, but the problem says untied.", cn: "untied input/output embeddings 贡献 \(VD+DV=2VD\)。如果 tied 会不同，但题目明确说 untied。" },
      tips: { en: ["Start with L times P_layer.", "Count input embedding as V by D.", "Count untied LM head separately as D by V."], cn: ["从 L times \(P_{layer}\) 开始。", "input embedding 按 \(V\\times D\) 数。", "untied LM head 单独按 \(D\\times V\) 数。"] },
      detailed_solution: detail([
        "### Transformer stack",
        "$$\nL\\cdot P_{layer}=L(4D^2+2DF)\n$$",
        "### Input embedding",
        "$$\nE\\in\\mathbb R^{V\\times D}\n$$",
        "so it contributes",
        "$$\nVD\n$$",
        "parameters.",
        "### Untied LM head",
        "$$\nW_{LM}\\in\\mathbb R^{D\\times V}\n$$",
        "so it contributes",
        "$$\nDV=VD\n$$",
        "parameters.",
        "### Total formula",
        "$$\nP_{total}=L(4D^2+2DF)+VD+DV\n$$",
        "$$\nP_{total}=L(4D^2+2DF)+2VD\n$$"
      ], [
        "### Transformer stack",
        "$$\nL\\cdot P_{layer}=L(4D^2+2DF)\n$$",
        "### Input embedding",
        "$$\nE\\in\\mathbb R^{V\\times D}\n$$",
        "所以贡献",
        "$$\nVD\n$$",
        "parameters。",
        "### Untied LM head",
        "$$\nW_{LM}\\in\\mathbb R^{D\\times V}\n$$",
        "所以贡献",
        "$$\nDV=VD\n$$",
        "parameters。",
        "### Total formula",
        "$$\nP_{total}=L(4D^2+2DF)+VD+DV\n$$",
        "$$\nP_{total}=L(4D^2+2DF)+2VD\n$$"
      ])
    },
    {
      id: "hw4-2-4-3c",
      section: "Problem 2.4.3(c)",
      title: { en: "Compute the OLMo-style decoder-only parameter count", cn: "计算 OLMo-style decoder-only 参数量" },
      original_excerpt: { en: "Detailed cue: plug D=4096, L=32, N=32, F=11008, and V=50304 into the symbolic formula; note that N cancels in the standard packed attention count.", cn: "题目要点：把 \(D=4096,L=32,N=32,F=11008,V=50304\) 代入 symbolic formula；注意 N 在 standard packed attention count 中 cancel。" },
      problem_understanding: { en: "The numerical work is arithmetic from the formula. N is included in the configuration, but the attention parameter formula is independent of N under these assumptions.", cn: "数值部分就是从公式做 arithmetic。configuration 包含 N，但在这些 assumptions 下 attention parameter formula 与 N independent。" },
      knowledge_points: { en: "Total parameters equal L(4D^2+2DF)+2VD. For the given values, the result is about 5.45 billion.", cn: "total parameters 等于 \(L(4D^2+2DF)+2VD\)。代入给定 values，结果约 5.45 billion。" },
      tips: { en: ["Compute 4D^2 first.", "Compute 2DF second.", "Add embeddings after multiplying by L."], cn: ["先算 \(4D^2\)。", "再算 \(2DF\)。", "乘以 L 后再加 embeddings。"] },
      detailed_solution: detail([
        "### Formula",
        "$$\nP_{total}=L(4D^2+2DF)+2VD\n$$",
        "### Compute attention part per layer",
        "$$\n4D^2=4\\cdot4096^2\n$$",
        "$$\n4096^2=16,777,216\n$$",
        "$$\n4D^2=67,108,864\n$$",
        "### Compute MLP part per layer",
        "$$\n2DF=2\\cdot4096\\cdot11008\n$$",
        "$$\n4096\\cdot11008=45,088,768\n$$",
        "$$\n2DF=90,177,536\n$$",
        "### Per-layer total",
        "$$\n4D^2+2DF=67,108,864+90,177,536=157,286,400\n$$",
        "### Transformer stack",
        "$$\nL(4D^2+2DF)=32\\cdot157,286,400=5,033,164,800\n$$",
        "### Embedding plus untied LM head",
        "$$\n2VD=2\\cdot50304\\cdot4096\n$$",
        "$$\n50304\\cdot4096=206,045,184\n$$",
        "$$\n2VD=412,090,368\n$$",
        "### Final total",
        "$$\nP_{total}=5,033,164,800+412,090,368=5,445,255,168\n$$",
        "$$\nP_{total}\\approx5.45\\text{B}\n$$"
      ], [
        "### Formula",
        "$$\nP_{total}=L(4D^2+2DF)+2VD\n$$",
        "### 计算每层 attention part",
        "$$\n4D^2=4\\cdot4096^2\n$$",
        "$$\n4096^2=16,777,216\n$$",
        "$$\n4D^2=67,108,864\n$$",
        "### 计算每层 MLP part",
        "$$\n2DF=2\\cdot4096\\cdot11008\n$$",
        "$$\n4096\\cdot11008=45,088,768\n$$",
        "$$\n2DF=90,177,536\n$$",
        "### Per-layer total",
        "$$\n4D^2+2DF=67,108,864+90,177,536=157,286,400\n$$",
        "### Transformer stack",
        "$$\nL(4D^2+2DF)=32\\cdot157,286,400=5,033,164,800\n$$",
        "### Embedding plus untied LM head",
        "$$\n2VD=2\\cdot50304\\cdot4096\n$$",
        "$$\n50304\\cdot4096=206,045,184\n$$",
        "$$\n2VD=412,090,368\n$$",
        "### Final total",
        "$$\nP_{total}=5,033,164,800+412,090,368=5,445,255,168\n$$",
        "$$\nP_{total}\\approx5.45\\text{B}\n$$"
      ])
    }
  ]);

  add("diffusion", [
    {
      id: "hw4-3-1",
      section: "Problem 3.1",
      title: { en: "Write the diffusion ELBO and its expectation distribution", cn: "写出 diffusion ELBO 及其 expectation distribution" },
      original_excerpt: { en: "Detailed cue: forward diffusion encodes x0 into a noisy chain x1 through xT; reverse model decodes by p_theta(x_{t-1}|x_t); write an ELBO for log p_theta(x0) and state that the expectation is over the forward chain q(x1:T|x0).", cn: "题目要点：forward diffusion 把 \(x_0\) encode 成 noisy chain \(x_1\) 到 \(x_T\)；reverse model 用 \(p_\\theta(x_{t-1}|x_t)\) decode；写出 \(\\log p_\\theta(x_0)\) 的 ELBO，并说明 expectation 是对 forward chain \(q(x_{1:T}|x_0)\) 取。" },
      problem_understanding: { en: "This is the same variational trick as a VAE: introduce latent variables x1:T from the forward process and lower-bound the log marginal likelihood.", cn: "这和 VAE 是同一个 variational trick：引入来自 forward process 的 latent variables \(x_{1:T}\)，对 log marginal likelihood 做 lower bound。" },
      knowledge_points: { en: "The compact ELBO is E_q[log p_theta(x0:T)-log q(x1:T|x0)]. It can be decomposed into reconstruction, prior, and denoising KL terms.", cn: "compact ELBO 是 \(E_q[\\log p_\\theta(x_{0:T})-\\log q(x_{1:T}|x_0)]\)。它可以分解成 reconstruction、prior、denoising KL terms。" },
      tips: { en: ["Name the latent chain x1:T.", "Put q(x1:T|x0) in the expectation subscript.", "Remember this is a lower bound on log p_theta(x0)."], cn: ["命名 latent chain \(x_{1:T}\)。", "在 expectation subscript 中写 \(q(x_{1:T}|x_0)\)。", "记住这是 \(\\log p_\\theta(x_0)\) 的 lower bound。"] },
      detailed_solution: detail([
        "### Latent chain",
        "The forward process defines",
        "$$\nq(x_{1:T}\\mid x_0)=\\prod_{t=1}^{T}q(x_t\\mid x_{t-1})\n$$",
        "### Start from the log likelihood",
        "$$\n\\log p_\\theta(x_0)=\\log\\int p_\\theta(x_{0:T})\\,dx_{1:T}\n$$",
        "### Introduce the forward distribution",
        "Multiply and divide by \(q(x_{1:T}\\mid x_0)\):",
        "$$\n\\log p_\\theta(x_0)=\\log\\mathbb E_{q(x_{1:T}\\mid x_0)}\\left[\\frac{p_\\theta(x_{0:T})}{q(x_{1:T}\\mid x_0)}\\right]\n$$",
        "### Apply Jensen's inequality",
        "$$\n\\log p_\\theta(x_0)\\ge\n\\mathbb E_{q(x_{1:T}\\mid x_0)}\\left[\\log p_\\theta(x_{0:T})-\\log q(x_{1:T}\\mid x_0)\\right]\n$$",
        "### Compact ELBO",
        "$$\n\\mathcal L_{ELBO}=\\mathbb E_{q(x_{1:T}\\mid x_0)}\\left[\\log\\frac{p_\\theta(x_{0:T})}{q(x_{1:T}\\mid x_0)}\\right]\n$$",
        "### Expectation distribution",
        "The expectation is taken over the forward diffusion chain \(q(x_{1:T}\\mid x_0)\)."
      ], [
        "### Latent chain",
        "forward process 定义",
        "$$\nq(x_{1:T}\\mid x_0)=\\prod_{t=1}^{T}q(x_t\\mid x_{t-1})\n$$",
        "### 从 log likelihood 开始",
        "$$\n\\log p_\\theta(x_0)=\\log\\int p_\\theta(x_{0:T})\\,dx_{1:T}\n$$",
        "### 引入 forward distribution",
        "乘除 \(q(x_{1:T}\\mid x_0)\)：",
        "$$\n\\log p_\\theta(x_0)=\\log\\mathbb E_{q(x_{1:T}\\mid x_0)}\\left[\\frac{p_\\theta(x_{0:T})}{q(x_{1:T}\\mid x_0)}\\right]\n$$",
        "### 使用 Jensen's inequality",
        "$$\n\\log p_\\theta(x_0)\\ge\n\\mathbb E_{q(x_{1:T}\\mid x_0)}\\left[\\log p_\\theta(x_{0:T})-\\log q(x_{1:T}\\mid x_0)\\right]\n$$",
        "### Compact ELBO",
        "$$\n\\mathcal L_{ELBO}=\\mathbb E_{q(x_{1:T}\\mid x_0)}\\left[\\log\\frac{p_\\theta(x_{0:T})}{q(x_{1:T}\\mid x_0)}\\right]\n$$",
        "### Expectation distribution",
        "expectation 是对 forward diffusion chain \(q(x_{1:T}\\mid x_0)\) 取。"
      ])
    },
    {
      id: "hw4-3-2",
      section: "Problem 3.2",
      title: { en: "Explain whether diffusion models directly estimate data density", cn: "解释 diffusion models 能否直接估计 data density" },
      original_excerpt: { en: "Detailed cue: ask whether one can directly estimate p_theta(x0) for a test sample in a standard diffusion model, as a likelihood or density evaluation.", cn: "题目要点：询问 standard diffusion model 中能否对 test sample 直接估计 \(p_\\theta(x_0)\)，作为 likelihood 或 density evaluation。" },
      problem_understanding: { en: "The model defines a latent reverse chain, so exact p_theta(x0) requires integrating over all intermediate states x1:T.", cn: "model 定义了 latent reverse chain，所以 exact \(p_\\theta(x_0)\) 需要 integrate over 所有 intermediate states \(x_{1:T}\)。" },
      knowledge_points: { en: "Standard diffusion training optimizes a variational bound or simplified denoising objective. Exact likelihood is generally intractable without additional estimators or special formulations.", cn: "standard diffusion training 优化 variational bound 或 simplified denoising objective。exact likelihood 通常 intractable，除非使用 additional estimators 或 special formulations。" },
      tips: { en: ["Write p_theta(x0) as an integral over the path.", "Connect intractability to high-dimensional latent variables.", "Mention ELBO as the usual proxy."], cn: ["把 \(p_\\theta(x_0)\) 写成对 path 的 integral。", "把 intractability 联系到 high-dimensional latent variables。", "说明 ELBO 是常用 proxy。"] },
      detailed_solution: detail([
        "### Exact density",
        "The exact model density is",
        "$$\np_\\theta(x_0)=\\int p_\\theta(x_{0:T})\\,dx_{1:T}\n$$",
        "### Why this is hard",
        "- The integral is over all intermediate diffusion states.\n- For images, each \(x_t\) is high-dimensional.\n- The path \(x_{1:T}\) is therefore extremely high-dimensional.",
        "### Standard practice",
        "Standard diffusion models usually optimize a lower bound such as",
        "$$\n\\mathbb E_{q(x_{1:T}\\mid x_0)}\\left[\\log\\frac{p_\\theta(x_{0:T})}{q(x_{1:T}\\mid x_0)}\\right]\n$$",
        "or a simplified denoising loss derived from it.",
        "### Answer",
        "- No, not directly in the usual standard formulation.\n- We normally use the ELBO or related estimators as a tractable proxy for log likelihood."
      ], [
        "### Exact density",
        "exact model density 是",
        "$$\np_\\theta(x_0)=\\int p_\\theta(x_{0:T})\\,dx_{1:T}\n$$",
        "### 为什么 hard",
        "- integral 要 over 所有 intermediate diffusion states。\n- 对 images，每个 \(x_t\) 都是 high-dimensional。\n- 因此 path \(x_{1:T}\) 极其 high-dimensional。",
        "### Standard practice",
        "standard diffusion models 通常优化 lower bound，例如",
        "$$\n\\mathbb E_{q(x_{1:T}\\mid x_0)}\\left[\\log\\frac{p_\\theta(x_{0:T})}{q(x_{1:T}\\mid x_0)}\\right]\n$$",
        "或者由它推导出的 simplified denoising loss。",
        "### 答案",
        "- No，standard formulation 下通常不能直接精确估计。\n- 我们通常用 ELBO 或相关 estimators 作为 log likelihood 的 tractable proxy。"
      ])
    },
    {
      id: "hw4-3-3",
      section: "Problem 3.3",
      title: { en: "Derive the closed form of q(x_t | x_0)", cn: "推导 \(q(x_t|x_0)\) 的 closed form" },
      original_excerpt: { en: "Detailed cue: forward step is Gaussian with mean sqrt(1-beta_t) x_{t-1} and variance beta_t I; derive the marginal distribution of x_t conditioned on x0 using alpha_t=1-beta_t and cumulative alpha-bar.", cn: "题目要点：forward step 是 Gaussian，mean 为 \(\sqrt{1-\\beta_t}x_{t-1}\)、variance 为 \(\beta_t I\)；使用 \(\alpha_t=1-\beta_t\) 和 cumulative alpha-bar 推导 \(x_t|x_0\) 的 marginal distribution。" },
      problem_understanding: { en: "Repeated Gaussian noising can be collapsed into one Gaussian that mixes the original signal x0 with a single standard-normal noise vector.", cn: "repeated Gaussian noising 可以 collapse 成一个 Gaussian，把 original signal \(x_0\) 和一个 standard-normal noise vector 混合。" },
      knowledge_points: { en: "Define alpha_t=1-beta_t and alpha_bar_t=prod_{i=1}^t alpha_i. Then q(x_t|x0)=N(sqrt(alpha_bar_t)x0,(1-alpha_bar_t)I).", cn: "定义 \(\alpha_t=1-\beta_t\)、\(\bar\\alpha_t=\prod_{i=1}^t\alpha_i\)。则 \(q(x_t|x_0)=N(\sqrt{\bar\\alpha_t}x_0,(1-\bar\\alpha_t)I)\)。" },
      tips: { en: ["Use reparameterization for one step.", "Expand two steps to see the pattern.", "Combine independent Gaussians into one Gaussian."], cn: ["用 one-step reparameterization。", "展开两步看 pattern。", "把 independent Gaussians 合并成一个 Gaussian。"] },
      detailed_solution: detail([
        "### Define alpha",
        "$$\n\\alpha_t=1-\\beta_t\n$$",
        "The one-step transition can be written as",
        "$$\nx_t=\\sqrt{\\alpha_t}x_{t-1}+\\sqrt{1-\\alpha_t}\\epsilon_t,\qquad \\epsilon_t\\sim\\mathcal N(0,I)\n$$",
        "### Expand two steps",
        "$$\nx_t=\\sqrt{\\alpha_t}\\left(\\sqrt{\\alpha_{t-1}}x_{t-2}+\\sqrt{1-\\alpha_{t-1}}\\epsilon_{t-1}\\right)+\\sqrt{1-\\alpha_t}\\epsilon_t\n$$",
        "$$\nx_t=\\sqrt{\\alpha_t\\alpha_{t-1}}x_{t-2}+\\sqrt{\\alpha_t(1-\\alpha_{t-1})}\\epsilon_{t-1}+\\sqrt{1-\\alpha_t}\\epsilon_t\n$$",
        "### Pattern after t steps",
        "The coefficient on \(x_0\) becomes",
        "$$\n\\sqrt{\\bar\\alpha_t},\qquad \\bar\\alpha_t=\\prod_{i=1}^{t}\\alpha_i\n$$",
        "### Combine Gaussian noise",
        "The sum of independent Gaussian noise terms is Gaussian. Its total variance is",
        "$$\n1-\\bar\\alpha_t\n$$",
        "so we can write",
        "$$\nx_t=\\sqrt{\\bar\\alpha_t}x_0+\sqrt{1-\\bar\\alpha_t}\\epsilon,\qquad \\epsilon\\sim\\mathcal N(0,I)\n$$",
        "### Distribution",
        "$$\nq(x_t\\mid x_0)=\\mathcal N\\left(x_t;\\sqrt{\\bar\\alpha_t}x_0,(1-\\bar\\alpha_t)I\\right)\n$$"
      ], [
        "### 定义 alpha",
        "$$\n\\alpha_t=1-\\beta_t\n$$",
        "one-step transition 可以写成",
        "$$\nx_t=\\sqrt{\\alpha_t}x_{t-1}+\\sqrt{1-\\alpha_t}\\epsilon_t,\qquad \\epsilon_t\\sim\\mathcal N(0,I)\n$$",
        "### 展开两步",
        "$$\nx_t=\\sqrt{\\alpha_t}\\left(\\sqrt{\\alpha_{t-1}}x_{t-2}+\\sqrt{1-\\alpha_{t-1}}\\epsilon_{t-1}\\right)+\\sqrt{1-\\alpha_t}\\epsilon_t\n$$",
        "$$\nx_t=\\sqrt{\\alpha_t\\alpha_{t-1}}x_{t-2}+\\sqrt{\\alpha_t(1-\\alpha_{t-1})}\\epsilon_{t-1}+\\sqrt{1-\\alpha_t}\\epsilon_t\n$$",
        "### t steps 后的 pattern",
        "\(x_0\) 前面的 coefficient 变成",
        "$$\n\\sqrt{\\bar\\alpha_t},\\qquad \\bar\\alpha_t=\\prod_{i=1}^{t}\\alpha_i\n$$",
        "### 合并 Gaussian noise",
        "independent Gaussian noise terms 的和仍是 Gaussian。总 variance 是",
        "$$\n1-\\bar\\alpha_t\n$$",
        "所以可以写成",
        "$$\nx_t=\\sqrt{\\bar\\alpha_t}x_0+\sqrt{1-\\bar\\alpha_t}\\epsilon,\qquad \\epsilon\\sim\\mathcal N(0,I)\n$$",
        "### Distribution",
        "$$\nq(x_t\\mid x_0)=\\mathcal N\\left(x_t;\\sqrt{\\bar\\alpha_t}x_0,(1-\\bar\\alpha_t)I\\right)\n$$"
      ])
    },
    {
      id: "hw4-3-4",
      section: "Problem 3.4",
      title: { en: "Derive the diffusion posterior mean for q(x_{t-1} | x_t, x_0)", cn: "推导 diffusion posterior mean \(q(x_{t-1}|x_t,x_0)\)" },
      original_excerpt: { en: "Detailed cue: use Bayes rule to multiply q(x_t|x_{t-1}) and q(x_{t-1}|x0), both Gaussian, then complete the square to get the posterior mean of q(x_{t-1}|x_t,x0).", cn: "题目要点：使用 Bayes rule，把 \(q(x_t|x_{t-1})\) 与 \(q(x_{t-1}|x_0)\) 两个 Gaussian 相乘，然后 complete the square，得到 \(q(x_{t-1}|x_t,x_0)\) 的 posterior mean。" },
      problem_understanding: { en: "The posterior is Gaussian because it is proportional to a product of two Gaussians in x_{t-1}. The mean comes from collecting the quadratic and linear terms.", cn: "posterior 是 Gaussian，因为它正比于两个关于 \(x_{t-1}\) 的 Gaussians 的乘积。mean 来自收集 quadratic 与 linear terms。" },
      knowledge_points: { en: "The DDPM posterior mean is sqrt(alpha_t)(1-alpha_bar_{t-1})/(1-alpha_bar_t) times x_t plus sqrt(alpha_bar_{t-1}) beta_t/(1-alpha_bar_t) times x0.", cn: "DDPM posterior mean 是 \(\sqrt{\alpha_t}(1-\bar\alpha_{t-1})/(1-\bar\alpha_t)\) 乘 \(x_t\)，加上 \(\sqrt{\bar\alpha_{t-1}}\beta_t/(1-\bar\alpha_t)\) 乘 \(x_0\)。" },
      tips: { en: ["Treat x_{t-1} as the variable.", "Write both Gaussian exponents.", "Complete the square by reading precision and linear terms."], cn: ["把 \(x_{t-1}\) 当作 variable。", "写出两个 Gaussian exponents。", "通过 precision 和 linear terms complete the square。"] },
      detailed_solution: detail([
        "### Bayes rule",
        "$$\nq(x_{t-1}\\mid x_t,x_0)\\propto q(x_t\\mid x_{t-1})q(x_{t-1}\\mid x_0)\n$$",
        "### First Gaussian",
        "$$\nq(x_t\\mid x_{t-1})=\\mathcal N(x_t;\\sqrt{\\alpha_t}x_{t-1},\\beta_t I)\n$$",
        "As a function of \(x_{t-1}\), its exponent contributes",
        "$$\n-\\frac{\\|x_t-\\sqrt{\\alpha_t}x_{t-1}\\|^2}{2\\beta_t}\n$$",
        "### Second Gaussian",
        "$$\nq(x_{t-1}\\mid x_0)=\\mathcal N(x_{t-1};\\sqrt{\\bar\\alpha_{t-1}}x_0,(1-\\bar\\alpha_{t-1})I)\n$$",
        "Its exponent contributes",
        "$$\n-\\frac{\\|x_{t-1}-\\sqrt{\\bar\\alpha_{t-1}}x_0\\|^2}{2(1-\\bar\\alpha_{t-1})}\n$$",
        "### Collect quadratic precision",
        "The coefficient of \(\|x_{t-1}\|^2\) is",
        "$$\n\\frac{\\alpha_t}{\\beta_t}+\\frac{1}{1-\\bar\\alpha_{t-1}}\n$$",
        "This is the posterior precision.",
        "### Collect linear term",
        "The linear coefficient in \(x_{t-1}\) is",
        "$$\n\\frac{\\sqrt{\\alpha_t}}{\\beta_t}x_t+\frac{\\sqrt{\\bar\\alpha_{t-1}}}{1-\\bar\\alpha_{t-1}}x_0\n$$",
        "### Mean equals precision inverse times linear term",
        "$$\n\\tilde\\mu_t(x_t,x_0)=\n\\left(\\frac{\\alpha_t}{\\beta_t}+\\frac{1}{1-\\bar\\alpha_{t-1}}\\right)^{-1}\n\\left(\\frac{\\sqrt{\\alpha_t}}{\\beta_t}x_t+\frac{\\sqrt{\\bar\\alpha_{t-1}}}{1-\\bar\\alpha_{t-1}}x_0\\right)\n$$",
        "### Simplify denominator",
        "Using \(\bar\\alpha_t=\\alpha_t\\bar\\alpha_{t-1}\) and \(\beta_t=1-\alpha_t\), this simplifies to",
        "$$\n\\tilde\\mu_t(x_t,x_0)=\n\\frac{\\sqrt{\\alpha_t}(1-\\bar\\alpha_{t-1})}{1-\\bar\\alpha_t}x_t+\n\\frac{\\sqrt{\\bar\\alpha_{t-1}}\\beta_t}{1-\\bar\\alpha_t}x_0\n$$",
        "### Conclusion",
        "The posterior mean is a weighted combination of the noisy sample \(x_t\) and the clean sample \(x_0\)."
      ], [
        "### Bayes rule",
        "$$\nq(x_{t-1}\\mid x_t,x_0)\\propto q(x_t\\mid x_{t-1})q(x_{t-1}\\mid x_0)\n$$",
        "### First Gaussian",
        "$$\nq(x_t\\mid x_{t-1})=\\mathcal N(x_t;\\sqrt{\\alpha_t}x_{t-1},\\beta_t I)\n$$",
        "把它看成 \(x_{t-1}\) 的函数，exponent 贡献",
        "$$\n-\\frac{\\|x_t-\\sqrt{\\alpha_t}x_{t-1}\\|^2}{2\\beta_t}\n$$",
        "### Second Gaussian",
        "$$\nq(x_{t-1}\\mid x_0)=\\mathcal N(x_{t-1};\\sqrt{\\bar\\alpha_{t-1}}x_0,(1-\\bar\\alpha_{t-1})I)\n$$",
        "它的 exponent 贡献",
        "$$\n-\\frac{\\|x_{t-1}-\\sqrt{\\bar\\alpha_{t-1}}x_0\\|^2}{2(1-\\bar\\alpha_{t-1})}\n$$",
        "### Collect quadratic precision",
        "\(\|x_{t-1}\|^2\) 的 coefficient 是",
        "$$\n\\frac{\\alpha_t}{\\beta_t}+\\frac{1}{1-\\bar\\alpha_{t-1}}\n$$",
        "这就是 posterior precision。",
        "### Collect linear term",
        "\(x_{t-1}\) 的 linear coefficient 是",
        "$$\n\\frac{\\sqrt{\\alpha_t}}{\\beta_t}x_t+\frac{\\sqrt{\\bar\\alpha_{t-1}}}{1-\\bar\\alpha_{t-1}}x_0\n$$",
        "### Mean = precision inverse times linear term",
        "$$\n\\tilde\\mu_t(x_t,x_0)=\n\\left(\\frac{\\alpha_t}{\\beta_t}+\\frac{1}{1-\\bar\\alpha_{t-1}}\\right)^{-1}\n\\left(\\frac{\\sqrt{\\alpha_t}}{\\beta_t}x_t+\frac{\\sqrt{\\bar\\alpha_{t-1}}}{1-\\bar\\alpha_{t-1}}x_0\\right)\n$$",
        "### Simplify denominator",
        "使用 \(\bar\\alpha_t=\\alpha_t\\bar\\alpha_{t-1}\) 和 \(\beta_t=1-\alpha_t\)，化简得到",
        "$$\n\\tilde\\mu_t(x_t,x_0)=\n\\frac{\\sqrt{\\alpha_t}(1-\\bar\\alpha_{t-1})}{1-\\bar\\alpha_t}x_t+\n\\frac{\\sqrt{\\bar\\alpha_{t-1}}\\beta_t}{1-\\bar\\alpha_t}x_0\n$$",
        "### 结论",
        "posterior mean 是 noisy sample \(x_t\) 和 clean sample \(x_0\) 的 weighted combination。"
      ])
    }
  ]);
})();

// Structured HW3 data override. Removes the older terse HW3 sketches and
// re-adds HW3 as detailed, bilingual, step-by-step problem cards.
(function enhanceHw3Problems() {
  const data = window.POPUP_DATA || {};
  const hw = "hw3";
  const join = parts => parts.join("\n\n");
  const detail = (en, cn) => ({ en: join(en), cn: join(cn) });

  Object.values(data).forEach(topic => {
    topic.problems = (topic.problems || []).filter(p => p.hw !== hw);
  });

  const add = (slug, items) => {
    if (!data[slug]) return;
    data[slug].problems = data[slug].problems || [];
    data[slug].problems.push(...items.map(item => ({ ...item, hw })));
  };

  add("mlp", [
    {
      id: "hw3-1-1",
      section: "Problem 1.1",
      title: { en: "Use two ReLU units to represent the identity function", cn: "用两个 ReLU units 表示 identity function" },
      original_excerpt: { en: "Detailed cue: one-input, two-hidden-unit network; bias is zero; activation is ReLU; choose two weight vectors so the output equals x for every real x.", cn: "题目要点：one-input、two-hidden-unit network；bias 为 0；activation 是 ReLU；选择两个 weight vectors，使输出对所有 real x 都等于 x。" },
      problem_understanding: { en: "A ReLU is nonnegative, so one unit cannot directly represent negative x. The trick is to split x into its positive and negative parts, then subtract them.", cn: "ReLU 输出非负，所以一个 unit 不能直接表示 negative x。关键 trick 是把 x 拆成 positive part 和 negative part，再相减。" },
      knowledge_points: { en: "The identity ReLU(x)-ReLU(-x)=x holds for all real x. This is a basic hinge-function construction.", cn: "恒等式 ReLU(x)-ReLU(-x)=x 对所有 real x 成立。这是 hinge-function construction 的基础。" },
      tips: { en: ["Make one hidden neuron see x.", "Make the other hidden neuron see -x.", "Use output weights +1 and -1."], cn: ["让一个 hidden neuron 看到 x。", "让另一个 hidden neuron 看到 -x。", "output weights 用 +1 和 -1。"] },
      detailed_solution: detail([
        "### Target",
        "$$\nf(x)=w_1^\\top\\operatorname{ReLU}(w_0x)=x\\quad\\text{for all }x\\in\\mathbb R\n$$",
        "### Choose hidden weights",
        "$$\nw_0=\\begin{pmatrix}1\\\\-1\\end{pmatrix}\n$$",
        "Then the two pre-activations are",
        "$$\nw_0x=\\begin{pmatrix}x\\\\-x\\end{pmatrix}\n$$",
        "### Apply ReLU",
        "$$\n\\operatorname{ReLU}(w_0x)=\\begin{pmatrix}\\operatorname{ReLU}(x)\\\\\\operatorname{ReLU}(-x)\\end{pmatrix}\n$$",
        "### Choose output weights",
        "$$\nw_1=\\begin{pmatrix}1\\\\-1\\end{pmatrix}\n$$",
        "### Compute the output",
        "$$\nw_1^\\top\\operatorname{ReLU}(w_0x)=\\operatorname{ReLU}(x)-\\operatorname{ReLU}(-x)\n$$",
        "### Check both cases",
        "- If \(x\\ge0\), this is \(x-0=x\).\n- If \(x<0\), this is \(0-(-x)=x\).",
        "### Conclusion",
        "The network realizes the identity function on all real numbers."
      ], [
        "### Target",
        "$$\nf(x)=w_1^\\top\\operatorname{ReLU}(w_0x)=x\\quad\\text{for all }x\\in\\mathbb R\n$$",
        "### 选择 hidden weights",
        "$$\nw_0=\\begin{pmatrix}1\\\\-1\\end{pmatrix}\n$$",
        "于是两个 pre-activations 是",
        "$$\nw_0x=\\begin{pmatrix}x\\\\-x\\end{pmatrix}\n$$",
        "### 套 ReLU",
        "$$\n\\operatorname{ReLU}(w_0x)=\\begin{pmatrix}\\operatorname{ReLU}(x)\\\\\\operatorname{ReLU}(-x)\\end{pmatrix}\n$$",
        "### 选择 output weights",
        "$$\nw_1=\\begin{pmatrix}1\\\\-1\\end{pmatrix}\n$$",
        "### 计算输出",
        "$$\nw_1^\\top\\operatorname{ReLU}(w_0x)=\\operatorname{ReLU}(x)-\\operatorname{ReLU}(-x)\n$$",
        "### 分情况检查",
        "- 如果 \(x\\ge0\)，结果是 \(x-0=x\)。\n- 如果 \(x<0\)，结果是 \(0-(-x)=x\)。",
        "### 结论",
        "这个 network 在所有 real numbers 上实现 identity function。"
      ])
    },
    {
      id: "hw3-1-2",
      section: "Problem 1.2",
      title: { en: "Use ReLU positive and negative parts to represent an affine function", cn: "用 ReLU 正负部分表示 affine function" },
      original_excerpt: { en: "Detailed cue: one-input, two-hidden-unit ReLU network; choose weights and biases so the output equals mx+b for every real x.", cn: "题目要点：one-input、two-hidden-unit ReLU network；选择 weights 与 biases，使输出对所有 real x 等于 \(mx+b\)。" },
      problem_understanding: { en: "This is the same identity trick as Problem 1.1, but applied to the scalar expression mx+b instead of x.", cn: "这题和 Problem 1.1 是同一个 identity trick，只是把 x 换成 scalar expression \(mx+b\)。" },
      knowledge_points: { en: "For any scalar u, ReLU(u)-ReLU(-u)=u. Set u=mx+b and make the two hidden units compute u and -u.", cn: "对任意 scalar \(u\)，ReLU(u)-ReLU(-u)=u。令 \(u=mx+b\)，让两个 hidden units 分别计算 u 和 -u。" },
      tips: { en: ["Define u=mx+b first.", "Make the hidden layer output ReLU(u) and ReLU(-u).", "Subtract the second hidden unit from the first."], cn: ["先定义 \(u=mx+b\)。", "hidden layer 输出 ReLU(u) 和 ReLU(-u)。", "output layer 用第一个减第二个。"] },
      detailed_solution: detail([
        "### Define the scalar to reconstruct",
        "$$\nu=mx+b\n$$",
        "### Hidden weights and biases",
        "$$\nw_0=\\begin{pmatrix}m\\\\-m\\end{pmatrix},\\qquad b_0=\\begin{pmatrix}b\\\\-b\\end{pmatrix}\n$$",
        "Then",
        "$$\nw_0x+b_0=\\begin{pmatrix}mx+b\\\\-mx-b\\end{pmatrix}=\\begin{pmatrix}u\\\\-u\\end{pmatrix}\n$$",
        "### Hidden activation",
        "$$\n\\operatorname{ReLU}(w_0x+b_0)=\\begin{pmatrix}\\operatorname{ReLU}(u)\\\\\\operatorname{ReLU}(-u)\\end{pmatrix}\n$$",
        "### Output weights",
        "$$\nw_1=\\begin{pmatrix}1\\\\-1\\end{pmatrix}\n$$",
        "### Output",
        "$$\nw_1^\\top\\operatorname{ReLU}(w_0x+b_0)=\\operatorname{ReLU}(u)-\\operatorname{ReLU}(-u)=u\n$$",
        "$$\nf(x)=mx+b\n$$",
        "### Conclusion",
        "The construction works for every real x and for any fixed m,b."
      ], [
        "### 定义要恢复的 scalar",
        "$$\nu=mx+b\n$$",
        "### Hidden weights 与 biases",
        "$$\nw_0=\\begin{pmatrix}m\\\\-m\\end{pmatrix},\\qquad b_0=\\begin{pmatrix}b\\\\-b\\end{pmatrix}\n$$",
        "于是",
        "$$\nw_0x+b_0=\\begin{pmatrix}mx+b\\\\-mx-b\\end{pmatrix}=\\begin{pmatrix}u\\\\-u\\end{pmatrix}\n$$",
        "### Hidden activation",
        "$$\n\\operatorname{ReLU}(w_0x+b_0)=\\begin{pmatrix}\\operatorname{ReLU}(u)\\\\\\operatorname{ReLU}(-u)\\end{pmatrix}\n$$",
        "### Output weights",
        "$$\nw_1=\\begin{pmatrix}1\\\\-1\\end{pmatrix}\n$$",
        "### 输出",
        "$$\nw_1^\\top\\operatorname{ReLU}(w_0x+b_0)=\\operatorname{ReLU}(u)-\\operatorname{ReLU}(-u)=u\n$$",
        "$$\nf(x)=mx+b\n$$",
        "### 结论",
        "这个 construction 对所有 real x 以及任意 fixed m,b 都成立。"
      ])
    },
    {
      id: "hw3-1-3",
      section: "Problem 1.3",
      title: { en: "Use one sigmoid unit to represent a constant function", cn: "用一个 sigmoid unit 表示 constant function" },
      original_excerpt: { en: "Detailed cue: one hidden unit, zero bias, sigmoid activation; choose scalar weights so the network output is the constant b for every x.", cn: "题目要点：one hidden unit、zero bias、sigmoid activation；选择 scalar weights，使 network 对每个 x 输出 constant b。" },
      problem_understanding: { en: "To make the output constant, make the hidden pre-activation independent of x.", cn: "要让输出是 constant，就让 hidden pre-activation 不依赖 x。" },
      knowledge_points: { en: "sigmoid(0)=1/2. If w0=0, the hidden activation is always 1/2, so the output weight can scale it to b.", cn: "sigmoid(0)=1/2。若 \(w_0=0\)，hidden activation 永远是 1/2，所以 output weight 可以把它 scale 到 b。" },
      tips: { en: ["Set the input weight to zero.", "Compute sigmoid(0).", "Choose the output weight to make half of it equal b."], cn: ["把 input weight 设成 0。", "计算 sigmoid(0)。", "选择 output weight，让它的一半等于 b。"] },
      detailed_solution: detail([
        "### Goal",
        "$$\nf(x)=w_1\\sigma(w_0x)=b\\quad\\text{for all }x\n$$",
        "### Make the hidden unit constant",
        "Choose",
        "$$\nw_0=0\n$$",
        "Then",
        "$$\nw_0x=0\\quad\\text{for every }x\n$$",
        "### Sigmoid value",
        "$$\n\\sigma(0)=\\frac{1}{1+e^0}=\\frac12\n$$",
        "### Choose the output weight",
        "We need",
        "$$\nw_1\\cdot\\frac12=b\n$$",
        "so choose",
        "$$\nw_1=2b\n$$",
        "### Conclusion",
        "$$\nf(x)=2b\\cdot\\frac12=b\n$$"
      ], [
        "### Goal",
        "$$\nf(x)=w_1\\sigma(w_0x)=b\\quad\\text{for all }x\n$$",
        "### 让 hidden unit 变成 constant",
        "选择",
        "$$\nw_0=0\n$$",
        "于是",
        "$$\nw_0x=0\\quad\\text{for every }x\n$$",
        "### Sigmoid value",
        "$$\n\\sigma(0)=\\frac{1}{1+e^0}=\\frac12\n$$",
        "### 选择 output weight",
        "我们需要",
        "$$\nw_1\\cdot\\frac12=b\n$$",
        "所以选择",
        "$$\nw_1=2b\n$$",
        "### 结论",
        "$$\nf(x)=2b\\cdot\\frac12=b\n$$"
      ])
    },
    {
      id: "hw3-1-4",
      section: "Problem 1.4",
      title: { en: "Build a triangular piecewise-linear function with three ReLUs", cn: "用三个 ReLU 构造 triangular piecewise-linear function" },
      original_excerpt: { en: "Detailed cue: three-hidden-unit ReLU network; target is zero outside [-2,2], rises linearly from -2 to 0, then falls linearly from 0 to 2.", cn: "题目要点：three-hidden-unit ReLU network；target 在 [-2,2] 外为 0，从 -2 到 0 线性上升，从 0 到 2 线性下降。" },
      problem_understanding: { en: "The target is a piecewise-linear tent function. ReLU(x-a) adds a slope change at x=a, so match the slope jumps at -2, 0, and 2.", cn: "目标是 piecewise-linear tent function。ReLU(x-a) 会在 x=a 处增加 slope change，所以匹配 -2、0、2 三个 kink 的 slope jumps。" },
      knowledge_points: { en: "A linear combination of shifted ReLUs represents a continuous piecewise-linear function. The coefficient on each ReLU equals the slope change at that breakpoint.", cn: "shifted ReLUs 的 linear combination 可以表示 continuous piecewise-linear function。每个 ReLU 的 coefficient 等于该 breakpoint 的 slope change。" },
      tips: { en: ["List the slopes on each interval.", "Convert slope changes into ReLU coefficients.", "Verify the formula interval by interval."], cn: ["先列每个 interval 的 slope。", "把 slope changes 转成 ReLU coefficients。", "最后逐 interval 验证公式。"] },
      detailed_solution: detail([
        "### Slopes of the target",
        "- For \(x<-2\), the slope is 0.\n- For \(-2<x<0\), the slope is 3.\n- For \(0<x<2\), the slope is -3.\n- For \(x>2\), the slope is 0.",
        "### Slope changes",
        "- At \(x=-2\): slope changes from 0 to 3, so add \(+3\\operatorname{ReLU}(x+2)\).\n- At \(x=0\): slope changes from 3 to -3, so add \(-6\\operatorname{ReLU}(x)\).\n- At \(x=2\): slope changes from -3 to 0, so add \(+3\\operatorname{ReLU}(x-2)\).",
        "### Function",
        "$$\nf(x)=3\\operatorname{ReLU}(x+2)-6\\operatorname{ReLU}(x)+3\\operatorname{ReLU}(x-2)\n$$",
        "### Network parameters",
        "$$\nw_0=\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix},\\qquad b_0=\\begin{pmatrix}2\\\\0\\\\-2\\end{pmatrix},\\qquad w_1=\\begin{pmatrix}3\\\\-6\\\\3\\end{pmatrix}\n$$",
        "### Check \(x\\le -2\)",
        "- All three ReLU arguments are nonpositive.\n- Therefore \(f(x)=0\).",
        "### Check \(-2\\le x\\le0\)",
        "- Only \(x+2\) is active.\n- Therefore \(f(x)=3(x+2)=3x+6\).",
        "### Check \(0\\le x\\le2\)",
        "- \(x+2\) and \(x\) are active, but \(x-2\) is not.\n- Therefore \(f(x)=3(x+2)-6x=-3x+6\).",
        "### Check \(x\\ge2\)",
        "- All three hinges are active.\n- \(f(x)=3(x+2)-6x+3(x-2)=0\)."
      ], [
        "### Target 的 slopes",
        "- 对 \(x<-2\)，slope 是 0。\n- 对 \(-2<x<0\)，slope 是 3。\n- 对 \(0<x<2\)，slope 是 -3。\n- 对 \(x>2\)，slope 是 0。",
        "### Slope changes",
        "- 在 \(x=-2\)：slope 从 0 变到 3，所以加 \(+3\\operatorname{ReLU}(x+2)\)。\n- 在 \(x=0\)：slope 从 3 变到 -3，所以加 \(-6\\operatorname{ReLU}(x)\)。\n- 在 \(x=2\)：slope 从 -3 变到 0，所以加 \(+3\\operatorname{ReLU}(x-2)\)。",
        "### Function",
        "$$\nf(x)=3\\operatorname{ReLU}(x+2)-6\\operatorname{ReLU}(x)+3\\operatorname{ReLU}(x-2)\n$$",
        "### Network parameters",
        "$$\nw_0=\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix},\\qquad b_0=\\begin{pmatrix}2\\\\0\\\\-2\\end{pmatrix},\\qquad w_1=\\begin{pmatrix}3\\\\-6\\\\3\\end{pmatrix}\n$$",
        "### 检查 \(x\\le -2\)",
        "- 三个 ReLU arguments 都 nonpositive。\n- 因此 \(f(x)=0\)。",
        "### 检查 \(-2\\le x\\le0\)",
        "- 只有 \(x+2\) active。\n- 因此 \(f(x)=3(x+2)=3x+6\)。",
        "### 检查 \(0\\le x\\le2\)",
        "- \(x+2\) 和 \(x\) active，但 \(x-2\) 不 active。\n- 因此 \(f(x)=3(x+2)-6x=-3x+6\)。",
        "### 检查 \(x\\ge2\)",
        "- 三个 hinges 全部 active。\n- \(f(x)=3(x+2)-6x+3(x-2)=0\)。"
      ])
    },
    {
      id: "hw3-1-5",
      section: "Problem 1.5",
      title: { en: "Decide whether a finite ReLU network can exactly equal x squared", cn: "判断 finite ReLU network 能否精确等于 x squared" },
      original_excerpt: { en: "Detailed cue: ask whether finite ReLU weights can make a one-hidden-layer network equal x^2 for every real x, and require an explanation.", cn: "题目要点：判断 finite ReLU weights 是否能让 one-hidden-layer network 对所有 real x 精确等于 \(x^2\)，并解释原因。" },
      problem_understanding: { en: "This is not asking for a better set of weights. It asks whether the function class contains a quadratic curve exactly.", cn: "这题不是让你找更好的 weights，而是问这个 function class 是否精确包含 quadratic curve。" },
      knowledge_points: { en: "A finite sum of ReLU hinge functions is piecewise linear. The function x^2 has nonzero curvature on every interval, so it is not piecewise linear.", cn: "有限个 ReLU hinge functions 的和是 piecewise linear。函数 \(x^2\) 在每个 interval 上都有非零 curvature，因此不是 piecewise linear。" },
      tips: { en: ["Describe the function class first.", "Use piecewise linearity, not a failed construction.", "Mention curvature or second derivative."], cn: ["先描述 function class。", "用 piecewise linearity，而不是说某个 construction 失败。", "提 curvature 或 second derivative。"] },
      detailed_solution: detail([
        "### Answer",
        "- No.",
        "### Shape of a finite ReLU network",
        "Each hidden unit has the form",
        "$$\n\\operatorname{ReLU}(a_ix+b_i)\n$$",
        "This is a piecewise-linear hinge function.",
        "### Sum of finitely many hinges",
        "A finite linear combination is still piecewise linear:",
        "$$\nf(x)=\\sum_i c_i\\operatorname{ReLU}(a_ix+b_i)\n$$",
        "It can have only finitely many breakpoints.",
        "### Compare with \(x^2\)",
        "$$\n\\frac{d^2}{dx^2}x^2=2\n$$",
        "So \(x^2\) has nonzero curvature everywhere.",
        "### Why that rules it out",
        "- A piecewise-linear function has zero second derivative on every open interval away from its breakpoints.\n- A quadratic has second derivative 2 on every open interval.\n- These two facts cannot both hold for the same function on all of \(\\mathbb R\).",
        "### Conclusion",
        "No finite one-hidden-layer ReLU network can exactly represent \(x^2\) on all real numbers."
      ], [
        "### 答案",
        "- No。",
        "### Finite ReLU network 的形状",
        "每个 hidden unit 形式是",
        "$$\n\\operatorname{ReLU}(a_ix+b_i)\n$$",
        "这是 piecewise-linear hinge function。",
        "### 有限个 hinges 相加",
        "finite linear combination 仍然是 piecewise linear：",
        "$$\nf(x)=\\sum_i c_i\\operatorname{ReLU}(a_ix+b_i)\n$$",
        "它只能有 finitely many breakpoints。",
        "### 和 \(x^2\) 比较",
        "$$\n\\frac{d^2}{dx^2}x^2=2\n$$",
        "所以 \(x^2\) 到处都有 nonzero curvature。",
        "### 为什么不可能",
        "- piecewise-linear function 在每个非 breakpoint 的 open interval 上 second derivative 是 0。\n- quadratic 在每个 open interval 上 second derivative 是 2。\n- 同一个 function 不可能同时满足这两点。",
        "### 结论",
        "finite one-hidden-layer ReLU network 不能在所有 real numbers 上精确表示 \(x^2\)。"
      ])
    },
    {
      id: "hw3-1-6",
      section: "Problem 1.6",
      title: { en: "Decide whether finite ReLUs uniformly approximate x squared on all real numbers", cn: "判断 finite ReLUs 能否在全 real line 上 uniformly approximate x squared" },
      original_excerpt: { en: "Detailed cue: for every epsilon, ask whether some fixed finite ReLU network can keep absolute error below epsilon for all x in R.", cn: "题目要点：对任意 epsilon，判断是否存在 fixed finite ReLU network，使 absolute error 在所有 \(x\\in R\) 上都小于 epsilon。" },
      problem_understanding: { en: "The domain is unbounded. Even if ReLUs approximate a quadratic on a finite interval, the tails still matter on all of R.", cn: "domain 是 unbounded。即使 ReLU 在有限区间上能近似 quadratic，在整个 real line 上 tail behavior 仍然决定答案。" },
      knowledge_points: { en: "A finite ReLU network is affine outside its largest and smallest breakpoints, while x^2 grows quadratically. The uniform error on R must become unbounded.", cn: "finite ReLU network 在最大和最小 breakpoint 之外是 affine，而 \(x^2\) 是 quadratic growth。因此在 R 上的 uniform error 会变成 unbounded。" },
      tips: { en: ["Focus on behavior as |x| goes to infinity.", "Find the outermost breakpoint.", "Compare affine growth with quadratic growth."], cn: ["关注 \(|x|\\to\\infty\) 的 behavior。", "找到 outermost breakpoint。", "比较 affine growth 和 quadratic growth。"] },
      detailed_solution: detail([
        "### Answer",
        "- No.",
        "### Finite breakpoints",
        "A finite ReLU network has finitely many hinge points. Let \(R\) be larger than the absolute value of every hinge point.",
        "### Behavior outside the breakpoints",
        "For \(x>R\), every ReLU unit is either always active or always inactive. Therefore the whole network becomes affine on the right tail:",
        "$$\nf(x)=ax+c\\qquad x>R\n$$",
        "The same kind of affine behavior happens on the left tail.",
        "### Compare to the quadratic",
        "On the right tail, the error is",
        "$$\n|f(x)-x^2|=|ax+c-x^2|\n$$",
        "As \(x\\to\\infty\), the \(x^2\) term dominates:",
        "$$\n|ax+c-x^2|\\to\\infty\n$$",
        "### Contradiction",
        "- Uniform approximation would require \(|f(x)-x^2|<\\epsilon\) for every real x.\n- But the tail error becomes arbitrarily large.\n- Therefore no fixed finite-dimensional ReLU network can satisfy the requirement on all of \(\\mathbb R\)."
      ], [
        "### 答案",
        "- No。",
        "### Finite breakpoints",
        "finite ReLU network 只有 finitely many hinge points。令 \(R\) 大于所有 hinge point 的 absolute value。",
        "### Breakpoints 外的 behavior",
        "当 \(x>R\) 时，每个 ReLU unit 要么一直 active，要么一直 inactive。因此整个 network 在 right tail 上变成 affine：",
        "$$\nf(x)=ax+c\\qquad x>R\n$$",
        "left tail 上也有同样的 affine behavior。",
        "### 和 quadratic 比较",
        "在 right tail 上，error 是",
        "$$\n|f(x)-x^2|=|ax+c-x^2|\n$$",
        "当 \(x\\to\\infty\)，\(x^2\) term dominates：",
        "$$\n|ax+c-x^2|\\to\\infty\n$$",
        "### Contradiction",
        "- Uniform approximation 要求 \(|f(x)-x^2|<\\epsilon\) 对每个 real x 成立。\n- 但 tail error 会任意大。\n- 因此 fixed finite-dimensional ReLU network 不能在整个 \(\\mathbb R\) 上满足要求。"
      ])
    },
    {
      id: "hw3-1-7",
      section: "Problem 1.7",
      title: { en: "Approximate x squared on the bounded interval [0,1] with ReLUs", cn: "在 bounded interval [0,1] 上用 ReLUs 近似 x squared" },
      original_excerpt: { en: "Detailed cue: for every epsilon, ask whether a finite ReLU network can approximate x^2 uniformly on [0,1], and describe a construction if yes.", cn: "题目要点：对任意 epsilon，判断 finite ReLU network 是否能在 [0,1] 上 uniformly approximate \(x^2\)，若可以则描述 construction。" },
      problem_understanding: { en: "The bounded interval changes the answer. A finite piecewise-linear function can uniformly approximate a smooth curve on a compact interval.", cn: "bounded interval 改变答案。finite piecewise-linear function 可以在 compact interval 上 uniformly approximate smooth curve。" },
      knowledge_points: { en: "Piecewise-linear interpolation of x^2 on a fine grid has error O(h^2). A ReLU network can represent any continuous piecewise-linear function by adding hinge slope changes.", cn: "在 fine grid 上对 \(x^2\) 做 piecewise-linear interpolation，error 是 \(O(h^2)\)。ReLU network 可以通过 hinge slope changes 表示 continuous piecewise-linear function。" },
      tips: { en: ["Use compactness of [0,1].", "Approximate by a polygonal line.", "Represent each kink with a shifted ReLU."], cn: ["用 [0,1] 的 compactness。", "先用 polygonal line 近似。", "每个 kink 用 shifted ReLU 表示。"] },
      detailed_solution: detail([
        "### Answer",
        "- Yes.",
        "### Build a grid",
        "Divide \([0,1]\) into \(N\) equal intervals:",
        "$$\n0,\\frac1N,\\frac2N,\\ldots,1\n$$",
        "The step size is",
        "$$\nh=\\frac1N\n$$",
        "### Piecewise-linear interpolation",
        "Connect the points",
        "$$\n\\left(\\frac{k}{N},\\left(\\frac{k}{N}\\right)^2\\right),\\qquad k=0,1,\\ldots,N\n$$",
        "This creates a continuous piecewise-linear function \(g_N(x)\).",
        "### Error size",
        "For \(x^2\), the second derivative is bounded:",
        "$$\n\\max_{x\\in[0,1]} |(x^2)''|=2\n$$",
        "The interpolation error on each interval is at most a constant times \(h^2\), for example",
        "$$\n\\|g_N-x^2\\|_\\infty\\le \\frac{h^2}{4}\n$$",
        "### Choose N",
        "Pick N large enough that",
        "$$\n\\frac{1}{4N^2}<\\epsilon\n$$",
        "### Represent with ReLUs",
        "- A continuous piecewise-linear function can be written as an affine term plus shifted ReLUs.\n- Each breakpoint contributes one term of the form \(c_k\\operatorname{ReLU}(x-k/N)\).\n- Therefore a finite ReLU network can implement \(g_N\).",
        "### Conclusion",
        "For every epsilon, choose a fine enough grid, build the piecewise-linear interpolant, and implement its breakpoints with ReLU units."
      ], [
        "### 答案",
        "- Yes。",
        "### 建 grid",
        "把 \([0,1]\) 分成 \(N\) 个 equal intervals：",
        "$$\n0,\\frac1N,\\frac2N,\\ldots,1\n$$",
        "step size 是",
        "$$\nh=\\frac1N\n$$",
        "### Piecewise-linear interpolation",
        "连接这些 points：",
        "$$\n\\left(\\frac{k}{N},\\left(\\frac{k}{N}\\right)^2\\right),\\qquad k=0,1,\\ldots,N\n$$",
        "得到 continuous piecewise-linear function \(g_N(x)\)。",
        "### Error size",
        "对 \(x^2\)，second derivative 有界：",
        "$$\n\\max_{x\\in[0,1]} |(x^2)''|=2\n$$",
        "每个 interval 上 interpolation error 至多是常数乘 \(h^2\)，例如",
        "$$\n\\|g_N-x^2\\|_\\infty\\le \\frac{h^2}{4}\n$$",
        "### 选择 N",
        "取 N 足够大，使得",
        "$$\n\\frac{1}{4N^2}<\\epsilon\n$$",
        "### 用 ReLUs 表示",
        "- continuous piecewise-linear function 可以写成 affine term 加 shifted ReLUs。\n- 每个 breakpoint 贡献一个 \(c_k\\operatorname{ReLU}(x-k/N)\)。\n- 因此 finite ReLU network 可以实现 \(g_N\)。",
        "### 结论",
        "对任意 epsilon，选足够细的 grid，构造 piecewise-linear interpolant，再用 ReLU units 实现它的 breakpoints。"
      ])
    }
  ]);

  add("backpropagation", [
    {
      id: "hw3-2-1-1",
      section: "Problem 2.1.1",
      title: { en: "Determine shapes in a two-layer binary classifier", cn: "确定 two-layer binary classifier 中各量的 shapes" },
      original_excerpt: { en: "Detailed cue: input dimension is 3, hidden layer has 4 neurons, output layer has 1 neuron; report shapes of W1, b1, W2, and the gradient with respect to W1.", cn: "题目要点：input dimension 为 3，hidden layer 有 4 个 neurons，output layer 有 1 个 neuron；报告 \(W^{(1)}\)、\(b^{(1)}\)、\(W^{(2)}\)、以及 \(\\partial L/\\partial W^{(1)}\) 的 shapes。" },
      problem_understanding: { en: "This is a dimension-checking question. Each linear layer maps from previous width to next width, and gradients match the parameter they differentiate.", cn: "这是 dimension-checking question。每个 linear layer 从 previous width 映射到 next width；gradient 的 shape 与被求导的 parameter 一致。" },
      knowledge_points: { en: "For z=Wx+b with x in R^d_in and z in R^d_out, W is d_out by d_in and b has d_out entries.", cn: "对 \(z=Wx+b\)，若 \(x\\in R^{d_{in}}\)、\(z\\in R^{d_{out}}\)，则 \(W\) 是 \(d_{out}\\times d_{in}\)，\(b\) 有 \(d_{out}\) 个 entries。" },
      tips: { en: ["Write the input and output width of each layer.", "Bias matches the pre-activation vector.", "Parameter gradients have the same shape as parameters."], cn: ["写出每层 input width 和 output width。", "bias shape 匹配 pre-activation vector。", "parameter gradients 与 parameters 同 shape。"] },
      detailed_solution: detail([
        "### First layer",
        "The input has dimension 3 and the hidden layer has 4 neurons. Therefore",
        "$$\nW^{(1)}\\in\\mathbb R^{4\\times3}\n$$",
        "The hidden pre-activation \(z^{(1)}\) has 4 entries, so",
        "$$\nb^{(1)}\\in\\mathbb R^4\n$$",
        "### Second layer",
        "The output layer has 1 neuron and receives the 4-dimensional hidden activation. Therefore",
        "$$\nW^{(2)}\\in\\mathbb R^{1\\times4}\n$$",
        "### Gradient shape",
        "A gradient with respect to a matrix has the same shape as that matrix:",
        "$$\n\\frac{\\partial L}{\\partial W^{(1)}}\\in\\mathbb R^{4\\times3}\n$$",
        "### Final list",
        "- \(W^{(1)}:4\\times3\)\n- \(b^{(1)}:4\)\n- \(W^{(2)}:1\\times4\)\n- \(\partial L/\partial W^{(1)}:4\\times3\)"
      ], [
        "### First layer",
        "input dimension 是 3，hidden layer 有 4 个 neurons。因此",
        "$$\nW^{(1)}\\in\\mathbb R^{4\\times3}\n$$",
        "hidden pre-activation \(z^{(1)}\) 有 4 个 entries，所以",
        "$$\nb^{(1)}\\in\\mathbb R^4\n$$",
        "### Second layer",
        "output layer 有 1 个 neuron，并接收 4-dimensional hidden activation。因此",
        "$$\nW^{(2)}\\in\\mathbb R^{1\\times4}\n$$",
        "### Gradient shape",
        "对 matrix 求导得到的 gradient 与该 matrix 同 shape：",
        "$$\n\\frac{\\partial L}{\\partial W^{(1)}}\\in\\mathbb R^{4\\times3}\n$$",
        "### Final list",
        "- \(W^{(1)}:4\\times3\)\n- \(b^{(1)}:4\)\n- \(W^{(2)}:1\\times4\)\n- \(\partial L/\partial W^{(1)}:4\\times3\)"
      ])
    },
    {
      id: "hw3-2-1-2",
      section: "Problem 2.1.2",
      title: { en: "Compute a full numerical forward and backward pass", cn: "计算完整 numerical forward 与 backward pass" },
      original_excerpt: { en: "Detailed cue: plug in x=(1,2,-1), a 4-by-3 first-layer matrix, zero biases, second-layer row [1,-1,0,1], and y=1; compute z1, a1, z2, dL/dW2, and dL/dW1.", cn: "题目要点：代入 \(x=(1,2,-1)\)、一个 4-by-3 first-layer matrix、zero biases、second-layer row \([1,-1,0,1]\)、以及 \(y=1\)；计算 \(z^{(1)}\)、\(a^{(1)}\)、\(z^{(2)}\)、\(\\partial L/\\partial W^{(2)}\)、\(\\partial L/\\partial W^{(1)}\)。" },
      problem_understanding: { en: "You must do forward propagation first, then apply binary-cross-entropy plus sigmoid simplification and backpropagate through the ReLU mask.", cn: "必须先做 forward propagation，再用 binary-cross-entropy plus sigmoid 的 simplification，并通过 ReLU mask 做 backpropagation。" },
      knowledge_points: { en: "For sigmoid plus binary cross-entropy, dL/dz equals yhat-y. ReLU passes gradients only where z is positive.", cn: "sigmoid plus binary cross-entropy 下，\(dL/dz=\\hat y-y\)。ReLU 只在 z 为 positive 的位置传 gradient。" },
      tips: { en: ["Compute z1 before applying ReLU.", "Use delta2=yhat-y.", "Mask the hidden gradient by z1>0 before forming dW1."], cn: ["先算 z1，再套 ReLU。", "使用 \(\delta_2=\\hat y-y\)。", "形成 dW1 前，用 \(z1>0\) mask hidden gradient。"] },
      detailed_solution: detail([
        "### Forward: first pre-activation",
        "$$\nx=\\begin{pmatrix}1\\\\2\\\\-1\\end{pmatrix}\n$$",
        "$$\nz^{(1)}=W^{(1)}x=\\begin{pmatrix}2\\\\1\\\\3\\\\-3\\end{pmatrix}\n$$",
        "### Forward: ReLU activation",
        "$$\na^{(1)}=\\operatorname{ReLU}(z^{(1)})=\\begin{pmatrix}2\\\\1\\\\3\\\\0\\end{pmatrix}\n$$",
        "### Forward: second pre-activation",
        "$$\nz^{(2)}=W^{(2)}a^{(1)}=[1,-1,0,1]\\begin{pmatrix}2\\\\1\\\\3\\\\0\\end{pmatrix}=1\n$$",
        "### Prediction",
        "$$\n\\hat y=\\sigma(1)=\\frac{1}{1+e^{-1}}\n$$",
        "### Output-layer error signal",
        "For sigmoid plus binary cross-entropy,",
        "$$\n\\delta_2=\\frac{\\partial L}{\\partial z^{(2)}}=\\hat y-y\n$$",
        "Since \(y=1\),",
        "$$\n\\delta_2=\\frac{1}{1+e^{-1}}-1=-\\frac{1}{1+e}\n$$",
        "### Gradient for \(W^{(2)}\)",
        "$$\n\\frac{\\partial L}{\\partial W^{(2)}}=\\delta_2(a^{(1)})^\\top\n$$",
        "$$\n\\frac{\\partial L}{\\partial W^{(2)}}=-\\frac{1}{1+e}[2,1,3,0]\n$$",
        "$$\n\\frac{\\partial L}{\\partial W^{(2)}}=\\left[-\\frac{2}{1+e},-\\frac{1}{1+e},-\\frac{3}{1+e},0\\right]\n$$",
        "### Backpropagate to hidden activation",
        "$$\n\\frac{\\partial L}{\\partial a^{(1)}}=\\delta_2(W^{(2)})^\\top=-\\frac{1}{1+e}\\begin{pmatrix}1\\\\-1\\\\0\\\\1\\end{pmatrix}\n$$",
        "$$\n\\frac{\\partial L}{\\partial a^{(1)}}=\\begin{pmatrix}-\\frac{1}{1+e}\\\\\\frac{1}{1+e}\\\\0\\\\-\\frac{1}{1+e}\\end{pmatrix}\n$$",
        "### Apply the ReLU mask",
        "$$\nz^{(1)}=(2,1,3,-3)^\\top\\quad\\Rightarrow\\quad \\mathbf 1[z^{(1)}>0]=(1,1,1,0)^\\top\n$$",
        "$$\n\\frac{\\partial L}{\\partial z^{(1)}}=\\begin{pmatrix}-\\frac{1}{1+e}\\\\\\frac{1}{1+e}\\\\0\\\\0\\end{pmatrix}\n$$",
        "### Gradient for \(W^{(1)}\)",
        "$$\n\\frac{\\partial L}{\\partial W^{(1)}}=\\frac{\\partial L}{\\partial z^{(1)}}x^\\top\n$$",
        "$$\n\\frac{\\partial L}{\\partial W^{(1)}}=\n\\begin{pmatrix}\n-\\frac{1}{1+e}\\\\\n\\frac{1}{1+e}\\\\\n0\\\\\n0\n\\end{pmatrix}\n[1,2,-1]\n$$",
        "$$\n\\frac{\\partial L}{\\partial W^{(1)}}=\n\\begin{pmatrix}\n-\\frac{1}{1+e}&-\\frac{2}{1+e}&\\frac{1}{1+e}\\\\\n\\frac{1}{1+e}&\\frac{2}{1+e}&-\\frac{1}{1+e}\\\\\n0&0&0\\\\\n0&0&0\n\\end{pmatrix}\n$$"
      ], [
        "### Forward: first pre-activation",
        "$$\nx=\\begin{pmatrix}1\\\\2\\\\-1\\end{pmatrix}\n$$",
        "$$\nz^{(1)}=W^{(1)}x=\\begin{pmatrix}2\\\\1\\\\3\\\\-3\\end{pmatrix}\n$$",
        "### Forward: ReLU activation",
        "$$\na^{(1)}=\\operatorname{ReLU}(z^{(1)})=\\begin{pmatrix}2\\\\1\\\\3\\\\0\\end{pmatrix}\n$$",
        "### Forward: second pre-activation",
        "$$\nz^{(2)}=W^{(2)}a^{(1)}=[1,-1,0,1]\\begin{pmatrix}2\\\\1\\\\3\\\\0\\end{pmatrix}=1\n$$",
        "### Prediction",
        "$$\n\\hat y=\\sigma(1)=\\frac{1}{1+e^{-1}}\n$$",
        "### Output-layer error signal",
        "对 sigmoid plus binary cross-entropy，",
        "$$\n\\delta_2=\\frac{\\partial L}{\\partial z^{(2)}}=\\hat y-y\n$$",
        "因为 \(y=1\)，",
        "$$\n\\delta_2=\\frac{1}{1+e^{-1}}-1=-\\frac{1}{1+e}\n$$",
        "### \(W^{(2)}\) 的 gradient",
        "$$\n\\frac{\\partial L}{\\partial W^{(2)}}=\\delta_2(a^{(1)})^\\top\n$$",
        "$$\n\\frac{\\partial L}{\\partial W^{(2)}}=-\\frac{1}{1+e}[2,1,3,0]\n$$",
        "$$\n\\frac{\\partial L}{\\partial W^{(2)}}=\\left[-\\frac{2}{1+e},-\\frac{1}{1+e},-\\frac{3}{1+e},0\\right]\n$$",
        "### Backpropagate 到 hidden activation",
        "$$\n\\frac{\\partial L}{\\partial a^{(1)}}=\\delta_2(W^{(2)})^\\top=-\\frac{1}{1+e}\\begin{pmatrix}1\\\\-1\\\\0\\\\1\\end{pmatrix}\n$$",
        "$$\n\\frac{\\partial L}{\\partial a^{(1)}}=\\begin{pmatrix}-\\frac{1}{1+e}\\\\\\frac{1}{1+e}\\\\0\\\\-\\frac{1}{1+e}\\end{pmatrix}\n$$",
        "### 套 ReLU mask",
        "$$\nz^{(1)}=(2,1,3,-3)^\\top\\quad\\Rightarrow\\quad \\mathbf 1[z^{(1)}>0]=(1,1,1,0)^\\top\n$$",
        "$$\n\\frac{\\partial L}{\\partial z^{(1)}}=\\begin{pmatrix}-\\frac{1}{1+e}\\\\\\frac{1}{1+e}\\\\0\\\\0\\end{pmatrix}\n$$",
        "### \(W^{(1)}\) 的 gradient",
        "$$\n\\frac{\\partial L}{\\partial W^{(1)}}=\\frac{\\partial L}{\\partial z^{(1)}}x^\\top\n$$",
        "$$\n\\frac{\\partial L}{\\partial W^{(1)}}=\n\\begin{pmatrix}\n-\\frac{1}{1+e}\\\\\n\\frac{1}{1+e}\\\\\n0\\\\\n0\n\\end{pmatrix}\n[1,2,-1]\n$$",
        "$$\n\\frac{\\partial L}{\\partial W^{(1)}}=\n\\begin{pmatrix}\n-\\frac{1}{1+e}&-\\frac{2}{1+e}&\\frac{1}{1+e}\\\\\n\\frac{1}{1+e}&\\frac{2}{1+e}&-\\frac{1}{1+e}\\\\\n0&0&0\\\\\n0&0&0\n\\end{pmatrix}\n$$"
      ])
    }
  ]);

  add("rnn", [
    {
      id: "hw3-2-2-1",
      section: "Problem 2.2.1",
      title: { en: "Unroll the scalar RNN computation graph for three steps", cn: "展开 scalar RNN 的 three-step computation graph" },
      original_excerpt: { en: "Detailed cue: recurrence h_t=w(x_t+h_{t-1}) with h0=0; draw the three-step unrolled graph including x1,x2,x3, h0 through h3, and intermediate y_t=x_t+h_{t-1}.", cn: "题目要点：recurrence 为 \(h_t=w(x_t+h_{t-1})\)，且 \(h_0=0\)；展开 three steps，包含 \(x_1,x_2,x_3\)、\(h_0\) 到 \(h_3\)，以及 intermediate \(y_t=x_t+h_{t-1}\)。" },
      problem_understanding: { en: "The drawing should show that the same parameter w is reused at every time step, while the hidden state carries information forward.", cn: "图应该体现同一个 parameter w 在每个 timestep 被 reused，同时 hidden state 把信息向前传。" },
      knowledge_points: { en: "Unrolling an RNN turns time into a feedforward computation graph with shared weights. Each cell computes y_t first, then h_t=w y_t.", cn: "Unrolling RNN 会把 time 展成 feedforward computation graph，但 weights shared。每个 cell 先算 \(y_t\)，再算 \(h_t=w y_t\)。" },
      tips: { en: ["Create one cell per time step.", "Show y_t as the addition node.", "Draw w as the same shared multiplier in all cells."], cn: ["每个 timestep 画一个 cell。", "把 \(y_t\) 画成 addition node。", "把 w 画成所有 cells 共享的 multiplier。"] },
      detailed_solution: detail([
        "### Recurrence",
        "$$\ny_t=x_t+h_{t-1},\\qquad h_t=wy_t\n$$",
        "with",
        "$$\nh_0=0\n$$",
        "### Step 1",
        "$$\nx_1,h_0\\longrightarrow y_1=x_1+h_0\\longrightarrow h_1=wy_1\n$$",
        "### Step 2",
        "$$\nx_2,h_1\\longrightarrow y_2=x_2+h_1\\longrightarrow h_2=wy_2\n$$",
        "### Step 3",
        "$$\nx_3,h_2\\longrightarrow y_3=x_3+h_2\\longrightarrow h_3=wy_3\n$$",
        "### Text version of the graph",
        "- \(h_0\) and \(x_1\) feed into the addition node \(y_1\).\n- \(y_1\) feeds into a multiplication by the shared scalar \(w\), producing \(h_1\).\n- \(h_1\) and \(x_2\) feed into \(y_2\), then the same \(w\) produces \(h_2\).\n- \(h_2\) and \(x_3\) feed into \(y_3\), then the same \(w\) produces \(h_3\).",
        "### Key point",
        "The graph has three repeated cells, but only one shared parameter \(w\)."
      ], [
        "### Recurrence",
        "$$\ny_t=x_t+h_{t-1},\\qquad h_t=wy_t\n$$",
        "并且",
        "$$\nh_0=0\n$$",
        "### Step 1",
        "$$\nx_1,h_0\\longrightarrow y_1=x_1+h_0\\longrightarrow h_1=wy_1\n$$",
        "### Step 2",
        "$$\nx_2,h_1\\longrightarrow y_2=x_2+h_1\\longrightarrow h_2=wy_2\n$$",
        "### Step 3",
        "$$\nx_3,h_2\\longrightarrow y_3=x_3+h_2\\longrightarrow h_3=wy_3\n$$",
        "### Graph 的文字版",
        "- \(h_0\) 和 \(x_1\) 进入 addition node \(y_1\)。\n- \(y_1\) 进入 shared scalar \(w\) 的 multiplication，得到 \(h_1\)。\n- \(h_1\) 和 \(x_2\) 进入 \(y_2\)，再用同一个 \(w\) 得到 \(h_2\)。\n- \(h_2\) 和 \(x_3\) 进入 \(y_3\)，再用同一个 \(w\) 得到 \(h_3\)。",
        "### Key point",
        "graph 有三个 repeated cells，但只有一个 shared parameter \(w\)。"
      ])
    },
    {
      id: "hw3-2-2-2",
      section: "Problem 2.2.2",
      title: { en: "Compute the scalar RNN forward pass for three steps", cn: "计算 scalar RNN 的 three-step forward pass" },
      original_excerpt: { en: "Detailed cue: using h_t=w(x_t+h_{t-1}) and y_t=x_t+h_{t-1}, express h0,h1,h2,h3 and y1,y2,y3 in terms of w and the three inputs.", cn: "题目要点：使用 \(h_t=w(x_t+h_{t-1})\) 和 \(y_t=x_t+h_{t-1}\)，把 \(h_0,h_1,h_2,h_3\) 与 \(y_1,y_2,y_3\) 写成 w 和三个 inputs 的函数。" },
      problem_understanding: { en: "This is repeated substitution through the unrolled graph.", cn: "这是沿着 unrolled graph 做 repeated substitution。" },
      knowledge_points: { en: "Earlier inputs get multiplied by higher powers of w because they pass through more recurrent transitions.", cn: "更早的 inputs 会乘上更高次的 \(w\)，因为它们经过更多 recurrent transitions。" },
      tips: { en: ["Start with h0=0.", "Compute y_t before h_t at each step.", "Check powers of w by how far each input travels."], cn: ["从 \(h_0=0\) 开始。", "每一步先算 \(y_t\)，再算 \(h_t\)。", "用 input 传了几步来检查 w 的幂次。"] },
      detailed_solution: detail([
        "### Initial state",
        "$$\nh_0=0\n$$",
        "### Step 1",
        "$$\ny_1=x_1+h_0=x_1\n$$",
        "$$\nh_1=wy_1=wx_1\n$$",
        "### Step 2",
        "$$\ny_2=x_2+h_1=x_2+wx_1\n$$",
        "$$\nh_2=wy_2=w(x_2+wx_1)=wx_2+w^2x_1\n$$",
        "### Step 3",
        "$$\ny_3=x_3+h_2=x_3+wx_2+w^2x_1\n$$",
        "$$\nh_3=wy_3=wx_3+w^2x_2+w^3x_1\n$$",
        "### Final list",
        "- \(y_1=x_1\), \(h_1=wx_1\)\n- \(y_2=x_2+wx_1\), \(h_2=wx_2+w^2x_1\)\n- \(y_3=x_3+wx_2+w^2x_1\), \(h_3=wx_3+w^2x_2+w^3x_1\)"
      ], [
        "### Initial state",
        "$$\nh_0=0\n$$",
        "### Step 1",
        "$$\ny_1=x_1+h_0=x_1\n$$",
        "$$\nh_1=wy_1=wx_1\n$$",
        "### Step 2",
        "$$\ny_2=x_2+h_1=x_2+wx_1\n$$",
        "$$\nh_2=wy_2=w(x_2+wx_1)=wx_2+w^2x_1\n$$",
        "### Step 3",
        "$$\ny_3=x_3+h_2=x_3+wx_2+w^2x_1\n$$",
        "$$\nh_3=wy_3=wx_3+w^2x_2+w^3x_1\n$$",
        "### Final list",
        "- \(y_1=x_1\), \(h_1=wx_1\)\n- \(y_2=x_2+wx_1\), \(h_2=wx_2+w^2x_1\)\n- \(y_3=x_3+wx_2+w^2x_1\), \(h_3=wx_3+w^2x_2+w^3x_1\)"
      ])
    },
    {
      id: "hw3-2-2-3",
      section: "Problem 2.2.3",
      title: { en: "Backpropagate through the scalar RNN to find dh3/dw", cn: "通过 scalar RNN backpropagate 求 dh3/dw" },
      original_excerpt: { en: "Detailed cue: compute partial h3 over partial w using a backward pass, while showing intermediate local derivatives rather than only differentiating the closed form.", cn: "题目要点：用 backward pass 计算 \(\\partial h_3/\\partial w\)，需要展示 intermediate local derivatives，不能只对 closed form 直接求导。" },
      problem_understanding: { en: "The shared parameter w affects h3 at every time step, so the total derivative is the sum of contributions from t=1,2,3.", cn: "shared parameter w 在每个 timestep 都影响 \(h_3\)，所以 total derivative 是 t=1,2,3 各处 contribution 的和。" },
      knowledge_points: { en: "BPTT is ordinary chain rule on the unrolled graph with parameter sharing. Local derivatives include partial h_t/partial w=y_t and partial h_t/partial h_{t-1}=w.", cn: "BPTT 是在 unrolled graph 上做普通 chain rule，但 parameter sharing。local derivatives 包括 \(\partial h_t/\partial w=y_t\) 和 \(\partial h_t/\partial h_{t-1}=w\)。" },
      tips: { en: ["Write the local derivatives first.", "Add all paths from w to h3.", "Substitute y1,y2,y3 at the end."], cn: ["先写 local derivatives。", "把 w 到 h3 的所有 paths 加起来。", "最后再代入 y1,y2,y3。"] },
      detailed_solution: detail([
        "### Local derivatives",
        "Because \(h_t=wy_t\),",
        "$$\n\\frac{\\partial h_t}{\\partial w}=y_t\n$$",
        "and because \(y_t=x_t+h_{t-1}\),",
        "$$\n\\frac{\\partial h_t}{\\partial h_{t-1}}=w\n$$",
        "### Contributions to \(h_3\)",
        "- Direct contribution at time 3: \(y_3\).\n- Contribution through time 2: \((\\partial h_3/\\partial h_2)(\\partial h_2/\\partial w)=w y_2\).\n- Contribution through time 1: \((\\partial h_3/\\partial h_2)(\\partial h_2/\\partial h_1)(\\partial h_1/\\partial w)=w^2 y_1\).",
        "### Add them",
        "$$\n\\frac{\\partial h_3}{\\partial w}=y_3+wy_2+w^2y_1\n$$",
        "### Substitute forward-pass values",
        "$$\ny_1=x_1\n$$",
        "$$\ny_2=x_2+wx_1\n$$",
        "$$\ny_3=x_3+wx_2+w^2x_1\n$$",
        "### Simplify",
        "$$\n\\frac{\\partial h_3}{\\partial w}=x_3+wx_2+w^2x_1+w(x_2+wx_1)+w^2x_1\n$$",
        "$$\n\\frac{\\partial h_3}{\\partial w}=x_3+2wx_2+3w^2x_1\n$$",
        "### Check",
        "This matches directly differentiating \(h_3=wx_3+w^2x_2+w^3x_1\), but the derivation above shows the BPTT paths."
      ], [
        "### Local derivatives",
        "因为 \(h_t=wy_t\)，",
        "$$\n\\frac{\\partial h_t}{\\partial w}=y_t\n$$",
        "又因为 \(y_t=x_t+h_{t-1}\)，",
        "$$\n\\frac{\\partial h_t}{\\partial h_{t-1}}=w\n$$",
        "### 对 \(h_3\) 的 contributions",
        "- time 3 的 direct contribution：\(y_3\)。\n- 通过 time 2 的 contribution：\((\\partial h_3/\\partial h_2)(\\partial h_2/\\partial w)=w y_2\)。\n- 通过 time 1 的 contribution：\((\\partial h_3/\\partial h_2)(\\partial h_2/\\partial h_1)(\\partial h_1/\\partial w)=w^2 y_1\)。",
        "### 加起来",
        "$$\n\\frac{\\partial h_3}{\\partial w}=y_3+wy_2+w^2y_1\n$$",
        "### 代入 forward-pass values",
        "$$\ny_1=x_1\n$$",
        "$$\ny_2=x_2+wx_1\n$$",
        "$$\ny_3=x_3+wx_2+w^2x_1\n$$",
        "### Simplify",
        "$$\n\\frac{\\partial h_3}{\\partial w}=x_3+wx_2+w^2x_1+w(x_2+wx_1)+w^2x_1\n$$",
        "$$\n\\frac{\\partial h_3}{\\partial w}=x_3+2wx_2+3w^2x_1\n$$",
        "### Check",
        "这和直接对 \(h_3=wx_3+w^2x_2+w^3x_1\) 求导一致，但上面的推导展示了 BPTT paths。"
      ])
    },
    {
      id: "hw3-2-2-4",
      section: "Problem 2.2.4",
      title: { en: "Derive the hidden-state gradient product in a nonlinear RNN", cn: "推导 nonlinear RNN 中 hidden-state gradient product" },
      original_excerpt: { en: "Detailed cue: for sequence x1 through xT and h_t=w sigma(x_t+h_{t-1}), derive partial f over partial h1 and partial hT over partial h1, using sigma prime notation.", cn: "题目要点：对 sequence \(x_1\\) 到 \(x_T\) 和 \(h_t=w\\sigma(x_t+h_{t-1})\)，用 sigma prime 推导 \(\\partial f/\\partial h_1\) 与 \(\\partial h_T/\\partial h_1\)。" },
      problem_understanding: { en: "Since f(z)=hT, both requested derivatives are the same chain product from h1 to hT.", cn: "因为 \(f(z)=h_T\)，两个 requested derivatives 都是从 \(h_1\) 到 \(h_T\) 的同一个 chain product。" },
      knowledge_points: { en: "For each transition, local derivative with respect to the previous hidden state is w sigma prime evaluated at x_t+h_{t-1}. Multiplying these local derivatives gives the long-term gradient.", cn: "每个 transition 对 previous hidden state 的 local derivative 是 \(w\\sigma'\) evaluated at \(x_t+h_{t-1}\)。这些 local derivatives 相乘就是 long-term gradient。" },
      tips: { en: ["Differentiate one recurrent step first.", "Multiply steps t=2 through T.", "Use f=hT to identify the two derivatives."], cn: ["先 differentiate 一个 recurrent step。", "把 t=2 到 T 的 steps 相乘。", "用 \(f=h_T\) 识别两个 derivatives 相同。"] },
      detailed_solution: detail([
        "### Recurrence",
        "$$\nh_t=w\\sigma(x_t+h_{t-1})\n$$",
        "### Local derivative",
        "Differentiate \(h_t\) with respect to \(h_{t-1}\):",
        "$$\n\\frac{\\partial h_t}{\\partial h_{t-1}}=w\\sigma'(x_t+h_{t-1})\n$$",
        "### Chain from \(h_1\) to \(h_T\)",
        "$$\n\\frac{\\partial h_T}{\\partial h_1}=\\frac{\\partial h_T}{\\partial h_{T-1}}\\frac{\\partial h_{T-1}}{\\partial h_{T-2}}\\cdots\\frac{\\partial h_2}{\\partial h_1}\n$$",
        "### Substitute local derivatives",
        "$$\n\\frac{\\partial h_T}{\\partial h_1}=\\prod_{t=2}^{T}w\\sigma'(x_t+h_{t-1})\n$$",
        "Equivalently,",
        "$$\n\\frac{\\partial h_T}{\\partial h_1}=w^{T-1}\\prod_{t=2}^{T}\\sigma'(x_t+h_{t-1})\n$$",
        "### Use \(f(z)=h_T\)",
        "$$\n\\frac{\\partial f}{\\partial h_1}=\\frac{\\partial h_T}{\\partial h_1}\n$$",
        "### Final",
        "$$\n\\frac{\\partial f}{\\partial h_1}=\\frac{\\partial h_T}{\\partial h_1}=\\prod_{t=2}^{T}w\\sigma'(x_t+h_{t-1})\n$$"
      ], [
        "### Recurrence",
        "$$\nh_t=w\\sigma(x_t+h_{t-1})\n$$",
        "### Local derivative",
        "对 \(h_{t-1}\) differentiate \(h_t\)：",
        "$$\n\\frac{\\partial h_t}{\\partial h_{t-1}}=w\\sigma'(x_t+h_{t-1})\n$$",
        "### 从 \(h_1\) 到 \(h_T\) 的 chain",
        "$$\n\\frac{\\partial h_T}{\\partial h_1}=\\frac{\\partial h_T}{\\partial h_{T-1}}\\frac{\\partial h_{T-1}}{\\partial h_{T-2}}\\cdots\\frac{\\partial h_2}{\\partial h_1}\n$$",
        "### 代入 local derivatives",
        "$$\n\\frac{\\partial h_T}{\\partial h_1}=\\prod_{t=2}^{T}w\\sigma'(x_t+h_{t-1})\n$$",
        "等价地，",
        "$$\n\\frac{\\partial h_T}{\\partial h_1}=w^{T-1}\\prod_{t=2}^{T}\\sigma'(x_t+h_{t-1})\n$$",
        "### 使用 \(f(z)=h_T\)",
        "$$\n\\frac{\\partial f}{\\partial h_1}=\\frac{\\partial h_T}{\\partial h_1}\n$$",
        "### Final",
        "$$\n\\frac{\\partial f}{\\partial h_1}=\\frac{\\partial h_T}{\\partial h_1}=\\prod_{t=2}^{T}w\\sigma'(x_t+h_{t-1})\n$$"
      ])
    },
    {
      id: "hw3-2-2-5",
      section: "Problem 2.2.5",
      title: { en: "Explain exploding and vanishing gradients from the RNN product", cn: "用 RNN gradient product 解释 exploding / vanishing gradients" },
      original_excerpt: { en: "Detailed cue: use the product from the previous subproblem to explain why long RNN sequences can make gradients shrink toward zero or blow up.", cn: "题目要点：使用上一小题的 product，解释为什么 long RNN sequences 会让 gradients shrink toward zero 或 blow up。" },
      problem_understanding: { en: "The issue is repeated multiplication. Even moderate factors become tiny or huge when multiplied many times.", cn: "核心问题是 repeated multiplication。即使每个 factor 不极端，乘很多次后也会变得很小或很大。" },
      knowledge_points: { en: "The gradient contains products of w sigma prime. If the typical magnitude is below 1, gradients vanish; if above 1, gradients explode.", cn: "gradient 包含 \(w\\sigma'\) 的 product。如果 typical magnitude 小于 1，gradients vanish；如果大于 1，gradients explode。" },
      tips: { en: ["Point to the product formula.", "Discuss magnitudes, not signs only.", "Connect the result to long-term dependency learning."], cn: ["指向 product formula。", "讨论 magnitudes，不只看 signs。", "把结果联系到 long-term dependency learning。"] },
      detailed_solution: detail([
        "### Product from the previous part",
        "$$\n\\frac{\\partial h_T}{\\partial h_1}=\\prod_{t=2}^{T}w\\sigma'(x_t+h_{t-1})\n$$",
        "### Vanishing case",
        "If most factors have magnitude less than 1, then",
        "$$\n\\left|w\\sigma'(x_t+h_{t-1})\\right|<1\n$$",
        "Repeated multiplication drives the product toward zero as T grows.",
        "### Consequence of vanishing",
        "- Early hidden states receive almost no gradient.\n- The model struggles to learn dependencies from far in the past.",
        "### Exploding case",
        "If most factors have magnitude greater than 1, then repeated multiplication grows exponentially with T.",
        "### Consequence of exploding",
        "- Gradients can become extremely large.\n- Optimization becomes unstable and parameter updates can overshoot.",
        "### Conclusion",
        "The same chain product explains both problems: long RNNs repeatedly multiply local derivatives, so gradient magnitude can decay or grow exponentially with sequence length."
      ], [
        "### 来自上一问的 product",
        "$$\n\\frac{\\partial h_T}{\\partial h_1}=\\prod_{t=2}^{T}w\\sigma'(x_t+h_{t-1})\n$$",
        "### Vanishing case",
        "如果多数 factors 的 magnitude 小于 1，即",
        "$$\n\\left|w\\sigma'(x_t+h_{t-1})\\right|<1\n$$",
        "随着 T 增大，repeated multiplication 会把 product 推向 0。",
        "### Vanishing 的后果",
        "- early hidden states 几乎收不到 gradient。\n- model 很难学习 far past 的 dependencies。",
        "### Exploding case",
        "如果多数 factors 的 magnitude 大于 1，repeated multiplication 会随 T exponential growth。",
        "### Exploding 的后果",
        "- gradients 可能变得非常大。\n- optimization 不稳定，parameter updates 可能 overshoot。",
        "### 结论",
        "同一个 chain product 解释了两个问题：long RNNs 会反复乘 local derivatives，所以 gradient magnitude 会随 sequence length 指数级 shrink 或 grow。"
      ])
    }
  ]);

  add("cnn", [
    {
      id: "hw3-3-1-1",
      section: "Problem 3.1.1",
      title: { en: "Find convolution output shape and parameter count", cn: "计算 convolution output shape 与 parameter count" },
      original_excerpt: { en: "Detailed cue: input is C by H by W equal to 3 by 32 by 32; convolution has 16 filters, 3 by 3 kernels, stride 1, padding 1, and bias terms.", cn: "题目要点：input 为 \(C\\times H\\times W=3\\times32\\times32\)；convolution 有 16 filters、\(3\\times3\) kernels、stride 1、padding 1，并包含 bias terms。" },
      problem_understanding: { en: "Compute spatial size using the convolution output formula, then count weights per filter and multiply by the number of filters.", cn: "先用 convolution output formula 计算 spatial size，再数每个 filter 的 weights，并乘以 filters 数量。" },
      knowledge_points: { en: "For one spatial dimension, output size is floor((N+2P-F)/S)+1. Parameters per filter are kernel height times kernel width times input channels, plus one bias.", cn: "单个 spatial dimension 的 output size 是 \(\lfloor(N+2P-F)/S\rfloor+1\)。每个 filter 的 parameters 是 kernel height × kernel width × input channels，再加一个 bias。" },
      tips: { en: ["Output channels equal number of filters.", "Apply the size formula to height and width separately.", "Do not forget one bias per filter."], cn: ["output channels 等于 filters 数量。", "height 和 width 分别套 size formula。", "不要忘记每个 filter 一个 bias。"] },
      detailed_solution: detail([
        "### Spatial size formula",
        "$$\nN_{out}=\\left\\lfloor\\frac{N+2P-F}{S}\\right\\rfloor+1\n$$",
        "### Height",
        "$$\nH_{out}=\\left\\lfloor\\frac{32+2(1)-3}{1}\\right\\rfloor+1=32\n$$",
        "### Width",
        "$$\nW_{out}=\\left\\lfloor\\frac{32+2(1)-3}{1}\\right\\rfloor+1=32\n$$",
        "### Channels",
        "There are 16 filters, so",
        "$$\nC_{out}=16\n$$",
        "### Output feature map",
        "$$\n16\\times32\\times32\n$$",
        "### Parameters per filter",
        "Each filter sees all 3 input channels:",
        "$$\n3\\times3\\times3=27\n$$",
        "Add one bias:",
        "$$\n27+1=28\n$$",
        "### Total parameters",
        "$$\n16\\times28=448\n$$"
      ], [
        "### Spatial size formula",
        "$$\nN_{out}=\\left\\lfloor\\frac{N+2P-F}{S}\\right\\rfloor+1\n$$",
        "### Height",
        "$$\nH_{out}=\\left\\lfloor\\frac{32+2(1)-3}{1}\\right\\rfloor+1=32\n$$",
        "### Width",
        "$$\nW_{out}=\\left\\lfloor\\frac{32+2(1)-3}{1}\\right\\rfloor+1=32\n$$",
        "### Channels",
        "有 16 个 filters，所以",
        "$$\nC_{out}=16\n$$",
        "### Output feature map",
        "$$\n16\\times32\\times32\n$$",
        "### 每个 filter 的 parameters",
        "每个 filter 连接所有 3 个 input channels：",
        "$$\n3\\times3\\times3=27\n$$",
        "加一个 bias：",
        "$$\n27+1=28\n$$",
        "### Total parameters",
        "$$\n16\\times28=448\n$$"
      ])
    },
    {
      id: "hw3-3-1-2",
      section: "Problem 3.1.2",
      title: { en: "Compute a stride-2 averaging convolution on a 4 by 4 map", cn: "计算 4 by 4 map 上的 stride-2 averaging convolution" },
      original_excerpt: { en: "Detailed cue: single-channel 4 by 4 input; 2 by 2 kernel with every entry 0.25; stride 2, no padding, no bias; compute output size, all output values, and compare to average pooling.", cn: "题目要点：single-channel \(4\\times4\) input；\(2\\times2\) kernel 每个 entry 都是 0.25；stride 2、no padding、no bias；计算 output size、全部 output values，并比较 average pooling。" },
      problem_understanding: { en: "The kernel averages each non-overlapping 2 by 2 block, so the operation behaves like average pooling for this configuration.", cn: "这个 kernel 对每个 non-overlapping \(2\\times2\) block 求 average，所以在这个 configuration 下等同于 average pooling。" },
      knowledge_points: { en: "Stride 2 with a 2 by 2 kernel on a 4 by 4 input produces a 2 by 2 output. A kernel filled with 1/4 computes the mean of each 2 by 2 patch.", cn: "stride 2、\(2\\times2\) kernel 作用在 \(4\\times4\) input 上产生 \(2\\times2\) output。全为 1/4 的 kernel 计算每个 \(2\\times2\) patch 的 mean。" },
      tips: { en: ["Use the output-size formula first.", "List the four 2 by 2 patches.", "Average pooling requires fixed equal weights and no bias."], cn: ["先用 output-size formula。", "列出四个 \(2\\times2\) patches。", "average pooling 需要 fixed equal weights 且 no bias。"] },
      detailed_solution: detail([
        "### Output size",
        "$$\nH_{out}=W_{out}=\\left\\lfloor\\frac{4-2}{2}\\right\\rfloor+1=2\n$$",
        "So the output is \(2\\times2\).",
        "### Kernel action",
        "Every output is",
        "$$\n\\frac14\\times\\text{sum of the corresponding }2\\times2\\text{ patch}\n$$",
        "### Top-left output",
        "$$\nY_{11}=\\frac14(1+2+0+1)=1\n$$",
        "### Top-right output",
        "$$\nY_{12}=\\frac14(0+3+3+1)=\\frac74=1.75\n$$",
        "### Bottom-left output",
        "$$\nY_{21}=\\frac14(2+1+2+1)=\\frac64=1.5\n$$",
        "### Bottom-right output",
        "$$\nY_{22}=\\frac14(1+3+3+1)=2\n$$",
        "### Output map",
        "$$\nY=\\begin{pmatrix}1&1.75\\\\1.5&2\\end{pmatrix}\n$$",
        "### Average-pooling comparison",
        "- The kernel computes the mean of each \(2\\times2\) patch.\n- The stride is also 2, so patches are the same non-overlapping windows used by \(2\\times2\) average pooling.\n- With no bias and fixed weights, this convolution performs the same operation as average pooling here."
      ], [
        "### Output size",
        "$$\nH_{out}=W_{out}=\\left\\lfloor\\frac{4-2}{2}\\right\\rfloor+1=2\n$$",
        "所以 output 是 \(2\\times2\)。",
        "### Kernel action",
        "每个 output 都是",
        "$$\n\\frac14\\times\\text{对应 }2\\times2\\text{ patch 的 sum}\n$$",
        "### Top-left output",
        "$$\nY_{11}=\\frac14(1+2+0+1)=1\n$$",
        "### Top-right output",
        "$$\nY_{12}=\\frac14(0+3+3+1)=\\frac74=1.75\n$$",
        "### Bottom-left output",
        "$$\nY_{21}=\\frac14(2+1+2+1)=\\frac64=1.5\n$$",
        "### Bottom-right output",
        "$$\nY_{22}=\\frac14(1+3+3+1)=2\n$$",
        "### Output map",
        "$$\nY=\\begin{pmatrix}1&1.75\\\\1.5&2\\end{pmatrix}\n$$",
        "### 和 average pooling 比较",
        "- kernel 计算每个 \(2\\times2\) patch 的 mean。\n- stride 也是 2，所以 patches 正好是 \(2\\times2\) average pooling 的 non-overlapping windows。\n- 在 no bias 且 fixed weights 的情况下，这个 convolution 在这里与 average pooling 相同。"
      ])
    },
    {
      id: "hw3-3-2-1",
      section: "Problem 3.2.1",
      title: { en: "Compute 2 by 2 max pooling with and without padding", cn: "计算 2 by 2 max pooling 的 no-padding 与 padding 情况" },
      original_excerpt: { en: "Detailed cue: 4 by 4 input with entries 1 through 16 arranged in rows; apply 2 by 2 max pooling with stride 2; compare no padding with zero padding of 1.", cn: "题目要点：\(4\\times4\) input，entries 1 到 16 按 rows 排列；应用 \(2\\times2\) max pooling with stride 2；比较 no padding 与 zero padding of 1。" },
      problem_understanding: { en: "Without padding, there are four non-overlapping windows. With padding 1, the input becomes 6 by 6 and the stride-2 windows produce a 3 by 3 output.", cn: "no padding 时有四个 non-overlapping windows。padding 1 后 input 变成 \(6\\times6\)，stride-2 windows 产生 \(3\\times3\) output。" },
      knowledge_points: { en: "Max pooling outputs the maximum value in each window. Padding adds zeros around the border before the windows are placed.", cn: "Max pooling 输出每个 window 中的 maximum value。Padding 会先在 border 周围加 zeros，再放置 windows。" },
      tips: { en: ["Write the pooling windows explicitly.", "Padding changes the input size before pooling.", "Use floor in the output-size formula."], cn: ["明确写出 pooling windows。", "padding 会先改变 input size。", "output-size formula 使用 floor。"] },
      detailed_solution: detail([
        "### No padding: output size",
        "$$\n\\left\\lfloor\\frac{4-2}{2}\\right\\rfloor+1=2\n$$",
        "So the output is \(2\\times2\).",
        "### No padding: windows",
        "$$\n\\max\\{1,3,5,6\\}=6\n$$",
        "$$\n\\max\\{2,4,7,8\\}=8\n$$",
        "$$\n\\max\\{9,10,13,14\\}=14\n$$",
        "$$\n\\max\\{11,12,15,16\\}=16\n$$",
        "### No-padding result",
        "$$\n\\begin{pmatrix}6&8\\\\14&16\\end{pmatrix}\n$$",
        "### Padding 1: output size",
        "Padding 1 changes \(4\\times4\) into \(6\\times6\):",
        "$$\n\\left\\lfloor\\frac{6-2}{2}\\right\\rfloor+1=3\n$$",
        "So the padded output is \(3\\times3\).",
        "### Padding 1: max values",
        "$$\n\\begin{pmatrix}\n1&3&4\\\\\n9&11&12\\\\\n13&15&16\n\\end{pmatrix}\n$$",
        "### Why border values appear",
        "- The new border windows include zeros from padding.\n- Since the original entries are positive, the maximum usually comes from the original border value inside that window."
      ], [
        "### No padding: output size",
        "$$\n\\left\\lfloor\\frac{4-2}{2}\\right\\rfloor+1=2\n$$",
        "所以 output 是 \(2\\times2\)。",
        "### No padding: windows",
        "$$\n\\max\\{1,3,5,6\\}=6\n$$",
        "$$\n\\max\\{2,4,7,8\\}=8\n$$",
        "$$\n\\max\\{9,10,13,14\\}=14\n$$",
        "$$\n\\max\\{11,12,15,16\\}=16\n$$",
        "### No-padding result",
        "$$\n\\begin{pmatrix}6&8\\\\14&16\\end{pmatrix}\n$$",
        "### Padding 1: output size",
        "padding 1 把 \(4\\times4\) 变成 \(6\\times6\)：",
        "$$\n\\left\\lfloor\\frac{6-2}{2}\\right\\rfloor+1=3\n$$",
        "所以 padded output 是 \(3\\times3\)。",
        "### Padding 1: max values",
        "$$\n\\begin{pmatrix}\n1&3&4\\\\\n9&11&12\\\\\n13&15&16\n\\end{pmatrix}\n$$",
        "### 为什么 border values 出现",
        "- 新的 border windows 包含 padding 的 zeros。\n- 因为 original entries 都是 positive，maximum 通常来自该 window 内的 original border value。"
      ])
    },
    {
      id: "hw3-3-2-2",
      section: "Problem 3.2.2",
      title: { en: "Find output size for 3 by 3 max pooling on a 6 by 6 input", cn: "求 6 by 6 input 上 3 by 3 max pooling 的 output size" },
      original_excerpt: { en: "Detailed cue: 6 by 6 input feature map, 3 by 3 max-pooling window, stride 1, no padding mentioned; compute output spatial size.", cn: "题目要点：\(6\\times6\) input feature map，\(3\\times3\) max-pooling window，stride 1，未提 padding；计算 output spatial size。" },
      problem_understanding: { en: "This is only an output-size calculation; the actual values are not requested.", cn: "这只是 output-size calculation，不要求 actual values。" },
      knowledge_points: { en: "Pooling uses the same spatial-size formula as convolution when kernel size, stride, and padding are specified.", cn: "当 kernel size、stride、padding 给定时，pooling 使用和 convolution 相同的 spatial-size formula。" },
      tips: { en: ["Use N=6, F=3, S=1.", "Assume padding 0 when none is specified.", "Height and width are the same here."], cn: ["使用 \(N=6,F=3,S=1\)。", "题目没说 padding 时按 0 处理。", "这里 height 和 width 相同。"] },
      detailed_solution: detail([
        "### Formula",
        "$$\nN_{out}=\\left\\lfloor\\frac{N+2P-F}{S}\\right\\rfloor+1\n$$",
        "### Substitute",
        "$$\nN=6,\\quad P=0,\\quad F=3,\\quad S=1\n$$",
        "$$\nN_{out}=\\left\\lfloor\\frac{6-3}{1}\\right\\rfloor+1=4\n$$",
        "### Result",
        "$$\n4\\times4\n$$"
      ], [
        "### Formula",
        "$$\nN_{out}=\\left\\lfloor\\frac{N+2P-F}{S}\\right\\rfloor+1\n$$",
        "### 代入",
        "$$\nN=6,\\quad P=0,\\quad F=3,\\quad S=1\n$$",
        "$$\nN_{out}=\\left\\lfloor\\frac{6-3}{1}\\right\\rfloor+1=4\n$$",
        "### Result",
        "$$\n4\\times4\n$$"
      ])
    },
    {
      id: "hw3-3-2-3",
      section: "Problem 3.2.3",
      title: { en: "Find output size for padded 2 by 2 pooling on a 5 by 5 input", cn: "求 5 by 5 input 上 padded 2 by 2 pooling 的 output size" },
      original_excerpt: { en: "Detailed cue: 5 by 5 input, 2 by 2 pooling window, stride 2, zero padding 1; compute the output size.", cn: "题目要点：\(5\\times5\) input，\(2\\times2\) pooling window，stride 2，zero padding 1；计算 output size。" },
      problem_understanding: { en: "Padding changes the effective input size from 5 to 7 before the pooling formula is applied.", cn: "padding 会先把 effective input size 从 5 改成 7，然后再套 pooling formula。" },
      knowledge_points: { en: "The output dimension is floor((N+2P-F)/S)+1. The floor matters when the window does not divide the padded size evenly.", cn: "output dimension 是 \(\lfloor(N+2P-F)/S\rfloor+1\)。当 window 不能整除 padded size 时，floor 很重要。" },
      tips: { en: ["Add 2P before subtracting the kernel size.", "Use floor after division.", "Height and width are identical."], cn: ["先加 \(2P\)，再减 kernel size。", "division 后使用 floor。", "height 和 width 相同。"] },
      detailed_solution: detail([
        "### Effective size after padding",
        "$$\nN+2P=5+2(1)=7\n$$",
        "### Output formula",
        "$$\nN_{out}=\\left\\lfloor\\frac{7-2}{2}\\right\\rfloor+1\n$$",
        "### Apply floor",
        "$$\n\\left\\lfloor\\frac{5}{2}\\right\\rfloor+1=2+1=3\n$$",
        "### Result",
        "$$\n3\\times3\n$$"
      ], [
        "### Padding 后的 effective size",
        "$$\nN+2P=5+2(1)=7\n$$",
        "### Output formula",
        "$$\nN_{out}=\\left\\lfloor\\frac{7-2}{2}\\right\\rfloor+1\n$$",
        "### 套 floor",
        "$$\n\\left\\lfloor\\frac{5}{2}\\right\\rfloor+1=2+1=3\n$$",
        "### Result",
        "$$\n3\\times3\n$$"
      ])
    },
    {
      id: "hw3-3-3",
      section: "Problem 3.3",
      title: { en: "Write a 2 by 2 convolution as a sparse linear matrix", cn: "把 2 by 2 convolution 写成 sparse linear matrix" },
      original_excerpt: { en: "Detailed cue: 3 by 3 grayscale input, one 2 by 2 kernel, stride 1, no padding, no bias, no activation; flatten x into 9 entries and y into 4 entries, then construct W so y=Wx.", cn: "题目要点：\(3\\times3\) grayscale input，一个 \(2\\times2\) kernel，stride 1、no padding、no bias、no activation；把 x flatten 成 9 entries、y flatten 成 4 entries，然后构造 \(W\) 使 \(y=Wx\)。" },
      problem_understanding: { en: "Convolution is linear when there is no activation or bias. Each output pixel is an inner product between the same kernel and a shifted local patch.", cn: "没有 activation 或 bias 时，convolution 是 linear。每个 output pixel 是同一个 kernel 与 shifted local patch 的 inner product。" },
      knowledge_points: { en: "The matrix is sparse because each output depends on only four input pixels. It has a shifted Toeplitz-like pattern because the same kernel weights are reused at different locations.", cn: "matrix 是 sparse，因为每个 output 只依赖四个 input pixels。它有 shifted Toeplitz-like pattern，因为同一组 kernel weights 在不同 locations 被 reused。" },
      tips: { en: ["Write y11 through y22 before building W.", "Match columns to the flattened x order.", "Each row of W should have exactly four nonzero entries."], cn: ["先写 \(y_{11}\) 到 \(y_{22}\)，再构造 W。", "columns 要匹配 flattened x 的顺序。", "W 的每一行应该正好有四个 nonzero entries。"] },
      detailed_solution: detail([
        "### Flattening order",
        "$$\nx=[x_{11},x_{12},x_{13},x_{21},x_{22},x_{23},x_{31},x_{32},x_{33}]^\\top\n$$",
        "$$\ny=[y_{11},y_{12},y_{21},y_{22}]^\\top\n$$",
        "### Output expressions",
        "$$\ny_{11}=k_{11}x_{11}+k_{12}x_{12}+k_{21}x_{21}+k_{22}x_{22}\n$$",
        "$$\ny_{12}=k_{11}x_{12}+k_{12}x_{13}+k_{21}x_{22}+k_{22}x_{23}\n$$",
        "$$\ny_{21}=k_{11}x_{21}+k_{12}x_{22}+k_{21}x_{31}+k_{22}x_{32}\n$$",
        "$$\ny_{22}=k_{11}x_{22}+k_{12}x_{23}+k_{21}x_{32}+k_{22}x_{33}\n$$",
        "### Matrix",
        "$$\nW=\\begin{pmatrix}\nk_{11}&k_{12}&0&k_{21}&k_{22}&0&0&0&0\\\\\n0&k_{11}&k_{12}&0&k_{21}&k_{22}&0&0&0\\\\\n0&0&0&k_{11}&k_{12}&0&k_{21}&k_{22}&0\\\\\n0&0&0&0&k_{11}&k_{12}&0&k_{21}&k_{22}\n\\end{pmatrix}\n$$",
        "### Structural properties",
        "- \(W\) is sparse: every row has only four nonzero entries.\n- The same four kernel parameters repeat in shifted column positions.\n- This shifted pattern encodes local connectivity and weight sharing."
      ], [
        "### Flattening order",
        "$$\nx=[x_{11},x_{12},x_{13},x_{21},x_{22},x_{23},x_{31},x_{32},x_{33}]^\\top\n$$",
        "$$\ny=[y_{11},y_{12},y_{21},y_{22}]^\\top\n$$",
        "### Output expressions",
        "$$\ny_{11}=k_{11}x_{11}+k_{12}x_{12}+k_{21}x_{21}+k_{22}x_{22}\n$$",
        "$$\ny_{12}=k_{11}x_{12}+k_{12}x_{13}+k_{21}x_{22}+k_{22}x_{23}\n$$",
        "$$\ny_{21}=k_{11}x_{21}+k_{12}x_{22}+k_{21}x_{31}+k_{22}x_{32}\n$$",
        "$$\ny_{22}=k_{11}x_{22}+k_{12}x_{23}+k_{21}x_{32}+k_{22}x_{33}\n$$",
        "### Matrix",
        "$$\nW=\\begin{pmatrix}\nk_{11}&k_{12}&0&k_{21}&k_{22}&0&0&0&0\\\\\n0&k_{11}&k_{12}&0&k_{21}&k_{22}&0&0&0\\\\\n0&0&0&k_{11}&k_{12}&0&k_{21}&k_{22}&0\\\\\n0&0&0&0&k_{11}&k_{12}&0&k_{21}&k_{22}\n\\end{pmatrix}\n$$",
        "### Structural properties",
        "- \(W\) 是 sparse：每一行只有四个 nonzero entries。\n- 同样四个 kernel parameters 会在 shifted column positions 中重复出现。\n- 这种 shifted pattern 表示 local connectivity 和 weight sharing。"
      ])
    }
  ]);

  add("vae", [
    {
      id: "hw3-4-1",
      section: "Problem 4.1",
      title: { en: "Identify all main approximation sources in VAE training", cn: "识别 VAE training 中的主要 approximation sources" },
      original_excerpt: { en: "Detailed cue: generative model z from standard normal, x from decoder likelihood, intractable marginal likelihood, approximate posterior q_phi, ELBO, diagonal Gaussian encoder, and reparameterized sampling.", cn: "题目要点：generative model 中 \(z\) 来自 standard normal、\(x\) 来自 decoder likelihood；marginal likelihood intractable；引入 approximate posterior \(q_\\phi\)、ELBO、diagonal Gaussian encoder、以及 reparameterized sampling。" },
      problem_understanding: { en: "The question asks where VAE replaces an exact probabilistic quantity with a tractable surrogate during training.", cn: "这题问 VAE training 中哪些 exact probabilistic quantities 被替换成 tractable surrogate。" },
      knowledge_points: { en: "VAE approximates the true posterior with q_phi, optimizes an ELBO lower bound instead of exact log likelihood, and estimates expectations with samples. The chosen variational family and neural optimization also limit exactness.", cn: "VAE 用 \(q_\\phi\) approximate true posterior，优化 ELBO lower bound 而非 exact log likelihood，并用 samples estimate expectations。variational family 和 neural optimization 也带来限制。" },
      tips: { en: ["Start from the intractable posterior.", "Separate variational approximation from Monte Carlo approximation.", "Mention ELBO as a lower bound."], cn: ["从 intractable posterior 开始。", "区分 variational approximation 和 Monte Carlo approximation。", "说明 ELBO 是 lower bound。"] },
      detailed_solution: detail([
        "### Exact model quantities",
        "The model defines",
        "$$\np(z)=\\mathcal N(0,I),\\qquad p_\\theta(x\\mid z)\n$$",
        "and the marginal likelihood is",
        "$$\np_\\theta(x)=\\int p_\\theta(x\\mid z)p(z)\\,dz\n$$",
        "### Approximation 1: posterior approximation",
        "The exact posterior is",
        "$$\np_\\theta(z\\mid x)=\\frac{p_\\theta(x\\mid z)p(z)}{p_\\theta(x)}\n$$",
        "Because \(p_\\theta(x)\) contains an intractable integral, the posterior is generally unavailable. VAE replaces it with",
        "$$\nq_\\phi(z\\mid x)\\approx p_\\theta(z\\mid x)\n$$",
        "### Approximation 2: restricted variational family",
        "The encoder is often restricted to a diagonal Gaussian:",
        "$$\nq_\\phi(z\\mid x)=\\mathcal N(\\mu_\\phi(x),\\operatorname{diag}(\\sigma_\\phi^2(x)))\n$$",
        "This family may not contain the true posterior.",
        "### Approximation 3: lower bound instead of exact log likelihood",
        "VAE optimizes",
        "$$\n\\mathcal L_{ELBO}(x)=\\mathbb E_{q_\\phi(z\\mid x)}[\\log p_\\theta(x\\mid z)]-D_{KL}(q_\\phi(z\\mid x)\\|p(z))\n$$",
        "rather than directly optimizing \(\log p_\\theta(x)\). The relationship is",
        "$$\n\\log p_\\theta(x)=\\mathcal L_{ELBO}(x)+D_{KL}(q_\\phi(z\\mid x)\\|p_\\theta(z\\mid x))\n$$",
        "so the ELBO is a lower bound.",
        "### Approximation 4: Monte Carlo expectation",
        "The reconstruction expectation is usually estimated with samples:",
        "$$\n\\mathbb E_{q_\\phi(z\\mid x)}[\\log p_\\theta(x\\mid z)]\\approx\\frac1L\\sum_{\\ell=1}^{L}\\log p_\\theta(x\\mid z^{(\\ell)})\n$$",
        "with",
        "$$\nz^{(\\ell)}=\\mu_\\phi(x)+\\sigma_\\phi(x)\\odot\\epsilon^{(\\ell)},\\qquad \\epsilon^{(\\ell)}\\sim\\mathcal N(0,I)\n$$",
        "### Approximation 5: optimization",
        "- The encoder and decoder are neural networks.\n- Training uses stochastic gradient methods on a nonconvex objective.\n- Therefore the learned parameters are not guaranteed to be globally optimal."
      ], [
        "### Exact model quantities",
        "model 定义",
        "$$\np(z)=\\mathcal N(0,I),\\qquad p_\\theta(x\\mid z)\n$$",
        "marginal likelihood 是",
        "$$\np_\\theta(x)=\\int p_\\theta(x\\mid z)p(z)\\,dz\n$$",
        "### Approximation 1: posterior approximation",
        "exact posterior 是",
        "$$\np_\\theta(z\\mid x)=\\frac{p_\\theta(x\\mid z)p(z)}{p_\\theta(x)}\n$$",
        "因为 \(p_\\theta(x)\) 包含 intractable integral，posterior 通常不可直接算。VAE 用",
        "$$\nq_\\phi(z\\mid x)\\approx p_\\theta(z\\mid x)\n$$",
        "来替代。",
        "### Approximation 2: restricted variational family",
        "encoder 常被限制为 diagonal Gaussian：",
        "$$\nq_\\phi(z\\mid x)=\\mathcal N(\\mu_\\phi(x),\\operatorname{diag}(\\sigma_\\phi^2(x)))\n$$",
        "这个 family 不一定包含 true posterior。",
        "### Approximation 3: 用 lower bound 代替 exact log likelihood",
        "VAE 优化",
        "$$\n\\mathcal L_{ELBO}(x)=\\mathbb E_{q_\\phi(z\\mid x)}[\\log p_\\theta(x\\mid z)]-D_{KL}(q_\\phi(z\\mid x)\\|p(z))\n$$",
        "而不是直接优化 \(\log p_\\theta(x)\)。二者关系是",
        "$$\n\\log p_\\theta(x)=\\mathcal L_{ELBO}(x)+D_{KL}(q_\\phi(z\\mid x)\\|p_\\theta(z\\mid x))\n$$",
        "所以 ELBO 是 lower bound。",
        "### Approximation 4: Monte Carlo expectation",
        "reconstruction expectation 通常用 samples 估计：",
        "$$\n\\mathbb E_{q_\\phi(z\\mid x)}[\\log p_\\theta(x\\mid z)]\\approx\\frac1L\\sum_{\\ell=1}^{L}\\log p_\\theta(x\\mid z^{(\\ell)})\n$$",
        "其中",
        "$$\nz^{(\\ell)}=\\mu_\\phi(x)+\\sigma_\\phi(x)\\odot\\epsilon^{(\\ell)},\\qquad \\epsilon^{(\\ell)}\\sim\\mathcal N(0,I)\n$$",
        "### Approximation 5: optimization",
        "- encoder 和 decoder 是 neural networks。\n- training 使用 stochastic gradient methods 优化 nonconvex objective。\n- 因此 learned parameters 不保证 global optimum。"
      ])
    },
    {
      id: "hw3-4-2",
      section: "Problem 4.2",
      title: { en: "Derive the Gaussian KL term used in a VAE", cn: "推导 VAE 中使用的 Gaussian KL term" },
      original_excerpt: { en: "Detailed cue: for q(z|x)=N(mu,sigma squared) and p(z)=N(0,1), derive the closed-form KL divergence and show the key expectation steps.", cn: "题目要点：给定 \(q(z|x)=N(\\mu,\\sigma^2)\) 与 \(p(z)=N(0,1)\)，推导 closed-form KL divergence，并展示 key expectation steps。" },
      problem_understanding: { en: "You need to plug the two Gaussian log densities into E_q[log q - log p] and simplify with the mean and variance of q.", cn: "需要把两个 Gaussian log densities 代入 \(E_q[\\log q-\\log p]\)，再用 q 的 mean 与 variance 化简。" },
      knowledge_points: { en: "For one dimension, KL(N(mu,sigma^2) || N(0,1)) = 1/2(mu^2 + sigma^2 - log sigma^2 - 1). Diagonal multivariate KL sums this over dimensions.", cn: "一维情况下，\(KL(N(\\mu,\\sigma^2)\\|N(0,1))=\\frac12(\\mu^2+\\sigma^2-\\log\sigma^2-1)\)。diagonal multivariate KL 对 dimensions 求和。" },
      tips: { en: ["Write the definition of KL first.", "Compute E_q[(z-mu)^2] and E_q[z^2].", "Cancel the log 2 pi terms carefully."], cn: ["先写 KL definition。", "计算 \(E_q[(z-\\mu)^2]\) 和 \(E_q[z^2]\)。", "小心 cancel \(\\log 2\\pi\) terms。"] },
      detailed_solution: detail([
        "### KL definition",
        "$$\nD_{KL}(q\\|p)=\\mathbb E_q[\\log q(z)-\\log p(z)]\n$$",
        "### Log density of q",
        "For \(q(z)=\\mathcal N(\\mu,\\sigma^2)\),",
        "$$\n\\log q(z)=-\\frac12\\log(2\\pi\\sigma^2)-\\frac{(z-\\mu)^2}{2\\sigma^2}\n$$",
        "### Log density of p",
        "For \(p(z)=\\mathcal N(0,1)\),",
        "$$\n\\log p(z)=-\\frac12\\log(2\\pi)-\\frac{z^2}{2}\n$$",
        "### Expectations under q",
        "$$\n\\mathbb E_q[(z-\\mu)^2]=\\sigma^2\n$$",
        "$$\n\\mathbb E_q[z^2]=\\operatorname{Var}_q(z)+(\\mathbb E_q z)^2=\\sigma^2+\\mu^2\n$$",
        "### Expected log q",
        "$$\n\\mathbb E_q[\\log q(z)]=-\\frac12\\log(2\\pi\\sigma^2)-\\frac12\n$$",
        "### Expected log p",
        "$$\n\\mathbb E_q[\\log p(z)]=-\\frac12\\log(2\\pi)-\\frac12(\\sigma^2+\\mu^2)\n$$",
        "### Subtract",
        "$$\nD_{KL}(q\\|p)=-\\frac12\\log(2\\pi\\sigma^2)-\\frac12+\\frac12\\log(2\\pi)+\\frac12(\\sigma^2+\\mu^2)\n$$",
        "Cancel \(\log(2\\pi)\):",
        "$$\nD_{KL}(q\\|p)=\\frac12(\\mu^2+\\sigma^2-\\log\\sigma^2-1)\n$$",
        "### Diagonal multivariate version",
        "$$\nD_{KL}=\\frac12\\sum_j(\\mu_j^2+\\sigma_j^2-\\log\\sigma_j^2-1)\n$$"
      ], [
        "### KL definition",
        "$$\nD_{KL}(q\\|p)=\\mathbb E_q[\\log q(z)-\\log p(z)]\n$$",
        "### q 的 log density",
        "对 \(q(z)=\\mathcal N(\\mu,\\sigma^2)\)，",
        "$$\n\\log q(z)=-\\frac12\\log(2\\pi\\sigma^2)-\\frac{(z-\\mu)^2}{2\\sigma^2}\n$$",
        "### p 的 log density",
        "对 \(p(z)=\\mathcal N(0,1)\)，",
        "$$\n\\log p(z)=-\\frac12\\log(2\\pi)-\\frac{z^2}{2}\n$$",
        "### q 下的 expectations",
        "$$\n\\mathbb E_q[(z-\\mu)^2]=\\sigma^2\n$$",
        "$$\n\\mathbb E_q[z^2]=\\operatorname{Var}_q(z)+(\\mathbb E_q z)^2=\\sigma^2+\\mu^2\n$$",
        "### Expected log q",
        "$$\n\\mathbb E_q[\\log q(z)]=-\\frac12\\log(2\\pi\\sigma^2)-\\frac12\n$$",
        "### Expected log p",
        "$$\n\\mathbb E_q[\\log p(z)]=-\\frac12\\log(2\\pi)-\\frac12(\\sigma^2+\\mu^2)\n$$",
        "### 相减",
        "$$\nD_{KL}(q\\|p)=-\\frac12\\log(2\\pi\\sigma^2)-\\frac12+\\frac12\\log(2\\pi)+\\frac12(\\sigma^2+\\mu^2)\n$$",
        "cancel \(\log(2\\pi)\)：",
        "$$\nD_{KL}(q\\|p)=\\frac12(\\mu^2+\\sigma^2-\\log\\sigma^2-1)\n$$",
        "### Diagonal multivariate version",
        "$$\nD_{KL}=\\frac12\\sum_j(\\mu_j^2+\\sigma_j^2-\\log\\sigma_j^2-1)\n$$"
      ])
    },
    {
      id: "hw3-4-3",
      section: "Problem 4.3",
      title: { en: "Explain why the VAE objective encourages smooth latent interpolation", cn: "解释 VAE objective 为什么鼓励 smooth latent interpolation" },
      original_excerpt: { en: "Detailed cue: explain smooth VAE generations during latent interpolation using the two ELBO terms: reconstruction likelihood and KL regularization toward the prior.", cn: "题目要点：用 ELBO 的两个 terms，即 reconstruction likelihood 与 KL regularization toward prior，解释 latent interpolation 时 VAE generations 为什么 smooth。" },
      problem_understanding: { en: "The answer should connect the objective to geometry: the KL term organizes latent codes, and the reconstruction term trains neighborhoods of z to decode consistently.", cn: "答案要把 objective 和 geometry 联系起来：KL term 组织 latent codes，reconstruction term 让 z 的 neighborhoods decode consistently。" },
      knowledge_points: { en: "The prior is continuous and connected, KL discourages isolated posterior islands, and reparameterized reconstruction trains the decoder on local samples around each encoded point.", cn: "prior 是 continuous 且 connected；KL discourages isolated posterior islands；reparameterized reconstruction 会在每个 encoded point 周围的 local samples 上训练 decoder。" },
      tips: { en: ["Discuss the KL term first.", "Then discuss reconstruction around sampled z.", "Use decoder continuity to explain interpolation."], cn: ["先讨论 KL term。", "再讨论 sampled z 周围的 reconstruction。", "用 decoder continuity 解释 interpolation。"] },
      detailed_solution: detail([
        "### ELBO",
        "$$\n\\mathcal L_{ELBO}(x)=\\mathbb E_{q_\\phi(z\\mid x)}[\\log p_\\theta(x\\mid z)]-D_{KL}(q_\\phi(z\\mid x)\\|p(z))\n$$",
        "### Effect of the KL term",
        "- The prior \(p(z)=\\mathcal N(0,I)\) is smooth and continuous.\n- The KL penalty keeps each approximate posterior close to this shared prior.\n- This discourages isolated, far-apart latent islands.",
        "### Effect of the reconstruction term",
        "The reconstruction term samples",
        "$$\nz=\\mu_\\phi(x)+\\sigma_\\phi(x)\\odot\\epsilon\n$$",
        "So the decoder is trained not only at one point, but around a local neighborhood of the encoded mean.",
        "### Decoder continuity",
        "- The decoder is a neural network, so it is typically a continuous function of z.\n- Nearby z values therefore tend to produce nearby decoder outputs, especially after local reconstruction training.",
        "### Interpolation",
        "For a latent interpolation",
        "$$\nz(\\alpha)=(1-\\alpha)z_1+\\alpha z_2\n$$",
        "the path moves through the regularized latent space rather than jumping between isolated codes.",
        "### Conclusion",
        "KL regularization gives a smooth global latent structure, and reconstruction training gives local decoder consistency. Together they make VAE generations change smoothly during interpolation."
      ], [
        "### ELBO",
        "$$\n\\mathcal L_{ELBO}(x)=\\mathbb E_{q_\\phi(z\\mid x)}[\\log p_\\theta(x\\mid z)]-D_{KL}(q_\\phi(z\\mid x)\\|p(z))\n$$",
        "### KL term 的作用",
        "- prior \(p(z)=\\mathcal N(0,I)\) 是 smooth 且 continuous 的。\n- KL penalty 让每个 approximate posterior 接近这个 shared prior。\n- 这会 discourage isolated、far-apart latent islands。",
        "### Reconstruction term 的作用",
        "reconstruction term 会 sample",
        "$$\nz=\\mu_\\phi(x)+\\sigma_\\phi(x)\\odot\\epsilon\n$$",
        "所以 decoder 不只在一个 point 上训练，而是在 encoded mean 附近的 local neighborhood 上训练。",
        "### Decoder continuity",
        "- decoder 是 neural network，通常是 z 的 continuous function。\n- 因此 nearby z values 往往产生 nearby decoder outputs，尤其经过 local reconstruction training 后更明显。",
        "### Interpolation",
        "对 latent interpolation",
        "$$\nz(\\alpha)=(1-\\alpha)z_1+\\alpha z_2\n$$",
        "路径会穿过 regularized latent space，而不是在 isolated codes 之间跳跃。",
        "### 结论",
        "KL regularization 给出 smooth global latent structure，reconstruction training 给出 local decoder consistency。两者一起让 VAE generations 在 interpolation 时 smooth change。"
      ])
    }
  ]);
})();

(function enhanceHw2RemainingProblems() {
  const data = window.POPUP_DATA || {};
  const hw = "hw2";
  const join = parts => parts.join("\n\n");
  const detail = (en, cn) => ({ en: join(en), cn: join(cn) });
  const add = (slug, items) => {
    if (!data[slug]) return;
    data[slug].problems = data[slug].problems || [];
    data[slug].problems.push(...items.map(item => ({ ...item, hw })));
  };

  add("decision-trees", [
    {
      id: "hw2-1-3",
      section: "Problem 1.3",
      title: { en: "Judge whether unrestricted trees reduce test error", cn: "判断 unrestricted decision tree 对 test error 的影响" },
      original_excerpt: { en: "Detailed cue: true/false item about an unrestricted decision tree: compare what usually happens to training error and test error when the tree is allowed to keep splitting.", cn: "题目要点：True/False；讨论 unrestricted decision tree 持续 split 时，training error 与 test error 通常如何变化。" },
      problem_understanding: { en: "The question is testing whether you can separate training fit from generalization. A very deep tree can memorize the training set, but that does not guarantee better test behavior.", cn: "这题考 training fit 和 generalization 的区别。很深的 tree 可以记住 training set，但不代表 test behavior 会更好。" },
      knowledge_points: { en: "Decision trees have high variance when unrestricted. Increasing depth usually lowers training error and may raise test error through overfitting.", cn: "Unrestricted decision tree 通常 high variance。增加 depth 往往降低 training error，但可能因为 overfitting 提高 test error。" },
      tips: { en: ["Ask which dataset the error is measured on.", "Remember that more splits cannot hurt training fit.", "Use overfitting to reason about test error."], cn: ["先看 error 是在什么 dataset 上测。", "更多 split 通常不会伤害 training fit。", "用 overfitting 解释 test error。"] },
      detailed_solution: detail([
        "### Answer",
        "- False.",
        "### Step 1: Training error",
        "- If a tree is allowed to keep splitting, it can create smaller and smaller regions.\n- In the extreme case, leaves can isolate individual training examples.\n- Therefore the training error usually decreases, not increases.",
        "### Step 2: Test error",
        "- Test error is measured on new examples.\n- A tree that follows small accidental patterns in the training set has high variance.\n- High variance can make the test error increase.",
        "### Conclusion",
        "The statement says the usual direction backwards: unrestricted trees tend to reduce training error while risking larger test error."
      ], [
        "### 答案",
        "- False。",
        "### Step 1: Training error",
        "- tree 如果可以一直 split，会形成越来越小的 regions。\n- 极端情况下，leaf 可以几乎隔离每个 training example。\n- 所以 training error 通常会 decrease，而不是 increase。",
        "### Step 2: Test error",
        "- Test error 是在新的 examples 上测。\n- 如果 tree 学到 training set 里的偶然 pattern，就会 high variance。\n- High variance 可能让 test error increase。",
        "### 结论",
        "题目把常见方向说反了：unrestricted tree 通常降低 training error，但有 overfitting 风险，test error 可能升高。"
      ])
    },
    {
      id: "hw2-4-1",
      section: "Problem 4.1",
      title: { en: "Compute the entropy of the six-point training sample", cn: "计算 six-point training sample 的 entropy" },
      original_excerpt: { en: "Detailed cue: six labeled 2D examples are shown; before making any split, count the class proportions and compute the root entropy with base-2 logarithms.", cn: "题目要点：给出 6 个 labeled 2D examples；在任何 split 之前，先数 class proportions，并用 base-2 logarithm 计算 root entropy。" },
      problem_understanding: { en: "This asks for the impurity of the whole dataset at the root node, not for a split yet.", cn: "这题要的是 root node 上整个 dataset 的 impurity，还没有开始选 split。" },
      knowledge_points: { en: "For two classes, entropy is H(S)=-p_+log2(p_+)-p_-log2(p_-). A balanced 3-vs-3 sample has entropy 1 bit.", cn: "二分类 entropy 是 \(H(S)=-p_+\\log_2 p_+-p_-\\log_2 p_-\)。3-vs-3 balanced sample 的 entropy 是 1 bit。" },
      tips: { en: ["Count labels before writing formulas.", "Use base-2 logs for entropy in bits.", "Do not include feature values until a split is evaluated."], cn: ["先数 labels，再写公式。", "entropy in bits 用 base-2 logs。", "还没评估 split 时，不需要用 feature values。"] },
      detailed_solution: detail([
        "### Count labels",
        "- The sample has 6 total points.\n- There are 3 points from one class and 3 points from the other class.",
        "### Convert counts to probabilities",
        "$$\np_+=\\frac{3}{6}=\\frac12,\\qquad p_-=\\frac{3}{6}=\\frac12\n$$",
        "### Apply entropy",
        "$$\nH(S)=-p_+\\log_2(p_+)-p_-\\log_2(p_-)\n$$",
        "### Substitute",
        "$$\nH(S)=-\\frac12\\log_2\\frac12-\\frac12\\log_2\\frac12\n$$",
        "$$\nH(S)=\\frac12+\\frac12=1\n$$",
        "### Conclusion",
        "The root entropy is 1 bit."
      ], [
        "### 数 labels",
        "- sample 共有 6 个 points。\n- 一个 class 有 3 个 points，另一个 class 也有 3 个 points。",
        "### 把 counts 转成 probabilities",
        "$$\np_+=\\frac{3}{6}=\\frac12,\\qquad p_-=\\frac{3}{6}=\\frac12\n$$",
        "### 使用 entropy",
        "$$\nH(S)=-p_+\\log_2(p_+)-p_-\\log_2(p_-)\n$$",
        "### 代入",
        "$$\nH(S)=-\\frac12\\log_2\\frac12-\\frac12\\log_2\\frac12\n$$",
        "$$\nH(S)=\\frac12+\\frac12=1\n$$",
        "### 结论",
        "root entropy 是 1 bit。"
      ])
    },
    {
      id: "hw2-4-2",
      section: "Problem 4.2",
      title: { en: "Choose the best root split by information gain", cn: "用 information gain 选择 best root split" },
      original_excerpt: { en: "Detailed cue: evaluate axis-aligned threshold splits of the form x_j >= tau at the root; report the split, its information gain, and the child-node predictions.", cn: "题目要点：在 root 评估 axis-aligned threshold splits，形式为 \(x_j\\ge \\tau\)；报告 split、information gain，以及两个 child nodes 的 predictions。" },
      problem_understanding: { en: "You need to compare candidate splits by how much they reduce entropy, then label each child by its majority class.", cn: "需要比较每个 candidate split 降低 entropy 的幅度，然后每个 child 用 majority class 做 prediction。" },
      knowledge_points: { en: "Information gain is parent entropy minus the weighted average child entropy. Pure child entropy is 0.", cn: "Information gain = parent entropy - weighted child entropy。Pure child 的 entropy 是 0。" },
      tips: { en: ["Start from the parent entropy from 4.1.", "Compute child class counts after each split.", "Use weighted child entropy, not the plain average."], cn: ["从 4.1 的 parent entropy 开始。", "每个 split 后数 child class counts。", "用 weighted child entropy，不是普通平均。"] },
      detailed_solution: detail([
        "### Parent entropy",
        "$$\nH(S)=1\n$$",
        "### Best candidate",
        "- The best root split is the threshold on the first coordinate:\n- left/right wording depends on drawing convention, but the rule is based on \(x_1\\ge 5\).",
        "$$\nx_1\\ge 5\n$$",
        "### Child counts",
        "- One child contains 2 examples from only one class, so its entropy is 0.\n- The other child contains 4 examples with class proportions \(3/4\) and \(1/4\).",
        "### Entropy of the impure child",
        "$$\nH_{impure}=-\\frac34\\log_2\\frac34-\\frac14\\log_2\\frac14\n$$",
        "$$\nH_{impure}\\approx 0.811\n$$",
        "### Weighted child entropy",
        "$$\nH_{children}=\\frac{4}{6}(0.811)+\\frac{2}{6}(0)\n$$",
        "$$\nH_{children}\\approx 0.541\n$$",
        "### Information gain",
        "$$\nIG=H(S)-H_{children}=1-0.541\\approx0.459\n$$",
        "### Predictions",
        "- The pure child predicts its single class.\n- The 4-point child predicts its majority class.\n- This is why the reported child predictions come directly from majority vote inside each child."
      ], [
        "### Parent entropy",
        "$$\nH(S)=1\n$$",
        "### Best candidate",
        "- best root split 是第一维上的 threshold：\n- left/right 名称取决于图里的画法，但规则是 \(x_1\\ge 5\)。",
        "$$\nx_1\\ge 5\n$$",
        "### Child counts",
        "- 一个 child 只有同一类的 2 个 examples，所以 entropy 是 0。\n- 另一个 child 有 4 个 examples，class proportions 是 \(3/4\) 和 \(1/4\)。",
        "### Impure child 的 entropy",
        "$$\nH_{impure}=-\\frac34\\log_2\\frac34-\\frac14\\log_2\\frac14\n$$",
        "$$\nH_{impure}\\approx 0.811\n$$",
        "### Weighted child entropy",
        "$$\nH_{children}=\\frac{4}{6}(0.811)+\\frac{2}{6}(0)\n$$",
        "$$\nH_{children}\\approx 0.541\n$$",
        "### Information gain",
        "$$\nIG=H(S)-H_{children}=1-0.541\\approx0.459\n$$",
        "### Predictions",
        "- pure child 预测它唯一的 class。\n- 4-point child 预测 majority class。\n- 因此 child predictions 直接来自每个 child 内部的 majority vote。"
      ])
    },
    {
      id: "hw2-4-3",
      section: "Problem 4.3",
      title: { en: "Continue the tree after the best root split", cn: "在 best root split 后继续生成 tree" },
      original_excerpt: { en: "Detailed cue: after applying the root split from Problem 4.2, decide whether each child should split again; for the impure child, evaluate the next threshold and report its information gain.", cn: "题目要点：应用 Problem 4.2 的 root split 后，判断每个 child 是否还要 split；对 impure child 选择下一条 threshold 并报告 information gain。" },
      problem_understanding: { en: "The pure branch stops. The remaining branch is a smaller decision-tree problem whose parent entropy is its current impurity.", cn: "pure branch 直接停止。剩下的 branch 是一个更小的 decision-tree problem，它当前的 impurity 就是新的 parent entropy。" },
      knowledge_points: { en: "A split that makes both children pure removes all remaining entropy, so its gain equals the entropy of the impure node before the split.", cn: "如果某个 split 让两个 child 都 pure，它消除所有剩余 entropy，所以 gain 等于 split 前 impure node 的 entropy。" },
      tips: { en: ["Never split a pure child.", "Recompute entropy using only points in the impure child.", "If the next split makes pure leaves, the weighted child entropy becomes 0."], cn: ["pure child 不需要 split。", "只用 impure child 里的 points 重新算 entropy。", "如果下一次 split 产生 pure leaves，weighted child entropy 变成 0。"] },
      detailed_solution: detail([
        "### After the root split",
        "- One child is already pure.\n- A pure child has entropy 0.\n- Splitting it cannot improve the training impurity, so it becomes a leaf.",
        "### Focus on the impure child",
        "- The impure child has 4 points.\n- Its class proportions are \(3/4\) and \(1/4\).",
        "$$\nH_{node}=-\\frac34\\log_2\\frac34-\\frac14\\log_2\\frac14\\approx0.811\n$$",
        "### Next best split",
        "- The next threshold is on the second coordinate, using the rule based on \(x_2\\ge2\).\n- This separates the remaining mixed node into pure leaves.",
        "$$\nx_2\\ge2\n$$",
        "### Information gain at that node",
        "$$\nH_{children}=0\n$$",
        "$$\nIG=H_{node}-H_{children}=0.811-0=0.811\n$$",
        "### Final tree structure",
        "- Root: split by \(x_1\\ge5\).\n- Pure root child: stop.\n- Impure root child: split by \(x_2\\ge2\), then stop because both new children are pure."
      ], [
        "### Root split 之后",
        "- 一个 child 已经 pure。\n- pure child 的 entropy 是 0。\n- 再 split 不能继续降低 training impurity，所以它直接成为 leaf。",
        "### 关注 impure child",
        "- impure child 有 4 个 points。\n- class proportions 是 \(3/4\) 和 \(1/4\)。",
        "$$\nH_{node}=-\\frac34\\log_2\\frac34-\\frac14\\log_2\\frac14\\approx0.811\n$$",
        "### 下一条 best split",
        "- 下一条 threshold 在第二维，用 \(x_2\\ge2\) 这条规则。\n- 它把剩下的 mixed node 分成 pure leaves。",
        "$$\nx_2\\ge2\n$$",
        "### 该 node 的 information gain",
        "$$\nH_{children}=0\n$$",
        "$$\nIG=H_{node}-H_{children}=0.811-0=0.811\n$$",
        "### 最终 tree structure",
        "- Root: 按 \(x_1\\ge5\) split。\n- Pure root child: stop。\n- Impure root child: 按 \(x_2\\ge2\) split，然后两个新 child 都 pure，所以 stop。"
      ])
    }
  ]);

  add("bagging", [
    {
      id: "hw2-5-1",
      section: "Problem 5.1",
      title: { en: "Contrast Bagging and Boosting", cn: "比较 Bagging 与 Boosting" },
      original_excerpt: { en: "Detailed cue: explain the main difference between Bagging and Boosting, including how models are trained, how samples are weighted, and what error component each method mainly targets.", cn: "题目要点：解释 Bagging 与 Boosting 的核心区别，包括 models 如何训练、samples 如何加权，以及主要改善哪类 error component。" },
      problem_understanding: { en: "This is a conceptual comparison, not a derivation. The answer should mention training procedure, aggregation, and bias-variance behavior.", cn: "这是 conceptual comparison，不是推导题。答案应包含 training procedure、aggregation、bias-variance behavior。" },
      knowledge_points: { en: "Bagging trains base learners independently on bootstrap samples and averages/votes them. Boosting trains learners sequentially, emphasizing previously hard examples and using weighted votes.", cn: "Bagging 在 bootstrap samples 上 independent training，再 average/vote。Boosting sequentially training，把权重放到之前难分的 examples 上，并用 weighted votes。" },
      tips: { en: ["Mention bootstrap sampling for Bagging.", "Mention sequential reweighting for Boosting.", "Tie Bagging to variance and Boosting to bias or margin improvement."], cn: ["Bagging 要提 bootstrap sampling。", "Boosting 要提 sequential reweighting。", "Bagging 关联 variance，Boosting 关联 bias 或 margin improvement。"] },
      detailed_solution: detail([
        "### Bagging",
        "- Draw many bootstrap datasets from the original training set.\n- Train one base learner on each bootstrap dataset.\n- Combine predictions by averaging for regression or majority vote for classification.",
        "### Effect of Bagging",
        "- Each learner sees a slightly different sample.\n- Averaging reduces instability.\n- So Bagging mainly reduces variance.",
        "### Boosting",
        "- Train base learners in a sequence.\n- After each round, increase attention on examples that are currently hard or misclassified.\n- Combine learners with weights, so stronger learners usually receive larger influence.",
        "### Effect of Boosting",
        "- The ensemble keeps correcting earlier mistakes.\n- This can reduce bias and improve margins.\n- It can also be more sensitive to noise than Bagging.",
        "### One-line contrast",
        "Bagging is parallel variance reduction by resampling; Boosting is sequential error correction by reweighting."
      ], [
        "### Bagging",
        "- 从 original training set 里抽多个 bootstrap datasets。\n- 每个 bootstrap dataset 训练一个 base learner。\n- regression 用 averaging，classification 用 majority vote。",
        "### Bagging 的效果",
        "- 每个 learner 看到的 sample 略有不同。\n- averaging 可以降低 instability。\n- 所以 Bagging 主要降低 variance。",
        "### Boosting",
        "- base learners 是 sequentially 训练的。\n- 每一轮之后，提高当前 hard examples 或 misclassified examples 的关注度。\n- 最后用 weighted votes 合成，stronger learner 通常权重更大。",
        "### Boosting 的效果",
        "- ensemble 不断修正前面 rounds 的 mistakes。\n- 这可以降低 bias 并改善 margins。\n- 但它也可能比 Bagging 更 sensitive to noise。",
        "### 一句话对比",
        "Bagging 是 parallel resampling 来降低 variance；Boosting 是 sequential reweighting 来做 error correction。"
      ])
    }
  ]);

  add("boosting", [
    {
      id: "hw2-5-2a",
      section: "Problem 5.2(a)",
      title: { en: "Rewrite exponential loss using round-t weights", cn: "用 round-t weights 重写 exponential loss" },
      original_excerpt: { en: "Detailed cue: given an additive classifier F_t=F_{t-1}+alpha_t f_t and exponential loss, isolate the part depending on the previous ensemble and define the current example weights.", cn: "题目要点：给定 additive classifier \(F_t=F_{t-1}+\\alpha_t f_t\) 与 exponential loss；把依赖 previous ensemble 的部分提出，定义当前 example weights。" },
      problem_understanding: { en: "The task is to factor the new loss into old weights times a term involving only the new classifier and its coefficient.", cn: "这题要把 new loss 分解成 old weights 乘上只和 new classifier 及 coefficient 有关的项。" },
      knowledge_points: { en: "AdaBoost uses weights w_i=exp(-y_i F_{t-1}(x_i)). The next learner is chosen by minimizing weighted exponential loss.", cn: "AdaBoost 使用 \(w_i=\\exp(-y_iF_{t-1}(x_i))\)。下一轮 learner 通过最小化 weighted exponential loss 选择。" },
      tips: { en: ["Substitute F_t before expanding.", "Use exp(a+b)=exp(a)exp(b).", "Name the old-ensemble factor w_i."], cn: ["先代入 \(F_t\)，再展开。", "使用 \(\\exp(a+b)=\\exp(a)\\exp(b)\)。", "把 old-ensemble factor 命名为 \(w_i\)。"] },
      detailed_solution: detail([
        "### Start from exponential loss",
        "$$\nL_t=\\sum_i \\exp\\{-y_iF_t(x_i)\\}\n$$",
        "### Substitute the additive update",
        "$$\nF_t(x_i)=F_{t-1}(x_i)+\\alpha_t f_t(x_i)\n$$",
        "$$\nL_t=\\sum_i \\exp\\{-y_i(F_{t-1}(x_i)+\\alpha_t f_t(x_i))\\}\n$$",
        "### Split the exponent",
        "$$\nL_t=\\sum_i \\exp\\{-y_iF_{t-1}(x_i)\\}\\exp\\{-\\alpha_t y_i f_t(x_i)\\}\n$$",
        "### Define weights",
        "$$\nw_i=\\exp\\{-y_iF_{t-1}(x_i)\\}\n$$",
        "### Final weighted form",
        "$$\nL_t=\\sum_i w_i\\exp\\{-\\alpha_t y_i f_t(x_i)\\}\n$$"
      ], [
        "### 从 exponential loss 开始",
        "$$\nL_t=\\sum_i \\exp\\{-y_iF_t(x_i)\\}\n$$",
        "### 代入 additive update",
        "$$\nF_t(x_i)=F_{t-1}(x_i)+\\alpha_t f_t(x_i)\n$$",
        "$$\nL_t=\\sum_i \\exp\\{-y_i(F_{t-1}(x_i)+\\alpha_t f_t(x_i))\\}\n$$",
        "### 拆开 exponent",
        "$$\nL_t=\\sum_i \\exp\\{-y_iF_{t-1}(x_i)\\}\\exp\\{-\\alpha_t y_i f_t(x_i)\\}\n$$",
        "### 定义 weights",
        "$$\nw_i=\\exp\\{-y_iF_{t-1}(x_i)\\}\n$$",
        "### 得到 weighted form",
        "$$\nL_t=\\sum_i w_i\\exp\\{-\\alpha_t y_i f_t(x_i)\\}\n$$"
      ])
    },
    {
      id: "hw2-5-2b",
      section: "Problem 5.2(b)",
      title: { en: "Explain why large AdaBoost weights mark hard examples", cn: "解释为什么 large AdaBoost weights 表示 hard examples" },
      original_excerpt: { en: "Detailed cue: interpret the weight w_i=exp(-y_i F_{t-1}(x_i)) and connect its size to margin, correct classification, and misclassification.", cn: "题目要点：解释 \(w_i=\\exp(-y_iF_{t-1}(x_i))\)，把 weight size 与 margin、correct classification、misclassification 联系起来。" },
      problem_understanding: { en: "You are explaining the meaning of the weight, not choosing a classifier yet. The key variable is the margin y_iF_{t-1}(x_i).", cn: "这题是在解释 weight 的含义，还不是选 classifier。关键变量是 margin \(y_iF_{t-1}(x_i)\)。" },
      knowledge_points: { en: "Positive large margin means confident correct prediction, giving small weight. Negative margin means wrong prediction, giving large weight.", cn: "positive large margin 表示 confident correct prediction，对应 small weight。negative margin 表示 wrong prediction，对应 large weight。" },
      tips: { en: ["Look at the sign of y_iF(x_i).", "Use monotonicity of exp.", "Connect negative margin to misclassification."], cn: ["看 \(y_iF(x_i)\) 的 sign。", "用 exp 的 monotonicity。", "把 negative margin 和 misclassification 联系起来。"] },
      detailed_solution: detail([
        "### Define the margin",
        "$$\nm_i=y_iF_{t-1}(x_i)\n$$",
        "### Weight as a function of margin",
        "$$\nw_i=\\exp(-m_i)\n$$",
        "### Correct and confident example",
        "- If \(m_i\) is large and positive, the ensemble predicts the correct sign with confidence.\n- Then \(-m_i\) is very negative.\n- So \(w_i=\\exp(-m_i)\) is small.",
        "### Wrong or weak example",
        "- If \(m_i<0\), the ensemble predicts the wrong sign.\n- Then \(-m_i>0\).\n- So \(w_i\) becomes large.",
        "### Conclusion",
        "Large weights identify examples that the current ensemble handles poorly, so the next weak learner focuses on them."
      ], [
        "### 定义 margin",
        "$$\nm_i=y_iF_{t-1}(x_i)\n$$",
        "### weight 是 margin 的函数",
        "$$\nw_i=\\exp(-m_i)\n$$",
        "### Correct and confident example",
        "- 如果 \(m_i\) 很大且为正，ensemble 以较高 confidence 给出 correct sign。\n- 此时 \(-m_i\) 很负。\n- 所以 \(w_i=\\exp(-m_i)\) 很小。",
        "### Wrong or weak example",
        "- 如果 \(m_i<0\)，ensemble 给出 wrong sign。\n- 此时 \(-m_i>0\)。\n- 所以 \(w_i\) 变大。",
        "### 结论",
        "large weights 标记当前 ensemble 处理不好的 examples，因此下一轮 weak learner 会更关注它们。"
      ])
    },
    {
      id: "hw2-5-2c",
      section: "Problem 5.2(c)",
      title: { en: "Show classifier selection reduces to weighted error minimization", cn: "证明选择 classifier 等价于最小化 weighted error" },
      original_excerpt: { en: "Detailed cue: for fixed positive alpha_t, split the weighted exponential loss into correctly classified and incorrectly classified examples and identify the term controlled by f_t.", cn: "题目要点：固定 positive \(\\alpha_t\)，把 weighted exponential loss 分成 correctly classified 与 incorrectly classified 两部分，并找出由 \(f_t\) 控制的项。" },
      problem_understanding: { en: "For a fixed coefficient, the only choice is which examples the weak learner gets wrong. The loss is larger on wrong examples, so minimizing loss is minimizing weighted mistakes.", cn: "固定 coefficient 后，唯一选择是 weak learner 哪些 examples 分错。wrong examples 的 loss 更大，所以 minimizing loss 等价于 minimizing weighted mistakes。" },
      knowledge_points: { en: "If y_if_t(x_i)=1, the factor is e^{-alpha}. If y_if_t(x_i)=-1, the factor is e^{alpha}.", cn: "若 \(y_if_t(x_i)=1\)，factor 是 \(e^{-\\alpha}\)。若 \(y_if_t(x_i)=-1\)，factor 是 \(e^{\\alpha}\)。" },
      tips: { en: ["Separate correct and wrong sets.", "Remember alpha is fixed in this part.", "Compare e^alpha and e^{-alpha}."], cn: ["分开 correct set 和 wrong set。", "这一问 alpha 是 fixed。", "比较 \(e^\\alpha\) 和 \(e^{-\\alpha}\)。"] },
      detailed_solution: detail([
        "### Weighted loss from part (a)",
        "$$\nL_t(f_t)=\\sum_iw_i\\exp\\{-\\alpha_t y_if_t(x_i)\\}\n$$",
        "### Split examples",
        "- Correct examples satisfy \(y_if_t(x_i)=1\).\n- Wrong examples satisfy \(y_if_t(x_i)=-1\).",
        "### Write the two contributions",
        "$$\nL_t=e^{-\\alpha_t}\\sum_{i:\\,y_if_t(x_i)=1}w_i+e^{\\alpha_t}\\sum_{i:\\,y_if_t(x_i)=-1}w_i\n$$",
        "### Use total weight",
        "Let \(W=\\sum_iw_i\) and \(E=\\sum_{i:\\,y_if_t(x_i)=-1}w_i\). Then correct weight is \(W-E\).",
        "$$\nL_t=e^{-\\alpha_t}(W-E)+e^{\\alpha_t}E\n$$",
        "$$\nL_t=e^{-\\alpha_t}W+(e^{\\alpha_t}-e^{-\\alpha_t})E\n$$",
        "### Minimize",
        "- \(W\) and \(\alpha_t\) are fixed.\n- Since \(\alpha_t>0\), \(e^{\\alpha_t}-e^{-\\alpha_t}>0\).\n- Therefore minimizing \(L_t\) is the same as minimizing \(E\), the weighted classification error."
      ], [
        "### 来自 part (a) 的 weighted loss",
        "$$\nL_t(f_t)=\\sum_iw_i\\exp\\{-\\alpha_t y_if_t(x_i)\\}\n$$",
        "### 拆分 examples",
        "- Correct examples 满足 \(y_if_t(x_i)=1\)。\n- Wrong examples 满足 \(y_if_t(x_i)=-1\)。",
        "### 写出两部分 contribution",
        "$$\nL_t=e^{-\\alpha_t}\\sum_{i:\\,y_if_t(x_i)=1}w_i+e^{\\alpha_t}\\sum_{i:\\,y_if_t(x_i)=-1}w_i\n$$",
        "### 使用 total weight",
        "令 \(W=\\sum_iw_i\)，\(E=\\sum_{i:\\,y_if_t(x_i)=-1}w_i\)。那么 correct weight 是 \(W-E\)。",
        "$$\nL_t=e^{-\\alpha_t}(W-E)+e^{\\alpha_t}E\n$$",
        "$$\nL_t=e^{-\\alpha_t}W+(e^{\\alpha_t}-e^{-\\alpha_t})E\n$$",
        "### 最小化",
        "- \(W\) 与 \(\alpha_t\) 都是 fixed。\n- 因为 \(\alpha_t>0\)，所以 \(e^{\\alpha_t}-e^{-\\alpha_t}>0\)。\n- 因此 minimizing \(L_t\) 等价于 minimizing \(E\)，也就是 weighted classification error。"
      ])
    },
    {
      id: "hw2-5-2d",
      section: "Problem 5.2(d)",
      title: { en: "Express the loss as a function of weighted error", cn: "把 loss 写成 weighted error 的函数" },
      original_excerpt: { en: "Detailed cue: after choosing a weak classifier with weighted error epsilon_t, rewrite the exponential loss using epsilon_t and 1-epsilon_t.", cn: "题目要点：选定 weighted error 为 \(\epsilon_t\) 的 weak classifier 后，用 \(\epsilon_t\) 和 \(1-\epsilon_t\) 重写 exponential loss。" },
      problem_understanding: { en: "This part prepares for optimizing alpha. Once the classifier is fixed, only the scalar coefficient alpha_t remains.", cn: "这一问是在为 optimize alpha 做准备。classifier 固定后，只剩 scalar coefficient \(\alpha_t\)。" },
      knowledge_points: { en: "Normalize weights or keep their total as a constant C. Correct examples contribute e^{-alpha}; wrong examples contribute e^{alpha}.", cn: "可以 normalize weights，也可以把 total weight 记为 constant \(C\)。correct examples 贡献 \(e^{-\\alpha}\)，wrong examples 贡献 \(e^{\\alpha}\)。" },
      tips: { en: ["Let epsilon be weighted wrong mass.", "Let 1-epsilon be weighted correct mass.", "Keep the total weight constant separate."], cn: ["让 epsilon 表示 weighted wrong mass。", "让 \(1-\\epsilon\) 表示 weighted correct mass。", "把 total weight 作为 constant 分开。"] },
      detailed_solution: detail([
        "### Define weighted error",
        "$$\n\\epsilon_t=\\frac{\\sum_{i:\\,y_if_t(x_i)=-1}w_i}{\\sum_iw_i}\n$$",
        "### Define total weight",
        "$$\nC=\\sum_iw_i\n$$",
        "### Wrong and correct weighted masses",
        "$$\n\\sum_{wrong}w_i=C\\epsilon_t\n$$",
        "$$\n\\sum_{correct}w_i=C(1-\\epsilon_t)\n$$",
        "### Substitute into loss",
        "$$\nL_t(\\alpha_t)=e^{-\\alpha_t}C(1-\\epsilon_t)+e^{\\alpha_t}C\\epsilon_t\n$$",
        "### Final form",
        "$$\nL_t(\\alpha_t)=C\\left((1-\\epsilon_t)e^{-\\alpha_t}+\\epsilon_t e^{\\alpha_t}\\right)\n$$"
      ], [
        "### 定义 weighted error",
        "$$\n\\epsilon_t=\\frac{\\sum_{i:\\,y_if_t(x_i)=-1}w_i}{\\sum_iw_i}\n$$",
        "### 定义 total weight",
        "$$\nC=\\sum_iw_i\n$$",
        "### Wrong 与 correct 的 weighted masses",
        "$$\n\\sum_{wrong}w_i=C\\epsilon_t\n$$",
        "$$\n\\sum_{correct}w_i=C(1-\\epsilon_t)\n$$",
        "### 代入 loss",
        "$$\nL_t(\\alpha_t)=e^{-\\alpha_t}C(1-\\epsilon_t)+e^{\\alpha_t}C\\epsilon_t\n$$",
        "### 最终形式",
        "$$\nL_t(\\alpha_t)=C\\left((1-\\epsilon_t)e^{-\\alpha_t}+\\epsilon_t e^{\\alpha_t}\\right)\n$$"
      ])
    },
    {
      id: "hw2-5-2e",
      section: "Problem 5.2(e)",
      title: { en: "Derive the optimal AdaBoost coefficient", cn: "推导 AdaBoost 的 optimal coefficient" },
      original_excerpt: { en: "Detailed cue: minimize the one-dimensional loss in alpha_t from part (d) and solve the first-order condition.", cn: "题目要点：最小化 part (d) 中关于 \(\alpha_t\) 的 one-dimensional loss，并求解 first-order condition。" },
      problem_understanding: { en: "Now f_t is fixed and epsilon_t is fixed. You differentiate the scalar loss with respect to alpha_t.", cn: "现在 \(f_t\) fixed，\(\epsilon_t\) fixed。只需要对 scalar loss 关于 \(\alpha_t\) 求导。" },
      knowledge_points: { en: "The AdaBoost coefficient is alpha_t=1/2 log((1-epsilon_t)/epsilon_t) when 0<epsilon_t<1.", cn: "当 \(0<\\epsilon_t<1\) 时，AdaBoost coefficient 是 \(\alpha_t=\\frac12\\log((1-\\epsilon_t)/\\epsilon_t)\)。" },
      tips: { en: ["Drop positive constants before differentiating.", "Differentiate e^{-alpha} carefully.", "Take logs only after isolating e^{2alpha}."], cn: ["求导前可以丢掉 positive constants。", "小心 \(e^{-\\alpha}\) 的 derivative。", "先 isolate \(e^{2\\alpha}\)，再 take logs。"] },
      detailed_solution: detail([
        "### Objective from part (d)",
        "$$\nL(\\alpha)=C\\left((1-\\epsilon)e^{-\\alpha}+\\epsilon e^{\\alpha}\\right)\n$$",
        "Since \(C>0\), minimize the bracketed expression.",
        "### Differentiate",
        "$$\n\\frac{dL}{d\\alpha}=C\\left(-(1-\\epsilon)e^{-\\alpha}+\\epsilon e^{\\alpha}\\right)\n$$",
        "### Set derivative to zero",
        "$$\n-(1-\\epsilon)e^{-\\alpha}+\\epsilon e^{\\alpha}=0\n$$",
        "$$\n\\epsilon e^{\\alpha}=(1-\\epsilon)e^{-\\alpha}\n$$",
        "### Solve",
        "$$\n\\epsilon e^{2\\alpha}=1-\\epsilon\n$$",
        "$$\ne^{2\\alpha}=\\frac{1-\\epsilon}{\\epsilon}\n$$",
        "$$\n\\alpha^*=\\frac12\\log\\frac{1-\\epsilon}{\\epsilon}\n$$"
      ], [
        "### 来自 part (d) 的 objective",
        "$$\nL(\\alpha)=C\\left((1-\\epsilon)e^{-\\alpha}+\\epsilon e^{\\alpha}\\right)\n$$",
        "因为 \(C>0\)，所以只需 minimize bracket 里的 expression。",
        "### 求导",
        "$$\n\\frac{dL}{d\\alpha}=C\\left(-(1-\\epsilon)e^{-\\alpha}+\\epsilon e^{\\alpha}\\right)\n$$",
        "### 令 derivative 为 0",
        "$$\n-(1-\\epsilon)e^{-\\alpha}+\\epsilon e^{\\alpha}=0\n$$",
        "$$\n\\epsilon e^{\\alpha}=(1-\\epsilon)e^{-\\alpha}\n$$",
        "### 求解",
        "$$\n\\epsilon e^{2\\alpha}=1-\\epsilon\n$$",
        "$$\ne^{2\\alpha}=\\frac{1-\\epsilon}{\\epsilon}\n$$",
        "$$\n\\alpha^*=\\frac12\\log\\frac{1-\\epsilon}{\\epsilon}\n$$"
      ])
    },
    {
      id: "hw2-5-2f",
      section: "Problem 5.2(f)",
      title: { en: "Interpret the sign and size of the AdaBoost coefficient", cn: "解释 AdaBoost coefficient 的 sign 与 magnitude" },
      original_excerpt: { en: "Detailed cue: use alpha_t=1/2 log((1-epsilon_t)/epsilon_t) to explain what happens when the weak learner is better than chance, at chance, worse than chance, or nearly perfect.", cn: "题目要点：用 \(\alpha_t=\\frac12\\log((1-\epsilon_t)/\epsilon_t)\) 解释 weak learner better than chance、at chance、worse than chance、nearly perfect 时的情况。" },
      problem_understanding: { en: "This asks for interpretation of the coefficient, not another derivative.", cn: "这题要解释 coefficient 的含义，不需要再做 derivative。" },
      knowledge_points: { en: "If epsilon_t<1/2, alpha_t is positive. If epsilon_t=1/2, alpha_t is zero. If epsilon_t>1/2, alpha_t is negative, meaning the classifier should effectively be flipped.", cn: "若 \(\epsilon_t<1/2\)，\(\alpha_t\) positive。若 \(\epsilon_t=1/2\)，\(\alpha_t=0\)。若 \(\epsilon_t>1/2\)，\(\alpha_t\) negative，表示 classifier 实际上应该 flip。" },
      tips: { en: ["Compare epsilon with one half.", "Use the log argument, not intuition alone.", "Mention the nearly perfect limit."], cn: ["把 epsilon 和 \(1/2\) 比。", "用 log argument，不只靠直觉。", "记得说明 nearly perfect limit。"] },
      detailed_solution: detail([
        "### Formula",
        "$$\n\\alpha_t=\\frac12\\log\\frac{1-\\epsilon_t}{\\epsilon_t}\n$$",
        "### Better than chance",
        "- If \(\epsilon_t<1/2\), then \(1-\epsilon_t>\epsilon_t\).\n- The log argument is greater than 1.\n- Therefore \(\alpha_t>0\).",
        "### At chance",
        "- If \(\epsilon_t=1/2\), then \((1-\epsilon_t)/\epsilon_t=1\).\n- Therefore \(\alpha_t=0\).\n- The learner contributes no useful direction.",
        "### Worse than chance",
        "- If \(\epsilon_t>1/2\), then the log argument is less than 1.\n- Therefore \(\alpha_t<0\).\n- A negative coefficient means the learner's predictions are better used with the sign flipped.",
        "### Nearly perfect",
        "- If \(\epsilon_t\\to0\), the ratio \((1-\epsilon_t)/\epsilon_t\) becomes very large.\n- Therefore \(\alpha_t\) becomes large and positive."
      ], [
        "### Formula",
        "$$\n\\alpha_t=\\frac12\\log\\frac{1-\\epsilon_t}{\\epsilon_t}\n$$",
        "### Better than chance",
        "- 如果 \(\epsilon_t<1/2\)，则 \(1-\epsilon_t>\epsilon_t\)。\n- log argument 大于 1。\n- 所以 \(\alpha_t>0\)。",
        "### At chance",
        "- 如果 \(\epsilon_t=1/2\)，则 \((1-\epsilon_t)/\epsilon_t=1\)。\n- 所以 \(\alpha_t=0\)。\n- 这个 learner 没有 useful direction。",
        "### Worse than chance",
        "- 如果 \(\epsilon_t>1/2\)，log argument 小于 1。\n- 所以 \(\alpha_t<0\)。\n- negative coefficient 表示这个 learner 的 predictions 更适合 flip sign 后使用。",
        "### Nearly perfect",
        "- 如果 \(\epsilon_t\\to0\)，ratio \((1-\epsilon_t)/\epsilon_t\) 会非常大。\n- 因此 \(\alpha_t\) 会变得 large and positive。"
      ])
    }
  ]);

  add("pca", [
    {
      id: "hw2-1-4",
      section: "Problem 1.4",
      title: { en: "Judge the PCA maximum-variance statement", cn: "判断 PCA maximum-variance statement" },
      original_excerpt: { en: "Detailed cue: true/false item asking whether PCA finds orthogonal directions that maximize the variance of projected data.", cn: "题目要点：True/False；判断 PCA 是否寻找 orthogonal directions，使 projected data 的 variance 最大。" },
      problem_understanding: { en: "This is the core geometric meaning of PCA: principal components are orthogonal variance-maximizing directions.", cn: "这是 PCA 的核心几何含义：principal components 是 orthogonal 且 maximize variance 的 directions。" },
      knowledge_points: { en: "For centered data with covariance Sigma, the first principal component maximizes w^T Sigma w subject to ||w||=1; later components add orthogonality constraints.", cn: "对 centered data 和 covariance \(\Sigma\)，first principal component maximize \(w^\top\Sigma w\) subject to \(\|w\|=1\)；后续 components 再加 orthogonality constraints。" },
      tips: { en: ["Remember data should be centered.", "Connect variance to w^T Sigma w.", "Mention orthogonality for multiple components."], cn: ["记得 data should be centered。", "把 variance 和 \(w^\top\Sigma w\) 联系起来。", "多个 components 时要提 orthogonality。"] },
      detailed_solution: detail([
        "### Answer",
        "- True.",
        "### Variance of a projection",
        "For a unit direction \(w\), projected variance is",
        "$$\nw^\\top\\Sigma w\n$$",
        "### PCA objective",
        "$$\n\\max_{\\|w\\|=1}w^\\top\\Sigma w\n$$",
        "### Multiple directions",
        "- The first direction maximizes projected variance.\n- The second direction maximizes remaining projected variance subject to being orthogonal to the first.\n- The same pattern continues for later principal components.",
        "### Conclusion",
        "The statement matches the standard PCA objective."
      ], [
        "### 答案",
        "- True。",
        "### Projection 的 variance",
        "对 unit direction \(w\)，projected variance 是",
        "$$\nw^\\top\\Sigma w\n$$",
        "### PCA objective",
        "$$\n\\max_{\\|w\\|=1}w^\\top\\Sigma w\n$$",
        "### 多个 directions",
        "- first direction maximize projected variance。\n- second direction 在 orthogonal to first 的约束下 maximize remaining projected variance。\n- 后续 principal components 也是同样逻辑。",
        "### 结论",
        "这句话符合 standard PCA objective。"
      ])
    },
    {
      id: "hw2-6-1",
      section: "Problem 6.1",
      title: { en: "Find the first principal component of two points", cn: "求两个 points 的 first principal component" },
      original_excerpt: { en: "Detailed cue: two 2D points are (1,3) and (4,7); draw the data and compute the first principal component direction.", cn: "题目要点：两个 2D points 为 \((1,3)\) 与 \((4,7)\)；画出 data，并计算 first principal component direction。" },
      problem_understanding: { en: "With only two points, the largest-variance direction is the line through the two centered points.", cn: "只有两个 points 时，largest-variance direction 就是穿过两个 centered points 的直线方向。" },
      knowledge_points: { en: "PCA centers the data first. For two points, the nonzero variance direction is parallel to their difference vector.", cn: "PCA 先 center data。两个 points 的 nonzero variance direction 平行于它们的 difference vector。" },
      tips: { en: ["Compute the mean first.", "Center both points.", "Normalize the difference vector."], cn: ["先算 mean。", "再 center 两个 points。", "最后 normalize difference vector。"] },
      detailed_solution: detail([
        "### Data",
        "$$\nx_1=(1,3),\\qquad x_2=(4,7)\n$$",
        "### Mean",
        "$$\n\\bar{x}=\\left(\\frac{1+4}{2},\\frac{3+7}{2}\\right)=(2.5,5)\n$$",
        "### Centered points",
        "$$\nx_1-\\bar{x}=(-1.5,-2)\n$$",
        "$$\nx_2-\\bar{x}=(1.5,2)\n$$",
        "### Direction",
        "- The centered points lie on the same line.\n- A direction vector along that line is",
        "$$\n(1.5,2)\n$$",
        "or equivalently",
        "$$\n(3,4)\n$$",
        "### Normalize",
        "$$\n\\|(3,4)\\|=\\sqrt{3^2+4^2}=5\n$$",
        "$$\nw_1=\\left(\\frac35,\\frac45\\right)\n$$",
        "### Sign note",
        "The vector \((-3/5,-4/5)\) is also a valid first principal component because PCA directions are sign-invariant."
      ], [
        "### Data",
        "$$\nx_1=(1,3),\\qquad x_2=(4,7)\n$$",
        "### Mean",
        "$$\n\\bar{x}=\\left(\\frac{1+4}{2},\\frac{3+7}{2}\\right)=(2.5,5)\n$$",
        "### Centered points",
        "$$\nx_1-\\bar{x}=(-1.5,-2)\n$$",
        "$$\nx_2-\\bar{x}=(1.5,2)\n$$",
        "### Direction",
        "- centered points 在同一条 line 上。\n- 沿着这条 line 的 direction vector 是",
        "$$\n(1.5,2)\n$$",
        "等价地可以写成",
        "$$\n(3,4)\n$$",
        "### Normalize",
        "$$\n\\|(3,4)\\|=\\sqrt{3^2+4^2}=5\n$$",
        "$$\nw_1=\\left(\\frac35,\\frac45\\right)\n$$",
        "### Sign note",
        "\((-3/5,-4/5)\) 也同样 valid，因为 PCA directions 是 sign-invariant。"
      ])
    },
    {
      id: "hw2-6-2",
      section: "Problem 6.2",
      title: { en: "Compute the covariance matrix of a four-point rectangle", cn: "计算 four-point rectangle 的 covariance matrix" },
      original_excerpt: { en: "Detailed cue: four 2D points are (2,0), (2,2), (6,0), and (6,2); compute the sample mean, center the points, and form the covariance matrix.", cn: "题目要点：四个 2D points 为 \((2,0),(2,2),(6,0),(6,2)\)；计算 sample mean、centered points，并形成 covariance matrix。" },
      problem_understanding: { en: "The points form a rectangle centered at (4,1). The horizontal spread is larger than the vertical spread, and cross terms cancel by symmetry.", cn: "这些 points 构成以 \((4,1)\) 为中心的 rectangle。horizontal spread 大于 vertical spread，cross terms 因 symmetry 抵消。" },
      knowledge_points: { en: "Covariance for centered data is the average of outer products: Sigma=(1/n)sum_i z_i z_i^T when z_i=x_i-mean.", cn: "centered data 的 covariance 是 outer products 的平均：\(\Sigma=(1/n)\sum_i z_i z_i^\top\)，其中 \(z_i=x_i-\bar{x}\)。" },
      tips: { en: ["Find the center of the rectangle.", "List all centered vectors.", "Use symmetry to see off-diagonal entries cancel."], cn: ["先找 rectangle center。", "列出所有 centered vectors。", "用 symmetry 看 off-diagonal entries 抵消。"] },
      detailed_solution: detail([
        "### Data",
        "$$\n(2,0),(2,2),(6,0),(6,2)\n$$",
        "### Mean",
        "$$\n\\bar{x}=\\left(\\frac{2+2+6+6}{4},\\frac{0+2+0+2}{4}\\right)=(4,1)\n$$",
        "### Centered points",
        "$$\n(-2,-1),\\quad(-2,1),\\quad(2,-1),\\quad(2,1)\n$$",
        "### Covariance formula",
        "$$\n\\Sigma=\\frac14\\sum_{i=1}^4 z_i z_i^\\top\n$$",
        "### Compute entries",
        "$$\n\\Sigma_{11}=\\frac14(4+4+4+4)=4\n$$",
        "$$\n\\Sigma_{22}=\\frac14(1+1+1+1)=1\n$$",
        "$$\n\\Sigma_{12}=\\Sigma_{21}=\\frac14(2-2-2+2)=0\n$$",
        "### Result",
        "$$\n\\Sigma=\\begin{pmatrix}4&0\\\\0&1\\end{pmatrix}\n$$"
      ], [
        "### Data",
        "$$\n(2,0),(2,2),(6,0),(6,2)\n$$",
        "### Mean",
        "$$\n\\bar{x}=\\left(\\frac{2+2+6+6}{4},\\frac{0+2+0+2}{4}\\right)=(4,1)\n$$",
        "### Centered points",
        "$$\n(-2,-1),\\quad(-2,1),\\quad(2,-1),\\quad(2,1)\n$$",
        "### Covariance formula",
        "$$\n\\Sigma=\\frac14\\sum_{i=1}^4 z_i z_i^\\top\n$$",
        "### 计算 entries",
        "$$\n\\Sigma_{11}=\\frac14(4+4+4+4)=4\n$$",
        "$$\n\\Sigma_{22}=\\frac14(1+1+1+1)=1\n$$",
        "$$\n\\Sigma_{12}=\\Sigma_{21}=\\frac14(2-2-2+2)=0\n$$",
        "### Result",
        "$$\n\\Sigma=\\begin{pmatrix}4&0\\\\0&1\\end{pmatrix}\n$$"
      ])
    },
    {
      id: "hw2-6-3",
      section: "Problem 6.3",
      title: { en: "Maximize projected variance for a diagonal covariance matrix", cn: "对 diagonal covariance matrix 最大化 projected variance" },
      original_excerpt: { en: "Detailed cue: covariance matrix is diagonal with entries 12, 6, 20, and 10; find the unit vector w maximizing w^T Sigma w and report the maximum value.", cn: "题目要点：covariance matrix 是 diagonal，diagonal entries 为 12, 6, 20, 10；求 unit vector \(w\) 最大化 \(w^\top\Sigma w\)，并报告 maximum value。" },
      problem_understanding: { en: "For a diagonal covariance matrix, each coordinate direction is already an eigenvector. PCA picks the coordinate with the largest diagonal entry.", cn: "对 diagonal covariance matrix，每个 coordinate direction 已经是 eigenvector。PCA 选 diagonal entry 最大的 coordinate。" },
      knowledge_points: { en: "The Rayleigh quotient w^T Sigma w under ||w||=1 is maximized by the eigenvector with the largest eigenvalue.", cn: "Rayleigh quotient \(w^\top\Sigma w\) under \(\|w\|=1\) 由 largest eigenvalue 对应的 eigenvector 最大化。" },
      tips: { en: ["Read eigenvalues from the diagonal.", "Choose the largest diagonal entry.", "Use the matching standard basis vector."], cn: ["从 diagonal 直接读 eigenvalues。", "选择最大的 diagonal entry。", "使用对应的 standard basis vector。"] },
      detailed_solution: detail([
        "### Matrix",
        "$$\n\\Sigma=\\operatorname{diag}(12,6,20,10)\n$$",
        "### Objective",
        "$$\n\\max_{\\|w\\|=1}w^\\top\\Sigma w\n$$",
        "### Expand for diagonal Sigma",
        "$$\nw^\\top\\Sigma w=12w_1^2+6w_2^2+20w_3^2+10w_4^2\n$$",
        "with",
        "$$\nw_1^2+w_2^2+w_3^2+w_4^2=1\n$$",
        "### Maximize",
        "- The coefficient 20 is the largest coefficient.\n- Put all unit-vector mass on coordinate 3.",
        "$$\nw=e_3=(0,0,1,0)^\\top\n$$",
        "### Maximum value",
        "$$\nw^\\top\\Sigma w=20\n$$"
      ], [
        "### Matrix",
        "$$\n\\Sigma=\\operatorname{diag}(12,6,20,10)\n$$",
        "### Objective",
        "$$\n\\max_{\\|w\\|=1}w^\\top\\Sigma w\n$$",
        "### 对 diagonal Sigma 展开",
        "$$\nw^\\top\\Sigma w=12w_1^2+6w_2^2+20w_3^2+10w_4^2\n$$",
        "并且",
        "$$\nw_1^2+w_2^2+w_3^2+w_4^2=1\n$$",
        "### 最大化",
        "- coefficient 20 最大。\n- 把 unit-vector mass 全放在 coordinate 3。",
        "$$\nw=e_3=(0,0,1,0)^\\top\n$$",
        "### Maximum value",
        "$$\nw^\\top\\Sigma w=20\n$$"
      ])
    }
  ]);

  add("kmeans", [
    {
      id: "hw2-7-1",
      section: "Problem 7.1",
      title: { en: "Compare soft and hard K-means optima by feasible sets", cn: "用 feasible sets 比较 soft/hard K-means optima" },
      original_excerpt: { en: "Detailed cue: hard assignments use binary entries with one 1 per row; soft assignments allow fractional entries in [0,1] with the same row-sum constraint; compare the two minimum objective values.", cn: "题目要点：hard assignments 使用 binary entries 且每行一个 1；soft assignments 允许 [0,1] fractional entries 且 row-sum constraint 相同；比较两个 minimum objective values。" },
      problem_understanding: { en: "This is a relaxation argument. Hard assignments are a special case of soft assignments, so the soft feasible set is larger.", cn: "这是 relaxation argument。hard assignments 是 soft assignments 的 special case，所以 soft feasible set 更大。" },
      knowledge_points: { en: "Minimizing over a larger feasible set cannot give a larger minimum. Therefore the soft optimum is less than or equal to the hard optimum.", cn: "在 larger feasible set 上 minimize，不可能得到更大的 minimum。因此 soft optimum 小于等于 hard optimum。" },
      tips: { en: ["Identify which feasible set contains the other.", "Remember this is a minimization problem.", "Do not compare algorithms; compare objective optima."], cn: ["先判断哪个 feasible set 包含哪个。", "记住这是 minimization problem。", "比较的是 objective optima，不是 algorithm behavior。"] },
      detailed_solution: detail([
        "### Hard feasible set",
        "$$\nV=\\{A:\\ A_{ik}\\in\\{0,1\\},\\ \\sum_kA_{ik}=1\\text{ for each }i\\}\n$$",
        "### Soft feasible set",
        "$$\nU=\\{A:\\ 0\\le A_{ik}\\le1,\\ \\sum_kA_{ik}=1\\text{ for each }i\\}\n$$",
        "### Set inclusion",
        "- Every hard assignment matrix is also a valid soft assignment matrix.\n- Binary values 0 and 1 are allowed inside the interval [0,1].",
        "$$\nV\\subseteq U\n$$",
        "### Minimization consequence",
        "Let \(J(A,\\mu)\) be the K-means objective. Since \(U\) is larger,",
        "$$\n\\min_{A\\in U,\\mu}J(A,\\mu)\\le\\min_{A\\in V,\\mu}J(A,\\mu)\n$$",
        "### Conclusion",
        "The soft-assignment optimum is less than or equal to the hard-assignment optimum."
      ], [
        "### Hard feasible set",
        "$$\nV=\\{A:\\ A_{ik}\\in\\{0,1\\},\\ \\sum_kA_{ik}=1\\text{ for each }i\\}\n$$",
        "### Soft feasible set",
        "$$\nU=\\{A:\\ 0\\le A_{ik}\\le1,\\ \\sum_kA_{ik}=1\\text{ for each }i\\}\n$$",
        "### Set inclusion",
        "- 每个 hard assignment matrix 也是 valid soft assignment matrix。\n- binary values 0 和 1 本来就属于 interval [0,1]。",
        "$$\nV\\subseteq U\n$$",
        "### Minimization consequence",
        "令 \(J(A,\\mu)\) 表示 K-means objective。因为 \(U\) 更大，",
        "$$\n\\min_{A\\in U,\\mu}J(A,\\mu)\\le\\min_{A\\in V,\\mu}J(A,\\mu)\n$$",
        "### 结论",
        "soft-assignment optimum 小于等于 hard-assignment optimum。"
      ])
    },
    {
      id: "hw2-7-2",
      section: "Problem 7.2",
      title: { en: "Lower-bound the soft objective by nearest-center hard assignment", cn: "用 nearest-center hard assignment 下界 soft objective" },
      original_excerpt: { en: "Detailed cue: for fixed centers and any soft assignment row, show the weighted average of squared distances is at least the smallest squared distance for that data point.", cn: "题目要点：固定 centers 和任意 soft assignment row，证明 squared distances 的 weighted average 至少是该 data point 到最近 center 的 squared distance。" },
      problem_understanding: { en: "Each soft row is a convex combination of distances. A convex combination cannot be smaller than the minimum value being averaged.", cn: "每个 soft row 是 distances 的 convex combination。convex combination 不会小于被平均数值里的 minimum。" },
      knowledge_points: { en: "For weights A_ik>=0 summing to 1, sum_k A_ik d_ik >= min_k d_ik. Apply this pointwise and then sum over i.", cn: "若 weights \(A_{ik}\\ge0\) 且和为 1，则 \(\sum_kA_{ik}d_{ik}\\ge\min_kd_{ik}\)。对每个 point 用一次，再对 i 求和。" },
      tips: { en: ["Fix centers before comparing.", "Use the minimum distance for each point.", "Only after the pointwise inequality should you sum over all data."], cn: ["比较前先固定 centers。", "对每个 point 使用 minimum distance。", "先做 pointwise inequality，再对所有 data 求和。"] },
      detailed_solution: detail([
        "### Define distances",
        "$$\nd_{ik}=\\|x_i-\\mu_k\\|^2\n$$",
        "### Soft row constraints",
        "$$\nA_{ik}\\ge0,\\qquad \\sum_kA_{ik}=1\n$$",
        "### Pointwise lower bound",
        "For a fixed \(i\), every distance satisfies",
        "$$\nd_{ik}\\ge \\min_\\ell d_{i\\ell}\n$$",
        "Multiply by \(A_{ik}\\ge0\) and sum over \(k\):",
        "$$\n\\sum_kA_{ik}d_{ik}\\ge\\sum_kA_{ik}\\min_\\ell d_{i\\ell}\n$$",
        "Use the row-sum constraint:",
        "$$\n\\sum_kA_{ik}d_{ik}\\ge\\min_\\ell d_{i\\ell}\\sum_kA_{ik}=\\min_\\ell d_{i\\ell}\n$$",
        "### Sum over all points",
        "$$\n\\sum_i\\sum_kA_{ik}\\|x_i-\\mu_k\\|^2\\ge\\sum_i\\min_k\\|x_i-\\mu_k\\|^2\n$$",
        "### Meaning",
        "For fixed centers, the best hard nearest-center assignment is no worse than any soft fractional assignment."
      ], [
        "### 定义 distances",
        "$$\nd_{ik}=\\|x_i-\\mu_k\\|^2\n$$",
        "### Soft row constraints",
        "$$\nA_{ik}\\ge0,\\qquad \\sum_kA_{ik}=1\n$$",
        "### Pointwise lower bound",
        "固定 \(i\) 时，每个 distance 都满足",
        "$$\nd_{ik}\\ge \\min_\\ell d_{i\\ell}\n$$",
        "乘上 \(A_{ik}\\ge0\) 并对 \(k\) 求和：",
        "$$\n\\sum_kA_{ik}d_{ik}\\ge\\sum_kA_{ik}\\min_\\ell d_{i\\ell}\n$$",
        "使用 row-sum constraint：",
        "$$\n\\sum_kA_{ik}d_{ik}\\ge\\min_\\ell d_{i\\ell}\\sum_kA_{ik}=\\min_\\ell d_{i\\ell}\n$$",
        "### 对所有 points 求和",
        "$$\n\\sum_i\\sum_kA_{ik}\\|x_i-\\mu_k\\|^2\\ge\\sum_i\\min_k\\|x_i-\\mu_k\\|^2\n$$",
        "### 含义",
        "固定 centers 时，best hard nearest-center assignment 不会比任意 soft fractional assignment 更差。"
      ])
    },
    {
      id: "hw2-7-3",
      section: "Problem 7.3",
      title: { en: "Conclude soft and hard K-means have the same optimum", cn: "推出 soft 与 hard K-means 有相同 optimum" },
      original_excerpt: { en: "Detailed cue: combine the relaxation inequality from 7.1 with the nearest-center lower bound from 7.2 to prove the two optimal objective values are equal.", cn: "题目要点：结合 7.1 的 relaxation inequality 与 7.2 的 nearest-center lower bound，证明两个 optimal objective values 相等。" },
      problem_understanding: { en: "You need a sandwich argument: one part says soft cannot be larger than hard, the other says soft cannot be smaller than the nearest hard assignment.", cn: "需要 sandwich argument：一边说明 soft 不会大于 hard，另一边说明 soft 不会小于 nearest hard assignment。" },
      knowledge_points: { en: "Although soft assignments relax the feasible set, the squared-distance linear objective in A reaches its best value at an extreme point, which corresponds to hard nearest-center assignment.", cn: "虽然 soft assignments 放宽了 feasible set，但 squared-distance objective 对 A 是 linear 的，最佳值会出现在 extreme point，也就是 hard nearest-center assignment。" },
      tips: { en: ["Use the inequality from 7.1 first.", "Use the pointwise nearest-center bound from 7.2 second.", "State both directions before claiming equality."], cn: ["先用 7.1 的 inequality。", "再用 7.2 的 pointwise nearest-center bound。", "先写出两个方向，再说 equality。"] },
      detailed_solution: detail([
        "### Define optimal values",
        "$$\nJ_{soft}^*=\\min_{A\\in U,\\mu}J(A,\\mu)\n$$",
        "$$\nJ_{hard}^*=\\min_{A\\in V,\\mu}J(A,\\mu)\n$$",
        "### Direction from relaxation",
        "Because \(V\\subseteq U\), part 7.1 gives",
        "$$\nJ_{soft}^*\\le J_{hard}^*\n$$",
        "### Direction from nearest-center bound",
        "For any fixed centers and any soft assignment, part 7.2 gives",
        "$$\nJ(A,\\mu)\\ge\\sum_i\\min_k\\|x_i-\\mu_k\\|^2\n$$",
        "The right side is exactly the objective obtained by assigning every point to its nearest center, which is a hard assignment.",
        "Therefore, after minimizing over centers,",
        "$$\nJ_{soft}^*\\ge J_{hard}^*\n$$",
        "### Sandwich",
        "$$\nJ_{soft}^*\\le J_{hard}^*\\quad\\text{and}\\quad J_{soft}^*\\ge J_{hard}^*\n$$",
        "$$\nJ_{soft}^*=J_{hard}^*\n$$",
        "### Conclusion",
        "Soft K-means and hard K-means have the same optimal objective value for this formulation."
      ], [
        "### 定义 optimal values",
        "$$\nJ_{soft}^*=\\min_{A\\in U,\\mu}J(A,\\mu)\n$$",
        "$$\nJ_{hard}^*=\\min_{A\\in V,\\mu}J(A,\\mu)\n$$",
        "### Relaxation 给出的方向",
        "因为 \(V\\subseteq U\)，part 7.1 给出",
        "$$\nJ_{soft}^*\\le J_{hard}^*\n$$",
        "### Nearest-center bound 给出的方向",
        "对任意 fixed centers 和任意 soft assignment，part 7.2 给出",
        "$$\nJ(A,\\mu)\\ge\\sum_i\\min_k\\|x_i-\\mu_k\\|^2\n$$",
        "右边正是把每个 point 分配给 nearest center 得到的 objective，而这是一个 hard assignment。",
        "因此对 centers 也 minimize 后，",
        "$$\nJ_{soft}^*\\ge J_{hard}^*\n$$",
        "### Sandwich",
        "$$\nJ_{soft}^*\\le J_{hard}^*\\quad\\text{and}\\quad J_{soft}^*\\ge J_{hard}^*\n$$",
        "$$\nJ_{soft}^*=J_{hard}^*\n$$",
        "### 结论",
        "在这个 formulation 下，soft K-means 与 hard K-means 的 optimal objective value 相同。"
      ])
    }
  ]);
})();

(function () {
  const data = window.POPUP_DATA || {};
  const hw = "hw2";
  const join = parts => parts.join("\n\n");
  const detail = (en, cn) => ({ en: join(en), cn: join(cn) });
  function add(slug, items) {
    if (!data[slug]) return;
    data[slug].problems = data[slug].problems || [];
    data[slug].problems.push(...items.map(item => ({ ...item, hw })));
  }

  add("kernel-methods", [
    {
      id: "hw2-1-2",
      section: "Problem 1.2",
      title: { en: "Check the core claim of the kernel trick", cn: "判断 kernel trick 的核心说法" },
      original_excerpt: { en: "Detailed cue: true/false about computing inner products in a high-dimensional feature space without explicitly mapping data there.", cn: "题目要点：True/False；判断是否能不显式 mapping 到 high-dimensional feature space，也能计算那里的 inner products。" },
      problem_understanding: { en: "This asks for the definition of kernel trick: a kernel function gives the feature-space inner product directly.", cn: "这题考 kernel trick 定义：kernel function 直接给出 feature-space inner product。" },
      knowledge_points: { en: "If k(x,z)=phi(x)^T phi(z), algorithms needing only inner products can use k instead of constructing phi.", cn: "若 \(k(x,z)=\phi(x)^\top\phi(z)\)，只依赖 inner products 的算法可直接用 k，不必构造 phi。" },
      tips: { en: ["Write the kernel identity.", "Mention implicit feature space.", "Do not construct phi unless asked."], cn: ["写出 kernel identity。", "说明 implicit feature space。", "题目没要求就不用构造 phi。"] },
      detailed_solution: detail([
        "### Answer",
        "- True.",
        "### Identity",
        "$$\nk(x,z)=\\phi(x)^\\top\\phi(z)\n$$",
        "### Reasoning",
        "- The algorithm calls \(k(x,z)\) in input space.\n- This value equals an inner product in feature space.\n- Therefore the high-dimensional vectors \(\phi(x)\) and \(\phi(z)\) never need to be explicitly built.",
        "### Conclusion",
        "That is exactly what the kernel trick means."
      ], [
        "### 答案",
        "- True。",
        "### Identity",
        "$$\nk(x,z)=\\phi(x)^\\top\\phi(z)\n$$",
        "### 推理",
        "- 算法在 input space 里调用 \(k(x,z)\)。\n- 这个值等于 feature space 里的 inner product。\n- 因此不需要显式构造 high-dimensional vectors \(\phi(x)\)、\(\phi(z)\)。",
        "### 结论",
        "这正是 kernel trick 的含义。"
      ])
    },
    {
      id: "hw2-3-2",
      section: "Problem 3.2",
      title: { en: "Write the RBF-kernel SVM prediction function", cn: "写出 RBF-kernel SVM prediction function" },
      original_excerpt: { en: "Detailed cue: apply the Gaussian/RBF kernel to the dual-form SVM prediction and write f_sigma(x).", cn: "题目要点：把 Gaussian / RBF kernel 应用于 dual-form SVM prediction，写出 \(f_\sigma(x)\)。" },
      problem_understanding: { en: "Replace the linear inner product with the RBF kernel evaluation between the training point and the new point.", cn: "把 linear inner product 换成 training point 与新点之间的 RBF kernel evaluation。" },
      knowledge_points: { en: "Kernel SVM prediction is sum_i alpha_i y_i k(x_i,x). For RBF, k=exp(-||x_i-x||^2/(2 sigma^2)).", cn: "Kernel SVM prediction 是 \(\sum_i\alpha_i y_i k(x_i,x)\)。RBF 中 \(k=\exp(-\|x_i-x\|^2/(2\sigma^2))\)。" },
      tips: { en: ["Start from the linear dual prediction.", "Replace only the dot product.", "Keep alpha and y outside the kernel."], cn: ["从 linear dual prediction 开始。", "只替换 dot product。", "alpha 和 y 保留在 kernel 外。"] },
      detailed_solution: detail([
        "### Linear dual prediction",
        "$$\nf(x)=\\sum_{i=1}^N\\hat\\alpha_i y_i x_i^\\top x\n$$",
        "### RBF kernel",
        "$$\nk_\\sigma(x_i,x)=\\exp\\left(-\\frac{\\|x_i-x\\|^2}{2\\sigma^2}\\right)\n$$",
        "### Substitute",
        "$$\nf_\\sigma(x)=\\sum_{i=1}^N\\hat\\alpha_i y_i k_\\sigma(x_i,x)\n$$",
        "$$\nf_\\sigma(x)=\\sum_{i=1}^N\\hat\\alpha_i y_i\\exp\\left(-\\frac{\\|x_i-x\\|^2}{2\\sigma^2}\\right)\n$$"
      ], [
        "### Linear dual prediction",
        "$$\nf(x)=\\sum_{i=1}^N\\hat\\alpha_i y_i x_i^\\top x\n$$",
        "### RBF kernel",
        "$$\nk_\\sigma(x_i,x)=\\exp\\left(-\\frac{\\|x_i-x\\|^2}{2\\sigma^2}\\right)\n$$",
        "### 代入",
        "$$\nf_\\sigma(x)=\\sum_{i=1}^N\\hat\\alpha_i y_i k_\\sigma(x_i,x)\n$$",
        "$$\nf_\\sigma(x)=\\sum_{i=1}^N\\hat\\alpha_i y_i\\exp\\left(-\\frac{\\|x_i-x\\|^2}{2\\sigma^2}\\right)\n$$"
      ])
    },
    {
      id: "hw2-3-3",
      section: "Problem 3.3",
      title: { en: "Prove the small-bandwidth RBF SVM limit", cn: "证明 small-bandwidth RBF SVM limit" },
      original_excerpt: { en: "Detailed cue: split support vectors into the closest set T and the rest, divide by exp(-rho^2/(2 sigma^2)), and take sigma to zero.", cn: "题目要点：把 support vectors 分成 closest set T 和其余部分；除以 \(\exp(-\rho^2/(2\sigma^2))\)，再令 sigma 趋近 0。" },
      problem_understanding: { en: "Only the closest support vectors survive because all farther RBF terms decay exponentially faster.", cn: "只有 closest support vectors 留下来，因为更远的 RBF terms 衰减得 exponentially faster。" },
      knowledge_points: { en: "RBF kernels decay with squared distance. A positive distance gap becomes decisive when sigma tends to zero.", cn: "RBF kernel 按 squared distance 衰减。sigma 趋近 0 时，positive distance gap 会决定极限。" },
      tips: { en: ["Sum only over support vectors.", "Factor out the closest exponential.", "Every nonclosest term has a positive exponent gap."], cn: ["只对 support vectors 求和。", "提出 closest exponential。", "每个 nonclosest term 都有 positive exponent gap。"] },
      detailed_solution: detail([
        "### Start with support vectors",
        "$$\nf_\\sigma(x)=\\sum_{i\\in S}\\hat\\alpha_i y_i\\exp\\left(-\\frac{\\|x_i-x\\|^2}{2\\sigma^2}\\right)\n$$",
        "### Split the set",
        "- For \(i\\in T\), \(\|x_i-x\|^2=\rho^2\).\n- For \(j\\in S\\setminus T\), \(\|x_j-x\|^2-\rho^2>0\).",
        "### Divide by closest scale",
        "$$\n\\frac{f_\\sigma(x)}{\\exp(-\\rho^2/(2\\sigma^2))}\n=\n\\sum_{i\\in T}\\hat\\alpha_i y_i\n+\n\\sum_{j\\in S\\setminus T}\\hat\\alpha_j y_j\n\\exp\\left(-\\frac{\\|x_j-x\\|^2-\\rho^2}{2\\sigma^2}\\right)\n$$",
        "### Limit",
        "$$\n\\exp\\left(-\\frac{\\|x_j-x\\|^2-\\rho^2}{2\\sigma^2}\\right)\\to0\n$$",
        "$$\n\\lim_{\\sigma\\to0}\\frac{f_\\sigma(x)}{\\exp(-\\rho^2/(2\\sigma^2))}\n=\\sum_{i\\in T}\\hat\\alpha_i y_i\n$$",
        "### Meaning",
        "The nearest support vectors dominate, so tiny-bandwidth RBF SVM behaves like a nearest-support-vector rule."
      ], [
        "### 从 support vectors 开始",
        "$$\nf_\\sigma(x)=\\sum_{i\\in S}\\hat\\alpha_i y_i\\exp\\left(-\\frac{\\|x_i-x\\|^2}{2\\sigma^2}\\right)\n$$",
        "### 拆分集合",
        "- 对 \(i\\in T\)，\(\|x_i-x\|^2=\rho^2\)。\n- 对 \(j\\in S\\setminus T\)，\(\|x_j-x\|^2-\rho^2>0\)。",
        "### 除以 closest scale",
        "$$\n\\frac{f_\\sigma(x)}{\\exp(-\\rho^2/(2\\sigma^2))}\n=\n\\sum_{i\\in T}\\hat\\alpha_i y_i\n+\n\\sum_{j\\in S\\setminus T}\\hat\\alpha_j y_j\n\\exp\\left(-\\frac{\\|x_j-x\\|^2-\\rho^2}{2\\sigma^2}\\right)\n$$",
        "### Limit",
        "$$\n\\exp\\left(-\\frac{\\|x_j-x\\|^2-\\rho^2}{2\\sigma^2}\\right)\\to0\n$$",
        "$$\n\\lim_{\\sigma\\to0}\\frac{f_\\sigma(x)}{\\exp(-\\rho^2/(2\\sigma^2))}\n=\\sum_{i\\in T}\\hat\\alpha_i y_i\n$$",
        "### 含义",
        "Nearest support vectors 主导结果，所以 tiny-bandwidth RBF SVM 接近 nearest-support-vector rule。"
      ])
    },
    {
      id: "hw2-3-4",
      section: "Problem 3.4",
      title: { en: "Construct the explicit feature map for the quadratic kernel", cn: "构造 quadratic kernel 的 explicit feature map" },
      original_excerpt: { en: "Detailed cue: for k(x,x')=(1+x^T x')^2 with x in R^d, write phi(x) so phi(x)^T phi(x') reproduces the kernel exactly.", cn: "题目要点：给定 \(k(x,x')=(1+x^\top x')^2\)，\(x\in R^d\)；写出 \(\phi(x)\)，使 \(\phi(x)^\top\phi(x')\) 精确等于 kernel。" },
      problem_understanding: { en: "Expand the polynomial and match each term with one feature coordinate.", cn: "先展开 polynomial，再把每类 term 匹配到 feature coordinate。" },
      knowledge_points: { en: "The map contains constant, linear, square, and pairwise cross coordinates; sqrt(2) creates coefficient 2 after dot product.", cn: "Feature map 包含 constant、linear、square、pairwise cross coordinates；\(\sqrt2\) 用来在 dot product 后产生 coefficient 2。" },
      tips: { en: ["Expand first.", "Use sqrt(2) for coefficient-2 terms.", "List cross terms once with i<j."], cn: ["先展开。", "coefficient 2 的项用 \(\sqrt2\)。", "cross terms 只列 \(i<j\)。"] },
      detailed_solution: detail([
        "### Expand",
        "$$\n(1+x^\\top x')^2=1+2x^\\top x'+(x^\\top x')^2\n$$",
        "### Linear terms",
        "$$\n2x^\\top x'=2\\sum_i x_i x_i'\n$$",
        "Use coordinates \(\sqrt2 x_i\), because \((\sqrt2 x_i)(\sqrt2 x_i')=2x_i x_i'\).",
        "### Quadratic terms",
        "$$\n(x^\\top x')^2=\\sum_i x_i^2(x_i')^2+2\\sum_{i<j}x_i x_j x_i' x_j'\n$$",
        "Use \(x_i^2\) for square terms and \(\sqrt2 x_i x_j\) for cross terms.",
        "### Feature map",
        "$$\n\\phi(x)=\\bigl(1,\\sqrt2x_1,\\ldots,\\sqrt2x_d,x_1^2,\\ldots,x_d^2,\\sqrt2x_i x_j\\text{ for }i<j\\bigr)\n$$",
        "### Dimension",
        "$$\n1+2d+\\frac{d(d-1)}2\n$$"
      ], [
        "### 展开",
        "$$\n(1+x^\\top x')^2=1+2x^\\top x'+(x^\\top x')^2\n$$",
        "### Linear terms",
        "$$\n2x^\\top x'=2\\sum_i x_i x_i'\n$$",
        "使用 coordinates \(\sqrt2 x_i\)，因为 \((\sqrt2 x_i)(\sqrt2 x_i')=2x_i x_i'\)。",
        "### Quadratic terms",
        "$$\n(x^\\top x')^2=\\sum_i x_i^2(x_i')^2+2\\sum_{i<j}x_i x_j x_i' x_j'\n$$",
        "square terms 用 \(x_i^2\)，cross terms 用 \(\sqrt2 x_i x_j\)。",
        "### Feature map",
        "$$\n\\phi(x)=\\bigl(1,\\sqrt2x_1,\\ldots,\\sqrt2x_d,x_1^2,\\ldots,x_d^2,\\sqrt2x_i x_j\\text{ for }i<j\\bigr)\n$$",
        "### Dimension",
        "$$\n1+2d+\\frac{d(d-1)}2\n$$"
      ])
    }
  ]);
})();
