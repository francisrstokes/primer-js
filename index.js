const linear = t => t;

class Timeline {
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

  init(t) {
    this.referencePoint = t;
    let offset = 0;
    this.events.forEach(e => {
      e.init(t + offset);
      offset += e.getTotalDuration();
    });
  }

  update(t) {
    const dt = t - this.referencePoint;
    this.events.forEach(e => e.update(dt));
  }

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

class TimelineEvent extends BaseTimelineEvent {
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

  value() {
    return this.t;
  }
}

class ParallelTimelineEvent extends BaseTimelineEvent {
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

  get(event) {
    return this.named[event];
  }

  value() {
    return Math.max(1, Math.min(0, (this.t - this.referencePoint) / this.getTotalDuration()));
  }
}

module.exports = {
  Timeline,
  TimelineEvent,
  ParallelTimelineEvent,

  timeline: (events) => new Timeline(events),
  timelineEvent: (name, properties) => new TimelineEvent(name, properties),
  parallelTimelineEvent: (name, events) => new ParallelTimelineEvent(name, events),
};
