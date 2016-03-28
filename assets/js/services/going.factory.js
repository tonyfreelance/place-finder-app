'use strict';

angular
    .module('PlaceFinderApp')
    .factory('goingService', goingService);

goingService.$inject = ['$http'];

function goingService($http) {
    var service = {
        getMyGoing: getMyGoing,
        countGoing: countGoing,
    };
    
    return service;
    
    ///////////////////////////////
    
    function getMyGoing(fourSquareId, userId) {
        return $http.get('/my-going', {
            params: {
                fourSquareId: fourSquareId,
                userId: userId
            }
        });
    }
    
    function countGoing(fourSquareId) {
        return $http.get('/count-going', {
            params: {
                fourSquareId: fourSquareId
            }
        });
    }
}