function ShowSumGraph(data, Station){
    // var SumTable = data.Sum;
    // var SumTableSize = SumTable.length;
    // //console.log(TimeTableSize);
    // for (let i=0; i < SumTableSize; i+=1){
    //     var tmp = 
    //     if(SumTable[i].number > max_num){
            
    //         max_num = SumTable[i].number;
    //     }
    // }
    var svg = d3.select("body").append("svg")
    .attr("width", 2000)
    .attr("height", 400)
    .attr("id","SumGraph");
    console.log(data);
    var box = svg.selectAll("rect")
    .data(data.Sum)
    .enter()
    .append("rect");
    //console.log(dataset.Sum);
    box.attr("x", function(d, i) { return i * 40 + 20; })
        .attr("width",20)
        .attr("y", function(d,i) { return 200 - d.number; })
        .attr("height", function(d,i) { return d.number ;})
        .attr("fill","blue");
        
    
var text1 = svg.selectAll("text1")
    .data(data.Linelist)
    .enter()
    .append("text")
    .attr("text-anchor", "start");

    var sum_text = text1
    .attr("text-anchor", "start")
    .attr("x", function(d, i) { return (i*34.6) + 130;})
    .attr("y", function (d,i){return 180-(i*20);})
    .attr("transform", "rotate(30)")
    .text(function(d,i) { return d.Line;})
    .on("click",function(mouse,d,i){
        d3.select("#SumGraph").remove();
        d3.select("#TimeGraph").remove();
        var selected = d.HourTable;
        var selectedLine = d.Line;
   console.log(d.HourTable);
            ShowTimeGraph(selected,selectedLine);
            BackButton(selected, data, selectedLine);
   });

    svg.append("text").text("路線方面別 "+ Station)
    .attr("x",80)
    .attr("y",50);
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
                        ShowTimeGraph(TimeTable,Station);
                        ShowSumGraph(data);

                    });
           
}