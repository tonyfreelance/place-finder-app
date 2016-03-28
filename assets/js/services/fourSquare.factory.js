'use strict';

angular
    .module('PlaceFinderApp')
    .factory('fourSquare', fourSquare);

fourSquare.$inject = ['$http'];

function fourSquare($http) {
    var service = {
        getPlaces: getPlaces
    };
    return service;

    //////////////////////////

    function getPlaces(location) {
        return $http.get('https://api.foursquare.com/v2/venues/explore?near=' + location + '&client_id=K2UQS3G0TNEQBDLCSICXKGI0NBWZA0RMI1VWGKRRXBCVQBQ5&client_secret=UKSDSAXEGRPTGX4BXFBZ34KBMXHTXSKZXDRNQC1TDLGNFRIC&v=20160322&section=Nightlife&limit=20&venuePhotos=1');
    }
}