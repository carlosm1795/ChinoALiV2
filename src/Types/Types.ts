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

export interface FactsClinicos {
    dato:string,
    value:string|boolean,
    comments?:string
}

export interface EvaluacionClinica {
    _id:string,
    FechaMedicion:Date,
    Usuario:string,
    APF:Array<FactsClinicos>,
    APP:Array<FactsClinicos>,
    Otros:Array<FactsClinicos>,
}

export interface Comidas {
    Alimento:string,
    Intercambio:number,
    Grupoalimenticio:string,
    TiempoDeComida:string,
}
export interface RegistroDeComidas {
    _id:string,
    Fecha:Date,
    Usuario:string,
    Comidas:Array<Comidas>,
    AlimentosFavoritos:string,
    AversionAlimentos:string,
}

export interface Comidas2 {
    Alimento:string,
    Intercambio:number,
    Grupoalimenticio:string, 
}

export interface RegistroDeComidas2 {
    _id:string,
    Fecha:Date,
    Usuario:string,
    Comidas:{
        Desayuno:Array<Comidas2>,
        "Merienda Mañana":Array<Comidas2>,
        Almuerzo:Array<Comidas2>,
        "Merienda Tarde":Array<Comidas2>,
        Cena:Array<Comidas2>,
        "Colación Nocturna":Array<Comidas2>,
    },
    AlimentosFavoritos:string,
    AversionAlimentos:string,
}

export interface ConsumoUsualType {
    Q:number,
    CHO:number,
    CHON:number,
    GRASA:number,
    KCAL:number,
    LABEL:string,
    ID:string,
}
export interface ConsumoUsual {
    _id:string,
    Fecha:Date,
    Usuario:string,
    Frutas:ConsumoUsualType,
    Vegetales:ConsumoUsualType,
    Lacteos0:ConsumoUsualType,
    Lacteos2:ConsumoUsualType,
    Azucares:ConsumoUsualType,
    Cereales:ConsumoUsualType,
    CarneMagra:ConsumoUsualType,
    CarneSemi:ConsumoUsualType,
    Grasas:ConsumoUsualType,

}

export interface CalculoDietaType {
    Q:number,    
    KCAL:number,
    LABEL:string,
    ID:string,
}
export interface CalculoDeDieta{
    _id:string,
    Fecha:Date,
    Usuario:string,
    Frutas:CalculoDietaType,
    Vegetales:CalculoDietaType,
    Lacteos:CalculoDietaType,
    Descremada:CalculoDietaType,
    Semidescremada:CalculoDietaType,
    Entera:CalculoDietaType,
    Chos:CalculoDietaType,
    Harinas:CalculoDietaType,
    MuyMagra:CalculoDietaType,
    Magra:CalculoDietaType,
    SemiMagra:CalculoDietaType,
    AltaEnGrasa:CalculoDietaType,
    Grasas:CalculoDietaType,
}
export interface Consulta {
    MotivoConsulta:string,
    FechaDeConsulta:Date,
}

export interface AntecedentesPatologicos {
    Diabetes:boolean,
		Alergias:boolean,
		Cancer:boolean,
		Accidentes:boolean,
		Transfusiones:boolean,
		Cardiopatias:boolean,	
		Contracturas:boolean,	
		HTA:boolean,
		Cirugiras:boolean,
		Fracturas:boolean,
}
export interface PacienteFisioterapia {
    _id:string,
    Nombre:string,
	Domicilio:string,
	FechaNacimiento:Date,
	Sexo:string,
	Cedula:string,
	ExploracionFisica:{
		Peso:string
		Estatura:string
    },
    Consultas:Array<Consulta>,
    AntecedentesPatologicos:AntecedentesPatologicos,

	
}