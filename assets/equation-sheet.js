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
      "source": "topics/knn.html#eq-knn-classification-majority-vote"
    },
    {
      "title": "Regression (mean)",
      "eq": "$$ \\hat{y}(x)=\\frac{1}{k}\\sum_{x_i\\in \\mathcal{N}_k(x)} y_i $$",
      "source": "topics/knn.html#eq-knn-regression-mean"
    },
    {
      "title": "Euclidean distance",
      "eq": "$$ d(x,x_i)=\\|x-x_i\\|_2=\\sqrt{\\sum_j (x_j-x_{ij})^2} $$",
      "source": "topics/knn.html#eq-knn-euclidean-distance"
    }
  ],
  "naive-bayes": [
    {
      "title": "Conditional independence",
      "eq": "$$ P(X_1,\\ldots,X_d\\mid Y)=\\prod_{j=1}^{d} P(X_j\\mid Y) $$",
      "source": "topics/naive-bayes.html#eq-naive-bayes-conditional-independence"
    },
    {
      "title": "MAP decision",
      "eq": "$$ \\hat{y}=\\arg\\max_y P(Y=y)\\prod_j P(X_j\\mid y) $$",
      "source": "topics/naive-bayes.html#eq-naive-bayes-map-decision"
    },
    {
      "title": "Log-space implementation",
      "eq": "$$ \\hat{y}=\\arg\\max_y\\Big[\\log P(y)+\\sum_j\\log P(X_j\\mid y)\\Big] $$",
      "source": "topics/naive-bayes.html#eq-naive-bayes-log-space-implementation"
    },
    {
      "title": "Each feature is Gaussian per class",
      "eq": "$$ P(X_j\\mid Y=y)=\\mathcal{N}(X_j;\\,\\mu_{y,j},\\,\\sigma_{y,j}^2) $$",
      "source": "topics/naive-bayes.html#eq-naive-bayes-each-feature-is-gaussian-per-class"
    }
  ],
  "linear-regression": [
    {
      "title": "Design-matrix objective",
      "eq": "$$ \\min_w \\; \\frac12\\|Y-Xw\\|_2^2 $$",
      "source": "topics/linear-regression.html#eq-linear-regression-design-matrix-objective"
    },
    {
      "title": "Gradient",
      "eq": "$$ \\nabla_w \\frac12\\|Y-Xw\\|_2^2 = X^\\top(Xw-Y) $$",
      "source": "topics/linear-regression.html#eq-linear-regression-gradient"
    },
    {
      "title": "Normal equation",
      "eq": "$$ X^\\top Xw^* = X^\\top Y,\\qquad w^*=(X^\\top X)^{-1}X^\\top Y $$",
      "source": "topics/linear-regression.html#eq-linear-regression-normal-equation"
    },
    {
      "title": "Ridge regularization",
      "eq": "$$ \\min_w \\frac12\\|Y-Xw\\|_2^2+\\frac{\\lambda}{2}\\|w\\|_2^2,\\qquad w^*=(X^\\top X+\\lambda I)^{-1}X^\\top Y $$",
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
          .concat(items.flatMap(item => [item.title, item.eq]))
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
