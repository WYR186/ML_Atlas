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
      cn: "概率是 ML 的语言：用条件概率、独立性、贝叶斯更新做不确定性推理。期末高频考点是 Bayes 计算和 Naive Bayes 的因子分解。",
      en: "Probability is the language for reasoning under uncertainty. Most exam-relevant: Bayes computations and the conditional-independence factorization in Naive Bayes."
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
    problems: []
  },

  "linear-algebra": {
    tutorial: {
      cn: "线代是 shape 的语言。考试主要在判断梯度、Hessian、Jacobian 的 shape，以及把目标函数写成矩阵形式。",
      en: "Linear algebra is the grammar of shapes. Exams test gradient/Hessian/Jacobian shapes and matrix-form objectives."
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
      cn: "优化告诉你怎么走到最好。凸性是核心：Hessian PSD ⇒ 凸；PD ⇒ 严格凸（唯一最优）。GD 更新 wₜ₊₁ = wₜ − η∇f(wₜ)。",
      en: "Optimization tells you how to reach the optimum. Convexity is key: PSD Hessian ⇒ convex; PD ⇒ strictly convex (unique optimum)."
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
        id: "hw1-4-1", hw: "hw1", section: "§4.1",
        title: { cn: "二元交叉熵 logistic 损失的 Hessian H = XᵀBX 推导 + 证明 PSD",
                 en: "Derive logistic Hessian H = XᵀBX, show PSD" },
        solution: {
          cn: "对单样本求二阶导：∂²ℓ/∂z² = σ(z)(1-σ(z)) ∈ (0, 1/4]，记为 b_i。链式法则 ∂z/∂w = x_i，所以 ∂²L/∂w∂wᵀ = Σ b_i x_i x_iᵀ = XᵀBX，B = diag(b_i)。对任意 v：vᵀ(XᵀBX)v = ‖B^{1/2}Xv‖² ≥ 0 ⇒ PSD。",
          en: "σ(z)(1-σ(z)) ≥ 0 gives b_i ≥ 0; H = Σ b_i x_i x_iᵀ = XᵀBX. For any v: vᵀHv = ‖B^{1/2}Xv‖² ≥ 0."
        }
      },
      {
        id: "hw1-4-2", hw: "hw1", section: "§4.2",
        title: { cn: "logistic 损失凸性 ⇒ 局部最小 = 全局最小",
                 en: "Logistic loss convex ⇒ local min = global min" },
        solution: {
          cn: "上一题已证 H ⪰ 0，二阶判定 ⇒ logistic loss 凸。凸函数任何局部极小都是全局极小（凸的‘碗’不存在坏盆地）。",
          en: "PSD Hessian ⇒ convex; for convex f, every local minimum is a global minimum."
        }
      },
      {
        id: "hw1-4-3", hw: "hw1", section: "§4.3-4",
        title: { cn: "证明 ‖x‖₂ 凸 · log-sum-exp 凸",
                 en: "Prove ‖x‖₂ convex; prove log-sum-exp convex" },
        solution: {
          cn: "‖·‖₂ 凸：由三角不等式 ‖λx+(1-λ)y‖ ≤ λ‖x‖ + (1-λ)‖y‖。log-sum-exp：用 Hölder/Cauchy-Schwarz 或对其 Hessian 直接判 PSD（形式为 diag(p) − ppᵀ，其中 p 是 softmax 概率，PSD 因为它是协方差矩阵）。",
          en: "Norm: triangle inequality directly gives convexity. log-sum-exp Hessian = diag(p) − ppᵀ (a covariance matrix) is PSD."
        }
      },
      {
        id: "hw1-4-4", hw: "hw1", section: "§4.5",
        title: { cn: "True/False · 约束凸优化（feasible set 凸 / 对偶函数恒凹 / 强对偶 / 对偶解 = 原始解）",
                 en: "T/F: feasible set convex; dual function concave; strong duality; primal=dual solution" },
        solution: {
          cn: "(a) T：g 凸 ⇒ {g ≤ 0} 凸。(b) T：dual function = inf 在仿射函数族下，永远凹。(c) T：强对偶定义如此。(d) F：对偶解给出对偶最优值，原始解可能不同（甚至原始最优可能不达到）。",
          en: "(a) T (b) T (c) T (d) F (dual solution gives dual value, not necessarily a primal solution)."
        }
      },
      {
        id: "hw1-4-5", hw: "hw1", section: "§4.6",
        title: { cn: "次梯度下降不等式：‖xₜ₊₁ - x*‖² ≤ ‖xₜ - x*‖² - 2η(f(xₜ)-f*) + η²G²",
                 en: "Subgradient descent inequality" },
        solution: {
          cn: "用次梯度定义 f(x) - f(x*) ≤ ⟨s, x - x*⟩。展开 ‖xₜ - ηs - x*‖² = ‖xₜ-x*‖² - 2η⟨s, xₜ-x*⟩ + η²‖s‖²，把不等式代入并利用 ‖s‖ ≤ G 即可。意义：步长足够小时，每步距离 x* 单调下降（达到 f 下降）。",
          en: "Use subgradient inequality + expand ‖x − ηs − x*‖² and bound ‖s‖ ≤ G. Implies one-step monotone decrease toward x* for small enough η."
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
        id: "hw1-1-1", hw: "hw1", section: "§1.1",
        title: { cn: "7 点 ℝ³ 数据集 KNN：求 k=1, k=3 在 q=(3,2,4) 处的预测",
                 en: "7-point ℝ³ KNN: predict k=1 vs k=3 at q=(3,2,4)" },
        solution: {
          cn: "对每个训练点求欧氏距离，排序：x⁵=(3,2,2)→2、x⁴=(4,3,2)→√6、x²=(0,2,3)→√10、x⁷=(2,0,2)→3、x⁶=(1,1,0)→√21、x¹=(1,3,1)→√14、x³=(2,4,1)→√14。最近的是 x⁵，标签 2 ⇒ k=1 预测 2；最近的 3 个 (x⁵, x⁴, x²) 标签 (2,1,2) ⇒ k=3 预测 2。",
          en: "Compute distances, sort. Closest is x⁵ (label 2). Top-3: x⁵, x⁴, x² with labels (2, 1, 2) → majority 2."
        }
      },
      {
        id: "hw1-1-2", hw: "hw1", section: "§1.2",
        title: { cn: "维度灾难：‖Xⱼ−q‖² 在 d→∞ 时集中在 d/6，且 R₍₁₎ = O(√d)",
                 en: "Curse of dim: ‖Xⱼ−q‖² concentrates at d/6 and R₍₁₎ = O(√d)" },
        solution: {
          cn: "Xⱼᵢ, qᵢ 独立 U[0,1] ⇒ E[(Xⱼᵢ−qᵢ)²] = 1/6，方差 O(1)，所以 ‖Xⱼ−q‖² 期望 d/6、标准差 O(√d)。Chebyshev：相对偏差 O(1/√d) → 0，对所有 n 个点用 union bound 仍然集中。从而 R₍₁₎ = √d/√6 + 低阶项 = Θ(√d)，最近/最远比 → 1。结论：高维下 KNN 失效。",
          en: "Each coord contributes mean 1/6 and O(1) variance ⇒ ‖·‖² has mean d/6, std O(√d), so Chebyshev gives concentration. Therefore R₍₁₎ ≈ √(d/6) and nearest/farthest ratio → 1."
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
        id: "hw1-2-1", hw: "hw1", section: "§2.1",
        title: { cn: "Gaussian NB 后验写成 logistic 形式 P(y=+1|x) = 1/(1+exp(log A/B))",
                 en: "GNB posterior in logistic form" },
        solution: {
          cn: "Bayes：P(y=+1|x) = pP(x|+1)/(pP(x|+1)+(1-p)P(x|-1))。同除分子：1/(1 + (1-p)P(x|-1)/(pP(x|+1)))，括号里写成 exp(log) 即得 logistic 形式。A = (1-p)P(x|-1)，B = pP(x|+1)。",
          en: "Apply Bayes, divide numerator/denominator by P(+1)P(x|+1), and rewrite the ratio as exp(log A/B)."
        }
      },
      {
        id: "hw1-2-2", hw: "hw1", section: "§2.2",
        title: { cn: "条件独立 + 单维高斯 ⇒ 联合是 N(μ±, I)",
                 en: "Diag Gaussians per feature combine to N(μ±, I)" },
        solution: {
          cn: "条件独立 ⇒ P(x|y=±1) = ∏ⱼ N(xⱼ; μ±,ⱼ, 1)。乘积是各分量独立的多元高斯，即 N(μ±, I)（恒等协方差）。",
          en: "Independent unit-variance Gaussians per coordinate combine into a multivariate N(μ, I)."
        }
      },
      {
        id: "hw1-2-3", hw: "hw1", section: "§2.3",
        title: { cn: "log A/B = wᵀx + b（线性边界）",
                 en: "log A/B = wᵀx + b (linear boundary)" },
        solution: {
          cn: "代入 N(μ±, I)：log A/B = log((1-p)/p) + (1/2)(‖x-μ-‖² − ‖x-μ+‖²)。展开二次项后 x² 抵消，剩 (μ+ − μ-)ᵀx + 常数。⇒ w = μ+ − μ-，b = log((1-p)/p) + (‖μ-‖² − ‖μ+‖²)/2。",
          en: "Quadratic terms cancel under shared identity covariance, leaving w = μ+ − μ- and b combining prior + mean norms."
        }
      },
      {
        id: "hw1-2-4", hw: "hw1", section: "§2.4",
        title: { cn: "一句式后验：P(y|x) = σ(y(wᵀx+b))",
                 en: "Single-expression posterior" },
        solution: {
          cn: "由 part 1+3：P(y=+1|x) = σ(wᵀx+b)；对 y=-1 取 1-σ = σ(-(wᵀx+b))。合并：P(y|x) = σ(y(wᵀx+b))，y∈{±1}。",
          en: "Combine: P(y|x) = σ(y(wᵀx+b)) with y ∈ {±1}."
        }
      },
      {
        id: "hw1-2-5", hw: "hw1", section: "§2.5",
        title: { cn: "GNB 一维：x|+1∼N(0,1), x|-1∼N(2,1), 等先验, x=1 预测",
                 en: "1-D GNB: which class at x=1?" },
        solution: {
          cn: "等先验 ⇒ 比较 likelihood：N(1;0,1) vs N(1;2,1)。两者 ∝ exp(-1/2)，相等 ⇒ 等概率，答案 (c)。直觉：x=1 正好在两类均值中点。",
          en: "Likelihoods equal at midpoint x=1 → tie, answer (c)."
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
        id: "hw1-3-1", hw: "hw1", section: "§3.1",
        title: { cn: "X 满行秩 (rank n, n≤d) ⇒ 存在 w 使 Xw = y",
                 en: "Rank n ⇒ Xw = y has a solution" },
        solution: {
          cn: "rank(X) = n 表示行空间撑满 ℝⁿ；列空间也是 n 维，等于 ℝⁿ。所以 y ∈ ℝⁿ 一定在列空间 ⇒ 存在 w 使 Xw = y。",
          en: "Full row rank ⇒ column space = ℝⁿ ⇒ any y ∈ ℝⁿ is reachable by some w."
        }
      },
      {
        id: "hw1-3-2", hw: "hw1", section: "§3.2",
        title: { cn: "用 reduced SVD X = UΣVᵀ 构造显式解 w*",
                 en: "Construct explicit w* via reduced SVD" },
        solution: {
          cn: "取 w* = VΣ⁻¹Uᵀy。验证：Xw* = UΣVᵀ · VΣ⁻¹Uᵀy = UUᵀy = y（U 的列正交）。这正是伪逆 X⁺y，也是最小范数解。",
          en: "w* = VΣ⁻¹Uᵀy. Then Xw* = UΣVᵀVΣ⁻¹Uᵀy = y. This is the Moore-Penrose pseudoinverse / min-norm solution."
        }
      },
      {
        id: "hw1-3-3", hw: "hw1", section: "§3.3",
        title: { cn: "任何 Xw=y 都是 L 的全局最优；最小损失 = 0",
                 en: "Any Xw=y globally minimizes L; min loss = 0" },
        solution: {
          cn: "L(w) = (1/2)‖Xw-y‖² ≥ 0，且 Xw = y ⇒ L = 0。因 L ≥ 0 处处成立，0 是全局最小。",
          en: "L ≥ 0 always; Xw=y gives L=0, so it's globally minimal."
        }
      },
      {
        id: "hw1-3-4", hw: "hw1", section: "§3.4",
        title: { cn: "GD 从 w₀=0 出发收敛到最小范数解 w_∞",
                 en: "GD from w₀=0 converges to min-norm solution" },
        solution: {
          cn: "(a) 任两个解 w, w_∞ 满足 Xw = Xw_∞ = y ⇒ X(w−w_∞) = 0 ⇒ w−w_∞ ∈ Ker(X)。 (b) 由正交分解 ‖w‖² = ‖w_∞‖² + ‖v‖²。 (c) ‖w‖² 最小当 v=0 ⇒ w = w_∞，唯一。 (d) 关键观察：每步更新 wₜ₊₁ − wₜ = -ηXᵀ(Xwₜ−y) ∈ Range(Xᵀ) = Ker(X)⊥。w₀=0 也在该子空间，所以所有 wₜ 始终在 Range(Xᵀ) 中。极限点既满足 Xw=y 又在 Range(Xᵀ) ⇒ 它就是最小范数解 w_∞。",
          en: "Updates lie in Range(Xᵀ) ⊥ Ker(X). Starting at 0 keeps all iterates in Range(Xᵀ). The unique fixed point in that space satisfying Xw=y is the min-norm solution."
        }
      },
      {
        id: "hw1-3-5", hw: "hw1", section: "§3.5",
        title: { cn: "D = {(1,2),(2,4)}, ŷ=wx, 求最优 w",
                 en: "Find optimal w for D={(1,2),(2,4)} with ŷ=wx" },
        solution: {
          cn: "L(w) = (2-w)² + (4-2w)²。对 w 求导：-2(2-w) - 4(4-2w) = 10w - 20 = 0 ⇒ w = 2。直觉：两点都在 y = 2x 上 ⇒ 完美拟合。",
          en: "Both points lie on y = 2x. Setting dL/dw = 0 gives 10w − 20 = 0 ⇒ w = 2."
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
    problems: []
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
      cn: "MDP 五元组 (S, A, P, R, γ)。Markov 性：未来只取决于当前 (s,a)。轨迹 τ = (s₀,a₀,r₀,...,sH)。",
      en: "MDP tuple (S, A, P, R, γ). Markov property; trajectories τ = (s₀,a₀,r₀,...,sH)."
    },
    code: [{
      title: { cn: "Gym MDP loop", en: "Gym MDP loop" },
      code: `import gymnasium as gym
env = gym.make('CartPole-v1')
obs, info = env.reset()
done = False
while not done:
    a = env.action_space.sample()                      # 占位策略
    obs, r, terminated, truncated, info = env.step(a)
    done = terminated or truncated
`
    }],
    problems: []
  },

  "value-functions": {
    tutorial: {
      cn: "V^π(s) = E[Σγᵗrₜ|s₀=s,π]：状态值。Q^π(s,a) = E[Σγᵗrₜ|s₀=s,a₀=a,π]：state-action 值。确定性策略下 V^π(s) = Q^π(s,π(s))。",
      en: "V^π(s) = expected discounted return from s under π. Q adds initial action. Deterministic π: V=Q∘π."
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
      cn: "Model-free + off-policy。TD target = r + γ maxₐ' Q(s',a')。乐观初始化（Q = R_max）鼓励探索，可以快很多。",
      en: "Model-free + off-policy. TD target r + γ max Q(s',·). Optimistic init (Q = R_max) drives exploration."
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
          cn: "π₁（Q₁=0，全 0 平局，随机打破）：每步以 1/2 概率取 a₁ 前进。一段长度 n-1 的随机游走带反弹（a₂ 把 agent 送回 s₁）。期望步数指数级 ~ 2ⁿ⁻¹（每个状态都要 ‘多次抛硬币’ 才走对一次）。π₂（Q₂=R_max）：同样平局打破随机 ⇒ 也是指数级。无学习时两者都很慢。",
          en: "Both random under ties → exponential steps (~ 2^{n−1}) before learning."
        }
      },
      {
        id: "hw5-3-2", hw: "hw5", section: "§3.2",
        title: { cn: "在线更新 + π₁：仍然指数级期望步数",
                 en: "π₁ with online updates still exponential" },
        solution: {
          cn: "Q₁ 初始 0，沿途奖励 0 ⇒ Q 不变 ⇒ 平局 ⇒ 一直随机走。直到第一次到达 sₙ 时 Q(sₙ₋₁, a₁) 才变成 αγQ(sₙ,·)... 其实仍是 0（终点 Q 也未更新）。需要等到 sₙ→sₙ 自循环奖励 1 反向传播多步后才 ‘破冰’。期望步数仍 O(2ⁿ⁻¹)。",
          en: "Reward signal at s_n hasn't propagated back; ties keep policy random — exponential expected steps."
        }
      },
      {
        id: "hw5-3-3", hw: "hw5", section: "§3.3",
        title: { cn: "重置后 π₁ 再到 sₙ 的期望步数",
                 en: "After first reach + reset, expected steps for π₁" },
        solution: {
          cn: "第一次到 sₙ 后 Q(sₙ₋₁, a₁) > 0，但前面 sₙ₋₂...s₁ 仍是 0 ⇒ 第二次同样从 s₁ 随机走。每次到 sₙ 才能反向传一步信号。期望仍指数级，只是常数缩小。",
          en: "Reward only propagates back one step per traversal — still exponential."
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
          cn: "乐观初始化保证每个 (s,a) 至少被访问一次。一旦 R_max 下降，策略转向其他乐观项。最坏情况：每个 (s,a) 被访问一次后才走对路 ⇒ O(n·|A|) = O(2n)，远小于 π₁ 的 O(2ⁿ)。所以 π₂ 上界 ≤ π₁ 期望。",
          en: "Optimistic Q forces visiting each (s,a) at most a constant times — O(n·|A|), much smaller than π₁'s O(2ⁿ)."
        }
      }
    ]
  },

  "policy-gradient": {
    tutorial: {
      cn: "直接优化 J(θ) = E_τ[R(τ)]。Log-derivative trick：∇θJ ≈ (1/n) Σ R(τᵢ) Σₜ ∇θ log πθ(aₜ|sₜ)。on-policy。",
      en: "Maximize J(θ) = E_τ[R(τ)]. Log-deriv: ∇J ≈ (1/n) Σ R(τ) Σ ∇log π. On-policy."
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
