## Classes

<dl>
<dt><a href="#Timeline">Timeline</a></dt>
<dd><p>Top level timeline class</p>
</dd>
<dt><a href="#TimelineEvent">TimelineEvent</a></dt>
<dd><p>Basic Timeline Event</p>
</dd>
<dt><a href="#ParallelTimelineEvent">ParallelTimelineEvent</a></dt>
<dd><p>The ParallelTimelineEvent class allows you to group <a href="#PrimerEvent">PrimerEvent</a>s, where all events
run in parallel, and the group itself has a duration equal to the longest duration of
all the children</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#timeline">timeline(events)</a> ⇒ <code><a href="#Timeline">Timeline</a></code></dt>
<dd><p>Factory function for the <a href="#Timeline">Timeline</a> constructor</p>
</dd>
<dt><a href="#timelineEvent">timelineEvent(name, properties)</a> ⇒ <code><a href="#TimelineEvent">TimelineEvent</a></code></dt>
<dd><p>Factory function for the <a href="#TimelineEvent">TimelineEvent</a> constructor</p>
</dd>
<dt><a href="#parallelTimelineEvent">parallelTimelineEvent(name, events)</a> ⇒ <code><a href="#ParallelTimelineEvent">ParallelTimelineEvent</a></code></dt>
<dd><p>Factory function for the <a href="#ParallelTimelineEvent">ParallelTimelineEvent</a> constructor</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#PrimerEvent">PrimerEvent</a> : <code><a href="#TimelineEvent">TimelineEvent</a></code> | <code><a href="#ParallelTimelineEvent">ParallelTimelineEvent</a></code></dt>
<dd></dd>
</dl>

<a name="Timeline"></a>

## Timeline
Top level timeline class

**Kind**: global class  

* [Timeline](#Timeline)
    * [new Timeline(events)](#new_Timeline_new)
    * [.init(t)](#Timeline+init)
    * [.update(t)](#Timeline+update)
    * [.get(event)](#Timeline+get)

<a name="new_Timeline_new"></a>

### new Timeline(events)

| Param | Type |
| --- | --- |
| events | [<code>Array.&lt;PrimerEvent&gt;</code>](#PrimerEvent) | 

<a name="Timeline+init"></a>

### timeline.init(t)
Initialise the timeline with `t` as the zero point

**Kind**: instance method of [<code>Timeline</code>](#Timeline)  

| Param | Type |
| --- | --- |
| t | <code>number</code> | 

<a name="Timeline+update"></a>

### timeline.update(t)
Update the timeline

**Kind**: instance method of [<code>Timeline</code>](#Timeline)  

| Param | Type |
| --- | --- |
| t | <code>number</code> | 

<a name="Timeline+get"></a>

### timeline.get(event)
Get a named [PrimerEvent](#PrimerEvent) object

**Kind**: instance method of [<code>Timeline</code>](#Timeline)  

| Param | Type |
| --- | --- |
| event | <code>string</code> | 

<a name="TimelineEvent"></a>

## TimelineEvent
Basic Timeline Event

**Kind**: global class  

* [TimelineEvent](#TimelineEvent)
    * [new TimelineEvent(name, properties)](#new_TimelineEvent_new)
    * [.value()](#TimelineEvent+value)

<a name="new_TimelineEvent_new"></a>

### new TimelineEvent(name, properties)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Name of this event (used in [get](#Timeline+get)) |
| properties | <code>object</code> |  |  |
| [properties.duration] | <code>number</code> | <code>0</code> | Active duration of the event |
| [properties.preWait] | <code>number</code> | <code>0</code> | Time to wait before entering the active duration |
| [properties.postWait] | <code>number</code> | <code>0</code> | Time to wait before finalising the event |
| [properties.ease] | <code>function</code> | <code>t&#x3D;&gt;t</code> | Custom easing function |

<a name="TimelineEvent+value"></a>

### timelineEvent.value()
Get the latest time value associated with this event

**Kind**: instance method of [<code>TimelineEvent</code>](#TimelineEvent)  
<a name="ParallelTimelineEvent"></a>

## ParallelTimelineEvent
The ParallelTimelineEvent class allows you to group [PrimerEvent](#PrimerEvent)s, where all events
run in parallel, and the group itself has a duration equal to the longest duration of
all the children

**Kind**: global class  

* [ParallelTimelineEvent](#ParallelTimelineEvent)
    * [new ParallelTimelineEvent(name, events)](#new_ParallelTimelineEvent_new)
    * [.get(event)](#ParallelTimelineEvent+get)
    * [.value()](#ParallelTimelineEvent+value)

<a name="new_ParallelTimelineEvent_new"></a>

### new ParallelTimelineEvent(name, events)

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| events | [<code>Array.&lt;PrimerEvent&gt;</code>](#PrimerEvent) | 

<a name="ParallelTimelineEvent+get"></a>

### parallelTimelineEvent.get(event)
Get a named [PrimerEvent](#PrimerEvent) object in this group

**Kind**: instance method of [<code>ParallelTimelineEvent</code>](#ParallelTimelineEvent)  

| Param | Type |
| --- | --- |
| event | <code>string</code> | 

<a name="ParallelTimelineEvent+value"></a>

### parallelTimelineEvent.value()
Returns a linear representation for the longest event in the group

**Kind**: instance method of [<code>ParallelTimelineEvent</code>](#ParallelTimelineEvent)  
<a name="timeline"></a>

## timeline(events) ⇒ [<code>Timeline</code>](#Timeline)
Factory function for the [Timeline](#Timeline) constructor

**Kind**: global function  

| Param | Type |
| --- | --- |
| events | [<code>Array.&lt;PrimerEvent&gt;</code>](#PrimerEvent) | 

<a name="timelineEvent"></a>

## timelineEvent(name, properties) ⇒ [<code>TimelineEvent</code>](#TimelineEvent)
Factory function for the [TimelineEvent](#TimelineEvent) constructor

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Name of this event (used in [get](#Timeline+get)) |
| properties | <code>object</code> |  |  |
| [properties.duration] | <code>number</code> | <code>0</code> | Active duration of the event |
| [properties.preWait] | <code>number</code> | <code>0</code> | Time to wait before entering the active duration |
| [properties.postWait] | <code>number</code> | <code>0</code> | Time to wait before finalising the event |
| [properties.ease] | <code>function</code> | <code>t&#x3D;&gt;t</code> | Custom easing function |

<a name="parallelTimelineEvent"></a>

## parallelTimelineEvent(name, events) ⇒ [<code>ParallelTimelineEvent</code>](#ParallelTimelineEvent)
Factory function for the [ParallelTimelineEvent](#ParallelTimelineEvent) constructor

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| events | [<code>Array.&lt;PrimerEvent&gt;</code>](#PrimerEvent) | 

<a name="PrimerEvent"></a>

## PrimerEvent : [<code>TimelineEvent</code>](#TimelineEvent) \| [<code>ParallelTimelineEvent</code>](#ParallelTimelineEvent)
**Kind**: global typedef  
