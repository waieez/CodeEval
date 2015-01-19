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