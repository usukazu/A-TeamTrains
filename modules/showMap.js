function showMap(){
var map = new L.Map(d3.select('div').node()).setView([35.678707, 139.739143], 12);
var tile = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var svg = d3.select(map.getPanes().overlayPane).append('svg').attr('class', 'leaflet-zoom-hide');
var plotLayer = svg.append('g');

let dataset;
var width = 800;
var height = 800;

var path = "./results3/date20201117.json";
d3.json(path).then(function(data) {
    let stationData = data.Stationlist;
    SelectData(stationData);
    //var dataPath = StationCode;
    //console.log(datapath);
    //showGraph(dataset);
});

var updatePosition = function(d)
{
  d.pos = map.latLngToLayerPoint(new L.LatLng(d.GeoPoint.lati_d, d.GeoPoint.longi_d));
  d3.select(this).attr('cx',d.pos.x).attr('cy',d.pos.y);
}

function SelectData(data){
    var circle = plotLayer
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', 'red')
        .attr('fill-opacity', 0.7)
        .attr('r', 5)
        .each(updatePosition)
        .on("click",function(mouse,d){
        //console.log(d.Station.code);
            var code = d.Station.code;
            var dataPath = "./results2/s"+code+".json";
            console.log(dataPath);
            d3.json(dataPath).then(function(data){
                console.log(data);
                ShowTimeGraph(data.HourTable, data.Station);
                ShowSumGraph(data.Sum, data.Station)
        });
        // console.log(dataPath);
        // return dataPath;
     });
    map.on('move', function(){
        plotLayer.selectAll('circle').each(updatePosition);
    });
    reset();
    
    
//return code;
}

var reset = function()
{
  var bounds = map.getBounds();
  var topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
  var bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

  svg.attr("width", bottomRight.x - topLeft.x)
    .attr("height", bottomRight.y - topLeft.y)
    .style("left", topLeft.x + "px")
    .style("top", topLeft.y + "px");

  plotLayer.attr('transform', 'translate('+ -topLeft.x + ',' + -topLeft.y + ')');
}
map.on("move", reset);
}