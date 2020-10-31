import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import {fetchUserPoints, toggleDialog} from "../../actions";
import {getPoints} from "../../reducers";

function DialogUI(props) {

    return (
        <div>
            <Dialog
                open={props.isDialogOpen}
                onClose={props.toggleDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Czy chcesz dokonać rezerwacji ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Po akceptacji rezerwacja zostanie dodana do konta. <br/>
                        Wszystkie rezerwacje możesz wyświetlić w zakładce "Rezerwacje".
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.toggleDialog} color="primary">
                        Odrzuć
                    </Button>
                    <Button onClick={() => {
                        props.setByPoints();
                        props.toggleDialog();
                    }}color="secondary">
                        Wykorzystaj punkty
                    </Button>
                    <Button onClick={() => {
                        props.setReservation();
                        props.toggleDialog();
                    }} color="primary">
                        Akceptuj
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps=dispatch=>({
    toggleDialog:()=>dispatch(toggleDialog()),
    fetchUserPoints:(user)=>dispatch(fetchUserPoints(user)),
});

const mapStateToProps = state=>({
    userLogin: state.userLogin,
    isDialogOpen: state.isDialogOpen,
    points:getPoints(state),
})

export default connect(mapStateToProps,mapDispatchToProps)(DialogUI);
