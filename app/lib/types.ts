export class Data{
    public targetName: string;
    public scientificName: string;
    public id: string;
    public status: string;

    constructor(){
        this.targetName="";
        this.scientificName = "";
        this.id = "";
        this.status = "";
    }
};

export class ImageData{
    public url: string;
    public attribution: string;
    public summary: string;

    constructor(){
        this.url="";
        this.attribution="";
        this.summary="";
    }
}