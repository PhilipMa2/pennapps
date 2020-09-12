let map, heatmap, infoWindow;
function initMap() {
  // var uluru = {lat: -25.344, lng: 131.036};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: new google.maps.LatLng(-34.397,150.644),
    mapTypeId: 'terrain'
  });
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
  var heatmapData = [];
  fetch('https://www.trackcorona.live/api/cities')
    .then((response) => {
      response.json().then(function(content) {
        for (var i = 0; i < content.data.length; i++) {
          var latLng = new google.maps.LatLng(content.data[i].latitude,
                                              content.data[i].longitude);
          var weightedLoc = {
            location: latLng,
            weight: content.data[i].confirmed 
          };
          heatmapData.push(weightedLoc);
          // var marker = new google.maps.Marker({
          //   position: latLng,
          //   map: map
          // });
        }
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          dissipating: true,
          radius: 40,
          map: map
        });
      });
    });


  // var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // var markers = locations.map(function(location, i) {
  //   return new google.maps.Marker({
  //     position: location,
  //     label: labels[i % labels.length]
  //   });
  // });
  // var marker = new google.maps.Marker({position: uluru, map: map});

  // var markerCluster = new MarkerClusterer(map, markers,
  //   {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// function getCircle(confirmed) {
//   return {
//     path: google.maps.SymbolPath.CIRCLE,
//     fillColor: 'red',
//     fillOpacity: .2,
//     scale: confirmed,
//     strokeColor: 'white',
//     strokeWeight: .5
//   };
// }
// var locations = [
//   {lat: -31.563910, lng: 147.154312},
//   {lat: -33.718234, lng: 150.363181},
//   {lat: -33.727111, lng: 150.371124},
//   {lat: -33.848588, lng: 151.209834},
//   {lat: -33.851702, lng: 151.216968},
//   {lat: -34.671264, lng: 150.863657},
//   {lat: -35.304724, lng: 148.662905},
//   {lat: -36.817685, lng: 175.699196},
//   {lat: -36.828611, lng: 175.790222},
//   {lat: -37.750000, lng: 145.116667},
//   {lat: -37.759859, lng: 145.128708},
//   {lat: -37.765015, lng: 145.133858},
//   {lat: -37.770104, lng: 145.143299},
//   {lat: -37.773700, lng: 145.145187},
//   {lat: -37.774785, lng: 145.137978},
//   {lat: -37.819616, lng: 144.968119},
//   {lat: -38.330766, lng: 144.695692},
//   {lat: -39.927193, lng: 175.053218},
//   {lat: -41.330162, lng: 174.865694},
//   {lat: -42.734358, lng: 147.439506},
//   {lat: -42.734358, lng: 147.501315},
//   {lat: -42.735258, lng: 147.438000},
//   {lat: -43.999792, lng: 170.463352}
// ]
