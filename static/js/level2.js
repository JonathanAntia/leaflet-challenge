// code for creating Advanced Map (Level 2)

// adding dark tile layer
const dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})

// adding light tile layer
const light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})

// adding satellite tile layer
const satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})

const baseMaps = {
    "Dark": dark,
    "Light": light,
    "Satellite": satellite
};

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

// link to geojson fault data
const faultData = 'static/data/qfaults_latest_quaternary.geojson';

// retrieve the fault data and add each to the map
d3.json(faultData).then(function(data){
    const faults = L.geoJson(data, {
        style: function(feature){
            return{
                color: 'green',
                weight: strokeWeight(feature.properties.slip_rate)
            }
        }
    })
            
    // create a map object
    const myMap = L.map('map', {
        center: [50,-122.42],
        zoom:4,
        layers: [dark, faults]
    });

    // link to USGS earthquake data
    const earthquakeDataURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson';

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
                }).bindPopup(`<div class='info'>${date}<hr>Location: ${earthquake.properties.place}<hr>Depth: ${earthquake.geometry.coordinates[2]} km<hr> Magnitude: ${earthquake.properties.mag}<hr> Significance: ${earthquake.properties.sig}</div>`)
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

        const overlays = {
            'Faults': faults,
        };
        
        L.control.layers(baseMaps, overlays).addTo(myMap);
        legend.addTo(myMap);
    });
});



// change the stroke weight depending on slip_rate of each fault
function strokeWeight (slip_rate){
    switch(slip_rate){
        case "Greater than 5.0 mm/yr":
            return 1.5;
        case "Between 1.0 and 5.0 mm/yr":
            return 1;
        default:
            return 0;
    }
};