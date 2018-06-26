import React from 'react';
import {Navbar, NavItem} from 'react-materialize';
import './index.css';


export default () => {
    return (
        <Navbar className='navbar blue' brand='Stasher Test' right>
            <NavItem href='https://github.com/rafaelpadovani'>GitHub Source Code</NavItem>
        </Navbar>
    )
}
