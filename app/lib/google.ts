"use server";
// It would probably be alot easier to just parse the input myself to get this data but i want more experience using api's so i'll get this working
// with google geocaching then maybe rewrite it with my own parsing.
import { googleRateLimit} from "./ratelimiter";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";


export async function getAddressInfo(address:string): Promise<string>{
    
    // Checking my rate limiter to verify we havent used too many google api tokens. This alongside checks set in the google api backend should
    // prevent api overuse.
    // const { success, pending, limit, reset, remaining } = await googleRateLimit.limit("global_api_id");
    const {success} = await googleRateLimit.limit("global_api_id");

    // console.log(limit);
    // console.log(reset);
    // console.log(remaining);

    if(!success){
        console.log("Rate Limit Hit");
        return "RateLim";
    }
    
    // Formating the given address into a more convenient format for google maps geocoding api to parse. This involces replacing every instance
    // of a directional with its corresponding abbreviation (Eg. East-> E). and replacing all spaces with + symbols.
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

        // console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}`);
        // return("CA US");
        
        // Fetching the general geographic infromation about the address given by the user and then storing the important section address_components
        // into a array.
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
    // console.log(jsonArr.length);
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