import React, {Component} from 'react';
import {connect} from "react-redux";

class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            editUser: {
                id:'',
                name:'',
                surname:'',
                login:'',
                password:'',
                email:'',
                birthday:'',
                phone:'',
            },
        };
    }

    render() {
        return (
            <>
                {/*{*/}
                {/*    this.props.isLoginOpen &&*/}
                {/*    <div className={styles.wrapper}>*/}
                {/*        <div className={styles.form}>*/}
                {/*            <LoginForm />*/}
                {/*            <p onClick={()=>{*/}
                {/*                this.props.toggleModal();*/}
                {/*                this.props.toggleLogin();*/}
                {/*            }}>Zamknij logowanie</p>*/}
                {/*        </div>*/}
                {/*        <div className={styles.logo}/>*/}
                {/*    </div>*/}
                {/*}*/}
                {/*{*/}
                {/*    this.props.isRegisterOpen &&*/}
                {/*    <div className={styles.secondaryWrapper}>*/}
                {/*        <div className={styles.secondaryLogo}/>*/}
                {/*        <div className={styles.secondaryForm}>*/}
                {/*                        <RegisterForm {...this.state}/>*/}
                {/*            <p onClick={()=>{*/}
                {/*                this.props.toggleModal();*/}
                {/*                this.props.toggleRegister();*/}
                {/*            }}>Zamknij rejestrację</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*}*/}

            </>
        );
    }
}

export default connect(null,null)(Modal);

