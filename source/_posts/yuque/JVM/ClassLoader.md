## 概述
类加载器ClassLoader的作用：
`java.lang.ClassLoader` 是 Java 运行时环境中非常关键的一个组件，它的主要职责是根据应用程序的需求动态地加载 `.class` 文件（即字节码文件）到 Java 虚拟机 (JVM) 中。以下是 `ClassLoader` 的几个主要作用：
加载类：
加载类的二进制字节码到 JVM 中。
将这些静态的数据转换成方法区中的运行时数据结构。
在堆中创建一个 `java.lang.Class` 对象，作为方法区中这些数据的访问入口。
解析类：
解析类的依赖关系，如接口和父类。
解析类成员的符号引用到直接引用的过程。
链接类：
验证：确保加载的类符合 JVM 规范，如语法正确性和类型正确性。
准备：为类的静态变量分配内存并设置默认初始值。
解析：将类文件中的符号引用转换为直接引用。
初始化类：
执行类的初始化代码，如静态块和静态变量的赋值。
类隔离：
使用不同的类加载器可以加载相同名称的类，并且这些类在 JVM 中被认为是不同的类，从而实现类的隔离。
类加载器采用双亲委派模型，即子类加载器会委托父类加载器先尝试加载类，这有助于保证核心类库的稳定性和安全性。
缓存类：
一旦类被加载，通常会被缓存起来，以便后续请求时可以直接使用，而不需要重新加载。
动态加载：
支持在运行时动态加载新的类，这对于需要热部署或动态扩展的应用程序非常重要。
类加载器的层次结构包括以下几种典型的类加载器：
Bootstrap ClassLoader：启动类加载器，负责加载 JVM 核心类库 jre\lib\rt.jar，如 `java.lang.*` 和 `java.util.*` 等。
Extension ClassLoader：jre\lib\ext\*.jar; C:\WINDOWS\Sun\Java\lib\ext\*.jar 扩展类加载器，负责加载扩展目录下的类库。
Application ClassLoader：应用程序类加载器，也称为系统类加载器，负责加载应用程序的类路径（classpath）上的类。classpath, -cp, Manifest

![image.png](https://cdn.nlark.com/yuque/0/2024/png/43047777/1724310716118-fbe8599e-2858-489b-9183-c01eb6a98007.png#averageHue=%23b6915a&clientId=u438df1e2-247f-4&from=paste&height=764&id=u350e5fe4&originHeight=840&originWidth=1469&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=154433&status=done&style=none&taskId=uddb8abf0-2e07-4b65-afaa-080d15ed893&title=&width=1335.4545165093484)

## JVM加载类的方式
JVM加载类的方式有两种：

1. 隐式加载：即JVM自动加载需要的类到内存中，在我们在类中继承或者是引用某个类，JVM在解析这个类时发现引用的类不在内存中，那么就会自动将这些类加载到内存中。
2. 显示加载：通过调用ClassLoader类来加载一个类的方式。通过这种方式加载的一个类，而那个类又引用了其他类，那么其他类是隐式加载的。

![image.png](https://cdn.nlark.com/yuque/0/2024/png/43047777/1724313137709-056a6e7f-37a2-48a6-9fd8-77c0146d6079.png#averageHue=%23c9d9be&clientId=u438df1e2-247f-4&from=paste&height=425&id=u06d7039d&originHeight=467&originWidth=1039&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=182963&status=done&style=none&taskId=u2268437c-0af8-4333-a0c6-bed12f5c90f&title=&width=944.5454340729837)

通过findClass()函数来加载类，会通过URLClassPath类中的getResource()方法来获取Class对象。其中根据连接的类型来判断是用JarLoader还是FileLoader或者采用默认的Loader来加载类。

指定类的加载路径：
Bootstrap ClassLoader： -Xbootclasspath:  指定路径，会覆盖 -Xbootclasspath/a: 在后面新增路径，-Xbootclasspath/p: 在前面新增新路径
ExtClassLoader: -Djava.ext.dirs: 指定路径
AppClassLoader: -Djava.class.path, -cp, -classpath 或者是环境变量classpath

## Link链接

