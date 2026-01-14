/* =====================================================
   编辑器模块
   ===================================================== */

const Editor = {
    currentFile: null,
    currentSha: null,
    originalContent: null,

    // 初始化编辑器
    init() {
        const textarea = document.getElementById('editorTextarea');
        const preview = document.getElementById('editorPreview');

        // 实时预览
        textarea.addEventListener('input', () => {
            this.updatePreview();
        });
    },

    // 打开编辑器
    async open(filePath) {
        // 检查编辑权限
        if (!Auth.canEdit()) {
            Auth.showPasswordModal('edit', (success) => {
                if (success) this.open(filePath);
            });
            return;
        }

        // 检查 GitHub Token
        const token = Auth.getToken();
        if (!token) {
            Auth.showTokenModal((success) => {
                if (success) this.open(filePath);
            });
            return;
        }

        // 显示加载状态
        const modal = document.getElementById('editorModal');
        const textarea = document.getElementById('editorTextarea');
        const status = document.getElementById('editorStatus');

        modal.classList.remove('hidden');
        textarea.value = '加载中...';
        status.textContent = '正在获取文件...';

        try {
            // 获取文件内容
            const file = await GitHubAPI.getFile(filePath);

            this.currentFile = filePath;
            this.currentSha = file.sha;
            this.originalContent = file.content;

            textarea.value = file.content;
            status.textContent = '';
            this.updatePreview();

        } catch (error) {
            textarea.value = `获取文件失败: ${error.message}`;
            status.textContent = '错误';
        }

        // 绑定关闭事件
        modal.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
            el.onclick = () => this.close();
        });

        // 绑定保存事件
        document.getElementById('editorSave').onclick = () => this.save();
    },

    // 更新预览
    updatePreview() {
        const textarea = document.getElementById('editorTextarea');
        const preview = document.getElementById('editorPreview');

        preview.innerHTML = MarkdownRenderer.render(textarea.value);
    },

    // 保存到 GitHub
    async save() {
        const textarea = document.getElementById('editorTextarea');
        const status = document.getElementById('editorStatus');
        const saveBtn = document.getElementById('editorSave');

        const content = textarea.value;

        // 检查是否有修改
        if (content === this.originalContent) {
            status.textContent = '内容没有变化';
            return;
        }

        // 禁用保存按钮
        saveBtn.disabled = true;
        status.textContent = '正在保存...';

        try {
            const result = await GitHubAPI.updateFile(
                this.currentFile,
                content,
                `更新章节内容 - ${new Date().toLocaleString('zh-CN')}`,
                this.currentSha
            );

            // 更新 SHA
            this.currentSha = result.content.sha;
            this.originalContent = content;

            status.textContent = '✓ 已保存到 GitHub';

            // 3秒后清除状态
            setTimeout(() => {
                status.textContent = '';
            }, 3000);

        } catch (error) {
            status.textContent = `保存失败: ${error.message}`;
        } finally {
            saveBtn.disabled = false;
        }
    },

    // 关闭编辑器
    close() {
        const modal = document.getElementById('editorModal');
        const textarea = document.getElementById('editorTextarea');

        // 检查是否有未保存的修改
        if (textarea.value !== this.originalContent) {
            if (!confirm('有未保存的修改，确定要关闭吗？')) {
                return;
            }
        }

        modal.classList.add('hidden');
        this.currentFile = null;
        this.currentSha = null;
        this.originalContent = null;
    }
};

// 导出
window.Editor = Editor;
