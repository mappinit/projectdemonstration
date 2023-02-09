//Initialize map
var map = L.map('map').setView([6.970, 3.219],8);

//Add routing
L.Routing.control({
    waypoints: [
        L.latLng(6.747, 3.381),
        L.latLng(6.820, 3.235)
    ],
    routeWhileDragging: true
}).addTo(map);

//Add Osm Tile
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.Control.geocoder().addTo(map);
        if (!navigator.geolocation) {
            console.log("Your browser doesn't support geolocation feature!")
        } else {
            setInterval(() => {
                navigator.geolocation.watchPosition(watchPosition)
            }, 5000);
        };
        var marker, circle, lat, long, accuracy;

        function watchPosition(position) {
            // console.log(position)
            lat = position.coords.latitude
            long = position.coords.longitude
            accuracy = position.coords.accuracy

            if (marker) {
                map.removeLayer(marker)
            }

            if (circle) {
                map.removeLayer(circle)
            }

            marker = L.marker([lat, long])
            circle = L.circle([lat, long], { radius: accuracy })

            var featureGroup = L.featureGroup([marker, circle]).addTo(map)

            map.fitBounds(featureGroup.getBounds())

            console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)

           
        }
    


//add street
var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//add hybrid
var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
//add terrain
var googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//add google satelite
var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});




//styles

//ogunStatestyle
var ogunStatestyle = {

color : 'red',
opacity: 0.1,
weight: 1,
}



//health facility style

var hospitalsStyle = {

    radius:5,
    fillColor:'green',
    color : 'red',
    weight : 1.5
}

//primaryhealthcentres style
var primaryHealthcentresStyle = {

    radius:5,
    fillColor:'blue',
    color : 'black',
    weight : 1.5
}

//primaryschools style
var primarySchoolsstyle = {

    radius:5,
    fillColor:'yellow',
    color : 'black',
    weight : 1.5
}



//secondaryschools style
var secondarySchoolsstyle = {

    radius:5,
    fillColor:'black',
    color : 'black',
    weight : 1.5
}

//markets style
var marketsStyle = {

    radius:5,
    fillColor:'brown',
    color : 'green',
    weight : 1.5
}



//Add Geojson layers

//Add Ogunstate

var ogunstate = L.geoJson(ogunstate, {
    style:ogunStatestyle,
    onEachFeature: function (feature, layer) {

//add area
        area = (turf.area(feature)/1000000).toFixed(3)
        // add center
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

  

        label = `Name: ${feature.properties.ADM2_NAME}<br>`
        label+= `Area: ${area}<br>`
        label+= `Center: ${center_lng}, ${center_lat} <br>`

        layer.bindPopup(label)
    }



})
.addTo(map)






//Add hospitals
var hospitals = L.geoJson(hospitals, {
	style:hospitalsStyle,
    pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, hospitals);
},

onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Name)
    }
})
.addTo(map)



//Add primaryhealthcentres
var primaryhealthcentres = L.geoJson(primaryhealthcentres, {
	style: primaryHealthcentresStyle,

    pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, primaryhealthcentres);
},

onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Name)
    }
})
.addTo(map)



//Add primaryschools
var primaryschools = L.geoJson(primaryschools, {
	style: primarySchoolsstyle,

    pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, primaryschools);
},

onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Name)
    }
})
.addTo(map)


//Add secondaryschools
var secondaryschools = L.geoJson(secondaryschools, {
	style: secondarySchoolsstyle,

    pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, secondaryschools);
},

onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Name)
    }
})
.addTo(map)


//Add markets
var markets = L.geoJson(markets, {
	style: marketsStyle,
    pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, markets);
},

onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Name)
    }
})
.addTo(map)









// Basemaps
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Streets Map": googleStreets,
    "Google Hybrid Map": googleHybrid,
    "Google Terrain Map": googleTerrain,
    "Google Satellite Map": googleSat,
};


//layers
var overlays = {
   "Hospital": hospitals,
    "Markets": markets,
    "Primary Health Centres": primaryhealthcentres,
    "Primary Schools": primaryschools,
    "Secondary Schools": secondaryschools,




};

//Add layer control: For navigation
L.control.layers(baseLayers, overlays).addTo(map);



// add leaflet browser print control to map

L.control.browserPrint({position: 'topleft'}).addTo(map);
//add scale bar
L.control.scale().addTo(map)



//Add mousemove Coordinate Tool
map.on('mousemove',function(e) {
	
	$('#coordinate').html(`Lat:${e.latlng.lat.toFixed(3)}, lng:${e.latlng.lng.toFixed(3)}`)
})