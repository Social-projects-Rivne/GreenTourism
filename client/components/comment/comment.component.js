angular.module('comment', [])
  .component('comment', {
    templateUrl: 'components/comment/comment.template.html',
    bindings: {
      object: '<'
    },
    controller: function commentCtrl(currentUser, Restangular) {
      var self = this;

      this.currentUser = currentUser;
      var type = 'places';

      this.addComment = function(content) {
        if (content.length <= 1000) {
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
        self.checkCommentId = false;
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
        if (content.length <= 1000) {
          Restangular.one(type + '/' + this.object._id + '/comments', id)
            .get().then(function(obj) {
              obj.content = content;
              obj.put();
              self.checkCommentId = false;
            });
        }
      };
    }
  });

