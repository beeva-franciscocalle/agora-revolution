import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import h337 from 'heatmap';

let heatmap;
const showContactInfo = new ReactiveVar(false);
Template.Map.helpers({
  showContactInfo: () => {
    return showContactInfo.get();
  }
});
Template.Map.onRendered(() => {
  heatmap = h337.create({
    container: document.getElementById('heat-map-container'),
    radius: 70,
  });

  heatmap.setData({
    max: 100,
    data: [
      // not so hot
      { x: 550, y: 75, value: 40},
      { x: 600, y: 75, value: 50},
      { x: 650, y: 75, value: 60},
      { x: 700, y: 75, value: 65},
      { x: 750, y: 75, value: 72},
      { x: 800, y: 75, value: 78},
      { x: 850, y: 75, value: 80},
      // hot zone
      { x: 850, y: 220, value: 95},
      { x: 830, y: 220, value: 93},
      { x: 810, y: 220, value: 90},
      { x: 790, y: 220, value: 85},
      { x: 760, y: 220, value: 82},
      { x: 720, y: 220, value: 80},
      { x: 100, y: 510, value: 99},
      // cold
      { x: 250, y: 420, value: 30},
      { x: 420, y: 400, value: 25},
    ]
  });
});

Template.Map.events({
  'mousemove #map': (ev) => {
    const val = heatmap.getValueAt({x: ev.clientX, y: ev.clientY});
    showContactInfo.set(val > 80);
  },
  'click #close': () => {
    FlowRouter.go('/');
  }
});
