---
title: JavaScript基础
date: 2022/08/23 23:41:08
updated: 2022/08/23 23:41:08
categories:
- 技术
tags:
- Vanilla JS
---
> 在路上一直走下去是比到达终点更重要的事。

最近开始过一遍基础，参考教材是 [现代JavaScript教程](https://zh.javascript.info)，遇到不熟悉或者不会的就记录下来，看到哪写到哪。



#### 类型

- 七种原始数据类型：

  - `number` 用于任何类型的数字：整数或浮点数，在 `±(253-1)` 范围内的整数。
  - `bigint` 用于任意长度的整数。
  - `string` 用于字符串：一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。
  - `boolean` 用于 `true` 和 `false`。
  - `null` 用于未知的值 —— 只有一个 `null` 值的独立类型。
  - `undefined` 用于未定义的值 —— 只有一个 `undefined` 值的独立类型。
  - `symbol` 用于唯一的标识符。

- 以及一种非原始数据类型：
- `object` 用于更复杂的数据结构。

判断类型： `typeof x` or `x instanceof X`

#### 类型转换

1. 字符串转换 `String(value)`

2. 数字类型转换 `Number(value)`; 

   | `undefined`     | `NaN`                                                        |
   | --------------- | ------------------------------------------------------------ |
   | `null`          | `0`                                                          |
   | `true 和 false` | `1` and `0`                                                  |
   | `string`        | 去掉首尾空白字符（空格、换行符 `\n`、制表符 `\t` 等）后的纯数字字符串中含有的数字。如果剩余字符串为空，则转换结果为 `0`。否则，将会从剩余字符串中“读取”数字。当类型转换出现 error 时返回 `NaN`。 |

3. 布尔类型转换 `Boolean(value)`

#### 转译器（Transpilers）

转换新的语法结构和运算符

```js
// 在运行转译器之前
height = height ?? 100;

// 在运行转译器之后
height = (height !== undefined && height !== null) ? height : 100;
```

#### 垫片（Polyfills）

转换内建新函数

```js
if (!Math.trunc) { // 如果没有这个函数
  // 实现它
  Math.trunc = function(number) {
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

#### 垃圾回收

垃圾回收的基本算法被称为 “mark-and-sweep”。

定期执行以下“垃圾回收”步骤：

- 垃圾收集器找到所有的根，并“标记”（记住）它们。
- 然后它遍历并“标记”来自它们的所有引用。
- 然后它遍历标记的对象并标记 **它们的** 引用。所有被遍历到的对象都会被记住，以免将来再次遍历到同一个对象。
- ……如此操作，直到所有可达的（从根部）引用都被访问到。
- 没有被标记的对象都会被删除。

![image-20220823225943076](https://pic-go-20220331-1301395896.cos.ap-beijing.myqcloud.com/img/image-20220823225943076.png)

#### 构造函数

当一个函数被使用 `new` 操作符执行时，它按照以下步骤：

1. 一个新的空对象被创建并分配给 `this`。
2. 函数体执行。通常它会修改 `this`，为其添加新的属性。
3. 返回 `this` 的值。

```js
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
```

在一个函数内部，我们可以使用 `new.target` 属性来检查它是否被使用 `new` 进行调用了。

```js
function User(name) {
  if (!new.target) {
    return new User(name);
  }

  this.name = name;
}

let john = User("John"); // 将调用重定向到新用户
alert(john.name); // John
```

构造函数中的`return`：

- 如果 `return` 返回的是一个对象，则返回这个对象，而不是 `this`。
- 如果 `return` 返回的是一个原始类型，则忽略。

#### symbol

```js
// Symbol(description)
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```

> symbol 不会被隐式转换为字符串类型
>
> ```js
> let id = Symbol("id");
> alert(id); // TypeError: Cannot convert a Symbol value to a string
> let id = Symbol("id");
> alert(id.toString()); // Symbol(id)
> let id = Symbol("id");
> alert(id.description); // id
> ```

```js
let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // 而不是 "id"：123
};
```

> symbol 不会参与迭代，如 `for...in`， `Object.keys()`

##### 全局 symbol

```js
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 symbol
alert( id === idAgain ); // true
```

```js
// 通过 name 获取 symbol
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 通过 symbol 获取 name
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

```js
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name，全局 symbol
alert( Symbol.keyFor(localSymbol) ); // undefined，非全局

alert( localSymbol.description ); // name
```

