"use strict";

var array = [9, 7, 5, 11, 12, 2, 14, 3, 10, 4, 6, 6];

//Quick Sort
function quickSort (array, p, r) {
	if (p < r){
		var q = partition(array, p, r);
		quickSort(array, p, q-1);
		quickSort(array, q+1, r);		
	}
}

function partition (array, p, r) {
	var q = p;
	for (var i = p; i <= r; i++) {
		if (array[i] <= array[r]) {
			swap(array, i, q);
			q++;
		}
	};
	return q-1;
}

function swap (array, a, b){
	var temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

//Merge Sort
function mergeSort (array, p, r) {

	if (p < r) {
		var q = Math.floor( ( p + r ) / 2 );
		mergeSort(array, p, q);
		mergeSort(array, q+1, r);
		merge(array, p, r);
	}

}

function merge ( array, p, r ) {

	var q = Math.floor( ( p + r ) / 2 ),
		top = [],
		bot = [];

	for (var i = r; i >= p ; i--) {
		i > q ? top.push(array[i]) : bot.push(array[i]);
	};

	var j = top.length-1,
		k = bot.length-1,
		i = p;

	while ( j >= 0 || k >= 0 ){

		if ( top[j] <= bot[k] || k < 0) {
			array[i] = top[j];
			j--;
		} else {
			array[i] = bot[k];
			k--;
		}
		i++;
	}
	return q;
}