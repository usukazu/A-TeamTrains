function sample(){
data = [
  {date: "2020-02-17 00:00:00", A: 10, B: 0},
  {date: "2020-02-17 01:00:00", A: 20, B: 0},
  {date: "2020-02-17 02:00:00", A: 30, B: 0},
  {date: "2020-02-17 03:00:00", A: 40, B: 0},
  {date: "2020-02-17 04:00:00", A: 50, B: 10},
  {date: "2020-02-17 05:00:00", A: 60, B: 20},
  {date: "2020-02-17 06:00:00", A: 70, B: 40},
  {date: "2020-02-17 07:00:00", A: 80, B: 80},
  {date: "2020-02-17 08:00:00", A: 90, B: 100},
  {date: "2020-02-17 09:00:00", A: 100, B: 100},
  {date: "2020-02-17 10:00:00", A: 100, B: 100},
  {date: "2020-02-17 11:00:00", A: 110, B: 100},
  {date: "2020-02-17 12:00:00", A: 120, B: 100},
  {date: "2020-02-17 13:00:00", A: 130, B: 100},
  {date: "2020-02-17 14:00:00", A: 140, B: 100},
  {date: "2020-02-17 15:00:00", A: 150, B: 100},
  {date: "2020-02-17 16:00:00", A: 160, B: 80},
  {date: "2020-02-17 17:00:00", A: 170, B: 40},
  {date: "2020-02-17 18:00:00", A: 180, B: 20},
  {date: "2020-02-17 19:00:00", A: 190, B: 10},
  {date: "2020-02-17 20:00:00", A: 200, B: 0},
  {date: "2020-02-17 21:00:00", A: 210, B: 0},
  {date: "2020-02-17 22:00:00", A: 220, B: 0},
  {date: "2020-02-17 23:00:00", A: 230, B: 0}
];
series = d3.stack().keys(["A", "B"])(data);
x = d3.scaleBand()
    .domain(data.map(d => d.date)).range([50, 600])
    .padding(0,1)

    y = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).range([400, 0])
    color = d3.scaleOrdinal()
    .domain(series.map(d => d.key))
    .range(d3.schemeCategory10.slice(0, series.length))
    .unknown("#ccc")
    hour = d => d3.timeFormat("%H")(d3.timeParse("%Y-%m-%d %H:%M:%S")(d));
    xAxis = g => g
    .attr("transform", "translate(0, 400)")
    .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(hour))
    .call(g => g.selectAll(".domain").remove())
    yAxis = g => g
    .attr("transform", "translate(50, 0)")
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove())
    chart = {
        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, 450]);
      
        svg.append("g")
          .selectAll("g")
          .data(series)
          .join("g")
            .attr("fill", d => color(d.key))
          .selectAll("rect")
          .data(d => d)
          .join("rect")
            .attr("x", (d, i) => x(d.data.date))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth())
        
        // X軸ラベル追加
        svg.append("g")
           .call(xAxis);
        　
        // Y軸ラベル追加
        svg.append("g")
           .call(yAxis);
        
        return svg.node();
      }
      import {legend} from "@d3/color-legend"
      legend({color, title: "Series"})
}