![](https://cdn.nlark.com/yuque/0/2024/jpeg/43047777/1714815464994-80191d73-07f3-423b-a7f1-7160279c7c14.jpeg)

```shell
[BeanFactoryPostProcessor - postProcessBeanFactory()] [environment, systemProperties, systemEnvironment, applicationStartup, org.springframework.context.annotation.internalConfigurationAnnotationProcessor, org.springframework.context.annotation.ConfigurationClassPostProcessor.importRegistry, org.springframework.context.event.internalEventListenerProcessor, yootkBeanFactoryPostProcessor, org.springframework.context.event.internalEventListenerFactory]
[构造方法 - MessageBean()] 实例化MessageBean对象.
[BeanNameAware - setBeanName()] messageBean
[BeanClassLoaderAware - setBeanClassLoader()] sun.misc.Launcher$AppClassLoader@18b4aac2
[BeanFactoryAware - setBeanFactory()] org.springframework.beans.factory.support.DefaultListableBeanFactory@3712b94: defining beans [org.springframework.context.annotation.internalConfigurationAnnotationProcessor,org.springframework.context.annotation.internalAutowiredAnnotationProcessor,org.springframework.context.annotation.internalCommonAnnotationProcessor,org.springframework.context.event.internalEventListenerProcessor,org.springframework.context.event.internalEventListenerFactory,messageBean,yootkBeanFactoryPostProcessor,yootkBeanPostProcessor]; root of factory hierarchy
[BeanPostProcessor - postProcessorBeforeInitialization()] class com.xie.bean.lifecycle.MessageBean
[@PostConstruct - init()]
[InitializingBean - afterPropertiesSet()]进行MessageBean的初始化配置操作
[BeanPostProcessor - postProcessAfterInitialization()] class com.xie.bean.lifecycle.MessageBean
[SmartInitializingSingleton - afterSingletonsInstantiated()] MessageBean初始化完成, 单例模型
[@PreDestroy - destroy()]
[DisposableBean - destroy()] 销毁MessageBean对象

```
