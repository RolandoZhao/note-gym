/* =====================================================
   主应用逻辑
   ===================================================== */

const App = {
    // 当前状态
    currentPage: 'home',
    currentChapter: null,
    chaptersCache: {},

    // 初始化
    init() {
        // 初始化编辑器
        Editor.init();

        // 设置主题
        this.initTheme();

        // 绑定事件
        this.bindEvents();

        // 处理路由
        this.handleRoute();

        // 监听路由变化
        window.addEventListener('hashchange', () => this.handleRoute());

        // 更新编辑按钮显示
        this.updateEditButton();
    },

    // 初始化主题
    initTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
            this.updateThemeIcon();
        }
    },

    // 绑定事件
    bindEvents() {
        // 主题切换
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // 编辑模式按钮
        document.getElementById('editModeBtn').addEventListener('click', () => {
            if (!Auth.canEdit()) {
                Auth.showPasswordModal('edit', (success) => {
                    if (success) this.updateEditButton();
                });
            }
        });

        // 返回顶部按钮
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.remove('hidden');
            } else {
                backToTop.classList.add('hidden');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    // 切换主题
    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        this.updateThemeIcon();
    },

    // 更新主题图标
    updateThemeIcon() {
        const btn = document.getElementById('themeToggle');
        const theme = document.documentElement.getAttribute('data-theme');
        btn.textContent = theme === 'light' ? '🌙' : '☀️';
    },

    // 更新编辑按钮
    updateEditButton() {
        const btn = document.getElementById('editModeBtn');
        if (Auth.canEdit()) {
            btn.classList.remove('hidden');
        }
    },

    // 处理路由
    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const parts = hash.split('/').filter(Boolean);

        // 更新导航高亮
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === parts[0] || (parts.length === 0 && link.getAttribute('data-page') === 'home')) {
                link.classList.add('active');
            }
        });

        if (parts.length === 0 || parts[0] === '') {
            this.renderHome();
        } else if (parts[0] === 'chapters') {
            this.renderChapters();
        } else if (parts[0] === 'chapter' && parts[1]) {
            this.renderReader(parseInt(parts[1]));
        } else if (parts[0] === 'about') {
            this.renderAbout();
        } else {
            this.renderHome();
        }

        // 滚动到顶部
        window.scrollTo(0, 0);
    },

    // 渲染首页
    renderHome() {
        const app = document.getElementById('app');

        app.innerHTML = `
            <section class="hero">
                <span class="hero-badge">都市现实 · 治愈向 · 轻喜剧</span>
                <h1 class="hero-title">口罩下的两年</h1>
                <p class="hero-subtitle">
                    一个38岁明星健身教练的疫情生存故事，<br>
                    关于面子与生存，关于中年困境，关于自我接纳。
                </p>
                
                <div class="hero-meta">
                    <div class="meta-item">
                        <span class="meta-value">58</span>
                        <span class="meta-label">章节</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-value">15万</span>
                        <span class="meta-label">字数</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-value">4</span>
                        <span class="meta-label">幕</span>
                    </div>
                </div>
                
                <div class="hero-actions">
                    <a href="#/chapter/1" class="btn btn-primary btn-lg">📖 开始阅读</a>
                    <a href="#/chapters" class="btn btn-secondary btn-lg">📑 查看目录</a>
                </div>
            </section>
            
            <section class="story-info">
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-card-icon">👤</div>
                        <h3 class="info-card-title">Nick（阿牛）</h3>
                        <p class="info-card-text">38岁，前明星健身教练。月入2万到月入3000，他戴紧口罩，生怕被人认出。</p>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-card-icon">🎭</div>
                        <h3 class="info-card-title">野花</h3>
                        <p class="info-card-text">Nick的前同事，健身房的"活宝"。话痨、八卦、热心肠，却在关键时刻推动了故事的高潮。</p>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-card-icon">🐱</div>
                        <h3 class="info-card-title">阿琳</h3>
                        <p class="info-card-text">Nick养了4年的猫，是他最后的情感寄托。当阿琳生病时，一切都变得不一样了。</p>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-card-icon">💔</div>
                        <h3 class="info-card-title">核心主题</h3>
                        <p class="info-card-text">笑着笑着就哭了，哭着哭着又笑了。这是一个关于"原来真实的自己也可以被接受"的故事。</p>
                    </div>
                </div>
            </section>
            
            <section class="story-info">
                <h2 style="text-align: center; margin-bottom: 32px; font-family: var(--font-serif);">故事结构</h2>
                <div class="info-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                    ${CONFIG.acts.map(act => `
                        <div class="info-card" style="text-align: center;">
                            <div class="info-card-icon">第${act.id}幕</div>
                            <h3 class="info-card-title">${act.name}</h3>
                            <p class="info-card-text">第${act.chapters}章 · ${act.words}字</p>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    },

    // 渲染目录
    renderChapters() {
        const app = document.getElementById('app');

        // 按幕分组章节
        const actGroups = {};
        CONFIG.chapters.forEach(chapter => {
            if (!actGroups[chapter.act]) {
                actGroups[chapter.act] = [];
            }
            actGroups[chapter.act].push(chapter);
        });

        const actsHtml = CONFIG.acts.map(act => {
            const chapters = actGroups[act.id] || [];

            return `
                <div class="act-section">
                    <div class="act-header">
                        <span class="act-number">${act.id}</span>
                        <span class="act-title">${act.name}</span>
                        <span class="act-info">${act.chapters}章 · ${act.words}字</span>
                    </div>
                    <div class="chapter-list">
                        ${chapters.map(chapter => {
                const isFree = chapter.id <= CONFIG.freeChapters;
                const isLocked = !isFree && !Auth.canRead(chapter.id);

                return `
                                <div class="chapter-item" onclick="App.goToChapter(${chapter.id})">
                                    <span class="chapter-number">${chapter.id}</span>
                                    <div class="chapter-info">
                                        <div class="chapter-title">第${chapter.id}章：${chapter.title}</div>
                                        <div class="chapter-meta">${chapter.file}</div>
                                    </div>
                                    <div class="chapter-status">
                                        ${isFree ? '<span class="status-badge status-free">免费</span>' : ''}
                                        ${isLocked ? '<span class="status-badge status-locked">🔒</span>' : ''}
                                    </div>
                                    <span class="chapter-arrow">→</span>
                                </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
        }).join('');

        app.innerHTML = `
            <div class="chapters-container">
                <div class="chapters-header">
                    <h1 class="chapters-title">📑 章节目录</h1>
                    <p class="chapters-subtitle">共 ${CONFIG.chapters.length} 章，约 15万字</p>
                </div>
                ${actsHtml}
            </div>
        `;
    },

    // 跳转章节
    goToChapter(chapterId) {
        // 检查权限
        if (!Auth.canRead(chapterId)) {
            Auth.showPasswordModal('read', (success) => {
                if (success) {
                    window.location.hash = `/chapter/${chapterId}`;
                }
            });
            return;
        }

        window.location.hash = `/chapter/${chapterId}`;
    },

    // 渲染阅读器
    async renderReader(chapterId) {
        const app = document.getElementById('app');
        const chapter = CONFIG.chapters.find(c => c.id === chapterId);

        if (!chapter) {
            app.innerHTML = '<div style="text-align: center; padding: 60px;"><h2>章节不存在</h2><a href="#/chapters">返回目录</a></div>';
            return;
        }

        // 检查权限
        if (!Auth.canRead(chapterId)) {
            Auth.showPasswordModal('read', (success) => {
                if (success) {
                    this.renderReader(chapterId);
                } else {
                    window.location.hash = '/chapters';
                }
            });
            return;
        }

        // 显示加载状态
        app.innerHTML = `
            <div class="reader-container">
                <div class="reader-header">
                    <span class="reader-chapter-num">第 ${chapterId} 章</span>
                    <h1 class="reader-title">${chapter.title}</h1>
                    <p class="reader-meta">加载中...</p>
                </div>
                <div class="reader-content" style="text-align: center; padding: 60px;">
                    <p>正在加载章节内容...</p>
                </div>
            </div>
        `;

        try {
            // 获取文件内容
            let content;
            if (this.chaptersCache[chapter.file]) {
                content = this.chaptersCache[chapter.file];
            } else {
                const response = await fetch(chapter.file);
                content = await response.text();
                this.chaptersCache[chapter.file] = content;
            }

            // 渲染
            const readTime = MarkdownRenderer.estimateReadTime(content);
            const wordCount = MarkdownRenderer.countWords(content);

            const prevChapter = CONFIG.chapters.find(c => c.id === chapterId - 1);
            const nextChapter = CONFIG.chapters.find(c => c.id === chapterId + 1);

            // 检查编辑权限
            const canEdit = Auth.canEdit();

            app.innerHTML = `
                <div class="reader-container">
                    <div class="reader-header">
                        <span class="reader-chapter-num">第 ${chapterId} 章</span>
                        <h1 class="reader-title">${chapter.title}</h1>
                        <p class="reader-meta">约 ${wordCount} 字 · 阅读时间 ${readTime}</p>
                        <div class="reader-actions">
                            <a href="#/chapters" class="btn btn-secondary">📑 目录</a>
                            ${canEdit ? `<button onclick="Editor.open('${chapter.file}')" class="btn btn-secondary">✏️ 编辑</button>` : ''}
                        </div>
                    </div>
                    
                    <div class="reader-content">
                        ${MarkdownRenderer.render(content)}
                    </div>
                    
                    <nav class="reader-nav">
                        ${prevChapter ? `
                            <button class="nav-btn" onclick="App.goToChapter(${prevChapter.id})">
                                <span class="nav-btn-label">← 上一章</span>
                                <span class="nav-btn-title">第${prevChapter.id}章：${prevChapter.title}</span>
                            </button>
                        ` : '<div></div>'}
                        
                        ${nextChapter ? `
                            <button class="nav-btn" onclick="App.goToChapter(${nextChapter.id})">
                                <span class="nav-btn-label">下一章 →</span>
                                <span class="nav-btn-title">第${nextChapter.id}章：${nextChapter.title}</span>
                            </button>
                        ` : '<div></div>'}
                    </nav>
                </div>
            `;

        } catch (error) {
            app.innerHTML = `
                <div class="reader-container">
                    <div style="text-align: center; padding: 60px;">
                        <h2>😕 加载失败</h2>
                        <p style="color: var(--text-secondary); margin: 16px 0;">${error.message}</p>
                        <a href="#/chapters" class="btn btn-primary">返回目录</a>
                    </div>
                </div>
            `;
        }
    },

    // 渲染关于页
    renderAbout() {
        const app = document.getElementById('app');

        app.innerHTML = `
            <div class="chapters-container">
                <div class="chapters-header">
                    <h1 class="chapters-title">📖 关于本书</h1>
                </div>
                
                <div class="info-card" style="max-width: 700px; margin: 0 auto;">
                    <h3 class="info-card-title">故事简介</h3>
                    <p class="info-card-text" style="margin-bottom: 20px;">
                        《口罩下的两年》是一部都市现实主义小说，讲述了38岁的明星健身教练 Nick，
                        在疫情期间从月入2万跌落到送外卖的故事。
                    </p>
                    <p class="info-card-text" style="margin-bottom: 20px;">
                        他戴紧口罩，生怕被熟人认出；他报喜不报忧，对妈妈编织着一个又一个谎言。
                        直到有一天，他的行程出现在了翡翠台的新闻上...
                    </p>
                    <p class="info-card-text">
                        这是一个关于面子与生存的故事，关于中年困境的故事，更是一个关于
                        "原来真实的自己也可以被接受"的故事。
                    </p>
                </div>
                
                <div class="info-grid" style="max-width: 700px; margin: 40px auto;">
                    <div class="info-card">
                        <div class="info-card-icon">📊</div>
                        <h3 class="info-card-title">作品信息</h3>
                        <p class="info-card-text">
                            类型：都市现实 / 治愈向 / 轻喜剧<br>
                            篇幅：约15万字 / 58章<br>
                            时间线：2019年底 - 2022年4月
                        </p>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-card-icon">✨</div>
                        <h3 class="info-card-title">风格特点</h3>
                        <p class="info-card-text">
                            笑中带泪，用幽默消解沉重<br>
                            克制、真实、细腻、有温度<br>
                            情感曲线：压抑→挣扎→崩溃→释放→重生
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 40px;">
                    <a href="#/chapter/1" class="btn btn-primary btn-lg">📖 开始阅读</a>
                </div>
            </div>
        `;
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// 导出
window.App = App;
