import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './History.module.scss'
import CardForm from "../../components/Card/CardForm";
import teeth from '../../assets/zeby.png'
import MedicalTeeth from "../../components/medicalTeeth/MedicalTeeth";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import {Button, Dialog, DialogActions, DialogContent, MenuItem, Slide} from "@material-ui/core";
import {useSelector} from "react-redux";
import {rootState} from "../../store";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {TeethView} from "../../enum/TeethView";
import {MarkerComponentProps} from "react-image-marker";
import {TransitionProps} from '@material-ui/core/transitions';
import style from "../Patients/Patients.module.scss";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import moment from "moment";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);



interface Column {
    id: 'name' | 'amount' | 'date';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: Column[] = [
    {   id: 'name',
        label: 'Nazwa',
        minWidth: 100 },
    {
        id: 'amount',
        label: 'Dawka',
        minWidth: 150,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'date',
        label: 'Data wypisania',
        minWidth: 150,
        align: 'center',
    }
];

interface Data {
    name: string;
    amount: string;
    date: string;
}

function createData(name: string, amount: string, date: string): Data {
    return { name, amount, date};
}



const History:FunctionComponent<{}> = ({}) => {
    const [visitDate, setVisitDate] = React.useState(null);
    const [visits, setVisits] = React.useState([]);
    const [receipts, setReceipts] = React.useState([]);
    const [srcUp, setSrcUp] = React.useState(null);
    const [srcF, setSrcF] = React.useState(null);
    const [srcD, setSrcD] = React.useState(null);
    const [selectedVisit, setSelectedVisit] = React.useState({id: 0, date: null});
    const [newReceiptDate, setNewReceiptDate] = React.useState<any>(
        new Date(moment().valueOf()),
    )

    const [upperMarkers, setUpperMarkers] = useState<MarkerComponentProps[]>([]);
    const [frontMarkers, setFrontMarkers] = useState<MarkerComponentProps[]>([]);
    const [lowerMarkers, setLowerMarkers] = useState<MarkerComponentProps[]>([]);

    const [upperMarkersVanilla, setUpperMarkersVanilla] = useState<any>([]);
    const [frontMarkersVanilla, setFrontMarkersVanilla] = useState<any>([]);
    const [lowerMarkersVanilla, setLowerMarkersVanilla] = useState<any>([]);

    const handleChange = (visit: any)  => {
        getMarkers(TeethView.UP, visit);
        getMarkers(TeethView.FRONT, visit);
        getMarkers(TeethView.DOWN, visit);
    };

    const handleChangeVisit = (event : any)  => {
        setSelectedVisit(event);
        handleChange(event);
    };

    const setVisitDateEv = (event : React.ChangeEvent<any>)  => {
        setVisitDate(event.target.value);
    };

    const { patient } = useSelector<rootState, any>((state: rootState) => {
        let p = state.rootStore.patients.find((x: any)=> x.id == state.rootStore.currPatientId)
        return {
            patient: p
        }
    });
    const classes = useStyles();

    const getMarkers = async(type: any, visit: any) => {
        console.log('getForVisit' + visit.id);

        let data = await axios.get('api/photoIndicators/search/findAllByVisit_IdAndTeethView' +
            '?visitId=' + visit.id + '&teethView=' + TeethView[type]);
        let data1 = data.data._embedded.photoIndicators.map((val: any) => ({
            id: val.id,
            left: val.x,
            top: val.y,
            message: val.message,
            RTGBase64: val.rtgbase64
        }));

        let photo = await axios.get('/api/patient/getPhoto' +
            '?visitId=' + visit.id + '&teethView=' + TeethView[type]);
        if (type == TeethView.DOWN) {
            setLowerMarkers(data1);
            setLowerMarkersVanilla(data1);
            setSrcD(photo.data.base64)
        } else if (type == TeethView.FRONT) {
            setFrontMarkers(data1);
            setFrontMarkersVanilla(data1);
            setSrcF(photo.data.base64)
        } else if (type == TeethView.UP) {
            setUpperMarkers(data1);
            setUpperMarkersVanilla(data1);
            setSrcUp(photo.data.base64)
        }
        return data1;
    }

    const getHistory = async() => {
        if (patient !== undefined) {
            let data = await axios.get('/api/visits/search/findAllByPatient_Id?patientId=' + patient.id);
            let data1 = data.data._embedded.visits.map((val: any) => ({
                id: val.id,
                date: val.date,
            }));
            if (data1 && data1.length > 0) {
                handleChangeVisit(data1[0]);
            }
            setVisits(data1);
            return data1[0];
        }
    }

    const getReceipts = async() => {
        if(patient !== undefined) {
            let data = await axios.get('/api/receipts/search/findAllByPatient_Id?patientId=' + patient.id);
            let data1 = data.data._embedded.receipts.map((val: any) => ({
                id: val.id,
                date: val.date,
                amount: val.amount,
                name: val.name
            }));
            setReceipts(data1);
            return data1[0];
        }
    }

    useEffect(() => {
        getHistory();
        setUpperMarkersVanilla(getMarkers(TeethView.UP, selectedVisit));
        setFrontMarkersVanilla(getMarkers(TeethView.FRONT, selectedVisit));
        setLowerMarkersVanilla(getMarkers(TeethView.DOWN, selectedVisit));
    }, []);


    const addVisit = async() => {
        await axios.post('/api/patient/addVisit',
            {
                "date": visitDate ,
                "patient_id": patient.id
            })
            .then(()=>{
                getHistory();
            })
            .catch((err)=>console.log(err));
    }

    const [modalIsOpen,setIsOpen] = React.useState(false);

    const handleClickOpen = () => {
        setIsOpen(true);
        getReceipts();
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const addReceipt = async() => {
        await axios.post('/api/patient/addReceipt',
            {
                "name": (document.getElementById("standard-name") as HTMLInputElement).value,
                "amount": (document.getElementById("standard-surname") as HTMLInputElement).value,
                "date": newReceiptDate,
                "patient_id": patient.id,
            })
            .then(()=>{
                getReceipts();
            })
            .catch((err)=>console.log(err))
    };

    const handleRecDateChange = (event : React.ChangeEvent<any>) => {
        setNewReceiptDate(event.target.value);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
        return (
            <>
                <div className={styles.mainClass}>
                    <div className={styles.medical}>
                        <div className={styles.info}>

                            <div>
                                <p>Imię: {patient?.name}</p>
                                <p>Nazwisko: {patient?.surname}</p>
                                <p>Pesel: {patient?.pesel}</p>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                padding: "10px"
                            }}>

                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column" ,
                                justifyContent: "space-around",
                                padding: "10px"
                            }}>
                                <Button onClick={handleClickOpen} variant="contained" color="primary" >
                                    Historia recept
                                </Button>
                                <Button onClick={handleClickOpen} variant="contained" color="primary" >
                                    Ustaw nowe hasło pacentowi
                                </Button>
                            </div>
                            <div>
                                <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                    <form className={classes.container} noValidate>
                                        <TextField  onChange={setVisitDateEv}
                                                    id="datetime-local"
                                                    label="Data nowej wizyty"
                                                    type="datetime-local"
                                                    defaultValue="2020-11-24T10:30"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                        />
                                    </form>
                                    <Button onClick={addVisit} variant="contained" color="primary" >
                                        Dodaj nową wizytę
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div style={{padding: "10px"}}>
                            <MedicalTeeth  src={teeth} description={'Dokumentacja medyczna'} children={''}/>
                        </div>
                    </div>
                    <div className={styles.cardMain}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            <div style={{padding: "5px"}}>Data przeglądanej wizyty:</div>
                            <Select className={styles.date}
                                    labelId="demo-single-name-label"
                                    id="demo-single-name"
                                    value={selectedVisit.date}
                                    input={<Input />}
                            >
                                {visits.map((name : any) => (
                                    <MenuItem  onClick={() => handleChangeVisit(name)} key={name.date} value={name.date}>
                                        {name.date}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        <CardForm src={srcUp} description={'Łuk górny'}
                                  viewType={TeethView.UP}
                                  markers={upperMarkers} markersVanilla={upperMarkersVanilla}
                                  visit={selectedVisit} getMarkers1={handleChangeVisit}
                                  setMarkers1={setUpperMarkers}
                                  patient={patient} setSrc={setSrcUp}/>
                        <CardForm src={srcF} description={'Przód'}
                                  viewType={TeethView.FRONT}
                                  markers={frontMarkers} markersVanilla={frontMarkersVanilla}
                                  visit={selectedVisit} getMarkers1={handleChangeVisit}
                                  setMarkers1={setFrontMarkers}
                                  patient={patient} setSrc={setSrcF}/>
                        <CardForm src={srcD} description={'Łuk dolny'}
                                  viewType={TeethView.DOWN}
                                  markers={lowerMarkers} markersVanilla={lowerMarkersVanilla}
                                  visit={selectedVisit} getMarkers1={handleChangeVisit}
                                  setMarkers1={setLowerMarkers}
                                  patient={patient} setSrc={setSrcD}/>
                    </div>
                </div>


                <div>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Slide in alert dialog
                    </Button>
                    <Dialog
                        open={modalIsOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogContent>
                            <div>
                                Recepty
                            </div>
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
                                        {receipts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (<>
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
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
                            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                <div style={{padding: "5px", display: "flex", flexDirection: "row"}}>
                                    <TextField  style={{padding: "5px"}} id="standard-name" label="Nazwa" />
                                    <TextField  style={{padding: "5px"}} id="standard-surname" label="Dawka" />
                                    <TextField
                                        id="datetime-local2"
                                        label="Data wystawienia"
                                        type="datetime-local"
                                        value={newReceiptDate}
                                        onChange={handleRecDateChange}
                                        className={style.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{padding: 5}}
                                    />
                                </div>
                                <Button  onClick={addReceipt} variant="contained" color="primary" >
                                    Dodaj nowa receptę
                                </Button>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                               ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </>
        );
}

export default History;
