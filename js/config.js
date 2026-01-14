/* =====================================================
   配置文件 - 章节信息与密码
   ===================================================== */

const CONFIG = {
    // 仓库信息
    repo: {
        owner: 'RolandoZhao',
        name: 'note-gym',
        branch: 'main'
    },
    
    // 密码设置
    passwords: {
        read: 'rolando',      // 阅读密码
        edit: 'rolando2026'   // 编辑密码
    },
    
    // 免费章节数
    freeChapters: 6,
    
    // 章节配置
    chapters: [
        // 第一幕：体面的坍塌
        { id: 1, title: '高光时刻', file: '口罩下的两年_正文.md', act: 1, actName: '体面的坍塌' },
        { id: 2, title: '明星教练', file: '口罩下的两年_正文.md', act: 1 },
        { id: 3, title: '最后的荣光', file: '口罩下的两年_正文.md', act: 1 },
        { id: 4, title: '第一次关闭', file: '口罩下的两年_第4-6章.md', act: 1 },
        { id: 5, title: '疫情来袭', file: '口罩下的两年_第4-6章.md', act: 1 },
        { id: 6, title: '暂时休息', file: '口罩下的两年_第4-6章.md', act: 1 },
        { id: 7, title: '螺旋下坠', file: '口罩下的两年_第7-10章.md', act: 1 },
        { id: 8, title: '存款告急', file: '口罩下的两年_第7-10章.md', act: 1 },
        { id: 9, title: '艰难抉择', file: '口罩下的两年_第7-10章.md', act: 1 },
        { id: 10, title: '另谋出路', file: '口罩下的两年_第7-10章.md', act: 1 },
        
        // 第二幕A：菜鸟期
        { id: 11, title: '第一单', file: '口罩下的两年_第11-14章.md', act: 2, actName: '口罩下的两年' },
        { id: 12, title: '翠华餐厅', file: '口罩下的两年_第11-14章.md', act: 2 },
        { id: 13, title: '60块钱的快乐', file: '口罩下的两年_第11-14章.md', act: 2 },
        { id: 14, title: '戴紧口罩', file: '口罩下的两年_第11-14章.md', act: 2 },
        { id: 15, title: '险些暴露', file: '口罩下的两年_第15-17章.md', act: 2 },
        { id: 16, title: '餐厅惊魂', file: '口罩下的两年_第15-17章.md', act: 2 },
        { id: 17, title: '虚惊一场', file: '口罩下的两年_第15-17章.md', act: 2 },
        
        // 第二幕B：外卖众生相
        { id: 18, title: '外卖众生', file: '口罩下的两年_第18-22章.md', act: 2 },
        { id: 19, title: '大学生Tony', file: '口罩下的两年_第18-22章.md', act: 2 },
        { id: 20, title: '前白领阿强', file: '口罩下的两年_第18-22章.md', act: 2 },
        { id: 21, title: '单亲妈妈小美', file: '口罩下的两年_第18-22章.md', act: 2 },
        { id: 22, title: '不只有我在挣扎', file: '口罩下的两年_第18-22章.md', act: 2 },
        { id: 23, title: '百态顾客', file: '口罩下的两年_第23-26章.md', act: 2 },
        { id: 24, title: '刁难与善良', file: '口罩下的两年_第23-26章.md', act: 2 },
        { id: 25, title: '当众羞辱', file: '口罩下的两年_第23-26章.md', act: 2 },
        { id: 26, title: '差点崩溃', file: '口罩下的两年_第23-26章.md', act: 2 },
        
        // 第二幕C：双线交织
        { id: 27, title: '野花的近况', file: '口罩下的两年_第27-30章.md', act: 2 },
        { id: 28, title: '健身直播', file: '口罩下的两年_第27-30章.md', act: 2 },
        { id: 29, title: '默默点赞', file: '口罩下的两年_第27-30章.md', act: 2 },
        { id: 30, title: '两个世界', file: '口罩下的两年_第27-30章.md', act: 2 },
        { id: 31, title: '阿琳生病', file: '口罩下的两年_第31-34章.md', act: 2 },
        { id: 32, title: '崩溃边缘', file: '口罩下的两年_第31-34章.md', act: 2 },
        { id: 33, title: '同事凑钱', file: '口罩下的两年_第31-34章.md', act: 2 },
        { id: 34, title: '温暖与讽刺', file: '口罩下的两年_第31-34章.md', act: 2 },
        
        // 第二幕D：黎明前的黑暗
        { id: 35, title: '撒谎的代价', file: '口罩下的两年_第35-38章.md', act: 2 },
        { id: 36, title: '妈妈要来', file: '口罩下的两年_第35-38章.md', act: 2 },
        { id: 37, title: '拼命阻止', file: '口罩下的两年_第35-38章.md', act: 2 },
        { id: 38, title: '隧道尽头的光', file: '口罩下的两年_第35-38章.md', act: 2 },
        
        // 第三幕：最后一次流调
        { id: 39, title: '胜利在望', file: '口罩下的两年_第39-42章.md', act: 3, actName: '最后一次流调' },
        { id: 40, title: '体面回归', file: '口罩下的两年_第39-42章.md', act: 3 },
        { id: 41, title: '恢复训练', file: '口罩下的两年_第39-42章.md', act: 3 },
        { id: 42, title: '计划落空', file: '口罩下的两年_第39-42章.md', act: 3 },
        { id: 43, title: '3月24日', file: '口罩下的两年_第43-48章.md', act: 3 },
        { id: 44, title: '确诊', file: '口罩下的两年_第43-48章.md', act: 3 },
        { id: 45, title: '翡翠台', file: '口罩下的两年_第43-48章.md', act: 3 },
        { id: 46, title: '野花认出', file: '口罩下的两年_第43-48章.md', act: 3 },
        { id: 47, title: '妈妈的电话', file: '口罩下的两年_第43-48章.md', act: 3 },
        { id: 48, title: '崩溃大哭', file: '口罩下的两年_第43-48章.md', act: 3 },
        
        // 第四幕：破茧
        { id: 49, title: '意外的转折', file: '口罩下的两年_第49-54章.md', act: 4, actName: '破茧' },
        { id: 50, title: '妈妈的心疼', file: '口罩下的两年_第49-54章.md', act: 4 },
        { id: 51, title: '野花的道歉', file: '口罩下的两年_第49-54章.md', act: 4 },
        { id: 52, title: '第一次认真', file: '口罩下的两年_第49-54章.md', act: 4 },
        { id: 53, title: '重新定义体面', file: '口罩下的两年_第49-54章.md', act: 4 },
        { id: 54, title: '社交媒体发文', file: '口罩下的两年_第49-54章.md', act: 4 },
        { id: 55, title: '野花转发', file: '口罩下的两年_第55-58章.md', act: 4 },
        { id: 56, title: '疫情结束', file: '口罩下的两年_第55-58章.md', act: 4 },
        { id: 57, title: '回到健身房', file: '口罩下的两年_第55-58章.md', act: 4 },
        { id: 58, title: '最真实的两年', file: '口罩下的两年_第55-58章.md', act: 4 }
    ],
    
    // 幕信息
    acts: [
        { id: 1, name: '体面的坍塌', chapters: '1-10', words: '4万' },
        { id: 2, name: '口罩下的两年', chapters: '11-38', words: '7万' },
        { id: 3, name: '最后一次流调', chapters: '39-48', words: '2.5万' },
        { id: 4, name: '破茧', chapters: '49-58', words: '1.5万' }
    ]
};

// 导出配置
window.CONFIG = CONFIG;
