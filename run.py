# coding:utf-8
import os
import sys
import platform
import subprocess
import time
import json
# 项目名称
projectName = '/gulp-mobile-release'
# 临时目录
feRelease = '../fe-release/'
# 部署上线gitlab地址
feReleaseGit = 'https://github.com/xmllein/gulp-mobile-release.git'


# 初始化目录函数
def initDir():
    if not os.path.exists(feRelease):
        exeCmd('mkdir ' + feRelease)


# 执行命令行函数
def exeCmd(cmd):
    print '------------------------------------------------------'
    print cmd
    os.system(cmd)


# 获取当前git分支函数
def getGitBranch():
    branches = subprocess.check_output(['git', 'branch']).split('\n')
    for b in branches[0:-1]:
        if b[0] == '*':
            return b.lstrip('* ')

    return None


# 上线测试环境
def releaseOnline():
    print 'release to gulp-html-release start...'
    # 打包存放临时目录
    bakTmp = './dist'

    # 进行打包编译
    cmd = 'yarn build'
    exeCmd(cmd)

    # clone最新的上线gitlab项目
    currPath = os.getcwd()
    os.chdir(os.path.join(currPath, feRelease))

    exeCmd('git clone ' + feReleaseGit)

    # 将打包编译的文件拷贝到fe-release
    os.chdir(currPath)
    exeCmd('rm -rf ' + os.path.join(feRelease + projectName, "*"))

    # 拷贝到gitlab目录
    cmd = 'scp -r ' + os.path.join(bakTmp, '', '*') + ' ' + \
        os.path.join(feRelease + projectName, '')
    exeCmd(cmd)

    # 切到fe-release git push
    os.chdir(os.path.join(currPath, feRelease + projectName, ''))
    exeCmd('git add .')
    exeCmd('git commit -m "auto commit" *')
    exeCmd('git push')

    # 打tag
    exeCmd('git tag www/' + '' + time.strftime('%Y%m%d.%H%M'))
    exeCmd('git push --tags')

    # 切回到当前目录，并且移除临时目录
    os.chdir(currPath)
    cmd = 'rm -rf ' + feRelease
    exeCmd(cmd)
    cmd = 'rm -rf ' + bakTmp
    exeCmd(cmd)

    print 'release to gulp-mobile-release end'


def main():
    initDir()
    argv = sys.argv

    cmdType = sys.argv[1]
    # 执行python run.py www
    if cmdType == 'www':
        releaseOnline()
    else:
        print 'please choose one : www'


if __name__ == "__main__":
    main()
