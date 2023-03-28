import React, { useState, useEffect } from 'react'
// ** MUI Imports
import { Button, Checkbox } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TableContainer from '@mui/material/TableContainer'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell'
import { RegistroAntropometria, RegistroAntropometriaValues } from 'src/Types/Types'
import { Grid } from '@mui/material'
import MAINURL from 'src/@core/lib/settings'
import useApi from 'src/@core/hooks/useApi'
import NProgress from 'nprogress'
import cogoToast from 'cogo-toast'
import { makeStyles } from '@mui/styles'

//** State Imports */

import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from 'src/@core/state'
import TestingTable from './TestingTable'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  sticky: {
    position: 'sticky',
    left: 0
  }
})

const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)<TableRowProps>(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const ComparationResults = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { UpdateRegistroAntropometria } = bindActionCreators(actionCreators, dispatch)
  const state = useSelector((state: State) => state)
  const [typeOfTable, setTypeOfTable] = useState('Lose')

  const [checked, setChecked] = useState({
    min: '',
    max: ''
  })
  const GetDateRegistrosCall = useApi({
    config: {
      url: `${MAINURL}api/GetDateRegistrosAntropometricos`,
      method: 'POST'
    },
    shouldFire: false
  })

  const [bodyRows, setBodyRows] = useState<Array<Array<any>>>([])
  const [secondRows, setSecondRows] = useState<Array<Array<any>>>([])
  const [APIRESPONSE, setAPIRESPONSE] = useState<Array<RegistroAntropometria>>([])

  const Data = [0, 'Peso Actual', '80', '20']
  const Data2 = [0, 'IMC', '80', '20']

  const IAmChecked = (id: string) => {
    if (checked.max === id || checked.min === id) {
      return true
    } else {
      return false
    }
  }
  const HandleButtonSelection = (id: string) => {
    //FUnction must check if value is already in on of the fields if that is the case it must unselect the field.
    //EmptyMax
    //Unselect previous selection
    if (checked.max === id || checked.min === id) {
      if (checked.max === id) {
        setChecked(info => ({
          ...info,
          max: ''
        }))
      }

      if (checked.min === id) {
        setChecked(info => ({
          ...info,
          min: ''
        }))
      }
    } else {
      if (checked.max === '') {
        setChecked(info => ({
          ...info,
          max: id
        }))
      } else {
        //Max Already in place and not seelected
        if (checked.max !== id) {
          if (new Date(checked.max) > new Date(id) && new Date(checked.min) > new Date(id)) {
            setChecked(info => ({
              ...info,
              min: id
            }))
          } else if (new Date(checked.max) < new Date(id)) {
            let aux = new Date(checked.max)
            setChecked(info => ({
              ...info,
              max: id,
              min: aux.toLocaleDateString()
            }))
          }
        }
      }
      if (new Date(checked.max) > new Date(id)) {
        setChecked(info => ({
          ...info,
          min: id
        }))
      }
    }
    //if not selection must check if is max of min and update the value and the previous value put in the other field.
  }
  const HandleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checked.max === '' && e.target.checked) {
      setChecked(info => ({
        ...info,
        max: e.target.id
      }))
    } else if (e.target.checked) {
      //Chang Max To Min
      let maxDate = new Date(checked.max)
      let minDate = new Date(checked.min)
      let currentDate = new Date(e.target.id)
      if (maxDate < currentDate) {
        setChecked(info => ({
          ...info,
          min: maxDate.toLocaleDateString(),
          max: currentDate.toLocaleDateString()
        }))
      } else if (minDate > currentDate || checked.min === '') {
        setChecked(info => ({
          ...info,
          min: currentDate.toLocaleDateString()
        }))
      }
    }

    if (e.target.checked === false) {
      if (checked.max === e.target.id) {
        setChecked(info => ({
          ...info,
          max: ''
        }))
      } else {
        setChecked(info => ({
          ...info,
          min: ''
        }))
      }
    }
  }

  const ParserData = () => {
    let finalResults = []
    if (APIRESPONSE.length > 0) {
      const headers = GetHeader(APIRESPONSE[0].Values)
      let size = APIRESPONSE[0].Values.length
      for (let index = 0; index < size; index++) {
        let aux = [0, headers[index]]
        APIRESPONSE.forEach(response => {
          aux = [...aux, response.Values[index].value]
        })
        finalResults.push(aux)
      }
    }

    let rows: any = []
    finalResults.map(result => {
      rows = [...rows, [...result]]
    })
    setBodyRows(rows)
    setSecondRows(
      rows.filter(
        (row: any) =>
          row[1] !== 'Talla' &&
          row[1] !== 'Muneca' &&
          row[1] !== 'Constitucion Corporal' &&
          row[1] !== 'Peso Ideal' &&
          row[1] !== '% Peso para la talla' &&
          row[1] !== 'Peso Ajustado' &&
          row[1] !== 'Peso Meta'
      )
    )
  }

  const GetHeader = (arrayofValues: Array<RegistroAntropometriaValues>) => {
    return arrayofValues.map(row => row.dato)
  }

  const CalculateValues = () => {
    let maxValue = APIRESPONSE.findIndex(
      row => new Date(row.FechaMedicion).toLocaleDateString() === new Date(checked.max).toLocaleDateString()
    )
    let minValue = APIRESPONSE.findIndex(
      row => new Date(row.FechaMedicion).toLocaleDateString() === new Date(checked.min).toLocaleDateString()
    )
    let copyBodyRows = [...bodyRows]

    copyBodyRows.forEach(row => {
      if (!isNaN(row[maxValue + 2]) && !isNaN(row[minValue + 2])) {
        row[0] = row[maxValue + 2] - row[minValue + 2]
      } else {
        row[0] = 0
      }
    })

    setBodyRows(copyBodyRows)
  }

  const handleChangeRadioGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeOfTable((event.target as HTMLInputElement).value)
  }

  useEffect(() => {
    if (bodyRows.length > 0) {
      CalculateValues()
    }
  }, [checked])

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
    if (GetDateRegistrosCall.dataReady) {
      setAPIRESPONSE(GetDateRegistrosCall.data)
      UpdateRegistroAntropometria(GetDateRegistrosCall.data)
      NProgress.done()
      cogoToast.success('Registros Cargados', { position: 'top-right' })
    }
  }, [GetDateRegistrosCall.isLoading])

  useEffect(() => {
    if (APIRESPONSE.length > 0) {
      ParserData()
    }
  }, [APIRESPONSE])

  const ReturnValueWithColor = (info: any, row: any) => {    
    if (typeOfTable === 'Lose') {
      if (row[1] === '% Musculo') {
        if (row[0] < 0) {
          return <label style={{ color: '#ff3333' }}>{info}</label>
        } else {
          return <label style={{ color: '#198754' }}>{info}</label>
        }
      } else if (row[0] > 0) {
        return <label style={{ color: '#ff3333' }}>{info}</label>
      } else {
        return <label style={{ color: '#198754' }}>{info}</label>
      }
    } else {
      if (row[1] === '% Musculo') {
        if (row[0] < 0) {
          return <label style={{ color: '#ff3333' }}>{info}</label>
        } else {
          return <label style={{ color: '#198754' }}>{info}</label>
        }
      } else if (row[0] < 0) {
        return <label style={{ color: '#ff3333' }}>{info}</label>
      } else {
        return <label style={{ color: '#198754' }}>{info}</label>
        
      }
    }
    return info
  }
  useEffect(() => {
    if(secondRows.length > 0){      
      setSecondRows(secondRows)
    }
  },[typeOfTable])
  return (
    <Grid>
      {/* <Button onClick={ParserData} variant='contained' fullWidth>
        Cargar Datos
      </Button> */}
      <FormControl>
        <FormLabel id='demo-row-radio-buttons-group-label'>Objetivo</FormLabel>
        <RadioGroup
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'
          value={typeOfTable}
          onChange={handleChangeRadioGroup}
        >
          <FormControlLabel value='Lose' control={<Radio />} label='Disminución De Peso' />
          <FormControlLabel value='Win' control={<Radio />} label='Aumento De Peso' />
        </RadioGroup>
      </FormControl>
      <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.sticky} align='right'>
                Total
              </StyledTableCell>
              <StyledTableCell className={classes.sticky} align='right'>
                Dato
              </StyledTableCell>
              {APIRESPONSE.map(response => (
                <StyledTableCell align='right' key={new Date(response.FechaMedicion).toLocaleDateString()}>
                  <Button
                    variant='contained'
                    style={{ color: 'white' }}
                    color={IAmChecked(new Date(response.FechaMedicion).toLocaleDateString()) ? 'secondary' : 'primary'}
                    onClick={() => HandleButtonSelection(new Date(response.FechaMedicion).toLocaleDateString())}
                  >
                    {new Date(response.FechaMedicion).toLocaleDateString()}
                  </Button>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {secondRows.map(row => (
              <StyledTableRow>
                {row.map((info, index) => (
                  <StyledTableCell align='right' component='th' scope='row'>
                    {index === 0
                      ? 
                        ReturnValueWithColor(info, row)
                      : info}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default ComparationResults
