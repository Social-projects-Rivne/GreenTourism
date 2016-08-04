angular.module('blogComments', []);
angular.module('blogComments').component('blogComments', {
  templateUrl: 'components/blog/blog-comments/blog-comments.template.html',
  bindings: {
    blogcomment: '=',
    blogid: '<'
  },
  controller: ['currentUser', 'Restangular',
    function BlogCommentsCtrl(currentUser, Restangular) {
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
          Restangular.one('blogs/comment').customPOST(
              {
                text: content,
                author: ctrl.currentUser._id,
                blogId: ctrl.blogid
              }).then(function(res) {
                ctrl.content = '';
                res.record.author = currentUser;
                ctrl.blogcomment.push(res.record);
              }, function(err) {
                ctrl.showError = err.statusText;
              });
        };

        ctrl.removeBlogComment = function(id) {
          Restangular.one('blogs/comment', id).remove().then(function() {
            ctrl.blogcomment = ctrl.blogcomment.filter(function(comment) {
              return comment.id !== id;
            });
          }, function(err) {
            ctrl.showError = err.statusText;
          });
        };

        ctrl.showEditingMode = function(id, defaultContent) {
          ctrl.checkCommentId = id;
          ctrl.defaultCommentContent = defaultContent;
        };

        ctrl.updateComment = function(id, content) {
          Restangular.one('blogs/comment', id).customPUT ({
            content
          }).then(function(obj) {
            obj.text = content;
            ctrl.checkCommentId = null;
          });
        };
    }]
});
