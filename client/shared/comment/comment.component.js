angular.module('comment', [])
  .component('comment', {
    templateUrl: 'shared/comment/comment.template.html',
    bindings: {
      inputObject: '<',
      inputObjectType: '<'
    },
    controller: ['currentUser', 'Restangular',
      function(currentUser, Restangular) {
        var ctrl = this;
        var MAX_COMMENT_CONTENT_LENGTH = 1000;

        ctrl.currentUser = currentUser;

        ctrl.addComment = function(content) {
          if (content.length <= MAX_COMMENT_CONTENT_LENGTH) {
            ctrl.content = '';
            Restangular.one(ctrl.inputObjectType + '/' +
              ctrl.inputObject._id + '/comments').customPOST(
              {
                content: content,
                author: ctrl.currentUser._id
              }).then(function() {
                Restangular.one(ctrl.inputObjectType + '/' +
                  ctrl.inputObject._id + '/comments')
                .get().then(function(obj) {
                  ctrl.inputObject.comments = obj;
                });
              });
          }
        };

        ctrl.removeComment = function(id) {
          Restangular.one(ctrl.inputObjectType + '/' +
            ctrl.inputObject._id + '/comments', id).remove().then(function() {
              Restangular.one(ctrl.inputObjectType + '/' +
                ctrl.inputObject._id + '/comments')
                .get().then(function(obj) {
                  ctrl.inputObject.comments = obj;
                });
            });
        };

        ctrl.updateComment = function(id, content) {
          if (content.length <= MAX_COMMENT_CONTENT_LENGTH) {
            Restangular.one(ctrl.inputObjectType + '/' +
              ctrl.inputObject._id + '/comments', id)
              .get().then(function(obj) {
                obj.content = content;
                obj.put();
                ctrl.checkCommentId = null;
              });
          }
        };
      }
    ]
  });
