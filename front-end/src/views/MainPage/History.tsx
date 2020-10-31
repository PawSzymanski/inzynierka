import React, {FunctionComponent} from 'react';
import styles from './History.module.scss'
import CardForm from "../../components/Card/CardForm";
import teeth from '../../assets/upTeeth.png'
import MedicalTeeth from "../../components/medicalTeeth/MedicalTeeth";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import {MenuItem} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../store";
import * as actionTypes from "../../models/ActionModel"
import {getAllPatients} from "../../actions";

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

type connectedP = {
    loggedIn: boolean,
    patients: object,
    isAlive: boolean,
}

const History:FunctionComponent<{}> = ({}) => {

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event : React.ChangeEvent<any>)  => {
        setPersonName(event.target.value);
    };

    const { patient } = useSelector<rootState, any>((state: rootState) => {
        let p = state.rootStore.patients.find((x: any)=> x.id == state.rootStore.currPatientId)
        return {
            patient: p
        }
    });


    const dispatch = useDispatch();
    console.log('2');
        return (
            <>
                <div className={styles.mainClass}>
                    <div className={styles.cardWrapper}>
                        <div >
                            Data wizyty:
                            <Select className={styles.date}
                                    labelId="demo-single-name-label"
                                    id="demo-single-name"
                                    value={personName}
                                    onChange={handleChange}
                                    input={<Input />}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        <CardForm src={teeth} description={'Łuk górny'}
                                            children={''}/>
                        <CardForm src={teeth} description={'Przód'}
                                              children={''}/>
                        <CardForm src={teeth} description={'Łuk dolny'}
                                              children={''}/>
                    </div>
                    <div className={styles.medical}>
                        <div className={styles.info}>
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
