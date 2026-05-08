// It would probably be alot easier to just parse the input myself to get this data but i want more experience using api's so i'll get this working
// with google geocaching then maybe rewrite it with my own parsing.

"use server";
export async function getAddressInfo(address:string): Promise<string>{
    let elements = address.split(" ");
    // `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}

    for(let x:number = 0; x < elements.length; x++){
        let hold:string = elements[x].toLowerCase();
        if(hold==="north" || hold === "south" || hold === "east" || hold === "west"){
            elements[x] = elements[x][0].toUpperCase();
            break;
        }
    }

    let formattedAddress:string = "";
    for(let x: number = 0; x < elements.length; x++){
        formattedAddress += elements[x];
        if(x !== elements.length-1){
            formattedAddress+="+";
        }
    }

    let jsonArr: Array<any>;
    // let returnArr: Array<string>; 
    let returnVal = "";   
    try{
        console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}`);
        // return("CA US");
        const response = await(fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`));
        // encodeURIComponent(address)
        let json= await response.json();
        // console.log(await response.text());
        // return("BAD INPUT");

        
        // returnArr = new Array();

        jsonArr = json.results[0].address_components;
    } catch(err){
        console.log("An error occured while fetching google geocoding data.");
        console.log(err);
        return "Bad Input";
    }
    if(jsonArr === undefined || jsonArr === null){
        console.log("The jsonArr is undefined.");
        return "Bad Input";
    }
    console.log(jsonArr.length);
    for(let x = 0; x < jsonArr.length; x++){
        if(jsonArr[x].types[0] === "administrative_area_level_1"){
            // jsonArr.unshift(jsonArr[x].short_name);
            console.log("Subnation: " + jsonArr[x].short_name);
            returnVal += jsonArr[x].short_name + " ";
        }
        else if(jsonArr[x].types[0] === "country"){
            // jsonArr.push(jsonArr[x].short_name);
            console.log("Nation: " + jsonArr[x].short_name)
            returnVal += jsonArr[x].short_name;
        }
    }


    console.log(returnVal);
    return (returnVal);


}

// function identifyRegion(){

// }