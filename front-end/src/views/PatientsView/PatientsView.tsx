import React, {FunctionComponent, useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import moment from "moment";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import {Calendar, momentLocalizer, Views, dateFnsLocalizer } from 'react-big-calendar'
import axios from "axios";
import CardForm from "../../components/Card/CardForm";
import {TeethView} from "../../enum/TeethView";
import {MarkerComponentProps} from "react-image-marker";
import Select from "@material-ui/core/Select";
import styles from "../MainPage/History.module.scss";
import Input from "@material-ui/core/Input";
import {MenuItem} from "@material-ui/core";

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

const PatientsView:FunctionComponent<{}> = ({}) => {

    const [events, setEvents] = useState([]);

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

    const handleChangeVisit = (event : any)  => {
        setSelectedVisit(event);
        handleChange(event);
    };

    const handleChange = (visit: any)  => {
        getMarkers(TeethView.UP, visit);
        getMarkers(TeethView.FRONT, visit);
        getMarkers(TeethView.DOWN, visit);
    };

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

    const getCalendars = async() => {
        let data = await axios.get('/api/calendars');
        let data1 = data.data.map((val: any) => ({
            start: new Date(val.from),
            end: new Date(val.to),
            title: ''
        }));
        setEvents(data1);

    };

    const getHistory = async() => {
        // if(patient !== undefined) {
        let data = await axios.get('/api/visits/search/findAllByPatient_Id?patientId=' + 1);
        let data1 = data.data._embedded.visits.map((val: any) => ({
            id: val.id,
            date: val.date,
        }));
            if (data1 && data1.length > 0) {
                setSelectedVisit(data1[0]);
            }
            setVisits(data1);
            return data1[0];
        // }
    }

    useEffect(() => {
        getHistory();
        getCalendars();
        setUpperMarkersVanilla(getMarkers(TeethView.UP, selectedVisit));
        setFrontMarkersVanilla(getMarkers(TeethView.FRONT, selectedVisit));
        setLowerMarkersVanilla(getMarkers(TeethView.DOWN, selectedVisit));
    },[]);

    return (<>

            <div style={{padding: 5, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <div style={{flex: 40}}>
                    <div className={styles.card}>
                        Godziny przyjęć:
                        <div>
                            poniedziałek: wtorek: środa: czwartek: piątek:
                        </div>
                        <div>
                            telefon:
                        </div>
                        <Calendar style={{padding: "10px"}}
                            selectable
                            localizer={localizer}
                            events={events}
                            defaultView={Views.WEEK}
                            min={new Date(0, 0, 0, 7, 0, 0)}
                            max={new Date(0, 0, 0, 19, 0, 0)}
                            scrollToTime={new Date(2010, 1, 1, 6)}
                            defaultDate={moment().toDate()}
                            onSelectSlot={getCalendars}
                        />
                    </div>
                </div>
                <div style={{flex: 60}}>
                    <div className={styles.card}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            <div style={{flex: 30}}>
                                dane pacjenta
                            </div>
                            <div style={{flex: 70}}>
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
                                <div style={{flex: 50, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                                    <CardForm src={srcUp} description={'Łuk górny'}
                                              viewType={TeethView.UP}
                                              markers={upperMarkers} markersVanilla={upperMarkersVanilla}
                                              visit={selectedVisit} getMarkers1={handleChangeVisit}
                                              setMarkers1={setUpperMarkers}
                                              patient={null} setSrc={setSrcUp}/>
                                    <CardForm src={srcF} description={'Przód'}
                                              viewType={TeethView.FRONT}
                                              markers={frontMarkers} markersVanilla={frontMarkersVanilla}
                                              visit={selectedVisit} getMarkers1={handleChangeVisit}
                                              setMarkers1={setFrontMarkers}
                                              patient={null} setSrc={setSrcF}/>
                                    <CardForm src={srcD} description={'Łuk dolny'}
                                              viewType={TeethView.DOWN}
                                              markers={lowerMarkers} markersVanilla={lowerMarkersVanilla}
                                              visit={selectedVisit} getMarkers1={handleChangeVisit}
                                              setMarkers1={setLowerMarkers}
                                              patient={null} setSrc={setSrcD}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default withRouter(PatientsView);
