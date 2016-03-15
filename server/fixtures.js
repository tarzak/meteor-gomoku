Meteor.startup(function () {
  if (!Boards.findOne({_id: "boardOne"})) {
    Boards.insert({
    	_id: "boardOne",
    	players: {x: null, o: null}, 
    	cells: new Array(225),
    	winner: null,
    	playersTurn: null
    });
  }
});