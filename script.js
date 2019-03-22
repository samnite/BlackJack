
var player, dealer, deck, money, bet;
money = 100;
bet = 10;

function init (){

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
    }

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
    }
 
	for (var i = 0; i < generateDeck.suits.length; i++) {
		for (var j = 0; j < generateDeck.values.length; j++) {
			deck.cards.push(generateDeck.suits[i]+generateDeck.values[j]);
			deck.deckScores.push(generateDeck.tempSuits[i] + generateDeck.weight[j]);
		}
	};

    document.querySelector('.player_card').textContent = '';
	document.querySelector('.player_scores').textContent = 'Очки: ' + 0;
	document.querySelector('.dealer_card').textContent = '';
//	document.querySelector('.dealer_scores').textContent = 'Очки: ' + 0;
    document.querySelector('.btn').style.display = 'block';
    document.querySelector('.winner').textContent = '';
    document.querySelector('.stop').style.display = 'block';
    document.querySelector('.money_value').textContent = '$ ' + money;
    document.querySelector('.dealer_scores').textContent = 'Карты дилера:';

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
        document.querySelector('.player_card').insertAdjacentHTML('beforeend', '<img width="100px"' + ' id="player' + type.id[type.id.length -1] + '" ' + 'src="img/' + deck.cards[deck.cards.length - 1] + '.png">');	
		document.querySelector('.player_scores').textContent = 'Твои очки: ' + type.scores;           
       } else if (type == dealer) {
        document.querySelector('.dealer_card').insertAdjacentHTML('beforeend', '<img width="100px"' + ' id="dealer' + type.id[type.id.length -1] + '" ' + 'src="img/' + deck.cards[deck.cards.length - 1] + '.png">');		
		//document.querySelector('.dealer_scores').textContent = 'Очки диллера: ' + type.scores;  
       }
	
		cutDeck();
    
		if (type.scores > 21) cutAce(type);
		
		
}

function dealCards() {
	
	for (i = 0; i<2; i++) {		
		nextTurn(player);
        nextTurn(dealer);
	};
    document.getElementById('dealer2').src ='img/gray_back.png';  
	
}

dealCards();

document.querySelector('.btn').addEventListener('click', function() {
	
		nextTurn(player);	
	
	if (player.scores > 21) {	
		
        document.querySelector('.btn').style.display = 'none';
        endTurn();
	}

	else {
		document.querySelector('.player_scores').textContent = 'Твои очки: ' + player.scores;	
		
		}
	})	

	document.querySelector('.deck').addEventListener('click', function() {
	document.getElementById('dealer2').src = 'img/' + dealer.src[1] + '.png';
});

document.querySelector('.new__game').addEventListener('click', function() {

	init();
	dealCards();
	
});

document.querySelector('.stop').addEventListener('click', function name() {
    document.querySelector('.btn').style.display = 'none';
    document.querySelector('.stop').style.display = 'none';
	if (dealer.scores < 18) {
  //      document.getElementById('dealer2').src = 'img/' + dealer.src[1] + '.png'
        for (i =0; dealer.scores < 18; i++) {
        nextTurn(dealer);        
        }
        endTurn();

        } else endTurn();
    } 
);

function endTurn() {
    console.log('work');
    drawDealerBack();
    if (player.scores > dealer.scores && player.scores <= 21) {
        playerWin();
        console.log ('P win');
    } else if (player.scores > 21) {
        playerLose();
        console.log('P lose');
    } else if (player.scores <= 21 && dealer.scores > 21) {
        playerWin()
        console.log ('D lose');
    } else if (player.scores <= 21 && dealer.scores <= 21 && player.scores < dealer.scores) {
          playerLose()
        console.log('strange situation, but real');
    } else {
        document.querySelector('.winner').textContent = 'Ничья!';
    }
}
function playerWin() {
    
    document.querySelector('.winner').textContent = 'Ты выиграл! :-)';
    money += bet;
    console.log(money);
    document.querySelector('.money_value').textContent = '$ ' + money;
}

function playerLose() {
    document.querySelector('.winner').textContent = 'Ты проиграл! :-(';
    document.querySelector('.stop').style.display = 'none';
    money -= bet;
    console.log(money);
    document.querySelector('.money_value').textContent = '$ ' + money;
}

function drawDealerBack () {
    document.querySelector('.dealer_scores').textContent = 'Очки диллера: ' + dealer.scores;
    document.getElementById('dealer2').src = 'img/' + dealer.src[1] + '.png';
};

function cutAce(type) {	
	console.log(type.cards);	
	for (i = 0; i < type.cards.length; i++) {		
		if (type.cards[i] == 11) type.cards[i] = 1;
	}	
	type.scores = type.cards.reduce(function(sum, current) {
			return sum + current;
			}, 0);
    console.log(type.cards);
}


























