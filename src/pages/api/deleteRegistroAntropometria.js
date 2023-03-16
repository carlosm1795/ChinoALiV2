import { ObjectId } from "mongodb";
import clientPromise from "../../@core/lib/mongodb";
import {MONGODB_DB_NAME,MONGODB_DB_RegistroAntropometria} from "../../@core/lib/settings"

export default async (req, res) => {
  try {
    const client = await clientPromise;    
    const db = client.db(MONGODB_DB_NAME);
    const {
        _id
      } = req.body;          
    const post = await db.collection(MONGODB_DB_RegistroAntropometria).deleteOne({
        _id:new ObjectId(_id)
      });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};