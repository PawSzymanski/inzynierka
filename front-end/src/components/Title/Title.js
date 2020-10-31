import React from 'react';
import styles from './Title.module.scss';

const Title = ({children,secondary}) => {

const titleClass = secondary ? styles.secondaryTitle : styles.title;

return (
    <>
        <h1 className={titleClass}>
            {children}
        </h1>
    </>
)
};

export default Title;
