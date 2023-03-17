import { useState, useEffect } from 'react'
//** State Imports */
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators,State } from 'src/@core/state'
// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

import { SelectOptions,Usuario } from 'src/Types/Types'
import Select, { SingleValue } from 'react-select'

import MAINURL from "src/@core/lib/settings"
import useApi from 'src/@core/hooks/useApi'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  //state
  const [usuarios, setUsuarios] = useState<Array<SelectOptions>>([])
  const dispatch = useDispatch()
  const { ChangeOnUser } = bindActionCreators(actionCreators, dispatch)
  const state = useSelector((state: State) => state)

  const GetUsuariosCall = useApi({
    config: {
      url: `${MAINURL}api/getUser`,
      method: 'GET'
    },
    shouldFire: true
  })

  const UpdateUserSelection = (user: SingleValue<SelectOptions>) => {    
    if(user?.value){

      ChangeOnUser(user?.value)
    }else{
      ChangeOnUser("")
    }
  }

  useEffect(() => {
    if (GetUsuariosCall.dataReady) {
      let options = GetUsuariosCall.data.map((usuario: Usuario) => ({
        label: `${usuario.Nombre} ${usuario.Apellido}`,
        value: usuario._id
      }))
      setUsuarios(options)
    }
  }, [GetUsuariosCall.isLoading])
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
      {hidden ? (
        <IconButton
          color='inherit'
          onClick={toggleNavVisibility}
          sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
        >
          <Menu />
        </IconButton>
      ) : null}
      {/* <TextField
        size='small'
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Magnify fontSize='small' />
            </InputAdornment>
          )
        }}
      /> */}
      <Select
        placeholder='Personas'
        className='basic-single'
        options={usuarios}
        isClearable
        onChange={e => UpdateUserSelection(e)}
      />
    </Box>
    <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>     
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      {/* <NotificationDropdown />
      <UserDropdown /> */}
    </Box>
  </Box>
  )
}

export default AppBarContent
