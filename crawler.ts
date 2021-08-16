import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import { RelationalObject } from './RelationalObject.ts';

export class Crawler{

    constructor(){

    }
    async crawl(url:any):Promise<RelationalObject>{
        let base = new RelationalObject(url);
        const res = await fetch(base.parent_base+base.parent_path);
        const html = await res.text();
        const document: any = new DOMParser().parseFromString(html, 'text/html');

        base.content = document.querySelector('html').textContent
        base.meta_content = this.meta_parse(document.querySelectorAll('meta'))

        base.related_links = this.rehome(document.querySelectorAll('a'),base.parent_base)//.textContent;
        return base
    }
    rehome(a:Array<any>, base_url:string):Array<string>{
        let http = new RegExp("http|https")
        let out = Array<any>();
        for(let i =0; i < a.length;i++){
            if(a[i].attributes.href!==undefined) {
                let tell = ""
                if (!a[i].attributes.href.match(http)) {
                    tell = base_url + a[i].attributes.href
                } else {
                    tell = a[i].attributes.href
                }
                out.push(tell)
            }
        }
        return out
    }
    meta_parse(a:Array<any>):Array<string>{
        let out = Array<any>();
        for(let i =0; i < a.length;i++){
            let meta_tag = {
                    name : "",
                    content:""
                }
                if(a[i].attributes.charset !== undefined) {
                    meta_tag.name = "charset"
                    meta_tag.content=a[i].attributes.charset
                    out.push(meta_tag)
                    continue
                }else if(a[i].attributes.property !==undefined) {
                    meta_tag.name = a[i].attributes.property
                    meta_tag.content = a[i].attributes.content
                }else if(a[i].attributes["http-equiv"] !== undefined) {
                    meta_tag.name = a[i].attributes["http-equiv"]
                    meta_tag.content = a[i].attributes.content
                }else if(a[i].attributes.name !== undefined) {
                    meta_tag.name = a[i].attributes.name
                    meta_tag.content = a[i].attributes.content
                }
                out.push(meta_tag)
            }
            return out
        }
    }
