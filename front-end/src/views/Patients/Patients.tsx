import React, {FunctionComponent, useEffect, useState} from 'react';
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
import {NavLink, withRouter} from 'react-router-dom';
import {getAllPatients} from "../../actions";
import {rootState} from "../../store";
import style from "../Patients/Patients.module.scss";
import {Calendar, momentLocalizer, Views, dateFnsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'

import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment'
import {Button, Snackbar, TextField} from "@material-ui/core";
import axios from "axios";
import {Alert} from "@material-ui/lab";


interface Column {
    id: 'id' | 'name' | 'surname' | 'phone' | 'pesel';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    {   id: 'name',
        label: 'Imię',
        minWidth: 100 },
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


const locales = {
    'pl': require('date-fns/locale/pl'),
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})


const Patients:FunctionComponent<{}> = ({}) => {

    const getCalendars = async() => {
        let data = await axios.get('/api/calendars');
        let data1 = data.data.map((val: any) => ({
            start: new Date(val.from),
            end: new Date(val.to),
            title: val.title
        }));
        setEvents(data1);

    };

    const addVisit = async() => {
        await axios.post('/api/calendars',
            {
                "from": selectedDateFrom,
                "to": selectedDateTo,
                "title": value,
            })
            .then(()=>{
                getCalendars();
                handleSuccess();
            })
            .catch((err)=>{
                handleWarn();
                console.log(err);
            }
         );
    }

    const addPatient = async() => {
        await axios.post('/api/patients',
            {
                "name":    (document.getElementById("standard-name") as HTMLInputElement).value,
                "surname": (document.getElementById("standard-surname") as HTMLInputElement).value,
                "phone":   (document.getElementById("standard-phone") as HTMLInputElement).value,
                "pesel":   (document.getElementById("standard-pesel") as HTMLInputElement).value,
            })
            .then(()=>{
                getCalendars();
                handleSuccessPat();
            })
            .catch((err)=>{
                handleWarn();
                console.log(err);
            }
         );
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [value, setValue] = useState('');
    const [events, setEvents] = useState([]);
    const [selectedDateFrom, setSelectedDateFrom] = React.useState<Date | null>(
        new Date(moment().valueOf()),
    );
    const [selectedDateTo, setSelectedDateTo] = React.useState<Date | null>(
        null,
    );

    const handleChangePage = (event: unknown, newPage: number) => {

    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

    };
    const dispatch = useDispatch();

    function navigate(id: number) {
        console.log('1');
        dispatch(({
            type: actionTypes.rootTypes.SET_USER_ID,
            payload: id}));
    }
    dispatch(getAllPatients());

    const handleChangeVal = (event : React.ChangeEvent<any>) => {
       setValue(event.target.value);
    };

    const handleDateChangeFrom = (date: React.ChangeEvent<any>) => {
        setSelectedDateFrom(date.target.value);
    };

    const handleDateChangeTo = (date: React.ChangeEvent<any>) => {
        setSelectedDateTo(date.target.value);
    };

    const [openSucc, setOpenSucc] = React.useState(false);
    const [openSuccPat, setOpenSuccPat] = React.useState(false);
    const [openWarn, setOpenWarn] = React.useState(false);

    const handleSuccess = () => {
        setOpenSucc(true);
    };

    const handleSuccessPat = () => {
        setOpenSuccPat(true);
    };

    const handleWarn = () => {
        setOpenWarn(true);
    };

    const handleCloseSucc = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSucc(false);
    };

    const handleCloseWarn = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenWarn(false);
    };

    const { rowsTemp } = useSelector<rootState, any>((state: rootState) => {
        rows = state.rootStore.patients;
        return {
            patients: state.rootStore.patients,
        }
    });

    useEffect(() => {
       getCalendars();
    },[]);

    return (<>
            <div className={style.mainPage}>
                <div>
                    <div> Wszyscy Pacjenci</div>
                    <Paper className={style.root}>
                        <TableContainer className={style.container}>
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
                                                    return (<>
                                                                <TableCell key={column.id} align={column.align}>
                                                                    <NavLink exact to="/history">
                                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                                    </NavLink>
                                                                </TableCell>
                                                            </>
                                                    );
                                                })}

                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{padding: "5px"}}>
                            <TextField id="standard-name" label="Imię" />
                            <TextField id="standard-surname" label="Nazwisko" />
                            <TextField id="standard-phone" label="Telefon" />
                            <TextField id="standard-pesel" label="Pesel" />
                        </div>
                        <Button onClick={addPatient} variant="contained" color="primary" >
                            Dodaj Pacjenta
                        </Button>
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
                </div>
                <div className={style.calendar}>
                    <form className={style.container} noValidate>
                        <TextField
                            id="datetime-local"
                            label="Początek wizyty"
                            type="datetime-local"
                            defaultValue={moment().toDate()}
                            className={style.textField}
                            value={selectedDateFrom}
                            onChange={handleDateChangeFrom}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{padding: 5}}
                        />
                        <TextField
                            id="datetime-local2"
                            label="Koniec wizyty"
                            type="datetime-local"
                            value={selectedDateTo}
                            onChange={handleDateChangeTo}
                            className={style.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{padding: 5}}
                        />
                        <TextField id="standard-basic"
                                   label="Standard"
                                   value={value}
                                   onChange={handleChangeVal}
                                   style={{padding: 5}}
                        />
                        <Button onClick={addVisit} variant="contained" color="primary" >
                            Dodaj
                        </Button>
                        <Snackbar open={openSucc} autoHideDuration={6000} onClose={handleCloseSucc}>
                            <Alert onClose={handleCloseSucc} severity="success">
                                Dodano wizytę!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openSuccPat} autoHideDuration={6000} onClose={handleCloseSucc}>
                            <Alert onClose={handleCloseSucc} severity="success">
                                Dodano pacjenta!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openWarn} autoHideDuration={6000} onClose={handleCloseWarn}>
                            <Alert onClose={handleCloseSucc} severity="warning">
                                Wizyta nakłada się na inną!
                            </Alert>
                        </Snackbar>
                    </form>

                    <Calendar
                        selectable
                        localizer={localizer}
                        events={events}
                        defaultView={Views.WEEK}
                        min={new Date(0, 0, 0, 7, 0, 0)}
                        max={new Date(0, 0, 0, 19, 0, 0)}
                        scrollToTime={new Date(2010, 1, 1, 6)}
                        defaultDate={moment().toDate()}
                        onSelectEvent={event => alert(event.title)}
                        onSelectSlot={handleChangePage}
                    />
                </div>
            </div>
        </>
    );
}

export default withRouter(Patients);
