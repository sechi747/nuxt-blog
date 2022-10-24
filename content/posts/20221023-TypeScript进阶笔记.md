---
title: 《TypeScript全面进阶指南》笔记
date: 2022/10/23 21:43:15
updated: 2022/10/23 21:43:15
categories:
- 技术
tags:
- Typescript
- 笔记
---
# 原始类型与对象类型

```typescript
const name: string = 'sechi';
const age: number = 24;
const male: boolean = false;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { name, age, male };
const bigintVar1: bigint = 9007199254740991n;
const bigintVar2: bigint = BigInt(9007199254740991);
const symbolVar: symbol = Symbol('unique');
```

在没有开启`strictNullChecks`的情况下，`null` 和 `undefined` 会被认为是其他类型的子类型。

#### 数组

数组类型：

```typescript
const arr1: string[] = [];
const arr2: Array<string> = [];
// 元组
const arr4: [string, number, boolean] = ['sechi', 599, true];
```

元组会对数组的合法边界的索引进行校验。

```typescript
const arr6: [string, number?, boolean?] = ['sechi'];
// 下面这么写也可以
// const arr6: [string, number?, boolean?] = ['sechi', , ,];
type TupleLength = typeof arr6.length; // 1 | 2 | 3
```

对于标记为可选的成员，在 `--strictNullCheckes` 配置下会被视为一个 `string | undefined` 的类型。此时元组的长度属性也会发生变化，比如上面的元组 arr6 ，其长度的类型为 `1 | 2 | 3`

#### interface

```typescript
interface IDescription {
  readonly name: string;
  age: number;
}

const obj3: IDescription = {
  name: 'sechi',
  age: 599,
};
// 无法分配到 "name" ，因为它是只读属性
obj3.name = "747";
```

其实在数组与元组层面也有着只读的修饰，但与对象类型有着两处不同。

- 你只能将整个数组/元组标记为只读，而不能像对象那样标记某个属性为只读。
- 一旦被标记为只读，那这个只读数组/元组的类型上，将不再具有 push、pop 等方法（即会修改原数组的方法），因此报错信息也将是**类型 xxx 上不存在属性“push”这种**。这一实现的本质是**只读数组与只读元组的类型实际上变成了 ReadonlyArray，而不再是 Array。**

interface 用来描述**对象、类的结构**，而类型别名(type)用来**将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型**。

### object、Object 以及 { }

```typescript
// 对于 undefined、null、void 0 ，需要关闭 strictNullChecks
const tmp1: Object = undefined;
const tmp2: Object = null;
const tmp3: Object = void 0;

const tmp4: Object = 'sechi';
const tmp5: Object = 599;
const tmp6: Object = { name: 'sechi' };
const tmp7: Object = () => {};
const tmp8: Object = [];
```

和 Object 类似的还有 Boolean、Number、String、Symbol，这几个**装箱类型（Boxed Types）** 同样包含了一些超出预期的类型。以 String 为例，它同样包括 undefined、null、void，以及代表的 **拆箱类型（Unboxed Types）** string，但并不包括其他装箱类型对应的拆箱类型，如 boolean 与 基本对象类型,**在任何情况下都不应该使用这些装箱类型。**

```typescript
const tmp9: String = undefined;
const tmp10: String = null;
const tmp11: String = void 0;
const tmp12: String = 'sechi';

// 以下不成立，因为不是字符串类型的拆箱类型
const tmp13: String = 599; // X
const tmp14: String = { name: 'sechi' }; // X
const tmp15: String = () => {}; // X
const tmp16: String = []; // X
```

object 的引入就是为了解决对 Object 类型的错误使用，它代表**所有非原始类型的类型，即数组、对象与函数类型这些**：

```typescript
const tmp17: object = undefined;
const tmp18: object = null;
const tmp19: object = void 0;

const tmp20: object = 'sechi';  // X 不成立，值为原始类型
const tmp21: object = 599; // X 不成立，值为原始类型

const tmp599: object = { name: 'sechi' };
const tmp23: object = () => {};
const tmp24: object = [];
```

最后是`{}`，一个奇奇怪怪的空对象，可以认为`{}`就是一个对象字面量类型或者可以认为使用`{}`作为类型签名就是一个合法的，但**内部无属性定义的空对象**，这类似于 Object，它意味着任何非 null / undefined 的值：

```typescript
const tmp25: {} = undefined; // 仅在关闭 strictNullChecks 时成立，下同
const tmp26: {} = null;
const tmp27: {} = void 0; // void 0 等价于 undefined

const tmp28: {} = 'sechi';
const tmp29: {} = 599;
const tmp30: {} = { name: 'sechi' };
const tmp31: {} = () => {};
const tmp32: {} = [];
// 虽然能够将其作为变量的类型，但实际上无法对这个变量进行任何赋值操作
tmp30.age = 18; // X 类型“{}”上不存在属性“age”。
```

