function ShowTimeGraph(dataset,　Line){
    var TimeTable = dataset;
    var TimeTableSize = TimeTable.length;
    console.log(TimeTableSize);
    
var max_num = 0;
for (let i=0; i < 24; i+=1){
    var tmp = TimeTable[i]
    if(tmp.number > max_num){
        max_num = tmp.number;
    }
}   
console.log(max_num);
    var TimeGraphScale = d3.scaleLinear()
                            .domain([0,max_num])
                            .range([0,200]);
                            console.log(TimeGraphScale(20))
    var svg = d3.select("body").append("svg")
    .attr("width", 2000)
    .attr("height", 400)
    .attr("id","TimeGraph");

    //console.log(dataset);
    
    
    //var MaxTimeData= d3.max(TimeTable, function(d){return d.number});
    //console.log(MaxTimeData);
    var bar = svg.selectAll("rect")
    .data(TimeTable)
    .enter()
    .append("rect");
    
    //console.log(dataset);
    
   
    bar.attr("x", function(d, i) { return i * 40 + 20; })
    .attr("width", 20)
    .attr("y", function(d,i) { return 300 - Math.floor(TimeGraphScale(d.number)); })
    .attr("height", function(d,i) { return Math.floor(TimeGraphScale(d.number));})
    .attr("fill","green");
    
    var text = svg.selectAll("text")
    .data(TimeTable)
    .enter()
    .append("text");

    var tt_text = text.text(function(d,i) { return d.Hour;})
    .attr("x", function(d, i) { return (i*40) + 25;})
    .attr("y", 320);

var text2 = svg.selectAll("text2").data(TimeTable).enter().append("text");
tt_num=text2.text(function(d,i){return d.number;})
.attr("x", function(d, i) { return (i*40) + 25;})
.attr("y",function(d,i) { return 295 - TimeGraphScale(d.number); })
    
var text3 = svg.selectAll("text3").data(TimeTable).enter().append("text");
var GraphTitle = text3
    .attr("x",500)
    .attr("y", 50)
    .text(function(d,i){return "時間帯別 "+Line+"駅"});
}

async function culc_max(TimeTable){
    
    
}