import { useEffect } from 'react'
// ** Loader Import
import NProgress from 'nprogress'

// ** React Imports
import { ChangeEvent, forwardRef, MouseEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import cogoToast from "cogo-toast";
// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Types Imports
import { Usuario } from 'src/Types/Types'
import { ButtonGroup } from '@mui/material'

//** Custom Hooks */
import MAINURL from "src/@core/lib/settings"
import useApi from 'src/@core/hooks/useApi'

interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutUsuarios = () => {
  //Axios Call
  const CreateUserCall = useApi({
    config: {
      url: `${MAINURL}/api/addUser`,
      method: "POST",
    },
    shouldFire: false,
  });
  // ** States
  const [language, setLanguage] = useState<string[]>([])
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [values, setValues] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const [usuario, setUsuario] = useState<Usuario>({
    _id: '',
    Nombre: '',
    Apellido: '',
    Sexo: '',
    FechaNacimiento: new Date(),
    Email: '',
    Telefono: '',
    Ocupacion:"",
  })

  // Handle Password
  const handlePasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }
  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  //Handle CHange form
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsuario((state:any) => ({
      ...state,
      [e.target.id]: e.target.value
    }))
  }
  const HandleChangeSelect = (e: SelectChangeEvent<string>) => {
    setUsuario((state:any) => ({
      ...state,
      Sexo: e.target.value
    }))
  }

  const HandleChangeDate = (inputDate: Date | null) => {
    setUsuario((state:any) => ({
      ...state,
      FechaNacimiento: inputDate
    }))
  }

  const ResetForm = () => {
    setUsuario({
      _id: '',
      Nombre: '',
      Apellido: '',
      Sexo: '',
      FechaNacimiento: new Date(),
      Email: '',
      Telefono: '',
      Ocupacion:'',
    })
  }

  const executeCall = () => {    
    CreateUserCall.setParameters((state) => ({
      ...state,
      data: { ...usuario },
    }));    
    NProgress.start();
    CreateUserCall.setFire(true);

  };

  useEffect(() => {
    if (CreateUserCall.dataReady) {
      cogoToast.success("Usuario Registrado", { position: "top-right" });
      ResetForm()
      NProgress.done()
    }
  }, [CreateUserCall.isLoading]);

  return (
    <Card>
      <CardHeader title='Registrar Nuevo Usuario' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Información Personal
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Nombre'
                placeholder='Nombre'
                id='Nombre'
                value={usuario.Nombre}
                onChange={e => HandleChange(e)}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Apellido'
                placeholder='Apellido'
                id='Apellido'
                value={usuario.Apellido}
                onChange={e => HandleChange(e)}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                onChange={e => HandleChange(e)}
                id='Email'
                value={usuario.Email}
                label='Email'
                placeholder='carterleonard@gmail.com'
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Sexo</InputLabel>
                <Select
                  label='Sexo'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  value={usuario.Sexo}
                  onChange={e => HandleChangeSelect(e)}
                >
                  <MenuItem value='Masculino'>Masculino</MenuItem>
                  <MenuItem value='Femenino'>Femenino</MenuItem>
                  <MenuItem value='NA'>NA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={usuario.FechaNacimiento}
                showYearDropdown
                showMonthDropdown
                placeholderText='DD-MM-YYYY'
                dateFormat={'dd-MM-yyyy'}
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={date => HandleChangeDate(date)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Ocupacion'
                placeholder='Ocupacion'
                id='Ocupacion'
                value={usuario.Ocupacion}
                onChange={e => HandleChange(e)}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Telefono'
                placeholder='Telefono'
                id='Telefono'
                value={usuario.Telefono}
                onChange={e => HandleChange(e)}
                autoComplete='off'
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <ButtonGroup>
            <Button fullWidth onClick={executeCall} sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
            <Button fullWidth color='secondary' variant='outlined' onClick={ResetForm}>
              Cancel
            </Button>
          </ButtonGroup>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutUsuarios
