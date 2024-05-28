---
title: SpringBoot启动原理
urlname: clmzhcqg36gqzt00
date: '2024-04-08 12:35:09'
updated: '2024-04-08 14:03:16'
description: '容器初始化入口 AbstractApplicationContextAbstractApplicationContext#refresh()public void refresh() throws BeansException, IllegalStateException {     sync...'
cover: ''
---

1. 容器初始化入口 AbstractApplicationContext
2. AbstractApplicationContext#refresh()
```java
public void refresh() throws BeansException, IllegalStateException {
    synchronized(this.startupShutdownMonitor) {
        // 准备初始化, 这里加载了ApplicationListener
        this.prepareRefresh();
        // 这里是主要初始化函数, 调用了AbstractRefreshableApplicationContext#refreshBeanFactory()
        ConfigurableListableBeanFactory beanFactory = this.obtainFreshBeanFactory();
        this.prepareBeanFactory(beanFactory);

        try {
            this.postProcessBeanFactory(beanFactory);
            this.invokeBeanFactoryPostProcessors(beanFactory);
            this.registerBeanPostProcessors(beanFactory);
            this.initMessageSource();
            this.initApplicationEventMulticaster();
            this.onRefresh();
            this.registerListeners();
            this.finishBeanFactoryInitialization(beanFactory);
            this.finishRefresh();
        } catch (BeansException var9) {
            if (this.logger.isWarnEnabled()) {
                this.logger.warn("Exception encountered during context initialization - cancelling refresh attempt: " + var9);
            }

            this.destroyBeans();
            this.cancelRefresh(var9);
            throw var9;
        } finally {
            this.resetCommonCaches();
        }

    }
```

3. AbstractApplicationContext#prepareRefresh()
4. AbstractApplicationContext#obtainFreshBeanFactory()



```java
protected void prepareRefresh() {
        this.startupDate = System.currentTimeMillis();
        this.closed.set(false);
        this.active.set(true);
        if (this.logger.isDebugEnabled()) {
            if (this.logger.isTraceEnabled()) {
                this.logger.trace("Refreshing " + this);
            } else {
                this.logger.debug("Refreshing " + this.getDisplayName());
            }
        }

        this.initPropertySources();
        this.getEnvironment().validateRequiredProperties();
        if (this.earlyApplicationListeners == null) {
            this.earlyApplicationListeners = new LinkedHashSet(this.applicationListeners);
        } else {
            this.applicationListeners.clear();
            this.applicationListeners.addAll(this.earlyApplicationListeners);
        }

        this.earlyApplicationEvents = new LinkedHashSet();
    }
```
```java
protected final void refreshBeanFactory() throws BeansException {
    // 如果之前有BeanFactory就清除掉
    if (this.hasBeanFactory()) {
        this.destroyBeans();
        this.closeBeanFactory();
    }
    
    try {
        // 得到BeanFactory
        DefaultListableBeanFactory beanFactory = this.createBeanFactory();
        beanFactory.setSerializationId(this.getId());
        this.customizeBeanFactory(beanFactory);
        // 加载BeanDefinitions AnnotationConfigWebApplicationContext#loadBeanDefinitions()
        this.loadBeanDefinitions(beanFactory);
        this.beanFactory = beanFactory;
    } catch (IOException var2) {
        throw new ApplicationContextException("I/O error parsing bean definition source for " + this.getDisplayName(), var2);
    }
}
```
```java
protected void loadBeanDefinitions(DefaultListableBeanFactory beanFactory) {
    // BeanDefinitionReader
    AnnotatedBeanDefinitionReader reader = this.getAnnotatedBeanDefinitionReader(beanFactory);
    ClassPathBeanDefinitionScanner scanner = this.getClassPathBeanDefinitionScanner(beanFactory);
    BeanNameGenerator beanNameGenerator = this.getBeanNameGenerator();
    if (beanNameGenerator != null) {
        reader.setBeanNameGenerator(beanNameGenerator);
        scanner.setBeanNameGenerator(beanNameGenerator);
        beanFactory.registerSingleton("org.springframework.context.annotation.internalConfigurationBeanNameGenerator", beanNameGenerator);
    }
    
    ScopeMetadataResolver scopeMetadataResolver = this.getScopeMetadataResolver();
    if (scopeMetadataResolver != null) {
        reader.setScopeMetadataResolver(scopeMetadataResolver);
        scanner.setScopeMetadataResolver(scopeMetadataResolver);
    }
    
    if (!this.componentClasses.isEmpty()) {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Registering component classes: [" + StringUtils.collectionToCommaDelimitedString(this.componentClasses) + "]");
        }
    
        reader.register(ClassUtils.toClassArray(this.componentClasses));
    }
    
    if (!this.basePackages.isEmpty()) {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Scanning base packages: [" + StringUtils.collectionToCommaDelimitedString(this.basePackages) + "]");
        }
    
        scanner.scan(StringUtils.toStringArray(this.basePackages));
    }
    
    String[] configLocations = this.getConfigLocations();
    if (configLocations != null) {
        String[] var7 = configLocations;
        int var8 = configLocations.length;
    
        for(int var9 = 0; var9 < var8; ++var9) {
            String configLocation = var7[var9];
    
            try {
                Class<?> clazz = ClassUtils.forName(configLocation, this.getClassLoader());
                if (this.logger.isTraceEnabled()) {
                    this.logger.trace("Registering [" + configLocation + "]");
                }

                // 注册BeanDefinition, 其实就是循环调用了doRegisterBean(beanClass, name, ...)
                // 根据注解如@Primary, @Lazy, @Quilifier等, 给AnnotationGenericBeanDefinition设置上
                reader.register(new Class[]{clazz});
            } catch (ClassNotFoundException var13) {
                if (this.logger.isTraceEnabled()) {
                    this.logger.trace("Could not load class for config location [" + configLocation + "] - trying package scan. " + var13);
                }
    
                int count = scanner.scan(new String[]{configLocation});
                if (count == 0 && this.logger.isDebugEnabled()) {
                    this.logger.debug("No component classes found for specified class/package [" + configLocation + "]");
                }
            }
        }
    }

}
```
```java
BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(abd, beanName);
// 底层是判断是不是代理模式是不是TargetClass(cglib), 需不需要生成动态代理对象
// 会调用DefaultListableBeanFactory#registerBeanDefinition
definitionHolder = AnnotationConfigUtils.applyScopedProxyMode(scopeMetadata, definitionHolder, this.registry);
// 注册BeanDefinition
BeanDefinitionReaderUtils.registerBeanDefinition(definitionHolder, this.registry);
```
