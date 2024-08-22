---
title: Spring容器的启动
urlname: empp2z8whcw2fbq8
date: '2024-05-04 17:42:47'
updated: '2024-05-05 19:27:56'
description: 'public AnnotationConfigApplicationContext() {     // 记录启动步骤     StartupStep createAnnotatedBeanDefReader = this.getApplicationStartup().start("spri...'
cover: 'http://raw.githubusercontent.com/gh/choodsire666/blog-img/Spring容器的启动/cover.jpg'
---
```java
public AnnotationConfigApplicationContext() {
    // 记录启动步骤
    StartupStep createAnnotatedBeanDefReader = this.getApplicationStartup().start("spring.context.annotated-bean-reader.create");
    // 得到AnnotationBeanDefinitionReader
    this.reader = new AnnotatedBeanDefinitionReader(this);
    createAnnotatedBeanDefReader.end();
    // 得到ClassPathBeanDefinitionScanner
    this.scanner = new ClassPathBeanDefinitionScanner(this);
}

public AnnotationConfigApplicationContext(Class<?>... componentClasses) {
    this();
    register(componentClasses);
    // 启动
    refresh();
}

public AnnotationConfigApplicationContext(String... basePackages) {
    this();
    scan(basePackages);
    // 启动
    refresh();
}
```
```java
public void refresh() throws BeansException, IllegalStateException {
    synchronized(this.startupShutdownMonitor) { // Object同步锁
        // 启动步骤的记录
        StartupStep contextRefresh = this.applicationStartup.start("spring.context.refresh");
        this.prepareRefresh(); // 准备刷新
        // 实例化一个BeanFactory, 调用子类的refreshBeanFactory(), 和getBeanFactory()方法
        // 加载好了Bean定义, 并且注册了Bean定义和Alias
        ConfigurableListableBeanFactory beanFactory = this.obtainFreshBeanFactory();
        this.prepareBeanFactory(beanFactory); // 初始化BeanFactory
        try {
            this.postProcessBeanFactory(beanFactory); // 对BeanFactory进行后处理
            // 启动步骤的记录
            StartupStep beanPostProcess = this.applicationStartup.start("spring.context.beans.post-process");
            this.invokeBeanFactoryPostProcessors(beanFactory); // 执行BeanFactoryPostProcessors
            this.registerBeanPostProcessors(beanFactory); // 注册BeanPostProcessors
            beanPostProcess.end(); // BeanPostProcessors的执行
            this.initMessageSource(); // 初始化MessageSource, 用于国际化支持
            this.initApplicationEventMulticaster(); // 初始化事件广播, 用于发布和广播应用事件
            this.onRefresh(); // 允许子类在刷新时进行额外的初始化, 空方法
            this.registerListeners(); // 注册监听器
            this.finishBeanFactoryInitialization(beanFactory); // 完成BeanFactory初始化, 实例化所有单例Bean并执行初始化回调
            this.finishRefresh(); // 完成刷新
        } catch (BeansException var10) {
            if (this.logger.isWarnEnabled()) { // 记录日志
                this.logger.warn("Exception encountered during context initialization - cancelling refresh attempt: " + var10);
            }
            this.destroyBeans(); // 销毁bean
            this.cancelRefresh(var10); // 激活状态设置为false, 取消刷新
            throw var10;
        } finally {
            this.resetCommonCaches(); // 重置缓冲, 释放资源
            contextRefresh.end(); // 上下文刷新, 结束启动步骤
        }
    }
}
```

