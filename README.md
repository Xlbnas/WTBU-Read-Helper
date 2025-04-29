# WTBU-Read-Helper
# 武汉工商学院题库辅助脚本 📚

![Static Badge](https://img.shields.io/badge/Tampermonkey-4.8%2B-blue)
![Static Badge](https://img.shields.io/badge/Version-1.1.0-orange)
![License](https://img.shields.io/badge/License-MIT-green)


本脚本为武汉工商学院在线学习平台提供辅助功能，​**严禁用于任何形式的作弊行为**。

## 🚀 功能特性
- 实时监控题库请求
- 自动解析JSON数据格式
- 输出题号与正确答案对照表
- 非侵入式设计（不修改页面DOM）

## 📦 安装指南
### 方式一：Greasy Fork安装
1. 访问 [脚本发布页](https://greasyfork.org/zh-CN/scripts/534327-%E6%AD%A6%E6%B1%89%E5%B7%A5%E5%95%86%E5%AD%A6%E9%99%A2-%E9%98%85%E8%AF%BB%E5%AD%A6%E5%88%86%E9%A2%98%E5%BA%93%E5%8A%A9%E6%89%8B)
2. 点击绿色"Install"按钮
3. 确认Tampermonkey扩展已启用

### 方式二：手动安装
```javascript
// 在Tampermonkey中新建脚本，粘贴以下内容：
// ==UserScript==
// @name         武汉工商学院-阅读学分题库助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动获取并显示题库答案
// @author       Xlbnas
// @match        *://libopac.wtbu.edu.cn:8083/WDTSG/newydxfksxt*
// @grant        none
// @license      MIT
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 保存原始XMLHttpRequest方法
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    // 重写open方法
    XMLHttpRequest.prototype.open = function(method, url) {
        // 检查目标请求
        if (url.includes('/WDTSG/GetExams?newtype=1')) {
            this._requestUrl = url;
            this.addEventListener('readystatechange', function() {
                if (this.readyState === 4 && this.status === 200) {
                    try {
                        const response = JSON.parse(this.responseText);
                        if (response.EXAMS && response.EXAMS.length > 0) {
                            console.log('----- 题库答案列表 -----');
                            response.EXAMS.forEach(exam => {
                                console.log(`题号：${exam.RN}  正确答案：${exam.RIGHTANSWER}`);
                            });
                            console.log('-------------------------');
                        }
                    } catch (e) {
                        console.error('答案解析失败：', e);
                    }
                }
            });
        }
        originalOpen.apply(this, arguments);
    };

    // 重写send方法以保持原有功能
    XMLHttpRequest.prototype.send = function(body) {
        originalSend.apply(this, arguments);
    };

    console.log('题库脚本已激活，等待获取答案...');
    console.log('作者Xlbnas，2025/4/29测试可用');
    console.log('要是用不了了就是学校改了（；´д｀）ゞ');

    //本脚本仅用于：
    //- 教育研究
    //- 系统测试
    //- 辅助学习
    //使用者需自行承担风险，开发者不鼓励/支持任何作弊行为
})();
```
## 🖥 使用教程
1. 登录 http://libopac.wtbu.edu.cn:8083/WDTSG/newydxfksxt
2. 按 F12 打开开发者工具
3. 切换至 Console 面板
4. 观察输出

## ⚠️ 注意事项
- 仅限课后练习场景使用
- 正式考试中禁用本脚本
- 答案准确率依赖题库数据完整性
- 保持脚本更新至最新版本

## ❓ 常见问题
### Q：脚本无法正常工作？
### A：请检查：

1. 油猴扩展是否运行中
2. 是否在指定域名下
3. 浏览器控制台有无错误提示
### Q：会记录我的使用数据吗？
### A：本脚本完全本地运行，无任何数据收集功能

## 📜 完整免责声明
请务必阅读：[免责声明.md](./DISCLAIMER.md)
> 使用本脚本即表示您已同意承担所有相关风险

## 📆 更新日志
v0.1.0 - 2025-4-29
- 初始版本发布
