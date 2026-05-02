import { Data } from "./types";
export async function queryNatureServeEcosystem(message: string){
    "use server";
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
                        page : null,
                        recordsPerPage : null
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
    return response;
}
export async function queryNatureServeSpecies(message: string){
    "use server";
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
                        subnation: message.substring(0,2), 
                        nation: message.substring(3,5),
                    }],
                    pagingOptions : {
                        page : null,
                        recordsPerPage : null
                    },
                    recordSubtypeCriteria : [ ],
                    modifiedSince : null,
                    locationOptions : null,
                    classificationOptions : null,
                    speciesTaxonomyCriteria : [ ]
                }
            )
        }
        );
    return response;
}
export function parseData(data: any){
    const targets: Data[] = [];
        for(let x = 0; x < data.results.length; x++){
            if(data.results[x].primaryCommonName === null){
                continue;
            }
            let temp = new Data();
            temp.targetName = data.results[x].primaryCommonName;
            temp.id = data.results[x].uniqueId;
            temp.status = data.results[x].roundedGRank;
            temp.scientificName = data.results[x].scientificName;
            targets.push(temp);
        }
    return targets;
}
export function getImageEcosystem(message: string){
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
export function getImageSpecies(message: string){
    
}
export function getStatus(status: string){
    switch(status){
        case("GH"):
            return"Possibly Extinct";
           
        case("G1"):
            return "Critically Endangered";
           
        case("G2"):
            return "Endangered";
           
        case("G3"):
            return"Vulnerable";
           
        default:
            return"Failure";
            
    }
}