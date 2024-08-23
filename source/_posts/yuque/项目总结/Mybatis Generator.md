---
title: Mybatis Generator
urlname: pqt9x5cfmt0u23u0
date: '2024-07-02 17:15:13'
updated: '2024-07-02 17:56:06'
cover: 'https://cdn.jsdelivr.net/gh/choodsire666/blog-img/Mybatis Generator/3c7367976dcbc4a26c68fbbbddef2212.png'
description: Mybatis Generator是Mybatis提供的生成代码的工具，支持多种插件。导入依赖：  <dependencies>     <!--Mybatis-->     <dependency>       <groupId>org.mybatis.spring.boot</groupI...
---
Mybatis Generator是Mybatis提供的生成代码的工具，支持多种插件。

1. 导入依赖：
```xml
  <dependencies>
    <!--Mybatis-->
    <dependency>
      <groupId>org.mybatis.spring.boot</groupId>
      <artifactId>mybatis-spring-boot-starter</artifactId>
    </dependency>
  </dependencies>
  <build>
        <plugins>
            <plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.3.7</version>
                <configuration>
                    <!--配置文件位置-->
                    <configurationFile>
                        mybatis-generator/generatorConfig.xml
                    </configurationFile>
                    <!--如果已经有生成过的文件是否覆盖-->
                    <overwrite>true</overwrite>
                    <!--表示是否输出详细信息-->
                    <verbose>true</verbose>
                </configuration>
                <!--表明了插件所需要的依赖-->
                <dependencies>
                    <dependency>
                        <groupId>mysql</groupId>
                        <artifactId>mysql-connector-java</artifactId>
                        <version>${mysql.version}</version>
                    </dependency>
                    <!--第三方插件-->
                    <dependency>
                        <groupId>com.itfsw</groupId>
                        <artifactId>mybatis-generator-plugin</artifactId>
                        <version>1.3.2</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>
```

2. 配置配置文件:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
    <context id="mysqlgenerator" targetRuntime="Mybatis3">
        
        <property name="autoDelimitKeywords" value="true"/>
        <!--字段加上引号，防止关键字冲突-->
        <property name="beginningDelimiter" value="`"/>
        <property name="endingDelimiter" value="`"/>

        <!--覆盖生成的XML文件-->
        <plugin type="org.mybatis.generator.plugins.UnmergeableXmlMappersPlugin"/>
        <!--生成的实体类添加toString()方法-->
        <plugin type="org.mybatis.generator.plugins.ToStringPlugin"/>
        <!--生成equals和hashCode方法-->
        <plugin type="org.mybatis.generator.plugins.EqualsHashCodePlugin"/>

        <!--查询单条数据插件 selectByExample(ClassNameExample)-->
        <plugin type="com.itfsw.mybatis.generator.plugins.SelectOneByExamplePlugin"/>
        <!--查询结果选择性返回插件 selectByExampleSelective(ClassNameExample, columns...)-->
        <plugin type="com.itfsw.mybatis.generator.plugins.SelectSelectivePlugin"/>
        <!-- Example Criteria 增强插件 生成Example实体类，可以通过Criteria设置查询条件-->
        <plugin type="com.itfsw.mybatis.generator.plugins.ExampleEnhancedPlugin"/>
        <!-- 数据Model属性对应Column获取插件 -->
        <plugin type="com.itfsw.mybatis.generator.plugins.ModelColumnPlugin"/>
        <!-- 逻辑删除插件 生成logicalDeleteByPrimaryKey()等方法-->
        <plugin type="com.itfsw.mybatis.generator.plugins.LogicalDeletePlugin">
            <!-- 这里配置的是全局逻辑删除列和逻辑删除值，当然在table中配置的值会覆盖该全局配置 -->
            <!-- 逻辑删除列类型只能为数字、字符串或者布尔类型 -->
            <property name="logicalDeleteColumn" value="deleted"/>
            <!-- 逻辑删除-已删除值 -->
            <property name="logicalDeleteValue" value="1"/>
            <!-- 逻辑删除-未删除值 -->
            <property name="logicalUnDeleteValue" value="0"/>
        </plugin>

        <!--是否需要禁用注释生成-->
        <commentGenerator>
            <property name="suppressAllComments" value="true"/>
            <property name="suppressDate" value="true"/>
        </commentGenerator>


        <!--数据库连接信息-->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://127.0.0.1:3306/litemall?useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=UTC&amp;verifyServerCertificate=false&amp;useSSL=false&amp;nullCatalogMeansCurrent=true"
                        userId="litemall"
                        password="litemall123456"/>

        <javaTypeResolver>
            <property name="forceBigDecimals" value="false"/>
            <property name="useJSR310Types" value="true"/>
        </javaTypeResolver>

        <!--实体类-->
        <javaModelGenerator targetPackage="com.choodsire666.litemall.db.domain" targetProject="src/main/java"/>
        <!--mapper映射文件-->
        <sqlMapGenerator targetPackage="com.choodsire666.litemall.db.dao" targetProject="src/main/resources"/>
        <!--dao层-->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.choodsire666.litemall.db.dao" targetProject="src/main/java"/>

        <!--column="id"：指定生成自增主键的列名为"id"。
            sqlStatement="Mysql", MBG会在生成的<insert>元素中生成一条正确的<selectKey>元素
            identity="true"：表示使用数据库自增方式生成主键。
            type="JDBC"：表示使用JDBC提供的API来获取生成的自增主键值。-->
        <table tableName="litemall_ad" domainObjectName="Ad">
            <generatedKey column="id" sqlStatement="Mysql" identity="true"/>
        </table>

        <table tableName="litemall_address" domainObjectName="Address">
            <generatedKey column="id" sqlStatement="Mysql" identity="true"/>
        </table>

        <table tableName="litemall_admin" domainObjectName="Admin">
            <generatedKey column="id" sqlStatement="Mysql" identity="true"/>
            <columnOverride column="role_ids" javaType="java.lang.Integer[]"
                            typeHandler="com.choodsire666.litemall.db.mybatis.JsonStringArrayTypeHandler"/>
        </table>
        
    </context>
