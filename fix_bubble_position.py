#!/usr/bin/env python3

# 目标页面列表
target_pages = [
    'leadcom_ai_solutions_no_tencent.html',
    'leadcom_it_maintenance.html',
    'leadcom_tencent_cloud.html',
    'leadcom_success_cases.html',
    'leadcom_about_us.html',
    'leadcom_blog.html',
    'leadcom_blog_pain_points.html',
    'leadcom_blog_opportunities.html'
]

# 替换规则
replacements = [
    # 桌面端气泡位置
    (
        '.chat-bubble{position:fixed;bottom:28px;right:28px;',
        '.chat-bubble{position:fixed;bottom:140px;right:28px;'
    ),
    # 桌面端聊天窗口位置
    (
        '.chat-window{position:fixed;bottom:28px;right:28px;',
        '.chat-window{position:fixed;bottom:140px;right:28px;'
    ),
    # 移动端气泡位置
    (
        '.chat-bubble{bottom:16px;right:16px}',
        '.chat-bubble{bottom:80px;right:16px}'
    )
]

# 处理每个页面
for page in target_pages:
    try:
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        for old, new in replacements:
            if old in content:
                content = content.replace(old, new)
                modified = True
        
        if modified:
            with open(page, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"已更新 {page}")
        else:
            print(f"跳过 {page} - 未找到需要替换的内容")
        
    except Exception as e:
        print(f"处理 {page} 时出错: {e}")

print("完成！")