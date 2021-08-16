import { Crawler} from "./crawler.ts";
import { RelationalObject} from "./RelationalObject.ts";
import { urlParse } from 'https://deno.land/x/url_parse/mod.ts';

let crawler = new Crawler()
let url = {
    base:"https://www.example.com",
    path:"/"
}
let first_generation: RelationalObject = await crawler.crawl(url);
for(let i =0;i< first_generation.related_links.length;i++) {
    console.log(first_generation.get());
    let new_base = urlParse(first_generation.related_links[i]);
    let url = {
        base:new_base.origin,
        path:new_base.pathname
    }
     let smokey = await crawler.crawl(url);
    console.log(smokey.get())
}
