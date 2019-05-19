import React, { Component } from 'react';
import Table from './components/Table/Table';
import classes from './App.module.css';
import Chips from './components/Chips/Chips';


class App extends Component {
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
    message: 'Good Luck!',
    dealer: {
      cards: [],
      cardsScores: [],
      scores: 0
    },
    isActiveButtons: {
      dealButton: false,
      doubleButton: false,
      hitButton: false,
      standButton: false
    },
    isActiveChips: true,
    showBack: false
  }

   init() {
    const initCards = [];
    const initDeckScores = []; 
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
    this.setState({cards: initCards, deckScores: initDeckScores});
    console.log(initCards, initDeckScores);
  }
  
  componentDidMount() {
    this.init();
  }

  nextTurn = (type) => {  
    const gamer = {...this.state[type]};     
    const cardsTurn = [...this.state.cards];
    const deckScoresTurn = [...this.state.deckScores];
    console.log(cardsTurn)
    gamer.cards.push(this.state.cards[this.state.cards.length - 1]);
    gamer.cardsScores.push(this.state.deckScores[this.state.deckScores.length - 1]);   
    cardsTurn.pop();
    deckScoresTurn.pop();
    gamer.scores = gamer.cardsScores.reduce((sum, current) => {
      return sum + current
    },0);
    this.setState({cards: cardsTurn, deckScores: deckScoresTurn, [type]: gamer});
    if (gamer.scores > 21) this.cutAce(type);
  }

  startRound = async () => {
    const player = 'player';
    const dealer = 'dealer';  
    await this.nextTurn(player);
    await this.nextTurn(player);
    await this.nextTurn(dealer);
    await this.nextTurn(dealer);
    if (this.state.player.scores === 21) this.blackJack();
    const state = {...this.state.isActiveButtons};
    state.dealButton = false;
    state.doubleButton = true;
    state.standButton = true;
    state.hitButton = true;
    this.setState({isActiveButtons: state, isActiveChips: false, message: 'Good Luck!', showBack: true});     
  }

  blackJack = () => {

  }

  changeBetHandler = (count) => {
    if (this.state.bet + count > this.state.money) {
      this.setState((prevState, props) => {
        return {message: 'Insufficient funds!'}
      });
    } else {
      const buttons = {...this.state.isActiveButtons};
      buttons.dealButton = true;  
      this.setState((prevState, props) => {
        return {isActiveButtons: buttons, bet: prevState.bet + count}
      });
    }
  }

  cutAce = (type) => {
    const playerType = {...this.state[type]};
    for (let i = 0; i < playerType.cards.length; i++) {
      if (playerType.cardsScores[i] === 11) playerType.cardsScores[i] = 1;
    }
    playerType.scores = playerType.cardsScores.reduce((sum, current) => {
			return sum + current;
      }, 0);
    console.log(playerType);
    this.setState({[type]: playerType});
  }

  hitButtonHandler = () => {
    const player = 'player';
    const dealer = 'dealer'; 
    this.nextTurn(player);
    // if (this.state.player.scores > 21)
  }

  render () {      
    return (
      <div className={classes.body}>
        <Table 
          active={this.state.isActiveButtons}
          player={this.state.player}
          clickDeal={this.startRound}
          clickHit={this.hitButtonHandler}
          dealer={this.state.dealer}
          message={this.state.message}
          show={this.state.showBack} />
        <Chips         
          change5={() => this.changeBetHandler(5)}  
          change10={() => this.changeBetHandler(10)}   
          change15={() => this.changeBetHandler(15)}  
          change50={() => this.changeBetHandler(50)}  
          money={this.state.money}
          bet={this.state.bet}
          isActive={this.state.isActiveChips} />
      </div>
    );
  }
}

export default App;
