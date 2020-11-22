import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './MedicalTeeth.module.scss'
import ImageMarker, {Marker, MarkerComponentProps} from 'react-image-marker';
import {Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../store";
import axios from "axios";

const CustomMarker = (props: MarkerComponentProps) => {
    return (<>
                <h1>{getType(props)}</h1>
            </>
    );
};

let type = '';
let currentX: number;
let currentY: number;

let history = Array<any>();

function getType(props: MarkerComponentProps) : string {
    return history.find(s => props.left == s.left && props.top == s.top)?.type
}

let isAdded = false;
const MedicalTeeth:FunctionComponent<{ children: any, description: any, src: any }> = ({ children, description, src}) => {
    // since we pass a number here, clicks is going to be a number.
    // setClicks is a function that accepts either a number or a function returning
    // a number
    const [markers, setMarkers] = useState<MarkerComponentProps[]>([]);
    const dispatch = useDispatch();

    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChangeMedical = (event : React.ChangeEvent<any>) => {
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

    const handleAdd = async() => {
        await axios.post('/api/patient/history',
            {
                "type":type,
                "x": currentX,
                "y": currentY,
                "patient_id": patient.id
            })
            .then(()=>{
                isAdded = false;
            })
            .catch((err)=>console.log(err));
    }

    const getHistory = async() => {
        if(patient !== undefined) {
            let data = await axios.get('/api/histories/search/findAllByPatient_Id?id=' + patient.id);
            let data1 = data.data._embedded.histories.map((val: any) => ({
                top: val.y,
                left: val.x,
                type: val.type
            }));
            history = data1;

            setMarkers(data1);
        }
    }

    useEffect(() => {
        getHistory();
    }, []);
        return <>
            <div className={styles.wrapper}>

                <div className={styles.card}>
                    <div className={styles.description}>{description}</div>
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
                            Dodaj rodzaj leczenia
                        </Button>
                    </div>
                    <div className={styles.image}>
                        <ImageMarker
                            src={src}
                            markers={history}
                            onAddMarker={(marker: Marker) => {
                                currentX = (marker.left as number);
                                currentY = (marker.top as number);
                                if (!isAdded) {
                                    isAdded = true;
                                } else {
                                    history.splice(-1,1)
                                }
                                setMarkers([...history, {
                                    top: marker.top,
                                    left: marker.left,
                                    type: type
                                }]);
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




