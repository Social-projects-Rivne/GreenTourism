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
        ctrl.showError = false;
        ctrl.addComment = function(content) {
          if (content.length <= MAX_COMMENT_CONTENT_LENGTH) {
            Restangular.one(ctrl.inputObjectType + '/' +
              ctrl.inputObject._id + '/comments').customPOST(
              {
                content: content,
                author: ctrl.currentUser._id
              }).then(
                function(res) {
                  ctrl.content = '';
                  Restangular.one(ctrl.inputObjectType + '/' +
                    ctrl.inputObject._id + '/comments/' + res)
                  .get().then(function(obj) {
                    ctrl.inputObject.comments.push(obj);
                  });
                },
                function(err) {
                  ctrl.showError = err.statusText;
                });
          }
        };

        ctrl.removeComment = function(id) {
          Restangular.one(ctrl.inputObjectType + '/' +
            ctrl.inputObject._id + '/comments', id).remove().then(
              function() {
                ctrl.inputObject.comments = ctrl.inputObject.comments
                .filter(function(comment) {
                  return comment._id !== id;
                });
              },
              function(err) {
                ctrl.showError = err.statusText;
              });
        };

        ctrl.showEditingMode = function(id, defaultContent) {
          ctrl.checkCommentId = id;
          ctrl.defaultCommentContent = defaultContent;
        };

        ctrl.updateComment = function(id, content) {
          if (content.length <= MAX_COMMENT_CONTENT_LENGTH) {
            Restangular.one(ctrl.inputObjectType + '/' +
              ctrl.inputObject._id + '/comments', id)
              .get().then(
                function(obj) {
                  obj.content = content;
                  obj.put();
                  ctrl.checkCommentId = null;
                });
          }
        };
      }
    ]
  });
