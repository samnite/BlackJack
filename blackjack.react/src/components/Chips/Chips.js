import React from 'react';
import classes from '../../App.module.css';
import Aux from '../../hoc/Auks';
import chip5 from '../../assets/chips/chip-5.png'; 
import chip10 from '../../assets/chips/chip-10.png'; 
import chip15 from '../../assets/chips/chip-15.png'; 
import chip50 from '../../assets/chips/chip-50.png'; 

const chips = (props) => {
    return (
        <Aux>
            <div className={classes.betting}>
                <div className={classes.bet_square}>
                    <p>Bet</p>
                    <p>${props.bet}</p>
                </div>
                <div className={classes.pot_square}>
                    <p>Money</p>
                    <p>${props.money}</p>
                </div>

                <div className={props.isActive ? null : classes.chipsDisable}>
                    <img src={chip5} alt="" onClick={props.change5} />
                    <img src={chip10} alt="" onClick={props.change10}/>
                    <img src={chip15} alt="" onClick={props.change15}/>
                    <img src={chip50} alt="" onClick={props.change50}/>
                </div>
            </div>
        </Aux>
    )
}

export default chips;