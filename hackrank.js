//HackerRank

/* Simple test util;
*/
function assertEqual (f, args, value) {
    console.log( f.apply(null, args ) === value );
}


/* Utopian Tree
    For some reason decided on recursive solution.
    "Spring" *= 2, "Summer" += 1
*/

function uTree(cycle) {
    if (cycle === 0) return 1;
    return cycle % 2 === 0 ? uTree(cycle-1) + 1 : uTree(cycle-1) * 2;
}



/*  The Love-Letter Mystery
(a) He can reduce the value of a letter, e.g. he can change 'd' to 'c', but he cannot change 'c' to 'd'. 
(b) In order to form a palindrome, if he has to repeatedly reduce the value of a letter, he can do it until the letter becomes 'a'. Once a letter has been changed to 'a', it can no longer be changed.

Each reduction in the value of any letter is counted as a single operation. Find the minimum number of operations required to convert a given string into a palindrome.
*/
function stepsToPalindrome (word){
    var aZ = "abcdefghijklmnopqrstuvwxyz";
    var count = 0;

    //traverse both ends simultaneously
    for(var i = word.length-1, j=0; i >= j ; i--){

        var ltr1 = aZ.indexOf(word[i]),
            ltr2 = aZ.indexOf(word[j]),
            steps = ltr1 - ltr2;

        // add absolute value of difference between characters
        count += steps > 0 ? steps : steps * -1; 

        j++;
    }

    return count;
}

/* Is Fibo
*/

//recursive fibo (not used)
function fibo (n) {
    if (n == 0) return 0;
    if (n == 1) return 1;

    return fibo(n-1) + fibo(n-2);
}

//faster if array of fibs cached. 
function isFibo(val){

    var arr = [0,1];
    var cur = 1;
    var lastFib = arr[cur];

    while (val > lastFib) {

        lastFib = arr[cur] + arr[cur-1];

        arr.push(lastFib);

        if (val === lastFib) return true;
        
        cur++
    }

    return arr.indexOf(val) != -1 ? true: false;

}

/* Cavity Map
    change value to "X" only if adjacent values are smaller.
*/

var map = [ [ '1', '1', '1', '2' ],
            [ '1', '9', '1', '2' ],
            [ '1', '8', '9', '2' ],
            [ '1', '2', '3', '4' ] ];

function cavityMap (map) {

    var size = map.length-1;
    var cavs = [];

    for (var i = 1; i < size; i++) {
        for (var j = 1; j < size; j++) {
            var curr = map[i][j];
            if ( curr > map[i-1][j] && curr > map[i+1][j] ){
                if (curr > map[i][j-1] && curr > map[i][j+1]) {
                    cavs.push([i,j]);
                }
            }

        };
    };

    cavs.forEach(function (cavity){
        map[cavity[0]][cavity[1]] = 'X';
    })

    return map;
}

/*Sherlock and Queries
    Passes with Ruby version see hackrank.rb
    Partial Correct in Javascript.
    Need to figure out how to deal with inconsistencies between evaluator and my computer
    Also deal with overflow / large numbers in javascript.
*/

function sherlockQ (rA, rB, rC) {//problem is to reduce this algorithm's time complexity

    for (var i = 0; i < rB.length; i++) {
        for (var j = 0; j < rA.length; j++) {
            if ( (j+1) % rB[i] == 0 ) {
                rA[j] = (rA[j] * rC[i]) % 1000000007;
            }
        };
    };
    return rA;
}

function sQ2 (rA, set) { //works alright for smaller. trips up when numbers get large.
    rA.unshift(0);
    rLen = rA.length;
    for(val in set) {
        var inc = +val;
        for (var i = inc; i < rLen; i += inc) {
            rA[i] = (rA[i] * set[val]) % 1000000007;
        };
    }
    rA.shift();
    return rA;
}

