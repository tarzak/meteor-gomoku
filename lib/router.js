Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe('boards'); }
});

Router.route('/', function () {
  this.render('board', {data: {test:1}});
});