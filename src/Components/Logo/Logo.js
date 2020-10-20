import React from 'react';

import classes from './Logo.css'

import BurgerLogo from '../../assets/burger-logo.png'

const Logo = () => (
    <div className={classes.Logo}>      
        <img src={BurgerLogo} alt="Logo Of Burger Builder"/>
    </div>
)

export default Logo;