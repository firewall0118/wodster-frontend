angular.module('starter')
.directive('map', ['Position', 'BaseData', function(Position, BaseData) {
    return {
        restrict: 'E',
        scope: {
            onCreate: '&'
        },
        link: function ($scope, $element, $attr) {
            function initialize() {
                var lat = Position.getPosition().lat,
                    lng = Position.getPosition().lang,
                    latlng = new google.maps.LatLng(lat, lng);
                var mapOptions = {
                        center: new google.maps.LatLng(lat, lng),  // Start with closetbox ones, should be changed to user's adderess, we should think.
                        zoom: 14,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    },
                    image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';

                var map = new google.maps.Map($element[0], mapOptions);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: image
                });

                getLocationName(latlng);


                $scope.onCreate({map: map, marker: marker});

                // Stop the side bar from dragging when mousedown/tapdown on the map
                google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
                    e.preventDefault();
                    return false;
                });

                // Shall We use center_changed or dragend event?
                google.maps.event.addDomListener(map, 'center_changed', function (e) {
                    var position = map.getCenter();
                    Position.setPosition(position.lat(), position.lng());
                    getLocationName(position);
                });

            }

            function getLocationName(position) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'latLng': position}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {

                            BaseData.address = results[0].formatted_address;

                            for (var i = 0; i < results[0].address_components.length; i++) {
                                var types = results[0].address_components[i].types;

                                for (var typeIdx = 0; typeIdx < types.length; typeIdx++) {
                                    if (types[typeIdx] == 'postal_code') {
                                        //console.log(results[0].address_components[i].long_name);
                                        BaseData.zipCode = results[0].address_components[i].short_name;
                                    }
                                }
                            }
                            $scope.$emit("center_changed");
                        }
                    }
                });

            }

            if (document.readyState === "complete") {
                initialize();
            } else {
                google.maps.event.addDomListener(window, 'load', initialize);
            }
        }
    }
}]);