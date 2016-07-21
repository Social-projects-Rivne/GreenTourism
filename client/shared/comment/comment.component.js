angular.module('comment', [])
  .component('comment', {
    templateUrl: 'shared/comment/comment.template.html',
    bindings: {
      object: '<'
    },
    controller: ['currentUser', 'Restangular',
      function(currentUser, Restangular) {
        var ctrl = this;
        var MAX_COMMENT_CONTENT_LENGTH = 1000;

        ctrl.currentUser = currentUser;
        var type = 'places'; // TODO: Refactoring after demo

        ctrl.addComment = function(content) {
          if (content.length <= MAX_COMMENT_CONTENT_LENGTH) {
            Restangular.one(type, ctrl.object._id).get().then(function(obj) {
              ctrl.object.comments.push({
                content: content,
                createdAt: 'just added',
                author: {
                  avatar: currentUser.avatar,
                  firstName: currentUser.firstName,
                  lastName: currentUser.lastName
                }
              });
              obj.comments.push({content: content, author: currentUser._id});
              obj.save();
            });
          }
          ctrl.content = '';
          ctrl.checkCommentId = null;
        };

        ctrl.removeComment = function(id) {
          Restangular.one(type + '/' + ctrl.object._id + '/comments', id)
            .get().then(function(obj) {
              ctrl.object.comments = ctrl.object.comments.filter(
                function(comment) {
                  return comment._id !== obj._id;
                });
              obj.remove();
            });
        };

        ctrl.editComment = function(id) {
          ctrl.checkCommentId = id;
        };

        ctrl.updateComment = function(id, content) {
          if (content.length <= MAX_COMMENT_CONTENT_LENGTH) {
            Restangular.one(type + '/' + ctrl.object._id + '/comments', id)
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
