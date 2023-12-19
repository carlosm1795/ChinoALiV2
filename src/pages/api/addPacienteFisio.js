import clientPromise from "../../@core/lib/mongodb";
import {MONGODB_DB_NAME,MONGODB_DB_PacientesFisioTerapia} from "../../@core/lib/settings"

export default async (req, res) => {
  try {
    const client = await clientPromise;    
    const db = client.db(MONGODB_DB_NAME);
    const {
        Nombre,
        Domicilio,
        Sexo,
        FechaNacimiento,
        Cedula,
        ExploracionFisica,
        AntecedentesPatologicos        
      } = req.body;
      let newDate = null
    if(FechaNacimiento !== ""){
        newDate = new Date(FechaNacimiento)
    }
    const post = await db.collection(MONGODB_DB_PacientesFisioTerapia).insertOne({
        Nombre,
        Domicilio,
        FechaNacimiento:newDate,
        Sexo,
        Cedula,        
        ExploracionFisica,
        "Consultas":[],
        AntecedentesPatologicos,
      });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};