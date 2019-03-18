
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
	
function dealCards() {
	
	for (i = 0; i<2; i++) {		
		document.querySelector('.player_card').insertAdjacentHTML('beforeend', '<img width="50px" src="img/' + deck[deck.length - 1] + '.png">');
		playerScores += deckScores[deckScores.length -1];
		document.querySelector('.player_scores').textContent = 'Очки: ' + playerScores;
		playerCards.push(deck[deck.length - 1]);
		deck.pop();
		deckScores.pop();	
	}
	
		document.querySelector('.dealer_card').insertAdjacentHTML('beforeend', '<img width="50px" src="img/' + deck[deck.length - 1] + '.png">');
		dealerScores += deckScores[deckScores.length -1];
		deck.pop();
		deckScores.pop();
	
		document.querySelector('.dealer_card').insertAdjacentHTML('beforeend', '<img id="dealerBack" width="50px" src="img/gray_back.png">');
		dealerBack = deck[deck.length - 1];
		dealerScores += deckScores[deckScores.length -1];
		document.querySelector('.dealer_scores').textContent = 'Очки: ' + dealerScores;

		deck.pop();
		deckScores.pop();
	
	console.log (deck.length, dealerBack, playerCards);
}

dealCards();

document.querySelector('.btn').addEventListener('click', function() {
	console.log (deck[deck.length - 1]);
	console.log (deckScores[deckScores.length - 1]);
	
})	

document.querySelector('.deck').addEventListener('click', function() {
	console.log ('Карты в колоде: ' + deck.length);
	document.getElementById('dealerBack').src = 'img/' + dealerBack + '.png';
	//replace('<img id="dealerBack" width="50px" src="img/gray_back.png">','<img id="dealerBack" width="50px" src="img/' + dealerBack + '.png">');
});

document.querySelector('.new__game').addEventListener('click', function() {
	
	document.querySelector('.player_card').textContent = '';
	document.querySelector('.player_scores').textContent = 'Очки: ' + 0;
	document.querySelector('.dealer_card').textContent = '';
	document.querySelector('.dealer_scores').textContent = 'Очки: ' + 0;
	init();
	dealCards();
	
})




