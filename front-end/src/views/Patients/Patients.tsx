import React, {FunctionComponent} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import * as actionTypes from "../../models/ActionModel";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {getAllPatients} from "../../actions";
import {rootState} from "../../store";

interface Column {
    id: 'id' | 'name' | 'surname' | 'phone' | 'pesel';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'id', label: 'id', minWidth: 170 },
    { id: 'name', label: 'Imię', minWidth: 100 },
    {
        id: 'surname',
        label: 'Nazwisko',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'phone',
        label: 'Telefon',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'pesel',
        label: 'Pesel',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    id: number;
    name: string;
    surname: string;
    phone: string;
    pesel: string;
}

function createData(id: number, name: string, surname: string, phone: string): Data {
    const pesel = phone;
    return { id, name, surname, phone, pesel };
}

let rows = [
    createData(1,'', '',  '')
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});


const Patients:FunctionComponent<{}> = ({}) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const dispatch = useDispatch();

    function navigate(id: number) {
        console.log('1');
        dispatch(({
            type: actionTypes.rootTypes.SET_USER_ID,
            payload: id}));
    }
    dispatch(getAllPatients());

    const { rowsTemp } = useSelector<rootState, any>((state: rootState) => {
        rows = state.rootStore.patients;
        return {
            patients: state.rootStore.patients,
        }
    });

    return (<>
        <div> Wszyscy Pacjenci</div>
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => navigate(row.id)}>
                                        {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                <NavLink exact to="/history">
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </NavLink>
                                            </TableCell>
                                        );
                                    })}

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        </>
    );
}

export default withRouter(Patients);
