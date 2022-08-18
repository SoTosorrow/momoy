import * as vscode from 'vscode';
import { Handler, ProxyHandler } from "./hander";
import { StatusHandler } from './status_handler';
import { TestHandler } from './test_handler';

export function activate(context: vscode.ExtensionContext) {
	
	console.log("It's time to momoy~");

	// 用于代理、动态分发
	let proxy_handler = new ProxyHandler();
	let handlef_map = new Map();
	let handler_map = new Map();
	let current_handler :Handler;
	
	handlef_map.set("init", proxy_handler.proxyInit);
	handlef_map.set("update", proxy_handler.proxyUpdate);
	
	handler_map.set("test_handler", new TestHandler())
	handler_map.set("status_handler", new StatusHandler())
	current_handler = handler_map.get("test_handler");

	// 注册执行内容
	context.subscriptions.push(vscode.commands.registerCommand('momoy.helloWorld', () => {
		vscode.window.showInputBox({
			password: false,
			ignoreFocusOut: true,
			placeHolder: "use_handler"
		}).then((input)=>{
			// 通过用户输入的handler去map寻找并切换
			if(input != null){
				vscode.window.showInformationMessage(input);
				let result_handler = handler_map.get(input);
				if(result_handler != undefined) {
					current_handler = result_handler;
				}
			}
		});
	}));
	
	context.subscriptions.push(vscode.commands.registerCommand('momoy.handler_init', (args:any)=>{
		handlef_map.get("init").call(current_handler,args);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('momoy.handler_update', (args:any)=>{
		handlef_map.get("update").call(current_handler,args);
	}));

}

// this method is called when your extension is deactivated
export function deactivate() {}

/**
 * 
 * 		vscode.window.activeTextEditor?.edit(editBuilder=>{
			// let position = new vscode.Position(0, 0);
			let position = vscode.window.activeTextEditor?.selection.active;
			// console.log(vscode.window.activeTextEditor?.document.lineAt(position));
			if(position) {
				editBuilder.insert(position,"hello momoy");
			}
		})
 */
