/* =====================================================
   GitHub API 模块 - 同步编辑内容
   ===================================================== */

const GitHubAPI = {
    // API 基础 URL
    baseUrl: 'https://api.github.com',

    // 获取请求头
    getHeaders() {
        const token = Auth.getToken();
        return {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };
    },

    // 获取文件内容
    async getFile(path) {
        const { owner, name, branch } = CONFIG.repo;
        const url = `${this.baseUrl}/repos/${owner}/${name}/contents/${encodeURIComponent(path)}?ref=${branch}`;

        try {
            const response = await fetch(url, {
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`获取文件失败: ${response.status}`);
            }

            const data = await response.json();

            // 解码 Base64 内容
            const content = decodeURIComponent(escape(atob(data.content)));

            return {
                content,
                sha: data.sha,
                path: data.path
            };
        } catch (error) {
            console.error('GitHub API Error:', error);
            throw error;
        }
    },

    // 更新文件
    async updateFile(path, content, message, sha) {
        const { owner, name, branch } = CONFIG.repo;
        const url = `${this.baseUrl}/repos/${owner}/${name}/contents/${encodeURIComponent(path)}`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    message: message || `更新 ${path}`,
                    content: btoa(unescape(encodeURIComponent(content))),
                    sha: sha,
                    branch: branch
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `更新失败: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('GitHub API Error:', error);
            throw error;
        }
    },

    // 测试 Token 是否有效
    async testToken() {
        const token = Auth.getToken();
        if (!token) return false;

        try {
            const response = await fetch(`${this.baseUrl}/user`, {
                headers: this.getHeaders()
            });
            return response.ok;
        } catch {
            return false;
        }
    }
};

// 导出
window.GitHubAPI = GitHubAPI;
