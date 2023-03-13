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
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import DatePicker from 'react-datepicker'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import useApi from 'src/@core/hooks/useApi'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { RegistroAntropometria } from 'src/Types/Types'
import { ButtonGroup } from '@mui/material'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha de Medicion' autoComplete='off' />
})

const RegistroForm = () => {
  const dispatch = useDispatch()
  const { ChangeOnUser } = bindActionCreators(actionCreators, dispatch)
  const state = useSelector((state: State) => state)
  const [dateRegistroAntro, setDateRegistroAntro] = useState<Array<RegistroAntropometria>>([])
  const InsertCall = useApi({
    config: {
      url: 'http://localhost:3000/api/addRegistroAntropometria',
      method: 'POST'
    },
    shouldFire: false
  })

  const UpdateCall = useApi({
    config: {
      url: 'http://localhost:3000/api/updateRegistroAntropometria',
      method: 'POST'
    },
    shouldFire: false
  })

  const DeleteCall = useApi({
    config: {
      url: 'http://localhost:3000/api/deleteRegistroAntropometria',
      method: 'POST'
    },
    shouldFire: false
  })

  const GetDateRegistrosCall = useApi({
    config: {
      url: 'http://localhost:3000/api/GetDateRegistrosAntropometricos',
      method: 'POST'
    },
    shouldFire: false
  })

  const [formValue, setFormValue] = useState<RegistroAntropometria>({
    _id: '',
    FechaMedicion: new Date(),
    Usuario: '',
    Values: [
      {
        dato: 'Peso Actual',
        value: 0,
        unidades: ''
      },
      {
        dato: 'Talla',
        value: 0,
        unidades: ''
      },
      {
        dato: 'IMC',
        value: 0,
        unidades: ''
      },
      {
        dato: 'Cintura',
        value: 0,
        unidades: ''
      },
      {
        dato: 'Cadera',
        value: 0,
        unidades: ''
      },
      {
        dato: 'Muneca',
        value: 0,
        unidades: ''
      },
      {
        dato: 'Constitucion Corporal',
        value: 0,
        unidades: ''
      },
      {
        dato: 'Peso Ideal',
        value: 0,
        unidades: ''
      },
      {
        dato: '% Peso para la talla',
        value: 0,
        unidades: ''
      },
      {
        dato: 'Peso Ajustado',
        value: 0,
        unidades: ''
      },
      {
        dato: 'Peso Meta',
        value: 0,
        unidades: ''
      },
      {
        dato: '% Grasa Corporal',
        value: 0,
        unidades: ''
      },
      {
        dato: '% Grasa Visceral',
        value: 0,
        unidades: ''
      },
      {
        dato: '% Musculo',
        value: 0,
        unidades: ''
      },
      {
        dato: 'Edad Metabólica',
        value: 0,
        unidades: ''
      }
    ]
  })

  const GetActualValue = (id: String) => {
    let result = formValue.Values.find(key => key.dato === id)
    if (result) {
      return result.value
    }
    return ''
  }

  const getActualUnidad = (id: String) => {
    let result = formValue.Values.find(key => key.dato === id)
    if (result) {
      return result.unidades
    }
    return ''
  }

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newOption = {
      dato: e.target.id,
      value: parseInt(e.target.value),
      unidades: getActualUnidad(e.target.id)
    }

    let findIndexToUpdate = formValue.Values.findIndex(row => row.dato === e.target.id)
    if (findIndexToUpdate >= 0) {
      let newInformation = { ...formValue }
      newInformation.Values[findIndexToUpdate] = newOption

      setFormValue(newInformation)
    }
  }

  const HandleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    let findIndexToUpdate = formValue.Values.findIndex(row => row.dato === id)
    if (findIndexToUpdate >= 0) {
      let newInformation = { ...formValue }
      newInformation.Values[findIndexToUpdate].unidades = e.target.value
      setFormValue(newInformation)
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

  const Execute = () => {
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

  const ResetForm = () => {
    setFormValue({
      _id: '',
      FechaMedicion: new Date(),
      Usuario: '',
      Values: [
        {
          dato: 'Peso Actual',
          value: 0,
          unidades: ''
        },
        {
          dato: 'Talla',
          value: 0,
          unidades: ''
        },
        {
          dato: 'IMC',
          value: 0,
          unidades: ''
        },
        {
          dato: 'Cintura',
          value: 0,
          unidades: ''
        },
        {
          dato: 'Cadera',
          value: 0,
          unidades: ''
        },
        {
          dato: 'Muneca',
          value: 0,
          unidades: ''
        },
        {
          dato: 'Constitucion Corporal',
          value: 0,
          unidades: ''
        },
        {
          dato: 'Peso Ideal',
          value: 0,
          unidades: ''
        },
        {
          dato: '% Peso para la talla',
          value: 0,
          unidades: ''
        },
        {
          dato: 'Peso Ajustado',
          value: 0,
          unidades: ''
        },
        {
          dato: 'Peso Meta',
          value: 0,
          unidades: ''
        },
        {
          dato: '% Grasa Corporal',
          value: 0,
          unidades: ''
        },
        {
          dato: '% Grasa Visceral',
          value: 0,
          unidades: ''
        },
        {
          dato: '% Musculo',
          value: 0,
          unidades: ''
        },
        {
          dato: 'Edad Metabólica',
          value: 0,
          unidades: ''
        }
      ]
    })
  }

  const HandleChangeSelect = (e: any) => {
    let result: any = null
    if (typeof e.target.value === 'string' || e.target.value !== '') {
      result = dateRegistroAntro.find(
        row => new Date(row.FechaMedicion).toLocaleDateString() === new Date(e.target.value).toLocaleDateString()
      )
    }

    if (result) {
      console.log(result)
      setFormValue({ ...result, FechaMedicion: new Date(result.FechaMedicion) })
    } else {
      ResetForm()
    }
  }
  useEffect(() => {
    if (GetDateRegistrosCall.dataReady) {
      if (GetDateRegistrosCall.data.length > 0) {
        setDateRegistroAntro(GetDateRegistrosCall.data)
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
            <InputLabel id='demo-simple-select-label'>Fecha</InputLabel>
            <Select
              onChange={e => HandleChangeSelect(e)}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Age'
            >
              <MenuItem value=''>&nbsp;&nbsp;</MenuItem>
              {dateRegistroAntro.map(registro => (
                <MenuItem value={new Date(registro.FechaMedicion).toDateString()}>
                  {new Date(registro.FechaMedicion).toLocaleDateString('es-ES')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label='Peso Actual'
            onChange={HandleChange}
            value={GetActualValue('Peso Actual')}
            id='Peso Actual'
            placeholder='Peso Actual'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={getActualUnidad('Peso Actual')}
            onChange={e => HandleChangeRadio(e, 'Peso Actual')}
          >
            <FormControlLabel value='Kg' control={<Radio />} label='Kg' />
            <FormControlLabel value='Lib' control={<Radio />} label='Lib' />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('Peso Ideal')}
            id='Peso Ideal'
            fullWidth
            label='Peso Ideal'
            placeholder='Peso Ideal'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <RadioGroup
            value={getActualUnidad('Peso Ideal')}
            onChange={e => HandleChangeRadio(e, 'Peso Ideal')}
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
          >
            <FormControlLabel value='Kg' control={<Radio />} label='Kg' />
            <FormControlLabel value='Lib' control={<Radio />} label='Lib' />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('Talla')}
            id='Talla'
            fullWidth
            label='Talla'
            placeholder='Talla'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <RadioGroup
            value={getActualUnidad('Talla')}
            onChange={e => HandleChangeRadio(e, 'Talla')}
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
          >
            <FormControlLabel value='Cm' control={<Radio />} label='Cm' />
            <FormControlLabel value='Pulg' control={<Radio />} label='Pulg' />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('IMC')}
            fullWidth
            label='IMC'
            id='IMC'
            placeholder='IMC'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('Cintura')}
            fullWidth
            label='Cintura'
            placeholder='Cintura'
            defaultValue='0'
            type='number'
            id='Cintura'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('Cadera')}
            fullWidth
            label='Cadera'
            placeholder='Cadera'
            defaultValue='0'
            type='number'
            id='Cadera'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('Muneca')}
            fullWidth
            id='Muneca'
            label='Muneca'
            placeholder='Muneca'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('Constitucion Corporal')}
            fullWidth
            id='Constitucion Corporal'
            label='Constitucion Corporal'
            placeholder='Constitucion Corporal'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            onChange={HandleChange}
            value={GetActualValue('% Peso para la talla')}
            label='% Peso Para La talla'
            id='% Peso para la talla'
            placeholder='% Peso Para La talla'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('Peso Ajustado')}
            fullWidth
            label='Peso Ajustado'
            id='Peso Ajustado'
            placeholder='Peso Ajustado'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('Peso Meta')}
            fullWidth
            label='Peso Meta'
            id='Peso Meta'
            placeholder='Peso Meta'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('% Grasa Corporal')}
            fullWidth
            label='% Grasa Corporal'
            id='% Grasa Corporal'
            placeholder='% Grasa Corporal'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('% Grasa Visceral')}
            fullWidth
            label='% Grasa Visceral'
            id='% Grasa Visceral'
            placeholder='% Grasa Visceral'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('% Musculo')}
            fullWidth
            label='% Musculo'
            id='% Musculo'
            placeholder='% Musculo'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            onChange={HandleChange}
            value={GetActualValue('Edad Metabólica')}
            fullWidth
            label='Edad Metabólica'
            id='Edad Metabólica'
            placeholder='Edad Metabólica'
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
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
            <Button variant='contained' fullWidth onClick={Execute}>
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
