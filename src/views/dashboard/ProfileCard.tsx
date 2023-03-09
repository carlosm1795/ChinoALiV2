// ** React Imports
import { ReactElement, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { HumanMaleHeightVariant,Weight,ArmFlex,TapeMeasure,Numeric } from 'mdi-material-ui'

//** State Imports */
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from 'src/@core/state'
// ** Loader Import
import NProgress from 'nprogress'
// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import useApi from 'src/@core/hooks/useApi'
import { RegistroAntropometria, Usuario, RegistroAntropometriaValues } from '../../Types/Types'
import { ConvertUSTOCRTime } from 'src/@core/lib/GeneralUtils'

const ProfileCard = () => {
  //state
  const dispatch = useDispatch()
  const { ChangeOnUser } = bindActionCreators(actionCreators, dispatch)
  const state = useSelector((state: State) => state)
  const [datoRegistroAntropometrico, setDatoRegistroAntropometrico] = useState<RegistroAntropometria>({
    _id: '',
    FechaMedicion: new Date(),
    Usuario: '',
    Values: []
  })
  const [usuario, setUsuario] = useState<Usuario>({
    _id: '',
    Apellido: '',
    FechaNacimiento: null,
    Nombre: '',
    Sexo: '',
    Email: '',
    Ocupacion: '',
    Telefono: ''
  })

  const GetProfileInformation = useApi({
    config: {
      url: 'http://localhost:3000/api/getProfileInformation',
      method: 'POST'
    },
    shouldFire: false
  })
  const GetLatestRegistroAntropometrico = useApi({
    config: {
      url: 'http://localhost:3000/api/getLatestRegistroAntropometria',
      method: 'POST'
    },
    shouldFire: false
  })

  useEffect(() => {
    if (state.ChangeOnUser !== '') {
      GetProfileInformation.setParameters((info: any) => ({
        ...info,
        data: {
          idUser: state.ChangeOnUser
        }
      }))
      GetProfileInformation.setFire(true)

      GetLatestRegistroAntropometrico.setParameters((info: any) => ({
        ...info,
        data: {
          idUser: state.ChangeOnUser
        }
      }))
      GetLatestRegistroAntropometrico.setFire(true)

      NProgress.start()
    }
  }, [state.ChangeOnUser])

  useEffect(() => {
    if (GetLatestRegistroAntropometrico.dataReady) {
      NProgress.done()
      setDatoRegistroAntropometrico(GetLatestRegistroAntropometrico.data[0])
    }
  }, [GetLatestRegistroAntropometrico.isLoading])

  useEffect(() => {
    if (GetProfileInformation.dataReady) {
      NProgress.done()
      setUsuario(GetProfileInformation.data[0])
    }
  }, [GetProfileInformation.isLoading])

  const CalculateAge = (birth: string | undefined) => {    
    let result = ''
    if (birth) {
      var dob = new Date(birth)
      var month_diff = Date.now() - dob.getTime()
      var age_dt = new Date(month_diff)
      var year = age_dt.getUTCFullYear()
      var age = Math.abs(year - 1970)
      result = `${age} años`
    }
    return result
  }

  const GetIcon = (value: string) => {
    switch (value) {
      case 'Talla':
        return <HumanMaleHeightVariant sx={{ fontSize: '1.75rem' }} />
      case 'Peso Actual':
        return <Weight sx={{ fontSize: '1.75rem' }} />
      case 'IMC':
        return <ArmFlex sx={{ fontSize: '1.75rem' }} />
      case 'Cintura':
        return <TapeMeasure sx={{ fontSize: '1.75rem' }} />
      case 'Cadera':
        return <TapeMeasure sx={{ fontSize: '1.75rem' }} />
      case 'Muneca':
        return <TapeMeasure sx={{ fontSize: '1.75rem' }} />
      case 'Constitucion Corporal':
        return <ArmFlex sx={{ fontSize: '1.75rem' }} />
      case 'Peso Ideal':
        return <Weight sx={{ fontSize: '1.75rem' }} />
      case '% Peso para la talla':
        return <HumanMaleHeightVariant sx={{ fontSize: '1.75rem' }} />
      case 'Peso Ajustado':
        return <Weight sx={{ fontSize: '1.75rem' }} />
        case 'Peso Meta':
          return <Weight sx={{ fontSize: '1.75rem' }} />
      default:
        return <Numeric sx={{ fontSize: '1.75rem' }} />
    }
  }
  const renderStats = (datos: RegistroAntropometria) => {    
    if(datos){

      return datos.Values.map((item: RegistroAntropometriaValues, index: number) => (
        <Grid item xs={12} sm={3} key={index}>
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: `primary.main`
              }}
            >
              {GetIcon(item.dato)}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>{item.dato}</Typography>
              <Typography variant='h6'>
                {item.value}
                {item.unidades}
              </Typography>
            </Box>            
          </Box>
        </Grid>
      ))
    }else{
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Usuario sin registros</Typography>              
            </Box>
      )
    }
  }
  return (
    <>
      {state.ChangeOnUser === '' ? (
        <Card>
          <CardHeader title='Favor Seleccionar un Usuario' />
        </Card>
      ) : null}

      {usuario.Nombre.length > 0 ? (
        <Card>
          <CardHeader
            title={`${usuario.Nombre} ${usuario.Apellido}`}
            subheader={
              <>
                <Typography variant='body2'>
                  <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {`email:${usuario.Email}`}
                  </Box>
                </Typography>
                <Typography variant='body2'>
                  <Box sx={{ fontWeight: 600, color: 'text.primary' }}>{CalculateAge(usuario.FechaNacimiento?.toString())}</Box>
                </Typography>
                {
                  datoRegistroAntropometrico?.FechaMedicion ? ConvertUSTOCRTime(datoRegistroAntropometrico.FechaMedicion.toString()) : null
                }                                          
              </>
            }
          />
          <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
            <Grid container spacing={[5, 0]}>
              {renderStats(datoRegistroAntropometrico)}
            </Grid>
          </CardContent>
        </Card>
      ) : null}
    </>
  )
}

export default ProfileCard
