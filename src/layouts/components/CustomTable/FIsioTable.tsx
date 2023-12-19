import { MenuItem } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import React, { useMemo, useState } from 'react'
import { Consulta, DatosParaTable, PacienteFisioterapia } from 'src/Types/Types';

export type Person = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  subRows?: Person[]; //Each person can have sub rows of more people
};
export type Notas = {
  Procedimiento: String
}
export type CustomFisioTable = {
  FechaDeConsulta: String,
  MotivoConsulta: String,
}

const FIsioTable = (Consultas: {
  FechaDeConsulta: string;
  MotivoConsulta: string;
  subRows: {
    Procedimiento: string;
  }[]
}) => {
  const [information,setInformacion] = useState<Array<CustomFisioTable>>([
    {
      FechaDeConsulta: new Date().toLocaleDateString('es-ES'),
      MotivoConsulta: "Contractura",      
    },
  ])
  const columns = useMemo<MRT_ColumnDef<CustomFisioTable>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'FechaDeConsulta',
        header: 'Fecha',
      },
      {
        accessorKey: 'MotivoConsulta',
        header: 'Consulta',
      },
      {
        accessorKey: 'Procedimiento',
        header: 'Notas',
      },
    ],
    [],
    //end
  );
  const data = [
    {
      FechaDeConsulta: new Date().toLocaleDateString('es-ES'),
      MotivoConsulta: "Contractura",
      subRows: [{
        Procedimiento: "Hielo"
      }],
    },
    //more rows...
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: false, //hide expand all double arrow in column header
    enableExpanding: true,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem key="edit" onClick={() => console.info('Edit')}>
        Edit
      </MenuItem>,
      <MenuItem key="delete" onClick={() => console.info('Delete')}>
        Delete
      </MenuItem>,
    ],
  });
  return (
    <div><MaterialReactTable table={table} /></div>
  )
}

export default FIsioTable