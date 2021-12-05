export class Note{
    constructor(
        public id?:number,
        public title?:string,
        public description?:string,
        public categoryId?:number,
        public userId?: number
    ){
    }
}