function createSet(rB, rC){
    var set = {};
    for (var i = 0 ; i < rC.length-1 ; i++) { // is i < rC.length in editor
        var val = rB[i];
        set[ val ] = set[ val ] == undefined ?  rC[i] : ( set[val] * rC[i] ) % 1000000007 ;
    };
    return set;
}

/*Closest Numbers
    formatted and sorted input as arr dsc
*/

function closeNums (arr){

    var min = arr[0]-arr[1];
    var diff = min;
    var pairs = [ arr[0], arr[1] ];


    for (var i = 1; i < arr.length; i++) {
        diff = arr[i] - arr[i+1]
        if ( diff < min ) {
            min = diff;
            pairs = [];
            pairs.push(arr[i], arr[i+1]);
        } else if (diff == min) {
            pairs.push(arr[i], arr[i+1]);
        }
    };

    return pairs;
}

/*Sherlock and Pairs
*/

function UniqPairs (arr) {

    var bin = makeBin(arr);

    pairs = 0;
    var n;

    for (key in bin){
        n = bin[key];

        //oh maths.. why you so awesome
        if (n > 1) pairs += ( n * (n-1) ) ;
    }

    return pairs;
}

function makeBin (arr) {
    var bin = {},
        val;

    for (var i = 0; i < arr.length; i++) {
        val = arr[i];
        bin[val] = bin[val] ? bin[val] + 1 : 1;
    }

    return bin;
}


// You and your K-1 friends want to buy N flowers. 
// Flower number i has cost ci. 
// Unfortunately the seller does not want just one customer to buy a lot of flowers, 
// so he tries to change the price of flowers for customers who have already bought some flowers. 
// More precisely, if a customer has already bought x flowers, 
// he should pay (x+1)*ci dollars to buy flower number i. 
// You and your K-1 friends want to buy all N flowers in such a way that you spend the least amount of money. 
// You can buy the flowers in any order.


function flowers (people, flowers, prices) {
  // iterate through prices, keeping track of who has the min spent,
  // person with min spent is next in line to buy
  // should use a heap for now just sort after each buy?
  prices.sort(function (a, b) {
    return b - a;
  });

  if (prices.length > flowers) {
    var extra = prices.length - flowers;
    prices = prices.slice(extra);
  }

  var customers = [];
  for (var p = 0; p < people; p++) {
    customers[p] = [0,0];
  }

  prices.forEach(function (price) {
    var paid = customers[0][0];
    var flowersBought = customers[0][1];
    var markupPrice = getPrice(flowersBought, price);
    customers[0][0] = paid + markupPrice;
    customers[0][1] += 1;
    console.log(customers[0])
    customers.sort(function (a, b) {
      return a[0] - b[0];
    });
  });

  return customers.reduce(function (sum, person, indx, arr) {
    return sum + person[0];
  }, 0);

}

function getPrice (flowersBought, price) {
  return (flowersBought + 1) * price;
}


/* Grid Challenge - partially passing
*/

// extracting inputs was kinda involved for this one.
function processData(input) {
    input = getInput(input.split('\n').reverse());
    input.forEach(function(matrix){
        console.log(sortGrid(matrix));
    });
}

function getInput(array) {
    var input = [];
    var numTests = array.pop();
    for (var i = 0; i < numTests; i++) {
        var numLines = +array.pop();
        input[i] = getMatrix(array, numLines);
    }
    return input;
}

function getMatrix (array, numLines) {
    var matrix = [];
    for (var i = 0; i < numLines; i++) {
        matrix.push(array.pop());
    }
    return matrix.map(function (row) {
       return row.split(""); 
    });
}

function sortGrid (matrix) {
  matrix.forEach(function(row) {
    row.sort(function(a, b) {
      return a < b;
    });
  });

  var result = true;
  for (var col = 0; col < matrix[0].length; col++) {
    for (var row = 1; row < matrix.length; row++) {
      if (matrix[row][col] < matrix[row-1][col]) {
        result = false;
        break;
      }
    }
  }
  return result ? 'YES': 'NO';
}
