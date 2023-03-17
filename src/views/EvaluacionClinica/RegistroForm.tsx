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
import MAINURL from "src/@core/lib/settings"
import useApi from 'src/@core/hooks/useApi'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { EvaluacionClinica, RegistroAntropometria } from 'src/Types/Types'
import { ButtonGroup } from '@mui/material'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha de Medicion' autoComplete='off' />
})

const RegistroForm = () => {
  const dispatch = useDispatch()
  const { ChangeOnUser } = bindActionCreators(actionCreators, dispatch)
  const state = useSelector((state: State) => state)
  const [dateEvalacionClinica, setEvaluacionClinica] = useState<Array<RegistroAntropometria>>([])
  const InsertCall = useApi({
    config: {
      url: `${MAINURL}/api/addEvaluacionClinica`,
      method: 'POST'
    },
    shouldFire: false
  })

  const GetDateRegistrosCall = useApi({
    config: {
      url: `${MAINURL}/api/getEvaluacionClinica`,
      method: 'POST'
    },
    shouldFire: false
  })

  const [formValue, setFormValue] = useState<EvaluacionClinica>({
    _id: '',
    Usuario: '',
    FechaMedicion: new Date(),
    APF: [
      {
        dato: 'Hipertension',
        value: false
      },
      {
        dato: 'Diabetes',
        value: false
      },
      {
        dato: 'Cancer',
        value: false
      },
      {
        dato: 'Osteoporosis',
        value: false
      },
      {
        dato: 'Otro',
        value: ''
      }
    ],
    APP: [
      {
        dato: 'Hipertension',
        value: false
      },
      {
        dato: 'Diabetes',
        value: false
      },
      {
        dato: 'Cancer',
        value: false
      },
      {
        dato: 'Osteoporosis',
        value: false
      },
      {
        dato: 'Otro',
        value: ''
      }
    ],
    Otros: [
      {
        dato: 'Consumo de medicamentos',
        value: false,
        comments: ''
      },
      {
        dato: 'Ejercicio Fisico',
        value: false,
        comments: ''
      },
      {
        dato: 'Cirugias Recientes',
        value: false,
        comments: ''
      },
      {
        dato: 'Alergias',
        value: false,
        comments: ''
      }
    ]
  })

  const ResetForm = () => {
    setFormValue({
      _id: '',
      Usuario: '',
      FechaMedicion: new Date(),
      APF: [
        {
          dato: 'Hipertension',
          value: false
        },
        {
          dato: 'Diabetes',
          value: false
        },
        {
          dato: 'Cancer',
          value: false
        },
        {
          dato: 'Osteoporosis',
          value: false
        },
        {
          dato: 'Otro',
          value: ''
        }
      ],
      APP: [
        {
          dato: 'Hipertension',
          value: false
        },
        {
          dato: 'Diabetes',
          value: false
        },
        {
          dato: 'Cancer',
          value: false
        },
        {
          dato: 'Osteoporosis',
          value: false
        },
        {
          dato: 'Otro',
          value: ''
        }
      ],
      Otros: [
        {
          dato: 'Consumo de medicamentos',
          value: false
        },
        {
          dato: 'Ejercicio Fisico',
          value: false
        },
        {
          dato: 'Cirugias Recientes',
          value: false
        },
        {
          dato: 'Alergias',
          value: false
        }
      ]
    })
  }
  const GetValueForText = (id: string) => {
    let info = id.split('-')
    if (info.length >= 2) {
      let findIndexToUpdate = formValue.Otros.findIndex(row => row.dato === info[0])
      if (findIndexToUpdate !== -1) {
        return formValue.Otros[findIndexToUpdate].comments
      }
    }
  }
  const IamChecked = (id: string): boolean => {
    let info = id.split('-')
    if (info.length >= 2) {
      if (info[1] === 'APP') {
        let findIndexToUpdate = formValue.APP.findIndex(row => row.dato === info[0])
        if (findIndexToUpdate !== -1) {
          if (typeof formValue.APP[findIndexToUpdate].value === 'boolean') {
            if (formValue.APP[findIndexToUpdate].value === true) {
              return true
            }

            if (formValue.APP[findIndexToUpdate].value === false) {
              return false
            }
          }
        }
      } else if (info[1] === 'APF') {
        let findIndexToUpdate = formValue.APF.findIndex(row => row.dato === info[0])
        if (findIndexToUpdate !== -1) {
          if (typeof formValue.APF[findIndexToUpdate].value === 'boolean') {
            if (formValue.APF[findIndexToUpdate].value === true) {
              return true
            }

            if (formValue.APF[findIndexToUpdate].value === false) {
              return false
            }
          }
        }
      } else if (info[1] === 'OTHER') {
        let findIndexToUpdate = formValue.Otros.findIndex(row => row.dato === info[0])
        if (findIndexToUpdate !== -1) {
          if (typeof formValue.Otros[findIndexToUpdate].value === 'boolean') {
            if (formValue.Otros[findIndexToUpdate].value === true) {
              return true
            }

            if (formValue.Otros[findIndexToUpdate].value === false) {
              return false
            }
          }
        }
      }
    }
    return false
  }

  const HandleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let id = e.target.id
    let info = id.split('-')
    if (info.length >= 2) {
      if (info[1] === 'OTHER') {
        let findIndexToUpdate = formValue.Otros.findIndex(row => row.dato === info[0])
        if (findIndexToUpdate !== -1) {
          let newInformation = { ...formValue }
          newInformation.Otros[findIndexToUpdate].comments = e.target.value
          setFormValue({ ...newInformation })
        }
      }
    }
  }
  const HandleCheckSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    let id = e.target.id
    let info = id.split('-')
    if (info.length >= 2) {
      if (info[1] === 'APP') {
        let findIndexToUpdate = formValue.APP.findIndex(row => row.dato === info[0])
        if (findIndexToUpdate !== -1) {
          let newInformation = { ...formValue }
          newInformation.APP[findIndexToUpdate].value = e.target.checked
          setFormValue({ ...newInformation })
        }
      } else if (info[1] === 'APF') {
        let findIndexToUpdate = formValue.APF.findIndex(row => row.dato === info[0])
        if (findIndexToUpdate !== -1) {
          let newInformation = { ...formValue }
          newInformation.APF[findIndexToUpdate].value = e.target.checked
          setFormValue({ ...newInformation })
        }
      } else if (info[1] === 'OTHER') {
        let findIndexToUpdate = formValue.Otros.findIndex(row => row.dato === info[0])
        if (findIndexToUpdate !== -1) {
          let newInformation = { ...formValue }
          newInformation.Otros[findIndexToUpdate].value = e.target.checked
          setFormValue({ ...newInformation })
        }
      }
    }
  }

  const HandleChangeDate = (date: Date | null) => {
    if (date) {
      setFormValue(info => ({
        ...info,
        FechaMedicion: date
      }))
    }
  }

  const HandleChangeSelect = (e: any) => {
    let result: any = null
    if (typeof e.target.value === 'string' || e.target.value !== '') {
      result = dateEvalacionClinica.find(
        row => new Date(row.FechaMedicion).toLocaleDateString() === new Date(e.target.value).toLocaleDateString()
      )
    }

    if (result) {      
      setFormValue({ ...result, FechaMedicion: new Date(result.FechaMedicion) })
    } else {
      ResetForm()
    }
  }

  const ExecuteCall = () => {
    if (formValue._id === '') {
      InsertCall.setParameters((info: any) => ({
        ...info,
        data: {
          ...formValue,
          Usuario: state.ChangeOnUser
        }
      }))
      NProgress.start()
      InsertCall.setFire(true)
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
        setEvaluacionClinica(GetDateRegistrosCall.data)
      }
    }
    NProgress.done()
  }, [GetDateRegistrosCall.isLoading])
  return (
    <CardContent>
      <Grid container spacing={7}>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Fecha</InputLabel>
            <Select
              onChange={e => HandleChangeSelect(e)}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Age'
            >
              <MenuItem value=''>&nbsp;&nbsp;</MenuItem>
              {dateEvalacionClinica.map(registro => (
                <MenuItem value={new Date(registro.FechaMedicion).toDateString()}>
                  {new Date(registro.FechaMedicion).toLocaleDateString('es-ES')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputLabel id='demo-simple-select-label'>APP</InputLabel>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox checked={IamChecked('Hipertension-APP')} onChange={HandleCheckSelect} id='Hipertension-APP' />
            }
            label='Hipertension'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={<Checkbox checked={IamChecked('Diabetes-APP')} onChange={HandleCheckSelect} id='Diabetes-APP' />}
            label='Diabetes'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={<Checkbox checked={IamChecked('Cancer-APP')} onChange={HandleCheckSelect} id='Cancer-APP' />}
            label='Cancer'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox checked={IamChecked('Osteoporosis-APP')} onChange={HandleCheckSelect} id='Osteoporosis-APP' />
            }
            label='Osteoporosis'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputLabel id='demo-simple-select-label'>APF</InputLabel>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox checked={IamChecked('Hipertension-APF')} onChange={HandleCheckSelect} id='Hipertension-APF' />
            }
            label='Hipertension'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={<Checkbox checked={IamChecked('Diabetes-APF')} onChange={HandleCheckSelect} id='Diabetes-APF' />}
            label='Diabetes'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={<Checkbox checked={IamChecked('Cancer-APF')} onChange={HandleCheckSelect} id='Cancer-APF' />}
            label='Cancer'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox checked={IamChecked('Osteoporosis-APF')} onChange={HandleCheckSelect} id='Osteoporosis-APF' />
            }
            label='Osteoporosis'
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputLabel id='demo-simple-select-label'>Otros</InputLabel>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={IamChecked('Consumo de medicamentos-OTHER')}
                onChange={HandleCheckSelect}
                id='Consumo de medicamentos-OTHER'
              />
            }
            label='Consumo de medicamentos'
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          {IamChecked('Consumo de medicamentos-OTHER') === true ? (
            <TextField
              id='Consumo de medicamentos-OTHER'
              fullWidth
              label='Medicamentos'
              onChange={e => HandleTextChange(e)}
              placeholder='Medicamentos'
              defaultValue=''
              type='text'
              value={GetValueForText('Consumo de medicamentos-OTHER')}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={IamChecked('Ejercicio Fisico-OTHER')}
                onChange={HandleCheckSelect}
                id='Ejercicio Fisico-OTHER'
              />
            }
            label='Ejercicio Fisico'
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          {IamChecked('Ejercicio Fisico-OTHER') === true ? (
            <TextField
              id='Ejercicio Fisico-OTHER'
              fullWidth
              label='Ejercicio Fisico'
              placeholder='Ejercicio Fisico'
              defaultValue=''
              onChange={e => HandleTextChange(e)}
              type='text'
              value={GetValueForText('Ejercicio Fisico-OTHER')}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={IamChecked('Cirugias Recientes-OTHER')}
                onChange={HandleCheckSelect}
                id='Cirugias Recientes-OTHER'
              />
            }
            label='Cirugias Recientes'
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          {IamChecked('Cirugias Recientes-OTHER') === true ? (
            <TextField
              id='Cirugias Recientes-OTHER'
              fullWidth
              label='Cirugias Recientes'
              placeholder='Cirugias Recientes'
              defaultValue=''
              type='text'
              onChange={e => HandleTextChange(e)}
              value={GetValueForText('Cirugias Recientes-OTHER')}
            />
          ) : null}
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox checked={IamChecked('Alergias-OTHER')} onChange={HandleCheckSelect} id='Alergias-OTHER' />
            }
            label='Alergias'
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          {IamChecked('Alergias-OTHER') === true ? (
            <TextField
              id='Alergias-OTHER'
              fullWidth
              label='Alergias'
              placeholder='Alergias'
              defaultValue=''
              onChange={e => HandleTextChange(e)}
              value={GetValueForText('Alergias-OTHER')}
              type='text'
            />
          ) : null}
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
            selected={formValue.FechaMedicion}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <ButtonGroup fullWidth>
            <Button variant='contained' fullWidth onClick={ExecuteCall}>
              {formValue._id === '' ? 'Registrar' : 'Actualizar'}
            </Button>
            {formValue._id !== '' ? (
              <Button variant='outlined' fullWidth>
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
