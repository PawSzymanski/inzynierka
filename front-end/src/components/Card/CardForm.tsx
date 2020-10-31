import React, {FunctionComponent, useState} from 'react';
import markImg from '../../assets/indicator.png'
import ImageMarker, {Marker, MarkerComponentProps} from 'react-image-marker';
import {Button, TextField, Tooltip} from "@material-ui/core";
import styles from './CardForm.module.scss'

const CustomMarker = (props: MarkerComponentProps) => {
    return (<>
                <Tooltip title={aa[(props.itemNumber as number)]} placement="top">
                    <div className={styles.img1}>
                        <img src={markImg}/>
                    </div>
                </Tooltip>
            </>
    );
};

let a = '';

let aa = ['1111111', 'sssssss']

const CardForm:FunctionComponent<{ children: any, description: any, src: any }> = ({ children, description, src}) => {
    // since we pass a number here, clicks is going to be a number.
    // setClicks is a function that accepts either a number or a function returning
    // a number
    const [markers, setMarkers] = useState<MarkerComponentProps[]>([{
        top: 20, //10% of the image relative size from top
        left: 90, //50% of the image relative size from left
        itemNumber: 0
    },{
        top: 40, //10% of the image relative size from top
        left: 30, //50% of the image relative size from left
        itemNumber: 1
    }]);

    const [value, setValue] = useState('');

    const handleChange = (event : React.ChangeEvent<any>) => {
        a = event.target.value;
        setValue(event.target.value);
    };
        return <>
                <div className={styles.wrapper}>
                    <div className={styles.card}>
                        <div className={styles.description}>{description}</div>
                        <div className={styles.image}>
                            <ImageMarker
                                src={src}
                                markers={markers}
                                onAddMarker={(marker: Marker) => {
                                    console.log('dod' + JSON.stringify(markers));
                                    setMarkers([{
                                        top: marker.top, //10% of the image relative size from top
                                        left: marker.left,
                                        itemNumber: 1
                                    }]);
                                }}
                                markerComponent={CustomMarker}
                            />
                        </div>
                        <div className={styles.info}>
                            <span className={styles.icon}>i</span>
                            <p>
                                {children}
                            </p>
                        </div>
                    </div>
                    <div className={styles.card2}>
                        <TextField id="standard-basic"
                                   label="Standard"
                                   value={value}
                                   onChange={handleChange}
                        />
                        <Button variant="contained" color="primary" >
                            Dodaj
                        </Button>
                    </div>
                </div>
            </>
}

export default CardForm;




