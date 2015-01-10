"use strict";


//Fizz Buzz
function fizzBuzz (fizz, buzz, range) {
	var string = [];
	for (var i = 1; i <= range; i++) {
		if ( i % fizz === 0) {
			string.push( ( i % buzz === 0) ? "FB" : "F" );
		} else if ( i % buzz === 0) {
			string.push("B");
		} else {
			string.push(i);
		}
	}
	return string.join(" ");
}

//Reverse Words
function reverse(sentence) {
  for (var i = sentence.length - 1, o = []; i >= 0; o.push( sentence[i--]) ) { }
  return o.join(" ");
}


//Prime Palindrome
function primePalindrome () {
	count = 0;
	for (var i = 1000; i >= 0; i -= 10) {
		if (count % 10 == 0) {
			var s = i.toString();
			if (s[0] % 2 == 0) { i -= 101 }
			i--
		};
		if ( isPrime(i) == true ) { return i };
		count++;
	};
};

function isPrime(n) {
	if (n % 3 == 0) return false;
	if (n % 5 == 0) return false;
	if (n % 7 == 0) return false;

	max = Math.sqrt(n);
	for (var i = 11; i < max ; i++) {
		if (n % i == 0) return false;
	};

	return true;
}

//Sum Primes
function sumPrimes (numPrimes) {
	var count = numPrimes-1,
		sum = 2,
		estimate = estimatePrime(numPrimes),
		array = createNumbersArray(estimate),
		i = 3;

	while (count > 0 && i <= estimate){
		if (array[i] != 0 ) {
			sum += i;
			seive(i, array, estimate);
			count--;
		}
		i += 2;
	}
	return sum;
}


function estimatePrime (num) {
	//Rosser's Theorem ~8840 for 1000th prime;
	return  num * ( Math.log(num) + Math.log(Math.log(num)) );
}

function createNumbersArray ( estimate ){
	var numbers = [];
	for (var i = 3; i <= estimate ; i+=2) {
		numbers[i] = i;
	};
	return numbers;
}

function seive (number, array, estimate) {
	for (var i = number * 2; i <= estimate ; i += number) {
		array[i] = 0;
	}
}


//Mth Last Element

function fromLast (array, index) {
	if (index <= array.length) return array[ array.length - index ] ;
}

var arr = ['a','b','c',0,1,2,3];

function assertEqual (f, args, value) {
	console.log( f.apply(null, args ) === value );
}

assertEqual( fromLast, [arr, 2], 2);
assertEqual( fromLast, [arr, 4], 0);
assertEqual( fromLast, [arr, 7], 'a');
assertEqual( fromLast, [arr, 5], "c");
assertEqual( fromLast, [arr, 20], undefined);
