#d3-timeline
A simple d3 timeline plugin.

Get something that looks like

![Rectangular Timeline](https://raw.github.com/jiahuang/d3-timeline/master/examples/timeline1.png)

for a dataset that looks like 

```js
var testData = [
  {label: "person a", times: [
    {"starting_time": 1355752800000, "ending_time": 1355759900000}, 
    {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
  {label: "person b", times: [
    {"starting_time": 1355759910000, "ending_time": 1355761900000}]},
  {label: "person c", times: [
    {"starting_time": 1355761910000, "ending_time": 1355763910000}]},
  ];
```

with a call that looks like 

```js
var chart = d3.timeline();

var svg = d3.select("#timeline1").append("svg").attr("width", 500)
  .datum(testData).call(chart);
```

Works with circles. In case the rectangular edges are too pointy.

![Circular Timeline](https://raw.github.com/jiahuang/d3-timeline/master/examples/timeline2.png
)

And a pesudo-gantt chart thingy

![Gantt chart](https://raw.github.com/jiahuang/d3-timeline/master/examples/timeline3.png
)

And icons

![Icon chart](https://raw.github.com/jiahuang/d3-timeline/master/examples/timeline4.png
)

For your *really* long charts, it supports scrolling. It can even do things on hover, click, and scroll for when someone accidentially interacts with your chart.

Look at the [examples](https://github.com/jiahuang/d3-timeline/blob/master/examples/example.html) for more details.

##Data formats

The simplest data format only requires `starting_time` and `ending_time` for each series of data. 
```js
[
  {times: [
    {"starting_time": 1355752800000, "ending_time": 1355759900000}, 
    {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
  {times: [
    {"starting_time": 1355759910000, "ending_time": 1355761900000}]}
];
```

`label` can be added if you want names by each series of data. In order for this to properly show up, the timeline needs to be called with .stack()
```js
[
  {label: "person a", times: [
    {"starting_time": 1355752800000, "ending_time": 1355759900000}, 
    {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
  {label: "person b", times: [
    {"starting_time": 1355759910000, "ending_time": 1355761900000}]}
];
```

`icon` can be added if you want icons by each series of data. In order for this to properly show up, the timeline needs to be called with .stack(). Icons and labels can also be mixed in together.
```js
[
  {icon: "path/to/img.png", times: [
    {"starting_time": 1355752800000, "ending_time": 1355759900000}, 
    {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
  {label: "person b", times: [
    {"starting_time": 1355759910000, "ending_time": 1355761900000}]}
];
```

##Method Calls
All methods that take in arguments return the current settings if no argument is passed.

###.width(width)
sets the width of the timeline. If the width of the timeline is longer than the width of the svg object, the timeline will automatically scroll. The width of the timeline will default to the width of the svg if wdith is not set.

###.height(height)
sets the height of the timeline. The height of the timeline will be automatically calculated from the height of each item if height is not set on the timeline or the svg.

###.itemHeight(height)
sets the height of the data series in the timeline. Defaults to 20px.

###.itemMargin(height)
sets the margin between the data series in the timeline. Defaults to 5px.

###.margin({left: , right: , top: , bottom: })
sets the margin of the entire timeline inside of the svg. Defaults to 30px all around.

###.display("circle" | "rect")
Displays the data series as either circles or rectangles. Circles are placed in the middle of the spanned time. Defaults to "rect".

###.tickFormat({format: , tickTime: , tickNumber: , tickSize: })
sets the formatting of the ticks in the timeline. Defaults to 
```js
{
  format: d3.time.format("%I %p"), 
  tickTime: d3.time.hours, 
  tickNumber: 1, 
  tickSize: 6 
}
```

###.rotateTicks(degrees)
sets the degree of rotation of the tickmarks. Defaults to no rotation (0 degrees).

###.orient("bottom" | "top")
sets the placement of the axis. Defaults to bottom.

###.colors(callback)
sets the rotation of color for the data series in the timeline. Defaults to `d3.scale.category20()`.

###.beginning(date)
sets the time that the timeline should start. If `beginning` and `ending` are not set, the timeline will calculate it based off of the smallest and largest times. 

###.ending(date)
sets the time that the timeline should end. If `beginning` and `ending` are not set, the timeline will calculate it based off of the smallest and largest times. 

###.stack()
Takes in no arguments. Toggles the stacking/unstacking of data series in the timeline. Needs to be true in order for icons and labels to show up properly.

###.hover(callback)
takes in a callback called on mouseover of the timeline data. Example

```js
d3.timeline()
  .hover(function (d, i, datum) { 
    // d is the current rendering object
    // i is the index during d3 rendering
    // datum is the data object
  });
```

###.click(callback)
takes in a callback called on click of the timeline data. Example

```js
d3.timeline()
  .click(function (d, i, datum) { 
    // d is the current rendering object
    // i is the index during d3 rendering
    // datum is the data object
  });
```

###.scroll(callback)
takes in a callback called on scroll of the timeline data. Example

```js
d3.timeline()
  .scroll(function (x, scale) {
    // x is the current position of the scroll
    // scale is the scale of the axis used
  });
```
