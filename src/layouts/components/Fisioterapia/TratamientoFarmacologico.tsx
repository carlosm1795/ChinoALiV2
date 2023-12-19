import React, { useState } from 'react'
import { Card, Collapse, CardHeader, Container, CardContent, IconButton, Divider, FormGroup, FormControlLabel, TextField } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { PacienteFisioterapia } from 'src/Types/Types';

interface IProps {
    tratamientoValue: string,
    updateData: (value:PacienteFisioterapia) => void,
    sourceData:PacienteFisioterapia,
    changeonData: (value:boolean) => void,
}

const TratamientoFarmacologico = ({ tratamientoValue,sourceData,updateData,changeonData }: IProps) => {
    const [open, setOpen] = useState(false);
    const [tratamiento, setTratamiento] = useState(tratamientoValue);

    return (
        <>
            <Card sx={{
                minWidth: 300,
                border: "1px solid rgba(211,211,211,0.6)"
            }}>
                <CardHeader
                    title="Tratamiento Farmacologico"
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
                                height: 100,
                                lineHeight: 2
                            }}>
                                <TextField
                                    id="TratamientoFarmacologico"
                                    label="Tratamiento Farmacológico"
                                    variant="outlined"
                                    fullWidth
                                    value={tratamiento}
                                    onChange={(e) => {
                                        setTratamiento(e.target.value)
                                        let auxDataSource = sourceData;
                                        auxDataSource.TratamientoFarmacologico = e.target.value;
                                        updateData(auxDataSource);
                                        changeonData(true);
                                    }}
                                />
                            </Container>
                        </CardContent>
                    </Collapse>
                </div>
            </Card>
            <Divider />
        </>
    )
}

export default TratamientoFarmacologico