"use server";
import { randomInt } from "crypto";
import { Data } from "./types";
export async function queryNatureServeEcosystem(message: string){
    "use server";
    let randNum = randomInt(0,3);
    // message = message.toLowerCase();
    console.log(randNum);
    // I Dont know why there is no page 1 for BC but this should fix the issue.
    if(message.substring(0,2) === "bc" && randNum === 1){
        randNum = 2;
    }
    const response = await fetch("https://explorer.natureserve.org/api/data/ecosystemsSearch", {
    // const response = await fetch("https://explorer.natureserve.org/api/data/speciesSearch", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    criteriaType : "ecosystems",
                    textCriteria : [ ],
                    statusCriteria : [{
                        "paramType" : "globalRank",
                        "globalRank" : "GH"  
                    } ,{
                        "paramType" : "globalRank",
                        "globalRank" : "G1"  
                    } ,{
                        "paramType" : "globalRank",
                        "globalRank" : "G2"  
                    }, {
                        "paramType" : "globalRank",
                        "globalRank" : "G3"  
                    }],
                    locationCriteria : [{
                        paramType: "subnation",
                        subnation: message.substring(0,2), 
                        nation: message.substring(3,5),
                    }],
                    pagingOptions : {
                        page: randNum,
                        recordsPerPage : null,
                    },
                    recordSubtypeCriteria : [ ],
                    modifiedSince : null,
                    locationOptions : null,
                    classificationOptions : null,
                    ecosystemsTaxonomyCriteria : [ ]
                }
            )
        }
        );
    // console.log(response.text);
    return response;
}
export async function queryNatureServeSpecies(message: string){
    "use server";
    let randNum = randomInt(0,3);
    // let randNum = 0;
    // console.log(randNum);

    let subnation: string = "Bad";
    let nation: string = "Input";
    if(message.length === 6){
        subnation = message.substring(0, 3).toUpperCase();
        nation = message.substring(4, 6).toUpperCase();
    }
    else{
        subnation = message.substring(0,2).toUpperCase();
        nation = message.substring(3,5).toUpperCase();
    }
    console.log("Subnation: " + subnation);
    console.log("Nation: " + nation);
    const response = await fetch("https://explorer.natureserve.org/api/data/speciesSearch", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    criteriaType : "species",
                    textCriteria : [ ],
                    statusCriteria : [{
                        "paramType" : "globalRank",
                        "globalRank" : "GH"  
                    } ,{
                        "paramType" : "globalRank",
                        "globalRank" : "G1"  
                    } ,{
                        "paramType" : "globalRank",
                        "globalRank" : "G2"  
                    }, {
                        "paramType" : "globalRank",
                        "globalRank" : "G3"  
                    }],
                    locationCriteria : [{
                        paramType: "subnation",
                        
                        subnation: subnation, 
                        nation: nation,
                        // paramType: "nation",
                        // nation: message.substring(0,2),
                    }],
                    pagingOptions : {
                        page : randNum,
                        recordsPerPage : 100,
                        // page: null,
                        // recordsPerPage: 100,
                        
                    },
                    recordSubtypeCriteria : [ ],
                    modifiedSince : null,
                    locationOptions : null,
                    classificationOptions : null,
                    speciesTaxonomyCriteria : [{
                        "paramType" : "scientificTaxonomy",
                        "level" : "KINGDOM",
                        "scientificTaxonomy" : "Animalia",
                        // "kingdom" : "Animalia"
                        } ]
                }
            )
        }
        );
    return response;
}
export async function parseData(data: any){
    let targets: Data[] = [];
    let used: number[] = [];
    let repeats = 0;
        // for(let x = 0; x < data.results.length; x++){
        for(let count = 0; count < 10; count++){
            if(used.length === data.results.length){
                break;
            }
            //Check for infinite loops where we keep ending up with the same random number. repeats resets each time a new x is found
            if(repeats === 500){
                break;
            }
            let x: number = Math.floor((Math.random() * (data.results.length-1)));
            
            // console.log("Current X: " + x);
            // console.log("Data Length: " + data.results.length)
            // console.log("Used Length: " + used.length)
            // console.log("Repeats: " + repeats);
            // console.log("Count: " + count);
            if(used.includes(x)){
                repeats++;
                count--;
                continue;
            }
            let hold:string = data.results[x].primaryCommonName;
            // This hold.includes("sickleback") is not explicitally nessesary or proper but there are like 30 different sicklybacks which have no images
            // or descriptions i can fetch and clog up any search i do for my local region. So im ommiting them because I hate them.
            if(hold === null || hold === undefined || hold.toLowerCase().includes("stickleback") || hold.toLowerCase().includes("caddisfly") ||
                data.results[x].roundedGRank.toLowerCase().includes("t") || (hold[0] >= 'a' && hold[0] <= 'z')){
                used.push(x);
                count--;
                continue;
            }
            let temp = new Data();
            // console.log(data.results[x].primaryCommonName);
            // console.log(data.results[x].scientificName);
            // console.log(data.results[x].roundedGRank);
            temp.targetName = data.results[x].primaryCommonName;
            temp.id = data.results[x].uniqueId;
            temp.status = data.results[x].roundedGRank;
            temp.scientificName = data.results[x].scientificName;
            targets.push(temp);
            used.push(x);
            repeats = 0;
        }
    console.log(targets.length);
    return targets;
}
export async function getImageEcosystemData(message: string){
    "use server"
    let path = null;
    let key = true;
    // console.log(message);
    message=message.toLowerCase();
    //This switch statement feels wrong to me but i dont know how else i would be able to look look for a specific type of image. 
    // TODO: Figure out a more manageable way to do this
    switch (key) {
        //Case where we have a rainforest
        case ((message.indexOf("rainforest") !== -1)):
            switch(key){
                case ((message.search("north") !== -1) || (message.search("temperate") !== -1) || (message.search("cold") !== -1)):
                    path="/Forests/Temperate-Rainforest.jpg";
                    break;
                default:
                    path="/Forests/Tropical-Rainforest.jpg";
                    break;
            }
            break;

        //Case where we have a non rainforest forest
        case ((message.search("forest") !== -1) || (message.search("woodland") !==-1)):
            switch(key){
                case ((message.search("oak") !== -1)):
                    path="/Forests/Oak-Forest.jpg";
                    break;
                case ((message.search("hemlock") !== -1)):
                    path="/Forests/Hemlock-Forest.jpg";
                    break;
                case ((message.search("hemlock") !== -1)):
                    path="/Forests/Hemlock-Forest.jpg";
                    break;
                case ((message.search("boreal") !== -1)):
                    path="/Forests/Boreal-Forest.jpg";
                    break;
                case ((message.search("montane") !== -1)):
                    path="/Forests/Montane-Forest.jpg";
                    break;
                case ((message.search("mesic") !== -1)):
                    path="/Forests/Mesic-Forest.jpg";
                    // By John Leszczynski from Washington, DC, USA - Cloud Forest, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=104795524
                    break;
                case ((message.search("maple") !== -1)):
                    path="/Forests/Maple-Forest.jpg";
                    // By John Leszczynski from Washington, DC, USA - Cloud Forest, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=104795524
                    break;
                case ((message.search("chaparral") !== -1)):
                    path="/Forests/Chaparral-Forest.jpg";
                    // By Antandrus at English Wikipedia. - Transferred from en.wikipedia to Commons by Zeimusu using CommonsHelper., CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=6506123
                    break;
                case ((message.search("juniper") !== -1)):
                    path="/Forests/Juniper-Forest.jpg";
                    //By Famartin - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=29072733
                    break;
                default:
                    path="/Forests/Forest.jpg";
                    break;
            }
            // type += "forest";
            break;
        
        case ((message.indexOf("river") !== -1)):
        // path = "/Rivers/River.jpg";  
            switch(key){
                    // case ((message.search("river") === -1)):
                //     path="Temp";
                //     break;
                    default:
                        path = "/Rivers/River.jpg";
                        break;
                }
            break;

        case ((message.indexOf("wetland") !== -1) || (message.indexOf("marsh") !== -1)):
            path="/Wetlands/Wetland.jpg";
            // type += "wetland";
            break;
        case ((message.indexOf("glacier") !== -1) || (message.search("snow") !==-1) || (message.search("polar") !==-1)):
            path="/Cold/Polar.jpg";
            // type += "glacier";
            break;
        case ((message.indexOf("desert") !== -1) || (message.search("dune") !==-1)):
            path="/Deserts/Desert.jpg";
            // type += "desert";
            break;
        case ((message.indexOf("tundra") !== -1)):
            path="/Cold/Tundra.jpg";
            // type += "tundra";
            break;
        case ((message.indexOf("rock") !== -1) || (message.indexOf("barren") !== -1) || (message.indexOf("outcrop") !== -1)):
            path="/Rocky/Rocky Barren.jpg";
            // type += "rocky landscape";
            break;
        case ((message.indexOf("grass") !== -1) || (message.search("shrub") !==-1) || (message.search("prarie") !==-1)):
            path="/Grasslands/Grassland.jpg";
            // type += "grassland";
            break;
        case ((message.indexOf("pete") !== -1)):
            path="/Wetlands/Pete-Bog.jpg";
            // type += "pete bog";
            break;    
        case ((message.indexOf("swamp") !== -1) || (message.search("bog") !==-1)):
            path="/Wetlands/Swamp.jpg";
            // type += "swamp";
            break;
        case ((message.indexOf("urban") !== -1) || (message.search("city") !==-1) || (message.search("industr")) !==-1):
            path="/Urban/City.jpg";
            // type += "city";
            break;
        case ((message.indexOf("farm") !== -1) || (message.search("pasture") !==-1) || (message.search("plantation") !==-1) || (message.search("crop") !==-1)|| (message.search("field") !==-1)):
            path="/Urban/Agriculture.jpg";
            // type += "agricultural area";
            break;
        default:
            // type = "ERROR MESSAGE COULD NOT GET A PROPER IMAGE";
            path="/Error.jpg";
            break;
    }
    return path;

}

export async function getImageSpecies(message: string){
    
}
export async function getStatus(status: string){
    //Status codes should all be of the form G# or T#. G# indicates that an entire species of animal is of that risk status while T# indicates
    //that the given animal is a subspecies of another group with a lesser risk factor (Ie a species is G5 but the subspecies is T2)
    switch(status){
        case("TH"):
        case("GH"):
            return"Possibly Extinct";
        case("T1"):
        case("G1"):
            return "Critically Endangered";
        case("T2"):
        case("G2"):
            return "Endangered";
        case("T3"):
        case("G3"):
            return"Vulnerable";
        default:
            // return"Failure";
            return"Low Risk";
            
    }
}