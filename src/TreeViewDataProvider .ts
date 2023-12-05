
import path = require('path');
import * as vscode from 'vscode';
export class TreeDataProvider implements vscode.TreeDataProvider<TreeNode> {
    tree: TreeNode[]
    constructor() {
        this.tree = []
    }


    private _onDidChangeTreeData: vscode.EventEmitter<TreeNode | undefined | void> = new vscode.EventEmitter<TreeNode | undefined | void>();
    onDidChangeTreeData: vscode.Event<TreeNode | undefined | void> = this._onDidChangeTreeData.event;


    getTreeItem(element: TreeNode): vscode.TreeItem {
        return element;
    }

    getChildren(element?: TreeNode): TreeNode[] | undefined {
        if (element !== undefined) {
            return element.children
        }
        return this.tree
        // if (element) {
        //     return Promise.resolve([]);
        // } else {
        //     return Promise.resolve([
        //         new TreeNode('Item 1'),
        //         new TreeNode('Item 2'),
        //         new TreeNode('Item 3')
        //     ]);
        // }
    }

    // refresh(): void {
    //     this._onDidChangeTreeData.fire()
    // }
    refresh(): void {
        // 触发刷新显示的事件
        this._onDidChangeTreeData.fire(undefined);
    }

    dispose(): void {
        this._onDidChangeTreeData.dispose(); // dispose the event emitter
        // 重新注册事件监听器
        this._onDidChangeTreeData = new vscode.EventEmitter<TreeNode | undefined>();
    }

}

export class TreeNode extends vscode.TreeItem {
    state: boolean = true
    constructor(
        label: string,
        public children?: TreeNode[],
        public parent?: TreeNode | undefined,
    ) {
        if (children === undefined) { children = [] }
        super(label, vscode.TreeItemCollapsibleState.None);
        this.children?.forEach((child) => {
            child.parent = this
        })
    }


    getIconUriForLabel() {
        if (this.state) {
            this.state = false
            this.iconPath = vscode.Uri.file(path.join(__filename, '..', '..', 'img', 'dut-pass.svg'))
        } else {
            this.state = true
            this.iconPath = vscode.Uri.file(path.join(__filename, '..', '..', 'img', 'dut-fail.svg'))
        }
    }


    // dispose(): void {
    //     if (this.iconPath instanceof vscode.Uri) {
    //         vscode.Disposable.from(
    //             vscode.workspace.fs.stat(this.iconPath).then(() => vscode.workspace.fs.delete(this.iconPath))
    //         ).dispose();
    //     }
    // }

}