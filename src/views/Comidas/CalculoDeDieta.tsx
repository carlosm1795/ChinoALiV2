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
import { info } from 'console'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha de Medicion' autoComplete='off' />
})

const CalculoDeDieta = () => {
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
    Cerelaes: {
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
      ID: 'Carne Magra'
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

  const GetCurrentValue = (id: string) => {
    switch (id) {
      case 'Frutas':
        return formValue.Frutas
      case 'Vegetales':
        return formValue.Vegetales
      case 'Lacteos0':
        return formValue.Lacteos0
      case 'Lacteos2':
        return formValue.Lacteos2
      case 'Azucares':
        return formValue.Azucares
      case 'Cerelaes':
        return formValue.Cerelaes
      case 'CarneMagra':
        return formValue.CarneMagra
      case 'CarneSemi':
        return formValue.CarneSemi
      case 'Grasas':
        return formValue.Grasas
    }
  }
  const GetCurrentLabel = (id: string) => {
    switch (id) {
      case 'Frutas':
        return formValue.Frutas.LABEL
      case 'Vegetales':
        return formValue.Vegetales.LABEL
      case 'Lacteos0':
        return formValue.Lacteos0.LABEL
      case 'Lacteos2':
        return formValue.Lacteos2.LABEL
      case 'Azucares':
        return formValue.Azucares.LABEL
      case 'Cerelaes':
        return formValue.Cerelaes.LABEL
      case 'CarneMagra':
        return formValue.CarneMagra.LABEL
      case 'CarneSemi':
        return formValue.CarneSemi.LABEL
      case 'Grasas':
        return formValue.Grasas.LABEL
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
            id='Peso Actual'
            placeholder={information.LABEL}
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label='CHO'
            value={information.CHO}
            id='Peso Actual'
            placeholder={information.LABEL}
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label='CHON'
            value={information.CHON}
            id='Peso Actual'
            placeholder={information.LABEL}
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label='Grasa'
            value={information.GRASA}
            id='Peso Actual'
            placeholder={information.LABEL}
            defaultValue='0'
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label='Kcal'
            value={information.KCAL}
            id='Peso Actual'
            placeholder={information.LABEL}
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
        {
          GetOPtions(formValue.Frutas)
        }
        {
          GetOPtions(formValue.Vegetales)
        }
        {
          GetOPtions(formValue.Lacteos0)
        }
        {
          GetOPtions(formValue.Lacteos2)
        }
        {
          GetOPtions(formValue.Azucares)
        }
        {
          GetOPtions(formValue.Cerelaes)
        }
        {
          GetOPtions(formValue.CarneMagra)
        }
        {
          GetOPtions(formValue.CarneSemi)
        }
        {
          GetOPtions(formValue.Grasas)
        }
      </Grid>
    </CardContent>
  )
}

export default CalculoDeDieta
