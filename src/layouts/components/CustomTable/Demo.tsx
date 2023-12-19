import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_DensityState,
    type MRT_SortingState,
    type MRT_VisibilityState,
} from 'material-react-table';

export type Person = {
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    salary: number;
};

const columns: MRT_ColumnDef<Person>[] = [
    {
        accessorKey: 'firstName',
        header: 'First Name',
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
    },
    {
        accessorKey: 'city',
        header: 'City',
    },
    {
        accessorKey: 'state',
        header: 'State',
    },
    {
        accessorKey: 'salary',
        header: 'Salary',
    },
];

const Demo = () => {
    const [data, setData] = useState<Array<Person>>([
        {
            firstName: 'Allison',
            lastName: 'Brown',
            city: 'Omaha',
            state: 'Nebraska',
            salary: 10000,
        },
        {
            firstName: 'Harry',
            lastName: 'Smith',
            city: 'Hickman',
            state: 'Nebraska',
            salary: 20000,
        },
        {
            firstName: 'Sally',
            lastName: 'Williamson',
            city: 'Alliance',
            state: 'Nebraska',
            salary: 30000,
        },
        {
            firstName: 'Lebron',
            lastName: 'James',
            city: 'Indianapolis',
            state: 'Indiana',
            salary: 40000,
        },
        {
            firstName: 'Michael',
            lastName: 'McGinnis',
            city: 'Harrisonburg',
            state: 'Virginia',
            salary: 150000,
        },
        {
            firstName: 'Joseph',
            lastName: 'Williams',
            city: 'Valentine',
            state: 'Nebraska',
            salary: 100000,
        },
        {
            firstName: 'Noah',
            lastName: 'Brown',
            city: 'Toledo',
            state: 'Ohio',
            salary: 50000,
        },
        {
            firstName: 'Mason',
            lastName: 'Zhang',
            city: 'Sacramento',
            state: 'California',
            salary: 100000,
        },
        {
            firstName: 'Violet',
            lastName: 'Doe',
            city: 'San Francisco',
            state: 'California',
            salary: 100000,
        },
    ])
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
        const columnFilters = sessionStorage.getItem('mrt_columnFilters_table_1');
        const columnVisibility = sessionStorage.getItem(
            'mrt_columnVisibility_table_1',
        );
        const density = sessionStorage.getItem('mrt_density_table_1');
        const globalFilter = sessionStorage.getItem('mrt_globalFilter_table_1');
        const showGlobalFilter = sessionStorage.getItem(
            'mrt_showGlobalFilter_table_1',
        );
        const showColumnFilters = sessionStorage.getItem(
            'mrt_showColumnFilters_table_1',
        );
        const sorting = sessionStorage.getItem('mrt_sorting_table_1');

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
            'mrt_columnFilters_table_1',
            JSON.stringify(columnFilters),
        );
    }, [columnFilters]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem(
            'mrt_columnVisibility_table_1',
            JSON.stringify(columnVisibility),
        );
    }, [columnVisibility]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem('mrt_density_table_1', JSON.stringify(density));
    }, [density]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem(
            'mrt_globalFilter_table_1',
            JSON.stringify(globalFilter ?? ''),
        );
    }, [globalFilter]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem(
            'mrt_showGlobalFilter_table_1',
            JSON.stringify(showGlobalFilter),
        );
    }, [showGlobalFilter]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem(
            'mrt_showColumnFilters_table_1',
            JSON.stringify(showColumnFilters),
        );
    }, [showColumnFilters]);

    useEffect(() => {
        if (isFirstRender.current) return;
        sessionStorage.setItem('mrt_sorting_table_1', JSON.stringify(sorting));
    }, [sorting]);

    const resetState = () => {
        sessionStorage.removeItem('mrt_columnFilters_table_1');
        sessionStorage.removeItem('mrt_columnVisibility_table_1');
        sessionStorage.removeItem('mrt_density_table_1');
        sessionStorage.removeItem('mrt_globalFilter_table_1');
        sessionStorage.removeItem('mrt_showGlobalFilter_table_1');
        sessionStorage.removeItem('mrt_showColumnFilters_table_1');
        sessionStorage.removeItem('mrt_sorting_table_1');
        window.location.reload();
    };
    return (
        <div><MaterialReactTable
            columns={columns}
            data={data}
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
                <Button onClick={resetState}>Reset State</Button>
            )}
        /></div>
    )
}

export default Demo