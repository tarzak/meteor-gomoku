UserStatus.events.on("connectionLogin", function(userData) {
  var boardOne = Boards.findOne("boardOne")
    , userId = userData.userId
    , playerX = boardOne && boardOne.players && boardOne.players.x
    , playerO = boardOne && boardOne.players && boardOne.players.o
    ;

  if (!playerX && playerO !== userId) {
    console.log(1)
    Boards.update({_id: "boardOne"}, {$set:{"players.x": userId}});
    setSignTo(userId, "X");
  } else if (!playerO && playerX !== userId) {
    console.log(2)
    Boards.update({_id: "boardOne"}, {$set:{"players.o": userId, playersTurn: playerX}});
    setSignTo(userId, "O");
  }
});

UserStatus.events.on("connectionLogout", function(userData) {
  var boardOne = Boards.findOne("boardOne")
    , userId = userData.userId
    , playerX = boardOne && boardOne.players && boardOne.players.x
    , playerO = boardOne && boardOne.players && boardOne.players.o
    ;

  setSignTo(userId, null);

  if (playerX && playerX === userId) { //do we really need first part of condition?!
    Boards.update({_id: "boardOne"}, {$set:{"players.x": null, playersTurn: null, winner: playerO || null}});
  } else if (playerO && playerO === userId) {
    Boards.update({_id: "boardOne"}, {$set:{"players.o": null, playersTurn: null, winner: playerX || null}});
  }
});

function setSignTo (userId, value) {
  Meteor.users.update({_id: userId}, {$set:{sign: value}});
}