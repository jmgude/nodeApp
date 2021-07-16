

//create map with access token from mapbox

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obmd1ZGUiLCJhIjoiY2tmYzFhMzltMTd6djJ6bzhxd3Ridjk5dCJ9.KQBprGzVqYvmE0XNhRGpuA';

    var map = new mapboxgl.Map({
        container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11',
            center:  [120, -21], // starting position-27.4169856, 153.0789888
            zoom: 1.8 ,// starting zoom
            pitch: 60,
            antialias: true
    });
    
    //add full screen mode
map.addControl(new mapboxgl.FullscreenControl());


   




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


//3d building layer
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
  'fill-extrusion-height': ['interpolate',['linear'],
  ['zoom'],
  15,0,15.05,
  ['get', 'height']],'fill-extrusion-base': ['interpolate',['linear'],
  ['zoom'],
  15,
  0,
  15.05,
  ['get', 'min_height']],'fill-extrusion-opacity': 0.6}},
  labelLayerId
  );
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
  radius,0,
  Math.PI * 2
  );

  context.fillStyle = 'rgba(51, 153, 51, 1)';
  context.strokeStyle = 'white';
  context.lineWidth = 2 + 4 * (1 - t);
  context.fill();
  context.stroke();

// update this image's data with data from the canvas
  this.data = context.getImageData(0,0,
  this.width,this.height).data;

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
                        `<dl>
                        <dt>Asset Owner</dt>
                        <dd>- Taiwan Rail Administration https://www.railway.gov.tw/tra-tip-web/tip</dd>
                        <dt>Site Information</dt>
                        <dd>- Dacun LX, Lat.120.5560793, Long.23.9983085</dd>
                        <dd>- Hima HIMatrix F/35,(Frauscher FaDC,RSR180, BSI004) + Speed Proving </dd>
                        <dd>- <Strong>Status:</strong>Trial Site <button onclick="connectA()">Connect</button>.
                        </dd>
                      </dl>`,
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
                        `<dl>
                        <dt>Asset Owner</dt>
                        <dd>- TEST https://RCSA</dd>
                        <dt>Site Information</dt>
                        <dd>- TEST LX, Lat.111, Long.11</dd>
                        <dd>- xx </dd>
                        <dd>- <Strong>Status:</strong>Test <button onclick="connectB()">Connect</button>.
                        </dd>
                      </dl>`
                        ,
                        
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







// create the popup
//var popup = new mapboxgl.Popup({ offset: 25 }).setText(
    //'Construction on the Washington Monument began in 1848.'
    //);
    
    //create DOM element for the marker
   // var el = document.createElement('div');
   // el.id = 'marker';
    
    // create the marker
    //new mapboxgl.Marker(el)
    //.setLngLat(monument)
    //.setPopup(popup) // sets a popup on this marker
    //.addTo(map);
    
   // var marker = new mapboxgl.Marker()
   // .setLngLat([153.0789888, -27.4169856])
   // .addTo(map);


// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true
    });

    map.on('mouseenter', 'points', function (e) {
        // Change the cursor style as a UI indicator.
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
         
        map.on('mouseleave', 'points', function () {
        map.getCanvas().style.cursor = '';
       // popup.remove();
        });




    // Change the cursor to a pointer when the mouse is over the places layer.
    //map.on('mouseenter', 'points', function () {
    //map.getCanvas().style.cursor = 'pointer';

 
   // });
     
    // Change it back to a pointer when it leaves.
   // map.on('mouseleave', 'points', function () {
   // map.getCanvas().style.cursor = '';
   // });




map.on('click', 'points', function (e) {
    map.flyTo({
    center: e.features[0].geometry.coordinates,
    zoom: 12,
    bearing: 0,
    });
    document.getElementById("addressID").src="./TRA/Welcome.htm"
    });


    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');
     
    function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
    map.addSource()
    }
     
    for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
    }

function connectA(){
   document.getElementById("addressID").src = "http://10.25.32.227:8080";
     }

