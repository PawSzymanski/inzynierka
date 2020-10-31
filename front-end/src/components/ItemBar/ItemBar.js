import React from 'react';
import styles from './ItemBar.module.scss';
import {connect} from "react-redux";

const ItemBar = ({children,isVisible}) => {

    return (
        <>
            <div className={isVisible ? styles.secondaryWrapper : styles.wrapper}>
                {children}
            </div>
        </>
    )
};

const mapStateToProps = (state) => {
    return { isVisible: state.isVisible };
};



export default connect(mapStateToProps,null)(ItemBar);




