import React, { useState } from 'react'
import { Card, Collapse, CardHeader, Container, CardContent, IconButton, Divider, TextField } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { AntecedentesNoPatologicos, PacienteFisioterapia } from 'src/Types/Types';

interface IProps {
    datos: AntecedentesNoPatologicos,
    updateData: (value:PacienteFisioterapia) => void,
    sourceData:PacienteFisioterapia,
    changeonData: (value:boolean) => void,
}

const AntecedentesPersonalesNoPatologicos = ({ datos,updateData,sourceData,changeonData }: IProps) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<AntecedentesNoPatologicos>({
        Alcohol: "",
        Tabaquismo: "",
        Drogas: "",
        Otros: ""
    })

    const HandleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let auxData = { ...data };

        switch (e.target.id) {
            case "Alcohol":
                auxData.Alcohol = e.target.value;
                break;
            case "Tabaquismo":
                auxData.Tabaquismo = e.target.value;
                break;
            case "Drogas":
                auxData.Drogas = e.target.value;
                break;
            case "Otros":
                auxData.Otros  = e.target.value;
                break;
        }

        setData(auxData);
        let auxDataSource = sourceData;
        auxDataSource.AntecedentesNoPatolicos = auxData;
        updateData(auxDataSource);
        changeonData(true);

    }
    return (
        <>
            <Card sx={{
                minWidth: 300,
                border: "1px solid rgba(211,211,211,0.6)"
            }}>
                <CardHeader
                    title="Antecedentes Personales No Patologicos"
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
                                height: 350,
                                lineHeight: 2
                            }}>
                                <TextField
                                    id="Alcohol"
                                    label="Alcohol"
                                    variant="outlined"
                                    fullWidth
                                    value={data.Alcohol}
                                    onChange={(e) => HandleChangeValue(e)}
                                />
                                <Divider/>
                                <TextField
                                    id="Drogas"
                                    label="Drogas"
                                    variant="outlined"
                                    fullWidth
                                    value={data.Drogas}
                                    onChange={(e) => HandleChangeValue(e)}
                                />
                                <Divider/>
                                <TextField
                                    id="Tabaquismo"
                                    label="Tabaquismo"
                                    variant="outlined"
                                    fullWidth
                                    value={data.Tabaquismo}
                                    onChange={(e) => HandleChangeValue(e)}
                                />
                                <Divider/>
                                <TextField
                                    id="Otros"
                                    label="Otros"
                                    variant="outlined"
                                    fullWidth
                                    value={data.Otros}
                                    onChange={(e) => HandleChangeValue(e)}
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

export default AntecedentesPersonalesNoPatologicos