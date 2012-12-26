#d3-timeline
A simple d3 timeline plugin.

Get something that looks like

![Rectangular Timeline](https://raw.github.com/jiahuang/d3-timeline/master/examples/timeline1.png)

with a call that looks like 

```
var chart = d3.timeline()
  .width(500)
  .height(100)
  .beginning(1355752800000)
  .ending(1355774400000);

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