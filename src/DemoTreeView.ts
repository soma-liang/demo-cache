import * as vscode from 'vscode';
import { TreeDataProvider, TreeNode } from './TreeViewDataProvider ';

export class DemoTreeView {
    public provider: TreeDataProvider;
    public treeView: vscode.TreeView<TreeNode | undefined>;
    constructor(context: vscode.ExtensionContext) {
        // ´´½¨ TreeViewDataProvider ÊµÀý
        this.provider = new TreeDataProvider()

        // ´´½¨ TreeView ÊµÀý
        this.treeView = vscode.window.createTreeView('exampleTreeView', {
            treeDataProvider: this.provider
        });
        context.subscriptions.push(this.treeView)
    }
}