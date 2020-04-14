var margin = {top: 30, right: 20, bottom: 70, left: 400},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.income = +d.income;
      d.smokes = +d.smokes;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.income; }));
  y.domain([0, d3.max(data, function(d) { return d.smokes; })]);

      
  // Add the scatterplot
  svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", 8)
      .attr("cx", function(d) { return x(d.income); })
      .attr("cy", function(d) { return y(d.smokes); })
      .attr("fill", "lightblue")

var circleLabels = svg.selectAll("text").data(data).enter().append("text");
circleLabels.attr("x", function(d) { return x(d.income)-6; })
    .attr("y", function(d) { return y(d.smokes)+4; })
    .attr("font-family","sans-serif").attr("font-size",8);
circleLabels.text(function(d,i) { return d.abbr; });
        
  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

 // text label for the x axis
 svg.append("text")             
 .attr("transform",
       "translate(" + (width/2) + "," + 
                      (height + margin.top + 22) + ")")
 .style("text-anchor", "middle")
 .text("Average Annual Income (USD)");

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

  svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 350 - margin.left)
   .attr("x", 0 - (height / 2))
   .attr("dy", "1em")
   .style("text-anchor", "middle")
   .text("% of Smokers"); 

   svg.append("text")
   .attr("x", (width / 2))             
   .attr("y", 0 - (margin.top / 2))
   .attr("text-anchor", "middle")  
   .style("font-size", "16px") 
   .style("text-decoration", "underline")  
   .text("Income vs. Smokers by State");

});

