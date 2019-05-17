import React from 'react';
import Aux from '../../hoc/Auks';
import classes from '../../App.module.css';
import Card from '../Card/Card';

const table = (props) => {

    const dealerHand = [classes.dealer_hand, classes.hand];
    return (
        <Aux>
            <div className={classes.header}>
                <h1>Black Jack</h1>
            </div>
            <div className={classes.table}>
                <div className={classes.messages}>
                    <h2>Good Luck!</h2>
                </div>

                <label className={classes.dealer_label} > Dealer: </label>
                <div className={dealerHand.join(' ')}>
                    {props.dealer.cards.map((el, i) => {
                        return <Card card={el} key={i}/>
                    })}
                </div>

                <label className={classes.player_label}>Player: {props.player.scores}</label>
                <div className={dealerHand.join(' ')}>
                    {props.player.cards.map((el, i) => {
                        return <Card card={el} key={i}/>
                    })}
                </div>

                <div className={classes.Buttons}>
                    <button onClick={props.click} className={props.active.dealButton ? null : classes.disabled}>Deal</button>
                    <button className={props.active.doubleButton ? null : classes.disabled}>Double</button>
                    <button className={props.active.hitButton ? null : classes.disabled}>Hit</button>
                    <button className={props.active.standButton ? null : classes.disabled}>Stand</button>
                </div>
            </div>
        </Aux>
    )
}

export default table;