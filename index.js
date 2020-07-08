const linear = t => t;
/**
 * Top level timeline class
 */
class Timeline {
  /**
   * @param {TimelineEvent|ParallelTimelineEvent} events
   */
  constructor(events) {
    this.events = events;

    this.named = this.events.reduce((acc, cur) => {
      if (!(cur instanceof BaseTimelineEvent)) {
        throw new TypeError('Invalid timeline event', cur);
      }
      acc[cur.name] = cur;
      return acc;
    }, {});

    this.referencePoint = 0;
  }

  /**
   * Initialise the timeline with `t` as the zero point
   * @param {number} t 
   */
  init(t) {
    this.referencePoint = t;
    let offset = 0;
    this.events.forEach(e => {
      e.init(t + offset);
      offset += e.getTotalDuration();
    });
  }

  /**
   * Update the timeline
   * @param {number} t 
   */
  update(t) {
    const dt = t - this.referencePoint;
    this.events.forEach(e => e.update(dt));
  }

  /**
   * Get a named TimelineEvent object
   * @param {string} event 
   */
  get(event) {
    return this.named[event];
  }
}

class BaseTimelineEvent {
  constructor(name) {
    this.name = name;
    this.referencePoint = 0;
  }
}

/**
 * Basic Timeline Event
 */
class TimelineEvent extends BaseTimelineEvent {
  /**
   * @param {string} name Name of this event (used in {@link Timeline#get})
   * @param {number} properties
   * @param {number} [properties.duration=0] Active duration of the event
   * @param {number} [properties.preWait=0] Time to wait before entering the active duration
   * @param {number} [properties.postWait=0] Time to wait before finalising the event
   * @param {function} [properties.ease=t=>t] Custom easing function
   */
  constructor(name, {duration, preWait, postWait, ease}) {
    super(name);
    this.duration = duration || 0;
    this.preWait = preWait || 0;
    this.postWait = postWait || 0;
    this.ease = ease || linear;
    this.t = 0;
    this.cachedDuration = this.duration + this.preWait + this.postWait;
  }

  init(t) {
    this.referencePoint = t;
  }

  getTotalDuration() {
    return this.cachedDuration;
  }

  update(t) {
    if (t < this.referencePoint + this.preWait) {
      this.t = 0;
    } else if (t > this.referencePoint + this.preWait + this.duration) {
      this.t = 1;
    } else {
      this.t = this.ease((t - this.referencePoint) / (this.preWait + this.duration));
    }
  }

  /**
   * Get the latest time value associated with this event
   */
  value() {
    return this.t;
  }
}

/**
 * The ParallelTimelineEvent class allows you to group child events, where all events
 * run in parallel, and the group itself has a duration equal to the longest duration of
 * all the children
 */
class ParallelTimelineEvent extends BaseTimelineEvent {
  /**
   * @param {string} name 
   * @param {TimelineEvent|ParallelTimelineEvent} events 
   */
  constructor(name, events) {
    super(name);
    this.events = events;
    this.named = this.events.reduce((acc, cur) => {
      acc[cur.name] = cur;
      return acc;
    }, {});
    this.cachedDuration = this.events.reduce((acc, e) => Math.max(acc, e.getTotalDuration()), 0);
    this.t = 0;
  }

  init(t) {
    this.referencePoint = t;
    this.events.forEach(e => e.init(t));
  }

  getTotalDuration() {
    return this.cachedDuration;
  }

  update(t) {
    this.t = t;
    this.events.forEach(e => e.update(t));
  }

  /**
   * Get a named TimelineEvent object in this group
   * @param {string} event 
   */
  get(event) {
    return this.named[event];
  }

  /**
   * Returns a linear representation for the longest event in the group
   */
  value() {
    return Math.max(1, Math.min(0, (this.t - this.referencePoint) / this.getTotalDuration()));
  }
}

/**
 * Factory function for the {@Link Timeline} constructor
 * @param {TimelineEvent|ParallelTimelineEvent} events
 * @returns {Timeline}
 */
function timeline(events) {
  return new Timeline(events);
}

/**
 * Factory function for the {@Link TimelineEvent} constructor
 *
 * @param {string} name Name of this event (used in {@link Timeline#get})
 * @param {number} properties
 * @param {number} [properties.duration=0] Active duration of the event
 * @param {number} [properties.preWait=0] Time to wait before entering the active duration
 * @param {number} [properties.postWait=0] Time to wait before finalising the event
 * @param {function} [properties.ease=t=>t] Custom easing function
 * @returns {TimelineEvent}
 *
 */
function timelineEvent(name, properties) {
  return new TimelineEvent(name, properties);
}

/**
 * Factory function for the {@Link ParallelTimelineEvent} constructor
 * @param {string} name 
 * @param {TimelineEvent|ParallelTimelineEvent} events 
 * @returns {ParallelTimelineEvent}
 */
function parallelTimelineEvent(name, events) {
  return new ParallelTimelineEvent(name, events);
}

module.exports = {
  Timeline,
  TimelineEvent,
  ParallelTimelineEvent,

  timeline,
  timelineEvent,
  parallelTimelineEvent,
};
