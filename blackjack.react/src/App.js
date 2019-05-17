import React, { Component } from 'react';
import Table from './components/Table/Table';
import classes from './App.module.css';
import Chips from './components/Chips/Chips';




class App extends Component {
  init() {
    const generateDeck = () => {
      const generateDeck = {        
        tempSuits: [0, 0, 0, 0],
        suits: ['Hearts', 'Spades', 'Clubs', 'Diamonds'],
        values: ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'],
        weight: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    };  
      for (let i = 0; i < generateDeck.suits.length; i++) {
        for (let j = 0; j < generateDeck.values.length; j++) {
          this.state.cards.push(generateDeck.suits[i]+generateDeck.values[j]);
          this.state.deckScores.push(generateDeck.tempSuits[i] + generateDeck.weight[j]);
        }
      };
      this.shuffleDeck(this.state.cards, this.state.deckScores)
    };
    generateDeck();
  }

  state = {
    cards: [],
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


  shuffleDeck = (arr1, arr2) => {
    for (let i = arr1.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp1 = arr1[i];
    let temp2 = arr2[i];
    arr1[i] = arr1[j];
    arr2[i] = arr2[j];
    arr1[j] = temp1;
    arr2[j] = temp2;
    }
  }

  nextTurn = (type) => {  
    const oldState = type;     
    type.cards.push(this.state.cards[this.state.cards.length - 1]);
    type.cardsScores.push(this.state.deckScores[this.state.deckScores.length - 1]);
    this.state.cards.pop();
    this.state.deckScores.pop();
    type.scores = type.cardsScores.reduce((sum, current) => {
      return sum + current
    },0)
    console.log(oldState)
  }

  startRound = () => {
    this.nextTurn(this.state.player);
    this.nextTurn(this.state.player);
    this.nextTurn(this.state.dealer);
    this.nextTurn(this.state.dealer);
    const oldState = this.state.isActiveButtons;
    oldState.dealButton = false;
    this.setState({isActiveButtons: oldState}); 
    console.log(this.state)   
  }

  render () {
    this.init()   
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
