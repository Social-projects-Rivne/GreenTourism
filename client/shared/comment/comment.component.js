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
        var heightAfterContent = 10;

        ctrl.textareaPostResize = function() {
          var textareaObject = angular.element('.textarea-post');
          textareaObject.css('height', '50px');
          textareaObject.css('height',
            heightAfterContent + textareaObject.prop('scrollHeight') + 'px');
        };

        ctrl.textareaEditResize = function() {
          var textareaObject = angular.element('.edit-textarea');
          textareaObject.css('height', '50px');
          textareaObject.css('height',
            heightAfterContent + textareaObject.prop('scrollHeight') + 'px');
        };

        ctrl.currentUser = currentUser;
        ctrl.showError = false;
        ctrl.showConfirm = false;

        ctrl.addComment = function(content) {
          ctrl.showConfirm = false;
          angular.element('textarea').css('height', '50px');
          Restangular.one(ctrl.inputObjectType + '/' +
            ctrl.inputObject._id + '/comments').customPOST(
            {
              content: content,
              author: ctrl.currentUser._id
            }).then(function(res) {
              ctrl.content = '';
              Restangular.one(ctrl.inputObjectType + '/' +
                ctrl.inputObject._id + '/comments/' + res)
                .get().then(function(obj) {
                  ctrl.inputObject.comments.push(obj);
                });
            }, function(err) {
              ctrl.showError = err.statusText;
            });
        };

        ctrl.showConfirmMessage = function(id) {
          ctrl.showConfirm = true;
          ctrl.checkCommentId1 = id;
        };

        ctrl.removeComment = function(id) {
          Restangular.one(ctrl.inputObjectType + '/' +
            ctrl.inputObject._id + '/comments', id).remove().then(function() {
              ctrl.inputObject.comments = ctrl.inputObject.comments
              .filter(function(comment) {
                return comment._id !== id;
              });
            }, function(err) {
              ctrl.showError = err.statusText;
            });
        };

        ctrl.showEditingMode = function(id, defaultContent) {
          ctrl.checkCommentId = id;
          ctrl.defaultCommentContent = defaultContent;
          ctrl.showConfirm = false;
        };

        ctrl.updateComment = function(id, content) {
          Restangular.one(ctrl.inputObjectType + '/' +
            ctrl.inputObject._id + '/comments', id).customPUT({
              content: content
            }).then(function() {
              ctrl.checkCommentId = null;
            }, function(err) {
              ctrl.showError = err.statusText;
            });
        };
      }
    ]
  });
