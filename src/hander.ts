export interface Handler{
    desc: string;
    init: ()=>void;
	preUpdate: ()=>void;
	update: ()=>void;
}