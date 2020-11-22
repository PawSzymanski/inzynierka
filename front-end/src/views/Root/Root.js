import React from 'react';
import './Root.css';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';

import {connect} from "react-redux";
import Header from "../../components/Header/Header";
import History from "../MainPage/History";
import Patients from "../Patients/Patients";
import PatientsView from "../PatientsView/PatientsView";
import Modal from "../../components/Modal/Modal";


export class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <BrowserRouter>
                <Header/>
                <Route path="/">
                    {<Redirect to="/patients"/>}
                    <Route exact path="/history" component={History}/>
                    <Route exact path="/patients" component={Patients}/>
                    <Route path="/patientsView" component={PatientsView}/>
                    <Route path="/login" component={PatientsView}  />
                </Route>
                {this.props.isModalOpen && <Modal/>}
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    userRole: state.userRole,
    isModalOpen: state.isModalOpen,
    isLogged: state.isLogged
})

connect(mapStateToProps, null)(Root);


