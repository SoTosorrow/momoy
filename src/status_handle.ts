import * as vscode from "vscode";
import * as fs from 'fs'

export class StatusHandler{
    private statusBar !: vscode.StatusBarItem;
    private count : number = -1;
    private fileUrl :string = "";
    private fileLines : string[] = [];
    private fileLineCounts : number = 0;
    
    constructor() {
        if(!this.statusBar){
            this.statusBar  = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        }
    }
    init() {
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
                this.fileUrl = msg[0].path.slice(1,);
                
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
                    this.update();
                })
            }
        )
    }
    preUpdate(){
        this.count--;
        this.statusBar.text = "["+this.count+"/"+this.fileLineCounts+"] : " + this.fileLines[this.count];
        this.statusBar.show();
    }
    update() {
        this.count++;
        this.statusBar.text = "["+this.count+"/"+this.fileLineCounts+"] : " + this.fileLines[this.count];
        this.statusBar.show();
    }
}