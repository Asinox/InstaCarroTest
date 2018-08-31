import React, {Component} from 'react';
import logo from '../assets/logo.png';
import phone from '../assets/phone.svg';
import user from '../assets/user.svg';

export default class Header extends Component{
    render(){
        return(
            <header className="header">
                <div className="wrapper grid-container">
                    <div className="logo">
                        <figure>
                            <img src={logo} alt="Instacarro" title="Instacarro" />
                        </figure>
                    </div>
                    <ul className="phone">
                        <li><figure><img src={phone} alt="Phone" /></figure> </li>
                        <li><span className="tel">(11) 3569-3465</span></li>
                    </ul>
                    <nav className="userMenu">
                        <figure>
                            <img src={user} alt="User Test" />
                            <figcaption>User Test</figcaption>
                        </figure>
                    </nav>
                </div>
            </header>
        );
    }
}