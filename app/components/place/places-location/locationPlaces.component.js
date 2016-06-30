function locationplacesCtrl(placeModel, $scope, $uibModal, $rootScope)
{
    var ctrl = this;
    ctrl.places =placeModel.getPlaceList.query();
        this.placesFilter=function(value)
        {
            ctrl.type=$rootScope.type;
            return value.type==ctrl.type&&value.rate;
        }
    $ctrl=this;
    $ctrl.placemyid=this.placeid;
    $ctrl.dataPlace = placeModel.getOnePlace.query($ctrl.placemyid);
    $ctrl.dataPlace.$promise.then(function (result) {
        $ctrl.dataPlace = result;
        $ctrl.dataPlace=$ctrl.dataPlace[0];
        $ctrl.open = function(placeid) {
            $uibModal.open({
                template: '<place-modal placeid="$ctrl.placeid" modal-data="$ctrl.modalData" $close="$close(result)" $dismiss="$dismiss(reason)"></place-modal>',
                controller: ['modalData', function(modalData) {
                    var $ctrl = this;
                    $ctrl.placeid = placeid;
                    $ctrl.modalData = modalData;
                }],
                controllerAs: '$ctrl',
                resolve: {
                    modalData: $ctrl.dataPlace
                }
            }).result.then(function(result) {
               // console.info("I was closed, so do what I need to do myContent's controller now and result was->");
               // console.info(result);
            }, function(reason) {
                //console.info("I was dimissed, so do what I need to do myContent's controller now and reason was->"+reason);
            });
        };

    });

}

angular.module('locationPlaces',[]).
component('locationPlaces', {
    bindings: {
        placeid: '='
    },
    templateUrl: 'components/place/places-location/locationPlaces.template.html',
    controller:locationplacesCtrl
});

