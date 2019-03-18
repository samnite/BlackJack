//Заданный массив
var deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//
console.log ('Новая колода: ' + deck)

// Перемешиваем массив
function compareRandom(a, b) {
  return Math.random() - 0.5;
}
deck.sort(compareRandom);

//Выводим перемешанный массив
console.log ('Перетассованная колода: ' + deck);

////Выводим 5 карт из колоды
//for (var i = deck.length - 1; i>=5; i--) {
//	console.log('Карта из колоды: ' + deck[i]);
//	deck.pop();
//}

//console.log ('Оставшиеся карты в колоде: ' + deck);

document.querySelector('.btn').addEventListener('click', function() {
	console.log (deck[deck.length - 1]);
	deck.pop();
});

document.querySelector('.deck').addEventListener('click', function() {
	console.log ('Карты в колоде: ' + deck);
});