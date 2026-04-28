import Image from "next/image";
interface Props{
    message:string;
};
export default function OutputImage({message}: Props){
    if(message === null){return null};
    console.log(message);
    message=message.toLowerCase();
    let path = "Error.jpg";
    let type ="A landscape photograph of a ";
    let key = true;
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
            type += "forest";
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
            type += "wetland";
            break;
        case ((message.indexOf("glacier") !== -1) || (message.search("snow") !==-1) || (message.search("polar") !==-1)):
            path="/Cold/Polar.jpg";
            type += "glacier";
            break;
        case ((message.indexOf("desert") !== -1) || (message.search("dune") !==-1)):
            path="/Deserts/Desert.jpg";
            type += "desert";
            break;
        case ((message.indexOf("tundra") !== -1)):
            path="/Cold/Tundra.jpg";
            type += "tundra";
            break;
        case ((message.indexOf("rock") !== -1)):
            path="/Rocky/Rocky Barren.jpg";
            type += "rocky landscape";
            break;
        case ((message.indexOf("grass") !== -1) || (message.search("shrub") !==-1) || (message.search("prarie") !==-1)):
            path="/Grasslands/Grassland.jpg";
            type += "grassland";
            break;
        case ((message.indexOf("pete") !== -1)):
            path="/Wetlands/Pete-Bog.jpg";
            type += "pete bog";
            break;    
        case ((message.indexOf("swamp") !== -1) || (message.search("bog") !==-1)):
            path="/Wetlands/Swamp.jpg";
            type += "swamp";
            break;
        case ((message.indexOf("urban") !== -1) || (message.search("city") !==-1) || (message.search("industr")) !==-1):
            path="/Urban/City.jpg";
            type += "city";
            break;
        case ((message.indexOf("farm") !== -1) || (message.search("pasture") !==-1) || (message.search("plantation") !==-1) || (message.search("crop") !==-1)|| (message.search("field") !==-1)):
            path="/Urban/Agriculture.jpg";
            type += "agricultural area";
            break;
        default:
            type = "ERROR MESSAGE COULD NOT GET A PROPER IMAGE";
            path="/Error.jpg";
            break;
    }
    return(
        <>
            <Image
                className="rounded-md w-full md:w-full lg:w-[50%] float-left mr-4 mb-4 h-auto"
                src={path}
                alt={type}
                width={10000}
                height={150}
                priority
                />
        </>
    );
}