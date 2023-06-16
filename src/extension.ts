// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as fs from 'fs'
import * as vscode from 'vscode'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('插件被激活')
  // 注册命令
  let disposable = vscode.commands.registerCommand(
    'AutoMatchFormat',
    (uri) => {
      vscode.window.showInformationMessage(
        'Hello VS Code from AutoMatchFormat!'
      )
      // 文件路径
      const filePath = uri.path.substring(1)
      fs.stat(filePath, (err, stats) => {
        if (err) {
          vscode.window.showErrorMessage(`获取文件时遇到错误了${err}!!!`)
        }

        if (stats.isDirectory()) {
          vscode.window.showWarningMessage(
            `检测的是文件夹，不是文件，请重新选择！！！`
          )
        }

        if (stats.isFile()) {
          const size = stats.size
          const createTime = stats.birthtime.toLocaleString()
          const modifyTime = stats.mtime.toLocaleString()

          vscode.window.showInformationMessage(
            `
                        文件大小为:${size}字节;
                        文件创建时间为:${createTime};
                        文件修改时间为:${modifyTime}
                    `,
            { modal: true }
          )
        }
      })
    }
  )
  // 将命令放入上下文对象，使其生效
  console.log('上下文环境', context)
  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
