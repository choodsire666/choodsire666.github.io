## 文件内容解释
其中采用汇编语言。通过反汇编Oolong生成。

magic number： cafebabe
/ / 52是jdk8
minor version: 两字节 
major version: 两字节
constants pool size
constants pool：
UTF8：2字节长度，n个自己的数据
Integer：4字节
Long：8字节
Float: 4字节
Double: 8字节
String: 2字节UTF8 index
Class: 2字节UTF8 index	
FieldRef: 1字节类型， 2字节Class index， 2字节的NameAndType index
MethodRef:1字节类型，2字节Class index， 2字节NameAndType index
Interface MethodRef: 1字节类型， 2字节Class index，2字节NameAndType index
NameAndType: 1字节类型， 2字节Name index和2字节Type index
access flags：如access flags = 33, 是一个纯public类
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43047777/1724293033043-f8ed9f2a-fd75-4dbb-9411-f722171669c1.png#averageHue=%23b7c6ad&clientId=u99154093-a89e-4&from=paste&height=226&id=uf96e32dc&originHeight=249&originWidth=498&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=73962&status=done&style=none&taskId=u2ca30ba1-bf62-4791-94ba-81fe551e8a8&title=&width=452.7272629146736)
ACC_PUBLIC: 表示是否是public修饰，0表示private
ACC_FINAL: 表示是否是final修饰
ACC_SUPER： 表示是否包含invokespecial, 也就是是否继承其他类
ACC_INTERFACE: 表示是否是接口类
ACC_ABSTRACT: 表示是否是抽象类
this: 指向其他常量，表示类名称。如： this = #6 也就是 0006
super: 指向其他常量，表示父类名称。如： super = #4 也就是 0004
interfaces: 如: 0 interfaces, 表示没实现任何接口
fields: 0000 0 fields
methods: 0002 2 methods
![image.png](https://cdn.nlark.com/yuque/0/2024/png/43047777/1724293861119-3d96dad9-3a4f-4696-b410-d4573cc45214.png#averageHue=%23c2d2b7&clientId=u99154093-a89e-4&from=paste&height=455&id=u2faae2be&originHeight=500&originWidth=1130&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=233965&status=done&style=none&taskId=u995ce352-9829-4492-a706-89724c37c84&title=&width=1027.272705007191)
ACC_PUBLIC：是否是public
ACC_PRIVATE: 是否是private
ACC_PROTECTED：是否是protected
ACC_STATIC: 是否是static
ACC_FINAL: 有没有被定义成final
ACC_SYNCHRONIZED: 有没有被定义成synchronized
ACC_VOLATILE: 有没有被定义成volatile
ACC_TRANSIENT: 有没有被定义成transient
ACC_NATIVE： 是否是native方法
ACC_ABSTRACT: 是否是abstract方法
// NameAndType
name：
type：
第n个方法或属性
name：什么方面的定义，如<Code>是代码方面定义
length: 4个字节，代码长度。编译后代码不能超过64K
// jvm加载类时，会在verify阶段check这两个数值，如果超过就拒绝加载类
max stack: 最大的栈深度
max locals: 本地常量的最大个数。
code length: 表示方法中的代码对应的jvm指令字节数
jvm指令区域
0 exception table entries: 使用的异常，0表示没有定义抛出异常
// 额外信息，如代码调试信息
1 code attributes: 
name: name = #10<LineNumberTable>
length: 4个字节，有多少字节描述
Line number table: 
length: 2个字节，表示只有一行对应关系
start pc: 0 line number: 7 表示运行指针的位置，和所在源码行号
1 classfile attributes:
name: name = #13<SourceFile>
length: 4个字节
sourcefile index = #14:  用于查找调试时应该关联到哪个源文件

## javap生成class文件结构
LineNumberTable:
line a: b
a 表示对应的是代码中的第几行。
b 代表该行代码指令的pc偏移量
LocalVariableTable：
start length slot name signature
start: 表示变量作用范围的起始地址
length：表示变量的占用的指令数对应的偏移量。
即作用域范围是[start, start + length]
slot: 该变量占用的slot编号，作用域范围不重复时可重复使用
name: 该变量的名字
signature：该变量的类型
