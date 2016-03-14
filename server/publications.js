Meteor.publish('boards', function() {
  return Boards.find();
});

Meteor.publish('users', function () {
  return Meteor.users.find({"status.online": true},{fields:{username: 1, sign: 1}});
});