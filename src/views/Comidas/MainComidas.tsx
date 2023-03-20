// ** React Imports
import React, { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import Nutrition from 'mdi-material-ui/Nutrition'
import FormatListNumberedRtl from 'mdi-material-ui/FormatListNumberedRtl'
import Calculator from 'mdi-material-ui/Calculator'
import CalculoDeDieta from './CalculoDeDieta'
import RegistroConsumoUsual from './RegistroConsumoUsual'
import ComidasForm from './ComidasForm'


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

const MainComidas = () => {
      // ** State
  const [value, setValue] = useState<string>('account')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
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
                <Nutrition />
                <TabName>Tiempos De Comida</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormatListNumberedRtl />
                <TabName>Calculo de Dieta</TabName>
              </Box>
            }
          />  
          <Tab
            value='consumo'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Calculator />
                <TabName>Consumo Usual</TabName>
              </Box>
            }
          />         
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <ComidasForm/>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <CalculoDeDieta/>
        </TabPanel>        
        <TabPanel sx={{ p: 0 }} value='consumo'>
          <RegistroConsumoUsual/>
        </TabPanel>        
      </TabContext>
    </Card>
  )
}

export default MainComidas

