"use server";
export async function getAddressInfo(address:string): Promise<string>{
    // `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}
    let jsonArr: Array<any>;
    // let returnArr: Array<string>; 
    let returnVal = "";   
    try{
        console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`);
        const response = await(fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`));
        let json= await response.json();

        
        // returnArr = new Array();

        jsonArr = json.results[0].address_componenets;
    } catch(err){
        console.log("An error occured while fetching google geocoding data.");
        return "Bad Input";
    }
    if(jsonArr === undefined || jsonArr === null){
        console.log("An error occured while fetching google geocoding data.");
        return "Bad Input";
    }
    for(let x = 0; x < jsonArr.length; x++){
        if(jsonArr[x].types[0] === "administrative_area_level_1"){
            // jsonArr.unshift(jsonArr[x].short_name);
            jsonArr[x].short_name += returnVal;
        }
        else if(jsonArr[x].types[0] === "country"){
            // jsonArr.push(jsonArr[x].short_name);
            returnVal += jsonArr[x].short_name;
        }
    }



    return (returnVal);


}

// function identifyRegion(){

// }