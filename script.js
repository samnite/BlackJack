let player, dealer, deck, bet;
let money = 500;

const init = () => {  
	deck = {
        cards: [],
	    deckScores: [],
        shuffleDeck: (arr1, arr2) => {
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
    };

    player = {
        cards: [],
        scores: 0,
        id: [0],
        src: [],
        title: 'player'       
    };
    
    dealer = {
        cards: [],
        scores: 0,
        id: [0],
        src: [],
        title: 'dealer'
    };
    
    const generateDeck = {        
        tempSuits: [0, 0, 0, 0],
	    suits: ['Hearts', 'Spades', 'Clubs', 'Diamonds'],
	    values: ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'],
	    weight: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    };
 
	for (let i = 0; i < generateDeck.suits.length; i++) {
		for (let j = 0; j < generateDeck.values.length; j++) {
			deck.cards.push(generateDeck.suits[i]+generateDeck.values[j]);
			deck.deckScores.push(generateDeck.tempSuits[i] + generateDeck.weight[j]);
		}
	};
    bet = 0;
    document.getElementById('bet').textContent = `$${bet}`;    
    document.querySelector('.deal-button').classList.remove('disabled');
    document.querySelector('.doubledown').classList.add('disabled');
    document.querySelector('.hit-button').classList.add('disabled');
    document.querySelector('.stand-button').classList.add('disabled');
    document.querySelector('.chips').style.display = 'block';        
	deck.shuffleDeck(deck.cards, deck.deckScores);	        
};

init();

const cutDeck = () => {
	deck.cards.pop();
	deck.deckScores.pop();	
};

const nextTurn = type => {		
        const cardImg = `<img id="${type.title}${type.id[type.id.length -1]}" src="img/${deck.cards[deck.cards.length - 1]}.png">`;
        type.cards.push(deck.deckScores[deck.deckScores.length - 1]);
        type.id.push(type.id[type.id.length -1] +1);
        type.src.push(deck.cards[deck.cards.length -1]);
		type.scores = type.cards.reduce((sum, current) => {
			return sum + current;
			}, 0);
	   if (type == player) {
        document.getElementById('player-hand').insertAdjacentHTML('beforeend', cardImg);	
		document.getElementById('player-label').textContent = 'Player: ' + player.scores;           
        } else if (type == dealer) {
        document.getElementById('dealer-hand').insertAdjacentHTML('beforeend', cardImg);		
        };	
        cutDeck();    
		if (type.scores > 21) cutAce(type);		
};

const dealCards = () => {	
	for (i = 0; i<2; i++) {		
		nextTurn(player);
        nextTurn(dealer);
    };
    document.getElementById('dealer1').src ='img/green_back.png';  
    document.querySelector('.deal-button').classList.add('disabled');
    document.querySelector('.doubledown').classList.remove('disabled');
    document.querySelector('.hit-button').classList.remove('disabled');
    document.querySelector('.stand-button').classList.remove('disabled');   
    document.getElementById('pot').textContent = `$${(money - bet)}`; 
};


document.querySelector('.deal-button').addEventListener('click', () => { 
    
    document.getElementById('dealer-label').textContent = 'Dealer: ';
    document.getElementById('player-label').textContent = 'Player: ';
    document.getElementById('player-hand').textContent = '';
    document.getElementById('dealer-hand').textContent = '';
    document.getElementById('messages').innerHTML = '<h2>Good Luck!</h2>';
    
    if (bet > 0) {
        dealCards();     
        document.querySelector('.chips').style.display = 'none';
    }
    else document.getElementById('messages').innerHTML = '<h2>Place a bet!</h2>';
    
    if (player.cards[0] == 10 && player.cards[1] == 11 || player.cards[0] == 11 && player.cards[1] == 10) {
        document.getElementById('messages').innerHTML = '<h2>Black Jack!!!</h2>';
        bet += bet * 0.5;
        money += bet;
        drawMoney();
        init();
    } 
});

document.querySelector('.hit-button').addEventListener('click', () => {
	nextTurn(player);	
	if (player.scores > 21) {			
        endTurn();
	} else document.getElementById('player-label').textContent = `Player: ${player.scores}`;
});	



document.querySelector('.stand-button').addEventListener('click', () => {
    hideButtons();
    checkDealer();
});

document.querySelector('.doubledown').addEventListener('click', () => {
    
    if ((bet * 2) > money) {
        document.getElementById('messages').innerHTML = '<h2>Insufficient funds!</h2>';
    } else {
        document.querySelector('.doubledown').classList.add('disabled');
        hideButtons();
        bet = bet * 2;
        document.getElementById('bet').textContent = `$${bet}`;
        nextTurn(player);
        checkDealer();
    }

 });

const hideButtons = () => {
    document.querySelector('.stand-button').classList.add('disabled');  
    document.querySelector('.hit-button').classList.add('disabled');
    document.querySelector('.doubledown').classList.add('disabled');
};

const checkDealer = () => {
    if (dealer.scores < 18) {
        document.getElementById('dealer1').src = `img/${dealer.src[1]}.png`;           
        for (i =0; dealer.scores < 18; i++) {
        nextTurn(dealer);        
        }
        endTurn();
    } else endTurn();
}

const chooseBet = () => {
    document.getElementById('five').addEventListener('click', () => {
        changeBet(5);
    })
    document.getElementById('ten').addEventListener('click', () => {
        changeBet(10);
    })
    document.getElementById('fifteen').addEventListener('click', () => {
        changeBet(15);
    })
    document.getElementById('fifty').addEventListener('click', () => {
        changeBet(50);
    });    
}

chooseBet();

const changeBet = cost => {
    if ((bet + cost) > money) {
        document.getElementById('messages').innerHTML = '<h2>Insufficient funds!</h2>';
    } else {
        bet += cost;
        document.getElementById('bet').textContent = `$${bet}`;    
    }    
};
    
const endTurn = () => {
    drawDealerBack();
    if (player.scores > dealer.scores && player.scores <= 21) {
        playerWin();
    } else if (player.scores > 21) {
        playerLose();
    } else if (player.scores <= 21 && dealer.scores > 21) {
        playerWin()
    } else if (player.scores <= 21 && dealer.scores <= 21 && player.scores < dealer.scores) {
        playerLose()
    } else {
        document.getElementById('messages').innerHTML = '<h2>Draw!</h2>';
        bet += bet;
        drawMoney();
    }
    init();
}

const drawScores = () => {
    document.getElementById('dealer-label').textContent = 'Dealer: ' + dealer.scores;
    document.getElementById('player-label').textContent = 'Player: ' + player.scores;
}
const playerWin = () => {    
    drawScores();
    document.getElementById('messages').innerHTML = '<h2 style="color:green">You win!</h2>';
    money += bet;
    drawMoney();
}

const playerLose = () => {
    drawScores();
    document.getElementById('messages').innerHTML = '<h2 style="color:#FE2E2E">You lose!</h2>';
    money -= bet;  
    drawMoney();
}

const drawDealerBack = () => {
    document.getElementById('dealer1').src = `img/${dealer.src[1]}.png`;
};

const cutAce = type => {		
	for (i = 0; i < type.cards.length; i++) {		
		if (type.cards[i] == 11) type.cards[i] = 1;
	}	
	type.scores = type.cards.reduce((sum, current) => {
			return sum + current;
			}, 0);
}

const drawMoney = () => {
    document.getElementById('pot').textContent = `$${money}`;
};





















