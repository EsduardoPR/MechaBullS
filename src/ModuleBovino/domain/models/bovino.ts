export class Bovino {
    readonly id:string;
    private name:string;
    private siniga:string;
    private age:number;
    private lpm:number;
    private averageSteps:number;
    private location:number;

    constructor(id: string, name:string, siniga:string, age:number, lpm:number, averageSteps:number, location:number){
        this.id = id;
        this.name = name;
        this.siniga = siniga;
        this.age = age;
        this.lpm = lpm;
        this.averageSteps = averageSteps;
        this.location = location;
    }
}