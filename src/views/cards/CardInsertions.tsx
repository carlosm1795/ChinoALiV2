// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import FoodForkDrink from 'mdi-material-ui/FoodForkDrink'
import HumanMaleHeight from 'mdi-material-ui/HumanMaleHeight'
import TestTube from 'mdi-material-ui/TestTube'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import MainAntropometria from 'src/views/RegistrosAntropometria/MainAntropometria'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'
import MainEvaluacionClinica from 'src/views/EvaluacionClinica/MainEvaluacionClinica'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import MainComidas from '../Comidas/MainComidas'

import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from 'src/@core/state'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const CardInsertions = () => {
  const state = useSelector((state: State) => state)
  const [value, setValue] = useState<string>('account')
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <>
      {state.ChangeOnUser !== '' ? (
        <Card>
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label='account-settings tabs'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Tab
                value='account'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HumanMaleHeight />
                    <TabName>RegistroAntropometria</TabName>
                  </Box>
                }
              />
              <Tab
                value='security'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TestTube />
                    <TabName>Evaluación Clínica</TabName>
                  </Box>
                }
              />
              <Tab
                value='info'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FoodForkDrink />
                    <TabName>Comidas</TabName>
                  </Box>
                }
              />
            </TabList>

            <TabPanel sx={{ p: 0 }} value='account'>
              <MainAntropometria />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='security'>
              <MainEvaluacionClinica />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='info'>
              <MainComidas />
            </TabPanel>
          </TabContext>
        </Card>
      ) : null}
    </>
  )
}

export default CardInsertions
