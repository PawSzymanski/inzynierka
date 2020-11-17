import React, {FunctionComponent, useEffect, useState} from 'react';
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
import moment from 'moment'
import {MarkerComponentProps} from "react-image-marker";


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
    const [srcUp, setSrcUp] = React.useState(null);
    const [srcF, setSrcF] = React.useState(null);
    const [srcD, setSrcD] = React.useState(null);
    const [selectedVisit, setSelectedVisit] = React.useState({id: 5, date: null});

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
        console.log(JSON.stringify(event))
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
        console.log(patient);
        if(patient !== undefined) {
            let data = await axios.get('/api/visits/search/findAllByPatient_Id?patientId=' + patient.id);
            let data1 = data.data._embedded.visits.map((val: any) => ({
                id: val.id,
                  date: val.date,
            }));
            setSelectedVisit(data1[0]);
            setVisits(data1);
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
        return (
            <>

                <div className={styles.mainClass}>
                    <div className={styles.cardWrapper}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: "10px" }}>
                            Data wizyty:
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
                    <div className={styles.medical}>
                        <div className={styles.info}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                padding: "10px"
                            }}>
                                <form className={classes.container} noValidate>
                                    <TextField  onChange={setVisitDateEv}
                                                id="datetime-local"
                                                label="Data wizyty"
                                                type="datetime-local"
                                                defaultValue="2020-11-24T10:30"
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
