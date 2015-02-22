var convertMatrix = function(matrix, cb){
  cb = cb || identity;
  var n = matrix.length;
  var newMatrix = createMatrix(n);
  var value;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      value = matrix[i][j];
      newMatrix[i][j] = cb(value);
    };
  };
  return newMatrix;
}



var gameOfLife = function (matrix, numIterations){
  //given a nxn matrix
  var n = matrix.length;
  //copy matrix & convert values;
  var currentGame = convertMatrix(matrix);
  var nextGame = createMatrix(n);
  var temp, neighbors;

  while (numIterations > 0) {  
    //walk through each cell in board1
    for(var row = 0; row < n; row++){
      for(var col = 0; col < n; col++){
      //reduce around current cell
        neighbors = reduceAroundCell(currentGame, row, col);
        //if reduction is less than 2 or greater than 3
        if (neighbors > 3 || neighbors < 2){
          nextGame[row][col] = 0;
        } else {
          nextGame[row][col] = 1;
        }
      }
    }
    //swap and go to next iteration
    temp = currentGame;
    currentGame = nextGame;
    nextGame = temp;
    numIterations--;
  }

  return currentGame;
}

var createMatrix = function (n, val){
  val = val || 0;
  var matrix = [];
  for(var i = 0; i < n; i++){
    matrix[i] = [];
    for(var j = 0; j < n; j++){
      matrix[i][j] = val;
    }
  }
  return matrix;
}

var reduceAroundCell = function (matrix, row, col){
  var maxCell = matrix.length-1;
  var up = Math.max(row-1, 0);
  var down = Math.min(row+1, maxCell);
  var left = Math.max(col-1, 0);
  var right = Math.min(col+1, maxCell);
  var reduce = 0;

  for (var i = up; i < down+1; i++) {
    for(var j = left; j < right+1; j++){
      reduce += matrix[i][j];
    };
  };

  reduce -= matrix[row][col];;

  return reduce;
}

var identity = function(val){
  return val;
}