import { Handler } from "./hander";
import { window } from "vscode";

export class TestHandler implements Handler{
    desc: string = "for test debug print";
    init(args:string){
        window.showInformationMessage("init");
    }
    update(args:string){
        if(args=="0")
            window.showInformationMessage("update");
        else
            window.showInformationMessage("preUpdate");
            
    }


}