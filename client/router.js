import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  name: 'root',
  action: function(params, queryParams) {
    console.log("Yeah! We are on the home");
    BlazeLayout.render('LayoutDefault', { content: 'Home'})
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action: function(params, queryParams) {
    console.log("Yeah! We are on the login");
    BlazeLayout.render('LayoutDefault', { content: 'Login'})
  }
});

FlowRouter.route('/map', {
  name: 'map',
  action: function(params, queryParams) {
    console.log("Yeah! We are on the map");
    BlazeLayout.render('LayoutDefault', { content: 'Map'})
  }
});

FlowRouter.route('/stats', {
  name: 'stats',
  action: function(params, queryParams) {
    console.log("Yeah! We are on the stats");
  }
});
