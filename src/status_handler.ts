import * as vscode from "vscode";
import * as fs from 'fs'
import { Handler } from "./hander";

export class StatusHandler implements Handler{
    public statusBar !: vscode.StatusBarItem;
    public count : number = -1;
    public fileUrl :string = "";
    public fileLines : string[] = [];
    public fileLineCounts : number = 0;
    
    constructor() {
        if(!this.statusBar){
            this.statusBar  = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        }
    }
    init(args:string) {
        
        // 选取文件
        vscode.window.showOpenDialog(
            {
                canSelectFiles:true, // 是否可选文件
                canSelectFolders:false, // 是否可选文件夹
                canSelectMany:false, // 是否可以选择多个
                defaultUri:vscode.Uri.file("/D:/"), // 默认打开本地路径
                openLabel:'select'
            }).then((msg) =>{
                if(!msg){
                    return;
                }
                console.log(msg[0]);
                this.fileUrl = msg[0].path.slice(1,);
                console.log(this.fileUrl);
                
                // 读取文件
                fs.readFile(this.fileUrl, 'utf8', (err,data)=>{
                    if(err){
                        return;
                    }
                    // 每隔N个字符插入一个换行符
                    data = data.replace(/(.{35})/g,'$1\n')
                    this.fileLines = data.split(/\r?\n/);
                    this.fileLineCounts = this.fileLines.length;
                    this.count = -1;
                    vscode.window.showInformationMessage(this.fileUrl);
                    this.update("0");
                })
            }
        )
    }
    update(args:string) {
        if(args == "0") {
            this.count++;
        } else {
            this.count--;
        }
        this.statusBar.text = "["+this.count+"/"+this.fileLineCounts+"] : " + this.fileLines[this.count];
        this.statusBar.show();
    }
}