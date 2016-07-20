angular.module('comment', [])
  .component('comment', {
    templateUrl: 'shared/comment/comment.template.html',
    bindings: {
      object: '<'
    },
    controller: ['currentUser', 'Restangular', function commentCtrl(currentUser, Restangular) {
      var self = this;
      var MAX_COMMENT_CONTENT_LENGTH = 1000;

      this.currentUser = currentUser;
      var type = 'places'; //TODO: Refactoring after demo

      this.addComment = function(content) {
        if (content.length <= MAX_COMMENT_CONTENT_LENGTH) {
          Restangular.one(type, this.object._id).get().then(function(obj) {
            self.object.comments.push({
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
        this.content = '';
        self.checkCommentId = null;
      };

      this.removeComment = function(id) {
        Restangular.one(type + '/' + this.object._id + '/comments', id)
          .get().then(function(obj) {
            self.object.comments = self.object.comments.filter(
              function(comment) {
                return comment._id !== obj._id;
              });
            obj.remove();
          });
      };

      this.editComment = function(id) {
        this.checkCommentId = id;
      };

      this.updateComment = function(id, content) {
        if (content.length <= MAX_COMMENT_CONTENT_LENGTH) {
          Restangular.one(type + '/' + this.object._id + '/comments', id)
            .get().then(function(obj) {
              obj.content = content;
              obj.put();
              self.checkCommentId = null;
            });
        }
      };
    }
  ]});

