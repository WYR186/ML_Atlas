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
      "source": "topics/mdp.html#mdp-en",
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
      "source": "topics/policy-gradient.html#eq-policy-gradient-example-1-log-derivative-derivation-hw5-4-1",
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
