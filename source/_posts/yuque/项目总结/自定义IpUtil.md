---
title: 自定义IpUtil
urlname: iow44pagpr9zh7cl
date: '2024-07-02 18:08:12'
updated: '2024-07-02 18:40:21'
description: package com.choodsire666.litemall.core.util;  import org.apache.commons.logging.Log; import org.apache.commons.logging.LogFactory;  import javax.se...
---
```java
package com.choodsire666.litemall.core.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;

public class IpUtil {

    private static final Log logger = LogFactory.getLog(IpUtil.class);

    public static String getIpAddr(HttpServletRequest request) {
        String ipAddress;
        try {
            // x-forwarded-for 是用来识别通过HTTP代理或负载均衡方式连接到Web服务器的客户端最原始的IP地址的HTTP请求头字段
            ipAddress = request.getHeader("x-forwarded-for");
            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                // 当请求通过代理服务器时，这个字段会包含客户端（用户）的真实IP地址, 它可能会覆盖掉x-forwarded-for，因此重要
                ipAddress = request.getHeader("Proxy-Client-IP");
            }
            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getHeader("WL-Proxy-Client-IP");
            }
            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getRemoteAddr();
                if ("127.0.0.1".equals(ipAddress)) {
                    // 根据网卡读取本机配置的IP
                    InetAddress inet = null;
                    try {
                        inet = InetAddress.getLocalHost();
                    } catch (UnknownHostException e) {
                        logger.error(e.getMessage(), e);
                    }

                    ipAddress = inet.getHostAddress();
                }
            }

            // 如果大于15， 超过1个IP地址， 第一个ip为真实ip， 其余为代理ip
            if (ipAddress != null && ipAddress.length() > 15) {
                if (ipAddress.indexOf(",") > 0) {
                    ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
                }
            }
        } catch (Exception e) {
            ipAddress = "";
        }

        return ipAddress;
    }
}

```
