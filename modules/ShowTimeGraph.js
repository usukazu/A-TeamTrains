var tooltip = d3.select("body").append("div").attr("class", "tooltip");

function ShowTimeGraph(dataset,　Line){
    const TimeTable = dataset;
    
    //console.log(TimeTableSize);
    
const chooseMax = (TimeTable) => {
    const TimeTableSize = TimeTable.length;
    //console.log("size", TimeTableSize);
    let tmp_max = 1;
    for (let i=0; i < TimeTableSize; i++){
    
    let tmp = TimeTable[i].number
    //console.log(tmp);
        tmp_max = Math.max(tmp_max , tmp);
        //console.log(i, ",", tmp_max);

}
return tmp_max;
} 
const max_num = chooseMax(TimeTable) ;

    const TimeGraphScale = d3.scaleLinear()
                            .domain([0,max_num])
                            .range([0,200]);

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
    .attr("fill","green")
    .on("mouseover", function(event,d) {
        if(d.Kindlist){
        tooltip
        .style("visibility", "visible")
        .html(intooltip(d.Kindlist));
        }
    })
    .on("mousemove", function(event,d) {
        if(d.Kindlist){
        tooltip
        .style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 10) + "px");
        }
    })
    .on("mouseout", function(d) {
        tooltip.style("visibility", "hidden");
    });
    
    var text = svg.selectAll("text")
    .data(TimeTable)
    .enter()
    .append("text");

    var tt_text = text.text(function(d,i) { return d.Hour;})
    .attr("x", function(d, i) { return (i*40) + 25;})
    .attr("y", 320);

var text2 = svg.selectAll("text2").data(TimeTable).enter().append("text");
tt_num = text2.text(function(d,i){return d.number;})
.attr("x", function(d, i) { return (i*40) + 25;})
.attr("y",function(d,i) { return 295 - TimeGraphScale(d.number); })
    
var text3 = svg.append("text");
var GraphTitle = text3
    .attr("x",80)
    .attr("y", 50)
    .text(check(TimeTable,Line));
}

function intooltip(list){
    var mojiretsu="";
    for (var i=0; i<list.length; i++){
        mojiretsu+=list[i].Kindname+":"+list[i].Kindnum+"<br>";
    }
    return mojiretsu;
};

function check(Table,Line){
    if("Kindlist" in Table[0])return "時間帯別 "+Line;
    else return "時間帯別 "+Line+"駅";
}