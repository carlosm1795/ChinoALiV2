import React, { useState, forwardRef } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import CloseIcon from 'mdi-material-ui/Close';
import DatePicker from 'react-datepicker'


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Dialog, Checkbox, TextField, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Card, CardHeader, CardContent } from '@mui/material'

import { PacienteFisioterapia } from 'src/Types/Types';



const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Fecha de Nacimiento' autoComplete='off' />
})

const index = () => {
    const [datosPaciente, setDatosPaciente] = useState<PacienteFisioterapia>({
        _id: "",
        Nombre: "",
        Domicilio: "",
        FechaNacimiento: new Date(),
        Sexo: "",
        Cedula: "",
        ExploracionFisica: {
            Peso: "",
            Estatura: ""
        },
        Consultas: [],
        AntecedentesPatologicos: {
            Diabetes: false,
            Alergias: false,
            Cancer: false,
            Accidentes: false,
            Transfusiones: false,
            Cardiopatias: false,
            Contracturas: false,
            HTA: false,
            Cirugiras: false,
            Fracturas: false,
        },
    })
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const HandleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        let auxData = { ...datosPaciente };
        switch (event.target.id) {
            case "Diabetes":
                auxData.AntecedentesPatologicos.Diabetes = checked;
                break;
            case "Alergias":
                auxData.AntecedentesPatologicos.Alergias = checked;
                break;
            case "Cancer":
                auxData.AntecedentesPatologicos.Cancer = checked;
                break;
            case "Accidentes":
                auxData.AntecedentesPatologicos.Accidentes = checked;
                break;
            case "Transfusiones":
                auxData.AntecedentesPatologicos.Transfusiones = checked;
                break;
            case "Cardiopatias":
                auxData.AntecedentesPatologicos.Cardiopatias = checked;
                break;
            case "Contracturas":
                auxData.AntecedentesPatologicos.Contracturas = checked;
                break;
            case "HTA":
                auxData.AntecedentesPatologicos.HTA = checked;
                break;
            case "Cirugiras":
                auxData.AntecedentesPatologicos.Cirugiras = checked;
                break;
            case "Fracturas":
                auxData.AntecedentesPatologicos.Fracturas = checked;
                break;
        }
        setDatosPaciente(auxData);
    }
    const HandleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let auxData = { ...datosPaciente };

        switch (e.target.id) {
            case "Nombre":
                auxData.Nombre = e.target.value;
                break;
            case "Domicilio":
                auxData.Domicilio = e.target.value;
                break;
            case "Cedula":
                auxData.Cedula = e.target.value;
                break;
            case "Peso":
                auxData.ExploracionFisica.Peso = e.target.value;
                break;
            case "Estatura":
                auxData.ExploracionFisica.Estatura = e.target.value;
                break;
        }

        setDatosPaciente(auxData);
    }
    return (
        <DatePickerWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Button fullWidth sx={{ mr: 2 }} variant='contained' onClick={handleClickOpen}>
                        Registrar Nuevo Paciente
                    </Button>
                </Grid>
            </Grid>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar style={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" style={{
                            flex: 1,
                        }}>
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <TextField
                                id="Nombre"
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                value={datosPaciente.Nombre}
                                onChange={(e) => HandleChangeValue(e)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="Domicilio"
                                label="Domicilio"
                                variant="outlined"
                                fullWidth
                                value={datosPaciente.Domicilio}
                                onChange={(e) => HandleChangeValue(e)}
                            />
                        </Grid>
                        <Grid item xs={6}>

                            <DatePicker
                                selected={datosPaciente.FechaNacimiento}
                                showYearDropdown
                                showMonthDropdown
                                placeholderText='DD-MM-YYYY'
                                dateFormat={'dd-MM-yyyy'}
                                customInput={<CustomInput />}
                                id='form-layouts-separator-date'
                                onChange={(date) => setDatosPaciente((state) => ({
                                    ...state,
                                    FechaNacimiento: date != null ? date : new Date()
                                }))
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id='form-layouts-separator-select-label'>Sexo</InputLabel>
                                <Select
                                    label='Sexo'
                                    defaultValue=''
                                    id='form-layouts-separator-select'
                                    labelId='form-layouts-separator-select-label'
                                    value={datosPaciente.Sexo}
                                    onChange={e => setDatosPaciente((state) => ({
                                        ...state,
                                        Sexo: e.target.value
                                    }))
                                    }
                                >
                                    <MenuItem value='Masculino'>Masculino</MenuItem>
                                    <MenuItem value='Femenino'>Femenino</MenuItem>
                                    <MenuItem value='NA'>NA</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="Cedula"
                                label="Cedula"
                                variant="outlined"
                                fullWidth
                                value={datosPaciente.Cedula}
                                onChange={(e) => HandleChangeValue(e)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="Peso"
                                label="Peso"
                                variant="outlined"
                                fullWidth
                                value={datosPaciente.ExploracionFisica.Peso}
                                onChange={(e) => HandleChangeValue(e)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="Estatura"
                                label="Estatura"
                                variant="outlined"
                                fullWidth
                                value={datosPaciente.ExploracionFisica.Estatura}
                                onChange={(e) => HandleChangeValue(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id='form-layouts-separator-select-label'>Antecedentes Patologicos</InputLabel>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={datosPaciente.AntecedentesPatologicos.Diabetes}
                                            name="Diabetes"
                                            id="Diabetes"
                                            onChange={(e, value) => HandleChangeCheck(e, value)}
                                        />}
                                    label="Diabetes"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={datosPaciente.AntecedentesPatologicos.Cancer}
                                            name="Cancer"
                                            id="Cancer"
                                            onChange={(e, value) => HandleChangeCheck(e, value)}
                                        />}
                                    label="Cancer"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={datosPaciente.AntecedentesPatologicos.Accidentes}
                                            onChange={(e, value) => HandleChangeCheck(e, value)}
                                            name="Accidentes"
                                            id="Accidentes"
                                        />}
                                    label="Accidentes"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={datosPaciente.AntecedentesPatologicos.Transfusiones}
                                            onChange={(e, value) => HandleChangeCheck(e, value)}
                                            name="Transfusiones"
                                            id="Transfusiones"
                                        />}
                                    label="Transfusiones"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={datosPaciente.AntecedentesPatologicos.Cardiopatias}
                                            onChange={(e, value) => HandleChangeCheck(e, value)}
                                            name="Cardiopatias"
                                            id="Cardiopatias"
                                        />}
                                    label="Cardiopatias"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={datosPaciente.AntecedentesPatologicos.Contracturas}
                                            onChange={(e, value) => HandleChangeCheck(e, value)}
                                            name="Contracturas"
                                            id="Contracturas"
                                        />}
                                    label="Contracturas"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={datosPaciente.AntecedentesPatologicos.HTA}
                                            onChange={(e, value) => HandleChangeCheck(e, value)}
                                            name="HTA"
                                            id="HTA"
                                        />}
                                    label="HTA"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={datosPaciente.AntecedentesPatologicos.Cirugiras}
                                            onChange={(e, value) => HandleChangeCheck(e, value)}
                                            name="Cirugiras"
                                            id="Cirugiras"
                                        />}
                                    label="Cirugiras"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={datosPaciente.AntecedentesPatologicos.Fracturas}
                                            onChange={(e, value) => HandleChangeCheck(e, value)}
                                            name="Fracturas"
                                            id="Fracturas"
                                            aria-label='Fracturas'
                                        />}
                                    label="Fracturas"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </List>
            </Dialog>
            <Card>
                <CardHeader title='Registrar datos del paciente' titleTypographyProps={{ variant: 'h6' }} />
                <Divider sx={{ margin: 0 }} />
                <CardContent>
                    <Grid container spacing={5}>
                        <InputLabel sx={{margin:5}} id='form-layouts-separator-select-label'>Histórico de Citas</InputLabel>
                    </Grid>
                </CardContent>
            </Card>
        </DatePickerWrapper>
    )
}

export default index