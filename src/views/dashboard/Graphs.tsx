// ** React Imports
import { ReactElement, useEffect, useState } from 'react'
import { CourierClient } from '@trycourier/courier'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, FormControl, Select, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts'

//** State Imports */
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from 'src/@core/state'
// ** Loader Import
import NProgress from 'nprogress'
// ** Types
import MAINURL from 'src/@core/lib/settings'
import { ThemeColor } from 'src/@core/layouts/types'
import useApi from 'src/@core/hooks/useApi'
import { RegistroAntropometria, Usuario, RegistroAntropometriaValues } from '../../Types/Types'
import { ConvertUSTOCRTime } from 'src/@core/lib/GeneralUtils'

const Graphs = () => {  
  const state = useSelector((state: State) => state)
  const [InitialValueGraph, setInitialValueGraph] = useState('')
  const [EndValueGraph, setEndValueGraph] = useState('')
  const [data, setData] = useState([
    // {
    //   dato: 'Peso Actual',
    //   value: 21,
    //   Grasa: 15,
    //   unidades: 'Kg',
    //   fecha: new Date('2023-03-13T14:34:26.391Z').toLocaleDateString()
    // },
    // {
    //   dato: 'Peso Actual',
    //   value: 110,
    //   Grasa: 15,
    //   unidades: 'Kg',
    //   fecha: new Date('2023-01-13T19:33:49.000Z').toLocaleDateString()
    // },
    // {
    //   dato: 'Peso Actual',
    //   value: 120,
    //   Grasa: 20,
    //   unidades: 'Kg',
    //   fecha: new Date('2020-03-17T22:27:56.000Z').toLocaleDateString()
    // }
  ])
  const [data2, setData2] = useState([
    {
      _id: '640f36d7f3ca65b9313f2a5e',
      FechaMedicion: '2023-03-13T14:34:26.391Z',
      Usuario: '6409fc8c7012e60d494f8056',
      Values: [
        {
          dato: 'Peso Actual',
          value: 21,
          unidades: 'Kg'
        },
        {
          dato: 'Talla',
          value: 172,
          unidades: 'Cm'
        },
        {
          dato: 'IMC',
          value: 23,
          unidades: ''
        },
        {
          dato: 'Cintura',
          value: 24,
          unidades: ''
        },
        {
          dato: 'Cadera',
          value: 25,
          unidades: ''
        },
        {
          dato: 'Muneca',
          value: 26,
          unidades: ''
        },
        {
          dato: 'Constitucion Corporal',
          value: 27,
          unidades: ''
        },
        {
          dato: 'Peso Ideal',
          value: 22,
          unidades: 'Kg'
        },
        {
          dato: '% Peso para la talla',
          value: 28,
          unidades: ''
        },
        {
          dato: 'Peso Ajustado',
          value: 29,
          unidades: ''
        },
        {
          dato: 'Peso Meta',
          value: 30,
          unidades: ''
        },
        {
          dato: '% Grasa Corporal',
          value: 31,
          unidades: ''
        },
        {
          dato: '% Grasa Visceral',
          value: 32,
          unidades: ''
        },
        {
          dato: '% Musculo',
          value: 33,
          unidades: ''
        },
        {
          dato: 'Edad Metabólica',
          value: 34,
          unidades: ''
        }
      ]
    },
    {
      _id: '640f7b11f3ca65b9313f2a63',
      FechaMedicion: '2023-01-13T19:33:49.000Z',
      Usuario: '6409fc8c7012e60d494f8056',
      Values: [
        {
          dato: 'Peso Actual',
          value: 110,
          unidades: 'Kg'
        },
        {
          dato: 'Talla',
          value: 172,
          unidades: 'Cm'
        },
        {
          dato: 'IMC',
          value: 40,
          unidades: ''
        },
        {
          dato: 'Cintura',
          value: 40,
          unidades: ''
        },
        {
          dato: 'Cadera',
          value: 20,
          unidades: ''
        },
        {
          dato: 'Muneca',
          value: 30,
          unidades: ''
        },
        {
          dato: 'Constitucion Corporal',
          value: 31,
          unidades: ''
        },
        {
          dato: 'Peso Ideal',
          value: 80,
          unidades: 'Kg'
        },
        {
          dato: '% Peso para la talla',
          value: 32,
          unidades: ''
        },
        {
          dato: 'Peso Ajustado',
          value: 33,
          unidades: ''
        },
        {
          dato: 'Peso Meta',
          value: 34,
          unidades: ''
        },
        {
          dato: '% Grasa Corporal',
          value: 35,
          unidades: ''
        },
        {
          dato: '% Grasa Visceral',
          value: 36,
          unidades: ''
        },
        {
          dato: '% Musculo',
          value: 37,
          unidades: ''
        },
        {
          dato: 'Edad Metabólica',
          value: 38,
          unidades: ''
        }
      ]
    },
    {
      _id: '6414e991c6e80612561f7517',
      FechaMedicion: '2020-03-17T22:27:56.000Z',
      Usuario: '6409fc8c7012e60d494f8056',
      Values: [
        {
          dato: 'Peso Actual',
          value: 120,
          unidades: 'Kg'
        },
        {
          dato: 'Talla',
          value: 21,
          unidades: 'Cm'
        },
        {
          dato: 'IMC',
          value: 21,
          unidades: ''
        },
        {
          dato: 'Cintura',
          value: 21,
          unidades: ''
        },
        {
          dato: 'Cadera',
          value: 22,
          unidades: ''
        },
        {
          dato: 'Muneca',
          value: 21,
          unidades: ''
        },
        {
          dato: 'Constitucion Corporal',
          value: 22,
          unidades: ''
        },
        {
          dato: 'Peso Ideal',
          value: 110,
          unidades: 'Kg'
        },
        {
          dato: '% Peso para la talla',
          value: 21,
          unidades: ''
        },
        {
          dato: 'Peso Ajustado',
          value: 21,
          unidades: ''
        },
        {
          dato: 'Peso Meta',
          value: 90,
          unidades: ''
        },
        {
          dato: '% Grasa Corporal',
          value: 80,
          unidades: ''
        },
        {
          dato: '% Grasa Visceral',
          value: 12,
          unidades: ''
        },
        {
          dato: '% Musculo',
          value: 12,
          unidades: ''
        },
        {
          dato: 'Edad Metabólica',
          value: 90,
          unidades: ''
        }
      ]
    }
  ])
  const handleChange = (event: SelectChangeEvent<string>) => {
    setInitialValueGraph(event.target.value as string)
  }
  const handleChangeEnd = (event: SelectChangeEvent<string>) => {
    setEndValueGraph(event.target.value as string)
  }

  const ParseInformationForGraph = (data:Array<RegistroAntropometria>) => {
    let finalInformation: any = []
    if(data.length > 0){

      data.forEach(info => {
        let aux: any = { fecha: '' }
        ;(aux.fecha = new Date(info.FechaMedicion).toLocaleDateString()),
          info.Values.forEach(measure => {
            aux[`${measure.dato}`] = measure.value
          })
        finalInformation = [...finalInformation, { ...aux }]
      })
      setData(finalInformation)
    }else{
      setData([])
    }
  }

  const sendNotification = async () => {
    const courier = CourierClient({ authorizationToken: "pk_prod_GSY5W9SVHX4NEKPA658DDC4WKV2A" });
    const { requestId } = await courier.send({
      message: {
        to: [
          {
            email: 'carlos.barboza@mongodb.com',
            data: {
              peso: {
                value: '70',
                unidad: 'Kg'
              }
            }
          }
        ],
        template: 'HQF134X3G14QH8P1K8N9ZPES5K11',
        data: {
          peso: {
            value: '70',
            unidad: 'Kg'
          }
        }
      }
    })
  }

  useEffect(() => {
    if(state.ChangeOnUser === ""){
      setData([])
    }
  },[state.ChangeOnUser])
  useEffect(() => {    
    ParseInformationForGraph(state.UpdateRegistroAntropomoteria)    
  },[state.UpdateRegistroAntropomoteria])
  return (
    <>
    {
      state.ChangeOnUser !== "" ? <Card>
      <CardHeader title='Gráficos' />      
      <Button onClick={sendNotification}>Send Email</Button>

      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Medida</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={InitialValueGraph}
                label='Age'
                onChange={e => handleChange(e)}
              >
                <MenuItem value={'Talla'}>Talla</MenuItem>
                <MenuItem value={'IMC'}>IMC</MenuItem>
                <MenuItem value={'Cintura'}>Cintura</MenuItem>
                <MenuItem value={'Cadera'}>Cadera</MenuItem>
                <MenuItem value={'Muneca'}>Muñeca</MenuItem>
                <MenuItem value={'Constitucion Corporal'}>Cosntitucion Corporal</MenuItem>
                <MenuItem value={'Peso Ideal'}>Peso Ideal</MenuItem>
                <MenuItem value={'Peso Actual'}>Peso Actual</MenuItem>
                <MenuItem value={'% Peso para la talla'}>% Peso para la talla</MenuItem>
                <MenuItem value={'Peso Ajustado'}>Peso Ajustado</MenuItem>
                <MenuItem value={'Peso Meta'}>Peso Meta</MenuItem>
                <MenuItem value={'% Grasa Corporal'}>% Grasa Corporal</MenuItem>
                <MenuItem value={'% Grasa Visceral'}>% Grasa Visceral</MenuItem>
                <MenuItem value={'% Musculo'}>% Musculo</MenuItem>
                <MenuItem value={'Edad Metabólica'}>Edad Metabólica</MenuItem>
              </Select>
            </FormControl>

            <LineChart
              width={500}
              height={400}
              data={data}
              syncId='anyId'
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='fecha' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey={`${InitialValueGraph}`} stroke='#02AAB3' fill='#02AAB3' />
              <Brush />
            </LineChart>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Medida</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={EndValueGraph}
                label='Age'
                onChange={e => handleChangeEnd(e)}
              >
                <MenuItem value={'Talla'}>Talla</MenuItem>
                <MenuItem value={'IMC'}>IMC</MenuItem>
                <MenuItem value={'Cintura'}>Cintura</MenuItem>
                <MenuItem value={'Cadera'}>Cadera</MenuItem>
                <MenuItem value={'Muneca'}>Muñeca</MenuItem>
                <MenuItem value={'Constitucion Corporal'}>Cosntitucion Corporal</MenuItem>
                <MenuItem value={'Peso Ideal'}>Peso Ideal</MenuItem>
                <MenuItem value={'Peso Actual'}>Peso Actual</MenuItem>
                <MenuItem value={'% Peso para la talla'}>% Peso para la talla</MenuItem>
                <MenuItem value={'Peso Ajustado'}>Peso Ajustado</MenuItem>
                <MenuItem value={'Peso Meta'}>Peso Meta</MenuItem>
                <MenuItem value={'% Grasa Corporal'}>% Grasa Corporal</MenuItem>
                <MenuItem value={'% Grasa Visceral'}>% Grasa Visceral</MenuItem>
                <MenuItem value={'% Musculo'}>% Musculo</MenuItem>
                <MenuItem value={'Edad Metabólica'}>Edad Metabólica</MenuItem>
              </Select>
            </FormControl>
            <LineChart
              width={500}
              height={400}
              data={data}
              syncId='anyId'
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='fecha' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey={`${EndValueGraph}`} stroke='#025963' fill='#025963' />
              <Brush />
            </LineChart>
          </Grid>
        </Grid>
      </CardContent>
    </Card> : null
    }
    
    </>
    
  )
}

export default Graphs
