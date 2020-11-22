import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import {connect} from "react-redux";

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            Admin:'Admin_Role',
            User:'User_Role',
            Worker:'Worker_Role',
            Office:'Office_Role',
        };
    }

    render() {
        return (
            <nav>
                {
                <ul className={styles.wrapper}>
                    <li className={styles.navItemSecondary}>
                        <NavLink exact
                                 activeClassName={styles.navItemLinkActive}
                                 className={styles.navItemLink} to="/patients">Strona ggggggłówna</NavLink>
                    </li>
                </ul>
                }

                {this.props.userRole === this.state.Admin &&
                <ul className={styles.wrapper}>
                    <li className={styles.navItem}>
                        <NavLink exact
                                 activeClassName={styles.navItemLinkActive}
                                 className={styles.navItemLink} to="/patients">Strona główna</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/connSearch">Wyszukiwarka połączeń</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/allUsers">Użytkownicy</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/reservation">Rezerwacje</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/loyality">Program lojalnościowy</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/roads">Kursy</NavLink>
                    </li>
                </ul>
                }

                {this.props.userRole === this.state.User &&
                <ul className={styles.wrapper}>
                    <li className={styles.navItem}>
                        <NavLink exact
                                 activeClassName={styles.navItemLinkActive}
                                 className={styles.navItemLink} to="/patients">Strona główna</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/connSearch">Wyszukiwarka połączeń</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/reservation">Rezerwacje</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/loyality">Program lojalnościowy</NavLink>
                    </li>
                </ul>
                }

                {this.props.userRole === this.state.Worker &&
                <ul className={styles.wrapper}>
                    <li className={styles.navItem}>
                        <NavLink exact
                                 activeClassName={styles.navItemLinkActive}
                                 className={styles.navItemLink} to="/patients">Strona główna</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/roads">Kursy</NavLink>
                    </li>
                </ul>
                }

                {this.props.userRole === this.state.Office &&
                <ul className={styles.wrapper}>
                    <li className={styles.navItem}>
                        <NavLink exact
                                 activeClassName={styles.navItemLinkActive}
                                 className={styles.navItemLink} to="/patients">Strona główna</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/connSearch">Wyszukiwarka połączeń</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/reservation">Rezerwacje</NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            activeClassName={styles.navItemLinkActive}
                            className={styles.navItemLink} to="/roads">Kursy</NavLink>
                    </li>
                </ul>
                }
            </nav>
        );
    }
}

const mapStateToProps = state=>({
    userRole:state.userRole,
})

export default connect(mapStateToProps,null)(Nav);

