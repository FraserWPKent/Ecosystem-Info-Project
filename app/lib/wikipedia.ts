

export async function getWikipediaSummary(url:string){
    "use server";
    let fetchURL:string;

    console.log(url);


    let articleTitle = url.substring(url.indexOf("wiki/")+5, url.length);

    fetchURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles="
     + articleTitle + "&redirects=1&formatversion=2&explaintext=1";
    
    let text = "";
    try{
        let test = await fetch(fetchURL);
        let json = await test.json();
        //Improve this attribation
        text = json.query.pages[0].extract + "\n This text information is a transformation of information from the Wikipedia article " + articleTitle + " which was written by various wikipedia contributors. " + url +" It is liceneced under the creative commons licence. https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_Creative_Commons_Attribution-ShareAlike_4.0_International_License"
        parseWikiArticle(text);
    } catch(err){
        console.log(err);
    }
    // console.log(text);
    
    // console.log({articleTitle});
    

    return(text);
    

}

function parseWikiArticle(text: string){
    let returnMessage: string;
    // let searchMessage: string = "";
    
    // let firstEquals = text.indexOf("=");
    // while(text[firstEquals] === "="){
    //     searchMessage+="=";
    //     firstEquals++;
    // }

    // // else if(text.includes("===")){
    // //     searchMessage = "===";
    // // }
    // // else if(text.includes("==")){
    // //     searchMessage = "==";
    // // }
    // // else{
    // //     searchMessage = "=";
    // // }
    
    let tempMessage: string = text;
    let currentIndex: number = 0;
    let headingIndexs = new Array();
    // let count: number = 0;
    if(tempMessage.indexOf("==", 0) !== -1){
        while(tempMessage.indexOf("=", currentIndex) !== -1){
            // headingIndexs.push(new Array());

            let startIndex = tempMessage.indexOf("=", currentIndex);
            let hold = new Array();
            hold.push(startIndex);
            // console.log(hold[0]);
            //     if(hold[0] === -1){
            //         break;
            //     }
            // let searchMessage: string = "";
            let tracker = 2;
            while(tracker){
                if(startIndex >= tempMessage.length){
                    break;
                }
                if(tracker === 2 && tempMessage[startIndex] !== "="){
                    tracker--;
                }
                if(tracker === 1 && tempMessage[startIndex] === "="){
                    tracker--;
                }
                // searchMessage+=tempMessage[startIndex];
                startIndex++;
            }
            while(tempMessage[startIndex] === "="){
                if(startIndex >= tempMessage.length){
                    break;
                }
                startIndex++;
            }
            hold.push(startIndex);

            // startIndex = tempMessage.indexOf("=", hold[0]+searchMessage.length+1);
            // hold.push(startIndex);
            // console.log(hold[1]+searchMessage.length+1);



            // let hold = new Array();
            // if(tempMessage.indexOf("===", currentIndex) > tempMessage.indexOf("==", currentIndex)){
            //     hold.push(tempMessage.indexOf("==", currentIndex));
            //     console.log(hold[0]);
            //     if(hold[0] === -1){
            //         break;
            //     }
            //     hold.push(tempMessage.indexOf("==", hold[0]+1));
            //     console.log(hold[1]);
            // }
            // else{
            //     hold.push(tempMessage.indexOf("===", currentIndex));
            //     console.log(hold[0]);
            //     if(hold[0] === -1){
            //         break;
            //     }
            //     hold.push(tempMessage.indexOf("===", hold[0]+1));
            //     console.log(hold[1]);
            // }
            currentIndex = hold[1];
            
            headingIndexs.push(hold);
            if(currentIndex <= 0 || currentIndex >= text.length){
                break;
            }
            // count++;
        }
    }

    for(let x = 0; x < headingIndexs.length; x++){
        console.log(text.substring(headingIndexs[x][0], headingIndexs[x][1]));
    }
    // console.log("\n");

}