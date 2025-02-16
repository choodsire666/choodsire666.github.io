---
title: java编程思想
urlname: zq5ptssk15mzsucd
date: '2025-02-15 14:07:39'
updated: '2025-02-15 15:22:58'
description: '一切都是对象标识符(句柄, 指针, 引用), 不一定指向对象, 可能没有对象安全做法是, 一定要初始化"", 字符串常量数据保存在哪里寄存器(速度很快, 容器小, 数量有限.程序员无法执行控制)堆栈(速度仅此与寄存器, 容器比寄存器大得多(RAM), 用于保存标识符等, 对象不保证在堆栈), ...'
---
1. 一切都是对象
    1. 标识符(句柄, 指针, 引用), 不一定指向对象, 可能没有对象
    2. 安全做法是, 一定要初始化
    3. "", 字符串常量
    4. 数据保存在哪里
        1. 寄存器(速度很快, 容器小, 数量有限.程序员无法执行控制)
        2. 堆栈(速度仅此与寄存器, 容器比寄存器大得多(RAM), 用于保存标识符等, 对象不保证在堆栈), 程序需知道存储数据的大小,以便于分配空间和释放空间, 缺少灵活性
        3. 堆(RAM, 其中保存java对象), 程序不需要知道要分配多少空间, 也不需要知道数据存多久, 灵活性高. 代价: 分配空间会好烦更多时间
        4. 静态存储(RAM的某些固定区域)
        5. 常数存储(有些存在程序代码内部, 有些存在ROM中)
        6. 非RAM存储(流式对象(字节流, 网络传输等), 固定对象(存储在硬盘中))
    5. 基本数据类型: 就是值, 存在堆栈中. 字节大小不随机器变, 所以具有可移植性;

| 主类型 | 大小 | 最小值 | 最大值 | 包装器类型 |
| --- | --- | --- | --- | --- |
| boolean | 1位 |  |  | Boolean |
| byte | 8位 | -128 | 127 | Byte |
| short | 16位 | -2的15次方 | 2的15次方-1 | Short |
| char | 16位 | Unicode 0 | Unicode 2的16次方-1 | Character |
| int | 32位 | -2的31次方 | 2的31次方-1 | Integer |
| long | 64位 | -2的63次方 | 2的63次方-1 | Long |
| float | 32位 | IEEE754 | IEEE754 | Float |
| double | 64位 | IEEE754 | IEEE754 | Double |
| Void |  |  |  | Void |


java数组: 数组中的值在创建标识符时就会被初始化; 如果是包装类型或引用类型, 会初始化为null; 而主类型(基本数据类型)则会初始化为0; 这保证了java数组操作的安全性

2. 作用域: 值的作用域在变量定义开始, 花括号结束之前; 
3. 对象作用域: 可以脱离花括号存在, 标识没了, 但是对象还在; 对于这个来说, 有垃圾回收器(gc)来解决对象的回收问题
4. <font style="color:rgb(0,0,0);">类中的字段(成员属性), 有默认值</font>

<font style="color:rgb(0,0,0);">主类型 默认值 </font>

<font style="color:rgb(0,0,0);">Boolean false </font>

<font style="color:rgb(0,0,0);">Char '\u0000'(null) </font>

<font style="color:rgb(0,0,0);">byte (byte)0 </font>

<font style="color:rgb(0,0,0);">short (short)0 </font>

<font style="color:rgb(0,0,0);">int 0 </font>

<font style="color:rgb(0,0,0);">long 0L </font>

<font style="color:rgb(0,0,0);">float 0.0f </font>

<font style="color:rgb(0,0,0);">double 0.0d</font>

