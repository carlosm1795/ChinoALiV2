import { Button } from '@mui/material'
import React from 'react'
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
  return (
    <Table data={DATA} autoHeight={true}>
      <Column align='center' fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey='id' />
      </Column>
      <Column fixed>
        <HeaderCell>Dato</HeaderCell>
        <Cell dataKey='dato' />
      </Column>
      <Column>
        <HeaderCell><Button variant="contained" onClick={() => alert("Hola mundo1")}>Ejemplo</Button></HeaderCell>
        <Cell dataKey='dato1' />
      </Column>
      <Column>
        <HeaderCell><Button variant="contained" onClick={() => alert("Hola mundo2")}>Ejemplo</Button></HeaderCell>
        <Cell dataKey='dato2' />
      </Column>
      <Column>
        <HeaderCell><Button variant="contained" onClick={() => alert("Hola mundo3")}>Ejemplo</Button></HeaderCell>
        <Cell dataKey='dato3' />
      </Column>
      <Column>
        <HeaderCell><Button variant="contained" onClick={() => alert("Hola mundo4")}>Ejemplo</Button></HeaderCell>
        <Cell dataKey='dato4' />
      </Column>     
    </Table>
  )
}

export default TestingTable