</generatorConfiguration>
```

3. 配置启动项：

![image.png](https://cdn.jsdelivr.net/gh/choodsire666/blog-img/Mybatis Generator/3c7367976dcbc4a26c68fbbbddef2212.png)

TypeHandler：
```java
package com.choodsire666.litemall.db.mybatis;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
* BaseTypeHandler 实现了 TypeHandler接口
*/
public class JsonStringArrayTypeHandler extends BaseTypeHandler<String[]> {

    private static final ObjectMapper mapper = new ObjectMapper();

    /**
     * 将参数设置到 PreparedStatement，javaType转jdbcType
     * @param preparedStatement
     * @param columnIndex 参数索引
     * @param parameter 数据
     * @param jdbcType jdbcType
     * @throws SQLException
     */
    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int columnIndex, String[] parameter, JdbcType jdbcType) throws SQLException {
        // 将String[]转换为json字符串
        preparedStatement.setString(columnIndex, toJson(parameter));
    }


    @Override
    public String[] getNullableResult(ResultSet resultSet, String columnName) throws SQLException {
        // 将json字符串转换为String[]
        return toObject(resultSet.getString(columnName));
    }

    @Override
    public String[] getNullableResult(ResultSet resultSet, int columnIndex) throws SQLException {
        // 将json字符串转换为String[]
        return toObject(resultSet.getString(columnIndex));
    }

    @Override
    public String[] getNullableResult(CallableStatement callableStatement, int columnIndex) throws SQLException {
        // 将json字符串转换为String[]
        return toObject(callableStatement.getString(columnIndex));
    }

    /**
     * String[]转换为Json字符串
     * @param parameter
     * @return
     */
    private String toJson(String[] parameter) {
        try {
            return mapper.writeValueAsString(parameter);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "[]";
    }

    /**
     * 将json字符串转换为String[]
     * @param content
     * @return
     */
    private String[] toObject(String content) {
        if (content != null || !content.isEmpty()) {
            try {
                return mapper.readValue(content, String[].class);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return null;
    }
}

```

PageHelper插件：
在数据库查询之前设置分页参数
PageHelper.startPage(page, size);
