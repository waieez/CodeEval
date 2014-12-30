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