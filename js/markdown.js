/* =====================================================
   Markdown 渲染模块
   ===================================================== */

const MarkdownRenderer = {
    // 渲染 Markdown 为 HTML
    render(markdown) {
        // 使用 marked.js 渲染
        let html = marked.parse(markdown);

        // 处理插画占位符
        html = this.processIllustrations(html);

        return html;
    },

    // 处理插画占位符
    processIllustrations(html) {
        // 匹配 ![描述](placeholder:xxx) 格式
        const placeholderRegex = /<img[^>]*alt="([^"]*)"[^>]*src="placeholder:([^"]*)"[^>]*>/g;

        html = html.replace(placeholderRegex, (match, alt, id) => {
            return `
                <div class="illustration-placeholder" data-id="${id}">
                    <div class="illustration-icon">🖼️</div>
                    <div class="illustration-text">${alt || '点击添加插画'}</div>
                </div>
            `;
        });

        // 也处理普通的占位符图片（没有实际地址的）
        html = html.replace(/<img[^>]*src="images\/placeholder[^"]*"[^>]*alt="([^"]*)"[^>]*>/g, (match, alt) => {
            return `
                <div class="illustration-placeholder">
                    <div class="illustration-icon">🖼️</div>
                    <div class="illustration-text">${alt || '插画占位符'}</div>
                </div>
            `;
        });

        return html;
    },

    // 提取章节内容
    extractChapter(markdown, chapterNum) {
        // 匹配章节标题
        const chapterRegex = new RegExp(
            `## 第${chapterNum}章[：:：]?([^\\n]*)[\\s\\S]*?(?=## 第\\d+章|$)`,
            'i'
        );

        const match = markdown.match(chapterRegex);
        if (match) {
            return {
                title: match[1].trim(),
                content: match[0]
            };
        }

        // 尝试其他格式
        const altRegex = new RegExp(
            `#+ .*?第${chapterNum}章[\\s\\S]*?(?=#+ .*?第\\d+章|$)`,
            'i'
        );

        const altMatch = markdown.match(altRegex);
        if (altMatch) {
            return {
                title: '',
                content: altMatch[0]
            };
        }

        return null;
    },

    // 估算阅读时间（按每分钟500字计算）
    estimateReadTime(text) {
        const words = text.replace(/[^\u4e00-\u9fa5]/g, '').length;
        const minutes = Math.ceil(words / 500);
        return `${minutes} 分钟`;
    },

    // 计算字数
    countWords(text) {
        return text.replace(/[^\u4e00-\u9fa5]/g, '').length;
    }
};

// 导出
window.MarkdownRenderer = MarkdownRenderer;
