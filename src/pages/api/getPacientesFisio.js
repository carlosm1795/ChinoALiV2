import clientPromise from '../../@core/lib/mongodb'
import { MONGODB_DB_NAME, MONGODB_DB_PacientesFisioTerapia } from '../../@core/lib/settings'

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db(MONGODB_DB_NAME)    
    const post = await db
      .collection(MONGODB_DB_PacientesFisioTerapia)
      .find({})
      .sort({ Nombre: 1 })
      .toArray()

    res.json(post)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
