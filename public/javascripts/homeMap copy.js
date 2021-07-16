

//create map with access token from mapbox

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obmd1ZGUiLCJhIjoiY2tmYzFhMzltMTd6djJ6bzhxd3Ridjk5dCJ9.KQBprGzVqYvmE0XNhRGpuA';

//pop up temp name and coords
//var monument = [-77.0353, 38.8895];

    var map = new mapboxgl.Map({
        container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11',
            center:  [120, -21], // starting position-27.4169856, 153.0789888
            zoom: 1.8 ,// starting zoom
            pitch: 60
    });


// create the popup
var popup = new mapboxgl.Popup({ offset: 25 }).setText(
'Construction on the Washington Monument began in 1848.'
);

// create DOM element for the marker
//var el = document.createElement('div');
//el.id = 'marker';

// create the marker
//new mapboxgl.Marker(el)
//.setLngLat(monument)
//.setPopup(popup) // sets a popup on this marker
//.addTo(map);

var marker = new mapboxgl.Marker()
.setLngLat([153.0789888, -27.4169856])
.addTo(map);




//add search box to map
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
})
);


// Add geolocate control to the map.
map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
})
);
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// The 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', function () {
// Insert the layer beneath any symbol layer.
var layers = map.getStyle().layers;

var labelLayerId;
for (var i = 0; i < layers.length; i++) {
if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
labelLayerId = layers[i].id;
break;
}
}

map.addLayer(
{
'id': '3d-buildings',
'source': 'composite',
'source-layer': 'building',
'filter': ['==', 'extrude', 'true'],
'type': 'fill-extrusion',
'minzoom': 15,
'paint': {
'fill-extrusion-color': '#aaa',

// use an 'interpolate' expression to add a smooth transition effect to the
// buildings as the user zooms in
'fill-extrusion-height': [
'interpolate',
['linear'],
['zoom'],
15,
0,
15.05,
['get', 'height']
],
'fill-extrusion-base': [
'interpolate',
['linear'],
['zoom'],
15,
0,
15.05,
['get', 'min_height']
],
'fill-extrusion-opacity': 0.6
}
},
labelLayerId
);

/*
map.loadImage(
'./images/RCSA.png',
function (error, image) {
if (error) throw error;
map.addImage('RCSA', image);
map.addSource('point', {
'type': 'geojson',
'data': {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'geometry': {
'type': 'Point',
'coordinates': [120.5560793,23.9983085],
}
}
]
}
});
map.addLayer({
'id': 'points',
'type': 'symbol',
'source': 'point',
'layout': {
'icon-image': 'RCSA',
'icon-size': 0.20
}
});
}
);
*/


});

var size = 200;

// implementation of CustomLayerInterface to draw a pulsing dot icon on the map
// see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
var pulsingDot = {
width: size,
height: size,
data: new Uint8Array(size * size * 4),

// get rendering context for the map canvas when layer is added to the map
onAdd: function () {
var canvas = document.createElement('canvas');
canvas.width = this.width;
canvas.height = this.height;
this.context = canvas.getContext('2d');
},

// called once before every frame where the icon will be used
render: function () {
var duration = 1000;
var t = (performance.now() % duration) / duration;

var radius = (size / 2) * 0.3;
var outerRadius = (size / 2) * 0.7 * t + radius;
var context = this.context;

// draw outer circle
context.clearRect(0, 0, this.width, this.height);
context.beginPath();
context.arc(
this.width / 2,
this.height / 2,
outerRadius,
0,
Math.PI * 2
);
context.fillStyle = 'rgba(51, 100, 200,' + (1 - t) + ')';
context.fill();

// draw inner circle
context.beginPath();
context.arc(
this.width / 2,
this.height / 2,
radius,
0,
Math.PI * 2
);
context.fillStyle = 'rgba(51, 153, 51, 1)';
context.strokeStyle = 'white';
context.lineWidth = 2 + 4 * (1 - t);
context.fill();
context.stroke();

// update this image's data with data from the canvas
this.data = context.getImageData(
0,
0,
this.width,
this.height
).data;

// continuously repaint the map, resulting in the smooth animation of the dot
map.triggerRepaint();

// return `true` to let the map know that the image was updated
return true;
}
};

map.on('load', function () {
map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

map.addSource('points', {
          'type': 'geojson',
          'data': {
              'type': 'FeatureCollection',
              'features': [
                  {
                      // Dacun Trail SIte - Feature
                      'type': 'Feature',
                      'geometry': {
                          'type': 'Point',
                          'coordinates': [
                              120.5560793,
                             23.9983085
                          ]
                      },
                      'properties': {
                        'description':
                        '<strong>Taiwan Rail Authority -DaCun Trial Site</strong><p><button onclick="connectA()">Connect</button> RCSA - Level Crossings inc. Speed proving.',
                        
                      }
                  },
                  {
                      // Test Data
                      'type': 'Feature',
                      'geometry': {
                          'type': 'Point',
                          'coordinates': [ 153.0251,
                           -27.4698]
                      },
                      'properties': {
                        'description':
                        '<strong>TEST DATA ONLY</strong><p><button>Connect</button> TEST DATA ONLY.</p>',
                        
                      }
                  }
              ]
          }
      });



map.addLayer({
'id': 'points',
'type': 'symbol',
'source': 'points',
'layout': {
'icon-image': 'pulsing-dot'
}

},




);


});
// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'points', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
    });
     

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'points', function () {
    map.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);

    });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', function () {
    map.getCanvas().style.cursor = '';
    });

// Center the map on the coordinates of any clicked symbol from the 'points' layer.
//map.on('click', 'points', function (e) {
//map.flyTo({
//center: e.features[0].geometry.coordinates
//});
//});


map.on('click', 'points', function (e) {
    map.flyTo({
    center: e.features[0].geometry.coordinates,
    zoom: 12,
    bearing: 0,
    });
    document.getElementById("addressID").src="./TRA/Welcome.htm"
    });



   // <%=Global%>


// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
//map.on('mouseenter', 'points', function () {
//map.getCanvas().style.cursor = 'pointer';
//});

// Change it back to a pointer when it leaves.
//map.on('mouseleave', 'points', function () {
//map.getCanvas().style.cursor = '';
//});

function connectA(){
   document.getElementById("addressID").src = "http://10.25.32.227:8080";
     }



    
//pdf adder pdf #toolbar0 means cannot download pdf
//function connectDP(){
   // console.log("hello")
   // document.getElementById("addressID").src="./systemconcept.pdf#toolbar=0" 

   //points to site specific help file
    //document.getElementById("addressID").src="./TRA/Welcome.htm"
    
     // }
