import clientPromise from "../../@core/lib/mongodb";
import {MONGODB_DB_NAME,MONGODB_DB_EvaluacionClinica} from "../../@core/lib/settings"
export default async (req, res) => {
  try {
    const client = await clientPromise;    
    const db = client.db(MONGODB_DB_NAME);
    const {
        FechaMedicion,
        Usuario,        
        APF,
        APP,
        Otros
      } = req.body;
      let newDate = null
    if(FechaMedicion !== ""){
        newDate = new Date(FechaMedicion)
    }
    const post = await db.collection(MONGODB_DB_EvaluacionClinica).insertOne({
        FechaMedicion:newDate,
        Usuario,
        APF,
        APP,
        Otros
      });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};