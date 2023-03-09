export interface Usuario {
    _id:string,
    Nombre:string,
    Apellido:string,
    Sexo:string,
    FechaNacimiento:Date|null,
    Ocupacion?:string,
    Email?:string,
    Telefono?:string
}
export interface ConfigAxios {
    config:{
        url?:string,
        method?:string,
        headers?:object,
        data?:object,
        params?:object
    }
    shouldFire:boolean
}

export interface SelectOptions {
    label:string,
    value:string,
}

export interface RegistroAntropometriaValues {
    dato:string,
    value:string|number,
    unidades:string
}
export interface RegistroAntropometria {
    _id:string,
    FechaMedicion:Date,
    Usuario:string,
    Values:Array<RegistroAntropometriaValues>
}