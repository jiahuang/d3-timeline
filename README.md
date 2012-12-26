#d3-timeline
A simple d3 timeline plugin.

Get something that looks like

![Rectangular Timeline](https://raw.github.com/jiahuang/d3-timeline/master/examples/timeline1.png)

for a dataset that looks like 

```js
var testData = [
  {id: "person a", times: [
    {"starting_time": 1355752800000, "ending_time": 1355759900000}, 
    {"starting_time": 1355767900000, "ending_time": 1355774400000}]},
  {id: "person b", times: [
    {"starting_time": 1355759910000, "ending_time": 1355761900000}]},
  {id: "person c", times: [
    {"starting_time": 1355761910000, "ending_time": 1355763910000}]},
  ];
```

with a call that looks like 

```js
var chart = d3.timeline()
  .width(500)
  .height(100);

var svg = d3.select("#timeline1").append("svg").attr("height", 100).attr("width", 500)
  .datum(testData).call(chart);
```

Works with circles. In case the rectangular edges are too pointy.

![Circular Timeline](https://raw.github.com/jiahuang/d3-timeline/master/examples/timeline2.png
)

And a pesudo-gantt chart thingy

![Gantt chart](https://raw.github.com/jiahuang/d3-timeline/master/examples/timeline3.png
)

It can even do things on hover and click. For when someone accidentally mouses over your chart.