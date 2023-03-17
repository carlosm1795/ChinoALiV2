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
import MAINURL from "src/@core/lib/settings"
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { EvaluacionClinica, RegistroDeComidas, Comidas } from 'src/Types/Types'
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
  }
  const AddTiempoDeComida = () => {
    let newTime: Comidas = {
      Alimento: '',
      Intercambio: 0,
      Grupoalimenticio: '',
      TiempoDeComida: ''
    }
    setFormValue(data => ({
      ...data,
      Comidas: [...data.Comidas, newTime]
    }))
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
      setFormValue({ ...result, Fecha: new Date(result.Fecha) })
    } else {
      ResetForm()
    }
  }

  const ExecuteCall = () => {
    if (formValue._id === '') {
      InsertCall.setParameters((info: any) => ({
        ...info,
        data: { ...formValue, Usuario: state.ChangeOnUser }
      }))
      NProgress.start()
      InsertCall.setFire(true)
    } else {
      UpdateCall.setParameters((info: any) => ({
        ...info,
        data: {
          ...formValue,
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
        <Grid item xs={12} sm={12}>
          <Button variant='outlined' fullWidth onClick={AddTiempoDeComida}>
            Aggregar Tiempo de Comida
          </Button>
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
          <ButtonGroup fullWidth>
            <Button variant='contained' fullWidth onClick={ExecuteCall}>
              {formValue._id === '' ? 'Registrar' : 'Actualizar'}
            </Button>
            {formValue._id !== '' ? (
              <Button variant='outlined' fullWidth onClick={Delete}>
                Eliminar
              </Button>
            ) : null}
          </ButtonGroup>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default RegistroForm
