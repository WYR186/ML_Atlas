// Course-wide content index. Used by main.js to render the algorithm table
// and to power search across topics.
window.COURSE_INDEX = [
  {
    block: 1, title: "Foundations · 概率 / 线代 / 优化", href: "blocks/block1.html",
    lectures: ["Lecture_1", "Lecture_2", "Lecture_3"],
    homework: ["hw1", "hw1_sol"],
    items: [
      {name: "Probability · 概率论", anchor: "probability", goal: "条件概率 / Bayes / 独立 / 期望方差", exam: "Bayes 计算 · NB 因子分解"},
      {name: "Linear Algebra · 线性代数", anchor: "linalg", goal: "点积 · 范数 · 矩阵 shape · 特征值 / 向量", exam: "梯度 shape · PCA"},
      {name: "Optimization · 优化", anchor: "opt", goal: "凸性 · GD · Lagrangian · 原对偶", exam: "Hessian PSD/PD · SVM 对偶"}
    ]
  },
  {
    block: 2, title: "KNN · Naive Bayes", href: "blocks/block2.html",
    lectures: ["Lecture_4", "Lecture_5"],
    homework: ["hw1", "hw2"],
    items: [
      {name: "KNN", anchor: "knn", goal: "找最近 k 个邻居投票/平均", exam: "距离表手算 · 维度灾难 · 特征缩放"},
      {name: "Naive Bayes", anchor: "nb", goal: "条件独立 · P(Y) P(X|Y) · MAP", exam: "log-space 预测 · GNB 边界"}
    ]
  },
  {
    block: 3, title: "Linear · Logistic · SVM · Kernel", href: "blocks/block3.html",
    lectures: ["Lecture_6", "Lecture_7", "Lecture_8", "Lecture_9"],
    homework: ["hw2", "hw2_sol"],
    items: [
      {name: "Linear Regression", anchor: "linreg", goal: "MSE 最小化 · 闭式解", exam: "正规方程 · 共线性"},
      {name: "Logistic Regression", anchor: "logreg", goal: "sigmoid + NLL · 线性边界", exam: "为什么边界线性 · log 损失"},
      {name: "SVM", anchor: "svm", goal: "最大间隔 · hinge · 支持向量", exam: "硬/软间隔 · hinge 计算"},
      {name: "Kernel Methods", anchor: "kernel", goal: "k(x,x')=φ(x)ᵀφ(x') · 核技巧", exam: "Polynomial / RBF · γ 直觉"}
    ]
  },
  {
    block: 4, title: "Trees · Ensemble · PCA · K-means", href: "blocks/block4.html",
    lectures: ["Lecture_10", "Lecture_11", "Lecture_12", "Lecture_13"],
    homework: ["hw3", "hw3_sol"],
    items: [
      {name: "Decision Trees", anchor: "dt", goal: "递归划分 · 熵 / IG / Gini", exam: "手算 IG · 过拟合"},
      {name: "Bagging", anchor: "bagging", goal: "并行 · bootstrap · 平均 → 降方差", exam: "vs Boosting"},
      {name: "Boosting / AdaBoost", anchor: "boosting", goal: "串行关注难样本 · 降偏差", exam: "对噪声敏感性"},
      {name: "PCA", anchor: "pca", goal: "中心化 · 协方差最大特征向量", exam: "为什么先中心化 · 2D 求 PC1"},
      {name: "K-means", anchor: "kmeans", goal: "WCSS 最小 · 分配 / 更新", exam: "手跑迭代 · 局部最优"}
    ]
  },
  {
    block: 5, title: "MLP · Backprop · CNN · RNN", href: "blocks/block5.html",
    lectures: ["Lecture_14", "Lecture_15", "Lecture_16", "Lecture_18", "Lecture_19"],
    homework: ["hw3", "hw4", "hw4_sol"],
    items: [
      {name: "Neural Networks (MLP)", anchor: "mlp", goal: "线性 → 非线性 → 学习复杂函数", exam: "XOR · 通用近似 · forward"},
      {name: "Backpropagation", anchor: "backprop", goal: "chain rule 在计算图上", exam: "shape check · local × upstream"},
      {name: "CNN", anchor: "cnn", goal: "局部连接 + 权重共享", exam: "输出尺寸公式（必考）"},
      {name: "RNN", anchor: "rnn", goal: "hidden state 处理时序 · BPTT", exam: "vanishing / exploding"},
      {name: "LSTM / GRU", anchor: "lstm", goal: "门控缓解长依赖", exam: "门控直觉对比"}
    ]
  },
  {
    block: 6, title: "AE · VAE · Contrastive", href: "blocks/block6.html",
    lectures: ["Lecture_20", "Lecture_21"],
    homework: ["hw4", "hw5"],
    items: [
      {name: "Auto-encoder", anchor: "ae", goal: "encoder-decoder 学压缩表示", exam: "AE vs PCA · 正则化变体"},
      {name: "VAE", anchor: "vae", goal: "ELBO + 重参数化 · 概率生成", exam: "Gaussian KL 默写 · ELBO 解释"},
      {name: "Contrastive Learning", anchor: "contrastive", goal: "InfoNCE 拉正推负", exam: "τ 作用 · 表示坍塌"}
    ]
  },
  {
    block: 7, title: "Attention · PE · Transformer · LLM", href: "blocks/block7.html",
    lectures: ["Lecture_22", "Lecture_23", "Lecture_24"],
    homework: ["hw5", "hw5_sol"],
    items: [
      {name: "Attention / Self-Attention", anchor: "attention", goal: "softmax(QKᵀ/√d) V", exam: "为什么除 √d · mask 必要性"},
      {name: "Positional Encoding", anchor: "pe", goal: "sin/cos 注入位置", exam: "PE(pos+k) 线性变换"},
      {name: "Transformer", anchor: "transformer", goal: "LN + MHA + FFN + Residual", exam: "block 组成 · 与 RNN 对比"},
      {name: "LLM", anchor: "llm", goal: "next-token NLL · perplexity", exam: "SFT / RLHF / ICL · BPE"}
    ]
  },
  {
    block: 8, title: "Diffusion Models", href: "blocks/block8.html",
    lectures: ["Lecture_25"],
    homework: ["hw5"],
    items: [
      {name: "Forward / Noising", anchor: "fwd", goal: "x_t = √ᾱ x_0 + √(1-ᾱ) ε", exam: "推导 q(x_t|x_0)"},
      {name: "Reverse / Denoising", anchor: "rev", goal: "学习 p_θ(x_{t-1}|x_t)", exam: "为什么预测 ε"},
      {name: "Diffusion ELBO", anchor: "elbo", goal: "重建 + 先验 + 一致性", exam: "三项分解 · 一致性项含义"}
    ]
  },
  {
    block: 9, title: "Learning Theory", href: "blocks/block9.html",
    lectures: ["Lecture_27", "final_review"],
    homework: ["hw5_sol"],
    items: [
      {name: "Bayes Error / Classifier", anchor: "bayes", goal: "0.5 阈值 · 不可突破下界", exam: "η(x) 阈值题"},
      {name: "Error Decomposition", anchor: "decomp", goal: "Estimation + Approx + Bayes", exam: "加数据 / 换模型 影响哪一项"},
      {name: "PAC · ERM · 样本复杂度", anchor: "pac", goal: "n ≥ (1/ε)(ln|F| + ln(1/δ))", exam: "代入计算样本量"},
      {name: "Hoeffding · VC dim", anchor: "vc", goal: "concentration + complexity", exam: "VC 翻倍 → 界变 √2"}
    ]
  },
  {
    block: 10, title: "Reinforcement Learning", href: "blocks/block10.html",
    lectures: ["Lecture_27", "final_review"],
    homework: [],
    items: [
      {name: "MDP", anchor: "mdp", goal: "(S, A, P, R, γ) · 马尔可夫性", exam: "五元组 · 与监督差异"},
      {name: "Value / Q function", anchor: "vq", goal: "V(s) vs Q(s,a)", exam: "区分 V/Q · 关系"},
      {name: "Bellman Optimality", anchor: "bellman", goal: "V*(s) = max_a Q*(s,a)", exam: "写方程 · 物理含义"},
      {name: "Value / Policy Iteration", anchor: "dp", goal: "model-known DP", exam: "比较两者 · 实际局限"},
      {name: "Q-learning", anchor: "qlearn", goal: "TD update · off-policy", exam: "一次更新计算 · on/off"},
      {name: "Policy Gradient", anchor: "pg", goal: "log-deriv trick · on-policy", exam: "为什么用 log 概率"}
    ]
  }
];

// Map slide / hw filenames to relative paths (one level down for /blocks/*.html)
window.PATHS = {
  slides: "../slides/",
  hw: "../HW/",
  book: "../book/",
  rootSlides: "slides/",
  rootHw: "HW/",
  rootBook: "book/"
};
