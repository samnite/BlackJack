import React from 'react';
import Aux from '../../hoc/Auks';
import classes from '../../App.module.css';
import Card from '../Card/Card';
import Buttons from '../Buttons/Buttons';

const table = (props) => {

    const dealerHand = [classes.dealer_hand, classes.hand];
    return (
        <Aux>
            <div className={classes.header}>
                <h1>Black Jack</h1>
            </div>
            <div className={classes.table}>
                <div className={classes.messages}>
                    <h2>{props.message}</h2>
                </div>

                <label className={classes.dealer_label} > Dealer: {props.show ? null : props.dealer.scores} </label>
                <div className={dealerHand.join(' ')}>
                    {props.show ? (
                                <Aux>
                                    <Card card={props.dealer.cards[0]} />
                                    <Card card="Back" />
                                </Aux>
                            ) : props.dealer.cards.map((el, i) => {
                            return <Card card={el} key={i}/>
                        })
                    }
                </div>

                <label className={classes.player_label}>Player: {props.player.scores === 0 ? null : props.player.scores}</label>
                <div className={dealerHand.join(' ')}>
                    {props.player.cards.map((el, i) => {
                        return <Card card={el} key={i}/>
                    })}
                </div>
                <Buttons
                    clickDouble={props.clickDouble} 
                    clickStand={props.clickStand}
                    clickDeal={props.clickDeal}
                    clickHit={props.clickHit}
                    active={props.active} />                
            </div>
        </Aux>
    )
}

export default table;