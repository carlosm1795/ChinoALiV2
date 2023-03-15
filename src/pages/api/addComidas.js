import clientPromise from '../../@core/lib/mongodb'
import { MONGODB_DB_NAME, MONGODB_DB_Comidas } from '../../@core/lib/settings'
export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db(MONGODB_DB_NAME)
    const { Usuario, Fecha, Comidas, AlimentosFavoritos, AversionAlimentos } = req.body
    let newDate = null
    if (Fecha !== '') {
      newDate = new Date(Fecha)
    }
    const post = await db.collection(MONGODB_DB_Comidas).insertOne({
      Fecha: newDate,
      Usuario,
      Comidas,
      AlimentosFavoritos,
      AversionAlimentos
    })

    res.json(post)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
