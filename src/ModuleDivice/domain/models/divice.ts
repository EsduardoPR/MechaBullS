export class Divice {
    readonly id:string;
    private nametag:string;
    private idUser:string;
    private idBovino:string;

    constructor(id: string, nametag:string, idUser:string, idBovino:string){
        this.id = id;
        this.nametag = nametag;
        this.idUser = idUser;
        this.idBovino = idBovino;
    }
}