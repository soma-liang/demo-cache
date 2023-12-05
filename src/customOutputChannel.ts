
import * as vscode from 'vscode';

export class CustomOutputChannel implements vscode.OutputChannel {
    private channel: vscode.OutputChannel;
    private buffer: string[];
    private bufferSize: number;
    private line: number;
    private cache: string[] = [];
    private timer: NodeJS.Timeout | null = null;
    name: string;
    constructor(name: string, bufferSize?: number) {
        this.name = name
        this.channel = vscode.window.createOutputChannel(name);
        this.buffer = [];
        this.line = 0;
        if (bufferSize === undefined || bufferSize === null) {
            this.bufferSize = 1000
        } else {
            this.bufferSize = bufferSize > 100 ? bufferSize : 100
        }
    }
    replace(value: string): void {
        throw new Error('Method not implemented.');
    }

    append(value: string): void {
        this.appendCache(value, false)
        this.line++

        // console.log(`message:${this.buffer.length}`)
        if (this.line > this.bufferSize) {
            // if(this.buffer===undefined||this.buffer===null){
            //     this.buffer=[]
            // }else 
            if (this.buffer.length < 100) {
                this.buffer.push(value)
            } else {
                this.channel.clear();
                this.buffer.forEach(line => this.appendCache(line, false));
                this.line = 0
                this.buffer.length = 0
            }
        }
    }

    appendLine(value: string): void {
        this.appendCache(value, true)
        this.line++

        // console.log(`message:${this.buffer.length}`)
        if (this.line > this.bufferSize) {
            // if(this.buffer===undefined||this.buffer===null){
            //     this.buffer=[]
            // }else 
            if (this.buffer.length < 100) {
                this.buffer.push(value)
            } else {
                this.channel.clear();
                this.buffer.forEach(line => this.appendCache(line, true));
                this.line = 0
                this.buffer.length = 0
            }
        }
    }

    public appendCache(message: string, aline: boolean) {
        this.cache.push(message);
        if (!this.timer) {
            this.timer = setTimeout(() => {
                this.flushCache(aline);
            }, 1000);
        }
    }

    private flushCache(aline: boolean) {
        if (aline) {
            this.channel.appendLine(this.cache.join('\n'));
        } else {
            this.channel.append(this.cache.join(''));
        }
        this.cache = [];
        this.timer = null;
    }

    clear(): void {
        this.buffer = []
        this.channel.clear();
    }

    show(): void {
        this.channel.show();
    }

    hide(): void {
        this.channel.hide();
    }

    dispose(): void {
        this.channel.dispose();
    }

}

