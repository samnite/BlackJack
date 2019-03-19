
var playerScores, deck, deckScores, dealerScores, dealerBack, playerCards;

function init (){
	playerCards = [];
	playerScores = 0;
	dealerScores = 0;
	deck = [];
	deckScores = [];
	var tempSuits = [0, 0, 0, 0];
	var suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];  
	var values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
	var weight = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10] 
	for (var i = 0; i < suits.length; i++) {
		for (var j = 0; j < values.length; j++) {
			deck.push(suits[i]+values[j]);
			deckScores.push(tempSuits[i] + weight[j]);

		}
	}
	
	function shuffleArray(arr1, arr2) {
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

	shuffleArray(deck, deckScores);
	
	document.querySelector('.player_scores').textContent = 'Очки: ' + 0;

}
init();

function cutDeck () {
	deck.pop();
	deckScores.pop();	
}

function playerTurn (){
		
		playerCards.push(deckScores[deckScores.length - 1]);
		playerScores = playerCards.reduce(function(sum, current) {
			return sum + current;
			}, 0);
	
		document.querySelector('.player_card').insertAdjacentHTML('beforeend', '<img width="70px" src="img/' + deck[deck.length - 1] + '.png">');	
		document.querySelector('.player_scores').textContent = 'Очки: ' + playerScores;
	
		cutDeck();
		if (playerScores > 21) cutAce();
		console.log (playerCards);
		
}

function dealCards() {
	
		document.querySelector('.dealer_card').insertAdjacentHTML('beforeend', '<img width="70px" src="img/' + deck[deck.length - 1] + '.png">');
		dealerScores += deckScores[deckScores.length -1];
		cutDeck();
	
		document.querySelector('.dealer_card').insertAdjacentHTML('beforeend', '<img id="dealerBack" width="70px" src="img/gray_back.png">');
		dealerBack = deck[deck.length - 1];
		dealerScores += deckScores[deckScores.length -1];
		document.querySelector('.dealer_scores').textContent = 'Очки: ' + dealerScores;
		cutDeck();
	
	for (i = 0; i<2; i++) {		
		playerTurn();	
	}
	
}

dealCards();

document.querySelector('.btn').addEventListener('click', function() {
	
		playerTurn();	
	
	if (playerScores > 21) {
		
		document.querySelector('.player_scores').textContent = 'Ты проиграл! Твои очки: ' + playerScores;
		
	}

	else {
		document.querySelector('.player_scores').textContent = 'Очки: ' + playerScores;	
		
		}
	})	

	document.querySelector('.deck').addEventListener('click', function() {
	console.log ('Карты в колоде: ' + deck.length);
	document.getElementById('dealerBack').src = 'img/' + dealerBack + '.png';
});

document.querySelector('.new__game').addEventListener('click', function() {
	
	document.querySelector('.player_card').textContent = '';
	document.querySelector('.player_scores').textContent = 'Очки: ' + 0;
	document.querySelector('.dealer_card').textContent = '';
	document.querySelector('.dealer_scores').textContent = 'Очки: ' + 0;
	init();
	dealCards();
	
});

document.querySelector('.test').addEventListener('click', function name() {
	console.log(playerCards);
	
});

function cutAce() {	
	console.log(playerCards);
	
	for (i = 0; i < playerCards.length; i++) {
		
		if (playerCards[i] == 11) playerCards[i] = 1;
	}
	
	playerScores = playerCards.reduce(function(sum, current) {
			return sum + current;
			}, 0);
	
	console.log (playerCards, playerScores);
	
}





