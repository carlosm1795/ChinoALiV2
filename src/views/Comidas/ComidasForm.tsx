import React, { useEffect } from 'react'
// ** React Imports
import { useState, forwardRef } from 'react'
import NProgress from 'nprogress'
import cogoToast from 'cogo-toast'

//** State Imports */
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from 'src/@core/state'

// ** MUI Imports
import Plus from 'mdi-material-ui/Plus'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import DatePicker from 'react-datepicker'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import useApi from 'src/@core/hooks/useApi'
import MAINURL from 'src/@core/lib/settings'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { EvaluacionClinica, RegistroDeComidas, RegistroDeComidas2, Comidas2, Comidas } from 'src/Types/Types'
import { ButtonGroup } from '@mui/material'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha de Medicion' autoComplete='off' />
})

const RegistroForm = () => {
  const [comidas, setComidas] = useState<Array<RegistroDeComidas>>([])
  const dispatch = useDispatch()
  const { ChangeOnUser } = bindActionCreators(actionCreators, dispatch)
  const state = useSelector((state: State) => state)

  const InsertCall = useApi({
    config: {
      url: `${MAINURL}api/addComidas`,
      method: 'POST'
    },
    shouldFire: false
  })

  const UpdateCall = useApi({
    config: {
      url: `${MAINURL}api/updateComida`,
      method: 'POST'
    },
    shouldFire: false
  })

  const DeleteCall = useApi({
    config: {
      url: `${MAINURL}api/deleteComida`,
      method: 'POST'
    },
    shouldFire: false
  })

  const GetDateRegistrosCall = useApi({
    config: {
      url: `${MAINURL}api/getComidas`,
      method: 'POST'
    },
    shouldFire: false
  })
  const [formValue2, setFormValue2] = useState<RegistroDeComidas2>({
    _id: '',
    Usuario: '',
    Fecha: new Date(),
    Comidas: {
      Desayuno: [],
      'Merienda Mañana': [],
      Almuerzo: [],
      'Merienda Tarde': [],
      Cena: [],
      'Colación Nocturna': []
    },
    AlimentosFavoritos: '',
    AversionAlimentos: ''
  })
  const [formValue, setFormValue] = useState<RegistroDeComidas>({
    _id: '',
    Usuario: '',
    Fecha: new Date(),
    Comidas: [],
    AlimentosFavoritos: '',
    AversionAlimentos: ''
  })
  const HandleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let id = e.target.id
    setFormValue(info => ({
      ...info,
      [id]: e.target.value
    }))
  }

  const Delete = () => {
    DeleteCall.setParameters((info: any) => ({
      ...info,
      data: {
        _id: formValue._id
      }
    }))
    DeleteCall.setFire(true)
    ResetForm()
    NProgress.start()
  }

  const HandleChangeComida = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    let aux = { ...formValue }
    switch (e.target.id) {
      case 'Alimento':
        formValue.Comidas[index].Alimento = e.target.value
        break
      case 'Intercambio':
        formValue.Comidas[index].Intercambio = parseInt(e.target.value)
        break
      case 'Grupoalimenticio':
        formValue.Comidas[index].Grupoalimenticio = e.target.value
        break
      case 'TiempoDeComida':
        formValue.Comidas[index].TiempoDeComida = e.target.value
        break
      default:
        break
    }

    setFormValue({ ...aux })
  }

  const HandleSelectChangeComida = (e: SelectChangeEvent<string | number>, index: number) => {
    let aux = { ...formValue }
    if (typeof e.target.value === 'string') {
      switch (e.target.name) {
        case 'Grupoalimenticio':
          formValue.Comidas[index].Grupoalimenticio = e.target.value
          break
        case 'TiempoDeComida':
          formValue.Comidas[index].TiempoDeComida = e.target.value
          break
        default:
          break
      }
      setFormValue({ ...aux })
    }
  }
  const GetValue = (id: string, index: number) => {
    switch (id) {
      case 'Alimento':
        return formValue.Comidas[index].Alimento
      case 'Intercambio':
        return formValue.Comidas[index].Intercambio
      case 'Grupoalimenticio':
        return formValue.Comidas[index].Grupoalimenticio
      case 'TiempoDeComida':
        return formValue.Comidas[index].TiempoDeComida
    }
  }

  const ResetForm = () => {
    setFormValue({
      _id: '',
      Usuario: '',
      Fecha: new Date(),
      Comidas: [],
      AlimentosFavoritos: '',
      AversionAlimentos: ''
    })
    setFormValue2({
      _id: '',
      Usuario: '',
      Fecha: new Date(),
      Comidas: {
        Desayuno: [{ Alimento: '', Grupoalimenticio: '', Intercambio: 0 }],
        'Merienda Mañana': [],
        Almuerzo: [],
        'Merienda Tarde': [],
        Cena: [],
        'Colación Nocturna': []
      },
      AlimentosFavoritos: '',
      AversionAlimentos: ''
    })
  }


  const RemoveTiempo = (index: number) => {
    let newInformation = { ...formValue }
    newInformation.Comidas.splice(index, 1)
    setFormValue({ ...newInformation })
  }
  const HandleChangeDate = (date: Date | null) => {
    if (date) {
      setFormValue(info => ({
        ...info,
        Fecha: date
      }))
    }
  }
  const HandleChangeSelect = (e: any) => {
    let result: any = null
    if (typeof e.target.value === 'string' || e.target.value !== '') {
      result = comidas.find(
        row => new Date(row.Fecha).toLocaleDateString() === new Date(e.target.value).toLocaleDateString()
      )
    }

    if (result) {
      setFormValue2({ ...result, Fecha: new Date(result.Fecha) })
    } else {
      ResetForm()
    }
  }

  const ExecuteCall = () => {
    if (formValue._id === '') {
      InsertCall.setParameters((info: any) => ({
        ...info,
        data: { ...formValue2, Usuario: state.ChangeOnUser }
      }))
      NProgress.start()
      InsertCall.setFire(true)
    } else {
      UpdateCall.setParameters((info: any) => ({
        ...info,
        data: {
          ...formValue2,
          Usuario: state.ChangeOnUser
        }
      }))
      NProgress.start()
      UpdateCall.setFire(true)
    }
  }
  useEffect(() => {
    if (InsertCall.dataReady) {
      cogoToast.success('Dato Registrado', { position: 'top-right' })
      ResetForm()
    }
    NProgress.done()
  }, [InsertCall.isLoading])

  useEffect(() => {
    if (state.ChangeOnUser !== '') {
      GetDateRegistrosCall.setParameters((info: any) => ({
        ...info,
        data: {
          Usuario: state.ChangeOnUser
        }
      }))
      NProgress.start()
      GetDateRegistrosCall.setFire(true)
    }
  }, [state.ChangeOnUser])

  useEffect(() => {
    if (GetDateRegistrosCall.dataReady) {
      if (GetDateRegistrosCall.data.length > 0) {
        setComidas(GetDateRegistrosCall.data)
      }
    }
    NProgress.done()
  }, [GetDateRegistrosCall.isLoading])

  useEffect(() => {
    if (InsertCall.dataReady || UpdateCall.dataReady) {
      cogoToast.success('Dato Registrado', { position: 'top-right' })
      ResetForm()
    }
    NProgress.done()
  }, [InsertCall.isLoading, UpdateCall.isLoading])

  useEffect(() => {
    if (DeleteCall.dataReady) {
      cogoToast.success('Dato Eliminado', { position: 'top-right' })
      NProgress.done()
      GetDateRegistrosCall.setFire(true)
    }
  }, [DeleteCall.isLoading])

  const AddTiempoDeComidaIndividual = (tiempo: String) => {
    let aux = { ...formValue2 }
    switch (tiempo) {
      case 'Desayuno':
        aux.Comidas.Desayuno.push({ Alimento: '', Grupoalimenticio: '', Intercambio: 0 })
        break
      case 'Merienda Mañana':
        aux.Comidas['Merienda Mañana'].push({ Alimento: '', Grupoalimenticio: '', Intercambio: 0 })
        break
      case 'Almuerzo':
        aux.Comidas.Almuerzo.push({ Alimento: '', Grupoalimenticio: '', Intercambio: 0 })
        break
      case 'Merienda Tarde':
        aux.Comidas['Merienda Tarde'].push({ Alimento: '', Grupoalimenticio: '', Intercambio: 0 })
        break
      case 'Cena':
        aux.Comidas.Cena.push({ Alimento: '', Grupoalimenticio: '', Intercambio: 0 })
        break
      case 'Colación Nocturna':
        aux.Comidas['Colación Nocturna'].push({ Alimento: '', Grupoalimenticio: '', Intercambio: 0 })
        break
    }
    setFormValue2({ ...aux })
  }

  const DeleteTiempoDeComidaIndividual = (tiempo: string, index: number) => {
    let aux = { ...formValue2 }
    switch (tiempo) {
      case 'Desayuno':
        aux.Comidas.Desayuno.splice(index, 1)
        break
      case 'Merienda Mañana':
        aux.Comidas['Merienda Mañana'].splice(index, 1)
        break
      case 'Almuerzo':
        aux.Comidas.Almuerzo.splice(index, 1)
        break
      case 'Merienda Tarde':
        aux.Comidas['Merienda Tarde'].splice(index, 1)
        break
      case 'Cena':
        aux.Comidas.Cena.splice(index, 1)
        break
      case 'Colación Nocturna':
        aux.Comidas['Colación Nocturna'].splice(index, 1)
        break
    }

    setFormValue2({ ...aux })
  }

  const UpdateAlimento = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    tiempo: string,
    index: number
  ) => {
    let aux = { ...formValue2 }
    switch (tiempo) {
      case 'Desayuno':
        aux.Comidas.Desayuno[index].Alimento = e.target.value
        break
      case 'Merienda Mañana':
        aux.Comidas['Merienda Mañana'][index].Alimento = e.target.value
        break
      case 'Almuerzo':
        aux.Comidas.Almuerzo[index].Alimento = e.target.value
        break
      case 'Merienda Tarde':
        aux.Comidas['Merienda Tarde'][index].Alimento = e.target.value
        break
      case 'Cena':
        aux.Comidas.Cena[index].Alimento = e.target.value
        break
    }
    setFormValue2({ ...aux })
  }
  const UpdateIntercambio = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    tiempo: string,
    index: number
  ) => {
    let aux = { ...formValue2 }
    switch (tiempo) {
      case 'Desayuno':
        aux.Comidas.Desayuno[index].Intercambio = parseInt(e.target.value)
        break
      case 'Merienda Mañana':
        aux.Comidas['Merienda Mañana'][index].Intercambio = parseInt(e.target.value)
        break
      case 'Almuerzo':
        aux.Comidas.Almuerzo[index].Intercambio = parseInt(e.target.value)
        break
      case 'Merienda Tarde':
        aux.Comidas['Merienda Tarde'][index].Intercambio = parseInt(e.target.value)
        break
      case 'Cena':
        aux.Comidas.Cena[index].Intercambio = parseInt(e.target.value)
        break
    }
    setFormValue2({ ...aux })
  }
  const UpdateGrupoAlimenticio = (e: SelectChangeEvent<any>, tiempo: string, index: number) => {
    let aux = { ...formValue2 }
    console.log(e)
    switch (tiempo) {
      case 'Desayuno':
        aux.Comidas.Desayuno[index].Grupoalimenticio = e.target.value
        break
      case 'Merienda Mañana':
        aux.Comidas['Merienda Mañana'][index].Grupoalimenticio = e.target.value
        break
      case 'Almuerzo':
        aux.Comidas.Almuerzo[index].Grupoalimenticio = e.target.value
        break
      case 'Merienda Tarde':
        aux.Comidas['Merienda Tarde'][index].Grupoalimenticio = e.target.value
        break
      case 'Cena':
        aux.Comidas.Cena[index].Grupoalimenticio = e.target.value
        break
    }
    setFormValue2({ ...aux })
  }
  return (
    <CardContent>
      <Grid container spacing={7}>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Registros Pasados</InputLabel>
            <Select
              onChange={e => HandleChangeSelect(e)}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Age'
            >
              <MenuItem value=''>&nbsp;&nbsp;</MenuItem>
              {comidas.map(registro => (
                <MenuItem value={new Date(registro.Fecha).toDateString()}>
                  {new Date(registro.Fecha).toLocaleDateString('es-ES')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='AlimentosFavoritos'
            fullWidth
            label='Alimentos Favoritos'
            onChange={e => HandleTextChange(e)}
            placeholder='Alimentos Favoritos'
            defaultValue=''
            autoComplete='off'
            type='text'
            value={formValue.AlimentosFavoritos}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='AversionAlimentos'
            fullWidth
            label='Aversion Alimentos'
            onChange={e => HandleTextChange(e)}
            placeholder='Aversion Alimentos'
            defaultValue=''
            autoComplete='off'
            type='text'
            value={formValue.AversionAlimentos}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <DatePicker
            showYearDropdown
            showMonthDropdown
            placeholderText='DD-MM-YYYY'
            dateFormat={'dd-MM-yyyy'}
            customInput={<CustomInput />}
            id='form-layouts-separator-date'
            onChange={HandleChangeDate}
            selected={formValue.Fecha}
          />
        </Grid>
        
        {formValue.Comidas.map((row, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={1}>
              <IconButton
                color='primary'
                onClick={() => RemoveTiempo(index)}
                aria-label='upload picture'
                component='label'
              >
                <Close />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id='Alimento'
                fullWidth
                label='Alimento'
                placeholder='Alimento'
                autoComplete='off'
                defaultValue=''
                onChange={e => HandleChangeComida(e, index)}
                value={GetValue('Alimento', index)}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                id='Intercambio'
                fullWidth
                label='Intercambio'
                placeholder='Intercambio'
                defaultValue=''
                onChange={e => HandleChangeComida(e, index)}
                value={GetValue('Intercambio', index)}
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Tiempo De Comida</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  name='TiempoDeComida'
                  onChange={e => HandleSelectChangeComida(e, index)}
                  value={GetValue('TiempoDeComida', index)}
                >
                  <MenuItem value='Desayuno'>Desayuno</MenuItem>
                  <MenuItem value='Merienda Manana'>Merienda Manana</MenuItem>
                  <MenuItem value='Almuerzo'>Almuerzo</MenuItem>
                  <MenuItem value='Merienda Tarde'>Merienda Tarde</MenuItem>
                  <MenuItem value='Cena'>Cena</MenuItem>
                  <MenuItem value='Merienda Noche'>Colación Nocturna</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Grupo Alimenticio</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='GrupoAlimenticio'
                  name='Grupoalimenticio'
                  label='Grupo Alimenticio'
                  onChange={e => HandleSelectChangeComida(e, index)}
                  value={GetValue('Grupoalimenticio', index)}
                >
                  <MenuItem value='Carbohidratos'>Carbohidratos</MenuItem>
                  <MenuItem value='Proteina'>Proteina</MenuItem>
                  <MenuItem value='Grasa'>Grasa</MenuItem>
                  <MenuItem value='Frutas'>Frutas</MenuItem>
                  <MenuItem value='Azucar'>Azucar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12} sm={12}>
          <InputLabel id='demo-simple-select-label'>
            {formValue2.Comidas.Desayuno.length > 0 ? `Desayuno(${formValue2.Comidas.Desayuno.length})` : 'Desayuno'}
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              onClick={() => AddTiempoDeComidaIndividual('Desayuno')}
            >
              <Plus />
            </IconButton>
          </InputLabel>
        </Grid>
        {formValue2.Comidas.Desayuno.map((desayuno, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={1}>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='label'
                onClick={() => DeleteTiempoDeComidaIndividual('Desayuno', index)}
              >
                <Close />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id='Alimento'
                fullWidth
                label='Alimento'
                placeholder='Alimento'
                autoComplete='off'
                value={formValue2.Comidas.Desayuno[index].Alimento}
                onChange={e => UpdateAlimento(e, 'Desayuno', index)}
                defaultValue=''
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id='Intercambio'
                fullWidth
                label='Intercambio'
                placeholder='Intercambio'
                defaultValue=''
                type='number'
                value={formValue2.Comidas.Desayuno[index].Intercambio}
                onChange={e => UpdateIntercambio(e, 'Desayuno', index)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Grupo Alimenticio</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='GrupoAlimenticio'
                  name='Grupoalimenticio'
                  label='Grupo Alimenticio'
                  value={formValue2.Comidas['Desayuno'][index].Grupoalimenticio}
                  onChange={e => UpdateGrupoAlimenticio(e, 'Desayuno', index)}
                >
                  <MenuItem value='Carbohidratos'>Carbohidratos</MenuItem>
                  <MenuItem value='Proteina'>Proteina</MenuItem>
                  <MenuItem value='Grasa'>Grasa</MenuItem>
                  <MenuItem value='Frutas'>Frutas</MenuItem>
                  <MenuItem value='Azucar'>Azucar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12} sm={12}>
          <InputLabel id='demo-simple-select-label'>
            {formValue2.Comidas['Merienda Mañana'].length > 0
              ? `Merienda Mañana(${formValue2.Comidas['Merienda Mañana'].length})`
              : 'Merienda Mañana'}
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              onClick={() => AddTiempoDeComidaIndividual('Merienda Mañana')}
            >
              <Plus />
            </IconButton>
          </InputLabel>
        </Grid>
        {formValue2.Comidas['Merienda Mañana'].map((desayuno, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={1}>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='label'
                onClick={() => DeleteTiempoDeComidaIndividual('Merienda Mañana', index)}
              >
                <Close />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id='Alimento'
                fullWidth
                label='Alimento'
                placeholder='Alimento'
                autoComplete='off'
                value={formValue2.Comidas['Merienda Mañana'][index].Alimento}
                onChange={e => UpdateAlimento(e, 'Merienda Mañana', index)}
                defaultValue=''
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id='Intercambio'
                fullWidth
                label='Intercambio'
                placeholder='Intercambio'
                defaultValue=''
                type='number'
                value={formValue2.Comidas['Merienda Mañana'][index].Intercambio}
                onChange={e => UpdateIntercambio(e, 'Merienda Mañana', index)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Grupo Alimenticio</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='GrupoAlimenticio'
                  name='Grupoalimenticio'
                  label='Grupo Alimenticio'
                  value={formValue2.Comidas['Merienda Mañana'][index].Grupoalimenticio}
                  onChange={e => UpdateGrupoAlimenticio(e, 'Merienda Mañana', index)}
                >
                  <MenuItem value='Carbohidratos'>Carbohidratos</MenuItem>
                  <MenuItem value='Proteina'>Proteina</MenuItem>
                  <MenuItem value='Grasa'>Grasa</MenuItem>
                  <MenuItem value='Frutas'>Frutas</MenuItem>
                  <MenuItem value='Azucar'>Azucar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12} sm={12}>
          <InputLabel id='demo-simple-select-label'>
            {formValue2.Comidas.Almuerzo.length > 0 ? `Almuerzo(${formValue2.Comidas.Almuerzo.length})` : 'Almuerzo'}
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              onClick={() => AddTiempoDeComidaIndividual('Almuerzo')}
            >
              <Plus />
            </IconButton>
          </InputLabel>
        </Grid>
        {formValue2.Comidas.Almuerzo.map((Almuerzo, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={1}>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='label'
                onClick={() => DeleteTiempoDeComidaIndividual('Almuerzo', index)}
              >
                <Close />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id='Alimento'
                fullWidth
                label='Alimento'
                placeholder='Alimento'
                autoComplete='off'
                value={formValue2.Comidas.Almuerzo[index].Alimento}
                onChange={e => UpdateAlimento(e, 'Almuerzo', index)}
                defaultValue=''
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id='Intercambio'
                fullWidth
                label='Intercambio'
                placeholder='Intercambio'
                defaultValue=''
                type='number'
                value={formValue2.Comidas.Almuerzo[index].Intercambio}
                onChange={e => UpdateIntercambio(e, 'Almuerzo', index)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Grupo Alimenticio</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='GrupoAlimenticio'
                  name='Grupoalimenticio'
                  label='Grupo Alimenticio'
                  value={formValue2.Comidas['Almuerzo'][index].Grupoalimenticio}
                  onChange={e => UpdateGrupoAlimenticio(e, 'Almuerzo', index)}
                >
                  <MenuItem value='Carbohidratos'>Carbohidratos</MenuItem>
                  <MenuItem value='Proteina'>Proteina</MenuItem>
                  <MenuItem value='Grasa'>Grasa</MenuItem>
                  <MenuItem value='Frutas'>Frutas</MenuItem>
                  <MenuItem value='Azucar'>Azucar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12} sm={12}>
          <InputLabel id='demo-simple-select-label'>
            {formValue2.Comidas['Merienda Tarde'].length > 0
              ? `Merienda Tarde(${formValue2.Comidas['Merienda Tarde'].length})`
              : 'Merienda Tarde'}
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              onClick={() => AddTiempoDeComidaIndividual('Merienda Tarde')}
            >
              <Plus />
            </IconButton>
          </InputLabel>
        </Grid>
        {formValue2.Comidas['Merienda Tarde'].map((desayuno, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={1}>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='label'
                onClick={() => DeleteTiempoDeComidaIndividual('Merienda Tarde', index)}
              >
                <Close />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id='Alimento'
                fullWidth
                label='Alimento'
                placeholder='Alimento'
                autoComplete='off'
                value={formValue2.Comidas['Merienda Tarde'][index].Alimento}
                onChange={e => UpdateAlimento(e, 'Merienda Tarde', index)}
                defaultValue=''
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id='Intercambio'
                fullWidth
                label='Intercambio'
                placeholder='Intercambio'
                defaultValue=''
                type='number'
                value={formValue2.Comidas['Merienda Tarde'][index].Intercambio}
                onChange={e => UpdateIntercambio(e, 'Merienda Tarde', index)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Grupo Alimenticio</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='GrupoAlimenticio'
                  name='Grupoalimenticio'
                  label='Grupo Alimenticio'
                  value={formValue2.Comidas['Merienda Tarde'][index].Grupoalimenticio}
                  onChange={e => UpdateGrupoAlimenticio(e, 'Merienda Tarde', index)}
                >
                  <MenuItem value='Carbohidratos'>Carbohidratos</MenuItem>
                  <MenuItem value='Proteina'>Proteina</MenuItem>
                  <MenuItem value='Grasa'>Grasa</MenuItem>
                  <MenuItem value='Frutas'>Frutas</MenuItem>
                  <MenuItem value='Azucar'>Azucar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12} sm={12}>
          <InputLabel id='demo-simple-select-label'>
            {formValue2.Comidas.Cena.length > 0 ? `Cena(${formValue2.Comidas.Cena.length})` : 'Cena'}
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              onClick={() => AddTiempoDeComidaIndividual('Cena')}
            >
              <Plus />
            </IconButton>
          </InputLabel>
        </Grid>
        {formValue2.Comidas.Cena.map((Cena, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={1}>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='label'
                onClick={() => DeleteTiempoDeComidaIndividual('Cena', index)}
              >
                <Close />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id='Alimento'
                fullWidth
                label='Alimento'
                placeholder='Alimento'
                autoComplete='off'
                value={formValue2.Comidas.Cena[index].Alimento}
                onChange={e => UpdateAlimento(e, 'Cena', index)}
                defaultValue=''
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id='Intercambio'
                fullWidth
                label='Intercambio'
                placeholder='Intercambio'
                defaultValue=''
                type='number'
                value={formValue2.Comidas.Cena[index].Intercambio}
                onChange={e => UpdateIntercambio(e, 'Cena', index)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Grupo Alimenticio</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='GrupoAlimenticio'
                  name='Grupoalimenticio'
                  label='Grupo Alimenticio'
                  value={formValue2.Comidas['Cena'][index].Grupoalimenticio}
                  onChange={e => UpdateGrupoAlimenticio(e, 'Cena', index)}
                >
                  <MenuItem value='Carbohidratos'>Carbohidratos</MenuItem>
                  <MenuItem value='Proteina'>Proteina</MenuItem>
                  <MenuItem value='Grasa'>Grasa</MenuItem>
                  <MenuItem value='Frutas'>Frutas</MenuItem>
                  <MenuItem value='Azucar'>Azucar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12} sm={12}>
          <InputLabel id='demo-simple-select-label'>
            {formValue2.Comidas['Colación Nocturna'].length > 0
              ? `Colación Nocturna(${formValue2.Comidas['Colación Nocturna'].length})`
              : 'Colación Nocturna'}
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              onClick={() => AddTiempoDeComidaIndividual('Colación Nocturna')}
            >
              <Plus />
            </IconButton>
          </InputLabel>
        </Grid>
        {formValue2.Comidas['Colación Nocturna'].map((desayuno, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={1}>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='label'
                onClick={() => DeleteTiempoDeComidaIndividual('Colación Nocturna', index)}
              >
                <Close />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id='Alimento'
                fullWidth
                label='Alimento'
                placeholder='Alimento'
                autoComplete='off'
                value={formValue2.Comidas['Colación Nocturna'][index].Alimento}
                onChange={e => UpdateAlimento(e, 'Colación Nocturna', index)}
                defaultValue=''
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id='Intercambio'
                fullWidth
                label='Intercambio'
                placeholder='Intercambio'
                defaultValue=''
                type='number'
                value={formValue2.Comidas['Colación Nocturna'][index].Intercambio}
                onChange={e => UpdateIntercambio(e, 'Colación Nocturna', index)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Grupo Alimenticio</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='GrupoAlimenticio'
                  name='Grupoalimenticio'
                  label='Grupo Alimenticio'
                  value={formValue2.Comidas['Colación Nocturna'][index].Grupoalimenticio}
                  onChange={e => UpdateGrupoAlimenticio(e, 'Colación Nocturna', index)}
                >
                  <MenuItem value='Carbohidratos'>Carbohidratos</MenuItem>
                  <MenuItem value='Proteina'>Proteina</MenuItem>
                  <MenuItem value='Grasa'>Grasa</MenuItem>
                  <MenuItem value='Frutas'>Frutas</MenuItem>
                  <MenuItem value='Azucar'>Azucar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Grid item xs={12} sm={12}>
        <ButtonGroup fullWidth>
          <Button variant='contained' fullWidth onClick={ExecuteCall}>
            {formValue2._id === '' ? 'Registrar' : 'Actualizar'}
          </Button>
          {formValue2._id !== '' ? (
            <Button variant='outlined' fullWidth onClick={Delete}>
              Eliminar
            </Button>
          ) : null}
        </ButtonGroup>
      </Grid>
    </CardContent>
  )
}

export default RegistroForm
