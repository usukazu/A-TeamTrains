var tooltip = d3.select("body").append("div").attr("class", "tooltip");

function ShowSumGraph(HourTable,data, Station){
    const SumTable = data.Sum;
    const chooseMax = (SumTable) => {
        const SumTableSize = SumTable.length;
        //console.log("size", TimeTableSize);
        let tmp_max = 1;
        for (let i=0; i < SumTableSize; i++){
        
        let tmp = SumTable[i].number
        //console.log(tmp);
            tmp_max = Math.max(tmp_max , tmp);
            //console.log(i, ",", tmp_max);
    
    }
    return tmp_max;
    } 
    const max_num = chooseMax(SumTable);
    const SumGraphScale = d3.scaleLinear()
    .domain([0,max_num])
    .range([0,200]);
    var svg = d3.select("body").append("svg")
    .attr("width", 2000)
    .attr("height", 800)
    .attr("id","SumGraph");
    
    var box = svg.selectAll("box")
    .data(data.Sum)
    .enter()
    .append("rect");
    //console.log(dataset.Sum);
    box.attr("x", function(d, i) { return i * 40 + 20; })
        .attr("width",20)
        .attr("y", function(d,i) { return 300 - SumGraphScale(d.number); })
        .attr("height", function(d,i) { return SumGraphScale(d.number) ;})
        .attr("fill",function(d,i) { return "rgb("+d.LineColor+")";})
        .on("mouseover", function(event,d) {
            tooltip
            .style("visibility", "visible")
            .html(intooltip(d.Kindlist));
        })
        .on("mousemove", function(event,d) {
            tooltip
            .style("top", (event.pageY - 20) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.style("visibility", "hidden");
        });
        
var text1 = svg.selectAll("text1")
    .data(data.Linelist)
    .enter()
    .append("text")
    .attr("text-anchor", "start");

    var sum_text = text1
    .attr("text-anchor", "start")
     .attr("x", function(d, i) { return (i*34.6) + 180;})
     .attr("y", function (d,i){return 270-(i*20);})
    //.attr("transform","translate(320 , 20)")
    .attr("transform", "rotate(30)")

    
    .text(function(d,i) { return d.Line;})
    .on("click",function(mouse,d,i){
        d3.select("#SumGraph").remove();
        d3.select("#TimeGraph").remove();
        var selected = d.HourTable;
        var selectedLine = d.Line;
        //console.log(d.HourTable);
            ShowTimeGraph(selected,selectedLine);
            BackButton(HourTable, data, Station);
   });

    svg.append("text").text("路線方面別 "+ Station + "駅")
    .attr("x",80)
    .attr("y",50);

    var text2 = svg.selectAll("text2").data(SumTable).enter().append("text");
    tt_num = text2.text(function(d,i){return d.number;})
    .attr("x", function(d, i) { return (i*40) + 20;})
    .attr("y",function(d,i) { return 295 - SumGraphScale(d.number); })
}

function BackButton(TimeTable,data, Station){
    var svg = d3.select("body").append("svg")
    .attr("width", 2000)
    .attr("height", 100)
    .attr("id","BackButton");

    var backText = svg.append("text")
                    .text("戻る")
                    .attr("x", 50)
                    .attr("y", 20)
                    .on("click",function(mouse,d){
                        d3.select("#SumGraph").remove();
                        d3.select("#TimeGraph").remove();
                        d3.select("#BackButton").remove();
                        ShowTimeGraph(TimeTable,Station);
                        ShowSumGraph(TimeTable,data, Station);

                    });
           
}

function intooltip(list){
    var mojiretsu="";
    for (var i=0; i<list.length; i++){
        mojiretsu+=list[i].Kindname+":"+list[i].Kindnum+"<br>";
      }
      return mojiretsu;
};