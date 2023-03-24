export const MONGODB_URI="mongodb+srv://kusad:CsBy1mO9f70cc1Yc@cluster0.spbvxeh.mongodb.net/?retryWrites=true&w=majority"
export const MONGODB_DB_NAME="Nutricion"
export const MONGODB_DB_USUARIOSCOLLECTION="Usuarios"
export const MONGODB_DB_RegistroAntropometria="RegistroAntropometria"
export const MONGODB_DB_EvaluacionClinica="EvaluacionClinica"
export const MONGODB_DB_Comidas="Comidas"
export const MONGODB_DB_Dieta="Dieta"

let MAINURL:string = ""

if(process.env.NODE_ENV === "development"){
    MAINURL = "http://localhost:3000/"
}else{
    MAINURL = "https://testing.samus.website/"
}

export  default MAINURL