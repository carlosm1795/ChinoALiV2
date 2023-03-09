import clientPromise from "../../../lib/mongodb";
import {MONGODB_DB_NAME,MONGODB_DB_USUARIOSCOLLECTION} from "../../../lib/settings"
export default async (req, res) => {
  try {
    const client = await clientPromise;    
    const db = client.db(MONGODB_DB_NAME);
    const {
        Nombre,
        Apellido,
        Sexo,
        FechaNacimiento,
        Ocupacion,
        Email,
        Telefono,
      } = req.body;
      let newDate = null
    if(FechaNacimiento !== ""){
        newDate = new Date(FechaNacimiento)
    }
    const post = await db.collection(MONGODB_DB_USUARIOSCOLLECTION).insertOne({
        Nombre,
        Apellido,
        Sexo,
        FechaNacimiento:newDate,
        Ocupacion,
        Email,
        Telefono,
      });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};