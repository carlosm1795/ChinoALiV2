import React, { useState } from 'react'
import { Card, Collapse, CardHeader, Container, CardContent, IconButton, Divider, TextField, Grid } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { PacienteFisioterapia } from 'src/Types/Types';

interface IProps {
    datos: PacienteFisioterapia
}
const DatosPersonales = ({ datos }: IProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card sx={{
                minWidth: 300,
                border: "1px solid rgba(211,211,211,0.6)"
            }}>
                <CardHeader
                    title="Datos Personales"
                    action={
                        <IconButton
                            onClick={() => setOpen(!open)}
                            aria-label="expand"
                            size="small"
                        >
                            {open ? <ArrowUpwardIcon />
                                : <ArrowDownwardIcon />}
                        </IconButton>
                    }
                ></CardHeader>
                <div style={{
                    backgroundColor: "rgba(211,211,211,0.4)"
                }}>
                    <Collapse in={open} timeout="auto"
                        unmountOnExit>
                        <CardContent>
                            <Container sx={{
                                height: 200,
                                lineHeight: 2
                            }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="Alcohol"
                                            label="Nombre"
                                            variant="outlined"
                                            fullWidth
                                            value={datos.Nombre}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="Domicilio"
                                            label="Domicilio"
                                            variant="outlined"
                                            fullWidth
                                            value={datos.Domicilio}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="FechaNacimiento"
                                            label="FechaNacimiento"
                                            variant="outlined"
                                            fullWidth
                                            value={datos.FechaNacimiento}
                                        /></Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="Cedula"
                                            label="Cedula"
                                            variant="outlined"
                                            fullWidth
                                            value={datos.Cedula}
                                        />
                                    </Grid>
                                </Grid>




                            </Container>
                        </CardContent>
                    </Collapse>
                </div>
            </Card>
            <Divider />
        </>
    )
}

export default DatosPersonales