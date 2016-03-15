Template.board.onRendered(function () {
  var svg = d3.select("#board").append("svg")
    ;

  this.autorun(function () {
    var cells = Boards.findOne({_id: "boardOne"}) && Boards.findOne({_id: "boardOne"}).cells
      , group = svg.selectAll("g").data(cells, function (d, i) { return i })
      , groupEnter = group.enter().append('g')
      , fieldSize = 40
      ;
    
    groupEnter.append('rect')
      .attr("x", function (d, i) {
        var multiplier = i % 15
          ;

        this.index = i;  

        return multiplier * fieldSize;
      })
      .attr("y", function (d, i) {
        var multiplier = Math.floor(i/15)
          ;

        return multiplier * fieldSize;
      })
      .attr("width", fieldSize + "px")
      .attr("height", fieldSize + "px")
      .attr("stroke", "black")
      .attr("stroke-width", "2")
      .attr("fill", "white")
      .on("click", function () {
        var elementIndex = this.index
          , thisValue = d3.select(this).data()[0]
          , board = Boards.findOne('boardOne')
          , playersTurn = board.playersTurn
          , sign = Meteor.user().sign
          , winner = board.winner
          ;
        if(!winner) {
          if (!thisValue && playersTurn === Meteor.userId()) {
            Meteor.call('setMark', elementIndex, sign);
          } else {
            console.log('It is not your turn. Wait pls.')
          }
        } else {
          console.log('you should reset board');
        }
      });

      groupEnter.append('text')
        .attr("x", function(d, i) {
          var multiplier = i % 15
            ;
  
          return multiplier * fieldSize + 10;
        })
        .attr("y", function (d, i) {
          var multiplier = Math.floor(i/15)
            ;

          return multiplier * fieldSize + 6;
        })
        .attr("dy", "1em")
        .attr("fill",function (d) {
          if (d === "X") {
            return "red";
          } else if (d === "O") {
            return "green";
          }
        })
        .text(function(d) { return d });
      
      group.select('text')
        .attr("fill",function (d) {
          if (d === "X") {
            return "red";
          } else if (d === "O") {
            return "green";
          }})
        .text(function (d) { return d });
  });
});

Template.board.helpers({
  //looks like it is not necessary 'X' or 'O' after 'player'
  playerX: function (sign) { 
    return getUserName(sign);
  },
  playerO: function (sign) {
    return getUserName(sign);
  },
  winner: function () {
    var boardOne   = Boards.findOne("boardOne")
      , Users      = Meteor.users
      , winnerId   = boardOne.winner
      , playerName = Users.findOne(winnerId) && Users.findOne(winnerId).username
      ;

    return playerName;
  }
});

Template.board.events({
  "click .reset-board": function () {
    Meteor.call('resetBoard');
  }
})

function getUserName (sign) {
  var boardOne   = Boards.findOne("boardOne")
    , Users      = Meteor.users
    , playerId   = boardOne && boardOne.players && boardOne.players[sign]
    , playerName = Users.findOne(playerId) && Users.findOne(playerId).username
    ;

  return playerName;
}