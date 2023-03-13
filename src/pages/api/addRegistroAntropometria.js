import clientPromise from "../../@core/lib/mongodb";
import {MONGODB_DB_NAME,MONGODB_DB_RegistroAntropometria} from "../../@core/lib/settings"
export default async (req, res) => {
  try {
    const client = await clientPromise;    
    const db = client.db(MONGODB_DB_NAME);
    const {
        FechaMedicion,
        Usuario,
        Values
      } = req.body;
      let newDate = null
    if(FechaMedicion !== ""){
        newDate = new Date(FechaMedicion)
    }
    const post = await db.collection(MONGODB_DB_RegistroAntropometria).insertOne({
        FechaMedicion:newDate,
        Usuario,
        Values
      });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};