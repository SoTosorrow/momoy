export interface Handler{
    // desc: string;
    init	: (args:string) =>void;
	update	: (args:string) =>void;
}

export class ProxyHandler implements Handler{
	init(args:string){}
	update(args:string){}
	proxyInit(args:string){
		this.init(args);
	}
	proxyUpdate(args:string){
		this.update(args);
	}
}