// Comprehensive equation sheet data and renderer.
// Generated from topic-page Key Equations/formula callouts, with a small
// hand-curated supplement for equations that live in worked examples but are
// exam-central (diffusion ELBO, PE angle identities, MDP tuple, etc.).
(function () {
  const EQUATION_DATA = {
  "probability": [
    {
      "title": "Continuous expectation",
      "eq": "$$ \\mathbb{E}[X]=\\int x\\,p(x)\\,dx $$",
      "symbols": [
        { "sym": "$\\mathbb{E}[X]$", "en": "expected value (mean) of random variable $X$",         "cn": "随机变量 $X$ 的期望（均值）" },
        { "sym": "$X$",              "en": "continuous random variable",                              "cn": "连续随机变量" },
        { "sym": "$p(x)$",           "en": "probability density function (PDF) of $X$",               "cn": "$X$ 的概率密度函数 (PDF)" },
        { "sym": "$\\int \\cdot\\, dx$", "en": "integral over the entire support of $X$",             "cn": "在 $X$ 整个取值范围上积分" }
      ],
      "usage_en": "Use whenever you need the average of a continuous quantity. For discrete variables replace $\\int p(x)\\,dx$ with $\\sum P(x)$. Linearity holds: $\\mathbb{E}[aX+bY]=a\\mathbb{E}[X]+b\\mathbb{E}[Y]$ even when $X,Y$ aren't independent.",
      "usage_cn": "需要连续量的平均值时使用。离散情况把 $\\int p(x)\\,dx$ 换成 $\\sum P(x)$ 即可。线性性始终成立：$\\mathbb{E}[aX+bY]=a\\mathbb{E}[X]+b\\mathbb{E}[Y]$，即使 $X,Y$ 不独立。",
      "intuition_en": "Weighted average — sum (integrate) every possible value times the probability mass / density at that value. The 'expected' value is what you'd see on average across many samples.",
      "intuition_cn": "加权平均 —— 把每个可能取值乘以它出现的概率（密度）后加起来。\"期望\" 就是大量重复采样后看到的平均结果。",
      "source": "topics/probability.html#eq-probability-expectation-variance"
    },
    {
      "title": "Conditional Probability",
      "eq": "$$ P(A\\mid B)=\\frac{P(A,B)}{P(B)},\\qquad P(B)>0 $$",
      "symbols": [
        { "sym": "$P(A\\mid B)$", "en": "probability of $A$ given that $B$ has occurred", "cn": "已知 $B$ 发生时 $A$ 的概率" },
        { "sym": "$P(A,B)$",     "en": "joint probability — both $A$ and $B$ happen",     "cn": "联合概率 —— $A$ 与 $B$ 同时发生" },
        { "sym": "$P(B)>0$",     "en": "non-zero divisor required — can't condition on impossible events", "cn": "分母非零 —— 不能在不可能事件上做条件" }
      ],
      "usage_en": "Reduce a joint distribution to a conditional. Rearranging gives the chain rule: $P(A,B)=P(A\\mid B)P(B)=P(B\\mid A)P(A)$. Backbone of every probabilistic model that updates beliefs from data.",
      "usage_cn": "把联合分布转成条件分布。变形得链式法则：$P(A,B)=P(A\\mid B)P(B)=P(B\\mid A)P(A)$。所有 \"用数据更新信念\" 的概率模型的基础。",
      "intuition_en": "'After learning $B$, restrict the sample space to $B$.' You normalize the joint mass on $A\\cap B$ by the total mass on $B$ to get the new fractional weight of $A$.",
      "intuition_cn": "\"知道了 $B$ 之后，把样本空间收缩到 $B$ 之内。\" 把交集 $A\\cap B$ 的概率除以 $B$ 的概率，就是 $A$ 在新样本空间下的占比。",
      "source": "topics/probability.html#eq-probability-conditional-probability"
    },
    {
      "title": "Bayes' Rule",
      "eq": "$$ P(A\\mid B)=\\frac{P(B\\mid A)\\,P(A)}{P(B)} $$",
      "symbols": [
        { "sym": "$P(A\\mid B)$", "en": "**posterior** — what you want: belief in $A$ after seeing $B$", "cn": "**posterior** —— 想要的量：观察到 $B$ 后对 $A$ 的信念" },
        { "sym": "$P(B\\mid A)$", "en": "**likelihood** — how well $A$ explains the observation",          "cn": "**likelihood** —— $A$ 对观测的解释程度" },
        { "sym": "$P(A)$",       "en": "**prior** — belief in $A$ before seeing any evidence",            "cn": "**prior** —— 看到证据之前对 $A$ 的信念" },
        { "sym": "$P(B)$",       "en": "**evidence** — normalizing constant via $\\sum_a P(B\\mid a)P(a)$", "cn": "**evidence** —— 归一化常数，用 $\\sum_a P(B\\mid a)P(a)$ 算" }
      ],
      "usage_en": "Use to flip conditional direction: you have $P(B\\mid A)$ and $P(A)$, want $P(A\\mid B)$. The denominator is often dropped (write $P(A\\mid B)\\propto P(B\\mid A)P(A)$) because it doesn't depend on $A$ — fine for argmax (MAP) but needed for actual probabilities.",
      "usage_cn": "需要 \"翻转条件方向\" 时用：手上有 $P(B\\mid A)$ 和 $P(A)$，想要 $P(A\\mid B)$。分母经常省掉（写成 $P(A\\mid B)\\propto P(B\\mid A)P(A)$）—— 因为它与 $A$ 无关，做 argmax (MAP) 没影响；要真实概率才需要。",
      "intuition_en": "'Posterior $\\propto$ prior $\\times$ likelihood.' Update what you believed before by how well each hypothesis explains what you saw. The whole framework of probabilistic ML is one application of this formula.",
      "intuition_cn": "\"posterior $\\propto$ prior $\\times$ likelihood\"。用 \"每个假设对观测的解释程度\" 去更新你之前的信念。整个概率 ML 框架都是这个公式的应用。",
      "source": "topics/probability.html#eq-probability-bayes-rule"
    },
    {
      "title": "Independence",
      "eq": "$$ P(A,B)=P(A)P(B)\\;\\Leftrightarrow\\;P(A\\mid B)=P(A) $$",
      "symbols": [
        { "sym": "$A,B$",     "en": "two events / random variables",                                cn: "两个事件 / 随机变量" },
        { "sym": "$P(A,B)$",  "en": "joint probability",                                            cn: "联合概率" },
        { "sym": "$\\Leftrightarrow$", "en": "if-and-only-if — the two definitions are equivalent", cn: "充要条件 —— 两个定义等价" }
      ],
      "usage_en": "Test whether two variables share information. If independent, the joint factorizes into marginals — that simplifies modeling, parameter counts, and computation enormously. Use sample frequencies / chi-square tests to check empirically.",
      "usage_cn": "判断两个变量是否共享信息。独立 → 联合分布可以分解为各自的 marginal —— 极大简化建模、参数量和计算。实证检验用样本频率或 chi-square test。",
      "intuition_en": "'Knowing $B$ tells you nothing new about $A$.' The probability of $A$ doesn't budge when you condition on $B$. Independence is rare in real data; conditional independence (Naive Bayes) is more common.",
      "intuition_cn": "\"知道 $B$ 对 $A$ 没有任何新信息。\" 在 $B$ 上做条件后 $A$ 的概率不变。真实数据里独立很罕见，条件独立（Naive Bayes）更常见。",
      "source": "topics/probability.html#eq-probability-independence"
    },
    {
      "title": "Conditional Independence",
      "eq": "$$ P(A,B\\mid C)=P(A\\mid C)\\,P(B\\mid C) $$",
      "symbols": [
        { "sym": "$A,B$",          "en": "two random variables (often features)",            cn: "两个随机变量（常为特征）" },
        { "sym": "$C$",            "en": "the conditioning variable (often class label $Y$)", cn: "条件变量（常为类别标签 $Y$）" },
        { "sym": "$P(A\\mid C)$",  "en": "marginal-like factor for $A$ within the slice $C=c$", cn: "在 $C=c$ 切片内 $A$ 的边缘式因子" }
      ],
      "usage_en": "Backbone of Naive Bayes: assume features are independent **given the class**, even though they may be correlated marginally. Lets you fit each $P(X_j\\mid Y)$ separately instead of the joint.",
      "usage_cn": "Naive Bayes 的核心：假设 \"给定类别下\" 各特征独立，尽管 marginally 相关。可以分别拟合每个 $P(X_j\\mid Y)$，不必估联合。",
      "intuition_en": "'Once you know $C$, the link between $A$ and $B$ is gone.' Stronger than independence in only one direction: conditional independence does NOT imply marginal independence and vice versa.",
      "intuition_cn": "\"知道 $C$ 之后，$A$ 与 $B$ 的关系就断了。\" 与独立性不能互相推出 —— 边缘独立不一定条件独立，反之亦然。",
      "source": "topics/probability.html#eq-probability-conditional-independence"
    },
    {
      "title": "Law of Total Probability",
      "eq": "$$ P(B)=\\sum_{a}P(B\\mid A=a)\\,P(A=a) $$",
      "symbols": [
        { "sym": "$P(B)$",          "en": "marginal probability of $B$",                       cn: "$B$ 的边缘概率" },
        { "sym": "$P(B\\mid A=a)$", "en": "conditional probability of $B$ given $A=a$",         cn: "在 $A=a$ 条件下 $B$ 的概率" },
        { "sym": "$P(A=a)$",        "en": "weight given to scenario $a$ — must sum to 1 over $a$", cn: "情形 $a$ 的权重 —— 对所有 $a$ 求和等于 1" }
      ],
      "usage_en": "Compute a marginal by summing/integrating over a hidden variable. This is the denominator $P(B)$ in Bayes's rule, and the way you 'eliminate' nuisance variables in any joint distribution.",
      "usage_cn": "通过对隐变量求和（积分）算 marginal。Bayes 公式里的 $P(B)$ 就这么算的；任何联合分布想 \"消去\" 麻烦变量也都用它。",
      "intuition_en": "'Cover all the cases for $A$, weight each by how likely $A$ took that value, and sum.' Like splitting an integral over a partition of the sample space.",
      "intuition_cn": "\"$A$ 的所有可能情形遍历一遍，按每种情形的概率加权求和。\" 相当于把积分按样本空间的划分拆开来算。",
      "source": "topics/probability.html#eq-probability-law-of-total-probability"
    },
    {
      "title": "Expectation & Variance",
      "eq": "$$ \\mathbb{E}[X]=\\sum_x x\\,P(x),\\quad \\mathrm{Var}(X)=\\mathbb{E}[X^2]-\\mathbb{E}[X]^2 $$",
      "symbols": [
        { "sym": "$\\mathbb{E}[X]$",   "en": "mean (discrete form here)",                                  cn: "均值（这里是离散形式）" },
        { "sym": "$\\mathrm{Var}(X)$", "en": "variance — average squared deviation from the mean",         cn: "方差 —— 与均值的平均平方偏差" },
        { "sym": "$\\mathbb{E}[X^2]$", "en": "mean of the squared values (a.k.a. raw second moment)",      cn: "平方的均值（即二阶原点矩）" }
      ],
      "usage_en": "The right-hand identity $\\mathrm{Var}(X)=\\mathbb{E}[X^2]-\\mathbb{E}[X]^2$ is the fastest way to compute variance in code or by hand: one pass to accumulate $\\sum x_i^2$ and $\\sum x_i$, no need to revisit the mean. Standard deviation is $\\sqrt{\\mathrm{Var}(X)}$.",
      "usage_cn": "右边的恒等式 $\\mathrm{Var}(X)=\\mathbb{E}[X^2]-\\mathbb{E}[X]^2$ 是手算或代码里算方差最快的方式：一次循环累加 $\\sum x_i^2$ 和 $\\sum x_i$ 即可，不用回头再用均值算偏差。标准差是 $\\sqrt{\\mathrm{Var}(X)}$。",
      "intuition_en": "Mean answers 'where is the distribution centered?'; variance answers 'how spread out is it?'. The squared form magnifies large deviations more than small ones, which is why variance is sensitive to outliers.",
      "intuition_cn": "均值回答 \"分布中心在哪\"，方差回答 \"分散程度多大\"。平方形式让大偏差被放大，所以方差对 outlier 敏感。",
      "source": "topics/probability.html#eq-probability-expectation-variance"
    },
    {
      "title": "Naive Bayes Factorization (preview)",
      "eq": "$$ P(Y\\mid X_1,\\dots,X_d) \\;\\propto\\; P(Y)\\prod_{i=1}^{d} P(X_i\\mid Y) $$",
      "symbols": [
        { "sym": "$Y$",                   "en": "class label (random variable to predict)",                       cn: "类别标签（要预测的随机变量）" },
        { "sym": "$X_1,\\dots,X_d$",       "en": "$d$ observed features for one sample",                          cn: "一个样本的 $d$ 个观测特征" },
        { "sym": "$\\propto$",             "en": "proportional to — the constant denominator $P(X_1,\\dots,X_d)$ is dropped", cn: "正比于 —— 常数分母 $P(X_1,\\dots,X_d)$ 省略" },
        { "sym": "$\\prod_{i=1}^{d}$",     "en": "factorization across features (uses conditional independence)",  cn: "对特征连乘（用了条件独立假设）" }
      ],
      "usage_en": "Apply Bayes's rule, then assume conditional independence to break $P(X_1,\\dots,X_d\\mid Y)$ into a product. Pick the class $y$ that maximizes the right-hand side. This preview becomes the full Naive Bayes algorithm in Block 2.",
      "usage_cn": "先用 Bayes 公式，再用条件独立把 $P(X_1,\\dots,X_d\\mid Y)$ 拆成连乘。选让右边最大的类别 $y$。这个 \"preview\" 在 Block 2 就是完整的 Naive Bayes 算法。",
      "intuition_en": "'Posterior $\\propto$ prior $\\times$ each feature's likelihood under that class.' The conditional-independence shortcut sidesteps the curse of dimensionality of the joint $P(X_1,\\dots,X_d\\mid Y)$.",
      "intuition_cn": "\"posterior $\\propto$ prior $\\times$ 该类下各特征的 likelihood\"。条件独立这条捷径避开了联合分布 $P(X_1,\\dots,X_d\\mid Y)$ 的维度灾难。",
      "source": "topics/probability.html#eq-probability-naive-bayes-factorization-preview"
    }
  ],
  "linear-algebra": [
    {
      "title": "Dot Product & Cosine",
      "eq": "$$ x^\\top y=\\sum_{i=1}^{d} x_i y_i = \\|x\\|\\|y\\|\\cos\\theta $$",
      "symbols": [
        {
          "sym": "$x, y \\in \\mathbb{R}^d$",
          "en": "two real $d$-vectors with components $x_i, y_i$",
          "cn": "两个 $d$ 维实向量，分量 $x_i, y_i$"
        },
        {
          "sym": "$x^\\top y$",
          "en": "dot (inner) product — a scalar",
          "cn": "点积（内积）—— 一个标量"
        },
        {
          "sym": "$\\|x\\|$",
          "en": "L2 (Euclidean) length, i.e. $\\sqrt{x^\\top x}$",
          "cn": "L2（欧氏）长度，即 $\\sqrt{x^\\top x}$"
        },
        {
          "sym": "$\\theta$",
          "en": "angle between $x$ and $y$",
          "cn": "$x$ 与 $y$ 之间的夹角"
        }
      ],
      "usage_en": "Use the sum form $\\sum x_i y_i$ for computation, the cosine form $\\|x\\|\\|y\\|\\cos\\theta$ to reason about angles. Cosine similarity $= x^\\top y / (\\|x\\|\\|y\\|)$ is the basis of nearest-neighbor search in embedding spaces.",
      "usage_cn": "求和形式 $\\sum x_i y_i$ 用于代码计算，cosine 形式 $\\|x\\|\\|y\\|\\cos\\theta$ 用于推理夹角。cosine similarity $= x^\\top y / (\\|x\\|\\|y\\|)$ 是 embedding 空间近邻搜索的基础。",
      "intuition_en": "Measures how aligned two vectors are: positive → same direction, zero → orthogonal, negative → opposite. Equals the projection of $y$ onto $x$ times $\\|x\\|$ — that's why dot products show up everywhere in linear regression and attention scores.",
      "intuition_cn": "衡量两个向量方向有多接近：正 → 同向，零 → 正交，负 → 反向。几何上是 $y$ 在 $x$ 上的投影乘以 $\\|x\\|$ —— 这正是它在 linear regression、attention score 里反复出现的原因。",
      "source": "topics/linear-algebra.html#eq-linear-algebra-dot-product-cosine"
    },
    {
      "title": "$\\ell_p$ Norms",
      "eq": "$$ \\|x\\|_2=\\sqrt{x^\\top x},\\ \\|x\\|_1=\\sum_i|x_i|,\\ \\|x\\|_\\infty=\\max_i|x_i| $$",
      "symbols": [
        { "sym": "$\\|x\\|_2$",       "en": "L2 / Euclidean norm — straight-line length",                  "cn": "L2 / 欧氏范数 —— 直线长度" },
        { "sym": "$\\|x\\|_1$",       "en": "L1 norm — sum of absolute values (Manhattan)",                "cn": "L1 范数 —— 绝对值之和（Manhattan）" },
        { "sym": "$\\|x\\|_\\infty$", "en": "L∞ / max norm — largest absolute component",                  "cn": "L∞ / 最大范数 —— 绝对值最大的分量" }
      ],
      "usage_en": "Pick the norm to match the penalty you want: L2 → smooth shrinkage (ridge); L1 → sparsity (lasso, drives weights exactly to 0); L∞ → adversarial / worst-case constraints. Each induces a different unit ball (sphere, diamond, cube).",
      "usage_cn": "按你想要的惩罚效果选范数：L2 → 平滑收缩（ridge）；L1 → 稀疏（lasso，把权重正好压到 0）；L∞ → 对抗 / 最坏情况约束。它们的单位球形状不同（球、菱形、立方体）。",
      "intuition_en": "Different ways to measure 'how big is this vector?'. As $p$ grows the norm focuses more on the largest entry — at $p=\\infty$ only the max matters; at $p=1$ every component contributes equally regardless of scale.",
      "intuition_cn": "都是 \"向量有多大\" 的不同度量。$p$ 越大越聚焦最大分量 —— $p=\\infty$ 时只有最大值起作用；$p=1$ 时所有分量等权贡献。",
      "source": "topics/linear-algebra.html#eq-linear-algebra-p-norms"
    },
    {
      "title": "Matrix-Multiply Shapes",
      "eq": "$$ (m\\times n)\\cdot(n\\times p)\\to(m\\times p) $$",
      "symbols": [
        {
          "sym": "$m, n, p$",
          "en": "rows of left, shared inner dim, cols of right",
          "cn": "左阵行数、共享的内维度、右阵列数"
        },
        {
          "sym": "inner $n$",
          "en": "**must match** — left's columns equal right's rows",
          "cn": "**必须相等** —— 左阵列数等于右阵行数"
        },
        {
          "sym": "outer $m\\times p$",
          "en": "shape of the product",
          "cn": "乘积的形状"
        }
      ],
      "usage_en": "First sanity check before any matrix expression: write the shapes left-to-right, the inner dimensions must match, the outer dimensions become the result shape. Catches 90% of dimension-mismatch bugs without ever running code.",
      "usage_cn": "写任何矩阵表达式前先做这个检查：从左到右把所有形状列出来，中间维度必须相等，两端维度组合成结果形状。能在不跑代码的情况下发现 90% 的维度错误。",
      "intuition_en": "'Cancel the inner number, keep the outer pair.' Like a domino chain: $(a\\times b)(b\\times c)(c\\times d) \\to (a\\times d)$. Order matters — matrix multiply is **not** commutative.",
      "intuition_cn": "\"内维度抵消，外维度保留\"。像多米诺：$(a\\times b)(b\\times c)(c\\times d) \\to (a\\times d)$。顺序很重要 —— 矩阵乘法**不**满足交换律。",
      "source": "topics/linear-algebra.html#eq-linear-algebra-matrix-multiply-shapes"
    },
    {
      "title": "Rank-Nullity",
      "eq": "$$ \\dim\\mathrm{Col}(A)+\\dim\\mathrm{Ker}(A)=n,\\ \\ A\\in\\mathbb{R}^{m\\times n} $$",
      "symbols": [
        {
          "sym": "$\\mathrm{Col}(A)$",
          "en": "column space — set of all $Ax$ as $x$ varies",
          "cn": "列空间 —— $x$ 取遍时所有 $Ax$ 的集合"
        },
        {
          "sym": "$\\mathrm{Ker}(A)$",
          "en": "null space — vectors $x$ with $Ax = 0$",
          "cn": "零空间 —— 满足 $Ax=0$ 的向量"
        },
        {
          "sym": "$\\dim$",
          "en": "dimension of a subspace (number of basis vectors)",
          "cn": "子空间的维度（基向量个数）"
        },
        {
          "sym": "$n$",
          "en": "number of columns of $A$ (input dimension)",
          "cn": "$A$ 的列数（输入维度）"
        }
      ],
      "usage_en": "Diagnose linear systems $Ax=b$. If $\\dim\\mathrm{Ker}(A) > 0$ the system has either no solution or infinitely many; the $X^\\top X$ matrix in OLS is singular when $X$ has dependent columns, which is exactly $\\dim\\mathrm{Ker} > 0$.",
      "usage_cn": "诊断线性方程组 $Ax=b$。$\\dim\\mathrm{Ker}(A) > 0$ 时方程要么无解、要么无穷多解；OLS 中 $X^\\top X$ 不可逆就是因为 $X$ 列相关，正好对应 $\\dim\\mathrm{Ker} > 0$。",
      "intuition_en": "'Every input direction either survives the matrix (lands in $\\mathrm{Col}(A)$) or gets crushed to zero ($\\mathrm{Ker}(A)$).' The $n$ input dimensions split between these two fates, and they always sum to $n$.",
      "intuition_cn": "\"每个输入方向要么活下来（落到 $\\mathrm{Col}(A)$），要么被压到 0（$\\mathrm{Ker}(A)$）。\" $n$ 个输入维度在这两条命运之间分配，总和恒为 $n$。",
      "source": "topics/linear-algebra.html#eq-linear-algebra-rank-nullity"
    },
    {
      "title": "Eigen Equation",
      "eq": "$$ Au=\\lambda u,\\qquad u\\ne 0 $$",
      "symbols": [
        {
          "sym": "$A \\in \\mathbb{R}^{n\\times n}$",
          "en": "square matrix",
          "cn": "方阵"
        },
        {
          "sym": "$u \\ne 0$",
          "en": "**eigenvector** — a non-zero direction $A$ preserves",
          "cn": "**eigenvector** —— $A$ 作用后方向不变的非零向量"
        },
        {
          "sym": "$\\lambda$",
          "en": "**eigenvalue** — how much $u$ is stretched / flipped",
          "cn": "**eigenvalue** —— $u$ 被拉伸 / 翻转的倍数"
        }
      ],
      "usage_en": "Find via $\\det(A - \\lambda I) = 0$. The eigenvalues capture how much $A$ stretches space along its principal axes. Used in PCA (cov-matrix eigenvectors = principal directions), spectral methods, and stability analysis ($\\max|\\lambda|<1$ → stable).",
      "usage_cn": "用 $\\det(A - \\lambda I) = 0$ 求。eigenvalue 表示 $A$ 在主轴方向的拉伸程度。用于 PCA（协方差矩阵的 eigenvector = 主方向）、spectral methods、稳定性分析（$\\max|\\lambda|<1$ → 稳定）。",
      "intuition_en": "'Special directions where $A$ acts like a simple stretch.' For most $u$, $Au$ rotates and rescales; for an eigenvector, $Au$ stays on the same line — only the length changes by factor $\\lambda$.",
      "intuition_cn": "\"$A$ 作用后只做拉伸、不旋转的特殊方向。\" 大多数 $u$ 经 $A$ 后会旋转又拉伸；eigenvector 留在原直线上，长度按倍数 $\\lambda$ 变。",
      "source": "topics/linear-algebra.html#eq-linear-algebra-eigen-equation"
    },
    {
      "title": "Reduced SVD",
      "eq": "$$ X=U\\Sigma V^\\top,\\ \\ U\\in\\mathbb{R}^{n\\times r},\\ \\Sigma\\in\\mathbb{R}^{r\\times r}_{>0},\\ V\\in\\mathbb{R}^{d\\times r} $$",
      "symbols": [
        {
          "sym": "$X \\in \\mathbb{R}^{n\\times d}$",
          "en": "data matrix (or any matrix)",
          "cn": "数据矩阵（或任意矩阵）"
        },
        {
          "sym": "$U$",
          "en": "left singular vectors — orthonormal columns",
          "cn": "左奇异向量 —— 列正交单位"
        },
        {
          "sym": "$\\Sigma$",
          "en": "diagonal of singular values $\\sigma_1\\ge\\sigma_2\\ge\\cdots>0$",
          "cn": "奇异值对角阵 $\\sigma_1\\ge\\sigma_2\\ge\\cdots>0$"
        },
        {
          "sym": "$V$",
          "en": "right singular vectors — orthonormal columns",
          "cn": "右奇异向量 —— 列正交单位"
        },
        {
          "sym": "$r$",
          "en": "rank of $X$ (number of non-zero singular values)",
          "cn": "$X$ 的秩（非零奇异值个数）"
        }
      ],
      "usage_en": "Universal decomposition — exists for ANY matrix (rectangular, singular, complex). Plug into PCA: $X^\\top X = V\\Sigma^2 V^\\top$, so right singular vectors are PCA components and squared singular values are eigenvalues. Truncating to top-$k$ gives the best rank-$k$ approximation.",
      "usage_cn": "通用分解 —— 任何矩阵都存在（矩形、奇异、复值都行）。代入 PCA：$X^\\top X = V\\Sigma^2 V^\\top$，所以右奇异向量是 PCA 主成分，奇异值平方是 eigenvalue。截断到前 $k$ 个分量即得最佳秩 $k$ 近似。",
      "intuition_en": "'Decompose $X$ into a rotation, a stretch, and another rotation.' Reading right-to-left: $V^\\top$ rotates input axes, $\\Sigma$ stretches each axis by $\\sigma_i$, $U$ rotates the result. Singular values measure how much information lives along each principal axis.",
      "intuition_cn": "\"把 $X$ 分解成旋转 → 拉伸 → 再旋转。\" 从右往左读：$V^\\top$ 旋转输入轴，$\\Sigma$ 把每个轴按 $\\sigma_i$ 拉伸，$U$ 再做一次旋转。奇异值衡量每个主轴上承载多少信息。",
      "source": "topics/linear-algebra.html#eq-linear-algebra-reduced-svd"
    },
    {
      "title": "Quadratic Form & PSD",
      "eq": "$$ x^\\top A x=\\sum_{i,j}A_{ij}x_ix_j,\\quad \\text{PSD}: x^\\top A x\\ge 0\\ \\forall x $$",
      "symbols": [
        {
          "sym": "$x^\\top A x$",
          "en": "scalar — a quadratic in the entries of $x$",
          "cn": "标量 —— $x$ 各分量的二次式"
        },
        {
          "sym": "$A$",
          "en": "symmetric matrix defining the quadratic form",
          "cn": "决定二次型的对称矩阵"
        },
        {
          "sym": "PSD ($A\\succeq 0$)",
          "en": "**positive semi-definite** — quadratic form $\\ge 0$ for every $x$",
          "cn": "**半正定** —— 对所有 $x$ 二次型 $\\ge 0$"
        }
      ],
      "usage_en": "Test convexity: $\\nabla^2 f \\succeq 0$ everywhere $\\iff$ $f$ is convex. Test whether a covariance / Gram / Hessian is valid (must be PSD). Loss like $\\frac12\\|Y-Xw\\|^2$ is quadratic in $w$ with Hessian $X^\\top X \\succeq 0$, hence convex.",
      "usage_cn": "判断凸性：$\\nabla^2 f \\succeq 0$ 处处成立 $\\iff$ $f$ 凸。判断 covariance / Gram / Hessian 是否合法（必须 PSD）。$\\frac12\\|Y-Xw\\|^2$ 关于 $w$ 是二次型，Hessian $X^\\top X \\succeq 0$，所以凸。",
      "intuition_en": "'Quadratic that opens upward in every direction.' For PSD $A$, the function $x \\mapsto x^\\top A x$ is a paraboloid sitting on or above zero — flat in the kernel directions, curving up in the rest.",
      "intuition_cn": "\"在每个方向上都向上开口的二次函数\"。$A$ PSD 时，$x \\mapsto x^\\top A x$ 是底在零或以上的抛物面 —— kernel 方向上平坦，其他方向上向上弯。",
      "source": "topics/linear-algebra.html#eq-linear-algebra-quadratic-form-psd"
    },
    {
      "title": "Sandwich Identity",
      "eq": "$$ A=B^\\top B \\;\\Rightarrow\\; A\\succeq 0;\\quad X^\\top D X \\succeq 0\\ \\text{when}\\ D\\succeq 0 $$",
      "symbols": [
        {
          "sym": "$B^\\top B$",
          "en": "Gram matrix of $B$ — always symmetric and PSD",
          "cn": "$B$ 的 Gram 矩阵 —— 一定对称且 PSD"
        },
        {
          "sym": "$X^\\top D X$",
          "en": "PSD-preserving sandwich when $D \\succeq 0$",
          "cn": "$D \\succeq 0$ 时保持 PSD 的 sandwich"
        }
      ],
      "usage_en": "Quick way to certify PSD-ness: factor as $B^\\top B$. Used to show $X^\\top X$ in OLS is PSD (loss is convex), the logistic-regression Hessian $X^\\top B X$ with $B = \\mathrm{diag}(p_i(1-p_i))\\succeq 0$ is PSD, and covariance $\\Sigma = \\frac{1}{n}X^\\top X$ is PSD.",
      "usage_cn": "证明 PSD 的快捷方式：把矩阵写成 $B^\\top B$。用于证明 OLS 中 $X^\\top X$ PSD（loss 凸）、logistic regression 的 Hessian $X^\\top B X$（$B = \\mathrm{diag}(p_i(1-p_i))\\succeq 0$）PSD、covariance $\\Sigma = \\frac{1}{n}X^\\top X$ PSD。",
      "intuition_en": "$x^\\top(B^\\top B)x = \\|Bx\\|^2 \\ge 0$ — square of a real number can't be negative. The sandwich form generalizes this whenever the meat ($D$) is itself PSD.",
      "intuition_cn": "$x^\\top(B^\\top B)x = \\|Bx\\|^2 \\ge 0$ —— 实数平方不能为负。sandwich 形式是把这个推广到 \"中间 $D$ 自己 PSD\" 的情形。",
      "source": "topics/linear-algebra.html#eq-linear-algebra-sandwich-identity"
    },
    {
      "title": "Vector-Calc Shapes",
      "eq": "$$ \\nabla f\\in\\mathbb{R}^{d},\\ \\nabla^2 f\\in\\mathbb{R}^{d\\times d},\\ J=\\frac{\\partial f}{\\partial x}\\in\\mathbb{R}^{m\\times n} $$",
      "symbols": [
        {
          "sym": "$f: \\mathbb{R}^d \\to \\mathbb{R}$",
          "en": "scalar-valued function of a vector",
          "cn": "把向量映到标量的函数"
        },
        {
          "sym": "$\\nabla f$",
          "en": "gradient — same shape as input ($d$-vector)",
          "cn": "梯度 —— 与输入同形（$d$ 维向量）"
        },
        {
          "sym": "$\\nabla^2 f$",
          "en": "Hessian — square ($d \\times d$) matrix of second derivatives",
          "cn": "Hessian —— 二阶导数构成的 ($d \\times d$) 方阵"
        },
        {
          "sym": "$J = \\partial f/\\partial x$",
          "en": "Jacobian — for $f: \\mathbb{R}^n \\to \\mathbb{R}^m$, shape ($m \\times n$)",
          "cn": "Jacobian —— $f: \\mathbb{R}^n \\to \\mathbb{R}^m$ 时形状为 ($m \\times n$)"
        }
      ],
      "usage_en": "Sanity-check shapes before any matrix calculus: gradient = input shape, Jacobian = (output × input), Hessian = (input × input) symmetric. Backprop is one big chained Jacobian product; OLS gradient $X^\\top(Xw - Y)$ is a $d$-vector because $w$ is.",
      "usage_cn": "做矩阵微积分前先核对形状：梯度 = 输入形状，Jacobian = (输出 × 输入)，Hessian = (输入 × 输入) 对称。反向传播本质是一长串 Jacobian 连乘；OLS 梯度 $X^\\top(Xw - Y)$ 是 $d$ 维向量，正因为 $w$ 是。",
      "intuition_en": "'Derivatives have shapes — match them before computing.' Gradient says 'how does $f$ change per input dim'; Jacobian generalizes to vector outputs; Hessian captures curvature in every input pair.",
      "intuition_cn": "\"导数有形状 —— 计算前先对齐。\" 梯度回答 \"$f$ 沿每个输入维度的变化\"；Jacobian 推广到向量输出；Hessian 记录每对输入维度间的曲率。",
      "source": "topics/linear-algebra.html#eq-linear-algebra-vector-calc-shapes"
    },
    {
      "title": "Useful Derivatives",
      "eq": "$$ \\nabla_w (a^\\top w)=a,\\quad \\nabla_w(w^\\top A w)=(A+A^\\top)w $$",
      "symbols": [
        {
          "sym": "$a^\\top w$",
          "en": "linear form — derivative is just the constant vector $a$",
          "cn": "线性式 —— 导数就是常向量 $a$"
        },
        {
          "sym": "$w^\\top A w$",
          "en": "quadratic form (symmetric $A$ → derivative $2Aw$)",
          "cn": "二次型（$A$ 对称时导数为 $2Aw$）"
        },
        {
          "sym": "$(A + A^\\top)w$",
          "en": "general formula for any $A$; symmetric case simplifies to $2Aw$",
          "cn": "对任意 $A$ 的通用公式；$A$ 对称时简化为 $2Aw$"
        }
      ],
      "usage_en": "Two derivatives to memorize. They cover most matrix calculus you'll see: linear regression ($\\nabla \\frac12 \\|Xw - Y\\|^2 = X^\\top(Xw - Y)$ uses both), logistic regression, and most quadratic objectives.",
      "usage_cn": "必须记住的两个导数。覆盖大多数遇到的矩阵微积分：linear regression（$\\nabla \\frac12 \\|Xw - Y\\|^2 = X^\\top(Xw - Y)$ 同时用到两者）、logistic regression、绝大多数二次型目标。",
      "intuition_en": "Generalize 'derivative of $ax$ is $a$' and 'derivative of $ax^2$ is $2ax$' to vectors / matrices. The transpose appears because $w^\\top A w$ depends on $w$ on both sides — chain rule sums two contributions.",
      "intuition_cn": "把 \"$ax$ 的导数是 $a$\"、\"$ax^2$ 的导数是 $2ax$\" 推广到向量 / 矩阵。出现转置是因为 $w^\\top A w$ 中 $w$ 出现两次 —— 链式求和两侧的贡献。",
      "source": "topics/linear-algebra.html#eq-linear-algebra-useful-derivatives"
    }
  ],
  "optimization": [
    {
      "title": "Convexity (chord)",
      "eq": "$$ f((1-\\lambda)w_1+\\lambda w_2)\\le (1-\\lambda)f(w_1)+\\lambda f(w_2) $$",
      "symbols": [
        {
          "sym": "$f$",
          "en": "the function being tested for convexity",
          "cn": "被检验是否凸的函数"
        },
        {
          "sym": "$w_1, w_2$",
          "en": "any two points in the domain",
          "cn": "定义域中任意两点"
        },
        {
          "sym": "$\\lambda \\in [0, 1]$",
          "en": "interpolation parameter — slides between $w_1$ and $w_2$",
          "cn": "插值参数 —— 在 $w_1$ 与 $w_2$ 之间滑动"
        },
        {
          "sym": "$(1-\\lambda)w_1 + \\lambda w_2$",
          "en": "the chord point — convex combination of $w_1, w_2$",
          "cn": "弦上的点 —— $w_1, w_2$ 的凸组合"
        }
      ],
      "usage_en": "Definition you can test by hand: pick any two points and any $\\lambda$, check if the function value at the chord midpoint sits below (or on) the straight line connecting $f(w_1)$ and $f(w_2)$. If it always does, $f$ is convex.",
      "usage_cn": "可以手算检验的定义：任取两点和任意 $\\lambda$，看弦上的函数值是否始终在 $f(w_1), f(w_2)$ 连线之下（或上）。始终如此则 $f$ 凸。",
      "intuition_en": "'The graph of $f$ stays below every chord.' A bowl-shape: lift any straight line between two points on the graph, the curve underneath never pokes through.",
      "intuition_cn": "\"$f$ 的图像始终在所有弦下方。\" 像碗形：在图上任取两点连一条直线，函数曲线永远不会穿出这条线。",
      "source": "topics/optimization.html#eq-optimization-convexity-chord"
    },
    {
      "title": "First-order test",
      "eq": "$$ f(w_1)\\ge f(w_2)+\\nabla f(w_2)^\\top(w_1-w_2) $$",
      "symbols": [
        {
          "sym": "$f(w_1)$",
          "en": "function value at any test point",
          "cn": "任意检验点处的函数值"
        },
        {
          "sym": "$f(w_2) + \\nabla f(w_2)^\\top (w_1 - w_2)$",
          "en": "tangent line / plane at $w_2$ evaluated at $w_1$",
          "cn": "在 $w_2$ 的切线 / 切平面在 $w_1$ 处的值"
        },
        {
          "sym": "$\\nabla f(w_2)$",
          "en": "gradient at $w_2$ (the slope of the tangent)",
          "cn": "$w_2$ 处的梯度（切线斜率）"
        }
      ],
      "usage_en": "Convexity test using gradients (no Hessian required): the function lies above every tangent line. Practical use: if you're at $w_2$ with gradient $\\nabla f(w_2)$, the linear approximation is a global lower bound on $f$ for convex problems.",
      "usage_cn": "用梯度检验凸性（不必计算 Hessian）：函数在每条切线之上。实用价值：在 $w_2$ 处求出梯度后，线性近似对凸问题就是 $f$ 的全局下界。",
      "intuition_en": "'Tangent lines never overshoot.' Convex functions curve away from their tangents in only one direction — upward. This is what makes gradient descent work: walking against the gradient is a guaranteed descent direction.",
      "intuition_cn": "\"切线永远不会超出函数值。\" 凸函数只朝一个方向偏离切线 —— 向上。这正是 gradient descent 能 work 的原因：沿负梯度方向必然下降。",
      "source": "topics/optimization.html#eq-optimization-first-order-test"
    },
    {
      "title": "Second-order test",
      "eq": "$$ \\nabla^2 f(w)\\succeq 0\\ \\forall w\\ \\Longleftrightarrow\\ f \\text{ convex} $$",
      "symbols": [
        {
          "sym": "$\\nabla^2 f(w)$",
          "en": "Hessian — matrix of second derivatives",
          "cn": "Hessian —— 二阶导数矩阵"
        },
        {
          "sym": "$\\succeq 0$",
          "en": "PSD — eigenvalues all $\\ge 0$",
          "cn": "PSD —— 特征值全 $\\ge 0$"
        },
        {
          "sym": "$\\Longleftrightarrow$",
          "en": "if-and-only-if (test is exact)",
          "cn": "充要条件（检验完全等价）"
        }
      ],
      "usage_en": "Easiest convexity check when you can compute the Hessian: PSD everywhere $\\iff$ convex. For OLS, Hessian is $X^\\top X$; for logistic regression, it's $X^\\top B X$ with $B = \\mathrm{diag}(p_i(1-p_i)) \\succeq 0$ — both PSD by the sandwich identity.",
      "usage_cn": "能算 Hessian 时最方便的凸性检验：处处 PSD $\\iff$ 凸。OLS 的 Hessian 是 $X^\\top X$；logistic regression 是 $X^\\top B X$（$B = \\mathrm{diag}(p_i(1-p_i)) \\succeq 0$）—— 都因 sandwich 恒等式而 PSD。",
      "intuition_en": "'Curvature non-negative in every direction.' The Hessian is the multivariate analog of $f''$ in 1D — convex means $f''(x) \\ge 0$ everywhere; for vectors, this generalizes to the Hessian being PSD.",
      "intuition_cn": "\"每个方向曲率非负。\" Hessian 是 1 维 $f''$ 的多元推广 —— 凸意味着 $f''(x) \\ge 0$ 处处成立；推广到向量就是 Hessian PSD。",
      "source": "topics/optimization.html#eq-optimization-second-order-test"
    },
    {
      "title": "Optimality (convex)",
      "eq": "$$ \\nabla f(w^*)=0 \\;\\Rightarrow\\; w^* \\text{ globally optimal} $$",
      "symbols": [
        {
          "sym": "$w^*$",
          "en": "candidate optimum (where the gradient vanishes)",
          "cn": "候选最优点（梯度为 0 处）"
        },
        {
          "sym": "$\\nabla f(w^*) = 0$",
          "en": "stationary condition",
          "cn": "稳定点条件"
        },
        {
          "sym": "globally optimal",
          "en": "$w^*$ achieves the smallest $f(w)$ over the entire domain",
          "cn": "$w^*$ 在整个定义域内取得最小 $f(w)$"
        }
      ],
      "usage_en": "For convex problems: find any zero of the gradient and you're done. This is why OLS solves $X^\\top(Xw - Y) = 0$ and stops — no need to check if it's a local vs. global min, convexity guarantees global.",
      "usage_cn": "对凸问题：找任意梯度为 0 的点即可。所以 OLS 解 $X^\\top(Xw - Y) = 0$ 后就停 —— 不必检查是否局部 vs. 全局最小，凸性保证全局。",
      "intuition_en": "'In a bowl, every flat spot is the bottom.' Non-convex landscapes have hills, valleys, and saddles — many stationary points; convex ones have only one fate at $\\nabla f = 0$, and that's the global minimum.",
      "intuition_cn": "\"碗形地形里，每个平坦处都是最低点。\" 非凸地形有山、谷、鞍点 —— 稳定点很多；凸地形里 $\\nabla f = 0$ 处只有一种结局，就是全局最小。",
      "source": "topics/optimization.html#eq-optimization-optimality-convex"
    },
    {
      "title": "Gradient Descent",
      "eq": "$$ w_{k+1}=w_k-\\alpha_k\\,\\nabla f(w_k) $$",
      "symbols": [
        {
          "sym": "$w_k$",
          "en": "current iterate",
          "cn": "当前迭代点"
        },
        {
          "sym": "$w_{k+1}$",
          "en": "next iterate after one update",
          "cn": "更新一步后的下一个迭代点"
        },
        {
          "sym": "$\\alpha_k$",
          "en": "step size / learning rate (may shrink with $k$)",
          "cn": "步长 / 学习率（可随 $k$ 减小）"
        },
        {
          "sym": "$\\nabla f(w_k)$",
          "en": "gradient at the current iterate (direction of steepest ascent)",
          "cn": "当前点的梯度（最陡上升方向）"
        }
      ],
      "usage_en": "Standard workhorse. Iterate until $\\|\\nabla f(w_k)\\|$ is small or step size triggers a stopping criterion. Pick $\\alpha$ small enough to converge, big enough to actually move — too small wastes time, too large diverges. Use Armijo line search or fixed schedules.",
      "usage_cn": "标准工具。迭代直到 $\\|\\nabla f(w_k)\\|$ 足够小或步长触发停止条件。$\\alpha$ 取得太小白费时间、太大会发散；常用 Armijo line search 或固定调度。",
      "intuition_en": "'Walk downhill by stepping against the gradient.' On convex functions, this converges to the global minimum; on non-convex ones (deep nets) it converges to a local stationary point that's hopefully good enough.",
      "intuition_cn": "\"沿负梯度方向往下走。\" 凸函数收敛到全局最小；非凸（深度网络）则收敛到局部稳定点，希望足够好。",
      "source": "topics/optimization.html#eq-optimization-gradient-descent"
    },
    {
      "title": "Subgradient inequality",
      "eq": "$$ f(x)\\ge f(x_0)+\\langle s, x-x_0\\rangle,\\quad s\\in\\partial f(x_0) $$",
      "symbols": [
        {
          "sym": "$f$",
          "en": "convex function (possibly non-smooth)",
          "cn": "凸函数（可能不光滑）"
        },
        {
          "sym": "$x_0$",
          "en": "the point where we evaluate the subgradient",
          "cn": "我们计算 subgradient 的点"
        },
        {
          "sym": "$s \\in \\partial f(x_0)$",
          "en": "**subgradient** — any direction satisfying the lower-bound inequality",
          "cn": "**subgradient** —— 任意满足下界不等式的方向"
        },
        {
          "sym": "$\\partial f(x_0)$",
          "en": "subdifferential — the set of all subgradients at $x_0$",
          "cn": "subdifferential —— $x_0$ 处所有 subgradient 的集合"
        }
      ],
      "usage_en": "Generalizes the gradient to non-differentiable functions like $|x|$ or hinge loss. At a kink, take ANY slope between the left and right derivatives; that's a valid subgradient. Use in subgradient descent for L1 / hinge losses.",
      "usage_cn": "把梯度推广到 $|x|$、hinge loss 等不可导函数。在拐点处可以取左右导数之间任意斜率作为 subgradient。用于 subgradient descent 处理 L1 / hinge loss。",
      "intuition_en": "'Any tangent line that stays below the function counts as a derivative.' At smooth points it's just the usual gradient; at kinks, you have a whole fan of valid lower-bound slopes.",
      "intuition_cn": "\"任意一条始终在函数下方的切线都算导数。\" 光滑点处就是普通梯度；拐点处有一整把扇形的合法下界斜率。",
      "source": "topics/optimization.html#eq-optimization-subgradient-inequality"
    },
    {
      "title": "Armijo line search",
      "eq": "$$ f(w_k+\\alpha d_k)-f(w_k)\\le \\sigma\\alpha\\,\\nabla f(w_k)^\\top d_k $$",
      "symbols": [
        {
          "sym": "$w_k$",
          "en": "current iterate",
          "cn": "当前迭代点"
        },
        {
          "sym": "$d_k$",
          "en": "search direction (often $-\\nabla f(w_k)$)",
          "cn": "搜索方向（常取 $-\\nabla f(w_k)$）"
        },
        {
          "sym": "$\\alpha$",
          "en": "candidate step size — gets shrunk until inequality holds",
          "cn": "候选步长 —— 一直缩小直到不等式成立"
        },
        {
          "sym": "$\\sigma \\in (0, 1)$",
          "en": "sufficient-decrease constant, typically $10^{-4}$",
          "cn": "充分下降常数，通常 $10^{-4}$"
        }
      ],
      "usage_en": "Backtracking line search: start with $\\alpha = 1$, halve it until the Armijo condition holds. Guarantees you make 'enough' progress per step without manually tuning the learning rate. Standard in classical optimization solvers.",
      "usage_cn": "回溯线搜索：从 $\\alpha = 1$ 开始减半，直到 Armijo 条件成立。保证每步获得 \"足够\" 的下降，不需手调学习率。经典优化求解器的标准做法。",
      "intuition_en": "'Take a smaller step until the function actually drops by the amount the linear approximation predicts.' Stops you from over-shooting on steep regions and from under-stepping on flat ones.",
      "intuition_cn": "\"步长一直减小，直到函数下降量与线性近似预测的下降量匹配为止。\" 防止陡区过冲、平坦区欠走。",
      "source": "topics/optimization.html#eq-optimization-armijo-line-search"
    },
    {
      "title": "Lagrangian",
      "eq": "$$ L(w,\\lambda,\\nu)=f_0(w)+\\sum_i\\lambda_i f_i(w)+\\sum_j\\nu_j h_j(w),\\ \\lambda_i\\ge 0 $$",
      "symbols": [
        {
          "sym": "$f_0(w)$",
          "en": "primal objective to minimize",
          "cn": "原问题（要最小化的目标）"
        },
        {
          "sym": "$f_i(w) \\le 0$",
          "en": "inequality constraints (e.g. SVM's margin)",
          "cn": "不等式约束（如 SVM 的 margin）"
        },
        {
          "sym": "$h_j(w) = 0$",
          "en": "equality constraints",
          "cn": "等式约束"
        },
        {
          "sym": "$\\lambda_i \\ge 0$",
          "en": "dual variable for inequality (must be non-negative)",
          "cn": "不等式约束的对偶变量（必须非负）"
        },
        {
          "sym": "$\\nu_j$",
          "en": "dual variable for equality (any real)",
          "cn": "等式约束的对偶变量（任意实数）"
        },
        {
          "sym": "$L$",
          "en": "Lagrangian — penalty-augmented objective",
          "cn": "Lagrangian —— 加了罚项的目标"
        }
      ],
      "usage_en": "Convert constrained problems into 'penalize violation' form. Setting $\\partial L / \\partial w = 0$ at the optimum gives KKT conditions — used to derive SVM dual, Lasso solutions, etc.",
      "usage_cn": "把约束问题转成 \"违反就受罚\" 的形式。在最优点处令 $\\partial L / \\partial w = 0$ 得 KKT 条件 —— 用来推导 SVM dual、Lasso 解等。",
      "intuition_en": "'Pay a price $\\lambda_i$ per unit of violation, then optimize freely.' Strong duality means choosing the right prices makes the relaxed problem give the same answer as the constrained one.",
      "intuition_cn": "\"每单位违反付价格 $\\lambda_i$，然后无约束优化。\" 强对偶意味着挑对价格后，松弛问题与原约束问题答案一致。",
      "source": "topics/optimization.html#eq-optimization-lagrangian"
    },
    {
      "title": "Primal vs Dual",
      "eq": "$$ \\text{Primal: }\\min_w\\max_{\\lambda\\ge 0,\\nu} L,\\quad \\text{Dual: }\\max_{\\lambda\\ge 0,\\nu}\\min_w L $$",
      "symbols": [
        {
          "sym": "Primal",
          "en": "original problem — minimize $f_0$ subject to constraints",
          "cn": "原问题 —— 在约束下最小化 $f_0$"
        },
        {
          "sym": "Dual",
          "en": "swap min and max — gives a lower bound on the primal",
          "cn": "对偶问题 —— 交换 min/max，给出原问题的下界"
        },
        {
          "sym": "$L$",
          "en": "Lagrangian (defined above)",
          "cn": "上面定义的 Lagrangian"
        },
        {
          "sym": "$\\min_w \\max_{\\lambda, \\nu}$",
          "en": "primal: punish constraint violation infinitely",
          "cn": "原：违反约束惩罚无穷大"
        },
        {
          "sym": "$\\max_{\\lambda, \\nu} \\min_w$",
          "en": "dual: best lower-bound function $g(\\lambda, \\nu)$",
          "cn": "对偶：最佳下界函数 $g(\\lambda, \\nu)$"
        }
      ],
      "usage_en": "When the dual is easier to solve than the primal, switch. SVM is the canonical example — the primal is QP in $w$ (high-dim), the dual is QP in $\\lambda$ (one per training point) and naturally introduces kernels.",
      "usage_cn": "当对偶比原问题好解时就切换。SVM 是经典例子 —— 原问题在 $w$ 上是 QP（高维），对偶在 $\\lambda$ 上是 QP（每个训练点一个）且自然引入 kernel。",
      "intuition_en": "'Two views of the same problem.' Primal: 'find the best $w$ that obeys constraints'; dual: 'find the highest lower bound that any pricing scheme can certify'. Strong duality says these meet.",
      "intuition_cn": "\"同一问题的两种视角。\" 原：\"找出满足约束的最佳 $w$\"；对偶：\"找出任何定价方案能给出的最高下界\"。强对偶说两者相遇。",
      "source": "topics/optimization.html#eq-optimization-primal-vs-dual"
    },
    {
      "title": "Weak / Strong Duality",
      "eq": "$$ f_0(w^*)\\ge g(\\lambda^*,\\nu^*)\\ (\\text{always}),\\quad =\\ \\text{under strong duality} $$",
      "symbols": [
        {
          "sym": "$f_0(w^*)$",
          "en": "primal optimum",
          "cn": "原问题最优值"
        },
        {
          "sym": "$g(\\lambda^*, \\nu^*)$",
          "en": "dual optimum",
          "cn": "对偶问题最优值"
        },
        {
          "sym": "$\\ge$",
          "en": "weak duality — always holds, gives a lower bound",
          "cn": "弱对偶 —— 始终成立，给出下界"
        },
        {
          "sym": "$=$",
          "en": "strong duality — duality gap is zero (needs Slater for convex problems)",
          "cn": "强对偶 —— duality gap 为 0（凸问题需 Slater 条件）"
        }
      ],
      "usage_en": "Always check weak duality (free). Try to verify strong duality (Slater's condition: convex problem with at least one strictly feasible point) — if so, the dual gives the exact answer and KKT conditions characterize optima.",
      "usage_cn": "弱对偶始终免费可用。尽量验证强对偶（Slater 条件：凸问题且至少有一个严格可行点）—— 满足时对偶给出精确答案，KKT 条件刻画最优。",
      "intuition_en": "'The dual ≤ the primal — always.' Strong duality is the special case where they're equal, letting you replace a hard primal by an easier dual without losing accuracy.",
      "intuition_cn": "\"对偶 ≤ 原问题 —— 总是。\" 强对偶是相等的特例，让你能用更易解的对偶替换难解的原问题，且不损失精度。",
      "source": "topics/optimization.html#eq-optimization-weak-strong-duality"
    }
  ],
  "knn": [
    {
      "title": "Classification (majority vote)",
      "eq": "$$ \\hat{y}(x)=\\mathrm{mode}\\{y_i:\\ x_i \\in \\mathcal{N}_k(x)\\} $$",
      "symbols": [
        {
          "sym": "$\\hat{y}(x)$",
          "en": "predicted label for query point $x$",
          "cn": "对查询点 $x$ 的预测标签"
        },
        {
          "sym": "$x$",
          "en": "query / test input we want to classify",
          "cn": "待分类的查询样本"
        },
        {
          "sym": "$k$",
          "en": "number of neighbors to consider (hyperparameter)",
          "cn": "考虑的最近邻个数（超参数）"
        },
        {
          "sym": "$\\mathcal{N}_k(x)$",
          "en": "set of the $k$ training points closest to $x$",
          "cn": "训练集中距 $x$ 最近的 $k$ 个样本"
        },
        {
          "sym": "$y_i$",
          "en": "known label of training point $x_i$",
          "cn": "训练点 $x_i$ 的已知标签"
        },
        {
          "sym": "$\\mathrm{mode}$",
          "en": "majority vote — the most-frequent label in the set",
          "cn": "众数 —— 集合中出现最多的标签"
        }
      ],
      "usage_en": "For each test point $x$, compute its distance to every training sample, sort and pick the $k$ smallest; the most-frequent label among those $k$ neighbors is the prediction. Choose $k$ via cross-validation — small $k$ overfits noise, large $k$ over-smooths the boundary.",
      "usage_cn": "对每个测试点 $x$，计算它到所有训练样本的距离，排序取最小的 $k$ 个；这 $k$ 个邻居中出现最多的标签就是预测结果。$k$ 用 cross-validation 选 —— $k$ 太小会过拟合噪声，$k$ 太大会把决策边界过度平滑。",
      "intuition_en": "KNN is a 'lazy learner' — there is no training, only a lookup. The prediction asks 'what do my $k$ closest historical neighbors say?' and goes with the majority. The whole method assumes that nearby points share labels, so accuracy depends entirely on whether the distance metric makes sense for your features.",
      "intuition_cn": "KNN 是 lazy learner —— 没有训练，只是查表。预测就是问 \"离我最近的 $k$ 个历史样本是什么类别？\" 然后投票决定。它假设 \"近邻点应该有相似标签\"，所以效果完全取决于距离度量是否对你的特征有意义。",
      "source": "topics/knn.html#eq-knn-classification-majority-vote"
    },
    {
      "title": "Regression (mean)",
      "eq": "$$ \\hat{y}(x)=\\frac{1}{k}\\sum_{x_i\\in \\mathcal{N}_k(x)} y_i $$",
      "symbols": [
        {
          "sym": "$\\hat{y}(x)$",
          "en": "predicted real-valued target for $x$",
          "cn": "对 $x$ 的实数预测值"
        },
        {
          "sym": "$y_i \\in \\mathbb{R}$",
          "en": "real-valued target of training point $x_i$",
          "cn": "训练点 $x_i$ 的实数目标值"
        },
        {
          "sym": "$\\mathcal{N}_k(x)$",
          "en": "the $k$ nearest training points to $x$ (same as classification)",
          "cn": "$x$ 的 $k$ 个最近训练点（与分类相同）"
        },
        {
          "sym": "$\\frac{1}{k}\\sum$",
          "en": "sum the $k$ neighbor targets, then divide by $k$ — the average",
          "cn": "对 $k$ 个邻居的目标值求和后除以 $k$ —— 即平均"
        }
      ],
      "usage_en": "Same neighbor-finding step as classification, but instead of voting, average the neighbors' target values. A common variant weights each neighbor by $1/d(x, x_i)$ so closer neighbors influence the prediction more.",
      "usage_cn": "找邻居的步骤与分类一致；但不再投票，而是把 $k$ 个邻居的目标值取平均。常见变体是用 $1/d(x, x_i)$ 加权，让更近的邻居权重更大。",
      "intuition_en": "Regression KNN is just a local average. The prediction is 'the typical target value seen near $x$.' It works well when the underlying function is roughly continuous and you have enough samples to densely cover the input space.",
      "intuition_cn": "回归型 KNN 就是局部平均：预测值是 \"$x$ 附近样本目标值的代表\"。当真实函数大致连续、训练样本能稠密覆盖输入空间时效果好。",
      "source": "topics/knn.html#eq-knn-regression-mean"
    },
    {
      "title": "Euclidean distance",
      "eq": "$$ d(x,x_i)=\\|x-x_i\\|_2=\\sqrt{\\sum_j (x_j-x_{ij})^2} $$",
      "symbols": [
        {
          "sym": "$x \\in \\mathbb{R}^d$",
          "en": "query point with $d$ feature components $x_1, \\dots, x_d$",
          "cn": "$d$ 维查询点，分量为 $x_1, \\dots, x_d$"
        },
        {
          "sym": "$x_i \\in \\mathbb{R}^d$",
          "en": "the $i$-th training point with components $x_{i1}, \\dots, x_{id}$",
          "cn": "第 $i$ 个训练点，分量为 $x_{i1}, \\dots, x_{id}$"
        },
        {
          "sym": "$j$",
          "en": "feature index — the sum runs over all $d$ features",
          "cn": "特征下标 —— 对全部 $d$ 个特征求和"
        },
        {
          "sym": "$\\|\\cdot\\|_2$",
          "en": "L2 (Euclidean) norm",
          "cn": "L2 范数（欧氏范数）"
        }
      ],
      "usage_en": "Compute the squared difference per feature, sum across features, take the square root. Standardize features first (subtract mean, divide by std) — otherwise a feature on a larger numerical scale (e.g. salary in dollars vs age in years) dominates the distance. Common alternatives: Manhattan ($L_1$), cosine, Mahalanobis.",
      "usage_cn": "每个特征算差的平方，对所有特征求和后开方。先做特征标准化（减均值、除标准差） —— 否则数值范围大的特征（如以美元计的工资 vs. 以年计的年龄）会主导距离。常见替代：Manhattan ($L_1$)、cosine、Mahalanobis。",
      "intuition_en": "Geometric 'ruler distance' — the straight-line length between two points in $d$-dimensional space. The squared per-coordinate gap means large per-feature differences hurt much more than small ones, which is why feature scale matters so much.",
      "intuition_cn": "几何上的 \"直尺距离\" —— $d$ 维空间中两点的直线长度。每个维度差的平方把大差异放大、小差异变小，所以特征尺度对它影响很大。",
      "source": "topics/knn.html#eq-knn-euclidean-distance"
    }
  ],
  "naive-bayes": [
    {
      "title": "Conditional independence",
      "eq": "$$ P(X_1,\\ldots,X_d\\mid Y)=\\prod_{j=1}^{d} P(X_j\\mid Y) $$",
      "symbols": [
        {
          "sym": "$X_1, \\ldots, X_d$",
          "en": "the $d$ feature random variables for one sample",
          "cn": "一个样本的 $d$ 个特征随机变量"
        },
        {
          "sym": "$Y$",
          "en": "the class label random variable",
          "cn": "类别标签随机变量"
        },
        {
          "sym": "$P(X_j \\mid Y)$",
          "en": "likelihood of feature $j$ given the class",
          "cn": "给定类别下，第 $j$ 个特征的似然"
        },
        {
          "sym": "$\\prod_{j=1}^{d}$",
          "en": "product across all $d$ features",
          "cn": "对全部 $d$ 个特征连乘"
        }
      ],
      "usage_en": "This is the **assumption** Naive Bayes makes — given the class, the features are independent. It lets you estimate each $P(X_j \\mid Y)$ separately from data (count co-occurrences for discrete features, or fit a 1-D Gaussian per feature per class for continuous ones) instead of trying to learn the impossibly large joint $P(X_1, \\ldots, X_d \\mid Y)$.",
      "usage_cn": "这是 Naive Bayes 的核心**假设** —— 给定类别后，各特征条件独立。这样就可以分别估计每个 $P(X_j \\mid Y)$（离散特征数共现次数，连续特征对每个类别拟合一维 Gaussian），不必直接去估那个维度爆炸的联合分布 $P(X_1, \\ldots, X_d \\mid Y)$。",
      "intuition_en": "'Once you tell me the class, the features stop talking to each other.' The assumption is usually wrong (features stay correlated even within a class), but the resulting classifier is fast, robust on small data, and often surprisingly good — that's why it's 'naive but useful.'",
      "intuition_cn": "\"告诉我类别之后，各特征之间就互不相关。\" 这个假设通常是错的（同一类别内特征仍相关），但分类器训练快、小数据下也稳，效果常常出乎意料地好 —— 所以叫 \"naive 但好用\"。",
      "source": "topics/naive-bayes.html#eq-naive-bayes-conditional-independence"
    },
    {
      "title": "MAP decision",
      "eq": "$$ \\hat{y}=\\arg\\max_y P(Y=y)\\prod_j P(X_j\\mid y) $$",
      "symbols": [
        {
          "sym": "$\\hat{y}$",
          "en": "predicted class",
          "cn": "预测类别"
        },
        {
          "sym": "$\\arg\\max_y$",
          "en": "the value of $y$ that makes the expression largest",
          "cn": "让表达式最大的 $y$ 值"
        },
        {
          "sym": "$P(Y=y)$",
          "en": "class prior — fit as (count of class $y$) / (total samples)",
          "cn": "类别先验 —— 用 (该类样本数) / (总样本数) 估计"
        },
        {
          "sym": "$P(X_j \\mid y)$",
          "en": "likelihood of feature $j$ given class $y$, fit per class from data",
          "cn": "给定类别 $y$ 下第 $j$ 个特征的似然，按类别从训练数据拟合"
        },
        {
          "sym": "$\\prod_j$",
          "en": "product over the $d$ features of the test sample",
          "cn": "对测试样本的 $d$ 个特征连乘"
        }
      ],
      "usage_en": "For each candidate class $y$, multiply the class prior by the product of per-feature likelihoods evaluated at the test sample's actual feature values; pick the class with the highest score. This is **Maximum A Posteriori (MAP)** — Bayes's rule with the constant denominator $P(X_1, \\ldots, X_d)$ dropped because it doesn't change the argmax.",
      "usage_cn": "对每个候选类别 $y$，把类别先验和各特征似然在测试样本特征值上的取值连乘，得分最高的类别就是预测。这就是 **Maximum A Posteriori (MAP)** —— Bayes 公式中常数分母 $P(X_1, \\ldots, X_d)$ 不影响 argmax，所以省掉了。",
      "intuition_en": "'Score each class by how well it explains the test sample, then pick the winner.' The prior gives a base rate ('which classes are common?') and the likelihood product asks 'would a sample from this class look like what I'm seeing?'. Multiply the two and take the largest.",
      "intuition_cn": "\"给每个类别打个分，看哪个最能 '解释' 这个测试样本，最高分就是答案。\" 先验告诉你 \"哪些类别本来就常见\"，似然连乘问 \"如果是这个类，会不会看到这种特征组合？\" 两者相乘后选最大。",
      "source": "topics/naive-bayes.html#eq-naive-bayes-map-decision"
    },
    {
      "title": "Log-space implementation",
      "eq": "$$ \\hat{y}=\\arg\\max_y\\Big[\\log P(y)+\\sum_j\\log P(X_j\\mid y)\\Big] $$",
      "symbols": [
        {
          "sym": "$\\log$",
          "en": "natural log (base $e$); any base works since it's monotonic",
          "cn": "自然对数（底为 $e$）；任何底都可以，因为是单调函数"
        },
        {
          "sym": "$\\log P(y)$",
          "en": "log of the class prior",
          "cn": "类别先验的对数"
        },
        {
          "sym": "$\\sum_j \\log P(X_j \\mid y)$",
          "en": "sum of per-feature log-likelihoods",
          "cn": "各特征 log-likelihood 之和"
        }
      ],
      "usage_en": "Take the log of both sides of the MAP formula. The product of $d$ probabilities (each often $\\ll 1$) becomes a sum, avoiding numerical underflow when $d$ is large. Always implement Naive Bayes this way in code.",
      "usage_cn": "对 MAP 公式两边取对数。$d$ 个概率（每个通常 $\\ll 1$）的乘积变成求和，避免在 $d$ 大时数值下溢。代码实现一律用这种 log 形式。",
      "intuition_en": "Same answer, no underflow. Multiplying 50 numbers like $0.001$ gives $10^{-150}$ — easily rounds to 0 in floating point. Adding their logs gives a comparable number you can actually compare across classes.",
      "intuition_cn": "答案完全一致，数值上不会下溢。50 个 $0.001$ 相乘得 $10^{-150}$，浮点数会直接变 0；改成把它们的 log 相加后，得到可正常比较的数。",
      "source": "topics/naive-bayes.html#eq-naive-bayes-log-space-implementation"
    },
    {
      "title": "Each feature is Gaussian per class",
      "eq": "$$ P(X_j\\mid Y=y)=\\mathcal{N}(X_j;\\,\\mu_{y,j},\\,\\sigma_{y,j}^2) $$",
      "symbols": [
        {
          "sym": "$\\mathcal{N}(\\cdot; \\mu, \\sigma^2)$",
          "en": "Gaussian density with mean $\\mu$, variance $\\sigma^2$",
          "cn": "均值为 $\\mu$、方差为 $\\sigma^2$ 的 Gaussian density"
        },
        {
          "sym": "$\\mu_{y,j}$",
          "en": "sample mean of feature $j$ within class $y$",
          "cn": "类别 $y$ 中第 $j$ 个特征的样本均值"
        },
        {
          "sym": "$\\sigma_{y,j}^2$",
          "en": "sample variance of feature $j$ within class $y$",
          "cn": "类别 $y$ 中第 $j$ 个特征的样本方差"
        },
        {
          "sym": "$(\\mu_{y,j}, \\sigma_{y,j}^2)$",
          "en": "fit independently for each (class, feature) pair",
          "cn": "对每个 (类别, 特征) 单独拟合一对参数"
        }
      ],
      "usage_en": "For continuous-valued features, model $P(X_j \\mid Y)$ as a 1-D Gaussian. Estimate $\\mu_{y,j}$ and $\\sigma_{y,j}^2$ from the subset of training data with $Y = y$ via the MLE formulas (sample mean / sample variance), then plug into the MAP formula as the likelihood. This is **Gaussian Naive Bayes**. (For discrete features, use multinomial / Bernoulli instead.)",
      "usage_cn": "对连续特征，把 $P(X_j \\mid Y)$ 建模成 1 维 Gaussian。用 $Y = y$ 的训练子集，通过 MLE 公式（样本均值 / 样本方差）估计 $\\mu_{y,j}$ 和 $\\sigma_{y,j}^2$，然后作为 likelihood 代入 MAP 公式。这就是 **Gaussian Naive Bayes**。（离散特征改用 multinomial / Bernoulli。）",
      "intuition_en": "Per (class, feature) you store just two numbers — the bell curve's center and width. Total parameters $= 2 \\times K \\times d$ for $K$ classes and $d$ features (versus exponential in the joint case). Cheap, transparent, surprisingly effective on text and tabular data.",
      "intuition_cn": "每个 (类别, 特征) 只存两个数 —— 钟形曲线的中心和宽度。共有 $2 \\times K \\times d$ 个参数（$K$ 类、$d$ 个特征），相比联合分布的指数级参数量少得多。便宜、透明、在文本和表格数据上效果意外地好。",
      "source": "topics/naive-bayes.html#eq-naive-bayes-each-feature-is-gaussian-per-class"
    }
  ],
  "linear-regression": [
    {
      "title": "Design-matrix objective",
      "eq": "$$ \\min_w \\; \\frac12\\|Y-Xw\\|_2^2 $$",
      "symbols": [
        {
          "sym": "$w \\in \\mathbb{R}^d$",
          "en": "weight vector being optimized — one weight per feature",
          "cn": "待优化的权重向量 —— 每个特征一个权重"
        },
        {
          "sym": "$X \\in \\mathbb{R}^{n \\times d}$",
          "en": "design matrix; row $i$ is feature vector $x_i^\\top$",
          "cn": "设计矩阵；第 $i$ 行是特征向量 $x_i^\\top$"
        },
        {
          "sym": "$Y \\in \\mathbb{R}^n$",
          "en": "vector of target values $(y_1, \\ldots, y_n)^\\top$",
          "cn": "目标值向量 $(y_1, \\ldots, y_n)^\\top$"
        },
        {
          "sym": "$Xw \\in \\mathbb{R}^n$",
          "en": "vector of predictions $(\\hat{y}_1, \\ldots, \\hat{y}_n)^\\top$",
          "cn": "预测值向量 $(\\hat{y}_1, \\ldots, \\hat{y}_n)^\\top$"
        },
        {
          "sym": "$\\|\\cdot\\|_2^2$",
          "en": "squared L2 norm — sum of squared entries",
          "cn": "L2 范数的平方 —— 各项平方求和"
        },
        {
          "sym": "$\\frac{1}{2}$",
          "en": "convenience factor; cancels with the 2 from differentiating the square",
          "cn": "方便因子；与平方求导出来的 2 相消"
        }
      ],
      "usage_en": "Stack training inputs into rows of $X$, targets into $Y$. Find $w$ that minimizes the sum of squared residuals (predicted minus true). Solve in closed form via the normal equation when $d$ is small, or via gradient descent when $d$ is large. To include a bias term, prepend a column of 1's to $X$ and treat it as one more component of $w$.",
      "usage_cn": "把训练输入堆成 $X$ 的行、目标堆成 $Y$。找让残差平方和（预测 − 真实）最小的 $w$。$d$ 小时走 normal equation 闭式解，$d$ 大、数据多时走 gradient descent。要加 bias，在 $X$ 前面加一列全 1，把它当成 $w$ 的一个分量。",
      "intuition_en": "Geometrically: project $Y$ onto the column space of $X$. Squared error penalizes large residuals quadratically, so it's sensitive to outliers but mathematically clean — convex, differentiable, and unique-minimum whenever $X^\\top X$ is invertible.",
      "intuition_cn": "几何上：把 $Y$ 投影到 $X$ 的列空间上。平方误差对大残差是二次惩罚，对 outlier 敏感，但数学上很干净 —— 凸、可导、当 $X^\\top X$ 可逆时有唯一最小值。",
      "source": "topics/linear-regression.html#eq-linear-regression-design-matrix-objective"
    },
    {
      "title": "Gradient",
      "eq": "$$ \\nabla_w \\frac12\\|Y-Xw\\|_2^2 = X^\\top(Xw-Y) $$",
      "symbols": [
        {
          "sym": "$\\nabla_w$",
          "en": "gradient with respect to $w$; same shape as $w$ (a $d$-vector)",
          "cn": "对 $w$ 求梯度；与 $w$ 同形状（$d$ 维向量）"
        },
        {
          "sym": "$Xw - Y \\in \\mathbb{R}^n$",
          "en": "residual vector — predictions minus targets",
          "cn": "残差向量 —— 预测 − 真实"
        },
        {
          "sym": "$X^\\top \\in \\mathbb{R}^{d \\times n}$",
          "en": "transpose of the design matrix",
          "cn": "设计矩阵的转置"
        },
        {
          "sym": "$X^\\top(Xw - Y)$",
          "en": "column-by-column inner product of features against the residual",
          "cn": "各列特征与残差的内积"
        }
      ],
      "usage_en": "Plug into gradient descent: $w_{t+1} = w_t - \\alpha\\,X^\\top(Xw_t - Y)$. Set the gradient to zero for the closed-form solution. The $j$-th component $[X^\\top r]_j$ tells you how to nudge weight $j$ to reduce error, where $r = Xw - Y$ is the residual.",
      "usage_cn": "代入 gradient descent: $w_{t+1} = w_t - \\alpha\\,X^\\top(Xw_t - Y)$。或令梯度等于 0 得到闭式解。第 $j$ 个分量 $[X^\\top r]_j$ 告诉你 \"怎样调整第 $j$ 个权重才能减小误差\"（$r = Xw - Y$ 是残差）。",
      "intuition_en": "$X^\\top r$ measures how much each feature column 'explains' the leftover error. If a feature is positively correlated with the residual, increasing its weight reduces error — that's exactly the direction the negative gradient points.",
      "intuition_cn": "$X^\\top r$ 衡量每个特征列与残余误差的相关程度。某个特征与残差正相关 → 增大它的权重能降低误差 —— 这正是负梯度的方向。",
      "source": "topics/linear-regression.html#eq-linear-regression-gradient"
    },
    {
      "title": "Normal equation",
      "eq": "$$ X^\\top Xw^* = X^\\top Y,\\qquad w^*=(X^\\top X)^{-1}X^\\top Y $$",
      "symbols": [
        {
          "sym": "$w^*$",
          "en": "optimal weight vector — the minimizer",
          "cn": "最优权重向量 —— 使目标函数最小的解"
        },
        {
          "sym": "$X^\\top X \\in \\mathbb{R}^{d \\times d}$",
          "en": "Gram matrix — symmetric, positive-semidefinite",
          "cn": "Gram 矩阵 —— 对称、半正定"
        },
        {
          "sym": "$(X^\\top X)^{-1}$",
          "en": "inverse of the Gram matrix; exists iff $X$ has linearly independent columns ($\\mathrm{rank}(X)=d$)",
          "cn": "Gram 矩阵的逆；当且仅当 $X$ 列线性无关（即满列秩 $\\mathrm{rank}(X) = d$）时存在"
        },
        {
          "sym": "$X^\\top Y \\in \\mathbb{R}^d$",
          "en": "feature-target correlation vector",
          "cn": "特征与目标的相关向量"
        }
      ],
      "usage_en": "Set the gradient $X^\\top(Xw - Y) = 0$, rearrange. The first form is the linear system to **solve** (don't actually invert the matrix in code — use `np.linalg.solve` or a Cholesky factorization for stability and speed); the second form is the explicit formula. If $X^\\top X$ is singular (e.g. $n < d$ or duplicated features), use ridge regression instead.",
      "usage_cn": "令梯度 $X^\\top(Xw - Y) = 0$ 整理即可。第一个形式是要**解**的线性方程组（代码里别真的求逆，用 `np.linalg.solve` 或 Cholesky 既稳定又快）；第二个形式是显式解。当 $X^\\top X$ 奇异（如 $n < d$ 或特征重复）时，改用 ridge regression。",
      "intuition_en": "'Stop where the gradient is zero.' The condition $X^\\top(Xw - Y) = 0$ says the residual is orthogonal to every feature column — geometrically, $Xw^*$ is the projection of $Y$ onto the column space of $X$, and the leftover $Y - Xw^*$ has zero correlation with any feature.",
      "intuition_cn": "\"梯度为 0 处停下\"。条件 $X^\\top(Xw - Y) = 0$ 表示残差与每个特征列正交 —— 几何上 $Xw^*$ 是 $Y$ 在 $X$ 列空间上的投影，残差 $Y - Xw^*$ 与任何特征都不再相关。",
      "source": "topics/linear-regression.html#eq-linear-regression-normal-equation"
    },
    {
      "title": "Ridge regularization",
      "eq": "$$ \\min_w \\frac12\\|Y-Xw\\|_2^2+\\frac{\\lambda}{2}\\|w\\|_2^2,\\qquad w^*=(X^\\top X+\\lambda I)^{-1}X^\\top Y $$",
      "symbols": [
        {
          "sym": "$\\lambda \\ge 0$",
          "en": "regularization strength (a hyperparameter)",
          "cn": "正则强度（超参数）"
        },
        {
          "sym": "$\\|w\\|_2^2$",
          "en": "$\\sum_j w_j^2$ — sum of squared weights",
          "cn": "$\\sum_j w_j^2$ —— 权重平方和"
        },
        {
          "sym": "$\\frac{\\lambda}{2}\\|w\\|_2^2$",
          "en": "penalty term that shrinks weights toward 0",
          "cn": "把权重拉向 0 的惩罚项"
        },
        {
          "sym": "$I \\in \\mathbb{R}^{d \\times d}$",
          "en": "identity matrix",
          "cn": "单位矩阵"
        },
        {
          "sym": "$X^\\top X + \\lambda I$",
          "en": "always invertible when $\\lambda > 0$ (positive-definite)",
          "cn": "$\\lambda > 0$ 时一定可逆（正定）"
        }
      ],
      "usage_en": "Add the L2 penalty to the OLS objective. Pick $\\lambda$ via cross-validation: small $\\lambda \\approx$ OLS, large $\\lambda \\approx$ all-zero weights. The closed-form solution just adds $\\lambda I$ to the Gram matrix before inverting. **Standardize features first** — without it, weights with naturally large scales get over-penalized.",
      "usage_cn": "在 OLS 目标里加上 L2 惩罚项。$\\lambda$ 用 cross-validation 选：$\\lambda$ 小 ≈ OLS，$\\lambda$ 大 ≈ 全 0 解。闭式解就是在反矩阵前给 Gram 矩阵加 $\\lambda I$。**先做特征标准化** —— 否则尺度天然大的权重会被惩罚得过狠。",
      "intuition_en": "Two pressures fighting: 'fit the data well' vs. 'keep weights small.' Small weights → smoother model → less overfitting and a stable solution even when $X^\\top X$ is singular. Bayesian view: ridge $=$ MAP estimate under a Gaussian prior $w \\sim \\mathcal{N}(0, \\frac{1}{\\lambda} I)$.",
      "intuition_cn": "两股力在拔河：\"拟合好数据\" vs. \"权重不要太大\"。权重小 → 模型更平滑 → 减少过拟合，且即使 $X^\\top X$ 奇异也能有稳定解。Bayesian 视角：ridge $=$ 在 Gaussian prior $w \\sim \\mathcal{N}(0, \\frac{1}{\\lambda} I)$ 下的 MAP 估计。",
      "source": "topics/linear-regression.html#eq-linear-regression-ridge-regularization"
    }
  ],
  "logistic-regression": [
    {
      "title": "Sigmoid",
      "eq": "$$ \\sigma(z)=\\frac{1}{1+e^{-z}} $$",
      "symbols": [
        {
          "sym": "$\\sigma(z)$",
          "en": "the logistic / sigmoid function — squashes any real $z$ into $(0,1)$",
          "cn": "logistic / sigmoid 函数 —— 把任意实数 $z$ 压到 $(0,1)$"
        },
        {
          "sym": "$z = w^\\top x$",
          "en": "the linear score — typically $w^\\top x + b$",
          "cn": "线性 score —— 通常是 $w^\\top x + b$"
        },
        {
          "sym": "$e^{-z}$",
          "en": "exponential — large positive $z$ → tiny denominator → output near 1",
          "cn": "指数 —— $z$ 大的正值 → 分母极小 → 输出接近 1"
        }
      ],
      "usage_en": "Use as the output activation for binary classification; interpret $\\sigma(w^\\top x)$ as $P(y=1 \\mid x)$. Threshold at 0.5 to predict the class. Derivative is $\\sigma'(z) = \\sigma(z)(1-\\sigma(z))$ — appears in every gradient computation.",
      "usage_cn": "二分类的输出激活函数；把 $\\sigma(w^\\top x)$ 当作 $P(y=1 \\mid x)$。阈值 0.5 给出预测类别。导数 $\\sigma'(z) = \\sigma(z)(1-\\sigma(z))$ —— 在每次梯度计算中都会出现。",
      "intuition_en": "An S-curve that interprets a linear score as a probability. Negative scores → near 0, large positives → near 1, $z=0$ → exactly 0.5. Saturates at the extremes, which is why logistic regression has 'flat' gradients for very confident predictions.",
      "intuition_cn": "一条 S 形曲线，把线性 score 解读为概率。负 score → 接近 0，大的正 score → 接近 1，$z=0$ → 正好 0.5。两端饱和 —— 这就是为什么对 \"非常自信\" 的预测梯度会变平。",
      "source": "topics/logistic-regression.html#eq-logistic-regression-sigmoid"
    },
    {
      "title": "Decision boundary",
      "eq": "$$ p(y=1\\mid x)=0.5 \\iff w^\\top\\phi(x)=0 $$",
      "symbols": [
        {
          "sym": "$p(y=1 \\mid x) = 0.5$",
          "en": "the cutoff probability for classifying as class 1",
          "cn": "判为类别 1 的概率阈值"
        },
        {
          "sym": "$w^\\top \\phi(x) = 0$",
          "en": "the equivalent linear condition (sigmoid is 0.5 at $z=0$)",
          "cn": "等价的线性条件（sigmoid 在 $z=0$ 处取 0.5）"
        },
        {
          "sym": "$\\phi(x)$",
          "en": "feature map (identity for plain logistic regression)",
          "cn": "特征映射（普通 logistic regression 中是恒等映射）"
        }
      ],
      "usage_en": "Use to plot or analyze classifier behavior. The decision surface is a hyperplane in $\\phi(x)$-space — that's what makes logistic regression a **linear classifier** despite the non-linear sigmoid output.",
      "usage_cn": "用于画图或分析分类器行为。决策面在 $\\phi(x)$ 空间是一个超平面 —— 尽管输出经过非线性 sigmoid，logistic regression 仍是**线性分类器**。",
      "intuition_en": "'Sigmoid is 0.5 exactly when its input is 0.' So the decision boundary lives at $w^\\top \\phi(x) = 0$ — a hyperplane through the origin (or shifted, with bias). The non-linear part is only in the output, not the boundary.",
      "intuition_cn": "\"sigmoid 在输入为 0 时正好等于 0.5。\" 所以决策边界位于 $w^\\top \\phi(x) = 0$ —— 过原点的超平面（带 bias 时平移）。非线性只在输出部分，不在边界形状。",
      "source": "topics/logistic-regression.html#eq-logistic-regression-decision-boundary"
    },
    {
      "title": "Negative log-likelihood",
      "eq": "$$ \\min_w \\sum_{(x_i,y_i)\\in D}\\log\\!\\left(1+\\exp(-y_i w^\\top\\phi(x_i))\\right) $$",
      "symbols": [
        {
          "sym": "$D$",
          "en": "training set $\\{(x_i, y_i)\\}$",
          "cn": "训练集 $\\{(x_i, y_i)\\}$"
        },
        {
          "sym": "$y_i \\in \\{-1, +1\\}$",
          "en": "label in the $\\pm 1$ form (different sign convention than 0/1)",
          "cn": "$\\pm 1$ 形式的标签（与 0/1 约定符号不同）"
        },
        {
          "sym": "$w^\\top \\phi(x_i)$",
          "en": "linear margin score",
          "cn": "线性 margin score"
        },
        {
          "sym": "$\\log(1 + e^{-z})$",
          "en": "softplus / log-loss — smooth approximation of $\\max(0, -z)$",
          "cn": "softplus / log-loss —— $\\max(0, -z)$ 的光滑近似"
        }
      ],
      "usage_en": "Standard logistic-regression objective. Minimize via gradient descent (no closed form because of the non-linearity). Add an L2 regularizer $\\frac{\\lambda}{2}\\|w\\|^2$ for ridge-style logistic regression.",
      "usage_cn": "logistic regression 标准目标。用 gradient descent 最小化（因非线性无闭式解）。加 L2 正则 $\\frac{\\lambda}{2}\\|w\\|^2$ 即 ridge 版 logistic regression。",
      "intuition_en": "Penalty grows when the score has the wrong sign relative to $y_i$. Confident-and-correct → near-zero loss; confident-and-wrong → linear penalty in $|z|$. This is what makes the loss convex and well-behaved.",
      "intuition_cn": "当 score 的符号与 $y_i$ 相反时惩罚增大。自信且对 → 损失接近 0；自信但错 → 惩罚关于 $|z|$ 线性增长。正是这种形式让 loss 凸且行为良好。",
      "source": "topics/logistic-regression.html#eq-logistic-regression-negative-log-likelihood"
    },
    {
      "title": "Gradient descent update",
      "eq": "$$ w_{t+1}=w_t-\\alpha \\nabla f(w_t) $$",
      "symbols": [
        {
          "sym": "$w_t$",
          "en": "current weight vector at step $t$",
          "cn": "第 $t$ 步的当前权重向量"
        },
        {
          "sym": "$w_{t+1}$",
          "en": "updated weights after one step",
          "cn": "一步更新后的权重"
        },
        {
          "sym": "$\\alpha$",
          "en": "learning rate (positive scalar)",
          "cn": "学习率（正标量）"
        },
        {
          "sym": "$\\nabla f(w_t)$",
          "en": "gradient of the loss at $w_t$",
          "cn": "$w_t$ 处 loss 的梯度"
        }
      ],
      "usage_en": "Generic GD update — works for any differentiable loss, not just logistic. For logistic regression specifically, $\\nabla f(w) = -\\sum_i y_i \\sigma(-y_i w^\\top x_i)\\, x_i$ (with $\\pm 1$ labels). Pick $\\alpha$ via line search or schedule.",
      "usage_cn": "通用 GD 更新 —— 对任意可微 loss 都适用，不限 logistic。logistic regression 中 $\\nabla f(w) = -\\sum_i y_i \\sigma(-y_i w^\\top x_i)\\, x_i$（$\\pm 1$ 标签下）。$\\alpha$ 用 line search 或调度选。",
      "intuition_en": "'Walk against the gradient by step size $\\alpha$.' On convex losses (logistic regression is convex), this finds the global minimum; learning-rate tuning is the main practical concern.",
      "intuition_cn": "\"沿负梯度走 $\\alpha$ 步。\" 在凸 loss（logistic regression 凸）上能找到全局最小；实际中调学习率是主要工作。",
      "source": "topics/logistic-regression.html#eq-logistic-regression-gradient-descent-update"
    },
    {
      "title": "Convexity check for $y\\in\\{0,1\\}$ form",
      "eq": "$$ \\nabla^2 L(w)=X^\\top B X,\\qquad B=\\mathrm{diag}(p_i(1-p_i)) $$",
      "symbols": [
        {
          "sym": "$\\nabla^2 L(w)$",
          "en": "Hessian of the logistic loss",
          "cn": "logistic loss 的 Hessian"
        },
        {
          "sym": "$X$",
          "en": "design matrix (rows are feature vectors)",
          "cn": "设计矩阵（行是特征向量）"
        },
        {
          "sym": "$B = \\mathrm{diag}(p_i(1-p_i))$",
          "en": "diagonal of variances $p_i(1-p_i)$ where $p_i = \\sigma(w^\\top x_i)$",
          "cn": "方差对角阵，$p_i = \\sigma(w^\\top x_i)$"
        },
        {
          "sym": "$p_i (1-p_i) \\ge 0$",
          "en": "each diagonal entry non-negative ⇒ $B \\succeq 0$",
          "cn": "每个对角项非负 ⇒ $B \\succeq 0$"
        }
      ],
      "usage_en": "Use the sandwich identity: $X^\\top B X \\succeq 0$ when $B \\succeq 0$, so the Hessian is PSD everywhere → the logistic loss is convex → gradient descent converges to the global minimum.",
      "usage_cn": "用 sandwich 恒等式：$B \\succeq 0$ 时 $X^\\top B X \\succeq 0$，所以 Hessian 处处 PSD → logistic loss 凸 → gradient descent 收敛到全局最小。",
      "intuition_en": "'Variances $p_i(1-p_i)$ are between 0 and 0.25 — never negative.' That non-negativity is what guarantees convexity; without it, the loss could have multiple local minima and GD would be unreliable.",
      "intuition_cn": "\"方差 $p_i(1-p_i)$ 在 0 到 0.25 之间 —— 永远非负。\" 这个非负性正是凸性的保障；没有它的话，loss 可能有多个局部最小，GD 就不可靠。",
      "source": "topics/logistic-regression.html#eq-logistic-regression-convexity-check-for-y-0-1-form"
    }
  ],
  "svm": [
    {
      "title": "Signed distance / margin",
      "eq": "$$ \\gamma(w,b)=\\min_i \\frac{y_i(w^\\top x_i+b)}{\\|w\\|_2} $$",
      "symbols": [
        {
          "sym": "$\\gamma(w, b)$",
          "en": "the margin — distance from the closest point to the decision hyperplane",
          "cn": "margin —— 最近点到决策超平面的距离"
        },
        {
          "sym": "$y_i \\in \\{-1, +1\\}$",
          "en": "true class label",
          "cn": "真实类别标签"
        },
        {
          "sym": "$w^\\top x_i + b$",
          "en": "signed distance from $x_i$ to the hyperplane (before normalizing)",
          "cn": "$x_i$ 到超平面的有符号距离（归一化前）"
        },
        {
          "sym": "$\\|w\\|_2$",
          "en": "L2 norm of the weight vector — divides to get geometric distance",
          "cn": "权重向量的 L2 范数 —— 除以它得到几何距离"
        },
        {
          "sym": "$\\min_i$",
          "en": "the worst case — the closest training point to the boundary",
          "cn": "最差情形 —— 距离边界最近的训练点"
        }
      ],
      "usage_en": "Use to define what SVM is maximizing: the smallest distance from any training point to the separating hyperplane. The factor $y_i$ flips the sign so correct predictions count as positive distance.",
      "usage_cn": "用来定义 SVM 在最大化什么：任意训练点到分离超平面的最小距离。$y_i$ 把符号翻转，让 \"正确预测\" 计为正距离。",
      "intuition_en": "'How wide is the road between the two classes?' SVM tries to make this road as wide as possible. The closest points pinning the road are the support vectors.",
      "intuition_cn": "\"两类之间的 '路' 有多宽？\" SVM 试图把这条路修得越宽越好。把路 \"卡住\" 的最近点就是 support vectors。",
      "source": "topics/svm.html#eq-svm-signed-distance-margin"
    },
    {
      "title": "Hard-margin SVM",
      "eq": "$$ \\min_{w,b}\\frac12\\|w\\|_2^2 \\quad \\text{s.t.}\\quad y_i(w^\\top x_i+b)\\ge 1 $$",
      "symbols": [
        {
          "sym": "$w, b$",
          "en": "hyperplane parameters being optimized",
          "cn": "待优化的超平面参数"
        },
        {
          "sym": "$\\frac{1}{2}\\|w\\|_2^2$",
          "en": "objective — minimizing $\\|w\\|$ maximizes the margin $1/\\|w\\|$",
          "cn": "目标 —— 最小化 $\\|w\\|$ 即最大化 margin $1/\\|w\\|$"
        },
        {
          "sym": "$y_i(w^\\top x_i + b) \\ge 1$",
          "en": "every training point lies outside the margin band, on the correct side",
          "cn": "每个训练点都在 margin 带外、且在正确侧"
        },
        {
          "sym": "s.t.",
          "en": "subject to (the constraint must hold for every $i$)",
          "cn": "subject to（每个 $i$ 都必须满足约束）"
        }
      ],
      "usage_en": "Use only when training data is **linearly separable** — otherwise no $w, b$ satisfy all constraints. Solve as a convex QP; or take the dual (one variable per training point) to introduce kernels.",
      "usage_cn": "仅在训练数据**线性可分**时用 —— 否则没有 $w, b$ 能满足所有约束。可以作为凸 QP 求解；或者取对偶（每个训练点一个变量）以引入 kernel。",
      "intuition_en": "'Find the widest road that fits between the two classes — assume one exists.' The constraint forces the road to be at least 2 units wide (after the $\\|w\\|$ rescaling); minimizing $\\|w\\|^2$ makes the road as wide as possible.",
      "intuition_cn": "\"假设两类之间能塞下一条路，找最宽的那条。\" 约束强制路至少宽 2（$\\|w\\|$ 重缩放后）；最小化 $\\|w\\|^2$ 让路尽可能宽。",
      "source": "topics/svm.html#eq-svm-hard-margin-svm"
    },
    {
      "title": "Soft-margin SVM",
      "eq": "$$ \\min_{w,b,\\xi}\\frac12\\|w\\|_2^2+C\\sum_i\\xi_i $$\n$$ y_i(w^\\top x_i+b)\\ge 1-\\xi_i,\\qquad \\xi_i\\ge 0 $$",
      "symbols": [
        {
          "sym": "$\\xi_i \\ge 0$",
          "en": "slack variable for sample $i$ — measures violation amount",
          "cn": "样本 $i$ 的松弛变量 —— 衡量违反量"
        },
        {
          "sym": "$C$",
          "en": "regularization constant — large $C$ punishes violations harshly",
          "cn": "正则常数 —— $C$ 大则对违反惩罚严厉"
        },
        {
          "sym": "$y_i(w^\\top x_i + b) \\ge 1 - \\xi_i$",
          "en": "relaxed margin constraint (allow $\\xi_i$ slack)",
          "cn": "松弛后的 margin 约束（允许 $\\xi_i$ 松弛）"
        },
        {
          "sym": "$C \\sum_i \\xi_i$",
          "en": "total slack penalty added to the objective",
          "cn": "总松弛惩罚加到目标里"
        },
        {
          "sym": "$\\frac{1}{2}\\|w\\|^2$",
          "en": "margin term (same as hard-margin)",
          "cn": "margin 项（与 hard-margin 相同）"
        }
      ],
      "usage_en": "Use when data isn't linearly separable. Tune $C$ via cross-validation: small $C$ → wider margin, more violations tolerated (more bias); large $C$ → narrower margin, few violations (more variance, may overfit).",
      "usage_cn": "数据不线性可分时使用。$C$ 用 cross-validation 调：小 $C$ → margin 更宽、容忍更多违反（偏差大）；大 $C$ → margin 更窄、违反少（方差大、可能过拟合）。",
      "intuition_en": "'Allow some points to misbehave, pay a price $C\\xi_i$ for each.' The price $C$ trades off road-width against how much the data is allowed to break the rules.",
      "intuition_cn": "\"允许一些点违规，每个违规付价格 $C\\xi_i$。\" 价格 $C$ 在 \"路宽\" 与 \"允许多少违规\" 之间权衡。",
      "source": "topics/svm.html#eq-svm-soft-margin-svm"
    },
    {
      "title": "Hinge-loss form",
      "eq": "$$ \\ell_{\\text{hinge}}(t)=\\max(0,1-t),\\qquad t=y_i(w^\\top x_i+b) $$",
      "symbols": [
        {
          "sym": "$\\max(0, 1 - y_i(w^\\top x_i + b))$",
          "en": "hinge loss — zero if margin is met, linear otherwise",
          "cn": "hinge loss —— margin 达标时为 0，否则线性"
        },
        {
          "sym": "$y_i(w^\\top x_i + b)$",
          "en": "signed margin of sample $i$",
          "cn": "样本 $i$ 的有符号 margin"
        },
        {
          "sym": "$\\frac{1}{2}\\|w\\|_2^2$",
          "en": "L2 regularizer (same role as in soft-margin SVM)",
          "cn": "L2 正则项（作用同 soft-margin SVM）"
        },
        {
          "sym": "$C$",
          "en": "regularization weight balancing margin vs. data fit",
          "cn": "正则权重，平衡 margin 与数据拟合"
        }
      ],
      "usage_en": "Equivalent to soft-margin SVM after eliminating $\\xi_i$. Use this form for stochastic gradient training (sub-gradient descent on hinge loss is straightforward and scales to big data).",
      "usage_cn": "消去 $\\xi_i$ 后与 soft-margin SVM 等价。用这个形式做 stochastic gradient 训练（hinge loss 上的 sub-gradient descent 简单直接，适合大数据）。",
      "intuition_en": "'Pay nothing if the point is past the margin; pay linearly if it's inside.' Hinge loss only cares about points that are wrong or barely right — that's why SVM solutions depend on the **support vectors** only.",
      "intuition_cn": "\"点在 margin 外不付费；进入 margin 后线性付费。\" hinge loss 只在乎错的或勉强对的点 —— 这正是为什么 SVM 解只依赖于 **support vectors**。",
      "source": "topics/svm.html#eq-svm-hinge-loss-form"
    },
    {
      "title": "Soft-margin dual shape",
      "eq": "$$ \\max_\\alpha \\sum_i \\alpha_i-\\frac12\\sum_i\\sum_j \\alpha_i\\alpha_j y_i y_j x_i^\\top x_j $$\n$$ 0\\le \\alpha_i\\le C,\\qquad \\sum_i \\alpha_i y_i=0 $$",
      "symbols": [
        {
          "sym": "$\\alpha_i$",
          "en": "dual variable per training point — $0 \\le \\alpha_i \\le C$",
          "cn": "每个训练点的对偶变量 —— $0 \\le \\alpha_i \\le C$"
        },
        {
          "sym": "$x_i^\\top x_j$",
          "en": "inner product between training points (replace with kernel $K(x_i, x_j)$ for non-linear)",
          "cn": "训练点之间的内积（非线性时换成 kernel $K(x_i, x_j)$）"
        },
        {
          "sym": "$\\sum_i \\alpha_i y_i = 0$",
          "en": "equality constraint from the bias term $b$",
          "cn": "由 bias 项 $b$ 引出的等式约束"
        },
        {
          "sym": "box constraint $0 \\le \\alpha_i \\le C$",
          "en": "$C$ caps each $\\alpha_i$ — only the soft-margin form has the upper bound",
          "cn": "$C$ 把每个 $\\alpha_i$ 封顶 —— 上界只在 soft-margin 形式出现"
        }
      ],
      "usage_en": "Solve as a QP in $\\alpha$ (one variable per training sample). After solving, $w = \\sum_i \\alpha_i y_i x_i$ and only points with $\\alpha_i > 0$ matter — those are the support vectors. The kernel trick swaps $x_i^\\top x_j$ for $K(x_i, x_j)$ without ever computing $\\phi(x)$.",
      "usage_cn": "在 $\\alpha$ 上解 QP（每个训练样本一个变量）。解完 $w = \\sum_i \\alpha_i y_i x_i$，只有 $\\alpha_i > 0$ 的点起作用 —— 即 support vectors。kernel trick 把 $x_i^\\top x_j$ 换成 $K(x_i, x_j)$，根本不必算 $\\phi(x)$。",
      "intuition_en": "'In the dual, the model is built from training points themselves, weighted by $\\alpha_i y_i$.' Most $\\alpha_i$ end up zero (sparsity); only support vectors contribute. The kernel function just defines an inner product on $\\phi(x)$ space implicitly.",
      "intuition_cn": "\"对偶里模型直接由训练点（按 $\\alpha_i y_i$ 加权）构造。\" 大多数 $\\alpha_i$ 是 0（稀疏）；只有 support vectors 有贡献。kernel 函数只是隐式地定义 $\\phi(x)$ 空间的内积。",
      "source": "topics/svm.html#eq-svm-soft-margin-dual-shape"
    }
  ],
  "kernel-methods": [
    {
      "title": "Kernel definition",
      "eq": "$$ k(x,x')=\\phi(x)^\\top\\phi(x') $$",
      "symbols": [
        {
          "sym": "$K(x, x')$",
          "en": "kernel function — outputs a scalar similarity between $x, x'$",
          "cn": "kernel 函数 —— 输出 $x, x'$ 之间的标量相似度"
        },
        {
          "sym": "$\\phi(x)$",
          "en": "feature map (often very high or infinite dimensional)",
          "cn": "特征映射（常为高维或无限维）"
        },
        {
          "sym": "$\\phi(x)^\\top \\phi(x')$",
          "en": "inner product in feature space — what the kernel computes implicitly",
          "cn": "feature 空间中的内积 —— kernel 隐式计算的就是这个"
        }
      ],
      "usage_en": "Use any positive-semidefinite (Mercer) kernel — that guarantees a valid feature map exists. Common choices: linear, polynomial, RBF. The kernel matrix $K_{ij} = K(x_i, x_j)$ is what algorithms (SVM dual, kernel ridge, kernel PCA) actually consume.",
      "usage_cn": "使用任意正半定（Mercer）kernel —— 保证存在合法的 feature map。常见选择：linear、polynomial、RBF。算法（SVM dual、kernel ridge、kernel PCA）实际消费的是 kernel 矩阵 $K_{ij} = K(x_i, x_j)$。",
      "intuition_en": "'A shortcut for inner products in a (possibly insanely high-dimensional) feature space — without ever materializing $\\phi(x)$.' Lets a linear method in $\\phi$-space behave non-linearly in $x$-space.",
      "intuition_cn": "\"在（可能极高维的）feature 空间里做内积的捷径 —— 完全不必显式构造 $\\phi(x)$。\" 让 $\\phi$ 空间的线性方法在 $x$ 空间表现为非线性。",
      "source": "topics/kernel-methods.html#eq-kernel-methods-kernel-definition"
    },
    {
      "title": "Kernelized SVM prediction",
      "eq": "$$ f(x)=\\sum_i\\alpha_i y_i\\,k(x_i,x)+b $$",
      "symbols": [
        {
          "sym": "$f(x)$",
          "en": "decision function (sign gives the predicted class)",
          "cn": "决策函数（符号给出预测类别）"
        },
        {
          "sym": "$\\alpha_i y_i$",
          "en": "signed dual weight for training point $i$",
          "cn": "训练点 $i$ 的有符号对偶权重"
        },
        {
          "sym": "$K(x_i, x)$",
          "en": "similarity between training point $x_i$ and query $x$",
          "cn": "训练点 $x_i$ 与查询 $x$ 的相似度"
        },
        {
          "sym": "$b$",
          "en": "bias term recovered from KKT conditions",
          "cn": "从 KKT 条件恢复出来的 bias 项"
        },
        {
          "sym": "$\\sum_i$",
          "en": "sum over training samples — but most $\\alpha_i = 0$, so really just over support vectors",
          "cn": "对训练样本求和 —— 但大多数 $\\alpha_i = 0$，实际只对 support vectors 求和"
        }
      ],
      "usage_en": "Use after solving the dual: store the support vectors and their $\\alpha_i$, predict by computing kernel similarities to each. Cost is $O(\\#\\text{SV} \\cdot d)$ per prediction — good when SV count is small relative to training size.",
      "usage_cn": "解完对偶后用：保存 support vectors 和它们的 $\\alpha_i$，预测时计算与每个的 kernel 相似度并求和。每次预测代价 $O(\\#\\text{SV} \\cdot d)$ —— 当 SV 数远小于训练集时高效。",
      "intuition_en": "'Compare the query to the support vectors, weight by $\\alpha_i y_i$, sum the votes.' The decision is a weighted similarity-vote — the kernel is the similarity measure, the duals are the vote weights.",
      "intuition_cn": "\"把查询与所有 support vectors 比相似度，按 $\\alpha_i y_i$ 加权求和。\" 决策就是一个加权相似度投票 —— kernel 是相似度，对偶变量是投票权重。",
      "source": "topics/kernel-methods.html#eq-kernel-methods-kernelized-svm-prediction"
    },
    {
      "title": "Polynomial kernel",
      "eq": "$$ k(x,x')=(1+x^\\top x')^d $$",
      "symbols": [
        {
          "sym": "$x^\\top x'$",
          "en": "raw inner product of inputs",
          "cn": "输入的原始内积"
        },
        {
          "sym": "$c \\ge 0$",
          "en": "constant offset (controls cross-term mixing)",
          "cn": "常数偏移（控制交叉项混合）"
        },
        {
          "sym": "$d \\in \\mathbb{N}$",
          "en": "degree — controls highest interaction order",
          "cn": "阶数 —— 控制最高交互阶数"
        },
        {
          "sym": "$(x^\\top x' + c)^d$",
          "en": "kernel value after raising to power $d$",
          "cn": "提升到 $d$ 次幂后的 kernel 值"
        }
      ],
      "usage_en": "Use when you suspect feature interactions matter (e.g. $x_1 x_2$, $x_1^2$). Setting $c > 0$ keeps lower-order terms; $c = 0$ retains only degree-$d$ monomials. Computational cost is $O(d_{\\text{input}})$ — far cheaper than expanding $\\phi$.",
      "usage_cn": "怀疑特征间存在交互（如 $x_1 x_2$、$x_1^2$）时用。$c > 0$ 保留低阶项；$c = 0$ 只保留 $d$ 阶单项。计算代价 $O(d_{\\text{input}})$ —— 远低于显式展开 $\\phi$。",
      "intuition_en": "Implicit feature space contains all monomials up to degree $d$. Without the kernel trick, expanding to degree-3 in 100-dim input would mean $\\binom{103}{3} \\approx 176{,}000$ new features; the kernel does it as one dot product + power.",
      "intuition_cn": "隐式 feature 空间包含所有最高 $d$ 阶单项。不用 kernel trick，100 维输入展开到 3 阶就是 $\\binom{103}{3} \\approx 176{,}000$ 个新特征；kernel 一次点积加幂运算就完成了。",
      "source": "topics/kernel-methods.html#eq-kernel-methods-polynomial-kernel"
    },
    {
      "title": "RBF / Gaussian kernel",
      "eq": "$$ k_\\sigma(x,x')=\\exp\\!\\left(-\\frac{\\|x-x'\\|_2^2}{2\\sigma^2}\\right) $$",
      "symbols": [
        {
          "sym": "$\\|x - x'\\|^2$",
          "en": "squared Euclidean distance between inputs",
          "cn": "输入间的欧氏距离平方"
        },
        {
          "sym": "$\\gamma > 0$",
          "en": "bandwidth — large $\\gamma$ → very local; small $\\gamma$ → smooth",
          "cn": "带宽 —— 大 $\\gamma$ → 非常局部；小 $\\gamma$ → 平滑"
        },
        {
          "sym": "$\\exp(-\\gamma \\|x - x'\\|^2)$",
          "en": "similarity decays as Gaussian over distance",
          "cn": "相似度按 Gaussian 随距离衰减"
        }
      ],
      "usage_en": "Default kernel in many libraries — works well out-of-the-box. Tune $\\gamma$ via cross-validation: a common heuristic is $\\gamma = 1/(2\\sigma^2)$ where $\\sigma$ is a typical pairwise distance. The implicit feature space is **infinite-dimensional**.",
      "usage_cn": "许多库的默认 kernel —— 开箱即用。$\\gamma$ 用 cross-validation 调：常用启发式 $\\gamma = 1/(2\\sigma^2)$，$\\sigma$ 是典型成对距离。隐式 feature 空间是**无限维**的。",
      "intuition_en": "'Similarity equals 1 when points coincide, decays smoothly toward 0 as they separate.' Like a soft KNN where every training point contributes, but distant ones contribute almost nothing.",
      "intuition_cn": "\"两点重合时相似度为 1，随距离平滑衰减到 0。\" 类似软化版的 KNN —— 每个训练点都贡献，但远的几乎没贡献。",
      "source": "topics/kernel-methods.html#eq-kernel-methods-rbf-gaussian-kernel"
    },
    {
      "title": "XOR lifting from Lecture 7",
      "eq": "$$ \\phi(x_1,x_2)=(x_1,x_2,x_1x_2) $$",
      "symbols": [
        {
          "sym": "$x = (x_1, x_2)$",
          "en": "2-D input — XOR is not linearly separable here",
          "cn": "2 维输入 —— XOR 在这里不可线性分"
        },
        {
          "sym": "$\\phi(x) = (x_1, x_2, x_1 x_2)$",
          "en": "lifted feature map adding the product feature",
          "cn": "提升的 feature map，加入乘积特征"
        },
        {
          "sym": "$x_1 x_2$",
          "en": "the new dimension that makes the four XOR points linearly separable in 3-D",
          "cn": "新增维度，让 XOR 的四个点在 3D 中可线性分"
        }
      ],
      "usage_en": "Canonical example showing why kernels (or hand-designed feature maps) help: XOR's four points form a checkerboard in 2-D that no line can split, but adding the product $x_1 x_2$ as a third coordinate makes them planarly separable.",
      "usage_cn": "经典例子，说明 kernel（或手工设计的 feature map）为什么有用：XOR 的四个点在 2D 棋盘上没有直线能分开，但把乘积 $x_1 x_2$ 作为第三个坐标后在平面上就可分了。",
      "intuition_en": "'Lift the data into a higher-dimensional space where it becomes linearly separable.' Polynomial kernel of degree 2 with $c = 0$ gives this XOR-friendly feature map essentially for free.",
      "intuition_cn": "\"把数据抬到更高维空间，使其变得线性可分。\" 度数为 2、$c = 0$ 的 polynomial kernel 几乎免费地给出这个 XOR 友好的 feature map。",
      "source": "topics/kernel-methods.html#eq-kernel-methods-xor-lifting-from-lecture-7"
    }
  ],
  "decision-trees": [
    {
      "title": "Entropy",
      "eq": "$$ I(D)=-\\sum_{c=1}^{C}p(c\\mid D)\\log_2 p(c\\mid D) $$",
      "symbols": [
        {
          "sym": "$H(p)$",
          "en": "Shannon entropy of distribution $p$",
          "cn": "分布 $p$ 的 Shannon 熵"
        },
        {
          "sym": "$p_k$",
          "en": "probability of class $k$ in the node",
          "cn": "节点中类别 $k$ 的占比"
        },
        {
          "sym": "$\\log_2$",
          "en": "log base 2 → entropy in bits (base $e$ → nats)",
          "cn": "以 2 为底 → 单位是 bit；以 $e$ 为底 → nat"
        },
        {
          "sym": "$-\\sum_k p_k \\log p_k$",
          "en": "expected information content (always $\\ge 0$)",
          "cn": "期望信息量（恒 $\\ge 0$）"
        }
      ],
      "usage_en": "Use as the impurity measure when growing a classification tree. Compute the entropy of class proportions in a node; maximum is $\\log_2 K$ for $K$ classes (uniform), zero for pure node.",
      "usage_cn": "分类树生长时作为不纯度度量。计算节点内类别比例的熵；$K$ 个类时最大值 $\\log_2 K$（均匀分布），纯节点时为 0。",
      "intuition_en": "'How surprised am I when sampling a label from this node?' Pure node → no surprise (entropy 0); 50/50 → maximum surprise (entropy 1 bit for 2 classes).",
      "intuition_cn": "\"从这个节点采样一个标签时我有多惊讶？\" 纯节点 → 不惊讶（熵 0）；50/50 → 最惊讶（2 类时熵 1 bit）。",
      "source": "topics/decision-trees.html#eq-decision-trees-entropy"
    },
    {
      "title": "Information gain",
      "eq": "$$ IG(D,f)=I(D)-\\sum_j\\frac{|D_j|}{|D|}I(D_j) $$",
      "symbols": [
        {
          "sym": "$IG$",
          "en": "information gain from splitting node $S$ on attribute $A$",
          "cn": "在节点 $S$ 上按属性 $A$ 切分获得的信息增益"
        },
        {
          "sym": "$H(S)$",
          "en": "entropy of the parent node before splitting",
          "cn": "切分前父节点的熵"
        },
        {
          "sym": "$S_v$",
          "en": "subset of $S$ where attribute $A$ takes value $v$",
          "cn": "$S$ 中属性 $A$ 取 $v$ 的子集"
        },
        {
          "sym": "$|S_v|/|S|$",
          "en": "proportion of samples going to child $v$ — used to weight child entropies",
          "cn": "进入子节点 $v$ 的样本占比 —— 给子节点熵加权"
        },
        {
          "sym": "$\\sum_v$",
          "en": "sum over all values $A$ can take",
          "cn": "对 $A$ 所有可能取值求和"
        }
      ],
      "usage_en": "At each node, evaluate $IG$ for every candidate split; pick the split with the largest $IG$. ID3 / C4.5 use this directly; CART uses Gini instead but the structure is the same.",
      "usage_cn": "在每个节点对每个候选切分计算 $IG$，选 $IG$ 最大的那个。ID3 / C4.5 直接用这个；CART 用 Gini，但结构相同。",
      "intuition_en": "'How much does splitting on $A$ reduce my uncertainty about the label?' A perfect split that creates pure children has $IG = H(S)$; a useless split (children look like the parent) has $IG = 0$.",
      "intuition_cn": "\"按 $A$ 切分能减少多少对标签的不确定性？\" 完美切分（子节点全纯）$IG = H(S)$；无用切分（子节点像父节点）$IG = 0$。",
      "source": "topics/decision-trees.html#eq-decision-trees-information-gain"
    },
    {
      "title": "Gini impurity",
      "eq": "$$ G(D)=1-\\sum_c p_c^2 $$",
      "symbols": [
        {
          "sym": "$\\mathrm{Gini}(p)$",
          "en": "Gini index of distribution $p$",
          "cn": "分布 $p$ 的 Gini index"
        },
        {
          "sym": "$p_k$",
          "en": "probability of class $k$",
          "cn": "类别 $k$ 的概率"
        },
        {
          "sym": "$1 - \\sum_k p_k^2$",
          "en": "probability that two random samples disagree",
          "cn": "随机抽两个样本类别不同的概率"
        }
      ],
      "usage_en": "Alternative impurity for classification trees — used by CART. Computationally cheaper than entropy (no log) and produces nearly identical trees in practice. Range: 0 (pure) to $1 - 1/K$ (uniform over $K$ classes).",
      "usage_cn": "分类树的另一种不纯度 —— CART 使用。比熵更便宜（无 log），实际产生的树几乎相同。范围：0（纯）到 $1 - 1/K$（$K$ 类均匀）。",
      "intuition_en": "'If I draw two samples from this node, how often do they disagree?' Pure node → never disagree (Gini 0); uniform → maximally often disagree.",
      "intuition_cn": "\"从节点抽两个样本，它们多频繁地不同类？\" 纯节点 → 从不（Gini 0）；均匀分布 → 最频繁。",
      "source": "topics/decision-trees.html#eq-decision-trees-gini-impurity"
    },
    {
      "title": "Classification error",
      "eq": "$$ E(D)=1-\\max_c p(c\\mid D) $$",
      "symbols": [
        {
          "sym": "$1 - \\max_k p_k$",
          "en": "fraction of samples that would be misclassified by majority vote",
          "cn": "按多数投票预测时的错分率"
        }
      ],
      "usage_en": "Simplest impurity measure — the misclassification rate of the majority-class prediction. Rarely used to grow trees (less sensitive than entropy or Gini) but commonly used to **prune** them.",
      "usage_cn": "最简单的不纯度 —— 多数类预测的错分率。很少用于树生长（敏感度不如熵或 Gini），但常用于**剪枝**。",
      "intuition_en": "'If I predict the majority class for everyone in this node, what's my error rate?' Doesn't change as fast as entropy/Gini when split quality changes, so it under-rewards informative splits during growing.",
      "intuition_cn": "\"如果对节点内所有样本都预测多数类，错误率是多少？\" 切分质量变化时它的变化慢于熵 / Gini，所以生长时对有信息的切分奖励不足。",
      "source": "topics/decision-trees.html#eq-decision-trees-classification-error"
    },
    {
      "title": "Continuous split rule",
      "eq": "$$ f(x)=\\mathbf{1}\\{x_j\\ge\\tau\\} $$",
      "symbols": [
        {
          "sym": "$x_j$",
          "en": "the feature being thresholded",
          "cn": "被设阈值的特征"
        },
        {
          "sym": "$t$",
          "en": "threshold value",
          "cn": "阈值"
        },
        {
          "sym": "$x_j \\le t$ vs. $x_j > t$",
          "en": "binary split based on the threshold",
          "cn": "基于阈值的二元切分"
        }
      ],
      "usage_en": "For continuous features, sort samples by $x_j$ and try every midpoint between consecutive values as a candidate threshold. Pick the $t$ giving the largest $IG$ / Gini decrease — exhaustive but $O(n \\log n)$ per feature.",
      "usage_cn": "对连续特征，按 $x_j$ 排序，把相邻值之间的中点作为候选阈值。选 $IG$ / Gini 下降最大的 $t$ —— 暴力但每个特征 $O(n \\log n)$。",
      "intuition_en": "'Find the best place to draw a vertical line through the feature axis.' Each split halves the data along one axis; together they carve the input space into axis-aligned rectangles, which is why decision boundaries look 'staircase-y'.",
      "intuition_cn": "\"在该特征轴上找最佳的切割点。\" 每次切分把数据沿一个轴一分为二；多次切分把输入空间切成轴对齐的矩形，所以决策边界看起来像 \"楼梯\"。",
      "source": "topics/decision-trees.html#eq-decision-trees-continuous-split-rule"
    }
  ],
  "bagging": [
    {
      "title": "Bootstrap sample",
      "eq": "$$ D_t=\\{(x_{i_s},y_{i_s})\\}_{s=1}^{n},\\qquad i_s\\sim\\text{Uniform}\\{1,\\dots,n\\} $$",
      "symbols": [
        {
          "sym": "$D$",
          "en": "original training set of size $n$",
          "cn": "原始训练集，大小 $n$"
        },
        {
          "sym": "$D^*$",
          "en": "bootstrap sample — drawn with replacement, also size $n$",
          "cn": "bootstrap 样本 —— 有放回抽取，大小同样为 $n$"
        },
        {
          "sym": "$1 - 1/e \\approx 63.2\\%$",
          "en": "expected fraction of original samples included in $D^*$ (rest are out-of-bag)",
          "cn": "$D^*$ 中预期包含的原样本比例（其余为 out-of-bag）"
        }
      ],
      "usage_en": "Sampling step at the heart of bagging. Each tree gets its own bootstrap sample; OOB samples (~37%) can be used as a free validation set without holding data out.",
      "usage_cn": "Bagging 的核心采样步骤。每棵树拿到自己的 bootstrap 样本；OOB 样本（~37%）可以作为免费的验证集，不必再划分。",
      "intuition_en": "'Resample with replacement to get $T$ slightly different training sets.' Some samples are used multiple times in one bootstrap, others not at all — the variation between bootstraps is what decorrelates the trees.",
      "intuition_cn": "\"有放回重采样得到 $T$ 个略有差异的训练集。\" 一次 bootstrap 中有的样本被多次使用，有的根本没被选中 —— bootstrap 之间的差异让树之间去相关。",
      "source": "topics/bagging.html#eq-bagging-bootstrap-sample"
    },
    {
      "title": "Majority vote",
      "eq": "$$ F(x)=\\operatorname{sign}\\!\\left(\\sum_{t=1}^{T} f_t(x)\\right) $$",
      "symbols": [
        {
          "sym": "$\\hat{y}(x)$",
          "en": "ensemble prediction for input $x$",
          "cn": "集成对输入 $x$ 的预测"
        },
        {
          "sym": "$h_t(x)$",
          "en": "prediction of the $t$-th base classifier",
          "cn": "第 $t$ 个基分类器的预测"
        },
        {
          "sym": "$T$",
          "en": "total number of bagged classifiers",
          "cn": "bagging 的基分类器数量"
        },
        {
          "sym": "$\\mathrm{mode}$",
          "en": "most-frequent prediction across the ensemble",
          "cn": "集成中出现最多的预测"
        }
      ],
      "usage_en": "Use majority vote for classification, mean for regression. More base learners → smoother predictions and lower variance, but diminishing returns past ~100 trees.",
      "usage_cn": "分类用多数投票，回归用平均。基学习器数越多 → 预测越平滑、方差越低，但超过 ~100 棵树后收益递减。",
      "intuition_en": "'Each tree gets one vote; the ensemble follows the majority.' Even if individual trees are unstable (high variance), the vote averages them out — that's the magic of bagging.",
      "intuition_cn": "\"每棵树一票，集成跟随多数。\" 即使单棵树不稳定（方差大），投票也能把它们平均掉 —— 这就是 bagging 的魔法。",
      "source": "topics/bagging.html#eq-bagging-majority-vote"
    },
    {
      "title": "Variance of an average",
      "eq": "$$ \\operatorname{Var}\\!\\left(\\frac1T\\sum_t f_t\\right)\\approx \\frac{\\sigma^2}{T} $$",
      "symbols": [
        {
          "sym": "$\\mathrm{Var}(\\bar{Z})$",
          "en": "variance of the mean of $T$ random predictions",
          "cn": "$T$ 个随机预测均值的方差"
        },
        {
          "sym": "$\\sigma^2$",
          "en": "variance of one base learner's prediction",
          "cn": "单个基学习器预测的方差"
        },
        {
          "sym": "$T$",
          "en": "number of base learners (bags)",
          "cn": "基学习器数量"
        },
        {
          "sym": "$\\rho$",
          "en": "**pairwise correlation** between two base learners' predictions",
          "cn": "两个基学习器预测之间的**成对相关系数**"
        }
      ],
      "usage_en": "Use to understand why bagging helps and where it stops helping. As $T \\to \\infty$, variance bottoms out at $\\rho \\sigma^2$ (the correlation floor). Random forests reduce $\\rho$ further by random feature subsetting at each split.",
      "usage_cn": "用来理解 bagging 为什么有效以及何时失效。$T \\to \\infty$ 时方差收敛到 $\\rho \\sigma^2$（相关性下界）。Random Forest 在每次切分时随机选特征，进一步降低 $\\rho$。",
      "intuition_en": "'Independent averaging beats variance, but correlated averaging only goes so far.' If trees were perfectly uncorrelated ($\\rho = 0$) variance would shrink to $\\sigma^2 / T$; in practice trees agree on a lot, so the floor is higher.",
      "intuition_cn": "\"独立平均能压低方差，但相关平均压不到底。\" 如果树完全独立（$\\rho = 0$）方差会降到 $\\sigma^2 / T$；实际中树之间常常意见一致，所以下限更高。",
      "source": "topics/bagging.html#eq-bagging-variance-of-an-average"
    },
    {
      "title": "Random forest split idea",
      "eq": "$$ \\text{consider about }\\sqrt d\\text{ features per split} $$",
      "symbols": [
        {
          "sym": "$m$",
          "en": "number of features randomly sampled at each split candidate",
          "cn": "每次候选切分时随机采样的特征数"
        },
        {
          "sym": "$d$",
          "en": "total feature count (full pool)",
          "cn": "总特征数（完整池）"
        },
        {
          "sym": "typical: $m = \\sqrt{d}$",
          "en": "rule of thumb for classification ($m = d/3$ for regression)",
          "cn": "分类的经验值（回归常用 $m = d/3$）"
        }
      ],
      "usage_en": "At each split, restrict the search to a random subset of $m < d$ features. This forces different trees to use different features → reduces $\\rho$ → lower ensemble variance than plain bagging on the same data.",
      "usage_cn": "每次切分把搜索限制在 $m < d$ 的随机特征子集内。这迫使不同树使用不同特征 → 降低 $\\rho$ → 集成方差比同等 bagging 更低。",
      "intuition_en": "'Don't let any one strong feature dominate every tree.' Without this, all trees would split on the most informative feature first and end up nearly identical; random subsetting forces diversity.",
      "intuition_cn": "\"不让某个强特征主导每棵树。\" 没有这一步，所有树都会先用信息量最大的特征切分，结果几乎相同；随机采样强制多样性。",
      "source": "topics/bagging.html#eq-bagging-random-forest-split-idea"
    }
  ],
  "boosting": [
    {
      "title": "Additive ensemble",
      "eq": "$$ F_t(x)=F_{t-1}(x)+\\alpha_t f_t(x) $$",
      "symbols": [
        {
          "sym": "$F(x)$",
          "en": "final ensemble prediction (real-valued; sign for class)",
          "cn": "最终集成预测（实值；取符号得类别）"
        },
        {
          "sym": "$h_t(x) \\in \\{-1, +1\\}$",
          "en": "$t$-th weak classifier's prediction",
          "cn": "第 $t$ 个弱分类器的预测"
        },
        {
          "sym": "$\\alpha_t$",
          "en": "weight (importance) of the $t$-th weak learner",
          "cn": "第 $t$ 个弱学习器的权重（重要性）"
        },
        {
          "sym": "$T$",
          "en": "total boosting rounds",
          "cn": "boosting 总轮数"
        },
        {
          "sym": "$\\mathrm{sign}(F(x))$",
          "en": "thresholded prediction for binary classification",
          "cn": "二分类时取符号得到预测"
        }
      ],
      "usage_en": "Build the ensemble greedily: at each round add a new weak learner with the right $\\alpha_t$ to most reduce the loss. Used in AdaBoost (exponential loss) and gradient boosting (any differentiable loss).",
      "usage_cn": "贪心地构建集成：每一轮加一个新的弱学习器并选最佳 $\\alpha_t$ 以最大限度降低 loss。用于 AdaBoost（指数 loss）和 gradient boosting（任意可导 loss）。",
      "intuition_en": "'Weighted vote — but the weight depends on each learner's track record, and learners are added one at a time.' Different from bagging in two ways: sequential not parallel, weighted not equal.",
      "intuition_cn": "\"加权投票 —— 但权重依赖于每个学习器的表现，学习器是一个个串行加入的。\" 与 bagging 的两点区别：串行 vs 并行，加权 vs 等权。",
      "source": "topics/boosting.html#eq-boosting-additive-ensemble"
    },
    {
      "title": "Exponential loss",
      "eq": "$$ L(F)=\\frac1m\\sum_{i=1}^m \\exp(-y_iF(x_i)) $$",
      "symbols": [
        {
          "sym": "$L(F)$",
          "en": "exponential loss of the ensemble $F$",
          "cn": "集成 $F$ 的指数 loss"
        },
        {
          "sym": "$y_i F(x_i)$",
          "en": "signed margin of sample $i$",
          "cn": "样本 $i$ 的有符号 margin"
        },
        {
          "sym": "$e^{-y_i F(x_i)}$",
          "en": "huge penalty when the margin is very negative",
          "cn": "margin 非常负时惩罚极大"
        }
      ],
      "usage_en": "AdaBoost is exactly forward stagewise minimization of $L(F)$ — adding a weak learner at each step that most decreases the exponential loss. Choice of loss → choice of boosting algorithm (logistic loss → LogitBoost; squared loss → L2Boost).",
      "usage_cn": "AdaBoost 本质就是对 $L(F)$ 做 forward stagewise 最小化 —— 每步加入最能降低指数 loss 的弱学习器。loss 选择 → 算法选择（logistic loss → LogitBoost；平方 loss → L2Boost）。",
      "intuition_en": "'Penalize wrong predictions exponentially.' Confidently wrong examples ($y_i F(x_i) \\ll 0$) blow up the loss, forcing the next round to focus there. That's why AdaBoost is so sensitive to label noise.",
      "intuition_cn": "\"指数地惩罚错误预测。\" 自信但错（$y_i F(x_i) \\ll 0$）的样本让 loss 爆炸，迫使下一轮聚焦于此。所以 AdaBoost 对标签噪声非常敏感。",
      "source": "topics/boosting.html#eq-boosting-exponential-loss"
    },
    {
      "title": "Example weights",
      "eq": "$$ w_i=\\exp(-y_iF_{t-1}(x_i)) $$",
      "symbols": [
        {
          "sym": "$D_{t+1}(i)$",
          "en": "weight of sample $i$ in round $t+1$",
          "cn": "第 $t+1$ 轮中样本 $i$ 的权重"
        },
        {
          "sym": "$D_t(i)$",
          "en": "weight in the previous round",
          "cn": "上一轮的权重"
        },
        {
          "sym": "$y_i h_t(x_i) \\in \\{-1, +1\\}$",
          "en": "+1 if classified correctly by $h_t$, -1 if wrong",
          "cn": "$h_t$ 预测对为 +1，错为 -1"
        },
        {
          "sym": "$Z_t$",
          "en": "normalization constant so weights sum to 1",
          "cn": "归一化常数，让权重和为 1"
        },
        {
          "sym": "$\\alpha_t$",
          "en": "round-$t$ classifier weight (computed from $h_t$'s error rate)",
          "cn": "第 $t$ 轮分类器权重（由 $h_t$ 错误率算出）"
        }
      ],
      "usage_en": "Update step in AdaBoost: increase weight on samples $h_t$ got wrong, decrease on the right ones. Next round's weak learner is trained against this re-weighted distribution and forced to focus on the hard cases.",
      "usage_cn": "AdaBoost 的更新：被 $h_t$ 错分的样本权重增大，正确的减小。下一轮的弱学习器在这个重赋权分布上训练，被迫聚焦在难样本。",
      "intuition_en": "'Show the next weak learner more of the examples that gave the previous one trouble.' By round $T$, the easy examples are nearly weight-zero and only the hard frontier matters.",
      "intuition_cn": "\"把上一个学习器搞错的样本，多展示给下一个学习器看。\" 到第 $T$ 轮时，简单样本权重几乎为 0，只有困难前沿的样本重要。",
      "source": "topics/boosting.html#eq-boosting-example-weights"
    },
    {
      "title": "Classifier coefficient",
      "eq": "$$ \\alpha_t^*=\\frac12\\log\\frac{1-\\epsilon_t}{\\epsilon_t} $$",
      "symbols": [
        {
          "sym": "$\\alpha_t$",
          "en": "weight of the $t$-th weak learner in the final ensemble",
          "cn": "第 $t$ 个弱学习器在最终集成中的权重"
        },
        {
          "sym": "$\\epsilon_t \\in (0, 0.5)$",
          "en": "weighted error rate of $h_t$ on the round-$t$ distribution",
          "cn": "$h_t$ 在第 $t$ 轮分布下的加权错误率"
        },
        {
          "sym": "$\\frac{1-\\epsilon_t}{\\epsilon_t}$",
          "en": "odds ratio of correct to incorrect predictions",
          "cn": "正确 vs 错误预测的几率比"
        },
        {
          "sym": "$\\frac{1}{2}\\log$",
          "en": "half-log of the odds — derived from minimizing exponential loss",
          "cn": "几率的半对数 —— 由最小化指数 loss 导出"
        }
      ],
      "usage_en": "Computed in closed form once $h_t$'s error $\\epsilon_t$ is measured. Lower $\\epsilon_t$ → larger $\\alpha_t$ → more vote in the final ensemble. If $\\epsilon_t \\ge 0.5$, the weak learner is worse than random — stop or flip its predictions.",
      "usage_cn": "测出 $h_t$ 的错误率 $\\epsilon_t$ 后用闭式解算出。$\\epsilon_t$ 越小 → $\\alpha_t$ 越大 → 在最终集成中票更重。$\\epsilon_t \\ge 0.5$ 时弱学习器比随机还差 —— 应停止或翻转其预测。",
      "intuition_en": "'Better-than-random learners get amplified; near-random ones get muted.' At $\\epsilon = 0.5$, $\\alpha = 0$ (no influence); at $\\epsilon = 0$, $\\alpha = \\infty$ (one learner can't be perfect, so this never happens in practice).",
      "intuition_cn": "\"比随机好的学习器被放大，接近随机的被压低。\" $\\epsilon = 0.5$ 时 $\\alpha = 0$（无影响）；$\\epsilon = 0$ 时 $\\alpha = \\infty$（实际不会发生，单个学习器不可能完美）。",
      "source": "topics/boosting.html#eq-boosting-classifier-coefficient"
    }
  ],
  "pca": [
    {
      "title": "Centering",
      "eq": "$$ \\mu=\\frac1N\\sum_i x^{(i)},\\qquad \\bar x^{(i)}=x^{(i)}-\\mu $$",
      "symbols": [
        {
          "sym": "$X$",
          "en": "centered data matrix (rows are samples)",
          "cn": "中心化后的数据矩阵（行是样本）"
        },
        {
          "sym": "$X_{\\text{raw}}$",
          "en": "raw data before centering",
          "cn": "中心化前的原始数据"
        },
        {
          "sym": "$\\bar{x}$",
          "en": "feature-wise mean (a $d$-vector)",
          "cn": "按特征求均值（$d$ 维向量）"
        },
        {
          "sym": "$\\mathbf{1}$",
          "en": "all-ones column vector for broadcasting the mean over rows",
          "cn": "全 1 列向量，把均值按行广播"
        }
      ],
      "usage_en": "Always do this first. Without centering, the first principal component would just point at the data's centroid rather than the direction of maximum variance. Don't standardize unless features have wildly different units.",
      "usage_cn": "PCA 必须先做这一步。不中心化的话，第一主成分会指向数据的质心而不是最大方差方向。除非特征单位差别极大，否则不要做 standardize。",
      "intuition_en": "'Move the data so the origin is at the center of mass.' This makes the covariance computation reflect actual spread rather than offset.",
      "intuition_cn": "\"把数据平移到质心位于原点。\" 这样协方差才能反映真实的离散程度，而不是偏移量。",
      "source": "topics/pca.html#eq-pca-centering"
    },
    {
      "title": "Empirical covariance",
      "eq": "$$ \\Sigma=\\frac1N\\bar X\\bar X^\\top=\\frac1N\\sum_i\\bar x^{(i)}\\bar x^{(i)\\top} $$",
      "symbols": [
        {
          "sym": "$\\Sigma$",
          "en": "empirical covariance matrix ($d \\times d$, symmetric, PSD)",
          "cn": "经验协方差矩阵（$d \\times d$，对称，PSD）"
        },
        {
          "sym": "$X$",
          "en": "centered data matrix ($n$ samples × $d$ features)",
          "cn": "中心化后的数据矩阵（$n$ 个样本 × $d$ 个特征）"
        },
        {
          "sym": "$\\frac{1}{n-1}$",
          "en": "Bessel-corrected denominator (use $1/n$ for biased MLE estimate)",
          "cn": "Bessel 修正分母（无修正用 $1/n$，是 MLE）"
        }
      ],
      "usage_en": "Compute once after centering. Off-diagonal entries are pairwise covariances; diagonal entries are per-feature variances. PCA then finds eigenvectors of $\\Sigma$, ordered by eigenvalue.",
      "usage_cn": "中心化后只算一次。非对角线元素是成对协方差；对角线元素是各特征的方差。PCA 接下来求 $\\Sigma$ 的特征向量，按特征值排序。",
      "intuition_en": "Captures how features co-vary. A large positive entry $\\Sigma_{ij}$ means features $i$ and $j$ tend to grow together; PCA looks for combinations that capture the most of this joint variation.",
      "intuition_cn": "刻画特征间的协变关系。$\\Sigma_{ij}$ 大的正值意味着特征 $i, j$ 倾向同时增大；PCA 找的是能 capture 最多这种联合变化的方向组合。",
      "source": "topics/pca.html#eq-pca-empirical-covariance"
    },
    {
      "title": "First principal component",
      "eq": "$$ w_1=\\arg\\max_{\\|w\\|_2=1} w^\\top\\Sigma w $$",
      "symbols": [
        {
          "sym": "$u_1$",
          "en": "first principal component (a unit $d$-vector)",
          "cn": "第一主成分（单位 $d$ 维向量）"
        },
        {
          "sym": "$\\Sigma$",
          "en": "empirical covariance matrix",
          "cn": "经验协方差矩阵"
        },
        {
          "sym": "$\\lambda_1$",
          "en": "largest eigenvalue of $\\Sigma$ — variance along $u_1$",
          "cn": "$\\Sigma$ 的最大特征值 —— $u_1$ 方向的方差"
        },
        {
          "sym": "$\\arg\\max_{\\|u\\|=1}$",
          "en": "constrained maximization over unit vectors",
          "cn": "在单位向量上做约束最大化"
        }
      ],
      "usage_en": "Computed via eigendecomposition of $\\Sigma$ or SVD of $X$. The $k$-th principal component is the eigenvector with the $k$-th largest eigenvalue. Use top-$k$ to project to a $k$-dimensional subspace that retains the most variance.",
      "usage_cn": "通过 $\\Sigma$ 的特征分解或 $X$ 的 SVD 得到。第 $k$ 个主成分是第 $k$ 大特征值对应的特征向量。取前 $k$ 个投影到 $k$ 维子空间，保留最多方差。",
      "intuition_en": "'Find the direction along which the data varies the most.' All other components are orthogonal to it and capture progressively less variance — the eigenvalues are exactly the variance along each component.",
      "intuition_cn": "\"找数据变化最大的方向。\" 其他主成分都正交于它且方差依次递减 —— 特征值正是每个主成分上的方差。",
      "source": "topics/pca.html#eq-pca-first-principal-component"
    },
    {
      "title": "Projection and reconstruction",
      "eq": "$$ \\hat x=U^\\top(x-\\mu),\\qquad \\tilde x=U\\hat x+\\mu $$",
      "symbols": [
        {
          "sym": "$z = U_k^\\top x$",
          "en": "$k$-D coordinates of $x$ in the principal-component basis",
          "cn": "$x$ 在主成分基下的 $k$ 维坐标"
        },
        {
          "sym": "$U_k$",
          "en": "matrix whose columns are the top-$k$ principal components",
          "cn": "列为前 $k$ 个主成分的矩阵"
        },
        {
          "sym": "$\\hat{x} = U_k z$",
          "en": "reconstruction of $x$ in the original $d$-D space",
          "cn": "$x$ 在原 $d$ 维空间的重构"
        },
        {
          "sym": "$\\|x - \\hat{x}\\|^2$",
          "en": "reconstruction error — minimized by PCA among all rank-$k$ projections",
          "cn": "重构误差 —— 在所有秩 $k$ 投影中由 PCA 最小化"
        }
      ],
      "usage_en": "Use to compress data to $k$ dimensions (e.g. for visualization, denoising, or as input to a downstream model). Don't forget to add the mean back when reconstructing the original-scale signal.",
      "usage_cn": "用于把数据压缩到 $k$ 维（可视化、去噪，或作为下游模型输入）。重构原尺度信号时别忘了把均值加回去。",
      "intuition_en": "'Throw away the low-variance directions, keep only the principal ones.' The reconstruction error equals the sum of the discarded eigenvalues — quantifies how much information you lost.",
      "intuition_cn": "\"扔掉方差小的方向，只保留主要的。\" 重构误差等于被扔掉的特征值之和 —— 量化丢失的信息量。",
      "source": "topics/pca.html#eq-pca-projection-and-reconstruction"
    },
    {
      "title": "SVD route",
      "eq": "$$ \\frac1{\\sqrt N}\\bar X=USV^\\top,\\qquad \\Sigma=US^2U^\\top $$",
      "symbols": [
        {
          "sym": "$X = U\\Sigma V^\\top$",
          "en": "SVD of the centered data matrix",
          "cn": "中心化数据矩阵的 SVD"
        },
        {
          "sym": "$V$",
          "en": "right singular vectors — columns are the principal components",
          "cn": "右奇异向量 —— 列就是主成分"
        },
        {
          "sym": "$\\Sigma$",
          "en": "diagonal of singular values $\\sigma_i$",
          "cn": "奇异值对角阵 $\\sigma_i$"
        },
        {
          "sym": "$\\sigma_i^2 / (n-1)$",
          "en": "variance along the $i$-th principal direction (matches eigenvalue of cov)",
          "cn": "第 $i$ 个主方向上的方差（与协方差特征值匹配）"
        }
      ],
      "usage_en": "Numerically more stable and direct than computing $X^\\top X$ then eigendecomposing. SVD also handles rank-deficient $X$ gracefully. Most PCA libraries (sklearn, numpy) use SVD under the hood.",
      "usage_cn": "数值上比先算 $X^\\top X$ 再特征分解更稳定且直接。SVD 也能优雅处理秩不足的 $X$。大多数 PCA 库（sklearn、numpy）底层都用 SVD。",
      "intuition_en": "Why it works: $X^\\top X = V\\Sigma^2 V^\\top$ — the right singular vectors $V$ are exactly the eigenvectors of the (uncentered) covariance, and squared singular values are eigenvalues. Free PCA from a single decomposition.",
      "intuition_cn": "为什么有效：$X^\\top X = V\\Sigma^2 V^\\top$ —— 右奇异向量 $V$ 正好是协方差的特征向量，奇异值平方就是特征值。一次分解免费得到 PCA。",
      "source": "topics/pca.html#eq-pca-svd-route"
    }
  ],
  "kmeans": [
    {
      "title": "Objective",
      "eq": "$$ J=\\sum_{i=1}^n\\sum_{k=1}^K r_{ik}\\|x^{(i)}-\\mu_k\\|_2^2 $$\n$$ r_{ik}\\in\\{0,1\\},\\qquad \\sum_k r_{ik}=1 $$",
      "symbols": [
        {
          "sym": "$\\mathrm{WCSS}$",
          "en": "within-cluster sum of squares (the loss to minimize)",
          "cn": "簇内平方和（要最小化的 loss）"
        },
        {
          "sym": "$K$",
          "en": "number of clusters (a hyperparameter)",
          "cn": "簇数（超参数）"
        },
        {
          "sym": "$C_k$",
          "en": "set of points assigned to cluster $k$",
          "cn": "分配给簇 $k$ 的点集"
        },
        {
          "sym": "$\\mu_k$",
          "en": "centroid of cluster $k$ (mean of its points)",
          "cn": "簇 $k$ 的质心（其点的均值）"
        }
      ],
      "usage_en": "Use as the optimization target. K-means alternates between updating $\\{\\mu_k\\}$ and updating assignments to monotonically decrease WCSS. Pick $K$ via the elbow method, silhouette score, or domain knowledge.",
      "usage_cn": "作为优化目标。K-means 交替更新 $\\{\\mu_k\\}$ 和分配，单调下降 WCSS。$K$ 用 elbow 法、silhouette score 或领域知识选。",
      "intuition_en": "'Sum of squared distances from each point to its cluster's center.' Smaller WCSS = tighter clusters. Adding more $K$ always reduces WCSS (extreme: $K = n$ → WCSS = 0), so 'just minimize WCSS' isn't a clustering criterion alone.",
      "intuition_cn": "\"每个点到所属簇中心的距离平方之和。\" WCSS 越小簇越紧。增大 $K$ 总能降 WCSS（极端：$K = n$ → WCSS = 0），所以仅 \"最小化 WCSS\" 不能作为唯一聚类准则。",
      "source": "topics/kmeans.html#eq-kmeans-objective"
    },
    {
      "title": "Assignment step",
      "eq": "$$ r_{ik}=1\\quad\\text{if}\\quad k=\\arg\\min_j\\|x^{(i)}-\\mu_j\\|_2^2 $$",
      "symbols": [
        {
          "sym": "$z_i$",
          "en": "assignment for sample $i$ — index of its cluster",
          "cn": "样本 $i$ 的分配 —— 它所属簇的下标"
        },
        {
          "sym": "$\\arg\\min_k$",
          "en": "pick the cluster index $k$ minimizing the distance",
          "cn": "选距离最小的簇下标 $k$"
        },
        {
          "sym": "$\\|x_i - \\mu_k\\|^2$",
          "en": "squared Euclidean distance from $x_i$ to centroid $\\mu_k$",
          "cn": "$x_i$ 到质心 $\\mu_k$ 的欧氏距离平方"
        }
      ],
      "usage_en": "Step 1 of each Lloyd iteration: assign each point to its closest centroid (ties broken arbitrarily). Cost is $O(nKd)$ per pass — cheap but dominant when $K$ or $n$ is large.",
      "usage_cn": "Lloyd 迭代每轮第 1 步：把每个点分配给最近的质心（同距任选）。每轮代价 $O(nKd)$ —— 便宜但 $K$ 或 $n$ 大时成主要成本。",
      "intuition_en": "'Each point joins the nearest centroid.' Holding centroids fixed, this assignment minimizes the WCSS contribution of each point — the per-point optimum.",
      "intuition_cn": "\"每个点加入最近的质心所在簇。\" 固定质心时，这个分配让每个点对 WCSS 的贡献最小 —— 即逐点最优。",
      "source": "topics/kmeans.html#eq-kmeans-assignment-step"
    },
    {
      "title": "Update step",
      "eq": "$$ \\mu_k=\\frac{\\sum_i r_{ik}x^{(i)}}{\\sum_i r_{ik}} $$",
      "symbols": [
        {
          "sym": "$\\mu_k$",
          "en": "updated centroid for cluster $k$",
          "cn": "簇 $k$ 更新后的质心"
        },
        {
          "sym": "$|C_k|$",
          "en": "number of points currently assigned to cluster $k$",
          "cn": "当前分配给簇 $k$ 的点数"
        },
        {
          "sym": "$\\sum_{i \\in C_k} x_i$",
          "en": "sum of all assigned points (numerator of the mean)",
          "cn": "所有分配点的求和（均值的分子）"
        }
      ],
      "usage_en": "Step 2 of each Lloyd iteration: recompute each centroid as the mean of its currently assigned points. Reassignment in step 1 then converges WCSS until no point switches clusters.",
      "usage_cn": "Lloyd 迭代每轮第 2 步：把每个质心重算为当前所属点的均值。回到第 1 步重新分配，直到没有点换簇时 WCSS 收敛。",
      "intuition_en": "'Each centroid moves to the center of mass of its current followers.' Holding assignments fixed, this is the per-cluster optimum — the mean minimizes squared distance to a set of points.",
      "intuition_cn": "\"每个质心搬到当前 \"追随者\" 的质心位置。\" 固定分配时这是逐簇最优 —— 均值是平方距离和的最小化点。",
      "source": "topics/kmeans.html#eq-kmeans-update-step"
    },
    {
      "title": "Per-iteration cost",
      "eq": "$$ O(KNd)\\text{ for assignments},\\qquad O(Nd)\\text{ for means} $$",
      "symbols": [
        {
          "sym": "$n$",
          "en": "number of samples",
          "cn": "样本数"
        },
        {
          "sym": "$K$",
          "en": "number of clusters",
          "cn": "簇数"
        },
        {
          "sym": "$d$",
          "en": "feature dimension",
          "cn": "特征维度"
        },
        {
          "sym": "$O(nKd)$",
          "en": "cost of one full Lloyd iteration (assignment + update)",
          "cn": "一次完整 Lloyd 迭代的代价（分配 + 更新）"
        }
      ],
      "usage_en": "Use to estimate runtime: K-means scales linearly in all three of $n, K, d$. For very large $n$ use mini-batch K-means; for very large $K$ use approximate methods (k-d tree, hierarchical clustering).",
      "usage_cn": "用来估计运行时间：K-means 在 $n, K, d$ 三个量上都是线性。$n$ 极大用 mini-batch K-means；$K$ 极大用近似方法（k-d tree、层次聚类）。",
      "intuition_en": "'Cheap per iteration, expensive in number of iterations.' Convergence is usually fast (10s of iterations) but can vary; multiple random initializations are standard practice (kmeans++ to pick smarter seeds).",
      "intuition_cn": "\"每轮便宜，但轮数可能多。\" 收敛通常很快（几十轮）但有波动；多次随机初始化是常规做法（用 kmeans++ 选更聪明的种子）。",
      "source": "topics/kmeans.html#eq-kmeans-per-iteration-cost"
    }
  ],
  "mlp": [
    {
      "title": "Layer forward pass",
      "eq": "$$ a^{(0)}=x,\\qquad z^{(\\ell)}=W^{(\\ell)}a^{(\\ell-1)}+b^{(\\ell)},\\qquad a^{(\\ell)}=\\sigma(z^{(\\ell)}) $$",
      "source": "topics/mlp.html#eq-mlp-forward-pass-layer-by-layer",
      "symbols": [
        { "sym": "$x$", "en": "one input example", "cn": "一个 input example" },
        { "sym": "$a^{(0)}$", "en": "layer-0 activation, equal to the raw input $x$", "cn": "第 0 层 activation，也就是原始输入 $x$" },
        { "sym": "$\\ell$", "en": "layer index", "cn": "layer index，第几层" },
        { "sym": "$W^{(\\ell)}$", "en": "weight matrix of layer $\\ell$; shape $n_\\ell\\times n_{\\ell-1}$", "cn": "第 $\\ell$ 层 weight matrix；shape 是 $n_\\ell\\times n_{\\ell-1}$" },
        { "sym": "$b^{(\\ell)}$", "en": "bias vector of layer $\\ell$; shape $n_\\ell$", "cn": "第 $\\ell$ 层 bias vector；shape 是 $n_\\ell$" },
        { "sym": "$z^{(\\ell)}$", "en": "pre-activation raw score before the nonlinearity", "cn": "pre-activation，过 nonlinearity 前的 raw score" },
        { "sym": "$a^{(\\ell)}$", "en": "post-activation output passed to the next layer", "cn": "post-activation，传给下一层的 representation" },
        { "sym": "$\\sigma$", "en": "activation function, applied elementwise", "cn": "activation function，elementwise 套到每个坐标" }
      ],
      "usage_en": "Start with $a^{(0)}=x$. For each layer, multiply by $W^{(\\ell)}$, add $b^{(\\ell)}$, then apply $\\sigma$. In homework calculations, write the vector dimensions first so matrix multiplication errors show up immediately.",
      "usage_cn": "从 $a^{(0)}=x$ 开始。每层先乘 $W^{(\\ell)}$，再加 $b^{(\\ell)}$，最后套 activation $\\sigma$。手算题先写每个 vector / matrix 的 dimension，shape 错误会立刻暴露。",
      "intuition_en": "An MLP alternates linear mixing and nonlinear bending. The linear part combines previous features; the activation prevents stacked layers from collapsing into one big linear map.",
      "intuition_cn": "MLP 就是在 linear mixing 和 nonlinear bending 之间交替。Linear part 负责组合上一层 features；activation 负责把空间折弯，避免多层网络退化成一个大 linear map。"
    },
    {
      "title": "ReLU activation",
      "eq": "$$ \\operatorname{ReLU}(z)=\\max(0,z) $$",
      "source": "topics/mlp.html#eq-mlp-relu-activation",
      "symbols": [
        { "sym": "$z$", "en": "pre-activation value; can be a scalar, vector, or matrix", "cn": "pre-activation value；可以是 scalar、vector 或 matrix" },
        { "sym": "$\\max(0,z)$", "en": "elementwise choice between zero and the input value", "cn": "elementwise 地在 $0$ 和原值之间取较大者" }
      ],
      "usage_en": "Apply ReLU to every entry: negative values become $0$, positive values remain unchanged. In backprop, the derivative is $0$ on inactive negative entries and $1$ on active positive entries.",
      "usage_cn": "对每个 entry 单独套 ReLU：负数变 $0$，正数原样保留。做 backprop 时，负数位置 derivative 是 $0$，正数位置 derivative 是 $1$。",
      "intuition_en": "ReLU is a simple gate. A hidden unit either fires with its positive score or stays silent at zero.",
      "intuition_cn": "ReLU 像一个简单开关：hidden unit 的 score 为正就激活，为负就静默成 $0$。"
    },
    {
      "title": "Softmax output",
      "eq": "$$ \\hat y_i=\\frac{e^{z_i}}{\\sum_{j=1}^{K} e^{z_j}} $$",
      "source": "topics/mlp.html#eq-mlp-softmax-output",
      "symbols": [
        { "sym": "$K$", "en": "number of classes", "cn": "classes 的数量" },
        { "sym": "$z_i$", "en": "logit score for class $i$", "cn": "第 $i$ 类的 logit score" },
        { "sym": "$\\hat y_i$", "en": "predicted probability of class $i$", "cn": "模型预测属于第 $i$ 类的 probability" },
        { "sym": "$\\sum_{j=1}^{K}$", "en": "normalization across all classes", "cn": "对所有 classes 做 normalization" }
      ],
      "usage_en": "Exponentiate every logit, divide each exponential by the total sum, and pick the class with largest $\\hat y_i$ for prediction. For numerical stability in code, subtract $\\max_j z_j$ before exponentiating.",
      "usage_cn": "先对每个 logit 取指数，再除以所有指数之和；prediction 通常取最大的 $\\hat y_i$。代码里为了 numerical stability，常先减去 $\\max_j z_j$ 再 exp。",
      "intuition_en": "Softmax turns arbitrary class scores into a probability distribution. Larger logits get exponentially more probability mass.",
      "intuition_cn": "Softmax 把任意 class scores 变成 probability distribution。logit 越大，拿到的 probability mass 会指数级更大。"
    },
    {
      "title": "Cross-entropy loss",
      "eq": "$$ \\ell(y,\\hat y)=-\\sum_{i=1}^{K} y_i\\log \\hat y_i $$",
      "source": "topics/mlp.html#eq-mlp-cross-entropy-loss",
      "symbols": [
        { "sym": "$y_i$", "en": "true label indicator for class $i$, often one-hot", "cn": "第 $i$ 类的 true label indicator，通常是 one-hot" },
        { "sym": "$\\hat y_i$", "en": "predicted probability for class $i$", "cn": "第 $i$ 类的 predicted probability" },
        { "sym": "$\\ell$", "en": "loss for one example", "cn": "单个 example 的 loss" }
      ],
      "usage_en": "For a one-hot label with true class $c$, all terms vanish except $i=c$, so $\\ell=-\\log\\hat y_c$. Use it with softmax for multiclass classification.",
      "usage_cn": "如果 label 是 one-hot，真实类别为 $c$，只有 $i=c$ 那一项留下，所以 $\\ell=-\\log\\hat y_c$。Multiclass classification 通常 softmax + cross-entropy 一起用。",
      "intuition_en": "The loss is small only when the model assigns high probability to the correct class. Confidently wrong predictions get punished strongly.",
      "intuition_cn": "只有模型给正确类别很高 probability 时，loss 才小。自信但错误的 prediction 会被重罚。"
    },
    {
      "title": "Mini-batch gradient descent",
      "eq": "$$ \\theta\\leftarrow \\theta-\\alpha\\frac{1}{\\lvert B\\rvert}\\sum_{i\\in B}\\nabla_{\\theta}\\ell_i(\\theta) $$",
      "source": "topics/mlp.html#eq-mlp-mini-batch-gradient-descent",
      "symbols": [
        { "sym": "$\\theta$", "en": "all trainable parameters, including every $W$ and $b$", "cn": "所有 trainable parameters，包括每层的 $W$ 和 $b$" },
        { "sym": "$\\alpha$", "en": "learning rate / step size", "cn": "learning rate / step size" },
        { "sym": "$B$", "en": "mini-batch of training examples", "cn": "一个 mini-batch 的 training examples" },
        { "sym": "$\\lvert B\\rvert$", "en": "batch size", "cn": "batch size" },
        { "sym": "$\\nabla_{\\theta}\\ell_i(\\theta)$", "en": "gradient of example $i$'s loss with respect to the parameters", "cn": "第 $i$ 个 example 的 loss 对参数的 gradient" }
      ],
      "usage_en": "Compute gradients for each example in the batch, average them, scale by $\\alpha$, and subtract from the parameters. This is the standard training update after backprop.",
      "usage_cn": "先算 batch 内每个样本的 gradient，取平均，乘 learning rate $\\alpha$，再从参数中减掉。这就是 backprop 后最常见的 training update。",
      "intuition_en": "The batch gradient estimates the full-data direction without scanning the entire dataset every step.",
      "intuition_cn": "Mini-batch gradient 用一小批样本近似 full-data gradient，避免每一步都扫完整 dataset。"
    }
  ],
  "backpropagation": [
    {
      "title": "Gradient notation",
      "eq": "$$ \\bar{v}\\equiv \\frac{\\partial L}{\\partial v} $$",
      "source": "topics/backpropagation.html#eq-backpropagation-gradient-notation",
      "symbols": [
        { "sym": "$L$", "en": "scalar loss at the end of the computation graph", "cn": "computation graph 最后的 scalar loss" },
        { "sym": "$v$", "en": "any intermediate value or parameter", "cn": "任意 intermediate value 或 parameter" },
        { "sym": "$\\bar v$", "en": "gradient of the loss with respect to $v$", "cn": "loss 对 $v$ 的 gradient" }
      ],
      "usage_en": "Run the forward pass first. In the backward pass, initialize $\\bar L=1$ and propagate gradients to earlier nodes.",
      "usage_cn": "先做 forward pass。Backward 时从 $\\bar L=1$ 开始，把 gradient 一层层往前传。",
      "intuition_en": "The bar notation measures blame: how strongly changing this value would change the final loss.",
      "intuition_cn": "bar notation 可以理解成 blame：这个值稍微改变，会让最终 loss 改变多少。"
    },
    {
      "title": "Chain rule on one edge",
      "eq": "$$ \\bar{x}=\\frac{\\partial L}{\\partial x}=\\frac{\\partial L}{\\partial y}\\frac{\\partial y}{\\partial x}=\\bar{y}\\frac{\\partial y}{\\partial x} $$",
      "source": "topics/backpropagation.html#eq-backpropagation-chain-rule-on-one-edge",
      "symbols": [
        { "sym": "$\\bar y$", "en": "upstream gradient arriving from later nodes", "cn": "从后面节点传回来的 upstream gradient" },
        { "sym": "$\\partial y/\\partial x$", "en": "local derivative of the current operation", "cn": "当前这个 operation 的 local derivative" },
        { "sym": "$\\bar x$", "en": "gradient to pass to the previous value", "cn": "继续往前传给 $x$ 的 gradient" }
      ],
      "usage_en": "At each node, multiply the upstream gradient by the local derivative. Repeat this node by node from the loss back to the inputs and parameters.",
      "usage_cn": "每到一个节点，就做 upstream gradient × local derivative。沿着 graph 从 loss 往 input / parameters 一步步倒推。",
      "intuition_en": "Backprop is just the chain rule organized so every reused partial derivative is computed once.",
      "intuition_cn": "Backprop 本质就是 chain rule，只是把重复的 partial derivative 组织起来复用。"
    },
    {
      "title": "Gradient accumulation",
      "eq": "$$ \\bar{x}=\\sum_{j:\\,x\\to y_j}\\bar{y}_j\\frac{\\partial y_j}{\\partial x} $$",
      "source": "topics/backpropagation.html#eq-backpropagation-gradient-accumulation",
      "symbols": [
        { "sym": "$x\\to y_j$", "en": "$x$ feeds into several downstream values $y_j$", "cn": "$x$ 同时喂给多个 downstream values $y_j$" },
        { "sym": "$\\bar y_j$", "en": "gradient contribution arriving from path $j$", "cn": "第 $j$ 条路径传回来的 gradient contribution" },
        { "sym": "$\\sum_j$", "en": "add contributions from all branches", "cn": "把所有 branch 的 contribution 相加" }
      ],
      "usage_en": "When a variable branches, add all returned gradients into the same accumulator. In code this is why repeated use of a tensor accumulates into one .grad field.",
      "usage_cn": "变量分叉时，把所有回来的 gradient 都加到同一个 accumulator。代码里的同一个 tensor 被重复使用时，也会累加到同一个 .grad。",
      "intuition_en": "If one value affects the loss through multiple routes, total blame is the sum of blame from every route.",
      "intuition_cn": "一个值如果通过多条路径影响 loss，总责任就是每条路径责任的总和。"
    },
    {
      "title": "Affine layer backward pass",
      "eq": "$$ z=Wa+b,\\qquad g_z=\\frac{\\partial L}{\\partial z} $$\n$$ \\frac{\\partial L}{\\partial W}=g_z a^\\top,\\qquad \\frac{\\partial L}{\\partial b}=g_z,\\qquad \\frac{\\partial L}{\\partial a}=W^\\top g_z $$",
      "source": "topics/backpropagation.html#eq-backpropagation-affine-layer-backward-pass",
      "symbols": [
        { "sym": "$a$", "en": "input activation to the layer", "cn": "这一层的 input activation" },
        { "sym": "$W,b$", "en": "weight matrix and bias vector", "cn": "weight matrix 和 bias vector" },
        { "sym": "$z$", "en": "pre-activation output", "cn": "pre-activation output" },
        { "sym": "$g_z$", "en": "upstream gradient at $z$", "cn": "$z$ 处的 upstream gradient" },
        { "sym": "$g_z a^\\top$", "en": "outer product that has the same shape as $W$", "cn": "outer product，shape 和 $W$ 一样" }
      ],
      "usage_en": "Use these formulas for a single example after you know $g_z$. For a mini-batch, compute the same contributions per example and sum or average according to the loss convention.",
      "usage_cn": "已知 $g_z$ 后，单样本直接套这些公式。Mini-batch 时对每个 example 算同样的 contribution，再按 loss 的定义 sum 或 average。",
      "intuition_en": "A weight gradient is upstream error times the input that weight saw. The transpose sends the error signal back to the previous layer.",
      "intuition_cn": "weight gradient = 上游 error × 这个 weight 当时看到的 input。转置 $W^\\top$ 则把 error signal 送回上一层。"
    },
    {
      "title": "ReLU backward pass",
      "eq": "$$ a=\\operatorname{ReLU}(z),\\qquad \\frac{\\partial L}{\\partial z}=\\frac{\\partial L}{\\partial a}\\odot \\mathbf{1}[z>0] $$",
      "source": "topics/backpropagation.html#eq-backpropagation-relu-backward-pass",
      "symbols": [
        { "sym": "$\\odot$", "en": "elementwise multiplication", "cn": "elementwise multiplication" },
        { "sym": "$\\mathbf{1}[z>0]$", "en": "mask that is $1$ where the forward pre-activation was positive and $0$ otherwise", "cn": "mask：forward 时 $z$ 为正处为 $1$，否则为 $0$" },
        { "sym": "$\\partial L/\\partial a$", "en": "upstream gradient after the ReLU", "cn": "ReLU 后面传回来的 upstream gradient" }
      ],
      "usage_en": "Keep the upstream gradient only where ReLU was active in the forward pass. Zero it out where the pre-activation was negative.",
      "usage_cn": "forward 时 ReLU 激活的位置保留 upstream gradient；pre-activation 为负的位置直接清零。",
      "intuition_en": "Inactive ReLU units were clipped to zero, so small changes behind them do not affect the output locally.",
      "intuition_cn": "没激活的 ReLU unit 被截成了 $0$，所以局部上它后面的微小变化不会影响输出。"
    }
  ],
  "cnn": [
    {
      "title": "Spatial output size",
      "eq": "$$ H_{\\text{out}}=\\left\\lfloor\\frac{H+2P_h-F_h}{S_h}\\right\\rfloor+1,\\qquad W_{\\text{out}}=\\left\\lfloor\\frac{W_{\\text{in}}+2P_w-F_w}{S_w}\\right\\rfloor+1 $$",
      "source": "topics/cnn.html#eq-cnn-spatial-output-size",
      "symbols": [
        { "sym": "$H,W_{\\text{in}}$", "en": "input height and input width", "cn": "input height 和 input width" },
        { "sym": "$F_h,F_w$", "en": "filter height and filter width", "cn": "filter height 和 filter width" },
        { "sym": "$P_h,P_w$", "en": "padding on each side; the formula has $2P$ because both ends are padded", "cn": "每边 padding；公式里是 $2P$，因为两边都加 padding" },
        { "sym": "$S_h,S_w$", "en": "stride along height and width", "cn": "height / width 方向的 stride" },
        { "sym": "$\\lfloor\\cdot\\rfloor$", "en": "floor; incomplete final windows are not counted", "cn": "floor；最后放不下完整 window 的部分不算" }
      ],
      "usage_en": "Compute height and width separately, then attach channels. In channel-first notation, the output shape is $C_{\\text{out}}\\times H_{\\text{out}}\\times W_{\\text{out}}$.",
      "usage_cn": "height 和 width 分开算，最后再加 channels。Channel-first 写法下，输出 shape 是 $C_{\\text{out}}\\times H_{\\text{out}}\\times W_{\\text{out}}$。",
      "intuition_en": "The numerator is the padded input size minus the filter size; dividing by stride counts how many moves fit, and the final $+1$ counts the starting position.",
      "intuition_cn": "分子是 padded input size 减去 filter size；除以 stride 是数能移动几次；最后 $+1$ 是把初始位置也算进去。"
    },
    {
      "title": "Convolution parameter count",
      "eq": "$$ \\#\\text{params}=F_hF_wC_{\\text{in}}C_{\\text{out}}+C_{\\text{out}}=(F_hF_wC_{\\text{in}}+1)C_{\\text{out}} $$",
      "source": "topics/cnn.html#eq-cnn-convolution-parameter-count",
      "symbols": [
        { "sym": "$F_hF_w$", "en": "spatial size of one filter", "cn": "一个 filter 的 spatial size" },
        { "sym": "$C_{\\text{in}}$", "en": "number of input channels; each filter spans all of them", "cn": "input channels 数量；每个 filter 会跨过所有 input channels" },
        { "sym": "$C_{\\text{out}}$", "en": "number of filters / output channels", "cn": "filters 数量，也就是 output channels 数量" },
        { "sym": "$+C_{\\text{out}}$", "en": "one bias per output channel, if bias is used", "cn": "如果有 bias，则每个 output channel 一个 bias" }
      ],
      "usage_en": "Multiply filter height, filter width, input channels, and output channels. Add $C_{\\text{out}}$ only when the layer includes bias.",
      "usage_cn": "先乘 filter height、filter width、input channels、output channels；只有题目说有 bias 时才加 $C_{\\text{out}}$。",
      "intuition_en": "CNNs are parameter-efficient because these weights are shared across every spatial location, instead of learning new weights per pixel.",
      "intuition_cn": "CNN 参数少，是因为同一组 weights 在所有 spatial locations 共享，而不是每个 pixel location 都单独学一套。"
    },
    {
      "title": "One output activation",
      "eq": "$$ y_{u,v,k}=b_k+\\sum_{c=1}^{C_{\\text{in}}}\\sum_{i=0}^{F_h-1}\\sum_{j=0}^{F_w-1}W_{i,j,c,k}\\,x_{uS_h+i-P_h,\\;vS_w+j-P_w,\\;c} $$",
      "source": "topics/cnn.html#eq-cnn-one-output-activation",
      "symbols": [
        { "sym": "$u,v$", "en": "output spatial location", "cn": "output 的 spatial location" },
        { "sym": "$k$", "en": "output channel index", "cn": "output channel index" },
        { "sym": "$c$", "en": "input channel index", "cn": "input channel index" },
        { "sym": "$i,j$", "en": "position inside the filter window", "cn": "filter window 内的位置" },
        { "sym": "$W_{i,j,c,k}$", "en": "kernel weight used at offset $(i,j)$, input channel $c$, output channel $k$", "cn": "offset $(i,j)$、input channel $c$、output channel $k$ 对应的 kernel weight" },
        { "sym": "$b_k$", "en": "bias for output channel $k$", "cn": "output channel $k$ 的 bias" }
      ],
      "usage_en": "Choose an output location and channel. Overlay the filter on the corresponding input patch, multiply matching entries, sum across spatial offsets and input channels, then add the bias.",
      "usage_cn": "先选一个 output location 和 channel。把 filter 盖在对应 input patch 上，对应位置相乘，跨 spatial offsets 和 input channels 求和，最后加 bias。",
      "intuition_en": "One CNN activation asks whether a learned local pattern appears at this location. The same pattern detector slides over the whole image.",
      "intuition_cn": "一个 CNN activation 本质是在问：这个 location 有没有某个 learned local pattern？同一个 detector 会在整张图上滑动复用。"
    },
    {
      "title": "Pooling output",
      "eq": "$$ y_{u,v,c}^{\\max}=\\max_{(i,j)\\in\\text{window}(u,v)}x_{i,j,c},\\qquad y_{u,v,c}^{\\text{avg}}=\\frac{1}{F_hF_w}\\sum_{(i,j)\\in\\text{window}(u,v)}x_{i,j,c} $$",
      "source": "topics/cnn.html#eq-cnn-pooling-output",
      "symbols": [
        { "sym": "$\\text{window}(u,v)$", "en": "input patch covered by the pooling window for output location $(u,v)$", "cn": "output 位置 $(u,v)$ 对应的 pooling window 覆盖的 input patch" },
        { "sym": "$\\max$", "en": "take the largest value in the window", "cn": "取 window 里的最大值" },
        { "sym": "$\\frac{1}{F_hF_w}\\sum$", "en": "take the average over the window", "cn": "对 window 内所有值取平均" }
      ],
      "usage_en": "Use the same spatial output-size formula as convolution. Pooling usually has no learned weights, no bias, and preserves the number of channels.",
      "usage_cn": "output size 仍然用 convolution 那套公式。Pooling 通常没有 learned weights、没有 bias，并且 channels 数量不变。",
      "intuition_en": "Pooling summarizes a small neighborhood, either by strongest evidence (max) or average evidence (avg).",
      "intuition_cn": "Pooling 是对小邻域做 summary：max pooling 看最强证据，average pooling 看平均证据。"
    }
  ],
  "rnn": [
    {
      "title": "Generic recurrence",
      "eq": "$$ h^{(t)} = f(h^{(t-1)}, x^{(t)}), \\qquad y^{(t)} = g(h^{(t)}) $$",
      "symbols": [
        {
          "sym": "$h_t$",
          "en": "hidden state at time $t$ (carries memory)",
          "cn": "$t$ 时刻的隐藏状态（承载记忆）"
        },
        {
          "sym": "$h_{t-1}$",
          "en": "previous hidden state (the recurrent input)",
          "cn": "上一时刻隐藏状态（recurrent 输入）"
        },
        {
          "sym": "$x_t$",
          "en": "input at time $t$ (current token / observation)",
          "cn": "$t$ 时刻的输入（当前 token / 观测）"
        },
        {
          "sym": "$f_\\theta$",
          "en": "transition function (any neural net) — same parameters $\\theta$ across time",
          "cn": "转移函数（任意神经网络）—— 各时刻共享参数 $\\theta$"
        }
      ],
      "usage_en": "The skeleton of any recurrent model. Apply $f_\\theta$ at each time step, threading $h_{t-1}$ forward. Choice of $f_\\theta$ defines the architecture: tanh → vanilla RNN, gating → LSTM/GRU, attention → Transformer (no recurrence at all).",
      "usage_cn": "任意 recurrent 模型的骨架。每时刻应用 $f_\\theta$，把 $h_{t-1}$ 串下去。$f_\\theta$ 的选择决定了架构：tanh → 普通 RNN，门控 → LSTM/GRU，attention → Transformer（完全去掉 recurrence）。",
      "intuition_en": "'A function that takes its own previous output as part of its input.' This recurrence is what lets the network remember things across time without storing the full history explicitly.",
      "intuition_cn": "\"把自己上一刻的输出作为当前输入一部分的函数。\" 这种 recurrence 让网络能跨时刻记忆，而不必显式保存全部历史。",
      "source": "topics/rnn.html#eq-rnn-generic-recurrence"
    },
    {
      "title": "Elman RNN form from Lecture 14",
      "eq": "$$ h^{(t)}=\\sigma_h(W_{hx}x^{(t)}+W_{hh}h^{(t-1)}+b_h) $$\n$$ y^{(t)}=\\sigma_y(W_{yh}h^{(t)}+b_y) $$",
      "symbols": [
        {
          "sym": "$h_t$",
          "en": "hidden state — typically a $H$-dim vector",
          "cn": "隐藏状态 —— 通常是 $H$ 维向量"
        },
        {
          "sym": "$W_h$",
          "en": "hidden-to-hidden weight matrix ($H \\times H$)",
          "cn": "隐藏到隐藏的权重矩阵（$H \\times H$）"
        },
        {
          "sym": "$W_x$",
          "en": "input-to-hidden weight matrix ($H \\times d$)",
          "cn": "输入到隐藏的权重矩阵（$H \\times d$）"
        },
        {
          "sym": "$b$",
          "en": "bias vector ($H$-dim)",
          "cn": "偏置向量（$H$ 维）"
        },
        {
          "sym": "$\\tanh$",
          "en": "elementwise nonlinearity squashing into $(-1, 1)$",
          "cn": "逐元素非线性，压到 $(-1, 1)$"
        }
      ],
      "usage_en": "Vanilla / Elman RNN — simplest form. Train via Backprop Through Time (BPTT): unroll the recurrence over time and apply standard backprop. Gradients are products of $W_h^\\top$ across time → vanishing/exploding (next item).",
      "usage_cn": "普通 / Elman RNN —— 最简形式。训练用 Backprop Through Time (BPTT)：把 recurrence 按时间展开后做标准反向传播。梯度是各时刻 $W_h^\\top$ 的连乘 → vanishing/exploding（下一条）。",
      "intuition_en": "'Combine the current input and a tanh-squashed view of the past.' Same weights every step → the network can't tell time positions apart, only what came right before.",
      "intuition_cn": "\"把当前输入与 tanh 压缩后的 \"过去\" 结合起来。\" 每步用相同权重 → 网络分不清绝对时间位置，只知道紧邻的上一刻。",
      "source": "topics/rnn.html#eq-rnn-elman-rnn-form-from-lecture-14"
    },
    {
      "title": "Why gradients vanish or explode",
      "eq": "$$ \\frac{\\partial h^{(T)}}{\\partial h^{(1)}}=\\prod_{t=2}^{T}\\frac{\\partial h^{(t)}}{\\partial h^{(t-1)}} $$",
      "symbols": [
        {
          "sym": "$\\partial L / \\partial h_0$",
          "en": "gradient of the loss with respect to the initial hidden state",
          "cn": "loss 关于初始隐藏状态的梯度"
        },
        {
          "sym": "$\\prod_{t=1}^{T} W_h^\\top$",
          "en": "product of the same matrix $T$ times — eigenvalues compound",
          "cn": "同一矩阵连乘 $T$ 次 —— 特征值复利"
        },
        {
          "sym": "$\\lambda_{\\max}(W_h)$",
          "en": "largest eigenvalue magnitude — controls the dominant term",
          "cn": "$W_h$ 最大特征值绝对值 —— 主导项"
        },
        {
          "sym": "$T$",
          "en": "sequence length — the longer, the worse the compounding",
          "cn": "序列长度 —— 越长复利效应越严重"
        }
      ],
      "usage_en": "Diagnose long-sequence training failures. If $|\\lambda_{\\max}| < 1$ → gradient $\\to 0$ (no learning of long-range deps); if $|\\lambda_{\\max}| > 1$ → gradient $\\to \\infty$ (NaN training). Mitigation: gating (LSTM/GRU), gradient clipping, careful init.",
      "usage_cn": "诊断长序列训练失败。$|\\lambda_{\\max}| < 1$ → 梯度 $\\to 0$（学不到长距离依赖）；$|\\lambda_{\\max}| > 1$ → 梯度 $\\to \\infty$（NaN 训练）。缓解：门控（LSTM/GRU）、梯度裁剪、谨慎初始化。",
      "intuition_en": "'Multiplying $T$ small numbers gives 0; multiplying $T$ big numbers gives $\\infty$.' Either way, a vanilla RNN can't carry gradient information far through time, which is exactly the problem LSTM was invented to fix.",
      "intuition_cn": "\"$T$ 个小数连乘得 0；$T$ 个大数连乘得 $\\infty$。\" 两种情况下普通 RNN 都无法把梯度信息传得很远 —— 这正是 LSTM 被发明出来解决的问题。",
      "source": "topics/rnn.html#eq-rnn-why-gradients-vanish-or-explode"
    }
  ],
  "lstm": [
    {
      "title": "LSTM gates from Lecture 14",
      "eq": "$$ i^{(t)}=\\sigma(W_{ix}x^{(t)}+W_{ih}h^{(t-1)}+b_i) $$\n$$ f^{(t)}=\\sigma(W_{fx}x^{(t)}+W_{fh}h^{(t-1)}+b_f) $$\n$$ o^{(t)}=\\sigma(W_{ox}x^{(t)}+W_{oh}h^{(t-1)}+b_o) $$\n$$ \\tilde c^{(t)}=\\sigma_c(W_{cx}x^{(t)}+W_{ch}h^{(t-1)}+b_c) $$",
      "symbols": [
        {
          "sym": "$f_t, i_t, o_t$",
          "en": "forget / input / output gates — each in $[0, 1]^H$ via sigmoid",
          "cn": "forget / input / output 门 —— 各为 sigmoid 出来的 $[0, 1]^H$"
        },
        {
          "sym": "$\\sigma$",
          "en": "sigmoid — outputs gate values between 0 and 1",
          "cn": "sigmoid —— 输出 0 到 1 之间的门值"
        },
        {
          "sym": "$W_*, b_*$",
          "en": "per-gate weight matrices and biases (4 sets total)",
          "cn": "每个门的权重矩阵和偏置（共 4 套）"
        },
        {
          "sym": "$[h_{t-1}, x_t]$",
          "en": "concatenation of previous hidden state and current input",
          "cn": "上一时刻隐藏状态与当前输入拼接"
        }
      ],
      "usage_en": "Three sigmoid gates control information flow. Each gate is computed from $[h_{t-1}, x_t]$ via its own affine layer, then squashed to $(0, 1)$ — values near 0 close the gate, near 1 open it. Train end-to-end with backprop.",
      "usage_cn": "三个 sigmoid 门控制信息流。每个门用自己的仿射层从 $[h_{t-1}, x_t]$ 算出再压到 $(0, 1)$ —— 接近 0 关，接近 1 开。端到端用 backprop 训练。",
      "intuition_en": "'Learn when to remember, when to update, when to expose.' Gates make the recurrence adaptive — the network decides per time-step what to keep in memory and what to discard, instead of a fixed mixing rule.",
      "intuition_cn": "\"学会何时记住、何时更新、何时输出。\" 门让 recurrence 自适应 —— 网络逐时刻决定保留什么、丢弃什么，而不是固定的混合规则。",
      "source": "topics/lstm.html#eq-lstm-lstm-gates-from-lecture-14"
    },
    {
      "title": "Cell and hidden updates",
      "eq": "$$ c^{(t)}=f^{(t)}\\odot c^{(t-1)}+i^{(t)}\\odot \\tilde c^{(t)}, \\qquad h^{(t)}=o^{(t)}\\odot \\sigma_h(c^{(t)}) $$",
      "symbols": [
        {
          "sym": "$c_t$",
          "en": "cell state — the long-term memory carrier ($H$-dim)",
          "cn": "cell state —— 长期记忆载体（$H$ 维）"
        },
        {
          "sym": "$h_t$",
          "en": "hidden state — what gets exposed to the next layer / output",
          "cn": "隐藏状态 —— 暴露给下一层 / 输出的部分"
        },
        {
          "sym": "$\\tilde{c}_t$",
          "en": "candidate cell update — $\\tanh$ of an affine layer",
          "cn": "候选 cell 更新 —— 仿射层的 $\\tanh$"
        },
        {
          "sym": "$f_t \\odot c_{t-1}$",
          "en": "elementwise product — forget gate decides what stays from old memory",
          "cn": "逐元素乘 —— forget 门决定旧记忆中保留什么"
        },
        {
          "sym": "$i_t \\odot \\tilde{c}_t$",
          "en": "input gate decides what new info to write",
          "cn": "input 门决定写入什么新信息"
        },
        {
          "sym": "$\\odot$",
          "en": "elementwise (Hadamard) product",
          "cn": "逐元素（Hadamard）积"
        }
      ],
      "usage_en": "The cell update has **only addition and elementwise multiplication** — no matrix multiplication chain like vanilla RNN. That's what stops gradients from compounding catastrophically through time.",
      "usage_cn": "cell 更新里**只有加法和逐元素乘** —— 没有像普通 RNN 那样的矩阵连乘链。这正是阻止梯度跨时刻灾难性复利的关键。",
      "intuition_en": "'A conveyor belt $c_t$ runs through time; gates clip onto it.' The forget gate erases bits, the input gate writes new bits, the output gate reads bits to expose as $h_t$. Gradient flows along the belt almost unchanged.",
      "intuition_cn": "\"传送带 $c_t$ 贯穿时间；门夹在带子上。\" forget 门擦除位，input 门写入新位，output 门读取位作为 $h_t$ 暴露。梯度沿着传送带几乎不变地流过。",
      "source": "topics/lstm.html#eq-lstm-cell-and-hidden-updates"
    },
    {
      "title": "GRU summary",
      "eq": "$$ z^{(t)}=\\sigma(W_{zx}x^{(t)}+W_{zh}h^{(t-1)}+b_z), \\qquad r^{(t)}=\\sigma(W_{rx}x^{(t)}+W_{rh}h^{(t-1)}+b_r) $$\n$$ h^{(t)}=(1-z^{(t)})\\odot \\tilde h^{(t)}+z^{(t)}\\odot h^{(t-1)} $$",
      "symbols": [
        {
          "sym": "$z_t$",
          "en": "update gate (combines forget + input into one)",
          "cn": "update 门（把 forget + input 合并）"
        },
        {
          "sym": "$r_t$",
          "en": "reset gate (controls how much past to use when computing the candidate)",
          "cn": "reset 门（控制算候选时用多少过去）"
        },
        {
          "sym": "$\\tilde{h}_t$",
          "en": "candidate hidden state",
          "cn": "候选隐藏状态"
        },
        {
          "sym": "$h_t = (1 - z_t) \\odot h_{t-1} + z_t \\odot \\tilde{h}_t$",
          "en": "blended update — no separate cell state",
          "cn": "混合更新 —— 没有单独的 cell state"
        }
      ],
      "usage_en": "Use as a lighter alternative to LSTM. Same gating spirit but only 2 gates (vs 3) and no separate cell state, so ~25% fewer parameters and slightly faster. Empirically often comparable to LSTM on most tasks.",
      "usage_cn": "作为 LSTM 的轻量替代。同样的门控思想但只有 2 个门（vs 3）且没有单独 cell state，所以参数少 ~25%、稍快。实证上多数任务与 LSTM 相当。",
      "intuition_en": "'GRU = LSTM with one gate merged and the cell state folded into the hidden state.' Less expressive in theory but often just as good in practice; pick LSTM if you have plenty of compute, GRU if you want speed.",
      "intuition_cn": "\"GRU = LSTM 把一个门合并、cell state 与 hidden state 合一。\" 理论上表达力略弱，实际常一样好；算力充足选 LSTM，要速度选 GRU。",
      "source": "topics/lstm.html#eq-lstm-gru-summary"
    }
  ],
  "autoencoder": [
    {
      "title": "Encoder / decoder",
      "eq": "$$ z=f_\\phi(x),\\qquad \\hat{x}=g_\\theta(z) $$",
      "source": "topics/autoencoder.html#eq-autoencoder-encoder-decoder",
      "symbols": [
        {
          "sym": "$x$",
          "en": "Original input, such as an image or feature vector.",
          "cn": "原始输入，比如图片或 feature vector。"
        },
        {
          "sym": "$f_\\phi$",
          "en": "Encoder network with trainable parameters $\\phi$.",
          "cn": "Encoder network，参数是 $\\phi$。"
        },
        {
          "sym": "$z$",
          "en": "Latent code, embedding, or bottleneck representation.",
          "cn": "Latent code / embedding / bottleneck representation。"
        },
        {
          "sym": "$g_\\theta$",
          "en": "Decoder network with trainable parameters $\\theta$.",
          "cn": "Decoder network，参数是 $\\theta$。"
        },
        {
          "sym": "$\\hat{x}$",
          "en": "Reconstructed version of the input.",
          "cn": "模型重建出来的输入。"
        }
      ],
      "usage_en": "Compute $z=f_\\phi(x)$ first, then decode $\\hat{x}=g_\\theta(z)$. The code $z$ can be used as a learned feature vector after training.",
      "usage_cn": "先算 $z=f_\\phi(x)$，再 decode 得到 $\\hat{x}=g_\\theta(z)$。训练后，$z$ 可以当作 learned feature vector 使用。",
      "intuition_en": "The encoder compresses; the decoder tests whether the compressed code kept enough information to rebuild the input.",
      "intuition_cn": "Encoder 负责压缩，decoder 检验这个压缩后的 code 是否保留了足够信息来重建输入。"
    },
    {
      "title": "Reconstruction loss",
      "eq": "$$ \\min_{\\theta,\\phi}\\;\\mathcal{L}_{rec}(x,\\hat x) $$\n$$ \\mathcal{L}_{rec}=\\|x-\\hat x\\|_2^2\\;(\\text{MSE}) $$",
      "source": "topics/autoencoder.html#eq-autoencoder-reconstruction-loss",
      "symbols": [
        {
          "sym": "$\\mathcal{L}_{rec}$",
          "en": "Reconstruction loss; smaller means the output looks closer to the input.",
          "cn": "Reconstruction loss；越小表示输出越接近输入。"
        },
        {
          "sym": "$\\|x-\\hat{x}\\|_2^2$",
          "en": "Squared Euclidean distance between input and reconstruction.",
          "cn": "输入和 reconstruction 之间的 squared Euclidean distance。"
        },
        {
          "sym": "$\\min_{\\theta,\\phi}$",
          "en": "Optimize both decoder parameters $\\theta$ and encoder parameters $\\phi$.",
          "cn": "同时优化 decoder 参数 $\\theta$ 和 encoder 参数 $\\phi$。"
        },
        {
          "sym": "MSE",
          "en": "Mean squared error, often averaged over pixels/features and a minibatch.",
          "cn": "Mean squared error，通常会对像素/特征和 minibatch 求平均。"
        }
      ],
      "usage_en": "For each minibatch, reconstruct every input, compute squared errors, average them, then backpropagate through decoder and encoder.",
      "usage_cn": "对每个 minibatch，先重建所有输入，再计算 squared error，取平均，然后通过 decoder 和 encoder 做 backpropagation。",
      "intuition_en": "The loss is a copying test. With a bottleneck or regularizer, doing well on this test requires learning reusable structure rather than memorizing raw input.",
      "intuition_cn": "这个 loss 像一个“复原测试”。有 bottleneck 或 regularizer 时，想复原得好就必须学习可复用结构，而不能只死记硬背。"
    }
  ],
  "vae": [
    {
      "title": "Latent-variable likelihood",
      "eq": "$$ p_\\theta(x)=\\int p_\\theta(x\\mid z)p(z)\\,dz $$",
      "source": "topics/vae.html#eq-vae-latent-variable-likelihood",
      "symbols": [
        {
          "sym": "$x$",
          "en": "Observed data point.",
          "cn": "观测到的数据点。"
        },
        {
          "sym": "$z$",
          "en": "Hidden latent variable or generative code.",
          "cn": "隐藏的 latent variable / generative code。"
        },
        {
          "sym": "$p(z)$",
          "en": "Prior distribution over latent codes, often $\\mathcal{N}(0,I)$.",
          "cn": "Latent prior，通常是 $\\mathcal{N}(0,I)$。"
        },
        {
          "sym": "$p_\\theta(x\\mid z)$",
          "en": "Decoder likelihood, parameterized by $\\theta$.",
          "cn": "Decoder likelihood，参数是 $\\theta$。"
        },
        {
          "sym": "$\\int dz$",
          "en": "Integrate over all continuous latent possibilities.",
          "cn": "对连续 latent space 中所有可能 $z$ 做积分。"
        }
      ],
      "usage_en": "Use this as the generative story: sample $z\\sim p(z)$, then sample or decode $x$ from $p_\\theta(x\\mid z)$. The integral explains why exact likelihood is hard.",
      "usage_cn": "把它当成生成故事：先 sample $z\\sim p(z)$，再从 $p_\\theta(x\\mid z)$ 生成或 decode 出 $x$。这个积分也说明 exact likelihood 为什么难算。",
      "intuition_en": "A visible sample can be produced by many possible hidden codes, so the model sums over every possible hidden explanation.",
      "intuition_cn": "同一个可见样本可能由很多 hidden code 生成，所以模型要把所有可能解释都加总起来。"
    },
    {
      "title": "Approximate posterior",
      "eq": "$$ q_\\phi(z\\mid x)=\\mathcal{N}\\!\\big(\\mu_\\phi(x),\\operatorname{diag}(\\sigma_\\phi^2(x))\\big) $$",
      "source": "topics/vae.html#eq-vae-approximate-posterior",
      "symbols": [
        {
          "sym": "$q_\\phi(z\\mid x)$",
          "en": "Encoder distribution approximating the true posterior $p_\\theta(z\\mid x)$.",
          "cn": "Encoder distribution，用来近似 true posterior $p_\\theta(z\\mid x)$。"
        },
        {
          "sym": "$\\phi$",
          "en": "Encoder parameters.",
          "cn": "Encoder 参数。"
        },
        {
          "sym": "$\\mu_\\phi(x)$",
          "en": "Mean vector predicted from input $x$.",
          "cn": "由输入 $x$ 预测出的 mean vector。"
        },
        {
          "sym": "$\\sigma_\\phi^2(x)$",
          "en": "Variance vector predicted from input $x$.",
          "cn": "由输入 $x$ 预测出的 variance vector。"
        },
        {
          "sym": "$\\operatorname{diag}$",
          "en": "Builds a diagonal covariance matrix from the variance vector.",
          "cn": "把 variance vector 放到 covariance matrix 的对角线上。"
        }
      ],
      "usage_en": "The encoder usually outputs $\\mu$ and log variance. Convert log variance to variance or standard deviation before sampling and KL computation.",
      "usage_cn": "Encoder 通常输出 $\\mu$ 和 log variance。采样和计算 KL 前，需要把 log variance 转成 variance 或 standard deviation。",
      "intuition_en": "The encoder does not say one exact code caused the input; it gives a cloud of plausible latent codes.",
      "intuition_cn": "Encoder 不是说输入只对应一个精确 code，而是给出一团可能的 latent codes。"
    },
    {
      "title": "ELBO to maximize",
      "eq": "$$ \\mathcal{L}(x)=\\mathbb{E}_{z\\sim q_\\phi(z\\mid x)}[\\log p_\\theta(x\\mid z)]-D_{KL}\\!\\left(q_\\phi(z\\mid x)\\,\\|\\,p(z)\\right) $$",
      "source": "topics/vae.html#eq-vae-elbo-to-maximize",
      "symbols": [
        {
          "sym": "$\\mathcal{L}(x)$",
          "en": "ELBO, a lower bound on $\\log p_\\theta(x)$.",
          "cn": "ELBO，是 $\\log p_\\theta(x)$ 的 lower bound。"
        },
        {
          "sym": "$\\mathbb{E}_{z\\sim q}$",
          "en": "Average over latent samples from the encoder distribution.",
          "cn": "对 encoder distribution 采样出的 $z$ 求平均。"
        },
        {
          "sym": "$\\log p_\\theta(x\\mid z)$",
          "en": "Reconstruction log-likelihood.",
          "cn": "Reconstruction log-likelihood。"
        },
        {
          "sym": "$D_{KL}(q\\|p)$",
          "en": "KL penalty that keeps the approximate posterior near the prior.",
          "cn": "KL penalty，用来让 approximate posterior 靠近 prior。"
        }
      ],
      "usage_en": "Maximize the ELBO, or minimize negative ELBO. In code this is usually reconstruction loss plus KL loss, with signs chosen for minimization.",
      "usage_cn": "理论上 maximize ELBO；代码里常写成 minimize negative ELBO，也就是 reconstruction loss 加 KL loss。",
      "intuition_en": "One term asks the decoder to reconstruct well; the other keeps the latent space organized enough to sample from.",
      "intuition_cn": "一项要求 decoder 重建得好，另一项让 latent space 足够规整，方便从 prior 采样。"
    },
    {
      "title": "Reparameterization",
      "eq": "$$ z=\\mu_\\phi(x)+\\sigma_\\phi(x)\\odot\\epsilon,\\quad \\epsilon\\sim\\mathcal{N}(0,I) $$",
      "source": "topics/vae.html#eq-vae-reparameterization",
      "symbols": [
        {
          "sym": "$\\epsilon$",
          "en": "Standard normal noise independent of network parameters.",
          "cn": "Standard normal noise，不依赖网络参数。"
        },
        {
          "sym": "$\\sigma_\\phi(x)$",
          "en": "Standard deviation vector, not variance.",
          "cn": "Standard deviation vector，不是 variance。"
        },
        {
          "sym": "$\\odot$",
          "en": "Elementwise multiplication.",
          "cn": "Elementwise multiplication。"
        },
        {
          "sym": "$z$",
          "en": "Latent sample passed into the decoder.",
          "cn": "送入 decoder 的 latent sample。"
        }
      ],
      "usage_en": "Sample $\\epsilon$, compute $z$, and backpropagate through $\\mu_\\phi(x)$ and $\\sigma_\\phi(x)$. This keeps stochastic sampling compatible with gradients.",
      "usage_cn": "先 sample $\\epsilon$，再算 $z$，然后梯度可以传回 $\\mu_\\phi(x)$ 和 $\\sigma_\\phi(x)$。这样 stochastic sampling 仍然能配合 backpropagation。",
      "intuition_en": "Move the randomness into a separate noise variable, so the network output remains a differentiable transformation.",
      "intuition_cn": "把随机性挪到独立噪声里，让网络输出部分仍然是可微 transformation。"
    },
    {
      "title": "Gaussian KL",
      "eq": "$$ D_{KL}(q\\|p)=\\tfrac{1}{2}\\sum_j\\left(\\mu_j^2+\\sigma_j^2-\\log\\sigma_j^2-1\\right) $$",
      "source": "topics/vae.html#eq-vae-gaussian-kl",
      "symbols": [
        {
          "sym": "$j$",
          "en": "Latent dimension index.",
          "cn": "Latent dimension index。"
        },
        {
          "sym": "$\\mu_j$",
          "en": "Mean of dimension $j$ under $q$.",
          "cn": "$q$ 中第 $j$ 维的 mean。"
        },
        {
          "sym": "$\\sigma_j^2$",
          "en": "Variance of dimension $j$ under $q$.",
          "cn": "$q$ 中第 $j$ 维的 variance。"
        },
        {
          "sym": "$p$",
          "en": "Standard normal prior $\\mathcal{N}(0,I)$.",
          "cn": "Standard normal prior $\\mathcal{N}(0,I)$。"
        }
      ],
      "usage_en": "Use this closed form when $q$ is diagonal Gaussian and $p=\\mathcal{N}(0,I)$. If code stores logvar, substitute $\\sigma_j^2=\\exp(\\text{logvar}_j)$.",
      "usage_cn": "当 $q$ 是 diagonal Gaussian 且 $p=\\mathcal{N}(0,I)$ 时直接用这个 closed form。如果代码存的是 logvar，代入 $\\sigma_j^2=\\exp(\\text{logvar}_j)$。",
      "intuition_en": "The term is zero when a dimension exactly matches the prior: $\\mu_j=0$ and $\\sigma_j^2=1$.",
      "intuition_cn": "当某一维完全匹配 prior，即 $\\mu_j=0$ 且 $\\sigma_j^2=1$ 时，这一维 KL contribution 为 0。"
    }
  ],
  "contrastive": [
    {
      "title": "Cosine similarity",
      "eq": "$$ s(f(x),f(x'))=\\frac{f(x)^\\top f(x')}{\\|f(x)\\|_2\\|f(x')\\|_2} $$",
      "source": "topics/contrastive.html#eq-contrastive-cosine-similarity",
      "symbols": [
        {
          "sym": "$x,x'$",
          "en": "Two inputs or two augmented views.",
          "cn": "两个输入，或同一输入的两个 augmented views。"
        },
        {
          "sym": "$f(\\cdot)$",
          "en": "Encoder that maps an input to an embedding.",
          "cn": "Encoder，把输入映射成 embedding。"
        },
        {
          "sym": "$f(x)^\\top f(x')$",
          "en": "Dot product between the two embeddings.",
          "cn": "两个 embeddings 的 dot product。"
        },
        {
          "sym": "$\\|\\cdot\\|_2$",
          "en": "Euclidean norm, or vector length.",
          "cn": "Euclidean norm，也就是向量长度。"
        },
        {
          "sym": "$s$",
          "en": "Similarity score used as a logit.",
          "cn": "Similarity score，后面作为 logit 使用。"
        }
      ],
      "usage_en": "Normalize embeddings if needed, then use dot products as cosine scores. Higher score means the pair should be treated as more similar.",
      "usage_cn": "需要时先 normalize embeddings，再用 dot product 当 cosine score。分数越高，表示这一对越相似。",
      "intuition_en": "Cosine similarity compares direction rather than raw length, which is why it works well for representation vectors.",
      "intuition_cn": "Cosine similarity 比的是方向而不是原始长度，所以很适合比较 representation vectors。"
    },
    {
      "title": "InfoNCE loss",
      "eq": "$$ \\mathcal L_{\\mathrm{NCE}}=-\\log\\frac{\\exp(s(f(x),f(x^+))/\\tau)}{\\exp(s(f(x),f(x^+))/\\tau)+\\sum_{i=1}^{N}\\exp(s(f(x),f(x_i^-))/\\tau)} $$",
      "source": "topics/contrastive.html#eq-contrastive-infonce-loss",
      "symbols": [
        {
          "sym": "$x$",
          "en": "Anchor example.",
          "cn": "Anchor example。"
        },
        {
          "sym": "$x^+$",
          "en": "Positive view, usually another augmentation of the same item.",
          "cn": "Positive view，通常是同一对象的另一个 augmentation。"
        },
        {
          "sym": "$x_i^-$",
          "en": "Negative example $i$.",
          "cn": "第 $i$ 个 negative example。"
        },
        {
          "sym": "$N$",
          "en": "Number of negatives.",
          "cn": "Negative 的数量。"
        },
        {
          "sym": "$\\tau$",
          "en": "Temperature; smaller values sharpen the softmax.",
          "cn": "Temperature；越小 softmax 越尖锐。"
        },
        {
          "sym": "$\\exp$",
          "en": "Turns scores into positive softmax weights.",
          "cn": "把 score 转成正的 softmax weight。"
        }
      ],
      "usage_en": "For each anchor, score the positive and negatives, divide every score by $\\tau$, apply softmax, and use cross-entropy with the positive as the correct class.",
      "usage_cn": "对每个 anchor，算 positive 和 negatives 的 scores，每个 score 都除以 $\\tau$，再做 softmax，把 positive 当正确类别做 cross-entropy。",
      "intuition_en": "The loss is small when the positive pair receives most of the probability mass among all candidates.",
      "intuition_cn": "只有当 positive pair 在所有候选里拿到大部分 probability mass 时，这个 loss 才会小。"
    },
    {
      "title": "Dual-encoder form",
      "eq": "$$ \\mathcal L_{\\mathrm{dual}}(x,z)=-\\log\\frac{\\exp(f_1(x)^\\top f_2(z))}{\\sum_{j=1}^{C}\\exp(f_1(x)^\\top f_2(z_j))} $$",
      "source": "topics/contrastive.html#eq-contrastive-dual-encoder-form",
      "symbols": [
        {
          "sym": "$f_1$",
          "en": "First encoder, such as an image encoder.",
          "cn": "第一个 encoder，比如 image encoder。"
        },
        {
          "sym": "$f_2$",
          "en": "Second encoder, such as a text or class encoder.",
          "cn": "第二个 encoder，比如 text encoder 或 class encoder。"
        },
        {
          "sym": "$z$",
          "en": "Correct paired candidate for $x$.",
          "cn": "和 $x$ 正确配对的 candidate。"
        },
        {
          "sym": "$z_j$",
          "en": "Candidate item $j$.",
          "cn": "第 $j$ 个 candidate item。"
        },
        {
          "sym": "$C$",
          "en": "Number of candidates or classes.",
          "cn": "候选数量或类别数量。"
        }
      ],
      "usage_en": "Build a score table between $x$ embeddings and candidate $z_j$ embeddings, then apply softmax cross-entropy so the paired candidate is selected.",
      "usage_cn": "先建立 $x$ embeddings 和所有候选 $z_j$ embeddings 的 score table，再用 softmax cross-entropy 让正确配对被选中。",
      "intuition_en": "CLIP-style learning is classification over candidates, except both sides are learned encoders in a shared embedding space.",
      "intuition_cn": "CLIP-style learning 本质上是在候选集合里分类，只是两边都由 encoder 映射到同一个 embedding space。"
    }
  ],
  "attention": [
    {
      "title": "Single-query attention",
      "eq": "$$ s_i = k_i^\\top q,\\qquad \\alpha_i=\\frac{\\exp(s_i)}{\\sum_j \\exp(s_j)},\\qquad y=\\sum_i \\alpha_i v_i $$",
      "symbols": [
        {
          "sym": "$q$",
          "en": "query vector ($d_k$-dim)",
          "cn": "query 向量（$d_k$ 维）"
        },
        {
          "sym": "$K$",
          "en": "matrix of keys (one row per token, $n \\times d_k$)",
          "cn": "key 矩阵（每个 token 一行，$n \\times d_k$）"
        },
        {
          "sym": "$V$",
          "en": "matrix of values (one row per token, $n \\times d_v$)",
          "cn": "value 矩阵（每个 token 一行，$n \\times d_v$）"
        },
        {
          "sym": "$\\mathrm{softmax}(qK^\\top)$",
          "en": "row of attention weights (sums to 1)",
          "cn": "一行注意力权重（和为 1）"
        },
        {
          "sym": "$\\mathrm{softmax}(qK^\\top)V$",
          "en": "weighted sum of values — the attention output",
          "cn": "value 的加权和 —— attention 输出"
        }
      ],
      "usage_en": "Use to retrieve information from a memory: each query gets a soft-select over the values, weighted by query-key similarity. This is the building block of all modern attention.",
      "usage_cn": "用于从 memory 中取信息：每个 query 在 value 上做软选择，权重由 query-key 相似度决定。这是所有现代 attention 的基础构件。",
      "intuition_en": "'Like a soft dictionary lookup.' Query says what you want; keys advertise what each value is; the softmax picks a smooth mixture rather than one hard match.",
      "intuition_cn": "\"像软字典查找。\" query 说你想要什么；key 宣传每个 value 是什么；softmax 选择平滑混合，而不是硬匹配单个。",
      "source": "topics/attention.html#eq-attention-single-query-attention"
    },
    {
      "title": "Scaled dot-product attention",
      "eq": "$$ \\mathrm{Attention}(Q,K,V)=\\mathrm{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V $$",
      "symbols": [
        {
          "sym": "$Q, K, V$",
          "en": "matrices of queries / keys / values for a batch of $n$ tokens",
          "cn": "$n$ 个 token 的 query / key / value 矩阵"
        },
        {
          "sym": "$QK^\\top$",
          "en": "$n \\times n$ matrix of pairwise similarity scores",
          "cn": "$n \\times n$ 的成对相似度分数矩阵"
        },
        {
          "sym": "$\\sqrt{d_k}$",
          "en": "square root of key dimension — scaling for stability",
          "cn": "key 维度的平方根 —— 稳定性缩放"
        },
        {
          "sym": "$\\mathrm{softmax}$",
          "en": "applied row-wise → each row is a probability distribution",
          "cn": "按行做 softmax → 每行都是一个概率分布"
        }
      ],
      "usage_en": "Standard form used in Transformers. The $\\sqrt{d_k}$ divisor prevents huge dot products in high $d_k$ from saturating softmax and killing gradients. Compute as one matmul → divide → softmax → matmul.",
      "usage_cn": "Transformer 的标准形式。除以 $\\sqrt{d_k}$ 防止高维 $d_k$ 下点积过大让 softmax 饱和、梯度消失。计算流程：一次 matmul → 除 → softmax → matmul。",
      "intuition_en": "'For every token, compute its similarity to every other token, normalize to probabilities, take the weighted average of values.' The result captures context from across the whole sequence in one parallel operation.",
      "intuition_cn": "\"对每个 token，计算它与所有其他 token 的相似度，归一化成概率，对 value 加权平均。\" 结果在一次并行操作中 capture 整个序列的上下文。",
      "source": "topics/attention.html#eq-attention-scaled-dot-product-attention"
    },
    {
      "title": "Causal mask",
      "eq": "$$ \\mathrm{softmax}\\!\\left(\\frac{QK^\\top + M}{\\sqrt{d_k}}\\right),\\qquad M_{ij}=\\begin{cases}0,&j\\le i\\\\-\\infty,&j>i\\end{cases} $$",
      "symbols": [
        {
          "sym": "$M$",
          "en": "additive mask added before softmax — position $(i, j)$ is $-\\infty$ if $j > i$",
          "cn": "softmax 前加的 mask —— 位置 $(i, j)$ 在 $j > i$ 时为 $-\\infty$"
        },
        {
          "sym": "$j > i$",
          "en": "future positions (the model shouldn't see them)",
          "cn": "未来位置（模型不应看到）"
        },
        {
          "sym": "$-\\infty$",
          "en": "after softmax, these entries become exactly 0",
          "cn": "经过 softmax 后这些项正好为 0"
        }
      ],
      "usage_en": "Apply for autoregressive / causal models (GPT, decoder-only Transformers). At training time, the mask lets you parallelize across all positions while pretending each position only sees its left context. No mask needed for encoder-only (BERT) or full cross-attention.",
      "usage_cn": "用于自回归 / 因果模型（GPT、decoder-only Transformer）。训练时 mask 让你能跨所有位置并行，同时假装每个位置只看到左侧上下文。encoder-only（BERT）或完整 cross-attention 不需要 mask。",
      "intuition_en": "'Block the model from attending to the future during training, so it learns to predict left-to-right.' Without the mask, predicting the next token would be trivial — it could just copy from itself.",
      "intuition_cn": "\"训练时阻止模型注意未来，让它学会从左到右预测。\" 没有 mask 的话，预测下一 token 就是 trivial 的 —— 它可以直接复制自己。",
      "source": "topics/attention.html#eq-attention-causal-mask"
    }
  ],
  "positional-encoding": [
    {
      "title": "Sinusoidal positional encoding",
      "eq": "$$ PE(pos,2i)=\\sin\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right),\\qquad PE(pos,2i+1)=\\cos\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right) $$",
      "symbols": [
        {
          "sym": "$PE_{pos, 2i}$",
          "en": "even-index dimensions use sine",
          "cn": "偶数维用 sine"
        },
        {
          "sym": "$PE_{pos, 2i+1}$",
          "en": "odd-index dimensions use cosine",
          "cn": "奇数维用 cosine"
        },
        {
          "sym": "$pos$",
          "en": "position index in the sequence (0, 1, 2, ...)",
          "cn": "序列中的位置下标（0, 1, 2, ...）"
        },
        {
          "sym": "$i$",
          "en": "dimension pair index (0 to $d/2 - 1$)",
          "cn": "维度对下标（0 到 $d/2 - 1$）"
        },
        {
          "sym": "$10000^{2i/d}$",
          "en": "geometric progression of wavelengths from $2\\pi$ to $10000 \\cdot 2\\pi$",
          "cn": "波长的几何级数，从 $2\\pi$ 到 $10000 \\cdot 2\\pi$"
        }
      ],
      "usage_en": "Add to token embeddings before feeding to the Transformer. No learned parameters — purely deterministic. Allows the model to extrapolate to sequence lengths longer than it saw during training (in theory).",
      "usage_cn": "加到 token embedding 上后再送入 Transformer。没有可学习参数 —— 纯确定性。理论上让模型能外推到训练时未见的更长序列。",
      "intuition_en": "'Each dimension is a sinusoid of a different frequency — together they encode position uniquely.' Like binary representation but smooth: low dims change slowly (coarse position), high dims oscillate fast (fine position).",
      "intuition_cn": "\"每个维度是不同频率的正弦波 —— 合起来唯一编码位置。\" 类似二进制表示但平滑：低维变化慢（粗位置），高维震荡快（细位置）。",
      "source": "topics/positional-encoding.html#eq-positional-encoding-sinusoidal-positional-encoding"
    },
    {
      "title": "Shift by $k$",
      "eq": "$$ \\begin{aligned} PE(pos+k,2i)&=\\cos(k\\omega_i)\\,PE(pos,2i)+\\sin(k\\omega_i)\\,PE(pos,2i+1),\\\\ PE(pos+k,2i+1)&=-\\sin(k\\omega_i)\\,PE(pos,2i)+\\cos(k\\omega_i)\\,PE(pos,2i+1). \\end{aligned} $$",
      "symbols": [
        {
          "sym": "$PE_{pos+k}$",
          "en": "encoding at position shifted by $k$",
          "cn": "位置偏移 $k$ 后的编码"
        },
        {
          "sym": "$T_k$",
          "en": "rotation matrix that depends only on $k$, not on $pos$",
          "cn": "只依赖 $k$、不依赖 $pos$ 的旋转矩阵"
        },
        {
          "sym": "$T_k \\cdot PE_{pos}$",
          "en": "rotating $PE_{pos}$ by $T_k$ gives $PE_{pos+k}$",
          "cn": "把 $PE_{pos}$ 旋转 $T_k$ 即得 $PE_{pos+k}$"
        }
      ],
      "usage_en": "Crucial property for relative position reasoning. The model can implement 'attend to the token $k$ positions ago' as a fixed linear operation on $PE$, without needing to learn a separate rule per position.",
      "usage_cn": "对相对位置推理至关重要的性质。模型可以把 \"注意 $k$ 个位置之前的 token\" 实现为对 $PE$ 的固定线性操作，不必针对每个位置单独学习规则。",
      "intuition_en": "'Linearly translatable encoding — shifting the position is equivalent to rotating the encoding.' This is exactly why sinusoidal PE was chosen over arbitrary positional embeddings: relative position info is captured for free.",
      "intuition_cn": "\"可线性平移的编码 —— 位置移动等价于编码旋转。\" 选择正弦 PE 而非任意位置 embedding 的原因正是这个：免费捕获相对位置信息。",
      "source": "topics/positional-encoding.html#eq-positional-encoding-shift-by-k"
    },
    {
      "title": "Relative-position dot product",
      "eq": "$$ PE(pos_1)^\\top PE(pos_2)=\\sum_i \\cos\\!\\big((pos_2-pos_1)\\omega_i\\big) $$",
      "symbols": [
        {
          "sym": "$PE_{pos_a}^\\top PE_{pos_b}$",
          "en": "dot product between two positional encodings",
          "cn": "两个位置编码的点积"
        },
        {
          "sym": "$pos_a - pos_b$",
          "en": "their relative offset (the only thing the dot product depends on)",
          "cn": "它们的相对偏移（点积唯一依赖的量）"
        },
        {
          "sym": "$\\sum_i \\cos(\\Delta \\cdot \\omega_i)$",
          "en": "depends only on $\\Delta = pos_a - pos_b$",
          "cn": "只依赖 $\\Delta = pos_a - pos_b$"
        }
      ],
      "usage_en": "Important property for attention scores: $Q^\\top K$ in attention will partially see this dot product, so attention can naturally attend to relative position. Underpins later relative-position schemes like RoPE.",
      "usage_cn": "对 attention score 的重要性质：attention 中的 $Q^\\top K$ 会部分看到这个点积，所以 attention 能自然地按相对位置 attend。是后续相对位置方案如 RoPE 的基础。",
      "intuition_en": "'Two tokens at the same distance apart always have the same dot product, regardless of where in the sequence.' Translation-invariant similarity — exactly what you want for language, where 'two tokens ago' should mean the same thing in any context.",
      "intuition_cn": "\"距离相同的两个 token 点积始终相同，无论在序列何处。\" 平移不变的相似度 —— 正是语言所需要的，\"两个 token 之前\" 在任何上下文都应是同一个意思。",
      "source": "topics/positional-encoding.html#eq-positional-encoding-relative-position-dot-product"
    },
    {
      "title": "Angle-addition identities",
      "eq": "$$ \\sin((pos+k)\\omega)=\\sin(pos\\omega)\\cos(k\\omega)+\\cos(pos\\omega)\\sin(k\\omega) $$\\n$$ \\cos((pos+k)\\omega)=\\cos(pos\\omega)\\cos(k\\omega)-\\sin(pos\\omega)\\sin(k\\omega) $$",
      "symbols": [
        {
          "sym": "$\\sin(\\alpha + \\beta)$",
          "en": "expands as $\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$",
          "cn": "展开为 $\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$"
        },
        {
          "sym": "$\\cos(\\alpha + \\beta)$",
          "en": "expands as $\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$",
          "cn": "展开为 $\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$"
        }
      ],
      "usage_en": "These trig identities are why $PE_{pos+k}$ can be written as a linear function of $PE_{pos}$. Used in derivations of the shift-invariance and dot-product properties above.",
      "usage_cn": "这些三角恒等式是为什么 $PE_{pos+k}$ 可以写成 $PE_{pos}$ 的线性函数。用于推导上面的平移不变性和点积性质。",
      "intuition_en": "'Sine and cosine of a shifted angle are linear combinations of sine and cosine of the original.' This linearity is what makes sinusoidal PE behave so nicely with attention's matrix operations.",
      "intuition_cn": "\"偏移角的正弦余弦是原始正弦余弦的线性组合。\" 这种线性正是正弦 PE 与 attention 的矩阵运算配合得如此优雅的原因。",
      "source": "topics/positional-encoding.html#eq-positional-encoding-hw4-2-1-2-prove-the-linear-shift-property"
    }
  ],
  "transformer": [
    {
      "title": "Block skeleton",
      "eq": "$$ X' = X + \\mathrm{MHA}(\\mathrm{LN}(X)),\\qquad X_{\\text{out}}=X' + \\mathrm{FFN}(\\mathrm{LN}(X')) $$",
      "symbols": [
        {
          "sym": "$x$",
          "en": "input sequence (one block sees the previous block's output)",
          "cn": "输入序列（每个 block 接收上一 block 的输出）"
        },
        {
          "sym": "$\\mathrm{MHA}$",
          "en": "multi-head attention sublayer",
          "cn": "multi-head attention 子层"
        },
        {
          "sym": "$\\mathrm{FFN}$",
          "en": "position-wise feed-forward sublayer (2-layer MLP)",
          "cn": "逐位置 feed-forward 子层（2 层 MLP）"
        },
        {
          "sym": "$\\mathrm{LN}$",
          "en": "LayerNorm (often pre-norm: $\\mathrm{LN}$ before sublayer)",
          "cn": "LayerNorm（常用 pre-norm：$\\mathrm{LN}$ 在子层前）"
        },
        {
          "sym": "$+ x$",
          "en": "residual connection — sum the sublayer output with the input",
          "cn": "residual 连接 —— 子层输出与输入相加"
        }
      ],
      "usage_en": "Stack $N$ such blocks (typically 12–96 in modern LMs). Pre-norm vs post-norm matters for training stability; modern LMs (GPT-3+) almost universally use pre-norm. Each block has the same structure but its own parameters.",
      "usage_cn": "堆叠 $N$ 个这种 block（现代 LM 中通常 12–96 个）。pre-norm vs post-norm 对训练稳定性有影响；现代 LM（GPT-3+）几乎都用 pre-norm。每个 block 结构相同但参数独立。",
      "intuition_en": "'Two sublayers per block: one mixes information across positions (attention), one transforms each position individually (FFN). Residuals + LayerNorm keep gradients well-behaved.' The whole stack is fully parallel — that's what makes Transformers train fast on GPUs.",
      "intuition_cn": "\"每个 block 有两个子层：一个跨位置混合信息（attention），一个对每个位置单独变换（FFN）。residual + LayerNorm 让梯度稳定。\" 整个堆叠完全并行 —— 这就是 Transformer 在 GPU 上训练快的原因。",
      "source": "topics/transformer.html#eq-transformer-block-skeleton"
    },
    {
      "title": "Multi-head attention projections",
      "eq": "$$ Q=XW_Q,\\qquad K=XW_K,\\qquad V=XW_V,\\qquad \\mathrm{MHA}(X)=\\mathrm{Concat}(head_1,\\ldots,head_N)W_O $$",
      "symbols": [
        {
          "sym": "$h$",
          "en": "number of heads (typically 8 to 96)",
          "cn": "head 数（通常 8 到 96）"
        },
        {
          "sym": "$W_i^Q, W_i^K, W_i^V$",
          "en": "per-head projections from $d_{model}$ to $d_k = d_{model}/h$",
          "cn": "每个 head 的投影，$d_{model}$ → $d_k = d_{model}/h$"
        },
        {
          "sym": "$\\mathrm{head}_i$",
          "en": "scaled dot-product attention output for head $i$",
          "cn": "head $i$ 的 scaled dot-product attention 输出"
        },
        {
          "sym": "$W^O$",
          "en": "output projection mapping concatenated heads back to $d_{model}$",
          "cn": "输出投影，把拼接的 heads 映回 $d_{model}$"
        }
      ],
      "usage_en": "Implementation note: in practice $W^Q, W^K, W^V$ are stored as single matrices of shape $d_{model} \\times d_{model}$ and reshaped to $(h, d_k)$ on the fly — same number of parameters either way.",
      "usage_cn": "实现上：实际中 $W^Q, W^K, W^V$ 存为形状 $d_{model} \\times d_{model}$ 的矩阵，在运行时 reshape 为 $(h, d_k)$ —— 参数量一样。",
      "intuition_en": "'Run $h$ separate attentions in parallel, each in a smaller subspace, then concatenate.' Different heads can specialize on different relations (syntax, coreference, position offsets) without interfering with each other.",
      "intuition_cn": "\"$h$ 个 attention 并行运行，每个在更小的子空间，然后拼接。\" 不同 head 可以专注不同关系（语法、coreference、位置偏移）而互不干扰。",
      "source": "topics/transformer.html#eq-transformer-multi-head-attention-projections"
    },
    {
      "title": "Parameter count from HW4 §2.4",
      "eq": "$$ \\text{attention per layer}=4D^2,\\qquad \\text{MLP per layer}=2DF $$\n$$ \\text{full model}=L(4D^2+2DF)+2VD $$",
      "symbols": [
        {
          "sym": "$d$",
          "en": "model hidden size $d_{model}$",
          "cn": "模型 hidden size $d_{model}$"
        },
        {
          "sym": "$d_{ff}$",
          "en": "feed-forward hidden size (typically $4d$)",
          "cn": "feed-forward hidden size（通常 $4d$）"
        },
        {
          "sym": "$N$",
          "en": "number of stacked blocks",
          "cn": "堆叠 block 数"
        },
        {
          "sym": "$4 d^2$",
          "en": "QKV + output projections in MHA: $3 d^2$ + $d^2$ = $4 d^2$",
          "cn": "MHA 中的 QKV + 输出投影：$3 d^2 + d^2 = 4 d^2$"
        },
        {
          "sym": "$2 d \\cdot d_{ff}$",
          "en": "two linear layers in FFN ($d \\to d_{ff}$ and back)",
          "cn": "FFN 中两个线性层（$d \\to d_{ff}$ 和回来）"
        }
      ],
      "usage_en": "Use to estimate model size before training. With $d_{ff} = 4d$, total params $\\approx N \\cdot (4d^2 + 8d^2) = 12 N d^2$ (excluding embeddings, biases, LayerNorms — small relative). GPT-3 had $d = 12288, N = 96$ → ~175B params.",
      "usage_cn": "训练前估算模型大小用。$d_{ff} = 4d$ 时，总参数 $\\approx N \\cdot (4d^2 + 8d^2) = 12 N d^2$（不含 embedding、bias、LayerNorm —— 相对较小）。GPT-3 $d = 12288, N = 96$ → ~175B 参数。",
      "intuition_en": "'Most parameters live in the FFN, not attention.' Roughly 2/3 of a Transformer's compute (and parameters) is the position-wise FFN; this is why MoE Transformers replace FFNs with sparse experts.",
      "intuition_cn": "\"大多数参数在 FFN 而非 attention。\" Transformer 约 2/3 的计算（和参数）在逐位置 FFN；这就是 MoE Transformer 把 FFN 换成稀疏 expert 的原因。",
      "source": "topics/transformer.html#eq-transformer-parameter-count-from-hw4-2-4"
    }
  ],
  "llm": [
    {
      "title": "Autoregressive factorization",
      "eq": "$$ P_\\theta(x_1,\\ldots,x_T)=\\prod_{t=1}^{T}P_\\theta(x_t\\mid x_{\\lt t}) $$",
      "symbols": [
        {
          "sym": "$P(y_{1:T})$",
          "en": "joint probability over a sequence of $T$ tokens",
          "cn": "$T$ 个 token 序列的联合概率"
        },
        {
          "sym": "$y_t$",
          "en": "the $t$-th token (output of the model at step $t$)",
          "cn": "第 $t$ 个 token（模型在第 $t$ 步的输出）"
        },
        {
          "sym": "$y_{<t} = y_1, \\ldots, y_{t-1}$",
          "en": "all earlier tokens — the conditioning context",
          "cn": "所有先前 token —— 条件上下文"
        },
        {
          "sym": "$\\prod_{t=1}^{T}$",
          "en": "chain rule of probability over the sequence",
          "cn": "对序列应用概率链式法则"
        }
      ],
      "usage_en": "Chain rule applied to a sequence — exact, no approximation. The model only needs to learn $P(y_t \\mid y_{<t})$ for one token; the joint follows by product. Train by maximizing log-likelihood = minimizing NLL.",
      "usage_cn": "对序列应用链式法则 —— 精确，无近似。模型只需学单个 token 的 $P(y_t \\mid y_{<t})$；联合通过连乘得到。训练时最大化 log-likelihood = 最小化 NLL。",
      "intuition_en": "'Predict one token at a time, conditioning on everything before.' Lets us turn a hard joint distribution problem into $T$ smaller next-token classification problems, all sharing the same model.",
      "intuition_cn": "\"一次预测一个 token，条件是之前的所有内容。\" 把困难的联合分布问题转成 $T$ 个共享同一模型的下一 token 分类问题。",
      "source": "topics/llm.html#eq-llm-autoregressive-factorization"
    },
    {
      "title": "Next-token probability",
      "eq": "$$ P_\\theta(x_t=i\\mid x_{\\lt t})=\\frac{\\exp(z_{t,i})}{\\sum_{j\\in V}\\exp(z_{t,j})} $$",
      "symbols": [
        {
          "sym": "$P_\\theta$",
          "en": "model's predicted distribution (parameters $\\theta$)",
          "cn": "模型预测分布（参数 $\\theta$）"
        },
        {
          "sym": "$z_t$",
          "en": "logit vector at step $t$ — one entry per vocabulary token",
          "cn": "第 $t$ 步的 logit 向量 —— 词表每个 token 一项"
        },
        {
          "sym": "$\\mathrm{softmax}$",
          "en": "converts logits to a probability distribution",
          "cn": "把 logits 转成概率分布"
        },
        {
          "sym": "$\\theta$",
          "en": "all parameters of the Transformer (embeddings, attention, FFN, output)",
          "cn": "Transformer 全部参数（embedding、attention、FFN、输出）"
        }
      ],
      "usage_en": "The model's only output: a distribution over the vocabulary at each position. Apply during inference (sample / argmax) and during training (compute loss against true next token).",
      "usage_cn": "模型唯一的输出：每个位置上的词表分布。推理时（采样 / argmax）和训练时（与真实下一 token 算 loss）都用它。",
      "intuition_en": "'A classifier with $|V|$ classes (vocab size), run at every position.' That's it — an LLM is conceptually a giant per-position classifier; the recurrence comes from feeding outputs back as inputs at inference.",
      "intuition_cn": "\"一个有 $|V|$ 类（词表大小）的分类器，在每个位置运行。\" 就这么简单 —— LLM 在概念上就是一个巨大的逐位置分类器；recurrence 来自推理时把输出反馈作为输入。",
      "source": "topics/llm.html#eq-llm-next-token-probability"
    },
    {
      "title": "NLL / cross-entropy loss",
      "eq": "$$ \\mathcal{L}(X;\\theta)=-\\frac{1}{T}\\sum_{t=1}^{T}\\log P_\\theta(x_t\\mid x_{\\lt t}) $$",
      "symbols": [
        {
          "sym": "$L$",
          "en": "training loss (averaged over tokens / examples)",
          "cn": "训练 loss（对 token / 样本求平均）"
        },
        {
          "sym": "$P_\\theta(y_t \\mid y_{<t})$",
          "en": "model probability at the true next token",
          "cn": "模型在真实下一 token 上的概率"
        },
        {
          "sym": "$-\\log$",
          "en": "negative log → minimize this to maximize likelihood",
          "cn": "负对数 → 最小化它即最大化 likelihood"
        }
      ],
      "usage_en": "Standard LM loss. For a batch of sequences, average $-\\log P_\\theta(y_t \\mid y_{<t})$ over all token positions. Implemented in PyTorch as `F.cross_entropy(logits, targets)` after Transformer outputs logits.",
      "usage_cn": "标准 LM loss。对一个 batch 序列，对所有 token 位置上的 $-\\log P_\\theta(y_t \\mid y_{<t})$ 求平均。在 PyTorch 中用 `F.cross_entropy(logits, targets)` 实现，输入是 Transformer 的 logits。",
      "intuition_en": "'Penalize the model proportionally to how much probability it gave to the wrong token.' If the truth had probability 0.01, the loss is $-\\log 0.01 \\approx 4.6$ — confidently wrong is heavily penalized.",
      "intuition_cn": "\"按 \"模型给错误 token 多少概率\" 比例地惩罚模型。\" 真实 token 概率 0.01 时 loss $= -\\log 0.01 \\approx 4.6$ —— 自信但错被重罚。",
      "source": "topics/llm.html#eq-llm-nll-cross-entropy-loss"
    },
    {
      "title": "Perplexity",
      "eq": "$$ PP(X)=\\exp(\\mathcal{L}(X;\\theta))=\\left(\\prod_{t=1}^T P_\\theta(x_t\\mid x_{\\lt t})\\right)^{-1/T} $$",
      "symbols": [
        {
          "sym": "$\\mathrm{PPL}$",
          "en": "perplexity — exponentiated average NLL",
          "cn": "perplexity —— 指数化的平均 NLL"
        },
        {
          "sym": "$\\exp(\\bar{L})$",
          "en": "$e$ raised to the average loss in nats",
          "cn": "以 $e$ 为底的均值 loss（nats）的指数"
        },
        {
          "sym": "low PPL",
          "en": "high probability assigned to truth → 'confident and correct'",
          "cn": "对真实序列赋了高概率 → \"自信且正确\""
        },
        {
          "sym": "PPL of $V$",
          "en": "uniform random model over vocab size $V$ (worst case for fair comparisons)",
          "cn": "对词表 $V$ 均匀随机预测的 baseline（公平比较的最坏情况）"
        }
      ],
      "usage_en": "Use to compare LMs on the same dataset (only meaningful with the same tokenizer / vocab). Lower is better. SOTA models on standard benchmarks have PPL of single digits; random predictions would give PPL of $|V|$.",
      "usage_cn": "用于在同一数据集上比较 LM（必须同 tokenizer / 词表才有意义）。越低越好。标准 benchmark 上的 SOTA 模型 PPL 个位数；随机预测的 PPL 等于 $|V|$。",
      "intuition_en": "'How many equally-likely options does the model effectively consider per token?' PPL 10 means the model is as uncertain as if choosing uniformly from 10 tokens — much narrower than the full vocab.",
      "intuition_cn": "\"模型每个 token 等价于在多少个等可能选项中犹豫？\" PPL 10 意味着模型不确定性等同于从 10 个 token 中均匀选 —— 远比整个词表窄。",
      "source": "topics/llm.html#eq-llm-perplexity"
    },
    {
      "title": "Temperature decoding",
      "eq": "$$ P_T(i)=\\mathrm{softmax}\\!\\left(\\frac{z_i}{T}\\right) $$",
      "symbols": [
        {
          "sym": "$P_\\tau$",
          "en": "rescaled distribution at temperature $\\tau$",
          "cn": "温度 $\\tau$ 下重缩放的分布"
        },
        {
          "sym": "$\\tau$",
          "en": "temperature — $\\tau < 1$ sharper, $\\tau > 1$ flatter, $\\tau \\to 0$ argmax",
          "cn": "温度 —— $\\tau < 1$ 更尖锐，$\\tau > 1$ 更平坦，$\\tau \\to 0$ 即 argmax"
        },
        {
          "sym": "$z_t$",
          "en": "raw logits before softmax",
          "cn": "softmax 前的原始 logits"
        },
        {
          "sym": "low $\\tau$",
          "en": "deterministic / focused output (good for code, math)",
          "cn": "确定性 / 聚焦输出（适合代码、数学）"
        },
        {
          "sym": "high $\\tau$",
          "en": "creative / diverse output (good for stories, brainstorming)",
          "cn": "创造性 / 多样输出（适合故事、头脑风暴）"
        }
      ],
      "usage_en": "Apply at sampling time only — doesn't affect training. Standard recipe: $\\tau = 0$ for deterministic answers, $\\tau \\in [0.7, 1.0]$ for normal use, $\\tau > 1$ for high creativity. Often combined with top-$k$ or top-$p$ (nucleus) sampling.",
      "usage_cn": "只在采样时用 —— 不影响训练。标准做法：$\\tau = 0$ 给确定答案，$\\tau \\in [0.7, 1.0]$ 日常使用，$\\tau > 1$ 高创造性。常配合 top-$k$ 或 top-$p$（nucleus）采样。",
      "intuition_en": "'Heat = randomness.' Cold model: always picks the most likely token (deterministic). Hot model: picks freely from the long tail (creative but may produce nonsense). The exponent $1/\\tau$ controls the contrast.",
      "intuition_cn": "\"温度 = 随机性。\" 冷模型：总选最可能 token（确定性）。热模型：从长尾里自由选（有创造性但可能胡言）。指数 $1/\\tau$ 控制对比度。",
      "source": "topics/llm.html#eq-llm-temperature-decoding"
    },
    {
      "title": "LoRA update",
      "eq": "$$ W = W_0+\\Delta W,\\qquad \\Delta W=BA,\\qquad r\\ll \\min(d,k) $$",
      "symbols": [
        {
          "sym": "$W_0$",
          "en": "frozen pretrained weight matrix (very large, e.g. $d \\times d$)",
          "cn": "冻结的预训练权重矩阵（极大，如 $d \\times d$）"
        },
        {
          "sym": "$A \\in \\mathbb{R}^{r \\times d}, B \\in \\mathbb{R}^{d \\times r}$",
          "en": "low-rank trainable factors with rank $r \\ll d$",
          "cn": "低秩可训练因子，秩 $r \\ll d$"
        },
        {
          "sym": "$\\Delta W = BA$",
          "en": "low-rank update added to $W_0$ at inference",
          "cn": "推理时加到 $W_0$ 的低秩更新"
        },
        {
          "sym": "$r$",
          "en": "LoRA rank — typically 4 to 64 (much less than $d$)",
          "cn": "LoRA 秩 —— 通常 4 到 64（远小于 $d$）"
        }
      ],
      "usage_en": "Use for parameter-efficient fine-tuning. Train only $A, B$ (which together have $2dr$ params, much less than $d^2$); merge into $W_0$ at deployment for zero inference overhead. Standard for adapting LLMs to new tasks / styles cheaply.",
      "usage_cn": "用于参数高效微调。只训 $A, B$（共 $2dr$ 参数，远小于 $d^2$）；部署时合并到 $W_0$，推理零开销。便宜地适配 LLM 到新任务 / 风格的标准方法。",
      "intuition_en": "'The change you need to fine-tune is usually low-rank — even though the original matrix isn't.' By restricting $\\Delta W$ to rank $r$, you train far fewer parameters but still cover most of the useful adaptations.",
      "intuition_cn": "\"微调所需的改动通常是低秩的 —— 即使原始矩阵不是。\" 把 $\\Delta W$ 限制为秩 $r$，训练参数大幅减少但仍能覆盖大多数有用的适配方向。",
      "source": "topics/llm.html#eq-llm-lora-update"
    }
  ],
  "diffusion": [
    {
      "title": "Notation",
      "eq": "",
      "symbols": [
        {
          "sym": "$x_0$",
          "en": "clean data sample, such as the original image",
          "cn": "clean data sample，例如原始图片"
        },
        {
          "sym": "$x_t$",
          "en": "noisy version of the sample after $t$ forward-noising steps",
          "cn": "经过 $t$ 步 forward noising 后的 noisy sample"
        },
        {
          "sym": "$T$",
          "en": "last noising step; $x_T$ is designed to be close to standard Gaussian noise",
          "cn": "最后一个 noising step；$x_T$ 设计成接近 standard Gaussian noise"
        },
        {
          "sym": "$q(\\cdot)$",
          "en": "fixed forward noising distribution; it is chosen, not learned",
          "cn": "固定的 forward noising distribution；它是人为设定的，不是 learned"
        },
        {
          "sym": "$p_\\theta(\\cdot)$",
          "en": "learned reverse / denoising distribution with parameters $\\theta$",
          "cn": "带参数 $\\theta$ 的 learned reverse / denoising distribution"
        },
        {
          "sym": "$\\beta_t$",
          "en": "noise variance added at step $t$; usually small and scheduled",
          "cn": "第 $t$ 步加入的 noise variance；通常较小，并由 schedule 给定"
        },
        {
          "sym": "$\\alpha_t=1-\\beta_t$",
          "en": "signal-retention factor for one step",
          "cn": "单步 signal-retention factor"
        },
        {
          "sym": "$\\bar\\alpha_t=\\prod_{i=1}^t\\alpha_i$",
          "en": "cumulative signal-retention factor from step 0 to step $t$",
          "cn": "从 step 0 到 step $t$ 的 cumulative signal-retention factor"
        },
        {
          "sym": "$I$",
          "en": "identity covariance matrix; noise is isotropic Gaussian",
          "cn": "identity covariance matrix；表示 isotropic Gaussian noise"
        }
      ],
      "usage_en": "When reading any diffusion formula, first ask whether it belongs to the fixed forward process $q$ or the learned reverse process $p_\\theta$. Then check whether the formula describes one step ($\\alpha_t,\\beta_t$) or all steps up to $t$ ($\\bar\\alpha_t$).",
      "usage_cn": "读 diffusion 公式时，先判断它属于 fixed forward process $q$，还是 learned reverse process $p_\\theta$。然后判断它描述的是单步（$\\alpha_t,\\beta_t$）还是从 0 到 $t$ 的累计效果（$\\bar\\alpha_t$）。",
      "intuition_en": "Diffusion has two arrows: training defines an easy corruption arrow $x_0\\to x_T$; generation learns the hard cleanup arrow $x_T\\to x_0$.",
      "intuition_cn": "Diffusion 有两条箭头：training 中我们定义容易的 corruption arrow $x_0\\to x_T$；generation 中模型学习困难的 cleanup arrow $x_T\\to x_0$。",
      "source": "topics/diffusion.html#eq-diffusion-notation"
    },
    {
      "title": "Forward noising process",
      "eq": "$$ q(x_t\\mid x_{t-1})=\\mathcal{N}\\!\\left(x_t;\\sqrt{\\alpha_t}\\,x_{t-1},\\,\\beta_t I\\right) $$\n$$ x_t=\\sqrt{\\alpha_t}\\,x_{t-1}+\\sqrt{\\beta_t}\\,\\epsilon_t,\\qquad \\epsilon_t\\sim\\mathcal{N}(0,I) $$",
      "symbols": [
        {
          "sym": "$q(x_t\\mid x_{t-1})$",
          "en": "distribution of the next noisy state given the previous noisy state",
          "cn": "给定 previous noisy state 后，next noisy state 的 distribution"
        },
        {
          "sym": "$\\mathcal{N}(x;\\mu,\\Sigma)$",
          "en": "Gaussian density in variable $x$ with mean $\\mu$ and covariance $\\Sigma$",
          "cn": "变量 $x$ 上 mean 为 $\\mu$、covariance 为 $\\Sigma$ 的 Gaussian density"
        },
        {
          "sym": "$\\sqrt{\\alpha_t}x_{t-1}$",
          "en": "shrunk old signal; because $\\alpha_t<1$, the previous sample is slightly faded",
          "cn": "被缩小的 old signal；因为 $\\alpha_t<1$，previous sample 会被 slightly faded"
        },
        {
          "sym": "$\\beta_t I$",
          "en": "covariance of the Gaussian noise added at this step",
          "cn": "这一小步加入 Gaussian noise 的 covariance"
        },
        {
          "sym": "$\\epsilon_t\\sim\\mathcal{N}(0,I)$",
          "en": "fresh standard Gaussian noise sampled independently for this step",
          "cn": "这一小步新 sample 的 standard Gaussian noise，通常 independent"
        }
      ],
      "usage_en": "Use the distribution form when proving or writing likelihood / ELBO terms. Use the reparameterized form to actually sample $x_t$: draw $\\epsilon_t$, scale the previous state by $\\sqrt{\\alpha_t}$, add noise scaled by $\\sqrt{\\beta_t}$.",
      "usage_cn": "写 likelihood / ELBO 或 proof 时用 distribution form。实际 sample $x_t$ 时用 reparameterized form：先 draw $\\epsilon_t$，把 previous state 乘 $\\sqrt{\\alpha_t}$，再加上 $\\sqrt{\\beta_t}$ scaled noise。",
      "intuition_en": "Each forward step keeps most of the image and adds a little noise. Repeating many small steps gradually washes the data into Gaussian noise.",
      "intuition_cn": "每个 forward step 保留大部分 image signal，再加一点 noise。重复很多小步后，data 会逐渐被洗成 Gaussian noise。",
      "source": "topics/diffusion.html#eq-diffusion-forward-noising-process"
    },
    {
      "title": "Direct sample from $x_0$",
      "eq": "$$ q(x_t\\mid x_0)=\\mathcal{N}\\!\\left(x_t;\\sqrt{\\bar{\\alpha}_t}\\,x_0,\\,(1-\\bar{\\alpha}_t)I\\right) $$",
      "symbols": [
        {
          "sym": "$q(x_t\\mid x_0)$",
          "en": "distribution of the noisy sample at time $t$ directly conditioned on the clean data",
          "cn": "直接 condition on clean data 后，time $t$ 的 noisy sample distribution"
        },
        {
          "sym": "$\\sqrt{\\bar\\alpha_t}x_0$",
          "en": "remaining clean signal after $t$ noising steps",
          "cn": "$t$ 个 noising steps 后剩下的 clean signal"
        },
        {
          "sym": "$(1-\\bar\\alpha_t)I$",
          "en": "total accumulated noise variance by time $t$",
          "cn": "到 time $t$ 为止累计的 total noise variance"
        },
        {
          "sym": "$\\bar\\alpha_t$",
          "en": "product of all previous $\\alpha_i$ values; it usually decreases as $t$ grows",
          "cn": "之前所有 $\\alpha_i$ 的乘积；通常随 $t$ 增大而变小"
        }
      ],
      "usage_en": "This is the training shortcut. Instead of simulating $x_0\\to x_1\\to\\cdots\\to x_t$, choose a random time $t$ and sample $x_t$ in one line: $x_t=\\sqrt{\\bar\\alpha_t}x_0+\\sqrt{1-\\bar\\alpha_t}\\epsilon$.",
      "usage_cn": "这是 training shortcut。不用真的模拟 $x_0\\to x_1\\to\\cdots\\to x_t$；可以随机选一个 time $t$，然后一行 sample：$x_t=\\sqrt{\\bar\\alpha_t}x_0+\\sqrt{1-\\bar\\alpha_t}\\epsilon$。",
      "intuition_en": "The clean image coefficient is $\\sqrt{\\bar\\alpha_t}$; the noise coefficient is $\\sqrt{1-\\bar\\alpha_t}$. Small $t$ means mostly image; large $t$ means mostly noise.",
      "intuition_cn": "clean image 的 coefficient 是 $\\sqrt{\\bar\\alpha_t}$；noise 的 coefficient 是 $\\sqrt{1-\\bar\\alpha_t}$。小 $t$ 时 mostly image；大 $t$ 时 mostly noise。",
      "source": "topics/diffusion.html#eq-diffusion-direct-sample-from-x-0"
    },
    {
      "title": "Learned reverse transition",
      "eq": "$$ p_\\theta(x_{t-1}\\mid x_t)=\\mathcal{N}\\!\\left(x_{t-1};\\mu_\\theta(x_t,t),\\,\\Sigma_\\theta(x_t,t)\\right) $$",
      "symbols": [
        {
          "sym": "$p_\\theta(x_{t-1}\\mid x_t)$",
          "en": "model's learned distribution for the previous, slightly cleaner state",
          "cn": "model 学到的 previous / slightly cleaner state 的 distribution"
        },
        {
          "sym": "$\\theta$",
          "en": "neural-network parameters",
          "cn": "neural-network parameters"
        },
        {
          "sym": "$\\mu_\\theta(x_t,t)$",
          "en": "predicted mean of the denoised previous step",
          "cn": "预测出来的 previous denoised step 的 mean"
        },
        {
          "sym": "$\\Sigma_\\theta(x_t,t)$",
          "en": "predicted or fixed covariance for the reverse step",
          "cn": "reverse step 的 predicted 或 fixed covariance"
        },
        {
          "sym": "$t$",
          "en": "time-step input; the model needs it because noise level changes with time",
          "cn": "time-step input；model 需要它，因为不同 time 的 noise level 不同"
        }
      ],
      "usage_en": "At generation time, start from $x_T\\sim\\mathcal{N}(0,I)$. For $t=T,T-1,\\ldots,1$, feed $(x_t,t)$ to the network, get a Gaussian reverse transition, and sample or take its mean to move toward $x_{t-1}$.",
      "usage_cn": "generation 时，从 $x_T\\sim\\mathcal{N}(0,I)$ 开始。对 $t=T,T-1,\\ldots,1$，把 $(x_t,t)$ 输入网络，得到 Gaussian reverse transition，然后 sample 或取 mean 来走向 $x_{t-1}$。",
      "intuition_en": "The forward process is known; the reverse process is what the neural network learns. It answers: given this noisy object at this noise level, what slightly cleaner object likely came before it?",
      "intuition_cn": "forward process 是已知的；reverse process 才是 neural network 学的。它回答：给定这个 noise level 下的 noisy object，上一小步更干净的 object 可能是什么？",
      "source": "topics/diffusion.html#eq-diffusion-learned-reverse-transition"
    },
    {
      "title": "Posterior mean used in HW4 §3.4",
      "eq": "$$ \\tilde{\\mu}_t(x_t,x_0)= \\frac{\\sqrt{\\alpha_t}(1-\\bar{\\alpha}_{t-1})}{1-\\bar{\\alpha}_t}x_t+ \\frac{\\sqrt{\\bar{\\alpha}_{t-1}}\\beta_t}{1-\\bar{\\alpha}_t}x_0 $$",
      "symbols": [
        {
          "sym": "$q(x_{t-1}\\mid x_t,x_0)$",
          "en": "true forward-process posterior of the previous noisy state when both $x_t$ and $x_0$ are known",
          "cn": "当 $x_t$ 和 $x_0$ 都已知时，previous noisy state 的 true forward-process posterior"
        },
        {
          "sym": "$\\tilde\\mu_t(x_t,x_0)$",
          "en": "mean of that posterior Gaussian",
          "cn": "这个 posterior Gaussian 的 mean"
        },
        {
          "sym": "$x_t$",
          "en": "current noisy sample",
          "cn": "current noisy sample"
        },
        {
          "sym": "$x_0$",
          "en": "clean data sample",
          "cn": "clean data sample"
        },
        {
          "sym": "$\\beta_t,\\alpha_t,\\bar\\alpha_t$",
          "en": "noise schedule quantities that determine the two weights",
          "cn": "noise schedule quantities，用来决定两个 weights"
        }
      ],
      "usage_en": "Use this when an ELBO term compares the true posterior $q(x_{t-1}\\mid x_t,x_0)$ with the model reverse step $p_\\theta(x_{t-1}\\mid x_t)$. In derivations, get it by multiplying two Gaussians and completing the square.",
      "usage_cn": "当 ELBO term 要比较 true posterior $q(x_{t-1}\\mid x_t,x_0)$ 和 model reverse step $p_\\theta(x_{t-1}\\mid x_t)$ 时用它。推导时，通过 multiplying two Gaussians 并 completing the square 得到。",
      "intuition_en": "The posterior mean is a weighted average of the noisy observation $x_t$ and the clean anchor $x_0$. The weights are not arbitrary; they come from Gaussian precision, so the more reliable source gets more weight.",
      "intuition_cn": "posterior mean 是 noisy observation $x_t$ 和 clean anchor $x_0$ 的 weighted average。weights 不是随便来的，而是来自 Gaussian precision；更可靠的信息源权重更大。",
      "source": "topics/diffusion.html#eq-diffusion-posterior-mean-used-in-hw4-3-4"
    },
    {
      "title": "Diffusion ELBO",
      "eq": "$$ \\log p_\\theta(x_0)\\ge \\mathbb{E}_{q(x_1\\mid x_0)}[\\log p_\\theta(x_0\\mid x_1)]-D_{KL}(q(x_T\\mid x_0)\\|p(x_T))-\\sum_{t=2}^{T}\\mathbb{E}_{q(x_t\\mid x_0)}\\left[D_{KL}(q(x_{t-1}\\mid x_t,x_0)\\|p_\\theta(x_{t-1}\\mid x_t))\\right] $$",
      "symbols": [
        {
          "sym": "$\\log p_\\theta(x_0)$",
          "en": "log likelihood of the clean data under the learned generative model",
          "cn": "clean data 在 learned generative model 下的 log likelihood"
        },
        {
          "sym": "$\\mathbb E_{q(\\cdot)}$",
          "en": "average over samples from the fixed forward noising process",
          "cn": "对 fixed forward noising process 的 samples 取 average"
        },
        {
          "sym": "$p_\\theta(x_0\\mid x_1)$",
          "en": "final reconstruction / decoder step from slightly noisy data back to clean data",
          "cn": "从 slightly noisy data 回到 clean data 的 final reconstruction / decoder step"
        },
        {
          "sym": "$D_{KL}(q\\|p)$",
          "en": "penalty measuring mismatch between target distribution $q$ and model/prior distribution $p$",
          "cn": "衡量 target distribution $q$ 与 model/prior distribution $p$ mismatch 的 penalty"
        },
        {
          "sym": "$p(x_T)$",
          "en": "simple prior for terminal noise, usually $\\mathcal N(0,I)$",
          "cn": "terminal noise 的 simple prior，通常为 $\\mathcal N(0,I)$"
        }
      ],
      "usage_en": "For exam answers, name the three parts: reconstruction term, terminal prior KL, and denoising-transition KLs. Training tries to maximize the right-hand side, equivalently minimize the KL mismatch between true reverse posteriors and the learned reverse transitions.",
      "usage_cn": "考试写答案时先命名三部分：reconstruction term、terminal prior KL、denoising-transition KLs。training 最大化右边这个 lower bound，等价于让 true reverse posteriors 和 learned reverse transitions 的 KL mismatch 变小。",
      "intuition_en": "The ELBO is a bookkeeping equation: reward good reconstruction, penalize terminal noise that does not look like the prior, and penalize each reverse denoising step when it disagrees with the true Gaussian posterior.",
      "intuition_cn": "ELBO 是一个 bookkeeping equation：reconstruction 好就加分；terminal noise 不像 prior 就扣分；每个 reverse denoising step 和 true Gaussian posterior 不一致也扣分。",
      "source": "topics/diffusion.html#eq-diffusion-hw4-3-1-write-the-diffusion-elbo"
    },
    {
      "title": "Posterior factorization",
      "eq": "$$ q(x_{t-1}\\mid x_t,x_0)\\propto q(x_t\\mid x_{t-1})q(x_{t-1}\\mid x_0) $$",
      "symbols": [
        {
          "sym": "$\\propto$",
          "en": "proportional to; omitted normalization constant does not depend on $x_{t-1}$",
          "cn": "proportional to；省略的 normalization constant 不依赖 $x_{t-1}$"
        },
        {
          "sym": "$q(x_t\\mid x_{t-1})$",
          "en": "likelihood of observing current noisy sample from previous noisy sample",
          "cn": "由 previous noisy sample 产生 current noisy sample 的 likelihood"
        },
        {
          "sym": "$q(x_{t-1}\\mid x_0)$",
          "en": "prior-like distribution of the previous noisy state given the clean data",
          "cn": "给定 clean data 后，previous noisy state 的 prior-like distribution"
        },
        {
          "sym": "$x_{t-1}$",
          "en": "the variable being solved for in this posterior",
          "cn": "这个 posterior 中要求解的 variable"
        }
      ],
      "usage_en": "Use this as the setup for posterior-mean derivations. Treat $x_{t-1}$ as the variable, write both Gaussian exponents, collect the quadratic and linear terms, then complete the square.",
      "usage_cn": "推 posterior mean 时先写这个 setup。把 $x_{t-1}$ 当作 variable，写出两个 Gaussian exponents，收集 quadratic 和 linear terms，然后 complete the square。",
      "intuition_en": "This is Bayes' rule in diffusion clothing: posterior is proportional to likelihood times prior. Because both factors are Gaussian in $x_{t-1}$, the result is Gaussian.",
      "intuition_cn": "这就是穿了 diffusion 外衣的 Bayes' rule：posterior proportional to likelihood times prior。因为两个 factors 关于 $x_{t-1}$ 都是 Gaussian，结果仍然是 Gaussian。",
      "source": "topics/diffusion.html#eq-diffusion-hw4-3-4-posterior-mean"
    }
  ],
  "bayes-classifier": [
    {
      "title": "Binary Bayes rule",
      "eq": "$$ f_{\\text{Bayes}}(x)=\\begin{cases}1,&\\eta(x)\\ge \\frac12\\\\0,&\\eta(x)<\\frac12\\end{cases},\\qquad \\eta(x)=\\Pr(Y=1\\mid X=x) $$",
      "symbols": [
        {
          "sym": "$\\hat{y}^*(x)$",
          "en": "Bayes-optimal predicted class for input $x$",
          "cn": "对输入 $x$ 的 Bayes 最优预测类别"
        },
        {
          "sym": "$\\eta(x) = P(Y = 1 \\mid X = x)$",
          "en": "true class-1 posterior (assumed known here)",
          "cn": "真实的类 1 后验（这里假设已知）"
        },
        {
          "sym": "$\\eta(x) > 0.5$",
          "en": "predict class 1 when class 1 is more likely than class 0",
          "cn": "类 1 比类 0 更可能时预测 1"
        },
        {
          "sym": "$\\mathbf{1}[\\cdot]$",
          "en": "indicator function — 1 if condition holds, 0 otherwise",
          "cn": "示性函数 —— 条件成立为 1，否则 0"
        }
      ],
      "usage_en": "Theoretical optimal classifier — assumes you know the true posterior $\\eta(x)$. Use as a benchmark: any practical classifier's accuracy is upper-bounded by Bayes accuracy. Real algorithms approximate $\\eta(x)$ from data.",
      "usage_cn": "理论最优分类器 —— 假设知道真实后验 $\\eta(x)$。作为 benchmark：任何实际分类器的准确率上界都是 Bayes 准确率。真实算法从数据中估计 $\\eta(x)$。",
      "intuition_en": "'Pick whichever class is more likely given the input.' Can't beat this — it's literally the best possible decision rule for 0-1 loss. The gap between any classifier and the Bayes classifier is what learning theory tries to bound.",
      "intuition_cn": "\"哪个类更可能就预测哪个。\" 无法超越 —— 它是 0-1 loss 下字面意义上最优的决策规则。任何分类器与 Bayes 分类器的差距正是学习理论想要刻画的。",
      "source": "topics/bayes-classifier.html#eq-bayes-classifier-binary-bayes-rule"
    },
    {
      "title": "Bayes error",
      "eq": "$$ \\epsilon_\\mu^*=\\mathbb{E}_X\\left[\\min\\{\\eta(X),1-\\eta(X)\\}\\right] $$",
      "symbols": [
        {
          "sym": "$L^*$",
          "en": "Bayes error — minimum achievable expected 0-1 loss",
          "cn": "Bayes error —— 0-1 loss 下可达的最小期望值"
        },
        {
          "sym": "$\\mathbb{E}_X$",
          "en": "expectation over the data distribution",
          "cn": "对数据分布求期望"
        },
        {
          "sym": "$\\min(\\eta(x), 1 - \\eta(x))$",
          "en": "irreducible per-instance error of the Bayes classifier",
          "cn": "Bayes 分类器在每个实例上的不可消除误差"
        }
      ],
      "usage_en": "The hard floor on test error. If $L^* = 0$ the problem is fully separable; if $L^* > 0$ no classifier — no matter how complex — can ever achieve zero error on this distribution. Use to set realistic expectations.",
      "usage_cn": "测试误差的硬下界。$L^* = 0$ 时问题完全可分；$L^* > 0$ 时再复杂的分类器在此分布下都不可能零误差。用来设定现实的期望。",
      "intuition_en": "'The unavoidable noise in the data.' At any point where $\\eta(x)$ is exactly 0.5, you're guaranteed to be wrong half the time — there's nothing to learn there. Bayes error sums up all such irreducible mistakes.",
      "intuition_cn": "\"数据本身不可避免的噪声。\" 任何 $\\eta(x)$ 正好等于 0.5 的点，必有一半概率出错 —— 那里没什么可学。Bayes error 把所有这种不可消除的错误加起来。",
      "source": "topics/bayes-classifier.html#eq-bayes-classifier-bayes-error"
    },
    {
      "title": "Equivalent binary form",
      "eq": "$$ \\epsilon_\\mu^*=\\frac12-\\frac12\\mathbb{E}_X\\left[|2\\eta(X)-1|\\right] $$",
      "symbols": [
        {
          "sym": "$\\eta(x) > 0.5$",
          "en": "predict class 1",
          "cn": "预测类 1"
        },
        {
          "sym": "$P(Y = 1 \\mid x) > P(Y = 0 \\mid x)$",
          "en": "equivalent statement — class 1 has higher posterior than class 0",
          "cn": "等价表述 —— 类 1 后验大于类 0"
        },
        {
          "sym": "$P(x \\mid Y = 1) P(Y = 1) > P(x \\mid Y = 0) P(Y = 0)$",
          "en": "Bayes rule expansion (denominators cancel)",
          "cn": "Bayes 公式展开后（分母相消）"
        }
      ],
      "usage_en": "Three equivalent ways to write the binary Bayes rule. The third is most useful in practice — it lets you use generative models (estimate likelihood × prior) instead of directly modeling the posterior.",
      "usage_cn": "二分类 Bayes 规则的三种等价写法。第三种实践中最实用 —— 让你用生成模型（估计 likelihood × prior）而不必直接建模后验。",
      "intuition_en": "'Compare two posteriors, or equivalently, two (likelihood × prior) products.' Discriminative models (logistic regression, neural nets) target the posterior directly; generative models (Naive Bayes, GMMs) target likelihood and prior separately.",
      "intuition_cn": "\"比较两个后验，或等价地比较两个 (likelihood × prior) 乘积。\" 判别模型（logistic regression、神经网络）直接 target 后验；生成模型（Naive Bayes、GMM）分别 target likelihood 和 prior。",
      "source": "topics/bayes-classifier.html#eq-bayes-classifier-equivalent-binary-form"
    },
    {
      "title": "Squared-loss regression",
      "eq": "$$ f_{\\text{Bayes}}(X)=\\mathbb{E}[Y\\mid X],\\qquad \\epsilon_\\mu^*=\\mathbb{E}\\operatorname{Var}(Y\\mid X) $$",
      "symbols": [
        {
          "sym": "$f^*(x)$",
          "en": "Bayes-optimal regressor under squared loss",
          "cn": "平方 loss 下的 Bayes 最优回归器"
        },
        {
          "sym": "$\\mathbb{E}[Y \\mid X = x]$",
          "en": "conditional expectation of $Y$ given $X = x$",
          "cn": "$X = x$ 给定时 $Y$ 的条件期望"
        },
        {
          "sym": "$\\arg\\min_f \\mathbb{E}[(Y - f(X))^2]$",
          "en": "minimize expected squared error",
          "cn": "最小化期望平方误差"
        }
      ],
      "usage_en": "The regression analog of the Bayes classifier. The optimal regressor under squared loss is just the conditional mean. Linear regression approximates this with a linear function; flexible models (nearest neighbors, random forests, neural nets) try to recover it more faithfully.",
      "usage_cn": "回归版的 Bayes 分类器。平方 loss 下的最优回归器就是条件均值。Linear regression 用线性函数近似它；灵活模型（最近邻、Random Forest、神经网络）试图更忠实地恢复它。",
      "intuition_en": "'For squared loss, the best prediction at each $x$ is the average of the targets that have ever been seen there.' Asymmetric losses give other functionals (median for L1, quantile for pinball loss).",
      "intuition_cn": "\"对平方 loss，每个 $x$ 处的最佳预测就是该处所有目标值的平均。\" 不对称 loss 给出其他函数（L1 → 中位数；pinball loss → 分位数）。",
      "source": "topics/bayes-classifier.html#eq-bayes-classifier-squared-loss-regression"
    }
  ],
  "error-decomposition": [
    {
      "title": "Core equation",
      "eq": "$$ \\epsilon_\\mu(f)= \\underbrace{\\left(\\epsilon_\\mu(f)-\\inf_{g\\in\\mathcal{F}}\\epsilon_\\mu(g)\\right)}_{\\text{estimation error}} +\\underbrace{\\left(\\inf_{g\\in\\mathcal{F}}\\epsilon_\\mu(g)-\\epsilon_\\mu^*\\right)}_{\\text{approximation error}} +\\underbrace{\\epsilon_\\mu^*}_{\\text{Bayes error}} $$",
      "symbols": [
        {
          "sym": "$L(\\hat{f})$",
          "en": "test loss of the trained predictor $\\hat{f}$",
          "cn": "训练得到的预测器 $\\hat{f}$ 的测试 loss"
        },
        {
          "sym": "$L^*$",
          "en": "Bayes error (irreducible)",
          "cn": "Bayes error（不可消除）"
        },
        {
          "sym": "$L(f^*_F) - L^*$",
          "en": "**approximation error** — gap from $L^*$ caused by class restriction $F$",
          "cn": "**approximation error** —— 由类别限制 $F$ 造成的与 $L^*$ 的差距"
        },
        {
          "sym": "$L(\\hat{f}) - L(f^*_F)$",
          "en": "**estimation error** — gap caused by finite training data",
          "cn": "**estimation error** —— 由有限训练数据造成的差距"
        }
      ],
      "usage_en": "Diagnose your model: is the bottleneck not enough capacity (high approximation error → use richer class) or not enough data (high estimation error → collect more data, regularize, or use a smaller class)? Most ML decisions trade these off.",
      "usage_cn": "诊断模型瓶颈：是容量不足（approximation error 大 → 用更丰富的类别）还是数据不够（estimation error 大 → 收集更多数据、正则化、或用更小的类别）？大多数 ML 决策都在权衡这两者。",
      "intuition_en": "'Total error = unavoidable + can't-express + bad-luck-from-finite-data.' Bayes error is fixed; the other two trade off via model complexity.",
      "intuition_cn": "\"总误差 = 不可避免的 + 类别表达不出的 + 有限数据带来的运气。\" Bayes error 固定；后两者通过模型复杂度互相权衡。",
      "source": "topics/error-decomposition.html#eq-error-decomposition-core-equation"
    },
    {
      "title": "Best-in-class predictor",
      "eq": "$$ f_{\\mathcal{F}}^*\\in\\arg\\min_{g\\in\\mathcal{F}}\\epsilon_\\mu(g) $$",
      "symbols": [
        {
          "sym": "$f^*_F$",
          "en": "best predictor within the function class $F$",
          "cn": "函数类 $F$ 内的最佳预测器"
        },
        {
          "sym": "$F$",
          "en": "the hypothesis class (e.g., linear models, depth-3 trees, fixed-width MLPs)",
          "cn": "假设类（如线性模型、深度 3 的树、固定宽度 MLP）"
        },
        {
          "sym": "$\\arg\\min_{f \\in F}$",
          "en": "minimize over the chosen class — *not* over all functions",
          "cn": "在选定的类内最小化 —— *不是*在所有函数中"
        },
        {
          "sym": "$L(f)$",
          "en": "true test loss of $f$ on the data distribution",
          "cn": "$f$ 在数据分布上的真实测试 loss"
        }
      ],
      "usage_en": "Theoretical object — assumes infinite data and perfect optimization. The gap $L(f^*_F) - L^*$ measures how much accuracy your hypothesis class costs you, regardless of how well you fit it.",
      "usage_cn": "理论对象 —— 假设无限数据和完美优化。差距 $L(f^*_F) - L^*$ 衡量假设类本身造成的精度损失，不论拟合得多好。",
      "intuition_en": "'The best you could hope for if you had infinite training data, given the model family you chose.' If $F$ is too small (e.g. linear for a non-linear truth), even infinite data can't save you.",
      "intuition_cn": "\"假设无限训练数据时，给定模型族能达到的最佳。\" $F$ 太小（如非线性真值用线性拟合），无限数据也救不了。",
      "source": "topics/error-decomposition.html#eq-error-decomposition-best-in-class-predictor"
    },
    {
      "title": "Learned predictor",
      "eq": "$$ \\hat f=\\mathcal{A}(\\mathcal{D}) $$",
      "symbols": [
        {
          "sym": "$\\hat{f}$",
          "en": "the predictor your training procedure actually returned",
          "cn": "训练过程实际返回的预测器"
        },
        {
          "sym": "$\\arg\\min_{f \\in F} L_n(f)$",
          "en": "ERM (empirical risk minimization) — minimize loss on the **training** sample",
          "cn": "ERM（经验风险最小化）—— 在**训练**样本上最小化 loss"
        },
        {
          "sym": "$L_n(f) = \\frac{1}{n}\\sum_{i=1}^{n} \\ell(f(x_i), y_i)$",
          "en": "empirical (training) loss",
          "cn": "经验（训练）loss"
        }
      ],
      "usage_en": "What the algorithm actually computes. The gap $L(\\hat{f}) - L(f^*_F)$ is **estimation error** — how much you're hurt by training on a finite sample instead of the true distribution. Shrinks as $n$ grows; bounded by VC theory.",
      "usage_cn": "算法实际计算的对象。差距 $L(\\hat{f}) - L(f^*_F)$ 即 **estimation error** —— 用有限样本训练（而非真实分布）造成的损失。随 $n$ 增长而缩小；VC 理论给出上界。",
      "intuition_en": "'You picked the best on the training set, but the training set wasn't the true world.' The risk of overfitting lives here — large $F$ means many candidates, each with random training-set quirks.",
      "intuition_cn": "\"你在训练集上选了最佳，但训练集不是真实世界。\" 过拟合的风险在这里 —— $F$ 大意味着候选很多，每个都带训练集的随机怪癖。",
      "source": "topics/error-decomposition.html#eq-error-decomposition-learned-predictor"
    }
  ],
  "pac": [
    {
      "title": "Training error",
      "eq": "$$ \\hat\\epsilon_{\\mathcal{D}}(f)=\\frac1n\\sum_{i=1}^n\\mathbf{1}\\{f(x^{(i)})\\ne y^{(i)}\\} $$",
      "symbols": [
        {
          "sym": "$L_n(f)$",
          "en": "empirical (training) loss of $f$",
          "cn": "$f$ 的经验（训练）loss"
        },
        {
          "sym": "$n$",
          "en": "number of training samples",
          "cn": "训练样本数"
        },
        {
          "sym": "$\\ell(f(x_i), y_i)$",
          "en": "per-sample loss (e.g. 0-1 loss, squared loss)",
          "cn": "单样本 loss（如 0-1 loss、平方 loss）"
        },
        {
          "sym": "$\\frac{1}{n} \\sum$",
          "en": "average over the training set",
          "cn": "对训练集求平均"
        }
      ],
      "usage_en": "What ERM minimizes. Reported in training curves; should decrease (or at least not increase) as you train longer. By itself doesn't tell you if the model will generalize — that's what test error and PAC bounds are for.",
      "usage_cn": "ERM 最小化的对象。训练曲线中报告；训练越长应该下降（至少不上升）。单看它无法判断是否泛化 —— 这是测试 error 和 PAC bound 的工作。",
      "intuition_en": "'How well does the predictor fit the data we gave it?' Tells you whether your optimizer is working; says little about future data.",
      "intuition_cn": "\"预测器对我们给的数据拟合得多好？\" 告诉你优化器是否正常工作；对未来数据贡献不大。",
      "source": "topics/pac.html#eq-pac-training-error"
    },
    {
      "title": "Test error",
      "eq": "$$ \\epsilon_\\mu(f)=\\Pr_\\mu(f(X)\\ne Y) $$",
      "symbols": [
        {
          "sym": "$L(f)$",
          "en": "true (population) loss — expectation under the data distribution $\\mathcal{D}$",
          "cn": "真实（总体）loss —— 在数据分布 $\\mathcal{D}$ 下的期望"
        },
        {
          "sym": "$\\mathbb{E}_{(x, y) \\sim \\mathcal{D}}$",
          "en": "expectation over fresh examples drawn from the unknown distribution",
          "cn": "对从未知分布抽取的新样本求期望"
        },
        {
          "sym": "$\\ell(f(x), y)$",
          "en": "per-sample loss on a fresh test point",
          "cn": "新测试点上的单样本 loss"
        }
      ],
      "usage_en": "What you actually care about. Estimated using a held-out test set; PAC theory gives high-probability upper bounds based on training error + a complexity penalty.",
      "usage_cn": "你真正关心的东西。用留出的测试集估计；PAC 理论用 \"训练 error + 复杂度罚项\" 给出高概率上界。",
      "intuition_en": "'How well will the predictor do on data it has never seen?' This is the only quantity that matters at deployment. Training error is a stand-in; test set is a finite-sample estimate; PAC is the worst-case theoretical bound.",
      "intuition_cn": "\"预测器在没见过的数据上表现如何？\" 部署时唯一关心的量。训练 error 是替代；测试集是有限样本估计；PAC 是理论上最坏情况上界。",
      "source": "topics/pac.html#eq-pac-test-error"
    },
    {
      "title": "Finite realizable ERM bound",
      "eq": "$$ n\\ge \\frac1\\epsilon\\left(\\log|\\mathcal{F}|+\\log\\frac1\\delta\\right) $$",
      "symbols": [
        {
          "sym": "$F$",
          "en": "finite hypothesis class with $|F|$ predictors",
          "cn": "有限假设类，含 $|F|$ 个预测器"
        },
        {
          "sym": "$\\hat{f}$",
          "en": "the ERM predictor — minimizes training error in $F$",
          "cn": "ERM 预测器 —— $F$ 内最小化训练 error"
        },
        {
          "sym": "realizable",
          "en": "$F$ contains a perfect classifier ($L_n(f^*) = 0$ achievable)",
          "cn": "realizable —— $F$ 中有完美分类器（可达 $L_n(f^*) = 0$）"
        },
        {
          "sym": "$\\epsilon$",
          "en": "target accuracy gap (smaller → tighter)",
          "cn": "目标精度差距（越小越紧）"
        },
        {
          "sym": "$\\delta$",
          "en": "failure probability (smaller → more confident)",
          "cn": "失败概率（越小越自信）"
        },
        {
          "sym": "$n \\ge \\frac{1}{\\epsilon}(\\ln |F| + \\ln \\frac{1}{\\delta})$",
          "en": "sample-complexity sufficient condition",
          "cn": "样本复杂度的充分条件"
        }
      ],
      "usage_en": "Use to estimate how much training data you need for a finite hypothesis class. Doubling $|F|$ (more candidates) only adds $\\ln 2 / \\epsilon$ samples — logarithmic dependence, very mild. The bound becomes tight when you can verify that $F$ is realizable for the data.",
      "usage_cn": "用来估计有限假设类需要多少训练数据。$|F|$ 翻倍（候选增多）只多需 $\\ln 2 / \\epsilon$ 样本 —— 对数依赖，很温和。当能验证 $F$ 对数据 realizable 时这个 bound 较紧。",
      "intuition_en": "'You need enough samples to rule out every bad hypothesis in $F$ that happens to fit the training data well.' Larger $F$ means more bad hypotheses to rule out; the log dependence is what makes ML tractable for huge classes.",
      "intuition_cn": "\"你需要足够多的样本来排除 $F$ 中所有 \"恰好拟合训练数据\" 的坏假设。\" $F$ 越大要排除的坏假设越多；对数依赖让 ML 在巨大类别上仍然可行。",
      "source": "topics/pac.html#eq-pac-finite-realizable-erm-bound"
    },
    {
      "title": "Agnostic PAC target",
      "eq": "$$ \\Pr\\left(\\epsilon_\\mu(f)\\le \\min_{g\\in\\mathcal{H}}\\epsilon_\\mu(g)+\\epsilon\\right)\\ge 1-\\delta $$",
      "symbols": [
        {
          "sym": "$\\hat{f}$",
          "en": "ERM predictor (output of training)",
          "cn": "ERM 预测器（训练输出）"
        },
        {
          "sym": "$f^*$",
          "en": "best predictor in class — $\\arg\\min_{f \\in F} L(f)$",
          "cn": "类内最佳预测器 —— $\\arg\\min_{f \\in F} L(f)$"
        },
        {
          "sym": "$\\epsilon$",
          "en": "target excess error compared to $f^*$",
          "cn": "相对 $f^*$ 的目标超额误差"
        },
        {
          "sym": "$\\delta$",
          "en": "failure probability",
          "cn": "失败概率"
        },
        {
          "sym": "agnostic",
          "en": "no realizability assumption — $f^*$ may have non-zero error",
          "cn": "无 realizability 假设 —— $f^*$ 可能有非零 error"
        }
      ],
      "usage_en": "More realistic than realizable PAC. Goal becomes: ERM is at most $\\epsilon$ worse than the best-in-class. Sample complexity is now $O(1/\\epsilon^2)$ instead of $O(1/\\epsilon)$ — needs more data because the bound is harder.",
      "usage_cn": "比 realizable PAC 更现实。目标变成：ERM 比类内最佳差不超过 $\\epsilon$。样本复杂度变成 $O(1/\\epsilon^2)$ 而非 $O(1/\\epsilon)$ —— 需要更多数据，因为 bound 更难。",
      "intuition_en": "'I can't promise you'll be perfect, only that you'll be close to the best $F$ has to offer.' Drops the unrealistic assumption that the truth lies in $F$, at the cost of needing more data to certify the result.",
      "intuition_cn": "\"我不能保证你完美，只能保证你接近 $F$ 能提供的最佳。\" 放弃 \"真值在 $F$ 内\" 的不切实际假设，代价是需要更多数据来认证结果。",
      "source": "topics/pac.html#eq-pac-agnostic-pac-target"
    },
    {
      "title": "Bad finite-class ERM failure bound",
      "eq": "$$ \\Pr(\\exists\\text{ bad }f\\in\\mathcal{F}\\text{ consistent with }\\mathcal{D})\\le |\\mathcal{F}|e^{-n\\epsilon} $$",
      "symbols": [
        {
          "sym": "$P(L(\\hat{f}) > \\epsilon)$",
          "en": "probability ERM returns a poorly-generalizing classifier",
          "cn": "ERM 返回泛化差的分类器的概率"
        },
        {
          "sym": "$|F|$",
          "en": "size of hypothesis class — more candidates, more chances of bad luck",
          "cn": "假设类大小 —— 候选越多，运气差的可能越大"
        },
        {
          "sym": "$(1 - \\epsilon)^n$",
          "en": "probability one specific bad classifier survives $n$ samples by chance",
          "cn": "一个具体坏分类器靠运气存活 $n$ 样本的概率"
        },
        {
          "sym": "union bound",
          "en": "sum over $|F|$ candidates → factor of $|F|$",
          "cn": "对 $|F|$ 个候选取并集 → 因子 $|F|$"
        }
      ],
      "usage_en": "Use to derive sample complexity. Setting the right-hand side $\\le \\delta$ and solving for $n$ gives $n \\ge \\frac{1}{\\epsilon}(\\ln|F| + \\ln\\frac{1}{\\delta})$ — exactly the realizable PAC bound.",
      "usage_cn": "用来推导样本复杂度。把右边设 $\\le \\delta$ 解出 $n$ 即得 $n \\ge \\frac{1}{\\epsilon}(\\ln|F| + \\ln\\frac{1}{\\delta})$ —— 正好是 realizable PAC bound。",
      "intuition_en": "'Pretend each bad classifier independently flips a coin per sample with probability $1 - \\epsilon$ of surviving; bound the chance any survive.' Union bound over $|F|$ candidates is loose but gives the famous $\\ln|F|$ scaling.",
      "intuition_cn": "\"假装每个坏分类器对每个样本独立抛硬币，存活概率 $1 - \\epsilon$；bound 住有任何存活的概率。\" 对 $|F|$ 候选用 union bound 虽宽松，却给出著名的 $\\ln|F|$ scaling。",
      "source": "topics/pac.html#eq-pac-example-2-finite-class-erm"
    }
  ],
  "vc-dimension": [
    {
      "title": "Hoeffding",
      "eq": "$$ \\Pr\\left(|\\bar Z_n-\\mathbb{E}\\bar Z_n|\\ge \\epsilon\\right)\\le 2\\exp\\left(-\\frac{2n\\epsilon^2}{(b-a)^2}\\right) $$",
      "symbols": [
        {
          "sym": "$\\bar{X}_n$",
          "en": "sample mean over $n$ i.i.d. observations",
          "cn": "$n$ 个 i.i.d. 观测的样本均值"
        },
        {
          "sym": "$\\mu$",
          "en": "true mean of the underlying distribution",
          "cn": "底层分布的真实均值"
        },
        {
          "sym": "$\\epsilon$",
          "en": "deviation tolerance — how close $\\bar{X}_n$ must be to $\\mu$",
          "cn": "偏差容忍度 —— $\\bar{X}_n$ 离 $\\mu$ 多近"
        },
        {
          "sym": "$2 e^{-2 n \\epsilon^2}$",
          "en": "exponentially small failure probability",
          "cn": "指数级小的失败概率"
        }
      ],
      "usage_en": "Use whenever you want to say 'the empirical average is close to the true mean with high probability'. Foundation of generalization bounds for **one fixed classifier**; combined with union bound or VC theory to extend across classes.",
      "usage_cn": "想说 \"经验均值大概率接近真实均值\" 时使用。**单个固定分类器**泛化 bound 的基础；结合 union bound 或 VC 理论推广到整个类别。",
      "intuition_en": "'Sample averages of bounded random variables concentrate around the true mean exponentially fast.' Doubling $n$ doubles the exponent — getting twice the data makes you exponentially more confident.",
      "intuition_cn": "\"有界随机变量的样本均值以指数速度集中于真实均值。\" 样本数翻倍指数翻倍 —— 多一倍数据指数级更自信。",
      "source": "topics/vc-dimension.html#eq-vc-dimension-hoeffding"
    },
    {
      "title": "Fixed classifier bound",
      "eq": "$$ \\epsilon_\\mu(f)\\le \\hat\\epsilon_{\\mathcal{D}}(f)+\\sqrt{\\frac{\\log(2/\\delta)}{2n}} $$",
      "symbols": [
        {
          "sym": "$L(f)$",
          "en": "true loss of a fixed classifier $f$",
          "cn": "固定分类器 $f$ 的真实 loss"
        },
        {
          "sym": "$L_n(f)$",
          "en": "empirical loss of $f$ on $n$ samples",
          "cn": "$f$ 在 $n$ 样本上的经验 loss"
        },
        {
          "sym": "$\\epsilon$",
          "en": "target gap between true and empirical loss",
          "cn": "真实与经验 loss 的目标差距"
        },
        {
          "sym": "$\\delta = 2 e^{-2 n \\epsilon^2}$",
          "en": "failure probability from Hoeffding",
          "cn": "Hoeffding 给出的失败概率"
        }
      ],
      "usage_en": "Hoeffding applied to a single classifier. Holds **only for $f$ chosen independently of the training data** — does not hold for $\\hat{f}$ chosen by ERM. To handle ERM, you need union bound (finite class) or VC bound (infinite class).",
      "usage_cn": "对单个分类器应用 Hoeffding。**仅对独立于训练数据选定的 $f$** 成立 —— 对 ERM 选出的 $\\hat{f}$ 不成立。要处理 ERM，需要 union bound（有限类）或 VC bound（无限类）。",
      "intuition_en": "'For one classifier picked in advance, training error is a great estimate of test error.' This is why an honest test set works: you commit to the classifier first, then evaluate.",
      "intuition_cn": "\"对于事先选好的一个分类器，训练 error 是测试 error 的很好估计。\" 这就是诚实的测试集为什么能工作：先确定分类器，再评估。",
      "source": "topics/vc-dimension.html#eq-vc-dimension-fixed-classifier-bound"
    },
    {
      "title": "VC dimension definition",
      "eq": "$$ \\operatorname{VCdim}(\\mathcal{F})=\\max\\{|S|:\\mathcal{F}\\text{ shatters }S\\} $$",
      "symbols": [
        {
          "sym": "$\\mathrm{VC}(F)$",
          "en": "VC dimension of hypothesis class $F$",
          "cn": "假设类 $F$ 的 VC 维"
        },
        {
          "sym": "shatter",
          "en": "$F$ can realize **every** labeling of the points (all $2^n$ ways)",
          "cn": "$F$ 能实现这些点的**所有**标注方式（$2^n$ 种）"
        },
        {
          "sym": "largest $n$",
          "en": "biggest sample size where shattering is still possible",
          "cn": "仍能 shatter 的最大样本数"
        }
      ],
      "usage_en": "Compute by exhibiting $n$ points that $F$ shatters (lower bound) and showing no $n+1$ can be shattered (upper bound). Linear classifiers in $\\mathbb{R}^d$: VC = $d+1$. Decision trees with $L$ leaves: VC $\\le L \\log L$. Neural nets: VC scales with parameters.",
      "usage_cn": "通过 \"展示 $n$ 个能被 $F$ shatter 的点\"（下界）和 \"证明任何 $n+1$ 个都不能 shatter\"（上界）来计算。$\\mathbb{R}^d$ 中线性分类器：VC = $d+1$。叶节点数 $L$ 的决策树：VC $\\le L \\log L$。神经网络：VC 与参数量同阶。",
      "intuition_en": "'How many points can the class label arbitrarily?' A higher VC dimension means a richer class — more flexible to fit data, but also more prone to overfitting. The 'effective complexity' of the class.",
      "intuition_cn": "\"该类能任意标注多少个点？\" VC 维越高类越丰富 —— 拟合能力强但更容易过拟合。是该类的 \"有效复杂度\"。",
      "source": "topics/vc-dimension.html#eq-vc-dimension-vc-dimension-definition"
    },
    {
      "title": "Typical VC-style bound",
      "eq": "$$ \\epsilon_\\mu(f)\\le \\hat\\epsilon_{\\mathcal{D}}(f)+\\mathcal{O}\\!\\left(\\sqrt{\\frac{\\operatorname{VCdim}(\\mathcal{F})+\\log(1/\\delta)}{n}}\\right) $$",
      "symbols": [
        {
          "sym": "$L(\\hat{f})$",
          "en": "true loss of the ERM predictor",
          "cn": "ERM 预测器的真实 loss"
        },
        {
          "sym": "$L_n(\\hat{f})$",
          "en": "training loss of the ERM predictor",
          "cn": "ERM 预测器的训练 loss"
        },
        {
          "sym": "$d$",
          "en": "VC dimension of the class $F$",
          "cn": "类 $F$ 的 VC 维"
        },
        {
          "sym": "$O\\!\\left(\\sqrt{(d \\log(n/d) + \\log(1/\\delta))/n}\\right)$",
          "en": "complexity penalty (decreases with more data)",
          "cn": "复杂度罚项（数据越多越小）"
        }
      ],
      "usage_en": "Use to bound generalization for **infinite** hypothesis classes. Sample complexity scales as $n = O(d / \\epsilon^2)$ — linear in VC dimension. This is how you justify that 'more data → better generalization' even for very expressive models.",
      "usage_cn": "用来 bound **无限**假设类的泛化。样本复杂度 $n = O(d / \\epsilon^2)$ —— 与 VC 维线性相关。这就是为什么 \"数据越多 → 泛化越好\" 对表达力极强的模型也成立。",
      "intuition_en": "'Test error ≤ training error + a penalty that grows with class complexity and shrinks with data size.' The bound is loose for deep nets in practice (deep learning's mystery), but it's the right mental model for classical ML.",
      "intuition_cn": "\"测试 error ≤ 训练 error + 一个 \"复杂度大就大、数据多就小\" 的罚项。\" 这个 bound 对深度网络实际上很松（深度学习之谜），但对经典 ML 是正确的心智模型。",
      "source": "topics/vc-dimension.html#eq-vc-dimension-typical-vc-style-bound"
    }
  ],
  "mdp": [
    {
      "title": "MDP tuple",
      "eq": "$$ \\mathcal{M}=(\\mathcal{S},\\mathcal{A},P,R,\\gamma) $$",
      "source": "topics/mdp.html#eq-mdp-mdp-tuple",
      "intuition_en": "An MDP is the full mathematical description of an RL environment: states, actions, dynamics, rewards, and how much future reward is discounted.",
      "intuition_cn": "MDP 是 RL 环境的完整数学描述：状态、动作、环境转移、奖励，以及未来奖励如何折扣。",
      "usage_en": "For any RL word problem, first identify these five pieces. Value functions, Bellman equations, DP, and Q-learning all plug into this tuple.",
      "usage_cn": "做任何 RL 题先把这五项列出来。后面的 value function、Bellman equation、DP、Q-learning 都是在这个 tuple 上计算。",
      "symbols": [
        {
          "sym": "M",
          "en": "the environment/MDP",
          "cn": "整个环境 / MDP"
        },
        {
          "sym": "S",
          "en": "state space",
          "cn": "状态集合"
        },
        {
          "sym": "A",
          "en": "action space",
          "cn": "动作集合"
        },
        {
          "sym": "P",
          "en": "transition rule P(s'|s,a)",
          "cn": "转移概率 P(s'|s,a)"
        },
        {
          "sym": "R",
          "en": "reward function",
          "cn": "奖励函数"
        },
        {
          "sym": "γ",
          "en": "discount factor, usually in [0,1)",
          "cn": "折扣因子，通常在 [0,1)"
        }
      ]
    },
    {
      "title": "Markov property",
      "eq": "$$ \\Pr(S_{t+1}=s'\\mid S_t=s,A_t=a,\\text{history})=\\Pr(S_{t+1}=s'\\mid S_t=s,A_t=a) $$",
      "source": "topics/mdp.html#eq-mdp-markov-property",
      "intuition_en": "Once the current state and action are known, the old history gives no extra information about the next state.",
      "intuition_cn": "只要知道当前 state 和 action，过去完整 history 就不再提供额外信息。state 必须已经总结了有用的过去。",
      "usage_en": "Use this to check whether a state representation is valid. If the next state still depends on hidden past facts, enlarge the state.",
      "usage_cn": "用它检查 state 设计是否合理。如果下一步还依赖没放进 state 的历史信息，就要扩充 state。",
      "symbols": [
        {
          "sym": "S_t",
          "en": "state at time t",
          "cn": "t 时刻状态"
        },
        {
          "sym": "A_t",
          "en": "action at time t",
          "cn": "t 时刻动作"
        },
        {
          "sym": "s'",
          "en": "candidate next state",
          "cn": "可能的下一状态"
        },
        {
          "sym": "history",
          "en": "all earlier states/actions/rewards",
          "cn": "之前所有状态、动作、奖励"
        },
        {
          "sym": "Pr",
          "en": "probability",
          "cn": "概率"
        }
      ]
    },
    {
      "title": "Trajectory",
      "eq": "$$ \\tau=(s_0,a_0,r_1,s_1,a_1,r_2,\\ldots,s_H) $$",
      "source": "topics/mdp.html#eq-mdp-trajectory",
      "intuition_en": "A trajectory is one sampled rollout through the environment: state, action, reward, next state, and so on.",
      "intuition_cn": "Trajectory 是一次 rollout 的完整交互路径：状态、动作、奖励、下一个状态，如此重复。",
      "usage_en": "Use trajectories as data for Monte-Carlo estimates, policy gradient, and model-free updates.",
      "usage_cn": "Trajectory 是 Monte-Carlo estimate、policy gradient、model-free RL 更新用的数据。",
      "symbols": [
        {
          "sym": "τ",
          "en": "one trajectory/rollout",
          "cn": "一条轨迹 / rollout"
        },
        {
          "sym": "s_t",
          "en": "state at step t",
          "cn": "第 t 步状态"
        },
        {
          "sym": "a_t",
          "en": "action at step t",
          "cn": "第 t 步动作"
        },
        {
          "sym": "r_t",
          "en": "reward around step t",
          "cn": "第 t 步附近的奖励"
        },
        {
          "sym": "H",
          "en": "horizon/last step",
          "cn": "时域长度 / 最后一步"
        }
      ]
    },
    {
      "title": "Deterministic policy",
      "eq": "$$ \\pi:\\mathcal{S}\\to\\mathcal{A},\\qquad a_t=\\pi(s_t) $$",
      "source": "topics/mdp.html#eq-mdp-deterministic-policy",
      "intuition_en": "A deterministic policy chooses one fixed action for each state.",
      "intuition_cn": "确定性策略表示：每个 state 都对应一个固定 action。",
      "usage_en": "Use it when the policy has no randomness, often after taking argmax over Q-values.",
      "usage_cn": "当策略不带随机性时使用，常见于从 Q-values 里取 argmax 得到的 greedy policy。",
      "symbols": [
        {
          "sym": "π",
          "en": "policy",
          "cn": "策略"
        },
        {
          "sym": "S -> A",
          "en": "maps each state to an action",
          "cn": "把状态映射到动作"
        },
        {
          "sym": "a_t",
          "en": "chosen action",
          "cn": "实际选择的动作"
        },
        {
          "sym": "s_t",
          "en": "current state",
          "cn": "当前状态"
        }
      ]
    },
    {
      "title": "Stochastic policy",
      "eq": "$$ \\pi:\\mathcal{S}\\to\\Delta(\\mathcal{A}),\\qquad a_t\\sim\\pi(\\cdot\\mid s_t) $$",
      "source": "topics/mdp.html#eq-mdp-stochastic-policy",
      "intuition_en": "A stochastic policy returns a probability distribution over actions, then samples an action.",
      "intuition_cn": "随机策略给出动作概率分布，然后从这个分布里采样 action。",
      "usage_en": "Use it for exploration, policy gradient, softmax policies, and LLM token sampling.",
      "usage_cn": "用于 exploration、policy gradient、softmax policy，以及 LLM 的 token sampling。",
      "symbols": [
        {
          "sym": "Δ(A)",
          "en": "all probability distributions over actions",
          "cn": "动作集合 A 上的所有概率分布"
        },
        {
          "sym": "π(·|s)",
          "en": "action distribution in state s",
          "cn": "状态 s 下的动作分布"
        },
        {
          "sym": "a_t ~",
          "en": "a_t is sampled from that distribution",
          "cn": "a_t 从该分布采样"
        }
      ]
    },
    {
      "title": "Discounted return objective",
      "eq": "$$ \\mathbb{E}_{\\pi,P}\\left[\\sum_{t=0}^{\\infty}\\gamma^t r_t\\mid S_0=s_0\\right] $$",
      "source": "topics/mdp.html#eq-mdp-discounted-return-objective",
      "intuition_en": "The objective is expected future reward, with farther rewards multiplied by smaller powers of γ.",
      "intuition_cn": "目标是未来总奖励的期望；越远的奖励乘上越高次的 γ，因此影响被折扣。",
      "usage_en": "Use this as the RL optimization target. γ near 0 focuses on immediate reward; γ near 1 values long-term reward.",
      "usage_cn": "这是 RL 的优化目标。γ 接近 0 更看重即时奖励；γ 接近 1 更看重长期回报。",
      "symbols": [
        {
          "sym": "E_{π,P}",
          "en": "expectation over policy actions and environment transitions",
          "cn": "对策略动作和环境转移取期望"
        },
        {
          "sym": "γ^t",
          "en": "discount at time t",
          "cn": "第 t 步折扣"
        },
        {
          "sym": "r_t",
          "en": "reward at time t",
          "cn": "第 t 步奖励"
        },
        {
          "sym": "S_0=s_0",
          "en": "start state is s_0",
          "cn": "初始状态为 s_0"
        }
      ]
    }
  ],
  "value-functions": [
    {
      "title": "State value",
      "eq": "$$ V^\\pi(s)=\\mathbb{E}\\left[\\sum_{t=0}^{\\infty}\\gamma^t r_t\\mid \\pi,S_0=s\\right] $$",
      "source": "topics/value-functions.html#eq-value-functions-state-value",
      "intuition_en": "V^π(s) asks: starting from state s and following policy π, how much discounted reward should I expect?",
      "intuition_cn": "V^π(s) 问：从状态 s 出发，之后按策略 π 行动，期望能拿到多少折扣总回报？",
      "usage_en": "Use V to score states. Bellman backups replace a next state by its value V^π(s').",
      "usage_cn": "用 V 给 state 打分。Bellman backup 里，下一状态 s' 的未来价值用 V^π(s') 表示。",
      "symbols": [
        {
          "sym": "V^π(s)",
          "en": "value of state s under π",
          "cn": "策略 π 下状态 s 的价值"
        },
        {
          "sym": "E",
          "en": "average over random actions/transitions",
          "cn": "对随机动作和转移取平均"
        },
        {
          "sym": "γ^t r_t",
          "en": "discounted reward at time t",
          "cn": "第 t 步折扣奖励"
        },
        {
          "sym": "S_0=s",
          "en": "start from state s",
          "cn": "从状态 s 开始"
        }
      ]
    },
    {
      "title": "Action value",
      "eq": "$$ Q^\\pi(s,a)=\\mathbb{E}\\left[\\sum_{t=0}^{\\infty}\\gamma^t r_t\\mid \\pi,S_0=s,A_0=a\\right] $$",
      "source": "topics/value-functions.html#eq-value-functions-action-value",
      "intuition_en": "Q^π(s,a) asks: starting in state s, first take action a, then follow π; what return should I expect?",
      "intuition_cn": "Q^π(s,a) 问：在状态 s 先做动作 a，然后按策略 π 行动，期望回报是多少？",
      "usage_en": "Use Q to compare actions in the same state. A greedy policy chooses the action with largest Q.",
      "usage_cn": "用 Q 在同一个 state 里比较不同 action。Greedy policy 会选 Q 最大的动作。",
      "symbols": [
        {
          "sym": "Q^π(s,a)",
          "en": "value of action a in state s under π",
          "cn": "策略 π 下在状态 s 做动作 a 的价值"
        },
        {
          "sym": "A_0=a",
          "en": "first action is fixed to a",
          "cn": "第一步动作固定为 a"
        },
        {
          "sym": "S_0=s",
          "en": "start state is s",
          "cn": "初始状态是 s"
        }
      ]
    },
    {
      "title": "Relationship under a policy",
      "eq": "$$ V^\\pi(s)=\\mathbb{E}_{a\\sim\\pi(\\cdot\\mid s)}[Q^\\pi(s,a)] $$",
      "source": "topics/value-functions.html#eq-value-functions-relationship-under-a-policy",
      "intuition_en": "State value is the policy-weighted average of action values in that state.",
      "intuition_cn": "State value 就是在该 state 下，按策略 π 的动作分布对 Q-value 做加权平均。",
      "usage_en": "Use it to convert between V and Q. For deterministic π, it becomes V^π(s)=Q^π(s,π(s)).",
      "usage_cn": "用它在 V 和 Q 之间转换。若 π 是确定性策略，就变成 V^π(s)=Q^π(s,π(s))。",
      "symbols": [
        {
          "sym": "a ~ π(·|s)",
          "en": "sample an action from π at state s",
          "cn": "在状态 s 按 π 采样动作"
        },
        {
          "sym": "Q^π(s,a)",
          "en": "value of that action",
          "cn": "该动作的 Q-value"
        },
        {
          "sym": "E",
          "en": "weighted average over actions",
          "cn": "对动作做加权平均"
        }
      ]
    },
    {
      "title": "Bellman evaluation equation",
      "eq": "$$ Q^\\pi(s,a)=R(s,a)+\\gamma\\mathbb{E}_{s'\\sim P(\\cdot\\mid s,a)}[V^\\pi(s')] $$",
      "source": "topics/value-functions.html#eq-value-functions-bellman-evaluation-equation",
      "intuition_en": "Q equals immediate reward plus discounted expected value of the next state.",
      "intuition_cn": "Q 等于“即时奖励 + 下一状态未来价值的折扣期望”。这是固定策略下的一步自洽方程。",
      "usage_en": "Use it to evaluate a known policy: repeatedly update Q or V until both sides agree.",
      "usage_cn": "用来评估已知策略：反复更新 Q 或 V，直到公式左右两边基本一致。",
      "symbols": [
        {
          "sym": "R(s,a)",
          "en": "immediate reward",
          "cn": "即时奖励"
        },
        {
          "sym": "s' ~ P(·|s,a)",
          "en": "next state sampled from dynamics",
          "cn": "下一状态由环境转移采样"
        },
        {
          "sym": "γ E[V^π(s')]",
          "en": "discounted average future value",
          "cn": "折扣后的平均未来价值"
        }
      ]
    },
    {
      "title": "Matrix form for finite MDPs",
      "eq": "$$ V^\\pi=R^\\pi+\\gamma P^\\pi V^\\pi,\\qquad V^\\pi=(I-\\gamma P^\\pi)^{-1}R^\\pi $$",
      "source": "topics/value-functions.html#eq-value-functions-matrix-form-for-finite-mdps",
      "intuition_en": "For finite states and fixed π, all Bellman equations form one linear system.",
      "intuition_cn": "有限状态空间、固定策略下，所有 Bellman 方程可以合并成一个线性方程组。",
      "usage_en": "Use it when P^π and R^π are known: solve directly instead of iterating.",
      "usage_cn": "当 P^π 和 R^π 已知时，可以直接解线性系统，而不是反复迭代。",
      "symbols": [
        {
          "sym": "V^π",
          "en": "vector of all state values",
          "cn": "所有状态价值向量"
        },
        {
          "sym": "R^π",
          "en": "reward vector under π",
          "cn": "策略 π 下奖励向量"
        },
        {
          "sym": "P^π",
          "en": "transition matrix under π",
          "cn": "策略 π 下状态转移矩阵"
        },
        {
          "sym": "I",
          "en": "identity matrix",
          "cn": "单位矩阵"
        }
      ]
    }
  ],
  "bellman": [
    {
      "title": "Policy Q-value",
      "eq": "$$ Q^\\pi(s,a)=\\mathbb{E}_\\pi\\!\\left[\\sum_{t=0}^{\\infty}\\gamma^t r_t\\mid s_0=s,a_0=a\\right] $$",
      "source": "topics/bellman.html#eq-bellman-policy-q-value",
      "intuition_en": "Definition of Q under a fixed policy: force action a first, then follow π and average future discounted rewards.",
      "intuition_cn": "固定策略下 Q 的定义：先强制做动作 a，然后按 π 继续行动，对未来折扣奖励求期望。",
      "usage_en": "Use it when asked for the value of a state-action pair under a given policy.",
      "usage_cn": "题目问某策略下 state-action pair 的价值时，用这个定义。",
      "symbols": [
        {
          "sym": "Q^π(s,a)",
          "en": "state-action value under π",
          "cn": "策略 π 下的状态-动作价值"
        },
        {
          "sym": "s_0=s, a_0=a",
          "en": "initial state/action are fixed",
          "cn": "初始状态和动作固定"
        },
        {
          "sym": "γ^t r_t",
          "en": "discounted reward sequence",
          "cn": "折扣奖励序列"
        }
      ]
    },
    {
      "title": "Policy Bellman equation",
      "eq": "$$ Q^\\pi(s,a)=R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)\\sum_{a'}\\pi(a'\\mid s')Q^\\pi(s',a') $$",
      "source": "topics/bellman.html#eq-bellman-policy-bellman-equation",
      "intuition_en": "Expands Q into immediate reward, then averages over next states and next actions chosen by π.",
      "intuition_cn": "把 Q 展开成即时奖励，然后对下一状态以及策略 π 选择的下一动作做平均。",
      "usage_en": "Use it for policy evaluation when transition probabilities and policy probabilities are known.",
      "usage_cn": "当转移概率和策略概率已知时，用它做 policy evaluation。",
      "symbols": [
        {
          "sym": "Σ_{s'}P(s'|s,a)",
          "en": "average over possible next states",
          "cn": "对可能下一状态加权平均"
        },
        {
          "sym": "Σ_{a'}π(a'|s')",
          "en": "average over next actions from π",
          "cn": "对 π 在下一状态会选的动作加权平均"
        },
        {
          "sym": "Q^π(s',a')",
          "en": "future state-action value",
          "cn": "后续 state-action 的价值"
        }
      ]
    },
    {
      "title": "Optimality equations",
      "eq": "$$ V^*(s)=\\max_{a\\in\\mathcal{A}}Q^*(s,a) $$\n$$ Q^*(s,a)=R(s,a)+\\gamma\\mathbb{E}_{s'\\sim P(\\cdot\\mid s,a)}[V^*(s')] $$",
      "source": "topics/bellman.html#eq-bellman-optimality-equations",
      "intuition_en": "Optimal value assumes the best action is chosen at every step.",
      "intuition_cn": "最优价值假设每一步都选最好的动作。V* 是 Q* 对动作取最大；Q* 是即时奖励加下一状态最优价值。",
      "usage_en": "Use these equations to derive value iteration, optimal Bellman backups, and optimal policies.",
      "usage_cn": "用它推导 value iteration、Bellman optimality backup，以及最优策略。",
      "symbols": [
        {
          "sym": "V*(s)",
          "en": "optimal state value",
          "cn": "状态 s 的最优价值"
        },
        {
          "sym": "Q*(s,a)",
          "en": "optimal value after taking action a",
          "cn": "先做 a 后的最优价值"
        },
        {
          "sym": "max_a",
          "en": "choose the best action",
          "cn": "在动作中取最大"
        },
        {
          "sym": "E_{s'}",
          "en": "average over next states",
          "cn": "对下一状态取期望"
        }
      ]
    },
    {
      "title": "Greedy optimal policy",
      "eq": "$$ \\pi^*(s)=\\arg\\max_{a\\in\\mathcal{A}}Q^*(s,a) $$",
      "source": "topics/bellman.html#eq-bellman-greedy-optimal-policy",
      "intuition_en": "Once Q* is known, choose the action with the largest Q* in each state.",
      "intuition_cn": "一旦知道 Q*，每个 state 的最优动作就是让 Q* 最大的动作。",
      "usage_en": "Use it as the final extraction step after value iteration or Q-learning estimates Q*.",
      "usage_cn": "Value iteration 或 Q-learning 估出 Q* 后，用这个公式抽取最终策略。",
      "symbols": [
        {
          "sym": "π*(s)",
          "en": "optimal action in state s",
          "cn": "状态 s 的最优动作"
        },
        {
          "sym": "argmax_a",
          "en": "the action that maximizes Q*",
          "cn": "使 Q* 最大的动作"
        },
        {
          "sym": "Q*(s,a)",
          "en": "optimal action-value",
          "cn": "最优 action-value"
        }
      ]
    },
    {
      "title": "Bellman optimality operator contraction",
      "eq": "$$ (TV)(s)=\\max_a\\left[R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)V(s')\\right] $$\n$$ \\lVert TV-TU\\rVert_\\infty\\le \\gamma\\lVert V-U\\rVert_\\infty $$",
      "source": "topics/bellman.html#eq-bellman-bellman-optimality-operator-contraction",
      "intuition_en": "T is one optimal Bellman backup. The contraction inequality says repeated backups shrink value-function error by a factor at most γ.",
      "intuition_cn": "T 表示做一次最优 Bellman backup。Contraction 不等式说明反复 backup 会让 value function 误差按 γ 收缩。",
      "usage_en": "Use it to justify convergence of value iteration: because γ<1, repeated T approaches the unique fixed point V*.",
      "usage_cn": "用它解释 value iteration 为什么收敛：因为 γ<1，反复套 T 会逼近唯一不动点 V*。",
      "symbols": [
        {
          "sym": "T",
          "en": "Bellman optimality operator",
          "cn": "Bellman 最优算子"
        },
        {
          "sym": "||·||∞",
          "en": "largest absolute difference over states",
          "cn": "所有状态最大绝对差"
        },
        {
          "sym": "U,V",
          "en": "two candidate value functions",
          "cn": "两个候选 value function"
        },
        {
          "sym": "γ",
          "en": "discount/contraction factor",
          "cn": "折扣 / 收缩系数"
        }
      ]
    }
  ],
  "dynamic-programming": [
    {
      "title": "Finite-horizon DP backup",
      "eq": "$$ Q_t(s,a)=R(s,a)+\\mathbb{E}_{s_{t+1}\\sim P(\\cdot|s,a)}\\!\\left[\\max_{a'}Q_{t+1}(s_{t+1},a')\\right] $$",
      "source": "topics/dynamic-programming.html#eq-dynamic-programming-finite-horizon-dp-backup",
      "intuition_en": "At time t, value equals immediate reward plus the best value available at the next time step.",
      "intuition_cn": "有限时域里，第 t 步价值等于即时奖励加下一步能拿到的最佳价值。",
      "usage_en": "Use backward induction: start from terminal time and compute values backward to the start.",
      "usage_cn": "用 backward induction：从终点往前算，一直算回起点。",
      "symbols": [
        {
          "sym": "Q_t(s,a)",
          "en": "value at time t",
          "cn": "第 t 步 state-action 价值"
        },
        {
          "sym": "Q_{t+1}",
          "en": "next-time value table",
          "cn": "下一时刻价值表"
        },
        {
          "sym": "max_{a'}",
          "en": "choose best next action",
          "cn": "选择下一步最优动作"
        },
        {
          "sym": "P(·|s,a)",
          "en": "next-state distribution",
          "cn": "下一状态分布"
        }
      ]
    },
    {
      "title": "Value iteration",
      "eq": "$$ Q^{(k)}(s,a)=R(s,a)+\\gamma\\mathbb{E}_{s'\\sim P(\\cdot|s,a)}\\!\\left[\\max_{a'}Q^{(k-1)}(s',a')\\right] $$",
      "source": "topics/dynamic-programming.html#eq-dynamic-programming-value-iteration",
      "intuition_en": "Each iteration rebuilds Q from one-step reward plus the best previous estimate of future value.",
      "intuition_cn": "每轮迭代用“一步奖励 + 上一轮估计的最佳未来价值”来更新 Q。",
      "usage_en": "Use it when P,R are known and you want Q*. Repeat until values stop changing much.",
      "usage_cn": "当 P,R 已知且想求 Q* 时使用。重复更新，直到 value 变化很小。",
      "symbols": [
        {
          "sym": "Q^(k)",
          "en": "Q estimate at iteration k",
          "cn": "第 k 轮 Q 估计"
        },
        {
          "sym": "Q^(k-1)",
          "en": "previous estimate",
          "cn": "上一轮估计"
        },
        {
          "sym": "γ",
          "en": "discount factor",
          "cn": "折扣因子"
        },
        {
          "sym": "max_{a'}",
          "en": "best next action under current estimate",
          "cn": "当前估计下最佳下一动作"
        }
      ]
    },
    {
      "title": "Policy evaluation",
      "eq": "$$ V^\\pi=R^\\pi+\\gamma P^\\pi V^\\pi $$\n$$ V^\\pi=(I-\\gamma P^\\pi)^{-1}R^\\pi $$",
      "source": "topics/dynamic-programming.html#eq-dynamic-programming-policy-evaluation",
      "intuition_en": "For a fixed policy, the value vector satisfies a linear Bellman equation.",
      "intuition_cn": "固定策略下，value vector 满足线性的 Bellman 方程。",
      "usage_en": "Use V=(I-γP)^{-1}R for small finite MDPs, or iterative evaluation for large ones.",
      "usage_cn": "小型有限 MDP 可直接用 V=(I-γP)^{-1}R；大型问题通常用迭代 evaluation。",
      "symbols": [
        {
          "sym": "V^π",
          "en": "value vector under π",
          "cn": "策略 π 下价值向量"
        },
        {
          "sym": "P^π",
          "en": "transition matrix induced by π",
          "cn": "策略 π 诱导出的转移矩阵"
        },
        {
          "sym": "R^π",
          "en": "reward vector induced by π",
          "cn": "策略 π 诱导出的奖励向量"
        },
        {
          "sym": "(I-γP^π)^{-1}",
          "en": "matrix inverse solving the linear system",
          "cn": "解线性方程组的矩阵逆"
        }
      ]
    },
    {
      "title": "Policy improvement",
      "eq": "$$ \\pi_{\\text{new}}(s)=\\arg\\max_a\\left[R(s,a)+\\gamma\\mathbb{E}_{s'}V^\\pi(s')\\right] $$",
      "source": "topics/dynamic-programming.html#eq-dynamic-programming-policy-improvement",
      "intuition_en": "After evaluating π, improve it by choosing the action with the largest one-step lookahead value.",
      "intuition_cn": "评估完策略 π 后，用一步前瞻选择价值最大的动作，从而改进策略。",
      "usage_en": "Use this in policy iteration: evaluate π, greedify π, repeat.",
      "usage_cn": "这是 policy iteration 的 improvement 步：evaluate π，再 greedify π，循环。",
      "symbols": [
        {
          "sym": "π_new(s)",
          "en": "improved action in state s",
          "cn": "状态 s 的改进后动作"
        },
        {
          "sym": "argmax_a",
          "en": "action maximizing lookahead",
          "cn": "让前瞻价值最大的动作"
        },
        {
          "sym": "R(s,a)",
          "en": "immediate reward",
          "cn": "即时奖励"
        },
        {
          "sym": "E_{s'}V^π(s')",
          "en": "expected next-state value",
          "cn": "下一状态期望价值"
        }
      ]
    },
    {
      "title": "Geometric convergence idea",
      "eq": "$$ \\lVert Q^{(k)}-Q^*\\rVert_\\infty\\le \\gamma^k\\lVert Q^{(0)}-Q^*\\rVert_\\infty $$",
      "source": "topics/dynamic-programming.html#eq-dynamic-programming-geometric-convergence-idea",
      "intuition_en": "The distance from current Q to Q* shrinks like γ^k.",
      "intuition_cn": "当前 Q 估计和最优 Q* 的距离会像 γ^k 一样几何下降。",
      "usage_en": "Use it to reason about iteration count: smaller γ converges faster; γ near 1 needs more iterations.",
      "usage_cn": "用它估计迭代速度：γ 越小收敛越快；γ 接近 1 时需要更多轮。",
      "symbols": [
        {
          "sym": "||·||∞",
          "en": "maximum absolute error over state-action pairs",
          "cn": "所有 state-action pair 最大绝对误差"
        },
        {
          "sym": "Q^(k)",
          "en": "estimate after k iterations",
          "cn": "第 k 轮后的估计"
        },
        {
          "sym": "Q*",
          "en": "optimal Q function",
          "cn": "最优 Q 函数"
        },
        {
          "sym": "γ^k",
          "en": "error shrink factor",
          "cn": "k 轮后的误差缩小因子"
        }
      ]
    }
  ],
  "q-learning": [
    {
      "title": "TD target",
      "eq": "$$ y=r+\\gamma\\max_{a'}Q(s',a') $$",
      "source": "topics/q-learning.html#eq-q-learning-td-target",
      "intuition_en": "The target is observed reward now plus discounted best estimated value of the next state.",
      "intuition_cn": "TD target 表示：现在观察到的奖励 + 下一状态里当前估计的最佳未来价值。",
      "usage_en": "Use y as the supervised target when updating Q(s,a) from a sampled transition (s,a,r,s').",
      "usage_cn": "从样本转移 (s,a,r,s') 更新 Q(s,a) 时，把 y 当成 supervised target。",
      "symbols": [
        {
          "sym": "y",
          "en": "temporal-difference target",
          "cn": "TD 更新目标"
        },
        {
          "sym": "r",
          "en": "observed reward",
          "cn": "本次观察到的奖励"
        },
        {
          "sym": "s'",
          "en": "next state",
          "cn": "下一状态"
        },
        {
          "sym": "max_{a'}Q(s',a')",
          "en": "best estimated next-state value",
          "cn": "下一状态最佳估计价值"
        }
      ]
    },
    {
      "title": "Incremental update",
      "eq": "$$ Q(s,a)\\leftarrow Q(s,a)+\\alpha\\big[y-Q(s,a)\\big] $$",
      "source": "topics/q-learning.html#eq-q-learning-incremental-update",
      "intuition_en": "Move the old Q estimate a fraction α toward the TD target. The bracket is the TD error.",
      "intuition_cn": "把旧 Q 估计朝 TD target 移动 α 的比例。中括号 y-Q(s,a) 是 TD error。",
      "usage_en": "Use this online after each sampled transition. α controls how strongly new evidence overrides the old estimate.",
      "usage_cn": "每采样到一个 transition 就可在线更新一次。α 控制新样本覆盖旧估计的力度。",
      "symbols": [
        {
          "sym": "α",
          "en": "learning rate",
          "cn": "学习率"
        },
        {
          "sym": "y-Q(s,a)",
          "en": "TD error",
          "cn": "TD 误差"
        },
        {
          "sym": "←",
          "en": "replace old value with updated value",
          "cn": "用更新后的值替换旧值"
        },
        {
          "sym": "Q(s,a)",
          "en": "current estimate",
          "cn": "当前估计值"
        }
      ]
    },
    {
      "title": "Moving-average form",
      "eq": "$$ Q'(s,a)=(1-\\alpha)Q(s,a)+\\alpha\\left(r+\\gamma\\max_{a'}Q(s',a')\\right) $$",
      "source": "topics/q-learning.html#eq-q-learning-moving-average-form",
      "intuition_en": "Same update as a weighted average: keep 1-α of the old estimate and mix in α of the new target.",
      "intuition_cn": "这是同一个更新的加权平均写法：保留 1-α 的旧估计，混入 α 的新 target。",
      "usage_en": "Use this form to understand stability: small α is smoother; large α reacts faster but is noisier.",
      "usage_cn": "用这个形式理解稳定性：α 小更平滑；α 大反应更快但更噪。",
      "symbols": [
        {
          "sym": "Q'(s,a)",
          "en": "updated Q value",
          "cn": "更新后的 Q 值"
        },
        {
          "sym": "1-α",
          "en": "weight on old estimate",
          "cn": "旧估计权重"
        },
        {
          "sym": "α",
          "en": "weight on target",
          "cn": "新 target 权重"
        },
        {
          "sym": "r+γ max Q",
          "en": "TD target",
          "cn": "TD target"
        }
      ]
    },
    {
      "title": "Greedy policy from Q",
      "eq": "$$ \\pi(s)=\\arg\\max_a Q(s,a) $$",
      "source": "topics/q-learning.html#eq-q-learning-greedy-policy-from-q",
      "intuition_en": "After Q is learned, choose the action with highest estimated value in each state.",
      "intuition_cn": "学到 Q 后，每个 state 选择估计价值最高的 action。",
      "usage_en": "Use it at test time or to extract a deterministic policy. During training, often add exploration such as ε-greedy.",
      "usage_cn": "测试时或抽取确定性策略时使用。训练时通常还要加 exploration，例如 ε-greedy。",
      "symbols": [
        {
          "sym": "π(s)",
          "en": "chosen policy action",
          "cn": "策略选择的动作"
        },
        {
          "sym": "argmax_a",
          "en": "action maximizing Q",
          "cn": "让 Q 最大的动作"
        },
        {
          "sym": "Q(s,a)",
          "en": "learned action-value estimate",
          "cn": "学到的 action-value 估计"
        }
      ]
    }
  ],
  "policy-gradient": [
    {
      "title": "Policy-gradient objective",
      "eq": "$$ J(\\theta)=\\mathbb{E}_{\\tau\\sim P^{\\pi_\\theta}}[R(\\tau)] $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-policy-gradient-objective",
      "intuition_en": "The objective is expected trajectory reward under the current parameterized policy.",
      "intuition_cn": "目标是在当前参数化策略下，让采样 trajectory 的期望回报最大。",
      "usage_en": "Use it as the starting point for REINFORCE/policy-gradient derivations: differentiate J with respect to θ.",
      "usage_cn": "推导 REINFORCE / policy gradient 时从这里开始：对 θ 求梯度。",
      "symbols": [
        {
          "sym": "J(θ)",
          "en": "policy objective",
          "cn": "策略目标函数"
        },
        {
          "sym": "θ",
          "en": "policy parameters",
          "cn": "策略参数"
        },
        {
          "sym": "τ ~ P^{π_θ}",
          "en": "trajectory sampled by policy and environment",
          "cn": "由策略和环境采样出的轨迹"
        },
        {
          "sym": "R(τ)",
          "en": "trajectory return",
          "cn": "整条轨迹回报"
        }
      ]
    },
    {
      "title": "Monte-Carlo estimator",
      "eq": "$$ \\nabla_\\theta J(\\theta)\\approx \\frac1N\\sum_{i=1}^{N}R(\\tau_i)\\sum_{t=0}^{H}\\nabla_\\theta\\log\\pi_\\theta(a_t^i\\mid s_t^i) $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-monte-carlo-estimator",
      "intuition_en": "Estimate the gradient from sampled trajectories: high-return trajectories increase log-probability of the actions they took.",
      "intuition_cn": "用采样 trajectories 估计梯度：高回报轨迹会提高其中动作的 log-probability。",
      "usage_en": "Use this when rollouts are available but the environment is not differentiable. Average N trajectories to reduce noise.",
      "usage_cn": "当能采样 rollout、但不能对环境求导时使用。对 N 条轨迹取平均可以降低噪声。",
      "symbols": [
        {
          "sym": "N",
          "en": "number of sampled trajectories",
          "cn": "采样轨迹数量"
        },
        {
          "sym": "R(τ_i)",
          "en": "return of trajectory i",
          "cn": "第 i 条轨迹回报"
        },
        {
          "sym": "∇θ log πθ(a_t^i|s_t^i)",
          "en": "direction changing probability of sampled action",
          "cn": "改变该采样动作概率的梯度方向"
        },
        {
          "sym": "H",
          "en": "trajectory horizon",
          "cn": "轨迹长度"
        }
      ]
    },
    {
      "title": "Advantage version",
      "eq": "$$ \\nabla J\\approx \\mathbb{E}[A^\\pi(s_t,a_t)\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)] $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-advantage-version",
      "intuition_en": "Replace raw return by advantage so actions are reinforced only when they are better than expected for that state.",
      "intuition_cn": "把 raw return 换成 advantage：只有动作比该 state 的平均水平更好时，才强烈强化它。",
      "usage_en": "Use this in actor-critic and PPO-style algorithms to reduce variance and stabilize updates.",
      "usage_cn": "在 actor-critic、PPO 等算法中用它降方差、稳定更新。",
      "symbols": [
        {
          "sym": "A^π(s_t,a_t)",
          "en": "advantage of action a_t",
          "cn": "动作 a_t 的优势"
        },
        {
          "sym": "∇θ log πθ",
          "en": "policy score gradient",
          "cn": "策略 log 概率梯度"
        },
        {
          "sym": "E",
          "en": "expectation over sampled states/actions",
          "cn": "对采样状态和动作取期望"
        }
      ]
    },
    {
      "title": "Advantage definition",
      "eq": "$$ A^\\pi(s,a)=Q^\\pi(s,a)-V^\\pi(s) $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-advantage-definition",
      "intuition_en": "Advantage compares an action to the state baseline: positive means better than average, negative worse.",
      "intuition_cn": "Advantage 把某个 action 和该 state 的平均水平比较：正数表示比平均好，负数表示更差。",
      "usage_en": "Use it as the policy-gradient weight: increase probability for positive advantage and reduce reinforcement for negative advantage.",
      "usage_cn": "把它作为 policy gradient 的权重：advantage 为正就提高该动作概率，为负就降低或少强化。",
      "symbols": [
        {
          "sym": "Q^π(s,a)",
          "en": "value after taking action a",
          "cn": "做动作 a 后的价值"
        },
        {
          "sym": "V^π(s)",
          "en": "average value of state s",
          "cn": "状态 s 的平均价值"
        },
        {
          "sym": "A^π(s,a)",
          "en": "extra value above/below baseline",
          "cn": "相对 baseline 多出或少掉的价值"
        }
      ]
    },
    {
      "title": "LLM policy",
      "eq": "$$ \\pi_\\theta(a_t\\mid s_t)=P_\\theta(y_t\\mid x,y_{1:t-1}) $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-llm-policy",
      "intuition_en": "In LLM RL, the state is prompt plus previous tokens, and the action is the next token.",
      "intuition_cn": "在 LLM 强化学习里，state 是 prompt 加已生成 tokens，action 是下一个 token。",
      "usage_en": "Use this mapping to translate RL formulas to language models: πθ(a_t|s_t) becomes probability of token y_t.",
      "usage_cn": "用这个映射把 RL 公式套到语言模型：πθ(a_t|s_t) 就是生成 token y_t 的概率。",
      "symbols": [
        {
          "sym": "x",
          "en": "prompt/input",
          "cn": "prompt / 输入"
        },
        {
          "sym": "y_{1:t-1}",
          "en": "tokens generated so far",
          "cn": "目前已生成 tokens"
        },
        {
          "sym": "y_t",
          "en": "next token/action",
          "cn": "下一个 token / 动作"
        },
        {
          "sym": "Pθ",
          "en": "model probability under θ",
          "cn": "参数 θ 下的模型概率"
        }
      ]
    },
    {
      "title": "Log-derivative trick",
      "eq": "$$ \\nabla J=\\int P_\\theta(\\tau)R(\\tau)\\nabla\\log P_\\theta(\\tau)\\,d\\tau,\\qquad \\nabla\\log P_\\theta(\\tau)=\\sum_t\\nabla\\log\\pi_\\theta(a_t\\mid s_t) $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-log-derivative-trick",
      "intuition_en": "This moves the gradient from the sampling probability into a log-probability gradient that the policy network can compute.",
      "intuition_cn": "这个技巧把对采样概率的梯度，转成策略网络能计算的 log 概率梯度。",
      "usage_en": "Use it to derive policy gradient: write ∇P=P∇logP; environment transitions drop out if they do not depend on θ.",
      "usage_cn": "用它推导 policy gradient：写成 ∇P=P∇logP；环境转移不依赖 θ，所以最后只剩 policy 的 log 概率项。",
      "symbols": [
        {
          "sym": "Pθ(τ)",
          "en": "trajectory probability under θ",
          "cn": "参数 θ 下轨迹 τ 的概率"
        },
        {
          "sym": "∇log Pθ(τ)",
          "en": "score function of trajectory probability",
          "cn": "轨迹概率的 score function"
        },
        {
          "sym": "Σ_t ∇log πθ(a_t|s_t)",
          "en": "sum of policy log-prob gradients",
          "cn": "每一步策略 log 概率梯度之和"
        },
        {
          "sym": "R(τ)",
          "en": "trajectory return weighting the update",
          "cn": "给更新加权的轨迹回报"
        }
      ]
    }
  ]
};

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function lang() {
    if (typeof getLang === "function") return getLang();
    return localStorage.getItem("ml_review_lang_v1") === "cn" ? "cn" : "en";
  }

  function pick(obj, base) {
    const l = lang();
    return l === "cn" ? (obj[base + "_cn"] || obj[base + "_en"] || obj[base] || "")
                      : (obj[base + "_en"] || obj[base + "_cn"] || obj[base] || "");
  }

  // Optional per-formula explanation block. The renderer skips this entirely
  // when an item has no symbols / usage / intuition fields, so existing
  // formulas without explanations render unchanged.
  function explainHtml(item) {
    const hasSymbols = item.symbols && item.symbols.length;
    const hasUsage   = item.usage_en   || item.usage_cn;
    const hasIntuit  = item.intuition_en || item.intuition_cn;
    if (!hasSymbols && !hasUsage && !hasIntuit) return "";
    const parts = [];
    if (hasIntuit) {
      parts.push(`
        <div class="explain-row">
          <div class="explain-label">
            <span class="en-only">Intuition</span><span class="cn-only">理解</span>
          </div>
          <div class="explain-text">
            <span class="en-only">${esc(item.intuition_en || item.intuition_cn || "")}</span>
            <span class="cn-only">${esc(item.intuition_cn || item.intuition_en || "")}</span>
          </div>
        </div>`);
    }
    if (hasSymbols) {
      parts.push(`
        <div class="explain-row explain-symbols-row">
          <div class="explain-label">
            <span class="en-only">Symbols</span><span class="cn-only">符号</span>
          </div>
          <ul class="explain-symbols">
            ${item.symbols.map(s => `
              <li>
                <span class="explain-sym">${esc(s.sym || "")}</span>
                <span class="explain-sym-def">
                  <span class="en-only">${esc(s.en || s.cn || "")}</span>
                  <span class="cn-only">${esc(s.cn || s.en || "")}</span>
                </span>
              </li>`).join("")}
          </ul>
        </div>`);
    }
    if (hasUsage) {
      parts.push(`
        <div class="explain-row">
          <div class="explain-label">
            <span class="en-only">How to use</span><span class="cn-only">如何运用</span>
          </div>
          <div class="explain-text">
            <span class="en-only">${esc(item.usage_en || item.usage_cn || "")}</span>
            <span class="cn-only">${esc(item.usage_cn || item.usage_en || "")}</span>
          </div>
        </div>`);
    }
    // Wrap in <details> so each card collapses by default. The <summary>
    // line replaces the click target — clicking it toggles `open`.
    return `
      <details class="equation-explain-wrap">
        <summary class="equation-explain-toggle">
          <span class="explain-toggle-chevron" aria-hidden="true">▸</span>
          <span class="en-only">Explain</span>
          <span class="cn-only">解释</span>
        </summary>
        <div class="equation-explain">${parts.join("")}</div>
      </details>`;
  }

  function renderEquationSheet() {
    const root = document.getElementById("equationSheetRoot");
    if (!root || !window.GROUPS || !window.TOPICS) return;
    const topicByGroup = new Map();
    for (const t of window.TOPICS) {
      if (!topicByGroup.has(t.group)) topicByGroup.set(t.group, []);
      topicByGroup.get(t.group).push(t);
    }

    let total = 0;
    for (const items of Object.values(EQUATION_DATA)) total += items.length;
    const count = document.getElementById("equationSheetCount");
    if (count) count.textContent = `${window.TOPICS.length} topics · ${total} formula blocks`;

    root.innerHTML = window.GROUPS.map(group => {
      const topics = topicByGroup.get(group.id) || [];
      const cards = topics.map(topic => {
        const items = EQUATION_DATA[topic.slug] || [];
        const haystack = [topic.slug, topic.name_en, topic.name_cn, topic.sub_en, topic.sub_cn]
          .concat(items.flatMap(item => [
            item.title, item.eq,
            item.usage_en, item.usage_cn,
            item.intuition_en, item.intuition_cn,
            ...(item.symbols || []).flatMap(s => [s.sym, s.en, s.cn]),
          ]))
          .filter(Boolean).join(" ").toLowerCase();
        return `
          <article class="equation-topic" data-equation-topic data-haystack="${esc(haystack)}">
            <header class="equation-topic-head">
              <div>
                <h3><a href="topics/${esc(topic.slug)}.html">${esc(pick(topic, "name"))}</a></h3>
                <p>${esc(pick(topic, "sub"))}</p>
              </div>
              <span>${items.length}</span>
            </header>
            <div class="equation-list">
              ${items.map(item => `
                <div class="equation-item">
                  <div class="equation-title-row">
                    <div class="equation-title">${esc(item.title)}</div>
                    ${item.source ? `<a class="equation-source" href="${esc(item.source)}"><span class="en-only">Source</span><span class="cn-only">出处</span></a>` : ""}
                  </div>
                  <div class="equation-math">${esc(item.eq).replace(/\n/g, "<br />")}</div>
                  ${explainHtml(item)}
                </div>
              `).join("")}
            </div>
          </article>`;
      }).join("");
      return `
        <section class="equation-group" data-equation-group>
          <div class="equation-group-head">
            <h2>${esc(pick(group, "name"))}</h2>
            <p>${esc(pick(group, "sub"))}</p>
          </div>
          <div class="equation-grid">${cards}</div>
        </section>`;
    }).join("");

    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([root]);
    applyEquationSearch();
  }

  function applyEquationSearch() {
    const input = document.getElementById("searchInput");
    const q = (input && input.value || "").trim().toLowerCase();
    document.querySelectorAll("[data-equation-topic]").forEach(card => {
      const hit = !q || (card.dataset.haystack || "").includes(q);
      card.hidden = !hit;
    });
    document.querySelectorAll("[data-equation-group]").forEach(group => {
      group.hidden = !group.querySelector("[data-equation-topic]:not([hidden])");
    });
  }

  // Toggle every <details class="equation-explain-wrap"> open / closed.
  // Stays in sync with the actual DOM state — re-rendering or per-card
  // clicks don't desync the button label.
  function syncExpandAllLabel() {
    const btn = document.getElementById("expandAllExplanations");
    if (!btn) return;
    const all = document.querySelectorAll(".equation-explain-wrap");
    const open = document.querySelectorAll(".equation-explain-wrap[open]");
    const allOpen = all.length > 0 && open.length === all.length;
    btn.dataset.state = allOpen ? "open" : "closed";
    btn.setAttribute("aria-pressed", allOpen ? "true" : "false");
  }
  function wireExpandAll() {
    const btn = document.getElementById("expandAllExplanations");
    if (!btn || btn.dataset.wired) return;
    btn.dataset.wired = "1";
    btn.addEventListener("click", () => {
      const all = document.querySelectorAll(".equation-explain-wrap");
      const open = document.querySelectorAll(".equation-explain-wrap[open]");
      const target = open.length === all.length ? false : true;
      all.forEach(d => { d.open = target; });
      syncExpandAllLabel();
    });
    document.addEventListener("toggle", (e) => {
      if (e.target.classList && e.target.classList.contains("equation-explain-wrap")) {
        syncExpandAllLabel();
      }
    }, true);
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderEquationSheet();
    syncExpandAllLabel();
    wireExpandAll();
    const input = document.getElementById("searchInput");
    if (input) input.addEventListener("input", applyEquationSearch);
    document.addEventListener("click", e => {
      if (e.target.closest(".lang-switch button")) {
        setTimeout(() => { renderEquationSheet(); syncExpandAllLabel(); }, 0);
      }
    });
  });

  window.EQUATION_SHEET = { data: EQUATION_DATA, render: renderEquationSheet, explain: explainHtml };
})();
