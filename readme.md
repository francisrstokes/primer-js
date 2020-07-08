# primer-js

**primer-js** is a tiny (474 bytes minified + gzipped) library for creating normalised, unit independent timelines, for use in programatic animation.

## Example

```javascript
const {timeline, timelineEvent} = require('primer-js');

const tl = timeline([
  // event "a" has a duration of 100 time units
  timelineEvent("a", { duration: 100 }),

  // event "b" lasts for 300 time units, but is delayed by 200
  timelineEvent("b", { duration: 300, preWait: 200 }),

  // event "c" last for 200 time units, and uses a custom expoential easing function
  timelineEvent("c", { duration: 200, ease: x => x**2 }),
]);

// Begin the timeline at t=0
tl.init(0);

// draw function is called with a a time in milleseconds as often as possible
const draw = t => {
  tl.update(t);

  // The values the timeline produces are always normalised to the inclusive range [0, 1]
  const someOpacityValue = tl.get("b").value();
};
```
