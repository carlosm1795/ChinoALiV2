import React, { useState, useEffect } from 'react'
// ** MUI Imports
import { Button, Checkbox } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow, { TableRowProps } from '@mui/material/TableRow'
import TableCell, { TableCellProps, tableCellClasses } from '@mui/material/TableCell'
import { RegistroAntropometria, RegistroAntropometriaValues } from 'src/Types/Types'
import { Grid } from '@mui/material'
import MAINURL from "src/@core/lib/settings"
import useApi from 'src/@core/hooks/useApi'
import NProgress from 'nprogress'
import cogoToast from 'cogo-toast'
//** State Imports */
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from 'src/@core/state'

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
  const dispatch = useDispatch()
  const { ChangeOnUser } = bindActionCreators(actionCreators, dispatch)
  const state = useSelector((state: State) => state)

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
  const [APIRESPONSE, setAPIRESPONSE] = useState<Array<RegistroAntropometria>>([])
  // const APIRESPONSE: Array<RegistroAntropometria> = [
  //   {
  //     _id: '',
  //     FechaMedicion: new Date('01-08-2023'),
  //     Usuario: '',
  //     Values: [
  //       {
  //         dato: 'Peso',
  //         unidades: 'kg',
  //         value: 90
  //       },
  //       {
  //         dato: 'IMC',
  //         unidades: '',
  //         value: 70
  //       }
  //     ]
  //   },
  //   {
  //     _id: '',
  //     FechaMedicion: new Date('01-08-2022'),
  //     Usuario: '',
  //     Values: [
  //       {
  //         dato: 'Peso',
  //         unidades: 'kg',
  //         value: 91
  //       },
  //       {
  //         dato: 'IMC',
  //         unidades: '',
  //         value: 71
  //       }
  //     ]
  //   },
  //   {
  //     _id: '',
  //     FechaMedicion: new Date('01-08-2021'),
  //     Usuario: '',
  //     Values: [
  //       {
  //         dato: 'Peso',
  //         unidades: 'kg',
  //         value: 92
  //       },
  //       {
  //         dato: 'IMC',
  //         unidades: '',
  //         value: 72
  //       }
  //     ]
  //   }
  // ]

  const Data = [0, 'Peso Actual', '80', '20']
  const Data2 = [0, 'IMC', '80', '20']

  const IAmChecked = (id: string) => {
    console.log(id,checked)
    if (checked.max === id || checked.min === id) {
      return true
    } else {
      return false
    }
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
      console.log(headers)
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
    console.log(rows)
    setBodyRows(rows)
  }

  const GetHeader = (arrayofValues: Array<RegistroAntropometriaValues>) => {
    return arrayofValues.map(row => row.dato)
  }

  const CalculateValues = () => {
    console.log(checked)
    let maxValue = APIRESPONSE.findIndex(
      row => new Date(row.FechaMedicion).toLocaleDateString() === new Date(checked.max).toLocaleDateString()
    )
    let minValue = APIRESPONSE.findIndex(
      row => new Date(row.FechaMedicion).toLocaleDateString() === new Date(checked.min).toLocaleDateString()
    )
    console.log(maxValue)
    console.log(bodyRows[0][maxValue + 2])
    console.log(bodyRows[0][minValue + 2])
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
      console.log(GetDateRegistrosCall.data)
      setAPIRESPONSE(GetDateRegistrosCall.data)
      NProgress.done()
      cogoToast.success('Registros Cargados', { position: 'top-right' })
    }
  }, [GetDateRegistrosCall.isLoading])
  return (
    <Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='right'>Total</StyledTableCell>
              <StyledTableCell align='right'>Dato</StyledTableCell>
              {APIRESPONSE.map(response => (
                <StyledTableCell align='right' key={new Date(response.FechaMedicion).toLocaleDateString()}>
                  <Button variant="contained" onClick={() => alert(new Date(response.FechaMedicion).toLocaleDateString())}>X</Button>
                  <Checkbox
                    checked={IAmChecked(new Date(response.FechaMedicion).toLocaleDateString())}
                    id={`${new Date(response.FechaMedicion).toLocaleDateString()}`}
                    onChange={e => HandleSelection(e)}
                  />
                  {new Date(response.FechaMedicion).toLocaleDateString()}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bodyRows.map(row => (
              <StyledTableRow>
                {row.map(info => (
                  <StyledTableCell align='right' component='th' scope='row'>
                    {info}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={ParserData}>Get Info</Button>
      <Button onClick={CalculateValues}>Get Checks</Button>
    </Grid>
  )
}

export default ComparationResults
