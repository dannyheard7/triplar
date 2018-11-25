import React from "react";
import {Link} from 'react-router-dom';

import {unsetUser} from "../../Auth/utils/actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";

export class HeaderAuthenticated extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false
        };

        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    onLogoutClick(e) {
        this.props.dispatch(unsetUser());
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({showDropdown: true}, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({showDropdown: false}, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeMenu);
    }

    render() {
        const {user} = this.props.auth;
        
        return (
            <div className="header">
                <Link to='/' activeclassname="active" className="brand">Triplar</Link>

                <button className="navbar-toggle" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <nav className="navbar">
                    <span className="nav-item nav-dropdown">
                        <button className="dropdown-toggle" onClick={this.showMenu}>
                            {user.email}
                            <i className="fa fa-caret-down"></i>
                            {this.state.showDropdown &&
                            <div className="dropdown-content" id="user-dropdown">
                                <a className="dropdown-item" id="logout-button" onClick={this.onLogoutClick}>Logout</a>
                            </div>
                            }
                        </button>
                    </span>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

// make Redux state piece of `login` and our action `loginRequest`
// available in this.props within our component
export default withRouter(connect(mapStateToProps)(HeaderAuthenticated));