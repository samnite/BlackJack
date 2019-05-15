import React, { Component } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Header from './components/Header/Header';



class App extends Component {
  init() {
    console.log('test')
  }

  state = {
    cards: [],
    deckScores: [],
    money: 500,
    bet: 0,
    player: {},
    dealer: {},
    isActiveButtons: {
      dealButton: true,
      doubleButton: false,
      hitButton: true,
      standButton: false
    }
  }

  generateDeck() {      
 
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
    console.log()
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

  render () {
    this.init()
    this.generateDeck()
    return (
      <div >
        <Header active={this.state.isActiveButtons}/>
        
      </div>
    );
  }
}

export default App;
