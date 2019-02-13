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
        { periode: "2010-2011", buts: 46 },
        { periode: "2011-2012", buts: 47 },
        { periode: "2012-2013", buts: 29 },
        { periode: "2013-2014", buts: 50 },
        { periode: "2014-2015", buts: 48 },
        { periode: "2015-2016", buts: 53 },
        { periode: "2016-2017", buts: 60 },
        { periode: "2017-2018", buts: 48 },
    ];

    var margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 40
    };

    var width = parseInt(d3.select('#bar_chart').style('width')) - margin.left - margin.right;
    var height = 210 - margin.top - margin.bottom;

    var svg = d3.select('#bar_chart').append('svg');
    svg.attr('width', '100%')
        .attr('height', height + margin.top + margin.bottom);

    var g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    // Axes
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    x.domain(dataset.map(function (d) {
        return d.periode;
    }));

    y.domain([0, d3.max(dataset, function (d) {
        return d.buts;
    })]);

    g.append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .attr('class', 'x_axis')
        .call(d3.axisBottom(x));

    g.append('g')
        .attr('class', 'y_axis')
        .call(d3.axisLeft(y));

    // Label axe Y
    g.append('text')
        .style('font-size', '14px')
        .style('fill', '#FFFFFF')
        .attr('text-anchor', 'middle')
        .attr('class', 'y_axis_label')
        .attr('transform', 'translate(' + (margin.left - 70) + ', ' + (height / 2) + ')rotate(-90)')
        .text('Nombre de buts pris');

    // Label axe X
    g.append('text')
        .style('font-size', '14px')
        .style('fill', '#FFFFFF')
        .attr('text-anchor', 'middle')
        .attr('class', 'x_axis_label')
        .attr('transform', 'translate(' + (width / 2) + ', ' + (height - (margin.bottom - 70)) + ')')
        .text('Saison');

    // Label titre
    g.append('text')
        .style('font-size', '15px')
        .style('font-weight', 'bold')
        .style('fill', '#FFFFFF')
        .attr('text-anchor', 'middle')
        .attr('class', 'title_label')
        .attr('x', (width / 2))
        .attr('y', 0)
        .text('Nombre de buts pris par le FCN');

    // Génération des barres de l'histogramme
    g.selectAll('.bar')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function (d) {
            return x(d.periode);
        })
        .attr('y', function (d) {
            return y(d.buts);
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
            return height - y(d.buts);
        })
        .attr('fill', '#FFFFFF')
        .on("mouseover", function () { tooltip.style("display", null); })
        .on("mouseout", function () { tooltip.style("display", "none"); })
        .on("mousemove", function (d) {
            var xPosition = d3.mouse(this)[0] - 5;
            var yPosition = d3.mouse(this)[1] - 5;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d.buts + ' buts');
        });

    // Tooltip pour les barres de l'histogramme
    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip.append("rect")
        .attr("width", 60)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);

    tooltip.append("text")
        .attr("x", 30)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");

    // Bar-chart responsive
    function resize() {
        width = parseInt(d3.select("#bar_chart").style("width"), 10) - margin.left - margin.right;
        height = parseInt(d3.select("#bar_chart").style("height"), 10) - margin.top - margin.bottom;
        x.range([0, width]);
        g.selectAll('.x_axis').call(d3.axisBottom(x));

        g.selectAll('.x_axis_label').attr('transform', 'translate(' + (width / 2) + ', ' + (height - (margin.bottom - 70)) + ')')
        g.selectAll('.title_label')
            .attr("x", (width / 2))
            .attr("y", 0)

        g.selectAll('.bar')
            .attr('x', function (d) {
                return x(d.periode);
            })
            .attr('width', x.bandwidth());
    }

    window.addEventListener('resize', resize);
};

console.log('zazeze')