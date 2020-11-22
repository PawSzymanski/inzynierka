import React, {FunctionComponent, useEffect, useState} from 'react';
import markImg from '../../assets/indicator.png'
import ImageMarker, {Marker, MarkerComponentProps} from 'react-image-marker';
import {Button, TextField, Tooltip} from "@material-ui/core";
import styles from './CardForm.module.scss'
import {TeethView} from "../../enum/TeethView";
import axios from "axios";
import {DropzoneArea} from "material-ui-dropzone";
import ReactTooltip from 'react-tooltip';

const CardForm:FunctionComponent<{
    viewType: TeethView, description: any, src: any , markers: any,
    markersVanilla: any, visit: any, getMarkers1: any, setMarkers1: any,
    patient: any, setSrc: any}> =
    ({ viewType, description, src, markers, markersVanilla, visit,
         getMarkers1, setMarkers1, patient, setSrc}) => {

    const [value, setValue] = useState('');
    const [rtg, setRtg] = useState('');

    const [newMarker, setNewMarker] = useState({x:1 as Number, y:1 as Number});

    const CustomMarker = (props: MarkerComponentProps) => {
        return (<>
                <div data-tip='' data-for={'' +props.left.toString() + '' + props.top.toString()}>
                    <img className={styles.img1} src={markImg}/>
                </div>
                <ReactTooltip id={'' + props.left.toString() + '' + props.top.toString()} getContent={() => {
                    return <><div >{getTile(props.left, props.top)}</div></>
                }}/>
            </>
        );
    }



    function getTile(x: Number, y: Number) {
        for (let i = 0; i < markersVanilla.length; ++i) {
            if (markersVanilla[i].left === x && y === markersVanilla[i].top) {
                return <>
                            <div>
                                <div>{markersVanilla[i].message}</div>
                                <img className={styles.img2} src={markersVanilla[i].RTGBase64}/>
                            </div>
                        </>;
            }
        }
        return '';
    }

    const handleChange = (event : React.ChangeEvent<any>) => {
        setValue(event.target.value);
    };

    const handleUploadFile = (files: Blob[]) => {
        if (files[0]) {
            getBase64(files[0], (result) => {

                addFile(result);
            });
        }

    };

    const handleUploadRTGFile = (files: Blob[]) => {
        if (files[0]) {
            getBase64(files[0], (result) => {
                setRtg(result);
            });
        }

    };

    const getBase64 = (file: Blob, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    useEffect(() => {
    },[]);

    const addInd = async() => {
        await axios.post('/api/patient/addIndicatorToVisit',
            {
                "teethView": TeethView[viewType],
                "x": newMarker.x,
                "y": newMarker.y,
                "message": value,
                "visit_id": visit.id,
                "rtgbase64": rtg,
            })
            .then(()=>{
                getMarkers1(visit);
                setValue("");
            })
            .catch((err)=>console.log(err));
    }

    const addFile = async(base64: any) => {
        await axios.post('/api/patient/addPhotoToVisit',
            {
                "teethView": TeethView[viewType],
                "visit_id": visit.id,
                "base64": base64
            })
            .then(()=>{
                setSrc(base64);
            })
            .catch((err)=>console.log(err));
    }

        return <>
                <div className={styles.wrapper}>
                    {patient ? (
                    <div className={styles.card2}>
                        <div style={{padding: 5, display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <TextField  style={{padding: 5}}
                                        id="standard-basic"
                                       label="Notatka"
                                       value={value}
                                       onChange={handleChange}
                            />
                            <div style={{padding: 5}}>
                                <DropzoneArea
                                    onChange={handleUploadRTGFile}
                                    dropzoneText={"Przeciągnij zdjęcie RTG"}
                                    maxFileSize={10000000}
                                    filesLimit={1}
                                />
                            </div>
                            <Button  onClick={addInd} variant="contained" color="primary" >
                                Dodaj notatkę
                            </Button>
                        </div>
                    </div>
                    ) : ( <div></div> )}
                    {patient ? (
                    <div className={styles.card}>
                        <div className={styles.description}>{description}</div>
                        <div className={styles.image}>
                            {src ? (
                            <ImageMarker
                                src={src}
                                markers={markers}
                                onAddMarker={(marker: Marker) => {
                                    setMarkers1([{
                                        top: marker.top,
                                        left: marker.left,
                                        itemNumber: 1
                                    }]);
                                    setNewMarker({
                                        y: marker.top,
                                        x: marker.left
                                    })
                                }}
                                markerComponent={CustomMarker}
                            />
                            ) : (
                                <DropzoneArea
                                    onChange={handleUploadFile}
                                    dropzoneText={"Przeciągnij zdjęcie tutaj"}
                                    maxFileSize={10000000}
                                    filesLimit={1}
                                />
                            )}
                        </div>
                        <div className={styles.info}>
                            <span className={styles.icon}>i</span>
                        </div>
                    </div>
                    ) : (
                    <div className={styles.cardPatient}>
                        <div className={styles.description}>{description}</div>
                        <div className={styles.image}>
                            {src ? (
                                <ImageMarker
                                    src={src}
                                    markers={markers}
                                    onAddMarker={(marker: Marker) => {
                                        setMarkers1([{
                                            top: marker.top,
                                            left: marker.left,
                                            itemNumber: 1
                                        }]);
                                        setNewMarker({
                                            y: marker.top,
                                            x: marker.left
                                        })
                                    }}
                                    markerComponent={CustomMarker}
                                />
                            ) : (
                                <div>brak historii z danego dnia</div>
                            )}
                        </div>
                        <div className={styles.info}>
                            <span className={styles.icon}>i</span>
                        </div>
                    </div>
                    )}
                </div>

            </>
}

export default CardForm;