```java
protected void prepareRefresh() {
    this.startupDate = System.currentTimeMillis(); // 记录启动时间
    this.closed.set(false); // 关闭状态设置为false
    this.active.set(true); // 激活状态设置为true
    if (this.logger.isDebugEnabled()) { // 判断日志级别, 打印debug或trace日志
        if (this.logger.isTraceEnabled()) {
            this.logger.trace("Refreshing " + this);
        } else {
            this.logger.debug("Refreshing " + this.getDisplayName());
        }
    }

    this.initPropertySources(); // 初始化配置属性源, 这些属性通常来自配置文件或其他外部配置服务
    this.getEnvironment().validateRequiredProperties(); // 确保所有必需的环境属性都已设置，避免后续操作因缺失关键配置而失败
    // 初始化并清除早期应用监听器
    if (this.earlyApplicationListeners == null) {
        this.earlyApplicationListeners = new LinkedHashSet(this.applicationListeners);
    } else {
        this.applicationListeners.clear();
        this.applicationListeners.addAll(this.earlyApplicationListeners);
    }

    // 准备早期应用事件集合
    this.earlyApplicationEvents = new LinkedHashSet();
}
```
obtainFreshBeanFactory
```java
protected final void refreshBeanFactory() throws IllegalStateException {
    // 只能refresh一次. 否则报错
    if (!this.refreshed.compareAndSet(false, true)) {
        throw new IllegalStateException(
            "GenericApplicationContext does not support multiple refresh attempts: just call 'refresh' once");
    }
    this.beanFactory.setSerializationId(getId());
}
```
```java
protected final void refreshBeanFactory() throws BeansException {
    // 如果当前已有bean工厂存在，则先销毁bean并关闭工厂
    if (this.hasBeanFactory()) {
        this.destroyBeans();
        this.closeBeanFactory();
    }
    
    try {
         // 创建一个新的bean工厂，并设置其序列化ID
        DefaultListableBeanFactory beanFactory = this.createBeanFactory();
        beanFactory.setSerializationId(this.getId());
        // 定制bean工厂，可以控制是否允许覆盖bean定义, 可以控制是否允许循环引用。
        this.customizeBeanFactory(beanFactory);
        // 加载bean定义到bean工厂中
        this.loadBeanDefinitions(beanFactory);
        // 更新当前的bean工厂引用
        this.beanFactory = beanFactory;
    } catch (IOException var2) {
        throw new ApplicationContextException("I/O error parsing bean definition source for " + this.getDisplayName(), var2);
    }
}
```
```java
public final ConfigurableListableBeanFactory getBeanFactory() {
    DefaultListableBeanFactory beanFactory = this.beanFactory;
    if (beanFactory == null) {
        throw new IllegalStateException("BeanFactory not initialized or already closed - call 'refresh' before accessing beans via the ApplicationContext");
    } else {
        return beanFactory;
    }
}
```
```java
protected void loadBeanDefinitions(DefaultListableBeanFactory beanFactory) {
    // 创建注解Bean定义读取器和类路径Bean定义扫描器
    AnnotatedBeanDefinitionReader reader = this.getAnnotatedBeanDefinitionReader(beanFactory);
    ClassPathBeanDefinitionScanner scanner = this.getClassPathBeanDefinitionScanner(beanFactory);
    // 设置Bean名称生成器, 可以通过注解的value属性得到beanName
    BeanNameGenerator beanNameGenerator = this.getBeanNameGenerator();
    if (beanNameGenerator != null) {
        reader.setBeanNameGenerator(beanNameGenerator);
        scanner.setBeanNameGenerator(beanNameGenerator);
        beanFactory.registerSingleton("org.springframework.context.annotation.internalConfigurationBeanNameGenerator", beanNameGenerator);
    }

    // 设置作用域元数据解析器, 可以通过Scope注解中的value值得到ScopeName和ScopeProxyMode, 从而设置ScopeMetadata对象
    ScopeMetadataResolver scopeMetadataResolver = this.getScopeMetadataResolver();
    if (scopeMetadataResolver != null) {
        reader.setScopeMetadataResolver(scopeMetadataResolver);
        scanner.setScopeMetadataResolver(scopeMetadataResolver);
    }

    // 注册组件类
    if (!this.componentClasses.isEmpty()) {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Registering component classes: [" + StringUtils.collectionToCommaDelimitedString(this.componentClasses) + "]");
        }
    
        reader.register(ClassUtils.toClassArray(this.componentClasses));
    }

    // 扫描基础包
    if (!this.basePackages.isEmpty()) {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Scanning base packages: [" + StringUtils.collectionToCommaDelimitedString(this.basePackages) + "]");
        }
    
        scanner.scan(StringUtils.toStringArray(this.basePackages));
    }

    // 处理配置位置
    String[] configLocations = this.getConfigLocations();
    if (configLocations != null) {
        String[] var7 = configLocations;
        int var8 = configLocations.length;
    
        for(int var9 = 0; var9 < var8; ++var9) {
            String configLocation = var7[var9];
    
            try {
                // 尝试通过类名注册Bean
                Class<?> clazz = ClassUtils.forName(configLocation, this.getClassLoader());
                if (this.logger.isTraceEnabled()) {
                    this.logger.trace("Registering [" + configLocation + "]");
                }
    
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
private <T> void doRegisterBean(Class<T> beanClass, @Nullable String name, @Nullable Class<? extends Annotation>[] qualifiers, @Nullable Supplier<T> supplier, @Nullable BeanDefinitionCustomizer[] customizers) {
    // 这个对象用于存储关于Bean的元数据，包括其类型、注解等信息
    AnnotatedGenericBeanDefinition abd = new AnnotatedGenericBeanDefinition(beanClass);
    // 检查是否应基于条件逻辑跳过当前Bean的注册。如果评估结果为真，即条件不满足，则直接结束方法，不执行后续注册流程
    // @Condition注解的判断
    if (!this.conditionEvaluator.shouldSkip(abd.getMetadata())) {
        // 这允许在Bean实例化时使用延迟加载或其他定制逻辑
        abd.setInstanceSupplier(supplier);
        // 得到Bean的ScopeName, 和ScopeProxyMode
        ScopeMetadata scopeMetadata = this.scopeMetadataResolver.resolveScopeMetadata(abd);
        // 设置ScopeName
        abd.setScope(scopeMetadata.getScopeName());
        // 生成beanName, 例如@Component注解中的value属性值
        String beanName = name != null ? name : this.beanNameGenerator.generateBeanName(abd, this.registry);
        // 根据是否有Lazy, Primary, DependsOn, Role, Description注解来设置abd中对应的属性值
        AnnotationConfigUtils.processCommonDefinitionAnnotations(abd);
        int var10;
        int var11;
        // 不用看, 目前是null
        // 遍历这些限定符（如@Primary, @Lazy等），根据限定符类型修改Bean定义的属性（如标记为首要Bean或设置延迟初始化），或添加相应的资格标识。
        if (qualifiers != null) {
            Class[] var9 = qualifiers;
            var10 = qualifiers.length;

            for(var11 = 0; var11 < var10; ++var11) {
                Class<? extends Annotation> qualifier = var9[var11];
                if (Primary.class == qualifier) {
                    abd.setPrimary(true);
                } else if (Lazy.class == qualifier) {
                    abd.setLazyInit(true);
                } else {
                    abd.addQualifier(new AutowireCandidateQualifier(qualifier));
                }
            }
        }

        // 允许对Bean定义进行进一步的定制操作，比如修改属性、添加额外的元数据等。
        if (customizers != null) {
            BeanDefinitionCustomizer[] var13 = customizers;
            var10 = customizers.length;

            for(var11 = 0; var11 < var10; ++var11) {
                BeanDefinitionCustomizer customizer = var13[var11];
                customizer.customize(abd);
            }
        }

        // 封装Bean定义和名称到BeanDefinitionHolder中。
        BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(abd, beanName);
        // 根据作用域元数据应用作用域代理模式，这可能涉及为Bean创建代理以支持例如原型作用域的代理等特性。
        definitionHolder = AnnotationConfigUtils.applyScopedProxyMode(scopeMetadata, definitionHolder, this.registry);
        // 将准备好的BeanDefinitionHolder注册到Spring的Bean工厂或应用上下文中，完成Bean定义的注册过程, 注册了BeanAlias
        BeanDefinitionReaderUtils.registerBeanDefinition(definitionHolder, this.registry);
    }
}
```
```java
static BeanDefinitionHolder applyScopedProxyMode(ScopeMetadata metadata, BeanDefinitionHolder definition, BeanDefinitionRegistry registry) {
    ScopedProxyMode scopedProxyMode = metadata.getScopedProxyMode();
    // 不需要代理, 就直接返回definition
    if (scopedProxyMode.equals(ScopedProxyMode.NO)) { 
        return definition;
    } else {
        boolean proxyTargetClass = scopedProxyMode.equals(ScopedProxyMode.TARGET_CLASS);
        // 如果是要代理调用这个
        return ScopedProxyCreator.createScopedProxy(definition, registry, proxyTargetClass);
    }
}
```
```java
public static BeanDefinitionHolder createScopedProxy(BeanDefinitionHolder definition,
                                                     BeanDefinitionRegistry registry, boolean proxyTargetClass) {
    // 从输入参数中获取原始bean的定义（BeanDefinition）和名称
    String originalBeanName = definition.getBeanName();
    // 根据原始bean名称创建一个内部目标bean的唯一名称。
    BeanDefinition targetDefinition = definition.getBeanDefinition();
    String targetBeanName = getTargetBeanName(originalBeanName);

    // Create a scoped proxy definition for the original bean name,
    // "hiding" the target bean in an internal target definition.
    // 创建了一个作用域代理
    RootBeanDefinition proxyDefinition = new RootBeanDefinition(ScopedProxyFactoryBean.class);
    // 设置要代理哪个bean
    proxyDefinition.setDecoratedDefinition(new BeanDefinitionHolder(targetDefinition, targetBeanName));
    // 保留原始bean的来源信息、角色等属性
    proxyDefinition.setOriginatingBeanDefinition(targetDefinition);
    proxyDefinition.setSource(definition.getSource());
    proxyDefinition.setRole(targetDefinition.getRole());

    proxyDefinition.getPropertyValues().add("targetBeanName", targetBeanName);

    // 根据proxyTargetClass参数决定是否创建CGLIB代理, 如果为true，则创建；否则，创建接口代理
    if (proxyTargetClass) {
        targetDefinition.setAttribute(AutoProxyUtils.PRESERVE_TARGET_CLASS_ATTRIBUTE, Boolean.TRUE);
        // ScopedProxyFactoryBean's "proxyTargetClass" default is TRUE, so we don't need to set it explicitly here.
    }
    else {
        proxyDefinition.getPropertyValues().add("proxyTargetClass", Boolean.FALSE);
    }

    // Copy autowire settings from original bean definition.
    // 从原始bean定义中拷贝autowire的设置到代理bean定义中
    proxyDefinition.setAutowireCandidate(targetDefinition.isAutowireCandidate());
    proxyDefinition.setPrimary(targetDefinition.isPrimary());
    
    if (targetDefinition instanceof AbstractBeanDefinition) {
        proxyDefinition.copyQualifiersFrom((AbstractBeanDefinition) targetDefinition);
    }

    // The target bean should be ignored in favor of the scoped proxy.
    // 将更新后的目标bean定义注册到bean定义注册表（registry）中，使其成为独立的bean
    targetDefinition.setAutowireCandidate(false);
    targetDefinition.setPrimary(false);
    // Register the target bean as separate bean in the factory.
    registry.registerBeanDefinition(targetBeanName, targetDefinition);

    // Return the scoped proxy definition as primary bean definition
    // (potentially an inner bean).
    // 包含代理bean定义和原始bean名称及别名，并将其作为主要bean定义返回。这样，当容器查找原始bean名称时，它会得到一个作用域代理，而不是直接访问目标bean。
    return new BeanDefinitionHolder(proxyDefinition, originalBeanName, definition.getAliases());
}
```
```java
public void registerBeanDefinition(String beanName, BeanDefinition beanDefinition) throws BeanDefinitionStoreException {
    Assert.hasText(beanName, "Bean name must not be empty");
    Assert.notNull(beanDefinition, "BeanDefinition must not be null");
    if (beanDefinition instanceof AbstractBeanDefinition) {
        try {
            ((AbstractBeanDefinition)beanDefinition).validate();
        } catch (BeanDefinitionValidationException var8) {
            throw new BeanDefinitionStoreException(beanDefinition.getResourceDescription(), beanName, "Validation of bean definition failed", var8);
        }
    }

    BeanDefinition existingDefinition = (BeanDefinition)this.beanDefinitionMap.get(beanName);
    if (existingDefinition != null) {
        // 如果不允许覆盖, 就抛出异常
        if (!this.isAllowBeanDefinitionOverriding()) {
            throw new BeanDefinitionOverrideException(beanName, beanDefinition, existingDefinition);
        }

        // 根据角色和内容判断是否更新原有定义，并记录不同级别的日志
        if (existingDefinition.getRole() < beanDefinition.getRole()) {
            if (this.logger.isInfoEnabled()) {
                this.logger.info("Overriding user-defined bean definition for bean '" + beanName + "' with a framework-generated bean definition: replacing [" + existingDefinition + "] with [" + beanDefinition + "]");
            }
        } else if (!beanDefinition.equals(existingDefinition)) {
            if (this.logger.isDebugEnabled()) {
                this.logger.debug("Overriding bean definition for bean '" + beanName + "' with a different definition: replacing [" + existingDefinition + "] with [" + beanDefinition + "]");
            }
        } else if (this.logger.isTraceEnabled()) {
            this.logger.trace("Overriding bean definition for bean '" + beanName + "' with an equivalent definition: replacing [" + existingDefinition + "] with [" + beanDefinition + "]");
        }

        // 添加bean定义
        this.beanDefinitionMap.put(beanName, beanDefinition);
    } else {
        // 如果容器已经启动
        if (this.hasBeanCreationStarted()) {
            // 需要同步修改
            synchronized(this.beanDefinitionMap) {
                // 添加bean定义
                this.beanDefinitionMap.put(beanName, beanDefinition);
                List<String> updatedDefinitions = new ArrayList(this.beanDefinitionNames.size() + 1);
                updatedDefinitions.addAll(this.beanDefinitionNames);
                updatedDefinitions.add(beanName);
                this.beanDefinitionNames = updatedDefinitions;
                this.removeManualSingletonName(beanName);
            }
        } else {
            // 直接添加bean定义和beanDefinitionNames
            this.beanDefinitionMap.put(beanName, beanDefinition);
            this.beanDefinitionNames.add(beanName);
            this.removeManualSingletonName(beanName);
        }

        this.frozenBeanDefinitionNames = null;
    }

    if (existingDefinition == null && !this.containsSingleton(beanName)) {
        if (this.isConfigurationFrozen()) {
            this.clearByTypeCache();
        }
    } else {
        this.resetBeanDefinition(beanName);
    }

}
```
```java
public int scan(String... basePackages) {
    // 获取之前的数量
    int beanCountAtScanStart = this.registry.getBeanDefinitionCount();
    // 扫描包
    this.doScan(basePackages);
    
    if (this.includeAnnotationConfig) {
        // Order注解的排序
        // 注册ConfigurationClassPostProcessor处理@Configuration注解, 
        // AutowiredAnnotationBeanPostProcessor处理@Autowired, @Qualifier等注解,
        //CommonAnnotationBeanPostProcessor处理@PostConstruct, @PreDestory注解
        // PersistenceAnnotationBeanPostProcessor处理JPA相关注解, 
        // EventListenerMethodProcessor处理事件监听器方法的注册
        // DefaultEventListenerFactory用于创建监听器实例
        AnnotationConfigUtils.registerAnnotationConfigProcessors(this.registry);
    }

    // 得到新增的数量
    return this.registry.getBeanDefinitionCount() - beanCountAtScanStart;
}

protected Set<BeanDefinitionHolder> doScan(String... basePackages) {
    Assert.notEmpty(basePackages, "At least one base package must be specified");
    Set<BeanDefinitionHolder> beanDefinitions = new LinkedHashSet();
    String[] var3 = basePackages;
    int var4 = basePackages.length;

    for(int var5 = 0; var5 < var4; ++var5) {
        String basePackage = var3[var5];        
        // 方法来查找该基础包及其子包下的所有候选Bean组件（通常是类），并将它们作为Bean定义(BeanDefinition)收集到一个集合中。
        Set<BeanDefinition> candidates = this.findCandidateComponents(basePackage);
        Iterator var8 = candidates.iterator();

        while(var8.hasNext()) {
            BeanDefinition candidate = (BeanDefinition)var8.next();
            // 默认解析该类上面的@Scope注解，然后把@Scope注解中的属性封装到ScopeMetadata对象中
            ScopeMetadata scopeMetadata = this.scopeMetadataResolver.resolveScopeMetadata(candidate);
            // 设置ScopeName
            candidate.setScope(scopeMetadata.getScopeName());
            // 生成BeanName, 如@Component注解上的value属性
            String beanName = this.beanNameGenerator.generateBeanName(candidate, this.registry);
            if (candidate instanceof AbstractBeanDefinition) {
                // 对其进行额外的后处理。
                // 例如为当前对象设置默认属性值
                this.postProcessBeanDefinition((AbstractBeanDefinition)candidate, beanName);
            }

            if (candidate instanceof AnnotatedBeanDefinition) {
                // 处理其上可能存在的通用注解配置。
                AnnotationConfigUtils.processCommonDefinitionAnnotations((AnnotatedBeanDefinition)candidate);
            }

            // 检查是否存在
            if (this.checkCandidate(beanName, candidate)) {
                BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(candidate, beanName);
                // 注册目标Bean定义(取消autowire和primary), 返回作用域代理Bean定义, 如果ScopeProxyMode为no, 则直接返回原始bd
                definitionHolder = AnnotationConfigUtils.applyScopedProxyMode(scopeMetadata, definitionHolder, this.registry);
                beanDefinitions.add(definitionHolder);
                // 注册作用域代理bean定义, 和alias
                this.registerBeanDefinition(definitionHolder, this.registry);
            }
        }
    }

    return beanDefinitions;
}
```
```java
protected void prepareBeanFactory(ConfigurableListableBeanFactory beanFactory) {
    // 设置BeanFactory的类加载器为本类的类加载器
    beanFactory.setBeanClassLoader(this.getClassLoader());
    // 设置一下SpEl表达式的解析器
    if (!shouldIgnoreSpel) {
        beanFactory.setBeanExpressionResolver(new StandardBeanExpressionResolver(beanFactory.getBeanClassLoader()));
    }

    // 以便在属性绑定时能够将字符串转换为对应的对象类型。这在配置文件中使用自定义类型属性时非常有用，可以避免手动编写转换逻辑
    beanFactory.addPropertyEditorRegistrar(new ResourceEditorRegistrar(this, this.getEnvironment()));
    // 将本类注册到BeanFactory的后置处理器
    // 该后置处理器, 会调用
    // EnvironmentAware(能拿到Environment)
    // EmbeddedValueResolverAware(能拿到EmbeddedValueResolver)
    // ResourceLoaderAware(能拿到ResourceLoader)
    // ApplicationEventPublisherAware(能拿到ApplicationEnventPublisher发布事件)
    // MessageSourceAware(能拿到MessageSource做国际化)
    // ApplicationStartupAware(能拿到ApplicationStartup做记录) 
    // ApplicationContextAware(能拿到ApplicationContext, 啥也能干?)
    beanFactory.addBeanPostProcessor(new ApplicationContextAwareProcessor(this));
    beanFactory.ignoreDependencyInterface(EnvironmentAware.class);
    beanFactory.ignoreDependencyInterface(EmbeddedValueResolverAware.class);
    beanFactory.ignoreDependencyInterface(ResourceLoaderAware.class);
    beanFactory.ignoreDependencyInterface(ApplicationEventPublisherAware.class);
    beanFactory.ignoreDependencyInterface(MessageSourceAware.class);
    beanFactory.ignoreDependencyInterface(ApplicationContextAware.class);
    beanFactory.ignoreDependencyInterface(ApplicationStartupAware.class);
    // 注册Bean
    beanFactory.registerResolvableDependency(BeanFactory.class, beanFactory);
    beanFactory.registerResolvableDependency(ResourceLoader.class, this);
    beanFactory.registerResolvableDependency(ApplicationEventPublisher.class, this);
    beanFactory.registerResolvableDependency(ApplicationContext.class, this);
    // 它的作用是在Bean实例化后，检测该Bean是否实现了ApplicationListener接口，如果是，则将其注册为一个事件监听器
    beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(this));s

    // 注册一些单例Bean, loadTimeWeaver, environment, systemProperties, systemEnvironment, applicationStartup
    if (!NativeDetector.inNativeImage() && beanFactory.containsBean("loadTimeWeaver")) {
        beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory));
        beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()));
    }
    
    if (!beanFactory.containsLocalBean("environment")) {
        beanFactory.registerSingleton("environment", this.getEnvironment());
    }
    
    if (!beanFactory.containsLocalBean("systemProperties")) {
        beanFactory.registerSingleton("systemProperties", this.getEnvironment().getSystemProperties());
    }
    
    if (!beanFactory.containsLocalBean("systemEnvironment")) {
        beanFactory.registerSingleton("systemEnvironment", this.getEnvironment().getSystemEnvironment());
    }
    
    if (!beanFactory.containsLocalBean("applicationStartup")) {
        beanFactory.registerSingleton("applicationStartup", this.getApplicationStartup());
    }

}
```
```java
protected void invokeBeanFactoryPostProcessors(ConfigurableListableBeanFactory beanFactory) {
    // 按照约定的顺序执行了BeanFactory的所有postProcessBeanFactory()
    /**
    * PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors()
    * 有三种, PriorityOrdered Orderd 和No 顺序
    * 按顺序排序, 升序
    * 首先会通过hashCode判断beanFactory是否已经执行过了postProcessBeanFactory(), 如果执行过则抛出异常
    * 否则将hashCode保存进集合, 然后调用processConfigBeanDefinitions
    * ConfigurationClassPostProcessor#postProcessBeanFactory() 来进行处理@Configuration注解的配置类
    * 也会排序, 将ImportRegistry注册为一个Bean，以支持ImportAware @Configuration类。
    */
    PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors(beanFactory, getBeanFactoryPostProcessors());
    
    // Detect a LoadTimeWeaver and prepare for weaving, if found in the meantime
    // (e.g. through an @Bean method registered by ConfigurationClassPostProcessor)
    // 如果有LoadTimeWeaver则会添加他的LoadTimeWeaverAwareProcessor, 并且设置TempClassLoader为ContextTypeMatchClassLoader
    if (!NativeDetector.inNativeImage() && beanFactory.getTempClassLoader() == null && beanFactory.containsBean(LOAD_TIME_WEAVER_BEAN_NAME)) {
        beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory));
        beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()));
    }
}
```
```java
protected void registerBeanPostProcessors(ConfigurableListableBeanFactory beanFactory) {
	PostProcessorRegistrationDelegate.registerBeanPostProcessors(beanFactory, this);
}
```
```java
public static void registerBeanPostProcessors(
    ConfigurableListableBeanFactory beanFactory, AbstractApplicationContext applicationContext) {

    // WARNING: Although it may appear that the body of this method can be easily
    // refactored to avoid the use of multiple loops and multiple lists, the use
    // of multiple lists and multiple passes over the names of processors is
    // intentional. We must ensure that we honor the contracts for PriorityOrdered
    // and Ordered processors. Specifically, we must NOT cause processors to be
    // instantiated (via getBean() invocations) or registered in the ApplicationContext
    // in the wrong order.
    //
    // Before submitting a pull request (PR) to change this method, please review the
    // list of all declined PRs involving changes to PostProcessorRegistrationDelegate
    // to ensure that your proposal does not result in a breaking change:
    // https://github.com/spring-projects/spring-framework/issues?q=PostProcessorRegistrationDelegate+is%3Aclosed+label%3A%22status%3A+declined%22

    String[] postProcessorNames = beanFactory.getBeanNamesForType(BeanPostProcessor.class, true, false);

    // Register BeanPostProcessorChecker that logs an info message when
    // a bean is created during BeanPostProcessor instantiation, i.e. when
    // a bean is not eligible for getting processed by all BeanPostProcessors.
    int beanProcessorTargetCount = beanFactory.getBeanPostProcessorCount() + 1 + postProcessorNames.length;
    beanFactory.addBeanPostProcessor(new BeanPostProcessorChecker(beanFactory, beanProcessorTargetCount));

    // Separate between BeanPostProcessors that implement PriorityOrdered,
    // Ordered, and the rest.
    List<BeanPostProcessor> priorityOrderedPostProcessors = new ArrayList<>();
    List<BeanPostProcessor> internalPostProcessors = new ArrayList<>();
    List<String> orderedPostProcessorNames = new ArrayList<>();
    List<String> nonOrderedPostProcessorNames = new ArrayList<>();
    for (String ppName : postProcessorNames) {
        if (beanFactory.isTypeMatch(ppName, PriorityOrdered.class)) {
            BeanPostProcessor pp = beanFactory.getBean(ppName, BeanPostProcessor.class);
            priorityOrderedPostProcessors.add(pp);
            if (pp instanceof MergedBeanDefinitionPostProcessor) {
                internalPostProcessors.add(pp);
            }
        }
        else if (beanFactory.isTypeMatch(ppName, Ordered.class)) {
            orderedPostProcessorNames.add(ppName);
        }
        else {
            nonOrderedPostProcessorNames.add(ppName);
        }
    }

    // First, register the BeanPostProcessors that implement PriorityOrdered.
    sortPostProcessors(priorityOrderedPostProcessors, beanFactory);
    registerBeanPostProcessors(beanFactory, priorityOrderedPostProcessors);

    // Next, register the BeanPostProcessors that implement Ordered.
    List<BeanPostProcessor> orderedPostProcessors = new ArrayList<>(orderedPostProcessorNames.size());
    for (String ppName : orderedPostProcessorNames) {
        BeanPostProcessor pp = beanFactory.getBean(ppName, BeanPostProcessor.class);
        orderedPostProcessors.add(pp);
        if (pp instanceof MergedBeanDefinitionPostProcessor) {
            internalPostProcessors.add(pp);
        }
    }
    sortPostProcessors(orderedPostProcessors, beanFactory);
    registerBeanPostProcessors(beanFactory, orderedPostProcessors);

    // Now, register all regular BeanPostProcessors.
    List<BeanPostProcessor> nonOrderedPostProcessors = new ArrayList<>(nonOrderedPostProcessorNames.size());
    for (String ppName : nonOrderedPostProcessorNames) {
        BeanPostProcessor pp = beanFactory.getBean(ppName, BeanPostProcessor.class);
        nonOrderedPostProcessors.add(pp);
        if (pp instanceof MergedBeanDefinitionPostProcessor) {
            internalPostProcessors.add(pp);
        }
    }
    registerBeanPostProcessors(beanFactory, nonOrderedPostProcessors);

    // Finally, re-register all internal BeanPostProcessors.
    sortPostProcessors(internalPostProcessors, beanFactory);
    registerBeanPostProcessors(beanFactory, internalPostProcessors);

    // Re-register post-processor for detecting inner beans as ApplicationListeners,
    // moving it to the end of the processor chain (for picking up proxies etc).
    beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(applicationContext));
}
```
```java
protected void initMessageSource() {
    // 获取BeanFactory
    ConfigurableListableBeanFactory beanFactory = getBeanFactory();
    // 如果存在
    if (beanFactory.containsLocalBean(MESSAGE_SOURCE_BEAN_NAME)) {
        this.messageSource = beanFactory.getBean(MESSAGE_SOURCE_BEAN_NAME, MessageSource.class);
        // Make MessageSource aware of parent MessageSource.
        // 如果父不为空, 且是一个可继承的MessageSource
        if (this.parent != null && this.messageSource instanceof HierarchicalMessageSource) {
            HierarchicalMessageSource hms = (HierarchicalMessageSource) this.messageSource;
            if (hms.getParentMessageSource() == null) {
                // Only set parent context as parent MessageSource if no parent MessageSource
                // registered already.
                // 设置父的MessageSource
                hms.setParentMessageSource(getInternalParentMessageSource());
            }
        }
        if (logger.isTraceEnabled()) {
            logger.trace("Using MessageSource [" + this.messageSource + "]");
        }
    }
    else {
        // Use empty MessageSource to be able to accept getMessage calls.
        // 如果不存在, 则创建一个默认的MessageSource, 为使每次调用getMessage()都是安全的
        DelegatingMessageSource dms = new DelegatingMessageSource();
        dms.setParentMessageSource(getInternalParentMessageSource());
        this.messageSource = dms;
        beanFactory.registerSingleton(MESSAGE_SOURCE_BEAN_NAME, this.messageSource);
        if (logger.isTraceEnabled()) {
            logger.trace("No '" + MESSAGE_SOURCE_BEAN_NAME + "' bean, using [" + this.messageSource + "]");
        }
    }
}
```
```java
protected void initApplicationEventMulticaster() {
    ConfigurableListableBeanFactory beanFactory = getBeanFactory();
    // 如果以定义了ApplicationEventMulticaster, 则使用已定义的
    if (beanFactory.containsLocalBean(APPLICATION_EVENT_MULTICASTER_BEAN_NAME)) {
        // 则使用已定义的
        this.applicationEventMulticaster =
        beanFactory.getBean(APPLICATION_EVENT_MULTICASTER_BEAN_NAME, ApplicationEventMulticaster.class);
        if (logger.isTraceEnabled()) {
            logger.trace("Using ApplicationEventMulticaster [" + this.applicationEventMulticaster + "]");
        }
    }
    else {
        // 否则使用SimpleApplicationEventMulticaster
        this.applicationEventMulticaster = new SimpleApplicationEventMulticaster(beanFactory);
        // 注册Bean
        beanFactory.registerSingleton(APPLICATION_EVENT_MULTICASTER_BEAN_NAME, this.applicationEventMulticaster);
        if (logger.isTraceEnabled()) {
            logger.trace("No '" + APPLICATION_EVENT_MULTICASTER_BEAN_NAME + "' bean, using " +
                         "[" + this.applicationEventMulticaster.getClass().getSimpleName() + "]");
        }
    }
}
```
```java
protected void registerListeners() {
    // Register statically specified listeners first.
    // 静态指定监听器注册, 这意味着开发者可以在配置中静态指定一些监听器，这些监听器会优先被注册。
    for (ApplicationListener<?> listener : getApplicationListeners()) {
        getApplicationEventMulticaster().addApplicationListener(listener);
    }

    // Do not initialize FactoryBeans here: We need to leave all regular beans
    // uninitialized to let post-processors apply to them!
    // 当这些Bean在Spring上下文中初始化后，它们会自动作为监听器参与事件处理。动态注册
    String[] listenerBeanNames = getBeanNamesForType(ApplicationListener.class, true, false);
    for (String listenerBeanName : listenerBeanNames) {
        getApplicationEventMulticaster().addApplicationListenerBean(listenerBeanName);
    }

    // Publish early application events now that we finally have a multicaster...
    // 处理早期事件
    Set<ApplicationEvent> earlyEventsToProcess = this.earlyApplicationEvents;
    this.earlyApplicationEvents = null;
    if (!CollectionUtils.isEmpty(earlyEventsToProcess)) {
        for (ApplicationEvent earlyEvent : earlyEventsToProcess) {
            getApplicationEventMulticaster().multicastEvent(earlyEvent);
        }
    }
}
```
```java
protected void finishBeanFactoryInitialization(ConfigurableListableBeanFactory beanFactory) {
    // Initialize conversion service for this context.
    // 初始化类型转化服务Bean
    if (beanFactory.containsBean(CONVERSION_SERVICE_BEAN_NAME) &&
        beanFactory.isTypeMatch(CONVERSION_SERVICE_BEAN_NAME, ConversionService.class)) {
        // 则从Bean工厂获取这个转换服务Bean并设置到Bean工厂中，用于类型转换服务
        beanFactory.setConversionService(
            beanFactory.getBean(CONVERSION_SERVICE_BEAN_NAME, ConversionService.class));
    }
    
    // Register a default embedded value resolver if no BeanFactoryPostProcessor
    // (such as a PropertySourcesPlaceholderConfigurer bean) registered any before:
    // at this point, primarily for resolution in annotation attribute values.
    // 检查Bean工厂是否已拥有嵌入式值解析器
    if (!beanFactory.hasEmbeddedValueResolver()) {
        // 如果没有（例如，没有通过PropertySourcesPlaceholderConfigurer之类的BeanFactoryPostProcessor注册
        // 则添加一个默认的嵌入式值解析器。这个解析器用于解析字符串中的占位符，常见于注解属性值中。
        beanFactory.addEmbeddedValueResolver(strVal -> getEnvironment().resolvePlaceholders(strVal));
    }

    // Initialize LoadTimeWeaverAware beans early to allow for registering their transformers early.
    // 查找所有实现了LoadTimeWeaverAware接口的Bean名称，然后通过getBean方法提前初始化这些Bean。
    String[] weaverAwareNames = beanFactory.getBeanNamesForType(LoadTimeWeaverAware.class, false, false);
    for (String weaverAwareName : weaverAwareNames) {
        // 这对于某些需要在类加载时进行字节码操作的场景（如AOP代理）非常重要。
        getBean(weaverAwareName);
    }
    
    // Stop using the temporary ClassLoader for type matching.
    // 设置Bean工厂的临时类加载器为null
    beanFactory.setTempClassLoader(null);
    
    // Allow for caching all bean definition metadata, not expecting further changes.
    // 调用freezeConfiguration方法通知Bean工厂其配置已经最终确定，不应再有变动。这意味着可以安全地缓存所有Bean定义的元数据，以优化后续访问速度
    beanFactory.freezeConfiguration();
    
    // Instantiate all remaining (non-lazy-init) singletons.
    // 调用preInstantiateSingletons方法来实例化所有剩余的非延迟初始化的单例Bean。这是容器启动过程中的关键步骤，确保所有非懒加载的Bean在此时都已经被创建并初始化完毕，可供应用程序使用
    beanFactory.preInstantiateSingletons();
}
```
```java
public void preInstantiateSingletons() throws BeansException {
    if (this.logger.isTraceEnabled()) {
        this.logger.trace("Pre-instantiating singletons in " + this);
    }

    // 得到BeanDefinitionNames集合, 保存了所有BeanDefinition的BeanNames
    List<String> beanNames = new ArrayList(this.beanDefinitionNames);
    Iterator var2 = beanNames.iterator();
    
    while(true) {
        String beanName;
        Object bean;
        do {
            while(true) {            
                RootBeanDefinition bd;
                do {
                    do {
                        do {
                            // 如果遍历完了
                            if (!var2.hasNext()) {
                                // 开启新一轮的遍历
                                var2 = beanNames.iterator();

                                // 迭代BeanNames, 创建Bean对象
                                while(var2.hasNext()) {
                                    // 得到beanName
                                    beanName = (String)var2.next();
                                    // 获取Singleton
                                    Object singletonInstance = this.getSingleton(beanName);
                                    // 如果获取的Bean对象是单例Bean
                                    if (singletonInstance instanceof SmartInitializingSingleton) {                                        
                                        StartupStep smartInitialize = this.getApplicationStartup().start("spring.beans.smart-initialize").tag("beanName", beanName);
                                                                                
                                        SmartInitializingSingleton smartSingleton = (SmartInitializingSingleton)singletonInstance;
                                        if (System.getSecurityManager() != null) {
                                            AccessController.doPrivileged(() -> {
                                                // 调用afterSingletonsInstantiated
                                                smartSingleton.afterSingletonsInstantiated();
                                                return null;
                                            }, this.getAccessControlContext());
                                        } else {
                                            // 调用afterSingletonsInstantiated
                                            smartSingleton.afterSingletonsInstantiated();
                                        }
    
                                        smartInitialize.end();
                                    }
                                }
    
                                return;
                            }

                            // 遍历下一个beanName
                            beanName = (String)var2.next();
                            // BeanDefinition合并
                            bd = this.getMergedLocalBeanDefinition(beanName);
                            // 如果是抽象类的就循环
                        } while(bd.isAbstract());
                        // 如果不是单例就循环
                    } while(!bd.isSingleton());
                    // 如果是懒加载就循环
                } while(bd.isLazyInit());

                // 如果是FactoryBean
                if (this.isFactoryBean(beanName)) {
                    // 获取FactoryBean
                    bean = this.getBean("&" + beanName);
                    break;
                }

                // 否则创建Bean
                this.getBean(beanName);
            }
        } while(!(bean instanceof FactoryBean));

        // 如果bean是FactoryBean
        FactoryBean<?> factory = (FactoryBean)bean;
        boolean isEagerInit;
        if (System.getSecurityManager() != null && factory instanceof SmartFactoryBean) {
            SmartFactoryBean var10000 = (SmartFactoryBean)factory;
            ((SmartFactoryBean)factory).getClass();
            isEagerInit = (Boolean)AccessController.doPrivileged(var10000::isEagerInit, this.getAccessControlContext());
        } else {
            isEagerInit = factory instanceof SmartFactoryBean && ((SmartFactoryBean)factory).isEagerInit();
        }

        // 如果是饥饿加载
        if (isEagerInit) {
            // 创建Bean
            this.getBean(beanName);
        }
    }
}
```
```java
private final Map<String, Object> singletonObjects = new ConcurrentHashMap(256);
private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap(16);
private final Map<String, Object> earlySingletonObjects = new ConcurrentHashMap(16);

protected Object getSingleton(String beanName, boolean allowEarlyReference) {
    // 从singletonObjects(一级缓存)中获取Bean对象
    Object singletonObject = this.singletonObjects.get(beanName);
    // 如果为空, 并且在创建过程中
    if (singletonObject == null && this.isSingletonCurrentlyInCreation(beanName)) {
        // 从earlySingletonObjects(二级缓存)中获取Bean对象
        singletonObject = this.earlySingletonObjects.get(beanName);
        // 如果为空且允许循环依赖(默认允许)
        if (singletonObject == null && allowEarlyReference) {
            synchronized(this.singletonObjects) {
                // 从singletonObjects(一级缓存)中获取Bean对象, DCL?
                singletonObject = this.singletonObjects.get(beanName);
                // 如果还是为空
                if (singletonObject == null) {
                    // 从earlySingletonObjects(二级缓存)中获取Bean对象
                    singletonObject = this.earlySingletonObjects.get(beanName);
                    // 如果还是为空
                    if (singletonObject == null) {
                        // 从singletonFactories(三级缓存)中获取singletonFactory
                        ObjectFactory<?> singletonFactory = (ObjectFactory)this.singletonFactories.get(beanName);
                        // 如果sigletonFactory不为空
                        if (singletonFactory != null) {
                            // 获取对象
                            singletonObject = singletonFactory.getObject();
                            // 将对象放入到二级缓存中
                            this.earlySingletonObjects.put(beanName, singletonObject);
                            // 从三级缓存中移除
                            this.singletonFactories.remove(beanName);
                        }
                    }
                }
            }
        }
    }

    // 返回获取到的Bean对象
    return singletonObject;
}
```
```java
protected <T> T doGetBean(String name, @Nullable Class<T> requiredType, @Nullable Object[] args, boolean typeCheckOnly) throws BeansException {
    // 得到beanName
    String beanName = this.transformedBeanName(name);
    // 从单例缓存中获取到Bean实例
    Object sharedInstance = this.getSingleton(beanName);
    Object beanInstance;
    // 如果Bean实例不为空
    if (sharedInstance != null && args == null) {
        if (this.logger.isTraceEnabled()) {
            if (this.isSingletonCurrentlyInCreation(beanName)) {
                this.logger.trace("Returning eagerly cached instance of singleton bean '" + beanName + "' that is not fully initialized yet - a consequence of a circular reference");
            } else {
                this.logger.trace("Returning cached instance of singleton bean '" + beanName + "'");
            }
        }

        // 得到Bean实例
        beanInstance = this.getObjectForBeanInstance(sharedInstance, name, beanName, (RootBeanDefinition)null);
    } else {
        // 如果原型Bean正在创建中, 抛出异常
        if (this.isPrototypeCurrentlyInCreation(beanName)) {
            throw new BeanCurrentlyInCreationException(beanName);
        }

        // 得到父BeanFactory
        BeanFactory parentBeanFactory = this.getParentBeanFactory();
        // 如果不为空, 不存在BeanDefinition
        if (parentBeanFactory != null && !this.containsBeanDefinition(beanName)) {
            // 则会递归调用父BeanFactory的doGetBean方法
            String nameToLookup = this.originalBeanName(name);
            if (parentBeanFactory instanceof AbstractBeanFactory) {
                return ((AbstractBeanFactory)parentBeanFactory).doGetBean(nameToLookup, requiredType, args, typeCheckOnly);
            }

            if (args != null) {
                return parentBeanFactory.getBean(nameToLookup, args);
            }

            if (requiredType != null) {
                return parentBeanFactory.getBean(nameToLookup, requiredType);
            }

            return parentBeanFactory.getBean(nameToLookup);
        }

        // 如果不是仅类型检查, 则标记Bean已经被创建了
        if (!typeCheckOnly) {
            this.markBeanAsCreated(beanName);
        }

        StartupStep beanCreation = this.applicationStartup.start("spring.beans.instantiate").tag("beanName", name);

        try {
            // 检查依赖的Bean是否存在并注册依赖关系。
            if (requiredType != null) {
                beanCreation.tag("beanType", requiredType::toString);
            }

            // 合并BeanDefinition
            RootBeanDefinition mbd = this.getMergedLocalBeanDefinition(beanName);
            this.checkMergedBeanDefinition(mbd, beanName, args);
            // 获取依赖项
            String[] dependsOn = mbd.getDependsOn();
            String[] var12;
            // 如果有依赖项
            if (dependsOn != null) {
                var12 = dependsOn;
                int var13 = dependsOn.length;

                // 遍历依赖项
                for(int var14 = 0; var14 < var13; ++var14) {
                    String dep = var12[var14];
                    // 如果存在循环依赖
                    if (this.isDependent(beanName, dep)) {
                        throw new BeanCreationException(mbd.getResourceDescription(), beanName, "Circular depends-on relationship between '" + beanName + "' and '" + dep + "'");
                    }

                    // 通过registerDependentBean记录依赖关系
                    this.registerDependentBean(dep, beanName);

                    try {
                        this.getBean(dep);
                    } catch (NoSuchBeanDefinitionException var31) {
                        throw new BeanCreationException(mbd.getResourceDescription(), beanName, "'" + beanName + "' depends on missing bean '" + dep + "'", var31);
                    }
                }
            }

            // 如果是单例Bean
            if (mbd.isSingleton()) {
                // 获取单例Bean对象
                sharedInstance = this.getSingleton(beanName, () -> {
                    try {
                        return this.createBean(beanName, mbd, args);
                    } catch (BeansException var5) {
                        this.destroySingleton(beanName);
                        throw var5;
                    }
                });
                beanInstance = this.getObjectForBeanInstance(sharedInstance, name, beanName, mbd);
            } else if (mbd.isPrototype()) {
                // 否则如果是原型Bean
                var12 = null;

                Object prototypeInstance;
                try {
                    this.beforePrototypeCreation(beanName);
                    // 直接创建出原型Bean
                    prototypeInstance = this.createBean(beanName, mbd, args);
                } finally {
                    this.afterPrototypeCreation(beanName);
                }

                beanInstance = this.getObjectForBeanInstance(prototypeInstance, name, beanName, mbd);
            } else {
                String scopeName = mbd.getScope();
                // 如果没有定义ScopeName会抛出异常
                if (!StringUtils.hasLength(scopeName)) {
                    throw new IllegalStateException("No scope name defined for bean '" + beanName + "'");
                }

                // 如果ScopeName是不合法的值, 抛出异常
                Scope scope = (Scope)this.scopes.get(scopeName);
                if (scope == null) {
                    throw new IllegalStateException("No Scope registered for scope name '" + scopeName + "'");
                }

                try {
                    Object scopedInstance = scope.get(beanName, () -> {
                        this.beforePrototypeCreation(beanName);

                        Object var4;
                        try {
                            // 创建出原型Bean
                            var4 = this.createBean(beanName, mbd, args);
                        } finally {
                            this.afterPrototypeCreation(beanName);
                        }

                        return var4;
                    });
                    beanInstance = this.getObjectForBeanInstance(scopedInstance, name, beanName, mbd);
                } catch (IllegalStateException var30) {
                    throw new ScopeNotActiveException(beanName, scopeName, var30);
                }
            }
        } catch (BeansException var32) {
            beanCreation.tag("exception", var32.getClass().toString());
            beanCreation.tag("message", String.valueOf(var32.getMessage()));
            this.cleanupAfterBeanCreationFailure(beanName);
            throw var32;
        } finally {
            beanCreation.end();
        }
    }

    return this.adaptBeanInstance(name, beanInstance, requiredType);
}
```
