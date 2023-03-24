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
import MAINURL from 'src/@core/lib/settings'
import useApi from 'src/@core/hooks/useApi'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { CalculoDeDieta, CalculoDietaType } from 'src/Types/Types'
import { ButtonGroup } from '@mui/material'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha de Medicion' autoComplete='off' />
})

const RegistroConsumoUsual = () => {
  const [formValue, setFormValue] = useState<CalculoDeDieta>({
    _id: '',
    Fecha: new Date(),
    Usuario: '',
    Frutas: {
      ID: 'Frutas',
      KCAL: 0,
      Q: 0,
      LABEL: 'Frutas'
    },
    Vegetales: {
      ID: 'Vegetales',
      KCAL: 0,
      Q: 0,
      LABEL: 'Vegetales'
    },
    Lacteos: {
      ID: 'Lacteos',
      KCAL: 0,
      Q: 0,
      LABEL: 'Lácteos'
    },
    Descremada: {
      ID: 'Descremada',
      KCAL: 0,
      Q: 0,
      LABEL: 'Descremada'
    },
    Semidescremada: {
      ID: 'Semidescremada',
      KCAL: 0,
      Q: 0,
      LABEL: 'Semidescremada'
    },
    Entera: {
      ID: 'Entera',
      KCAL: 0,
      Q: 0,
      LABEL: 'Entera'
    },
    Chos: {
      ID: 'Chos',
      KCAL: 0,
      Q: 0,
      LABEL: "CHO'S"
    },
    Harinas: {
      ID: 'Harinas',
      KCAL: 0,
      Q: 0,
      LABEL: 'Harinas'
    },
    MuyMagra: {
      ID: 'MuyMagra',
      KCAL: 0,
      Q: 0,
      LABEL: 'Muy magra'
    },
    Magra: {
      ID: 'Magra',
      KCAL: 0,
      Q: 0,
      LABEL: 'Magra'
    },
    SemiMagra: {
      ID: 'SemiMagra',
      KCAL: 0,
      Q: 0,
      LABEL: 'Semimagra'
    },
    AltaEnGrasa: {
      ID: 'AltaEnGrasa',
      KCAL: 0,
      Q: 0,
      LABEL: 'Alta en Grasa'
    },
    Grasas: {
      ID: 'Grasas',
      KCAL: 0,
      Q: 0,
      LABEL: 'Grasas'
    }
  })
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const information = e.target.id.split('-')
    if (information.length > 0) {
      let newInfo = { ...formValue }
      switch (information[0]) {
        case 'Frutas':
          if (information[1] === 'Q') {
            newInfo.Frutas.Q = parseInt(e.target.value)
          } else {
            newInfo.Frutas.KCAL = parseInt(e.target.value)
          }
          break
        case 'Vegetales':
          if (information[1] === 'Q') {
            newInfo.Vegetales.Q = parseInt(e.target.value)
          } else {
            newInfo.Vegetales.KCAL = parseInt(e.target.value)
          }
          break
        case 'Lacteos':
          if (information[1] === 'Q') {
            newInfo.Lacteos.Q = parseInt(e.target.value)
          } else {
            newInfo.Lacteos.KCAL = parseInt(e.target.value)
          }
          break
        case 'Descremada':
          if (information[1] === 'Q') {
            newInfo.Descremada.Q = parseInt(e.target.value)
          } else {
            newInfo.Descremada.KCAL = parseInt(e.target.value)
          }
          break
        case 'Semidescremada':
          if (information[1] === 'Q') {
            newInfo.Semidescremada.Q = parseInt(e.target.value)
          } else {
            newInfo.Semidescremada.KCAL = parseInt(e.target.value)
          }
          break
        case 'Entera':
          if (information[1] === 'Q') {
            newInfo.Entera.Q = parseInt(e.target.value)
          } else {
            newInfo.Entera.KCAL = parseInt(e.target.value)
          }
          break
        case 'Chos':
          if (information[1] === 'Q') {
            newInfo.Chos.Q = parseInt(e.target.value)
          } else {
            newInfo.Chos.KCAL = parseInt(e.target.value)
          }
          break
        case 'Harinas':
          if (information[1] === 'Q') {
            newInfo.Harinas.Q = parseInt(e.target.value)
          } else {
            newInfo.Harinas.KCAL = parseInt(e.target.value)
          }
          break
        case 'MuyMagra':
          if (information[1] === 'Q') {
            newInfo.MuyMagra.Q = parseInt(e.target.value)
          } else {
            newInfo.MuyMagra.KCAL = parseInt(e.target.value)
          }
          break
        case 'Magra':
          if (information[1] === 'Q') {
            newInfo.Magra.Q = parseInt(e.target.value)
          } else {
            newInfo.Magra.KCAL = parseInt(e.target.value)
          }
          break
        case 'SemiMagra':
          if (information[1] === 'Q') {
            newInfo.SemiMagra.Q = parseInt(e.target.value)
          } else {
            newInfo.SemiMagra.KCAL = parseInt(e.target.value)
          }
          break
        case 'AltaEnGrasa':
          if (information[1] === 'Q') {
            newInfo.AltaEnGrasa.Q = parseInt(e.target.value)
          } else {
            newInfo.AltaEnGrasa.KCAL = parseInt(e.target.value)
          }
          break
        case 'Grasas':
          if (information[1] === 'Q') {
            newInfo.Grasas.Q = parseInt(e.target.value)
          } else {
            newInfo.Grasas.KCAL = parseInt(e.target.value)
          }
          break
      }
      setFormValue({ ...newInfo })
    }
  }
  const GetOptions = (information: CalculoDietaType) => {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={2}>
          <InputLabel id='demo-simple-select-label'>{information.LABEL}</InputLabel>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label='Q'
            value={information.Q}
            id={`${information.ID}-Q`}
            placeholder={information.LABEL}
            defaultValue='0'
            onChange={HandleChange}
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label='Kcal'
            value={information.KCAL}
            id={`${information.ID}-Kcal`}
            placeholder={information.LABEL}
            defaultValue='0'
            onChange={HandleChange}
            type='number'
          />
        </Grid>
      </React.Fragment>
    )
  }

  const Execute = () => {

  }

  const Delete =() => {
    
  }
  return (
    <CardContent>
      <Grid container spacing={7}>
        {GetOptions(formValue.Frutas)}
        {GetOptions(formValue.Vegetales)}
        {GetOptions(formValue.Lacteos)}
        {GetOptions(formValue.Descremada)}
        {GetOptions(formValue.Semidescremada)}
        {GetOptions(formValue.Entera)}
        {GetOptions(formValue.Chos)}
        {GetOptions(formValue.Harinas)}
        {GetOptions(formValue.MuyMagra)}
        {GetOptions(formValue.Magra)}
        {GetOptions(formValue.SemiMagra)}
        {GetOptions(formValue.AltaEnGrasa)}
      </Grid>
      <Grid item xs={12} sm={12}>
        <hr></hr>
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
    </CardContent>
  )
}

export default RegistroConsumoUsual
