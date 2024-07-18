export class Lpm {
    readonly id:string;
    private idBovino:string;
    private lpm:number;
    private createAt:string;

    constructor(id: string, idBovino:string, lpm:number, createAt:string){
        this.id = id;
        this.idBovino = idBovino;
        this.lpm = lpm;
        this.createAt = createAt;
    }
}