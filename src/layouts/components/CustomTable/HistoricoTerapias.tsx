import { useEffect, useRef, useState, } from 'react';
import { Button, Card, Collapse, CardHeader, Container, CardContent, IconButton, Divider, Box, MenuItem, ListItemIcon, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_DensityState,
    type MRT_SortingState,
    type MRT_VisibilityState,
} from 'material-react-table';
import { Consulta, PacienteFisioterapia } from 'src/Types/Types';
import { Pencil, DeleteForever } from 'mdi-material-ui';

interface IProps {
    datos: Array<Consulta>,
    updateData: (value:PacienteFisioterapia) => void,
    sourceData:PacienteFisioterapia,
    changeonData: (value:boolean) => void,
}

const HistoricoTerapias = ({ datos,updateData,sourceData,changeonData }: IProps) => {
    const [newDate,setNewDate] = useState<Dayjs>(dayjs())
    const [indexToUpdate, setIndexToUpdate] = useState(0)
    const [citaToUpdate, setCitaToUpdate] = useState<Consulta>({
        MotivoConsulta: "",
        FechaDeConsulta: new Date().toLocaleDateString()
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const columns: MRT_ColumnDef<Consulta>[] = [
        {
            accessorKey: 'MotivoConsulta',
            header: 'Motivo Consulta',
        },
        {
            accessorKey: 'FechaDeConsulta',
            header: 'Fecha',
        },
    ];

    const [data, setData] = useState<Array<Consulta>>([       
    ]);

    const isFirstRender = useRef(true);
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
        {},
    );
    const [density, setDensity] = useState<MRT_DensityState>('comfortable');
    const [globalFilter, setGlobalFilter] = useState<string | undefined>(
        undefined,
    );
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);
    const [showColumnFilters, setShowColumnFilters] = useState(false);
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    useEffect(() => {
        const columnFilters = sessionStorage.getItem('historico_terapias_table');
        const columnVisibility = sessionStorage.getItem(
            'mrt_columnVisibility_table_terapias_table',
        );
        const density = sessionStorage.getItem('mrt_density_historico_terapias_table');
        const globalFilter = sessionStorage.getItem('mrt_globalFilter_table_historico_terapias_table');
        const showGlobalFilter = sessionStorage.getItem(
            'mrt_showGlobalFilter_table_historico_terapias_table',
        );
        const showColumnFilters = sessionStorage.getItem(
            'mrt_showColumnFilters_table_historico_terapias_table',
        );
        const sorting = sessionStorage.getItem('mrt_sorting_table_historico_terapias_table');

        if (columnFilters) {
            setColumnFilters(JSON.parse(columnFilters));
        }
        if (columnVisibility) {
            setColumnVisibility(JSON.parse(columnVisibility));
        }
        if (density) {
            setDensity(JSON.parse(density));
        }
        if (globalFilter) {
            setGlobalFilter(JSON.parse(globalFilter) || undefined);
        }
        if (showGlobalFilter) {
            setShowGlobalFilter(JSON.parse(showGlobalFilter));
        }
        if (showColumnFilters) {
            setShowColumnFilters(JSON.parse(showColumnFilters));
        }
        if (sorting) {
            setSorting(JSON.parse(sorting));
        }
        isFirstRender.current = false;
    }, []);

    //save states to local storage
    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem(
            'historico_terapias_table',
            JSON.stringify(columnFilters),
        );
    }, [columnFilters]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem(
            'mrt_columnVisibility_table_terapias_table',
            JSON.stringify(columnVisibility),
        );
    }, [columnVisibility]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem('mrt_density_historico_terapias_table', JSON.stringify(density));
    }, [density]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem(
            'mrt_globalFilter_table_historico_terapias_table',
            JSON.stringify(globalFilter ?? ''),
        );
    }, [globalFilter]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem(
            'mrt_showGlobalFilter_table_historico_terapias_table',
            JSON.stringify(showGlobalFilter),
        );
    }, [showGlobalFilter]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem(
            'mrt_showColumnFilters_table_historico_terapias_table',
            JSON.stringify(showColumnFilters),
        );
    }, [showColumnFilters]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem('mrt_sorting_table_historico_terapias_table', JSON.stringify(sorting));
    }, [sorting]);

    const resetState = () => {
        sessionStorage.removeItem('historico_terapias_table');
        sessionStorage.removeItem('mrt_columnVisibility_table_terapias_table');
        sessionStorage.removeItem('mrt_density_historico_terapias_table');
        sessionStorage.removeItem('mrt_globalFilter_table_historico_terapias_table');
        sessionStorage.removeItem('mrt_showGlobalFilter_table_historico_terapias_table');
        sessionStorage.removeItem('mrt_showColumnFilters_table_historico_terapias_table');
        sessionStorage.removeItem('mrt_sorting_table_historico_terapias_table');
        window.location.reload();
    };

    useEffect(() => {        
            setData(datos);        
    },[datos])

    const CustomMenu = (closeMenu: any, row: any) => {

        return [
            <MenuItem

                key={0}

                onClick={() => {

                    // View profile logic...
                    console.log(row.index);
                    // let auxData = [...data];
                    // auxData[0].MotivoConsulta = "Testing";
                    // setData(auxData);
                    setIndexToUpdate(row.index);
                    setCitaToUpdate({
                        MotivoConsulta: row.original.MotivoConsulta,
                        FechaDeConsulta: row.original.FechaDeConsulta,
                    })
                    handleClickOpen();
                    closeMenu();

                }}

                sx={{ m: 0 }}

            >

                <ListItemIcon>

                    <Pencil />

                </ListItemIcon>

                Editar

            </MenuItem>,

            <MenuItem

                key={1}

                onClick={() => {

                    setIndexToUpdate(row.index);
                    setCitaToUpdate({
                        MotivoConsulta: row.original.MotivoConsulta,
                        FechaDeConsulta: row.original.FechaDeConsulta,
                    })
                    DeleteEntry()
                    closeMenu();

                }}

                sx={{ m: 0 }}

            >

                <ListItemIcon>

                    <DeleteForever />

                </ListItemIcon>

                Eliminar

            </MenuItem>,

        ]


    }

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleChangeOnModal = () => {
        if (indexToUpdate === -1) {
            let newData = [...data];
            newData.push(citaToUpdate);
            setData(newData);
            
            let sourcedataAux = sourceData;
            sourceData.Consultas = newData;
            updateData(sourcedataAux)
        } else {

            let auxData = [...data];
            auxData[indexToUpdate] = citaToUpdate;
            setData(auxData);

            let sourcedataAux = sourceData;
            sourceData.Consultas = auxData;
            updateData(sourcedataAux)
        }
        changeonData(true);
        handleClose();
    }

    const DeleteEntry = () => {
        let auxData = [...data];
        console.log(indexToUpdate);
        auxData.splice(indexToUpdate, 1);
        setData(auxData);

        let sourcedataAux = sourceData;
        sourceData.Consultas = auxData;
        updateData(sourcedataAux)
        changeonData(true);
        handleClose();
    }

    const CrearCita = () => {
        setIndexToUpdate(-1);
        handleClickOpen()
    }

    return (

        <>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Editar Datos de la consulta</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Motivo de Cita"

                        fullWidth
                        variant="standard"
                        value={citaToUpdate.MotivoConsulta}
                        onChange={(e) => {
                            setCitaToUpdate((state) => ({
                                ...state,
                                MotivoConsulta: e.target.value
                            }))
                        }}
                    />
                    <Divider/>
                    <DatePicker label="Fecha de La cita" format='DD/MM/YYYY' value={newDate} onChange={(e) => {
                        if(e){
                            setNewDate(e);
                            setCitaToUpdate((state) => ({
                                ...state,
                                FechaDeConsulta: e.format("DD/MM/YYYY")
                            }))
                        }
                    }}/>
                    <Divider/>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Fecha"
                        value={citaToUpdate.FechaDeConsulta}
                        onChange={(e) => {
                            setCitaToUpdate((state) => ({
                                ...state,
                                FechaDeConsulta: e.target.value
                            }))
                        }}
                        fullWidth
                        variant="standard"
                    /> */}
                    <Button fullWidth sx={{ mr: 2 }} variant='contained' onClick={handleChangeOnModal}>
                        {indexToUpdate === -1 ? "Registrar" : "Actualizar"}
                    </Button>
                </DialogContent>
            </Dialog>
            <Card sx={{
                minWidth: 300,
                border: "1px solid rgba(211,211,211,0.6)"
            }}>
                <CardHeader
                    title={`Historico de Citas ${data.length}`}
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
                                height: 300,
                                lineHeight: 2
                            }}>
                                <MaterialReactTable
                                    columns={columns}
                                    data={data}
                                    renderRowActionMenuItems={({ closeMenu, row }) => CustomMenu(closeMenu, row)}
                                    enableRowActions={true}
                                    onColumnFiltersChange={setColumnFilters}
                                    onColumnVisibilityChange={setColumnVisibility}
                                    onDensityChange={setDensity}
                                    onGlobalFilterChange={setGlobalFilter}
                                    onShowColumnFiltersChange={setShowColumnFilters}
                                    onShowGlobalFilterChange={setShowGlobalFilter}
                                    onSortingChange={setSorting}
                                    state={{
                                        columnFilters,
                                        columnVisibility,
                                        density,
                                        globalFilter,
                                        showColumnFilters,
                                        showGlobalFilter,
                                        sorting,
                                    }}
                                    renderTopToolbarCustomActions={() => (
                                        // <Button onClick={resetState}>Reset State</Button>
                                        <Button variant='contained' fullWidth onClick={CrearCita}>Registrar Cita</Button>
                                    )}
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

export default HistoricoTerapias