// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { OutputManager } from './outputManager';
import { TreeDataProvider, TreeNode } from './TreeViewDataProvider ';
import { DemoTreeView } from './DemoTreeView';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-sample" is now active!');


	let timerOut: NodeJS.Timer | undefined
	let timerTree: NodeJS.Timer | undefined
	let timerStatus: NodeJS.Timer | undefined
	let outputManager: OutputManager | undefined
	let statusBarItem: vscode.StatusBarItem
	const tree = new DemoTreeView(context)
	for (let index = 0; index < 100; index++) {
		tree.provider.tree.push(new TreeNode(index.toString()))
	}

	outputManager = new OutputManager(context)
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
		// outputManager = new OutputManager(context)
	}))

	context.subscriptions.push(vscode.commands.registerCommand('extension.starttest', () => {
		let i = 0
		timerOut = setInterval(() => {
			i++
			outputManager?.appendLine(new Date().toISOString())
			if (i > 1000) {
				outputManager?.clear()
				i = 0
			}
		}, 10)
	}))

	context.subscriptions.push(vscode.commands.registerCommand('extension.endtest', () => {
		if (timerOut !== undefined) {
			clearInterval(timerOut)
		}
	}))


	context.subscriptions.push(vscode.commands.registerCommand('extension.starttest2', () => {
		timerTree = setInterval(() => {
			// tree.provider.dispose()
			tree.provider.tree.forEach(t => {
				t.label = new Date().toISOString()
				t.getIconUriForLabel()
			})
			tree.provider.refresh()
		}, 200)
	}))

	context.subscriptions.push(vscode.commands.registerCommand('extension.endtest2', () => {
		if (timerTree !== undefined) {
			clearInterval(timerTree)
		}
	}))


	context.subscriptions.push(vscode.commands.registerCommand('extension.starttest3', () => {
		timerStatus = setInterval(() => {
			// 设置StatusBarItem的文本和颜色
			// statusBarItem.text = `$(star) ${new Date().toISOString()}`;
			// statusBarItem.color = 'white';
			// 设置状态栏项的文本和图标
			const statusBarItemText = `${new Date().toISOString()}`;
			const statusBarItemIcon = '$(chip)';
			statusBarItem.color = 'black'
			statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground')
			statusBarItem.text = `${statusBarItemIcon} ${statusBarItemText}`;
		}, 200)
	}))

	context.subscriptions.push(vscode.commands.registerCommand('extension.endtest3', () => {
		if (timerStatus !== undefined) {
			clearInterval(timerStatus)
		}
	}))
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);


	// 设置状态栏项的文本和图标
	// 将StatusBarItem添加到状态栏
	statusBarItem.show();


}
