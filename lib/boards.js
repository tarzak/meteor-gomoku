Boards = new Mongo.Collection('boards');

Boards.allow({
  update: function (userId) {
    return !!userId;
  }
})