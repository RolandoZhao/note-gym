/* =====================================================
   认证模块 - 密码验证与状态管理
   ===================================================== */

const Auth = {
    // 存储键
    KEYS: {
        READ_UNLOCKED: 'novel_read_unlocked',
        EDIT_UNLOCKED: 'novel_edit_unlocked',
        GITHUB_TOKEN: 'novel_github_token'
    },

    // 检查阅读权限
    canRead(chapterId) {
        // 前6章免费
        if (chapterId <= CONFIG.freeChapters) {
            return true;
        }
        // 检查是否已解锁
        return localStorage.getItem(this.KEYS.READ_UNLOCKED) === 'true';
    },

    // 检查编辑权限
    canEdit() {
        return localStorage.getItem(this.KEYS.EDIT_UNLOCKED) === 'true';
    },

    // 验证阅读密码
    verifyReadPassword(password) {
        if (password === CONFIG.passwords.read) {
            localStorage.setItem(this.KEYS.READ_UNLOCKED, 'true');
            return true;
        }
        return false;
    },

    // 验证编辑密码
    verifyEditPassword(password) {
        if (password === CONFIG.passwords.edit) {
            localStorage.setItem(this.KEYS.EDIT_UNLOCKED, 'true');
            return true;
        }
        return false;
    },

    // 获取 GitHub Token
    getToken() {
        return localStorage.getItem(this.KEYS.GITHUB_TOKEN);
    },

    // 保存 GitHub Token
    setToken(token) {
        localStorage.setItem(this.KEYS.GITHUB_TOKEN, token);
    },

    // 清除所有认证状态
    logout() {
        localStorage.removeItem(this.KEYS.READ_UNLOCKED);
        localStorage.removeItem(this.KEYS.EDIT_UNLOCKED);
        localStorage.removeItem(this.KEYS.GITHUB_TOKEN);
    },

    // 显示密码弹窗
    showPasswordModal(type, callback) {
        const modal = document.getElementById('passwordModal');
        const title = document.getElementById('modalTitle');
        const desc = document.getElementById('modalDesc');
        const input = document.getElementById('passwordInput');
        const error = document.getElementById('passwordError');
        const submitBtn = document.getElementById('passwordSubmit');

        // 设置弹窗内容
        if (type === 'read') {
            title.textContent = '🔒 需要密码';
            desc.textContent = '第7章及之后的内容需要密码才能阅读';
        } else if (type === 'edit') {
            title.textContent = '✏️ 编辑权限';
            desc.textContent = '需要编辑密码才能修改内容';
        }

        // 重置状态
        input.value = '';
        error.classList.add('hidden');

        // 显示弹窗
        modal.classList.remove('hidden');
        input.focus();

        // 处理提交
        const handleSubmit = () => {
            const password = input.value;
            let success = false;

            if (type === 'read') {
                success = this.verifyReadPassword(password);
            } else if (type === 'edit') {
                success = this.verifyEditPassword(password);
            }

            if (success) {
                modal.classList.add('hidden');
                if (callback) callback(true);
            } else {
                error.classList.remove('hidden');
                input.value = '';
                input.focus();
            }
        };

        // 绑定事件
        submitBtn.onclick = handleSubmit;
        input.onkeypress = (e) => {
            if (e.key === 'Enter') handleSubmit();
        };

        // 关闭弹窗
        modal.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
            el.onclick = () => {
                modal.classList.add('hidden');
                if (callback) callback(false);
            };
        });
    },

    // 显示 Token 弹窗
    showTokenModal(callback) {
        const modal = document.getElementById('tokenModal');
        const input = document.getElementById('tokenInput');
        const saveBtn = document.getElementById('tokenSave');

        input.value = this.getToken() || '';
        modal.classList.remove('hidden');
        input.focus();

        saveBtn.onclick = () => {
            const token = input.value.trim();
            if (token) {
                this.setToken(token);
                modal.classList.add('hidden');
                if (callback) callback(true);
            }
        };

        modal.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
            el.onclick = () => {
                modal.classList.add('hidden');
                if (callback) callback(false);
            };
        });
    }
};

// 导出
window.Auth = Auth;
