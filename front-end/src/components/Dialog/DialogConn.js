import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import {toggleDialog,fetchAllRoadDetails} from "../../actions";
import ConnectionForm from "../RoadTable/ConnectionForm";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import axios from "axios";
// import {useAlert} from "react-alert";
import {getAllRoad} from "../../reducers";

const StyledTableCell = withStyles((theme) => ({

    head: {
        backgroundColor: '#19615b',
        color: theme.palette.common.white,
        fontWeight: '600',
    },


    body: {
        fontSize: 14,

    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {

        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,

        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 200,

    },
    button:{
        margin:0,
        borderRadius:'20px',
        backgroundColor:'#19615B',
        color:"white",

        '&:active':{
            backgroundColor:'#548D96',
        }
    },
    dialog:{
        Width: '400px',
    }

});

function DialogConn(props) {

    const classes = useStyles();
    const alert = null; //= useAlert()

    let [conn_details] = useState([]);

    conn_details=props.getConn();

    const [state, setState] = useState({
        driver_c: '',
        vehicle_c: '',
        date_c:'',
        userLogin:props.userLogin
    });

    const handleChange = (driver,vehicle,date) => {
        setState({
            driver_c: driver,
            vehicle_c: vehicle,
            date_c:date,
        });
    };

    const setTrip = async() => {
       await axios.post('/api/connection/add',
            {
                "roadDate": state.date_c,
                "vehicle": state.vehicle_c,
                "driver": state.driver_c,
                "roadPartId": conn_details[0]
            })
            .then(()=>alert.success(<div style={{ textTransform: 'lowercase', textAlign:'center' }}>Kurs dodany</div>))
            .catch((err)=>console.log(err));
                    state.date_c='';
                    state.vehicle_c='';
                    state.driver_c='';
                    props.fetchAllRoadDetails();
    }

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth = {'md'}
                open={props.isDialogOpen}
                onClose={props.toggleDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Uzupełnij aby dodać kurs:"}</DialogTitle>
                <DialogContent >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Data</StyledTableCell>
                                    <StyledTableCell align="center">Pojazd</StyledTableCell>
                                    <StyledTableCell align="center">Kierowca</StyledTableCell>
                                    <StyledTableCell align="center">Startowy przystanek</StyledTableCell>
                                    <StyledTableCell align="center">Końcowy przystanek</StyledTableCell>
                                    <StyledTableCell align="center">Odległość</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    <StyledTableRow >
                                        <StyledTableCell align="center">{state.date_c}</StyledTableCell>
                                        <StyledTableCell align="center">{state.vehicle_c}</StyledTableCell>
                                        <StyledTableCell align="center">{state.driver_c}</StyledTableCell>
                                        <StyledTableCell align="center">{conn_details[1]}</StyledTableCell>
                                        <StyledTableCell align="center">{conn_details[2]}</StyledTableCell>
                                        <StyledTableCell align="center">{conn_details[3]}</StyledTableCell>
                                    </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ConnectionForm  {...state} handleChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.toggleDialog} color="primary">
                        Odrzuć
                    </Button>
                    <Button onClick={() => {
                        setTrip();
                        props.toggleDialog();
                    }} color="primary">
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps=dispatch=>({
    toggleDialog:()=>dispatch(toggleDialog()),
    fetchAllRoadDetails:()=>dispatch(fetchAllRoadDetails())

});

const mapStateToProps = state=>({
    isRoadDialogOpen: state.isRoadDialogOpen,
    isDialogOpen: state.isDialogOpen,
    userLogin: state.userLogin,
    allRoad: getAllRoad(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogConn);
