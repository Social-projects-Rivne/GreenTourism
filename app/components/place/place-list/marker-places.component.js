angular.module('placeList')
  .component('marker', {
    bindings: {
      placeid: '='
    },
    template: '<br /><button class="btn btn-primary btn-md center-block"  type="button"  ng-click="$ctrl.open($ctrl.placeid)">OPEN</button>',
    controller: function markerController($compile, $scope, $uibModal, Place) {
      $ctrl = this;
      $ctrl.placemyid = this.placeid;
      $ctrl.dataPlace = Place.query($ctrl.placemyid);
      $ctrl.dataPlace.$promise.then(function(result) {
        $ctrl.dataPlace = result;
        $ctrl.dataPlace = $ctrl.dataPlace[0];
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
            console.info('I was closed, so do what I need to do myContent\'s controller now and result was->');
            console.info(result);
          }, function(reason) {
            console.info('I was dimissed, so do what I need to do myContent\'s controller now and reason was->' + reason);
          });
        };
      });
    }
  });
