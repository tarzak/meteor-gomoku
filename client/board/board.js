Template.board.onRendered(function () {
  var svg = d3.select("#board").append("svg")
    // , cells = Boards.findOne({_id: "boardOne"}).cells
    ;

  this.autorun(function () {
    var board = Boards && Boards.findOne({_id: "boardOne"})
      , cells = board && board.cells
      , group = svg.selectAll("g").data(cells, function (d, i) { return i })
      , groupEnter = group.enter().append('g')
      /*, rects = group.selectAll('rect').data(cells, function (d, i) {
          return i;
        })*/
      , fieldSize = 40
      /*, fields = svg.selectAll('text').data(cells, function (d, i) {
          return i;
        })*/
      ;
    
    /*rects.enter()*/groupEnter/*.enter()*//*.append("g")*/.append('rect')
      .attr("x", function (d, i) {
          var multiplier = i % 15
            ;

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
      .attr("stoke-width", "2")
      .attr("fill", "none")

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
        .text(function(d) {return d});
      
      group.select('text')
        .attr("fill",function (d) {
          if (d === "X") {
            return "red";
          } else if (d === "O") {
            return "green";
          }})
        .text(function (d) { return d});

    /*group.enter().append('rect')
      .attr("x", function (d, i) {
          var multiplier = i % 15
            ;

          return multiplier * fieldSize;
      })
      .attr("y", function (d, i) {
          var multiplier = Math.floor(i/15)
            ;

          return multiplier * fieldSize;
      })

    /*var pars = div.selectAll("p").data(cells, function(d, i) {
      return i; 
    });

    pars.text(function (d) {return d});

    pars.enter().append("p").text(function (d) {return d});

    pars.text(function (d) {return d});

    pars.exit().remove();*/

  });

  /*svg.append("rect")
      .style("class", "fields")
      .style("class", "rects")
      .attr("x", function (d) {
          return d.x*fieldSize;
      })
      .attr("y", function (d) {
          return d.y*fieldSize;
      })
      .attr("width", fieldSize + "px")
      .attr("height", fieldSize + "px")
      .style("fill", function (d) {
          if ( ((d.x%2 == 0) && (d.y%2 == 0)) ||
               ((d.x%2 == 1) && (d.y%2 == 1))    ) 
              return "beige";
          else
              return "tan";
      });*/
});

Template.board.helpers({
  playerX: function (sign) {
    return getUserName(sign);
  },
  playerO: function (sign) {
    return getUserName(sign);
  }
});

function getUserName (sign) {
  var boardOne   = Boards.findOne("boardOne")
    , Users      = Meteor.users
    , playerId   = boardOne && boardOne.players && boardOne.players[sign]
    , playerName = Users.findOne(playerId) && Users.findOne(playerId).username
    ;

  return playerName;
}