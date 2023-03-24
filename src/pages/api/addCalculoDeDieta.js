import clientPromise from '../../@core/lib/mongodb'
import { MONGODB_DB_NAME, MONGODB_DB_Dieta } from '../../@core/lib/settings'

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db(MONGODB_DB_NAME)
    const { Usuario, Fecha, Frutas, Vegetales, Lacteos0, Lacteos2, Azucares, Cereales, CarneMagra, CarneSemi, Grasas } =
      req.body
    let newDate = null
    if (Fecha !== '') {
      newDate = new Date(Fecha)
    }
    const post = await db.collection(MONGODB_DB_Dieta).insertOne({
      Fecha: newDate,
      Usuario,
      Frutas,
      Vegetales,
      Lacteos0,
      Lacteos2,
      Azucares,
      Cereales,
      CarneMagra,
      CarneSemi,
      Grasas
    })

    res.json(post)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
