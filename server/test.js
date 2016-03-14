var query = Boards.find();
var handle = query.observeChanges({
  added: function (document) {
    console.log('Field with id added: ', document);
  },
  changed: function (newDocument, oldDocument) {
    console.log('Field with id changed: ', newDocument);
  }
});

UserStatus.events.on("connectionLogin", function(userData) {
  var boardOne = Boards.findOne("boardOne")
    , userId = userData.userId
    , playerX = boardOne && boardOne.players && boardOne.players.x
    , playerO = boardOne && boardOne.players && boardOne.players.o
    ;

  if (!playerX && playerO !== userId) {
    Boards.update({_id: "boardOne"}, {$set:{"players.x": userId}});
    setSignTo(userId, "x");
  } else if (!playerO && playerX !== userId) {
    Boards.update({_id: "boardOne"}, {$set:{"players.o": userId}});
    setSignTo(userId, "o");
  }
});

UserStatus.events.on("connectionLogout", function(userData) {
  var boardOne = Boards.findOne("boardOne")
    , userId = userData.userId
    , playerX = boardOne && boardOne.players && boardOne.players.x
    , playerO = boardOne && boardOne.players && boardOne.players.o
    ;

  setSignTo(userId, null);

  if (playerX && playerX === userId) {
    Boards.update({_id: "boardOne"}, {$set:{"players.x": null}});
  } else if (playerO && playerO === userId) {
    Boards.update({_id: "boardOne"}, {$set:{"players.o": null}});
  }
});

function setSignTo (userId, value) {
  Meteor.users.update({_id: userId}, {$set:{sign: value}});
}