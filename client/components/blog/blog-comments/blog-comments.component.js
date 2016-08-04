angular.module('blogComments', []);
angular.module('blogComments').component('blogComments', {
  templateUrl: 'components/blog/blog-comments/blog-comments.template.html',
  bindings: {
    blogcomment: '='
  },
  controller: ['currentUser', 'Restangular',
    function BlogCommentsCtrl(currentUser, Restangular) {
      console.log(this);
      var ctrl = this;
      var heightAfterContent = 10;

      ctrl.currentUser = currentUser;

      ctrl.showError = false;

      ctrl.textareaPostResize = function() {
        var textareaObject = angular.element('textarea');
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

      ctrl.addComment = function(content) {
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

      //ctrl.removeComment = function(id) {
      //  Restangular.one(ctrl.inputObjectType + '/' +
      //      ctrl.inputObject._id + '/comments', id).remove().then(function() {
      //    ctrl.inputObject.comments = ctrl.inputObject.comments
      //        .filter(function(comment) {
      //          return comment._id !== id;
      //        });
      //  }, function(err) {
      //    ctrl.showError = err.statusText;
      //  });
      //};

      ctrl.removeBlogComment = function(id) {
        Restangular.one('blogs/comment', id).remove().then(function() {
          //ctrl.inputObject.comments = ctrl.inputObject.comments
          //    .filter(function(comment) {
          //      return comment.id !== id;
          //    });
        }, function(err) {
          ctrl.showError = err.statusText;
        });
      };

      ctrl.showEditingMode = function(id, defaultContent) {
        ctrl.checkCommentId = id;
        ctrl.defaultCommentContent = defaultContent;
      };

      ctrl.updateComment = function(id, content) {
        Restangular.one(ctrl.inputObjectType + '/' +
            ctrl.inputObject._id + '/comments', id).get().then(function(obj) {
          obj.content = content;
          obj.put();
          ctrl.checkCommentId = null;
        });
      };

      ctrl.currentUser = currentUser;
    }]
});
