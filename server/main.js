import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
Meteor.startup(() => {
  ServiceConfiguration.configurations.update(
    { "service": "linkedin" },
    {
      $set: { "clientId": "77b0gw36zedgyv", "secret": "9DwygbG4k6tHm4ON" }
    },
    { upsert: true }
  );
});
