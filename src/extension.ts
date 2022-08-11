// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Handler } from "./hander";
import { StatusHandler } from './status_handle';

class PlaceHandler implements Handler{
	desc:string =  "placeholder handler for proxy";
	init(){}
	update(){}
	preUpdate(){}
	proxyInit(){
		this.init();
	}
	proxyUpdate(){
		this.update();
	}
	proxyPreUpdate(){
		this.preUpdate();
	}
}

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "momoy" is now active!');


	let proxy_handler = new PlaceHandler();
	let handle_map = new Map();
	handle_map.set("init", proxy_handler.proxyInit);
	handle_map.set("update", proxy_handler.proxyUpdate);
	handle_map.set("pre_update", proxy_handler.proxyPreUpdate);
	
	
	let status_handle = new StatusHandler();
	context.subscriptions.push(vscode.commands.registerCommand('momoy.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from momoy!');
	}));
	
	context.subscriptions.push(vscode.commands.registerCommand('momoy.handler_init', ()=>{
		handle_map.get("init").call(status_handle);
		// status_handle.init();
	}));
	context.subscriptions.push(vscode.commands.registerCommand('momoy.handler_rev', ()=>{
		handle_map.set("update", proxy_handler.proxyPreUpdate);
		handle_map.set("pre_update", proxy_handler.proxyUpdate);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('momoy.handler_update', ()=>{
		// status_handle.update();
		handle_map.get("update").call(status_handle);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('momoy.handler_pre_update', ()=>{
		// status_handle.preUpdate();
		handle_map.get("pre_update").call(status_handle);
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
