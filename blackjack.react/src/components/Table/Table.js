import React from 'react';
import Aux from '../../hoc/Auks';
import classes from '../../App.module.css';

const table = (props) => {
    console.log(props)
    return (
        <Aux>
            <div className={classes.header}>
                <h1>Black Jack</h1>
            </div>
            <div className={classes.table}>
                <div className={classes.messages}>
                    <h2>Good Luck!</h2>
                </div>

                <label className={classes.dealer_label}> Dealer: </label>
                <div className={classes.dealer_hand}>

                </div>

                <label className={classes.player_label}>Player: </label>
                <div className={classes.player_hand}>

                </div>

                <div className={classes.Buttons}>
                    <button className={props.active.dealButton ? null : classes.disabled}>Deal</button>
                    <button className={props.active.doubleButton ? null : classes.disabled}>Double</button>
                    <button className={props.active.hitButton ? null : classes.disabled}>Hit</button>
                    <button className={props.active.standButton ? null : classes.disabled}>Stand</button>
                </div>
            </div>
        </Aux>
    )
}

export default table;