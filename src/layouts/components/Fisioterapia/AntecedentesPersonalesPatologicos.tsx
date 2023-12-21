import React, { useState, useEffect } from 'react'
import { Card, Collapse, CardHeader, Container, CardContent, IconButton, Divider, FormGroup, FormControlLabel, Checkbox, TextField, Grid } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { AntecedentesPatologicos, PacienteFisioterapia } from 'src/Types/Types';

interface IProps {
    antecedentes: AntecedentesPatologicos,
    updateData: (value: PacienteFisioterapia) => void,
    sourceData: PacienteFisioterapia,
    changeonData: (value: boolean) => void,
}

const AntecedentesPersonalesPatologicos = ({ antecedentes, sourceData, updateData, changeonData }: IProps) => {
    const [open, setOpen] = useState(false);
    const [datos, setDatos] = useState<AntecedentesPatologicos>({
        Alergias: false,
        Asma: false,
        Artrosis: false,
        Artritis: false,
        Accidentes: false,
        AVC: false,
        Cancer: false,
        Cardiopatias: false,
        Contracturas: false,
        Cirugiras: false,
        Diabetes: false,
        Escoliosis: false,
        Encames: false,
        Flebitis: false,
        Fracturas: false,
        Gota: false,
        HTA: false,
        OtrasMusculoEsq: "",
        OtrasVasculares: "",
        Transfusiones: false,
        Trombos: false,
    })

    useEffect(() => {
        setDatos(antecedentes);
    }, [antecedentes])
    const HandleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        let auxData = { ...datos };
        switch (event.target.id) {
            case "Diabetes":
                auxData.Diabetes = checked;
                break;
            case "Alergias":
                auxData.Alergias = checked;
                break;
            case "Artritis":
                auxData.Artritis = checked;
                break;
            case "Artrosis":
                auxData.Artrosis = checked;
                break;
            case "AVC":
                auxData.AVC = checked;
                break;
            case "Asma":
                auxData.Asma = checked;
                break;
            case "Cancer":
                auxData.Cancer = checked;
                break;
            case "Accidentes":
                auxData.Accidentes = checked;
                break;
            case "Transfusiones":
                auxData.Transfusiones = checked;
                break;
            case "Cardiopatias":
                auxData.Cardiopatias = checked;
                break;
            case "Contracturas":
                auxData.Contracturas = checked;
                break;
            case "HTA":
                auxData.HTA = checked;
                break;
            case "Cirugiras":
                auxData.Cirugiras = checked;
                break;
            case "Escoliosis":
                auxData.Escoliosis = checked;
                break;
            case "Encames":
                auxData.Encames = checked;
                break;
            case "Flebitis":
                auxData.Flebitis = checked;
                break;
            case "Fracturas":
                auxData.Fracturas = checked;
                break;
            case "Gota":
                auxData.Gota = checked;
                break;
            case "HTA":
                auxData.HTA = checked;
                break;
            case "Transfusiones":
                auxData.Transfusiones = checked;
                break;
            case "Trombos":
                auxData.Trombos = checked;
                break;
        }

        setDatos(auxData);
        let auxSourceData = sourceData;
        auxSourceData.AntecedentesPatologicos = auxData;
        updateData(auxSourceData);
        changeonData(true);
    }
    return (
        <>
            <Card sx={{
                minWidth: 300,
                border: "1px solid rgba(211,211,211,0.6)"
            }}>
                <CardHeader
                    title="Antecedentes Personales Patologicos"
                    action={
                        <IconButton
                            onClick={() => setOpen(!open)}
                            aria-label="expand"
                            size="small"
                        >
                            {open ? <ArrowUpwardIcon />
                                : <ArrowDownwardIcon />}
                        </IconButton>
                    }
                ></CardHeader>
                <div style={{
                    backgroundColor: "rgba(211,211,211,0.4)"
                }}>
                    <Collapse in={open} timeout="auto"
                        unmountOnExit>
                        <CardContent>
                            <Container sx={{
                                height: 350,
                                lineHeight: 2
                            }}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Alergias}
                                                name="Alergias"
                                                id="Alergias"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Alergias"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Asma}
                                                name="Asma"
                                                id="Asma"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Asma"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Artrosis}
                                                name="Artrosis"
                                                id="Artrosis"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Artrosis"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Artritis}
                                                name="Artritis"
                                                id="Artritis"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Artritis"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Accidentes}
                                                name="Accidentes"
                                                id="Accidentes"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Accidentes"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.AVC}
                                                name="AVC"
                                                id="AVC"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="AVC"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Cancer}
                                                name="Cancer"
                                                id="Cancer"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Cancer"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Cardiopatias}
                                                name="Cardiopatias"
                                                id="Cardiopatias"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Cardiopatias"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Contracturas}
                                                name="Contracturas"
                                                id="Contracturas"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Contracturas"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Cirugiras}
                                                name="Cirugiras"
                                                id="Cirugiras"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Cirugiras"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Diabetes}
                                                name="Diabetes"
                                                id="Diabetes"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Diabetes"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Escoliosis}
                                                name="Escoliosis"
                                                id="Escoliosis"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Escoliosis"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Encames}
                                                name="Encames"
                                                id="Encames"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Encames"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Flebitis}
                                                name="Flebitis"
                                                id="Flebitis"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Flebitis"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Fracturas}
                                                name="Fracturas"
                                                id="Fracturas"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Fracturas"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Gota}
                                                name="Gota"
                                                id="Gota"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Gota"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.HTA}
                                                name="HTA"
                                                id="HTA"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="HTA"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Transfusiones}
                                                name="Transfusiones"
                                                id="Transfusiones"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Transfusiones"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={datos.Trombos}
                                                name="Trombos"
                                                id="Trombos"
                                                onChange={(e, value) => HandleChangeCheck(e, value)}
                                            />}
                                        label="Trombos"
                                    />
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>

                                            <TextField
                                                id="OtrasMusculoEsq"
                                                label="Otras Enf Musculo esq"
                                                variant="outlined"
                                                fullWidth
                                                value={datos.OtrasMusculoEsq}
                                                onChange={(e) => {
                                                    setDatos((state) => ({
                                                        ...state,
                                                        OtrasMusculoEsq: e.target.value
                                                    }))
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>

                                            <TextField
                                                id="OtrasVasculares"
                                                label="Otras Enf Vasculares"
                                                variant="outlined"
                                                fullWidth
                                                value={datos.OtrasVasculares}
                                                onChange={(e) => {
                                                    setDatos((state) => ({
                                                        ...state,
                                                        OtrasVasculares: e.target.value
                                                    }))
                                                }}
                                            />
                                        </Grid>
                                    </Grid>



                                </FormGroup>
                            </Container>
                        </CardContent>
                    </Collapse>
                </div>
            </Card>
            <Divider />
        </>
    )
}

export default AntecedentesPersonalesPatologicos