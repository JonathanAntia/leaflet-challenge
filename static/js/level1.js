// code for creating Basic Map (Level 1)

// create a map object
const myMap = L.map('map', {
    center: [37.77,-122.42],
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

// link to USGS earthquake data
const earthquakeDataURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson';

// change the color depending on the significance of each earthquake
function chooseColor(sig){
    if (sig >= 1000){
        return '#8A0000'
    }
    else if (sig > 750){
        return '#C23B22'
    }
    else if (sig > 500){
        return '#FB6D4C'
    }
    else if (sig > 250){
        return '#FF9E79'
    }
    else{
        return '#FFD1A9'
    }
};

// convert timestamp to date
function convertDate(time){
    const date = new Date(time).toLocaleDateString('en-US');
    return date;
};

// retrieve the earthquake data and add each to the map
d3.json(earthquakeDataURL).then(function(data){
    console.log(data);
    let earthquakes = data.features;
    earthquakes.forEach(earthquake=>{
        const date = convertDate(earthquake.properties.time);
        if (earthquake.geometry.coordinates){
            L.circle([earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]],{
                color: 'blank',
                fillColor: chooseColor(earthquake.properties.sig),
                fillOpacity: 0.75,
                radius: earthquake.properties.mag*10000
            }).bindPopup(`<div class='info'>${date}<br>Depth: ${earthquake.geometry.coordinates[2]} km</div>`)
            .addTo(myMap);   
        }
    })
    // create a legend
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>EQ Significance</h4>";
    div.innerHTML += '<i style="background: #FFD1A9"></i><span>0-250</span><br>';
    div.innerHTML += '<i style="background: #FF9E79"></i><span>250-500</span><br>';
    div.innerHTML += '<i style="background: #FB6D4C"></i><span>500-750</span><br>';
    div.innerHTML += '<i style="background: #C23B22"></i><span>750-1000</span><br>';
    div.innerHTML += '<i style="background: #8A0000"></i><span>1000+</span><br>';
    return div;
    };

legend.addTo(myMap);
});