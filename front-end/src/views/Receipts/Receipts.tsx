import React, {Component} from 'react';
import style from './Receipts.module.scss'

export class Receipts extends Component {
    constructor({props}: { props: any }){
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <div className={style.wrapper}>
                    Pacjeci
            </div>
        );
    }
}
