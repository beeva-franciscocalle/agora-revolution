import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

const error = new ReactiveVar(null);

Template.Login.events({
  'click #linkedin-login': (event, tpl) => {
    Meteor.loginWithLinkedIn({ loginStyle: 'popup'}, (err) => {
      if (err) {
        error.set(err);
      } else {
        FlowRouter.go('map');
      }
    });
  }
});

Template.Login.helpers({
  error: () => {
    return error.get();
  },
  tagNFC: () => {
    return !!FlowRouter.getQueryParam('tag');
  }
});

Template.Login.onRendered(() => {
  this.$('#grid').attr('class',' ui middle aligned center aligned grid');
});
