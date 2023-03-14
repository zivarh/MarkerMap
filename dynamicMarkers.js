var map; // The map object
var myCentreLat = 53.805;
var myCentreLng = -1.55;
var initialZoom = 14;

let currentInfoWindow = null;
let currentMarker = null;

function infoCallback(infowindow, marker) {
  return function() {
    if (currentMarker && currentMarker !== marker) {
      currentMarker.setAnimation(null);
    }
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    if (currentInfoWindow) {
      currentInfoWindow.close();
    }

    infowindow.open(map, marker);
    currentInfoWindow = infowindow;
    currentMarker = marker;
  };
}
function getRandomColor() {
   
   var letters = '0123456789ABCDEF';
   var color = '';
   for (var i = 0; i < 6; i++) {
     color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}


function addMarker(myPos,myTitle,myInfo) {
   myColor= getRandomColor();
   myLetter=myTitle.substring(0,1);

   var marker = new google.maps.Marker({
      position: myPos, 
      map: map, 
      draggable: true,
      animation: google.maps.Animation.DROP, 
      title: myTitle,
      icon:'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+myLetter+'|'+myColor+'|000000'
   });
   
   var infowindow = new google.maps.InfoWindow({
      content: myInfo
   });
   
   google.maps.event.addListener(marker, 'click', infoCallback(infowindow, marker));
} 



function initialize() {
 
	var latlng = new google.maps.LatLng(myCentreLat,myCentreLng);
	var myOptions = {
		zoom: initialZoom,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
  
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);

   

	for (id in markerData) { 
		var info = "<div class=infowindow><h3>" + 
		markerData[id].name + "</h3><p> " + 
      "<img src='" + markerData[id].pic + "'>" +
		markerData[id].info + "</p></div>"; 
		addMarker(new google.maps.LatLng(markerData[id].lat,markerData[id].lng), markerData[id].name,info); 
	}
}
