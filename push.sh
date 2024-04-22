git add -A   # 把所有本地文件（当前文件夹）添加到暂存区
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")    # 提交  后面是注释，表示当前时间
git push origin main   # origin远程仓库名字  main 仓库下分支名字 
