import React from 'react';
import styles from './Header.module.scss';
import Nav from "../Navigation/Nav";
import ButtonUI from "../Button/ButtonUI";
import {connect} from "react-redux";
// import {useAlert} from "react-alert";

function Header(props) {

    const alert = null;//useAlert()

   const openModalReg = () => {
       props.toggleModal();
       props.toggleRegister();
    }

    const openModalLog = () => {
        props.toggleModal();
        props.toggleLogin();
    }

     const logout=()=>{
        localStorage.clear();
        props.isLogout();
        alert.show(<div style={{ textTransform: 'lowercase', textAlign:'center' }}>wylogowano</div>)
    }

            return (
                <header className={styles.wrapper}>
                    <i className="fas fa-route"/>
                    <Nav/>
                    {props.isLogged ?
                        <>
                            <p>Zalogowano jako: {props.userLogin} </p>
                            <ButtonUI onClick={logout}>Wyloguj</ButtonUI>
                        </>
                        :
                        <>
                            <ButtonUI onClick={openModalLog}>Logowanie</ButtonUI>
                            <ButtonUI onClick={openModalReg}>Rejestracja</ButtonUI>
                        </>}

                </header>
            );
}


export default connect(null,null)(Header);




