//HackerRank

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