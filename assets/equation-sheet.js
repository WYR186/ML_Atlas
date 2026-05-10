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
      "source": "topics/probability.html#eq-probability-expectation-variance"
    },
    {
      "title": "Conditional Probability",
      "eq": "$$ P(A\\mid B)=\\frac{P(A,B)}{P(B)},\\qquad P(B)>0 $$",
      "source": "topics/probability.html#eq-probability-conditional-probability"
    },
    {
      "title": "Bayes' Rule",
      "eq": "$$ P(A\\mid B)=\\frac{P(B\\mid A)\\,P(A)}{P(B)} $$",
      "source": "topics/probability.html#eq-probability-bayes-rule"
    },
    {
      "title": "Independence",
      "eq": "$$ P(A,B)=P(A)P(B)\\;\\Leftrightarrow\\;P(A\\mid B)=P(A) $$",
      "source": "topics/probability.html#eq-probability-independence"
    },
    {
      "title": "Conditional Independence",
      "eq": "$$ P(A,B\\mid C)=P(A\\mid C)\\,P(B\\mid C) $$",
      "source": "topics/probability.html#eq-probability-conditional-independence"
    },
    {
      "title": "Law of Total Probability",
      "eq": "$$ P(B)=\\sum_{a}P(B\\mid A=a)\\,P(A=a) $$",
      "source": "topics/probability.html#eq-probability-law-of-total-probability"
    },
    {
      "title": "Expectation & Variance",
      "eq": "$$ \\mathbb{E}[X]=\\sum_x x\\,P(x),\\quad \\mathrm{Var}(X)=\\mathbb{E}[X^2]-\\mathbb{E}[X]^2 $$",
      "source": "topics/probability.html#eq-probability-expectation-variance"
    },
    {
      "title": "Naive Bayes Factorization (preview)",
      "eq": "$$ P(Y\\mid X_1,\\dots,X_d) \\;\\propto\\; P(Y)\\prod_{i=1}^{d} P(X_i\\mid Y) $$",
      "source": "topics/probability.html#eq-probability-naive-bayes-factorization-preview"
    }
  ],
  "linear-algebra": [
    {
      "title": "Dot Product & Cosine",
      "eq": "$$ x^\\top y=\\sum_{i=1}^{d} x_i y_i = \\|x\\|\\|y\\|\\cos\\theta $$",
      "source": "topics/linear-algebra.html#eq-linear-algebra-dot-product-cosine"
    },
    {
      "title": "$\\ell_p$ Norms",
      "eq": "$$ \\|x\\|_2=\\sqrt{x^\\top x},\\ \\|x\\|_1=\\sum_i|x_i|,\\ \\|x\\|_\\infty=\\max_i|x_i| $$",
      "source": "topics/linear-algebra.html#eq-linear-algebra-p-norms"
    },
    {
      "title": "Matrix-Multiply Shapes",
      "eq": "$$ (m\\times n)\\cdot(n\\times p)\\to(m\\times p) $$",
      "source": "topics/linear-algebra.html#eq-linear-algebra-matrix-multiply-shapes"
    },
    {
      "title": "Rank-Nullity",
      "eq": "$$ \\dim\\mathrm{Col}(A)+\\dim\\mathrm{Ker}(A)=n,\\ \\ A\\in\\mathbb{R}^{m\\times n} $$",
      "source": "topics/linear-algebra.html#eq-linear-algebra-rank-nullity"
    },
    {
      "title": "Eigen Equation",
      "eq": "$$ Au=\\lambda u,\\qquad u\\ne 0 $$",
      "source": "topics/linear-algebra.html#eq-linear-algebra-eigen-equation"
    },
    {
      "title": "Reduced SVD",
      "eq": "$$ X=U\\Sigma V^\\top,\\ \\ U\\in\\mathbb{R}^{n\\times r},\\ \\Sigma\\in\\mathbb{R}^{r\\times r}_{>0},\\ V\\in\\mathbb{R}^{d\\times r} $$",
      "source": "topics/linear-algebra.html#eq-linear-algebra-reduced-svd"
    },
    {
      "title": "Quadratic Form & PSD",
      "eq": "$$ x^\\top A x=\\sum_{i,j}A_{ij}x_ix_j,\\quad \\text{PSD}: x^\\top A x\\ge 0\\ \\forall x $$",
      "source": "topics/linear-algebra.html#eq-linear-algebra-quadratic-form-psd"
    },
    {
      "title": "Sandwich Identity",
      "eq": "$$ A=B^\\top B \\;\\Rightarrow\\; A\\succeq 0;\\quad X^\\top D X \\succeq 0\\ \\text{when}\\ D\\succeq 0 $$",
      "source": "topics/linear-algebra.html#eq-linear-algebra-sandwich-identity"
    },
    {
      "title": "Vector-Calc Shapes",
      "eq": "$$ \\nabla f\\in\\mathbb{R}^{d},\\ \\nabla^2 f\\in\\mathbb{R}^{d\\times d},\\ J=\\frac{\\partial f}{\\partial x}\\in\\mathbb{R}^{m\\times n} $$",
      "source": "topics/linear-algebra.html#eq-linear-algebra-vector-calc-shapes"
    },
    {
      "title": "Useful Derivatives",
      "eq": "$$ \\nabla_w (a^\\top w)=a,\\quad \\nabla_w(w^\\top A w)=(A+A^\\top)w $$",
      "source": "topics/linear-algebra.html#eq-linear-algebra-useful-derivatives"
    }
  ],
  "optimization": [
    {
      "title": "Convexity (chord)",
      "eq": "$$ f((1-\\lambda)w_1+\\lambda w_2)\\le (1-\\lambda)f(w_1)+\\lambda f(w_2) $$",
      "source": "topics/optimization.html#eq-optimization-convexity-chord"
    },
    {
      "title": "First-order test",
      "eq": "$$ f(w_1)\\ge f(w_2)+\\nabla f(w_2)^\\top(w_1-w_2) $$",
      "source": "topics/optimization.html#eq-optimization-first-order-test"
    },
    {
      "title": "Second-order test",
      "eq": "$$ \\nabla^2 f(w)\\succeq 0\\ \\forall w\\ \\Longleftrightarrow\\ f \\text{ convex} $$",
      "source": "topics/optimization.html#eq-optimization-second-order-test"
    },
    {
      "title": "Optimality (convex)",
      "eq": "$$ \\nabla f(w^*)=0 \\;\\Rightarrow\\; w^* \\text{ globally optimal} $$",
      "source": "topics/optimization.html#eq-optimization-optimality-convex"
    },
    {
      "title": "Gradient Descent",
      "eq": "$$ w_{k+1}=w_k-\\alpha_k\\,\\nabla f(w_k) $$",
      "source": "topics/optimization.html#eq-optimization-gradient-descent"
    },
    {
      "title": "Subgradient inequality",
      "eq": "$$ f(x)\\ge f(x_0)+\\langle s, x-x_0\\rangle,\\quad s\\in\\partial f(x_0) $$",
      "source": "topics/optimization.html#eq-optimization-subgradient-inequality"
    },
    {
      "title": "Armijo line search",
      "eq": "$$ f(w_k+\\alpha d_k)-f(w_k)\\le \\sigma\\alpha\\,\\nabla f(w_k)^\\top d_k $$",
      "source": "topics/optimization.html#eq-optimization-armijo-line-search"
    },
    {
      "title": "Lagrangian",
      "eq": "$$ L(w,\\lambda,\\nu)=f_0(w)+\\sum_i\\lambda_i f_i(w)+\\sum_j\\nu_j h_j(w),\\ \\lambda_i\\ge 0 $$",
      "source": "topics/optimization.html#eq-optimization-lagrangian"
    },
    {
      "title": "Primal vs Dual",
      "eq": "$$ \\text{Primal: }\\min_w\\max_{\\lambda\\ge 0,\\nu} L,\\quad \\text{Dual: }\\max_{\\lambda\\ge 0,\\nu}\\min_w L $$",
      "source": "topics/optimization.html#eq-optimization-primal-vs-dual"
    },
    {
      "title": "Weak / Strong Duality",
      "eq": "$$ f_0(w^*)\\ge g(\\lambda^*,\\nu^*)\\ (\\text{always}),\\quad =\\ \\text{under strong duality} $$",
      "source": "topics/optimization.html#eq-optimization-weak-strong-duality"
    }
  ],
  "knn": [
    {
      "title": "Classification (majority vote)",
      "eq": "$$ \\hat{y}(x)=\\mathrm{mode}\\{y_i:\\ x_i \\in \\mathcal{N}_k(x)\\} $$",
      "symbols": [
        { sym: "$\\hat{y}(x)$",        en: "predicted label for query point $x$",                      cn: "对查询点 $x$ 的预测标签" },
        { sym: "$x$",                  en: "query / test input we want to classify",                   cn: "待分类的查询样本" },
        { sym: "$k$",                  en: "number of neighbors to consider (hyperparameter)",         cn: "考虑的最近邻个数（超参数）" },
        { sym: "$\\mathcal{N}_k(x)$",  en: "set of the $k$ training points closest to $x$",            cn: "训练集中距 $x$ 最近的 $k$ 个样本" },
        { sym: "$y_i$",                en: "known label of training point $x_i$",                      cn: "训练点 $x_i$ 的已知标签" },
        { sym: "$\\mathrm{mode}$",     en: "majority vote — the most-frequent label in the set",        cn: "众数 —— 集合中出现最多的标签" }
      ],
      usage_en: "For each test point $x$, compute its distance to every training sample, sort and pick the $k$ smallest; the most-frequent label among those $k$ neighbors is the prediction. Choose $k$ via cross-validation — small $k$ overfits noise, large $k$ over-smooths the boundary.",
      usage_cn: "对每个测试点 $x$，计算它到所有训练样本的距离，排序取最小的 $k$ 个；这 $k$ 个邻居中出现最多的标签就是预测结果。$k$ 用 cross-validation 选 —— $k$ 太小会过拟合噪声，$k$ 太大会把决策边界过度平滑。",
      intuition_en: "KNN is a 'lazy learner' — there is no training, only a lookup. The prediction asks 'what do my $k$ closest historical neighbors say?' and goes with the majority. The whole method assumes that nearby points share labels, so accuracy depends entirely on whether the distance metric makes sense for your features.",
      intuition_cn: "KNN 是 lazy learner —— 没有训练，只是查表。预测就是问 \"离我最近的 $k$ 个历史样本是什么类别？\" 然后投票决定。它假设 \"近邻点应该有相似标签\"，所以效果完全取决于距离度量是否对你的特征有意义。",
      "source": "topics/knn.html#eq-knn-classification-majority-vote"
    },
    {
      "title": "Regression (mean)",
      "eq": "$$ \\hat{y}(x)=\\frac{1}{k}\\sum_{x_i\\in \\mathcal{N}_k(x)} y_i $$",
      "symbols": [
        { sym: "$\\hat{y}(x)$",        en: "predicted real-valued target for $x$",                       cn: "对 $x$ 的实数预测值" },
        { sym: "$y_i \\in \\mathbb{R}$", en: "real-valued target of training point $x_i$",               cn: "训练点 $x_i$ 的实数目标值" },
        { sym: "$\\mathcal{N}_k(x)$",  en: "the $k$ nearest training points to $x$ (same as classification)", cn: "$x$ 的 $k$ 个最近训练点（与分类相同）" },
        { sym: "$\\frac{1}{k}\\sum$",  en: "sum the $k$ neighbor targets, then divide by $k$ — the average", cn: "对 $k$ 个邻居的目标值求和后除以 $k$ —— 即平均" }
      ],
      usage_en: "Same neighbor-finding step as classification, but instead of voting, average the neighbors' target values. A common variant weights each neighbor by $1/d(x, x_i)$ so closer neighbors influence the prediction more.",
      usage_cn: "找邻居的步骤与分类一致；但不再投票，而是把 $k$ 个邻居的目标值取平均。常见变体是用 $1/d(x, x_i)$ 加权，让更近的邻居权重更大。",
      intuition_en: "Regression KNN is just a local average. The prediction is 'the typical target value seen near $x$.' It works well when the underlying function is roughly continuous and you have enough samples to densely cover the input space.",
      intuition_cn: "回归型 KNN 就是局部平均：预测值是 \"$x$ 附近样本目标值的代表\"。当真实函数大致连续、训练样本能稠密覆盖输入空间时效果好。",
      "source": "topics/knn.html#eq-knn-regression-mean"
    },
    {
      "title": "Euclidean distance",
      "eq": "$$ d(x,x_i)=\\|x-x_i\\|_2=\\sqrt{\\sum_j (x_j-x_{ij})^2} $$",
      "symbols": [
        { sym: "$x \\in \\mathbb{R}^d$",   en: "query point with $d$ feature components $x_1, \\dots, x_d$", cn: "$d$ 维查询点，分量为 $x_1, \\dots, x_d$" },
        { sym: "$x_i \\in \\mathbb{R}^d$", en: "the $i$-th training point with components $x_{i1}, \\dots, x_{id}$", cn: "第 $i$ 个训练点，分量为 $x_{i1}, \\dots, x_{id}$" },
        { sym: "$j$",                       en: "feature index — the sum runs over all $d$ features",          cn: "特征下标 —— 对全部 $d$ 个特征求和" },
        { sym: "$\\|\\cdot\\|_2$",          en: "L2 (Euclidean) norm",                                          cn: "L2 范数（欧氏范数）" }
      ],
      usage_en: "Compute the squared difference per feature, sum across features, take the square root. Standardize features first (subtract mean, divide by std) — otherwise a feature on a larger numerical scale (e.g. salary in dollars vs age in years) dominates the distance. Common alternatives: Manhattan ($L_1$), cosine, Mahalanobis.",
      usage_cn: "每个特征算差的平方，对所有特征求和后开方。先做特征标准化（减均值、除标准差） —— 否则数值范围大的特征（如以美元计的工资 vs. 以年计的年龄）会主导距离。常见替代：Manhattan ($L_1$)、cosine、Mahalanobis。",
      intuition_en: "Geometric 'ruler distance' — the straight-line length between two points in $d$-dimensional space. The squared per-coordinate gap means large per-feature differences hurt much more than small ones, which is why feature scale matters so much.",
      intuition_cn: "几何上的 \"直尺距离\" —— $d$ 维空间中两点的直线长度。每个维度差的平方把大差异放大、小差异变小，所以特征尺度对它影响很大。",
      "source": "topics/knn.html#eq-knn-euclidean-distance"
    }
  ],
  "naive-bayes": [
    {
      "title": "Conditional independence",
      "eq": "$$ P(X_1,\\ldots,X_d\\mid Y)=\\prod_{j=1}^{d} P(X_j\\mid Y) $$",
      "symbols": [
        { sym: "$X_1, \\ldots, X_d$", en: "the $d$ feature random variables for one sample",          cn: "一个样本的 $d$ 个特征随机变量" },
        { sym: "$Y$",                  en: "the class label random variable",                          cn: "类别标签随机变量" },
        { sym: "$P(X_j \\mid Y)$",     en: "likelihood of feature $j$ given the class",                cn: "给定类别下，第 $j$ 个特征的似然" },
        { sym: "$\\prod_{j=1}^{d}$",   en: "product across all $d$ features",                          cn: "对全部 $d$ 个特征连乘" }
      ],
      usage_en: "This is the **assumption** Naive Bayes makes — given the class, the features are independent. It lets you estimate each $P(X_j \\mid Y)$ separately from data (count co-occurrences for discrete features, or fit a 1-D Gaussian per feature per class for continuous ones) instead of trying to learn the impossibly large joint $P(X_1, \\ldots, X_d \\mid Y)$.",
      usage_cn: "这是 Naive Bayes 的核心**假设** —— 给定类别后，各特征条件独立。这样就可以分别估计每个 $P(X_j \\mid Y)$（离散特征数共现次数，连续特征对每个类别拟合一维 Gaussian），不必直接去估那个维度爆炸的联合分布 $P(X_1, \\ldots, X_d \\mid Y)$。",
      intuition_en: "'Once you tell me the class, the features stop talking to each other.' The assumption is usually wrong (features stay correlated even within a class), but the resulting classifier is fast, robust on small data, and often surprisingly good — that's why it's 'naive but useful.'",
      intuition_cn: "\"告诉我类别之后，各特征之间就互不相关。\" 这个假设通常是错的（同一类别内特征仍相关），但分类器训练快、小数据下也稳，效果常常出乎意料地好 —— 所以叫 \"naive 但好用\"。",
      "source": "topics/naive-bayes.html#eq-naive-bayes-conditional-independence"
    },
    {
      "title": "MAP decision",
      "eq": "$$ \\hat{y}=\\arg\\max_y P(Y=y)\\prod_j P(X_j\\mid y) $$",
      "symbols": [
        { sym: "$\\hat{y}$",          en: "predicted class",                                                   cn: "预测类别" },
        { sym: "$\\arg\\max_y$",      en: "the value of $y$ that makes the expression largest",                cn: "让表达式最大的 $y$ 值" },
        { sym: "$P(Y=y)$",            en: "class prior — fit as (count of class $y$) / (total samples)",       cn: "类别先验 —— 用 (该类样本数) / (总样本数) 估计" },
        { sym: "$P(X_j \\mid y)$",    en: "likelihood of feature $j$ given class $y$, fit per class from data", cn: "给定类别 $y$ 下第 $j$ 个特征的似然，按类别从训练数据拟合" },
        { sym: "$\\prod_j$",          en: "product over the $d$ features of the test sample",                  cn: "对测试样本的 $d$ 个特征连乘" }
      ],
      usage_en: "For each candidate class $y$, multiply the class prior by the product of per-feature likelihoods evaluated at the test sample's actual feature values; pick the class with the highest score. This is **Maximum A Posteriori (MAP)** — Bayes's rule with the constant denominator $P(X_1, \\ldots, X_d)$ dropped because it doesn't change the argmax.",
      usage_cn: "对每个候选类别 $y$，把类别先验和各特征似然在测试样本特征值上的取值连乘，得分最高的类别就是预测。这就是 **Maximum A Posteriori (MAP)** —— Bayes 公式中常数分母 $P(X_1, \\ldots, X_d)$ 不影响 argmax，所以省掉了。",
      intuition_en: "'Score each class by how well it explains the test sample, then pick the winner.' The prior gives a base rate ('which classes are common?') and the likelihood product asks 'would a sample from this class look like what I'm seeing?'. Multiply the two and take the largest.",
      intuition_cn: "\"给每个类别打个分，看哪个最能 '解释' 这个测试样本，最高分就是答案。\" 先验告诉你 \"哪些类别本来就常见\"，似然连乘问 \"如果是这个类，会不会看到这种特征组合？\" 两者相乘后选最大。",
      "source": "topics/naive-bayes.html#eq-naive-bayes-map-decision"
    },
    {
      "title": "Log-space implementation",
      "eq": "$$ \\hat{y}=\\arg\\max_y\\Big[\\log P(y)+\\sum_j\\log P(X_j\\mid y)\\Big] $$",
      "symbols": [
        { sym: "$\\log$",                              en: "natural log (base $e$); any base works since it's monotonic", cn: "自然对数（底为 $e$）；任何底都可以，因为是单调函数" },
        { sym: "$\\log P(y)$",                         en: "log of the class prior",                                       cn: "类别先验的对数" },
        { sym: "$\\sum_j \\log P(X_j \\mid y)$",       en: "sum of per-feature log-likelihoods",                           cn: "各特征 log-likelihood 之和" }
      ],
      usage_en: "Take the log of both sides of the MAP formula. The product of $d$ probabilities (each often $\\ll 1$) becomes a sum, avoiding numerical underflow when $d$ is large. Always implement Naive Bayes this way in code.",
      usage_cn: "对 MAP 公式两边取对数。$d$ 个概率（每个通常 $\\ll 1$）的乘积变成求和，避免在 $d$ 大时数值下溢。代码实现一律用这种 log 形式。",
      intuition_en: "Same answer, no underflow. Multiplying 50 numbers like $0.001$ gives $10^{-150}$ — easily rounds to 0 in floating point. Adding their logs gives a comparable number you can actually compare across classes.",
      intuition_cn: "答案完全一致，数值上不会下溢。50 个 $0.001$ 相乘得 $10^{-150}$，浮点数会直接变 0；改成把它们的 log 相加后，得到可正常比较的数。",
      "source": "topics/naive-bayes.html#eq-naive-bayes-log-space-implementation"
    },
    {
      "title": "Each feature is Gaussian per class",
      "eq": "$$ P(X_j\\mid Y=y)=\\mathcal{N}(X_j;\\,\\mu_{y,j},\\,\\sigma_{y,j}^2) $$",
      "symbols": [
        { sym: "$\\mathcal{N}(\\cdot; \\mu, \\sigma^2)$", en: "Gaussian density with mean $\\mu$, variance $\\sigma^2$", cn: "均值为 $\\mu$、方差为 $\\sigma^2$ 的 Gaussian density" },
        { sym: "$\\mu_{y,j}$",                            en: "sample mean of feature $j$ within class $y$",            cn: "类别 $y$ 中第 $j$ 个特征的样本均值" },
        { sym: "$\\sigma_{y,j}^2$",                       en: "sample variance of feature $j$ within class $y$",        cn: "类别 $y$ 中第 $j$ 个特征的样本方差" },
        { sym: "$(\\mu_{y,j}, \\sigma_{y,j}^2)$",         en: "fit independently for each (class, feature) pair",       cn: "对每个 (类别, 特征) 单独拟合一对参数" }
      ],
      usage_en: "For continuous-valued features, model $P(X_j \\mid Y)$ as a 1-D Gaussian. Estimate $\\mu_{y,j}$ and $\\sigma_{y,j}^2$ from the subset of training data with $Y = y$ via the MLE formulas (sample mean / sample variance), then plug into the MAP formula as the likelihood. This is **Gaussian Naive Bayes**. (For discrete features, use multinomial / Bernoulli instead.)",
      usage_cn: "对连续特征，把 $P(X_j \\mid Y)$ 建模成 1 维 Gaussian。用 $Y = y$ 的训练子集，通过 MLE 公式（样本均值 / 样本方差）估计 $\\mu_{y,j}$ 和 $\\sigma_{y,j}^2$，然后作为 likelihood 代入 MAP 公式。这就是 **Gaussian Naive Bayes**。（离散特征改用 multinomial / Bernoulli。）",
      intuition_en: "Per (class, feature) you store just two numbers — the bell curve's center and width. Total parameters $= 2 \\times K \\times d$ for $K$ classes and $d$ features (versus exponential in the joint case). Cheap, transparent, surprisingly effective on text and tabular data.",
      intuition_cn: "每个 (类别, 特征) 只存两个数 —— 钟形曲线的中心和宽度。共有 $2 \\times K \\times d$ 个参数（$K$ 类、$d$ 个特征），相比联合分布的指数级参数量少得多。便宜、透明、在文本和表格数据上效果意外地好。",
      "source": "topics/naive-bayes.html#eq-naive-bayes-each-feature-is-gaussian-per-class"
    }
  ],
  "linear-regression": [
    {
      "title": "Design-matrix objective",
      "eq": "$$ \\min_w \\; \\frac12\\|Y-Xw\\|_2^2 $$",
      "symbols": [
        { sym: "$w \\in \\mathbb{R}^d$",          en: "weight vector being optimized — one weight per feature",                cn: "待优化的权重向量 —— 每个特征一个权重" },
        { sym: "$X \\in \\mathbb{R}^{n \\times d}$", en: "design matrix; row $i$ is feature vector $x_i^\\top$",              cn: "设计矩阵；第 $i$ 行是特征向量 $x_i^\\top$" },
        { sym: "$Y \\in \\mathbb{R}^n$",          en: "vector of target values $(y_1, \\ldots, y_n)^\\top$",                   cn: "目标值向量 $(y_1, \\ldots, y_n)^\\top$" },
        { sym: "$Xw \\in \\mathbb{R}^n$",         en: "vector of predictions $(\\hat{y}_1, \\ldots, \\hat{y}_n)^\\top$",       cn: "预测值向量 $(\\hat{y}_1, \\ldots, \\hat{y}_n)^\\top$" },
        { sym: "$\\|\\cdot\\|_2^2$",              en: "squared L2 norm — sum of squared entries",                              cn: "L2 范数的平方 —— 各项平方求和" },
        { sym: "$\\frac{1}{2}$",                  en: "convenience factor; cancels with the 2 from differentiating the square", cn: "方便因子；与平方求导出来的 2 相消" }
      ],
      usage_en: "Stack training inputs into rows of $X$, targets into $Y$. Find $w$ that minimizes the sum of squared residuals (predicted minus true). Solve in closed form via the normal equation when $d$ is small, or via gradient descent when $d$ is large. To include a bias term, prepend a column of 1's to $X$ and treat it as one more component of $w$.",
      usage_cn: "把训练输入堆成 $X$ 的行、目标堆成 $Y$。找让残差平方和（预测 − 真实）最小的 $w$。$d$ 小时走 normal equation 闭式解，$d$ 大、数据多时走 gradient descent。要加 bias，在 $X$ 前面加一列全 1，把它当成 $w$ 的一个分量。",
      intuition_en: "Geometrically: project $Y$ onto the column space of $X$. Squared error penalizes large residuals quadratically, so it's sensitive to outliers but mathematically clean — convex, differentiable, and unique-minimum whenever $X^\\top X$ is invertible.",
      intuition_cn: "几何上：把 $Y$ 投影到 $X$ 的列空间上。平方误差对大残差是二次惩罚，对 outlier 敏感，但数学上很干净 —— 凸、可导、当 $X^\\top X$ 可逆时有唯一最小值。",
      "source": "topics/linear-regression.html#eq-linear-regression-design-matrix-objective"
    },
    {
      "title": "Gradient",
      "eq": "$$ \\nabla_w \\frac12\\|Y-Xw\\|_2^2 = X^\\top(Xw-Y) $$",
      "symbols": [
        { sym: "$\\nabla_w$",                          en: "gradient with respect to $w$; same shape as $w$ (a $d$-vector)", cn: "对 $w$ 求梯度；与 $w$ 同形状（$d$ 维向量）" },
        { sym: "$Xw - Y \\in \\mathbb{R}^n$",          en: "residual vector — predictions minus targets",                     cn: "残差向量 —— 预测 − 真实" },
        { sym: "$X^\\top \\in \\mathbb{R}^{d \\times n}$", en: "transpose of the design matrix",                            cn: "设计矩阵的转置" },
        { sym: "$X^\\top(Xw - Y)$",                    en: "column-by-column inner product of features against the residual", cn: "各列特征与残差的内积" }
      ],
      usage_en: "Plug into gradient descent: $w_{t+1} = w_t - \\alpha\\,X^\\top(Xw_t - Y)$. Set the gradient to zero for the closed-form solution. The $j$-th component $[X^\\top r]_j$ tells you how to nudge weight $j$ to reduce error, where $r = Xw - Y$ is the residual.",
      usage_cn: "代入 gradient descent: $w_{t+1} = w_t - \\alpha\\,X^\\top(Xw_t - Y)$。或令梯度等于 0 得到闭式解。第 $j$ 个分量 $[X^\\top r]_j$ 告诉你 \"怎样调整第 $j$ 个权重才能减小误差\"（$r = Xw - Y$ 是残差）。",
      intuition_en: "$X^\\top r$ measures how much each feature column 'explains' the leftover error. If a feature is positively correlated with the residual, increasing its weight reduces error — that's exactly the direction the negative gradient points.",
      intuition_cn: "$X^\\top r$ 衡量每个特征列与残余误差的相关程度。某个特征与残差正相关 → 增大它的权重能降低误差 —— 这正是负梯度的方向。",
      "source": "topics/linear-regression.html#eq-linear-regression-gradient"
    },
    {
      "title": "Normal equation",
      "eq": "$$ X^\\top Xw^* = X^\\top Y,\\qquad w^*=(X^\\top X)^{-1}X^\\top Y $$",
      "symbols": [
        { sym: "$w^*$",                                  en: "optimal weight vector — the minimizer",                                                              cn: "最优权重向量 —— 使目标函数最小的解" },
        { sym: "$X^\\top X \\in \\mathbb{R}^{d \\times d}$", en: "Gram matrix — symmetric, positive-semidefinite",                                                cn: "Gram 矩阵 —— 对称、半正定" },
        { sym: "$(X^\\top X)^{-1}$",                     en: "inverse of the Gram matrix; exists iff $X$ has linearly independent columns ($\\mathrm{rank}(X)=d$)", cn: "Gram 矩阵的逆；当且仅当 $X$ 列线性无关（即满列秩 $\\mathrm{rank}(X) = d$）时存在" },
        { sym: "$X^\\top Y \\in \\mathbb{R}^d$",          en: "feature-target correlation vector",                                                                  cn: "特征与目标的相关向量" }
      ],
      usage_en: "Set the gradient $X^\\top(Xw - Y) = 0$, rearrange. The first form is the linear system to **solve** (don't actually invert the matrix in code — use `np.linalg.solve` or a Cholesky factorization for stability and speed); the second form is the explicit formula. If $X^\\top X$ is singular (e.g. $n < d$ or duplicated features), use ridge regression instead.",
      usage_cn: "令梯度 $X^\\top(Xw - Y) = 0$ 整理即可。第一个形式是要**解**的线性方程组（代码里别真的求逆，用 `np.linalg.solve` 或 Cholesky 既稳定又快）；第二个形式是显式解。当 $X^\\top X$ 奇异（如 $n < d$ 或特征重复）时，改用 ridge regression。",
      intuition_en: "'Stop where the gradient is zero.' The condition $X^\\top(Xw - Y) = 0$ says the residual is orthogonal to every feature column — geometrically, $Xw^*$ is the projection of $Y$ onto the column space of $X$, and the leftover $Y - Xw^*$ has zero correlation with any feature.",
      intuition_cn: "\"梯度为 0 处停下\"。条件 $X^\\top(Xw - Y) = 0$ 表示残差与每个特征列正交 —— 几何上 $Xw^*$ 是 $Y$ 在 $X$ 列空间上的投影，残差 $Y - Xw^*$ 与任何特征都不再相关。",
      "source": "topics/linear-regression.html#eq-linear-regression-normal-equation"
    },
    {
      "title": "Ridge regularization",
      "eq": "$$ \\min_w \\frac12\\|Y-Xw\\|_2^2+\\frac{\\lambda}{2}\\|w\\|_2^2,\\qquad w^*=(X^\\top X+\\lambda I)^{-1}X^\\top Y $$",
      "symbols": [
        { sym: "$\\lambda \\ge 0$",                       en: "regularization strength (a hyperparameter)",                            cn: "正则强度（超参数）" },
        { sym: "$\\|w\\|_2^2$",                           en: "$\\sum_j w_j^2$ — sum of squared weights",                              cn: "$\\sum_j w_j^2$ —— 权重平方和" },
        { sym: "$\\frac{\\lambda}{2}\\|w\\|_2^2$",        en: "penalty term that shrinks weights toward 0",                            cn: "把权重拉向 0 的惩罚项" },
        { sym: "$I \\in \\mathbb{R}^{d \\times d}$",      en: "identity matrix",                                                       cn: "单位矩阵" },
        { sym: "$X^\\top X + \\lambda I$",                 en: "always invertible when $\\lambda > 0$ (positive-definite)",             cn: "$\\lambda > 0$ 时一定可逆（正定）" }
      ],
      usage_en: "Add the L2 penalty to the OLS objective. Pick $\\lambda$ via cross-validation: small $\\lambda \\approx$ OLS, large $\\lambda \\approx$ all-zero weights. The closed-form solution just adds $\\lambda I$ to the Gram matrix before inverting. **Standardize features first** — without it, weights with naturally large scales get over-penalized.",
      usage_cn: "在 OLS 目标里加上 L2 惩罚项。$\\lambda$ 用 cross-validation 选：$\\lambda$ 小 ≈ OLS，$\\lambda$ 大 ≈ 全 0 解。闭式解就是在反矩阵前给 Gram 矩阵加 $\\lambda I$。**先做特征标准化** —— 否则尺度天然大的权重会被惩罚得过狠。",
      intuition_en: "Two pressures fighting: 'fit the data well' vs. 'keep weights small.' Small weights → smoother model → less overfitting and a stable solution even when $X^\\top X$ is singular. Bayesian view: ridge $=$ MAP estimate under a Gaussian prior $w \\sim \\mathcal{N}(0, \\frac{1}{\\lambda} I)$.",
      intuition_cn: "两股力在拔河：\"拟合好数据\" vs. \"权重不要太大\"。权重小 → 模型更平滑 → 减少过拟合，且即使 $X^\\top X$ 奇异也能有稳定解。Bayesian 视角：ridge $=$ 在 Gaussian prior $w \\sim \\mathcal{N}(0, \\frac{1}{\\lambda} I)$ 下的 MAP 估计。",
      "source": "topics/linear-regression.html#eq-linear-regression-ridge-regularization"
    }
  ],
  "logistic-regression": [
    {
      "title": "Sigmoid",
      "eq": "$$ \\sigma(z)=\\frac{1}{1+e^{-z}} $$",
      "source": "topics/logistic-regression.html#eq-logistic-regression-sigmoid"
    },
    {
      "title": "Decision boundary",
      "eq": "$$ p(y=1\\mid x)=0.5 \\iff w^\\top\\phi(x)=0 $$",
      "source": "topics/logistic-regression.html#eq-logistic-regression-decision-boundary"
    },
    {
      "title": "Negative log-likelihood",
      "eq": "$$ \\min_w \\sum_{(x_i,y_i)\\in D}\\log\\!\\left(1+\\exp(-y_i w^\\top\\phi(x_i))\\right) $$",
      "source": "topics/logistic-regression.html#eq-logistic-regression-negative-log-likelihood"
    },
    {
      "title": "Gradient descent update",
      "eq": "$$ w_{t+1}=w_t-\\alpha \\nabla f(w_t) $$",
      "source": "topics/logistic-regression.html#eq-logistic-regression-gradient-descent-update"
    },
    {
      "title": "Convexity check for $y\\in\\{0,1\\}$ form",
      "eq": "$$ \\nabla^2 L(w)=X^\\top B X,\\qquad B=\\mathrm{diag}(p_i(1-p_i)) $$",
      "source": "topics/logistic-regression.html#eq-logistic-regression-convexity-check-for-y-0-1-form"
    }
  ],
  "svm": [
    {
      "title": "Signed distance / margin",
      "eq": "$$ \\gamma(w,b)=\\min_i \\frac{y_i(w^\\top x_i+b)}{\\|w\\|_2} $$",
      "source": "topics/svm.html#eq-svm-signed-distance-margin"
    },
    {
      "title": "Hard-margin SVM",
      "eq": "$$ \\min_{w,b}\\frac12\\|w\\|_2^2 \\quad \\text{s.t.}\\quad y_i(w^\\top x_i+b)\\ge 1 $$",
      "source": "topics/svm.html#eq-svm-hard-margin-svm"
    },
    {
      "title": "Soft-margin SVM",
      "eq": "$$ \\min_{w,b,\\xi}\\frac12\\|w\\|_2^2+C\\sum_i\\xi_i $$\n$$ y_i(w^\\top x_i+b)\\ge 1-\\xi_i,\\qquad \\xi_i\\ge 0 $$",
      "source": "topics/svm.html#eq-svm-soft-margin-svm"
    },
    {
      "title": "Hinge-loss form",
      "eq": "$$ \\ell_{\\text{hinge}}(t)=\\max(0,1-t),\\qquad t=y_i(w^\\top x_i+b) $$",
      "source": "topics/svm.html#eq-svm-hinge-loss-form"
    },
    {
      "title": "Soft-margin dual shape",
      "eq": "$$ \\max_\\alpha \\sum_i \\alpha_i-\\frac12\\sum_i\\sum_j \\alpha_i\\alpha_j y_i y_j x_i^\\top x_j $$\n$$ 0\\le \\alpha_i\\le C,\\qquad \\sum_i \\alpha_i y_i=0 $$",
      "source": "topics/svm.html#eq-svm-soft-margin-dual-shape"
    }
  ],
  "kernel-methods": [
    {
      "title": "Kernel definition",
      "eq": "$$ k(x,x')=\\phi(x)^\\top\\phi(x') $$",
      "source": "topics/kernel-methods.html#eq-kernel-methods-kernel-definition"
    },
    {
      "title": "Kernelized SVM prediction",
      "eq": "$$ f(x)=\\sum_i\\alpha_i y_i\\,k(x_i,x)+b $$",
      "source": "topics/kernel-methods.html#eq-kernel-methods-kernelized-svm-prediction"
    },
    {
      "title": "Polynomial kernel",
      "eq": "$$ k(x,x')=(1+x^\\top x')^d $$",
      "source": "topics/kernel-methods.html#eq-kernel-methods-polynomial-kernel"
    },
    {
      "title": "RBF / Gaussian kernel",
      "eq": "$$ k_\\sigma(x,x')=\\exp\\!\\left(-\\frac{\\|x-x'\\|_2^2}{2\\sigma^2}\\right) $$",
      "source": "topics/kernel-methods.html#eq-kernel-methods-rbf-gaussian-kernel"
    },
    {
      "title": "XOR lifting from Lecture 7",
      "eq": "$$ \\phi(x_1,x_2)=(x_1,x_2,x_1x_2) $$",
      "source": "topics/kernel-methods.html#eq-kernel-methods-xor-lifting-from-lecture-7"
    }
  ],
  "decision-trees": [
    {
      "title": "Entropy",
      "eq": "$$ I(D)=-\\sum_{c=1}^{C}p(c\\mid D)\\log_2 p(c\\mid D) $$",
      "source": "topics/decision-trees.html#eq-decision-trees-entropy"
    },
    {
      "title": "Information gain",
      "eq": "$$ IG(D,f)=I(D)-\\sum_j\\frac{|D_j|}{|D|}I(D_j) $$",
      "source": "topics/decision-trees.html#eq-decision-trees-information-gain"
    },
    {
      "title": "Gini impurity",
      "eq": "$$ G(D)=1-\\sum_c p_c^2 $$",
      "source": "topics/decision-trees.html#eq-decision-trees-gini-impurity"
    },
    {
      "title": "Classification error",
      "eq": "$$ E(D)=1-\\max_c p(c\\mid D) $$",
      "source": "topics/decision-trees.html#eq-decision-trees-classification-error"
    },
    {
      "title": "Continuous split rule",
      "eq": "$$ f(x)=\\mathbf{1}\\{x_j\\ge\\tau\\} $$",
      "source": "topics/decision-trees.html#eq-decision-trees-continuous-split-rule"
    }
  ],
  "bagging": [
    {
      "title": "Bootstrap sample",
      "eq": "$$ D_t=\\{(x_{i_s},y_{i_s})\\}_{s=1}^{n},\\qquad i_s\\sim\\text{Uniform}\\{1,\\dots,n\\} $$",
      "source": "topics/bagging.html#eq-bagging-bootstrap-sample"
    },
    {
      "title": "Majority vote",
      "eq": "$$ F(x)=\\operatorname{sign}\\!\\left(\\sum_{t=1}^{T} f_t(x)\\right) $$",
      "source": "topics/bagging.html#eq-bagging-majority-vote"
    },
    {
      "title": "Variance of an average",
      "eq": "$$ \\operatorname{Var}\\!\\left(\\frac1T\\sum_t f_t\\right)\\approx \\frac{\\sigma^2}{T} $$",
      "source": "topics/bagging.html#eq-bagging-variance-of-an-average"
    },
    {
      "title": "Random forest split idea",
      "eq": "$$ \\text{consider about }\\sqrt d\\text{ features per split} $$",
      "source": "topics/bagging.html#eq-bagging-random-forest-split-idea"
    }
  ],
  "boosting": [
    {
      "title": "Additive ensemble",
      "eq": "$$ F_t(x)=F_{t-1}(x)+\\alpha_t f_t(x) $$",
      "source": "topics/boosting.html#eq-boosting-additive-ensemble"
    },
    {
      "title": "Exponential loss",
      "eq": "$$ L(F)=\\frac1m\\sum_{i=1}^m \\exp(-y_iF(x_i)) $$",
      "source": "topics/boosting.html#eq-boosting-exponential-loss"
    },
    {
      "title": "Example weights",
      "eq": "$$ w_i=\\exp(-y_iF_{t-1}(x_i)) $$",
      "source": "topics/boosting.html#eq-boosting-example-weights"
    },
    {
      "title": "Classifier coefficient",
      "eq": "$$ \\alpha_t^*=\\frac12\\log\\frac{1-\\epsilon_t}{\\epsilon_t} $$",
      "source": "topics/boosting.html#eq-boosting-classifier-coefficient"
    }
  ],
  "pca": [
    {
      "title": "Centering",
      "eq": "$$ \\mu=\\frac1N\\sum_i x^{(i)},\\qquad \\bar x^{(i)}=x^{(i)}-\\mu $$",
      "source": "topics/pca.html#eq-pca-centering"
    },
    {
      "title": "Empirical covariance",
      "eq": "$$ \\Sigma=\\frac1N\\bar X\\bar X^\\top=\\frac1N\\sum_i\\bar x^{(i)}\\bar x^{(i)\\top} $$",
      "source": "topics/pca.html#eq-pca-empirical-covariance"
    },
    {
      "title": "First principal component",
      "eq": "$$ w_1=\\arg\\max_{\\|w\\|_2=1} w^\\top\\Sigma w $$",
      "source": "topics/pca.html#eq-pca-first-principal-component"
    },
    {
      "title": "Projection and reconstruction",
      "eq": "$$ \\hat x=U^\\top(x-\\mu),\\qquad \\tilde x=U\\hat x+\\mu $$",
      "source": "topics/pca.html#eq-pca-projection-and-reconstruction"
    },
    {
      "title": "SVD route",
      "eq": "$$ \\frac1{\\sqrt N}\\bar X=USV^\\top,\\qquad \\Sigma=US^2U^\\top $$",
      "source": "topics/pca.html#eq-pca-svd-route"
    }
  ],
  "kmeans": [
    {
      "title": "Objective",
      "eq": "$$ J=\\sum_{i=1}^n\\sum_{k=1}^K r_{ik}\\|x^{(i)}-\\mu_k\\|_2^2 $$\n$$ r_{ik}\\in\\{0,1\\},\\qquad \\sum_k r_{ik}=1 $$",
      "source": "topics/kmeans.html#eq-kmeans-objective"
    },
    {
      "title": "Assignment step",
      "eq": "$$ r_{ik}=1\\quad\\text{if}\\quad k=\\arg\\min_j\\|x^{(i)}-\\mu_j\\|_2^2 $$",
      "source": "topics/kmeans.html#eq-kmeans-assignment-step"
    },
    {
      "title": "Update step",
      "eq": "$$ \\mu_k=\\frac{\\sum_i r_{ik}x^{(i)}}{\\sum_i r_{ik}} $$",
      "source": "topics/kmeans.html#eq-kmeans-update-step"
    },
    {
      "title": "Per-iteration cost",
      "eq": "$$ O(KNd)\\text{ for assignments},\\qquad O(Nd)\\text{ for means} $$",
      "source": "topics/kmeans.html#eq-kmeans-per-iteration-cost"
    }
  ],
  "mlp": [
    {
      "title": "Two-layer forward pass",
      "eq": "$$ z^{(1)}=W^{(1)}x+b^{(1)},\\qquad a^{(1)}=\\sigma(z^{(1)}) $$\n$$ z^{(2)}=W^{(2)}a^{(1)}+b^{(2)} $$",
      "source": "topics/mlp.html#eq-mlp-two-layer-forward-pass"
    },
    {
      "title": "ReLU activation",
      "eq": "$$ \\operatorname{ReLU}(z)=\\max(0,z) $$",
      "source": "topics/mlp.html#eq-mlp-relu-activation"
    },
    {
      "title": "Softmax output",
      "eq": "$$ \\hat y_i=\\frac{e^{z_i}}{\\sum_j e^{z_j}} $$",
      "source": "topics/mlp.html#eq-mlp-softmax-output"
    },
    {
      "title": "Cross-entropy",
      "eq": "$$ \\ell(y,\\hat y)=-\\sum_i y_i\\log \\hat y_i $$",
      "source": "topics/mlp.html#eq-mlp-cross-entropy"
    },
    {
      "title": "Mini-batch gradient descent",
      "eq": "$$ w\\leftarrow w-\\alpha\\frac1{|B|}\\sum_{i\\in B}\\nabla_w\\ell_i(w) $$",
      "source": "topics/mlp.html#eq-mlp-mini-batch-gradient-descent"
    }
  ],
  "backpropagation": [
    {
      "title": "Chain rule at one node",
      "eq": "$$ \\bar{x}=\\frac{\\partial L}{\\partial x}=\\frac{\\partial L}{\\partial y}\\frac{\\partial y}{\\partial x}=\\bar{y}\\frac{\\partial y}{\\partial x} $$",
      "source": "topics/backpropagation.html#eq-backpropagation-chain-rule-at-one-node"
    },
    {
      "title": "Gradient accumulation",
      "eq": "$$ \\frac{\\partial L}{\\partial x}=\\sum_{j:\\,x\\to y_j}\\frac{\\partial L}{\\partial y_j}\\frac{\\partial y_j}{\\partial x} $$",
      "source": "topics/backpropagation.html#eq-backpropagation-gradient-accumulation"
    },
    {
      "title": "Shape check",
      "eq": "$$ \\frac{\\partial L}{\\partial W}\\;\\text{has the same shape as}\\;W $$",
      "source": "topics/backpropagation.html#eq-backpropagation-shape-check"
    }
  ],
  "cnn": [
    {
      "title": "Output size per axis",
      "eq": "$$ N_{\\text{out}}=\\left\\lfloor\\frac{N+2P-F}{S}\\right\\rfloor+1 $$",
      "source": "topics/cnn.html#eq-cnn-output-size-per-axis"
    },
    {
      "title": "Convolution parameters",
      "eq": "$$ \\#\\text{params}=(F_hF_wC_{\\text{in}}+1)C_{\\text{out}} $$",
      "source": "topics/cnn.html#eq-cnn-convolution-parameters"
    },
    {
      "title": "One output activation",
      "eq": "$$ y_{u,v,k}=b_k+\\sum_{c=1}^{C_{\\text{in}}}\\sum_{i=1}^{F_h}\\sum_{j=1}^{F_w}W_{i,j,c,k}\\,x_{u+i,v+j,c} $$",
      "source": "topics/cnn.html#eq-cnn-one-output-activation"
    }
  ],
  "rnn": [
    {
      "title": "Generic recurrence",
      "eq": "$$ h^{(t)} = f(h^{(t-1)}, x^{(t)}), \\qquad y^{(t)} = g(h^{(t)}) $$",
      "source": "topics/rnn.html#eq-rnn-generic-recurrence"
    },
    {
      "title": "Elman RNN form from Lecture 14",
      "eq": "$$ h^{(t)}=\\sigma_h(W_{hx}x^{(t)}+W_{hh}h^{(t-1)}+b_h) $$\n$$ y^{(t)}=\\sigma_y(W_{yh}h^{(t)}+b_y) $$",
      "source": "topics/rnn.html#eq-rnn-elman-rnn-form-from-lecture-14"
    },
    {
      "title": "Why gradients vanish or explode",
      "eq": "$$ \\frac{\\partial h^{(T)}}{\\partial h^{(1)}}=\\prod_{t=2}^{T}\\frac{\\partial h^{(t)}}{\\partial h^{(t-1)}} $$",
      "source": "topics/rnn.html#eq-rnn-why-gradients-vanish-or-explode"
    }
  ],
  "lstm": [
    {
      "title": "LSTM gates from Lecture 14",
      "eq": "$$ i^{(t)}=\\sigma(W_{ix}x^{(t)}+W_{ih}h^{(t-1)}+b_i) $$\n$$ f^{(t)}=\\sigma(W_{fx}x^{(t)}+W_{fh}h^{(t-1)}+b_f) $$\n$$ o^{(t)}=\\sigma(W_{ox}x^{(t)}+W_{oh}h^{(t-1)}+b_o) $$\n$$ \\tilde c^{(t)}=\\sigma_c(W_{cx}x^{(t)}+W_{ch}h^{(t-1)}+b_c) $$",
      "source": "topics/lstm.html#eq-lstm-lstm-gates-from-lecture-14"
    },
    {
      "title": "Cell and hidden updates",
      "eq": "$$ c^{(t)}=f^{(t)}\\odot c^{(t-1)}+i^{(t)}\\odot \\tilde c^{(t)}, \\qquad h^{(t)}=o^{(t)}\\odot \\sigma_h(c^{(t)}) $$",
      "source": "topics/lstm.html#eq-lstm-cell-and-hidden-updates"
    },
    {
      "title": "GRU summary",
      "eq": "$$ z^{(t)}=\\sigma(W_{zx}x^{(t)}+W_{zh}h^{(t-1)}+b_z), \\qquad r^{(t)}=\\sigma(W_{rx}x^{(t)}+W_{rh}h^{(t-1)}+b_r) $$\n$$ h^{(t)}=(1-z^{(t)})\\odot \\tilde h^{(t)}+z^{(t)}\\odot h^{(t-1)} $$",
      "source": "topics/lstm.html#eq-lstm-gru-summary"
    }
  ],
  "autoencoder": [
    {
      "title": "Encoder / decoder",
      "eq": "$$ z=f_\\phi(x),\\qquad \\hat{x}=g_\\theta(z) $$",
      "source": "topics/autoencoder.html#ae-en"
    },
    {
      "title": "Reconstruction loss",
      "eq": "$$ \\min_{\\theta,\\phi}\\;\\mathcal{L}_{rec}(x,\\hat x) $$\n$$ \\mathcal{L}_{rec}=\\|x-\\hat x\\|_2^2\\;(\\text{MSE}) $$",
      "source": "topics/autoencoder.html#eq-autoencoder-reconstruction-loss"
    }
  ],
  "vae": [
    {
      "title": "Latent-variable likelihood",
      "eq": "$$ p_\\theta(x)=\\int p_\\theta(x\\mid z)p(z)\\,dz $$",
      "source": "topics/vae.html#eq-vae-latent-variable-likelihood"
    },
    {
      "title": "Approximate posterior",
      "eq": "$$ q_\\phi(z\\mid x)=\\mathcal{N}\\!\\big(\\mu_\\phi(x),\\operatorname{diag}(\\sigma_\\phi^2(x))\\big) $$",
      "source": "topics/vae.html#eq-vae-approximate-posterior"
    },
    {
      "title": "ELBO to maximize",
      "eq": "$$ \\mathcal{L}(x)=\\mathbb{E}_{z\\sim q_\\phi(z\\mid x)}[\\log p_\\theta(x\\mid z)]-D_{KL}\\!\\left(q_\\phi(z\\mid x)\\,\\|\\,p(z)\\right) $$",
      "source": "topics/vae.html#eq-vae-elbo-to-maximize"
    },
    {
      "title": "Reparameterization",
      "eq": "$$ z=\\mu_\\phi(x)+\\sigma_\\phi(x)\\odot\\epsilon,\\quad \\epsilon\\sim\\mathcal{N}(0,I) $$",
      "source": "topics/vae.html#eq-vae-reparameterization"
    },
    {
      "title": "Gaussian KL",
      "eq": "$$ D_{KL}(q\\|p)=\\tfrac{1}{2}\\sum_j\\left(\\mu_j^2+\\sigma_j^2-\\log\\sigma_j^2-1\\right) $$",
      "source": "topics/vae.html#eq-vae-gaussian-kl"
    }
  ],
  "contrastive": [
    {
      "title": "Cosine similarity",
      "eq": "$$ s(f(x),f(x'))=\\frac{f(x)^\\top f(x')}{\\|f(x)\\|_2\\|f(x')\\|_2} $$",
      "source": "topics/contrastive.html#eq-contrastive-cosine-similarity"
    },
    {
      "title": "InfoNCE loss",
      "eq": "$$ \\mathcal L_{\\mathrm{NCE}}=-\\log\\frac{\\exp(s(f(x),f(x^+))/\\tau)}{\\exp(s(f(x),f(x^+))/\\tau)+\\sum_{i=1}^{N}\\exp(s(f(x),f(x_i^-))/\\tau)} $$",
      "source": "topics/contrastive.html#eq-contrastive-infonce-loss"
    },
    {
      "title": "Dual-encoder form",
      "eq": "$$ \\mathcal L_{\\mathrm{dual}}(x,z)=-\\log\\frac{\\exp(f_1(x)^\\top f_2(z))}{\\sum_{j=1}^{C}\\exp(f_1(x)^\\top f_2(z_j))} $$",
      "source": "topics/contrastive.html#eq-contrastive-dual-encoder-form"
    }
  ],
  "attention": [
    {
      "title": "Single-query attention",
      "eq": "$$ s_i = k_i^\\top q,\\qquad \\alpha_i=\\frac{\\exp(s_i)}{\\sum_j \\exp(s_j)},\\qquad y=\\sum_i \\alpha_i v_i $$",
      "source": "topics/attention.html#eq-attention-single-query-attention"
    },
    {
      "title": "Scaled dot-product attention",
      "eq": "$$ \\mathrm{Attention}(Q,K,V)=\\mathrm{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V $$",
      "source": "topics/attention.html#eq-attention-scaled-dot-product-attention"
    },
    {
      "title": "Causal mask",
      "eq": "$$ \\mathrm{softmax}\\!\\left(\\frac{QK^\\top + M}{\\sqrt{d_k}}\\right),\\qquad M_{ij}=\\begin{cases}0,&j\\le i\\\\-\\infty,&j>i\\end{cases} $$",
      "source": "topics/attention.html#eq-attention-causal-mask"
    }
  ],
  "positional-encoding": [
    {
      "title": "Sinusoidal positional encoding",
      "eq": "$$ PE(pos,2i)=\\sin\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right),\\qquad PE(pos,2i+1)=\\cos\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right) $$",
      "source": "topics/positional-encoding.html#eq-positional-encoding-sinusoidal-positional-encoding"
    },
    {
      "title": "Shift by $k$",
      "eq": "$$ \\begin{aligned} PE(pos+k,2i)&=\\cos(k\\omega_i)\\,PE(pos,2i)+\\sin(k\\omega_i)\\,PE(pos,2i+1),\\\\ PE(pos+k,2i+1)&=-\\sin(k\\omega_i)\\,PE(pos,2i)+\\cos(k\\omega_i)\\,PE(pos,2i+1). \\end{aligned} $$",
      "source": "topics/positional-encoding.html#eq-positional-encoding-shift-by-k"
    },
    {
      "title": "Relative-position dot product",
      "eq": "$$ PE(pos_1)^\\top PE(pos_2)=\\sum_i \\cos\\!\\big((pos_2-pos_1)\\omega_i\\big) $$",
      "source": "topics/positional-encoding.html#eq-positional-encoding-relative-position-dot-product"
    },
    {
      "title": "Angle-addition identities",
      "eq": "$$ \\sin((pos+k)\\omega)=\\sin(pos\\omega)\\cos(k\\omega)+\\cos(pos\\omega)\\sin(k\\omega) $$\\n$$ \\cos((pos+k)\\omega)=\\cos(pos\\omega)\\cos(k\\omega)-\\sin(pos\\omega)\\sin(k\\omega) $$",
      "source": "topics/positional-encoding.html#eq-positional-encoding-hw4-2-1-2-prove-the-linear-shift-property"
    }
  ],
  "transformer": [
    {
      "title": "Block skeleton",
      "eq": "$$ X' = X + \\mathrm{MHA}(\\mathrm{LN}(X)),\\qquad X_{\\text{out}}=X' + \\mathrm{FFN}(\\mathrm{LN}(X')) $$",
      "source": "topics/transformer.html#eq-transformer-block-skeleton"
    },
    {
      "title": "Multi-head attention projections",
      "eq": "$$ Q=XW_Q,\\qquad K=XW_K,\\qquad V=XW_V,\\qquad \\mathrm{MHA}(X)=\\mathrm{Concat}(head_1,\\ldots,head_N)W_O $$",
      "source": "topics/transformer.html#eq-transformer-multi-head-attention-projections"
    },
    {
      "title": "Parameter count from HW4 §2.4",
      "eq": "$$ \\text{attention per layer}=4D^2,\\qquad \\text{MLP per layer}=2DF $$\n$$ \\text{full model}=L(4D^2+2DF)+2VD $$",
      "source": "topics/transformer.html#eq-transformer-parameter-count-from-hw4-2-4"
    }
  ],
  "llm": [
    {
      "title": "Autoregressive factorization",
      "eq": "$$ P_\\theta(x_1,\\ldots,x_T)=\\prod_{t=1}^{T}P_\\theta(x_t\\mid x_{\\lt t}) $$",
      "source": "topics/llm.html#eq-llm-autoregressive-factorization"
    },
    {
      "title": "Next-token probability",
      "eq": "$$ P_\\theta(x_t=i\\mid x_{\\lt t})=\\frac{\\exp(z_{t,i})}{\\sum_{j\\in V}\\exp(z_{t,j})} $$",
      "source": "topics/llm.html#eq-llm-next-token-probability"
    },
    {
      "title": "NLL / cross-entropy loss",
      "eq": "$$ \\mathcal{L}(X;\\theta)=-\\frac{1}{T}\\sum_{t=1}^{T}\\log P_\\theta(x_t\\mid x_{\\lt t}) $$",
      "source": "topics/llm.html#eq-llm-nll-cross-entropy-loss"
    },
    {
      "title": "Perplexity",
      "eq": "$$ PP(X)=\\exp(\\mathcal{L}(X;\\theta))=\\left(\\prod_{t=1}^T P_\\theta(x_t\\mid x_{\\lt t})\\right)^{-1/T} $$",
      "source": "topics/llm.html#eq-llm-perplexity"
    },
    {
      "title": "Temperature decoding",
      "eq": "$$ P_T(i)=\\mathrm{softmax}\\!\\left(\\frac{z_i}{T}\\right) $$",
      "source": "topics/llm.html#eq-llm-temperature-decoding"
    },
    {
      "title": "LoRA update",
      "eq": "$$ W = W_0+\\Delta W,\\qquad \\Delta W=BA,\\qquad r\\ll \\min(d,k) $$",
      "source": "topics/llm.html#eq-llm-lora-update"
    }
  ],
  "diffusion": [
    {
      "title": "Notation",
      "eq": "",
      "source": "topics/diffusion.html#eq-diffusion-notation"
    },
    {
      "title": "Forward noising process",
      "eq": "$$ q(x_t\\mid x_{t-1})=\\mathcal{N}\\!\\left(x_t;\\sqrt{\\alpha_t}\\,x_{t-1},\\,\\beta_t I\\right) $$\n$$ x_t=\\sqrt{\\alpha_t}\\,x_{t-1}+\\sqrt{\\beta_t}\\,\\epsilon_t,\\qquad \\epsilon_t\\sim\\mathcal{N}(0,I) $$",
      "source": "topics/diffusion.html#eq-diffusion-forward-noising-process"
    },
    {
      "title": "Direct sample from $x_0$",
      "eq": "$$ q(x_t\\mid x_0)=\\mathcal{N}\\!\\left(x_t;\\sqrt{\\bar{\\alpha}_t}\\,x_0,\\,(1-\\bar{\\alpha}_t)I\\right) $$",
      "source": "topics/diffusion.html#eq-diffusion-direct-sample-from-x-0"
    },
    {
      "title": "Learned reverse transition",
      "eq": "$$ p_\\theta(x_{t-1}\\mid x_t)=\\mathcal{N}\\!\\left(x_{t-1};\\mu_\\theta(x_t,t),\\,\\Sigma_\\theta(x_t,t)\\right) $$",
      "source": "topics/diffusion.html#eq-diffusion-learned-reverse-transition"
    },
    {
      "title": "Posterior mean used in HW4 §3.4",
      "eq": "$$ \\tilde{\\mu}_t(x_t,x_0)= \\frac{\\sqrt{\\alpha_t}(1-\\bar{\\alpha}_{t-1})}{1-\\bar{\\alpha}_t}x_t+ \\frac{\\sqrt{\\bar{\\alpha}_{t-1}}\\beta_t}{1-\\bar{\\alpha}_t}x_0 $$",
      "source": "topics/diffusion.html#eq-diffusion-posterior-mean-used-in-hw4-3-4"
    },
    {
      "title": "Diffusion ELBO",
      "eq": "$$ \\log p_\\theta(x_0)\\ge \\mathbb{E}_{q(x_1\\mid x_0)}[\\log p_\\theta(x_0\\mid x_1)]-D_{KL}(q(x_T\\mid x_0)\\|p(x_T))-\\sum_{t=2}^{T}\\mathbb{E}_{q(x_t\\mid x_0)}\\left[D_{KL}(q(x_{t-1}\\mid x_t,x_0)\\|p_\\theta(x_{t-1}\\mid x_t))\\right] $$",
      "source": "topics/diffusion.html#eq-diffusion-hw4-3-1-write-the-diffusion-elbo"
    },
    {
      "title": "Posterior factorization",
      "eq": "$$ q(x_{t-1}\\mid x_t,x_0)\\propto q(x_t\\mid x_{t-1})q(x_{t-1}\\mid x_0) $$",
      "source": "topics/diffusion.html#eq-diffusion-hw4-3-4-posterior-mean"
    }
  ],
  "bayes-classifier": [
    {
      "title": "Binary Bayes rule",
      "eq": "$$ f_{\\text{Bayes}}(x)=\\begin{cases}1,&\\eta(x)\\ge \\frac12\\\\0,&\\eta(x)<\\frac12\\end{cases},\\qquad \\eta(x)=\\Pr(Y=1\\mid X=x) $$",
      "source": "topics/bayes-classifier.html#eq-bayes-classifier-binary-bayes-rule"
    },
    {
      "title": "Bayes error",
      "eq": "$$ \\epsilon_\\mu^*=\\mathbb{E}_X\\left[\\min\\{\\eta(X),1-\\eta(X)\\}\\right] $$",
      "source": "topics/bayes-classifier.html#eq-bayes-classifier-bayes-error"
    },
    {
      "title": "Equivalent binary form",
      "eq": "$$ \\epsilon_\\mu^*=\\frac12-\\frac12\\mathbb{E}_X\\left[|2\\eta(X)-1|\\right] $$",
      "source": "topics/bayes-classifier.html#eq-bayes-classifier-equivalent-binary-form"
    },
    {
      "title": "Squared-loss regression",
      "eq": "$$ f_{\\text{Bayes}}(X)=\\mathbb{E}[Y\\mid X],\\qquad \\epsilon_\\mu^*=\\mathbb{E}\\operatorname{Var}(Y\\mid X) $$",
      "source": "topics/bayes-classifier.html#eq-bayes-classifier-squared-loss-regression"
    }
  ],
  "error-decomposition": [
    {
      "title": "Core equation",
      "eq": "$$ \\epsilon_\\mu(f)= \\underbrace{\\left(\\epsilon_\\mu(f)-\\inf_{g\\in\\mathcal{F}}\\epsilon_\\mu(g)\\right)}_{\\text{estimation error}} +\\underbrace{\\left(\\inf_{g\\in\\mathcal{F}}\\epsilon_\\mu(g)-\\epsilon_\\mu^*\\right)}_{\\text{approximation error}} +\\underbrace{\\epsilon_\\mu^*}_{\\text{Bayes error}} $$",
      "source": "topics/error-decomposition.html#eq-error-decomposition-core-equation"
    },
    {
      "title": "Best-in-class predictor",
      "eq": "$$ f_{\\mathcal{F}}^*\\in\\arg\\min_{g\\in\\mathcal{F}}\\epsilon_\\mu(g) $$",
      "source": "topics/error-decomposition.html#eq-error-decomposition-best-in-class-predictor"
    },
    {
      "title": "Learned predictor",
      "eq": "$$ \\hat f=\\mathcal{A}(\\mathcal{D}) $$",
      "source": "topics/error-decomposition.html#eq-error-decomposition-learned-predictor"
    }
  ],
  "pac": [
    {
      "title": "Training error",
      "eq": "$$ \\hat\\epsilon_{\\mathcal{D}}(f)=\\frac1n\\sum_{i=1}^n\\mathbf{1}\\{f(x^{(i)})\\ne y^{(i)}\\} $$",
      "source": "topics/pac.html#eq-pac-training-error"
    },
    {
      "title": "Test error",
      "eq": "$$ \\epsilon_\\mu(f)=\\Pr_\\mu(f(X)\\ne Y) $$",
      "source": "topics/pac.html#eq-pac-test-error"
    },
    {
      "title": "Finite realizable ERM bound",
      "eq": "$$ n\\ge \\frac1\\epsilon\\left(\\log|\\mathcal{F}|+\\log\\frac1\\delta\\right) $$",
      "source": "topics/pac.html#eq-pac-finite-realizable-erm-bound"
    },
    {
      "title": "Agnostic PAC target",
      "eq": "$$ \\Pr\\left(\\epsilon_\\mu(f)\\le \\min_{g\\in\\mathcal{H}}\\epsilon_\\mu(g)+\\epsilon\\right)\\ge 1-\\delta $$",
      "source": "topics/pac.html#eq-pac-agnostic-pac-target"
    },
    {
      "title": "Bad finite-class ERM failure bound",
      "eq": "$$ \\Pr(\\exists\\text{ bad }f\\in\\mathcal{F}\\text{ consistent with }\\mathcal{D})\\le |\\mathcal{F}|e^{-n\\epsilon} $$",
      "source": "topics/pac.html#eq-pac-example-2-finite-class-erm"
    }
  ],
  "vc-dimension": [
    {
      "title": "Hoeffding",
      "eq": "$$ \\Pr\\left(|\\bar Z_n-\\mathbb{E}\\bar Z_n|\\ge \\epsilon\\right)\\le 2\\exp\\left(-\\frac{2n\\epsilon^2}{(b-a)^2}\\right) $$",
      "source": "topics/vc-dimension.html#eq-vc-dimension-hoeffding"
    },
    {
      "title": "Fixed classifier bound",
      "eq": "$$ \\epsilon_\\mu(f)\\le \\hat\\epsilon_{\\mathcal{D}}(f)+\\sqrt{\\frac{\\log(2/\\delta)}{2n}} $$",
      "source": "topics/vc-dimension.html#eq-vc-dimension-fixed-classifier-bound"
    },
    {
      "title": "VC dimension definition",
      "eq": "$$ \\operatorname{VCdim}(\\mathcal{F})=\\max\\{|S|:\\mathcal{F}\\text{ shatters }S\\} $$",
      "source": "topics/vc-dimension.html#eq-vc-dimension-vc-dimension-definition"
    },
    {
      "title": "Typical VC-style bound",
      "eq": "$$ \\epsilon_\\mu(f)\\le \\hat\\epsilon_{\\mathcal{D}}(f)+\\mathcal{O}\\!\\left(\\sqrt{\\frac{\\operatorname{VCdim}(\\mathcal{F})+\\log(1/\\delta)}{n}}\\right) $$",
      "source": "topics/vc-dimension.html#eq-vc-dimension-typical-vc-style-bound"
    }
  ],
  "mdp": [
    {
      "title": "MDP tuple",
      "eq": "$$ \\mathcal{M}=(\\mathcal{S},\\mathcal{A},P,R,\\gamma) $$",
      "source": "topics/mdp.html#mdp-en"
    },
    {
      "title": "Markov property",
      "eq": "$$ \\Pr(S_{t+1}=s'\\mid S_t=s,A_t=a,\\text{history})=\\Pr(S_{t+1}=s'\\mid S_t=s,A_t=a) $$",
      "source": "topics/mdp.html#eq-mdp-markov-property"
    },
    {
      "title": "Trajectory",
      "eq": "$$ \\tau=(s_0,a_0,r_1,s_1,a_1,r_2,\\ldots,s_H) $$",
      "source": "topics/mdp.html#eq-mdp-trajectory"
    },
    {
      "title": "Deterministic policy",
      "eq": "$$ \\pi:\\mathcal{S}\\to\\mathcal{A},\\qquad a_t=\\pi(s_t) $$",
      "source": "topics/mdp.html#eq-mdp-deterministic-policy"
    },
    {
      "title": "Stochastic policy",
      "eq": "$$ \\pi:\\mathcal{S}\\to\\Delta(\\mathcal{A}),\\qquad a_t\\sim\\pi(\\cdot\\mid s_t) $$",
      "source": "topics/mdp.html#eq-mdp-stochastic-policy"
    },
    {
      "title": "Discounted return objective",
      "eq": "$$ \\mathbb{E}_{\\pi,P}\\left[\\sum_{t=0}^{\\infty}\\gamma^t r_t\\mid S_0=s_0\\right] $$",
      "source": "topics/mdp.html#eq-mdp-discounted-return-objective"
    }
  ],
  "value-functions": [
    {
      "title": "State value",
      "eq": "$$ V^\\pi(s)=\\mathbb{E}\\left[\\sum_{t=0}^{\\infty}\\gamma^t r_t\\mid \\pi,S_0=s\\right] $$",
      "source": "topics/value-functions.html#eq-value-functions-state-value"
    },
    {
      "title": "Action value",
      "eq": "$$ Q^\\pi(s,a)=\\mathbb{E}\\left[\\sum_{t=0}^{\\infty}\\gamma^t r_t\\mid \\pi,S_0=s,A_0=a\\right] $$",
      "source": "topics/value-functions.html#eq-value-functions-action-value"
    },
    {
      "title": "Relationship under a policy",
      "eq": "$$ V^\\pi(s)=\\mathbb{E}_{a\\sim\\pi(\\cdot\\mid s)}[Q^\\pi(s,a)] $$",
      "source": "topics/value-functions.html#eq-value-functions-relationship-under-a-policy"
    },
    {
      "title": "Bellman evaluation equation",
      "eq": "$$ Q^\\pi(s,a)=R(s,a)+\\gamma\\mathbb{E}_{s'\\sim P(\\cdot\\mid s,a)}[V^\\pi(s')] $$",
      "source": "topics/value-functions.html#eq-value-functions-bellman-evaluation-equation"
    },
    {
      "title": "Matrix form for finite MDPs",
      "eq": "$$ V^\\pi=R^\\pi+\\gamma P^\\pi V^\\pi,\\qquad V^\\pi=(I-\\gamma P^\\pi)^{-1}R^\\pi $$",
      "source": "topics/value-functions.html#eq-value-functions-matrix-form-for-finite-mdps"
    }
  ],
  "bellman": [
    {
      "title": "Policy Q-value",
      "eq": "$$ Q^\\pi(s,a)=\\mathbb{E}_\\pi\\!\\left[\\sum_{t=0}^{\\infty}\\gamma^t r_t\\mid s_0=s,a_0=a\\right] $$",
      "source": "topics/bellman.html#eq-bellman-policy-q-value"
    },
    {
      "title": "Policy Bellman equation",
      "eq": "$$ Q^\\pi(s,a)=R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)\\sum_{a'}\\pi(a'\\mid s')Q^\\pi(s',a') $$",
      "source": "topics/bellman.html#eq-bellman-policy-bellman-equation"
    },
    {
      "title": "Optimality equations",
      "eq": "$$ V^*(s)=\\max_{a\\in\\mathcal{A}}Q^*(s,a) $$\n$$ Q^*(s,a)=R(s,a)+\\gamma\\mathbb{E}_{s'\\sim P(\\cdot\\mid s,a)}[V^*(s')] $$",
      "source": "topics/bellman.html#eq-bellman-optimality-equations"
    },
    {
      "title": "Greedy optimal policy",
      "eq": "$$ \\pi^*(s)=\\arg\\max_{a\\in\\mathcal{A}}Q^*(s,a) $$",
      "source": "topics/bellman.html#eq-bellman-greedy-optimal-policy"
    },
    {
      "title": "Bellman optimality operator contraction",
      "eq": "$$ (TV)(s)=\\max_a\\left[R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)V(s')\\right] $$\n$$ \\lVert TV-TU\\rVert_\\infty\\le \\gamma\\lVert V-U\\rVert_\\infty $$",
      "source": "topics/bellman.html#eq-bellman-bellman-optimality-operator-contraction"
    }
  ],
  "dynamic-programming": [
    {
      "title": "Finite-horizon DP backup",
      "eq": "$$ Q_t(s,a)=R(s,a)+\\mathbb{E}_{s_{t+1}\\sim P(\\cdot|s,a)}\\!\\left[\\max_{a'}Q_{t+1}(s_{t+1},a')\\right] $$",
      "source": "topics/dynamic-programming.html#eq-dynamic-programming-finite-horizon-dp-backup"
    },
    {
      "title": "Value iteration",
      "eq": "$$ Q^{(k)}(s,a)=R(s,a)+\\gamma\\mathbb{E}_{s'\\sim P(\\cdot|s,a)}\\!\\left[\\max_{a'}Q^{(k-1)}(s',a')\\right] $$",
      "source": "topics/dynamic-programming.html#eq-dynamic-programming-value-iteration"
    },
    {
      "title": "Policy evaluation",
      "eq": "$$ V^\\pi=R^\\pi+\\gamma P^\\pi V^\\pi $$\n$$ V^\\pi=(I-\\gamma P^\\pi)^{-1}R^\\pi $$",
      "source": "topics/dynamic-programming.html#eq-dynamic-programming-policy-evaluation"
    },
    {
      "title": "Policy improvement",
      "eq": "$$ \\pi_{\\text{new}}(s)=\\arg\\max_a\\left[R(s,a)+\\gamma\\mathbb{E}_{s'}V^\\pi(s')\\right] $$",
      "source": "topics/dynamic-programming.html#eq-dynamic-programming-policy-improvement"
    },
    {
      "title": "Geometric convergence idea",
      "eq": "$$ \\lVert Q^{(k)}-Q^*\\rVert_\\infty\\le \\gamma^k\\lVert Q^{(0)}-Q^*\\rVert_\\infty $$",
      "source": "topics/dynamic-programming.html#eq-dynamic-programming-geometric-convergence-idea"
    }
  ],
  "q-learning": [
    {
      "title": "TD target",
      "eq": "$$ y=r+\\gamma\\max_{a'}Q(s',a') $$",
      "source": "topics/q-learning.html#eq-q-learning-td-target"
    },
    {
      "title": "Incremental update",
      "eq": "$$ Q(s,a)\\leftarrow Q(s,a)+\\alpha\\big[y-Q(s,a)\\big] $$",
      "source": "topics/q-learning.html#eq-q-learning-incremental-update"
    },
    {
      "title": "Moving-average form",
      "eq": "$$ Q'(s,a)=(1-\\alpha)Q(s,a)+\\alpha\\left(r+\\gamma\\max_{a'}Q(s',a')\\right) $$",
      "source": "topics/q-learning.html#eq-q-learning-moving-average-form"
    },
    {
      "title": "Greedy policy from Q",
      "eq": "$$ \\pi(s)=\\arg\\max_a Q(s,a) $$",
      "source": "topics/q-learning.html#eq-q-learning-greedy-policy-from-q"
    }
  ],
  "policy-gradient": [
    {
      "title": "Policy-gradient objective",
      "eq": "$$ J(\\theta)=\\mathbb{E}_{\\tau\\sim P^{\\pi_\\theta}}[R(\\tau)] $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-policy-gradient-objective"
    },
    {
      "title": "Monte-Carlo estimator",
      "eq": "$$ \\nabla_\\theta J(\\theta)\\approx \\frac1N\\sum_{i=1}^{N}R(\\tau_i)\\sum_{t=0}^{H}\\nabla_\\theta\\log\\pi_\\theta(a_t^i\\mid s_t^i) $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-monte-carlo-estimator"
    },
    {
      "title": "Advantage version",
      "eq": "$$ \\nabla J\\approx \\mathbb{E}[A^\\pi(s_t,a_t)\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)] $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-advantage-version"
    },
    {
      "title": "Advantage definition",
      "eq": "$$ A^\\pi(s,a)=Q^\\pi(s,a)-V^\\pi(s) $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-advantage-definition"
    },
    {
      "title": "LLM policy",
      "eq": "$$ \\pi_\\theta(a_t\\mid s_t)=P_\\theta(y_t\\mid x,y_{1:t-1}) $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-llm-policy"
    },
    {
      "title": "Log-derivative trick",
      "eq": "$$ \\nabla J=\\int P_\\theta(\\tau)R(\\tau)\\nabla\\log P_\\theta(\\tau)\\,d\\tau,\\qquad \\nabla\\log P_\\theta(\\tau)=\\sum_t\\nabla\\log\\pi_\\theta(a_t\\mid s_t) $$",
      "source": "topics/policy-gradient.html#eq-policy-gradient-example-1-log-derivative-derivation-hw5-4-1"
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
    return `<div class="equation-explain">${parts.join("")}</div>`;
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
                  <div class="equation-math">${esc(item.eq).replace(/\\n/g, "<br />").replace(/\n/g, "<br />")}</div>
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

  document.addEventListener("DOMContentLoaded", () => {
    renderEquationSheet();
    const input = document.getElementById("searchInput");
    if (input) input.addEventListener("input", applyEquationSearch);
    document.addEventListener("click", e => {
      if (e.target.closest(".lang-switch button")) setTimeout(renderEquationSheet, 0);
    });
  });

  window.EQUATION_SHEET = { data: EQUATION_DATA, render: renderEquationSheet };
})();
