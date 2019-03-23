var player, dealer, deck, money, bet;
money = 500;

function init(){

	deck = {
        cards: [],
	    deckScores: [],
        shuffleDeck: function (arr1, arr2) {
            for (var i = arr1.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp1 = arr1[i];
		    var temp2 = arr2[i];
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
        src: []       
    };
    
    dealer = {
        cards: [],
        scores: 0,
        id: [0],
        src: []
    };
    
    var generateDeck = {        
        tempSuits: [0, 0, 0, 0],
	    suits: ['Hearts', 'Spades', 'Clubs', 'Diamonds'],
	    values: ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'],
	    weight: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    };
 
	for (var i = 0; i < generateDeck.suits.length; i++) {
		for (var j = 0; j < generateDeck.values.length; j++) {
			deck.cards.push(generateDeck.suits[i]+generateDeck.values[j]);
			deck.deckScores.push(generateDeck.tempSuits[i] + generateDeck.weight[j]);
		}
	};
    bet = 0;
    document.getElementById('bet').textContent = '$' + bet;    
    document.querySelector('.deal-button').classList.remove('disabled');
    document.querySelector('.doubledown').classList.add('disabled');
    document.querySelector('.hit-button').classList.add('disabled');
    document.querySelector('.stand-button').classList.add('disabled');
    
    
	deck.shuffleDeck(deck.cards, deck.deckScores);	
        
}

init();
function cutDeck() {
	deck.cards.pop();
	deck.deckScores.pop();	
}

function nextTurn(type){		
		type.cards.push(deck.deckScores[deck.deckScores.length - 1]);
        type.id.push(type.id[type.id.length -1] +1);
        type.src.push(deck.cards[deck.cards.length -1]);
		type.scores = type.cards.reduce(function(sum, current) {
			return sum + current;
			}, 0);
	   if (type == player) {
        document.querySelector('.player-hand').insertAdjacentHTML('beforeend', '<div class="card-img"><img ' + ' id="player' + type.id[type.id.length -1] + '" ' + 'src="img/' + deck.cards[deck.cards.length - 1] + '.png"></div>');	
		document.getElementById('player-label').textContent = 'Игрок: ' + player.scores;           
        } else if (type == dealer) {
        document.querySelector('.dealer-hand').insertAdjacentHTML('beforeend', '<div class="card-img"><img ' + ' id="dealer' + type.id[type.id.length -1] + '" ' + 'src="img/' + deck.cards[deck.cards.length - 1] + '.png"></div>');		
        };	
        cutDeck();    
		if (type.scores > 21) cutAce(type);		
};

function dealCards() {	
	for (i = 0; i<2; i++) {		
		nextTurn(player);
        nextTurn(dealer);
	};    
    document.getElementById('dealer2').src ='img/gray_back.png';  
    document.querySelector('.deal-button').classList.add('disabled');
    document.querySelector('.doubledown').classList.remove('disabled');
    document.querySelector('.hit-button').classList.remove('disabled');
    document.querySelector('.stand-button').classList.remove('disabled');   
    document.getElementById('pot').textContent = '$' + (money - bet); 
};


document.querySelector('.deal-button').addEventListener('click', function() {
    document.getElementById('dealer-label').textContent = 'Дилер: ';
    document.getElementById('player-label').textContent = 'Игрок: ';
    document.querySelector('.player-hand').textContent = '';
    document.querySelector('.dealer-hand').textContent = '';
    document.getElementById('messages').innerHTML = '<h2>Испытай удачу!</h2>';
    if (bet > 0) dealCards();  
});

document.querySelector('.hit-button').addEventListener('click', function() {
	nextTurn(player);	
	if (player.scores > 21) {			
        endTurn();
	} else document.getElementById('player-label').textContent = 'Игрок: ' + player.scores;
});	

function checkDealer() {
    if (dealer.scores < 18) {
        document.getElementById('dealer2').src = 'img/' + dealer.src[1] + '.png';           
        for (i =0; dealer.scores < 18; i++) {
        nextTurn(dealer);        
        }
        endTurn();
    } else endTurn();
}

document.querySelector('.stand-button').addEventListener('click', function name() {
    document.querySelector('.stand-button').classList.add('disabled');  
    document.querySelector('.hit-button').classList.add('disabled');
    document.querySelector('.doubledown').classList.add('disabled');
    checkDealer();
});

document.querySelector('.doubledown').addEventListener('click', function name() {
    document.querySelector('.doubledown').classList.add('disabled');
    document.querySelector('.stand-button').classList.add('disabled');  
    document.querySelector('.hit-button').classList.add('disabled');
    document.querySelector('.doubledown').classList.add('disabled');
    bet = bet * 2;
    document.getElementById('bet').textContent = '$' + bet;
    nextTurn(player);
    checkDealer();
 });


function chooseBet() {
    document.getElementById('five').addEventListener('click', function(){
        changeBet(5);
    })
    document.getElementById('ten').addEventListener('click', function() {
        changeBet(10);
    })
    document.getElementById('fifteen').addEventListener('click', function() {
        changeBet(15);
    })
    document.getElementById('fifty').addEventListener('click', function() {
        changeBet(50);
    });    
}

chooseBet();

function changeBet(cost) {
    bet += cost;
    document.getElementById('bet').textContent = '$' + bet;    
};
    
function endTurn() {
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
        document.getElementById('messages').innerHTML = '<h2>Ничья!</h2>';
        bet += bet;
        document.getElementById('pot').textContent = '$ ' + money;
    }
    init();
}

function drawScores () {
    document.getElementById('dealer-label').textContent = 'Дилер: ' + dealer.scores;
    document.getElementById('player-label').textContent = 'Игрок: ' + player.scores;
}
function playerWin() {    
    drawScores();
    document.getElementById('messages').innerHTML = '<h2 style="color:green">Ты выиграл!</h2>';
    money += bet;
    document.getElementById('pot').textContent = '$ ' + money;
}

function playerLose() {
    drawScores();
    document.getElementById('messages').innerHTML = '<h2 style="color:#FE2E2E">Ты проиграл!</h2>';
    money -= bet;  
    document.getElementById('pot').textContent = '$ ' + money;
}

function drawDealerBack () {
    document.getElementById('dealer2').src = 'img/' + dealer.src[1] + '.png';
};

function cutAce(type) {		
	for (i = 0; i < type.cards.length; i++) {		
		if (type.cards[i] == 11) type.cards[i] = 1;
	}	
	type.scores = type.cards.reduce(function(sum, current) {
			return sum + current;
			}, 0);
}


























