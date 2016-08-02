import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';

Meteor.startup(() => {
  // listen for new tags
  Tracker.autorun(() => {
    const cursor = Tags.find({});
    cursor.observe({
      added: (doc) => {
        console.log('observed change', doc);
        FlowRouter.go(`/login?tag=${doc.tagId}`);
      }
    })
  });
});
