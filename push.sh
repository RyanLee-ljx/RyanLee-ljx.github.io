#!/bin/bash

echo "========== 部署脚本启动 =========="

# 1. 切换分支
echo ">>> 执行: git checkout main"
git checkout main

# 2. 检查当前状态（有助于排查是否被 .gitignore 拦截或路径错误）
echo -e "\n>>> 当前工作区状态:"
git status

# 3. 添加与提交
echo -e "\n>>> 执行: git add -A 及 git commit"
git add -A
git commit -m "deploy: $(date '+%Y%m%d-%H:%M:%S')"

# 4. 推送到远端
echo -e "\n>>> 执行: git push origin main"
git push origin main

echo -e "\n========== 脚本执行完毕 =========="

# 核心指令：挂起终端，等待用户输入回车键后才释放进程并关闭窗口
read -p "请按回车键 (Enter) 退出..."