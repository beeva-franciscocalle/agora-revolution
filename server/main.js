import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Picker } from 'meteor/meteorhacks:picker';

const register = (params, res) => {
  console.log('registering new tag', params._id);
  const id = Tags.insert({ tagId: params._id });
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Trailer': 'Content-MD5'
  });
  res.end(id);
}

const momentazo = (params, res) => {
  console.log('registering new momentazo', params._id);
  const user = Meteor.users.findOne({ tagId: params._id });
  const id = Highlights.insert({
    tagId: params._id,
    when: new Date().getTime(),
    who: user.profile,
  });
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Trailer': 'Content-MD5'
  });
  res.end(id);
}

Meteor.startup(() => {
  ServiceConfiguration.configurations.update(
    { "service": "linkedin" },
    {
      $set: { "clientId": "77b0gw36zedgyv", "secret": "9DwygbG4k6tHm4ON" }
    },
    { upsert: true }
  );

  Picker.route('/tags/:_id', function(params, req, res, next) {
    if (!Tags.findOne({ tagId: params._id })) {
      register(params, res);
    } else {
      momentazo(params, res);
    }
  });

  Meteor.methods({
    '/user/tag': (tag) => {
      Meteor.users.update(
        { _id: Meteor.user()._id },
        { $set: { tagId: tag} }
      );
    }
  });
});
