angular.module('placeModal', [])
  .component('placeModal', {
    templateUrl: 'components/place/place-modal/place-modal.template.html',
    bindings: {
      $close: '&',
      $dismiss: '&',
      placeid: '<',
      modalData: '<'
    },
    controller: [function() {
      var $ctrl = this;
      var photosarr = $ctrl.modalData.photo;
      console.log(photosarr);

      $ctrl.handleClose = function() {
        console.info("in handle close");
        $ctrl.$close({
          result: $ctrl.modalData
        });
      };
      $ctrl.handleDismiss = function() {
        console.info("in handle dismiss");
        $ctrl.$dismiss({
          reason: 'cancel'
        });
      };
    }]
  });
