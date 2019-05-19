import React, { Component } from 'react';
import Table from './components/Table/Table';
import classes from './App.module.css';
import Chips from './components/Chips/Chips';


class App extends Component {
  state = {
    cards: ['Hearts6'],
    deckScores: [],
    money: 500,
    bet: 0,
    player: {
      cards: [],
      cardsScores: [],
      scores: 0
    },
    dealer: {
      cards: [],
      cardsScores: [],
      scores: 0
    },
    isActiveButtons: {
      dealButton: true,
      doubleButton: false,
      hitButton: false,
      standButton: false
    },
    isActiveChips: false
  }

  init() {
    const initCards = [...this.state.cards];
    const initDeckScores = [...this.state.deckScores]; 
    const generateDeck = {        
        tempSuits: [0, 0, 0, 0],
        suits: ['Hearts', 'Spades', 'Clubs', 'Diamonds'],
        values: ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'],
        weight: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
      };

      
      // Generate deck
      for (let i = 0; i < generateDeck.suits.length; i++) {
        for (let j = 0; j < generateDeck.values.length; j++) {
          initCards.push(generateDeck.suits[i]+generateDeck.values[j]);
          initDeckScores.push(generateDeck.tempSuits[i] + generateDeck.weight[j]);
        }      
      };
      
      //Shuffle deck      
      for (let i = initCards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp1 = initCards[i];
        let temp2 = initDeckScores[i];
        initCards[i] = initCards[j];
        initDeckScores[i] = initDeckScores[j];
        initCards[j] = temp1;
        initDeckScores[j] = temp2;
      };
      console.log(initCards, initDeckScores);
      this.setState({cards: initCards, deckScores: initDeckScores});
  }
  
  nextTurn = (type) => {  
    const gamer = {...this.state[type]};     
    const cards = [...this.state.cards];
    const deckScores = [...this.state.deckScores];
    
    gamer.cards.push(this.state.cards[this.state.cards.length - 1]);
    gamer.cardsScores.push(this.state.deckScores[this.state.deckScores.length - 1]);   
    cards.pop();
    deckScores.pop();
    gamer.scores = gamer.cardsScores.reduce((sum, current) => {
      return sum + current
    },0);
    this.setState({cards: cards, deckScores: deckScores, [type]: gamer});
  }

  startRound = () => {
    this.init();
    const player = 'player';
    const dealer = 'dealer';
    this.nextTurn(player);
    this.nextTurn(player);
    this.nextTurn(dealer);
    this.nextTurn(dealer);


    // const oldState = this.state.isActiveButtons;
    // oldState.dealButton = false;
    // this.setState({isActiveButtons: oldState}); 
    
  }

  render () {  
    
    return (
      <div className={classes.body}>
        <Table 
          active={this.state.isActiveButtons}
          player={this.state.player}
          click={this.startRound}
          dealer={this.state.dealer} />
        <Chips 
          
          money={this.state.money}
          bet={this.state.bet}
          isActive={this.state.isActiveChips} />
      </div>
    );
  }
}

export default App;
