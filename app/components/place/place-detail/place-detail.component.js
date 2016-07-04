angular.module('placeDetail', [])
    .component('placeDetail', {
        templateUrl: 'components/place/place-detail/place-detail.template.html',
        bindings: {
            place: '<'
        },
        controller: function placeDetailCtrl($route, mapFactory) {
            // If no promise - this place is {} - use $.isEmptyObject(this.place);
            // If promise - this place is 'undefined'
            if (this.place) {

                console.log('Place was successfully loaded!');

            } else {
               //--- this is mock data for example, delete this---
                this.place={
                    "id": "1",
                    "lat": "50.6202",
                    "lon": "26.2516",
                    "name": "Tarakaniv Fort",
                    "description": "Tarakaniv Fort - it's very interesting place! It's super place! Tarakaniv Fort - it's very interesting place! " +
                    "It's super place! Tarakaniv Fort - it's very interesting place!" +
                    " It's super place! Tarakaniv Fort - it's very interesting place! " +
                    "It's super place!",
                    "photo": ["img/places/99.jpg",
                        "img/places/29501508.jpg",
                        "img/places/457637112.jpg",
                        "img/places/ae55a1cs-960.jpg",
                        "img/places/vnutri_tarakonovskogo_forta.jpg"
                    ],
                    "type": "Camp"
                };
                //--- this is mock data for example, delete this---
                map = mapFactory.showMap();
                var URL = 'assets/';
                marker=L.marker(L.latLng(this.place.lat, this.place.lon)).addTo(map);
                marker.bindPopup('<div><h3>' + this.place.name + '</h3><a><img class="marker-image" src="' +
                URL + this.place.photo[0] + '" \/></a><br />').openPopup();
                map.setView([this.place.lat, this.place.lon]);
                console.log('Place failed to load!');

            }
        }
    });

