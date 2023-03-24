import clientPromise from '../../@core/lib/mongodb'
import { MONGODB_DB_NAME, MONGODB_DB_Consumo } from '../../@core/lib/settings'

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db(MONGODB_DB_NAME)
    const {
      Usuario,
      Fecha,
      Frutas,
      Vegetales,
      Lacteos,
      Descremada,
      Semidescremada,
      Entera,
      Chos,
      Harinas,
      MuyMagra,
      Magra,
      SemiMagra,
      AltaEnGrasa,
      Grasas
    } = req.body
    let newDate = null
    if (Fecha !== '') {
      newDate = new Date(Fecha)
    }
    const post = await db.collection(MONGODB_DB_Consumo).insertOne({
      Fecha: newDate,
      Usuario,
      Frutas,
      Vegetales,
      Lacteos,
      Descremada,
      Semidescremada,
      Entera,
      Chos,
      Harinas,
      MuyMagra,
      Magra,
      SemiMagra,
      AltaEnGrasa,
      Grasas
    })

    res.json(post)
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
