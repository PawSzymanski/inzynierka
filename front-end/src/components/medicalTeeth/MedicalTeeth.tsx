import React, {FunctionComponent, useState} from 'react';
import styles from './MedicalTeeth.module.scss'
import ImageMarker, {Marker, MarkerComponentProps} from 'react-image-marker';
import {Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../store";
import axios from "axios";

const CustomMarker = (props: MarkerComponentProps) => {
    return (<>
                <h1>{getType(props)} {props.top}</h1>
            </>
    );
};

let type = '';
let currentX: number;
let currentY: number;

let isLoaded = false;

let history = Array<any>();

function getType(props: MarkerComponentProps) : string {
    console.log('tyoeeeee' + JSON.stringify(props));
    return history.find(s => props.left == s.left && props.top == s.top)?.type
}

const MedicalTeeth:FunctionComponent<{ children: any, description: any, src: any }> = ({ children, description, src}) => {
    // since we pass a number here, clicks is going to be a number.
    // setClicks is a function that accepts either a number or a function returning
    // a number
    const [markers, setMarkers] = useState<MarkerComponentProps[]>([]);
    const dispatch = useDispatch();

    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChangeMedical = (event : React.ChangeEvent<any>) => {
        console.log('hange')
        type = event.target.value;
        setAge(event.target.value);
    };

    const { patient } = useSelector<rootState, any>((state: rootState) => {
        let p = state.rootStore.patients.find((x: any)=> x.id == state.rootStore.currPatientId)
        return {
            patient: p
        }
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const addMarker = (marker: any) => {

        console.log('mmmmmmmmmmmmmmmmaa' + JSON.stringify(markers));
        console.log('hhhhhhhhhhhhhhhhaa' + JSON.stringify(history));
    };

    const handleAdd = async() => {
        await axios.post('/api/patient/history',
            {
                "type":type,
                "x": currentX,
                "y": currentY,
                "patient_id": patient.id
            })
            .then(()=>{console.log('jeee')})
            .catch((err)=>console.log(err));
    }

    const getHistory = async() => {
        let data = await axios.get('/api/histories/search/findAllByPatient_Id?id=' + patient.id);
        let data1 = data.data._embedded.histories.map((val: any) => ({
            top: val.y,
            left: val.x,
            type: val.type
        }));
        history = data1;

        setMarkers(data1);
    }

    if (!isLoaded) {
        getHistory();
        isLoaded = true;
    }

    const [value, setValue] = useState('');

    const handleChange = (event : React.ChangeEvent<any>) => {
        type = event.target.value;
        setValue(event.target.value);
    };
        return <>
            <div className={styles.wrapper}>
                <div className={styles.input}>
                    <FormControl className={styles.formControl}>
                        <InputLabel className={styles.inputMed}>Wybierz Rodzaj</InputLabel>
                        <Select className={styles.inputMed}
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={age}
                            onChange={handleChangeMedical}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'o'}>o - zab niewyrzniety</MenuItem>
                            <MenuItem value={'k'}>k - korona proteza</MenuItem>
                            <MenuItem value={'~'}>~ - kamień lub osad nazębny</MenuItem>
                            <MenuItem value={'-'}>- - brak zęba</MenuItem>
                            <MenuItem value={'c'}>c - próchnica</MenuItem>
                            <MenuItem value={'w'}>w - wypełnienie</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleAdd}>
                        Dodaj
                    </Button>
                </div>
                <div className={styles.card}>
                    <div className={styles.description}>{description}</div>
                    <div className={styles.image}>
                        <ImageMarker
                            src={src}
                            markers={markers}
                            onAddMarker={(marker: Marker) => {
                                console.log('dod' + JSON.stringify(markers));
                                currentX = (marker.left as number);
                                currentY = (marker.top as number);
                                console.log('sssss' + JSON.stringify(currentY));
                                let tempMarkers = markers;
                                tempMarkers.push({
                                    top: marker.top, //10% of the image relative size from top
                                    left: marker.left,
                                    itemNumber: 1
                                });
                                history.push({
                                    top: marker.top,
                                    left: marker.left,
                                    type: type
                                })

                            }}
                            markerComponent={CustomMarker}
                        />
                    </div>
                </div>
            </div>
        </>
}

export default MedicalTeeth;




