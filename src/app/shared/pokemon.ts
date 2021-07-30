export class Pokemon {

    id : string;
    name: string;
    height: string;
    weight: string;
    type: string;
    front_default: string;
    learned_movements: string;

    constructor(
        id ='',
        name= '',
        height= '',
        weight= '',
        type= '',
        front_default= '',
        learned_movements= '',
    ){
        this.id = id,
        this.name= name,
        this.height= height,
        this.weight= weight,
        this.type= type,
        this.front_default= front_default,
        this.learned_movements= learned_movements
    }  
}
