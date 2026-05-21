import { Ratelimit } from "@upstash/ratelimit";
import { wikiepediaRateLimit } from "./ratelimiter";

export async function getWikipediaSummary(url:string) : Promise<string>{
    "use server";
    let fetchURL:string;
    console.log(url);

    //This request is only usefull for testing purposes and i will be leaving it commneted out because i dont need any of these other values 
    // in standard execution
    // const { success, pending, limit, reset, remaining } = await wikiepediaRateLimit.limit("global_api_id");
    
    const {success} = await wikiepediaRateLimit.limit("wiki_api_id");
        // console.log(limit);
        // console.log(reset);
        // console.log(remaining);
    
        if(!success){
            console.log("Rate Limit Hit");
            return ("The server has made too many requests to the wikipedia servers. In order to avoid interfering with wikipedia's proper operation all future requests will be prevented for 1 minute. Please try again in a minite or so");
        }

    let articleTitle = url.substring(url.indexOf("wiki/")+5, url.length);

    fetchURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles="
     + articleTitle + "&redirects=1&formatversion=2&explaintext=1";
    
    let text = "BAD ";
    try{
        let test = await fetch(fetchURL, {
            headers:{
                'User-Agent': 'EcoInfoProject/1.0 (https://github.com/FraserWPKent/Ecosystem-Info-Project; ecoinfoprojcontact@gmail.com)'
            }
        });
        // text = await test.text();
        let json = await test.json();
        //Improve this attribation
        text = json.query.pages[0].extract;
        return parseWikiArticle(text) + "\n This text information is a transformation of information from the Wikipedia article " + articleTitle + " which was written by various wikipedia contributors. " + url +" It is liceneced under the creative commons licence. https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_Creative_Commons_Attribution-ShareAlike_4.0_International_License";
    } catch(err){
        console.log(err);
    }
    return(text);
    

}

function parseWikiArticle(text: string): string {
        // console.log(text);     
        const sections: { start: number; end: number }[] = [];     
        const headerRegex = /==+\s*(.+?)\s*==+/g;  // Matches == Header == or === Subheader ===     
        let match;     
        const headerPositions: { start: number; end: number }[] = [];          
        // Collect all header start/end indices     
        while ((match = headerRegex.exec(text)) !== null) {         
            headerPositions.push({             
                start: match.index,  // Start of the header marker             
                end: match.index + match[0].length  // End of the header marker         \
                });     
        }            
        let previousEnd = 0;   
        for (const header of headerPositions) {               
            sections.push({ start: previousEnd, end: header.start });         
            previousEnd = header.end;  
        }
        if (previousEnd < text.length) {         
            sections.push({ start: previousEnd, end: text.length });     
        }

        let outputString = text.substring(sections[0].start, sections[0].end);
        
        let prevEnd = sections[0].end;
        for(let x = 1; x < sections.length; x++){
            let header = text.substring(prevEnd, sections[x].start);
            prevEnd = sections[x].end;
            if(checkForBannedSections(header)){
                continue;
            }
            if(checkForKeySections(header)){
                if(sections[x].start !== sections[x].end){
                    outputString += header + "\n"+text.substring(sections[x].start, sections[x].end);
                }
                if(header.substring(0, 3) === "== "){
                    let y = x+1;
                    for(;y < sections.length; y++){
                        header = text.substring(prevEnd, sections[y].start);
                        if(checkForBannedSections(header)){
                            prevEnd = sections[y].end;
                            continue;
                        }
                        if(header.substring(0, 3) === "== "){
                            break;
                        }
                        prevEnd = sections[y].end;
                        if(sections[y].start !== sections[y].end){
                            outputString += header + "\n"+text.substring(sections[y].start, sections[y].end);
                        }
                    }
                    x=y+1;
                }
            }   
        }
        return outputString; 
    }

function checkForKeySections(header: string) : boolean{
    header = header.toLowerCase();
    return (
        header.includes("description") ||
        header.includes("behavior") ||
        header.includes("ecology")||
        header.includes("habitat")||
        header.includes("distribution")||
        header.includes("diet") ||
        header.includes("conservation")||
        header.includes("status")
    );
}
function checkForBannedSections(header: string): boolean{
    header = header.toLowerCase();
    return(
        header.includes("references") ||
        header.includes("external") ||
        header.includes("links") ||
        header.includes("citations") ||
        header.includes("subspecies") ||
        header.includes("further") ||
        header.includes("readings") ||
        header.includes("see")
    );
}