当某个变量的具体类型仅能确定它不是原始类型时，可以使用 object。但更推荐进一步区分，也就是使用 `Record<string, unknown>` 或 `Record<string, any>` 表示对象，`unknown[]` 或 `any[]` 表示数组，`(...args: any[]) => any`表示函数。

# 字面量类型与枚举

#### 字面量类型

**字面量类型（Literal Types）**，它代表着比原始类型更精确的类型，同时也是原始类型的子类型。字面量类型主要包括**字符串字面量类型**、**数字字面量类型**、**布尔字面量类型**和**对象字面量类型**，它们可以直接作为类型标注：

```typescript
interface Tmp {
  bool: true | false;
  num: 1 | 2 | 3;
  str: "a" | "b" | "c"
}

const tmp: Tmp = {
    bool: true,
    num: 2,
    str: "c"
}
```

#### 联合类型

**联合类型（Union Types）**，它代表了**一组类型的可用集合**，只要最终赋值的类型属于联合类型的成员之一，就可以认为符合这个联合类型：

```typescript
interface Tmp {
  mixed: true | string | 599 | {} | (() => {}) | (1 | 2)
}
```

- 对于联合类型中的函数类型，需要使用括号`()`包裹起来
- 函数类型并不存在字面量类型，因此这里的 `(() => {})` 就是一个合法的函数类型
- 可以在联合类型中进一步嵌套联合类型，但这些嵌套的联合类型最终都会被展平到第一级中

联合类型的常用场景之一是通过多个对象类型的联合，来实现手动的互斥属性，即这一属性如果有字段1，那就没有字段2：

```typescript
interface Tmp {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

declare var tmp: Tmp;

if (tmp.user.vip) {
  console.log(tmp.user.expires);
}
```

#### 对象字面量类型

类似的，对象字面量类型就是一个对象类型的值。当然，这也就意味着这个对象的值全都为字面量值：

```typescript
interface Tmp {
  obj: {
    name: "linbudu",
    age: 18
  }
}

const tmp: Tmp = {
  obj: {
    name: "linbudu",
    age: 18
  }
}
```

如果要实现一个对象字面量类型，意味着完全的实现这个类型每一个属性的每一个值。对象字面量类型在实际开发中的使用较少，只需要了解。

需要注意的是，**无论是原始类型还是对象类型的字面量类型，它们的本质都是类型而不是值**。它们在编译时同样会被擦除，同时也是被存储在内存中的类型空间而非值空间。

#### 枚举

```typescript
enum PageUrl {
  Home_Page_Url = "url1",
  Setting_Page_Url = "url2",
  Share_Page_Url = "url3",
}

const home = PageUrl.Home_Page_Url;
```

如果没有声明枚举的值，它会默认使用数字枚举，并且从 0 开始，以 1 递增：

```typescript
enum Items {
  Foo,
  Bar,
  Baz
}
console.log(Items.Foo) // 0
console.log(Items.Bar) // 1
```

如果只为某一个成员指定了枚举值，那么之前未赋值成员仍然会使用从 0 递增的方式，之后的成员则会开始从枚举值递增：

```typescript
enum Items {
  // 0 
  Foo,
  Bar = 599,
  // 600
  Baz
}
```

在数字型枚举中，可以使用延迟求值的枚举值，比如函数：

```typescript
const returnNum = () => 100 + 499;

enum Items {
  Foo = returnNum(),
  Bar = 599,
  Baz
}
```

但要注意，延迟求值的枚举值是有条件的。**如果你使用了延迟求值，那么没有使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后（如上例），或者放在第一位**：

```typescript
enum Items {
  Baz,
  Foo = returnNum(),
  Bar = 599,
}
```

枚举和对象的重要差异在于，**对象是单向映射的**，我们只能从键映射到键值。而**枚举是双向映射的**，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员：

```typescript
enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; // 0
const fooKey = Items[0]; // "Foo"

// 编译后
"use strict";
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items[Items["Bar"] = 1] = "Bar";
    Items[Items["Baz"] = 2] = "Baz";
})(Items || (Items = {}));
```

但需要注意的是，仅有值为数字的枚举成员才能够进行这样的双向枚举，**字符串枚举成员仍然只会进行单次映射**

常量枚举和枚举相似，只是其声明多了一个 `const`：

```typescript
const enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; // 0

// 编译后
const fooValue = 0 /* Foo */; // 0
```

它和普通枚举的差异主要在访问性与编译产物。对于常量枚举，你**只能通过枚举成员访问枚举值**（而不能通过值访问成员）。同时，在编译产物中并不会存在一个额外的辅助对象（如上面的 Items 对象），对枚举成员的访问会被**直接内联替换为枚举的值**。



