#!/bin/bash

#set -e

# Start in website/ even if run from root directory
#cd "$(dirname "$0")"

# 执行publish.sh脚本,跟目录需在website/下
# 创建 gh-pages 分支目录
cd ../../
git clone git@gitlab.alibaba-inc.com:tianxue.nitx/lib-img.git lib-img-gitbook
cd lib-img-gitbook
git checkout gitbook

# 清除所有内容
rm -Rf *



# 切换到master 分支目录website中

cd ../lib-img/gitbook
# 执行站点脚本生成
npm install

cp -R ../docs/* ./
cp -R ../CHANGELOG.md ./
cp -R ../README.md ./


gitbook build

# 将public的内容复制到 gh-pages 目录中
#cp -R public/* ../../lib-img-gh-pages/
# 移除 public 目录
#rm -Rf public/

# 切换到gh-pages目录 提交代码
cd ../../lib-img-gitbook

#git add --all
#git commit -m "update gitbook"
#git push origin gitbook

