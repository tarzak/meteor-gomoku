Meteor.methods({
  setMark: function (index, sign) {
    var board = Boards.findOne({_id: "boardOne"})
      , cells = board.cells
      , playersTurn = board.playersTurn
      , nextPlayersTurn
      ;

    if (this.userId === playersTurn && !cells[index]) {
      if (playersTurn === board.players.x) {
        nextPlayersTurn = board.players.o;
      }
      else {
        nextPlayersTurn = board.players.x;
      }
      cells[index] = sign;
      Boards.update({_id: "boardOne"}, {$set:{playersTurn: nextPlayersTurn, cells: cells}})
      // checkForWinner(this.userId, index, sign);
    }
  },

  resetBoard: function () {
    Boards.update({_id:"boardOne"},{$set:{players:{x:null,o:null}, playersTurn: null, winner: null, cells:new Array(225)}});
  }  
});

 function  checkForWinner (userId, index, sign) {
  console.log(userId, index, sign)
  horizontalCheck(userId, index, sign);
}

function verticalCheck () {}
function diagonalCheck () {}
function diagonalReverseCheck () {}
function horizontalCheck (userId, index, sign) {
  var counter = 0
    , board = Boards.findOne("boardOne")
    , cells = board.cells
    , signsInARow = 1
    , terminate
    ;

    console.log('start 1')
  while(!terminate || counter < 5 || signsInARow !== 5) {
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
}