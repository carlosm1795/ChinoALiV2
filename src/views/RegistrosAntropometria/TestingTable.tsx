import { Button } from '@mui/material'
import React,{useState} from 'react'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
const TestingTable = () => {
  const DATA = [
    {
      id: 1,
      dato: 'IMC',
      dat1: 'IMC',
      dato2: 'IMC',
      dato3: 'IMC',
      dato4: 'IMC',
      value: 20
    },
    {
      id: 2,
      dato: 'I',
      dat1: 'IMC',
      dato2: 'IMC',
      dato3: 'IMC',
      dato4: 'IMC',
      value: 21
    },
    {
      id: 3,
      dato: 'asd',
      dat1: 'IMC',
      dato2: 'IMC',
      dato3: 'IMC',
      dato4: 'IMC',
      value: 80
    }
  ]
  const [total,setTotal] = useState(0)
  const Fechas = ['1/1/2020', '1/1/2021','1/1/2022','1/1/2023','1/1/2024']
  const Data2:any = [
    {
      total: 0,
      label: 'Peso Actual',
      '1/1/2020': 80,
      '1/1/2021': 90,
      '1/1/2022': 100,
      '1/1/2023': 110,
      '1/1/2024': 120
    },
    {
        total: 0,
        label: 'IMC',
        '1/1/2020': 70,
        '1/1/2021': 80,
        '1/1/2022': 90,
        '1/1/2023': 110,
        '1/1/2024': 120
      }
  ]
  const Calculate = (value:string) => {
    console.log(Data2[0][`${value}`])
    setTotal(total+parseInt(Data2[0][`${value}`]))
    alert(total+parseInt(Data2[0][`${value}`]))
  }
  return (
    <Table data={Data2} autoHeight={true}>
      <Column align='center' fixed flexGrow={1}>
        <HeaderCell>Total</HeaderCell>
        <Cell dataKey='total' />
      </Column>
      <Column fixed width={100} flexGrow={2}>
        <HeaderCell>Dato</HeaderCell>
        <Cell dataKey='label' />
      </Column>
      {Fechas.map((row: any) => (        
        <Column>
          <HeaderCell>
            <Button onClick={() => Calculate(row)}>{row}</Button>
          </HeaderCell>
          <Cell dataKey={`${row}`} />          
        </Column>                
      ))}
      
      {/*
      <Column>
        <HeaderCell><Button  onClick={() => alert("Hola mundo2")}>Ejemplo</Button></HeaderCell>
        <Cell dataKey='dato2' />
      </Column>
      <Column>
        <HeaderCell><Button  onClick={() => alert("Hola mundo3")}>Ejemplo</Button></HeaderCell>
        <Cell dataKey='dato3' />
      </Column>
      <Column>
        <HeaderCell><Button  onClick={() => alert("Hola mundo4")}>Ejemplo</Button></HeaderCell>
        <Cell dataKey='dato4' />
      </Column>      */}
    </Table>
  )
}

export default TestingTable
