(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{361:function(n,o){n.exports={attributes:{title:"读书笔记：《你不知道的 JavaScript》(1)",date:"2022/04/11 11:30:53",updated:"2022/04/11 11:30:53",categories:["技术"],tags:["读书笔记","Vanilla JS"]},html:'<p>本篇文章总结自《你不知道的 JavaScript (上卷)》的第一章，是基于书籍内容和我个人的理解总结的，所以可能会有一些纰漏，请酌情阅读（虽然可能只有我自己才会读）。</p>\n<h1>作用域是什么</h1>\n<h2>编译原理</h2>\n<p>JS 代码编译有三个步骤：</p>\n<ul>\n<li>\n<p>分词/词法分析（Tokenizing/Lexing）<br>\n这个过程会将代码分解为多个词法单元（token）。比如 <code>var a = 1;</code> 就会被分解为：<code>var</code>、<code>a</code>、<code>=</code>、<code>1</code>、<code>;</code>。</p>\n</li>\n<li>\n<p>解析/词法分析（Parsing）<br>\n这个过程会将词法单元流（数组）转换为抽象语法树（Abstract Syntax Tree, AST）。比如 <code>var a = 1;</code> 会变成下面这样子：</p>\n<pre class="language-js"><code class="language-js"><span class="token punctuation">{</span>\n  <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token string">"Program"</span><span class="token punctuation">,</span>\n  <span class="token string-property property">"start"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n  <span class="token string-property property">"end"</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>\n  <span class="token string-property property">"body"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token string">"VariableDeclaration"</span><span class="token punctuation">,</span>\n      <span class="token string-property property">"start"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n      <span class="token string-property property">"end"</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>\n      <span class="token string-property property">"declarations"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span>\n          <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token string">"VariableDeclarator"</span><span class="token punctuation">,</span>\n          <span class="token string-property property">"start"</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>\n          <span class="token string-property property">"end"</span><span class="token operator">:</span> <span class="token number">9</span><span class="token punctuation">,</span>\n          <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token string">"Identifier"</span><span class="token punctuation">,</span>\n            <span class="token string-property property">"start"</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>\n            <span class="token string-property property">"end"</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n            <span class="token string-property property">"name"</span><span class="token operator">:</span> <span class="token string">"a"</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token string-property property">"init"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token string-property property">"type"</span><span class="token operator">:</span> <span class="token string">"Literal"</span><span class="token punctuation">,</span>\n            <span class="token string-property property">"start"</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>\n            <span class="token string-property property">"end"</span><span class="token operator">:</span> <span class="token number">9</span><span class="token punctuation">,</span>\n            <span class="token string-property property">"value"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n            <span class="token string-property property">"raw"</span><span class="token operator">:</span> <span class="token string">"1"</span>\n          <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">]</span><span class="token punctuation">,</span>\n      <span class="token string-property property">"kind"</span><span class="token operator">:</span> <span class="token string">"var"</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token string-property property">"sourceType"</span><span class="token operator">:</span> <span class="token string">"module"</span>\n<span class="token punctuation">}</span>\n</code></pre>\n</li>\n<li>\n<p>代码生成<br>\n这个过程会将 AST 转换为可执行代码。抛开具体细节，其实就是将 <code>var a = 1;</code> 的 AST 转化为一组机器指令（字节码 =&gt; 机器码），用来创建一个叫作 <code>a</code> 的变量（包括分配内容等），并将一个值存储在 <code>a</code> 中。</p>\n</li>\n</ul>\n<p>JS 代码的编译大部分时候都是发生在代码执行前。</p>\n<h2>作用域</h2>\n<p>首先介绍三个概念：</p>\n<ul>\n<li>引擎<br>\n负责整个 JavaScript 程序的编译及执行过程</li>\n<li>编译器<br>\n负责词法分析、语法分析及代码生成等工作</li>\n<li>作用域<br>\n负责收集并维护由所有声明的标识符（变量）组成的一系列查询，并且管理当前执行代码对这些标识符的访问权限</li>\n</ul>\n<p>以 <code>var a = 1</code> 为例，编译器与作用域的交互如下：</p>\n<ol>\n<li>遇到 <code>var a</code> 时，编译器会询问作用域<strong>是否已经有一个该名称的变量存在于同一个作用域的集合中</strong>。如果是，那么编译器会忽略该变量的声明，然后继续编译；否则它会要求作用域在当前作用域的集合中声明一个新的变量，并命名为 <code>a</code></li>\n<li>接下来编译器会为引擎生成运行时所需的代码，这些代码用来处理 <code>a = 2</code> 的赋值操作。引擎运行时会先询问作用域，当前的作用域集合中是否存在一个名为 <code>a</code> 的变量。如果存在，引擎会使用这个变量。如果不存在，引擎会继续查找变量</li>\n<li>如果引擎最终找到了 <code>a</code> 变量，则会将 <code>2</code> 赋值给它；如果没找到，则会抛出一个异常</li>\n</ol>\n<h3>引擎的两种查询方式</h3>\n<p>引擎在寻找变量时有两种查询方式：<code>LHS</code>(Left Hand Side) 和 <code>RHS</code>(Right Hand Side)</p>\n<p>可以<strong>笼统地</strong>认为当变量出现在赋值操作的左侧时会进行 <code>LHS</code> 查询，出现在右侧时进行 <code>RHS</code> 查询。</p>\n<p>例如 <code>console.log(a)</code> 对 <code>a</code> 的引用就是一个 <code>RHS</code> 引用，因为 <code>a</code> 并没有被赋予任何值。相应的，需要去查找并取得 <code>a</code> 的值，这样才能将值传递给 <code>console.log(...)</code></p>\n<p>例如 <code>a = 2</code> 对 <code>a</code> 的引用是一个 <code>LHS</code> 引用，因为我们并不关心当前 <code>a</code> 的值是什么，只想为 <code>= 2</code> 这个赋值操作找到一个目标</p>\n<p>综上所述，可以将 <code>LHS</code> 理解为“赋值操作的目标是谁”，将 <code>RHS</code> 理解为“谁是操作赋值的源头”。也就是说 <code>LHS</code> 是<strong>赋值操作</strong>，<code>RHS</code> 是<strong>寻值操作</strong></p>\n<p>下面的代码既包含 <code>LHS</code> 也包含 <code>RHS</code>：</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>\n</code></pre>\n<p>首先 <code>foo(2)</code> 的函数调用需要对 foo 进行 <code>RHS</code> 引用，也就是去寻找 foo 的值。找 foo 的值后函数开始执行，当 <code>2</code> 被当作参数传递给 <code>foo(...)</code> 时，<code>2</code> 被赋值给了参数 <code>a</code>，因此需要进行 <code>LHS</code> 查询。这里还有对 <code>a</code> 进行的 <code>RHS</code> 引用，并将得到值传给了 <code>console.log(...)</code>。而 <code>console.log(...)</code> 本身也需要一个引用才能执行，因此会对 <code>console</code> 对象进行 <code>RHS</code> 查询，并检查得到的值是否有一个叫 <code>log</code> 的方法。最后，假设 <code>log(...)</code> 函数可以接收参数，则在将 <code>2</code> 赋值给其第一个参数前，这个参数需要进行一次 <code>LHS</code> 引用查询。</p>\n<p><img src="https://pic-go-20220331-1301395896.cos.ap-beijing.myqcloud.com/img/image-20220411105712261.png" alt="image-20220411105712261"></p>\n<h3>作用域嵌套</h3>\n<pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span>\n<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// 4</span>\n</code></pre>\n<p>上述代码中，对 <code>b</code> 进行的 <code>RHS</code> 引用无法在函数 <code>foo</code> 内部完成，但可以在上一级作用域中完成。遍历嵌套作用域链的规则很简单：引擎会从当前的<strong>执行作用域</strong>开始查找变量，如果找不到，就去上一级继续查找。当抵达最外层的<strong>全局作用域</strong>时，无论找到还是没找到，查找过程都会停止。</p>\n<h3>异常</h3>\n<pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span>\n    b <span class="token operator">=</span> a\n<span class="token punctuation">}</span>\n<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// Uncaught ReferenceError: b is not defined </span>\n</code></pre>\n<p><code>console.log(a + b)</code> 时，对 b 进行 RHS 查询是无法找到该变量的，因为它未声明，引擎会抛出 <code>ReferenceError</code> 异常。</p>\n<p>但如果执行的是 LHS 查询，且程序运行在“非严格模式”下，如果在全局作用域中也无法找到目标变量，则会在全局作用域下隐式地创建一个具有该名称的变量，并将其返回给引擎，比如下面的代码是可以正常运行的：</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    b <span class="token operator">=</span> a\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// 4</span>\n</code></pre>\n<p>但如果是“严格模式”下运行程序，则也会抛出 <code>ReferenceError</code> 异常：</p>\n<pre class="language-js"><code class="language-js"><span class="token string">\'use strict\'</span>\n<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    b <span class="token operator">=</span> a\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// Uncaught ReferenceError: b is not defined</span>\n</code></pre>\n<p>如果 RHS 查询找到了一个变量，但你尝试对这个变量的值进行不合理的操作，比如试图对一个字符串的值进行函数调用，那么引擎会抛出 <code>TypeError</code> 异常。</p>\n'}}}]);