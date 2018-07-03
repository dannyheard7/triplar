import React from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import {logout} from "Auth/actions";

export class NavigationBar extends React.Component {

    constructor(props){
        super(props);

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick(e) {
        this.props.dispatch(logout());
    }

    render() {
        const {isAuthenticated, user} = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {isAuthenticated &&
                    <Link to='/board' activeclassname="active" className="navbar-brand">Triplar</Link>
                }
                {!isAuthenticated &&
                    <Link to='/login' activeclassname="active" className="navbar-brand">Triplar</Link>
                }

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>



                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {!isAuthenticated &&
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item" id="login-nav-item">
                                <Link to='/login' className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item" id="register-nav-item">
                                <Link to='/register' className="nav-link">Register</Link>
                            </li>
                        </ul>
                    }
                    {isAuthenticated &&
                         <ul className="navbar-nav ml-auto">
                             <li className="nav-item dropdown">
                                 <a className="nav-link dropdown-toggle" href="#" id="user-dropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">
                                     {user.email}
                                 </a>
                                 <div className="dropdown-menu" aria-labelledby="user-dropdown">
                                     <a className="dropdown-item" id="logout-button" onClick={this.onLogoutClick}>Logout</a>
                                 </div>
                             </li>
                        </ul>
                    }
                </div>

            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(NavigationBar)