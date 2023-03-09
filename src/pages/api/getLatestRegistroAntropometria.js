import { ObjectId } from "mongodb";
import clientPromise from "../../@core/lib/mongodb";
import {MONGODB_DB_NAME,MONGODB_DB_RegistroAntropometria} from "../../@core/lib/settings"
export default async (req, res) => {
  try {
    const client = await clientPromise;    
    const db = client.db(MONGODB_DB_NAME);
    const {idUser} = req.body;
    console.log(idUser)
    const posts = await db.collection(MONGODB_DB_RegistroAntropometria).find({Usuario:idUser}).sort({FechaMedicion:-1}).limit(1).toArray();
    res.json(posts);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};