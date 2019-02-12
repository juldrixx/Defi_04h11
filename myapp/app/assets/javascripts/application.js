// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require d3

window.onload = function () {
    var dataset = [
        { month: "Jan", pizzas: 10000 },
        { month: "Feb", pizzas: 20000 },
        { month: "Mar", pizzas: 40000 },
        { month: "Apr", pizzas: 30000 },
        { month: "May", pizzas: 30000 },
        { month: "Jun", pizzas: 50000 },
        { month: "Jul", pizzas: 30000 },
        { month: "Aug", pizzas: 50000 },
        { month: "Sep", pizzas: 60000 },
        { month: "Oct", pizzas: 20000 },
        { month: "Nov", pizzas: 10000 },
        { month: "Dec", pizzas: 90000 },
    ];
    // Notice the change of dataset

    // Calculate Margins and canvas dimensions
    var margin = { top: 40, right: 40, bottom: 40, left: 60 },
        width,
        height = 200 - margin.top - margin.bottom;

    // Notice the change of Scale to Band and how the scale now starts at zero
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var svg = d3.select("#bar_chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(dataset.map(function (d) { return d.month; }));
    y.domain([0, d3.max(dataset, function (d) { return d.pizzas; })]);

    // Axes
    var xAxisElement = svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")


    svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));


    function drawChart() {
        width = parseInt(d3.select('#bar_chart').style('width'), 10) - margin.left - margin.right;
        x.range([0, width]);
        xAxisElement.call(d3.axisBottom(x));

        // Labels
        svg.append("text")
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .attr("transform", "translate(" + (margin.left - 108) + "," + (height / 2) + ")rotate(-90)")
            .text("Pizzas");

        svg.append("text")
            .style("font-size", "14px")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (width / 2) + "," + (height - (margin.bottom - 74)) + ")")
            .text("Month");

        //  Chart Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 20 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Pizza consumption");

        // Adding Bars
        svg.selectAll(".bar")
            .data(dataset)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.month); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.pizzas); })
            .attr("height", function (d) { return height - y(d.pizzas); });

    }

    drawChart();
    window.addEventListener('resize', drawChart);

};
