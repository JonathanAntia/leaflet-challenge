// code for creating Advanced Map (Level 2)

// create a map object
const myMap = L.map('map', {
    center: [37.77,-122.42]],
    zoom:4
});

// adding tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

// link to geojson fault data
const faultData = 'static/data/qfaults_latest_quaternary.geojson';

// change the stroke weight depending on slip_rate of each fault
function strokeWeight (slip_rate){
    switch(slip_rate){
        case "Greater than 5.0 mm/yr":
            return 1;
        case "Between 1.0 and 5.0 mm/yr":
            return 0.5;
        default:
            return 0;
    }
}

// retrieve the fault data and add each to the map
d3.json(faultData).then(function(data){
    console.log(data);
    L.geoJson(data, {
        style: function(feature){
            return{
                color: 'white',
                weight: strokeWeight(feature.properties.slip_rate)
            }
        }
    }).addTo(myMap);
})