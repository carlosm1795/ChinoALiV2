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
  const state = useSelector((state: State) => state)
  const [dateRegistroDieta,setDateRegistroDieta] = useState<Array<CalculoDeDieta>>([])
  const [qTotal,setQTotal] = useState(0)
  const [KCALTotal,setKCALTotal] = useState(0)
  const InsertCall = useApi({
    config: {
      url: `${MAINURL}api/addConsumo`,
      method: 'POST'
    },
    shouldFire: false
  })

  const UpdateCall = useApi({
    config: {
      url: `${MAINURL}api/updateConsumo`,
      method: 'POST'
    },
    shouldFire: false
  })

  const DeleteCall = useApi({
    config: {
      url: `${MAINURL}api/deleteConsumo`,
      method: 'POST'
    },
    shouldFire: false
  })

  const GetDateRegistrosCall = useApi({
    config: {
      url: `${MAINURL}api/getConsumo`,
      method: 'POST'
    },
    shouldFire: false
  })

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
    if(formValue._id === ""){
      InsertCall.setParameters((info: any) => ({
        ...info,
        data: {
          ...formValue,
          Usuario: state.ChangeOnUser
        }
      }))
      NProgress.start()
      InsertCall.setFire(true)
    }else {
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
    setFormValue({_id: '',
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
    }})
  }

  const HandleChangeSelect = (e: any) => {
    let result: any = null
    if (typeof e.target.value === 'string' || e.target.value !== '') {
      result = dateRegistroDieta.find(
        row => new Date(row.Fecha).toLocaleDateString() === new Date(e.target.value).toLocaleDateString()
      )
    }

    if (result) {
      console.log(result)
      setFormValue({ ...result, Fecha: new Date(result.Fecha) })
    } else {
      ResetForm()
    }
  }
  useEffect(() => {    
    const qTotal = formValue.AltaEnGrasa.Q+formValue.Chos.Q+formValue.Descremada.Q+formValue.Entera.Q+formValue.Frutas.Q+formValue.Grasas.Q+formValue.Harinas.Q+formValue.Lacteos.Q+formValue.Magra.Q+formValue.MuyMagra.Q+formValue.SemiMagra.Q+formValue.Semidescremada.Q+formValue.Vegetales.Q;
    const KCALTotal = formValue.AltaEnGrasa.KCAL+formValue.Chos.KCAL+formValue.Descremada.KCAL+formValue.Entera.KCAL+formValue.Frutas.KCAL+formValue.Grasas.KCAL+formValue.Harinas.KCAL+formValue.Lacteos.KCAL+formValue.Magra.KCAL+formValue.MuyMagra.KCAL+formValue.SemiMagra.KCAL+formValue.Semidescremada.KCAL+formValue.Vegetales.KCAL;
    setQTotal(qTotal)
    setKCALTotal(KCALTotal)
  },[formValue])

  useEffect(() => {
    if (state.ChangeOnUser !== '') {
      console.log("Me ejecute")
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
        setDateRegistroDieta(GetDateRegistrosCall.data)
      }
    }
    NProgress.done()
  }, [GetDateRegistrosCall.isLoading])

  useEffect(() => {
    if (InsertCall.dataReady || UpdateCall.dataReady) {
      cogoToast.success('Dato Registrado', { position: 'top-right' })
      ResetForm()
      GetDateRegistrosCall.setFire(true)
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
            <InputLabel id='demo-simple-select-label'>Fecha</InputLabel>
            <Select
              onChange={e => HandleChangeSelect(e)}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Age'
            >
              <MenuItem value=''>&nbsp;&nbsp;</MenuItem>
              {dateRegistroDieta.map(registro => (
                <MenuItem value={new Date(registro.Fecha).toDateString()}>
                  {new Date(registro.Fecha).toLocaleDateString('es-ES')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
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
        <React.Fragment>
        <Grid item xs={12} sm={2}>
          <InputLabel id='demo-simple-select-label'>Total</InputLabel>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label='Q-Total'
            value={qTotal}
            id={`Total`}
            placeholder={`0`}
            defaultValue='0'            
            type='number'
            disabled={true}            
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label='Kcal-Total'
            value={KCALTotal}            
            id={`Total`}
            placeholder={`0`}
            defaultValue='0'            
            type='number'
            disabled={true}            
          />
        </Grid>
      </React.Fragment>
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
