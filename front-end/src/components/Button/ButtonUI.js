import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            backgroundColor: '#3D6075',
        },

    },
}));

const ColorButton  = withStyles((theme) => ({
    root: {
        backgroundColor: '#3D6075',
        fontWeight: '700',
        '&:hover': {
            backgroundColor: '#548D96',
        },


    },
}))(Button);

const ButtonUI=({children,...props})=>{
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <ColorButton  variant="contained" color="primary" {...props}>
                {children}
            </ColorButton >
        </div>
    );
}
export default ButtonUI;
