import React, {FunctionComponent, useState} from 'react';
import markImg from '../../assets/indicator.png'
import ImageMarker, {Marker, MarkerComponentProps} from 'react-image-marker';
import {Button, TextField, Tooltip} from "@material-ui/core";
import styles from './CardForm.module.scss'
import {TeethView} from "../../enum/TeethView";
import axios from "axios";

const CardForm:FunctionComponent<{ viewType: TeethView, description: any, src: any , visit: any}> = ({ viewType, description, src, visit}) => {
    // since we pass a number here, clicks is going to be a number.
    // setClicks is a function that accepts either a number or a function returning
    // a number
    const [markers, setMarkers] = useState<MarkerComponentProps[]>([]);
    const [markersVanilla, setMarkersVanilla] = useState<any[]>([]);

    const [value, setValue] = useState({});

    const [newMarker, setNewMarker] = useState({x:1 as Number, y:1 as Number});

    const CustomMarker = (props: MarkerComponentProps) => {
        return (<>
                <Tooltip title={getTile(props.left, props.top)} placement="top">
                    <div className={styles.img1}>
                        <img src={markImg}/>
                    </div>
                </Tooltip>
            </>
        );
    };

    function getTile(x: Number, y: Number): string{

        for (let i = 0; i < markersVanilla.length; ++i) {
            console.log(JSON.stringify(markersVanilla[i].left + '     ' +x ));
            if(markersVanilla[i].left === x && y === markersVanilla[i].top) {
                console.log(JSON.stringify(markersVanilla[i].message));
                return markersVanilla[i].message;
            }
        }
        console.log("nullllllllssss");
        return '';
    }

    const handleChange = (event : React.ChangeEvent<any>) => {
        setValue(event.target.value);
    };

    const getHistory = async() => {
        let data = await axios.get('api/photoIndicators/search/findAllByVisit_IdAndTeethView' +
            '?visitId=' + visit.id + '&teethView=' + TeethView[viewType]);
        let data1 = data.data._embedded.photoIndicators.map((val: any) => ({
            id: val.id,
            left: val.x,
            top: val.y,
            message: val.message
        }));
        console.log(JSON.stringify(data1));
        setMarkers(data1);
        setMarkersVanilla(data1);
    }

    // if (!isLoaded) {
    //     console.log('CONSTRUCTOR');
    //     getHistory();
    //     isLoaded = true;
    // }

    const addInd = async() => {
        console.log(JSON.stringify(visit));
        console.log(JSON.stringify({
            "teethView": TeethView[viewType] ,
            "x": newMarker.x,
            "y": newMarker.y,
            "message": value,
            "visit_id": visit.id,
        }));
        await axios.post('/api/patient/addIndicatorToVisit',
            {
                "teethView": TeethView[viewType],
                "x": newMarker.x,
                "y": newMarker.y,
                "message": value,
                "visit_id": visit.id,
            })
            .then(()=>{
                getHistory();
            })
            .catch((err)=>console.log(err));
    }

        return <>
                <div className={styles.wrapper}>
                    <div className={styles.card}>
                        <div className={styles.description}>{description}</div>
                        <div className={styles.image}>
                            <ImageMarker
                                src={src}
                                markers={markers}
                                onAddMarker={(marker: Marker) => {
                                    setMarkers([{
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
                        </div>
                        <div className={styles.info}>
                            <span className={styles.icon}>i</span>
                            {/*<p>*/}
                            {/*    {children}*/}
                            {/*</p>*/}
                        </div>
                    </div>
                    <div className={styles.card2}>
                        <TextField id="standard-basic"
                                   label="Standard"
                                   value={value}
                                   onChange={handleChange}
                        />
                        <Button onClick={addInd} variant="contained" color="primary" >
                            Dodaj
                        </Button>
                    </div>
                </div>
            </>
}

export default CardForm;




