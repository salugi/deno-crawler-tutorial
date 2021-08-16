export class RelationalObject{
    parent_base:string;
    parent_path:string;
    related_links:Array<string>;
    content:string;
    meta_content:Array<string>;
    constructor(url:any) {

        this.parent_base   = url.base|| (()=>{throw new Error("there is no parent link")}).call("");
        this.parent_path   = url.path
        this.related_links = Array<any>();
        this.content="";
        this.meta_content  = Array<any>();
    }
    get(){
        return {
            parent_base :this.parent_base,
            parent_path:this.parent_path,
            related_links:this.related_links,
            content:this.content,
            meta_content:this.meta_content
        }
    }
}
