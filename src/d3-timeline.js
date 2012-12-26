(function() {
  
  d3.timeline = function() {
    var DISPLAY_TYPES = ["circle", "rect"];

    var hover = function () {}, 
        click = function () {},
        orient = "bottom",
        width = 500,
        height = 100,
        tickFormat = { format: d3.time.format("%I %p"), 
          tickTime: d3.time.hours, 
          tickNumber: 1, 
          tickSize: 6 },
        colorCycle = d3.scale.category20(),
        display = "rect",
        beginning = 0,
        ending = 0,
        margin = {left: 30, right:30, top: 30, bottom:30},
        unstacked = false,
        textLabel = false,
        itemHeight = 20
      ;

    function timeline (g) {
      var scaleFactor = (1/(ending - beginning)) * (width - margin.left - margin.right);
      var yAxisMapping = {};
      var maxStack = 1;
      
      // check how many stacks we're gonna need
      // do this here so that we can draw the axis before the graph
      if (unstacked) {
        g.each(function (d, i) {
          d.forEach(function (datum, index) {
            // create y mapping for unstacked
            if (Object.keys(yAxisMapping).indexOf(datum.id) == -1) {
              yAxisMapping[datum.id] = maxStack;
              maxStack++;
            }
          });
        });
      }

      // draw the axis
      var xScale = d3.time.scale()
        .domain([beginning, ending])
        .range([margin.left, width - margin.right]);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient(orient)
        .tickFormat(tickFormat.format)
        .ticks(tickFormat.tickTime, tickFormat.tickNumber)
        .tickSize(tickFormat.tickSize);

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 0 +","+(margin.top + (itemHeight +5) * maxStack)+")")
        .call(xAxis);

      // draw the chart
      g.each(function(d, i) {
        d.forEach( function(datum, index){
          var data = datum.times;

          g.selectAll("svg").data(data).enter()
            .append(display)
            .attr('x', getXPos)
            .attr("y", getStackPosition)
            .attr("width", function (d, i) {
              return (d.ending_time - d.starting_time) * scaleFactor;
            })
            .attr("cy", getStackPosition)
            .attr("cx", getXPos)
            .attr("r", itemHeight/2)
            .attr("height", itemHeight)
            .style("fill", colorCycle(datum.id))
            .on("mousemove", function (d, i) {
              hover(d, i, datum);
            })
            .on("click", function (d, i) {
              click(d, i, datum);
            })
          ;

          // add the label
          // TODO: this doesn't work with something that is stacked
          if (textLabel) {
            g.append('text')
              .attr("class", "timeline-label")
              .attr("transform", "translate("+ 0 +","+ (15 + margin.top + (itemHeight+5) * yAxisMapping[datum.id])+")")
              .text(datum.id);
          }

          function getStackPosition(d, i) {
            if (unstacked) {
              return margin.top + (itemHeight+5) * yAxisMapping[datum.id];
            } 
            return margin.top;
          }
        });
      });

      function getXPos(d, i) {
        return margin.left + (d.starting_time - beginning)* scaleFactor;
      }
    }

    timeline.margin = function (p) {
      if (!arguments.length) return margin;
      margin = p;
      return timeline;
    }

    timeline.orient = function (orientation) {
      if (!arguments.length) return orient;
      orient = orientation;
      return timeline;
    };

    timeline.height = function (h) {
      if (!arguments.length) return height;
      height = h;
      return timeline;
    };

    timeline.width = function (w) {
      if (!arguments.length) return width;
      width = w;
      return timeline;
    };

    timeline.display = function (displayType) {
      if (!arguments.length || (DISPLAY_TYPES.indexOf(displayType) == -1)) return display;
      display = displayType;
      return timeline;
    };

    timeline.tickFormat = function (format) {
      if (!arguments.length) return tickFormat;
      tickFormat = format;
      return timeline;
    };

    timeline.hover = function (hoverFunc) {
      if (!arguments.length) return hover;
      hover = hoverFunc;
      return timeline;
    };

    timeline.click = function (clickFunc) {
      if (!arguments.length) return click;
      click = clickFunc;
      return timeline;
    };

    timeline.colors = function (colorFormat) {
      if (!arguments.length) return colorCycle;
      colorCycle = colorFormat;
      return timeline;
    };

    timeline.beginning = function (b) {
      if (!arguments.length) return beginning;
      beginning = b;
      return timeline;
    };

    timeline.ending = function (e) {
      if (!arguments.length) return ending;
      ending = e;
      return timeline;
    };

    timeline.unstack = function () {
      unstacked = !unstacked;
      return timeline;
    };

    timeline.label = function () {
      textLabel = !textLabel;
      return timeline;
    }

    return timeline;
  };
})();