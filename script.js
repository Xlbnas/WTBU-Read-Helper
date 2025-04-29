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
