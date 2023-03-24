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
import MAINURL from 'src/@core/lib/settings'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { EvaluacionClinica, RegistroDeComidas, ConsumoUsual, ConsumoUsualType } from 'src/Types/Types'
import { ButtonGroup } from '@mui/material'
import { BriefcaseClock } from 'mdi-material-ui'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha de Medicion' autoComplete='off' />
})

const CalculoDeDieta = () => {
  const [dateRegistroDieta,setDateRegistroDieta] = useState<Array<ConsumoUsual>>([])
  const state = useSelector((state: State) => state)
  const [formValue, setFormValue] = useState<ConsumoUsual>({
    _id: '',
    Fecha: new Date(),
    Usuario: '',
    Azucares: {
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0,
      Q: 0,
      LABEL: 'Azúcares',
      ID: 'Azucares'
    },
    Frutas: {
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0,
      Q: 0,
      LABEL: 'Frutas',
      ID: 'Frutas'
    },
    Vegetales: {
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0,
      Q: 0,
      LABEL: 'Vegetales',
      ID: 'Vegetales'
    },
    Lacteos0: {
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0,
      Q: 0,
      LABEL: 'Lácteos 0%',
      ID: 'Lacteos0'
    },
    Lacteos2: {
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0,
      Q: 0,
      LABEL: 'Lácteos 2%',
      ID: 'Lacteos2'
    },
    Cereales: {
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0,
      Q: 0,
      LABEL: 'Cereales',
      ID: 'Cereales'
    },
    CarneMagra: {
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0,
      Q: 0,
      LABEL: 'Carne Magra',
      ID: 'CarneMagra'
    },
    CarneSemi: {
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0,
      Q: 0,
      LABEL: 'Carne Semi',
      ID: 'CarneSemi'
    },
    Grasas: {
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0,
      Q: 0,
      LABEL: 'Grasas',
      ID: 'Grasas'
    }
  })

  const [Total, setTotal] = useState({
    Q: 0,
    CHO: 0,
    CHON: 0,
    GRASA: 0,
    KCAL: 0
  })
  const [Adecuacion, setAdecuacion] = useState({
    Q: 0,
    CHO: 0,
    CHON: 0,
    GRASA: 0,
    KCAL: 0
  })

  const InsertCall = useApi({
    config: {
      url: `${MAINURL}/api/addCalculoDeDieta`,
      method: 'POST'
    },
    shouldFire: false
  })

  const UpdateCall = useApi({
    config: {
      url: `${MAINURL}/api/updateDieta`,
      method: 'POST'
    },
    shouldFire: false
  })

  const DeleteCall = useApi({
    config: {
      url: `${MAINURL}/api/deleteDieta`,
      method: 'POST'
    },
    shouldFire: false
  })

  const GetDateRegistrosCall = useApi({
    config: {
      url: `${MAINURL}/api/getCalculoDeDieta`,
      method: 'POST'
    },
    shouldFire: false
  })

  const ResetForm = () => {
    setFormValue({
      _id: '',
      Fecha: new Date(),
      Usuario: '',
      Azucares: {
        CHO: 0,
        CHON: 0,
        GRASA: 0,
        KCAL: 0,
        Q: 0,
        LABEL: 'Azúcares',
        ID: 'Azucares'
      },
      Frutas: {
        CHO: 0,
        CHON: 0,
        GRASA: 0,
        KCAL: 0,
        Q: 0,
        LABEL: 'Frutas',
        ID: 'Frutas'
      },
      Vegetales: {
        CHO: 0,
        CHON: 0,
        GRASA: 0,
        KCAL: 0,
        Q: 0,
        LABEL: 'Vegetales',
        ID: 'Vegetales'
      },
      Lacteos0: {
        CHO: 0,
        CHON: 0,
        GRASA: 0,
        KCAL: 0,
        Q: 0,
        LABEL: 'Lácteos 0%',
        ID: 'Lacteos0'
      },
      Lacteos2: {
        CHO: 0,
        CHON: 0,
        GRASA: 0,
        KCAL: 0,
        Q: 0,
        LABEL: 'Lácteos 2%',
        ID: 'Lacteos2'
      },
      Cereales: {
        CHO: 0,
        CHON: 0,
        GRASA: 0,
        KCAL: 0,
        Q: 0,
        LABEL: 'Cereales',
        ID: 'Cereales'
      },
      CarneMagra: {
        CHO: 0,
        CHON: 0,
        GRASA: 0,
        KCAL: 0,
        Q: 0,
        LABEL: 'Carne Magra',
        ID: 'CarneMagra'
      },
      CarneSemi: {
        CHO: 0,
        CHON: 0,
        GRASA: 0,
        KCAL: 0,
        Q: 0,
        LABEL: 'Carne Semi',
        ID: 'CarneSemi'
      },
      Grasas: {
        CHO: 0,
        CHON: 0,
        GRASA: 0,
        KCAL: 0,
        Q: 0,
        LABEL: 'Grasas',
        ID: 'Grasas'
      }
    })
    setAdecuacion({
      Q: 0,
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0
    })
    setTotal({
      Q: 0,
      CHO: 0,
      CHON: 0,
      GRASA: 0,
      KCAL: 0
    })
  }

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const information = e.target.id.split('-')
    if (information.length > 0) {
      let newInfo = { ...formValue }
      switch (information[0]) {
        case 'Azucares':
          newInfo.Azucares = UpdateValue(newInfo.Azucares, parseInt(e.target.value), information[1])
          newInfo.Azucares.CHO = parseInt(e.target.value) * 5
          newInfo.Azucares.KCAL = parseInt(e.target.value) * 20
          break
        case 'Frutas':
          newInfo.Frutas = UpdateValue(newInfo.Frutas, parseInt(e.target.value), information[1])
          newInfo.Frutas.KCAL = parseInt(e.target.value) * 60
          break
        case 'Vegetales':
          newInfo.Vegetales = UpdateValue(newInfo.Vegetales, parseInt(e.target.value), information[1])
          newInfo.Vegetales.CHO = parseInt(e.target.value) * 5
          newInfo.Vegetales.CHON = parseInt(e.target.value) * 2
          newInfo.Vegetales.KCAL = parseInt(e.target.value) * 25
          break
        case 'Lacteos0':
          newInfo.Lacteos0 = UpdateValue(newInfo.Lacteos0, parseInt(e.target.value), information[1])
          newInfo.Lacteos0.CHO = parseInt(e.target.value) * 12
          newInfo.Lacteos0.CHON = parseInt(e.target.value) * 8
          newInfo.Lacteos0.KCAL = parseInt(e.target.value) * 90
          break
        case 'Lacteos2':
          newInfo.Lacteos2 = UpdateValue(newInfo.Lacteos2, parseInt(e.target.value), information[1])
          newInfo.Lacteos2.CHO = parseInt(e.target.value) * 12
          newInfo.Lacteos2.CHON = parseInt(e.target.value) * 8
          newInfo.Lacteos2.GRASA = parseInt(e.target.value) * 5
          newInfo.Lacteos2.KCAL = parseInt(e.target.value) * 120
          break
        case 'Cereales':
          newInfo.Cereales = UpdateValue(newInfo.Cereales, parseInt(e.target.value), information[1])
          newInfo.Cereales.CHO = parseInt(e.target.value) * 15
          newInfo.Cereales.CHON = parseInt(e.target.value) * 3
          newInfo.Cereales.GRASA = parseInt(e.target.value) * 1
          newInfo.Cereales.KCAL = parseInt(e.target.value) * 80
          break
        case 'CarneMagra':
          newInfo.CarneMagra = UpdateValue(newInfo.CarneMagra, parseInt(e.target.value), information[1])
          newInfo.CarneMagra.CHON = parseInt(e.target.value) * 7
          newInfo.CarneMagra.GRASA = parseInt(e.target.value) * 3
          newInfo.CarneMagra.KCAL = parseInt(e.target.value) * 55
          break
        case 'CarneSemi':
          newInfo.CarneSemi = UpdateValue(newInfo.CarneSemi, parseInt(e.target.value), information[1])
          newInfo.CarneSemi.CHON = parseInt(e.target.value) * 7
          newInfo.CarneSemi.GRASA = parseInt(e.target.value) * 5
          newInfo.CarneSemi.KCAL = parseInt(e.target.value) * 75
          break
        case 'Grasas':
          newInfo.Grasas = UpdateValue(newInfo.Grasas, parseInt(e.target.value), information[1])
          newInfo.Grasas.GRASA = parseInt(e.target.value) * 5
          newInfo.Grasas.KCAL = parseInt(e.target.value) * 45
          break
      }
      setFormValue({ ...newInfo })
    }
  }

  const UpdateValue = (info: ConsumoUsualType, newValue: number, updateValue: string) => {
    switch (updateValue) {
      case 'Q':
        info.Q = newValue
        break
      case 'CHON':
        info.CHON = newValue
        break
      case 'CHO':
        info.CHO = newValue
        break
      case 'GRASA':
        info.GRASA = newValue
        break
      case 'KCAL':
        info.KCAL = newValue
        break
    }
    return info
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

  useEffect(() => {
    let newValues = { ...Total }
    newValues.Q =
      formValue.Azucares.Q +
      formValue.CarneMagra.Q +
      formValue.CarneSemi.Q +
      formValue.Cereales.Q +
      formValue.Frutas.Q +
      formValue.Grasas.Q +
      formValue.Lacteos0.Q +
      formValue.Lacteos2.Q +
      formValue.Vegetales.Q
    newValues.CHO =
      formValue.Azucares.CHO +
      formValue.CarneMagra.CHO +
      formValue.CarneSemi.CHO +
      formValue.Cereales.CHO +
      formValue.Frutas.CHO +
      formValue.Grasas.CHO +
      formValue.Lacteos0.CHO +
      formValue.Lacteos2.CHO +
      formValue.Vegetales.CHO
    newValues.CHON =
      formValue.Azucares.CHON +
      formValue.CarneMagra.CHON +
      formValue.CarneSemi.CHON +
      formValue.Cereales.CHON +
      formValue.Frutas.CHON +
      formValue.Grasas.CHON +
      formValue.Lacteos0.CHON +
      formValue.Lacteos2.CHON +
      formValue.Vegetales.CHON
    newValues.GRASA =
      formValue.Azucares.GRASA +
      formValue.CarneMagra.GRASA +
      formValue.CarneSemi.GRASA +
      formValue.Cereales.GRASA +
      formValue.Frutas.GRASA +
      formValue.Grasas.GRASA +
      formValue.Lacteos0.GRASA +
      formValue.Lacteos2.GRASA +
      formValue.Vegetales.GRASA
    newValues.KCAL =
      formValue.Azucares.KCAL +
      formValue.CarneMagra.KCAL +
      formValue.CarneSemi.KCAL +
      formValue.Cereales.KCAL +
      formValue.Frutas.KCAL +
      formValue.Grasas.KCAL +
      formValue.Lacteos0.KCAL +
      formValue.Lacteos2.KCAL +
      formValue.Vegetales.KCAL
    setTotal({ ...newValues })

    let newAdecuacion = { ...Adecuacion }
    newAdecuacion.CHO = Math.trunc((newValues.CHO / ((1300 * 0.2) / 4)) * 100)
    newAdecuacion.CHON = Math.trunc((newValues.CHON / ((1300 * 0.5) / 4)) * 100)
    newAdecuacion.GRASA = Math.trunc((newValues.GRASA / ((1300 * 0.3) / 9)) * 100)
    newAdecuacion.KCAL = Math.trunc((newValues.KCAL / 1300) * 100)

    setAdecuacion({ ...newAdecuacion })
  }, [formValue])

  useEffect(() => {
    if (InsertCall.dataReady || UpdateCall.dataReady) {
      cogoToast.success('Dato Registrado', { position: 'top-right' })
      ResetForm()
    }
    NProgress.done()
  }, [InsertCall.isLoading, UpdateCall.isLoading])

  useEffect(() => {
    if (GetDateRegistrosCall.dataReady) {
      if (GetDateRegistrosCall.data.length > 0) {
        setDateRegistroDieta(GetDateRegistrosCall.data)
      }
    }
    NProgress.done()
  }, [GetDateRegistrosCall.isLoading])

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

  const GetAdecuacion = () => {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={2}>
          <InputLabel id='demo-simple-select-label'>Total</InputLabel>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label='Q' value={Adecuacion.Q} defaultValue='0' disabled type='number' />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label='CHO' value={Adecuacion.CHO} defaultValue='0' disabled type='number' />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label='CHON' value={Adecuacion.CHON} defaultValue='0' disabled type='number' />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label='Grasa' value={Adecuacion.GRASA} defaultValue='0' disabled type='number' />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label='Kcal' value={Adecuacion.KCAL} defaultValue='0' disabled type='number' />
        </Grid>
      </React.Fragment>
    )
  }
  const GetTotal = () => {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={2}>
          <InputLabel id='demo-simple-select-label'>Total</InputLabel>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label='Q' value={Total.Q} defaultValue='0' disabled type='number' />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label='CHO' value={Total.CHO} defaultValue='0' disabled type='number' />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label='CHON' value={Total.CHON} defaultValue='0' disabled type='number' />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label='Grasa' value={Total.GRASA} defaultValue='0' disabled type='number' />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField fullWidth label='Kcal' value={Total.KCAL} defaultValue='0' disabled type='number' />
        </Grid>
      </React.Fragment>
    )
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
  const GetOPtions = (information: ConsumoUsualType) => {
    return (
      <React.Fragment>        
        <Grid item xs={12} sm={2}>
          <InputLabel id='demo-simple-select-label'>{information.LABEL}</InputLabel>
        </Grid>
        <Grid item xs={12} sm={2}>
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
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label='CHO'
            value={information.CHO}
            id={`${information.ID}-CHO`}
            placeholder={information.LABEL}
            onChange={HandleChange}
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label='CHON'
            value={information.CHON}
            id={`${information.ID}-CHON`}
            placeholder={information.LABEL}
            onChange={HandleChange}
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label='Grasa'
            value={information.GRASA}
            id={`${information.ID}-GRASA`}
            placeholder={information.LABEL}
            onChange={HandleChange}
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label='Kcal'
            value={information.KCAL}
            id={`${information.ID}-KCAL`}
            placeholder={information.LABEL}
            onChange={HandleChange}
            defaultValue='0'
            type='number'
          />
        </Grid>
      </React.Fragment>
    )
  }
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
        {GetOPtions(formValue.Frutas)}
        {GetOPtions(formValue.Vegetales)}
        {GetOPtions(formValue.Lacteos0)}
        {GetOPtions(formValue.Lacteos2)}
        {GetOPtions(formValue.Azucares)}
        {GetOPtions(formValue.Cereales)}
        {GetOPtions(formValue.CarneMagra)}
        {GetOPtions(formValue.CarneSemi)}
        {GetOPtions(formValue.Grasas)}
        {GetTotal()}
        {GetAdecuacion()}
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

export default CalculoDeDieta
