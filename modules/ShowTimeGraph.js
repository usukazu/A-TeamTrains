function ShowTimeGraph(dataset,　Line){
    var svg = d3.select("body").append("svg")
    .attr("width", 2000)
    .attr("height", 300)
    .attr("x",0)
    .attr("y",0);

    //console.log(dataset);
    var TimeTable = dataset;
    console.log(TimeTable);
    //var MaxTimeData= d3.max(TimeTable, function(d){return d.number});
    //console.log(MaxTimeData);
    var bar = svg.selectAll("rect")
    .data(TimeTable)
    .enter()
    .append("rect");
    
    //console.log(dataset);
    
   
    bar.attr("x", function(d, i) { return i * 40 + 20; })
    .attr("width", 20)
    .attr("y", function(d,i) {  return 200 - d.number * 5; })
    .attr("height", function(d,i) { return d.number * 5;})
    .attr("fill","green");
    
    var text = svg.selectAll("text")
    .data(TimeTable)
    .enter()
    .append("text");

    var tt_text = text.text(function(d,i) { return d.Hour;})
    .attr("x", function(d, i) { return (i*40) + 25;})
    .attr("y", 220);

var text2 = svg.selectAll("text2").data(TimeTable).enter().append("text");
tt_num=text2.text(function(d,i){return d.number})
.attr("x", function(d, i) { return (i*40) + 25;})
.attr("y",function(d,i) { return 195 - d.number * 5; })
    
svg.data(TimeTable).append("text")
    .attr("x",width/2)
    .attr("y", 16)
    .text(function(d,i){return "時間帯別 "+Line});

    var data = dataset.Sum;
}