//import {SelectLine} from './SelectLine.js';
async function SelectStation(data){
    var svg = d3.select("body").append("svg")
    .attr("width",2000)
    .attr("height",1000);

    var button = svg.selectAll("rect")
    .data(data).enter()
    .append("rect");

    button.attr("x",10)
        .attr("y",function(d,i){return (30*i)})
        .attr("width",100)
        .attr("height",30)
        .attr("stroke","white")
        .attr("fill", "skyblue")
        .on("click",function(mouse,d){
            d3.select("svg").remove();
            var code = d.Station.code;
            var dataPath = "./kanagawa/s"+code+".json";
            d3.json(dataPath).then(function(data){
                SelectLine(data);
            });
        });

        var text = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text");

        var stationName = text.text(function(d,i){return d.Station.Name;})
        .attr("font-size",11)
        .attr("x",40)
        .attr("y",function(d,i){return (30*i)+23});

}