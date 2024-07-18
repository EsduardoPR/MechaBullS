export class Location {
    readonly id:string;
    private idBovino:string;
    private location:string;
    private createAt:string;

    constructor(id: string, idBovino:string, location:string, createAt:string){
        this.id = id;
        this.idBovino = idBovino;
        this.location = location;
        this.createAt = createAt;
    }
}