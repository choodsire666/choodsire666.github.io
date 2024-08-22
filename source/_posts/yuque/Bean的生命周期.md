---
title: Bean的生命周期
urlname: liwtvoyyd090t4y9
date: '2024-05-04 16:07:10'
updated: '2024-05-04 19:50:41'
cover: 'http://raw.githubusercontent.com/gh/choodsire666/blog-img/Bean的生命周期/a5b6415999fa3177270fff6798797167.jpeg'
description: '[BeanFactoryPostProcessor - postProcessBeanFactory()] [environment, systemProperties, systemEnvironment, applicationStartup, org.springframework.co...'
---
![](http://raw.githubusercontent.com/gh/choodsire666/blog-img/Bean的生命周期/bee66244cd34923dd2813ab32e59c576.jpeg)

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
