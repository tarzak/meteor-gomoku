Meteor.methods({
  setMark: function (index, sign) {
    var board = Boards.findOne({_id: "boardOne"})
      , cells = board.cells
      , playersTurn = board.playersTurn
      , nextPlayersTurn
      , userId = this.userId
      ;

    if (this.userId === playersTurn && !cells[index]) {
      if (playersTurn === board.players.x) {
        nextPlayersTurn = board.players.o;
      }
      else {
        nextPlayersTurn = board.players.x;
      }
      cells[index] = sign;
      Boards.update({_id: "boardOne"}, {$set: {
        playersTurn: nextPlayersTurn, 
        cells: cells
      }}, {}, function (err, _id) {
        if (!err) {
          checkForWinner(userId, index, sign)
        }
      })
    }
  },

  resetBoard: function () {
    var board = Boards.findOne("boardOne")
      , playerX = board && board.players && board.players.x
      , playerO = board && board.players && board.players.o
      ;

    if (!playerO || !playerX) {
      Boards.update({_id:"boardOne"},{$set:{players:{x:null,o:null}, playersTurn: null, winner: null, cells:new Array(225)}});
    }
  }  
});

function checkForWinner (userId, index, sign) {
  if (!diagonalCheck (userId, index, sign)) {
    if (!diagonalReverseCheck (userId, index, sign)) {
      if (!horizontalCheck(userId, index, sign)) {
        verticalCheck(userId, index, sign);
      }
    }
  }
}


function diagonalCheck (userId, index, sign) {
  var counter = 0
    , board = Boards.findOne("boardOne")
    , cells = board.cells
    , signsInARow = 1
    , terminate = false
    , differenceCounter = 14
    ;
  
  while(counter < 5 && !terminate && signsInARow !== 5) {
    counter += 1;
    if (cells[index + differenceCounter] === sign) {
      signsInARow += 1;
    } else {
      terminate = true;
    }
    if (signsInARow === 5) terminate = true;
    differenceCounter += 14;
  }
  
  differenceCounter = 14;
  terminate = false;
  counter = 0;
  
  while(counter < 5 && !terminate && signsInARow !== 5) {
    counter += 1;
    if (cells[index - differenceCounter] === sign) {
      signsInARow += 1;
    } else {
      terminate = true;
    }
    if (signsInARow === 5) terminate = true;
    differenceCounter += 14;
  }
  if (signsInARow === 5) {
    Boards.update({_id: "boardOne"},{$set:{winner:userId}});

    return true;
  }
}

function diagonalReverseCheck (userId, index, sign) {
  var counter = 0
    , board = Boards.findOne("boardOne")
    , cells = board.cells
    , signsInARow = 1
    , terminate = false
    , differenceCounter = 16
    ;
  
  while(counter < 5 && !terminate && signsInARow !== 5) {
    counter += 1;
    if (cells[index + differenceCounter] === sign) {
      signsInARow += 1;
    } else {
      terminate = true;
    }
    if (signsInARow === 5) terminate = true;
    differenceCounter += 16;
  }
  
  differenceCounter = 16;
  terminate = false;
  counter = 0;
  
  while(counter < 5 && !terminate && signsInARow !== 5) {
    counter += 1;
    if (cells[index - differenceCounter] === sign) {
      signsInARow += 1;
    } else {
      terminate = true;
    }
    if (signsInARow === 5) terminate = true;
    differenceCounter += 16;
  }
  if (signsInARow === 5) {
    Boards.update({_id: "boardOne"},{$set:{winner:userId}});

    return true;
  }
}

function verticalCheck (userId, index, sign) {
  var counter = 0
    , board = Boards.findOne("boardOne")
    , cells = board.cells
    , signsInARow = 1
    , differenceCounter = 15
    ;

  while(counter < 5 && signsInARow !== 5) {

    counter += 1;

    if (cells[index + differenceCounter] === sign) {
      signsInARow += 1;
    }

    if (cells[index - differenceCounter] === sign) {
      signsInARow += 1;
    }

    if (signsInARow === 5) {
      Boards.update({_id: "boardOne"},{$set:{winner:userId}});

      return true;
    }

    differenceCounter += 15;
  }
}

function horizontalCheck (userId, index, sign) {
  var counter = 0
    , board = Boards.findOne("boardOne")
    , cells = board.cells
    , signsInARow = 1
    ;

  while(counter < 5 && signsInARow !== 5) {

    counter += 1;

    if (cells[index + counter] === sign) {
      signsInARow += 1;
    } 

    if (cells[index - counter] === sign) {
      signsInARow += 1;
    } 

    if (signsInARow === 5) {
      Boards.update({_id: "boardOne"},{$set:{winner:userId}});

      return true;
    }
  }
}