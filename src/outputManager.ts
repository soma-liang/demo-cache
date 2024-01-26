
import * as vscode from 'vscode'
// import { CustomOutputChannel } from './customOutputChannel'

export class OutputManager {
    private outputs:Map<string,vscode.OutputChannel >
	private mainOutput:vscode.OutputChannel
    private _context:vscode.ExtensionContext
    constructor (context: vscode.ExtensionContext) {
    	this._context = context
    	this.outputs = new Map()

    	this.mainOutput = this.appendMainOutput()
    	this.mainOutput.show()
    }

    private appendMainOutput ():vscode.OutputChannel {
    	return this.appendOutput('MainOutput')
    }

    private appendOutput (name:string):vscode.OutputChannel {
    	const output = vscode.window.createOutputChannel(name)
    	this._context.subscriptions.push(output)
    	output.appendLine('Welcome to et-cli OUTPUT, Copyright(C),2021, Micsoft Technology Co.Ltd')
    	output.appendLine('')
    	return output
    }

    public appendLine(msg:string){
        this.mainOutput.appendLine(msg)
    }

    public clear(){
        this.mainOutput.clear()
    }

}
