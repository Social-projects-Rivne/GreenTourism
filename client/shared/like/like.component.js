angular.module('like', [])
  .component('like', {
    templateUrl: 'shared/like/like.template.html',
    bindings: {
      inputObject: '<',
      inputObjectType: '<'
    },
    controller: ['currentUser', 'Restangular', 'constants',
      function(currentUser, Restangular, constants) {
        var ctrl = this;
        var likeButton = angular.element('.like');

        ctrl.currentUser = currentUser;
        if (ctrl.currentUser) {
          if (_.includes(ctrl.inputObject.likes, ctrl.currentUser.id)) {
            likeButton.addClass('like-true');
          } else {
            likeButton.removeClass('like-true');
          }
        }

        ctrl.addRemoveLike = function() {
          likeButton.addClass(constants.checkDisabled);
          if (_.includes(ctrl.inputObject.likes, ctrl.currentUser.id)) {
            Restangular.one(ctrl.inputObjectType + '/' +
              ctrl.inputObject._id + '/likes').customPOST(
              {
                deleteId: ctrl.currentUser._id
              }).then(function() {
                Restangular.one(ctrl.inputObjectType + '/' +
                ctrl.inputObject._id + '/likes')
                .get().then(function(obj) {
                  ctrl.inputObject.likes = obj;
                  ctrl.inputObject.rate = obj.length;
                  likeButton.removeClass('like-true');
                  likeButton.removeClass(constants.checkDisabled);
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
                  likeButton.addClass('like-true');
                  likeButton.removeClass(constants.checkDisabled);
                });
              });
          }
        };
      }
    ]
  });
