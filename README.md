# ML Atlas

ECE 449 / CS 446 期末复习路线图。从 Foundations → 经典 ML → 深度学习 → 现代序列模型 → 学习理论 / RL，整门课的核心算法、关键公式、考点与例题，配上 labuladong 风格的树形导航。

支持中英文切换（右上角 中 / EN 按钮）。

## Layout

```
.
├── index.html          路线图首页
├── cheatsheet.html     一页式速记
├── resources.html      课件 / 作业 / 教材索引
├── blocks/
│   ├── block1.html  Foundations · Probability / 线代 / Optimization
│   ├── block2.html  KNN · Naive Bayes
│   ├── block3.html  Linear · Logistic · SVM · Kernel
│   ├── block4.html  Trees · Ensemble · PCA · K-means
│   ├── block5.html  MLP · Backprop · CNN · RNN
│   ├── block6.html  AE · VAE · Contrastive
│   ├── block7.html  Attention · Transformer · LLM
│   ├── block8.html  Diffusion
│   ├── block9.html  Learning Theory
│   └── block10.html Reinforcement Learning
└── assets/
    ├── style.css       样式（树形图 + i18n 可见性）
    ├── i18n.js         中 / EN 切换 + 翻译字典
    ├── data.js         算法索引数据
    └── main.js         进度条 / 搜索 / SVG 连接线
```

## Local preview

直接用浏览器打开 `index.html` 即可，或者：

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## Notes

- 站内 `../slides/`、`../HW/`、`../book/` 链接指向同级目录的课件 / 作业 / 教材 PDF（未上传到仓库）。
- 进度记录通过 `localStorage` 保存在浏览器本地。
- 公式渲染使用 MathJax 3。
