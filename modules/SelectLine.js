function SelectLine(data){
    var svg = d3.select("body").append("svg")
    .attr("width",2000)
    .attr("height",1000);



var button = svg.selectAll("rect").data(data.Linelist).enter().append("rect");
button.attr("x",10)
.attr("y",function(d,i){return (30*i)})
.attr("width",100)
.attr("height",30)
.attr("stroke","white")
.attr("fill", "orange")
//.attr("index",function (d,i){return i})

 .on("click",function(mouse,d,i){
     d3.select("svg").remove();
     var selected = d.HourTable;
     var selectedLine = d.Line;
console.log(d.HourTable);
         ShowTimeGraph(selected,selectedLine);
});



var text = svg.selectAll("text")
.data(data.Linelist)
.enter()
.append("text");

var stationName = text.text(function(d,i){return d.Line;})
.attr("font-size",11)
.attr("x",40)
.attr("y",function(d,i){return (30*i)+23});

//合計ブラフ表示ボタン
var sumButton = svg.selectAll("box")
    .data(data.Sum)
    .enter()
    .append("rect")

var datalength = data.Linelist.length;
sumButton.attr("x",10)
.attr("y",function(d){return (30*datalength)})
.attr("width",100)
.attr("height",30)
.attr("stroke","white")
.attr("fill", "pink")
.on("click",function(mouse,d){
    d3.select("svg").remove();
    //console.log(d);
    var sumData = data.Sum;
    var Station = data.Station;
    console.log(d);
    ShowSumGraph(sumData,Station);
});

svg.append("text")
.text("路線・方面別合計")
.attr("font-size",11)
.attr("x",40)
.attr("y",function(d){return (30*datalength)+23});
}