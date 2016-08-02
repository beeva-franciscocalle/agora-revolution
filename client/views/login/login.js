import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

let error = new ReactiveVar(null);

Template.Login.events({
  'click #linkedin-login': (event, tpl) => {
    Meteor.loginWithLinkedIn({ loginStyle: 'popup'}, (err) => {
      if (err) {
        error.set(err);
      } else {
        Meteor.call('/user/tag', FlowRouter.getQueryParam('tag'), (err, res) => {
          FlowRouter.go('map');
        });
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

Template.Login.onCreated(() => {
  error = new ReactiveVar(null);
});
Template.Login.onRendered(() => {
  this.$('#grid').attr('class',' ui middle aligned center aligned grid');
});
