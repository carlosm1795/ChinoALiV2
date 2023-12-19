import clientPromise from "../../@core/lib/mongodb";
import { ObjectId } from "mongodb";
import { MONGODB_DB_NAME, MONGODB_DB_PacientesFisioTerapia } from "../../@core/lib/settings"

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db(MONGODB_DB_NAME);
        const {
            _id,
            Nombre,
            Domicilio,
            FechaNacimiento,
            Sexo,
            Cedula,
            ExploracionFisica,
            Consultas,
            AntecedentesPatologicos,
            AntecedentesNoPatolicos,
            TratamientoFarmacologico
        } = req.body;
        let newDate = null
        if (FechaNacimiento !== "") {
            newDate = new Date(FechaNacimiento)
        }
        const post = await db.collection(MONGODB_DB_PacientesFisioTerapia).updateOne(
            {
                _id: new ObjectId(_id)
            },
            {
                $set: {
                    Nombre,
                    Domicilio,
                    FechaNacimiento,
                    Sexo,
                    Cedula,
                    ExploracionFisica,
                    Consultas,
                    AntecedentesPatologicos,
                    AntecedentesNoPatolicos,
                    TratamientoFarmacologico
                }
            }
        )        
        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};