'use strict';

angular
    .module('PlaceFinderApp')
    .controller('MainController', MainController);

MainController.$inject = ['fourSquare', 'logger', '$auth', '$location', 'goingService', '$cookies'];

function MainController(fourSquare, logger, $auth, $location, goingService, $cookies) {
    var vm = this;
    vm.attenders = 0;
    vm.getPlaces = getPlaces;
    vm.going = going;
    vm.places = [];
    vm.placeInput = '';

    /////////////////////////////////////////////////////////////////////////////////////////

    function authenticate(provider) {
        $auth.authenticate(provider)
            .then(function(response) {
                logger.success('You have been logged in successfully');
                // Store the Twitter User Id to $cookies
                $cookies.put('userId', response.data.twitterId);
                // Redirect to the homepage
                $location.path('/');

            })
            .catch(function(error) {
                if (error.error) {
                    // Popup error - invalid redirect_uri, pressed cancel button, etc.
                    logger.error(error.error);
                }
                else if (error.data) {
                    // HTTP response error from server
                    logger.error(error.data.message, error.status);
                }
                else {
                    logger.error(error);
                }
            });
    }

    function going(place) {
        // If not logged in, then log in via Twitter
        if (!$auth.isAuthenticated()) {
            authenticate('twitter');
        }
        // If logged in already, then increase/decrease by 1
        else {
            return goingService.getMyGoing(place.fourSquareId, $cookies.get('userId'))
                .then(function(result) {
                    vm.attenders = result.data.attenderNo;
                    for (var i = 0; i < vm.places.length; i++) {
                        if (vm.places[i].fourSquareId === place.fourSquareId) {
                            vm.places[i].attenders = vm.attenders;
                        }
                    }
                    return vm.places;
                })
                .catch(function(err) {
                    logger.error(err);
                });
        }
    }

    function getPlaces() {
        return fourSquare.getPlaces(vm.placeInput)
            .then(function(results) {
                var placeArray = results.data.response.groups[0].items;
                vm.places = placeArray.map(function(obj) {
                    // Run the function to get the number of attenders
                    getAttenders(obj.venue.id);
                    return {
                        fourSquareId: obj.venue.id,
                        image: obj.venue.featuredPhotos.items[0].prefix + 'width100' + obj.venue.featuredPhotos.items[0].suffix,
                        url: obj.venue.url,
                        name: obj.venue.name,
                        tip: obj.tips[0].text,
                        attenders: vm.attenders,
                    };
                });
                return vm.places;
            })
            .catch(function(err) {
                if (err) {
                    logger.error('Couldn\'t find any spot at your location!');
                }
            });
    }

    // Get the users who attend the place
    function getAttenders(fourSquareId) {
        return goingService.countGoing(fourSquareId)
            .then(function(response) {
                // vm.attenders = 5;
                var attenderNo = response.data.attenderNo;
                return attenderNo;
            })
            .catch(function(err) {
                logger.error(err);
            });
    }
}