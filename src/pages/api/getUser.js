import clientPromise from "../../@core/lib/mongodb";
import {MONGODB_DB_NAME,MONGODB_DB_USUARIOSCOLLECTION} from "../../@core/lib/settings"

export default async (req, res) => {
  try {
    const client = await clientPromise;    
    const db = client.db(MONGODB_DB_NAME);
    
    const posts = await db.collection(MONGODB_DB_USUARIOSCOLLECTION).find({}).toArray();

    res.json(posts);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};