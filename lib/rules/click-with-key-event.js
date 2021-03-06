const Validator = require('../validator');

function clickWithKeyboardEvent($, content, options) {
  return new Validator({
    $template: $,
    content,
    selectors: '*',
    isInvalid: ($elem) => {
      let eventsPairs = [
        {
          targetEvent: 'onclick',
          assocEvents: ['onkeyup', 'onkeydown', 'onkeypress'],
        },
      ];

      if (options.ng) {
        eventsPairs = [
          ...eventsPairs,
          {
            targetEvent: '(click)',
            assocEvents: ['(keyup)', '(keydown)', '(keypress)'],
          },
        ];
      }

      return eventsPairs
        .filter((eventPair) => {
          const { targetEvent, assocEvents } = eventPair;
          const hasAssociatedListener = assocEvents.some(eventName => $elem.attr(eventName));

          return $elem.attr(targetEvent) && !hasAssociatedListener;
        })
        .length;
    },
    warningMessage: 'Visible, non-interactive elements with click handlers must have at least one keyboard listener.',
  });
}

module.exports = clickWithKeyboardEvent;
