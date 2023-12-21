import React, { useState, forwardRef, useEffect, useMemo } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Loader Import
import NProgress from 'nprogress'
import { Store } from 'react-notifications-component';
import {ClipLoader,FadeLoader} from "react-spinners";
// ** Demo Components Imports
import CloseIcon from 'mdi-material-ui/Close';
import DatePicker from 'react-datepicker'


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Stack, Autocomplete, Button, Dialog, Checkbox, TextField, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Card, CardHeader, CardContent, ButtonGroup } from '@mui/material'

import { Consulta, PacienteFisioterapia } from 'src/Types/Types';
import FIsioTable from 'src/layouts/components/CustomTable/FIsioTable';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';

import useApi from 'src/@core/hooks/useApi';
import MAINURL from 'src/@core/lib/settings';
import Demo from 'src/layouts/components/CustomTable/Demo';
import HistoricoTerapias from 'src/layouts/components/CustomTable/HistoricoTerapias';
import DatosPersonales from 'src/layouts/components/Fisioterapia/DatosPersonales';
import AntecedentesPersonalesPatologicos from 'src/layouts/components/Fisioterapia/AntecedentesPersonalesPatologicos';
import AntecedentesPersonalesNoPatologicos from 'src/layouts/components/Fisioterapia/AntecedentesPersonalesNoPatologicos';
import TratamientoFarmacologico from 'src/layouts/components/Fisioterapia/TratamientoFarmacologico';



const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Fecha de Nacimiento' autoComplete='off' />
})

const index = () => {
    const [loading,setloading] = useState(false);
    const [pendingChanges, setPendingChanges] = useState(false);
    const columns = useMemo<MRT_ColumnDef<Consulta>[]>(
        //column definitions...
        () => [
            {
                accessorKey: 'FechaDeConsulta',
                header: 'Fecha',
            },
            {
                accessorKey: 'MotivoConsulta',
                header: 'Consulta',
            },
            {
                accessorKey: 'subRows',
                header: 'Notas',
            },
        ],
        [],
        //end
    );
    const [dataTable, setDataTable] = useState<Array<Consulta>>([]);
    const [pacienteToEdit, setPacienteToEdit] = useState<PacienteFisioterapia>({
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
        },
        AntecedentesNoPatolicos: {
            Alcohol: "",
            Drogas: "",
            Tabaquismo: "",
            Otros: ""
        },
        TratamientoFarmacologico: ""
    })
    const [pacientes, setPacientes] = useState<Array<PacienteFisioterapia>>([])
    //Axios Call
    const GetPacientes = useApi({
        config: {
            url: `${MAINURL}api/getPacientesFisio`,
            method: 'POST'
        },
        shouldFire: true
    })
    const CreateNewUserCall = useApi({
        config: {
            url: `${MAINURL}/api/addPacienteFisio`,
            method: "POST",
        },
        shouldFire: false,
    });
    //Axios Call
    const UpdatePaciente = useApi({
        config: {
            url: `${MAINURL}api/updatePacienteFisio`,
            method: 'POST'
        },
        shouldFire: false
    })
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
        },
        AntecedentesNoPatolicos: {
            Alcohol: "",
            Drogas: "",
            Tabaquismo: "",
            Otros: ""
        },
        TratamientoFarmacologico: ""
    })

    const InsertNewUser = () => {
        CreateNewUserCall.setParameters((state) => ({
            ...state,
            data: { ...datosPaciente },
        }));        
        CreateNewUserCall.setFire(true);
        handleClose();

        
    }

    useEffect(() => {
        if(CreateNewUserCall.dataReady){
            setloading(true);
            GetPacientes.setFire(true);
        }
    },[CreateNewUserCall.isLoading])
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
    const handleChangeUser = () => {
        Store.addNotification({
            title: "Datos de usuario cargados",
            message: "",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
    }
    useEffect(() => {
        if (GetPacientes.dataReady) {
            if (GetPacientes.data.length > 0) {
                setPacientes(GetPacientes.data)
            }
        }
        setloading(false);
    }, [GetPacientes.isLoading])

    useEffect(() => {
        if (UpdatePaciente.dataReady) {
            Store.addNotification({
                title: "Informacion Actualizada correctamente",
                message: "Los cambios han sido guardados exitosamente",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    }, [UpdatePaciente.isLoading])

    const UpdateData = () => {
        console.log(datosPaciente)
        UpdatePaciente.setParameters((info: any) => ({
            ...info,
            data: {
                ...datosPaciente,
            }
        }))
        UpdatePaciente.setFire(true);
    }

    const OpenModal = () => {
        setDatosPaciente((state) => ({
            ...state,
            FechaNacimiento:new Date()
        }))
        handleClickOpen();
    }
    return (
        <DatePickerWrapper>
            {
                !GetPacientes.dataReady || loading ? <FadeLoader
                    color={"#049eaf"}
                    loading={true}
                    cssOverride={{
                        display: "block",
                        margin: "0 auto",
                        borderColor: "#049eaf",
                    }}
                    title='Cargando'                    
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> : <>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Stack spacing={2} >
                                <Autocomplete
                                    id="free-solo-demo"
                                    freeSolo
                                    fullWidth
                                    options={pacientes.map((option) => option.Nombre)}
                                    onChange={(option: any) => {
                                        console.log(option.target.textContent.length)
                                        if (option.target.textContent.length > 0) {
                                            const pacienteToEdit = pacientes.find((paciente) => paciente.Nombre === option.target.textContent);
                                            console.log(pacientes);
                                            console.log(pacienteToEdit);
                                            if (pacienteToEdit) {
                                                setDataTable(pacienteToEdit.Consultas);
                                                setPacienteToEdit(pacienteToEdit)
                                                setDatosPaciente(pacienteToEdit);
                                                handleChangeUser();
                                            }
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Paciente" />}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup fullWidth>
                                <Button fullWidth sx={{ mr: 2 }} variant='contained' onClick={OpenModal}>
                                    Registrar Nuevo Paciente
                                </Button>
                                <Button fullWidth sx={{ mr: 2 }} variant='contained' onClick={UpdateData} disabled={!pendingChanges}>
                                    Guardar Cambios
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Dialog fullScreen open={open} onClose={handleClose}>
                        <AppBar style={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" style={{
                                    flex: 1,
                                }}>
                                    Datos del Cliente
                                </Typography>
                                <Button autoFocus color="inherit" onClick={InsertNewUser} disabled={datosPaciente.Nombre.length === 0}>
                                    Registrar
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <List>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="Nombre"
                                        label="Nombre *"
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
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <DatosPersonales datos={datosPaciente} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <HistoricoTerapias
                                datos={datosPaciente.Consultas}
                                updateData={setDatosPaciente}
                                changeonData={setPendingChanges}
                                sourceData={datosPaciente} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <AntecedentesPersonalesPatologicos
                                antecedentes={datosPaciente.AntecedentesPatologicos}
                                updateData={setDatosPaciente}
                                changeonData={setPendingChanges}
                                sourceData={datosPaciente} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <AntecedentesPersonalesNoPatologicos
                                datos={datosPaciente.AntecedentesNoPatolicos}
                                updateData={setDatosPaciente}
                                changeonData={setPendingChanges}
                                sourceData={datosPaciente} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TratamientoFarmacologico
                                tratamientoValue={datosPaciente.TratamientoFarmacologico}
                                updateData={setDatosPaciente}
                                changeonData={setPendingChanges}
                                sourceData={datosPaciente} />
                        </Grid>
                    </Grid>
                </>
            }


        </DatePickerWrapper>
    )
}

export default index