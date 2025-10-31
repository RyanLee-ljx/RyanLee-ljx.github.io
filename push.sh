git checkout main
# git fetch origin
# git pull --rebase origin main    # 把远端改动放到本地当前分支之下（如果远端比你新）
# # 解决任何冲突后（如果有）：
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git push origin main

