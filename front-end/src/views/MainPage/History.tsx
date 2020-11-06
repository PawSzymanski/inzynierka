import React, {FunctionComponent, useEffect } from 'react';
import styles from './History.module.scss'
import CardForm from "../../components/Card/CardForm";
import teeth from '../../assets/upTeeth.png'
import MedicalTeeth from "../../components/medicalTeeth/MedicalTeeth";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import {Button, MenuItem} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../store";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {TeethView} from "../../enum/TeethView";

interface Visits {
    date :any;
}

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

const History:FunctionComponent<{}> = ({}) => {
    const [visitDate, setVisitDate] = React.useState(null);
    const [visits, setVisits] = React.useState([]);
    const [selectedVisit, setSelectedVisit] = React.useState({id: 5, date: null});

    const handleChange = (event : React.ChangeEvent<any>)  => {
        setVisits(visits);
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

    const getHistory = async() => {
        let data = await axios.get('/api/visits/search/findAllByPatient_Id?patientId=' + patient.id);
        let data1 = data.data._embedded.visits.map((val: any) => ({
            id: val.id,
            date: val.date,
        }));
        setSelectedVisit(data1[0]);
        console.log('ssss'  + JSON.stringify(data1[0] ));
        setVisits(data1);
        return data1[0];
    }

    useEffect(() => {
        getHistory();
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
        return (
            <>

                <div className={styles.mainClass}>
                    <div className={styles.cardWrapper}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "10px"
                        }}>
                        <form className={classes.container} noValidate>
                                <TextField  onChange={setVisitDateEv}
                                    id="datetime-local"
                                    label="Data wizyty"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                            <Button onClick={addVisit} variant="contained" color="primary" >
                                Dodaj wizytę
                            </Button>
                        </div>


                        <CardForm src={teeth} description={'Łuk górny'}
                                  viewType={TeethView.UP} visit={selectedVisit}/>
                        <CardForm src={teeth} description={'Przód'}
                                  viewType={TeethView.FRONT} visit={selectedVisit}/>
                        <CardForm src={teeth} description={'Łuk dolny'}
                                  viewType={TeethView.DOWN} visit={selectedVisit}/>
                    </div>
                    <div className={styles.medical}>
                        <div className={styles.info}>
                            <div>
                                Data wizyty:
                                <Select className={styles.date}
                                        labelId="demo-single-name-label"
                                        id="demo-single-name"
                                        value={selectedVisit.date}
                                        onChange={handleChange}
                                        input={<Input />}
                                >
                                    {visits.map((name : any) => (
                                        <MenuItem  onClick={() => setSelectedVisit(name)} key={name.date} value={name.date}>
                                            {name.date}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <p>Imię: {patient?.name}</p>
                                <p>Nazwisko: {patient?.surname}</p>
                                <p>Pesel: {patient?.pesel}</p>
                            </div>
                        </div>
                        <MedicalTeeth src={teeth} description={'Dokumentacja medyczna'} children={''}/>
                    </div>
                </div>
            </>
        );
}

export default History;
