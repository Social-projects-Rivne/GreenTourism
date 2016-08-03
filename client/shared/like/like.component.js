angular.module('like', [])
  .component('like', {
    templateUrl: 'shared/like/like.template.html',
    bindings: {
      inputObject: '<',
      inputObjectType: '<'
    },
    controller: ['currentUser', 'Restangular',
      function(currentUser, Restangular) {
        var ctrl = this;

        ctrl.currentUser = currentUser;
        if (ctrl.currentUser) {
          if (_.includes(ctrl.inputObject.likes, ctrl.currentUser.id)) {
            // Here would be add/remove class after finished place-detail-page
            angular.element('.like').css('background-color', 'green');
          } else {
            // Here would be add/remove class after finished place-detail-page
            angular.element('.like').css('color', 'none');
          }
        }

        ctrl.addRemoveLike = function() {
          if (_.includes(ctrl.inputObject.likes, ctrl.currentUser.id)) {
            Restangular.one(ctrl.inputObjectType + '/' +
              ctrl.inputObject._id + '/likes').customPOST(
              {
                deleteId: ctrl.currentUser._id
              }).then(function() {
                Restangular.one(ctrl.inputObjectType + '/' +
                  ctrl.inputObject._id + '/likes')
                  .get().then(function(obj) {
                    obj = _.without(obj, ctrl.currentUser._id);
                    ctrl.inputObject.likes = obj;
                    ctrl.inputObject.rate = obj.length;
                  // Here would be add/remove class after finished place-detail-page
                    angular.element('.like').css('background-color', '#fff');
                  });
              });
          } else {
            Restangular.one(ctrl.inputObjectType + '/' +
              ctrl.inputObject._id + '/likes').customPOST(
              {
                id: ctrl.currentUser._id
              }).then(function() {
                Restangular.one(ctrl.inputObjectType + '/' +
                  ctrl.inputObject._id + '/likes')
                  .get().then(function(obj) {
                    ctrl.inputObject.likes.push(ctrl.currentUser.id);
                    ctrl.inputObject.rate = obj.length;
                  // Here would be add/remove class after finished place-detail-page
                    angular.element('.like').css('background-color', 'green');
                  });
              });
          }
        };
      }
    ]
  });
