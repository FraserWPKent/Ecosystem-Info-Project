"use server";

import { ImageData } from "./types";
import { getWikipediaSummary } from "./wikipedia";
export async function getSpeciesPhotoData(scientificName: string){
    //Maybe switch this over to taxa search so i can get wikiepedia summaries. Though those arent always avalable. Maybe I could also just use 
    // the wikipedia api to grab info directly from wikipedia. (This second one may be better because it would let me get descriptions of 
    // ecosystems too if those are on wikiepedia)
    // An example of a taxa search
    // https://api.inaturalist.org/v1/taxa?q=Short-billed%20Dowitcher&order=desc&order_by=observations_count
    let fetchUrl="https://api.inaturalist.org/v1/taxa?q=";
    // let fetchUrl = "https://api.inaturalist.org/v1/observations?verifiable=true&taxon_name=";
    const words = scientificName.split(" ");
    for(let x = 0; x < words.length; x++){
        fetchUrl+=words[x];
        if(x+1 !== words.length){
            fetchUrl+="%20";
        }
    }
    // fetchUrl+="&order=desc&order_by=created_at";
    fetchUrl += "&order=desc&order_by=observations_count";
//https://api.inaturalist.org/v1/observations?verifiable=true&taxon_name=Ambystoma%20barbouri&order=desc&order_by=created_at
    // console.log(fetchUrl);

    const response = await ((await fetch(fetchUrl)).json());
    // console.log(fetchUrl);
    let data:ImageData = new ImageData();
    if(response.length === 0){
        data.url = "/Error.jpg";
        data.attribution = "Filler Untill I get the attribution";
        data.summary = getLorem();
        return data;
    }
    try{
        // data.url = response.results[0].observation_photos[0].photo.url;
        if((response.results[0] !== undefined && response.results[0] !== null)){
            data.url = response.results[0].default_photo.url;
            data.url = data.url.replace("square", "large");
            data.attribution = response.results[0].default_photo.attribution;
        }
        // data.attribution = response.results[0].observation_photos[0].photo.attribution;
       
        // let wikiSummary = response.results[0].wikipedia_

        let wikiURL = response.results[0].wikipedia_url;
        if(wikiURL === undefined || wikiURL === null){
            // console.log(wikiURL);
            // data.summary=getLorem();
            data.summary = "";
        }
        else{
            data.summary = await getWikipediaSummary(wikiURL);
        }
    //     }
        // if(response.results[0].wikipedia_summary !== undefined || response.results[0].wikipedia_summary !== null){
        //     data.summary = response.results[0].wikipedia_summary;
        // }
    } catch(err){
        // console.log(err);
        data.url = "/Error.jpg";
        data.attribution = "Filler Untill I get the attribution";
        // data.summary= getLorem();
        data.summary = "";
    }
    // let str: string;
    // str = data.summary;
    // // // if(str == ""){
    // //     data.summary = "
    return data;


    // https://api.inaturalist.org/v1/observations?taxon_name=Ambystoma%20barbouri&order=desc&order_by=created_at
}

function getLorem(){
    return "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio optio repellat pariatur, iste veritatis nulla ipsa quas eos aperiam expedita, sequi quidem? Quod voluptatem quisquam mollitia maiores magnam illum facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ut a repudiandae nemo quasi, doloribus dolores recusandae sint quia dolorum cumque deserunt nobis accusamus fugit quam ipsum inventore cupiditate doloremque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum qui nesciunt laudantium, voluptatum consequatur maiores quaerat ad nisi nobis libero impedit deserunt? Dolorem amet, odio optio expedita voluptates sint voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque recusandae repellendus culpa similique earum fugiat expedita atque facilis officia placeat. Accusamus iure suscipit reprehenderit nihil quos sequi inventore repellat nemo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi incidunt blanditiis eligendi soluta, recusandae atque ducimus dolorem nulla suscipit perferendis saepe modi molestias omnis aperiam provident eum fugit similique eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus nisi repellendus eveniet, odio ratione mollitia facere veniam libero cupiditate quaerat deserunt placeat. Itaque possimus animi officia, excepturi non aliquid ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio optio repellat pariatur, iste veritatis nulla ipsa quas eos aperiam expedita, sequi quidem? Quod voluptatem quisquam mollitia maiores magnam illum facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ut a repudiandae nemo quasi, doloribus dolores recusandae sint quia dolorum cumque deserunt nobis accusamus fugit quam ipsum inventore cupiditate doloremque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum qui nesciunt laudantium, voluptatum consequatur maiores quaerat ad nisi nobis libero impedit deserunt? Dolorem amet, odio optio expedita voluptates sint voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque recusandae repellendus culpa similique earum fugiat expedita atque facilis officia placeat. Accusamus iure suscipit reprehenderit nihil quos sequi inventore repellat nemo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi incidunt blanditiis eligendi soluta, recusandae atque ducimus dolorem nulla suscipit perferendis saepe modi molestias omnis aperiam provident eum fugit similique eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus nisi repellendus eveniet, odio ratione mollitia facere veniam libero cupiditate quaerat deserunt placeat. Itaque possimus animi officia, excepturi non aliquid ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio optio repellat pariatur, iste veritatis nulla ipsa quas eos aperiam expedita, sequi quidem? Quod voluptatem quisquam mollitia maiores magnam illum facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ut a repudiandae nemo quasi, doloribus dolores recusandae sint quia dolorum cumque deserunt nobis accusamus fugit quam ipsum inventore cupiditate doloremque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum qui nesciunt laudantium, voluptatum consequatur maiores quaerat ad nisi nobis libero impedit deserunt? Dolorem amet, odio optio expedita voluptates sint voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque recusandae repellendus culpa similique earum fugiat expedita atque facilis officia placeat. Accusamus iure suscipit reprehenderit nihil quos sequi inventore repellat nemo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi incidunt blanditiis eligendi soluta, recusandae atque ducimus dolorem nulla suscipit perferendis saepe modi molestias omnis aperiam provident eum fugit similique eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus nisi repellendus eveniet, odio ratione mollitia facere veniam libero cupiditate quaerat deserunt placeat. Itaque possimus animi officia, excepturi non aliquid ut.";
}