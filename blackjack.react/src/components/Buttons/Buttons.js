import React from 'react';
import classes from '../../App.module.css';

const buttons = (props) => (
    <div className={classes.Buttons}>
        <button onClick={props.clickDeal} className={props.active.dealButton ? null : classes.disabled}>Deal</button>
        <button onClick={props.clickDouble} className={props.active.doubleButton ? null : classes.disabled}>Double</button>
        <button onClick={props.clickHit} className={props.active.hitButton ? null : classes.disabled}>Hit</button>
        <button onClick={props.clickStand} className={props.active.standButton ? null : classes.disabled}>Stand</button>
    </div>
);

export default buttons