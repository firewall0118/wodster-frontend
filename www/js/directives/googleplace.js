angular.module('starter')
.directive('googleplace', ['Position', function(Position) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                place = scope.gPlace.getPlace();
                Position.setPosition(place.geometry.location.lat(), place.geometry.location.lng());
                // console.log(place.geometry.location.lng()); //longitude
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
                scope.$emit("place_changed");
            });
        }
    };
}])