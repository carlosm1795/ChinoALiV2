export const ConvertUSTOCRTime = (fecha:string) => {
    let result = ""
    try {
        let date = new Date(fecha)
        result = `Datos tomados el:${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    } catch (error) {
        
    }
    return result
}