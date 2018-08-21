import React from "react";
import {Link} from 'react-router-dom';

export default function HeaderUnauthenticated(props) {
    return (
        <div className="header">
            <Link to='/' activeclassname="active" className="brand">Triplar</Link>

            <button className="navbar-toggle" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <nav className="navbar">
                <span className="nav-item" id="login-nav-item">
                    <Link to='/login' className="nav-link">Login</Link>
                </span>
                <span className="nav-item" id="register-nav-item">
                    <Link to='/register' className="nav-link">Register</Link>
                </span>
            </nav>
        </div>
    );
}
