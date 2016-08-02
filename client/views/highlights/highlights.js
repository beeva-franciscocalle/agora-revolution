import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

Template.Highlights.onRendered(() => {
  Template.instance().autorun(() => {
    const cursor = Highlights.find({});
    cursor.observe({
      added: (doc) => {
        console.log('observed change', doc);
        Blaze.renderWithData(
          Template.HighlightsItem, doc, document.getElementById('highlights')
        );
      }
    });
  });
});

Template.HighlightsItem.onRendered(function () {
  const $item = this.$('.item.momentazo');
  this.$('.qr.small.image').qrcode({
    width: 125, height: 125,
    text: Template.instance().data.who.publicProfileUrl,
  });
  $item.transition({
    animation: 'slide left',
    duration: '1s',
  });
  setTimeout(() => {
    $item.transition({
      animation: 'slide right',
      duration: '1s',
      onComplete: () => {
        $item.remove();
      }
    });
  }, 5000);
});
