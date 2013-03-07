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
        stacked = false,
        textLabel = false,
        rotateTicks = false,
        itemHeight = 20
      ;

    function timeline (g) {
      var yAxisMapping = {},
        maxStack = 1,
        minTime = 0,
        maxTime = 0;
      
      // check how many stacks we're gonna need
      // do this here so that we can draw the axis before the graph
      if (stacked || (ending == 0 && beginning == 0)) {
        g.each(function (d, i) {
          d.forEach(function (datum, index) {

            // create y mapping for stacked graph
            if (stacked && Object.keys(yAxisMapping).indexOf(index) == -1) {
              yAxisMapping[index] = maxStack;
              maxStack++;
            }

            // figure out beginning and ending times if they are unspecified
            if (ending == 0 && beginning == 0){
              datum.times.forEach(function (time, i) {
                if (time.starting_time < minTime || minTime == 0)
                  minTime = time.starting_time;
                if (time.ending_time > maxTime)
                  maxTime = time.ending_time;
              });
            }
          });
        });

        if (ending == 0 && beginning == 0) {
          beginning = minTime;
          ending = maxTime;
        }
      }

      var scaleFactor = (1/(ending - beginning)) * (width - margin.left - margin.right);

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
        
      if (rotateTicks) {
        g.selectAll("text")
          .attr("transform", function(d) {
            return "rotate(" + rotateTicks + ")translate("
              + (this.getBBox().width/2+10) + ","
              + this.getBBox().height/2 + ")";
          });
      }

      // draw the chart
      g.each(function(d, i) {
        d.forEach( function(datum, index){
          var data = datum.times;
          var hasLabel = (typeof(datum.label) != "undefined");

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
            .style("fill", colorCycle(index))
            .on("mousemove", function (d, i) {
              hover(d, index, datum);
            })
            .on("click", function (d, i) {
              click(d, index, datum);
            })
          ;

          // add the label
          // TODO: this doesn't work with something that is stacked

          if (hasLabel || textLabel) {
            g.append('text')
              .attr("class", "timeline-label")
              .attr("transform", "translate("+ 0 +","+ (itemHeight - 5 + margin.top + (itemHeight+5) * yAxisMapping[index])+")")
              .text(hasLabel ? datum.label : datum.id);
          }
          
          if (typeof(datum.icon) != "undefined") {
            g.append('image')
              .attr("class", "timeline-label")
              .attr("transform", "translate("+ 0 +","+ (itemHeight + 10 + (itemHeight+5) * yAxisMapping[index])+")")
              .attr("xlink:href", datum.icon)
              .attr("width", margin.left)
              .attr("height", itemHeight);
          }

          function getStackPosition(d, i) {
            if (stacked) {
              return margin.top + (itemHeight+5) * yAxisMapping[index];
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

    timeline.stack = function () {
      stacked = !stacked;
      return timeline;
    };

    timeline.label = function () {
      textLabel = !textLabel;
      return timeline;
    }
    
    timeline.rotateTicks = function (degrees) {
        rotateTicks = degrees;
        return timeline;
    }
    
    return timeline;
  };
})();
