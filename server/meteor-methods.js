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
      Boards.update({_id: "boardOne"}, {$set:{playersTurn: nextPlayersTurn, cells: cells}}, {}, function (err, _id) {
        if (!err) {
          checkForWinner(userId, index, sign)
        }
      })
    }
  },

  resetBoard: function () {
    Boards.update({_id:"boardOne"},{$set:{players:{x:null,o:null}, playersTurn: null, winner: null, cells:new Array(225)}});
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
  console.log('Full coincidence is not found!');
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
  console.log(signsInARow) 
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
  console.log(signsInARow) 
}

function verticalCheck (userId, index, sign) {
  var counter = 0
    , board = Boards.findOne("boardOne")
    , cells = board.cells
    , signsInARow = 1
    , terminate = false
    , differenceCounter = 15
    ;

  while(counter < 5 && !terminate && signsInARow !== 5) {
    
    counter += 1;
    if (cells[index + differenceCounter] === sign) {
      signsInARow += 1;
    } else {
      terminate = true;
    }
    if (signsInARow === 5) terminate = true;
    differenceCounter += 15;
  }
  
  differenceCounter = 15;
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
    differenceCounter += 15;
  }
  if (signsInARow === 5) {
    Boards.update({_id: "boardOne"},{$set:{winner:userId}});

    return true;
  }
  console.log(signsInARow)  
}

function horizontalCheck (userId, index, sign) {
  var counter = 0
    , board = Boards.findOne("boardOne")
    , cells = board.cells
    , signsInARow = 1
    , terminate = false
    ;

  while(counter < 5 && !terminate && signsInARow !== 5) {
    counter += 1;
    if (cells[index + counter] === sign) {
      signsInARow += 1;
    } else {
      terminate = true;
    }
    if (signsInARow === 5) terminate = true;
  }

    terminate = false
    counter = 0
  while(counter < 5 && !terminate && signsInARow !== 5) {
    counter += 1;
    if (cells[index - counter] === sign) {
      signsInARow += 1;
    } else {
      terminate = true;
    }
    if (signsInARow === 5) terminate = true;
  }
  if (signsInARow === 5) {
    Boards.update({_id: "boardOne"},{$set:{winner:userId}});

    return true;
  }
  console.log(signsInARow)

}


/*var arr = [0,1,2,3,6,5,6,7,8,9]
var index = 4
var newIndex = index
var counter = 0
var terminate = false
var signsInArow = 0
while(counter < 5 && !terminate && signsInArow !== 5) {

if (arr[index+counter] === 6) signsInArow += 1;
if (signsInArow === 5) terminate = true;
console.log(arr[index + counter], signsInArow)
counter += 1;
newIndex += 1

}

console.log('end of first while')
terminate = false
counter = 0
while(counter < 5 && !terminate && signsInArow !==5) {
if (arr[index-counter] === 6) signsInArow += 1;
if (signsInArow === 5) terminate = true;
console.log(arr[index - counter], signsInArow)
counter += 1;

}*/
  /*  console.log('start 1')
  while(!terminate && counter < 5 && signsInARow < 5) {
    terminate = true;
    counter += 1;
    if (cells[index + counter] && cells[index + counter] === sign) {
      signsInARow += 1
    } else {
      terminate = true;
    }
  }
  terminate = false;
  counter = 0;
  console.log('start 2')
  while(!terminate || counter < 5 || signsInARow !==5) {
    counter += 1;
    if (cells[index - counter] && cells[index - counter] === sign) {
      signsInARow += 1
    } else {
      terminate = true;
    }
  }

  if (signsInARow === 5) {
    Boards.update({_id:"boardOne"}, {$set:{winner: userId}})
  }
}*/


