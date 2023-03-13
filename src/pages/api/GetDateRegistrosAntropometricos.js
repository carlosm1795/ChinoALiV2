import clientPromise from '../../@core/lib/mongodb'
import { MONGODB_DB_NAME, MONGODB_DB_RegistroAntropometria } from '../../@core/lib/settings'
export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db(MONGODB_DB_NAME)
    const { Usuario } = req.body
    const post = await db
      .collection(MONGODB_DB_RegistroAntropometria)
      .find({ Usuario: Usuario }, { _id: 0, FechaMedicion: 1 })
      .sort({ FechaMedicion: -1 })
      .toArray()

    res.json(post)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
