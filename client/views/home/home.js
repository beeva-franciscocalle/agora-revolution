import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Home.events({
  'click .huge.animated.black.button': function (event, tpl) {
    tpl.$('#home').transition({
      animation: 'fade',
      duration: '1s',
      onComplete: function () {
        FlowRouter.go('login');
      },
    });
  },
  'click #check-them-out': () => {
    FlowRouter.go('highlights');
  },
});
