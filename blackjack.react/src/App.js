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
      scores: null
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
    const buttons = {...this.state.isActiveButtons}
    buttons.dealButton = false;
    buttons.doubleButton = false;
    buttons.hitButton = false;
    buttons.standButton = false;

    this.setState({
      cards: initCards, 
      deckScores: initDeckScores,
      isActiveChips: true,
      isActiveButtons: buttons,
      bet: 0
    });
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
    const state = {...this.state.isActiveButtons};
    state.dealButton = false;
    state.doubleButton = true;
    state.standButton = true;
    state.hitButton = true;
    this.setState({isActiveButtons: state, isActiveChips: false, message: 'Good Luck!', showBack: true});     
    if (this.state.player.scores === 21) this.blackJack();
  }

  blackJack = () => {
    this.setState((prevState, props) => {
      return {
        money: prevState.money + (prevState.bet * 1.5), 
        message: 'Black Jack!!!', 
        bet: 0,
        showBack: false 
        }
    })
    this.init();
  }

  changeBetHandler = (count) => {
    if (this.state.bet + count > this.state.money) {
      this.setState((prevState, props) => {
        return {message: 'Insufficient funds!'}
      });
    } else {
      this.clearFields();
      const buttons = {...this.state.isActiveButtons};
      buttons.dealButton = true;  
      this.setState((prevState, props) => {
        return {isActiveButtons: buttons, bet: prevState.bet + count, message: 'Good Luck!'}
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

  hitButtonHandler = async () => {
    const player = 'player';
    await this.nextTurn(player);
    this.setState({message: 'Good Luck!'});
    if (this.state.player.scores > 21)  this.playerLoseHandler();
  }

  clearFields = () => {
    const player = {
      cards: [],
      cardsScores: [],
      scores: 0
    };
    const dealer = {
      cards: [],
      cardsScores: [],
      scores: null
    };
    this.setState({player: player, dealer: dealer})
  }

  
  doubleButtonHandler = async () => {
    if(this.state.bet * 2 < this.state.money) {
      await this.hitButtonHandler();
      this.setState((prevState, props) => {
        return {
          bet: prevState.bet * 2
        }
      });
      await this.dealerTurnHandler();
    } else {
      this.setState({message: 'Insufficient funds!'})
    }
  }

  dealerTurnHandler = async () => {
    const dealer = 'dealer';
    if(this.state.dealer.scores < 18) {
      for (let i=0; this.state.dealer.scores < 18; i++) {
        await this.nextTurn(dealer);
      }
    }
    this.setState({showBack: false});
    this.endTurnHandler();
  }

  playerWinHandler = () => {
    this.setState((prevState, props) => {
      return {
        message: 'You Win!',
        showBack: false,
        money: prevState.money + prevState.bet
      }
    });
    this.init();
  }

  playerLoseHandler = () => {
    this.setState((prevState, props) => {
      return {
        message: 'You Lose!',
        showBack: false,
        money: prevState.money - prevState.bet
      }
    });
    this.init();
  }
  
  endTurnHandler = () => {
    if (this.state.player.scores > this.state.dealer.scores && this.state.player.scores <= 21) {
      this.playerWinHandler();
      } else if (this.state.player.scores > 21) {
          this.playerLoseHandler();
      } else if (this.state.player.scores <= 21 && this.state.dealer.scores > 21) {
          this.playerWinHandler();
      } else if (this.state.player.scores <= 21 && this.state.dealer.scores <= 21 && this.state.player.scores < this.state.dealer.scores) {
          this.playerLoseHandler();
      } else {
          this.setState((prevStatem, props) => {
            return {
              message: 'Draw!',
              showBack: false              
            }
          });
          this.init();
      }
  }

  render () {      
    return (
      <div className={classes.body}>
        <Table 
          active={this.state.isActiveButtons}
          player={this.state.player}
          clickDeal={this.startRound}
          clickHit={this.hitButtonHandler}
          clickDouble={this.doubleButtonHandler}
          clickStand={this.dealerTurnHandler}
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
